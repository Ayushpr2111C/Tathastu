import React from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, ShieldAlert, ArrowRight, Clock, Sparkles } from 'lucide-react';

export const StreakGuardian: React.FC = () => {
  const { user, openSubmissionModal, openStreakFreezeModal, selectedChallenge } = useApp();

  const hours = user?.streakHoursRemaining ?? 24;
  const minutes = user?.streakMinutesRemaining ?? 0;
  const streakDays = user?.streakDays ?? 1;
  const streakFreezes = user?.streakFreezes ?? 1;

  const totalMinutes = hours * 60 + minutes;
  const minutesPercent = Math.min(100, Math.max(0, Math.round((totalMinutes / (24 * 60)) * 100))) || 100;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-950/20 via-slate-950/90 to-cyan-950/20 relative overflow-hidden shadow-2xl">
      
      {/* Background Glow Ring */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left Info Column */}
        <div className="flex items-center gap-5 w-full lg:w-auto">
          
          {/* Animated Circular Progress Countdown */}
          <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-400 transition-all duration-1000"
                strokeDasharray={`${isNaN(minutesPercent) ? 100 : minutesPercent}, 100`}
                strokeWidth="3.2"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Flame className="w-7 h-7 text-amber-400 animate-bounce" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono tracking-tight flex items-center gap-1.5">
                🔥 {streakDays} DAY STREAK
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ACTIVE
              </span>
            </div>
            
            <p className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{hours}h {minutes}m remaining</span>
            </p>
            
            <p className="text-xs text-slate-400">
              "You are one verified submission away from maintaining your streak!"
            </p>
          </div>

        </div>

        {/* Right Action Column */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
          
          <button
            onClick={() => openSubmissionModal(selectedChallenge)}
            className="glass-button-primary px-5 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] bg-gradient-to-r from-amber-500 to-orange-600 border-amber-300/40"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Complete Today's Challenge</span>
            <ArrowRight className="w-4 h-4 text-amber-200" />
          </button>

          <button
            onClick={openStreakFreezeModal}
            className="glass-button px-4 py-3 text-xs sm:text-sm font-semibold text-cyan-300 border-cyan-500/40 flex items-center gap-2 hover:bg-cyan-500/10"
          >
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>Use Streak Freeze (×{streakFreezes})</span>
          </button>

        </div>

      </div>

    </div>
  );
};
