import React from 'react';
import { UserStats } from '../../types';
import { sounds } from '../../utils/audio';
import { 
  Sparkles, Search, Compass, Flame, Trophy, 
  Map, BookOpen, ListTodo, Calendar, Backpack, Shield
} from 'lucide-react';

export type ActiveRealm = 'today' | 'master' | 'roadmap' | 'resources' | 'quests' | 'calendar';

interface WorldHeaderProps {
  activeRealm: ActiveRealm;
  onSelectRealm: (realm: ActiveRealm) => void;
  onOpenSearch: () => void;
  onOpenSatchel: () => void;
  stats: UserStats;
}

export const WorldHeader: React.FC<WorldHeaderProps> = ({
  activeRealm,
  onSelectRealm,
  onOpenSearch,
  onOpenSatchel,
  stats,
}) => {
  const xpPercent = Math.min(100, Math.round((stats.currentXP / stats.nextLevelXP) * 100));

  const realms: { id: ActiveRealm; label: string; icon: any; visualTitle: string }[] = [
    { id: 'today', label: 'Today', icon: Sparkles, visualTitle: 'Quest Scene' },
    { id: 'master', label: 'World Map', icon: Map, visualTitle: 'Adventure Map' },
    { id: 'roadmap', label: 'Roadmap', icon: Trophy, visualTitle: 'Founder Path' },
    { id: 'resources', label: 'Library', icon: BookOpen, visualTitle: 'Knowledge Vault' },
    { id: 'quests', label: 'Quest Board', icon: ListTodo, visualTitle: 'Quests' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, visualTitle: 'Expedition' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1e1b4b]/90 backdrop-blur-md border-b border-purple-500/30 text-white shadow-xl px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand / World Sigil */}
        <div 
          onClick={() => {
            sounds.playClick();
            onSelectRealm('today');
          }}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform border border-amber-300/40">
            <span className="text-base select-none">👑</span>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-indigo-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-wider text-amber-200 font-display drop-shadow-sm">
                FREYA QUEST
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.2 rounded-md bg-purple-900/80 text-purple-200 border border-purple-400/40">
                AI RPG
              </span>
            </div>
            <p className="text-[10px] text-purple-200/80 font-medium hidden sm:block">
              {stats.heroLevelTitle || 'AI-Powered Engineer Journey'}
            </p>
          </div>
        </div>

        {/* 5 Primary Realms Navigation */}
        <nav className="flex items-center gap-1 p-1 bg-black/30 rounded-2xl border border-white/10 shadow-inner overflow-x-auto scrollbar-none">
          {realms.map((realm) => {
            const Icon = realm.icon;
            const isSelected = activeRealm === realm.id;
            return (
              <button
                key={realm.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectRealm(realm.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-purple-200 hover:text-white hover:bg-white/10'
                }`}
                title={realm.visualTitle}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-purple-300'}`} />
                <span>{realm.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right HUD: Player Level, Streak, Search, Satchel */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Global World Search */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenSearch();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-purple-200 font-bold text-xs rounded-xl border border-white/15 transition cursor-pointer"
            title="Search the World (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline text-[11px]">Search</span>
            <kbd className="hidden lg:inline text-[9px] font-mono px-1 py-0.2 bg-black/40 rounded border border-white/20 text-purple-300">
              ⌘K
            </kbd>
          </button>

          {/* Player Level & XP Crystal Ring */}
          <div 
            onClick={() => {
              sounds.playClick();
              onSelectRealm('today');
            }}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-purple-900/60 border border-purple-400/30 cursor-pointer hover:border-purple-300 transition"
            title={`Level ${stats.level}: ${stats.currentXP}/${stats.nextLevelXP} XP (${xpPercent}%)`}
          >
            <div className="relative flex items-center justify-center">
              <span className="text-xs font-black text-amber-300 font-display">
                Lv.{stats.level}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="w-16 bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/10">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-amber-300 h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${Math.max(8, xpPercent)}%` }}
                />
              </div>
              <span className="text-[9px] font-mono text-purple-300 font-bold">
                {stats.currentXP} XP
              </span>
            </div>
          </div>

          {/* Streak Flame */}
          <div 
            className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 rounded-xl text-amber-300 font-black text-xs shadow-xs"
            title={`Consistency Streak: ${stats.streakDays} Day(s)`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
            <span>{stats.streakDays}d</span>
          </div>

          {/* Quest Satchel / Adventurer's Backpack */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenSatchel();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl border border-purple-400/50 shadow-md shadow-purple-900/50 transition cursor-pointer active:scale-95"
            title="Open Adventurer's Satchel (Checklist, Free Resources, Problem Sheet, Notes, Roadmaps, Wardrobe)"
          >
            <Backpack className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Satchel</span>
          </button>

        </div>

      </div>
    </header>
  );
};
