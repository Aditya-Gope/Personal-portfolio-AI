import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 py-3 px-4 max-w-3xl mx-auto w-full">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyber-cyan to-cyber-violet flex items-center justify-center shrink-0 shadow-glow-cyan text-white">
        <Bot className="w-4 h-4" />
      </div>

      <div className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Aditya AI
          </span>
          <span className="text-[10px] text-cyber-cyan font-mono animate-pulse">
            Thinking...
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl rounded-tl-sm glass-card bg-slate-900/60 border border-slate-800 w-fit">
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
            className="w-2 h-2 rounded-full bg-cyber-cyan shadow-sm"
          />
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 rounded-full bg-cyber-violet shadow-sm"
          />
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 rounded-full bg-cyber-pink shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};
