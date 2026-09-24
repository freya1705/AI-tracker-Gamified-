import React from 'react';
import { MasterDailyState } from '../types';
import { LIFE_ROTATION_OPTIONS } from '../data/initialData';
import { DailyAiHeroCard } from './DailyAiHeroCard';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { CheckCircle2, Circle, Moon } from 'lucide-react';

interface MasterDailyViewProps {
  daily: MasterDailyState;
  onUpdateDaily: (updater: (prev: MasterDailyState) => MasterDailyState) => void;
  onTriggerReaction: (speech: string, mood: any, earnedXP?: number) => void;
  characterName: string;
  onOpenTopicPicker?: (mode: 'ai' | 'swe') => void;
}

export const MasterDailyView: React.FC<MasterDailyViewProps> = ({
  daily,
  onUpdateDaily,
  onTriggerReaction,
  characterName,
  onOpenTopicPicker,
}) => {
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

  const projectChecklistItems = [
    { key: 'implement', label: 'Implement Feature' },
    { key: 'test', label: 'Test with Real Data' },
    { key: 'commit', label: 'Git Commit' },
    { key: 'push', label: 'Push to Remote' },
  ] as const;

  const aiMissionsDoneCount = Object.values(completedAiMissions).filter(Boolean).length;

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
      
      {/* 4 Worlds Status Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
            <span>🌅 Foundation</span>
            <span className="text-[10px] bg-amber-200/80 px-1.5 py-0.5 rounded-md font-black">{morningDoneCount}/7</span>
          </div>
          <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${(morningDoneCount/7)*100}%` }}></div>
          </div>
          <span className="text-[10px] text-amber-700 font-semibold mt-2">{morningDoneCount === 7 ? '✨ Foundation Set' : 'Non-negotiable start'}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-blue-900 mb-1">
            <span>🧠 DSA Stack</span>
            <span className="text-[10px] bg-blue-200/80 px-1.5 py-0.5 rounded-md font-black">{dsaDoneCount}/10</span>
          </div>
          <div className="w-full bg-blue-200/60 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${(dsaDoneCount/10)*100}%` }}></div>
          </div>
          <span className="text-[10px] text-blue-700 font-semibold mt-2">{dsa.lc4 ? '⚡ 4 LCs Solved!' : 'Learn → Solve → Commit'}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-purple-900 mb-1">
            <span>🤖 AI Missions A-F</span>
            <span className="text-[10px] bg-purple-200/80 px-1.5 py-0.5 rounded-md font-black">{aiMissionsDoneCount}/6</span>
          </div>
          <div className="w-full bg-purple-200/60 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-600 h-full rounded-full transition-all" style={{ width: `${(aiMissionsDoneCount/6)*100}%` }}></div>
          </div>
          <span className="text-[10px] text-purple-700 font-semibold mt-2">{completedAiMissions.ship ? '✅ Shipped & Committed' : 'Learn → Code → Build'}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1">
            <span>🌱 Life Balance</span>
            <span className="text-[10px] bg-emerald-200/80 px-1.5 py-0.5 rounded-md font-black">{life.completed.length}/{life.selected.length}</span>
          </div>
          <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${life.selected.length ? (life.completed.length/life.selected.length)*100 : 0}%` }}></div>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold mt-2">Zero guilt rotation</span>
        </div>
      </div>

      {/* 🌅 1. MORNING FOUNDATION */}
      <section className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg shadow-xs">
              🌅
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 font-display">
                1. Morning Foundation — Mandatory
              </h3>
              <p className="text-xs text-slate-500">
                Finish this foundation → then decide the day's priorities.
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
            {morningDoneCount}/7 Done
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
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
      </section>

      {/* 🧠 2. CORE ENGINEERING: DSA */}
      <section className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-blue-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-blue-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center text-lg shadow-xs">
              ⚡
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 font-display">
                2. Core Engineering: DSA Stack
              </h3>
              <p className="text-xs text-slate-500">
                Understand → Solve → Explain → Recognize Pattern (3–4 sessions/week)
              </p>
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

        <div className="mt-3 p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between text-xs text-blue-900">
          <span>Formula: <strong>Topic → Concept → Lecture → Book → Notes → LC 1 → LC 2 → LC 3 → LC 4 → Commit</strong></span>
          <span className="font-extrabold">{dsaDoneCount}/10 Done</span>
        </div>
      </section>

      {/* 🤖 3. THE DAILY AI HERO CARD (MISSIONS A-F) */}
      <DailyAiHeroCard
        mission={aiMission}
        onUpdateMission={(updater) => onUpdateDaily(prev => ({ ...prev, aiMission: updater(prev.aiMission || aiMission) }))}
        onTriggerReaction={onTriggerReaction}
        onOpenTopicPicker={onOpenTopicPicker}
      />

      {/* 💻 4. BUILD + PROJECT MILESTONE */}
      <section className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-purple-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-base font-bold text-slate-800 font-display">
              4. Project Milestone (Flagship)
            </h3>
            <p className="text-xs text-slate-500">
              Every productive technical day must move the project forward.
            </p>
          </div>

          <div className="flex-1 sm:max-w-sm">
            <input
              type="text"
              placeholder="e.g. Train XGBoost baseline on 1000 real patient vitals..."
              value={project.milestone || ''}
              onChange={(e) => onUpdateDaily(prev => ({ ...prev, project: { ...(prev.project || project), milestone: e.target.value } }))}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
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
                    ? 'bg-emerald-600 border-emerald-700 text-white shadow-xs'
                    : 'bg-white border-slate-200 hover:border-emerald-300 text-slate-700'
                }`}
              >
                {isChecked ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300" />
                )}
                <span className="text-xs font-extrabold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 🌱 5. AFTER-STUDY LIFE ROTATION */}
      <section className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-emerald-200/80 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-emerald-100">
          <div>
            <h3 className="text-base font-bold text-slate-800 font-display">
              5. After-Study Life Rotation
            </h3>
            <p className="text-xs text-slate-500">
              Pick 2–3 activities for today. Zero guilt rotation.
            </p>
          </div>

          <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
            {life.completed.length}/{life.selected.length} Done
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {LIFE_ROTATION_OPTIONS.map((item) => {
            const isSelected = life.selected.includes(item.id);
            const isDone = life.completed.includes(item.id);

            return (
              <div
                key={item.id}
                className={`p-3 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                  isDone 
                    ? 'bg-emerald-50 border-emerald-300 shadow-xs' 
                    : isSelected 
                    ? 'bg-white border-emerald-400 ring-2 ring-emerald-100' 
                    : 'bg-slate-50/60 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{item.icon}</span>
                  <button
                    onClick={() => handleSelectLifeItem(item.id)}
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md cursor-pointer ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {isSelected ? 'Picked' : '+ Pick'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{item.label}</span>
                  {isSelected && (
                    <button
                      onClick={() => handleToggleCompleteLifeItem(item.id)}
                      className="cursor-pointer text-slate-400 hover:text-emerald-600"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🌙 6. EVENING CLOSE */}
      <section className="bg-gradient-to-b from-slate-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-800">
        <div className="flex items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white font-display">
              6. Evening Close — 5-Minute Shutdown
            </h3>
            <p className="text-xs text-slate-400">
              What did I build? Bank your achievements!
            </p>
          </div>

          <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={evening.githubCommitted || false}
              onChange={(e) => onUpdateDaily(prev => ({ ...prev, evening: { ...(prev.evening || evening), githubCommitted: e.target.checked } }))}
              className="rounded border-slate-700 text-indigo-500 focus:ring-indigo-400"
            />
            <span>GitHub Committed Today? ✅</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1">What did I learn & build today?</label>
            <input
              type="text"
              placeholder="e.g. Coded logistic regression, solved BFS problem"
              value={evening.builtText || ''}
              onChange={(e) => onUpdateDaily(prev => ({ ...prev, evening: { ...(prev.evening || evening), builtText: e.target.value } }))}
              className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-amber-300 font-bold mb-1">Tomorrow's #1 Priority Task *</label>
            <input
              type="text"
              placeholder="e.g. Implement PatientTriage risk model"
              value={evening.tomorrowTop1 || ''}
              onChange={(e) => onUpdateDaily(prev => ({ ...prev, evening: { ...(prev.evening || evening), tomorrowTop1: e.target.value } }))}
              className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-amber-500/40 text-amber-200 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        <div className="mt-4 p-3.5 rounded-2xl bg-indigo-900/50 border border-indigo-700/60">
          <label className="block text-amber-300 font-bold text-xs mb-1">
            ⭐ Golden Question: "What can I build this week that I couldn't last week?"
          </label>
          <input
            type="text"
            placeholder="e.g. I can now evaluate medical risk models with calibrated thresholds and write PyTorch loops."
            value={evening.weeklyGrowth || ''}
            onChange={(e) => onUpdateDaily(prev => ({ ...prev, evening: { ...(prev.evening || evening), weeklyGrowth: e.target.value } }))}
            className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-indigo-600/50 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-slate-400 italic">
            "{characterName} says: Minimum day is enough. We continue tomorrow."
          </span>

          <button
            onClick={handleCloseDay}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
          >
            <Moon className="w-4 h-4 fill-slate-950" />
            <span>Complete Evening Close & Bank +100 XP</span>
          </button>
        </div>
      </section>

    </div>
  );
};
