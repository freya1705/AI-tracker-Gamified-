import React, { Component, ErrorInfo, ReactNode } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#faf7f5] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white shadow-xl border border-slate-200">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-amber-300 shadow-md">
              <img src="/character.png" alt="Freya" className="w-full h-full object-cover object-top scale-125" />
            </div>
            <h2 className="text-xl font-black text-slate-800 font-display mb-2">
              Freya is dusting off the dashboard! ✨
            </h2>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              We just upgraded the system with the 12 Worlds, Milestone Calendar, and AI Missions. Let's refresh with the fresh data!
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs shadow-md shadow-indigo-200 cursor-pointer"
            >
              Load Fresh AI Hero Dashboard 🚀
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
