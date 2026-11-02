import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Command, Sparkles } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Enter', action: 'Send message' },
    { key: 'Shift + Enter', action: 'New line in input' },
    { key: 'Ctrl + K  /  ⌘ + K', action: 'Create a brand new chat' },
    { key: 'Esc', action: 'Close active modals / sidebar' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md p-6 rounded-2xl glass-panel bg-slate-900 border border-slate-700/80 shadow-2xl z-10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
              <Command className="w-4 h-4 text-cyber-cyan" />
              <span>Keyboard Shortcuts</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5">
            {shortcuts.map((s, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs"
              >
                <span className="text-slate-300 font-medium">{s.action}</span>
                <kbd className="px-2 py-1 rounded bg-slate-800 text-cyber-cyan font-mono text-[11px] border border-slate-700/60 shadow-sm">
                  {s.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 font-mono">
              <Sparkles className="w-3 h-3 text-cyber-cyan" />
              <span>Power-user navigation</span>
            </span>
            <span>Aditya Personal AI</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
