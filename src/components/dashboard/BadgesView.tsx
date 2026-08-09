import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, CheckCircle2 } from 'lucide-react';

export const BadgesView: React.FC = () => {
  const { badges } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-yellow-500/40 bg-slate-950/80 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-yellow-300 bg-yellow-500/20 px-2.5 py-0.5 rounded-full border border-yellow-500/30 mb-2">
              <Award className="w-3.5 h-3.5 text-yellow-400" />
              <span>COLLECTIBLE BADGES & ACHIEVEMENTS</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">3D Achievement Showcase</h2>
            <p className="text-xs text-slate-400">Unlock trophies as you progress through your 60-Day Developer Challenge</p>
          </div>

          <div className="text-right font-mono">
            <div className="text-xs text-slate-400">UNLOCKED</div>
            <div className="text-2xl font-extrabold text-yellow-300">
              {badges.filter(b => b.unlocked).length} / {badges.length}
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`glass-panel p-6 rounded-3xl border transition-all duration-300 space-y-4 relative overflow-hidden group ${
              badge.unlocked
                ? 'border-yellow-500/40 bg-slate-950/90 shadow-[0_0_25px_rgba(234,179,8,0.15)]'
                : 'border-white/5 bg-slate-950/40 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="text-4xl p-3 rounded-2xl bg-slate-900 border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                {badge.icon}
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase ${badge.color}`}>
                {badge.rarity}
              </span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{badge.title}</span>
                {badge.unlocked && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">{badge.description}</p>
            </div>

            <div className="pt-2 border-t border-white/10">
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>{badge.unlocked ? `Unlocked ${badge.unlockedAt}` : 'Progress'}</span>
                <span>{badge.progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    badge.unlocked ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 'bg-slate-700'
                  }`}
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
