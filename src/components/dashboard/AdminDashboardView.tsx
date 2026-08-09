import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  Flame, 
  Search, 
  TrendingUp,
  FolderKanban,
  Lock,
  Zap
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const { user, accountsList, switchAccount } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'user'>('all');

  if (!user.isAdmin) {
    return (
      <div className="p-8 rounded-3xl glass-panel border border-rose-500/30 bg-slate-950 text-center space-y-4 max-w-lg mx-auto my-12 shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white">Access Restricted: Admin Clearance Required</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          The Admin Control Panel is reserved for platform supervisors. Regular users can only access their own profile data.
        </p>
      </div>
    );
  }

  const filteredAccounts = accountsList.filter(acc => {
    const matchesSearch = acc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          acc.handle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || 
                        (filterRole === 'admin' && acc.isAdmin) || 
                        (filterRole === 'user' && !acc.isAdmin);
    return matchesSearch && matchesRole;
  });

  const totalXP = accountsList.reduce((acc, curr) => acc + (curr.totalXP || 0), 0);
  const totalCommits = accountsList.reduce((acc, curr) => acc + (curr.commitsTotal || 0), 0);
  const totalProjects = accountsList.reduce((acc, curr) => acc + (curr.projectsCompleted || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Admin Control Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-slate-950 to-indigo-950/40 relative overflow-hidden shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-white">Admin Command Center</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  SUPERVISOR ACCESS
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Platform telemetry, user directory auditing & access control policy</p>
            </div>
          </div>
        </div>

        {/* Global Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Registered Developers</div>
            <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>{accountsList.length}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Verified Commits</div>
            <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span>{totalCommits}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Projects Shipped</div>
            <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-emerald-400" />
              <span>{totalProjects}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Global XP Generated</div>
            <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>{totalXP.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Directory Table */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-950/80 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>Developer Account Directory</span>
          </h3>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Box */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user name or handle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex p-1 rounded-xl bg-slate-900 border border-white/10 text-xs">
              <button
                onClick={() => setFilterRole('all')}
                className={`px-3 py-1 rounded-lg ${filterRole === 'all' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterRole('admin')}
                className={`px-3 py-1 rounded-lg ${filterRole === 'admin' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
              >
                Admins
              </button>
              <button
                onClick={() => setFilterRole('user')}
                className={`px-3 py-1 rounded-lg ${filterRole === 'user' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
              >
                Users
              </button>
            </div>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[10px]">
                <th className="pb-3 px-3">Developer</th>
                <th className="pb-3 px-3">Role Policy</th>
                <th className="pb-3 px-3">Streak</th>
                <th className="pb-3 px-3">Level & XP</th>
                <th className="pb-3 px-3">Projects</th>
                <th className="pb-3 px-3 text-right">Admin Audit Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAccounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <img src={acc.avatar} alt={acc.name} className="w-8 h-8 rounded-xl object-cover ring-2 ring-cyan-500/30" />
                      <div>
                        <div className="font-bold text-slate-100 flex items-center gap-1.5">
                          <span>{acc.name}</span>
                          {acc.id === user.id && <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/30 text-cyan-200">YOU</span>}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">{acc.handle}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                      acc.isAdmin 
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                        : 'bg-slate-900 text-slate-400 border-white/10'
                    }`}>
                      {acc.isAdmin ? '🛡️ ADMIN' : '👤 PUBLIC USER'}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-mono">
                    <div className="text-amber-400 font-bold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> {acc.streakDays || 1}d
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono">
                    <div className="text-slate-200">LVL {acc.level || 1}</div>
                    <div className="text-[10px] text-slate-400">{(acc.totalXP || 0).toLocaleString()} XP</div>
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-300">
                    {acc.projectsCompleted || 0} Shipped
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => switchAccount(acc.id)}
                      className="glass-button px-3 py-1.5 text-[11px] font-semibold text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20"
                    >
                      Audit Workspace
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
