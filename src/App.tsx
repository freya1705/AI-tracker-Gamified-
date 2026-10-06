import React, { useState, useEffect } from 'react';
import { Task, UserStats, MasterDailyState, AiJournalEntry, CalendarDayInfo, SyllabusTopic } from './types';
import { ACCESSORIES, INITIAL_TASKS, DEFAULT_MASTER_DAILY, INITIAL_JOURNAL_ENTRIES } from './data/initialData';
import { INITIAL_DUAL_PROGRESS } from './data/heroData';
import { CompanionAvatar } from './components/CompanionAvatar';
import { FreyaCharacter } from './components/FreyaCompanion/FreyaCharacter';
import { WorldHeader, ActiveRealm } from './components/RPG/WorldHeader';
import { QuestSceneToday } from './components/RPG/QuestSceneToday';
import { AdventureMapMaster } from './components/RPG/AdventureMapMaster';
import { RoadmapHorizon } from './components/RPG/RoadmapHorizon';
import { KnowledgeLibrary } from './components/RPG/KnowledgeLibrary';
import { QuestBoardView } from './components/RPG/QuestBoardView';
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
import { PlacementRoadmapDrawer } from './components/PlacementRoadmapDrawer';
import { TOTAL_VERBATIM_ITEMS } from './data/verbatimChecklistData';
import { sounds } from './utils/audio';
import confetti from 'canvas-confetti';
import { 
  Plus, Search, Compass, Lightbulb, FileText, 
  Sparkles, CheckCircle2, Clock, Filter, BookOpen, 
  Flame, Award, Layers, Zap, Heart, Trophy, LayoutDashboard, ListTodo, Calendar, Crown, RotateCcw,
  CheckSquare, Brain, Target
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

  // Active top-level world realm
  const [activeRealm, setActiveRealm] = useState<ActiveRealm>('today');
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

  const handleNavigateToWorld = (realm: any, subTab?: string) => {
    sounds.playClick();
    if (realm === 'daily_system' || realm === 'today') {
      setActiveRealm('today');
    } else if (realm === 'master') {
      setActiveRealm('master');
      if (subTab) {
        setMasterSubTab(subTab);
      }
    } else if (realm === 'roadmap') {
      setActiveRealm('roadmap');
    } else if (realm === 'resources') {
      setActiveRealm('resources');
    } else if (realm === 'quests') {
      setActiveRealm('quests');
    } else if (realm === 'calendar') {
      setActiveRealm('calendar');
    } else {
      setActiveRealm(realm as ActiveRealm);
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
  const [isPlacementDrawerOpen, setIsPlacementDrawerOpen] = useState(false);
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

  const handleRestartDailyRoutine = () => {
    // 1. Reset daily routine items only (Morning Foundation, Life Rotation, Evening close)
    setDaily(prev => ({
      ...prev,
      morning: {
        darshanAarti: false,
        lemonWater: false,
        poojaAudio: false,
        prapti: false,
        vachanabook: false,
        cleanDesh: false,
        planDay: false,
      },
      life: {
        ...prev.life,
        completed: [],
      },
      evening: {
        completedText: '',
        learnedText: '',
        builtText: '',
        githubCommitted: false,
        tomorrowTop1: prev.evening?.tomorrowTop1 || '',
        weeklyGrowth: prev.evening?.weeklyGrowth || '',
        isClosed: false,
      },
      // IMPORTANT: prev.aiMission, prev.dsa, prev.project are 100% PRESERVED! Not unmarking studies, AI, or DSA!
    }));

    // 2. Unmark only routine tasks in tasks list (leaving aiml, dsa, project, college intact)
    setTasks(prev => prev.map(t => {
      if (t.category === 'routine') {
        return { ...t, completed: false };
      }
      return t;
    }));

    // 3. User stats, XP, level, completedSyllabusTopicIds, verbatimCheckedIds are 100% PRESERVED!
    setIsResetConfirmOpen(false);

    sounds.playTaskComplete();
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
    handleTriggerReaction("🌅 Routine restarted for today! Morning Camp & habits are clean, while your AI, DSA & study marks are 100% preserved!", 'happy');
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
    setActiveRealm('today');
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
      setActiveRealm('today');
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
      setActiveRealm('today');
      handleTriggerReaction(`Loaded "${topic.title}" into DSA / SWE Stack! 4 LeetCodes + Dry Runs mode! ⚡`, 'proud', 25);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b]/60 via-[#0d0d1a] to-[#080811] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-900">
      
      {/* 1. World RPG Top Navigation Header */}
      <WorldHeader
        activeRealm={activeRealm}
        onSelectRealm={(realm) => {
          sounds.playClick();
          setActiveRealm(realm);
        }}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onOpenSatchel={() => setIsQuickAccessOpen(true)}
        onOpenPlacementDrawer={() => setIsPlacementDrawerOpen(true)}
        stats={stats}
      />

      {/* Main Adventure Realm Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-6">
        
        {/* ========================================================= */}
        {/* REALM 1: 🌱 TODAY (Quest Scene & Living Freya) */}
        {/* ========================================================= */}
        {activeRealm === 'today' && (
          <QuestSceneToday
            stats={stats}
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
            onRestartDailyRoutine={handleRestartDailyRoutine}
            onOpenResetConfirm={() => setIsResetConfirmOpen(true)}
            onUpdateStats={(newStats) => setStats(prev => ({ ...prev, ...newStats }))}
            speechOverride={speechOverride}
            floatingXP={floatingXP}
            onSelectRealm={(realm) => handleNavigateToWorld(realm)}
          />
        )}

        {/* ========================================================= */}
        {/* REALM 2: 🗺️ MASTER (Adventure Map & World Landmarks) */}
        {/* ========================================================= */}
        {activeRealm === 'master' && (
          <AdventureMapMaster
            stats={stats}
            daily={daily}
            tasks={tasks}
            completedTopicIds={completedSyllabusTopicIds}
            verbatimCheckedIds={verbatimCheckedIds}
            journalEntries={journalEntries}
            onToggleTopic={handleToggleSyllabusTopic}
            onLoadTopicIntoDaily={handleLoadSyllabusTopicIntoDaily}
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
            onSelectRealm={(realm) => handleNavigateToWorld(realm)}
          />
        )}

        {/* ========================================================= */}
        {/* REALM 3: 👑 ROADMAP (The Road to AI Founder) */}
        {/* ========================================================= */}
        {activeRealm === 'roadmap' && (
          <RoadmapHorizon
            stats={stats}
            journalEntries={journalEntries}
            onAddJournalEntry={handleAddJournalEntry}
            onOpenFounderRoadmapModal={() => {
              sounds.playClick();
              setIsFounderRoadmapOpen(true);
            }}
            onOpenRoadmapModal={() => {
              sounds.playClick();
              setIsRoadmapOpen(true);
            }}
            onOpenPlacementDrawer={() => setIsPlacementDrawerOpen(true)}
          />
        )}

        {/* ========================================================= */}
        {/* REALM 4: 📚 RESOURCES (Knowledge Codex & Library) */}
        {/* ========================================================= */}
        {activeRealm === 'resources' && (
          <KnowledgeLibrary
            onOpenProblemSheet={() => {
              sounds.playClick();
              setIsProblemOpen(true);
            }}
            onOpenOriginalNote={() => {
              sounds.playClick();
              setIsPhotoOpen(true);
            }}
            onOpenRoadmap={() => {
              sounds.playClick();
              setIsRoadmapOpen(true);
            }}
            onOpenFounderRoadmap={() => {
              sounds.playClick();
              setIsFounderRoadmapOpen(true);
            }}
          />
        )}

        {/* ========================================================= */}
        {/* REALM 5: 📜 QUESTS (Adventurer's Quest Board) */}
        {/* ========================================================= */}
        {activeRealm === 'quests' && (
          <QuestBoardView
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            onOpenAddTask={() => {
              sounds.playClick();
              setIsTaskModalOpen(true);
            }}
          />
        )}

        {/* ========================================================= */}
        {/* REALM 6: 📅 CALENDAR (180-Day Expedition Timeline) */}
        {/* ========================================================= */}
        {activeRealm === 'calendar' && (
          <AdventureMapMaster
            stats={stats}
            daily={daily}
            tasks={tasks}
            completedTopicIds={completedSyllabusTopicIds}
            verbatimCheckedIds={verbatimCheckedIds}
            journalEntries={journalEntries}
            onToggleTopic={handleToggleSyllabusTopic}
            onLoadTopicIntoDaily={handleLoadSyllabusTopicIntoDaily}
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
            initialSubTab="calendar"
            onSelectRealm={(realm) => handleNavigateToWorld(realm)}
          />
        )}

      </main>

      {/* Adventurer's Satchel (Quick Access Drawer) */}
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
        onOpenRoadmap={() => handleNavigateToWorld('roadmap')}
        onOpenFounderRoadmap={() => setIsFounderRoadmapOpen(true)}
        onOpenCalendar={() => handleNavigateToWorld('calendar')}
        onOpenAddTask={() => setIsTaskModalOpen(true)}
        onOpenResetConfirm={() => setIsResetConfirmOpen(true)}
        onRestartDailyRoutine={handleRestartDailyRoutine}
        onOpenAfterStudies={() => {
          setActiveRealm('today');
          setTimeout(() => {
            document.getElementById('after-studies-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
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
        onOpenPlacementRoadmap={() => setIsPlacementDrawerOpen(true)}
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
        onOpenPlacementRoadmap={() => setIsPlacementDrawerOpen(true)}
        onOpenProblemSheet={() => setIsProblemOpen(true)}
        onOpenOriginalNote={() => setIsPhotoOpen(true)}
        onOpenTimer={() => setIsTimerOpen(true)}
        onOpenWardrobe={() => setIsWardrobeOpen(true)}
        onOpenResetConfirm={() => setIsResetConfirmOpen(true)}
        onRestartDailyRoutine={handleRestartDailyRoutine}
        onOpenAddTask={() => setIsTaskModalOpen(true)}
        tasks={tasks}
      />

      {/* Footer Encouragement Banner */}
      <footer className="mt-auto border-t border-purple-500/20 bg-[#120f26]/80 backdrop-blur-md py-4 px-6 text-center text-xs text-purple-300">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-200">Freya's Daily Law:</span>
            <span>Finish Morning Foundation → Core Engineering (DSA + AI) → Commit Code → Life Rotation</span>
          </div>
          <div className="text-amber-300 font-semibold flex items-center gap-1">
            <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
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

      {/* Reset / Restart Day Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#1e1b4b] text-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-purple-500/30 flex flex-col gap-4 text-center animate-scale-up">
            
            {/* Header Icon & Title */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center text-2xl border border-amber-300/30 shadow-inner">
                🌅
              </div>
              <div className="text-left">
                <h3 className="text-lg font-black text-amber-100 font-display">
                  Restart Your Day
                </h3>
                <p className="text-xs text-purple-200/80">
                  Today is {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}. Choose how you want to reset:
                </p>
              </div>
            </div>

            {/* Option 1: RECOMMENDED - Routine Restart (Keeps Studies, AI & DSA Safe) */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/50 via-purple-950/40 to-slate-900 border-2 border-emerald-500/60 text-left space-y-2.5 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  <h4 className="text-sm font-black text-emerald-300 font-display">
                    Option 1: Restart Today's Routine (Recommended)
                  </h4>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Studies Protected 🛡️
                </span>
              </div>

              <p className="text-xs text-purple-100/90 leading-relaxed">
                Cleans your routine habits for today so you can restart fresh, without unmarking any of your hard-earned study progress!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <span>🔄</span>
                    <span>What Gets Reset for Today:</span>
                  </span>
                  <ul className="text-purple-200/80 space-y-0.5 pl-3 list-disc">
                    <li>Morning Camp Checklist (0/7)</li>
                    <li>Life Oasis completed rotation</li>
                    <li>Evening close reflection</li>
                    <li>Daily routine tasks</li>
                  </ul>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 space-y-1">
                  <span className="font-bold text-emerald-300 flex items-center gap-1">
                    <span>🛡️</span>
                    <span>Kept 100% Safe (Not Unmarked):</span>
                  </span>
                  <ul className="text-emerald-100 space-y-0.5 pl-3 list-disc">
                    <li>AI Missions (Learn, Code, Build, Ship)</li>
                    <li>DSA Stack & LeetCode marks</li>
                    <li>17 Stages & 9 Pillars topics</li>
                    <li>0–29 Verbatim checklist & XP</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleRestartDailyRoutine}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 transition cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <span>🌅 Restart Today's Routine (Keep Studies Safe)</span>
              </button>
            </div>

            {/* Option 2: Nuclear / Hard Reset from Zero */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-black text-rose-300 flex items-center gap-1.5">
                  <span>⚠️</span>
                  <span>Option 2: Hard Reset Everything (Day 1)</span>
                </h4>
                <p className="text-[11px] text-purple-300/70 mt-0.5">
                  Nuclear reset. Clears all XP, syllabus topics, and returns to absolute Day 1 factory zero.
                </p>
              </div>

              <button
                onClick={handleConfirmReset}
                className="py-1.5 px-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/30 text-xs font-bold transition cursor-pointer whitespace-nowrap active:scale-95 shrink-0"
              >
                Full Hard Reset
              </button>
            </div>

            {/* Cancel Button */}
            <button
              onClick={() => setIsResetConfirmOpen(false)}
              className="w-full py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300 font-bold text-xs border border-white/10 transition cursor-pointer"
            >
              Cancel
            </button>
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
        {/* 3. 36-Week Placement Roadmap Button */}
        <button
          onClick={() => {
            sounds.playClick();
            setIsPlacementDrawerOpen(true);
          }}
          className="bg-gradient-to-b from-amber-500 via-orange-600 to-amber-800 text-slate-950 font-black text-xs py-3.5 px-2 rounded-l-2xl shadow-2xl hover:px-2.5 transition-all flex flex-col items-center gap-1.5 group cursor-pointer border-t border-b border-l border-amber-300/40 active:scale-95"
          title="Open 36-Week Placement Roadmap & Weekly Engine Side Sheet"
        >
          <Target className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
          <span className="[writing-mode:vertical-rl] tracking-wider text-[10px] font-black uppercase py-0.5">
            36-Wk Plan
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 border border-slate-900 animate-pulse" />
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

      {/* 36-Week Placement Roadmap Side Drawer */}
      <PlacementRoadmapDrawer
        isOpen={isPlacementDrawerOpen}
        onClose={() => setIsPlacementDrawerOpen(false)}
      />

    </div>
  );
};

export default App;
