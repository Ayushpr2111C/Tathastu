import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FolderKanban, 
  Clock, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Info
} from 'lucide-react';

export const TodayChallengeCard: React.FC = () => {
  const { selectedChallenge, challenges, openSubmissionModal } = useApp();
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const activeChallenge = selectedChallenge || challenges.find(c => c.status === 'current') || challenges[0];
  if (!activeChallenge) return null;

  const isCompleted = activeChallenge.status === 'completed';

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-slate-950/70 relative overflow-hidden shadow-2xl">
      
      {/* Background Neon Accent Gradient */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              DAY {activeChallenge.day} CHALLENGE
            </span>
            <span className="text-xs font-mono text-slate-400">{activeChallenge.difficulty}</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {activeChallenge.estimatedHours}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {activeChallenge.title}
          </h3>

          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            {activeChallenge.description}
          </p>
        </div>

        {/* XP Badge */}
        <div className="glass-panel px-4 py-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-center gap-3 flex-shrink-0">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-amber-200/80 uppercase">Reward</div>
            <div className="text-base font-extrabold text-amber-300 font-mono">+{activeChallenge.xpReward} XP</div>
          </div>
        </div>
      </div>

      {/* Tech Stack & Action buttons */}
      <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        
        {/* Stack Tags */}
        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Required Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {(activeChallenge.stack || []).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-xl text-xs font-medium glass-panel border-white/10 text-cyan-300 bg-slate-900/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          
          <button
            onClick={() => setShowDetailsModal(true)}
            className="glass-button px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2"
          >
            <Info className="w-4 h-4 text-cyan-400" />
            <span>View Details</span>
          </button>

          <button
            onClick={() => openSubmissionModal(activeChallenge)}
            className={`glass-button-primary px-6 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 ${
              isCompleted ? 'bg-gradient-to-r from-emerald-500 to-teal-600 border-emerald-300/40' : ''
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>View AI Review</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Submit Work</span>
                <ArrowRight className="w-4 h-4 text-cyan-200" />
              </>
            )}
          </button>

        </div>

      </div>

      {/* Challenge Spec Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-slate-950/90 max-w-xl w-full shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <FolderKanban className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Day {activeChallenge.day}: {activeChallenge.title}</h3>
              </div>
              <button onClick={() => setShowDetailsModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <h4 className="font-bold text-white mb-1">Project Brief</h4>
                <p className="leading-relaxed">{activeChallenge.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">Key Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-400 text-xs font-mono">
                  <li>Implement responsive layout using Tailwind CSS.</li>
                  <li>Enable clean state management and error handling.</li>
                  <li>Sync state changes with project backend.</li>
                  <li>Include clean README documentation.</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="glass-button px-4 py-2 text-xs text-slate-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  openSubmissionModal(activeChallenge);
                }}
                className="glass-button-primary px-5 py-2 text-xs font-bold"
              >
                Start Submission
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
