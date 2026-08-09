import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sampleReportCard } from '../../data/mockData';
import { Trophy, Share2, Sparkles, Flame, GitCommit, Code2, Award, CheckCircle2 } from 'lucide-react';

export const DeveloperReportView: React.FC = () => {
  const { user } = useApp();
  const [copied, setCopied] = useState(false);

  const report = sampleReportCard;

  const handleShare = () => {
    navigator.clipboard.writeText(`🚀 Check out my 60-Day Developer Report Card! ${user.streakDays}-Day Streak • ${user.projectsCompleted} Projects Built • ${user.totalXP} XP. Built on NEURA60.`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 via-slate-950 to-purple-950/40 relative shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-500/30 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>60-DAY DEVELOPER WRAPPED</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">Developer Performance Report Card</h2>
              <p className="text-xs text-slate-300">Verified consistency metrics & tech stack radar</p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="glass-button-primary px-5 py-3 text-xs font-bold flex items-center gap-2"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-200" /> : <Share2 className="w-4 h-4 text-cyan-200" />}
            <span>{copied ? 'Report Link Copied!' : 'Share Journey Card'}</span>
          </button>
        </div>
      </div>

      {/* Main Report Visual Card */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/40 bg-slate-950/90 relative overflow-hidden shadow-2xl space-y-8">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl ring-4 ring-indigo-500/40 object-cover"
            />
            <div>
              <h3 className="text-2xl font-extrabold text-white">{user.name}</h3>
              <p className="text-xs font-mono text-cyan-400">{user.handle} • {user.rank}</p>
              <div className="mt-1 inline-block px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                VERIFIED ARCHITECT WRAPPED
              </div>
            </div>
          </div>

          <div className="text-right font-mono">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">Consistency Rank</div>
            <div className="text-3xl font-extrabold text-indigo-300">TOP 4%</div>
          </div>
        </div>

        {/* 4 Primary High-Impact Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl glass-panel border-amber-500/30 bg-amber-500/5 space-y-1">
            <div className="flex items-center justify-between text-amber-400">
              <Flame className="w-5 h-5" />
              <span className="text-[10px] font-mono text-slate-400">STREAK</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
              {report.longestStreak} Days
            </div>
            <div className="text-[10px] text-slate-400">Longest Streak Record</div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border-cyan-500/30 bg-cyan-500/5 space-y-1">
            <div className="flex items-center justify-between text-cyan-400">
              <GitCommit className="w-5 h-5" />
              <span className="text-[10px] font-mono text-slate-400">COMMITS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">
              {report.totalCommits}
            </div>
            <div className="text-[10px] text-slate-400">GitHub Verified Commits</div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border-purple-500/30 bg-purple-500/5 space-y-1">
            <div className="flex items-center justify-between text-purple-400">
              <Code2 className="w-5 h-5" />
              <span className="text-[10px] font-mono text-slate-400">PROJECTS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-300 font-mono">
              {report.projectsCompleted}
            </div>
            <div className="text-[10px] text-slate-400">Shipped Projects</div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border-emerald-500/30 bg-emerald-500/5 space-y-1">
            <div className="flex items-center justify-between text-emerald-400">
              <Award className="w-5 h-5" />
              <span className="text-[10px] font-mono text-slate-400">XP EARNED</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">
              {report.xpEarned.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400">Level {user.level} Progress</div>
          </div>

        </div>

        {/* Skill Competency Breakdown */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Mastered Technologies Radar</h4>
          <div className="flex flex-wrap gap-2">
            {report.technologiesLearned.map(tech => (
              <span key={tech} className="px-3.5 py-1.5 rounded-xl text-xs font-semibold glass-panel border-cyan-500/30 text-cyan-300 bg-slate-900/80">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Radar Metric Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {report.radarData.map(item => (
            <div key={item.subject} className="p-4 rounded-2xl glass-panel border-white/5 bg-slate-900/50 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-200">
                <span>{item.subject}</span>
                <span className="font-mono text-cyan-400">{item.score}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
