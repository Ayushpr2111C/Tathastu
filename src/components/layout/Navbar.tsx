import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { TabType } from '../../types';
import { AdminPanelModal } from '../admin/AdminPanelModal';
import { 
  Flame, 
  ShieldAlert, 
  Bell, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  LayoutDashboard, 
  FolderKanban, 
  Map, 
  BrainCircuit, 
  Code2, 
  Users, 
  Briefcase, 
  Award,
  Trophy,
  Menu,
  X,
  UserPlus,
  ChevronDown,
  ShieldCheck,
  LogOut
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    user, 
    activeTab, 
    setActiveTab, 
    notifications, 
    toggleNotificationCenter, 
    toggleSound, 
    isMuted,
    openStreakFreezeModal,
    openAuthModal,
    viewMode,
    startJourney
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const tabs: { id: TabType; label: string; icon: React.ReactNode; adminOnly?: boolean }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'challenges', label: 'Challenges', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Map className="w-4 h-4" /> },
    { id: 'mentor', label: 'AI Mentor', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Code2 className="w-4 h-4" /> },
    { id: 'community', label: 'Community', icon: <Users className="w-4 h-4" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'report', label: 'Report Card', icon: <Trophy className="w-4 h-4" /> },
    { id: 'badges', label: 'Badges', icon: <Award className="w-4 h-4" /> },
    { id: 'admin', label: 'Admin Control', icon: <ShieldCheck className="w-4 h-4 text-cyan-400" />, adminOnly: true },
  ];

  const visibleTabs = tabs.filter(t => !t.adminOnly || user.isAdmin);
  const xpPercent = Math.min(100, Math.round(((user.currentXP || 0) / (user.nextLevelXP || 500)) * 100));

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/[0.08] backdrop-blur-2xl bg-[#07090f]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={startJourney}>
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-wider bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                    NEURA60
                  </span>
                  {user.isAdmin && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/30 text-cyan-200 border border-cyan-500/40 font-bold">
                      ADMIN
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 hidden sm:block">60-Day Developer Growth Platform</p>
              </div>
            </div>

            {/* User Gamification Top Bar */}
            {viewMode === 'dashboard' && (
              <div className="hidden lg:flex items-center gap-4">
                
                {/* Level & XP Widget */}
                <div className="glass-panel px-3 py-1.5 rounded-xl border border-indigo-500/30 flex items-center gap-3 bg-slate-950/60">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center border border-indigo-500/40">
                      {user.level || 1}
                    </div>
                    <span className="text-xs font-semibold text-slate-200">LVL</span>
                  </div>
                  <div className="w-28">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-0.5">
                      <span>XP</span>
                      <span className="text-cyan-400">{user.currentXP || 0}/{user.nextLevelXP || 500}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500 rounded-full"
                        style={{ width: `${xpPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Streak Guardian Badge */}
                <div className="glass-panel px-3 py-1.5 rounded-xl border border-amber-500/40 flex items-center gap-2 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                  <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                  <div>
                    <div className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1">
                      <span>{user.streakDays || 1} DAY STREAK</span>
                    </div>
                    <div className="text-[10px] text-amber-200/70 font-mono">
                      {user.streakHoursRemaining ?? 24}h {user.streakMinutesRemaining ?? 0}m left
                    </div>
                  </div>
                </div>

                {/* Streak Freeze Badge */}
                <button 
                  onClick={openStreakFreezeModal}
                  className="glass-button px-2.5 py-1.5 text-xs text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10 flex items-center gap-1.5"
                  title="Activate Streak Freeze"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono font-bold">×{user.streakFreezes ?? 1}</span>
                </button>

              </div>
            )}

            {/* Right Action Icons & Admin Panel Button */}
            <div className="flex items-center gap-2">
              
              {/* Audio Toggle */}
              <button
                onClick={toggleSound}
                className="p-2 rounded-xl glass-button text-slate-300 hover:text-cyan-400 transition"
                title={isMuted ? "Unmute UI SFX" : "Mute UI SFX"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>

              {/* Notification Bell */}
              <button
                onClick={toggleNotificationCenter}
                className="relative p-2 rounded-xl glass-button text-slate-300 hover:text-cyan-400 transition"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-ping" />
                )}
              </button>

              {/* Admin Panel Trigger Button - STRICTLY FOR ADMINS */}
              {user.isAdmin && (
                <button
                  onClick={() => setAdminPanelOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold text-cyan-300 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 transition shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Admin Panel</span>
                </button>
              )}

              {/* Direct Create Account Button */}
              <button
                onClick={() => openAuthModal('signup')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white glass-button border-white/10 transition"
              >
                <UserPlus className="w-3.5 h-3.5 text-cyan-400" />
                <span>New Account</span>
              </button>

              {/* User Profile Dropdown Button */}
              <div className="relative pl-2 border-l border-white/10">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1 rounded-xl glass-button hover:border-cyan-500/40 transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-xl ring-2 ring-cyan-500/40 object-cover"
                  />
                  <div className="hidden sm:block text-left pr-1">
                    <div className="text-xs font-bold text-slate-100">{user.name}</div>
                    <div className="text-[10px] text-cyan-400 font-mono truncate max-w-[100px]">
                      {user.isAdmin ? '🛡️ Platform Admin' : user.rank}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
                </button>

                {/* User Dropdown Menu Overlay */}
                {userDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setUserDropdownOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-64 glass-panel border border-cyan-500/40 rounded-2xl p-2 shadow-2xl bg-slate-950/95 z-50 space-y-1">
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 mb-1">
                        <div className="text-xs font-bold text-white flex items-center justify-between">
                          <span>{user.name}</span>
                          {user.isAdmin && <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/30 text-cyan-200 font-bold font-mono">ADMIN</span>}
                        </div>
                        <div className="text-[10px] font-mono text-cyan-400">{user.handle}</div>
                        <div className="text-[10px] text-slate-400 mt-1">Level {user.level || 1} • {user.streakDays || 1}-Day Streak</div>
                      </div>

                      {/* Admin Supervisor Controls - Hidden from Regular Users */}
                      {user.isAdmin && (
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            setAdminPanelOpen(true);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 flex items-center gap-2.5 border border-cyan-500/30 transition"
                        >
                          <ShieldCheck className="w-4 h-4 text-cyan-400" />
                          <span>Open Admin Panel</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          openAuthModal('signup');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-white/10 flex items-center gap-2.5 transition"
                      >
                        <UserPlus className="w-4 h-4 text-cyan-400" />
                        <span>+ Create New Account</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          openAuthModal('login');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 flex items-center gap-2.5 transition"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <span>Sign Out / Change Account</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl glass-button lg:hidden text-slate-300"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Horizontal Navigation Tabs (Dashboard Mode) */}
          {viewMode === 'dashboard' && (
            <nav className="hidden lg:flex items-center gap-1 py-2 overflow-x-auto border-t border-white/[0.05]">
              {visibleTabs.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                      active
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Mobile Dropdown Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-3 border-t border-white/10 space-y-1">
              {user.isAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAdminPanelOpen(true);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-500/20 border border-cyan-500/30 mb-2"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>🛡️ Open Admin Control Panel</span>
                </button>
              )}

              {viewMode === 'dashboard' && visibleTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium ${
                    activeTab === tab.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          )}

        </div>
      </header>

      {/* Admin Control Panel Drawer Modal */}
      <AdminPanelModal
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
      />
    </>
  );
};
