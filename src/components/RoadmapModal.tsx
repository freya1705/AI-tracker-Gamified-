import React, { useState } from 'react';
import { ROADMAP_STEPS } from '../data/initialData';
import { sounds } from '../utils/audio';
import { 
  X, Compass, BookOpen, Layers, CheckCircle2, 
  AlertTriangle, ShieldCheck, ArrowRight, Zap, Target 
} from 'lucide-react';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'steps' | 'verdicts' | 'loop' | 'timeline'>('steps');
  const [selectedStep, setSelectedStep] = useState<number>(1);

  if (!isOpen) return null;

  const currentStepData = ROADMAP_STEPS.find(s => s.stepNum === selectedStep) || ROADMAP_STEPS[0];

  const verdicts = [
    { name: 'Andrew Ng ML Specialization (Courses 1–2)', status: 'NOW', type: 'positive', use: 'ML understanding & baseline models' },
    { name: 'Kaggle Learn (Pandas + Intro/Intermediate ML)', status: 'NOW', type: 'positive', use: 'Pandas EDA + real tabular practice' },
    { name: 'StatQuest', status: 'STUCK', type: 'warning', use: 'One confusing concept at a time (e.g. Gradient Descent, ROC)' },
    { name: '3Blue1Brown', status: 'STUCK', type: 'warning', use: 'Only for math intuition when stuck' },
    { name: 'PyTorch Tutorials', status: 'LATER', type: 'neutral', use: 'Deep learning & training loops' },
    { name: 'DeepLearning.AI Short Courses', status: 'LATER', type: 'neutral', use: 'LLMs, RAG, agents (only ones you are building)' },
    { name: 'FastAPI + Docker Docs', status: 'LATER', type: 'neutral', use: 'Deploying PatientTriage v2 to live URL' },
    { name: 'Karpathy micrograd', status: 'LATER', type: 'neutral', use: 'Understand backpropagation mechanics' },
    { name: 'LangChain / LlamaIndex Docs', status: 'STUCK', type: 'warning', use: 'Only after building RAG by hand once' },
    { name: 'fast.ai', status: 'SKIP', type: 'danger', use: 'Overlaps PyTorch tutorials. Do not double down.' },
    { name: 'arXiv / Papers With Code', status: 'SKIP', type: 'danger', use: 'Not needed yet at this phase.' },
    { name: 'Outskill / No-code list (Midjourney, Zapier, Lovable...)', status: 'SKIP', type: 'danger', use: 'Wrong lane for a Software Engineer.' },
    { name: 'Founder / Instagram / Business phases', status: 'SKIP', type: 'danger', use: 'Not for the next 6 months. Focus on deep engineering!' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white p-5 sm:p-7 shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 font-display">
                Freya's AI Master Roadmap
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                One rule: ONE MAIN RESOURCE → LEARN → PRACTICE → BUILD → MOVE ON
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
            { id: 'steps', label: '7-Step Roadmap 🗺️' },
            { id: 'verdicts', label: 'Resource Verdicts (Now vs Skip) ⚖️' },
            { id: 'loop', label: 'The Learning Loop & Rules 🔁' },
            { id: 'timeline', label: '6-Month Flagship Timeline 📅' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto py-4">
          
          {/* TAB 1: 7 STEPS */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              {/* Step indicator buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
                {ROADMAP_STEPS.map((s) => (
                  <button
                    key={s.stepNum}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedStep(s.stepNum);
                    }}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedStep === s.stepNum
                        ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-[10px] font-extrabold text-indigo-600">STEP {s.stepNum}</div>
                    <div className="text-xs font-bold text-slate-800 truncate">{s.title.split(' ')[0]}</div>
                    <div className="text-[10px] text-slate-400">{s.duration.split(' ')[1]}</div>
                  </button>
                ))}
              </div>

              {/* Step Detail Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-indigo-50/40 via-white to-white border border-indigo-100 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black text-sm flex items-center justify-center">
                      {currentStepData.stepNum}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-800 font-display">
                        {currentStepData.title}
                      </h4>
                      <span className="text-xs text-indigo-600 font-semibold">
                        Estimated: {currentStepData.duration}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 font-bold">
                    Target: {currentStepData.simpleWords}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 mb-4 text-xs text-slate-700">
                  <strong className="text-slate-900 font-bold">Why this matters: </strong>
                  {currentStepData.why}
                </div>

                {/* Learn From / Don't study yet table */}
                <div className="mb-4">
                  <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Curated Resources & Boundaries
                  </h5>
                  <div className="space-y-2">
                    {currentStepData.learnFrom.map((r, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Resource</span>
                          <p className="font-bold text-slate-800">{r.source}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-emerald-600 uppercase">Study</span>
                          <p className="text-emerald-800 font-medium">{r.study}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-rose-500 uppercase">Don't study yet</span>
                          <p className="text-rose-700 font-medium">{r.dontStudyYet}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checklist */}
                <div className="mb-4">
                  <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Must-Know Checklist
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentStepData.checklist.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-white border border-slate-200/80 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Build & Move on when */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                    <strong className="block font-bold text-amber-950 mb-1">🛠️ What to Build:</strong>
                    {currentStepData.build}
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                    <strong className="block font-bold text-emerald-950 mb-1">🏁 Move On When:</strong>
                    {currentStepData.moveOnWhen}
                  </div>
                </div>

                {currentStepData.patientTriageConnection && (
                  <div className="mt-3 p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-start gap-2">
                    <Target className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-purple-950">PatientTriage Connection: </strong>
                      {currentStepData.patientTriageConnection}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* TAB 2: VERDICTS */}
          {activeTab === 'verdicts' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 font-medium">
                💡 <strong>The Rule:</strong> Never chase shiny courses. You only need ONE main resource per subject. Skip whatever is in the red column to protect your build time!
              </div>

              <div className="space-y-2">
                {verdicts.map((v, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
                      v.type === 'positive'
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : v.type === 'warning'
                        ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                        : v.type === 'danger'
                        ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                        v.type === 'positive' ? 'bg-emerald-600 text-white' :
                        v.type === 'warning' ? 'bg-amber-500 text-white' :
                        v.type === 'danger' ? 'bg-rose-600 text-white' : 'bg-slate-500 text-white'
                      }`}>
                        {v.status}
                      </span>
                      <span className="font-bold">{v.name}</span>
                    </div>

                    <div className="text-right text-[11px] font-medium opacity-90 max-w-xs">
                      {v.use}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: THE LOOP */}
          {activeTab === 'loop' && (
            <div className="space-y-4">
              {/* Loop visual */}
              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-center">
                <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-3">
                  The Fast Learning Loop
                </h4>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-800">
                  <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-xs">1. Learn (small dose)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-xs">2. Say it in one line</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-xs">3. Code it from scratch</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-xs">4. Tiny Build in Project</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl shadow-xs">5. Move On! 🚀</span>
                </div>
              </div>

              {/* Rules to Move Fast */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-2">
                  <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Golden Speed Rules
                  </h5>
                  <p>• <strong>No new course</strong> until the current milestone ships.</p>
                  <p>• <strong>Max two active tracks:</strong> One AI build + DSA.</p>
                  <p>• <strong>Choosing a library:</strong> 30 minutes max, pick the default.</p>
                  <p>• <strong>Stuck 45+ min:</strong> Write the problem in 3 lines, make a minimal repro, test one hypothesis at a time.</p>
                  <p>• <strong>Blocked by a concept:</strong> Learn only that, return the same day.</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-2">
                  <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    When Real Life Happens
                  </h5>
                  <p>• <strong>Finished early?</strong> Add one experiment, not a new course.</p>
                  <p>• <strong>Struggling?</strong> Shrink the task (smaller data, fewer models).</p>
                  <p>• <strong>Missed 3 days?</strong> One Minimum day (20 min), resume from last commit.</p>
                  <p>• <strong>College is busy?</strong> Minimum days only. Never zero days.</p>
                  <p>• <strong>Sunday review:</strong> Explain what you learned out loud with no notes!</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-3">
              {[
                { month: 'Month 1', focus: 'Data + ML Basics', output: "A README'd notebook, 3 models on a real dataset, logistic regression from scratch." },
                { month: 'Month 2', focus: 'ML on PatientTriage', output: 'Real ED triage dataset, gradient boosted risk model, baseline comparison table & calibration.' },
                { month: 'Month 3', focus: 'Serve the Model + Small DL', output: 'FastAPI /predict endpoint with tests + PyTorch mini classifier loop.' },
                { month: 'Month 4', focus: 'LLMs + RAG Basics', output: 'IITM notes Q&A, structured JSON output with retries, first evaluation set.' },
                { month: 'Month 5', focus: 'RAG with Evaluation', output: 'Chunking experiments, citations, recall@k results table, prompt injection defense.' },
                { month: 'Month 6', focus: 'Flagship PatientTriage v2 Live', output: 'Full-stack deployed application with live URL, video demo, Postgres logs, and architecture README.' },
              ].map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <span className="text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg shrink-0">
                    {m.month}
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">{m.focus}</h5>
                    <p className="text-xs text-slate-600 mt-0.5">{m.output}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
