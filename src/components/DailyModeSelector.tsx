import React from 'react';
import { DayMode } from '../types';
import { sounds } from '../utils/audio';
import { Backpack, Coffee, Rocket, CheckSquare, Clock } from 'lucide-react';

interface DailyModeSelectorProps {
  currentMode: DayMode;
  onSelectMode: (mode: DayMode) => void;
}

export const DailyModeSelector: React.FC<DailyModeSelectorProps> = ({
  currentMode,
  onSelectMode,
}) => {
  const modes: {
    id: DayMode;
    title: string;
    time: string;
    icon: any;
    desc: string;
    color: string;
    activeClass: string;
    checklist: string[];
  }[] = [
    {
      id: 'busy',
      title: 'Busy College Day',
      time: '20–45 min',
      icon: Backpack,
      desc: 'Minimum day counts! Never zero days.',
      color: 'amber',
      activeClass: 'bg-amber-500 text-white shadow-amber-200 border-amber-500',
      checklist: [
        'One small concept (e.g. why gradient descent exists in 5 lines)',
        'Code 20–30 min (1 problem or 1 small script)',
        'Commit to GitHub (even a note counts)',
        'One line: what confused me today'
      ]
    },
    {
      id: 'normal',
      title: 'Normal Day',
      time: '1.5–2.5 hrs',
      icon: Coffee,
      desc: 'Solid focused learning & practical code.',
      color: 'indigo',
      activeClass: 'bg-indigo-600 text-white shadow-indigo-200 border-indigo-600',
      checklist: [
        'Learn one concept + why it exists in real software',
        'Read/watch the main resource (Andrew Ng or Kaggle)',
        'Code it from scratch (NumPy / clean script)',
        'Use it in the project (PatientTriage test)',
        '2–3 quick notes + Git commit',
        'Explain it aloud in 2 minutes with no notes!'
      ]
    },
    {
      id: 'free',
      title: 'Free / Weekend Day',
      time: '4–6 hrs',
      icon: Rocket,
      desc: 'Deep work & building shipping features.',
      color: 'purple',
      activeClass: 'bg-purple-600 text-white shadow-purple-200 border-purple-600',
      checklist: [
        'Learn deep concept (Trees, PyTorch loop, RAG)',
        'Code and benchmark models on real data',
        'Build one complete project feature',
        'Run one experiment and log metrics in README',
        'Weekly review: explain aloud what you built!'
      ]
    }
  ];

  const activeModeData = modes.find(m => m.id === currentMode) || modes[1];

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded-md">
            Part 7 Strategy
          </span>
          <h3 className="text-base font-bold text-slate-800 font-display mt-1">
            Today's Operating Mode
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/70">
          {modes.map((m) => {
            const Icon = m.icon;
            const isSelected = currentMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectMode(m.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? `${m.activeClass} shadow-md`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{m.title}</span>
                <span className={`text-[10px] opacity-80 hidden sm:inline`}>({m.time})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Guidance Card */}
      <div className="rounded-xl bg-slate-50/80 border border-slate-200/80 p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-800">
              {activeModeData.title} Target:
            </span>
            <span className="text-xs px-2 py-0.5 bg-white border border-slate-200 rounded-md text-slate-600 font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3 text-indigo-500" />
              {activeModeData.time}
            </span>
          </div>
          <span className="text-xs text-indigo-600 font-semibold italic">
            "{activeModeData.desc}"
          </span>
        </div>

        {/* Checklist bullets for this mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {activeModeData.checklist.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <CheckSquare className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
