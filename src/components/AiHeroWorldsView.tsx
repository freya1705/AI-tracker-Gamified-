import React from 'react';
import { AI_HERO_WORLDS, AI_HERO_LEVELS } from '../data/heroData';
import { DualProgressData, UserStats } from '../types';
import { sounds } from '../utils/audio';
import { 
  Trophy, Sparkles, Brain, Hammer, CheckCircle2, 
  Crown, ArrowRight, ShieldCheck, Zap, Lock 
} from 'lucide-react';

interface AiHeroWorldsViewProps {
  stats: UserStats;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
}

export const AiHeroWorldsView: React.FC<AiHeroWorldsViewProps> = ({
  stats,
  onUpdateStats,
}) => {
  const currentHeroLevel = AI_HERO_LEVELS[Math.min(stats.level, AI_HERO_LEVELS.length - 1)];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 mb-12">
      
      {/* Top Banner: AI Hero Status & Definition */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-purple-500/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-3xl font-black shadow-lg shadow-amber-400/20">
              {currentHeroLevel.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  Level {stats.level}
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-white">
                  {currentHeroLevel.title}
                </h3>
              </div>
              <p className="text-xs text-purple-200 mt-1 font-medium max-w-xl leading-relaxed">
                <strong>Proof of Skill: </strong> {currentHeroLevel.proof}
              </p>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-purple-800/80 sm:pl-5">
            <span className="text-[10px] uppercase font-bold text-purple-300 block">Total AI XP</span>
            <span className="text-2xl font-black text-amber-300 font-display">{stats.totalXPEarned} XP</span>
            <span className="text-[11px] text-purple-200 block mt-0.5">Destination: Level 13 AI HERO 👑</span>
          </div>
        </div>

        {/* AI Hero Definition Box */}
        <div className="mt-5 p-3.5 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-xs text-purple-100 flex items-start gap-2.5">
          <Crown className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300">The Definition of AI Hero: </strong>
            You understand AI systems, build them, evaluate them, deploy them, debug them, explain trade-offs, and recognize when AI should and should NOT be used!
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 📊 THE DUAL PROGRESS BARS: KNOWLEDGE vs BUILD POWER */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Progress Bar 1: Knowledge */}
        <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider font-display">
                🧠 Knowledge Depth
              </h4>
            </div>
            <span className="text-xs text-indigo-600 font-bold">Concept Mastery</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              { label: 'AI Foundation (Python, Math)', val: stats.dualProgress.knowledge.foundation },
              { label: 'Machine Learning (Trees, Regression, Metrics)', val: stats.dualProgress.knowledge.ml },
              { label: 'Deep Learning (PyTorch, Loops, CNNs)', val: stats.dualProgress.knowledge.dl },
              { label: 'LLMs (Prompts, JSON, Reliability)', val: stats.dualProgress.knowledge.llm },
              { label: 'RAG (Embeddings, Retrieval, Citations)', val: stats.dualProgress.knowledge.rag },
              { label: 'Agents (Tool Calling, Safety Limits)', val: stats.dualProgress.knowledge.agents },
              { label: 'Deployment (FastAPI, Docker, Systems)', val: stats.dualProgress.knowledge.deployment },
            ].map((k, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                  <span>{k.label}</span>
                  <span className="text-indigo-600">{k.val}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500" 
                    style={{ width: `${k.val}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar 2: Build Power */}
        <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Hammer className="w-5 h-5 text-amber-600" />
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider font-display">
                🛠️ Build Power
              </h4>
            </div>
            <span className="text-xs text-amber-600 font-bold">Shipped Code</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              { label: 'Tiny Projects (Target: 5)', current: stats.dualProgress.buildPower.tinyProjects, target: 5 },
              { label: 'ML Projects (Target: 3)', current: stats.dualProgress.buildPower.mlProjects, target: 3 },
              { label: 'Deep Learning Projects (Target: 2)', current: stats.dualProgress.buildPower.dlProjects, target: 2 },
              { label: 'LLM Applications (Target: 2)', current: stats.dualProgress.buildPower.llmApps, target: 2 },
              { label: 'RAG Systems (Target: 1)', current: stats.dualProgress.buildPower.ragSystems, target: 1 },
              { label: 'AI Agents (Target: 1)', current: stats.dualProgress.buildPower.agents, target: 1 },
              { label: 'Deployed Systems (Target: 1)', current: stats.dualProgress.buildPower.deployedSystems, target: 1 },
              { label: 'Flagship: PatientTriage.ai v2', current: stats.dualProgress.buildPower.flagshipProgress, target: 100, isPercent: true },
            ].map((b, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                  <span>{b.label}</span>
                  <span className="text-amber-700">
                    {b.isPercent ? `${b.current}%` : `${b.current} / ${b.target}`}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500" 
                    style={{ width: `${b.isPercent ? b.current : (b.current / b.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 🗺️ THE 12 WORLDS (WORLD 0 TO WORLD 11) */}
      {/* ========================================================= */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-base font-bold text-slate-800 font-display">
              The 12 Progression Worlds
            </h4>
            <p className="text-xs text-slate-500">
              From Engineering Foundation to AI Hero Mode
            </p>
          </div>
          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-xl">
            12 Worlds Mapped
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {AI_HERO_WORLDS.map((w) => (
            <div 
              key={w.worldNum}
              className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-purple-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">{w.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                    W-{w.worldNum}
                  </span>
                </div>
                <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm">
                  {w.title}
                </h5>
                <p className="text-[11px] font-semibold text-indigo-600 mt-0.5">
                  {w.stack}
                </p>
              </div>

              <p className="text-[11px] text-slate-500 mt-2 italic">
                "{w.tagline}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🏆 THE 14-LEVEL PROGRESSION TABLE */}
      {/* ========================================================= */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-base font-bold text-slate-800 font-display">
              14-Level Identity Progression
            </h4>
            <p className="text-xs text-slate-500">
              You level up when you prove the skill, not when you watch a video!
            </p>
          </div>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl">
            Current: Level {stats.level}
          </span>
        </div>

        <div className="space-y-2">
          {AI_HERO_LEVELS.map((lvl) => {
            const isUnlocked = stats.level >= lvl.level;
            const isCurrent = stats.level === lvl.level;

            return (
              <div 
                key={lvl.level}
                className={`p-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs transition-all ${
                  isCurrent 
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200 shadow-xs' 
                    : isUnlocked 
                    ? 'bg-white border-slate-200' 
                    : 'bg-slate-50/50 border-slate-200 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl shrink-0">{lvl.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-800">
                        Level {lvl.level}: {lvl.title}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-black px-2 py-0.2 rounded-md bg-amber-500 text-white uppercase">
                          Current Tier
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      <strong>Proof Required:</strong> {lvl.proof}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-xl">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Proven
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-xl">
                      <Lock className="w-3.5 h-3.5" /> {lvl.xpRequired} XP
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
