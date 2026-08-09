import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProgressionSphere3D } from '../3d/ProgressionSphere3D';
import { 
  ArrowRight, 
  Flame, 
  BrainCircuit, 
  Code2, 
  Trophy, 
  Sparkles, 
  GitBranch, 
  Briefcase,
  Layers,
  ChevronRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { startJourney } = useApp();

  return (
    <div className="relative min-h-screen bg-[#040508] text-slate-100 overflow-hidden">
      
      {/* Background Neon Volumetric Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-cyan-500/15 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-6">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-xl bg-slate-950/60 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span>2026 AI DEVELOPER OPERATING SYSTEM</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Build. Ship. Grow.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              For 60 Days.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            An AI-powered developer journey that turns daily consistency into real projects, stronger skills and a portfolio you’re proud of.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={startJourney}
              className="glass-button-primary w-full sm:w-auto px-8 py-4 text-base font-bold flex items-center justify-center gap-3 group shadow-[0_0_30px_rgba(6,182,212,0.5)]"
            >
              <span>Start My 60-Day Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-cyan-200" />
            </button>

            <button
              onClick={startJourney}
              className="glass-button w-full sm:w-auto px-7 py-4 text-sm font-semibold text-slate-300 hover:text-white border-white/10 flex items-center justify-center gap-2"
            >
              <span>Explore the Journey</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Micro metrics bar */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Streak Protection</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-purple-400" />
              <span>Real-time AI Code Review</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-cyan-400" />
              <span>Developer Report Card</span>
            </div>
          </div>

        </div>

        {/* 3D Progression Sphere Centerpiece */}
        <div className="relative mt-8">
          <ProgressionSphere3D interactive={true} />

          {/* Floating HUD Badges around 3D hero */}
          <div className="hidden lg:block absolute -top-4 -left-6 z-20 animate-float">
            <div className="glass-panel p-3.5 rounded-2xl border border-cyan-500/30 backdrop-blur-xl bg-slate-950/80 shadow-2xl flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400">GitHub Commit Verified</div>
                <div className="text-xs font-bold text-slate-100">+12 Commits Sync</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute -bottom-6 -right-6 z-20 animate-float" style={{ animationDelay: '2s' }}>
            <div className="glass-panel p-3.5 rounded-2xl border border-purple-500/30 backdrop-blur-xl bg-slate-950/80 shadow-2xl flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400">AI Mentor Insight</div>
                <div className="text-xs font-bold text-slate-100">Recommended: Supabase RLS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Built For Daily Excellence</h2>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            An Interconnected Progression Operating System
          </h3>
          <p className="text-sm text-slate-400">
            Every feature connects directly to your XP, level rank, GitHub streak, and employer portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Streak Guardian */}
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 bg-slate-950/60 hover:border-amber-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <h4 className="text-lg font-bold text-slate-100 mb-2">Streak Guardian</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Urgent, encouraging countdown timers and Streak Freeze safety locks prevent burnout while ensuring 60-day consistency.
            </p>
            <div className="text-xs font-mono text-amber-300 font-medium">🔥 17 Day Streak Active</div>
          </div>

          {/* Card 2: AI Code Review */}
          <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20 bg-slate-950/60 hover:border-cyan-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-100 mb-2">AI Code Review</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Get immediate automated 87/100 score breakdowns on code quality, project structure, documentation, and README quality.
            </p>
            <div className="text-xs font-mono text-cyan-300 font-medium">⚡ Instant Score 87/100</div>
          </div>

          {/* Card 3: AI Project Mentor */}
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 bg-slate-950/60 hover:border-purple-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-100 mb-2">AI Project Mentor</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Analyzes your GitHub repositories, current skills, and interests to dynamically recommend your next project challenge.
            </p>
            <div className="text-xs font-mono text-purple-300 font-medium">🧠 Tailored Specs & Skill Analysis</div>
          </div>

          {/* Card 4: Developer Wrapped Report Card */}
          <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 bg-slate-950/60 hover:border-indigo-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-100 mb-2">Developer Report Card</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              A shareable "Developer Wrapped" style summary highlighting your total commits, streak history, radar skills, and XP metrics.
            </p>
            <div className="text-xs font-mono text-indigo-300 font-medium">🏆 Top 4% Consistency Rank</div>
          </div>

          {/* Card 5: AI Portfolio Builder */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 bg-slate-950/60 hover:border-emerald-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-100 mb-2">AI Portfolio Builder</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              One-click transformation of your 60 verified challenge projects into a live portfolio site, markdown resume, and LinkedIn posts.
            </p>
            <div className="text-xs font-mono text-emerald-300 font-medium">💼 1-Click Site & Resume Generation</div>
          </div>

          {/* Card 6: Skill Heatmap & Community */}
          <div className="glass-panel p-6 rounded-3xl border border-rose-500/20 bg-slate-950/60 hover:border-rose-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-5 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-100 mb-2">Skill Heatmap & Community</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Visualize your skill growth across React, Python, Docker, and SQL while matching with developers building similar stacks.
            </p>
            <div className="text-xs font-mono text-rose-300 font-medium">👥 Connect & Build Together</div>
          </div>

        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-slate-950 to-purple-950/40 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh-grid opacity-30 pointer-events-none" />
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">Ready to Transform Your Coding Journey?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Join thousands of developers turning daily consistency into real-world SaaS projects and job-ready portfolios.
          </p>
          <button
            onClick={startJourney}
            className="glass-button-primary px-8 py-4 text-base font-bold inline-flex items-center gap-3 shadow-[0_0_30px_rgba(6,182,212,0.5)]"
          >
            <span>Start My 60-Day Journey Now</span>
            <ArrowRight className="w-5 h-5 text-cyan-200" />
          </button>
        </div>

      </section>

    </div>
  );
};
