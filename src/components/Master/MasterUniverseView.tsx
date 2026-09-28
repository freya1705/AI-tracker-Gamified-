import React, { useState, useMemo } from 'react';
import { UserStats, MasterDailyState, Task, SyllabusTopic, CalendarDayInfo, AiJournalEntry } from '../../types';
import { ALL_SYLLABUS_TOPICS, MASTER_AI_MODULES, MASTER_SWE_PILLARS } from '../../data/syllabusData';
import { FREE_RESOURCE_LIST, FreeResourceItem } from '../../data/resourceData';
import { TOTAL_VERBATIM_ITEMS, VERBATIM_CHECKLIST_SECTIONS } from '../../data/verbatimChecklistData';
import { CAREER_TIERS } from '../../data/initialData';
import { sounds } from '../../utils/audio';
import { MasterSyllabusView } from '../MasterSyllabusView';
import { CalendarView } from '../CalendarView';
import { AiHeroWorldsView } from '../AiHeroWorldsView';
import { TaskCard } from '../TaskCard';
import { 
  Brain, Cpu, Trophy, BookOpen, ListTodo, Crown, Calendar, CheckSquare, 
  Search, Filter, ExternalLink, ArrowRight, Sparkles, CheckCircle2, Circle, Plus, Layers, Target, ChevronDown, ChevronUp
} from 'lucide-react';

interface MasterUniverseViewProps {
  stats: UserStats;
  daily: MasterDailyState;
  tasks: Task[];
  completedTopicIds: string[];
  verbatimCheckedIds: string[];
  journalEntries: AiJournalEntry[];
  onToggleTopic: (topicId: string, topicTitle: string, isChecked: boolean) => void;
  onLoadTopicIntoDaily: (topic: SyllabusTopic) => void;
  onToggleTaskComplete: (id: string, e: React.MouseEvent) => void;
  onDeleteTask: (id: string) => void;
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
}

export type MasterSubTab = 
  | 'ai' 
  | 'swe' 
  | 'roadmap' 
  | 'resources' 
  | 'quests' 
  | 'hero_worlds' 
  | 'calendar' 
  | 'checklist';

export const MasterUniverseView: React.FC<MasterUniverseViewProps> = ({
  stats,
  daily,
  tasks,
  completedTopicIds,
  verbatimCheckedIds,
  journalEntries,
  onToggleTopic,
  onLoadTopicIntoDaily,
  onToggleTaskComplete,
  onDeleteTask,
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
}) => {
  const [activeSubTab, setActiveSubTab] = useState<MasterSubTab>(initialSubTab as MasterSubTab);

  // Search & Filter state for Quests & Resources
  const [questCategory, setQuestCategory] = useState<string>('all');
  const [questPriority, setQuestPriority] = useState<string>('all');
  const [questSearch, setQuestSearch] = useState<string>('');
  
  const [resourceSearch, setResourceSearch] = useState<string>('');
  const [resourceCategory, setResourceCategory] = useState<string>('all');

  const [checklistSearch, setChecklistSearch] = useState<string>('');
  const [expandedChecklistSections, setExpandedChecklistSections] = useState<Record<string, boolean>>({
    '0': true,
    '1': true,
    '2': true,
  });

  // Derived progress statistics
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

  // Filtered tasks for Quests tab
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (questCategory === 'active' && task.completed) return false;
      if (questCategory === 'completed' && !task.completed) return false;
      if (questCategory !== 'all' && questCategory !== 'active' && questCategory !== 'completed') {
        if (task.category !== questCategory) return false;
      }
      if (questPriority !== 'all' && task.priority !== questPriority) return false;
      if (questSearch.trim()) {
        const q = questSearch.toLowerCase();
        const mTitle = task.title.toLowerCase().includes(q);
        const mTopic = task.topic?.toLowerCase().includes(q);
        if (!mTitle && !mTopic) return false;
      }
      return true;
    });
  }, [tasks, questCategory, questPriority, questSearch]);

  // Filtered resources for Resources tab
  const filteredResources = useMemo(() => {
    return FREE_RESOURCE_LIST.filter(res => {
      if (resourceCategory === 'starter' && !res.isStarterSet) return false;
      if (resourceCategory === 'programming' && res.sectionNum !== '0') return false;
      if (resourceCategory === 'math' && res.sectionNum !== '1') return false;
      if (resourceCategory === 'ai_foundations' && res.sectionNum !== '2') return false;
      if (resourceCategory === 'data_ml' && !['3–4', '5', '6–9', '11–12', '13'].includes(res.sectionNum)) return false;
      if (resourceCategory === 'llm_rag' && !['14–15', '16–17', '18', '19'].includes(res.sectionNum)) return false;
      if (resourceCategory === 'deploy_adv' && !['20', '21', '22', '23', '27', '28', 'SWE'].includes(res.sectionNum)) return false;

      if (resourceSearch.trim()) {
        const q = resourceSearch.toLowerCase();
        return (
          res.name.toLowerCase().includes(q) ||
          res.sectionTitle.toLowerCase().includes(q) ||
          res.tag.toLowerCase().includes(q) ||
          (res.whyUseIt && res.whyUseIt.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [resourceCategory, resourceSearch]);

  const subTabs: { id: MasterSubTab; label: string; icon: any; count?: string | number; badgeColor: string }[] = [
    { id: 'ai', label: '17 AI Stages', icon: Brain, count: `${aiCompleted}/${aiTotal}`, badgeColor: 'bg-purple-100 text-purple-800' },
    { id: 'swe', label: '9 SWE Pillars', icon: Cpu, count: `${sweCompleted}/${sweTotal}`, badgeColor: 'bg-blue-100 text-blue-800' },
    { id: 'roadmap', label: 'Career Roadmap', icon: Trophy, count: '2026–32+', badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'resources', label: 'Resource Vault', icon: BookOpen, count: FREE_RESOURCE_LIST.length, badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'quests', label: 'Quest Center', icon: ListTodo, count: tasks.length, badgeColor: 'bg-indigo-100 text-indigo-800' },
    { id: 'hero_worlds', label: '12 Boss Battles', icon: Crown, count: 'Dual Power', badgeColor: 'bg-rose-100 text-rose-800' },
    { id: 'calendar', label: 'Adventure Map', icon: Calendar, count: '180 Days', badgeColor: 'bg-sky-100 text-sky-800' },
    { id: 'checklist', label: 'Checklist (0–29)', icon: CheckSquare, count: `${verbatimCheckedIds.length}/${TOTAL_VERBATIM_ITEMS}`, badgeColor: 'bg-emerald-100 text-emerald-800' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 mb-16 animate-fade-in">
      
      {/* ========================================================= */}
      {/* 🧠 MASTER HEADER: "Where am I going?" */}
      {/* ========================================================= */}
      <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white shadow-xl border border-indigo-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-indigo-800/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center text-2xl font-black shadow-md shadow-amber-400/20 shrink-0">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black font-display text-white">
                  Master Knowledge Map
                </h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30">
                  Where am I going?
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5 font-medium">
                The complete engineering universe: 17 AI Stages • 9 SWE Pillars • 307 Topics • 38+ Free Resources
              </p>
            </div>
          </div>

          {/* Quick Hub Launchers */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                onOpenResources();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition cursor-pointer active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Free Resources 📚</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onOpenFounderRoadmap();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/30 hover:bg-purple-500/40 text-purple-200 font-bold text-xs border border-purple-400/30 transition cursor-pointer active:scale-95"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>Founder Scorecard 🏆</span>
            </button>
          </div>
        </div>

        {/* Overall Progress Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Overall Progress</span>
            <div className="flex items-baseline justify-between">
              <span className="text-base sm:text-lg font-black text-white">{totalCompleted} / {totalCount}</span>
              <span className="text-xs font-bold text-amber-300">{overallPercent}%</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${overallPercent}%` }} />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-purple-300 font-bold">17 AI Stages</span>
            <div className="flex items-baseline justify-between">
              <span className="text-base sm:text-lg font-black text-white">{aiCompleted} / {aiTotal}</span>
              <span className="text-xs font-bold text-purple-300">{aiPercent}%</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-400 h-full rounded-full transition-all duration-500" style={{ width: `${aiPercent}%` }} />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-blue-300 font-bold">9 SWE Pillars</span>
            <div className="flex items-baseline justify-between">
              <span className="text-base sm:text-lg font-black text-white">{sweCompleted} / {sweTotal}</span>
              <span className="text-xs font-bold text-blue-300">{swePercent}%</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-400 h-full rounded-full transition-all duration-500" style={{ width: `${swePercent}%` }} />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold">Checklist (0–29)</span>
            <div className="flex items-baseline justify-between">
              <span className="text-base sm:text-lg font-black text-white">{verbatimCheckedIds.length} / {TOTAL_VERBATIM_ITEMS}</span>
              <span className="text-xs font-bold text-emerald-300">
                {Math.round((verbatimCheckedIds.length / (TOTAL_VERBATIM_ITEMS || 1)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.round((verbatimCheckedIds.length / (TOTAL_VERBATIM_ITEMS || 1)) * 100)}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🧭 MASTER SUB-NAVIGATION TABS */}
      {/* ========================================================= */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {subTabs.map(tab => {
          const Icon = tab.icon;
          const isSelected = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveSubTab(tab.id);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-slate-800 text-slate-300' : tab.badgeColor
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 1. 🤖 AI MASTERY (17 STAGES EXPANDABLE CURRICULUM) */}
      {/* ========================================================= */}
      {activeSubTab === 'ai' && (
        <div className="space-y-4">
          <MasterSyllabusView
            completedTopicIds={completedTopicIds}
            onToggleTopic={onToggleTopic}
            onLoadTopicIntoDaily={onLoadTopicIntoDaily}
            characterName={stats.characterName}
            onOpenResources={onOpenResources}
            initialTab="ai"
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. ⚡ SWE CORE (9 PILLARS PIPELINE) */}
      {/* ========================================================= */}
      {activeSubTab === 'swe' && (
        <div className="space-y-4">
          <MasterSyllabusView
            completedTopicIds={completedTopicIds}
            onToggleTopic={onToggleTopic}
            onLoadTopicIntoDaily={onLoadTopicIntoDaily}
            characterName={stats.characterName}
            onOpenResources={onOpenResources}
            initialTab="swe"
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. 🗺 CAREER ROADMAP (STUDENT -> SWE -> AI ENG -> FOUNDER) */}
      {/* ========================================================= */}
      {activeSubTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                2026 → 2032+ Career Architecture
              </span>
              <h3 className="text-xl font-black text-slate-900 font-display mt-1">
                Student → SWE Builder → AI Engineer → AI Founder
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Engineering excellence compound curve. Every topic learned, DSA solved, and model shipped compounds toward high-value founder leverage.
              </p>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenFounderRoadmap();
              }}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md shadow-purple-200 transition cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-95"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Full Scorecard & Journal Modal →</span>
            </button>
          </div>

          {/* Career Tiers Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CAREER_TIERS.map((tier, idx) => (
              <div 
                key={tier.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-black text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
                      {tier.badge} • {tier.year}
                    </span>
                    <span className="text-xs font-extrabold text-amber-600">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900 font-display">
                    {tier.title}
                  </h4>
                  <p className="text-xs text-purple-800 font-semibold mt-0.5">
                    {tier.tagline}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="italic font-display text-indigo-900">{tier.quote}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. 📚 RESOURCE VAULT (38+ FREE RESOURCES) */}
      {/* ========================================================= */}
      {activeSubTab === 'resources' && (
        <div className="space-y-4">
          
          {/* Search & Category Filter */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search 38+ free resources by topic, author, or keyword (e.g. 3Blue1Brown, StatQuest, PyTorch)..."
                value={resourceSearch}
                onChange={(e) => setResourceSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All Resources' },
                { id: 'starter', label: '⭐ Starter Set' },
                { id: 'programming', label: 'Python & Git' },
                { id: 'math', label: 'Math & Stats' },
                { id: 'ai_foundations', label: 'AI Foundations' },
                { id: 'data_ml', label: 'ML & Deep Learning' },
                { id: 'llm_rag', label: 'LLMs & RAG' },
                { id: 'deploy_adv', label: 'Deployment & SWE' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sounds.playClick();
                    setResourceCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    resourceCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredResources.map(res => (
              <div
                key={res.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                      Section {res.sectionNum}: {res.sectionTitle}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 px-2 py-0.5 rounded bg-slate-100">
                      {res.type}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-slate-900 font-display">
                    {res.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {res.whyUseIt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    🏷️ {res.tag}
                  </span>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Open Study Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. 🏆 QUEST CENTER (ACTIVE • UPCOMING • COMPLETED) */}
      {/* ========================================================= */}
      {activeSubTab === 'quests' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-black text-slate-900 font-display">
                Quest Center & Missions
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {tasks.filter(t => !t.completed).length} active quests remaining • {tasks.filter(t => t.completed).length} completed
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search quests..."
                  value={questSearch}
                  onChange={(e) => setQuestSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-40 sm:w-48"
                />
              </div>

              <select
                value={questPriority}
                onChange={(e) => setQuestPriority(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
              >
                <option value="all">All Priorities</option>
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenAddTask();
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Quest</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Quests', count: tasks.length },
              { id: 'active', label: 'Active ⏳', count: tasks.filter(t => !t.completed).length },
              { id: 'completed', label: 'Completed ✨', count: tasks.filter(t => t.completed).length },
              { id: 'routine', label: 'Morning Foundation', count: tasks.filter(t => t.category === 'routine').length },
              { id: 'dsa', label: 'DSA / LeetCode', count: tasks.filter(t => t.category === 'dsa').length },
              { id: 'aiml', label: 'AI/ML Missions', count: tasks.filter(t => t.category === 'aiml').length },
              { id: 'project', label: 'PatientTriage', count: tasks.filter(t => t.category === 'project').length },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setQuestCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  questCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  questCategory === cat.id ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="p-8 text-center rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="text-3xl mb-2">🎉</div>
                <h4 className="text-sm font-bold text-slate-800 font-display">No quests in this view</h4>
                <p className="text-xs text-slate-500 mt-1">Try another filter or add a new quest!</p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={onToggleTaskComplete}
                  onDeleteTask={onDeleteTask}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. 👑 12 BOSS BATTLES & DUAL PROGRESS */}
      {/* ========================================================= */}
      {activeSubTab === 'hero_worlds' && (
        <div className="space-y-4">
          <AiHeroWorldsView
            stats={stats}
            onUpdateStats={onUpdateStats}
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. 📅 ADVENTURE MAP (180-DAY CALENDAR) */}
      {/* ========================================================= */}
      {activeSubTab === 'calendar' && (
        <div className="space-y-4">
          <CalendarView
            currentDayNumber={daily.dayNumber}
            onSelectDayForSystem={onSelectDayForSystem}
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. 📋 VERBATIM SYLLABUS CHECKLIST (SECTIONS 0 TO 29) */}
      {/* ========================================================= */}
      {activeSubTab === 'checklist' && (
        <div className="space-y-4">
          
          <div className="bg-white rounded-3xl p-5 border border-emerald-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                  Exact Syllabus Checklist
                </span>
                <span className="text-xs font-black text-emerald-700">
                  {verbatimCheckedIds.length} / {TOTAL_VERBATIM_ITEMS} Mastered
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 font-display mt-1">
                Sections 0 through 29 (Programming to Production)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every single line from your original syllabus checklist preserved verbatim. Check off topics as you compound mastery!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search checklist topics..."
                value={checklistSearch}
                onChange={(e) => setChecklistSearch(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-44"
              />
              <button
                onClick={() => {
                  sounds.playClick();
                  onResetVerbatimChecklist();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 font-bold text-xs border border-slate-200 transition cursor-pointer"
                title="Reset all checklist checks"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Checklist Sections Accordion */}
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
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <div
                    onClick={() => {
                      sounds.playClick();
                      setExpandedChecklistSections(prev => ({
                        ...prev,
                        [section.sectionNum]: !isExpanded
                      }));
                    }}
                    className="p-4 bg-slate-50/70 hover:bg-slate-100/60 border-b border-slate-200/60 flex items-center justify-between cursor-pointer select-none transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">
                        {section.sectionNum}
                      </span>
                      <h4 className="text-xs sm:text-sm font-black text-slate-800 font-display">
                        {section.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                        {completedInSection} / {section.items.length}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
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
                                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 font-bold shadow-2xs'
                                : 'bg-slate-50/50 border-slate-200 hover:border-emerald-300 text-slate-700'
                            }`}
                          >
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-300 shrink-0" />
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

    </div>
  );
};
