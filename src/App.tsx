import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { StreakGuardian } from './components/dashboard/StreakGuardian';
import { TodayChallengeCard } from './components/dashboard/TodayChallengeCard';
import { ProgressionSphere3D } from './components/3d/ProgressionSphere3D';
import { SubmissionModal } from './components/dashboard/SubmissionModal';
import { AICodeReviewModal } from './components/dashboard/AICodeReviewModal';
import { DailyReflectionModal } from './components/dashboard/DailyReflectionModal';
import { StreakFreezeModal } from './components/dashboard/StreakFreezeModal';
import { LevelUpModal } from './components/dashboard/LevelUpModal';
import { NotificationCenter } from './components/notifications/NotificationCenter';
import { AuthModal } from './components/auth/AuthModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Individual Dashboard Tab Components
import { ChallengesListView } from './components/dashboard/ChallengesListView';
import { LearningRoadmapView } from './components/dashboard/LearningRoadmapView';
import { AIMentorView } from './components/dashboard/AIMentorView';
import { SkillHeatmapView } from './components/dashboard/SkillHeatmapView';
import { CommunityView } from './components/dashboard/CommunityView';
import { AIPortfolioBuilderView } from './components/dashboard/AIPortfolioBuilderView';
import { DeveloperReportView } from './components/dashboard/DeveloperReportView';
import { BadgesView } from './components/dashboard/BadgesView';
import { AdminDashboardView } from './components/dashboard/AdminDashboardView';

import { Sparkles, TrendingUp, Flame } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { activeTab } = useApp();

  switch (activeTab) {
    case 'challenges':
      return <ChallengesListView />;
    case 'roadmap':
      return <LearningRoadmapView />;
    case 'mentor':
      return <AIMentorView />;
    case 'skills':
      return <SkillHeatmapView />;
    case 'community':
      return <CommunityView />;
    case 'portfolio':
      return <AIPortfolioBuilderView />;
    case 'report':
      return <DeveloperReportView />;
    case 'badges':
      return <BadgesView />;
    case 'admin':
      return <AdminDashboardView />;
    case 'overview':
    default:
      return (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Streak Guardian Widget */}
          <StreakGuardian />

          {/* Today's Active Challenge Card */}
          <TodayChallengeCard />

          {/* 3D Progression Sphere Centerpiece */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-extrabold text-white">Interactive 3D Journey Sphere</h3>
                <p className="text-xs text-slate-400">60 Orbiting day nodes • Rotate, inspect & click to view challenge specs</p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 hidden sm:inline-block">
                WebGL 3D Core Active
              </span>
            </div>
            <ProgressionSphere3D interactive={true} />
          </div>

          {/* AI Personalized Motivation & Insight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-slate-950/70 space-y-2">
              <div className="flex items-center justify-between text-cyan-400">
                <TrendingUp className="w-5 h-5" />
                <span className="text-[10px] font-mono text-slate-400">BENCHMARK</span>
              </div>
              <h4 className="text-lg font-bold text-white">Ahead of 82% of Participants</h4>
              <p className="text-xs text-slate-400">Your daily consistency is higher than 82% of active platform builders.</p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 bg-slate-950/70 space-y-2">
              <div className="flex items-center justify-between text-amber-400">
                <Flame className="w-5 h-5" />
                <span className="text-[10px] font-mono text-slate-400">RECORD TARGET</span>
              </div>
              <h4 className="text-lg font-bold text-white">3 Days to Personal Record</h4>
              <p className="text-xs text-slate-400">Complete 3 more challenges to break your all-time streak record.</p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-slate-950/70 space-y-2">
              <div className="flex items-center justify-between text-purple-400">
                <Sparkles className="w-5 h-5" />
                <span className="text-[10px] font-mono text-slate-400">AI INSIGHT</span>
              </div>
              <h4 className="text-lg font-bold text-white">Consistency +18% This Week</h4>
              <p className="text-xs text-slate-400">GitHub commit velocity improved by 24% over the last 7 days.</p>
            </div>

          </div>

        </div>
      );
  }
};

const MainApp: React.FC = () => {
  const { viewMode } = useApp();

  return (
    <div className="min-h-screen bg-[#040508] text-slate-100 font-sans selection:bg-cyan-500/30">
      <Navbar />

      {viewMode === 'landing' ? (
        <LandingPage />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorBoundary>
            <DashboardContent />
          </ErrorBoundary>
        </main>
      )}

      {/* Global Modals & Overlay Drawers */}
      <SubmissionModal />
      <AICodeReviewModal />
      <DailyReflectionModal />
      <StreakFreezeModal />
      <LevelUpModal />
      <NotificationCenter />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </ErrorBoundary>
  );
}
