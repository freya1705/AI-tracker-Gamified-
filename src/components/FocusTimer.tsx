import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Play, Pause, RotateCcw, X, Sparkles, CheckCircle2, Clock } from 'lucide-react';

interface FocusTimerProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionComplete: (earnedXP: number, minutes: number) => void;
  characterName: string;
}

export const FocusTimer: React.FC<FocusTimerProps> = ({
  isOpen,
  onClose,
  onSessionComplete,
  characterName,
}) => {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(20);
  const [secondsLeft, setSecondsLeft] = useState<number>(20 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    setSecondsLeft(selectedMinutes * 60);
    setIsActive(false);
    setIsCompleted(false);
  }, [selectedMinutes]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(sec => sec - 1);
      }, 1000);
    } else if (isActive && secondsLeft === 0) {
      setIsActive(false);
      setIsCompleted(true);
      sounds.playLevelUp();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      const bonusXP = selectedMinutes >= 45 ? 60 : selectedMinutes >= 20 ? 35 : 20;
      onSessionComplete(bonusXP, selectedMinutes);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, selectedMinutes, onSessionComplete]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalSeconds = selectedMinutes * 60;
  const progressPercent = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  const handleStart = () => {
    sounds.playClick();
    setIsActive(true);
    setIsCompleted(false);
  };

  const handlePause = () => {
    sounds.playClick();
    setIsActive(false);
  };

  const handleReset = () => {
    sounds.playClick();
    setIsActive(false);
    setIsCompleted(false);
    setSecondsLeft(selectedMinutes * 60);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-indigo-600" />
          <h3 className="text-xl font-bold text-slate-800 font-display">
            Quick Focus Sprint
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-6 font-medium">
          "{characterName} says: Only {selectedMinutes} minutes. Let's start and conquer!"
        </p>

        {/* Time Presets */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[15, 20, 25, 45].map((mins) => (
            <button
              key={mins}
              onClick={() => {
                sounds.playClick();
                setSelectedMinutes(mins);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedMinutes === mins
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {mins}m {mins === 20 && '⭐'}
            </button>
          ))}
        </div>

        {/* Big Circular/Progress Visual */}
        <div className="relative w-48 h-48 mx-auto mb-6 flex flex-col items-center justify-center">
          {/* Circular SVG Progress */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="86"
              stroke="#f1f5f9"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="96"
              cy="96"
              r="86"
              stroke="url(#timerGradient)"
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 86}
              strokeDashoffset={2 * Math.PI * 86 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-300 ease-linear"
            />
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Digital Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isCompleted ? (
              <div className="flex flex-col items-center animate-bounce-subtle">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-1" />
                <span className="text-base font-bold text-slate-800">Sprint Done!</span>
                <span className="text-xs text-amber-600 font-extrabold">+35 XP Earned!</span>
              </div>
            ) : (
              <>
                <span className="text-4xl font-extrabold text-slate-800 font-display tracking-tight">
                  {formattedTime}
                </span>
                <span className="text-[11px] font-semibold text-indigo-500 mt-1 uppercase tracking-wider">
                  {isActive ? 'In the Zone 🔥' : 'Ready to begin'}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3">
          {isActive ? (
            <button
              onClick={handlePause}
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md shadow-amber-200 transition-all cursor-pointer"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-7 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-md shadow-indigo-200 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{secondsLeft < totalSeconds && !isCompleted ? 'Resume' : 'Start 20m Focus'}</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Supportive Companion note */}
        <div className="mt-5 p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-center gap-2 text-xs text-indigo-900 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Complete this focus block to earn <strong>+35 bonus XP</strong> & make {characterName} proud!</span>
        </div>

      </div>
    </div>
  );
};
