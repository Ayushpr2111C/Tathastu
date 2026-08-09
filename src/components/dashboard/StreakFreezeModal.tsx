import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, X, Sparkles } from 'lucide-react';

export const StreakFreezeModal: React.FC = () => {
  const { isStreakFreezeModalOpen, closeStreakFreezeModal, activateStreakFreeze, user } = useApp();

  if (!isStreakFreezeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-slate-950/95 max-w-md w-full shadow-2xl space-y-6 relative text-center animate-in fade-in zoom-in-95 duration-200">
        
        <button onClick={closeStreakFreezeModal} className="absolute top-4 right-4 p-1.5 rounded-lg glass-button text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-3xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
          <ShieldAlert className="w-9 h-9 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-white">Streak Freeze Safety Lock</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Protect your <span className="text-amber-400 font-bold">17-Day Streak</span> from pausing when life gets busy. Freezes automatically earn every 15 completed challenges.
          </p>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 bg-slate-900/60 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-300">Available Freezes</span>
          <span className="text-lg font-extrabold font-mono text-cyan-300">×{user.streakFreezes}</span>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={activateStreakFreeze}
            disabled={user.streakFreezes <= 0}
            className="glass-button-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>Activate 24h Streak Freeze</span>
          </button>
          
          <button
            onClick={closeStreakFreezeModal}
            className="glass-button w-full py-2.5 text-xs text-slate-400 hover:text-white"
          >
            Keep Saved For Later
          </button>
        </div>

      </div>
    </div>
  );
};
