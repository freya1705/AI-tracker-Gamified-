import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ALL_SYLLABUS_TOPICS } from '../../data/syllabusData';
import { FREE_RESOURCE_LIST } from '../../data/resourceData';
import { Task, SyllabusTopic } from '../../types';
import { sounds } from '../../utils/audio';
import { 
  Search, X, Sparkles, BookOpen, CheckSquare, Trophy, 
  Clock, Compass, RotateCcw, ExternalLink, ArrowRight, Zap, Target
} from 'lucide-react';

interface GlobalCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: 'daily_system' | 'master', masterSubTab?: string) => void;
  onLoadTopicIntoDaily: (topic: SyllabusTopic) => void;
  onOpenChecklist: () => void;
  onOpenResources: (stageId?: string) => void;
  onOpenFounderRoadmap: () => void;
  onOpenRoadmap: () => void;
  onOpenProblemSheet: () => void;
  onOpenOriginalNote: () => void;
  onOpenTimer: () => void;
  onOpenWardrobe: () => void;
  onOpenResetConfirm: () => void;
  onOpenAddTask: () => void;
  tasks: Task[];
}

export const GlobalCommandPalette: React.FC<GlobalCommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
  onLoadTopicIntoDaily,
  onOpenChecklist,
  onOpenResources,
  onOpenFounderRoadmap,
  onOpenRoadmap,
  onOpenProblemSheet,
  onOpenOriginalNote,
  onOpenTimer,
  onOpenWardrobe,
  onOpenResetConfirm,
  onOpenAddTask,
  tasks,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Command items
  const quickActions = useMemo(() => [
    {
      id: 'act-today',
      title: "🌱 Switch to Today's World",
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4 text-emerald-500" />,
      action: () => onNavigateToTab('daily_system'),
    },
    {
      id: 'act-master',
      title: "🧠 Switch to Master Knowledge Map",
      category: 'Navigation',
      icon: <Target className="w-4 h-4 text-purple-500" />,
      action: () => onNavigateToTab('master', 'ai'),
    },
    {
      id: 'act-checklist',
      title: "📋 Open Master AI Checklist (Sections 0–29)",
      category: 'Tools',
      icon: <CheckSquare className="w-4 h-4 text-emerald-600" />,
      action: onOpenChecklist,
    },
    {
      id: 'act-resources',
      title: "📚 Open Free Resources Vault (38+ Resources)",
      category: 'Tools',
      icon: <BookOpen className="w-4 h-4 text-amber-500" />,
      action: () => onOpenResources(),
    },
    {
      id: 'act-timer',
      title: "⏱️ Start 20-Minute Focus Sprint",
      category: 'Tools',
      icon: <Clock className="w-4 h-4 text-indigo-500" />,
      action: onOpenTimer,
    },
    {
      id: 'act-founder',
      title: "🏆 View 2026–2032+ Founder Roadmap",
      category: 'Roadmap',
      icon: <Trophy className="w-4 h-4 text-purple-600" />,
      action: onOpenFounderRoadmap,
    },
    {
      id: 'act-guide',
      title: "🧭 View 7-Step AI Guide & Practical Verdicts",
      category: 'Roadmap',
      icon: <Compass className="w-4 h-4 text-indigo-600" />,
      action: onOpenRoadmap,
    },
    {
      id: 'act-problem',
      title: "💡 Problem of the Week Worksheet",
      category: 'Tools',
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      action: onOpenProblemSheet,
    },
    {
      id: 'act-note',
      title: "📝 View Original Handwritten Schedule Note",
      category: 'Tools',
      icon: <BookOpen className="w-4 h-4 text-slate-500" />,
      action: onOpenOriginalNote,
    },
    {
      id: 'act-add-quest',
      title: "➕ Add Custom Quest",
      category: 'Quests',
      icon: <Sparkles className="w-4 h-4 text-indigo-500" />,
      action: onOpenAddTask,
    },
    {
      id: 'act-wardrobe',
      title: "👗 Open Wardrobe & Dress Up",
      category: 'Companion',
      icon: <Sparkles className="w-4 h-4 text-pink-500" />,
      action: onOpenWardrobe,
    },
    {
      id: 'act-reset',
      title: "🌱 Refresh / Start from Zero for Today",
      category: 'System',
      icon: <RotateCcw className="w-4 h-4 text-rose-500" />,
      action: onOpenResetConfirm,
    },
  ], [onNavigateToTab, onOpenChecklist, onOpenResources, onOpenTimer, onOpenFounderRoadmap, onOpenRoadmap, onOpenProblemSheet, onOpenOriginalNote, onOpenAddTask, onOpenWardrobe, onOpenResetConfirm]);

  // Filtered results
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return quickActions.slice(0, 8).map(a => ({
        id: a.id,
        title: a.title,
        subtitle: a.category,
        type: 'action' as const,
        icon: a.icon,
        run: a.action,
      }));
    }

    const results: Array<{
      id: string;
      title: string;
      subtitle: string;
      type: 'action' | 'topic' | 'resource' | 'task';
      icon: React.ReactNode;
      run: () => void;
      url?: string;
    }> = [];

    // 1. Actions match
    for (const a of quickActions) {
      if (a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)) {
        results.push({
          id: a.id,
          title: a.title,
          subtitle: `Action • ${a.category}`,
          type: 'action',
          icon: a.icon,
          run: a.action,
        });
      }
    }

    // 2. Syllabus Topics match
    for (const topic of ALL_SYLLABUS_TOPICS) {
      if (
        topic.title.toLowerCase().includes(q) ||
        topic.moduleName.toLowerCase().includes(q) ||
        (topic.subgroup && topic.subgroup.toLowerCase().includes(q))
      ) {
        results.push({
          id: topic.id,
          title: topic.title,
          subtitle: `${topic.category === 'ai' ? '🤖 AI' : '⚡ SWE'} • ${topic.moduleName}`,
          type: 'topic',
          icon: <Target className="w-4 h-4 text-purple-500" />,
          run: () => onLoadTopicIntoDaily(topic),
        });
      }
      if (results.length >= 25) break;
    }

    // 3. Resources match
    for (const res of FREE_RESOURCE_LIST) {
      if (
        res.name.toLowerCase().includes(q) ||
        res.sectionTitle.toLowerCase().includes(q) ||
        res.tag.toLowerCase().includes(q) ||
        (res.whyUseIt && res.whyUseIt.toLowerCase().includes(q))
      ) {
        results.push({
          id: res.id,
          title: res.name,
          subtitle: `Resource • ${res.sectionTitle} (${res.type})`,
          type: 'resource',
          icon: <ExternalLink className="w-4 h-4 text-amber-500" />,
          url: res.url,
          run: () => window.open(res.url, '_blank'),
        });
      }
      if (results.length >= 35) break;
    }

    // 4. Tasks match
    for (const task of tasks) {
      if (task.title.toLowerCase().includes(q) || (task.topic && task.topic.toLowerCase().includes(q))) {
        results.push({
          id: task.id,
          title: task.title,
          subtitle: `Quest • ${task.category.toUpperCase()} (+${task.xp} XP)`,
          type: 'task',
          icon: <CheckSquare className="w-4 h-4 text-emerald-500" />,
          run: () => onNavigateToTab('master', 'quests'),
        });
      }
      if (results.length >= 40) break;
    }

    return results;
  }, [query, quickActions, tasks, onLoadTopicIntoDaily, onNavigateToTab]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (searchResults.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (searchResults.length || 1)) % (searchResults.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = searchResults[selectedIndex];
      if (current) {
        sounds.playClick();
        current.run();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[75vh] animate-scale-up"
        onKeyDown={handleKeyDown}
      >
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search topics, missions, resources, or quick actions..."
            className="flex-1 bg-transparent border-none text-slate-800 text-sm focus:outline-none placeholder-slate-400 font-medium"
          />
          {query ? (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {searchResults.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No matching topics, missions, or resources found.
            </div>
          ) : (
            searchResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id + index}
                  onClick={() => {
                    sounds.playClick();
                    item.run();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    isSelected ? 'bg-indigo-50/90 text-indigo-950 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate text-slate-800">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                    {item.type === 'topic' && (
                      <span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                        Load in Today
                      </span>
                    )}
                    {item.type === 'resource' && (
                      <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-0.5">
                        Open Link <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    )}
                    {isSelected && (
                      <span className="text-indigo-600 hidden sm:inline">↵ Select</span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>Navigation: <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[9px]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[9px]">↓</kbd></span>
            <span>Select: <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[9px]">↵</kbd></span>
          </div>
          <span>Freya Quest Knowledge Hub</span>
        </div>

      </div>
    </div>
  );
};
