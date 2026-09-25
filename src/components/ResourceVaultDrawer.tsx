import React, { useState, useMemo } from 'react';
import { FREE_RESOURCE_LIST, FreeResourceItem, STARTER_SET_SUMMARY } from '../data/resourceData';
import { sounds } from '../utils/audio';
import { 
  X, ExternalLink, Search, Sparkles, BookOpen, 
  Check, Copy, Compass, Filter, Star, Globe, GraduationCap 
} from 'lucide-react';

interface ResourceVaultDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilter?: string;
}

export const ResourceVaultDrawer: React.FC<ResourceVaultDrawerProps> = ({
  isOpen,
  onClose,
  initialFilter = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Copy URL to clipboard
  const handleCopy = (id: string, url: string) => {
    sounds.playClick();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered resources
  const filteredList = useMemo(() => {
    return FREE_RESOURCE_LIST.filter(item => {
      // 1. Category Filter
      if (activeFilter === 'starter' && !item.isStarterSet) return false;
      if (activeFilter === 'foundation' && !['0', '1', '2'].includes(item.sectionNum)) return false;
      if (activeFilter === 'data_ml' && !['3–4', '5', '6–9', '11–12', '13'].includes(item.sectionNum)) return false;
      if (activeFilter === 'llm_rag' && !['14–15', '16–17', '18', '19'].includes(item.sectionNum)) return false;
      if (activeFilter === 'deploy_adv' && !['20', '21', '22', '23', '27', '28'].includes(item.sectionNum)) return false;

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.sectionTitle.toLowerCase().includes(q) ||
          item.sectionNum.toLowerCase().includes(q) ||
          item.whyUseIt.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeFilter, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
        onClick={() => {
          sounds.playClick();
          onClose();
        }}
      />

      {/* Slide-out Drawer Panel */}
      <div className="relative w-full max-w-3xl bg-white shadow-2xl flex flex-col h-full z-10 animate-slide-left border-l border-slate-200">
        
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-amber-300 shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight font-display text-white">
                  Free AI Resource Vault
                </h2>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {FREE_RESOURCE_LIST.length} Links
                </span>
              </div>
              <p className="text-xs text-indigo-200/80 font-medium">
                Mapped to your syllabus sections • 100% Free & Open-Access
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer active:scale-95"
            title="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Recommended Starter Banner */}
        <div className="px-6 py-3.5 bg-amber-50/90 border-b border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-200/80 text-amber-800 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            </span>
            <div className="text-xs">
              <span className="font-bold text-amber-900">Suggested Starter Set: </span>
              <span className="text-amber-800">
                Kaggle (Python/Pandas/ML) → fast.ai → Karpathy Zero to Hero → DeepLearning.AI & Anthropic.
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveFilter(activeFilter === 'starter' ? 'all' : 'starter');
            }}
            className={`text-xs font-bold px-3 py-1 rounded-lg border transition whitespace-nowrap cursor-pointer ${
              activeFilter === 'starter'
                ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                : 'bg-white hover:bg-amber-100 text-amber-900 border-amber-300'
            }`}
          >
            {activeFilter === 'starter' ? 'Showing Starters ✓' : 'Filter Starters ⭐'}
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex flex-col gap-3 shrink-0">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, resource, author (e.g. Karpathy, fast.ai, RAG, PyTorch, StatQuest)..."
              className="w-full pl-9 pr-4 py-2 bg-white text-xs text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'all', label: `All (${FREE_RESOURCE_LIST.length})` },
              { id: 'starter', label: '⭐ Starter Set (14)' },
              { id: 'foundation', label: '0–2 Foundations' },
              { id: 'data_ml', label: '3–13 Data & ML' },
              { id: 'llm_rag', label: '14–19 LLMs & RAG' },
              { id: 'deploy_adv', label: '20–28 Systems' },
            ].map(chip => (
              <button
                key={chip.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveFilter(chip.id);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                  activeFilter === chip.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

        </div>

        {/* Resource Table Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          
          {filteredList.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-xl mb-3">
                🔍
              </div>
              <p className="text-sm font-bold text-slate-700">No resources found</p>
              <p className="text-xs text-slate-400 mt-1">Try clearing your search query or switching filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="mt-3 text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                      <th className="py-3 px-3.5 w-24">Section</th>
                      <th className="py-3 px-3.5">Resource & Link</th>
                      <th className="py-3 px-3.5 hidden md:table-cell">Why Use It</th>
                      <th className="py-3 px-3.5 w-28 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredList.map((item) => (
                      <tr 
                        key={item.id}
                        className={`hover:bg-indigo-50/30 transition-colors group ${
                          item.isStarterSet ? 'bg-amber-50/20' : ''
                        }`}
                      >
                        {/* Section */}
                        <td className="py-3.5 px-3.5 align-top">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-extrabold text-slate-900 font-mono text-[11px]">
                              Sec {item.sectionNum}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium line-clamp-1">
                              {item.sectionTitle}
                            </span>
                            {item.isStarterSet && (
                              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded w-fit mt-0.5">
                                ⭐ Starter
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Resource Name & URL */}
                        <td className="py-3.5 px-3.5 align-top">
                          <div className="space-y-1">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-indigo-700 hover:text-indigo-900 hover:underline flex items-center gap-1.5 text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform"
                            >
                              <span>{item.name}</span>
                              <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100 text-indigo-500" />
                            </a>
                            
                            {/* Mobile-only Why Use It */}
                            <p className="text-[11px] text-slate-600 md:hidden leading-relaxed">
                              {item.whyUseIt}
                            </p>

                            <div className="flex items-center gap-1.5 pt-0.5">
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                                {item.type}
                              </span>
                              <span className="text-[10px] font-medium text-slate-500">
                                #{item.tag}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Why Use It (Desktop) */}
                        <td className="py-3.5 px-3.5 align-top hidden md:table-cell text-slate-600 leading-relaxed text-[12px]">
                          {item.whyUseIt}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-3.5 align-top text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Copy URL */}
                            <button
                              onClick={() => handleCopy(item.id, item.url)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                              title="Copy URL to clipboard"
                            >
                              {copiedId === item.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {/* Open Direct */}
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shadow-2xs transition active:scale-95 cursor-pointer whitespace-nowrap"
                            >
                              <span>Open</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Quick Tip Footer */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100/80 text-xs text-indigo-950 flex items-start gap-3 mt-4">
            <span className="text-lg">💡</span>
            <div className="space-y-1">
              <p className="font-bold">Pro-tip for Freya's Daily System:</p>
              <p className="text-slate-600 leading-relaxed">
                Pick <strong>one main resource</strong> for your current stage. Don't drown in 5 tutorials at once.
                Follow the loop: <strong className="text-indigo-900">Learn → Understand → Code → Build → Move on</strong>!
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
