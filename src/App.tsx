import React, { useState, useEffect } from 'react';
import { Task, UserStats, MasterDailyState, AiJournalEntry, CalendarDayInfo, SyllabusTopic } from './types';
import { ACCESSORIES, INITIAL_TASKS, DEFAULT_MASTER_DAILY, INITIAL_JOURNAL_ENTRIES } from './data/initialData';
import { INITIAL_DUAL_PROGRESS } from './data/heroData';
import { CompanionAvatar } from './components/CompanionAvatar';
import { FreyaCharacter } from './components/FreyaCompanion/FreyaCharacter';
import { AppHeader } from './components/Header/AppHeader';
import { QuickAccessDrawer } from './components/QuickAccess/QuickAccessDrawer';
import { GlobalCommandPalette } from './components/CommandPalette/GlobalCommandPalette';
import { MasterUniverseView } from './components/Master/MasterUniverseView';
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
import { ResourceVaultDrawer } from './components/ResourceVaultDrawer';
import { MasterChecklistDrawer } from './components/MasterChecklistDrawer';
import { TOTAL_VERBATIM_ITEMS } from './data/verbatimChecklistData';
import { sounds } from './utils/audio';
import confetti from 'canvas-confetti';
import { 
  Plus, Search, Compass, Lightbulb, FileText, 
  Sparkles, CheckCircle2, Clock, Filter, BookOpen, 
  Flame, Award, Layers, Zap, Heart, Trophy, LayoutDashboard, ListTodo, Calendar, Crown, RotateCcw,
  CheckSquare, Brain
} from 'lucide-react';

const STORAGE_KEY_TASKS = 'freya_quest_tasks_v3';
const STORAGE_KEY_STATS = 'freya_quest_stats_v3';
const STORAGE_KEY_DAILY = 'freya_quest_daily_v3';
const STORAGE_KEY_JOURNAL = 'freya_quest_journal_v3';
const STORAGE_KEY_SYLLABUS = 'freya_quest_syllabus_v2';
const STORAGE_KEY_VERBATIM_CHECKLIST = 'freya_quest_verbatim_checklist_v1';

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

  // Active top-level world: 'daily_system' (Today) | 'master' (Master Knowledge Map)
  const [activeWorld, setActiveWorld] = useState<'daily_system' | 'master'>('daily_system');
  const [masterSubTab, setMasterSubTab] = useState<string>('ai');

  // Quick Access & Global Command Palette states
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isQuickAccessOpen, setIsQuickAccessOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigateToWorld = (world: 'daily_system' | 'master', subTab?: string) => {
    sounds.playClick();
    setActiveWorld(world);
    if (subTab) {
      setMasterSubTab(subTab);
    }
  };

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
  const [isResourceDrawerOpen, setIsResourceDrawerOpen] = useState(false);
  const [resourceDrawerFilter, setResourceDrawerFilter] = useState('all');
  const [selectedStageForVault, setSelectedStageForVault] = useState<string | undefined>(undefined);
  const [isChecklistDrawerOpen, setIsChecklistDrawerOpen] = useState(false);
  const [verbatimCheckedIds, setVerbatimCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VERBATIM_CHECKLIST);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });
  const [floatingXP, setFloatingXP] = useState<number | null>(null);
  const [levelUpData, setLevelUpData] = useState<{ newLevel: number } | null>(null);

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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VERBATIM_CHECKLIST, JSON.stringify(verbatimCheckedIds));
    } catch {}
  }, [verbatimCheckedIds]);

  const handleToggleVerbatimItem = (id: string) => {
    setVerbatimCheckedIds(prev => {
      const isChecked = prev.includes(id);
      if (isChecked) {
        return prev.filter(x => x !== id);
      } else {
        handleTriggerReaction("Mastered topic in Master AI Checklist! 🚀", 'happy', 15);
        return [...prev, id];
      }
    });
  };

  const handleResetVerbatimChecklist = () => {
    setVerbatimCheckedIds([]);
  };

  // Trigger companion speech & XP
  const handleTriggerReaction = (speech: string, mood: any, earnedXP?: number) => {
    setSpeechOverride(speech);
    setTimeout(() => setSpeechOverride(null), 6000);

    if (earnedXP) {
      setFloatingXP(earnedXP);
      setTimeout(() => setFloatingXP(null), 1800);

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
          setLevelUpData({ newLevel });
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
    setVerbatimCheckedIds([]);
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
    setActiveWorld('daily_system');
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
      setActiveWorld('daily_system');
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
      setActiveWorld('daily_system');
      handleTriggerReaction(`Loaded "${topic.title}" into DSA / SWE Stack! 4 LeetCodes + Dry Runs mode! ⚡`, 'proud', 25);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f5] text-slate-800 flex flex-col">
      
      {/* 1. Unified Clean App Header */}
      <AppHeader
        activeTab={activeWorld}
        onSelectTab={(world) => {
          sounds.playClick();
          setActiveWorld(world);
        }}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onOpenQuickAccess={() => setIsQuickAccessOpen(true)}
        stats={stats}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* ========================================================= */}
        {/* WORLD 1: 🌱 TODAY ("What do I do?") */}
        {/* ========================================================= */}
        {activeWorld === 'daily_system' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Greeting & Action Anchor */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md border border-purple-200">
                  Today's Mission Ground
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-0.5">
                  ✨ Good Morning, {stats.characterName}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigateToWorld('master', 'ai')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-200 transition cursor-pointer active:scale-95"
                  title="Explore Master Knowledge Universe (17 Stages • 9 SWE Pillars)"
                >
                  <Brain className="w-3.5 h-3.5 text-purple-600" />
                  <span>Master Knowledge Map →</span>
                </button>
              </div>
            </div>

            {/* Recomposed Companion Module */}
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
              floatingXP={floatingXP}
              size="md"
            />

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

            {/* Today's World: Hero Quest Book & Mini Worlds */}
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
              onOpenResources={(stageId) => {
                sounds.playClick();
                setSelectedStageForVault(stageId);
                setResourceDrawerFilter('all');
                setIsResourceDrawerOpen(true);
              }}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* WORLD 2: 🧠 MASTER ("Where am I going?") */}
        {/* ========================================================= */}
        {activeWorld === 'master' && (
          <MasterUniverseView
            stats={stats}
            daily={daily}
            tasks={tasks}
            completedTopicIds={completedSyllabusTopicIds}
            verbatimCheckedIds={verbatimCheckedIds}
            journalEntries={journalEntries}
            onToggleTopic={handleToggleSyllabusTopic}
            onLoadTopicIntoDaily={handleLoadSyllabusTopicIntoDaily}
            onToggleTaskComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            onToggleVerbatimItem={handleToggleVerbatimItem}
            onResetVerbatimChecklist={handleResetVerbatimChecklist}
            onSelectDayForSystem={handleSelectDayForSystem}
            onOpenTopicPicker={(mode) => {
              sounds.playClick();
              setSyllabusPickerMode(mode);
              setIsSyllabusPickerOpen(true);
            }}
            onOpenResources={(stageId) => {
              sounds.playClick();
              setSelectedStageForVault(stageId);
              setResourceDrawerFilter('all');
              setIsResourceDrawerOpen(true);
            }}
            onOpenFounderRoadmap={() => {
              sounds.playClick();
              setIsFounderRoadmapOpen(true);
            }}
            onOpenRoadmap={() => {
              sounds.playClick();
              setIsRoadmapOpen(true);
            }}
            onOpenProblemSheet={() => {
              sounds.playClick();
              setIsProblemOpen(true);
            }}
            onOpenOriginalNote={() => {
              sounds.playClick();
              setIsPhotoOpen(true);
            }}
            onOpenAddTask={() => {
              sounds.playClick();
              setIsTaskModalOpen(true);
            }}
            onUpdateStats={(newStats) => setStats(prev => ({ ...prev, ...newStats }))}
            initialSubTab={masterSubTab}
          />
        )}

      </main>

      {/* Quick Access Drawer */}
      <QuickAccessDrawer
        isOpen={isQuickAccessOpen}
        onClose={() => setIsQuickAccessOpen(false)}
        onOpenChecklist={() => setIsChecklistDrawerOpen(true)}
        onOpenResources={() => {
          setSelectedStageForVault(undefined);
          setResourceDrawerFilter('all');
          setIsResourceDrawerOpen(true);
        }}
        onOpenProblemSheet={() => setIsProblemOpen(true)}
        onOpenOriginalNote={() => setIsPhotoOpen(true)}
        onOpenRoadmap={() => setIsRoadmapOpen(true)}
        onOpenFounderRoadmap={() => setIsFounderRoadmapOpen(true)}
        onOpenCalendar={() => handleNavigateToWorld('master', 'calendar')}
        onOpenAddTask={() => setIsTaskModalOpen(true)}
        onOpenResetConfirm={() => setIsResetConfirmOpen(true)}
        onOpenTimer={() => setIsTimerOpen(true)}
        onOpenWardrobe={() => setIsWardrobeOpen(true)}
        soundEnabled={stats.soundEnabled}
        onToggleSound={() => {
          const next = !stats.soundEnabled;
          sounds.enabled = next;
          setStats(prev => ({ ...prev, soundEnabled: next }));
        }}
        totalVerbatimChecked={verbatimCheckedIds.length}
        totalVerbatimCount={TOTAL_VERBATIM_ITEMS}
      />

      {/* Global Command Palette (Ctrl+K) */}
      <GlobalCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateToTab={handleNavigateToWorld}
        onLoadTopicIntoDaily={handleLoadSyllabusTopicIntoDaily}
        onOpenChecklist={() => setIsChecklistDrawerOpen(true)}
        onOpenResources={(stageId) => {
          setSelectedStageForVault(stageId);
          setIsResourceDrawerOpen(true);
        }}
        onOpenFounderRoadmap={() => setIsFounderRoadmapOpen(true)}
        onOpenRoadmap={() => setIsRoadmapOpen(true)}
        onOpenProblemSheet={() => setIsProblemOpen(true)}
        onOpenOriginalNote={() => setIsPhotoOpen(true)}
        onOpenTimer={() => setIsTimerOpen(true)}
        onOpenWardrobe={() => setIsWardrobeOpen(true)}
        onOpenResetConfirm={() => setIsResetConfirmOpen(true)}
        onOpenAddTask={() => setIsTaskModalOpen(true)}
        tasks={tasks}
      />

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

      {/* Level Up Celebration Moment */}
      {levelUpData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-purple-200 text-center flex flex-col items-center gap-3">
            <div className="text-3xl animate-bounce">✨ 👑 ✨</div>
            <FreyaCharacter 
              size="md" 
              state="levelUp" 
              equippedAccessory={ACCESSORIES.find(a => a.id === stats.equippedAccessoryId)} 
            />
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                ✨ LEVEL UP! ✨
              </span>
              <h3 className="text-xl font-black text-slate-900 font-display mt-1.5">
                {stats.characterName} reached Level {levelUpData.newLevel}!
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Consistency is forging an elite AI Engineer. Keep the momentum alive!
              </p>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setLevelUpData(null);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-black text-xs shadow-md shadow-purple-200 hover:from-purple-700 hover:to-indigo-700 transition cursor-pointer active:scale-95"
            >
              Continue Adventure →
            </button>
          </div>
        </div>
      )}

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

      {/* Floating Side Bar Docks for Instant Access */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5">
        {/* 1. Master AI Checklist (0-29) Sheet Button */}
        <button
          onClick={() => {
            sounds.playClick();
            setIsChecklistDrawerOpen(true);
          }}
          className="bg-gradient-to-b from-emerald-600 via-teal-700 to-slate-900 text-white font-bold text-xs py-3.5 px-2 rounded-l-2xl shadow-2xl hover:px-2.5 transition-all flex flex-col items-center gap-1.5 group cursor-pointer border-t border-b border-l border-white/30 active:scale-95"
          title="Open Master AI Checklist (0 to 29) Side Sheet"
        >
          <CheckSquare className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
          <span className="[writing-mode:vertical-rl] tracking-wider text-[10px] font-black uppercase py-0.5">
            Checklist
          </span>
          <span className="text-[9px] font-black px-1 py-0.2 rounded-md bg-emerald-400 text-slate-950 shadow-xs">
            {verbatimCheckedIds.length}
          </span>
        </button>

        {/* 2. Free Resources Vault Button */}
        <button
          onClick={() => {
            sounds.playClick();
            setSelectedStageForVault(undefined);
            setResourceDrawerFilter('all');
            setIsResourceDrawerOpen(true);
          }}
          className="bg-gradient-to-b from-indigo-700 via-purple-700 to-indigo-900 text-white font-bold text-xs py-3.5 px-2 rounded-l-2xl shadow-2xl hover:px-2.5 transition-all flex flex-col items-center gap-1.5 group cursor-pointer border-t border-b border-l border-white/30 active:scale-95"
          title="Open Free Resource Vault Side Panel"
        >
          <BookOpen className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
          <span className="[writing-mode:vertical-rl] tracking-wider text-[10px] font-black uppercase py-0.5">
            Resources
          </span>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        </button>
      </div>

      {/* Master AI Checklist Side Drawer Sheet */}
      <MasterChecklistDrawer
        isOpen={isChecklistDrawerOpen}
        onClose={() => setIsChecklistDrawerOpen(false)}
        checkedIds={verbatimCheckedIds}
        onToggleItem={handleToggleVerbatimItem}
        onResetAll={handleResetVerbatimChecklist}
      />

      {/* Free Resource Vault Side Drawer */}
      <ResourceVaultDrawer
        isOpen={isResourceDrawerOpen}
        onClose={() => {
          setIsResourceDrawerOpen(false);
          setSelectedStageForVault(undefined);
        }}
        initialFilter={resourceDrawerFilter}
        selectedStageId={selectedStageForVault}
      />

    </div>
  );
};

export default App;
