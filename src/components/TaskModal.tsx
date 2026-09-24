import React, { useState } from 'react';
import { Task, TaskCategory, TaskPriority } from '../types';
import { sounds } from '../utils/audio';
import { X, Plus, Sparkles } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (newTask: Omit<Task, 'id' | 'completed'>) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('aiml');
  const [topic, setTopic] = useState('');
  const [xp, setXp] = useState(40);
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);
  const [notes, setNotes] = useState('');
  const [resourceLink, setResourceLink] = useState('');
  const [isCompulsory, setIsCompulsory] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    sounds.playClick();
    onAddTask({
      title: title.trim(),
      category,
      topic: topic.trim() || undefined,
      xp: Number(xp) || 30,
      priority,
      estimatedMinutes: Number(estimatedMinutes) || 20,
      notes: notes.trim() || undefined,
      resourceLink: resourceLink.trim() || undefined,
      isCompulsory,
      dayModeMatch: ['normal', 'free'],
    });

    setTitle('');
    setTopic('');
    setNotes('');
    setResourceLink('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 font-display">
              Add New Quest Task
            </h3>
            <p className="text-xs text-slate-500">
              Set your goal, assign XP, and conquer it today!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Implement NumPy linear regression from scratch"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category & Priority Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="aiml">🧠 AI / ML Learning</option>
                <option value="dsa">⚡ DSA / LeetCode</option>
                <option value="routine">🍋 Morning & Compulsory</option>
                <option value="project">🏥 PatientTriage / Project</option>
                <option value="college">🎓 IITM & College</option>
                <option value="after_studies">🎨 After Studies / Hobbies</option>
                <option value="deadline">⏰ Important Deadline</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="high">🔴 High Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="low">🟢 Low / Optional</option>
              </select>
            </div>
          </div>

          {/* Topic & Minutes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Topic / Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Andrew Ng W1 or Graphs BFS"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
              </input>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Estimated Minutes
              </label>
              <input
                type="number"
                min="5"
                max="240"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* XP Reward selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              XP Reward: <span className="text-amber-600 font-extrabold">+{xp} XP</span>
            </label>
            <div className="flex items-center gap-2">
              {[20, 35, 50, 75, 100].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setXp(val)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    xp === val
                      ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  +{val}
                </button>
              ))}
            </div>
          </div>

          {/* Resource link & Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Resource Link (Optional)
            </label>
            <input
              type="url"
              placeholder="https://kaggle.com/... or https://leetcode.com/..."
              value={resourceLink}
              onChange={(e) => setResourceLink(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Notes / Success Criteria
            </label>
            <textarea
              rows={2}
              placeholder="What proves this is done? (e.g. Clean script committed to GitHub)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Compulsory toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="compulsoryToggle"
              checked={isCompulsory}
              onChange={(e) => setIsCompulsory(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="compulsoryToggle" className="text-xs font-medium text-slate-700 cursor-pointer">
              Mark as Compulsory Daily Habit
            </label>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-all cursor-pointer"
            >
              Add Task ✨
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
