import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Code2, Zap, TrendingUp } from 'lucide-react';
import type { SkillItem } from '../../types';

export const SkillHeatmapView: React.FC = () => {
  const { skills } = useApp();
  const [activeSkill, setActiveSkill] = useState<SkillItem>(skills[0]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-slate-950/80 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 bg-cyan-500/20 px-2.5 py-0.5 rounded-full border border-cyan-500/30 mb-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>SKILL HEATMAP & AI PROGRESS INSIGHTS</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Competency Radar & Analytics</h2>
            <p className="text-xs text-slate-400">Weekly consistency score (+18%) & technology XP growth</p>
          </div>

          <div className="glass-panel px-4 py-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-center gap-2 text-xs font-mono text-emerald-300">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Consistency: +18% this week</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Animated Skill Bars */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-950/90 space-y-6 shadow-2xl">
          <h3 className="text-base font-bold text-white mb-4">Competency Bars</h3>
          
          <div className="space-y-4">
            {skills.map((skill) => {
              const isSelected = activeSkill.id === skill.id;
              return (
                <div
                  key={skill.id}
                  onClick={() => setActiveSkill(skill)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    isSelected
                      ? 'glass-panel border-cyan-500/50 bg-slate-900/80 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                      : 'bg-slate-900/40 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${skill.color} text-white text-xs font-bold`}>
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-100">{skill.name}</h4>
                        <span className="text-[10px] font-mono text-slate-400">{skill.category} • {skill.projectsCount} Projects</span>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-cyan-300">LVL {skill.level}</div>
                      <div className="text-[10px] text-slate-400">{skill.xp} XP</div>
                    </div>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 rounded-full`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: Active Skill Deep Dive */}
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-slate-950/80 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Skill Deep Dive</span>
            <h3 className="text-xl font-extrabold text-white mt-1">{activeSkill.name}</h3>
            <p className="text-xs text-slate-400">{activeSkill.category}</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl glass-panel border-white/10 bg-slate-900/60 space-y-1">
              <span className="text-slate-400">Current Competency Rating</span>
              <div className="text-2xl font-extrabold text-cyan-300 font-mono">{activeSkill.level} / 100</div>
            </div>

            <div className="p-4 rounded-2xl glass-panel border-white/10 bg-slate-900/60 space-y-1">
              <span className="text-slate-400">Projects Shipped With Skill</span>
              <div className="text-xl font-extrabold text-purple-300 font-mono">{activeSkill.projectsCount} Verified Projects</div>
            </div>

            <div className="p-4 rounded-2xl glass-panel border-purple-500/30 bg-purple-500/10 space-y-1">
              <span className="text-purple-300 font-bold font-mono">NEXT RECOMMENDED MILESTONE</span>
              <p className="text-slate-200">{activeSkill.nextMilestone}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
