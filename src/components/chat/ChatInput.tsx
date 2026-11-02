import React, { useRef, useEffect, useState } from 'react';
import { Send, Square, Sparkles } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const ChatInput: React.FC = () => {
  const { sendMessage, isStreaming, stopGeneration } = useChat();
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-resize textarea height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }, [text]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || isStreaming) return;
    const promptToSend = text;
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    sendMessage(promptToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 pt-2 relative z-20">
      <div className="relative glass-input rounded-2xl shadow-2xl transition-all border border-slate-700/80 focus-within:border-cyber-cyan/60 focus-within:ring-2 focus-within:ring-cyber-cyan/30">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Aditya's AI anything (e.g. 'Does Aditya know Python?' or 'Tell me about his projects')..."
          rows={1}
          disabled={false}
          className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm sm:text-base px-4 py-3.5 pr-24 resize-none outline-none max-h-44 min-h-[52px] leading-relaxed"
        />

        {/* Action Button: Send or Stop */}
        <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1.5">
          {isStreaming ? (
            <button
              onClick={stopGeneration}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Stop Generation"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              onClick={() => handleSubmit()}
              disabled={!text.trim()}
              type="button"
              className="p-2 rounded-xl bg-gradient-to-tr from-cyber-cyan via-cyber-violet to-cyber-pink text-white shadow-glow-cyan transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 disabled:shadow-none"
              title="Send message (Enter)"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Footer shortcut helper */}
      <div className="flex items-center justify-between px-2 pt-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyber-cyan/70" />
          <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">Enter</kbd> to send, <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">Shift + Enter</kbd> for new line</span>
        </div>
        <span className="hidden sm:inline font-mono text-[10px]">Aditya Personal AI v1.0</span>
      </div>
    </div>
  );
};
