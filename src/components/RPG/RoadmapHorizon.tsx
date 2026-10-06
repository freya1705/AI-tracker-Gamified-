import React, { useState, useEffect } from 'react';
import { UserStats, AiJournalEntry } from '../../types';
import { CAREER_TIERS, AI_FOUNDER_PHASES } from '../../data/initialData';
import { 
  PHASE_0_SYSTEMS, 
  DETAILED_ROADMAP_PHASES, 
  TWELVE_MONTH_PLAN, 
  PROJECT_LADDER, 
  AI_STACK_2026, 
  LEARN_FIRST_VS_LATER, 
  JOB_READY_CRITERIA, 
  STUDY_LOOP_STEPS 
} from '../../data/detailedAiRoadmapData';
import {
  PLACEMENT_PHASES_DATA,
  WEEKLY_SPLIT_DATA,
  PRIORITY_TIERS_DATA,
  CONTINUOUS_TRACKS_DATA,
  ACTUAL_ROADMAP_STAIRS,
  TOTAL_PLACEMENT_WEEKS
} from '../../data/placementRoadmapData';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Trophy, Compass, Sparkles, ArrowRight, 
  Plus, Target, ChevronDown, ChevronUp, CheckCircle2, Circle,
  Calendar, Layers, Cpu, Database, Network, GitBranch,
  Terminal, Activity, ShieldCheck, Flame, BookOpen, AlertTriangle,
  Sidebar, ExternalLink
} from 'lucide-react';

interface RoadmapHorizonProps {
  stats: UserStats;
  journalEntries: AiJournalEntry[];
  onAddJournalEntry: (entry: Omit<AiJournalEntry, 'id' | 'date'>) => void;
  onOpenFounderRoadmapModal: () => void;
  onOpenRoadmapModal: () => void;
  onOpenPlacementDrawer?: () => void;
}

const STORAGE_KEY_PLACEMENT_COMPLETED_WEEKS = 'freya_quest_placement_completed_weeks_v1';

export const RoadmapHorizon: React.FC<RoadmapHorizonProps> = ({
  stats,
  journalEntries,
  onAddJournalEntry,
  onOpenFounderRoadmapModal,
  onOpenRoadmapModal,
  onOpenPlacementDrawer,
}) => {
  // Navigation mode
  const [activeTab, setActiveTab] = useState<'placement36' | 'founder' | 'phases2026' | 'twelveMonth' | 'stack2026'>('placement36');

  // Placement 36-week tab state
  const [selectedPlacementPhase, setSelectedPlacementPhase] = useState<number>(1);
  const [completedPlacementWeeks, setCompletedPlacementWeeks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PLACEMENT_COMPLETED_WEEKS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PLACEMENT_COMPLETED_WEEKS, JSON.stringify(completedPlacementWeeks));
    } catch {}
  }, [completedPlacementWeeks]);

  const togglePlacementWeek = (weekNum: number) => {
    setCompletedPlacementWeeks(prev => {
      const isDone = prev.includes(weekNum);
      if (isDone) {
        sounds.playClick();
        return prev.filter(w => w !== weekNum);
      } else {
        sounds.playTaskComplete();
        if ([8, 12, 16, 20, 24, 28, 32, 36].includes(weekNum)) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        }
        return [...prev, weekNum];
      }
    });
  };

  // Founder tab state
  const [selectedFounderTier, setSelectedFounderTier] = useState<number>(0);
  const [journalFilter, setJournalFilter] = useState<string>('all');
  const [isPrinciplesExpanded, setIsPrinciplesExpanded] = useState<boolean>(true);
  const [isNewEntryOpen, setIsNewEntryOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<AiJournalEntry['category']>('startup_ideas');

  // 2026 Detailed Roadmap tab state
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('phase-0');
  const [showPhase0Matrix, setShowPhase0Matrix] = useState<boolean>(true);

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

  const selectedPhaseData = DETAILED_ROADMAP_PHASES.find(p => p.id === selectedPhaseId) || DETAILED_ROADMAP_PHASES[0];
  const activePlacementPhaseData = PLACEMENT_PHASES_DATA.find(p => p.phaseNum === selectedPlacementPhase) || PLACEMENT_PHASES_DATA[0];
  const placementPercent = Math.round((completedPlacementWeeks.length / TOTAL_PLACEMENT_WEEKS) * 100);

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
                🎯 Horizon of Destiny • Master Roadmaps
              </span>
              <span className="text-xs font-mono text-amber-300">
                Current Standing: {stats.heroLevelTitle || 'Student Builder'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-200 font-display drop-shadow-md">
              THE 36-WEEK PLACEMENT & AI FOUNDER HORIZON
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/80 max-w-2xl leading-relaxed">
              Software Engineer first. AI-powered engineer second. Run continuous DSA + CS alongside backend, cloud, 
              distributed systems, and flagship projects without burning out.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            {onOpenPlacementDrawer && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenPlacementDrawer();
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Sidebar className="w-4 h-4 text-slate-950" />
                <span>Open 36-Week Sidebar ➔</span>
              </button>
            )}

            <button
              onClick={() => {
                sounds.playClick();
                onOpenFounderRoadmapModal();
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Trophy className="w-4 h-4 text-slate-950" />
              <span>Scorecard & Money Modal →</span>
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

        {/* View Switcher Tabs */}
        <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'placement36', label: '🎯 36-Week Placement Engine', desc: 'Continuous DSA + Backend + Cloud' },
            { id: 'founder', label: '👑 4-Stage Founder Trajectory', desc: 'Career Ladder & Mindset' },
            { id: 'phases2026', label: '🗺️ Detailed AI / ML Roadmap 2026', desc: 'Phase 0–7 & Dual Tracks' },
            { id: 'twelveMonth', label: '📅 12-Month Plan & Project Ladder', desc: 'Monthly Focus & 5 Tiers' },
            { id: 'stack2026', label: '⚡ 2026 AI Stack & Job-Ready Criteria', desc: '14 Layers & Readiness' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex flex-col items-start gap-0.5 ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20 scale-[1.02]'
                  : 'bg-black/40 text-purple-200 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span className="font-extrabold">{tab.label}</span>
              <span className={`text-[10px] ${activeTab === tab.id ? 'text-slate-800' : 'text-purple-400'}`}>
                {tab.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 0: 🎯 36-WEEK PLACEMENT ENGINE (THE CORE ROADMAP SECTION) */}
      {/* ========================================================================= */}
      {activeTab === 'placement36' && (
        <div className="space-y-6">

          {/* Golden Law & Philosophy Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/40 via-purple-950/50 to-indigo-950/40 border border-amber-400/40 shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-300/30 flex items-center justify-center font-bold">
                  ⚡
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-amber-200 font-display">
                    Golden Directive: Do Not Try To Do All 24 Sections One After Another
                  </h3>
                  <p className="text-xs text-purple-200/90">
                    That becomes overwhelming. Instead, follow this 36-week placement roadmap where foundations stay alive continuously.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">
                  {completedPlacementWeeks.length}/{TOTAL_PLACEMENT_WEEKS} Weeks ({placementPercent}%)
                </span>
                {onOpenPlacementDrawer && (
                  <button
                    onClick={onOpenPlacementDrawer}
                    className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 text-xs font-bold border border-white/15 transition cursor-pointer flex items-center gap-1"
                  >
                    <Sidebar className="w-3.5 h-3.5" />
                    <span>Sidebar View</span>
                  </button>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-purple-100/90 leading-relaxed">
              <strong className="text-amber-300 font-bold">The Key Engine: </strong>
              DSA + CS stay alive throughout (Week 1 → 36). Backend → Cloud → Distributed Systems build sequentially on each other. 
              Projects are where you apply everything. AI stays as a multiplier power layer.
            </div>
          </div>

          {/* Weekly Engine (~20 Hours / Week) Visual Box */}
          <div className="p-5 rounded-3xl bg-[#1e1b4b]/90 border border-purple-500/30 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h4 className="text-sm font-black text-amber-200 font-display flex items-center gap-2">
                  <span>🧠</span>
                  <span>Your Weekly Engine (~20 Hours / Week Career Prep Split)</span>
                </h4>
                <p className="text-xs text-purple-200/80">
                  Don't make a strict hourly timetable. Every week has 5 parallel tracks. If college gets heavy, reduce total hours, but never stop DSA.
                </p>
              </div>
              <span className="text-xs font-mono text-purple-300">
                Software Engineer First • AI Power Layer Second
              </span>
            </div>

            {/* Visual Track Flow */}
            <div className="p-4 rounded-2xl bg-black/50 border border-amber-400/20 font-mono text-xs text-amber-200 text-center leading-relaxed">
              <div className="text-purple-300 font-bold">YOUR WEEK (~20 HOURS)</div>
              <div className="text-slate-500">│</div>
              <div className="text-slate-500">┌─────────────┼─────────────┐</div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-400/40 text-amber-300">
                  <div className="font-bold">🧠 DSA (6 hrs)</div>
                  <div className="text-[10px] text-amber-400/80">Java Patterns (Arrays → DP)</div>
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-950/50 border border-indigo-400/40 text-indigo-300">
                  <div className="font-bold">💻 BUILD (7 hrs)</div>
                  <div className="text-[10px] text-indigo-400/80">Backend / Cloud / Systems</div>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-950/50 border border-purple-400/40 text-purple-300">
                  <div className="font-bold">📚 CS (2 hrs)</div>
                  <div className="text-[10px] text-purple-400/80">DBMS / OS / CN Fundamentals</div>
                </div>
              </div>
              <div className="text-slate-500 pt-2">└──────┬──────┘</div>
              <div className="text-slate-500">↓</div>
              <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-400/40 text-emerald-300 text-xs font-bold max-w-md mx-auto">
                🚀 PROJECT APPLICATION (4 hrs) — Real Git Commits & Flagship
              </div>
              <div className="text-slate-500">↓</div>
              <div className="p-2.5 rounded-xl bg-cyan-950/50 border border-cyan-400/40 text-cyan-300 text-xs font-bold max-w-sm mx-auto">
                🤖 AI POWER LAYER (1 hr) — LLM APIs & Explainability
              </div>
            </div>

            {/* Hours Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5 pt-1">
              {WEEKLY_SPLIT_DATA.map((t, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{t.icon}</span>
                    <span className="text-[11px] font-mono font-black text-amber-300 px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-300/30">
                      {t.hours}h/wk
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-100 font-display">
                    {t.track}
                  </h5>
                  <p className="text-[11px] text-purple-200/80 leading-snug">
                    {t.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 9 Phases Navigation & Detailed Weeks */}
          <div className="bg-[#1e1b4b]/80 border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-5">
            
            {/* Phase Selector Pills */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h4 className="text-sm font-black text-amber-200 font-display">
                  Phased Curriculum (Week 1 → Week 36)
                </h4>
                <p className="text-xs text-purple-200/80">
                  Select a phase to inspect weekly blueprints and mark off progress
                </p>
              </div>

              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-300/30 font-bold">
                Phase {activePlacementPhaseData.phaseNum} of 9
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-9 gap-1.5">
              {PLACEMENT_PHASES_DATA.map((phase) => {
                const isSelected = selectedPlacementPhase === phase.phaseNum;
                const phaseDoneCount = phase.weeks.filter(w => completedPlacementWeeks.includes(w.weekNum)).length;
                return (
                  <button
                    key={phase.phaseNum}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedPlacementPhase(phase.phaseNum);
                    }}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1 ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-md scale-105'
                        : 'bg-black/40 text-purple-200 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-base">{phase.icon}</span>
                    <span className="text-[10px] font-extrabold uppercase truncate w-full">P{phase.phaseNum}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-slate-950/20 text-slate-900' : 'bg-white/10 text-purple-300'}`}>
                      {phaseDoneCount}/{phase.weeks.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Phase Header Card */}
            <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-300/30">
                    {activePlacementPhaseData.weeksRange}
                  </span>
                  <h4 className="text-base font-black text-amber-100 font-display">
                    {activePlacementPhaseData.title}
                  </h4>
                </div>
                <p className="text-xs text-purple-200/80 mt-1">
                  {activePlacementPhaseData.tagline}
                </p>
              </div>

              {activePlacementPhaseData.milestoneTitle && (
                <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black self-start sm:self-center">
                  🏆 {activePlacementPhaseData.milestoneTitle}
                </div>
              )}
            </div>

            {/* Weeks Cards in Selected Phase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activePlacementPhaseData.weeks.map((week) => {
                const isDone = completedPlacementWeeks.includes(week.weekNum);
                return (
                  <div
                    key={week.weekNum}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                      isDone
                        ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm'
                        : 'bg-black/30 border-white/10 hover:border-amber-400/30'
                    }`}
                  >
                    <div>
                      {/* Week Header */}
                      <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => togglePlacementWeek(week.weekNum)}
                            className="text-amber-400 hover:text-amber-300 transition cursor-pointer"
                            title={isDone ? 'Mark week as incomplete' : 'Mark week as completed'}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-purple-400 hover:text-amber-300" />
                            )}
                          </button>
                          <div>
                            <span className="text-[10px] font-black uppercase text-amber-400 font-mono">
                              WEEK {week.weekNum}
                            </span>
                            <h5 className="text-sm font-black text-slate-100 font-display">
                              {week.title}
                            </h5>
                          </div>
                        </div>

                        {week.milestone && (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-300/30 shrink-0">
                            ⭐ Milestone
                          </span>
                        )}
                      </div>

                      {/* Content Grid */}
                      <div className="space-y-3 pt-3 text-xs">
                        {/* Learn List */}
                        <div className="p-3 rounded-xl bg-black/20 border border-white/5 space-y-1">
                          <span className="text-[10px] font-black uppercase text-indigo-300 block">
                            📚 Learn / Understand:
                          </span>
                          <ul className="space-y-1 text-purple-100">
                            {week.learn.map((l, lIdx) => (
                              <li key={lIdx} className="flex items-start gap-1.5 leading-snug">
                                <span className="text-indigo-400">•</span>
                                <span>{l}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Continuous DSA Pills */}
                        <div className="p-3 rounded-xl bg-black/20 border border-white/5 space-y-1">
                          <span className="text-[10px] font-black uppercase text-amber-300 block">
                            🧠 Continuous DSA (Java):
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {week.dsa.map((d, dIdx) => (
                              <span key={dIdx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-200 border border-amber-400/20">
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Build */}
                        <div className="p-3 rounded-xl bg-black/20 border border-white/5 space-y-1">
                          <span className="text-[10px] font-black uppercase text-emerald-300 block">
                            🛠️ Build & Apply:
                          </span>
                          <ul className="space-y-1 text-emerald-100">
                            {week.build.map((b, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-1.5 leading-snug">
                                <span className="text-emerald-400">✓</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Output & Action Footer */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                      <span className="text-[11px] text-amber-300 font-semibold">
                        🎯 Output: {week.output}
                      </span>
                      <button
                        onClick={() => togglePlacementWeek(week.weekNum)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer shrink-0 ${
                          isDone
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                            : 'bg-white/5 hover:bg-white/10 text-purple-200 border border-white/10'
                        }`}
                      >
                        {isDone ? 'Completed ✓' : 'Mark Done +50 XP'}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Continuous Tracks (DSA, CS, AI) Deep Dive */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CONTINUOUS_TRACKS_DATA.map((ct, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{ct.icon}</span>
                  <div>
                    <h5 className="text-xs sm:text-sm font-black text-amber-200 font-display">
                      {ct.name.split('(')[0]}
                    </h5>
                    <p className="text-[11px] text-purple-300/80">
                      {ct.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  {ct.schedule.map((item, sIdx) => (
                    <div key={sIdx} className="p-2 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                      <span className="text-[10px] font-mono font-bold text-amber-300 uppercase block">
                        {item.period}
                      </span>
                      <p className="text-purple-100 text-[11px] leading-snug">
                        {item.topics}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Priority Tiers Ordering */}
          <div className="bg-[#1e1b4b]/80 border border-purple-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-300/30">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-sm font-black text-amber-200 font-display">
                    Your Actual Priority Ordering (Avoid The Checklist Trap)
                  </h4>
                  <p className="text-xs text-purple-200/80">
                    Do not treat all 24 sections as equal. This ordering stops you from spending 3 weeks on Kubernetes while your DSA is still weak.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-amber-300 font-bold uppercase">
                Tier 1 MUST → Tier 4 AI Power
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {PRIORITY_TIERS_DATA.map((tier) => (
                <div key={tier.tierNum} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-black text-amber-200 font-display">
                      {tier.label}
                    </h5>
                    <span className="text-[10px] font-mono text-purple-400">
                      #{tier.tierNum}
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-300/80 italic leading-snug">
                    {tier.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {tier.items.map((item, i) => (
                      <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-purple-100">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actual Staircase Progression */}
          <div className="bg-[#1e1b4b]/80 border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-300/30">
                <Target className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-black text-amber-200 font-display">
                  Your Actual Staircase to Placement (Step-by-Step Flowchart)
                </h4>
                <p className="text-xs text-purple-200/80">
                  First target: In 8 weeks, become genuinely comfortable building a tested Spring Boot + PostgreSQL backend, while doing DSA every week.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {ACTUAL_ROADMAP_STAIRS.map((st, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-400/40 transition space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{st.icon}</span>
                    <span className="text-[10px] font-mono font-bold text-amber-400">
                      Step {idx + 1}
                    </span>
                  </div>
                  <div className="text-xs font-black text-slate-100 font-display truncate">
                    {st.step}
                  </div>
                  <p className="text-[11px] text-purple-200/80 font-medium leading-snug">
                    {st.label}
                  </p>
                  <p className="text-[10px] text-slate-400 italic">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 1: 4-STAGE FOUNDER TRAJECTORY & 11 PRINCIPLES */}
      {/* ========================================================================= */}
      {activeTab === 'founder' && (
        <div className="space-y-6">
          {/* 4 Grand Career Tiers Visual Trail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CAREER_TIERS.map((tier, idx) => {
              const isSelected = selectedFounderTier === idx;
              return (
                <div
                  key={tier.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedFounderTier(idx);
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

          {/* Selected Phase Deep Dive */}
          {CAREER_TIERS[selectedFounderTier] && (
            <div className="bg-[#1e1b4b]/80 border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-amber-300 uppercase px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/30">
                      Detailed Blueprint: {CAREER_TIERS[selectedFounderTier].badge}
                    </span>
                    <span className="text-xs text-purple-300 font-mono">{CAREER_TIERS[selectedFounderTier].year}</span>
                  </div>
                  <h3 className="text-lg font-black text-amber-100 font-display mt-1">
                    {CAREER_TIERS[selectedFounderTier].title}
                  </h3>
                </div>
                <div className="text-xs italic text-amber-300/90 font-display">
                  {CAREER_TIERS[selectedFounderTier].quote}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                {CAREER_TIERS[selectedFounderTier].description}
              </p>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-between text-xs text-purple-200">
                <span className="font-semibold">Prime Directive for this stage:</span>
                <span className="font-black text-amber-300">{CAREER_TIERS[selectedFounderTier].tagline}</span>
              </div>
            </div>
          )}

          {/* The 11 Founder Principles Codex */}
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

          {/* AI Intelligence Journal & Database */}
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
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: DETAILED AI / ML ENGINEER ROADMAP 2026 (PHASE 0–7 & DUAL TRACKS) */}
      {/* ========================================================================= */}
      {activeTab === 'phases2026' && (
        <div className="space-y-6">

          {/* Big Picture Architecture Callout */}
          <div className="p-5 rounded-3xl bg-[#1e1b4b]/90 border border-indigo-400/30 shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  <GitBranch className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-black text-amber-200 uppercase tracking-wider font-display">
                  The Big Picture: Shared Foundation & Dual Tracks
                </h3>
              </div>
              <span className="text-xs text-purple-300 font-medium">
                The most valuable 2026 profile: SWE + ML Fundamentals + Production AI
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-black/30 border border-white/10 space-y-1">
                <span className="text-[10px] font-black uppercase text-amber-400">1. Shared Foundation</span>
                <p className="font-bold text-slate-200">Programming → Data + Math → Classical ML → Deep Learning</p>
                <p className="text-[11px] text-purple-300/80">Phases 0, 1, 2, 3, 4 (Essential bedrock for both careers)</p>
              </div>

              <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-400/30 space-y-1">
                <span className="text-[10px] font-black uppercase text-blue-300">2A. ML Engineer Track</span>
                <p className="font-bold text-blue-100">Data Engineering for ML → MLOps → Model Serving → Churn Capstone</p>
                <p className="text-[11px] text-blue-200/80">Phase 5A (Builds, trains, evaluates, and operates models at scale)</p>
              </div>

              <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-400/30 space-y-1">
                <span className="text-[10px] font-black uppercase text-purple-300">2B. AI Engineer Track</span>
                <p className="font-bold text-purple-100">LLM APIs → Context Eng → RAG → Agents → Evals → Production AI</p>
                <p className="text-[11px] text-purple-200/80">Phase 5B (Builds reliable products using foundation models, tools, & retrieval)</p>
              </div>
            </div>
          </div>

          {/* Phase 0 System Matrix Toggle / Table */}
          <div className="bg-[#1e1b4b]/80 border border-amber-500/30 rounded-3xl p-5 shadow-xl space-y-3">
            <div 
              onClick={() => {
                sounds.playClick();
                setShowPhase0Matrix(prev => !prev);
              }}
              className="flex items-center justify-between cursor-pointer select-none"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-300/30">
                  <Layers className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-sm font-black text-amber-200 font-display">
                    Phase 0: Understand What You're Building (7-System Distinction Matrix)
                  </h4>
                  <p className="text-xs text-purple-200/80">
                    Know where the model ends and the surrounding engineering system begins
                  </p>
                </div>
              </div>
              <div className="w-7 h-7 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center text-purple-300">
                {showPhase0Matrix ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {showPhase0Matrix && (
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-amber-300 text-[10px] uppercase font-mono">
                      <th className="py-2.5 px-3">System Type</th>
                      <th className="py-2.5 px-3">What It Does</th>
                      <th className="py-2.5 px-3">Core Technology</th>
                      <th className="py-2.5 px-3">Real-World Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-purple-100">
                    {PHASE_0_SYSTEMS.map((sys, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition">
                        <td className="py-2.5 px-3 font-bold text-amber-200 whitespace-nowrap">{sys.system}</td>
                        <td className="py-2.5 px-3 text-purple-200/90">{sys.whatItDoes}</td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-purple-300">{sys.coreTech}</td>
                        <td className="py-2.5 px-3 text-[11px] text-amber-100/80 italic">{sys.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Phase Selector Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {DETAILED_ROADMAP_PHASES.map((phase) => {
              const isSelected = selectedPhaseId === phase.id;
              const isML = phase.track === 'ml';
              const isAI = phase.track === 'ai';
              return (
                <button
                  key={phase.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedPhaseId(phase.id);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                      : isML
                      ? 'bg-blue-900/40 text-blue-200 border border-blue-400/30 hover:bg-blue-800/40'
                      : isAI
                      ? 'bg-purple-900/40 text-purple-200 border border-purple-400/30 hover:bg-purple-800/40'
                      : 'bg-black/30 text-purple-200 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span>{phase.phaseNum}</span>
                  <span className="text-[11px] opacity-90 truncate max-w-[120px]">{phase.title.split(':')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Phase Card */}
          <div className="bg-[#1e1b4b]/90 border border-purple-500/30 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30">
                    {selectedPhaseData.phaseNum} • {selectedPhaseData.duration}
                  </span>
                  {selectedPhaseData.track === 'ml' && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      ML Engineer Track
                    </span>
                  )}
                  {selectedPhaseData.track === 'ai' && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-400/30">
                      AI Engineer Track
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-black text-amber-100 font-display mt-1.5">
                  {selectedPhaseData.title}
                </h3>
                <p className="text-xs text-amber-300/90 font-medium mt-0.5">
                  {selectedPhaseData.tagline}
                </p>
              </div>

              <div className="text-xs text-purple-200/80 max-w-sm text-left sm:text-right">
                {selectedPhaseData.description}
              </div>
            </div>

            {/* Subsections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedPhaseData.subsections.map((sub, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
                  <h4 className="text-xs font-black text-amber-200 uppercase tracking-wide flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    <span>{sub.title}</span>
                  </h4>

                  <ul className="space-y-1.5 text-xs text-purple-100">
                    {sub.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {sub.tools && sub.tools.length > 0 && (
                    <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1">
                      {sub.tools.map((t, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-purple-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Build Projects & Exit Conditions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-xs space-y-1.5">
                <span className="font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                  🛠️ What You Must Build:
                </span>
                <ul className="space-y-1 text-purple-100">
                  {selectedPhaseData.buildProjects.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 text-xs space-y-1.5">
                <span className="font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                  🏁 Exit Condition:
                </span>
                <p className="text-emerald-100 font-medium leading-relaxed">
                  {selectedPhaseData.exitCondition}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: REALISTIC 12-MONTH PLAN & THE 5-LEVEL PROJECT LADDER */}
      {/* ========================================================================= */}
      {activeTab === 'twelveMonth' && (
        <div className="space-y-6">

          {/* 5-Level Project Ladder */}
          <div className="bg-[#1e1b4b]/80 border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-300/30">
                  <Trophy className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-black text-amber-200 font-display">
                    The 5-Level Project Ladder
                  </h3>
                  <p className="text-xs text-purple-200/80">
                    Never jump straight to a complex agent. Build sequentially up the ladder.
                  </p>
                </div>
              </div>
              <span className="text-[11px] text-amber-300 font-mono">
                From Script → Deployed Sovereign System
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {PROJECT_LADDER.map((lvl) => (
                <div
                  key={lvl.level}
                  className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-400/40 transition flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-300/30">
                      {lvl.badge}
                    </span>
                    <h4 className="text-xs font-bold text-amber-100 font-display">
                      {lvl.name}
                    </h4>
                    <p className="text-[11px] text-purple-200/80">
                      <span className="font-semibold text-purple-300">Skills: </span>
                      {lvl.coreSkills}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 text-[11px] text-emerald-300 font-medium">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Deliverable</span>
                    {lvl.deliverable}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Realistic 12-Month Plan Timeline Table */}
          <div className="bg-[#1e1b4b]/80 border border-purple-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  <Calendar className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-black text-amber-200 font-display">
                    Realistic 12-Month Plan (10–15 Focused Hours/Week)
                  </h3>
                  <p className="text-xs text-purple-200/80">
                    Reality check: You don't become an expert in 12 months, but you become genuinely capable of building useful systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-amber-300 text-[10px] uppercase font-mono">
                    <th className="py-2.5 px-3">Month</th>
                    <th className="py-2.5 px-3">Core Engineering Focus</th>
                    <th className="py-2.5 px-3">Tangible Output</th>
                    <th className="py-2.5 px-3">Key Capability Unlocked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-purple-100">
                  {TWELVE_MONTH_PLAN.map((m) => (
                    <tr key={m.month} className="hover:bg-white/5 transition">
                      <td className="py-2.5 px-3 font-mono font-bold text-amber-300">Month {m.month}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-100">{m.focus}</td>
                      <td className="py-2.5 px-3 text-emerald-300 font-semibold">{m.output}</td>
                      <td className="py-2.5 px-3 text-purple-300/90 italic">{m.keyMilestone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 4: THE 2026 AI STACK & JOB-READY CRITERIA */}
      {/* ========================================================================= */}
      {activeTab === 'stack2026' && (
        <div className="space-y-6">

          {/* The 2026 AI Stack 14-Layer Matrix */}
          <div className="bg-[#1e1b4b]/80 border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-300/30">
                  <Cpu className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-black text-amber-200 font-display">
                    The 2026 AI Stack (14-Layer Tool Matrix)
                  </h3>
                  <p className="text-xs text-purple-200/80">
                    Tools evolve rapidly, but underlying concepts (retrieval, evals, state, serving) transfer cleanly.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {AI_STACK_2026.map((layer, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-amber-300 font-mono">
                      Layer 0{idx + 1}
                    </span>
                    <span className="text-[10px] text-purple-400 italic">
                      {layer.importance}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100 font-display">
                    {layer.layer}
                  </h4>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {layer.tools.map((tool, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-amber-200">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* When Are You Actually Job-Ready? Checklist */}
          <div className="bg-[#1e1b4b]/80 border border-purple-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-black text-amber-200 font-display">
                    When Are You Actually Job-Ready?
                  </h3>
                  <p className="text-xs text-purple-200/80">
                    The strongest portfolio is not "I know 20 tools." It is: "I built 3 systems, and I can defend every engineering decision."
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {JOB_READY_CRITERIA.map((role) => (
                <div key={role.role} className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-amber-200 font-display">
                      {role.role}
                    </h4>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-400/30">
                      {role.badge}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-purple-100">
                    {role.criteria.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Learn Early vs Later & Anti-Goals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-emerald-950/30 border border-emerald-400/30 space-y-3">
              <span className="text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Learn Early</span>
              </span>
              <ul className="space-y-1.5 text-xs text-emerald-100">
                {LEARN_FIRST_VS_LATER.learnEarly.map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-3xl bg-indigo-950/30 border border-indigo-400/30 space-y-3">
              <span className="text-xs font-black text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>Learn After You Can Build</span>
              </span>
              <ul className="space-y-1.5 text-xs text-indigo-100">
                {LEARN_FIRST_VS_LATER.learnAfterYouCanBuild.map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-indigo-400">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-3xl bg-rose-950/30 border border-rose-400/30 space-y-3">
              <span className="text-xs font-black text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Anti-Goals (Do Not Chase)</span>
              </span>
              <ul className="space-y-1.5 text-xs text-rose-100">
                {LEARN_FIRST_VS_LATER.antiGoals.map((item, i) => (
                  <li key={i} className="leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The 6-Step Study Loop */}
          <div className="bg-[#1e1b4b]/80 border border-purple-500/30 rounded-3xl p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider font-display">
              🔁 How to Study Without Getting Stuck (The 6-Step Loop)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              {STUDY_LOOP_STEPS.map((s) => (
                <div key={s.step} className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-[10px] font-black text-amber-400 font-mono">Step 0{s.step}</span>
                  <p className="font-bold text-slate-100">{s.title}</p>
                  <p className="text-[11px] text-purple-300/80 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
