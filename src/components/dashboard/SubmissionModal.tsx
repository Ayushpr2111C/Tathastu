import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { CheckCircle2, Sparkles, X, ArrowRight, ShieldCheck, Upload, FileCode, Trash2, Code } from 'lucide-react';
import type { UploadedFileItem } from '../../types';

export const SubmissionModal: React.FC = () => {
  const { isSubmissionModalOpen, closeSubmissionModal, selectedChallenge, submitChallengeWork, user } = useApp();
  
  const [githubUrl, setGithubUrl] = useState(
    selectedChallenge.repoUrl || `https://github.com/${user.githubUsername}/day-${selectedChallenge.day}-challenge`
  );
  const [linkedinUrl, setLinkedinUrl] = useState(
    selectedChallenge.liveUrl || `https://linkedin.com/posts/${user.handle}-day-${selectedChallenge.day}`
  );
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([]);
  const [snippetCode, setSnippetCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'verifying' | 'success'>('form');

  if (!isSubmissionModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileList = Array.from(e.target.files);
    
    fileList.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const textContent = typeof event.target?.result === 'string' ? event.target.result : undefined;
        const newFile: UploadedFileItem = {
          id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          type: file.type || file.name.split('.').pop() || 'file',
          content: textContent
        };
        setUploadedFiles(prev => [...prev, newFile]);
      };
      reader.readAsText(file);
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStep('verifying');

    const finalFiles = [...uploadedFiles];
    if (snippetCode.trim()) {
      finalFiles.push({
        id: Date.now().toString(),
        name: `day_${selectedChallenge.day}_solution.tsx`,
        size: `${(snippetCode.length / 1024).toFixed(1)} KB`,
        type: 'tsx',
        content: snippetCode
      });
    }

    // Simulate multi-stage AI verification pipeline
    setTimeout(async () => {
      setStep('success');
      setTimeout(async () => {
        await submitChallengeWork(githubUrl, linkedinUrl, finalFiles);
        setIsSubmitting(false);
        setStep('form');
        setUploadedFiles([]);
        setSnippetCode('');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-slate-950/95 max-w-xl w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Project Work Submission</h3>
              <p className="text-xs text-slate-400">Day {selectedChallenge.day} • {selectedChallenge.title}</p>
            </div>
          </div>
          <button onClick={closeSubmissionModal} className="p-1.5 rounded-lg glass-button text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'verifying' ? (
          <div className="py-12 text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
              <ShieldCheck className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <h4 className="text-base font-bold text-slate-100">Running AI Code & File Verification...</h4>
            <p className="text-xs text-slate-400 font-mono">Analyzing uploaded project code, checking commits & static linting score</p>
          </div>
        ) : step === 'success' ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h4 className="text-lg font-extrabold text-emerald-300">Challenge Verified & Shipped!</h4>
            <p className="text-xs text-slate-300 font-mono">+{selectedChallenge.xpReward} XP Awarded • Code Review Ready</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* File & Code Upload Dropzone */}
            <div className="p-4 rounded-2xl glass-panel border border-dashed border-cyan-500/40 bg-cyan-950/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <Upload className="w-4 h-4 text-cyan-400" />
                  <span>Upload Project Code or ZIP</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">ZIP, JS, TSX, PY, JSON</span>
              </div>

              <label className="flex flex-col items-center justify-center p-4 border border-white/10 rounded-xl bg-slate-950/60 hover:bg-slate-900 cursor-pointer transition">
                <FileCode className="w-6 h-6 text-cyan-400 mb-1" />
                <span className="text-xs font-semibold text-slate-300">Click to select files or drag & drop</span>
                <span className="text-[10px] text-slate-500">All code files are parsed and reviewed by AI</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Attached Work Files ({uploadedFiles.length})</div>
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="p-2 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <FileCode className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="font-mono text-slate-200 truncate">{file.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({file.size})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Snippet Paste Box */}
            <div className="p-4 rounded-2xl glass-panel border-white/10 bg-slate-900/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <Code className="w-4 h-4 text-purple-400" />
                <span>Or Paste Code Snippet Directly</span>
              </div>
              <textarea
                rows={3}
                value={snippetCode}
                onChange={(e) => setSnippetCode(e.target.value)}
                placeholder="// Paste main component or function code here..."
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 font-mono text-xs text-cyan-300 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* GitHub Connection Status */}
            <div className="p-4 rounded-2xl glass-panel border-white/10 bg-slate-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4 text-slate-200" />
                  <span className="text-xs font-bold text-slate-200">GitHub Repository Link</span>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" /> Sync Ready
                </span>
              </div>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                required
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                placeholder="https://github.com/username/repo"
              />
            </div>

            {/* LinkedIn Sync */}
            <div className="p-4 rounded-2xl glass-panel border-white/10 bg-slate-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkedinIcon className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-slate-200">LinkedIn Updates Sync</span>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" /> Sync Ready
                </span>
              </div>
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                placeholder="https://linkedin.com/posts/..."
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeSubmissionModal}
                className="glass-button px-4 py-2.5 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="glass-button-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2"
              >
                <span>Submit Today's Work</span>
                <ArrowRight className="w-4 h-4 text-cyan-200" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
