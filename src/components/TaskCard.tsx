import React, { useState } from 'react';
import { Task } from '../types';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, Circle, Clock, ExternalLink, Sparkles, 
  Trash2, ChevronDown, ChevronUp, AlertCircle, Bookmark 
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string, e: React.MouseEvent) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onDeleteTask,
}) => {
  const [expanded, setExpanded] = useState(false);

  const categoryMeta = {
    aiml: { label: 'AI/ML Guide', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    dsa: { label: 'DSA / LeetCode', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    routine: { label: 'Morning & Habit', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    after_studies: { label: 'After Studies', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    project: { label: 'PatientTriage', color: 'bg-rose-100 text-rose-700 border-rose-200' },
    college: { label: 'IITM & College', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
    deadline: { label: 'Deadline', color: 'bg-red-100 text-red-700 border-red-200' },
  }[task.category] || { label: 'Task', color: 'bg-slate-100 text-slate-700 border-slate-200' };

  const priorityMeta = {
    high: { label: 'High Priority', badge: 'bg-rose-50 text-rose-600 border-rose-200' },
    medium: { label: 'Medium', badge: 'bg-amber-50 text-amber-600 border-amber-200' },
    low: { label: 'Optional / Low', badge: 'bg-slate-50 text-slate-500 border-slate-200' },
  }[task.priority];

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-200 ${
        task.completed
          ? 'bg-slate-50/70 border-slate-200 opacity-60'
          : 'bg-white hover:bg-slate-50/50 border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-md'
      }`}
    >
      <div className="p-4 flex items-start gap-3 sm:gap-4">
        {/* Completion Checkbox */}
        <button
          onClick={(e) => onToggleComplete(task.id, e)}
          className="mt-0.5 text-slate-300 hover:text-indigo-600 transition-colors cursor-pointer shrink-0"
          title={task.completed ? "Mark as active" : "Mark as done & claim XP!"}
        >
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-50" />
          ) : (
            <Circle className="w-6 h-6 text-slate-300 hover:text-indigo-500 hover:scale-105 transition-transform" />
          )}
        </button>

        {/* Task Info */}
        <div className="flex-1 min-w-0">
          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            {task.dayTag && (
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-600 text-white shadow-xs">
                {task.dayTag}
              </span>
            )}
            
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${categoryMeta.color}`}>
              {categoryMeta.label}
            </span>

            {task.isCompulsory && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                ⭐ Compulsory
              </span>
            )}

            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${priorityMeta.badge}`}>
              {priorityMeta.label}
            </span>

            {task.estimatedMinutes && (
              <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded-md">
                <Clock className="w-2.5 h-2.5 text-slate-400" />
                {task.estimatedMinutes}m
              </span>
            )}
          </div>

          {/* Title */}
          <h4
            className={`text-sm sm:text-base font-semibold text-slate-800 ${
              task.completed ? 'line-through text-slate-400' : ''
            }`}
          >
            {task.title}
          </h4>

          {/* Subtopic or brief note preview */}
          {task.topic && (
            <p className="text-xs text-indigo-600 font-medium mt-0.5">
              Topic: {task.topic}
            </p>
          )}

          {/* Expanded Notes Section */}
          {expanded && task.notes && (
            <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 text-xs text-slate-600 leading-relaxed border border-slate-200/80 animate-pop-in">
              <p className="font-medium text-slate-700 mb-1">Details & Advice:</p>
              <p>{task.notes}</p>
              
              {task.resourceLink && (
                <a
                  href={task.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-indigo-600 font-bold hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open Primary Resource</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right side: XP Reward + Actions */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
          {/* XP Pill */}
          <div 
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black shadow-xs ${
              task.completed 
                ? 'bg-slate-100 text-slate-400' 
                : 'bg-amber-100/80 text-amber-800 border border-amber-200'
            }`}
            title="XP reward awarded on completion"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>+{task.xp} XP</span>
          </div>

          <div className="flex items-center gap-1">
            {task.notes && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title={expanded ? "Hide details" : "Show details"}
              >
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={() => onDeleteTask(task.id)}
              className="p-1 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
              title="Delete task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
