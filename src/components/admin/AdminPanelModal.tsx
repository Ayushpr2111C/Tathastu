import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  Zap, 
  TrendingUp, 
  FolderKanban, 
  X, 
  Search, 
  CheckCircle2, 
  Lock, 
  Bell, 
  Sparkles,
  Sliders,
  LogIn,
  KeyRound,
  UserCheck
} from 'lucide-react';

export const AdminPanelModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { user, accountsList, switchAccount } = useApp();
  
  // Admin Username & Password Authentication State
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(user.isAdmin);

  const [activeAdminTab, setActiveAdminTab] = useState<'users' | 'announcement' | 'settings'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [aiScoreThreshold, setAiScoreThreshold] = useState(80);

  if (!isOpen) return null;

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const u = adminUsername.trim().toLowerCase();
    const p = adminPassword.trim();

    // Verify Admin Credentials (Username: admin | Password: admin123)
    if ((u === 'admin' || u === 'alexvance' || u === '@alexvance_dev') && (p === 'admin123' || p === 'admin' || p === 'password123')) {
      const adminAcc = accountsList.find(a => a.isAdmin) || accountsList[0];
      switchAccount(adminAcc.id);
      setIsUnlocked(true);
      setAuthError('');
    } else {
      setAuthError('Access Denied: Invalid Username or Password. (Try Username: admin | Password: admin123)');
    }
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastMessage('');
    }, 3000);
  };

  const filteredUsers = accountsList.filter(acc => 
    acc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    acc.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-slate-950/95 max-w-4xl w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white">NEURA60 Admin Control Panel</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  PROTECTED v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400">Username & Password protected platform command center</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg glass-button text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Username & Password Login Screen */}
        {!isUnlocked && !user.isAdmin ? (
          <form onSubmit={handleAdminLogin} className="p-8 rounded-3xl glass-panel border border-cyan-500/40 bg-slate-900/80 text-left space-y-5 max-w-md mx-auto shadow-2xl">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-extrabold text-white">Admin Credentials Required</h4>
              <p className="text-xs text-slate-400">Sign in with supervisor credentials to access platform controls.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Admin Username</span>
                </label>
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                  <span>Admin Password</span>
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold leading-relaxed">
                {authError}
              </div>
            )}

            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 text-[11px] text-slate-400 font-mono text-center">
              Demo Admin Login → Username: <span className="text-cyan-300 font-bold">admin</span> | Password: <span className="text-cyan-300 font-bold">admin123</span>
            </div>

            <button
              type="submit"
              className="w-full glass-button-primary py-3 text-xs font-bold flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-cyan-200" />
              <span>Authenticate & Open Admin Panel</span>
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 font-mono text-xs">
                <div className="text-slate-400 text-[10px]">TOTAL USERS</div>
                <div className="text-lg font-extrabold text-cyan-400 flex items-center gap-1.5 mt-0.5">
                  <Users className="w-4 h-4" /> {accountsList.length}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 font-mono text-xs">
                <div className="text-slate-400 text-[10px]">TOTAL COMMITS</div>
                <div className="text-lg font-extrabold text-indigo-400 flex items-center gap-1.5 mt-0.5">
                  <TrendingUp className="w-4 h-4" /> {accountsList.reduce((a, c) => a + (c.commitsTotal || 0), 0)}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 font-mono text-xs">
                <div className="text-slate-400 text-[10px]">SHIPPED PROJECTS</div>
                <div className="text-lg font-extrabold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <FolderKanban className="w-4 h-4" /> {accountsList.reduce((a, c) => a + (c.projectsCompleted || 0), 0)}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 font-mono text-xs">
                <div className="text-slate-400 text-[10px]">GLOBAL XP</div>
                <div className="text-lg font-extrabold text-amber-400 flex items-center gap-1.5 mt-0.5">
                  <Zap className="w-4 h-4" /> {accountsList.reduce((a, c) => a + (c.totalXP || 0), 0).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Admin Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <button
                onClick={() => setActiveAdminTab('users')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                  activeAdminTab === 'users' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>User Directory ({accountsList.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('announcement')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                  activeAdminTab === 'announcement' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Broadcast Alert</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('settings')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                  activeAdminTab === 'settings' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>System Policy</span>
              </button>
            </div>

            {/* User Directory Tab */}
            {activeAdminTab === 'users' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search accounts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {filteredUsers.map(acc => (
                    <div key={acc.id} className="p-3.5 rounded-2xl glass-panel border border-white/10 bg-slate-900/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={acc.avatar} alt={acc.name} className="w-9 h-9 rounded-xl object-cover ring-2 ring-cyan-500/30" />
                        <div>
                          <div className="font-bold text-slate-100 flex items-center gap-2">
                            <span>{acc.name}</span>
                            {acc.isAdmin && <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/30 text-cyan-200 font-mono">ADMIN</span>}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">{acc.handle} • Level {acc.level || 1} • {acc.streakDays || 1}d Streak</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            switchAccount(acc.id);
                            onClose();
                          }}
                          className="glass-button px-3 py-1.5 text-[11px] font-bold text-cyan-300 border-cyan-500/30"
                        >
                          Switch & Manage
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Broadcast Tab */}
            {activeAdminTab === 'announcement' && (
              <form onSubmit={handleSendBroadcast} className="space-y-4">
                <div className="p-4 rounded-2xl glass-panel border border-amber-500/30 bg-amber-950/10 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    <span>Global Platform Push Broadcast</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">Send an urgent platform notification to all {accountsList.length} active developer accounts.</p>
                </div>

                <textarea
                  rows={4}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="e.g. 📢 Day 19 Challenge specifications updated! Streak guardian timer extended by +6 hours."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />

                {broadcastSent && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Broadcast sent to all active developer accounts!
                  </div>
                )}

                <button
                  type="submit"
                  className="glass-button-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 border-amber-300/40"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Send Push Broadcast</span>
                </button>
              </form>
            )}

            {/* System Policy Tab */}
            {activeAdminTab === 'settings' && (
              <div className="space-y-4 text-xs text-slate-300">
                <div className="p-4 rounded-2xl glass-panel border-white/10 bg-slate-900/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">AI Code Review Minimum Passing Score</h4>
                      <p className="text-[11px] text-slate-400">Score threshold required to verify challenge submission</p>
                    </div>
                    <span className="font-mono text-cyan-400 font-bold text-sm">{aiScoreThreshold}/100</span>
                  </div>

                  <input
                    type="range"
                    min="60"
                    max="95"
                    value={aiScoreThreshold}
                    onChange={(e) => setAiScoreThreshold(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div className="p-4 rounded-2xl glass-panel border-white/10 bg-slate-900/60 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white">Automated GitHub Sync API</h4>
                    <p className="text-[11px] text-slate-400">Simulates real-time commit verification webhook</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    ONLINE (200 OK)
                  </span>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
