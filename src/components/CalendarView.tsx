import React, { useState } from 'react';
import { CALENDAR_SCHEDULE } from '../data/heroData';
import { CalendarDayInfo } from '../types';
import { sounds } from '../utils/audio';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, 
  Crown, Rocket, CheckCircle2, Circle, Sparkles, Target, Compass 
} from 'lucide-react';

interface CalendarViewProps {
  currentDayNumber: number;
  onSelectDayForSystem: (dayInfo: CalendarDayInfo) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  currentDayNumber,
  onSelectDayForSystem,
}) => {
  // Current displayed month in calendar view (default to September 2026)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(8); // 8 is September (0-indexed)
  const [selectedDayInfo, setSelectedDayInfo] = useState<CalendarDayInfo | null>(CALENDAR_SCHEDULE[0]);
  const [filterType, setFilterType] = useState<'all' | 'bosses' | 'projects'>('all');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to change month
  const handlePrevMonth = () => {
    sounds.playClick();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    sounds.playClick();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  // Build grid days for the month
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Map calendar items by YYYY-MM-DD
  const scheduleMap = new Map<string, CalendarDayInfo>();
  CALENDAR_SCHEDULE.forEach(item => {
    scheduleMap.set(item.date, item);
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 mb-12">
      
      {/* Calendar Header Card */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl shadow-md shadow-indigo-200">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 font-display">
                AI Hero Master Calendar & Milestones
              </h2>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                Sept 2026 → Mar 2027
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Every day has a mission, not rigid hours. Day 1 starts building immediately!
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/70">
          <button
            onClick={() => { sounds.playClick(); setFilterType('all'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All Days
          </button>
          <button
            onClick={() => { sounds.playClick(); setFilterType('bosses'); }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'bosses' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-500 hover:text-amber-600'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Boss Battles 👑</span>
          </button>
          <button
            onClick={() => { sounds.playClick(); setFilterType('projects'); }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'projects' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-500 hover:text-purple-600'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Projects 🚀</span>
          </button>
        </div>
      </div>

      {/* Main Calendar View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Monthly Interactive Grid */}
        <div className="lg:col-span-2 bg-white/95 rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h3 className="text-base sm:text-lg font-black text-slate-800 font-display flex items-center gap-2">
              <span>{monthNames[currentMonth]} {currentYear}</span>
            </h3>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400 mb-2">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 flex-1">
            {/* Empty slots before day 1 */}
            {Array.from({ length: firstDayIndex }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-14 sm:h-16 rounded-xl bg-slate-50/40 border border-transparent"></div>
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const scheduleItem = scheduleMap.get(dateStr);
              const isSelected = selectedDayInfo?.date === dateStr;
              const isToday = dateStr === '2026-09-25'; // Day 1 kickoff anchor

              // Filter logic
              const passesFilter = 
                filterType === 'all' ||
                (filterType === 'bosses' && scheduleItem?.isBossBattle) ||
                (filterType === 'projects' && (scheduleItem?.projectMilestone || scheduleItem?.isBossBattle));

              return (
                <div
                  key={`day-${dayNum}`}
                  onClick={() => {
                    sounds.playClick();
                    if (scheduleItem) {
                      setSelectedDayInfo(scheduleItem);
                    } else {
                      setSelectedDayInfo({
                        date: dateStr,
                        dayNumber: 0,
                        title: `Date: ${dateStr}`,
                        world: 'WORLD 2 — Machine Learning',
                        concept: 'Daily study loop & code building',
                        build: 'Commit today code to ai-hero repository',
                        isBossBattle: false,
                      });
                    }
                  }}
                  className={`relative h-14 sm:h-16 p-1.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-300 shadow-md scale-102 z-10'
                      : scheduleItem?.isBossBattle
                      ? 'bg-amber-50/90 border-amber-300 hover:bg-amber-100 text-amber-900 shadow-xs'
                      : scheduleItem?.projectMilestone
                      ? 'bg-purple-50/90 border-purple-200 hover:bg-purple-100 text-purple-900'
                      : passesFilter && scheduleItem
                      ? 'bg-blue-50/50 border-blue-200 hover:bg-blue-100 text-slate-800'
                      : 'bg-white border-slate-200/80 hover:border-indigo-300 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isSelected ? 'text-white' : ''}`}>
                      {dayNum}
                    </span>

                    {/* Indicators */}
                    {scheduleItem?.isBossBattle && (
                      <span className="text-xs" title="Boss Battle Milestone!">👑</span>
                    )}
                    {scheduleItem?.projectMilestone && !scheduleItem?.isBossBattle && (
                      <span className="text-xs" title="Project Milestone!">🚀</span>
                    )}
                  </div>

                  {/* Day Tag label preview */}
                  {scheduleItem && (
                    <div className="truncate">
                      <span className={`text-[9px] font-black tracking-tight uppercase ${
                        isSelected ? 'text-indigo-100' : scheduleItem.isBossBattle ? 'text-amber-800' : 'text-indigo-600'
                      }`}>
                        Day {scheduleItem.dayNumber}
                      </span>
                    </div>
                  )}

                  {/* Kickoff indicator */}
                  {isToday && (
                    <span className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-indigo-600'}`}></span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-medium">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> 👑 Boss Battles</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> 🚀 Projects</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> 🌟 Today</span>
            </div>
            <span>Click any day to inspect missions</span>
          </div>

        </div>

        {/* Right 1 Col: Selected Day Focus & Action Card */}
        <div className="bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-indigo-800 flex flex-col justify-between">
          {selectedDayInfo ? (
            <div className="space-y-4">
              
              {/* Day Header */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase tracking-wider">
                    {selectedDayInfo.dayNumber > 0 ? `DAY ${selectedDayInfo.dayNumber}` : 'Custom Date'}
                  </span>
                  <span className="text-xs text-indigo-300 font-medium">{selectedDayInfo.date}</span>
                </div>
                <h4 className="text-lg font-black text-white font-display">
                  {selectedDayInfo.title}
                </h4>
                <span className="text-xs text-purple-300 font-bold block mt-0.5">
                  {selectedDayInfo.world}
                </span>
              </div>

              {/* Boss / Project Badge */}
              {selectedDayInfo.isBossBattle && (
                <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-400/50 text-amber-200 text-xs">
                  <div className="flex items-center gap-1.5 font-black text-amber-300 mb-1">
                    <Crown className="w-4 h-4 text-amber-400" />
                    <span>{selectedDayInfo.bossTitle}</span>
                  </div>
                  {selectedDayInfo.levelUnlock && (
                    <p className="text-[11px] font-semibold text-amber-100">
                      🏆 Unlocks: <strong className="text-white">{selectedDayInfo.levelUnlock}</strong>
                    </p>
                  )}
                </div>
              )}

              {/* Concept & Learn */}
              <div className="p-3.5 rounded-2xl bg-indigo-800/40 border border-indigo-700/60 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                  Concept to Master:
                </span>
                <p className="text-white font-medium leading-relaxed">
                  {selectedDayInfo.concept}
                </p>
              </div>

              {/* Build Task */}
              <div className="p-3.5 rounded-2xl bg-indigo-800/40 border border-indigo-700/60 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  🛠️ What to Build & Prove:
                </span>
                <p className="text-white font-medium leading-relaxed">
                  {selectedDayInfo.build}
                </p>
              </div>

              {selectedDayInfo.projectMilestone && (
                <div className="p-3 rounded-2xl bg-purple-900/50 border border-purple-500/40 text-xs text-purple-200">
                  <strong className="block text-purple-300 mb-0.5">🚀 Project Milestone:</strong>
                  {selectedDayInfo.projectMilestone}
                </div>
              )}

              {/* Action: Set as Today's Target */}
              <button
                onClick={() => {
                  sounds.playLevelUp();
                  onSelectDayForSystem(selectedDayInfo);
                }}
                className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <Target className="w-4 h-4 text-slate-950" />
                <span>Load into Today's Daily System 🚀</span>
              </button>

            </div>
          ) : (
            <div className="text-center py-12 text-indigo-300 text-xs">
              Select a date on the calendar to see its AI Hero mission!
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
