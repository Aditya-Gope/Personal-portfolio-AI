import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SUGGESTED_PROMPTS } from '../../data/suggestedPrompts';
import { useChat } from '../../context/ChatContext';
import { AiOrb } from '../visual/AiOrb';
import { AnimatedName } from '../visual/AnimatedName';
import {
  Terminal,
  Cpu,
  FolderGit2,
  Brain,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Code2,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-4 h-4 text-emerald-400" />,
  Cpu: <Cpu className="w-4 h-4 text-cyber-cyan" />,
  FolderGit2: <FolderGit2 className="w-4 h-4 text-cyber-violet" />,
  Brain: <Brain className="w-4 h-4 text-cyber-pink" />,
  GraduationCap: <GraduationCap className="w-4 h-4 text-amber-400" />,
  Sparkles: <Sparkles className="w-4 h-4 text-yellow-400" />,
};

export const WelcomeScreen: React.FC = () => {
  const { sendMessage, isStreaming } = useChat();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'AI & ML' },
    { id: 'education', label: 'Education' },
    { id: 'hire', label: 'Why Hire?' },
  ];

  const filteredPrompts =
    selectedCategory === 'all'
      ? SUGGESTED_PROMPTS
      : SUGGESTED_PROMPTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-6 sm:pt-10 pb-36 flex flex-col items-center text-center relative z-10">
      {/* Top Tagline Badge */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyber-cyan/40 text-cyber-cyan text-[11px] font-mono tracking-wider shadow-glow-cyan mb-4"
      >
        <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
        <span className="font-semibold">AUTONOMOUS RESUME INTELLIGENCE</span>
      </motion.div>

      {/* Visual Glowing AI Orb */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-2"
      >
        <AiOrb size="sm" isPulsing={false} />
      </motion.div>

      {/* Brand Title with Animated Name */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-1 mb-5"
      >
        <AnimatedName />

        <p className="text-slate-400 text-sm sm:text-base font-normal max-w-md mx-auto pt-1">
          "Get to know Aditya, powered by AI."
        </p>
      </motion.div>

      {/* Welcome Banner Card */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-panel rounded-2xl p-4 sm:p-5 mb-5 max-w-xl w-full text-left shadow-xl border border-slate-700/60 transition-all hover:border-cyber-cyan/40 hover:shadow-glow-cyan"
      >
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyber-cyan/20 to-cyber-violet/20 border border-cyber-cyan/40 text-cyber-cyan shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5 text-cyber-cyan" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 mb-1">
              Hey! I'm Aditya's AI assistant.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Ask me anything about his technical skills, featured projects, production FastAPI experience, or academic background. I'm connected directly to his live resume intelligence engine.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Category Filter Pills */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="flex flex-wrap items-center justify-center gap-1.5 mb-5"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-cyber-cyan/25 text-cyber-cyan border border-cyber-cyan/60 shadow-glow-cyan font-semibold scale-105'
                : 'bg-slate-900/70 text-slate-400 hover:text-slate-100 border border-slate-800 hover:border-slate-700 hover:scale-102'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Suggested Prompts Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full text-left"
      >
        {filteredPrompts.map((item) => (
          <InteractivePromptCard
            key={item.id}
            item={item}
            isStreaming={isStreaming}
            onSelect={() => sendMessage(item.prompt)}
          />
        ))}
      </motion.div>
    </div>
  );
};

const InteractivePromptCard: React.FC<{
  item: any;
  isStreaming: boolean;
  onSelect: () => void;
}> = ({ item, isStreaming, onSelect }) => {
  return (
    <button
      disabled={isStreaming}
      onClick={onSelect}
      className="group p-4 rounded-xl glass-card text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:border-cyber-cyan/60 hover:bg-slate-800/90 disabled:opacity-50 relative overflow-hidden flex flex-col justify-between shadow-md cursor-pointer"
    >
      {/* Dynamic top ambient glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/10 via-transparent to-cyber-violet/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
        <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 group-hover:border-cyber-cyan/40 group-hover:shadow-glow-cyan transition-all">
          {iconMap[item.icon] || <Code2 className="w-4 h-4 text-cyber-cyan" />}
        </div>
        {item.badge && (
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-400 border border-slate-700/60 group-hover:text-cyber-cyan group-hover:border-cyber-cyan/40 transition-colors">
            {item.badge}
          </span>
        )}
      </div>

      <div className="relative z-10">
        <h4 className="text-xs font-bold text-slate-200 mb-1 group-hover:text-white transition-colors">
          {item.title}
        </h4>
        <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors line-clamp-2 leading-relaxed">
          "{item.prompt}"
        </p>
      </div>

      <div className="mt-3 flex items-center justify-end text-[11px] font-semibold text-cyber-cyan opacity-80 group-hover:opacity-100 transition-opacity relative z-10">
        <span>Ask Assistant</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </button>
  );
};
