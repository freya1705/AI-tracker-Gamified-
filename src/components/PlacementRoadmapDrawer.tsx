import React, { useState, useEffect } from 'react';
import { 
  PLACEMENT_PHASES_DATA, 
  WEEKLY_SPLIT_DATA, 
  PRIORITY_TIERS_DATA, 
  CONTINUOUS_TRACKS_DATA, 
  ACTUAL_ROADMAP_STAIRS,
  TOTAL_PLACEMENT_WEEKS 
} from '../data/placementRoadmapData';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  X, Compass, CheckCircle2, Circle, Trophy, 
  Calendar, Layers, Brain, Cpu, Database, 
  Flame, ChevronRight, ChevronDown, ChevronUp, 
  ArrowRight, ShieldCheck, Zap, Sparkles, Filter, ExternalLink
} from 'lucide-react';

interface PlacementRoadmapDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWeek?: (weekNum: number) => void;
}

const STORAGE_KEY_PLACEMENT_COMPLETED_WEEKS = 'freya_quest_placement_completed_weeks_v1';

export const PlacementRoadmapDrawer: React.FC<PlacementRoadmapDrawerProps> = ({
  isOpen,
  onClose,
  onSelectWeek,
}) => {
  const [activeTab, setActiveTab] = useState<'weeks' | 'engine' | 'continuous' | 'tiers' | 'staircase'>('weeks');
  const [selectedPhaseNum, setSelectedPhaseNum] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Track completed weeks
  const [completedWeeks, setCompletedWeeks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PLACEMENT_COMPLETED_WEEKS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PLACEMENT_COMPLETED_WEEKS, JSON.stringify(completedWeeks));
    } catch {}
  }, [completedWeeks]);

  if (!isOpen) return null;

  const toggleWeekCompleted = (weekNum: number) => {
    setCompletedWeeks(prev => {
      const isCompleted = prev.includes(weekNum);
      if (isCompleted) {
        sounds.playClick();
        return prev.filter(w => w !== weekNum);
      } else {
        sounds.playTaskComplete();
        // Check if milestone week (8, 12, 16, 20, 24, 28, 32, 36)
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

  const progressPercent = Math.round((completedWeeks.length / TOTAL_PLACEMENT_WEEKS) * 100);

  const currentPhase = PLACEMENT_PHASES_DATA.find(p => p.phaseNum === selectedPhaseNum) || PLACEMENT_PHASES_DATA[0];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" 
      />

      {/* Drawer Container (Side Bar sliding from right) */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-2xl bg-[#0f172a] border-l border-amber-500/30 text-slate-100 shadow-2xl flex flex-col h-full animate-slide-left">
          
          {/* 1. Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 bg-gradient-to-r from-[#1e1b4b] to-[#0f172a] shrink-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-300/30 flex items-center justify-center text-lg font-black shadow-inner">
                  🎯
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-amber-200 font-display">
                      36-Week Placement Engine
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      {completedWeeks.length}/{TOTAL_PLACEMENT_WEEKS} Wks Done
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-200/80">
                    Software Engineer first. AI-powered engineer second.
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-purple-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-3.5 space-y-1">
              <div className="flex justify-between text-[10px] text-purple-300 font-mono">
                <span>Placement Readiness Progress</span>
                <span className="font-bold text-amber-300">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 via-purple-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-3.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
              {[
                { id: 'weeks', label: '📅 36-Week Plan' },
                { id: 'engine', label: '🧠 Weekly Engine (20h)' },
                { id: 'continuous', label: '🔄 Continuous Tracks' },
                { id: 'tiers', label: '📊 Priority Tiers' },
                { id: 'staircase', label: '🪜 The Staircase' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveTab(tab.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-purple-200 border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Main Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            
            {/* ============================================================== */}
            {/* TAB 1: 36 WEEKS PLAN */}
            {/* ============================================================== */}
            {activeTab === 'weeks' && (
              <div className="space-y-4">
                
                {/* Golden Directive Banner */}
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-200/90 leading-relaxed">
                  <strong className="text-amber-300 font-bold">Rule of Thumb: </strong>
                  Do not try to do all 24 sections one after another. DSA + CS stay alive throughout. 
                  Backend → Cloud → Distributed Systems build sequentially. Projects are where you apply everything.
                </div>

                {/* Phase Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {PLACEMENT_PHASES_DATA.map((phase) => {
                    const isSelected = selectedPhaseNum === phase.phaseNum;
                    const phaseWeeksDone = phase.weeks.filter(w => completedWeeks.includes(w.weekNum)).length;
                    return (
                      <button
                        key={phase.phaseNum}
                        onClick={() => {
                          sounds.playClick();
                          setSelectedPhaseNum(phase.phaseNum);
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
                            : 'bg-black/40 text-purple-200 border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span>{phase.icon}</span>
                        <span>Phase {phase.phaseNum}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-slate-950/20 text-slate-900' : 'bg-white/10 text-purple-300'}`}>
                          {phaseWeeksDone}/{phase.weeks.length}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Phase Info Banner */}
                <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-300/30">
                        {currentPhase.weeksRange}
                      </span>
                      <h4 className="text-sm font-black text-amber-100 font-display">
                        {currentPhase.title}
                      </h4>
                    </div>
                    <p className="text-xs text-purple-200/80 mt-1">
                      {currentPhase.tagline}
                    </p>
                  </div>

                  {currentPhase.milestoneTitle && (
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shrink-0 self-start sm:self-center">
                      🏆 {currentPhase.milestoneTitle}
                    </span>
                  )}
                </div>

                {/* Weeks in Current Phase */}
                <div className="space-y-3.5">
                  {currentPhase.weeks.map((week) => {
                    const isDone = completedWeeks.includes(week.weekNum);
                    return (
                      <div
                        key={week.weekNum}
                        className={`p-4 rounded-2xl border transition-all ${
                          isDone 
                            ? 'bg-emerald-950/20 border-emerald-500/40' 
                            : 'bg-black/30 border-white/10 hover:border-amber-400/30'
                        }`}
                      >
                        {/* Week Header */}
                        <div className="flex items-start justify-between gap-2.5 pb-2.5 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleWeekCompleted(week.weekNum)}
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
                              <h5 className="text-xs sm:text-sm font-black text-slate-100 font-display">
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

                        {/* Week Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 text-xs">
                          {/* Learn */}
                          <div className="space-y-1 bg-black/20 p-2.5 rounded-xl border border-white/5">
                            <span className="text-[10px] font-black uppercase text-indigo-300 block">
                              📚 Learn / Practice
                            </span>
                            <ul className="space-y-1 text-purple-100">
                              {week.learn.map((l, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 leading-snug">
                                  <span className="text-indigo-400">•</span>
                                  <span>{l}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* DSA & Build */}
                          <div className="space-y-2.5">
                            {/* DSA */}
                            <div className="space-y-1 bg-black/20 p-2.5 rounded-xl border border-white/5">
                              <span className="text-[10px] font-black uppercase text-amber-300 block">
                                🧠 Continuous DSA
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {week.dsa.map((d, idx) => (
                                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-200 border border-amber-400/20">
                                    {d}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Build */}
                            <div className="space-y-1 bg-black/20 p-2.5 rounded-xl border border-white/5">
                              <span className="text-[10px] font-black uppercase text-emerald-300 block">
                                🛠️ Build & Apply
                              </span>
                              <ul className="space-y-1 text-emerald-100">
                                {week.build.map((b, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5 leading-snug">
                                    <span className="text-emerald-400">✓</span>
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Output Banner */}
                        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                          <span className="text-[11px] text-amber-300 font-semibold">
                            🎯 Output: {week.output}
                          </span>
                          <button
                            onClick={() => toggleWeekCompleted(week.weekNum)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition cursor-pointer ${
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
            )}

            {/* ============================================================== */}
            {/* TAB 2: WEEKLY ENGINE (20H/WEEK SPLIT) */}
            {/* ============================================================== */}
            {activeTab === 'engine' && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/30 space-y-2">
                  <h4 className="text-sm font-black text-amber-200 font-display">
                    Your Weekly Engine: 20 Hours / Week Split
                  </h4>
                  <p className="text-xs text-purple-200/80 leading-relaxed">
                    Don't make a strict hourly timetable. Every week has 5 parallel tracks. If college gets heavy, 
                    reduce total hours, but <strong className="text-amber-300">never stop DSA completely</strong>.
                  </p>
                </div>

                {/* ASCII / Visual Flow Diagram */}
                <div className="p-4 rounded-2xl bg-black/60 border border-amber-400/20 font-mono text-xs text-amber-200 text-center leading-relaxed">
                  <div className="text-purple-300">YOUR WEEK (~20 HOURS)</div>
                  <div className="text-slate-500">│</div>
                  <div className="text-slate-500">┌─────────────┼─────────────┐</div>
                  <div className="grid grid-cols-3 gap-1 pt-1 text-[11px]">
                    <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-400/30 text-amber-300">
                      <div>🧠 DSA (6h)</div>
                      <div className="text-[9px] text-amber-400/80">Java Patterns</div>
                    </div>
                    <div className="p-2 rounded-xl bg-indigo-950/40 border border-indigo-400/30 text-indigo-300">
                      <div>💻 BUILD (7h)</div>
                      <div className="text-[9px] text-indigo-400/80">Backend/Cloud</div>
                    </div>
                    <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-400/30 text-purple-300">
                      <div>📚 CS (2h)</div>
                      <div className="text-[9px] text-purple-400/80">DBMS/OS/CN</div>
                    </div>
                  </div>
                  <div className="text-slate-500 pt-2">└──────┬──────┘</div>
                  <div className="text-slate-500">↓</div>
                  <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-400/30 text-emerald-300 text-xs">
                    🚀 PROJECT APPLICATION (4h)
                  </div>
                  <div className="text-slate-500">↓</div>
                  <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-400/30 text-cyan-300 text-xs">
                    🤖 AI POWER LAYER (1h)
                  </div>
                </div>

                {/* Hours Split Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {WEEKLY_SPLIT_DATA.map((t, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-base">{t.icon}</span>
                        <span className="text-xs font-mono font-black text-amber-300 px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-300/30">
                          {t.hours} hrs / week
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
            )}

            {/* ============================================================== */}
            {/* TAB 3: CONTINUOUS TRACKS (DSA, CS, AI) */}
            {/* ============================================================== */}
            {activeTab === 'continuous' && (
              <div className="space-y-5">
                {CONTINUOUS_TRACKS_DATA.map((track, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{track.icon}</span>
                      <div>
                        <h4 className="text-sm font-black text-amber-200 font-display">
                          {track.name}
                        </h4>
                        <p className="text-xs text-purple-200/80">
                          {track.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                      {track.schedule.map((item, sIdx) => (
                        <div key={sIdx} className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                          <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">
                            {item.period}
                          </span>
                          <p className="text-purple-100 font-medium leading-snug">
                            {item.topics}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 4: PRIORITY TIERS */}
            {/* ============================================================== */}
            {activeTab === 'tiers' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-200 leading-relaxed">
                  <strong className="font-bold text-amber-300">Crucial Correction: </strong>
                  Do not treat all sections as equal. Follow this strict ordering to avoid spending 3 weeks on Kubernetes while DSA or backend is still shaky.
                </div>

                <div className="space-y-3">
                  {PRIORITY_TIERS_DATA.map((tier) => (
                    <div key={tier.tierNum} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs sm:text-sm font-black text-amber-200 font-display">
                          {tier.label}
                        </h5>
                        <span className="text-[10px] font-mono text-purple-400">
                          Tier {tier.tierNum}
                        </span>
                      </div>
                      <p className="text-xs text-purple-200/80 italic">
                        {tier.tagline}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {tier.items.map((item, i) => (
                          <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-purple-100">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 5: THE STAIRCASE FLOWCHART */}
            {/* ============================================================== */}
            {activeTab === 'staircase' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/30 space-y-1.5">
                  <h4 className="text-sm font-black text-amber-200 font-display">
                    Your Actual Staircase to Placement
                  </h4>
                  <p className="text-xs text-purple-200/80">
                    A clear progression staircase instead of 30 isolated topics competing for attention.
                  </p>
                </div>

                <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-purple-500 before:to-emerald-400">
                  {ACTUAL_ROADMAP_STAIRS.map((st, idx) => (
                    <div key={idx} className="relative flex items-start gap-3 group">
                      <span className="absolute -left-[19px] top-1 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-amber-400 group-hover:scale-125 transition-transform" />
                      <div className="p-3 rounded-xl bg-black/30 border border-white/10 group-hover:border-amber-400/40 transition flex-1 flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">{st.icon}</span>
                            <span className="text-xs font-black text-amber-200 font-mono">
                              {st.step}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-slate-100 mt-0.5">{st.label}</p>
                          <p className="text-[11px] text-purple-300/80">{st.desc}</p>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 font-bold shrink-0">
                          #{idx + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* 3. Footer */}
          <div className="p-4 border-t border-white/10 bg-[#0f172a] flex items-center justify-between text-xs text-purple-300 shrink-0">
            <span>First Target: 8 Weeks to Spring Boot + Postgres + DSA</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition cursor-pointer"
            >
              Close Drawer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
