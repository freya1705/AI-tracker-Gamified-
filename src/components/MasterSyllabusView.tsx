import React, { useState, useMemo } from 'react';
import { SyllabusTopic, SyllabusModule, SwePillar } from '../types';
import { MASTER_AI_MODULES, MASTER_SWE_PILLARS, ALL_SYLLABUS_TOPICS, TOTAL_AI_MIN_WEEKS } from '../data/syllabusData';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, Circle, Search, Sparkles, Brain, Cpu, 
  BookOpen, Target, ChevronDown, ChevronUp, Shuffle, ArrowRight, 
  Layers, Flame, Zap, Award, Filter, ShieldCheck, Compass, Clock, Calendar, AlertCircle
} from 'lucide-react';

interface MasterSyllabusViewProps {
  completedTopicIds: string[];
  onToggleTopic: (topicId: string, topicTitle: string, isChecked: boolean) => void;
  onLoadTopicIntoDaily: (topic: SyllabusTopic) => void;
  characterName: string;
}

export const MasterSyllabusView: React.FC<MasterSyllabusViewProps> = ({
  completedTopicIds,
  onToggleTopic,
  onLoadTopicIntoDaily,
  characterName,
}) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'swe' | 'timeline' | 'all'>('ai');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'uncompleted' | 'completed'>('all');
  const [expandedModuleIds, setExpandedModuleIds] = useState<Record<string, boolean>>({
    'ai-stage-1': true,
    'ai-stage-2': true,
    'swe-dsa': true,
  });

  const completedSet = useMemo(() => new Set(completedTopicIds), [completedTopicIds]);

  // Overall counts
  const totalCount = ALL_SYLLABUS_TOPICS.length;
  const totalCompleted = completedTopicIds.length;
  const overallPercent = Math.round((totalCompleted / (totalCount || 1)) * 100);

  const aiTotal = MASTER_AI_MODULES.reduce((sum, m) => sum + m.topics.length, 0);
  const aiCompleted = MASTER_AI_MODULES.reduce((sum, m) => sum + m.topics.filter(t => completedSet.has(t.id)).length, 0);
  const aiPercent = Math.round((aiCompleted / (aiTotal || 1)) * 100);

  const sweTotal = MASTER_SWE_PILLARS.reduce((sum, p) => sum + p.topics.length, 0);
  const sweCompleted = MASTER_SWE_PILLARS.reduce((sum, p) => sum + p.topics.filter(t => completedSet.has(t.id)).length, 0);
  const swePercent = Math.round((sweCompleted / (sweTotal || 1)) * 100);

  // Toggle single module expand/collapse
  const toggleExpand = (id: string) => {
    sounds.playClick();
    setExpandedModuleIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Expand all / collapse all
  const handleExpandAll = (expand: boolean) => {
    sounds.playClick();
    const newExpanded: Record<string, boolean> = {};
    if (expand) {
      MASTER_AI_MODULES.forEach(m => { newExpanded[m.id] = true; });
      MASTER_SWE_PILLARS.forEach(p => { newExpanded[p.id] = true; });
    }
    setExpandedModuleIds(newExpanded);
  };

  // Pick random next topic
  const handlePickRandomNext = () => {
    sounds.playClick();
    const uncompleted = ALL_SYLLABUS_TOPICS.filter(t => !completedSet.has(t.id));
    if (uncompleted.length === 0) {
      alert("Incredible! You have mastered all topics in the master syllabus!");
      return;
    }
    const chosen = uncompleted[Math.floor(Math.random() * uncompleted.length)];
    onLoadTopicIntoDaily(chosen);
  };

  // Filter helper for topics
  const isTopicVisible = (topic: SyllabusTopic) => {
    const isCompleted = completedSet.has(topic.id);
    if (statusFilter === 'uncompleted' && isCompleted) return false;
    if (statusFilter === 'completed' && !isCompleted) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = topic.title.toLowerCase().includes(q);
      const matchMod = topic.moduleName.toLowerCase().includes(q);
      const matchSub = topic.subgroup?.toLowerCase().includes(q);
      const matchWhy = topic.whyItMatters?.toLowerCase().includes(q);
      if (!matchTitle && !matchMod && !matchSub && !matchWhy) return false;
    }

    return true;
  };

  // Calculate cumulative minimum weeks for each stage
  let cumulativeMinWeeks = 0;
  const stagesWithCumulative = MASTER_AI_MODULES.map((m) => {
    const startWeek = cumulativeMinWeeks;
    const addedWeeks = m.minWeeks || 0;
    cumulativeMinWeeks += addedWeeks;
    return {
      ...m,
      startWeek,
      endWeek: cumulativeMinWeeks,
    };
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 mb-12">
      
      {/* Hero Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-indigo-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-indigo-800/60">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center text-2xl font-black shadow-lg shadow-amber-400/20">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black font-display text-white">
                  The Master AI & SWE Syllabus
                </h2>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  {totalCount} Topics • 17 Stages
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5 font-medium">
                No pressure roadmap • Estimated minimum time: ~{TOTAL_AI_MIN_WEEKS} weeks • Pick daily one topic!
              </p>
            </div>
          </div>

          {/* Quick Action: Pick Daily One Topic */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePickRandomNext}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer active:scale-95"
              title="Pick an uncompleted topic and load it as today's mission"
            >
              <Shuffle className="w-4 h-4 text-slate-950" />
              <span>Pick Today's Topic 🎲</span>
            </button>
          </div>
        </div>

        {/* Progress Tri-Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-5">
          <div className="p-3.5 rounded-2xl bg-indigo-900/40 border border-indigo-700/50 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-200 mb-1.5">
              <span>Overall Master Progress</span>
              <span className="text-amber-300 font-black">{totalCompleted}/{totalCount} ({overallPercent}%)</span>
            </div>
            <div className="w-full bg-indigo-950 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-400 to-orange-400 h-full rounded-full transition-all duration-500" style={{ width: `${overallPercent}%` }}></div>
            </div>
            <span className="text-[10px] text-indigo-300 mt-2 font-medium">+{totalCompleted * 25} XP earned from syllabus</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-900/40 border border-purple-700/50 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-purple-200 mb-1.5">
              <span>🧠 17 AI Stages</span>
              <span className="text-purple-300 font-black">{aiCompleted}/{aiTotal} ({aiPercent}%)</span>
            </div>
            <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-full rounded-full transition-all duration-500" style={{ width: `${aiPercent}%` }}></div>
            </div>
            <span className="text-[10px] text-purple-300 mt-2 font-medium">Min Time: ~{TOTAL_AI_MIN_WEEKS}w (~10.5 months)</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-900/40 border border-blue-700/50 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-blue-200 mb-1.5">
              <span>⚡ SWE Core Track (9 Pillars)</span>
              <span className="text-blue-300 font-black">{sweCompleted}/{sweTotal} ({swePercent}%)</span>
            </div>
            <div className="w-full bg-blue-950 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-full rounded-full transition-all duration-500" style={{ width: `${swePercent}%` }}></div>
            </div>
            <span className="text-[10px] text-blue-300 mt-2 font-medium">DSA → Java → DBMS → OS → System Design</span>
          </div>
        </div>
      </div>

      {/* SWE Track Cardinal Stepper Banner */}
      <div className="bg-white/95 rounded-3xl p-5 border border-amber-200 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>The Cardinal Rule: You DO NOT replace DSA with AI. SWE discipline first + AI specialization.</span>
          </div>
          <span className="text-[10px] text-slate-500 font-bold hidden sm:inline">9 Step Foundation</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-[11px] font-bold">
          {MASTER_SWE_PILLARS.map((p, idx) => (
            <React.Fragment key={p.id}>
              <button
                onClick={() => {
                  sounds.playClick();
                  setActiveTab('swe');
                  setExpandedModuleIds(prev => ({ ...prev, [p.id]: true }));
                }}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>{p.icon}</span>
                <span>{p.shortName}</span>
              </button>
              {idx < MASTER_SWE_PILLARS.length - 1 && (
                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Controls: Search, Tabs, Filters */}
      <div className="bg-white/95 rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Track Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
          <button
            onClick={() => { sounds.playClick(); setActiveTab('ai'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ai' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🧠 17 AI Stages</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('timeline'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'timeline' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Min-Time Schedule</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('swe'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'swe' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>⚡ SWE Track (9)</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('all'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>All ({totalCount})</span>
          </button>
        </div>

        {/* Search bar & status filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1 max-w-lg">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics (e.g. Backpropagation, RAG, n8n, DBMS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => { sounds.playClick(); setStatusFilter(e.target.value as any); }}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="uncompleted">To Master</option>
            <option value="completed">Mastered ✅</option>
          </select>

          {activeTab !== 'timeline' && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleExpandAll(true)}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 text-xs font-bold transition-all cursor-pointer"
                title="Expand All Modules"
              >
                Expand
              </button>
              <button
                onClick={() => handleExpandAll(false)}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 text-xs font-bold transition-all cursor-pointer"
                title="Collapse All Modules"
              >
                Collapse
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ========================================================= */}
      {/* VIEW: 17 STAGES MIN-TIME TIMELINE TABLE */}
      {/* ========================================================= */}
      {activeTab === 'timeline' && (
        <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <span>⏱️ The 17 Stages Minimum-Time Schedule</span>
              </h3>
              <p className="text-xs text-slate-500">
                Minimum time baseline: ~<strong>{TOTAL_AI_MIN_WEEKS} weeks</strong> (~10.5 months) to comprehensive AI competence + product deployment.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
                Min Time: ~{TOTAL_AI_MIN_WEEKS} Weeks Total
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200/80">
                  <th className="py-3 px-3">Stage # & Name</th>
                  <th className="py-3 px-3">Topics</th>
                  <th className="py-3 px-3 text-right">Approx. Time</th>
                  <th className="py-3 px-3 text-right font-black text-amber-700">Min. Time</th>
                  <th className="py-3 px-3 text-right text-indigo-700">Cumulative Timeline</th>
                  <th className="py-3 px-3 text-center">Progress</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stagesWithCumulative.map((stage) => {
                  const stageDone = stage.topics.filter(t => completedSet.has(t.id)).length;
                  const pct = Math.round((stageDone / (stage.topics.length || 1)) * 100);

                  return (
                    <tr key={stage.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-800 flex items-center gap-2">
                        <span className="text-base">{stage.icon}</span>
                        <span>{stage.title}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-medium">
                        {stage.topics.length} topics
                      </td>
                      <td className="py-3 px-3 text-right font-semibold text-slate-600">
                        {stage.approxTime}
                      </td>
                      <td className="py-3 px-3 text-right font-black text-amber-800">
                        {stage.minWeeks ? `${stage.minWeeks} weeks (min)` : 'Ongoing'}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-indigo-700">
                        {stage.minWeeks ? `Week ${stage.startWeek} → Week ${stage.endWeek}` : 'Continuous Flagship'}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-purple-600 h-full rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                          </div>
                          <span className="text-[10px] font-extrabold text-slate-600">{stageDone}/{stage.topics.length}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            sounds.playClick();
                            setActiveTab('ai');
                            setExpandedModuleIds(prev => ({ ...prev, [stage.id]: true }));
                          }}
                          className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-[11px] cursor-pointer"
                        >
                          View Topics →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 1: AI ROADMAP 17 STAGES */}
      {/* ========================================================= */}
      {(activeTab === 'ai' || activeTab === 'all') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold text-slate-800 font-display flex items-center gap-2">
              <span>🧠 The 17 Stages of AI Mastery</span>
              <span className="text-xs font-normal text-slate-500">From Foundations to Product Building</span>
            </h3>
          </div>

          {MASTER_AI_MODULES.map((module) => {
            const visibleTopics = module.topics.filter(isTopicVisible);
            if (visibleTopics.length === 0 && (searchQuery.trim() || statusFilter !== 'all')) {
              return null;
            }

            const modCompleted = module.topics.filter(t => completedSet.has(t.id)).length;
            const isExpanded = expandedModuleIds[module.id] !== false;

            return (
              <div
                key={module.id}
                className="bg-white/95 rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
              >
                {/* Module Header */}
                <div
                  onClick={() => toggleExpand(module.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/70 transition-colors select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center text-xl shrink-0">
                      {module.icon}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                          {module.title}
                        </h4>
                        
                        {/* Time Badges */}
                        {module.approxTime && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                            ⏱️ {module.approxTime} {module.minWeeks ? `(Min: ${module.minWeeks}w)` : ''}
                          </span>
                        )}

                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                          {modCompleted}/{module.topics.length} Mastered
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {module.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-20 sm:w-28 bg-slate-100 h-2 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="bg-purple-600 h-full rounded-full transition-all"
                        style={{ width: `${(modCompleted / (module.topics.length || 1)) * 100}%` }}
                      ></div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Module Topics List */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 bg-slate-50/40 space-y-3">
                    {/* Stage Note Banner if any (e.g. Multimodal podcast tools note) */}
                    {module.stageNote && (
                      <div className="mt-3 p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <p className="font-medium leading-relaxed">
                          <strong>Note:</strong> {module.stageNote}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {visibleTopics.map((topic) => {
                        const isDone = completedSet.has(topic.id);
                        return (
                          <div
                            key={topic.id}
                            className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2.5 ${
                              isDone 
                                ? 'bg-purple-50/60 border-purple-200 text-slate-900' 
                                : 'bg-white border-slate-200/90 hover:border-purple-300'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <button
                                onClick={() => {
                                  sounds.playTaskComplete();
                                  if (!isDone) {
                                    confetti({ particleCount: 40, spread: 60 });
                                  }
                                  onToggleTopic(topic.id, topic.title, !isDone);
                                }}
                                className="mt-0.5 shrink-0 cursor-pointer text-slate-300 hover:text-purple-600 transition-colors"
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5 text-purple-600 fill-purple-100" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-300" />
                                )}
                              </button>

                              <div className="flex-1">
                                <span className={`text-xs font-bold block mb-1 ${isDone ? 'line-through opacity-70 text-slate-700' : 'text-slate-900'}`}>
                                  {topic.title}
                                </span>

                                {topic.whyItMatters && (
                                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                    {topic.whyItMatters}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Action Button: Load as Today's Focus */}
                            <div className="flex items-center justify-between pt-2 border-t border-slate-100/80">
                              <span className="text-[10px] text-purple-700 font-bold">
                                {isDone ? 'Mastered (+25 XP)' : '+25 XP upon mastery'}
                              </span>

                              <button
                                onClick={() => onLoadTopicIntoDaily(topic)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-extrabold bg-purple-100 hover:bg-purple-200 text-purple-900 transition-all cursor-pointer active:scale-95"
                                title="Set this as today's AI Hero concept in your daily system"
                              >
                                <Target className="w-3 h-3 text-purple-700" />
                                <span>Set as Daily Focus 🎯</span>
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
      )}

      {/* ========================================================= */}
      {/* SECTION 2: SWE FOUNDATION TRACK (9 PILLARS) */}
      {/* ========================================================= */}
      {(activeTab === 'swe' || activeTab === 'all') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold text-slate-800 font-display flex items-center gap-2">
              <span>⚡ The SWE Core Track</span>
              <span className="text-xs font-normal text-slate-500">9 Pillars (DSA through AI Systems)</span>
            </h3>
          </div>

          {MASTER_SWE_PILLARS.map((pillar) => {
            const visibleTopics = pillar.topics.filter(isTopicVisible);
            if (visibleTopics.length === 0 && (searchQuery.trim() || statusFilter !== 'all')) {
              return null;
            }

            const pillarCompleted = pillar.topics.filter(t => completedSet.has(t.id)).length;
            const isExpanded = expandedModuleIds[pillar.id] !== false;

            return (
              <div
                key={pillar.id}
                className="bg-white/95 rounded-3xl border border-blue-200/90 shadow-xs overflow-hidden transition-all"
              >
                {/* Pillar Header */}
                <div
                  onClick={() => toggleExpand(pillar.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-blue-50/50 transition-colors select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center text-xl shrink-0">
                      {pillar.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                          {pillar.stepNumber}. {pillar.name}
                        </h4>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                          {pillarCompleted}/{pillar.topics.length} Mastered
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {pillar.cardinalRule}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-20 sm:w-28 bg-slate-100 h-2 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all"
                        style={{ width: `${(pillarCompleted / (pillar.topics.length || 1)) * 100}%` }}
                      ></div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Pillar Topics List */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-2.5 bg-slate-50/40">
                    {visibleTopics.map((topic) => {
                      const isDone = completedSet.has(topic.id);
                      return (
                        <div
                          key={topic.id}
                          className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2.5 ${
                            isDone 
                              ? 'bg-blue-50/60 border-blue-200 text-slate-900' 
                              : 'bg-white border-slate-200/90 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <button
                              onClick={() => {
                                sounds.playTaskComplete();
                                if (!isDone) {
                                  confetti({ particleCount: 40, spread: 60 });
                                }
                                onToggleTopic(topic.id, topic.title, !isDone);
                              }}
                              className="mt-0.5 shrink-0 cursor-pointer text-slate-300 hover:text-blue-600 transition-colors"
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-100" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-300" />
                              )}
                            </button>

                            <div className="flex-1">
                              <span className={`text-xs font-bold block mb-1 ${isDone ? 'line-through opacity-70 text-slate-700' : 'text-slate-900'}`}>
                                {topic.title}
                              </span>

                              {topic.whyItMatters && (
                                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                  {topic.whyItMatters}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Action Button: Load into Daily DSA Stack */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100/80">
                            <span className="text-[10px] text-blue-700 font-bold">
                              {isDone ? 'Mastered (+25 XP)' : '+25 XP upon mastery'}
                            </span>

                            <button
                              onClick={() => onLoadTopicIntoDaily(topic)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-extrabold bg-blue-100 hover:bg-blue-200 text-blue-900 transition-all cursor-pointer active:scale-95"
                              title="Set this as today's Core Engineering DSA / SWE topic"
                            >
                              <Zap className="w-3 h-3 text-blue-700" />
                              <span>Set as Daily Topic ⚡</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
