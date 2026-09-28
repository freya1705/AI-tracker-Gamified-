import React, { useState } from 'react';
import { UserStats, AiJournalEntry } from '../../types';
import { CAREER_TIERS, AI_FOUNDER_PHASES } from '../../data/initialData';
import { sounds } from '../../utils/audio';
import { 
  Trophy, Compass, Sparkles, Crown, ArrowRight, 
  BookOpen, Plus, Flame, Shield, Target, ExternalLink,
  Lightbulb, FileText, ChevronDown, ChevronUp, Layers, CheckCircle2
} from 'lucide-react';

interface RoadmapHorizonProps {
  stats: UserStats;
  journalEntries: AiJournalEntry[];
  onAddJournalEntry: (entry: Omit<AiJournalEntry, 'id' | 'date'>) => void;
  onOpenFounderRoadmapModal: () => void;
  onOpenRoadmapModal: () => void;
}

export const RoadmapHorizon: React.FC<RoadmapHorizonProps> = ({
  stats,
  journalEntries,
  onAddJournalEntry,
  onOpenFounderRoadmapModal,
  onOpenRoadmapModal,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<number>(0);
  const [journalFilter, setJournalFilter] = useState<string>('all');
  const [isPrinciplesExpanded, setIsPrinciplesExpanded] = useState<boolean>(true);
  const [isNewEntryOpen, setIsNewEntryOpen] = useState<boolean>(false);

  // New Journal Entry state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<AiJournalEntry['category']>('startup_ideas');

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    sounds.playLevelUp();
    onAddJournalEntry({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
    });

    setNewTitle('');
    setNewContent('');
    setIsNewEntryOpen(false);
  };

  const filteredEntries = journalEntries.filter(entry => {
    if (journalFilter === 'all') return true;
    return entry.category === journalFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      
      {/* 1. Arcane Banner: The Horizon of Destiny */}
      <div className="relative rounded-3xl p-6 sm:p-7 overflow-hidden border border-amber-500/30 bg-gradient-to-br from-[#2a1708] via-[#1a0f2e] to-[#0f172a] shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30">
                👑 Horizon of Destiny
              </span>
              <span className="text-xs font-mono text-amber-300">
                Current Standing: {stats.heroLevelTitle || 'Student Builder'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-200 font-display drop-shadow-md">
              THE ROAD TO AI FOUNDER
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/80 max-w-2xl leading-relaxed">
              You are not just preparing for a job interview. You are compounding technical depth, sovereign execution, 
              and strategic vision into a future AI Enterprise. Follow the 4 Grand Stages from Student to Founder.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                sounds.playClick();
                onOpenFounderRoadmapModal();
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Trophy className="w-4 h-4 text-slate-950" />
              <span>Interactive Scorecard Modal →</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenRoadmapModal();
              }}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-purple-200 font-bold text-xs border border-white/15 transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Step-by-Step AI Guide</span>
            </button>
          </div>
        </div>

        {/* 4 Grand Career Tiers Visual Trail */}
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CAREER_TIERS.map((tier, idx) => {
            const isSelected = selectedPhase === idx;
            return (
              <div
                key={tier.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedPhase(idx);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-lg shadow-amber-500/10'
                    : 'bg-black/30 border-white/10 hover:border-amber-400/40 text-purple-200 hover:bg-white/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-300/30">
                      {tier.badge} • {tier.year}
                    </span>
                    <span className="text-xs font-black text-amber-400 font-mono">
                      Phase 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xs font-black text-amber-100 font-display line-clamp-1">
                    {tier.title}
                  </h3>
                  <p className="text-[11px] text-amber-300/80 font-semibold mt-0.5 line-clamp-1">
                    {tier.tagline}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] italic font-display text-amber-200/90">
                  <span>{tier.quote}</span>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Phase Deep Dive */}
      {CAREER_TIERS[selectedPhase] && (
        <div className="bg-[#1e1b4b]/80 border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-300 uppercase px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/30">
                  Detailed Blueprint: {CAREER_TIERS[selectedPhase].badge}
                </span>
                <span className="text-xs text-purple-300 font-mono">{CAREER_TIERS[selectedPhase].year}</span>
              </div>
              <h3 className="text-lg font-black text-amber-100 font-display mt-1">
                {CAREER_TIERS[selectedPhase].title}
              </h3>
            </div>
            <div className="text-xs italic text-amber-300/90 font-display">
              {CAREER_TIERS[selectedPhase].quote}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
            {CAREER_TIERS[selectedPhase].description}
          </p>

          <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-between text-xs text-purple-200">
            <span className="font-semibold">Prime Directive for this stage:</span>
            <span className="font-black text-amber-300">{CAREER_TIERS[selectedPhase].tagline}</span>
          </div>
        </div>
      )}

      {/* 2. The 11 Founder Principles Codex */}
      <div className="bg-[#1e1b4b]/80 border border-purple-500/30 rounded-3xl p-6 shadow-xl space-y-4">
        <div 
          onClick={() => {
            sounds.playClick();
            setIsPrinciplesExpanded(prev => !prev);
          }}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-lg border border-purple-400/30">
              📜
            </div>
            <div>
              <h3 className="text-base font-black text-amber-200 font-display">
                The 11 Founder Principles Codex
              </h3>
              <p className="text-xs text-purple-200/80">
                Mental shifts and execution laws from student mind to AI founder
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center text-purple-300">
            {isPrinciplesExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>

        {isPrinciplesExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {AI_FOUNDER_PHASES.map((phase) => (
              <div
                key={phase.num}
                className="p-4 rounded-2xl bg-black/30 border border-white/10 hover:border-amber-400/30 transition space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-300 font-mono text-xs font-black flex items-center justify-center border border-amber-300/30">
                    {phase.num}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-amber-100 font-display">
                    {phase.title}
                  </h4>
                </div>

                <p className="text-xs text-purple-200/80 leading-relaxed pl-8">
                  {phase.focus}
                </p>

                <div className="pl-8 pt-1 text-[11px] text-amber-300/90 font-medium">
                  <span className="font-bold">Golden Law:</span> {phase.rule}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. AI Intelligence Journal & Database */}
      <div className="bg-[#1e1b4b]/80 border border-purple-500/30 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-md border border-amber-300/30">
                Compounding Wisdom
              </span>
              <span className="text-xs font-mono text-purple-300">
                {journalEntries.length} Recorded Entries
              </span>
            </div>
            <h3 className="text-lg font-black text-amber-100 font-display mt-0.5">
              AI Intelligence Database & Research Journal
            </h3>
            <p className="text-xs text-purple-200/80">
              Record papers, market pain points, Indian vernacular opportunities, and startup insights.
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setIsNewEntryOpen(prev => !prev);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition cursor-pointer active:scale-95 shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-slate-950" />
            <span>{isNewEntryOpen ? 'Close Form' : '+ New Entry'}</span>
          </button>
        </div>

        {/* Add Entry Form */}
        {isNewEntryOpen && (
          <form onSubmit={handleSaveEntry} className="p-4 rounded-2xl bg-black/40 border border-amber-400/30 space-y-3">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider">
              Add New Intelligence Entry (+30 XP)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Title (e.g. Lewis et al. RAG Takeaways)..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="sm:col-span-2 px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-purple-100 placeholder-purple-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />

              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-purple-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="startup_ideas">💡 Startup Idea</option>
                <option value="paper">📄 Research Paper</option>
                <option value="fundamentals">🧠 ML Fundamental</option>
                <option value="india">🇮🇳 India Opportunity</option>
                <option value="tools">🛠️ Tool / Infra</option>
                <option value="experiments">🔬 Experiment</option>
              </select>
            </div>

            <textarea
              placeholder="What did you learn? What customer problem does this address? What limitations exist?..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-purple-100 placeholder-purple-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsNewEntryOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-md transition active:scale-95"
              >
                Save & Earn +30 XP ✨
              </button>
            </div>
          </form>
        )}

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Entries' },
            { id: 'startup_ideas', label: '💡 Startup Ideas' },
            { id: 'paper', label: '📄 Papers' },
            { id: 'india', label: '🇮🇳 India Market' },
            { id: 'fundamentals', label: '🧠 Fundamentals' },
            { id: 'tools', label: '🛠️ Tools' },
            { id: 'experiments', label: '🔬 Experiments' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playClick();
                setJournalFilter(cat.id);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                journalFilter === cat.id
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'bg-white/5 hover:bg-white/10 text-purple-200 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Entries List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {filteredEntries.map(entry => (
            <div
              key={entry.id}
              className="p-4 rounded-2xl bg-black/30 border border-white/10 hover:border-amber-400/40 transition flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-400/30">
                    {entry.category}
                  </span>
                  <span className="text-[10px] font-mono text-purple-400">
                    {entry.date}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-black text-amber-100 font-display">
                  {entry.title}
                </h4>

                <p className="text-xs text-purple-200/80 leading-relaxed">
                  {entry.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
