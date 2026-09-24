import React, { useState } from 'react';
import { REAL_WORLD_PROBLEMS } from '../data/initialData';
import { sounds } from '../utils/audio';
import { X, Lightbulb, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';

interface ProblemOfTheWeekModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProblemOfTheWeekModal: React.FC<ProblemOfTheWeekModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedExample, setSelectedExample] = useState(REAL_WORLD_PROBLEMS[0]);
  const [whoHasIt, setWhoHasIt] = useState('Hospital Emergency Department triage nurses');
  const [whatHappens, setWhatHappens] = useState('Nurses estimate acuity manually under high stress, causing occasional undertriage');
  const [isAiNeeded, setIsAiNeeded] = useState('Yes, for non-obvious vital combinations, but with hard safety rule overrides');
  const [approach, setApproach] = useState('Gradient Boosted Trees (XGBoost/LightGBM) calibrated for high recall');
  const [metric, setMetric] = useState('Recall on high-acuity patients (>95%) while keeping false alarm rate manageable');
  const [verdict, setVerdict] = useState('Hybrid: Hard safety rules first, ML risk score second');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white p-5 sm:p-7 shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 font-display">
                Real-World Problem of the Week
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Part 9 Framework: Think critically before jumping to complex AI models
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5">
          
          {/* Domain Precedents Carousel / Selector */}
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Domain Case Studies & Benchmarks:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {REAL_WORLD_PROBLEMS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedExample(p);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedExample.domain === p.domain
                      ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[10px] font-bold text-indigo-600 block">{p.domain}</span>
                  <span className="text-xs font-bold text-slate-800 line-clamp-1">{p.example}</span>
                  <span className="text-[10px] text-amber-700 font-semibold block mt-1">Verdict: {p.likelyVerdict.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Selected case breakdown */}
            <div className="mt-3 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-amber-950">Domain Example: {selectedExample.domain} — {selectedExample.example}</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-extrabold text-[10px]">
                  {selectedExample.likelyVerdict}
                </span>
              </div>
              <p className="text-amber-900">{selectedExample.whyVerdict}</p>
            </div>
          </div>

          {/* When AI is NOT right alert */}
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 flex items-start gap-2.5">
            <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">AI is NOT right when: </strong>
              Rules already cover ~95%, no reliable data exists, errors cannot be caught safely, or the answer must be 100% deterministic every time.
            </div>
          </div>

          {/* Worksheet Form */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Your Weekly Problem Evaluation Sheet
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">1. Who has the problem?</label>
                <input
                  type="text"
                  value={whoHasIt}
                  onChange={(e) => setWhoHasIt(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">2. What happens today?</label>
                <input
                  type="text"
                  value={whatHappens}
                  onChange={(e) => setWhatHappens(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">3. Is AI actually needed? (Rules first?)</label>
                <input
                  type="text"
                  value={isAiNeeded}
                  onChange={(e) => setIsAiNeeded(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">4. Approach (Models, trees, embeddings?)</label>
                <input
                  type="text"
                  value={approach}
                  onChange={(e) => setApproach(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">5. Success Metric (Why this metric?)</label>
                <input
                  type="text"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">6. Final Verdict (AI vs Rules vs Hybrid)</label>
                <input
                  type="text"
                  value={verdict}
                  onChange={(e) => setVerdict(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-semibold text-indigo-700"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
