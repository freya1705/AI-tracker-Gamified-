import React from 'react';
import { sounds } from '../../utils/audio';
import { UserStats } from '../../types';
import { Sparkles, Search, Zap, Flame, Brain, LayoutDashboard } from 'lucide-react';

interface AppHeaderProps {
  activeTab: 'daily_system' | 'master';
  onSelectTab: (tab: 'daily_system' | 'master') => void;
  onOpenSearch: () => void;
  onOpenQuickAccess: () => void;
  stats: UserStats;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenQuickAccess,
  stats,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-2.5 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Sparkles className="w-5 h-5 fill-white/80" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-slate-900 font-display">
                Freya Quest
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-800 border border-purple-200">
                AI Engineer
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Daily Missions • SWE First + AI Specialization
            </p>
          </div>
        </div>

        {/* Central Core Switcher: TODAY vs MASTER */}
        <nav className="flex items-center p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-inner">
          <button
            onClick={() => {
              sounds.playClick();
              onSelectTab('daily_system');
            }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'daily_system'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-500" />
            <span>🌱 TODAY</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onSelectTab('master');
            }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'master'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-purple-600" />
            <span>🧠 MASTER</span>
          </button>
        </nav>

        {/* Right Tools: Search, Quick Access, Companion Stats */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Global Search Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenSearch();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-600 font-semibold text-xs rounded-xl border border-slate-200/80 transition-all cursor-pointer"
            title="Global Search across topics, missions, resources (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden lg:inline text-[9px] font-mono px-1 py-0.2 bg-white rounded border border-slate-200 text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Quick Access Drawer Trigger */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenQuickAccess();
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm shadow-purple-200 transition-all cursor-pointer active:scale-95"
            title="Open Quick Access Hub (All sheets, vaults & roadmaps)"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span className="hidden sm:inline">Quick Access</span>
          </button>

          {/* Companion Mini Status Badge */}
          <div 
            onClick={() => {
              sounds.playClick();
              onSelectTab('daily_system');
            }}
            className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 text-xs font-bold cursor-pointer"
            title={`${stats.characterName}: Level ${stats.level}, ${stats.currentXP}/${stats.nextLevelXP} XP, ${stats.streakDays} day streak`}
          >
            <span className="text-[11px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
              Lv.{stats.level}
            </span>
            <span className="flex items-center gap-0.5 text-orange-600 font-black text-[11px]">
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              {stats.streakDays}d
            </span>
          </div>

        </div>

      </div>
    </header>
  );
};
