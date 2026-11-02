import React from 'react';
import { Menu, Sparkles, Moon, Sun, User, Command } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { StatusIndicator } from '../visual/StatusIndicator';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenAboutModal: () => void;
  onOpenShortcutsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenAboutModal,
  onOpenShortcutsModal,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 px-4 border-b border-slate-800/80 glass-panel flex items-center justify-between z-20 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile / Sidebar toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
          title="Toggle Sidebar"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyber-cyan via-cyber-violet to-cyber-pink p-[1px] shadow-glow-cyan">
            <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-pink">
                Aditya
              </span>
              <span className="font-bold text-sm tracking-tight text-white">
                Personal AI
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/40 shadow-sm hidden sm:inline-block font-semibold">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-normal hidden md:block">
              Get to know Aditya, powered by AI
            </p>
          </div>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Backend / Status indicator */}
        <StatusIndicator />

        {/* Explore Portfolio / About Aditya */}
        <button
          onClick={onOpenAboutModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 text-xs font-medium transition-all hover:border-cyber-cyan/40 shadow-sm"
        >
          <User className="w-3.5 h-3.5 text-cyber-cyan" />
          <span className="hidden sm:inline">About Aditya</span>
        </button>

        {/* Keyboard Shortcuts Trigger */}
        <button
          onClick={onOpenShortcutsModal}
          className="hidden md:flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50 transition-colors"
          title="Keyboard shortcuts (Ctrl+K)"
          aria-label="Keyboard Shortcuts"
        >
          <Command className="w-4 h-4" />
        </button>

        {/* Theme Toggle (Dark default, optional Light) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50 transition-colors"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>
      </div>
    </header>
  );
};
