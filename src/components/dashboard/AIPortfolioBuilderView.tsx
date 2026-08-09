import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { Briefcase, Sparkles, Copy, CheckCircle2, Globe, FileText } from 'lucide-react';

export const AIPortfolioBuilderView: React.FC = () => {
  const { user, challenges } = useApp();
  const [activeTab, setActiveTab] = useState<'preview' | 'resume' | 'readme' | 'linkedin'>('preview');
  const [copied, setCopied] = useState(false);

  const completedProjects = challenges.filter(c => c.status === 'completed');

  const resumeMarkdown = `# ${user.name}
${user.rank} | ${user.handle} | GitHub: ${user.githubUsername}

## Executive Summary
Results-driven Full-Stack AI Software Engineer with a verified 60-Day Developer Challenge track record. Shipped ${user.projectsCompleted} production-grade projects using Next.js, Supabase, Python, and OpenAI APIs with ${user.commitsTotal}+ verified commits.

## Highlighted Shipped Projects
${completedProjects.map(p => `### ${p.title} (Day ${p.day})
- **Stack**: ${p.stack.join(', ')}
- **Brief**: ${p.description}
- **Code Review Score**: ${p.codeReview?.overallScore || 92}/100
- **Repository**: ${p.repoUrl || 'https://github.com/demo/repo'}
`).join('\n')}

## Core Competencies
- Frontend: React, Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- Backend & DB: Node.js, Python, FastAPI, Supabase PostgreSQL, Redis
- AI & Infrastructure: OpenAI API, Qdrant Vector Indexing, Docker
`;

  const linkedinPost = `🔥 Just completed Day 18 of my 60-Day Developer Challenge!

Building consistency every single day. Today I shipped a production-ready Kanban Board built with Next.js, Supabase PostgreSQL, and Tailwind CSS.

Key architectural highlights:
✅ Supabase Row Level Security (RLS) policies
✅ Optimistic UI updates with dnd-kit
✅ Real-time database subscription sync

Explore my full live portfolio: https://portfolio.${user.handle}.dev
#60DayChallenge #NextJS #Supabase #WebDev #BuildInPublic`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-slate-950 to-teal-950/40 relative shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>AUTOMATED PORTFOLIO GENERATOR</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">AI Portfolio & Resume Generator</h2>
              <p className="text-xs text-slate-300">1-Click generation from your 60-day verified challenge codebase</p>
            </div>
          </div>

          <button
            onClick={() => handleCopy(resumeMarkdown)}
            className="glass-button-primary px-5 py-3 text-xs font-bold flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 border-emerald-300/40"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4 text-emerald-200" />}
            <span>{copied ? 'Portfolio Specs Copied!' : 'Generate & Copy Markdown'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        {[
          { id: 'preview', label: 'Live Portfolio Preview', icon: <Globe className="w-4 h-4" /> },
          { id: 'resume', label: 'Generated Resume (Markdown)', icon: <FileText className="w-4 h-4" /> },
          { id: 'readme', label: 'GitHub README', icon: <GithubIcon className="w-4 h-4" /> },
          { id: 'linkedin', label: 'LinkedIn Post', icon: <LinkedinIcon className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === tab.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Panels */}
      {activeTab === 'preview' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl space-y-6">
          
          {/* Mock Glass Browser Frame */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 overflow-hidden">
            <div className="px-4 py-3 bg-slate-950 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-4 py-1 rounded-lg bg-slate-900 border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-2 w-64 justify-center">
                <Globe className="w-3 h-3 text-emerald-400" />
                <span>portfolio.{user.handle}.dev</span>
              </div>
              <div className="w-12" />
            </div>

            {/* Live Portfolio Preview Mockup */}
            <div className="p-8 space-y-8 bg-[#07090f] text-slate-100">
              <div className="flex items-center gap-4">
                <img src={user.avatar} className="w-14 h-14 rounded-2xl ring-2 ring-emerald-500/40 object-cover" />
                <div>
                  <h3 className="text-xl font-extrabold text-white">{user.name}</h3>
                  <p className="text-xs text-emerald-400 font-mono">{user.rank}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase mb-3">60-Day Verified Shipped Codebases</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedProjects.slice(0, 4).map(p => (
                    <div key={p.day} className="p-4 rounded-xl glass-panel border-white/10 bg-slate-950/60 space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-100">
                        <span>Day {p.day}: {p.title}</span>
                        <span className="text-emerald-400 font-mono">{p.codeReview?.overallScore || 92}/100</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{p.summary}</p>
                      <div className="flex gap-1.5 pt-1">
                        {p.stack.map(s => (
                          <span key={s} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-300 font-mono border border-white/5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'resume' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl relative">
          <button
            onClick={() => handleCopy(resumeMarkdown)}
            className="absolute top-6 right-6 glass-button px-3 py-1.5 text-xs text-emerald-300 border-emerald-500/30 flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" /> Copy Markdown
          </button>
          <pre className="p-6 rounded-2xl bg-slate-950 border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {resumeMarkdown}
          </pre>
        </div>
      )}

      {activeTab === 'linkedin' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl relative space-y-4">
          <button
            onClick={() => handleCopy(linkedinPost)}
            className="glass-button px-3 py-1.5 text-xs text-blue-300 border-blue-500/30 flex items-center gap-1.5 ml-auto"
          >
            <Copy className="w-3.5 h-3.5" /> Copy LinkedIn Post
          </button>
          <pre className="p-6 rounded-2xl bg-slate-950 border border-white/10 font-sans text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {linkedinPost}
          </pre>
        </div>
      )}

      {activeTab === 'readme' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl relative">
          <pre className="p-6 rounded-2xl bg-slate-950 border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {`# 🚀 ${user.name}'s 60-Day Developer Growth Challenge

[![Streak](https://img.shields.io/badge/Streak-${user.streakDays}_Days-amber)]()
[![XP](https://img.shields.io/badge/XP-${user.totalXP}-cyan)]()
[![Level](https://img.shields.io/badge/Level-${user.level}-indigo)]()

## 📌 Shipped Projects Overview
- **Day 18**: Kanban Board (Next.js 14, Supabase RLS, Tailwind)
- **Day 15**: Crypto Ticker (React, Recharts, WebSockets)
- **Day 10**: GitHub Insights (React, Chart.js)
- **Day 5**: Calculator (React, TypeScript)`}
          </pre>
        </div>
      )}

    </div>
  );
};
