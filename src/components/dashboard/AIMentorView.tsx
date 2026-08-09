import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mentorRecommendation } from '../../data/mockData';
import { BrainCircuit, Sparkles, CheckCircle2, MessageSquare, RefreshCw, Send, Layers, Check } from 'lucide-react';

export const AIMentorView: React.FC = () => {
  const { setSelectedChallenge, challenges, setActiveTab } = useApp();
  const [recommendation, setRecommendation] = useState(mentorRecommendation);
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello Alex! I evaluated your recent React & Supabase projects. How can I optimize your next 60-day challenge?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleChooseAnother = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setRecommendation({
        projectTitle: 'Build an AI Resume & PDF Parser with FastAPI',
        stack: ['FastAPI', 'Python', 'Qdrant', 'OpenAI API'],
        difficulty: 'Advanced',
        estimatedHours: '4–5 hours',
        whyThisProject: [
          'High demand AI engineering skill in ATS parsing & structured output extraction.',
          'Connects Python backend APIs to your existing React frontend architecture.',
          'Introduces vector embeddings and similarity search.'
        ],
        skillGains: ['FastAPI Async Endpoints', 'OpenAI Structured Output', 'Vector Indexing'],
        prerequisites: ['Python basics', 'JSON API concepts']
      });
      setIsGenerating(false);
    }, 1200);
  };

  const handleAccept = () => {
    const kanbanChallenge = challenges.find(c => c.day === 18) || challenges[0];
    setSelectedChallenge(kanbanChallenge);
    setActiveTab('overview');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { 
          sender: 'ai', 
          text: `Great question! For "${userMsg}", I suggest focusing on Row Level Security policies first before handling client drag events.` 
        }
      ]);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-slate-950 to-indigo-950/40 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.4)]">
              <BrainCircuit className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-300 bg-purple-500/20 px-2.5 py-0.5 rounded-full border border-purple-500/30 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-spin-slow" />
                <span>NEURAL PROJECT MENTOR</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">AI Project Recommendation Engine</h2>
              <p className="text-xs text-slate-300">Analyzing commits, skill velocity, and career goals</p>
            </div>
          </div>

          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="glass-button px-4 py-2.5 text-xs font-semibold text-purple-300 border-purple-500/40 flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span>{chatOpen ? 'Hide Mentor Chat' : 'Ask AI Mentor'}</span>
          </button>
        </div>
      </div>

      {/* Main Spec Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-slate-950/80 space-y-6 relative shadow-2xl">
          
          {isGenerating ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin mx-auto" />
              <p className="text-xs font-mono text-purple-300">Synthesizing personalized project specifications...</p>
            </div>
          ) : (
            <>
              {/* Context Tag */}
              <div className="p-4 rounded-2xl glass-panel border border-indigo-500/30 bg-indigo-500/10 text-xs text-slate-200">
                <span className="font-bold text-indigo-300 font-mono">ANALYSIS: </span>
                "Based on your recent 17 completed challenges, your next optimal project is:"
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                  {recommendation.projectTitle}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {recommendation.difficulty}
                  </span>
                  <span>Est. Time: {recommendation.estimatedHours}</span>
                </div>
              </div>

              {/* Stack Badges */}
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Target Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.stack.map(s => (
                    <span key={s} className="px-3 py-1 rounded-xl text-xs font-semibold glass-panel border-white/10 text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Why This Project? */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Why This Project?</h4>
                <div className="space-y-2">
                  {recommendation.whyThisProject.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-slate-300 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleAccept}
                  className="glass-button-primary px-6 py-3 text-xs font-bold flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-cyan-200" />
                  <span>Accept Recommendation & Start</span>
                </button>

                <button
                  onClick={handleChooseAnother}
                  className="glass-button px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-slate-400" />
                  <span>Choose Another</span>
                </button>
              </div>
            </>
          )}

        </div>

        {/* Right Sidebar: Skill Gains & Interactive AI Chat */}
        <div className="space-y-6">
          
          {/* Expected Skill Gains */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-950/70 space-y-4">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Skill Level Ups</span>
            </h4>
            <div className="space-y-2">
              {recommendation.skillGains.map(skill => (
                <div key={skill} className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/20 text-xs font-semibold text-purple-300 flex items-center justify-between">
                  <span>{skill}</span>
                  <span className="text-[10px] font-mono text-emerald-400">+150 XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Chat Drawer */}
          {chatOpen && (
            <div className="glass-panel p-5 rounded-3xl border border-purple-500/40 bg-slate-950/90 space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 border-b border-white/10 pb-3">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                <span>AI Mentor Interactive Assistant</span>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-cyan-500/20 text-cyan-200 ml-6 border border-cyan-500/30'
                        : 'bg-slate-900 text-slate-300 mr-6 border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about specs, architecture..."
                  className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
                <button type="submit" className="glass-button p-2 text-purple-300">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
