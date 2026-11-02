import type { PortfolioProfile } from '../types/portfolio';

export const adityaProfile: PortfolioProfile = {
  name: 'Aditya Gope',
  role: 'AI Engineer & Full-Stack Developer',
  tagline: 'Bridging AI models, robust FastAPI backends, and futuristic user interfaces.',
  bio: 'Specializing in Machine Learning, Large Language Model (LLM) integrations, Computer Vision (OpenCV), and full-stack development with FastAPI and React. Passionate about turning complex AI systems into impactful, human-centered products.',
  location: 'India',
  email: 'adityagope.dev@gmail.com',
  github: 'https://github.com/adityagope',
  linkedin: 'https://linkedin.com/in/adityagope',
  skills: [
    {
      name: 'Programming & Languages',
      skills: [
        { name: 'Python', level: 'Expert', highlight: true },
        { name: 'C / C++', level: 'Advanced' },
        { name: 'Java', level: 'Advanced' },
        { name: 'Kotlin', level: 'Proficient' },
      ],
    },
    {
      name: 'AI, ML & Data Analytics',
      skills: [
        { name: 'LLM Integration & Prompt Engineering', level: 'Expert', highlight: true },
        { name: 'Machine Learning & AI Engineering', level: 'Advanced', highlight: true },
        { name: 'Computer Vision (OpenCV)', level: 'Advanced', highlight: true },
        { name: 'Power BI & Data Analytics', level: 'Proficient' },
        { name: 'Data Structures & Algorithms', level: 'Advanced' },
      ],
    },
    {
      name: 'Full-Stack & Backend',
      skills: [
        { name: 'FastAPI', level: 'Expert', highlight: true },
        { name: 'React & TypeScript', level: 'Advanced', highlight: true },
        { name: 'MySQL & DBMS', level: 'Advanced' },
        { name: 'Android Studio', level: 'Proficient' },
        { name: 'Git & GitHub Workflows', level: 'Advanced' },
      ],
    },
  ],
  projects: [
    {
      id: 'eyecare-ai',
      title: 'EyeCare AI Platform',
      tagline: 'End-to-end diagnostic system for retinal disease detection',
      description: 'Computer vision and deep learning platform integrating image preprocessing, diagnostic pipelines, and telemedicine consultation workflows for retinal health screening.',
      tags: ['Python', 'OpenCV', 'Deep Learning', 'FastAPI', 'Telemedicine'],
      highlights: [
        'Automated retinal disease pattern recognition',
        'End-to-end diagnostic inference pipeline',
        'Built for accessibility and telemedicine deployment',
      ],
    },
    {
      id: 'resume-parser',
      title: 'Intelligent Resume Parser',
      tagline: 'NLP-powered resume analysis and recruiter scoring filter',
      description: 'Automated resume parser with scoring filters that increased recruiter screening efficiency by 80%, performing automated skill extraction, candidate ranking, and candidate-job matching.',
      tags: ['Python', 'NLP', 'FastAPI', 'Groq / LLM', 'Scoring Filter'],
      highlights: [
        'Increased recruiter evaluation efficiency by 80%',
        'Automated skill extraction across technical taxonomies',
        'Built high-performance scoring algorithms',
      ],
    },
    {
      id: 'aditya-personal-ai',
      title: 'Aditya Personal AI Assistant',
      tagline: 'Interactive portfolio powered by FastAPI, Groq LLM & React',
      description: 'Futuristic ChatGPT-caliber conversational portfolio application that communicates directly with Aditya’s resume intelligence FastAPI backend.',
      tags: ['Python', 'FastAPI', 'Groq LLM', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      highlights: [
        'Integrated with live FastAPI /chat endpoint',
        'Conversational resume querying and intelligence engine',
        'Futuristic UI with dynamic Canvas AI Neural Orb',
      ],
      githubUrl: 'https://github.com/adityagope/personal-portfolio-ai',
    },
    {
      id: 'android-apps',
      title: 'Mobile Applications (Android)',
      tagline: 'Functional Android apps built with Kotlin and optimized UX',
      description: 'Engineered responsive Android applications including a smart scientific calculator and a dynamic event card generator with optimized touch responsiveness.',
      tags: ['Kotlin', 'Android Studio', 'Mobile UX', 'Java'],
      highlights: [
        'Clean MVVM mobile architecture',
        'Optimized UI/UX for diverse screen densities',
      ],
    },
  ],
  experience: [
    {
      role: 'AI & Software Engineer',
      company: 'Independent Projects & Research',
      period: '2023 — Present',
      location: 'India',
      description: [
        'Developed end-to-end AI applications including EyeCare AI and automated Resume Parser.',
        'Engineered high-throughput FastAPI backends integrating Groq LLMs and vector search.',
        'Built responsive web applications in React and mobile solutions in Android Studio.',
      ],
      technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'OpenCV', 'LLM', 'MySQL'],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
      institution: 'Academy of Technology',
      period: '2020 — 2024',
      details: [
        'Focus on Data Structures, Algorithms, Operating Systems, DBMS, and Computer Networks.',
        'Winner of college-level competitive coding competition.',
        'Certified in Data Analytics with Cloud & AI (Godrej Infotech & Centum Foundation).',
      ],
      gpa: '7.97 CGPA',
    },
  ],
};
