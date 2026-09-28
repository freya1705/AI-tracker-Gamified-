import React, { useState, useEffect, useMemo } from 'react';
import { 
  VERBATIM_CHECKLIST_SECTIONS, 
  VerbatimChecklistSection, 
  VerbatimChecklistItem, 
  TOTAL_VERBATIM_ITEMS 
} from '../data/verbatimChecklistData';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  X, CheckSquare, Square, Search, Filter, Sparkles, 
  RotateCcw, ChevronDown, ChevronRight, CheckCircle2, 
  Award, Flame, BookOpen, Layers, ArrowRight
} from 'lucide-react';

const STORAGE_KEY_CHECKLIST = 'freya_quest_verbatim_checklist_v1';

interface MasterChecklistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  checkedIds: string[];
  onToggleItem: (id: string) => void;
  onResetAll: () => void;
}

export const MasterChecklistDrawer: React.FC<MasterChecklistDrawerProps> = ({
  isOpen,
  onClose,
  checkedIds,
  onToggleItem,
  onResetAll,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'completed'>('all');
  const [collapsedSections, setCollapsedSections] = useState<Record<number, boolean>>({});
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const checkedSet = useMemo(() => new Set(checkedIds), [checkedIds]);

  // Overall stats
  const completedCount = checkedIds.length;
  const progressPercent = Math.round((completedCount / TOTAL_VERBATIM_ITEMS) * 100);

  // Handle section collapse toggle
  const toggleSectionCollapse = (secNum: number) => {
    sounds.playClick();
    setCollapsedSections(prev => ({ ...prev, [secNum]: !prev[secNum] }));
  };

  const handleExpandAll = () => {
    sounds.playClick();
    setCollapsedSections({});
  };

  const handleCollapseAll = () => {
    sounds.playClick();
    const allCollapsed: Record<number, boolean> = {};
    VERBATIM_CHECKLIST_SECTIONS.forEach(s => {
      allCollapsed[s.sectionNum] = true;
    });
    setCollapsedSections(allCollapsed);
  };

  // Toggle item with audio & celebration
  const handleItemClick = (item: VerbatimChecklistItem, section: VerbatimChecklistSection, e: React.MouseEvent) => {
    const wasChecked = checkedSet.has(item.id);
    if (!wasChecked) {
      sounds.playTaskComplete();
      
      // Check if this completes the section
      const sectionTotal = section.items.length;
      const sectionDone = section.items.filter(i => i.id === item.id || checkedSet.has(i.id)).length;
      if (sectionDone === sectionTotal) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { x: 0.8, y: 0.5 }
        });
        sounds.playLevelUp();
      }
    } else {
      sounds.playClick();
    }
    onToggleItem(item.id);
  };

  // Filtered sections & items
  const filteredSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return VERBATIM_CHECKLIST_SECTIONS.map(section => {
      const items = section.items.filter(item => {
        const isCompleted = checkedSet.has(item.id);
        
        // Filter mode
        if (filterMode === 'pending' && isCompleted) return false;
        if (filterMode === 'completed' && !isCompleted) return false;

        // Search query
        if (q) {
          const matchItem = item.text.toLowerCase().includes(q);
          const matchSub = item.subgroup?.toLowerCase().includes(q);
          const matchSec = section.title.toLowerCase().includes(q);
          return matchItem || matchSub || matchSec;
        }

        return true;
      });

      return {
        ...section,
        visibleItems: items,
      };
    }).filter(sec => sec.visibleItems.length > 0 || (searchQuery.trim() === '' && filterMode === 'all'));
  }, [searchQuery, filterMode, checkedSet]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col border-l border-slate-200">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white border-b border-emerald-800/40 relative">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-400 text-slate-950 flex items-center justify-center text-xl font-black shadow-md">
                  📋
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                      Verbatim Master Sheet
                    </span>
                    <span className="text-xs font-bold text-amber-300">
                      Sections 0 → 29
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white font-display mt-0.5">
                    Master AI Syllabus Checklist
                  </h2>
                </div>
              </div>

              <button
                onClick={() => { sounds.playClick(); onClose(); }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close Checklist Sheet (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-emerald-100/90 leading-relaxed mb-4">
              Your complete, exact 30-section AI syllabus. Tick off each topic as you learn, understand, and implement it.
            </p>

            {/* Overall Progress Gauge */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 shadow-inner flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-200">Total Mastery Progress:</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-black">{completedCount} / {TOTAL_VERBATIM_ITEMS}</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-black">
                    {progressPercent}%
                  </span>
                </div>
              </div>

              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div 
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-400 h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${Math.max(2, progressPercent)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>🌱 0. Programming Foundation</span>
                <span>29. AI Product Building 🚀</span>
              </div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search 280+ topics (e.g. Attention, PyTorch, LoRA, PCA)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl shrink-0">
                <button
                  onClick={() => { sounds.playClick(); setFilterMode('all'); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filterMode === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => { sounds.playClick(); setFilterMode('pending'); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filterMode === 'pending' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => { sounds.playClick(); setFilterMode('completed'); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filterMode === 'completed' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Done
                </button>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExpandAll}
                  className="text-[11px] font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Expand All
                </button>
                <span className="text-slate-300">•</span>
                <button
                  onClick={handleCollapseAll}
                  className="text-[11px] font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Collapse All
                </button>
              </div>

              {completedCount > 0 && (
                <button
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="text-[11px] font-bold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear All Ticks</span>
                </button>
              )}
            </div>
          </div>

          {/* Checklist Sections List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {filteredSections.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs font-medium">
                No topics matching "{searchQuery}".
              </div>
            ) : (
              filteredSections.map(section => {
                const isCollapsed = Boolean(collapsedSections[section.sectionNum]);
                const secTotal = section.items.length;
                const secDone = section.items.filter(i => checkedSet.has(i.id)).length;
                const isSecComplete = secDone === secTotal && secTotal > 0;

                // Group items by subgroup
                const groupedItems: { subgroup?: string; items: VerbatimChecklistItem[] }[] = [];
                let currentGroup: { subgroup?: string; items: VerbatimChecklistItem[] } = {
                  subgroup: undefined,
                  items: [],
                };

                section.visibleItems.forEach(item => {
                  if (item.subgroup !== currentGroup.subgroup) {
                    if (currentGroup.items.length > 0) {
                      groupedItems.push(currentGroup);
                    }
                    currentGroup = { subgroup: item.subgroup, items: [item] };
                  } else {
                    currentGroup.items.push(item);
                  }
                });
                if (currentGroup.items.length > 0) {
                  groupedItems.push(currentGroup);
                }

                return (
                  <div
                    key={section.sectionNum}
                    className={`rounded-2xl border transition-all ${
                      isSecComplete
                        ? 'bg-emerald-50/40 border-emerald-200/80 shadow-xs'
                        : 'bg-white border-slate-200/90 shadow-xs hover:border-slate-300'
                    }`}
                  >
                    {/* Section Header */}
                    <div
                      onClick={() => toggleSectionCollapse(section.sectionNum)}
                      className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none rounded-2xl hover:bg-slate-50/80 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <button className="text-slate-400 hover:text-slate-600 transition-colors">
                          {isCollapsed ? (
                            <ChevronRight className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <h3 className={`text-xs sm:text-sm font-black font-display truncate ${
                          isSecComplete ? 'text-emerald-900' : 'text-slate-800'
                        }`}>
                          {section.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                          isSecComplete
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : secDone > 0
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {secDone}/{secTotal} {isSecComplete ? '✨' : 'Done'}
                        </span>
                      </div>
                    </div>

                    {/* Section Body */}
                    {!isCollapsed && (
                      <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3">
                        
                        {/* Section Special Note */}
                        {section.note && (
                          <div className="p-2.5 px-3 rounded-xl bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-900 font-medium italic leading-relaxed">
                            💡 <strong>Note:</strong> {section.note}
                          </div>
                        )}

                        {/* Section Workflow */}
                        {section.workflow && (
                          <div className="p-2.5 px-3 rounded-xl bg-indigo-50/70 border border-indigo-200/70 text-[11px] text-indigo-950 font-bold">
                            <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider block mb-1">
                              Complete ML Workflow:
                            </span>
                            <div className="flex items-center flex-wrap gap-1.5 text-[11px]">
                              {section.workflow.split('→').map((step, idx) => (
                                <React.Fragment key={idx}>
                                  <span className="bg-white px-2 py-0.5 rounded-md border border-indigo-200 text-indigo-900 shadow-2xs font-semibold">
                                    {step.trim()}
                                  </span>
                                  {idx < section.workflow!.split('→').length - 1 && (
                                    <span className="text-indigo-400 font-bold">→</span>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Items by subgroup */}
                        {groupedItems.map((group, gIdx) => (
                          <div key={gIdx} className="space-y-1.5">
                            {group.subgroup && (
                              <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 pt-2 pb-1 border-b border-slate-100 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span>{group.subgroup}</span>
                              </div>
                            )}

                            <div className="space-y-1">
                              {group.items.map(item => {
                                const isChecked = checkedSet.has(item.id);
                                return (
                                  <div
                                    key={item.id}
                                    onClick={(e) => handleItemClick(item, section, e)}
                                    className={`p-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                      isChecked
                                        ? 'bg-emerald-50/80 border border-emerald-300 text-emerald-950 font-semibold'
                                        : 'bg-slate-50/70 hover:bg-indigo-50/50 border border-transparent hover:border-indigo-200 text-slate-700 font-medium'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <button
                                        type="button"
                                        className="shrink-0 text-emerald-600 focus:outline-none"
                                      >
                                        {isChecked ? (
                                          <CheckSquare className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                                        ) : (
                                          <Square className="w-4 h-4 text-slate-400 hover:text-emerald-500 transition-colors" />
                                        )}
                                      </button>
                                      <span className={`text-xs ${isChecked ? 'line-through text-slate-500 font-normal' : 'text-slate-800 font-semibold'}`}>
                                        {item.text}
                                      </span>
                                    </div>

                                    {isChecked && (
                                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider shrink-0 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                                        Mastered ✓
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold text-slate-700">
              {completedCount} of {TOTAL_VERBATIM_ITEMS} topics ticked off
            </span>
            <button
              onClick={() => { sounds.playClick(); onClose(); }}
              className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              Done
            </button>
          </div>

        </div>
      </div>

      {/* Clear All Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 flex flex-col gap-3 text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl font-black">
              ⚠️
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900 font-display">
                Clear All Checked Ticks?
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                This will uncheck all {completedCount} ticked topics across all 30 sections.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  onResetAll();
                  setIsResetConfirmOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition cursor-pointer active:scale-95"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
