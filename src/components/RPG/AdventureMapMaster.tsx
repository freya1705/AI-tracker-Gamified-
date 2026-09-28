import React, { useState, useMemo } from 'react';
import { UserStats, MasterDailyState, Task, SyllabusTopic, CalendarDayInfo, AiJournalEntry } from '../../types';
import { ALL_SYLLABUS_TOPICS, MASTER_AI_MODULES, MASTER_SWE_PILLARS } from '../../data/syllabusData';
import { TOTAL_VERBATIM_ITEMS, VERBATIM_CHECKLIST_SECTIONS } from '../../data/verbatimChecklistData';
import { getBestResourceForTopic } from '../../data/resourceData';
import { sounds } from '../../utils/audio';
import { AiHeroWorldsView } from '../AiHeroWorldsView';
import { CalendarView } from '../CalendarView';
import { 
  Map, Compass, Sparkles, CheckCircle2, Circle, Trophy, 
  Layers, Brain, Shield, ChevronDown, ChevronUp, ExternalLink, 
  ArrowRight, Search, CheckSquare, Calendar, Zap, Crown, Flame, Target, BookOpen
} from 'lucide-react';

interface AdventureMapMasterProps {
  stats: UserStats;
  daily: MasterDailyState;
  tasks: Task[];
  completedTopicIds: string[];
  verbatimCheckedIds: string[];
  journalEntries: AiJournalEntry[];
  onToggleTopic: (topicId: string, topicTitle: string, isChecked: boolean) => void;
  onLoadTopicIntoDaily: (topic: SyllabusTopic) => void;
  onToggleVerbatimItem: (id: string) => void;
  onResetVerbatimChecklist: () => void;
  onSelectDayForSystem: (dayInfo: CalendarDayInfo) => void;
  onOpenTopicPicker: (mode: 'ai' | 'swe') => void;
  onOpenResources: (stageId?: string) => void;
  onOpenFounderRoadmap: () => void;
  onOpenRoadmap: () => void;
  onOpenProblemSheet: () => void;
  onOpenOriginalNote: () => void;
  onOpenAddTask: () => void;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
  initialSubTab?: string;
  onSelectRealm?: (realm: 'today' | 'master' | 'roadmap' | 'resources' | 'quests' | 'calendar') => void;
}

export type AdventureSubTab = 'ai' | 'swe' | 'bosses' | 'checklist' | 'calendar';

export const AdventureMapMaster: React.FC<AdventureMapMasterProps> = ({
  stats,
  daily,
  tasks,
  completedTopicIds,
  verbatimCheckedIds,
  journalEntries,
  onToggleTopic,
  onLoadTopicIntoDaily,
  onToggleVerbatimItem,
  onResetVerbatimChecklist,
  onSelectDayForSystem,
  onOpenTopicPicker,
  onOpenResources,
  onOpenFounderRoadmap,
  onOpenRoadmap,
  onOpenProblemSheet,
  onOpenOriginalNote,
  onOpenAddTask,
  onUpdateStats,
  initialSubTab = 'ai',
  onSelectRealm,
}) => {
  const [activeTab, setActiveTab] = useState<AdventureSubTab>(() => {
    if (initialSubTab === 'hero_worlds' || initialSubTab === 'bosses') return 'bosses';
    if (initialSubTab === 'swe') return 'swe';
    if (initialSubTab === 'checklist') return 'checklist';
    if (initialSubTab === 'calendar') return 'calendar';
    return 'ai';
  });

  const [expandedAiStage, setExpandedAiStage] = useState<string | null>('ai-stage-1');
  const [expandedSwePillar, setExpandedSwePillar] = useState<string | null>('swe-dsa');
  const [searchTopicQuery, setSearchTopicQuery] = useState<string>('');
  const [checklistSearch, setChecklistSearch] = useState<string>('');
  const [expandedChecklistSections, setExpandedChecklistSections] = useState<Record<string, boolean>>({
    '0': true,
    '1': true,
    '2': true,
  });

  const completedSet = useMemo(() => new Set(completedTopicIds), [completedTopicIds]);
  const totalCount = ALL_SYLLABUS_TOPICS.length;
  const totalCompleted = completedTopicIds.length;
  const overallPercent = Math.round((totalCompleted / (totalCount || 1)) * 100);

  const aiTotal = MASTER_AI_MODULES.reduce((sum, m) => sum + m.topics.length, 0);
  const aiCompleted = MASTER_AI_MODULES.reduce((sum, m) => sum + m.topics.filter(t => completedSet.has(t.id)).length, 0);
  const aiPercent = Math.round((aiCompleted / (aiTotal || 1)) * 100);

  const sweTotal = MASTER_SWE_PILLARS.reduce((sum, p) => sum + p.topics.length, 0);
  const sweCompleted = MASTER_SWE_PILLARS.reduce((sum, p) => sum + p.topics.filter(t => completedSet.has(t.id)).length, 0);
  const swePercent = Math.round((sweCompleted / (sweTotal || 1)) * 100);

  // Biome and theme mapping for 17 AI Stages
  const aiBiomeThemes: Record<number, { bg: string; border: string; badge: string; terrain: string; landmark: string }> = {
    1: { bg: 'from-amber-950/40 via-purple-950/40 to-slate-900', border: 'border-amber-500/40', badge: 'bg-amber-500/20 text-amber-300 border-amber-400/30', terrain: 'Valley of First Principles', landmark: 'The Monolith of Reasoning' },
    2: { bg: 'from-indigo-950/40 via-blue-950/40 to-slate-900', border: 'border-indigo-500/40', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30', terrain: 'Mathematical Highlands', landmark: 'Vector & Matrix Sanctuary' },
    3: { bg: 'from-blue-950/40 via-cyan-950/40 to-slate-900', border: 'border-blue-500/40', badge: 'bg-blue-500/20 text-blue-300 border-blue-400/30', terrain: 'Statistical Delta', landmark: 'Probability Shrine' },
    4: { bg: 'from-emerald-950/40 via-teal-950/40 to-slate-900', border: 'border-emerald-500/40', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30', terrain: 'Feature Engineering Basin', landmark: 'The Data Pipeline Forge' },
    5: { bg: 'from-teal-950/40 via-green-950/40 to-slate-900', border: 'border-teal-500/40', badge: 'bg-teal-500/20 text-teal-300 border-teal-400/30', terrain: 'Classical ML Plains', landmark: 'The Ensemble Forest' },
    6: { bg: 'from-purple-950/40 via-violet-950/40 to-slate-900', border: 'border-purple-500/40', badge: 'bg-purple-500/20 text-purple-300 border-purple-400/30', terrain: 'Neural Network Caverns', landmark: 'Backprop Chasm' },
    7: { bg: 'from-violet-950/40 via-fuchsia-950/40 to-slate-900', border: 'border-fuchsia-500/40', badge: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/30', terrain: 'Deep Learning Citadel', landmark: 'PyTorch Observatory' },
    8: { bg: 'from-fuchsia-950/40 via-rose-950/40 to-slate-900', border: 'border-rose-500/40', badge: 'bg-rose-500/20 text-rose-300 border-rose-400/30', terrain: 'Computer Vision Realm', landmark: 'Convolutional Bastion' },
    9: { bg: 'from-amber-950/40 via-orange-950/40 to-slate-900', border: 'border-orange-500/40', badge: 'bg-orange-500/20 text-orange-300 border-orange-400/30', terrain: 'Sequential Linguistic Wilds', landmark: 'Recurrent Towers' },
    10: { bg: 'from-yellow-950/40 via-amber-950/40 to-slate-900', border: 'border-yellow-500/40', badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30', terrain: 'The Transformer Metropolis', landmark: 'Self-Attention Spire' },
    11: { bg: 'from-rose-950/40 via-purple-950/40 to-slate-900', border: 'border-pink-500/40', badge: 'bg-pink-500/20 text-pink-300 border-pink-400/30', terrain: 'Frontier LLM Archipelago', landmark: 'Prompt & Generation Bastion' },
    12: { bg: 'from-cyan-950/40 via-blue-950/40 to-slate-900', border: 'border-cyan-500/40', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30', terrain: 'Retrieval Augmented Sea', landmark: 'Vector Database Vault' },
    13: { bg: 'from-red-950/40 via-amber-950/40 to-slate-900', border: 'border-red-500/40', badge: 'bg-red-500/20 text-red-300 border-red-400/30', terrain: 'Fine-Tuning Volcanic Forge', landmark: 'LoRA & QLoRA Kiln' },
    14: { bg: 'from-emerald-950/40 via-teal-950/40 to-slate-900', border: 'border-emerald-500/40', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30', terrain: 'Evaluation Sanctuary', landmark: 'Benchmark Coliseum' },
    15: { bg: 'from-indigo-950/40 via-purple-950/40 to-slate-900', border: 'border-indigo-500/40', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30', terrain: 'Multi-Agent Autonomous Kingdom', landmark: 'Agentic Council Citadel' },
    16: { bg: 'from-blue-950/40 via-slate-900 to-slate-950', border: 'border-blue-400/40', badge: 'bg-blue-500/20 text-blue-300 border-blue-400/30', terrain: 'Production MLOps Bastion', landmark: 'Inference Engine Citadel' },
    17: { bg: 'from-amber-900/50 via-purple-950/50 to-slate-950', border: 'border-amber-400/60', badge: 'bg-amber-500/30 text-amber-200 border-amber-300/40', terrain: 'AI Founder Sovereign Horizon', landmark: 'Crown of Enterprise Impact' },
  };

  // SWE Bastions
  const sweBastionThemes: Record<number, { bg: string; border: string; landmark: string; rune: string }> = {
    1: { bg: 'from-amber-950/40 via-emerald-950/40 to-slate-900', border: 'border-amber-400/40', landmark: 'DSA Ancient Forest & Pathfinding Ruins', rune: '⚡' },
    2: { bg: 'from-orange-950/40 via-red-950/40 to-slate-900', border: 'border-orange-400/40', landmark: 'JVM Ironforge & Collections Bastion', rune: '☕' },
    3: { bg: 'from-indigo-950/40 via-purple-950/40 to-slate-900', border: 'border-indigo-400/40', landmark: 'Clean Architecture Cathedral & SOLID Gate', rune: '📐' },
    4: { bg: 'from-cyan-950/40 via-blue-950/40 to-slate-900', border: 'border-cyan-400/40', landmark: 'Relational & Distributed Database Vault', rune: '💾' },
    5: { bg: 'from-slate-900 via-zinc-900 to-slate-950', border: 'border-slate-500/40', landmark: 'Kernel Peaks & Virtual Memory Abyss', rune: '⚙️' },
    6: { bg: 'from-blue-950/40 via-sky-950/40 to-slate-900', border: 'border-sky-400/40', landmark: 'TCP/IP Oceanic Cables & HTTP Nexus', rune: '🌐' },
    7: { bg: 'from-purple-950/40 via-indigo-950/40 to-slate-900', border: 'border-purple-400/40', landmark: 'High-Scale Distributed Metropolis', rune: '🏛️' },
    8: { bg: 'from-emerald-950/40 via-teal-950/40 to-slate-900', border: 'border-emerald-400/40', landmark: 'Docker Container Docks & Linux Arsenal', rune: '🐳' },
    9: { bg: 'from-amber-950/40 via-violet-950/40 to-slate-900', border: 'border-amber-400/40', landmark: 'AI Production Gate & Real-Time Gateway', rune: '🚀' },
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      
      {/* 1. Arcane Adventure Realm Banner */}
      <div className="relative rounded-3xl p-6 sm:p-7 overflow-hidden border border-purple-500/30 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#1e1b4b] shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30">
                🗺️ The Grand Map of Intelligence
              </span>
              <span className="text-xs font-mono text-purple-300">
                Total Syllabus: {totalCompleted} / {totalCount} Mastered ({overallPercent}%)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-200 font-display drop-shadow-md">
              THE WORLD ADVENTURE MAP
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80 max-w-2xl leading-relaxed">
              Every landmark on this continent represents a foundational truth in AI Engineering. 
              Traverse the 17 AI Stages, conquer the 9 SWE Bastions, challenge the 12 Boss Arenas, and track your complete syllabus checklist.
            </p>
          </div>

          {/* Dual Progress Crystal Badges */}
          <div className="flex items-center gap-3 shrink-0">
            {/* AI Progress Node */}
            <div className="flex flex-col items-center bg-black/40 border border-purple-400/30 rounded-2xl p-3 min-w-[100px] shadow-inner text-center">
              <span className="text-[10px] font-black uppercase text-purple-300">AI Track</span>
              <span className="text-lg font-black text-amber-300 font-display mt-0.5">{aiPercent}%</span>
              <span className="text-[9px] font-mono text-purple-300/70">{aiCompleted}/{aiTotal} topics</span>
              <div className="w-16 bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full transition-all" style={{ width: `${aiPercent}%` }} />
              </div>
            </div>

            {/* SWE Progress Node */}
            <div className="flex flex-col items-center bg-black/40 border border-indigo-400/30 rounded-2xl p-3 min-w-[100px] shadow-inner text-center">
              <span className="text-[10px] font-black uppercase text-indigo-300">SWE Track</span>
              <span className="text-lg font-black text-indigo-300 font-display mt-0.5">{swePercent}%</span>
              <span className="text-[9px] font-mono text-indigo-300/70">{sweCompleted}/{sweTotal} topics</span>
              <div className="w-16 bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-indigo-400 h-full rounded-full transition-all" style={{ width: `${swePercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Sub-Tabs Across The Continent */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'ai', label: '🗺️ AI Mastery Path (17 Stages)', count: `${aiCompleted}/${aiTotal}` },
            { id: 'swe', label: '🛡️ SWE Bastions (9 Pillars)', count: `${sweCompleted}/${sweTotal}` },
            { id: 'bosses', label: '👑 12 Boss Battles & Dual Progress', count: '12 Bosses' },
            { id: 'checklist', label: '📋 Verbatim Checklist (0–29)', count: `${verbatimCheckedIds.length}/${TOTAL_VERBATIM_ITEMS}` },
            { id: 'calendar', label: '📅 180-Day Expedition Calendar', count: `Day ${daily?.dayNumber || 1}` },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(tab.id as AdventureSubTab);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                    : 'bg-white/5 hover:bg-white/10 text-purple-200 border border-white/10'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-amber-900/30 text-slate-900' : 'bg-black/30 text-purple-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SUB-REALM 1: 🗺️ 17 AI STAGES ADVENTURE MAP */}
      {/* ========================================================= */}
      {activeTab === 'ai' && (
        <div className="space-y-4">
          
          {/* Quick Filter & Stage Search */}
          <div className="bg-[#1e1b4b]/60 border border-purple-500/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-300">Winding Journey:</span>
              <span className="text-xs text-purple-200/80">From Data & Math (Stage 1) to Sovereign AI Founder (Stage 17)</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search any AI topic or concept..."
                value={searchTopicQuery}
                onChange={(e) => setSearchTopicQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-black/40 border border-purple-400/30 text-xs text-purple-100 placeholder-purple-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full sm:w-64"
              />
            </div>
          </div>

          {/* The 17 AI Stages Landmarks Grid / Winding Trail */}
          <div className="space-y-3.5">
            {MASTER_AI_MODULES.map((stage) => {
              const theme = aiBiomeThemes[stage.index] || aiBiomeThemes[1];
              const isExpanded = expandedAiStage === stage.id;
              const stageCompleted = stage.topics.filter(t => completedSet.has(t.id)).length;
              const stageTotal = stage.topics.length;
              const stagePercent = Math.round((stageCompleted / (stageTotal || 1)) * 100);

              const visibleTopics = stage.topics.filter(t => {
                if (!searchTopicQuery.trim()) return true;
                const q = searchTopicQuery.toLowerCase();
                return (
                  t.title.toLowerCase().includes(q) ||
                  t.whyItMatters?.toLowerCase().includes(q) ||
                  t.suggestedCodeTask?.toLowerCase().includes(q)
                );
              });

              if (searchTopicQuery.trim() && visibleTopics.length === 0) return null;

              return (
                <div 
                  key={stage.id}
                  className={`rounded-3xl border ${theme.border} bg-gradient-to-r ${theme.bg} overflow-hidden transition-all shadow-lg shadow-black/30 hover:border-amber-400/60`}
                >
                  {/* Landmark Header / Banner */}
                  <div
                    onClick={() => {
                      sounds.playClick();
                      setExpandedAiStage(isExpanded ? null : stage.id);
                    }}
                    className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-white/5 transition"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                        {stage.icon}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${theme.badge}`}>
                            Stage {stage.index} • {theme.terrain}
                          </span>
                          <span className="text-[10px] font-mono text-purple-300">
                            ⏱️ {stage.approxTime}
                          </span>
                          {stagePercent === 100 && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-emerald-300" />
                              <span>CLEARED</span>
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-black text-amber-200 font-display mt-0.5">
                          {stage.title}
                        </h3>
                        <p className="text-xs text-purple-200/80 mt-0.5 line-clamp-1">
                          {stage.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress Ring & Expand Toggle */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-black text-amber-300">
                          {stageCompleted} / {stageTotal} Topics
                        </div>
                        <div className="w-24 bg-black/50 h-1.5 rounded-full mt-1 overflow-hidden border border-white/10">
                          <div 
                            className="bg-gradient-to-r from-amber-400 to-amber-300 h-full rounded-full transition-all" 
                            style={{ width: `${stagePercent}%` }} 
                          />
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center text-purple-300">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Landmark Content: Complete Topics List */}
                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-white/10 space-y-3 bg-black/20">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3">
                        <span className="text-xs font-bold text-amber-300">
                          Landmark Artifact: {theme.landmark}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenResources(stage.id);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-300/30 rounded-xl text-xs font-bold cursor-pointer transition active:scale-95"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                          <span>Stage {stage.index} Study Vault Resources →</span>
                        </button>
                      </div>

                      {/* Topics Cards */}
                      <div className="grid grid-cols-1 gap-2.5 pt-1">
                        {visibleTopics.map((topic) => {
                          const isMastered = completedSet.has(topic.id);
                          const resource = getBestResourceForTopic(topic.title);

                          return (
                            <div 
                              key={topic.id}
                              className={`p-3.5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                                isMastered 
                                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                                  : 'bg-black/40 border-white/10 hover:border-purple-400/40 text-purple-100'
                              }`}
                            >
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      sounds.playClick();
                                      onToggleTopic(topic.id, topic.title, !isMastered);
                                    }}
                                    className="cursor-pointer shrink-0 transition hover:scale-110 active:scale-90"
                                    title={isMastered ? "Mark unmastered" : "Mark mastered (+25 XP)"}
                                  >
                                    {isMastered ? (
                                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                                    ) : (
                                      <Circle className="w-5 h-5 text-purple-400 hover:text-amber-400" />
                                    )}
                                  </button>

                                  <h4 className={`text-xs sm:text-sm font-black ${isMastered ? 'line-through text-emerald-300' : 'text-slate-100'}`}>
                                    {topic.title}
                                  </h4>
                                </div>

                                {topic.whyItMatters && (
                                  <p className="text-[11px] text-purple-200/70 pl-7">
                                    💡 {topic.whyItMatters}
                                  </p>
                                )}

                                {topic.suggestedCodeTask && (
                                  <p className="text-[11px] text-amber-200/80 pl-7 font-mono">
                                    💻 Task: {topic.suggestedCodeTask}
                                  </p>
                                )}
                              </div>

                              {/* Action Buttons for Topic */}
                              <div className="flex items-center gap-2 pl-7 md:pl-0 shrink-0">
                                {resource && (
                                  <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-purple-200 hover:text-amber-200 text-[11px] font-bold border border-white/10 transition inline-flex items-center gap-1"
                                    title={`Study with: ${resource.name}`}
                                  >
                                    <span>{resource.name.slice(0, 14)}...</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}

                                <button
                                  onClick={() => {
                                    sounds.playClick();
                                    onLoadTopicIntoDaily(topic);
                                    if (onSelectRealm) onSelectRealm('today');
                                  }}
                                  className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition cursor-pointer active:scale-95 inline-flex items-center gap-1"
                                  title="Load into Today's Quest Stack"
                                >
                                  <Zap className="w-3 h-3 text-slate-950" />
                                  <span>Load Into Today</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* 3. SUB-REALM 2: 🛡️ SWE BASTIONS (9 PILLARS) */}
      {/* ========================================================= */}
      {activeTab === 'swe' && (
        <div className="space-y-4">
          <div className="bg-[#1e1b4b]/60 border border-indigo-500/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-sm">
            <div>
              <span className="text-xs font-black text-indigo-300">The 9 Iron Bastions:</span>
              <p className="text-xs text-purple-200/80">
                Data Structures, Java, Clean Architecture, DBMS, OS, Networks, System Design, DevOps, and AI Systems Integration.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-indigo-300">Overall: {sweCompleted}/{sweTotal} Pillars Topics</span>
            </div>
          </div>

          <div className="space-y-3.5">
            {MASTER_SWE_PILLARS.map((pillar) => {
              const theme = sweBastionThemes[pillar.stepNumber] || sweBastionThemes[1];
              const isExpanded = expandedSwePillar === pillar.id;
              const pillarCompleted = pillar.topics.filter(t => completedSet.has(t.id)).length;
              const pillarTotal = pillar.topics.length;
              const pillarPercent = Math.round((pillarCompleted / (pillarTotal || 1)) * 100);

              return (
                <div
                  key={pillar.id}
                  className={`rounded-3xl border ${theme.border} bg-gradient-to-r ${theme.bg} overflow-hidden transition-all shadow-lg shadow-black/30 hover:border-indigo-400/60`}
                >
                  <div
                    onClick={() => {
                      sounds.playClick();
                      setExpandedSwePillar(isExpanded ? null : pillar.id);
                    }}
                    className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-white/5 transition"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                        {pillar.icon}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                            Bastion {pillar.stepNumber} • {pillar.shortName}
                          </span>
                          {pillarPercent === 100 && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                              FORTIFIED ✨
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-black text-amber-200 font-display mt-0.5">
                          {pillar.name}
                        </h3>
                        <p className="text-xs text-purple-200/80 mt-0.5 line-clamp-1">
                          {pillar.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-black text-indigo-300">
                          {pillarCompleted} / {pillarTotal} Topics
                        </div>
                        <div className="w-24 bg-black/50 h-1.5 rounded-full mt-1 overflow-hidden border border-white/10">
                          <div 
                            className="bg-gradient-to-r from-indigo-400 to-indigo-300 h-full rounded-full transition-all" 
                            style={{ width: `${pillarPercent}%` }} 
                          />
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center text-purple-300">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-white/10 space-y-3 bg-black/20">
                      {pillar.cardinalRule && (
                        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs font-medium mt-3">
                          <span className="font-bold text-amber-300">Bastion Cardinal Rule:</span> {pillar.cardinalRule}
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-2.5 pt-1">
                        {pillar.topics.map((topic) => {
                          const isMastered = completedSet.has(topic.id);
                          return (
                            <div
                              key={topic.id}
                              className={`p-3.5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                                isMastered 
                                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                                  : 'bg-black/40 border-white/10 hover:border-indigo-400/40 text-purple-100'
                              }`}
                            >
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      sounds.playClick();
                                      onToggleTopic(topic.id, topic.title, !isMastered);
                                    }}
                                    className="cursor-pointer shrink-0 transition hover:scale-110 active:scale-90"
                                    title={isMastered ? "Mark unmastered" : "Mark mastered (+25 XP)"}
                                  >
                                    {isMastered ? (
                                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                                    ) : (
                                      <Circle className="w-5 h-5 text-indigo-400 hover:text-amber-400" />
                                    )}
                                  </button>

                                  <h4 className={`text-xs sm:text-sm font-black ${isMastered ? 'line-through text-emerald-300' : 'text-slate-100'}`}>
                                    {topic.title}
                                  </h4>
                                </div>

                                {topic.whyItMatters && (
                                  <p className="text-[11px] text-purple-200/70 pl-7">
                                    💡 {topic.whyItMatters}
                                  </p>
                                )}

                                {topic.suggestedCodeTask && (
                                  <p className="text-[11px] text-amber-200/80 pl-7 font-mono">
                                    💻 Task: {topic.suggestedCodeTask}
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center gap-2 pl-7 md:pl-0 shrink-0">
                                <button
                                  onClick={() => {
                                    sounds.playClick();
                                    onLoadTopicIntoDaily(topic);
                                    if (onSelectRealm) onSelectRealm('today');
                                  }}
                                  className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-xs rounded-xl shadow-md transition cursor-pointer active:scale-95 inline-flex items-center gap-1"
                                  title="Load into DSA/SWE Routine"
                                >
                                  <Zap className="w-3 h-3 text-amber-300" />
                                  <span>Load Into Today</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. SUB-REALM 3: 👑 12 BOSS BATTLES & DUAL PROGRESS */}
      {/* ========================================================= */}
      {activeTab === 'bosses' && (
        <div className="space-y-4">
          <div className="bg-[#1e1b4b]/80 border border-purple-500/30 rounded-3xl p-5 shadow-xl">
            <AiHeroWorldsView
              stats={stats}
              onUpdateStats={onUpdateStats}
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. SUB-REALM 4: 📋 VERBATIM CHECKLIST (SECTIONS 0 TO 29) */}
      {/* ========================================================= */}
      {activeTab === 'checklist' && (
        <div className="space-y-4">
          
          <div className="bg-[#1e1b4b]/80 border border-emerald-500/30 rounded-3xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-400/30">
                  Exact Syllabus Checklist
                </span>
                <span className="text-xs font-black text-emerald-300 font-mono">
                  {verbatimCheckedIds.length} / {TOTAL_VERBATIM_ITEMS} Mastered
                </span>
              </div>
              <h3 className="text-lg font-black text-amber-200 font-display mt-1">
                Sections 0 through 29 (Programming to Production)
              </h3>
              <p className="text-xs text-purple-200/80 mt-0.5">
                100% of your original syllabus checklist preserved line-by-line. Check off each concept as you compound skills!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search checklist topics..."
                value={checklistSearch}
                onChange={(e) => setChecklistSearch(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-black/40 border border-emerald-500/30 text-xs text-purple-100 placeholder-purple-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 w-44"
              />
              <button
                onClick={() => {
                  sounds.playClick();
                  onResetVerbatimChecklist();
                }}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-rose-950/40 text-rose-300 font-bold text-xs border border-white/10 transition cursor-pointer"
                title="Reset all checklist checks"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {VERBATIM_CHECKLIST_SECTIONS.map(section => {
              const visibleItems = section.items.filter(item => {
                if (!checklistSearch.trim()) return true;
                const q = checklistSearch.toLowerCase();
                return item.text.toLowerCase().includes(q) || section.title.toLowerCase().includes(q);
              });

              if (visibleItems.length === 0) return null;

              const isExpanded = expandedChecklistSections[section.sectionNum] !== false;
              const completedInSection = section.items.filter(i => verbatimCheckedIds.includes(i.id)).length;

              return (
                <div
                  key={section.sectionNum}
                  className="bg-[#1e1b4b]/60 rounded-3xl border border-purple-500/20 overflow-hidden shadow-md"
                >
                  <div
                    onClick={() => {
                      sounds.playClick();
                      setExpandedChecklistSections(prev => ({
                        ...prev,
                        [section.sectionNum]: !isExpanded
                      }));
                    }}
                    className="p-4 bg-white/5 hover:bg-white/10 border-b border-white/10 flex items-center justify-between cursor-pointer select-none transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 font-black flex items-center justify-center text-xs border border-emerald-400/30">
                        {section.sectionNum}
                      </span>
                      <h4 className="text-xs sm:text-sm font-black text-amber-100 font-display">
                        {section.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
                        {completedInSection} / {section.items.length}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-purple-300" /> : <ChevronDown className="w-4 h-4 text-purple-300" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 bg-black/20">
                      {visibleItems.map(item => {
                        const isChecked = verbatimCheckedIds.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              sounds.playClick();
                              onToggleVerbatimItem(item.id);
                            }}
                            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                              isChecked
                                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200 font-bold'
                                : 'bg-black/30 border-white/10 hover:border-emerald-400/40 text-purple-100'
                            }`}
                          >
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-purple-400 shrink-0" />
                            )}
                            <span className={`text-xs ${isChecked ? 'line-through opacity-80' : ''}`}>
                              {item.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* 6. SUB-REALM 5: 📅 180-DAY CALENDAR EXPEDITION */}
      {/* ========================================================= */}
      {activeTab === 'calendar' && (
        <div className="space-y-4">
          <div className="bg-[#1e1b4b]/80 border border-purple-500/30 rounded-3xl p-5 shadow-xl">
            <CalendarView
              currentDayNumber={daily?.dayNumber || 1}
              onSelectDayForSystem={onSelectDayForSystem}
            />
          </div>
        </div>
      )}

    </div>
  );
};
