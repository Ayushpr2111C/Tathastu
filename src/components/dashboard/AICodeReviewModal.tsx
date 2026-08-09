import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ChevronDown, ChevronUp, Sparkles, X, Code2, AlertTriangle, ArrowRight, FileCode, Paperclip } from 'lucide-react';

export const AICodeReviewModal: React.FC = () => {
  const { isCodeReviewModalOpen, closeCodeReviewModal, activeCodeReview, selectedChallenge } = useApp();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [previewFileId, setPreviewFileId] = useState<string | null>(null);

  if (!isCodeReviewModalOpen || !activeCodeReview) return null;

  const categories = [
    { label: 'Code Quality', score: activeCodeReview.quality, color: 'from-cyan-500 to-blue-500' },
    { label: 'Documentation', score: activeCodeReview.documentation, color: 'from-purple-500 to-indigo-500' },
    { label: 'Project Structure', score: activeCodeReview.structure, color: 'from-emerald-500 to-teal-500' },
    { label: 'README & Specs', score: activeCodeReview.readme, color: 'from-amber-500 to-orange-500' },
  ];

  const uploadedFiles = selectedChallenge.uploadedFiles || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-slate-950/95 max-w-2xl w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">AI Code Review Report</h3>
              <p className="text-xs text-slate-400">Day {selectedChallenge.day} • {selectedChallenge.title}</p>
            </div>
          </div>
          <button onClick={closeCodeReviewModal} className="p-1.5 rounded-lg glass-button text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overall Score Banner */}
        <div className="p-6 rounded-2xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">Architectural Verification</div>
            <h4 className="text-2xl font-extrabold text-white">Verified Production Ready</h4>
            <p className="text-xs text-slate-400 mt-1">Full-stack components pass structural & security linting.</p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 min-w-[100px]">
            <span className="text-3xl font-extrabold font-mono text-cyan-300">
              {activeCodeReview.overallScore}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">OUT OF 100</span>
          </div>
        </div>

        {/* Category Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat.label} className="p-4 rounded-2xl glass-panel border-white/5 bg-slate-900/60 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-200">
                <span>{cat.label}</span>
                <span className="font-mono text-cyan-400">{cat.score}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-1000 rounded-full`}
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Uploaded Files Section */}
        {uploadedFiles.length > 0 && (
          <div className="p-4 rounded-2xl glass-panel border border-emerald-500/30 bg-emerald-950/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <Paperclip className="w-4 h-4" />
              <span>Uploaded Work Files ({uploadedFiles.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map(file => (
                <button
                  key={file.id}
                  onClick={() => setPreviewFileId(previewFileId === file.id ? null : file.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-2 border transition ${
                    previewFileId === file.id ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400' : 'bg-slate-900 text-slate-300 border-white/10'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{file.name}</span>
                </button>
              ))}
            </div>

            {/* Selected File Code Content Preview */}
            {previewFileId && (
              <div className="pt-2">
                {uploadedFiles.filter(f => f.id === previewFileId).map(file => (
                  <pre key={file.id} className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 font-mono text-[11px] text-cyan-300 overflow-x-auto max-h-40">
                    {file.content || `[Binary File: ${file.name} (${file.size})]`}
                  </pre>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AI Recommendations Accordion */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">AI Suggestions & Recommendations</h4>
          
          <div className="space-y-2">
            {activeCodeReview.suggestions.map((item, idx) => {
              const isExpanded = expandedIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 glass-panel bg-slate-900/50 overflow-hidden transition"
                >
                  <button
                    onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-3">
                      {item.type === 'critical' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      ) : item.type === 'praise' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                      )}
                      <span className="text-xs font-bold text-slate-200">{item.title}</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 text-xs text-slate-300 space-y-2 border-t border-white/5 pt-3">
                      <p className="leading-relaxed">{item.description}</p>
                      {item.codeSnippet && (
                        <pre className="p-3 rounded-xl bg-slate-950 border border-white/10 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                          {item.codeSnippet}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={closeCodeReviewModal}
            className="glass-button-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2"
          >
            <span>Continue Journey</span>
            <ArrowRight className="w-4 h-4 text-cyan-200" />
          </button>
        </div>

      </div>
    </div>
  );
};
