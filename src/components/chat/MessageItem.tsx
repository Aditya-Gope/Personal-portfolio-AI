import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Message } from '../../types/chat';
import { MarkdownContent } from './MarkdownContent';
import { Bot, User, Copy, Check, RotateCcw, AlertTriangle } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useToast } from '../ui/Toast';

interface MessageItemProps {
  message: Message;
  isLatest: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, isLatest }) => {
  const { regenerateResponse, isStreaming } = useChat();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const isAssistant = message.role === 'assistant';
  const isMessageStreaming = message.status === 'streaming';
  const hasError = message.status === 'error';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      showToast('Response copied to clipboard', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Failed to copy message', 'error');
    }
  };

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(message.timestamp);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`group w-full py-3.5 px-4 transition-colors ${
        isAssistant ? 'bg-transparent' : 'bg-transparent'
      }`}
    >
      <div className="max-w-3xl mx-auto flex items-start gap-3.5">
        {/* Avatar */}
        <div className="shrink-0 mt-0.5">
          {isAssistant ? (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyber-cyan via-cyber-violet to-cyber-pink p-[1px] shadow-glow-cyan">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Bot className="w-4 h-4 text-cyber-cyan" />
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <User className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Bubble & Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              {isAssistant ? 'Aditya AI' : 'You'}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              {formattedTime}
            </span>
            {isMessageStreaming && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 animate-pulse font-mono">
                Streaming
              </span>
            )}
          </div>

          {/* Message Body */}
          <div
            className={`rounded-2xl text-[15px] ${
              isAssistant
                ? 'text-slate-100 pr-2'
                : 'bg-surface-800/80 border border-slate-700/60 p-4 rounded-tl-sm text-slate-100 shadow-sm max-w-[85%]'
            }`}
          >
            {hasError ? (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-rose-300 mb-1">Response Generation Failed</p>
                  <p className="text-rose-200/90 text-xs">{message.error || 'Connection error. Please try again.'}</p>
                  <button
                    onClick={regenerateResponse}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 text-xs font-medium transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Retry Generation
                  </button>
                </div>
              </div>
            ) : isAssistant ? (
              <MarkdownContent content={message.content} isStreaming={isMessageStreaming} />
            ) : (
              <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
            )}
          </div>

          {/* Assistant Action Bar */}
          {isAssistant && !isMessageStreaming && !hasError && message.content && (
            <div className="flex items-center gap-1.5 mt-2.5 text-slate-400 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                title="Copy response"
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg hover:bg-slate-800/80 hover:text-slate-200 border border-transparent hover:border-slate-700/60 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {isLatest && !isStreaming && (
                <button
                  onClick={regenerateResponse}
                  title="Regenerate response"
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg hover:bg-slate-800/80 hover:text-slate-200 border border-transparent hover:border-slate-700/60 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>
              )}
            </div>
          )}

          {/* Follow-up suggestions */}
          {isAssistant && !isMessageStreaming && message.suggestedFollowUps && message.suggestedFollowUps.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-slate-800/70 flex flex-wrap gap-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 w-full mb-1">
                Suggested Follow-ups
              </span>
              {message.suggestedFollowUps.map((prompt, idx) => (
                <FollowUpChip key={idx} prompt={prompt} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const FollowUpChip: React.FC<{ prompt: string }> = ({ prompt }) => {
  const { sendMessage, isStreaming } = useChat();

  return (
    <button
      disabled={isStreaming}
      onClick={() => sendMessage(prompt)}
      className="text-xs px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyber-cyan border border-slate-800 hover:border-cyber-cyan/40 transition-all text-left disabled:opacity-50"
    >
      {prompt}
    </button>
  );
};
