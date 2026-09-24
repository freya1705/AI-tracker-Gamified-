import React, { useState, useEffect } from 'react';
import { CompanionMood, UserStats, MasterDailyState } from '../types';
import { ACCESSORIES, SPEECH_MESSAGES, CAREER_TIERS } from '../data/initialData';
import { sounds } from '../utils/audio';
import { Sparkles, Flame, Volume2, VolumeX, RefreshCw, Trophy, ArrowRight } from 'lucide-react';

interface CompanionAvatarProps {
  stats: UserStats;
  daily: MasterDailyState;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
  onOpenWardrobe: () => void;
  onOpenTimer: () => void;
  onOpenFounderRoadmap: () => void;
  speechOverride?: string | null;
}

export const CompanionAvatar: React.FC<CompanionAvatarProps> = ({
  stats,
  daily,
  onUpdateStats,
  onOpenWardrobe,
  onOpenTimer,
  onOpenFounderRoadmap,
  speechOverride
}) => {
  const [currentSpeech, setCurrentSpeech] = useState<string>("Engineer Freya is online. 🤖");
  const [isWiggling, setIsWiggling] = useState(false);
  const [pokeCount, setPokeCount] = useState(0);

  // Sync speech based on mood or speechOverride
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
      "Engineer Freya is online. 🤖 Let's make today count!",
      "4 problems done! Pattern unlocked. ⚡",
      "You didn't just learn AI today. You BUILT with it. 💻",
      "Only 20 minutes. Start? ⏱️",
      "SHIP IT! 🚀 PatientTriage v2 is getting closer every day!",
      "Minimum day is enough. Never zero days! 🌱",
      "Have you had your morning lemon water yet? 🍋"
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

  // Visual styling based on mood
  const moodStyles = {
    happy: {
      bgGlow: 'from-amber-200/50 via-yellow-100/30 to-transparent',
      borderColor: 'border-amber-300',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
      label: 'Happy & Thriving 😊',
      halo: 'glow-happy ring-4 ring-amber-300/40',
      tagline: 'Moving the build forward today'
    },
    excited: {
      bgGlow: 'from-purple-300/60 via-pink-200/40 to-transparent',
      borderColor: 'border-purple-400',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
      label: 'Super Excited! 🤩',
      halo: 'glow-excited ring-4 ring-purple-400/50 animate-pulse',
      tagline: 'Milestone shipped!'
    },
    sleepy: {
      bgGlow: 'from-slate-200/50 via-indigo-50/20 to-transparent',
      borderColor: 'border-slate-300',
      badgeBg: 'bg-slate-100 text-slate-700 border-slate-300',
      label: 'Gentle Mode 😴',
      halo: 'glow-sleepy ring-2 ring-slate-300/40',
      tagline: 'Minimum day is enough'
    },
    proud: {
      bgGlow: 'from-rose-200/50 via-pink-100/30 to-transparent',
      borderColor: 'border-rose-400',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
      label: 'Super Proud! 👑',
      halo: 'glow-proud ring-4 ring-rose-400/50',
      tagline: 'Pattern unlocked & code committed'
    },
    encouraging: {
      bgGlow: 'from-emerald-200/50 via-teal-100/30 to-transparent',
      borderColor: 'border-emerald-300',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      label: 'Here for you 🌟',
      halo: 'glow-encouraging ring-4 ring-emerald-300/40',
      tagline: 'One small step is all you need'
    }
  }[stats.mood] || {
    bgGlow: 'from-yellow-100/40 to-transparent',
    borderColor: 'border-yellow-200',
    badgeBg: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    label: 'Ready to Learn',
    halo: 'ring-2 ring-yellow-200',
    tagline: 'Let us make progress!'
  };

  const xpPercent = Math.min(100, Math.round((stats.currentXP / stats.nextLevelXP) * 100));

  // 4 Worlds quick metrics with defensive defaults
  const morningDone = daily?.morning ? Object.values(daily.morning).filter(Boolean).length : 0;
  const dsaDone = daily?.dsa ? Object.entries(daily.dsa).filter(([k, v]) => k !== 'topic' && Boolean(v)).length : 0;
  const aiDone = daily?.aiMission?.completedMissions ? Object.values(daily.aiMission.completedMissions).filter(Boolean).length : 0;
  const lifeDone = daily?.life?.completed ? daily.life.completed.length : 0;

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-8">
      
      {/* Top Banner: Career Progression Ladder (Student -> SWE Builder -> AI Engineer -> AI-Powered Founder) */}
      <div 
        onClick={onOpenFounderRoadmap}
        className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-md border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group hover:border-purple-400 transition-all"
        title="Click to view full 2026-2032+ Founder Roadmap & Scorecard"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600/60 flex items-center justify-center text-amber-300 text-base shadow-xs">
            🏆
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/40 text-purple-200">
                {currentCareer.badge}
              </span>
              <span className="text-xs font-bold text-white font-display">
                {currentCareer.title}
              </span>
            </div>
            <p className="text-[11px] text-purple-200 font-medium">
              {currentCareer.tagline}
            </p>
          </div>
        </div>

        {/* Career stages steps indicator */}
        <div className="flex items-center gap-1 text-[10px] font-extrabold text-slate-300">
          <span className="text-amber-400">Student (2026)</span>
          <ArrowRight className="w-3 h-3 text-slate-500" />
          <span>SWE Builder</span>
          <ArrowRight className="w-3 h-3 text-slate-500" />
          <span>AI Engineer</span>
          <ArrowRight className="w-3 h-3 text-slate-500" />
          <span className="opacity-70">AI Founder (2032+)</span>
        </div>
      </div>

      {/* Top Banner Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 mb-4 rounded-2xl glass-panel shadow-sm border border-slate-200/80">
        {/* Companion Title & Level */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold shadow-md shadow-indigo-200 text-base">
            Lv.{stats.level}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-800 tracking-tight font-display">
                {stats.characterName}
              </h2>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${moodStyles.badgeBg}`}>
                {moodStyles.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Mode: <span className="text-indigo-600 font-semibold">{stats.dailyMode === 'busy' ? 'Busy College Day (20-45m)' : stats.dailyMode === 'free' ? 'Free Day (4-6h Build)' : 'Normal Day (1.5-2.5h)'}</span>
            </p>
          </div>
        </div>

        {/* Quick Indicators: Streak + Sound + Focus Timer + Wardrobe */}
        <div className="flex items-center gap-2.5">
          {/* Streak pill */}
          <div 
            title="Daily Consistency Streak. Complete at least 1 task daily!"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl text-amber-800 font-bold text-sm shadow-xs"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce-subtle" />
            <span>{stats.streakDays} Day Streak</span>
          </div>

          {/* Quick 20m Focus Button */}
          <button
            onClick={onOpenTimer}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-xs rounded-xl border border-indigo-200 transition-all shadow-xs cursor-pointer active:scale-95"
            title="Start quick 20-minute focus sprint"
          >
            <span>⏱️ 20m Sprint</span>
          </button>

          {/* Wardrobe Button */}
          <button
            onClick={onOpenWardrobe}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium text-xs rounded-xl border border-purple-200 transition-all shadow-xs cursor-pointer active:scale-95"
            title="Open Wardrobe & Rename Character"
          >
            <span>{equippedAccessory.icon} Dress Up</span>
          </button>

          {/* Audio Mute/Unmute */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 transition-all cursor-pointer"
            title={stats.soundEnabled ? "Mute sounds" : "Enable pleasant game chimes"}
          >
            {stats.soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* Main Companion Showcase Card */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-b ${moodStyles.bgGlow} to-white/90 border border-white shadow-xl backdrop-blur-md transition-all duration-500`}>
        {/* Floating background decorative shapes */}
        <div className="absolute top-4 left-6 opacity-30 text-2xl select-none pointer-events-none animate-float-slow">✨</div>
        <div className="absolute bottom-6 right-8 opacity-25 text-3xl select-none pointer-events-none animate-bounce-subtle">🌿</div>
        <div className="absolute top-8 right-12 opacity-20 text-2xl select-none pointer-events-none animate-sparkle">💡</div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          
          {/* Avatar Graphic with Interactive Poke and Aura */}
          <div className="relative flex flex-col items-center">
            {/* The Character Visual Avatar */}
            <div 
              onClick={handlePoke}
              title="Click/tap to poke your companion!"
              className={`group relative cursor-pointer select-none rounded-full p-2.5 transition-all duration-300 ${moodStyles.halo} ${isWiggling ? 'animate-wiggle scale-105' : 'hover:scale-102 active:scale-95'}`}
            >
              {/* Outer decorative ring */}
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden bg-gradient-to-b from-amber-50 to-orange-50 border-4 border-white shadow-lg flex items-center justify-center">
                <img 
                  src="/character.png" 
                  alt={stats.characterName}
                  className="w-full h-full object-cover object-top scale-125 translate-y-3 transition-transform duration-500 group-hover:scale-130"
                />
              </div>

              {/* Equipped Accessory Badge / Pin */}
              <div 
                title={`Equipped: ${equippedAccessory.name}`}
                className="absolute -top-1 -right-1 bg-white border-2 border-indigo-300 shadow-md rounded-full w-11 h-11 flex items-center justify-center text-xl animate-bounce-subtle"
              >
                {equippedAccessory.icon}
              </div>

              {/* Mood Mini Floating Badge */}
              <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-3 py-1 bg-white/95 border border-slate-200/90 rounded-full shadow-md text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>{moodStyles.label.split(' ')[0]}</span>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-slate-400 font-medium tracking-wide">
              (Tap companion to poke & interact!)
            </p>
          </div>

          {/* Dialogue & XP Progress Section */}
          <div className="flex-1 w-full max-w-xl text-center md:text-left flex flex-col justify-center">
            
            {/* Playful Speech Bubble */}
            <div className="relative mb-5 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-md shadow-indigo-100/50">
              {/* Speech bubble arrow pointer */}
              <div className="hidden md:block absolute -left-2.5 top-8 w-5 h-5 bg-white border-l border-b border-slate-200/90 transform rotate-45"></div>
              
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {stats.characterName} says
                  </span>
                  <span className="text-[11px] text-slate-400">
                    • {moodStyles.tagline}
                  </span>
                </div>
                
                {/* Refresh quote button */}
                <button
                  onClick={cycleQuote}
                  title="Hear another message"
                  className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed font-display">
                "{currentSpeech}"
              </p>

              {/* Worlds Status Snapshot in Speech Bubble */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-600">
                <span className="px-2 py-0.5 bg-amber-50 rounded border border-amber-200 text-amber-900">
                  🌅 Spiritual: {morningDone}/7
                </span>
                <span className="px-2 py-0.5 bg-blue-50 rounded border border-blue-200 text-blue-900">
                  🧠 DSA: {dsaDone}/10
                </span>
                <span className="px-2 py-0.5 bg-purple-50 rounded border border-purple-200 text-purple-900">
                  🤖 AI: {aiDone}/6
                </span>
                <span className="px-2 py-0.5 bg-emerald-50 rounded border border-emerald-200 text-emerald-900">
                  🌱 Life: {lifeDone} done
                </span>
              </div>
            </div>

            {/* Level & XP Gauge */}
            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/70 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Level {stats.level} Progress</span>
                </div>
                <div className="text-slate-600">
                  <span className="text-indigo-600 font-extrabold">{stats.currentXP}</span> / {stats.nextLevelXP} XP ({xpPercent}%)
                </div>
              </div>

              {/* Progress Bar with glowing fill */}
              <div className="w-full h-3.5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative p-0.5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 transition-all duration-700 ease-out shadow-xs"
                  style={{ width: `${xpPercent}%` }}
                ></div>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Total XP: <strong className="text-slate-700 font-bold">{stats.totalXPEarned} XP</strong></span>
                <span>{stats.nextLevelXP - stats.currentXP} XP to Level {stats.level + 1}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
