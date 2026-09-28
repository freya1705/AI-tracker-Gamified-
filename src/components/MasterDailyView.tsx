import React, { useState } from 'react';
import { MasterDailyState } from '../types';
import { LIFE_ROTATION_OPTIONS } from '../data/initialData';
import { getBestResourceForTopic } from '../data/resourceData';
import { DailyAiHeroCard } from './DailyAiHeroCard';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, Circle, Moon, ExternalLink, BookOpen, 
  Zap, ArrowRight, ChevronDown, ChevronUp, Sparkles, 
  Crown, Flame, Compass, RefreshCw
} from 'lucide-react';

interface MasterDailyViewProps {
  daily: MasterDailyState;
  onUpdateDaily: (updater: (prev: MasterDailyState) => MasterDailyState) => void;
  onTriggerReaction: (speech: string, mood: any, earnedXP?: number) => void;
  characterName: string;
  onOpenTopicPicker?: (mode: 'ai' | 'swe') => void;
  onOpenResources?: (stageId?: string) => void;
}

export const MasterDailyView: React.FC<MasterDailyViewProps> = ({
  daily,
  onUpdateDaily,
  onTriggerReaction,
  characterName,
  onOpenTopicPicker,
  onOpenResources,
}) => {
  const [activeWorldTab, setActiveWorldTab] = useState<'all' | 'dsa' | 'ai' | 'life'>('all');
  const [isFoundationExpanded, setIsFoundationExpanded] = useState<boolean>(true);
  const [isProjectExpanded, setIsProjectExpanded] = useState<boolean>(true);
  const [isEveningExpanded, setIsEveningExpanded] = useState<boolean>(false);

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
    { key: 'concept', label: '1 Topic/Concept' },
    { key: 'videoLecture', label: 'Video Lecture' },
    { key: 'codingBook', label: 'Coding Interview Book' },
    { key: 'makeNotes', label: 'Make Notes' },
    { key: 'lc1', label: 'LC #1' },
    { key: 'lc2', label: 'LC #2' },
    { key: 'lc3', label: 'LC #3' },
    { key: 'lc4', label: 'LC #4' },
    { key: 'dryRuns', label: 'Dry Runs' },
    { key: 'commitCode', label: 'Commit Code' },
  ] as const;
  const dsaDoneCount = dsaChecklistItems.filter(i => (dsa as any)[i.key]).length;
  const dsaResource = dsa.topic ? getBestResourceForTopic(dsa.topic, 'swe-dsa') : null;

  const projectChecklistItems = [
    { key: 'implement', label: 'Implement Feature' },
    { key: 'test', label: 'Test with Real Data' },
    { key: 'commit', label: 'Git Commit' },
    { key: 'push', label: 'Push to Remote' },
  ] as const;

  const aiMissionsDoneCount = Object.values(completedAiMissions).filter(Boolean).length;
  const aiBestResource = aiMission?.concept ? getBestResourceForTopic(aiMission.concept, 'ai-stage-1') : null;

  // The 6 AI Missions definition
  const missionsList = [
    { key: 'learn', letter: 'A', title: 'LEARN', desc: aiMission?.concept || 'One concept from main resource', icon: '🤖' },
    { key: 'understand', letter: 'B', title: 'UNDERSTAND', desc: aiMission?.understandPrompt || 'Explain it in your own words without notes', icon: '🧠' },
    { key: 'code', letter: 'C', title: 'CODE', desc: aiMission?.codeTask || 'Actually implement / use it from scratch', icon: '💻' },
    { key: 'build', letter: 'D', title: 'BUILD', desc: aiMission?.buildTask || 'Use today concept in something small', icon: '🛠️' },
    { key: 'record', letter: 'E', title: 'RECORD', desc: aiMission?.recordNotes || 'Write what learned, confused, & next action', icon: '📝' },
    { key: 'ship', letter: 'F', title: 'SHIP', desc: 'Push & Commit to GitHub (Proof of work)', icon: '🚀' },
  ] as const;

  // The immediate next active mission
  const nextPendingMission = missionsList.find(m => !(completedAiMissions as any)[m.key]);

  // Toggle Morning Item
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

    if (willBeChecked && morningDoneCount + 1 === 7) {
      onTriggerReaction("Morning foundation complete! Your mind is centered and ready to build!", 'happy', 40);
    }
  };

  // Toggle DSA Checklist Item
  const handleToggleDsa = (key: string, e: React.MouseEvent) => {
    sounds.playClick();
    const willBeChecked = !(dsa as any)[key];
    if (willBeChecked) sounds.playTaskComplete();

    onUpdateDaily(prev => ({
      ...prev,
      dsa: { ...(prev.dsa || dsa), [key]: willBeChecked }
    }));

    if (key.startsWith('lc') && willBeChecked) {
      const isLc4 = key === 'lc4' || (dsa.lc1 && dsa.lc2 && dsa.lc3);
      if (isLc4) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        onTriggerReaction("4 LeetCode problems done! Pattern unlocked. ⚡", 'proud', 50);
      }
    }
  };

  // Complete Next Action Mission directly
  const handleCompleteNextAction = (e: React.MouseEvent) => {
    if (!nextPendingMission) return;
    sounds.playTaskComplete();
    const key = nextPendingMission.key;
    onUpdateDaily(prev => ({
      ...prev,
      aiMission: {
        ...(prev.aiMission || aiMission),
        completedMissions: {
          ...(prev.aiMission?.completedMissions || completedAiMissions),
          [key]: true,
        }
      }
    }));
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
    if (key === 'ship') {
      onTriggerReaction("Shipped & committed to GitHub! Proof of work complete! 🚀", 'proud', 50);
    } else {
      onTriggerReaction(`Mission ${nextPendingMission.letter} (${nextPendingMission.title}) completed! +50 XP! ✨`, 'excited', 50);
    }
  };

  // Toggle Project Item
  const handleToggleProject = (key: string) => {
    sounds.playClick();
    const willBeChecked = !(project as any)[key];
    if (willBeChecked) sounds.playTaskComplete();

    onUpdateDaily(prev => ({
      ...prev,
      project: { ...(prev.project || project), [key]: willBeChecked }
    }));

    if (key === 'push' && willBeChecked) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      onTriggerReaction("SHIP IT! 🚀 Milestone pushed to production!", 'excited', 60);
    }
  };

  // Toggle Life Rotation Selection & Completion
  const handleSelectLifeItem = (id: string) => {
    sounds.playClick();
    onUpdateDaily(prev => {
      const currentSelected = Array.isArray(prev.life?.selected) ? prev.life.selected : life.selected;
      const currentCompleted = Array.isArray(prev.life?.completed) ? prev.life.completed : life.completed;
      const isSelected = currentSelected.includes(id);
      const newSelected = isSelected 
        ? currentSelected.filter(item => item !== id)
        : [...currentSelected, id];
      const newCompleted = currentCompleted.filter(item => item !== id);
      return { ...prev, life: { selected: newSelected, completed: newCompleted } };
    });
  };

  const handleToggleCompleteLifeItem = (id: string) => {
    sounds.playClick();
    const willBeCompleted = !life.completed.includes(id);
    if (willBeCompleted) sounds.playTaskComplete();

    onUpdateDaily(prev => {
      const currentSelected = Array.isArray(prev.life?.selected) ? prev.life.selected : life.selected;
      const currentCompleted = Array.isArray(prev.life?.completed) ? prev.life.completed : life.completed;
      const newCompleted = willBeCompleted
        ? [...currentCompleted, id]
        : currentCompleted.filter(item => item !== id);
      return { ...prev, life: { selected: currentSelected, completed: newCompleted } };
    });

    if (willBeCompleted) {
      onTriggerReaction("Recharged with life & creativity! Balance keeps the engineer sharp. 🌿", 'happy', 25);
    }
  };

  // Evening close save
  const handleCloseDay = () => {
    sounds.playLevelUp();
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    onUpdateDaily(prev => ({
      ...prev,
      evening: { ...(prev.evening || evening), isClosed: true }
    }));
    onTriggerReaction("Day successfully shutdown and banked! Rest well, architect. 🌙", 'proud', 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 mb-12">
      
      {/* ========================================================= */}
      {/* 📖 HERO QUEST BOOK: TODAY'S QUEST & NEXT ACTION */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* TODAY'S QUEST HERO CARD */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 text-white border border-purple-500/40 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-3 right-3 text-purple-400 opacity-20 text-3xl pointer-events-none select-none">🎯</div>
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30">
                Today's Quest • Day {daily.dayNumber}
              </span>
              <span className="text-xs font-black text-amber-300">
                {aiMissionsDoneCount}/6 Missions Shipped
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white font-display">
              {aiMission.concept || 'AI Concept Focus'}
            </h3>
            <p className="text-xs text-purple-200/90 mt-1 leading-relaxed font-medium">
              {aiMission.understandPrompt || 'Understand deeply, implement from scratch, and ship proof of work.'}
            </p>

            {/* Mapped Study Resource for Today's Concept */}
            {aiBestResource && (
              <div className="mt-3 p-2.5 rounded-xl bg-purple-900/60 border border-purple-500/40 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-pulse" />
                  <span className="text-amber-200 font-semibold truncate text-[11px]">
                    📖 {aiBestResource.name}
                  </span>
                </div>
                <a
                  href={aiBestResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-[10px] hover:bg-amber-300 transition-colors shrink-0 flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-purple-800/60">
            {onOpenTopicPicker && (
              <button
                type="button"
                onClick={() => onOpenTopicPicker('ai')}
                className="px-3 py-1.5 rounded-xl bg-purple-700/80 hover:bg-purple-600 text-white font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-xs active:scale-95"
                title="Pick focus concept from Master Syllabus"
              >
                <span>Pick Concept 🧠</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setActiveWorldTab('ai')}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer shadow-md flex items-center gap-1 ml-auto active:scale-95"
            >
              <span>Continue Quest</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* NEXT ACTION QUEST CARD */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-purple-200/90 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-3 right-3 text-amber-400 opacity-20 text-3xl pointer-events-none select-none">⚡</div>
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                Next Action
              </span>
              <span className="text-xs font-black text-indigo-600">
                +50 AI XP
              </span>
            </div>

            {nextPendingMission ? (
              <>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl">{nextPendingMission.icon}</span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                      Mission {nextPendingMission.letter}
                    </span>
                    <h4 className="text-base font-black text-slate-900 font-display mt-0.5">
                      {nextPendingMission.title}
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                  {nextPendingMission.desc}
                </p>
              </>
            ) : (
              <div className="py-4 text-center">
                <span className="text-3xl">🎉</span>
                <h4 className="text-base font-black text-slate-900 font-display mt-1">
                  All 6 Missions Shipped!
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Outstanding consistency! Proof of work is recorded.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            {nextPendingMission ? (
              <button
                type="button"
                onClick={handleCompleteNextAction}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-black text-xs hover:from-indigo-500 hover:to-purple-600 transition-all shadow-md shadow-indigo-200 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>Start & Ship Mission {nextPendingMission.letter} (+50 XP)</span>
              </button>
            ) : (
              <div className="text-center text-xs font-black text-emerald-600 py-1">
                ✨ +300 Total AI XP Banked for Day {daily.dayNumber}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 🌍 THE 3 PLAYFUL MINI WORLDS (DSA • AI • LIFE) */}
      {/* ========================================================= */}
      <div className="space-y-4">
        
        {/* World Selectors Ribbon */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-black text-slate-800 font-display">
              Playful Mini Worlds:
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => { sounds.playClick(); setActiveWorldTab('all'); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeWorldTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Worlds
            </button>
            <button
              onClick={() => { sounds.playClick(); setActiveWorldTab('dsa'); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeWorldTab === 'dsa' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🧠 DSA ({dsaDoneCount}/10)
            </button>
            <button
              onClick={() => { sounds.playClick(); setActiveWorldTab('ai'); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeWorldTab === 'ai' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🤖 AI ({aiMissionsDoneCount}/6)
            </button>
            <button
              onClick={() => { sounds.playClick(); setActiveWorldTab('life'); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeWorldTab === 'life' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌱 Life ({life.completed.length})
            </button>
          </div>
        </div>

        {/* 1. 🧠 DSA WORLD */}
        {(activeWorldTab === 'all' || activeWorldTab === 'dsa') && (
          <section className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-blue-200/90 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-blue-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-xl shadow-xs">
                  🧠
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Mini World 1
                    </span>
                    <span className="text-xs font-bold text-blue-700">
                      Learn → Solve → Commit
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-800 font-display mt-0.5">
                    DSA World Stack
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-1 sm:max-w-sm">
                <input
                  type="text"
                  placeholder="Today's DSA Topic (e.g. Graphs BFS/DFS)..."
                  value={dsa.topic || ''}
                  onChange={(e) => onUpdateDaily(prev => ({ ...prev, dsa: { ...(prev.dsa || dsa), topic: e.target.value } }))}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/40 text-xs font-bold text-blue-900 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {onOpenTopicPicker && (
                  <button
                    type="button"
                    onClick={() => onOpenTopicPicker('swe')}
                    className="px-2.5 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-900 text-[10px] font-extrabold transition-all cursor-pointer shrink-0 flex items-center gap-1 active:scale-95 shadow-xs"
                    title="Pick topic from SWE track"
                  >
                    <span>Syllabus ⚡</span>
                  </button>
                )}
              </div>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {dsaChecklistItems.map((item) => {
                const isChecked = (dsa as any)[item.key];
                const isLeetCode = item.key.startsWith('lc');
                return (
                  <button
                    key={item.key}
                    onClick={(e) => handleToggleDsa(item.key, e)}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isChecked
                        ? 'bg-blue-600 border-blue-700 text-white shadow-xs'
                        : isLeetCode
                        ? 'bg-blue-50/60 border-blue-200 hover:border-blue-400 text-blue-900'
                        : 'bg-slate-50 border-slate-200 hover:border-blue-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300" />
                      )}
                      <span className="text-[11px] font-extrabold">{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mapped Resource for DSA */}
            {dsaResource && (
              <div className="mt-3 p-2.5 px-3 rounded-2xl bg-blue-100/60 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-blue-950">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <span className="text-[11px] font-black text-blue-800 uppercase tracking-wide shrink-0">
                    📖 Study Resource:
                  </span>
                  <span className="font-semibold text-xs truncate" title={dsaResource.name}>
                    {dsaResource.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  <a
                    href={dsaResource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-extrabold text-blue-700 hover:text-blue-900 bg-white px-2.5 py-1 rounded-xl border border-blue-200 shrink-0 shadow-xs hover:bg-blue-50 transition-colors"
                    title={`Open ${dsaResource.name} in a new tab`}
                  >
                    <span>Open Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {onOpenResources && dsaResource.stageIds?.[0] && (
                    <button
                      type="button"
                      onClick={() => onOpenResources(dsaResource.stageIds[0])}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-xl bg-blue-200/70 hover:bg-blue-200 text-blue-800 text-[10px] font-bold transition-colors cursor-pointer"
                      title="View in Resource Vault"
                    >
                      <BookOpen className="w-3 h-3 text-blue-700" />
                      <span>Vault</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 2. 🤖 AI WORLD */}
        {(activeWorldTab === 'all' || activeWorldTab === 'ai') && (
          <DailyAiHeroCard
            mission={aiMission}
            onUpdateMission={(updater) => onUpdateDaily(prev => ({ ...prev, aiMission: updater(prev.aiMission || aiMission) }))}
            onTriggerReaction={onTriggerReaction}
            onOpenTopicPicker={onOpenTopicPicker}
            onOpenResources={onOpenResources}
          />
        )}

        {/* 3. 🌱 LIFE WORLD */}
        {(activeWorldTab === 'all' || activeWorldTab === 'life') && (
          <section className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-emerald-200/90 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-emerald-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl shadow-xs">
                  🌱
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Mini World 3
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      Zero Guilt Balance
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-800 font-display mt-0.5">
                    Life World Rotation
                  </h3>
                </div>
              </div>

              <span className="px-3 py-1 rounded-xl text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                {life.completed.length}/{life.selected.length} Recharged
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Pick 2–3 items to keep your energy, relationships, and mind alive while coding.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {LIFE_ROTATION_OPTIONS.map((opt) => {
                const isSelected = life.selected.includes(opt.id);
                const isCompleted = life.completed.includes(opt.id);

                return (
                  <div
                    key={opt.id}
                    className={`p-3 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                      isCompleted
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-2xs'
                        : isSelected
                        ? 'bg-amber-50/60 border-amber-300 text-slate-800'
                        : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{opt.icon}</span>
                      <button
                        onClick={() => handleSelectLifeItem(opt.id)}
                        className={`text-[10px] font-black px-1.5 py-0.5 rounded cursor-pointer ${
                          isSelected ? 'bg-amber-200 text-amber-900' : 'bg-slate-200 text-slate-600'
                        }`}
                        title={isSelected ? "Remove from today's plan" : "Add to today's plan"}
                      >
                        {isSelected ? 'Planned' : '+ Plan'}
                      </button>
                    </div>

                    <span className="text-xs font-bold leading-snug">
                      {opt.label}
                    </span>

                    {isSelected && (
                      <button
                        onClick={() => handleToggleCompleteLifeItem(opt.id)}
                        className={`w-full py-1 rounded-xl text-[10px] font-black transition-all cursor-pointer flex items-center justify-center gap-1 ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-emerald-50'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                        <span>{isCompleted ? 'Done ✨' : 'Mark Done'}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </div>

      {/* ========================================================= */}
      {/* 🌅 1. MORNING FOUNDATION (COLLAPSIBLE & MANDATORY) */}
      {/* ========================================================= */}
      <section className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs">
        <div 
          onClick={() => { sounds.playClick(); setIsFoundationExpanded(!isFoundationExpanded); }}
          className="flex items-center justify-between gap-2 cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg shadow-xs">
              🌅
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-800 font-display">
                  Morning Foundation — Mandatory
                </h3>
                {morningDoneCount === 7 && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Set ✨
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Non-negotiable spiritual & mental start.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
              {morningDoneCount}/7 Done
            </span>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              {isFoundationExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {isFoundationExpanded && (
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
                      ? 'bg-amber-50/70 border-amber-300 text-amber-900 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-amber-300 text-slate-700'
                  }`}
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-amber-600 fill-amber-100 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                  )}
                  <span className="text-base">{item.icon}</span>
                  <span className={`text-xs font-bold ${isChecked ? 'line-through opacity-70' : ''}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 🛠️ 4. FLAGSHIP PROJECT MILESTONE (PATIENTTRIAGE V2) */}
      {/* ========================================================= */}
      <section className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-purple-200/80 shadow-xs">
        <div 
          onClick={() => { sounds.playClick(); setIsProjectExpanded(!isProjectExpanded); }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center text-lg shadow-xs">
              🛠️
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 font-display">
                Flagship Project Milestone (PatientTriage v2)
              </h3>
              <p className="text-xs text-slate-500">
                Move code from theory into production repository.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-purple-100 text-purple-800">
              {projectChecklistItems.filter(i => (project as any)[i.key]).length}/4 Shipped
            </span>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              {isProjectExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {isProjectExpanded && (
          <div className="mt-4 pt-3 border-t border-purple-100 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 shrink-0">Today's Milestone:</span>
              <input
                type="text"
                placeholder="e.g. Implement multi-agent triage routing node in FastAPI..."
                value={project.milestone || ''}
                onChange={(e) => onUpdateDaily(prev => ({ ...prev, project: { ...(prev.project || project), milestone: e.target.value } }))}
                className="flex-1 px-3 py-1.5 rounded-xl border border-purple-200 bg-purple-50/40 text-xs font-bold text-slate-800 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {projectChecklistItems.map((item) => {
                const isChecked = (project as any)[item.key];
                return (
                  <button
                    key={item.key}
                    onClick={() => handleToggleProject(item.key)}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isChecked
                        ? 'bg-purple-600 border-purple-700 text-white shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:border-purple-300 text-slate-700'
                    }`}
                  >
                    {isChecked ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Circle className="w-4 h-4 text-slate-300" />}
                    <span className="text-xs font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 🌙 6. EVENING SHUTDOWN */}
      {/* ========================================================= */}
      <section className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div 
          onClick={() => { sounds.playClick(); setIsEveningExpanded(!isEveningExpanded); }}
          className="flex items-center justify-between gap-2 cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center text-lg shadow-xs">
              🌙
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-800 font-display">
                  Evening Reflection & Day Shutdown
                </h3>
                {evening.isClosed && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    Day Closed 🌙
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Close today clean → lock tomorrow's top 1 priority.
              </p>
            </div>
          </div>

          <button className="text-slate-400 hover:text-slate-600 p-1">
            {isEveningExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {isEveningExpanded && (
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">What did I complete?</label>
                <textarea
                  rows={2}
                  value={evening.completedText || ''}
                  onChange={(e) => onUpdateDaily(prev => ({ ...prev, evening: { ...(prev.evening || evening), completedText: e.target.value } }))}
                  placeholder="Completed LC graphs + NumPy vector benchmark..."
                  className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">What did I learn?</label>
                <textarea
                  rows={2}
                  value={evening.learnedText || ''}
                  onChange={(e) => onUpdateDaily(prev => ({ ...prev, evening: { ...(prev.evening || evening), learnedText: e.target.value } }))}
                  placeholder="Learned broadcasting rules and BFS level order..."
                  className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Tomorrow's #1 Priority</label>
                <textarea
                  rows={2}
                  value={evening.tomorrowTop1 || ''}
                  onChange={(e) => onUpdateDaily(prev => ({ ...prev, evening: { ...(prev.evening || evening), tomorrowTop1: e.target.value } }))}
                  placeholder="Logistic Regression math + loss function..."
                  className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
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
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-black text-xs hover:bg-slate-800 transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
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
