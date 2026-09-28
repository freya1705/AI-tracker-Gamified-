import React from 'react';
import { sounds } from '../../utils/audio';
import { 
  X, CheckSquare, BookOpen, Lightbulb, FileText, 
  Compass, Trophy, Calendar, Plus, RotateCcw, Clock, Sparkles, Volume2, VolumeX, ArrowRight
} from 'lucide-react';

interface QuickAccessDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChecklist: () => void;
  onOpenResources: () => void;
  onOpenProblemSheet: () => void;
  onOpenOriginalNote: () => void;
  onOpenRoadmap: () => void;
  onOpenFounderRoadmap: () => void;
  onOpenCalendar: () => void;
  onOpenAddTask: () => void;
  onOpenResetConfirm: () => void;
  onOpenTimer: () => void;
  onOpenWardrobe: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  totalVerbatimChecked: number;
  totalVerbatimCount: number;
}

export const QuickAccessDrawer: React.FC<QuickAccessDrawerProps> = ({
  isOpen,
  onClose,
  onOpenChecklist,
  onOpenResources,
  onOpenProblemSheet,
  onOpenOriginalNote,
  onOpenRoadmap,
  onOpenFounderRoadmap,
  onOpenCalendar,
  onOpenAddTask,
  onOpenResetConfirm,
  onOpenTimer,
  onOpenWardrobe,
  soundEnabled,
  onToggleSound,
  totalVerbatimChecked,
  totalVerbatimCount,
}) => {
  if (!isOpen) return null;

  const tools = [
    {
      id: 'checklist',
      title: 'Master AI Checklist (0–29)',
      badge: `${totalVerbatimChecked}/${totalVerbatimCount}`,
      desc: 'Exact verbatim 30-section syllabus checklist from Foundations to System Design.',
      icon: <CheckSquare className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200 text-emerald-950',
      action: () => {
        sounds.playClick();
        onClose();
        onOpenChecklist();
      },
    },
    {
      id: 'resources',
      title: 'Free Resource Vault (38+)',
      badge: 'Free & Curated',
      desc: 'Official docs, 3Blue1Brown, StatQuest, Karpathy, Hugging Face, Coursera, Kaggle.',
      icon: <BookOpen className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50 hover:bg-amber-100/80 border-amber-200 text-amber-950',
      action: () => {
        sounds.playClick();
        onClose();
        onOpenResources();
      },
    },
    {
      id: 'founder',
      title: 'Founder Roadmap (2026–32+)',
      badge: 'Career Ladder',
      desc: 'Student → SWE Builder → AI Engineer → AI Founder milestones & scorecard.',
      icon: <Trophy className="w-5 h-5 text-purple-600" />,
      bg: 'bg-purple-50 hover:bg-purple-100/80 border-purple-200 text-purple-950',
      action: () => {
        sounds.playClick();
        onClose();
        onOpenFounderRoadmap();
      },
    },
    {
      id: 'ai-guide',
      title: "Freya's 7-Step AI Guide",
      badge: 'Verdicts',
      desc: 'Practical verdicts on when ML/DL/LLM is needed vs when deterministic code is better.',
      icon: <Compass className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-200 text-indigo-950',
      action: () => {
        sounds.playClick();
        onClose();
        onOpenRoadmap();
      },
    },
    {
      id: 'calendar',
      title: 'Adventure Map & Schedule',
      badge: '180-Day Plan',
      desc: 'Daily milestones from Sept 2026 to Mar 2027 with boss battles and unlocks.',
      icon: <Calendar className="w-5 h-5 text-sky-600" />,
      bg: 'bg-sky-50 hover:bg-sky-100/80 border-sky-200 text-sky-950',
      action: () => {
        sounds.playClick();
        onClose();
        onOpenCalendar();
      },
    },
    {
      id: 'problem',
      title: 'Problem of the Week',
      badge: 'Real-World ML',
      desc: 'Interactive worksheet evaluating real industry AI business cases.',
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
      bg: 'bg-yellow-50 hover:bg-yellow-100/80 border-yellow-200 text-yellow-950',
      action: () => {
        sounds.playClick();
        onClose();
        onOpenProblemSheet();
      },
    },
    {
      id: 'note',
      title: 'Original Handwritten Note',
      badge: 'Schedule',
      desc: 'Original paper schedule scan with Morning Foundation and Daily Law.',
      icon: <FileText className="w-5 h-5 text-slate-600" />,
      bg: 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800',
      action: () => {
        sounds.playClick();
        onClose();
        onOpenOriginalNote();
      },
    },
    {
      id: 'timer',
      title: '20-Minute Focus Sprint',
      badge: 'Pomodoro',
      desc: 'Start an uninterrupted deep work timer with companion encouragement.',
      icon: <Clock className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-200 text-indigo-950',
      action: () => {
        sounds.playClick();
        onClose();
        onOpenTimer();
      },
    },
    {
      id: 'wardrobe',
      title: 'Wardrobe & Accessories',
      badge: 'Companion',
      desc: 'Equip bows, glasses, headbands, and aura sparkles on your companion.',
      icon: <Sparkles className="w-5 h-5 text-pink-600" />,
      bg: 'bg-pink-50 hover:bg-pink-100/80 border-pink-200 text-pink-950',
      action: () => {
        sounds.playClick();
        onClose();
        onOpenWardrobe();
      },
    },
    {
      id: 'add-quest',
      title: 'Add Custom Quest',
      badge: '+XP',
      desc: 'Log a new custom mission with priority, XP reward, and deadline.',
      icon: <Plus className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-200 text-indigo-950',
      action: () => {
        sounds.playClick();
        onClose();
        onOpenAddTask();
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-left border-l border-slate-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-sm">
              ⚡
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 font-display">
                Quick Access Hub
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                All tools, vaults, sheets & roadmaps in one tap
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-200/60 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tools Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={tool.action}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer group active:scale-[0.99] ${tool.bg}`}
            >
              <div className="w-8 h-8 rounded-xl bg-white shadow-2xs flex items-center justify-center shrink-0 mt-0.5 border border-black/5">
                {tool.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className="text-xs font-black font-display truncate">
                    {tool.title}
                  </h4>
                  {tool.badge && (
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded-md bg-white/80 border border-black/10 shrink-0">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] opacity-75 line-clamp-1 leading-snug">
                  {tool.desc}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
            </button>
          ))}
        </div>

        {/* Footer with Reset and Sound toggles */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
              onOpenResetConfirm();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Fresh From Zero 🌱</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onToggleSound();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold transition cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span>Audio Muted</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
