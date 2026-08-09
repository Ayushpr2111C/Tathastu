import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { presetAvatars } from '../../data/mockData';
import { UserPlus, Sparkles, X, Check, Flame, Lock, ShieldCheck, LogIn, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authMode, 
    setAuthMode, 
    accountsList, 
    switchAccount, 
    createAccount,
    user 
  } = useApp();

  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [role, setRole] = useState('Full-Stack Developer');
  const [avatar, setAvatar] = useState(presetAvatars[1]);
  const [githubUsername, setGithubUsername] = useState('');
  const [linkedinConnected, setLinkedinConnected] = useState(true);

  // Login form state
  const [loginHandle, setLoginHandle] = useState('');
  const [loginError, setLoginError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createAccount({
      name,
      handle: handle.startsWith('@') ? handle : `@${handle || name.toLowerCase().replace(/\s+/g, '')}`,
      avatar,
      role,
      githubUsername: githubUsername || name.toLowerCase().replace(/\s+/g, '-'),
      linkedinConnected
    });

    closeAuthModal();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetHandle = loginHandle.startsWith('@') ? loginHandle.toLowerCase() : `@${loginHandle.toLowerCase()}`;
    const targetAccount = accountsList.find(a => a.handle.toLowerCase() === targetHandle || a.name.toLowerCase() === loginHandle.toLowerCase());

    if (targetAccount) {
      switchAccount(targetAccount.id);
      setLoginError('');
      closeAuthModal();
    } else {
      setLoginError(`Account "${loginHandle}" not found. Create a new account below!`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-slate-950/95 max-w-lg w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {authMode === 'signup' ? <UserPlus className="w-5 h-5" /> : (authMode === 'login' ? <LogIn className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />)}
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                {authMode === 'signup' ? 'Create New Developer Account' : (authMode === 'login' ? 'Sign In to Your Workspace' : 'Admin Account Switcher')}
              </h3>
              <p className="text-xs text-slate-400">
                {authMode === 'signup' ? 'Start your isolated 60-day challenge journey' : (authMode === 'login' ? 'Enter your developer handle to load your workspace' : 'Supervisor access control')}
              </p>
            </div>
          </div>
          <button onClick={closeAuthModal} className="p-1.5 rounded-lg glass-button text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Mode Navigation Tabs */}
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900 border border-white/10">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              authMode === 'login'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              authMode === 'signup'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ New Account</span>
          </button>

          {user.isAdmin && (
            <button
              onClick={() => setAuthMode('switch')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                authMode === 'switch'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin Switch</span>
            </button>
          )}
        </div>

        {/* Sign In View */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Developer Handle / Username</label>
              <input
                type="text"
                required
                value={loginHandle}
                onChange={(e) => setLoginHandle(e.target.value)}
                placeholder="e.g. @sarahchen_codes"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                {loginError}
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className="text-xs text-cyan-400 hover:underline"
              >
                Don't have an account? Sign up
              </button>

              <button
                type="submit"
                className="glass-button-primary px-6 py-2 text-xs font-bold flex items-center gap-2"
              >
                <span>Access Workspace</span>
                <ArrowRight className="w-4 h-4 text-cyan-200" />
              </button>
            </div>
          </form>
        )}

        {/* Admin Account Switcher (Admin Role Required) */}
        {authMode === 'switch' && (
          <div className="space-y-4">
            {!user.isAdmin ? (
              <div className="p-6 rounded-2xl glass-panel border border-rose-500/30 bg-slate-950 text-center space-y-3">
                <Lock className="w-8 h-8 text-rose-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Access Denied: Admin Clearance Required</h4>
                <p className="text-xs text-slate-400">
                  Account switching between users is restricted to platform supervisors.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 uppercase">Supervisor Account Directory</span>
                  <span className="text-cyan-400 font-bold font-mono">🛡️ ADMIN ACCESS</span>
                </div>
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {accountsList.map((acc) => {
                    const isActive = acc.id === user.id;
                    return (
                      <div
                        key={acc.id}
                        onClick={() => {
                          switchAccount(acc.id);
                          closeAuthModal();
                        }}
                        className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-4 ${
                          isActive
                            ? 'glass-panel border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                            : 'glass-panel border-white/5 bg-slate-900/60 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img src={acc.avatar} alt={acc.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-cyan-500/30" />
                          <div>
                            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                              <span>{acc.name}</span>
                              {isActive && <span className="px-1.5 py-0.2 rounded text-[9px] bg-cyan-500/30 text-cyan-200 font-mono">ACTIVE</span>}
                            </h4>
                            <p className="text-[11px] font-mono text-slate-400">{acc.handle} • {acc.rank}</p>
                          </div>
                        </div>

                        <div className="text-right font-mono text-xs">
                          <div className="text-amber-400 font-bold flex items-center gap-1 justify-end">
                            <Flame className="w-3.5 h-3.5" /> {acc.streakDays || 1}d Streak
                          </div>
                          <div className="text-slate-400 text-[10px]">LVL {acc.level || 1} ({(acc.totalXP || 0).toLocaleString()} XP)</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* Sign Up / Create Profile Form */}
        {authMode === 'signup' && (
          <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
            
            {/* Avatar Selector */}
            <div>
              <label className="block text-slate-300 font-bold mb-2">Select Avatar Persona</label>
              <div className="flex gap-3">
                {presetAvatars.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Avatar ${idx}`}
                    onClick={() => setAvatar(img)}
                    className={`w-11 h-11 rounded-2xl cursor-pointer object-cover transition-transform ${
                      avatar === img ? 'ring-4 ring-cyan-400 scale-110 shadow-lg' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. David Miller"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Handle / Username</label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="@davidm_dev"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Developer Role / Title</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Full-Stack Developer">Full-Stack Developer</option>
                <option value="AI & Systems Engineer">AI & Systems Engineer</option>
                <option value="Frontend Architect">Frontend Architect</option>
                <option value="Backend Specialist">Backend Specialist</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">GitHub Username</label>
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="davidm-builds"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Sync Social Progress</label>
                <button
                  type="button"
                  onClick={() => setLinkedinConnected(!linkedinConnected)}
                  className={`w-full py-2 rounded-xl font-bold flex items-center justify-center gap-2 border transition ${
                    linkedinConnected ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-900 text-slate-400 border-white/10'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{linkedinConnected ? 'LinkedIn Auto Sync On' : 'Auto Sync Off'}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeAuthModal}
                className="glass-button px-4 py-2 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="glass-button-primary px-6 py-2 text-xs font-bold flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                <span>Create Account</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
