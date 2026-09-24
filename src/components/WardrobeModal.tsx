import React, { useState } from 'react';
import { UserStats } from '../types';
import { ACCESSORIES } from '../data/initialData';
import { sounds } from '../utils/audio';
import { X, Lock, Check, Sparkles, Smile } from 'lucide-react';

interface WardrobeModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
}

export const WardrobeModal: React.FC<WardrobeModalProps> = ({
  isOpen,
  onClose,
  stats,
  onUpdateStats,
}) => {
  const [tempName, setTempName] = useState(stats.characterName);
  const [editingName, setEditingName] = useState(false);

  if (!isOpen) return null;

  const handleEquip = (accId: string, minLevel: number) => {
    if (stats.level < minLevel) return;
    sounds.playClick();
    onUpdateStats({ equippedAccessoryId: accId });
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      sounds.playClick();
      onUpdateStats({ characterName: tempName.trim() });
      setEditingName(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl shadow-xs">
            ✨
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 font-display">
              Companion Dressing Room
            </h3>
            <p className="text-xs text-slate-500">
              Customize your companion's accessories & name!
            </p>
          </div>
        </div>

        {/* Rename Character Section */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Companion Name:
          </label>
          {editingName ? (
            <form onSubmit={handleSaveName} className="flex gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-purple-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-purple-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingName(false)}
                className="px-3 py-1.5 text-slate-500 text-xs font-semibold hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-base font-extrabold text-slate-800 font-display">
                {stats.characterName}
              </span>
              <button
                onClick={() => {
                  setTempName(stats.characterName);
                  setEditingName(true);
                }}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                Change Name ✏️
              </button>
            </div>
          )}
        </div>

        {/* Accessories Gallery */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Unlocked Accessories (Current Lv.{stats.level})
            </h4>
            <span className="text-xs text-purple-600 font-semibold">
              Level up to unlock more!
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACCESSORIES.map((acc) => {
              const isUnlocked = stats.level >= acc.minLevel;
              const isEquipped = stats.equippedAccessoryId === acc.id;

              return (
                <div
                  key={acc.id}
                  onClick={() => handleEquip(acc.id, acc.minLevel)}
                  className={`relative p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isEquipped
                      ? 'bg-purple-50/80 border-purple-400 ring-2 ring-purple-300 shadow-sm'
                      : isUnlocked
                      ? 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-xs'
                      : 'bg-slate-50/70 border-slate-200 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                      {acc.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 truncate">
                          {acc.name}
                        </span>
                        {isEquipped && (
                          <span className="flex items-center gap-1 text-[10px] font-extrabold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-md">
                            <Check className="w-3 h-3" /> Equipped
                          </span>
                        )}
                        {!isUnlocked && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded-md">
                            <Lock className="w-3 h-3" /> Lv.{acc.minLevel}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {acc.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Keep finishing daily tasks and DSA problems to unlock higher tier titles and grandmaster accessories!</span>
        </div>

      </div>
    </div>
  );
};
