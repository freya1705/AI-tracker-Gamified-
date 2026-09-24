import React, { useState } from 'react';
import { CAREER_TIERS, AI_FOUNDER_PHASES, INITIAL_JOURNAL_ENTRIES } from '../data/initialData';
import { AiJournalEntry } from '../types';
import { sounds } from '../utils/audio';
import { 
  X, Compass, Trophy, Target, BookOpen, 
  Lightbulb, TrendingUp, DollarSign, Flag, 
  ArrowRight, ShieldCheck, Plus, Sparkles 
} from 'lucide-react';

interface FounderRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  journalEntries: AiJournalEntry[];
  onAddJournalEntry: (entry: Omit<AiJournalEntry, 'id' | 'date'>) => void;
}

export const FounderRoadmapModal: React.FC<FounderRoadmapModalProps> = ({
  isOpen,
  onClose,
  journalEntries,
  onAddJournalEntry,
}) => {
  const [activeTab, setActiveTab] = useState<'phases' | 'scorecard' | 'journal' | 'money'>('phases');
  
  // Journal form state
  const [journalTitle, setJournalTitle] = useState('');
  const [journalCategory, setJournalCategory] = useState<AiJournalEntry['category']>('startup_ideas');
  const [journalContent, setJournalContent] = useState('');
  const [isAddingJournal, setIsAddingJournal] = useState(false);

  if (!isOpen) return null;

  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalTitle.trim() || !journalContent.trim()) return;
    sounds.playClick();
    onAddJournalEntry({
      category: journalCategory,
      title: journalTitle.trim(),
      content: journalContent.trim(),
    });
    setJournalTitle('');
    setJournalContent('');
    setIsAddingJournal(false);
  };

  const scorecardItems = [
    { area: 'Computer Science', goal: 'Strong core fundamentals (OS, Networks, DBs)' },
    { area: 'DSA', goal: 'Interview-ready (Graphs, DP, 4 LCs/session)' },
    { area: 'Machine Learning', goal: 'Strong fundamentals from scratch (NumPy + sklearn)' },
    { area: 'Deep Learning', goal: 'Strong (PyTorch training loops, fine-tuning)' },
    { area: 'Generative AI & LLMs', goal: 'Very strong (Structured JSON, RAG, Agents, Tool-calling)' },
    { area: 'Software Engineering', goal: 'Very strong (FastAPI, React, Docker, Tests)' },
    { area: 'AI Projects', goal: '5–10 meaningful portfolio projects' },
    { area: 'Major Flagship Projects', goal: '2–3 end-to-end systems (PatientTriage.ai v2)' },
    { area: 'Internships', goal: '1–2+ high-impact engineering internships' },
    { area: 'AI Research Habit', goal: '1 paper / technical breakdown every week' },
    { area: 'Professional Identity', goal: 'AI Builder in Public on LinkedIn/X' },
    { area: 'Placement Target', goal: '₹20–50L+ as Stage 1 Leverage & Independence' },
  ];

  const moneyTiers = [
    { amount: '₹1', label: 'First Rupee Earned', desc: 'Proof that someone values your technical output.' },
    { amount: '₹1,000', label: 'Small Automation / Script', desc: 'Solving a tiny painful problem for a peer or client.' },
    { amount: '₹10,000', label: 'Freelance AI / Micro-feature', desc: 'Building custom RAG or data pipeline for a business.' },
    { amount: '₹1,00,000', label: 'Consulting / Production AI MVP', desc: 'Deploying an end-to-end AI system with recurring value.' },
    { amount: '₹10,00,000+', label: 'Sustainable AI Micro-SaaS or Contract', desc: 'Foundations of an enduring AI business.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white p-5 sm:p-7 shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 font-display">
                Freya → AI Builder → AI Founder Roadmap
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Long-Term Trajectory: 2026 Student → 2028 High-Value Engineer → 2032+ Founder
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 py-3 border-b border-slate-100 overflow-x-auto shrink-0">
          {[
            { id: 'phases', label: '11 Founder Phases 🚀' },
            { id: 'scorecard', label: '2026–2028 Scorecard 📊' },
            { id: 'journal', label: 'AI Intelligence Database 📓' },
            { id: 'money', label: 'First AI Money (₹1 → ₹10L) 💰' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto py-4">
          
          {/* TAB 1: 11 PHASES */}
          {activeTab === 'phases' && (
            <div className="space-y-4">
              
              {/* Career Stages Visual Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
                {CAREER_TIERS.map((tier) => (
                  <div key={tier.id} className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-200 text-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md text-[10px]">
                          {tier.year}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{tier.badge}</span>
                      </div>
                      <h5 className="font-bold text-slate-800 text-xs mt-1">{tier.title}</h5>
                      <p className="text-[11px] text-purple-900 font-semibold mt-0.5">{tier.tagline}</p>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-500 italic">
                      {tier.quote}
                    </div>
                  </div>
                ))}
              </div>

              {/* Priority Stack for Next 6 Months Alert */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
                <h5 className="font-black text-amber-950 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Your 6-Month Priority Stack (Prevents Overwhelm!)
                </h5>
                <p className="text-amber-900 mb-2">
                  Do NOT do everything simultaneously. Keep your focus strictly on this stack:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-bold text-amber-950">
                  <div className="p-1.5 bg-white/80 rounded-lg border border-amber-200">#1 Engineering (DSA + CS)</div>
                  <div className="p-1.5 bg-white/80 rounded-lg border border-amber-200">#2 AI (ML → DL → GenAI)</div>
                  <div className="p-1.5 bg-white/80 rounded-lg border border-amber-200">#3 BUILD (PatientTriage v2)</div>
                  <div className="p-1.5 bg-white/80 rounded-lg border border-amber-200">#4 Exposure (Hackathons)</div>
                  <div className="p-1.5 bg-white/80 rounded-lg border border-amber-200">#5 Public Identity (LinkedIn)</div>
                  <div className="p-1.5 bg-white/80 rounded-lg border border-amber-200">#6 Business (Experiments)</div>
                </div>
              </div>

              {/* 11 Detailed Phases List */}
              <div className="space-y-2.5">
                {AI_FOUNDER_PHASES.map((p) => (
                  <div key={p.num} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {p.num}
                      </span>
                      <h5 className="font-bold text-slate-800 text-xs sm:text-sm">
                        Phase {p.num}: {p.title}
                      </h5>
                    </div>
                    <p className="text-slate-600 pl-8 mb-1">
                      <strong className="text-slate-700">Focus:</strong> {p.focus}
                    </p>
                    <p className="text-purple-700 pl-8 font-medium italic">
                      <strong className="text-purple-900">Rule:</strong> {p.rule}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 2: SCORECARD */}
          {activeTab === 'scorecard' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 font-medium">
                🎯 <strong>By Graduation Scorecard:</strong> Your ₹20–50L+ placement isn't a distraction from the startup roadmap — it is Stage 1 of the leverage and capital you are building!
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {scorecardItems.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white border border-slate-200 flex items-start gap-2.5 text-xs">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div>
                    <div>
                      <span className="font-extrabold text-slate-800 block">{item.area}</span>
                      <span className="text-slate-600 font-medium">{item.goal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AI INTELLIGENCE DATABASE / JOURNAL */}
          {activeTab === 'journal' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Phase 6: Personal AI Intelligence System
                  </h4>
                  <p className="text-xs text-slate-500">
                    Archive your weekly papers, ideas, tools, and experiments over 2–3 years.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingJournal(!isAddingJournal)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Intel</span>
                </button>
              </div>

              {/* Add Entry Form */}
              {isAddingJournal && (
                <form onSubmit={handleAddJournal} className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-3 text-xs animate-pop-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Title / Paper / Topic</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Attention Is All You Need Paper Breakdown"
                        value={journalTitle}
                        onChange={(e) => setJournalTitle(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Section</label>
                      <select
                        value={journalCategory}
                        onChange={(e) => setJournalCategory(e.target.value as any)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="startup_ideas">💡 Startup Ideas</option>
                        <option value="paper">📄 Weekly Paper Habit</option>
                        <option value="fundamentals">🧠 Fundamentals</option>
                        <option value="tools">🛠️ Tools & Models</option>
                        <option value="india">🇮🇳 Indian Opportunities</option>
                        <option value="business_models">💰 Business Models</option>
                        <option value="experiments">🔬 Experiments</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Notes / Key Insights</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="What problem? What is their approach? What changed? What did I understand?"
                      value={journalContent}
                      onChange={(e) => setJournalContent(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingJournal(false)}
                      className="px-3 py-1 rounded-lg text-slate-600 hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 rounded-lg bg-purple-600 text-white font-bold"
                    >
                      Save to Intelligence Base ✨
                    </button>
                  </div>
                </form>
              )}

              {/* Entries list */}
              <div className="space-y-2.5">
                {journalEntries.map((entry) => (
                  <div key={entry.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs shadow-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md text-[10px] uppercase">
                        {entry.category.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-slate-400">{entry.date}</span>
                    </div>
                    <h5 className="font-bold text-slate-800 text-xs sm:text-sm mt-1 mb-1">
                      {entry.title}
                    </h5>
                    <p className="text-slate-600 leading-relaxed">
                      {entry.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FIRST AI MONEY */}
          {activeTab === 'money' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium">
                💡 <strong>Phase 10: Your First AI Money:</strong> Before worrying about VC funding, learn to make ₹1 from your skill. Someone has a problem → You solve it with AI → They value it → They pay you.
              </div>

              <div className="space-y-2">
                {moneyTiers.map((tier, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-black text-emerald-700 bg-emerald-100 text-sm px-3 py-1 rounded-xl">
                        {tier.amount}
                      </span>
                      <div>
                        <h5 className="font-bold text-slate-800">{tier.label}</h5>
                        <p className="text-slate-500 mt-0.5">{tier.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
