import React, { useState, useMemo } from 'react';
import { Task } from '../../types';
import { sounds } from '../../utils/audio';
import { TaskCard } from '../TaskCard';
import { 
  ListTodo, Search, Filter, Plus, Trophy, 
  Sparkles, Flame, CheckCircle2, Shield, Bookmark
} from 'lucide-react';

interface QuestBoardViewProps {
  tasks: Task[];
  onToggleComplete: (id: string, e: React.MouseEvent) => void;
  onDeleteTask: (id: string) => void;
  onOpenAddTask: () => void;
}

export const QuestBoardView: React.FC<QuestBoardViewProps> = ({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onOpenAddTask,
}) => {
  const [questCategory, setQuestCategory] = useState<string>('all');
  const [questPriority, setQuestPriority] = useState<string>('all');
  const [questSearch, setQuestSearch] = useState<string>('');

  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (questCategory === 'active' && task.completed) return false;
      if (questCategory === 'completed' && !task.completed) return false;
      if (questCategory !== 'all' && questCategory !== 'active' && questCategory !== 'completed') {
        if (task.category !== questCategory) return false;
      }
      if (questPriority !== 'all' && task.priority !== questPriority) return false;
      if (questSearch.trim()) {
        const q = questSearch.toLowerCase();
        const mTitle = task.title.toLowerCase().includes(q);
        const mTopic = task.topic?.toLowerCase().includes(q);
        const mNotes = task.notes?.toLowerCase().includes(q);
        if (!mTitle && !mTopic && !mNotes) return false;
      }
      return true;
    });
  }, [tasks, questCategory, questPriority, questSearch]);

  const categories = [
    { id: 'all', label: 'All Quests', count: tasks.length },
    { id: 'active', label: 'Active ⏳', count: activeCount },
    { id: 'completed', label: 'Completed ✨', count: completedCount },
    { id: 'routine', label: 'Morning Foundation 🌅', count: tasks.filter(t => t.category === 'routine').length },
    { id: 'dsa', label: 'DSA / LeetCode ⚡', count: tasks.filter(t => t.category === 'dsa').length },
    { id: 'aiml', label: 'AI/ML Guide 🧠', count: tasks.filter(t => t.category === 'aiml').length },
    { id: 'project', label: 'PatientTriage 🏥', count: tasks.filter(t => t.category === 'project').length },
    { id: 'college', label: 'IITM & College 🎓', count: tasks.filter(t => t.category === 'college').length },
  ];

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      
      {/* 1. Adventurer's Guild Quest Board Banner */}
      <div className="relative rounded-3xl p-6 sm:p-7 overflow-hidden border border-purple-500/30 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#1e1b4b] shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30">
                📜 Adventurer's Notice Board
              </span>
              <span className="text-xs font-mono text-purple-300">
                {activeCount} Active Bounties • {completedCount} Claimed
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-200 font-display drop-shadow-md">
              THE QUEST NOTICE BOARD
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80 max-w-2xl leading-relaxed">
              Every quest completed rewards you with XP, increases your streak, and brings you closer to your next Level Up.
              Pin new tasks or take on priority bounties.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                sounds.playClick();
                onOpenAddTask();
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Post New Quest Bounty</span>
            </button>
          </div>
        </div>

        {/* Search & Priority Controls */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search quests by title, topic, or notes..."
              value={questSearch}
              onChange={(e) => setQuestSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-purple-400/30 text-xs text-purple-100 placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={questPriority}
              onChange={(e) => setQuestPriority(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-purple-400/30 text-xs font-bold text-purple-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="all">All Priorities</option>
              <option value="high">🔴 High Priority</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Optional / Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playClick();
                setQuestCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                questCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-purple-200 border border-white/10'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                questCategory === cat.id ? 'bg-amber-900/30 text-slate-900' : 'bg-black/30 text-purple-300'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#1e1b4b]/60 border border-purple-500/20">
            <div className="text-3xl mb-2">🎉</div>
            <h4 className="text-sm font-bold text-amber-200 font-display">No quests on this board</h4>
            <p className="text-xs text-purple-300 mt-1">Try another filter or post a new quest bounty!</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>

    </div>
  );
};
