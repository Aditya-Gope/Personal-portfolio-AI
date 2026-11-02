import React from 'react';
import { useChat } from '../../context/ChatContext';
import { RefreshCw, Server } from 'lucide-react';

export const StatusIndicator: React.FC = () => {
  const { connectionStatus, refreshConnection } = useChat();

  return (
    <div className="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono glass-card bg-surface-900/60 border border-slate-700/50 shadow-sm">
      <div className="relative flex items-center justify-center">
        {connectionStatus.checking ? (
          <RefreshCw className="w-3 h-3 text-cyber-cyan animate-spin" />
        ) : connectionStatus.online ? (
          <>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute inline-flex opacity-75" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 relative inline-flex" />
          </>
        ) : (
          <span className="w-2 h-2 rounded-full bg-amber-400" />
        )}
      </div>

      <span className="text-slate-300 font-medium hidden sm:inline">
        {connectionStatus.checking
          ? 'Connecting...'
          : connectionStatus.online
          ? 'FastAPI Active'
          : 'AI Engine Ready'}
      </span>

      <button
        onClick={refreshConnection}
        title={`Status: ${connectionStatus.message || 'Ready'} - Click to check backend`}
        className="text-slate-400 hover:text-slate-200 p-0.5 rounded transition-colors"
      >
        <Server className="w-3 h-3" />
      </button>
    </div>
  );
};
