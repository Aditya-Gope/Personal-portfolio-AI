import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { MessageItem } from './MessageItem';
import { TypingIndicator } from './TypingIndicator';
import { WelcomeScreen } from './WelcomeScreen';
import { ArrowDown } from 'lucide-react';

export const ChatContainer: React.FC = () => {
  const { activeConversation, isStreaming, isWaitingFirstChunk } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const messages = activeConversation?.messages || [];

  // Auto-scroll to bottom on incoming message/chunks
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    // If user is near bottom, keep auto-scrolling
    if (!showScrollBottom) {
      scrollToBottom(isStreaming ? 'auto' : 'smooth');
    }
  }, [messages, isStreaming, isWaitingFirstChunk]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollBottom(distanceToBottom > 120);
  };

  if (!activeConversation || messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto relative w-full flex flex-col">
        <WelcomeScreen />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto relative flex flex-col pt-4 pb-2 scroll-smooth"
    >
      <div className="flex-1 flex flex-col">
        {messages.map((message, idx) => {
          // If assistant message is currently empty and waiting for first chunk, don't show empty bubble yet
          if (message.role === 'assistant' && !message.content && isWaitingFirstChunk) {
            return null;
          }
          return (
            <MessageItem
              key={message.id}
              message={message}
              isLatest={idx === messages.length - 1}
            />
          );
        })}

        {/* Show typing indicator while waiting for the first chunk */}
        {isWaitingFirstChunk && <TypingIndicator />}

        <div ref={messagesEndRef} className="h-4 shrink-0" />
      </div>

      {/* Floating Scroll to Bottom Button */}
      {showScrollBottom && (
        <button
          onClick={() => scrollToBottom('smooth')}
          className="fixed bottom-24 right-8 z-30 p-2.5 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 hover:text-white shadow-xl hover:bg-slate-700/90 transition-all hover:scale-105"
          title="Scroll to bottom"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
