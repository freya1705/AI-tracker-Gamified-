export type TaskCategory = 
  | 'aiml' 
  | 'dsa' 
  | 'routine' 
  | 'after_studies' 
  | 'project' 
  | 'college' 
  | 'deadline';

export type TaskPriority = 'low' | 'medium' | 'high';
export type DayMode = 'busy' | 'normal' | 'free';
export type CompanionMood = 'happy' | 'excited' | 'sleepy' | 'proud' | 'encouraging';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  topic?: string;
  xp: number;
  completed: boolean;
  completedAt?: string;
  dueDate?: string;
  priority: TaskPriority;
  notes?: string;
  resourceLink?: string;
  estimatedMinutes?: number;
  dayTag?: string;
  dayModeMatch?: DayMode[];
  isCompulsory?: boolean;
}

export interface Accessory {
  id: string;
  name: string;
  icon: string;
  minLevel: number;
  description: string;
  type: 'head' | 'aura' | 'badge' | 'held';
}

export type CareerTier = 
  | 'student'          // 2026: Student -> AI/CS foundation + builder (Target: ₹20-50L placement)
  | 'swe_builder'      // 2027: Engineer -> AI practitioner + internships + serious projects
  | 'ai_engineer'      // 2028: Graduate -> High-value AI engineer + network
  | 'ai_powered_eng';  // 2029-32+: AI-Powered Engineer / Founder -> Real products, company, arena

export interface DualProgressData {
  // Knowledge progress bars (0-100%)
  knowledge: {
    foundation: number;
    ml: number;
    dl: number;
    llm: number;
    rag: number;
    agents: number;
    deployment: number;
  };
  // Build power progress bars (count or %)
  buildPower: {
    tinyProjects: number;     // Target 5
    mlProjects: number;       // Target 3
    dlProjects: number;       // Target 2
    llmApps: number;          // Target 2
    ragSystems: number;       // Target 1
    agents: number;           // Target 1
    deployedSystems: number;  // Target 1
    flagshipProgress: number; // 0-100%
  };
}

export interface UserStats {
  characterName: string;
  mood: CompanionMood;
  level: number; // 0 to 13 AI Hero Levels
  heroLevelTitle: string; // e.g. "Data Explorer", "ML Builder", "AI HERO"
  currentXP: number;
  nextLevelXP: number;
  totalXPEarned: number;
  streakDays: number;
  lastActiveDate: string;
  tasksCompletedToday: number;
  equippedAccessoryId: string;
  unlockedAccessories: string[];
  soundEnabled: boolean;
  dailyMode: DayMode;
  careerTier: CareerTier;
  currentDayNumber: number; // e.g. Day 1, Day 2 ... Day 300
  dualProgress: DualProgressData;
}

// Daily AI Hero Missions (A through F)
export interface DailyAiHeroMission {
  dayNumber: number;
  dateStr: string; // e.g. '2026-09-25'
  worldName: string; // e.g. 'WORLD 1 — Data'
  concept: string; // Mission A - Learn
  understandPrompt: string; // Mission B - Understand
  codeTask: string; // Mission C - Code
  buildTask: string; // Mission D - Build
  recordNotes: string; // Mission E - Record
  bossQuestion?: string;
  isBossBattle?: boolean;
  bossTitle?: string;
  projectMilestone?: string;
  completedMissions: {
    learn: boolean;
    understand: boolean;
    code: boolean;
    build: boolean;
    record: boolean;
    ship: boolean;
  };
}

// Master Daily System Structure
export interface MasterDailyState {
  date: string;
  dayNumber: number;
  // 1. Morning Foundation
  morning: {
    darshanAarti: boolean;
    lemonWater: boolean;
    poojaAudio: boolean;
    prapti: boolean;
    vachanabook: boolean;
    cleanDesh: boolean;
    planDay: boolean;
  };
  // 2. Core Engineering (DSA)
  dsa: {
    topic: string;
    concept: boolean;
    videoLecture: boolean;
    codingBook: boolean;
    makeNotes: boolean;
    lc1: boolean;
    lc2: boolean;
    lc3: boolean;
    lc4: boolean;
    dryRuns: boolean;
    commitCode: boolean;
  };
  // 3. AI Learning + Building (Missions A–F)
  aiMission: DailyAiHeroMission;
  // 4. Project Milestone (Daily)
  project: {
    milestone: string;
    implement: boolean;
    test: boolean;
    commit: boolean;
    push: boolean;
  };
  // 5. After-Study Life Rotation
  life: {
    selected: string[];   // Pick 2-3 for today
    completed: string[];  // Checked off
  };
  // 6. Evening Close (5-min shutdown)
  evening: {
    completedText: string;
    learnedText: string;
    builtText: string;
    githubCommitted: boolean;
    tomorrowTop1: string;
    weeklyGrowth: string; // "What can I build this week that I couldn't last week?"
    isClosed: boolean;
  };
}

export interface CalendarDayInfo {
  date: string; // YYYY-MM-DD
  dayNumber: number;
  title: string;
  world: string;
  concept: string;
  build: string;
  isBossBattle: boolean;
  bossTitle?: string;
  levelUnlock?: string;
  projectMilestone?: string;
}

export interface RoadmapStep {
  stepNum: number;
  title: string;
  duration: string;
  simpleWords: string;
  why: string;
  learnFrom: { source: string; study: string; dontStudyYet: string }[];
  checklist: string[];
  practice?: string;
  build: string;
  moveOnWhen: string;
  patientTriageConnection?: string;
}

export interface RealWorldProblem {
  domain: string;
  example: string;
  likelyVerdict: string;
  whyVerdict: string;
}

export interface AiJournalEntry {
  id: string;
  category: 'fundamentals' | 'news' | 'paper' | 'tools' | 'startup_ideas' | 'india' | 'business_models' | 'experiments';
  title: string;
  content: string;
  date: string;
}

// Master Syllabus Types
export interface SyllabusTopic {
  id: string;
  title: string;
  moduleIndex: number;
  moduleName: string;
  category: 'ai' | 'swe';
  subgroup?: string;
  suggestedCodeTask?: string;
  suggestedUnderstandPrompt?: string;
  whyItMatters?: string;
}

export interface SyllabusModule {
  index: number;
  id: string;
  title: string;
  category: 'ai' | 'swe';
  icon: string;
  description: string;
  approxTime?: string;
  minWeeks?: number;
  maxWeeks?: number;
  isOngoing?: boolean;
  stageNote?: string;
  topics: SyllabusTopic[];
}

export interface SwePillar {
  id: string;
  stepNumber: number;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  cardinalRule: string;
  topics: SyllabusTopic[];
}
