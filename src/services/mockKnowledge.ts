import { adityaProfile } from '../data/portfolioData';

/**
 * Intelligent client-side response generator for Aditya Personal AI.
 * Used during Phase 1 frontend evaluation and as offline fallback.
 */
export function generateAdityaResponse(prompt: string): { text: string; followUps: string[] } {
  const p = prompt.toLowerCase();

  // Python expertise
  if (p.includes('python')) {
    return {
      text: `### Yes, Aditya is highly proficient in Python! 🐍

Python is **Aditya's core primary language** for both backend engineering and AI/ML system development.

#### Key Highlights & Technologies:
- **FastAPI & AsyncIO**: Builds high-throughput, async REST APIs and streaming endpoints.
- **LLM Application Frameworks**: Extensive experience with LangChain, LlamaIndex, and OpenAI/Anthropic SDKs.
- **Data & Machine Learning**: Hands-on with PyTorch, SpaCy, Scikit-Learn, and Hugging Face Transformers.
- **Document & PDF Processing**: Custom extractors using PyPDF2, PDFMiner, and regex heuristics for parsing complex resume structures.
- **Clean Architecture**: Strong focus on type annotations (Pydantic, typing), modular design, and PEP8 standards.

> *"Aditya leverages Python to bridge cutting-edge AI research with reliable, production-ready microservices."*`,
      followUps: [
        'What are his technical skills?',
        'Tell me about his FastAPI backend experience',
        'Tell me about his projects.',
      ],
    };
  }

  // Technical skills
  if (p.includes('skills') || p.includes('tech stack') || p.includes('technologies')) {
    return {
      text: `### Aditya Gope's Technical Competencies ⚡

Aditya brings a versatile skillset across **AI/ML**, **Modern Backend**, and **Full-Stack Development**:

| Domain | Key Technologies |
| :--- | :--- |
| **AI & LLMs** | Python, FastAPI, LangChain, RAG Systems, Vector DBs (Chroma/FAISS), Prompt Engineering |
| **Backend** | Python, FastAPI, Node.js, RESTful APIs, SSE Streaming, AsyncIO, PostgreSQL, MongoDB |
| **Frontend** | React, TypeScript, Next.js, Vite, Tailwind CSS, Framer Motion, Responsive UI |
| **DevOps & Tools** | Docker, Git, Linux / Bash, Postman, CI/CD pipelines, Cloud deployments |

#### Core Strengths:
1. **End-to-End AI Integration**: From raw document parsing to vector search and conversational streaming.
2. **High-Performance Architecture**: Deep understanding of asynchronous Python and optimized stateful frontends.
3. **Product Mindset**: Designing intuitive interfaces that make complex AI features accessible.`,
      followUps: [
        'Does Aditya know Python?',
        'Tell me about his projects.',
        'Why should we hire Aditya?',
      ],
    };
  }

  // Projects
  if (p.includes('project') || p.includes('work') || p.includes('portfolio')) {
    return {
      text: `### Featured Projects by Aditya 🚀

Here are key projects that showcase Aditya's engineering capability:

#### 1. **Aditya Personal AI (This Application)**
- **Stack**: React, TypeScript, Tailwind CSS, Framer Motion + FastAPI Backend
- **Capabilities**: Real-time token streaming via \`ReadableStream\`, dynamic prompt suggestions, persistent chat sessions, and interactive portfolio discovery.
- **Specialty**: ChatGPT-inspired futuristic interface tailored specifically for recruiter and peer engagement.

#### 2. **NeuralDoc: Enterprise RAG Engine**
- **Stack**: Python, FastAPI, LangChain, ChromaDB, Sentence-Transformers
- **Capabilities**: Hybrid search (BM25 + Dense Vectors) with sub-second retrieval across hundreds of technical documents and PDF repositories.
- **Impact**: Reduced retrieval hallucinations and accelerated research workflows by 45%.

#### 3. **ResumeAI: Automated Skill & Layout Extractor**
- **Stack**: Python, PyPDF2, SpaCy NLP, FastAPI
- **Capabilities**: Multi-column PDF parsing, heuristic layout reconstruction, and taxonomy mapping against 1,000+ technical competencies.`,
      followUps: [
        'Does he have experience with AI and Machine Learning?',
        'What is his educational background?',
        'How can I contact Aditya?',
      ],
    };
  }

  // AI & Machine Learning experience
  if (p.includes('ai') || p.includes('machine learning') || p.includes('ml') || p.includes('llm') || p.includes('rag')) {
    return {
      text: `### Aditya's AI & Machine Learning Experience 🧠

Aditya specializes in applied **Generative AI** and **Natural Language Processing (NLP)**:

- **Retrieval-Augmented Generation (RAG)**: Built custom search pipelines incorporating vector chunking, metadata filtering, and re-ranking for enterprise data.
- **Prompt Chaining & System Design**: Designed multi-step prompt chains to parse unstructured documents, extract entities, and format validated JSON outputs.
- **Resume Intelligence**: Engineered specialized parsers that extract skills, educational timelines, and project accomplishments from unstructured PDFs.
- **Streaming LLM Architecture**: Proficient in streaming tokens over HTTP via Server-Sent Events (SSE) and asynchronous generators in FastAPI.
- **Model Fine-Tuning & Evaluation**: Familiar with Hugging Face transformers, PyTorch fine-tuning workflows, and semantic similarity evaluations.`,
      followUps: [
        'Does Aditya know Python?',
        'Tell me about his projects.',
        'Why should we hire Aditya?',
      ],
    };
  }

  // Education background
  if (p.includes('education') || p.includes('college') || p.includes('degree') || p.includes('university') || p.includes('b.tech')) {
    return {
      text: `### Educational Background 🎓

**Bachelor of Technology (B.Tech) in Computer Science & Engineering**
- **Period**: 2020 — 2024
- **Grade**: 8.5 / 10.0 CGPA
- **Key Coursework**:
  - Data Structures & Algorithms
  - Operating Systems & Distributed Architecture
  - Artificial Intelligence & Machine Learning
  - Database Management Systems (DBMS)
  - Object-Oriented Software Engineering

Aditya was actively involved in developer communities, leading hackathon teams and mentoring junior developers in Python and web technologies.`,
      followUps: [
        'What are his technical skills?',
        'Tell me about his projects.',
        'Why should we hire Aditya?',
      ],
    };
  }

  // Why hire Aditya
  if (p.includes('why') && (p.includes('hire') || p.includes('choose') || p.includes('join'))) {
    return {
      text: `### Why Recruiters & Engineering Teams Choose Aditya 💼

Here is why Aditya is a standout addition to any high-performing engineering team:

1. **Full-Spectrum Capability**:
   Aditya bridges the gap between AI research and production software. He builds both the **underlying FastAPI / LLM pipelines** and the **polished, reactive frontends** that users interact with.

2. **Obsession with Quality & Performance**:
   He prioritizes clean code, asynchronous execution, low-latency streaming, and responsive, accessible user interfaces.

3. **Fast Learner & Self-Starter**:
   The AI landscape evolves weekly. Aditya stays ahead by rapidly evaluating new frameworks, libraries, and architectural paradigms.

4. **Product & User Empathy**:
   Beyond writing clean code, he designs experiences that solve actual human problems—as evidenced by this very portfolio!

> *"Ready to bring energy, technical depth, and relentless execution to your engineering initiatives."*`,
      followUps: [
        'How can I get in touch with Aditya?',
        'What are his technical skills?',
        'Tell me about his projects.',
      ],
    };
  }

  // Contact / Hire
  if (p.includes('contact') || p.includes('email') || p.includes('reach') || p.includes('hire') || p.includes('interview')) {
    return {
      text: `### Get in Touch with Aditya Gope 📬

Aditya is always open to exciting full-time roles, high-impact projects, and technical discussions!

- 📧 **Email**: [${adityaProfile.email}](mailto:${adityaProfile.email})
- 💼 **LinkedIn**: [linkedin.com/in/adityagope](${adityaProfile.linkedin})
- 🐙 **GitHub**: [github.com/adityagope](${adityaProfile.github})
- 📍 **Location**: ${adityaProfile.location}

Feel free to send an email or connect on LinkedIn to schedule an interview or explore collaboration opportunities!`,
      followUps: [
        'What are his technical skills?',
        'Tell me about his projects.',
        'Why should we hire Aditya?',
      ],
    };
  }

  // General fallback response
  return {
    text: `Thanks for asking! As Aditya's AI assistant, I can share detailed information regarding:

- 🐍 **Technical Skills**: Deep expertise in Python, FastAPI, React, TypeScript, and AI frameworks.
- 🚀 **Projects**: Real-time AI applications, RAG search engines, and resume parsing pipelines.
- 🧠 **AI & ML Experience**: Prompt chaining, vector databases, and LLM streaming architectures.
- 🎓 **Education**: B.Tech in Computer Science & Engineering.
- 💼 **Why Hire Aditya**: His blend of full-stack craftsmanship and applied AI engineering.

What specific area would you like to explore?`,
    followUps: [
      'Does Aditya know Python?',
      'What are his technical skills?',
      'Tell me about his projects.',
      'Why should we hire Aditya?',
    ],
  };
}
