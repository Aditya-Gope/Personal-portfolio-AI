# Aditya Personal AI

> **"Get to know Aditya, powered by AI."**

A premium, futuristic AI-powered personal portfolio web application. Rather than a static resume or traditional webpage, **Aditya Personal AI** provides an interactive, ChatGPT-caliber conversational experience where recruiters, hiring managers, and engineers can converse directly with Aditya Gope's personal AI assistant to explore his skills, projects, FastAPI backend experience, and academic background.

---

## ✨ Features & Highlights

- **ChatGPT-Inspired Conversational Interface**:
  - Direct integration with Aditya's live **FastAPI** backend via `POST /chat`.
  - Fluid token rendering with typing indicator while waiting for LLM generation.
  - Interactive **Stop Generation** button (`AbortController`) to cancel active queries.
  - Full Markdown rendering with syntax-highlighted code blocks, tables, blockquotes, and one-click code copy.
  - Quick **Copy response** (with toast feedback) and **Regenerate response** actions.
  - Contextual follow-up prompt chips under assistant responses.
  - Auto-scrolling to the latest incoming tokens with manual scroll-to-bottom toggle.

- **Futuristic Visual Identity & Branding**:
  - Custom dynamic **AI Neural Orb** rendered with an HTML5 Canvas particle system, orbital motion rings, and subtle ambient glows.
  - Holographic gradients, subtle glassmorphic panels, cyber grid backdrop, and ambient glow accents.
  - **Dark mode** by default with optional light mode toggle.

- **Chat History & Sidebar Management**:
  - Persistent conversation history stored in `localStorage`.
  - Grouped chronological sorting (*Today*, *Previous 7 Days*, *Older*).
  - In-place conversation title renaming.
  - Individual chat deletion with safety confirmation dialog.
  - "Clear all conversations" with safety confirmation dialog.
  - Fully responsive drawer on mobile and tablet devices.

- **Curated Starter Prompts**:
  - *Does Aditya know Python?*
  - *What are his technical skills?*
  - *Tell me about his projects.*
  - *What is his educational background?*
  - *Does he have experience with AI and Machine Learning?*
  - *Why should we hire Aditya?*

- **"About Aditya" Portfolio Explorer**:
  - Comprehensive modal overlay containing Aditya's verified background:
    - **Projects**: EyeCare AI Platform, Intelligent Resume Parser, Personal Portfolio AI, Android Applications
    - **Skills**: Python, FastAPI, React, OpenCV, LLM & Prompt Chaining, MySQL, Power BI, C/C++, Java, Kotlin
    - **Academics**: B.Tech in CSE (Academy of Technology, CGPA 7.97)
    - **Certifications**: Data Analytics with Cloud & AI (Godrej Infotech & Centum Foundation)
    - **Direct links**: GitHub, LinkedIn, and Email

- **Power-User Ergonomics**:
  - `Enter` to send, `Shift + Enter` for multi-line prompts.
  - `Ctrl + K` / `⌘ + K` to initiate a new chat session.
  - `Esc` to dismiss open modals and menus.
  - Live backend connection status indicator in the top navigation.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 3 with custom glassmorphism and cyber grid utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Markdown & Code**: `react-markdown` + `remark-gfm`
- **Effects**: HTML5 Canvas particle system + `canvas-confetti`
- **Backend**: Python + FastAPI + Groq LLM + Resume PDF Intelligence

---

## 📁 Project Architecture

```
personal-portfolio-ai/
├── src/
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatContainer.tsx      # Chat feed scroller and message list
│   │   │   ├── ChatInput.tsx          # Auto-expanding textarea & action buttons
│   │   │   ├── MarkdownContent.tsx    # Markdown parser with code syntax copy
│   │   │   ├── MessageItem.tsx        # Message bubbles with action bar & follow-ups
│   │   │   ├── TypingIndicator.tsx    # Pulsing neural dots indicator
│   │   │   └── WelcomeScreen.tsx      # Futuristic branding & suggested prompt chips
│   │   ├── layout/
│   │   │   ├── Header.tsx             # Top navigation, status indicator & controls
│   │   │   └── Sidebar.tsx            # Chat history, group sorting & management
│   │   ├── modals/
│   │   │   ├── AboutAdityaModal.tsx   # Comprehensive portfolio explorer
│   │   │   ├── ConfirmDialog.tsx      # Safe delete / clear modal
│   │   │   └── ShortcutsModal.tsx     # Keyboard shortcuts cheat sheet
│   │   ├── ui/
│   │   │   ├── Icons.tsx              # Clean SVG icons
│   │   │   └── Toast.tsx              # Toast notification system
│   │   └── visual/
│   │       ├── AiOrb.tsx              # Dynamic Canvas particle glowing orb
│   │       └── StatusIndicator.tsx    # Real-time backend connectivity badge
│   ├── context/
│   │   ├── ChatContext.tsx            # Chat state, streaming pipeline, storage sync
│   │   └── ThemeContext.tsx           # Dark / Light theme provider
│   ├── data/
│   │   ├── portfolioData.ts           # Aditya Gope's verified resume & project data
│   │   └── suggestedPrompts.ts        # Starter prompts & quick follow-ups
│   ├── services/
│   │   └── api.ts                     # FastAPI client with Vite proxy fallback & abort support
│   ├── types/
│   │   ├── chat.ts                    # Message & conversation type definitions
│   │   └── portfolio.ts               # Portfolio schema interfaces
│   ├── App.tsx                        # Master layout coordinator
│   ├── index.css                      # Tailwind layers, glassmorphism & cyber grid
│   └── main.tsx                       # React root entry point
├── .env                               # Active local environment variables
├── .env.example                       # Environment template
├── tailwind.config.js                 # Cyber-themed palette and animations
├── vite.config.ts                     # Vite build configuration with /chat proxy
└── package.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18 or higher (tested on Node v24)
- **FastAPI Backend**: Running at `http://127.0.0.1:8000`

### 2. Installation
```bash
git clone https://github.com/adityagope/personal-portfolio-ai.git
cd personal-portfolio-ai
npm install
```

### 3. Environment Configuration
Check `.env` (copied from `.env.example`):
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_CHAT_ENDPOINT=/chat
VITE_ENABLE_STREAMING=false
```

### 4. Running the Development Server
```bash
npm run dev
```

The app will be accessible at `http://localhost:5173`.
All requests to `/chat` are automatically proxied to `http://127.0.0.1:8000/chat` to guarantee seamless communication without browser CORS friction.

### 5. Production Build
```bash
npm run build
npm run preview
```

---

## 🔌 FastAPI Backend Specification

The frontend connects directly to your existing FastAPI endpoint:

- **Endpoint**: `POST http://127.0.0.1:8000/chat`
- **Request Schema**:
  ```json
  {
    "question": "Does Aditya know Python?"
  }
  ```
- **Response Schema**:
  ```json
  {
    "answer": "Yes, Aditya is proficient in Python."
  }
  ```

### Optional: Enabling CORS in FastAPI (for standalone production deployments)
If you deploy the frontend and backend to separate domains, add `CORSMiddleware` in your FastAPI `main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # or specify your frontend domain e.g. ["https://adityagope.dev"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📦 GitHub Initialization Guide

To initialize Git and push this project to your GitHub repository:

```bash
# 1. Initialize git
git init

# 2. Stage all files (verifying .env is ignored by .gitignore)
git add .

# 3. Check staged files to ensure secrets and .env are excluded
git status

# 4. Create initial commit
git commit -m "feat: complete Aditya Personal AI portfolio with FastAPI integration"

# 5. Set default branch to main
git branch -M main

# 6. Add your remote GitHub repository URL
git remote add origin https://github.com/adityagope/personal-portfolio-ai.git

# 7. Push to GitHub (run only after you create the repo on GitHub)
git push -u origin main
```

*(Note: Per your instructions, Git has not been pushed automatically. You can review the repository and push when you are ready!)*

---

## 🛡️ License

Developed for **Aditya Gope**. All rights reserved.
