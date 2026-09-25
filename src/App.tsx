import React, { useState, useEffect } from 'react';
import { Task, UserStats, MasterDailyState, AiJournalEntry, CalendarDayInfo, SyllabusTopic } from './types';
import { INITIAL_TASKS, DEFAULT_MASTER_DAILY, INITIAL_JOURNAL_ENTRIES } from './data/initialData';
import { INITIAL_DUAL_PROGRESS } from './data/heroData';
import { CompanionAvatar } from './components/CompanionAvatar';
import { MasterDailyView } from './components/MasterDailyView';
import { MasterSyllabusView } from './components/MasterSyllabusView';
import { SyllabusTopicPickerModal } from './components/SyllabusTopicPickerModal';
import { DailyModeSelector } from './components/DailyModeSelector';
import { CalendarView } from './components/CalendarView';
import { AiHeroWorldsView } from './components/AiHeroWorldsView';
import { TaskCard } from './components/TaskCard';
import { TaskModal } from './components/TaskModal';
import { WardrobeModal } from './components/WardrobeModal';
import { FocusTimer } from './components/FocusTimer';
import { RoadmapModal } from './components/RoadmapModal';
import { FounderRoadmapModal } from './components/FounderRoadmapModal';
import { ProblemOfTheWeekModal } from './components/ProblemOfTheWeekModal';
import { RoutinePhotoModal } from './components/RoutinePhotoModal';
import { sounds } from './utils/audio';
import confetti from 'canvas-confetti';
import { 
  Plus, Search, Compass, Lightbulb, FileText, 
  Sparkles, CheckCircle2, Clock, Filter, BookOpen, 
  Flame, Award, Layers, Zap, Heart, Trophy, LayoutDashboard, ListTodo, Calendar, Crown, RotateCcw
} from 'lucide-react';

const STORAGE_KEY_TASKS = 'freya_quest_tasks_v3';
const STORAGE_KEY_STATS = 'freya_quest_stats_v3';
const STORAGE_KEY_DAILY = 'freya_quest_daily_v3';
const STORAGE_KEY_JOURNAL = 'freya_quest_journal_v3';
const STORAGE_KEY_SYLLABUS = 'freya_quest_syllabus_v2';

export const App: React.FC = () => {
  // Master Daily State with robust schema migration
  const [daily, setDaily] = useState<MasterDailyState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DAILY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_MASTER_DAILY,
          ...parsed,
          aiMission: parsed.aiMission && parsed.aiMission.completedMissions
            ? { ...DEFAULT_MASTER_DAILY.aiMission, ...parsed.aiMission }
            : DEFAULT_MASTER_DAILY.aiMission,
          morning: { ...DEFAULT_MASTER_DAILY.morning, ...(parsed.morning || {}) },
          dsa: { ...DEFAULT_MASTER_DAILY.dsa, ...(parsed.dsa || {}) },
          project: { ...DEFAULT_MASTER_DAILY.project, ...(parsed.project || {}) },
          life: { 
            selected: Array.isArray(parsed.life?.selected) ? parsed.life.selected : DEFAULT_MASTER_DAILY.life.selected,
            completed: Array.isArray(parsed.life?.completed) ? parsed.life.completed : DEFAULT_MASTER_DAILY.life.completed,
          },
          evening: { ...DEFAULT_MASTER_DAILY.evening, ...(parsed.evening || {}) },
        };
      }
    } catch {}
    return DEFAULT_MASTER_DAILY;
  });

  // Load tasks from localStorage or initialData
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TASKS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_TASKS;
  });

  // Load stats from localStorage or default with robust schema migration
  const [stats, setStats] = useState<UserStats>(() => {
    const defaultStats: UserStats = {
      characterName: 'Freya',
      mood: 'encouraging',
      level: 1,
      currentXP: 0,
      nextLevelXP: 100,
      totalXPEarned: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      tasksCompletedToday: 0,
      equippedAccessoryId: 'acc-yellow-bow',
      unlockedAccessories: ['acc-yellow-bow'],
      soundEnabled: true,
      dailyMode: 'normal',
      careerTier: 'student',
      heroLevelTitle: 'Student (Day 1)',
      currentDayNumber: 1,
      dualProgress: INITIAL_DUAL_PROGRESS,
    };
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultStats,
          ...parsed,
          dualProgress: parsed.dualProgress && parsed.dualProgress.knowledge
            ? parsed.dualProgress
            : INITIAL_DUAL_PROGRESS,
          unlockedAccessories: Array.isArray(parsed.unlockedAccessories)
            ? parsed.unlockedAccessories
            : defaultStats.unlockedAccessories,
        };
      }
    } catch {}
    return defaultStats;
  });

  // AI Intelligence Journal entries
  const [journalEntries, setJournalEntries] = useState<AiJournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_JOURNAL);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_JOURNAL_ENTRIES;
  });

  // Active top-level view: 'daily_system' | 'syllabus' | 'calendar' | 'hero_worlds' | 'all_quests'
  const [activeMainTab, setActiveMainTab] = useState<'daily_system' | 'syllabus' | 'calendar' | 'hero_worlds' | 'all_quests'>('daily_system');

  // Master Syllabus completed topics
  const [completedSyllabusTopicIds, setCompletedSyllabusTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SYLLABUS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  // Filter & Search states for quests tab
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [speechOverride, setSpeechOverride] = useState<string | null>(null);

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isFounderRoadmapOpen, setIsFounderRoadmapOpen] = useState(false);
  const [isProblemOpen, setIsProblemOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [isSyllabusPickerOpen, setIsSyllabusPickerOpen] = useState(false);
  const [syllabusPickerMode, setSyllabusPickerMode] = useState<'all' | 'ai' | 'swe'>('all');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DAILY, JSON.stringify(daily));
    } catch {}
  }, [daily]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
    } catch {}
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(journalEntries));
    } catch {}
  }, [journalEntries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SYLLABUS, JSON.stringify(completedSyllabusTopicIds));
    } catch {}
  }, [completedSyllabusTopicIds]);

  // Trigger companion speech & XP
  const handleTriggerReaction = (speech: string, mood: any, earnedXP?: number) => {
    setSpeechOverride(speech);
    setTimeout(() => setSpeechOverride(null), 6000);

    if (earnedXP) {
      setStats(prev => {
        let newXP = prev.currentXP + earnedXP;
        let newLevel = prev.level;
        let newNextXP = prev.nextLevelXP;
        let newMood = mood || prev.mood;

        if (newXP >= newNextXP) {
          newXP -= newNextXP;
          newLevel += 1;
          newNextXP = Math.round(newNextXP * 1.35);
          newMood = 'excited';
          sounds.playLevelUp();
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
        }

        return {
          ...prev,
          currentXP: newXP,
          level: newLevel,
          nextLevelXP: newNextXP,
          totalXPEarned: prev.totalXPEarned + earnedXP,
          mood: newMood,
        };
      });
    } else {
      setStats(prev => ({ ...prev, mood: mood || prev.mood }));
    }
  };

  // Toggle Quest Task
  const handleToggleComplete = (id: string, e: React.MouseEvent) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const willBeCompleted = !task.completed;
    sounds.playClick();

    if (willBeCompleted) {
      sounds.playTaskComplete();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      });
    }

    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          completed: willBeCompleted,
          completedAt: willBeCompleted ? new Date().toISOString() : undefined,
        };
      }
      return t;
    }));

    handleTriggerReaction(
      willBeCompleted ? `Completed "${task.title.slice(0, 25)}..."! +${task.xp} XP! ✨` : "Task active again.",
      willBeCompleted ? 'happy' : 'encouraging',
      willBeCompleted ? task.xp : undefined
    );
  };

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: 'custom-' + Date.now(),
      completed: false,
    };
    setTasks(prev => [newTask, ...prev]);
    handleTriggerReaction(`New quest accepted: "${newTask.title.slice(0, 25)}..."! Let's get to work! 🚀`, 'encouraging');
  };

  const handleDeleteTask = (id: string) => {
    sounds.playClick();
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleConfirmReset = () => {
    try {
      localStorage.clear();
    } catch {}

    setDaily(DEFAULT_MASTER_DAILY);
    setTasks(INITIAL_TASKS);
    setStats({
      characterName: 'Freya',
      mood: 'encouraging',
      level: 1,
      currentXP: 0,
      nextLevelXP: 100,
      totalXPEarned: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      tasksCompletedToday: 0,
      equippedAccessoryId: 'acc-yellow-bow',
      unlockedAccessories: ['acc-yellow-bow'],
      soundEnabled: true,
      dailyMode: 'normal',
      careerTier: 'student',
      heroLevelTitle: 'Student (Day 1)',
      currentDayNumber: 1,
      dualProgress: INITIAL_DUAL_PROGRESS,
    });
    setCompletedSyllabusTopicIds([]);
    setJournalEntries(INITIAL_JOURNAL_ENTRIES);
    setIsResetConfirmOpen(false);

    sounds.playLevelUp();
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.5 } });
    handleTriggerReaction("🌱 Clean slate! Starting Day 1 right now from zero. Let's make it count, Freya!", 'happy');
  };

  const handleAddJournalEntry = (entry: Omit<AiJournalEntry, 'id' | 'date'>) => {
    const newEntry: AiJournalEntry = {
      ...entry,
      id: 'journal-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setJournalEntries(prev => [newEntry, ...prev]);
    handleTriggerReaction("Added to AI Intelligence Database! Compounding knowledge daily! 📓", 'proud', 30);
  };

  const handleSessionComplete = (earnedXP: number, minutes: number) => {
    handleTriggerReaction(`Incredible ${minutes}m focus sprint finished! You earned +${earnedXP} XP! 🔥`, 'proud', earnedXP);
  };

  // Filter tasks for quest list tab
  const filteredTasks = tasks.filter(task => {
    if (activeCategory === 'today_first7') {
      if (!task.dayTag) return false;
    } else if (activeCategory === 'completed') {
      if (!task.completed) return false;
    } else if (activeCategory !== 'all') {
      if (task.category !== activeCategory) return false;
    }

    if (filterPriority !== 'all' && task.priority !== filterPriority) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchTopic = task.topic?.toLowerCase().includes(q);
      const matchNotes = task.notes?.toLowerCase().includes(q);
      if (!matchTitle && !matchTopic && !matchNotes) return false;
    }

    return true;
  });

  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  const categories = [
    { id: 'all', label: 'All Quests', count: tasks.length },
    { id: 'routine', label: 'Morning Foundation 🌅', count: tasks.filter(t => t.category === 'routine').length },
    { id: 'dsa', label: 'DSA / LeetCode ⚡', count: tasks.filter(t => t.category === 'dsa').length },
    { id: 'aiml', label: 'AI/ML Guide 🧠', count: tasks.filter(t => t.category === 'aiml').length },
    { id: 'project', label: 'PatientTriage 🏥', count: tasks.filter(t => t.category === 'project').length },
    { id: 'college', label: 'IITM & College 🎓', count: tasks.filter(t => t.category === 'college').length },
    { id: 'completed', label: 'Done ✨', count: completedCount },
  ];

  const handleSelectDayForSystem = (dayInfo: CalendarDayInfo) => {
    sounds.playLevelUp();
    setDaily(prev => ({
      ...prev,
      date: dayInfo.date,
      dayNumber: dayInfo.dayNumber,
      aiMission: {
        dayNumber: dayInfo.dayNumber,
        dateStr: dayInfo.date,
        worldName: dayInfo.world,
        concept: dayInfo.concept,
        understandPrompt: `Explain ${dayInfo.concept} in your own words without looking at notes.`,
        codeTask: `Implement today's concept from scratch in Python/NumPy.`,
        buildTask: dayInfo.build,
        recordNotes: `Record what was learned, what confused me, and what was built.`,
        bossQuestion: dayInfo.isBossBattle ? `Can I explain this to someone who knows nothing about ML?` : undefined,
        isBossBattle: dayInfo.isBossBattle,
        bossTitle: dayInfo.bossTitle,
        projectMilestone: dayInfo.projectMilestone,
        completedMissions: {
          learn: true,
          understand: false,
          code: false,
          build: false,
          record: false,
          ship: false,
        }
      },
      project: {
        ...prev.project,
        milestone: dayInfo.projectMilestone || prev.project.milestone
      }
    }));
    setActiveMainTab('daily_system');
    handleTriggerReaction(`Loaded Day ${dayInfo.dayNumber}: "${dayInfo.title}"! Let's conquer today's AI Hero missions! 🚀`, 'excited', 30);
  };

  // Toggle syllabus topic completion (+25 XP)
  const handleToggleSyllabusTopic = (topicId: string, topicTitle: string, isChecked: boolean) => {
    setCompletedSyllabusTopicIds(prev => {
      const exists = prev.includes(topicId);
      if (isChecked && !exists) {
        handleTriggerReaction(`Mastered: "${topicTitle}"! Knowledge permanently compounded! +25 XP 🧠`, 'proud', 25);
        return [...prev, topicId];
      } else if (!isChecked && exists) {
        return prev.filter(id => id !== topicId);
      }
      return prev;
    });
  };

  // Load any syllabus topic into today's daily system
  const handleLoadSyllabusTopicIntoDaily = (topic: SyllabusTopic) => {
    sounds.playLevelUp();
    confetti({ particleCount: 60, spread: 60 });

    if (topic.category === 'ai') {
      setDaily(prev => ({
        ...prev,
        aiMission: {
          ...prev.aiMission,
          concept: topic.title,
          understandPrompt: topic.suggestedUnderstandPrompt || `Explain ${topic.title} in your own words without notes.`,
          codeTask: topic.suggestedCodeTask || `Implement ${topic.title} from scratch.`,
          buildTask: `Apply ${topic.title} into a small script or feature and commit.`,
          completedMissions: {
            ...prev.aiMission.completedMissions,
            learn: true,
            understand: false,
            code: false,
            build: false,
            record: false,
            ship: false,
          }
        }
      }));
      setActiveMainTab('daily_system');
      handleTriggerReaction(`Loaded "${topic.title}" from AI Syllabus! Let's learn, understand, code, and ship today! 🚀`, 'excited', 25);
    } else {
      setDaily(prev => ({
        ...prev,
        dsa: {
          ...prev.dsa,
          topic: `${topic.moduleName}: ${topic.title}`,
          concept: true,
          videoLecture: false,
          codingBook: false,
          makeNotes: false,
          lc1: false,
          lc2: false,
          lc3: false,
          lc4: false,
          dryRuns: false,
          commitCode: false,
        }
      }));
      setActiveMainTab('daily_system');
      handleTriggerReaction(`Loaded "${topic.title}" into DSA / SWE Stack! 4 LeetCodes + Dry Runs mode! ⚡`, 'proud', 25);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f5] text-slate-800 flex flex-col">
      
      {/* Sticky App Header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Sparkles className="w-5 h-5 fill-white/80" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 font-display">
                  Freya Quest
                </h1>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-800 border border-purple-200">
                  AI-Powered Engineer
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Master Daily System • SWE First + AI Specialization
              </p>
            </div>
          </div>

          {/* Quick Hub Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* 2026-2032+ Founder Roadmap Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsFounderRoadmapOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-200 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Open Freya → AI Builder → AI Founder Roadmap"
            >
              <Trophy className="w-3.5 h-3.5 text-purple-600" />
              <span className="hidden md:inline">Founder Roadmap</span>
            </button>

            {/* AI Guide Roadmap */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsRoadmapOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Open Freya's 7-Step AI Roadmap & Verdicts"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">AI Guide</span>
            </button>

            {/* Problem Worksheet */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsProblemOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs rounded-xl border border-amber-200 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Open Real-World Problem of the Week Worksheet"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden lg:inline">Problem Sheet</span>
            </button>

            {/* Original Note */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsPhotoOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-all cursor-pointer shadow-xs active:scale-95"
              title="View original handwritten schedule note"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden xl:inline">Original Note</span>
            </button>

            {/* Start from Zero Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsResetConfirmOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Reset everything from today and start fresh from zero"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden sm:inline">Start from Zero</span>
            </button>

            {/* Add Task Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsTaskModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-200 transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Quest</span>
            </button>

          </div>

        </div>
      </header>

      {/* Main App Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* 1. Companion Avatar Showcase (With Career Ladder & 4 Worlds) */}
        <CompanionAvatar
          stats={stats}
          daily={daily}
          onUpdateStats={(newStats) => setStats(prev => ({ ...prev, ...newStats }))}
          onOpenWardrobe={() => {
            sounds.playClick();
            setIsWardrobeOpen(true);
          }}
          onOpenTimer={() => {
            sounds.playClick();
            setIsTimerOpen(true);
          }}
          onOpenFounderRoadmap={() => {
            sounds.playClick();
            setIsFounderRoadmapOpen(true);
          }}
          speechOverride={speechOverride}
        />

        {/* 2. Top-level View Switcher Tabs: Daily System, Calendar, AI Hero Worlds, All Quests */}
        <div className="w-full max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveMainTab('daily_system');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                activeMainTab === 'daily_system'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Master Daily 🌱</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveMainTab('syllabus');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                activeMainTab === 'syllabus'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Master Syllabus 🧠</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveMainTab('calendar');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                activeMainTab === 'calendar'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Calendar 📅</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveMainTab('hero_worlds');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                activeMainTab === 'hero_worlds'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Crown className="w-4 h-4 text-purple-400" />
              <span>AI Hero Worlds 👑</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveMainTab('all_quests');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                activeMainTab === 'all_quests'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <ListTodo className="w-4 h-4" />
              <span>Quests ({tasks.length})</span>
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium hidden md:inline">
            {activeMainTab === 'daily_system' ? "Today's Missions A–F" : activeMainTab === 'syllabus' ? '307 Topics • 26 AI Modules + 9 SWE Pillars' : activeMainTab === 'calendar' ? 'Sept 2026 → Mar 2027 Schedule' : activeMainTab === 'hero_worlds' ? '12 Worlds & Dual Progress' : 'Custom Task Catalog'}
          </span>
        </div>

        {/* ========================================================= */}
        {/* VIEW 1: MASTER DAILY SYSTEM */}
        {/* ========================================================= */}
        {activeMainTab === 'daily_system' && (
          <>
            {/* Daily Mode Selector */}
            <DailyModeSelector
              currentMode={stats.dailyMode}
              onSelectMode={(mode) => {
                setStats(prev => ({ ...prev, dailyMode: mode }));
                if (mode === 'busy') {
                  handleTriggerReaction("Busy college day mode! 20–45 mins. 1 concept + 1 DSA. Never zero days!", 'sleepy');
                } else if (mode === 'normal') {
                  handleTriggerReaction("Normal day mode! 1.5–2.5 hours of solid study, code, and commit!", 'happy');
                } else {
                  handleTriggerReaction("Free day mode! 4–6 hours! Let's build a flagship feature for PatientTriage!", 'excited');
                }
              }}
            />

            {/* The Master Daily 6 Pillars Component */}
            <MasterDailyView
              daily={daily}
              onUpdateDaily={setDaily}
              onTriggerReaction={handleTriggerReaction}
              characterName={stats.characterName}
              onOpenTopicPicker={(mode) => {
                sounds.playClick();
                setSyllabusPickerMode(mode);
                setIsSyllabusPickerOpen(true);
              }}
            />
          </>
        )}

        {/* ========================================================= */}
        {/* VIEW: MASTER SYLLABUS (26 AI MODULES + 9 SWE PILLARS) */}
        {/* ========================================================= */}
        {activeMainTab === 'syllabus' && (
          <MasterSyllabusView
            completedTopicIds={completedSyllabusTopicIds}
            onToggleTopic={handleToggleSyllabusTopic}
            onLoadTopicIntoDaily={handleLoadSyllabusTopicIntoDaily}
            characterName={stats.characterName}
          />
        )}

        {/* ========================================================= */}
        {/* VIEW 2: CALENDAR & MILESTONES */}
        {/* ========================================================= */}
        {activeMainTab === 'calendar' && (
          <CalendarView
            currentDayNumber={daily.dayNumber}
            onSelectDayForSystem={handleSelectDayForSystem}
          />
        )}

        {/* ========================================================= */}
        {/* VIEW 3: AI HERO WORLDS & DUAL PROGRESS */}
        {/* ========================================================= */}
        {activeMainTab === 'hero_worlds' && (
          <AiHeroWorldsView
            stats={stats}
            onUpdateStats={(newStats) => setStats(prev => ({ ...prev, ...newStats }))}
          />
        )}

        {/* ========================================================= */}
        {/* VIEW 2: ALL QUESTS & BACKLOG */}
        {/* ========================================================= */}
        {activeMainTab === 'all_quests' && (
          <div className="w-full max-w-4xl mx-auto space-y-4">
            
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-800 font-display">
                  Quest Catalog
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {activeCount} active quests remaining.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search quest or topic..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">🔴 High Only</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="low">🟢 Low</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveCategory(c.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === c.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{c.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === c.id ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {c.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Task Cards */}
            <div className="space-y-3 mb-12">
              {filteredTasks.length === 0 ? (
                <div className="p-8 text-center rounded-3xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="text-3xl mb-2">🎉</div>
                  <h4 className="text-base font-bold text-slate-800 font-display">
                    No quests found here!
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    All clear or no matches for your search. Add a new quest or adjust filters!
                  </p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onDeleteTask={handleDeleteTask}
                  />
                ))
              )}
            </div>

          </div>
        )}

      </main>

      {/* Footer Encouragement Banner */}
      <footer className="mt-auto border-t border-slate-200 bg-white/70 backdrop-blur-sm py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Freya's Daily Law:</span>
            <span>Finish Morning Foundation → Core Engineering (DSA + AI) → Commit Code → Life Rotation</span>
          </div>
          <div className="text-purple-600 font-semibold flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Becoming an AI-Powered Engineer & Founder!</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />

      <WardrobeModal
        isOpen={isWardrobeOpen}
        onClose={() => setIsWardrobeOpen(false)}
        stats={stats}
        onUpdateStats={(newStats) => setStats(prev => ({ ...prev, ...newStats }))}
      />

      <FocusTimer
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        onSessionComplete={handleSessionComplete}
        characterName={stats.characterName}
      />

      <FounderRoadmapModal
        isOpen={isFounderRoadmapOpen}
        onClose={() => setIsFounderRoadmapOpen(false)}
        journalEntries={journalEntries}
        onAddJournalEntry={handleAddJournalEntry}
      />

      <RoadmapModal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
      />

      <ProblemOfTheWeekModal
        isOpen={isProblemOpen}
        onClose={() => setIsProblemOpen(false)}
      />

      <RoutinePhotoModal
        isOpen={isPhotoOpen}
        onClose={() => setIsPhotoOpen(false)}
      />

      {/* Syllabus Topic Picker Modal */}
      <SyllabusTopicPickerModal
        isOpen={isSyllabusPickerOpen}
        onClose={() => setIsSyllabusPickerOpen(false)}
        filterMode={syllabusPickerMode}
        onSelectTopic={handleLoadSyllabusTopicIntoDaily}
      />

      {/* Reset from Zero Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 text-center animate-scale-up">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl shadow-inner">
              🌱
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 font-display">
                Start Fresh From Zero?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                This will refresh your dashboard for <strong>today ({new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})</strong> starting from pure zero:
              </p>
              <ul className="text-xs text-slate-600 text-left mt-3 bg-slate-50 p-3.5 rounded-2xl space-y-2 border border-slate-200">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>All daily tasks reset to unchecked for today</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Morning Foundation (0/7) & Core Engineering clean</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>XP reset to 0 / 100 XP (Level 1, Day 1)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Syllabus mastery tracking reset to 0 completed topics</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold text-xs shadow-md shadow-rose-200 hover:from-rose-600 hover:to-red-700 transition cursor-pointer active:scale-95"
              >
                Yes, Start from Zero 🌱
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
