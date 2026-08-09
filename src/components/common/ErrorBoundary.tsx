import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('NEURA60 ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('LocalStorage clear error:', e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-8 rounded-3xl glass-panel border border-cyan-500/40 bg-slate-950/95 text-center space-y-4 my-6 max-w-lg mx-auto shadow-2xl">
          <div className="text-amber-400 font-mono text-xs uppercase font-bold tracking-widest">Safe Recovery Active</div>
          <h3 className="text-xl font-extrabold text-white">Application Loaded in Safe Mode</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            A temporary display state was caught. Click below to refresh your developer workspace.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 rounded-xl text-xs font-semibold glass-button text-slate-300 hover:text-white"
            >
              Try Recovering Page
            </button>
            <button
              onClick={this.handleReset}
              className="px-5 py-2 rounded-xl text-xs font-bold glass-button-primary"
            >
              Reset Cache & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
