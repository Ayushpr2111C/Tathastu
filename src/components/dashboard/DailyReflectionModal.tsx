import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, X, Send } from 'lucide-react';

export const DailyReflectionModal: React.FC = () => {
  const { isReflectionModalOpen, closeReflectionModal, saveReflection, selectedChallenge } = useApp();

  const [learned, setLearned] = useState('');
  const [biggestChallenge, setBiggestChallenge] = useState('');
  const [hoursSpent, setHoursSpent] = useState<number>(3);

  if (!isReflectionModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveReflection({
      learned: learned || 'Built drag and drop Kanban column state synchronization using Next.js & Supabase RLS.',
      biggestChallenge: biggestChallenge || 'Handling optimistic UI updates while preserving database consistency on re-orders.',
      hoursSpent
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/40 bg-slate-950/95 max-w-lg w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Daily Reflection Journal</h3>
              <p className="text-xs text-slate-400">Day {selectedChallenge.day} • {selectedChallenge.title}</p>
            </div>
          </div>
          <button onClick={closeReflectionModal} className="p-1.5 rounded-lg glass-button text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="block text-slate-300 font-bold mb-1">1. What key concept did you learn today?</label>
            <textarea
              rows={2}
              value={learned}
              onChange={(e) => setLearned(e.target.value)}
              placeholder="e.g. Supabase Row Level Security & optimistic UI state..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500 font-sans"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">2. What was your biggest obstacle?</label>
            <textarea
              rows={2}
              value={biggestChallenge}
              onChange={(e) => setBiggestChallenge(e.target.value)}
              placeholder="e.g. Debugging CORS headers or TypeScript drag-and-drop types..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500 font-sans"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">3. Hours spent building ({hoursSpent} hours)</label>
            <input
              type="range"
              min={1}
              max={8}
              value={hoursSpent}
              onChange={(e) => setHoursSpent(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeReflectionModal}
              className="glass-button px-4 py-2.5 text-xs text-slate-300"
            >
              Skip
            </button>
            <button
              type="submit"
              className="glass-button-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400/40"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Save Journal & Article Draft</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
