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
├── backend/                           # FastAPI Python Backend
│   ├── .gitignore                     # Backend-specific secrets & venv ignore rules
│   ├── main.py                        # FastAPI app with /chat, / & CORS middleware
│   ├── my_resume.pdf                  # Aditya Gope's resume for runtime extraction
│   └── requirements.txt               # Backend dependencies (fastapi, uvicorn, groq, pypdf)
├── src/                               # Frontend React 19 application
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

### CORS Middleware (Configured)
The backend in `backend/main.py` is preconfigured with `CORSMiddleware` supporting:
- Local development (`http://localhost:5173`, `http://localhost:3000`, `http://127.0.0.1:5173`)
- All Vercel deployments via regex (`https://.*\.vercel\.app`)
- Optional custom domains via the `FRONTEND_URL` environment variable.

---

## ☁️ Deployment Guide

This repository contains both the frontend and backend, structured for independent zero-friction deployments on Vercel and Render.

### 1. Backend Deployment on Render (Web Service)

1. Sign in to your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository: `Personal-portfolio-AI`.
4. Configure the service settings:
   - **Name**: `aditya-personal-ai-backend` (or your preferred name)
   - **Region**: Closest to your audience (e.g., Singapore or Oregon)
   - **Branch**: `main`
   - **Root Directory**: `backend` *(CRITICAL: tells Render to build only the backend folder)*
   - **Runtime**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Under **Environment Variables**, add:
   - `GROQ_API_KEY`: `your_groq_api_key_here`
   - *(Optional)* `FRONTEND_URL`: Your custom domain (if using a custom domain outside `*.vercel.app`)
6. Click **Deploy Web Service**.
7. Once deployed, copy your Render public URL (e.g., `https://aditya-personal-ai-backend.onrender.com`).

---

### 2. Frontend Deployment on Vercel

1. Open your project on the [Vercel Dashboard](https://vercel.com).
2. Verify that your Project Settings are configured for the repository root:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. In **Settings > Environment Variables**, add / update:
   - `VITE_API_BASE_URL`: `https://your-render-backend-name.onrender.com`
   - `VITE_CHAT_ENDPOINT`: `/chat`
   - `VITE_ENABLE_STREAMING`: `false`
4. Trigger a **Redeploy** (or push a commit to `main`).
5. Your Vercel frontend is now live and communicating with your Render FastAPI backend!

---

## 💻 Local Development

Run frontend and backend simultaneously in local development:

```bash
# Terminal 1 - Start FastAPI Backend
cd backend
python -m venv .venv
source .venv/bin/activate  # Or on Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Terminal 2 - Start Frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to test the full end-to-end experience.

---

## 🛡️ License

Developed for **Aditya Gope**. All rights reserved.
