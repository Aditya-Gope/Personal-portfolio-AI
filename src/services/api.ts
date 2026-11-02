import type { Message } from '../types/chat';

// Base configuration with fallback defaults
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
export const CHAT_ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT || '/chat';
export const ENABLE_STREAMING = import.meta.env.VITE_ENABLE_STREAMING === 'true';

export interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  onComplete: (fullText: string, followUps?: string[]) => void;
  onError: (error: Error) => void;
}

/**
 * Health check to verify FastAPI backend availability
 */
export async function checkBackendHealth(): Promise<{ online: boolean; latencyMs?: number; message?: string }> {
  const startTime = performance.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  // Targets to try: direct root, direct docs, or Vite local proxy
  const targets = [
    `${API_BASE_URL}/`,
    `${API_BASE_URL}/docs`,
    '/api-status',
  ];

  for (const url of targets) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
      });

      if (response && (response.ok || response.status === 200 || response.status === 307)) {
        clearTimeout(timeoutId);
        const latencyMs = Math.round(performance.now() - startTime);
        return { online: true, latencyMs, message: `FastAPI Online (${latencyMs}ms)` };
      }
    } catch {
      // Continue to next probe target
    }
  }

  clearTimeout(timeoutId);
  return { online: false, message: 'Backend unreachable' };
}

/**
 * Sends question to the FastAPI `/chat` endpoint.
 *
 * Expected Request Format:
 * { "question": "Does Aditya know Python?" }
 *
 * Expected Response Format:
 * { "answer": "Yes, Aditya has experience with Python..." }
 */
export async function streamChatResponse(
  prompt: string,
  _history: Message[],
  signal: AbortSignal,
  callbacks: StreamCallbacks
): Promise<void> {
  const cleanEndpoint = CHAT_ENDPOINT.startsWith('/') ? CHAT_ENDPOINT : `/${CHAT_ENDPOINT}`;
  const directUrl = `${API_BASE_URL}${cleanEndpoint}`;
  const proxyUrl = cleanEndpoint;

  const payload = {
    question: prompt,
  };

  let response: Response | null = null;
  let responseData: any = null;

  // Try direct URL first, then fallback to Vite proxy if browser CORS blocks direct request
  try {
    response = await fetch(directUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal,
    });
  } catch (directErr: any) {
    if (signal.aborted) {
      callbacks.onError(new Error('Generation stopped by user'));
      return;
    }

    // Try relative Vite dev proxy (/chat) if direct fetch encountered CORS or network error
    try {
      response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal,
      });
    } catch (proxyErr: any) {
      if (signal.aborted) {
        callbacks.onError(new Error('Generation stopped by user'));
        return;
      }
      callbacks.onError(
        new Error(
          `Unable to connect to FastAPI backend at ${directUrl}. Please ensure your backend is running.`
        )
      );
      return;
    }
  }

  if (!response) {
    callbacks.onError(new Error('No response received from FastAPI backend.'));
    return;
  }

  if (!response.ok) {
    let errorDetail = `Backend returned status ${response.status} (${response.statusText})`;
    try {
      const errJson = await response.json();
      if (errJson && errJson.detail) {
        errorDetail = typeof errJson.detail === 'string' ? errJson.detail : JSON.stringify(errJson.detail);
      }
    } catch {
      // Use fallback errorDetail
    }
    callbacks.onError(new Error(errorDetail));
    return;
  }

  try {
    responseData = await response.json();
  } catch (err: any) {
    callbacks.onError(new Error('Failed to parse backend response as JSON.'));
    return;
  }

  // Extract answer from FastAPI response schema: { "answer": "..." }
  const fullAnswer = responseData?.answer || responseData?.message || responseData?.text || '';

  if (!fullAnswer) {
    callbacks.onError(new Error('Received empty response from FastAPI backend.'));
    return;
  }

  // Generate dynamic follow-up suggestions based on content
  const followUps = extractFollowUps(prompt, fullAnswer);

  // Smooth, high-cadence token delivery to create the ChatGPT typing experience
  // without delaying the user, while respecting user cancellation (AbortController)
  try {
    const tokens = tokenizeText(fullAnswer);

    for (const token of tokens) {
      if (signal.aborted) {
        callbacks.onError(new Error('Generation stopped by user'));
        return;
      }

      callbacks.onChunk(token);
      // Fast, fluid 8-16ms micro-delay for smooth text emergence
      await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 8) + 8));
    }

    callbacks.onComplete(fullAnswer, followUps);
  } catch (renderErr: any) {
    if (signal.aborted) {
      callbacks.onError(new Error('Generation stopped by user'));
    } else {
      // If render interruption happens, still ensure full text is finalized
      callbacks.onComplete(fullAnswer, followUps);
    }
  }
}

/**
 * Splits text into natural token chunks for smooth rendering
 */
function tokenizeText(text: string): string[] {
  const words = text.split(/(\s+)/);
  const chunks: string[] = [];
  let buffer = '';

  for (let i = 0; i < words.length; i++) {
    buffer += words[i];
    if (i % 2 === 1 || i === words.length - 1) {
      chunks.push(buffer);
      buffer = '';
    }
  }

  if (buffer) {
    chunks.push(buffer);
  }

  return chunks;
}

/**
 * Generates contextual follow-ups based on the user's question
 */
function extractFollowUps(question: string, _answer: string): string[] {
  const q = question.toLowerCase();

  if (q.includes('python')) {
    return [
      'What are his technical skills?',
      'Tell me about his projects.',
      'Why should we hire Aditya?',
    ];
  }

  if (q.includes('skill')) {
    return [
      'Tell me about his EyeCare AI Platform',
      'What is his experience with FastAPI and React?',
      'Why should we hire Aditya?',
    ];
  }

  if (q.includes('project')) {
    return [
      'How does the EyeCare AI Platform work?',
      'Tell me about his Resume Parser project',
      'What are his core technical skills?',
    ];
  }

  if (q.includes('hire')) {
    return [
      'What are his technical skills?',
      'Tell me about his projects.',
      'How can I get in touch with Aditya?',
    ];
  }

  return [
    'Does Aditya know Python?',
    'What are his technical skills?',
    'Tell me about his projects.',
    'Why should we hire Aditya?',
  ];
}
