import React, { useState } from 'react';
import { UserStats, MasterDailyState, SyllabusTopic } from '../../types';
import { LIFE_ROTATION_OPTIONS, ACCESSORIES, SPEECH_MESSAGES } from '../../data/initialData';
import { getBestResourceForTopic } from '../../data/resourceData';
import { FreyaCharacter, CharacterState } from '../FreyaCompanion/FreyaCharacter';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, Circle, Sparkles, ExternalLink, ArrowRight, 
  ChevronDown, ChevronUp, Flame, Zap, Compass, BookOpen, Clock,
  CheckSquare, Moon, Trophy, Coffee, Rocket, Backpack, Shield, Crown, Map
} from 'lucide-react';

interface QuestSceneTodayProps {
  stats: UserStats;
  daily: MasterDailyState;
  onUpdateDaily: (updater: (prev: MasterDailyState) => MasterDailyState) => void;
  onTriggerReaction: (speech: string, mood: any, earnedXP?: number) => void;
  characterName: string;
  onOpenTopicPicker?: (mode: 'ai' | 'swe') => void;
  onOpenResources?: (stageId?: string) => void;
  onOpenWardrobe: () => void;
  onOpenTimer: () => void;
  onOpenFounderRoadmap: () => void;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
  speechOverride?: string | null;
  floatingXP?: number | null;
  onSelectRealm: (realm: 'today' | 'master' | 'roadmap' | 'resources' | 'quests') => void;
  onRestartDailyRoutine?: () => void;
  onOpenResetConfirm?: () => void;
}

export const QuestSceneToday: React.FC<QuestSceneTodayProps> = ({
  stats,
  daily,
  onUpdateDaily,
  onTriggerReaction,
  characterName,
  onOpenTopicPicker,
  onOpenResources,
  onOpenWardrobe,
  onOpenTimer,
  onOpenFounderRoadmap,
  onUpdateStats,
  speechOverride,
  floatingXP = null,
  onSelectRealm,
  onRestartDailyRoutine,
  onOpenResetConfirm,
}) => {
  const [isCampExpanded, setIsCampExpanded] = useState<boolean>(false);
  const [isDsaExpanded, setIsDsaExpanded] = useState<boolean>(true);
  const [isAiLabExpanded, setIsAiLabExpanded] = useState<boolean>(true);
  const [isLifeExpanded, setIsLifeExpanded] = useState<boolean>(true);
  const [isForgeExpanded, setIsForgeExpanded] = useState<boolean>(false);
  const [isTwilightExpanded, setIsTwilightExpanded] = useState<boolean>(false);
  const [isModeGuidanceOpen, setIsModeGuidanceOpen] = useState<boolean>(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const [pokeCount, setPokeCount] = useState(0);

  // Fallbacks
  const morning = daily?.morning || {
    darshanAarti: false,
    lemonWater: false,
    poojaAudio: false,
    prapti: false,
    vachanabook: false,
    cleanDesh: false,
    planDay: false,
  };

  const dsa = daily?.dsa || {
    topic: 'Graphs: Adjacency List & BFS / DFS Patterns',
    concept: false,
    videoLecture: false,
    codingBook: false,
    makeNotes: false,
    lc1: false,
    lc2: false,
    lc3: false,
    lc4: false,
    dryRuns: false,
    commitCode: false,
  };

  const aiMission = daily?.aiMission || {
    dayNumber: 1,
    dateStr: new Date().toISOString().split('T')[0],
    worldName: 'WORLD 1 — Data',
    concept: 'NumPy Vectorization & Matrix Math',
    understandPrompt: 'Explain broadcasting in your own words.',
    codeTask: 'Vectorized Euclidean distance function.',
    buildTask: 'Benchmark vectorized vs looped distance.',
    recordNotes: '',
    completedMissions: {
      learn: false,
      understand: false,
      code: false,
      build: false,
      record: false,
      ship: false,
    },
  };

  const completedAiMissions = aiMission.completedMissions || {
    learn: false,
    understand: false,
    code: false,
    build: false,
    record: false,
    ship: false,
  };

  const project = daily?.project || {
    milestone: '',
    implement: false,
    test: false,
    commit: false,
    push: false,
  };

  const life = {
    selected: Array.isArray(daily?.life?.selected) ? daily.life.selected : [],
    completed: Array.isArray(daily?.life?.completed) ? daily.life.completed : [],
  };

  const evening = daily?.evening || {
    completedText: '',
    learnedText: '',
    builtText: '',
    githubCommitted: false,
    tomorrowTop1: '',
    weeklyGrowth: '',
    isClosed: false,
  };

  const morningKeys = Object.keys(morning) as (keyof typeof morning)[];
  const morningDoneCount = morningKeys.filter(k => morning[k]).length;

  const dsaChecklistItems = [
    { key: 'concept', label: '1 Concept' },
    { key: 'videoLecture', label: 'Lecture' },
    { key: 'codingBook', label: 'Book' },
    { key: 'makeNotes', label: 'Notes' },
    { key: 'lc1', label: 'LC #1' },
    { key: 'lc2', label: 'LC #2' },
    { key: 'lc3', label: 'LC #3' },
    { key: 'lc4', label: 'LC #4' },
    { key: 'dryRuns', label: 'Dry Runs' },
    { key: 'commitCode', label: 'Commit' },
  ] as const;
  const dsaDoneCount = dsaChecklistItems.filter(i => (dsa as any)[i.key]).length;
  const dsaResource = dsa.topic ? getBestResourceForTopic(dsa.topic, 'swe-dsa') : null;

  const aiMissionsDoneCount = Object.values(completedAiMissions).filter(Boolean).length;
  const aiBestResource = aiMission?.concept ? getBestResourceForTopic(aiMission.concept, 'ai-stage-1') : null;

  // Visual 6-Step Quest Path
  const missionsList = [
    { key: 'learn', letter: 'A', name: 'LEARN', subtitle: 'Study concept', desc: aiMission?.concept || 'One concept from main resource', icon: '🌱' },
    { key: 'understand', letter: 'B', name: 'UNDERSTAND', subtitle: 'Explain aloud', desc: aiMission?.understandPrompt || 'Explain it in your own words without notes', icon: '🧠' },
    { key: 'code', letter: 'C', name: 'CODE', subtitle: 'From scratch', desc: aiMission?.codeTask || 'Actually implement / use it from scratch in Python', icon: '💻' },
    { key: 'build', letter: 'D', name: 'BUILD', subtitle: 'Mini script', desc: aiMission?.buildTask || 'Use today concept in something small and runnable', icon: '🛠️' },
    { key: 'record', letter: 'E', name: 'RECORD', subtitle: 'Journal note', desc: aiMission?.recordNotes || 'Write what learned, what confused, and next step', icon: '📝' },
    { key: 'ship', letter: 'F', name: 'SHIP', subtitle: 'Git push', desc: 'Push & Commit to GitHub (Proof of work)', icon: '🚀' },
  ] as const;

  // Current active node
  const activeMissionIndex = missionsList.findIndex(m => !(completedAiMissions as any)[m.key]);
  const currentActiveMission = activeMissionIndex !== -1 ? missionsList[activeMissionIndex] : null;

  // Character speech & interaction
  const [currentSpeech, setCurrentSpeech] = useState<string>("Ready for today's quest, Freya? ☀️");

  React.useEffect(() => {
    if (speechOverride) {
      setCurrentSpeech(speechOverride);
      return;
    }
    const pool = SPEECH_MESSAGES[stats.mood] || SPEECH_MESSAGES.idle;
    const randomMsg = pool[Math.floor(Math.random() * pool.length)];
    setCurrentSpeech(randomMsg);
  }, [stats.mood, speechOverride]);

  const handlePokeCharacter = () => {
    sounds.playPoke();
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 600);
    setPokeCount(prev => prev + 1);

    const cutePokes = [
      "Ready for today's tiny win? ☀️",
      "One concept at a time. Never zero days! 🌱",
      "You didn't just study AI today. You BUILT with it. 💻",
      "Only 20 minutes needed to start. Let's go! ⏱️",
      "Pattern recognized! PatientTriage is leveling up! 🚀",
      "Have you had your morning lemon water yet? 🍋",
      "Consistency beats cramming every single time. ✨"
    ];
    setCurrentSpeech(cutePokes[pokeCount % cutePokes.length]);
  };

  const handleToggleMorning = (key: keyof typeof morning, e: React.MouseEvent) => {
    sounds.playClick();
    const willBeChecked = !morning[key];
    if (willBeChecked) {
      sounds.playTaskComplete();
      confetti({ particleCount: 30, spread: 50, origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } });
    }

    onUpdateDaily(prev => ({
      ...prev,
      morning: { ...(prev.morning || morning), [key]: willBeChecked }
    }));

    if (willBeChecked) {
      onTriggerReaction("Morning camp milestone completed! Mind and energy prepared. 🌅", 'happy', 15);
    }
  };

  const handleToggleDsa = (key: string, e: React.MouseEvent) => {
    sounds.playClick();
    const willBeChecked = !(dsa as any)[key];
    if (willBeChecked) {
      sounds.playTaskComplete();
      confetti({ particleCount: 35, spread: 55, origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } });
    }

    onUpdateDaily(prev => ({
      ...prev,
      dsa: { ...(prev.dsa || dsa), [key]: willBeChecked }
    }));

    if (willBeChecked) {
      onTriggerReaction("DSA landmark conquered! Algorithm pattern compounding. ⚡", 'proud', 25);
    }
  };

  const handleCompleteCurrentMission = (missionKey: string) => {
    sounds.playLevelUp();
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });

    onUpdateDaily(prev => ({
      ...prev,
      aiMission: {
        ...(prev.aiMission || aiMission),
        completedMissions: {
          ...(prev.aiMission?.completedMissions || completedAiMissions),
          [missionKey]: true,
        }
      }
    }));

    if (missionKey === 'ship') {
      onTriggerReaction("SHIPPED TO PRODUCTION! Day proof of work recorded! 🚀", 'excited', 50);
    } else {
      onTriggerReaction(`Quest Node "${missionKey.toUpperCase()}" completed! +50 XP! ✨`, 'happy', 50);
    }
  };

  const handleToggleLifeItem = (id: string) => {
    sounds.playClick();
    const willBeCompleted = !life.completed.includes(id);
    if (willBeCompleted) sounds.playTaskComplete();

    onUpdateDaily(prev => {
      const currentSelected = Array.isArray(prev.life?.selected) ? prev.life.selected : life.selected;
      const currentCompleted = Array.isArray(prev.life?.completed) ? prev.life.completed : life.completed;
      const newCompleted = willBeCompleted
        ? [...currentCompleted, id]
        : currentCompleted.filter(item => item !== id);
      const newSelected = (willBeCompleted && !currentSelected.includes(id))
        ? [...currentSelected, id]
        : currentSelected;
      return { ...prev, life: { selected: newSelected, completed: newCompleted } };
    });

    if (willBeCompleted) {
      onTriggerReaction(`Completed ${id}! Creative & life balance recharged. 🌿`, 'happy', 20);
    }
  };

  const handleCloseDay = () => {
    sounds.playLevelUp();
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    onUpdateDaily(prev => ({
      ...prev,
      evening: { ...(prev.evening || evening), isClosed: true }
    }));
    onTriggerReaction("Day completed and banked! Great job today, Freya. 🌙", 'proud', 100);
  };

  const equippedAccessory = ACCESSORIES.find(a => a.id === stats.equippedAccessoryId) || ACCESSORIES[0];

  const modes = [
    { id: 'busy' as const, label: '🌙 QUICK QUEST', sub: 'Busy Day · 20–45m', desc: '1 small concept + 1 problem + 1 commit' },
    { id: 'normal' as const, label: '☀️ NORMAL ADVENTURE', sub: 'Normal Day · 1.5–2.5h', desc: 'Full learning, scratch code, and project milestone' },
    { id: 'free' as const, label: '🚀 FULL EXPEDITION', sub: 'Weekend/Free · 4–6h', desc: 'Deep dive, benchmark models, ship major feature' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 mb-16 animate-fade-in">
      
      {/* ========================================================= */}
      {/* 🏰 FREYA IN TODAY'S SCENE: CHARACTER + QUEST HERO */}
      {/* ========================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e1b4b] via-[#2e1065] to-[#0f172a] text-white border border-purple-500/30 p-5 sm:p-7 shadow-2xl">
        
        {/* Atmospheric ambient lighting & particles */}
        <div className="absolute top-2 left-6 text-amber-300 opacity-40 select-none text-xl animate-float-slow pointer-events-none">✨</div>
        <div className="absolute bottom-4 right-8 text-purple-400 opacity-20 select-none text-3xl animate-bounce-subtle pointer-events-none">⭐</div>
        <div className="absolute top-1/2 right-1/4 text-emerald-400 opacity-25 select-none text-base animate-pulse pointer-events-none">🌱</div>

        {/* Floating XP Animation Popup */}
        {floatingXP !== null && (
          <div className="absolute top-3 right-1/2 translate-x-1/2 z-30 animate-bounce pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-300/50 flex items-center gap-1.5 border border-amber-200">
              <Sparkles className="w-4 h-4 fill-amber-300" />
              +{floatingXP} XP ✨
            </span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          
          {/* Character Living Companion in Scene */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative">
              {/* Magic Aura Ring */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-amber-400/30 via-purple-500/30 to-indigo-500/30 blur-md animate-pulse" />
              <FreyaCharacter
                size="md"
                state={completedAiMissions.ship ? 'complete' : stats.mood === 'excited' ? 'levelUp' : stats.mood === 'proud' ? 'streak' : 'idle'}
                equippedAccessory={equippedAccessory}
                onPoke={handlePokeCharacter}
                isWiggling={isWiggling}
              />
            </div>

            <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-purple-200">
              <button
                onClick={handlePokeCharacter}
                className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>👉 Poke</span>
              </button>
              <span>•</span>
              <button
                onClick={onOpenWardrobe}
                className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{equippedAccessory.icon} Dress Up</span>
              </button>
            </div>
          </div>

          {/* Dialogue & Scene Narrative */}
          <div className="flex-1 w-full min-w-0">
            
            {/* Location Banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  Day {daily.dayNumber} · {characterName} · {aiMission.worldName || 'World 1 — Data'}
                </span>
                <span className="text-xs font-bold text-purple-200">
                  {aiMissionsDoneCount}/6 Missions Shipped
                </span>
              </div>

              {/* Action shortcuts */}
              <div className="flex items-center gap-1.5">
                {onRestartDailyRoutine && (
                  <button
                    onClick={onRestartDailyRoutine}
                    className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 font-bold text-xs rounded-xl border border-emerald-400/40 transition cursor-pointer flex items-center gap-1 active:scale-95"
                    title="Restart Morning Foundation & habits for today (AI, DSA & studies remain 100% safe)"
                  >
                    <span>🔄 Restart Routine</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsLifeExpanded(true);
                    setTimeout(() => {
                      document.getElementById('after-studies-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 font-bold text-xs rounded-xl border border-emerald-400/40 transition cursor-pointer flex items-center gap-1 active:scale-95"
                  title="Scroll to After Studies Routine (Flute, Harmonium, Gym, Mansi, Cheshta...)"
                >
                  <span>🌿 After Studies</span>
                </button>
                <button
                  onClick={() => onSelectRealm && onSelectRealm('master')}
                  className="px-2.5 py-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 font-bold text-xs rounded-xl border border-amber-300/30 transition cursor-pointer"
                  title="Explore The World Map"
                >
                  <Map className="w-3.5 h-3.5 inline mr-1 text-amber-300" />
                  <span className="hidden sm:inline">World Map</span>
                </button>
                <button
                  onClick={onOpenTimer}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-purple-200 font-bold text-xs rounded-xl border border-white/20 transition cursor-pointer"
                  title="Start 20m Focus Sprint"
                >
                  <Clock className="w-3.5 h-3.5 inline mr-1 text-amber-300" />
                  <span>20m Sprint</span>
                </button>
                <button
                  onClick={onOpenFounderRoadmap}
                  className="px-2.5 py-1 bg-purple-500/30 hover:bg-purple-500/40 text-purple-200 font-bold text-xs rounded-xl border border-purple-400/40 transition cursor-pointer"
                  title="View Founder Ladder"
                >
                  <Trophy className="w-3.5 h-3.5 inline mr-1 text-amber-300" />
                  <span className="hidden sm:inline">Career Ladder</span>
                </button>
              </div>
            </div>

            {/* Freya's Speech Parchment */}
            <div className="relative p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm shadow-inner mb-4">
              <p className="text-sm sm:text-base font-bold font-display text-amber-100 leading-snug">
                "{currentSpeech}"
              </p>
            </div>

            {/* Concept Hero Heading */}
            <div>
              <span className="text-[11px] font-black uppercase text-amber-300 tracking-wider">
                TODAY'S MAIN QUEST
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-display text-white mt-0.5">
                {aiMission.concept || 'AI Concept Mastery'}
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/90 mt-1 leading-relaxed">
                {aiMission.understandPrompt || 'Master the concept deeply, implement it from scratch, and ship proof of work.'}
              </p>
            </div>

            {/* 1-Click Study Link */}
            {aiBestResource && (
              <div className="mt-3 p-2.5 rounded-xl bg-purple-900/50 border border-purple-400/30 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-pulse" />
                  <span className="text-xs font-bold text-amber-200 truncate">
                    📖 Study Resource: {aiBestResource.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={aiBestResource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {onOpenResources && (
                    <button
                      onClick={() => onOpenResources()}
                      className="px-2.5 py-1 rounded-lg bg-purple-800 hover:bg-purple-700 text-purple-200 font-bold text-xs transition border border-purple-400/30 cursor-pointer"
                      title="Open Full 38+ Resource Vault"
                    >
                      Vault →
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ========================================================= */}
        {/* 🗺️ THE VISUAL QUEST PATH (6 CONNECTED NODES) */}
        {/* ========================================================= */}
        <div className="mt-6 pt-5 border-t border-purple-500/30">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-purple-300">
              Quest Progression Trail:
            </span>
            {onOpenTopicPicker && (
              <button
                type="button"
                onClick={() => onOpenTopicPicker('ai')}
                className="text-[11px] font-bold text-amber-300 hover:text-amber-200 transition cursor-pointer flex items-center gap-1"
              >
                <span>Switch Topic 🔄</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {missionsList.map((m, idx) => {
              const isCompleted = (completedAiMissions as any)[m.key];
              const isCurrent = activeMissionIndex === idx;

              return (
                <div
                  key={m.key}
                  className={`relative p-3 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                    isCompleted
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 shadow-sm'
                      : isCurrent
                      ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40 text-amber-100'
                      : 'bg-black/20 border-white/10 text-purple-300 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl select-none">{m.icon}</span>
                    <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-md ${
                      isCompleted ? 'bg-emerald-400 text-slate-950' : isCurrent ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-purple-300'
                    }`}>
                      {isCompleted ? '✓ Done' : isCurrent ? 'Active' : `Step ${m.letter}`}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-black font-display tracking-wide">
                      {m.name}
                    </h4>
                    <p className="text-[10px] opacity-80 line-clamp-1">
                      {m.subtitle}
                    </p>
                  </div>

                  {isCurrent ? (
                    <button
                      onClick={() => handleCompleteCurrentMission(m.key)}
                      className="w-full py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[11px] hover:from-amber-300 hover:to-amber-400 transition cursor-pointer shadow-md flex items-center justify-center gap-1 active:scale-95"
                    >
                      <Zap className="w-3 h-3 fill-slate-950" />
                      <span>Complete (+50 XP)</span>
                    </button>
                  ) : isCompleted ? (
                    <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <div className="text-[10px] text-purple-400/70 font-semibold">
                      Locked
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Current mission prompt highlight */}
          {currentActiveMission && (
            <div className="mt-4 p-3.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl select-none">{currentActiveMission.icon}</span>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
                    CURRENT CHALLENGE · MISSION {currentActiveMission.letter} ({currentActiveMission.name})
                  </span>
                  <p className="text-xs text-white font-medium mt-0.5">
                    {currentActiveMission.desc}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCompleteCurrentMission(currentActiveMission.key)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 font-black text-xs hover:scale-102 transition cursor-pointer shadow-lg shadow-amber-400/20 shrink-0 flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>Execute & Ship (+50 XP)</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ========================================================= */}
      {/* 🧭 ADVENTURE STAMINA / OPERATING MODE */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
            Adventure Stamina
          </span>
          <h3 className="text-sm font-black text-slate-800 font-display mt-0.5">
            Pacing for Today
          </h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto scrollbar-none">
          {modes.map(m => {
            const isSelected = stats.dailyMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  sounds.playClick();
                  onUpdateStats({ dailyMode: m.id });
                  if (m.id === 'busy') onTriggerReaction("Quick quest active! 20–45 mins. Never zero days!", 'sleepy');
                  else if (m.id === 'normal') onTriggerReaction("Normal adventure pacing! 1.5–2.5h solid building!", 'happy');
                  else onTriggerReaction("Full expedition! Deep dive mode unlocked!", 'excited');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <span>{m.label}</span>
                <span className="text-[10px] opacity-75 hidden md:inline ml-1">({m.sub.split('·')[1]?.trim()})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🏕️ MORNING CAMP (FOUNDATION PREPARATION) */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl p-4 sm:p-5 border border-amber-200/80 shadow-xs">
        <div 
          onClick={() => { sounds.playClick(); setIsCampExpanded(!isCampExpanded); }}
          className="flex items-center justify-between gap-2 cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl shadow-xs shrink-0">
              🏕️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-800 font-display">
                  Morning Camp — Expedition Preparation
                </h3>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  {morningDoneCount}/7 Prepared
                </span>
                {morningDoneCount === 7 && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Ready ✨
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Spiritual & mental clarity basecamp before engineering deep work.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onRestartDailyRoutine && (
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRestartDailyRoutine();
                }}
                className="text-xs font-bold text-amber-900 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-200 to-amber-300 hover:from-amber-300 hover:to-amber-400 border border-amber-400 transition cursor-pointer flex items-center gap-1 shadow-2xs active:scale-95"
                title="Restart Morning Foundation & habits for today while keeping all AI, DSA, and study progress marked"
              >
                <span>🔄 Restart Routine</span>
              </button>
            )}
            <button 
              type="button"
              className="text-xs font-bold text-amber-800 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>{isCampExpanded ? 'Pack Camp ↑' : 'Open Camp Checklist ↓'}</span>
            </button>
          </div>
        </div>

        {isCampExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-amber-100">
            {[
              { key: 'darshanAarti', label: 'Darshan / Aarti', icon: '🙏' },
              { key: 'lemonWater', label: 'Lemon water', icon: '🍋' },
              { key: 'poojaAudio', label: 'Pooja + audio', icon: '🎧' },
              { key: 'prapti', label: 'Write Prapti', icon: '✍️' },
              { key: 'vachanabook', label: 'Ahnik Vachanabook', icon: '📖' },
              { key: 'cleanDesh', label: 'Clean desh', icon: '🧹' },
              { key: 'planDay', label: 'Plan the day', icon: '📝' },
            ].map((item) => {
              const isChecked = (morning as any)[item.key];
              return (
                <button
                  key={item.key}
                  onClick={(e) => handleToggleMorning(item.key as any, e)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-amber-50/80 border-amber-300 text-amber-900 shadow-2xs font-bold'
                      : 'bg-white border-slate-200 hover:border-amber-300 text-slate-700'
                  }`}
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-amber-600 fill-amber-100 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                  )}
                  <span className="text-lg">{item.icon}</span>
                  <span className={`text-xs ${isChecked ? 'line-through opacity-70' : ''}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 🌲 MINI REALMS: DSA FOREST • AI LAB • LIFE OASIS */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        
        {/* 1. 🧠 DSA Forest Card */}
        <div 
          onClick={() => { sounds.playClick(); setIsDsaExpanded(!isDsaExpanded); }}
          className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
            isDsaExpanded ? 'bg-blue-50/80 border-blue-400 shadow-sm ring-2 ring-blue-400/20' : 'bg-white border-slate-200 hover:border-blue-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌲</span>
              <h4 className="text-xs font-black text-slate-900 font-display">
                DSA Forest Trail
              </h4>
            </div>
            <span className="text-xs font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {dsaDoneCount} / 10
            </span>
          </div>

          <div className="text-[11px] text-slate-600 font-medium truncate">
            {dsa.topic || 'Graphs BFS/DFS'}
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-blue-100 text-[10px] font-bold text-blue-700">
            <span>{isDsaExpanded ? 'Hide Trail ▲' : 'Open Trail Station ▼'}</span>
            <span className="text-slate-400">4 LeetCode</span>
          </div>
        </div>

        {/* 2. 🤖 AI Lab Card */}
        <div 
          onClick={() => { sounds.playClick(); setIsAiLabExpanded(!isAiLabExpanded); }}
          className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
            isAiLabExpanded ? 'bg-purple-50/80 border-purple-400 shadow-sm ring-2 ring-purple-400/20' : 'bg-white border-slate-200 hover:border-purple-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <h4 className="text-xs font-black text-slate-900 font-display">
                AI Lab & Missions
              </h4>
            </div>
            <span className="text-xs font-black px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
              {aiMissionsDoneCount} / 6
            </span>
          </div>

          <div className="text-[11px] text-slate-600 font-medium truncate">
            {aiMission.concept || 'AI Foundations'}
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-purple-100 text-[10px] font-bold text-purple-700">
            <span>{isAiLabExpanded ? 'Hide Lab ▲' : 'Open Lab Station ▼'}</span>
            <span className="text-slate-400">Missions A–F</span>
          </div>
        </div>

        {/* 3. 🌿 After Studies Routine Card */}
        <div 
          onClick={() => { 
            sounds.playClick(); 
            setIsLifeExpanded(!isLifeExpanded); 
            if (!isLifeExpanded) {
              setTimeout(() => {
                document.getElementById('after-studies-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }
          }}
          className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
            isLifeExpanded ? 'bg-emerald-50/80 border-emerald-400 shadow-sm ring-2 ring-emerald-400/20' : 'bg-white border-slate-200 hover:border-emerald-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌿</span>
              <h4 className="text-xs font-black text-slate-900 font-display">
                After Studies Routine
              </h4>
            </div>
            <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {life.completed.length} / {life.selected.length || LIFE_ROTATION_OPTIONS.length}
            </span>
          </div>

          <div className="text-[11px] text-slate-600 font-medium truncate">
            Flute, Gym, Harmonium, Mansi, Cheshta...
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-emerald-100 text-[10px] font-bold text-emerald-700">
            <span>{isLifeExpanded ? 'Hide After Studies ▲' : 'Open After Studies ▼'}</span>
            <span className="text-slate-400">11 Habits</span>
          </div>
        </div>
      </div>

      {/* Expanded 1: DSA Trail Detail Station */}
      {isDsaExpanded && (
        <section className="bg-white rounded-3xl p-5 border border-blue-200 shadow-sm animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-blue-100">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl select-none">🌲</span>
              <div>
                <h4 className="text-sm font-black text-slate-900 font-display">
                  DSA Forest — Coding Trail
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  Arrays → Strings → Linked Lists → Trees → Graphs → Dynamic Programming
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-1 sm:max-w-xs">
              <input
                type="text"
                placeholder="Topic (e.g. Graphs BFS/DFS)..."
                value={dsa.topic || ''}
                onChange={(e) => onUpdateDaily(prev => ({ ...prev, dsa: { ...(prev.dsa || dsa), topic: e.target.value } }))}
                className="flex-1 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/30 text-xs font-bold text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {onOpenTopicPicker && (
                <button
                  type="button"
                  onClick={() => onOpenTopicPicker('swe')}
                  className="px-2.5 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-900 text-xs font-bold cursor-pointer transition shrink-0"
                >
                  Pick Topic ⚡
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {dsaChecklistItems.map((item) => {
              const isChecked = (dsa as any)[item.key];
              const isLeetCode = item.key.startsWith('lc');
              return (
                <button
                  key={item.key}
                  onClick={(e) => handleToggleDsa(item.key, e)}
                  className={`p-2.5 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    isChecked
                      ? 'bg-blue-600 border-blue-700 text-white shadow-xs font-bold'
                      : isLeetCode
                      ? 'bg-blue-50/50 border-blue-200 hover:border-blue-400 text-blue-900'
                      : 'bg-slate-50 border-slate-200 hover:border-blue-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {isChecked ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Circle className="w-4 h-4 text-slate-300" />}
                    <span className="text-xs font-extrabold">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {dsaResource && (
            <div className="mt-3 p-2.5 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between gap-2 text-xs text-blue-950">
              <span className="truncate font-semibold text-xs">📖 Study Link: {dsaResource.name}</span>
              <a
                href={dsaResource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-xl bg-white text-blue-800 border border-blue-200 font-bold text-xs hover:bg-blue-100 transition shrink-0 flex items-center gap-1"
              >
                <span>Open Resource</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </section>
      )}

      {/* ========================================================= */}
      {/* 🛠️ FLAGSHIP FORGE (PATIENTTRIAGE V2) */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-200 shadow-xs">
        <div 
          onClick={() => { sounds.playClick(); setIsForgeExpanded(!isForgeExpanded); }}
          className="flex items-center justify-between gap-2 cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-lg shadow-xs shrink-0">
              🛠️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-800 font-display">
                  Flagship Forge — PatientTriage v2
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  {['implement', 'test', 'commit', 'push'].filter(k => (project as any)[k]).length}/4 Shipped
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Production multi-agent routing architecture for healthcare triage.
              </p>
            </div>
          </div>

          <button className="text-xs font-bold text-purple-800 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 transition cursor-pointer">
            {isForgeExpanded ? 'Hide Forge ↑' : 'Open Forge ↓'}
          </button>
        </div>

        {isForgeExpanded && (
          <div className="mt-4 pt-3 border-t border-purple-100 space-y-3">
            <input
              type="text"
              placeholder="Today's Forge Milestone (e.g. Implement agent routing node in FastAPI)..."
              value={project.milestone || ''}
              onChange={(e) => onUpdateDaily(prev => ({ ...prev, project: { ...(prev.project || project), milestone: e.target.value } }))}
              className="w-full px-3 py-2 rounded-xl border border-purple-200 bg-purple-50/30 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { key: 'implement', label: 'Implement' },
                { key: 'test', label: 'Test Real Data' },
                { key: 'commit', label: 'Git Commit' },
                { key: 'push', label: 'Push to Remote' },
              ].map((item) => {
                const isChecked = (project as any)[item.key];
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      sounds.playClick();
                      const willBe = !(project as any)[item.key];
                      onUpdateDaily(prev => ({ ...prev, project: { ...(prev.project || project), [item.key]: willBe } }));
                      if (willBe) onTriggerReaction("Milestone checkpoint recorded! 🚀", 'excited', 30);
                    }}
                    className={`p-2.5 rounded-2xl border text-center transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      isChecked ? 'bg-purple-600 border-purple-700 text-white font-bold' : 'bg-slate-50 border-slate-200 hover:border-purple-300 text-slate-700'
                    }`}
                  >
                    {isChecked ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Circle className="w-4 h-4 text-slate-300" />}
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 🌿 AFTER STUDIES ROUTINE (LIFE, MUSIC & CREATIVE OASIS) */}
      {/* ========================================================= */}
      <section id="after-studies-section" className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-200/90 shadow-xs">
        <div 
          onClick={() => { sounds.playClick(); setIsLifeExpanded(!isLifeExpanded); }}
          className="flex items-center justify-between gap-2 cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl shadow-xs shrink-0">
              🌿
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-800 font-display">
                  After Studies Routine
                </h3>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {life.completed.length}/{life.selected.length || LIFE_ROTATION_OPTIONS.length} Recharged
                </span>
                {life.completed.length > 0 && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Balanced ✨
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Flute, Harmonium, Gym, Mansi, Cheshta, BE task, Reading, Drive, Crochet & Artwork.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button 
              type="button"
              className="text-xs font-bold text-emerald-800 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{isLifeExpanded ? 'Collapse ↑' : 'Open After Studies Routine ↓'}</span>
            </button>
          </div>
        </div>

        {isLifeExpanded && (
          <div className="mt-4 pt-3 border-t border-emerald-100 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Directly from your handwritten note — tap any habit to mark done:</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClick();
                  onUpdateDaily(prev => {
                    const allIds = LIFE_ROTATION_OPTIONS.map(o => o.id);
                    return { ...prev, life: { ...prev.life, selected: allIds } };
                  });
                }}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
              >
                + Plan All 11 Habits
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {LIFE_ROTATION_OPTIONS.map((opt) => {
                const isSelected = life.selected.includes(opt.id);
                const isCompleted = life.completed.includes(opt.id);

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleToggleLifeItem(opt.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between gap-2.5 ${
                      isCompleted 
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-2xs ring-1 ring-emerald-300' 
                        : isSelected 
                        ? 'bg-amber-50/70 border-amber-300 text-slate-800 hover:border-amber-400' 
                        : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl select-none">{opt.icon}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sounds.playClick();
                          onUpdateDaily(prev => {
                            const curSel = prev.life?.selected || [];
                            const curComp = prev.life?.completed || [];
                            const nextSel = curSel.includes(opt.id) ? curSel.filter(x => x !== opt.id) : [...curSel, opt.id];
                            const nextComp = curComp.filter(x => x !== opt.id);
                            return { ...prev, life: { selected: nextSel, completed: nextComp } };
                          });
                        }}
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded cursor-pointer transition ${
                          isSelected ? 'bg-amber-200 text-amber-900' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                        title={isSelected ? 'Remove from planned' : 'Add to planned'}
                      >
                        {isSelected ? 'Planned' : '+ Plan'}
                      </button>
                    </div>

                    <div>
                      <span className="text-xs font-bold block leading-snug">{opt.label}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleLifeItem(opt.id);
                      }}
                      className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isCompleted 
                          ? 'bg-emerald-600 text-white shadow-xs' 
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Circle className="w-4 h-4 text-slate-300" />}
                      <span>{isCompleted ? 'Done ✨' : 'Mark Done'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 🌙 TWILIGHT SHUTDOWN (EVENING REFLECTION & CLOSING) */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <div 
          onClick={() => { sounds.playClick(); setIsTwilightExpanded(!isTwilightExpanded); }}
          className="flex items-center justify-between gap-2 cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center text-lg shadow-xs shrink-0">
              🌙
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-800 font-display">
                  Twilight Reflection & Day Shutdown
                </h3>
                {evening.isClosed && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Day Closed ✨
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Lock tomorrow's top 1 priority and bank your daily XP.
              </p>
            </div>
          </div>

          <button className="text-xs font-bold text-slate-700 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition cursor-pointer">
            {isTwilightExpanded ? 'Close Reflection ↑' : 'Open Shutdown ↓'}
          </button>
        </div>

        {isTwilightExpanded && (
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">What did I complete today?</label>
                <textarea
                  rows={2}
                  value={evening.completedText || ''}
                  onChange={(e) => onUpdateDaily(prev => ({ ...prev, evening: { ...(prev.evening || evening), completedText: e.target.value } }))}
                  placeholder="Completed LC Graphs + NumPy vectors..."
                  className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">What did I learn?</label>
                <textarea
                  rows={2}
                  value={evening.learnedText || ''}
                  onChange={(e) => onUpdateDaily(prev => ({ ...prev, evening: { ...(prev.evening || evening), learnedText: e.target.value } }))}
                  placeholder="Broadcasting geometry and residual minimization..."
                  className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Tomorrow's #1 Priority</label>
                <textarea
                  rows={2}
                  value={evening.tomorrowTop1 || ''}
                  onChange={(e) => onUpdateDaily(prev => ({ ...prev, evening: { ...(prev.evening || evening), tomorrowTop1: e.target.value } }))}
                  placeholder="Logistic Regression scratch implementation..."
                  className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={evening.githubCommitted || false}
                  onChange={(e) => onUpdateDaily(prev => ({ ...prev, evening: { ...(prev.evening || evening), githubCommitted: e.target.checked } }))}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>GitHub Committed (Proof of work in code)</span>
              </label>

              <button
                onClick={handleCloseDay}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-black text-xs hover:bg-slate-800 transition shadow-md cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Moon className="w-3.5 h-3.5 text-amber-300" />
                <span>Shutdown Day & Bank XP ✨</span>
              </button>
            </div>
          </div>
        )}
      </section>

    </div>
  );
};
