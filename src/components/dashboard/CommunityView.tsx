import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Flame, UserPlus, Check } from 'lucide-react';

export const CommunityView: React.FC = () => {
  const { community, toggleFollowMember } = useApp();
  const [filterStack, setFilterStack] = useState<string>('All');

  const stacks = ['All', 'FastAPI', 'Next.js', 'Python', 'React'];

  const filteredMembers = filterStack === 'All'
    ? community
    : community.filter(m => m.primaryStack.includes(filterStack));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/40 bg-slate-950/80 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-rose-300 bg-rose-500/20 px-2.5 py-0.5 rounded-full border border-rose-500/30 mb-2">
              <Users className="w-3.5 h-3.5 text-rose-400" />
              <span>DEVELOPER MATCHING & NETWORKING</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">60-Day Developer Community</h2>
            <p className="text-xs text-slate-400">Discover peers building with similar technologies and streaks</p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {stacks.map(st => (
              <button
                key={st}
                onClick={() => setFilterStack(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  filterStack === st
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                    : 'glass-button text-slate-400'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Community Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-950/80 hover:border-rose-500/40 transition-all duration-300 space-y-4 shadow-xl group"
          >
            <div className="flex items-center gap-3">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-2xl ring-2 ring-rose-500/40 object-cover"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-100 truncate">{member.name}</h4>
                <p className="text-[11px] font-mono text-slate-400 truncate">{member.handle}</p>
                <div className="text-[10px] text-rose-400 font-semibold">{member.role}</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Current Project</span>
                <span className="font-mono text-cyan-300">Day {member.dayNumber}</span>
              </div>
              <div className="font-bold text-slate-200 truncate">{member.currentProject}</div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-1">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> {member.streak} Days
              </span>
              <span className="text-indigo-400 font-bold">LVL {member.level}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {member.primaryStack.map(s => (
                <span key={s} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-300 font-mono border border-white/5">
                  {s}
                </span>
              ))}
            </div>

            <button
              onClick={() => toggleFollowMember(member.id)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                member.isFollowing
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'glass-button-primary'
              }`}
            >
              {member.isFollowing ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Connected</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 text-cyan-200" />
                  <span>Connect & Build Together</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
