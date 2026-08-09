import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Lock, Sparkles, Zap, ChevronRight } from 'lucide-react';

export const LearningRoadmapView: React.FC = () => {
  const { challenges, setSelectedChallenge, openSubmissionModal } = useApp();

  const keyMilestones = [
    { day: 1, title: 'Glassmorphic Portfolio', target: 'Day 1 Launch Pad' },
    { day: 5, title: 'Scientific Calculator', target: 'Day 5 React Foundations' },
    { day: 15, title: 'Real-time Crypto & Stock Tracker', target: 'Day 15 Data Visualization' },
    { day: 18, title: 'Kanban Board with Supabase', target: 'Day 18 ACTIVE TARGET' },
    { day: 30, title: 'AI Resume & PDF Analyzer', target: 'Day 30 AI Engineering Milestone' },
    { day: 45, title: 'Vector Search Engine', target: 'Day 45 Distributed Systems' },
    { day: 60, title: 'Full-Stack AI SaaS Platform', target: 'Day 60 Ultimate Graduation' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-slate-950/80 relative shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 bg-cyan-500/20 px-2.5 py-0.5 rounded-full border border-cyan-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>60-DAY ARCHITECTURAL CURRICULUM</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Interactive Developer Roadmap</h2>
            <p className="text-xs text-slate-400">From HTML basics to production AI SaaS architecture</p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" /> 17 Completed
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-ping" /> Day 18 Active
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" /> 42 Locked
            </span>
          </div>
        </div>
      </div>

      {/* Key Milestones Interactive Path */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 bg-slate-950/90 relative shadow-2xl">
        
        <div className="max-w-3xl mx-auto space-y-8 relative">
          
          {/* Vertical Connecting Glow Line */}
          <div className="absolute top-6 bottom-6 left-6 sm:left-8 w-[2px] bg-gradient-to-b from-emerald-500 via-amber-500 to-slate-800 pointer-events-none" />

          {keyMilestones.map((milestone) => {
            const challenge = challenges.find(c => c.day === milestone.day);
            if (!challenge) return null;

            const isCompleted = challenge.status === 'completed';
            const isCurrent = challenge.status === 'current';

            return (
              <div
                key={milestone.day}
                onClick={() => {
                  setSelectedChallenge(challenge);
                  if (isCurrent) openSubmissionModal(challenge);
                }}
                className={`relative flex items-start gap-6 p-4 sm:p-6 rounded-2xl border transition-all cursor-pointer group ${
                  isCompleted
                    ? 'glass-panel border-emerald-500/30 bg-slate-900/60 hover:border-emerald-500/60'
                    : isCurrent
                    ? 'glass-panel border-amber-500/50 bg-slate-950/90 shadow-[0_0_30px_rgba(245,158,11,0.2)] ring-1 ring-amber-500/50'
                    : 'bg-slate-900/20 border-white/5 opacity-60 hover:opacity-100 hover:border-white/20'
                }`}
              >
                {/* Milestone Node Badge */}
                <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-extrabold text-sm flex-shrink-0 transition-transform group-hover:scale-110 ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : isCurrent
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.4)] animate-pulse'
                    : 'bg-slate-900 text-slate-500 border border-white/10'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : isCurrent ? (
                    <Zap className="w-6 h-6" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                </div>

                {/* Info Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isCompleted ? 'text-emerald-400' : isCurrent ? 'text-amber-400' : 'text-slate-500'
                    }`}>
                      {milestone.target}
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-semibold">+{challenge.xpReward} XP</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    Day {challenge.day}: {challenge.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {challenge.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {challenge.stack.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-white/10">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="self-center text-slate-500 group-hover:text-cyan-400 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
};
