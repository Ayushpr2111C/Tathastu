import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Sparkles, ArrowRight } from 'lucide-react';

export const LevelUpModal: React.FC = () => {
  const { isLevelUpModalOpen, closeLevelUpModal, user } = useApp();

  if (!isLevelUpModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="glass-panel p-8 rounded-3xl border border-indigo-500/50 bg-slate-950/95 max-w-md w-full shadow-2xl text-center space-y-6 relative animate-in fade-in zoom-in-95 duration-300">
        
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 via-cyan-500/10 to-transparent rounded-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 p-[2px] mx-auto shadow-[0_0_40px_rgba(99,102,241,0.6)]">
            <div className="w-full h-full bg-slate-950 rounded-3xl flex items-center justify-center">
              <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>LEVEL UP CELEBRATION</span>
          </div>

          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            You Reached Level {user.level}!
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
            New architectural challenges, advanced AI mentor prompts, and portfolio badges unlocked!
          </p>

          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 bg-slate-900/60 flex items-center justify-around font-mono">
            <div>
              <div className="text-[10px] text-slate-400">NEW RANK</div>
              <div className="text-xs font-bold text-cyan-300">{user.rank}</div>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div>
              <div className="text-[10px] text-slate-400">TOTAL XP</div>
              <div className="text-xs font-bold text-amber-300">{user.totalXP.toLocaleString()} XP</div>
            </div>
          </div>

          <button
            onClick={closeLevelUpModal}
            className="glass-button-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.5)]"
          >
            <span>Claim Rewards & Continue</span>
            <ArrowRight className="w-4 h-4 text-cyan-200" />
          </button>

        </div>

      </div>
    </div>
  );
};
