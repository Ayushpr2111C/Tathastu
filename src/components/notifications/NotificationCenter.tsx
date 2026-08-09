import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, X, Flame, BrainCircuit, Award, CheckCircle2, ShieldAlert } from 'lucide-react';
import type { NotificationItem } from '../../types';

export const NotificationCenter: React.FC = () => {
  const { notifications, isNotificationCenterOpen, toggleNotificationCenter, markNotificationRead } = useApp();

  if (!isNotificationCenterOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'streak': return <Flame className="w-4 h-4 text-amber-400" />;
      case 'mentor': return <BrainCircuit className="w-4 h-4 text-purple-400" />;
      case 'badge': return <Award className="w-4 h-4 text-cyan-400" />;
      case 'review': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default: return <ShieldAlert className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#090c14] border-l border-white/10 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">Notifications</h3>
                <p className="text-xs text-slate-400">Contextual alerts & AI progress updates</p>
              </div>
            </div>
            <button
              onClick={toggleNotificationCenter}
              className="p-1.5 rounded-lg glass-button text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                No notifications right now. Keep building!
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markNotificationRead(item.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    item.read
                      ? 'bg-slate-900/40 border-white/5 opacity-70'
                      : 'glass-panel border-cyan-500/30 bg-slate-900/80 shadow-lg'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-800/80 border border-white/10 mt-0.5">
                      {getIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-slate-200 truncate">{item.title}</h4>
                        <span className="text-[10px] text-slate-500 font-mono">{item.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10">
          <button
            onClick={toggleNotificationCenter}
            className="w-full glass-button py-2.5 text-xs text-slate-300 hover:text-white"
          >
            Close Notifications
          </button>
        </div>

      </div>
    </div>
  );
};
