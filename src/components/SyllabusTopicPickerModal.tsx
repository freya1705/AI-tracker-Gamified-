import React, { useState } from 'react';
import { SyllabusTopic } from '../types';
import { MASTER_AI_MODULES, MASTER_SWE_PILLARS, ALL_SYLLABUS_TOPICS } from '../data/syllabusData';
import { sounds } from '../utils/audio';
import { X, Search, Sparkles, Target, Zap, Brain } from 'lucide-react';

interface SyllabusTopicPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterMode?: 'all' | 'ai' | 'swe';
  onSelectTopic: (topic: SyllabusTopic) => void;
}

export const SyllabusTopicPickerModal: React.FC<SyllabusTopicPickerModalProps> = ({
  isOpen,
  onClose,
  filterMode = 'all',
  onSelectTopic,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'ai' | 'swe'>(filterMode);

  if (!isOpen) return null;

  const filteredTopics = ALL_SYLLABUS_TOPICS.filter(t => {
    if (activeCategory === 'ai' && t.category !== 'ai') return false;
    if (activeCategory === 'swe' && t.category !== 'swe') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchMod = t.moduleName.toLowerCase().includes(q);
      const matchSub = t.subgroup?.toLowerCase().includes(q);
      if (!matchTitle && !matchMod && !matchSub) return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-3 bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-lg font-black shadow-md">
              🎯
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Pick Today's Focus from Master Syllabus
              </h3>
              <p className="text-xs text-indigo-200">
                Choose 1 topic to conquer today without pressure
              </p>
            </div>
          </div>

          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-slate-50">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              placeholder="Search 307 syllabus topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl shrink-0">
            <button
              onClick={() => { sounds.playClick(); setActiveCategory('all'); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => { sounds.playClick(); setActiveCategory('ai'); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'ai' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              AI (26)
            </button>
            <button
              onClick={() => { sounds.playClick(); setActiveCategory('swe'); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'swe' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              SWE (9)
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2 divide-y divide-slate-100">
          {filteredTopics.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs font-medium">
              No matching topics found for "{searchQuery}".
            </div>
          ) : (
            filteredTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => {
                  sounds.playLevelUp();
                  onSelectTopic(topic);
                  onClose();
                }}
                className="pt-2 pb-2 px-3 rounded-2xl hover:bg-indigo-50/70 border border-transparent hover:border-indigo-200 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${
                      topic.category === 'ai' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {topic.moduleName}
                    </span>
                    {topic.subgroup && (
                      <span className="text-[9px] font-bold text-slate-500">
                        • {topic.subgroup}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 mt-0.5 group-hover:text-indigo-900 transition-colors">
                    {topic.title}
                  </h4>
                  {topic.whyItMatters && (
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {topic.whyItMatters}
                    </p>
                  )}
                </div>

                <button
                  className="px-3 py-1.5 rounded-xl bg-slate-100 group-hover:bg-indigo-600 text-slate-600 group-hover:text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
                >
                  Select 🎯
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
