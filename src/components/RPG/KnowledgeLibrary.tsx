import React, { useState, useMemo } from 'react';
import { FREE_RESOURCE_LIST, FreeResourceItem } from '../../data/resourceData';
import { sounds } from '../../utils/audio';
import { 
  BookOpen, Search, ExternalLink, Sparkles, Filter, 
  HelpCircle, Compass, Trophy, FileText, CheckCircle2, Bookmark
} from 'lucide-react';

interface KnowledgeLibraryProps {
  onOpenProblemSheet: () => void;
  onOpenOriginalNote: () => void;
  onOpenRoadmap: () => void;
  onOpenFounderRoadmap: () => void;
}

export const KnowledgeLibrary: React.FC<KnowledgeLibraryProps> = ({
  onOpenProblemSheet,
  onOpenOriginalNote,
  onOpenRoadmap,
  onOpenFounderRoadmap,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredResources = useMemo(() => {
    return FREE_RESOURCE_LIST.filter(res => {
      if (activeCategory === 'starter' && !res.isStarterSet) return false;
      if (activeCategory === 'programming' && res.sectionNum !== '0') return false;
      if (activeCategory === 'math' && res.sectionNum !== '1') return false;
      if (activeCategory === 'ai_foundations' && res.sectionNum !== '2') return false;
      if (activeCategory === 'data_ml' && !['3–4', '5', '6–9', '11–12', '13'].includes(res.sectionNum)) return false;
      if (activeCategory === 'llm_rag' && !['14–15', '16–17', '18', '19'].includes(res.sectionNum)) return false;
      if (activeCategory === 'deploy_adv' && !['20', '21', '22', '23', '27', '28', 'SWE'].includes(res.sectionNum)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          res.name.toLowerCase().includes(q) ||
          res.sectionTitle.toLowerCase().includes(q) ||
          res.whyUseIt.toLowerCase().includes(q) ||
          res.tag.toLowerCase().includes(q) ||
          (res.relevantKeywords && res.relevantKeywords.some(k => k.toLowerCase().includes(q)))
        );
      }
      return true;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      
      {/* 1. Arcane Library Banner */}
      <div className="relative rounded-3xl p-6 sm:p-7 overflow-hidden border border-amber-500/30 bg-gradient-to-br from-[#1c1917] via-[#1e1b4b] to-[#0f172a] shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30">
                📚 The Grand Codex Vault
              </span>
              <span className="text-xs font-mono text-purple-300">
                {FREE_RESOURCE_LIST.length} Free Grimoires & Courses Mapped
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-200 font-display drop-shadow-md">
              THE KNOWLEDGE VAULT
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80 max-w-2xl leading-relaxed">
              Every curated textbook, course, documentation page, and research paper mapped directly to your 
              syllabus stages. High-signal, zero-paywall learning materials.
            </p>
          </div>

          {/* Quick Codex Artifacts */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                sounds.playClick();
                onOpenProblemSheet();
              }}
              className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-400/30 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <HelpCircle className="w-4 h-4 text-purple-300" />
              <span>Problem of Week</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenOriginalNote();
              }}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <FileText className="w-4 h-4 text-emerald-300" />
              <span>Original Note</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 relative">
          <Search className="w-4 h-4 text-amber-400/80 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search all 38+ free resources by keyword (e.g. 3Blue1Brown, StatQuest, PyTorch, RAG, Git)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-black/50 border border-amber-400/30 text-xs sm:text-sm text-purple-100 placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
          />
        </div>

        {/* Category Filters */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'starter', label: '⭐ Starter Set' },
            { id: 'programming', label: '🐍 Python & Git' },
            { id: 'math', label: '📐 Math & Stats' },
            { id: 'ai_foundations', label: '💡 AI Foundations' },
            { id: 'data_ml', label: '📊 ML & Deep Learning' },
            { id: 'llm_rag', label: '⚡ LLMs & RAG' },
            { id: 'deploy_adv', label: '🚀 Deployment & SWE' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playClick();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-purple-200 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-3xl bg-[#1e1b4b]/60 border border-purple-500/20">
            <div className="text-3xl mb-2">📜</div>
            <h4 className="text-sm font-bold text-amber-200 font-display">No scrolls found</h4>
            <p className="text-xs text-purple-300 mt-1">Try another search keyword or select All Resources.</p>
          </div>
        ) : (
          filteredResources.map(res => (
            <div
              key={res.id}
              className="rounded-3xl p-5 border border-purple-500/20 bg-gradient-to-br from-[#1e1b4b]/80 to-[#0f172a]/90 shadow-lg hover:border-amber-400/50 transition-all flex flex-col justify-between gap-4 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    Section {res.sectionNum}: {res.sectionTitle}
                  </span>
                  <span className="text-[10px] font-bold text-purple-300 px-2 py-0.5 rounded bg-black/40 border border-white/10">
                    {res.type}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-black text-amber-100 font-display group-hover:text-amber-300 transition-colors">
                  {res.name}
                </h4>
                <p className="text-xs text-purple-200/80 mt-1.5 leading-relaxed">
                  {res.whyUseIt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-[11px] font-medium text-amber-300/80 bg-black/30 px-2 py-0.5 rounded-md border border-white/5">
                  🏷️ {res.tag}
                </span>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black transition cursor-pointer shadow-md active:scale-95"
                >
                  <span>Open Study Link</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
