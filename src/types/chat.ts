export type MessageRole = 'user' | 'assistant' | 'system';

export type MessageStatus = 'idle' | 'sending' | 'streaming' | 'complete' | 'error';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  status?: MessageStatus;
  error?: string;
  suggestedFollowUps?: string[];
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: Message[];
}

export interface BackendConfig {
  baseUrl: string;
  chatEndpoint: string;
  isStreaming: boolean;
  streamingFormat: 'sse' | 'ndjson' | 'raw';
}

export interface PromptSuggestion {
  id: string;
  title: string;
  prompt: string;
  icon: string;
  category: 'skills' | 'projects' | 'experience' | 'education' | 'hire';
  badge?: string;
}
