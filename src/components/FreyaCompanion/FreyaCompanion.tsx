import React, { useState, useEffect } from 'react';
import { UserStats, MasterDailyState } from '../../types';
import { ACCESSORIES, SPEECH_MESSAGES, CAREER_TIERS } from '../../data/initialData';
import { sounds } from '../../utils/audio';
import { FreyaCharacter, CharacterState } from './FreyaCharacter';
import { Sparkles, Flame, Volume2, VolumeX, RefreshCw, Trophy, ArrowRight, Zap } from 'lucide-react';

interface FreyaCompanionProps {
  stats: UserStats;
  daily: MasterDailyState;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
  onOpenWardrobe: () => void;
  onOpenTimer: () => void;
  onOpenFounderRoadmap: () => void;
  speechOverride?: string | null;
  characterState?: CharacterState;
  size?: 'sm' | 'md' | 'lg';
  compact?: boolean;
  floatingXP?: number | null;
}

export const FreyaCompanion: React.FC<FreyaCompanionProps> = ({
  stats,
  daily,
  onUpdateStats,
  onOpenWardrobe,
  onOpenTimer,
  onOpenFounderRoadmap,
  speechOverride,
  characterState: propCharacterState,
  size = 'lg',
  compact = false,
  floatingXP = null,
}) => {
  const [currentSpeech, setCurrentSpeech] = useState<string>("Ready for today's tiny win? ☀️");
  const [isWiggling, setIsWiggling] = useState(false);
  const [pokeCount, setPokeCount] = useState(0);

  // Derived character state based on stats/daily
  const computedState: CharacterState = React.useMemo(() => {
    if (propCharacterState) return propCharacterState;
    if (stats.mood === 'excited') return 'levelUp';
    if (stats.mood === 'proud') return 'streak';
    if (daily?.aiMission?.completedMissions?.ship) return 'complete';
    if (stats.dailyMode === 'busy') return 'focus';
    return 'idle';
  }, [propCharacterState, stats.mood, daily?.aiMission?.completedMissions?.ship, stats.dailyMode]);

  // Contextual speech messages
  useEffect(() => {
    if (speechOverride) {
      setCurrentSpeech(speechOverride);
      return;
    }
    const pool = SPEECH_MESSAGES[stats.mood] || SPEECH_MESSAGES.idle;
    const randomMsg = pool[Math.floor(Math.random() * pool.length)];
    setCurrentSpeech(randomMsg);
  }, [stats.mood, speechOverride]);

  const handlePoke = () => {
    sounds.playPoke();
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 600);
    setPokeCount(prev => prev + 1);

    const cutePokes = [
      "Ready for today's tiny win? ☀️",
      "One concept at a time. Never zero days! 🌱",
      "You didn't just study AI today. You BUILT with it. 💻",
      "Only 20 minutes needed to start. Let's go! ⏱️",
      "Pattern recognized! PatientTriage is leveling up! 🚀",
      "Have you had your morning lemon water yet? 🍋",
      "Consistency beats cramming every single time. ✨"
    ];
    setCurrentSpeech(cutePokes[pokeCount % cutePokes.length]);
  };

  const cycleQuote = () => {
    sounds.playClick();
    const pool = SPEECH_MESSAGES[stats.mood] || SPEECH_MESSAGES.idle;
    const nextMsg = pool[Math.floor(Math.random() * pool.length)];
    setCurrentSpeech(nextMsg);
  };

  const toggleSound = () => {
    const nextVal = !stats.soundEnabled;
    sounds.enabled = nextVal;
    if (nextVal) sounds.playClick();
    onUpdateStats({ soundEnabled: nextVal });
  };

  const equippedAccessory = ACCESSORIES.find(a => a.id === stats.equippedAccessoryId) || ACCESSORIES[0];
  const currentCareer = CAREER_TIERS.find(c => c.id === stats.careerTier) || CAREER_TIERS[0];
  const xpPercent = Math.min(100, Math.round((stats.currentXP / stats.nextLevelXP) * 100));

  // If compact (for secondary pages like Master Syllabus or Resource Library)
  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-white/90 border border-slate-200/90 rounded-2xl shadow-xs">
        <FreyaCharacter
          size="sm"
          state={computedState}
          equippedAccessory={equippedAccessory}
          onPoke={handlePoke}
          isWiggling={isWiggling}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-slate-800 font-display">{stats.characterName}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-800 font-bold">Lv.{stats.level}</span>
          </div>
          <p className="text-[11px] text-slate-600 truncate mt-0.5 italic">
            "{currentSpeech}"
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Career progression badge ribbon */}
      <div 
        onClick={onOpenFounderRoadmap}
        className="mb-3.5 p-3 rounded-2xl bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white shadow-md border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 cursor-pointer group hover:border-purple-400 transition-all active:scale-[0.99]"
        title="View 2026-2032+ Founder Roadmap & Career Scorecard"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-purple-600/70 flex items-center justify-center text-amber-300 text-sm shadow-xs">
            🏆
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/40 text-purple-200">
              {currentCareer.badge}
            </span>
            <span className="text-xs font-bold text-white font-display">
              {currentCareer.title}
            </span>
            <span className="text-[11px] text-purple-300 hidden md:inline">
              • {currentCareer.tagline}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-black text-slate-400">
          <span className="text-amber-300">Student (2026)</span>
          <ArrowRight className="w-3 h-3 text-slate-600" />
          <span>SWE</span>
          <ArrowRight className="w-3 h-3 text-slate-600" />
          <span>AI Eng</span>
          <ArrowRight className="w-3 h-3 text-slate-600" />
          <span className="opacity-60">Founder (2032+)</span>
        </div>
      </div>

      {/* Main Companion Interactive Card */}
      <div className="relative overflow-hidden rounded-3xl p-5 sm:p-7 bg-white/95 border border-purple-100 shadow-xl backdrop-blur-md">
        
        {/* Playful background decorative elements */}
        <div className="absolute top-3 left-5 text-amber-300 opacity-40 select-none text-xl animate-float-slow pointer-events-none">✨</div>
        <div className="absolute bottom-4 right-6 text-emerald-400 opacity-30 select-none text-2xl animate-bounce-subtle pointer-events-none">🌱</div>
        <div className="absolute top-6 right-8 text-purple-400 opacity-25 select-none text-xl animate-sparkle pointer-events-none">⭐</div>

        {/* Floating XP Animation Popup */}
        {floatingXP !== null && (
          <div className="absolute top-4 right-1/2 translate-x-1/2 z-30 animate-bounce pointer-events-none">
            <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-300/50 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
              +{floatingXP} XP ✨
            </span>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          
          {/* Character Avatar with living Eye Tracking */}
          <div className="flex flex-col items-center shrink-0">
            <FreyaCharacter
              size={size}
              state={computedState}
              equippedAccessory={equippedAccessory}
              onPoke={handlePoke}
              isWiggling={isWiggling}
            />

            <button
              onClick={handlePoke}
              className="mt-3.5 text-[11px] font-bold text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>👉 Poke companion</span>
            </button>
          </div>

          {/* Dialogue Speech Bubble + Quick Action Tools */}
          <div className="flex-1 w-full max-w-xl flex flex-col justify-center">
            
            {/* Top Companion Identity & Controls */}
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black flex items-center justify-center text-xs shadow-sm">
                  Lv.{stats.level}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 font-display flex items-center gap-1.5">
                    {stats.characterName}
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">
                      {stats.mood}
                    </span>
                  </h3>
                </div>
              </div>

              {/* Quick Controls Tray */}
              <div className="flex items-center gap-1.5">
                {/* Consistency Streak */}
                <div 
                  className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl text-amber-800 font-black text-xs shadow-2xs"
                  title="Daily consistency streak"
                >
                  <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                  <span>{stats.streakDays}d</span>
                </div>

                {/* Focus Timer */}
                <button
                  onClick={onOpenTimer}
                  className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 transition-all cursor-pointer shadow-2xs active:scale-95"
                  title="20-minute focus sprint"
                >
                  <span>⏱️ 20m</span>
                </button>

                {/* Wardrobe Dress-Up */}
                <button
                  onClick={onOpenWardrobe}
                  className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-200 transition-all cursor-pointer shadow-2xs active:scale-95"
                  title="Open Wardrobe & Accessories"
                >
                  <span>{equippedAccessory.icon} Dress Up</span>
                </button>

                {/* Sound Toggle */}
                <button
                  onClick={toggleSound}
                  className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                  title={stats.soundEnabled ? "Mute sounds" : "Enable chimes"}
                >
                  {stats.soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-indigo-600" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              </div>
            </div>

            {/* Speech Bubble */}
            <div className="relative p-4 sm:p-4.5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-amber-50/40 border border-purple-200/80 shadow-xs mb-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed font-display">
                  "{currentSpeech}"
                </p>
                <button
                  onClick={cycleQuote}
                  title="Hear another thought"
                  className="text-slate-400 hover:text-indigo-600 p-1 cursor-pointer transition-colors shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Level & XP Gauge */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Level {stats.level} Progress</span>
                </div>
                <div className="text-slate-600">
                  <span className="text-indigo-600 font-extrabold">{stats.currentXP}</span> / {stats.nextLevelXP} XP ({xpPercent}%)
                </div>
              </div>

              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden p-0.5">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 h-full rounded-full transition-all duration-700 shadow-2xs"
                  style={{ width: `${Math.max(3, xpPercent)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                <span>Total Earned: {stats.totalXPEarned} XP</span>
                <span>{stats.nextLevelXP - stats.currentXP} XP to Level {stats.level + 1} 🚀</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
