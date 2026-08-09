import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FolderKanban, CheckCircle2, Lock, Sparkles, Zap, Search } from 'lucide-react';

export const ChallengesListView: React.FC = () => {
  const { challenges, setSelectedChallenge, openSubmissionModal } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = challenges.filter(c => {
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-slate-950/80 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 bg-cyan-500/20 px-2.5 py-0.5 rounded-full border border-cyan-500/30 mb-2">
              <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
              <span>60-DAY CHALLENGE CURRICULUM</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">All Daily Challenges</h2>
            <p className="text-xs text-slate-400">Explore, complete, and review your daily coding missions</p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stack, title..."
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/10">
              {['all', 'completed', 'current', 'locked'].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition ${
                    filterStatus === st
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const isCompleted = item.status === 'completed';
          const isCurrent = item.status === 'current';

          return (
            <div
              key={item.day}
              onClick={() => {
                setSelectedChallenge(item);
                if (isCurrent) openSubmissionModal(item);
              }}
              className={`glass-panel p-6 rounded-3xl border transition-all duration-300 space-y-4 cursor-pointer relative group ${
                isCompleted
                  ? 'border-emerald-500/30 bg-slate-950/80 hover:border-emerald-500/60'
                  : isCurrent
                  ? 'border-amber-500/50 bg-slate-950/95 ring-1 ring-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.2)]'
                  : 'border-white/5 bg-slate-950/30 opacity-60 hover:opacity-90'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
                  isCompleted ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                  isCurrent ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse' : 'bg-slate-900 text-slate-500 border-white/5'
                }`}>
                  DAY {item.day}
                </span>

                <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400">
                  <Zap className="w-3.5 h-3.5" /> +{item.xpReward} XP
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">{item.summary}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                {item.stack.map(s => (
                  <span key={s} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-300 font-mono border border-white/5">
                    {s}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span>{item.difficulty}</span>
                {isCompleted ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified ({item.codeReview?.overallScore || 92}/100)
                  </span>
                ) : isCurrent ? (
                  <span className="text-amber-300 flex items-center gap-1 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" /> Active Target
                  </span>
                ) : (
                  <span className="text-slate-600 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
