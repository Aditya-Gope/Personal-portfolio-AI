import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from 'react';
import type { Conversation, Message } from '../types/chat';
import { streamChatResponse, checkBackendHealth } from '../services/api';

interface ChatContextType {
  conversations: Conversation[];
  activeId: string | null;
  activeConversation: Conversation | null;
  isStreaming: boolean;
  isWaitingFirstChunk: boolean;
  streamingMessageId: string | null;
  connectionStatus: {
    online: boolean;
    checking: boolean;
    message?: string;
  };
  sendMessage: (text: string) => Promise<void>;
  stopGeneration: () => void;
  regenerateResponse: () => void;
  createNewChat: () => string;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  clearAllConversations: () => void;
  renameConversation: (id: string, newTitle: string) => void;
  retryLastMessage: () => void;
  refreshConnection: () => Promise<void>;
}

const STORAGE_KEY = 'aditya_ai_conversations_v2';
const ACTIVE_ID_KEY = 'aditya_ai_active_conv_id';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved conversations', e);
    }
    return [];
  });

  const [activeId, setActiveId] = useState<string | null>(() => {
    const savedActive = localStorage.getItem(ACTIVE_ID_KEY);
    return savedActive || null;
  });

  const [isStreaming, setIsStreaming] = useState(false);
  const [isWaitingFirstChunk, setIsWaitingFirstChunk] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<{ online: boolean; checking: boolean; message?: string }>({
    online: false,
    checking: true,
    message: 'Checking backend...',
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync conversations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch (e) {
      console.error('Failed to save conversations to localStorage', e);
    }
  }, [conversations]);

  // Sync activeId to localStorage
  useEffect(() => {
    if (activeId) {
      localStorage.setItem(ACTIVE_ID_KEY, activeId);
    } else {
      localStorage.removeItem(ACTIVE_ID_KEY);
    }
  }, [activeId]);

  // Periodic and initial backend health check
  const refreshConnection = async () => {
    setConnectionStatus((prev) => ({ ...prev, checking: true }));
    const health = await checkBackendHealth();
    setConnectionStatus({
      online: health.online,
      checking: false,
      message: health.message,
    });
  };

  useEffect(() => {
    refreshConnection();
    const interval = setInterval(refreshConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  // Compute active conversation
  const activeConversation = useMemo(() => {
    if (!activeId) return null;
    return conversations.find((c) => c.id === activeId) || null;
  }, [conversations, activeId]);

  // Create a brand new chat
  const createNewChat = (): string => {
    if (isStreaming) {
      stopGeneration();
    }
    const newId = generateId();
    const newConv: Conversation = {
      id: newId,
      title: 'New Conversation',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveId(newId);
    return newId;
  };

  const selectConversation = (id: string) => {
    if (isStreaming) {
      stopGeneration();
    }
    setActiveId(id);
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (activeId === id) {
        setActiveId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  };

  const clearAllConversations = () => {
    if (isStreaming) {
      stopGeneration();
    }
    setConversations([]);
    setActiveId(null);
  };

  const renameConversation = (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle.trim(), updatedAt: Date.now() } : c))
    );
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setIsWaitingFirstChunk(false);
    if (streamingMessageId) {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id !== activeId) return conv;
          return {
            ...conv,
            messages: conv.messages.map((m) =>
              m.id === streamingMessageId ? { ...m, status: 'complete' } : m
            ),
          };
        })
      );
      setStreamingMessageId(null);
    }
  };

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || isStreaming) return;

    let targetConvId = activeId;
    let isBrandNew = false;

    // If no active conversation exists, auto-create one
    if (!targetConvId || !conversations.some((c) => c.id === targetConvId)) {
      targetConvId = generateId();
      isBrandNew = true;
      const newConv: Conversation = {
        id: targetConvId,
        title: text.length > 32 ? `${text.slice(0, 32)}...` : text,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        messages: [],
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveId(targetConvId);
    }

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
      status: 'complete',
    };

    const assistantMessageId = generateId();
    const assistantPlaceholder: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      status: 'streaming',
    };

    // Update conversation with user message and empty streaming assistant message
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== targetConvId) return conv;
        const currentMessages = conv.messages;
        const shouldUpdateTitle = isBrandNew || currentMessages.length === 0;
        return {
          ...conv,
          title: shouldUpdateTitle
            ? text.length > 32
              ? `${text.slice(0, 32)}...`
              : text
            : conv.title,
          updatedAt: Date.now(),
          messages: [...currentMessages, userMessage, assistantPlaceholder],
        };
      })
    );

    setIsStreaming(true);
    setIsWaitingFirstChunk(true);
    setStreamingMessageId(assistantMessageId);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Retrieve conversation history for context
    const currentConv = conversations.find((c) => c.id === targetConvId);
    const history = currentConv ? [...currentConv.messages, userMessage] : [userMessage];

    await streamChatResponse(text, history, controller.signal, {
      onChunk: (chunk: string) => {
        setIsWaitingFirstChunk(false);
        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id !== targetConvId) return conv;
            return {
              ...conv,
              updatedAt: Date.now(),
              messages: conv.messages.map((m) =>
                m.id === assistantMessageId
                  ? { ...m, content: m.content + chunk, status: 'streaming' }
                  : m
              ),
            };
          })
        );
      },
      onComplete: (fullText: string, followUps?: string[]) => {
        setIsStreaming(false);
        setIsWaitingFirstChunk(false);
        setStreamingMessageId(null);
        abortControllerRef.current = null;
        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id !== targetConvId) return conv;
            return {
              ...conv,
              updatedAt: Date.now(),
              messages: conv.messages.map((m) =>
                m.id === assistantMessageId
                  ? {
                      ...m,
                      content: fullText,
                      status: 'complete',
                      suggestedFollowUps: followUps,
                    }
                  : m
              ),
            };
          })
        );
      },
      onError: (error: Error) => {
        setIsStreaming(false);
        setIsWaitingFirstChunk(false);
        setStreamingMessageId(null);
        abortControllerRef.current = null;

        // Don't show error state if intentionally stopped by user
        if (error.message.includes('stopped by user')) {
          setConversations((prev) =>
            prev.map((conv) => {
              if (conv.id !== targetConvId) return conv;
              return {
                ...conv,
                messages: conv.messages.map((m) =>
                  m.id === assistantMessageId ? { ...m, status: 'complete' } : m
                ),
              };
            })
          );
          return;
        }

        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id !== targetConvId) return conv;
            return {
              ...conv,
              messages: conv.messages.map((m) =>
                m.id === assistantMessageId
                  ? {
                      ...m,
                      status: 'error',
                      error: error.message || 'Failed to generate response. Please retry.',
                    }
                  : m
              ),
            };
          })
        );
      },
    });
  };

  const regenerateResponse = () => {
    if (!activeConversation || isStreaming) return;
    const messages = activeConversation.messages;
    if (messages.length === 0) return;

    // Find the last user message
    let lastUserIndex = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        lastUserIndex = i;
        break;
      }
    }

    if (lastUserIndex === -1) return;

    const userPrompt = messages[lastUserIndex].content;

    // Truncate messages up to the user message (removing assistant reply)
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeId) return c;
        return {
          ...c,
          messages: c.messages.slice(0, lastUserIndex),
        };
      })
    );

    // Re-send the prompt
    setTimeout(() => {
      sendMessage(userPrompt);
    }, 50);
  };

  const retryLastMessage = () => {
    regenerateResponse();
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeId,
        activeConversation,
        isStreaming,
        isWaitingFirstChunk,
        streamingMessageId,
        connectionStatus,
        sendMessage,
        stopGeneration,
        regenerateResponse,
        createNewChat,
        selectConversation,
        deleteConversation,
        clearAllConversations,
        renameConversation,
        retryLastMessage,
        refreshConnection,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
