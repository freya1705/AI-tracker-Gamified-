import React from 'react';
import { DailyAiHeroMission } from '../types';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Crown, CheckCircle2, Circle, Sparkles } from 'lucide-react';

interface DailyAiHeroCardProps {
  mission?: DailyAiHeroMission;
  onUpdateMission: (updater: (prev: DailyAiHeroMission) => DailyAiHeroMission) => void;
  onTriggerReaction: (speech: string, mood: any, earnedXP?: number) => void;
  onOpenTopicPicker?: (mode: 'ai' | 'swe') => void;
}

export const DailyAiHeroCard: React.FC<DailyAiHeroCardProps> = ({
  mission,
  onUpdateMission,
  onTriggerReaction,
  onOpenTopicPicker,
}) => {
  const completedMissions = mission?.completedMissions || {
    learn: false,
    understand: false,
    code: false,
    build: false,
    record: false,
    ship: false,
  };

  const missionsList = [
    { key: 'learn', letter: 'A', title: 'LEARN', desc: mission?.concept || 'One concept from main resource', icon: '🤖' },
    { key: 'understand', letter: 'B', title: 'UNDERSTAND', desc: mission?.understandPrompt || 'Explain it in your own words without notes', icon: '🧠' },
    { key: 'code', letter: 'C', title: 'CODE', desc: mission?.codeTask || 'Actually implement / use it from scratch', icon: '💻' },
    { key: 'build', letter: 'D', title: 'BUILD', desc: mission?.buildTask || 'Use today concept in something small', icon: '🛠️' },
    { key: 'record', letter: 'E', title: 'RECORD', desc: mission?.recordNotes || 'Write what learned, confused, & next action', icon: '📝' },
    { key: 'ship', letter: 'F', title: 'SHIP', desc: 'Push & Commit to GitHub (Proof of work)', icon: '🚀' },
  ] as const;

  const doneCount = Object.values(completedMissions).filter(Boolean).length;

  const handleToggle = (key: keyof typeof completedMissions, e: React.MouseEvent) => {
    sounds.playClick();
    const willBeChecked = !completedMissions[key];
    if (willBeChecked) sounds.playTaskComplete();

    onUpdateMission(prev => ({
      ...prev,
      completedMissions: { ...(prev?.completedMissions || completedMissions), [key]: willBeChecked }
    }));

    if (key === 'build' && willBeChecked) {
      confetti({ particleCount: 50, spread: 60, origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } });
      onTriggerReaction("You didn't just learn AI today. You BUILT with it. 💻", 'excited', 50);
    } else if (key === 'ship' && willBeChecked) {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      onTriggerReaction("Shipped & committed to GitHub! Proof is in the commits. 🚀", 'proud', 50);
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-purple-500/40">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-purple-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-xl font-black shadow-md">
            👑
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/40 text-purple-200">
                {mission?.worldName || 'WORLD 1 — Data'}
              </span>
              <span className="text-xs font-bold text-amber-300">
                Day {mission?.dayNumber || 1} Mission
              </span>
            </div>
            <h3 className="text-lg font-black text-white font-display mt-0.5">
              The Daily AI Hero Card
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-3 py-1 rounded-xl text-xs font-black bg-purple-600/60 text-purple-200 border border-purple-400/30">
            {doneCount}/6 Missions Shipped
          </span>
        </div>
      </div>

      {/* Concept input banner */}
      <div className="mb-4 p-3 rounded-2xl bg-purple-950/60 border border-purple-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <span className="font-bold text-purple-300 shrink-0">Today's Concept:</span>
        <div className="flex items-center gap-2 flex-1">
          <input
            type="text"
            value={mission?.concept || ''}
            onChange={(e) => onUpdateMission(prev => ({ ...prev, concept: e.target.value }))}
            className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-purple-500/50 text-xs font-bold text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="e.g. Logistic Regression & Loss..."
          />
          {onOpenTopicPicker && (
            <button
              type="button"
              onClick={() => onOpenTopicPicker('ai')}
              className="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-extrabold transition-all cursor-pointer shrink-0 flex items-center gap-1 shadow-xs active:scale-95"
              title="Pick concept from Master AI Syllabus"
            >
              <span>Syllabus 🧠</span>
            </button>
          )}
        </div>
      </div>

      {/* Missions A-F */}
      <div className="space-y-2 mb-4">
        {missionsList.map((m) => {
          const isDone = (completedMissions as any)[m.key];
          return (
            <div
              key={m.key}
              onClick={(e) => handleToggle(m.key as any, e)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                isDone 
                  ? 'bg-purple-950/80 border-purple-400/80 ring-1 ring-purple-400 shadow-xs' 
                  : 'bg-slate-900/60 border-slate-700/80 hover:border-purple-400 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-600 text-white">
                      Mission {m.letter} — {m.title}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 text-slate-200 leading-relaxed font-medium ${isDone ? 'line-through opacity-70' : ''}`}>
                    {m.desc}
                  </p>
                </div>
              </div>

              <span className="text-xl shrink-0 opacity-80">{m.icon}</span>
            </div>
          );
        })}
      </div>

      {/* Boss Question */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Boss Question of the Day:</span>
          </div>
          <p className="text-amber-100 font-semibold mt-0.5 italic">
            "{mission?.bossQuestion || 'Can I explain this to someone who knows nothing about ML without copy-pasting code?'}"
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs font-black text-amber-300 block">+100 AI XP</span>
          <span className="text-[10px] text-purple-200">Ship code & commit!</span>
        </div>
      </div>

    </div>
  );
};
