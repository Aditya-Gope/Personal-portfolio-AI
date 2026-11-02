import type { PromptSuggestion } from '../types/chat';

export const SUGGESTED_PROMPTS: PromptSuggestion[] = [
  {
    id: 'skills-python',
    title: 'Python Expertise',
    prompt: 'Does Aditya know Python?',
    icon: 'Terminal',
    category: 'skills',
    badge: 'Core Skill',
  },
  {
    id: 'tech-stack',
    title: 'Technical Skills',
    prompt: 'What are his technical skills?',
    icon: 'Cpu',
    category: 'skills',
    badge: 'Overview',
  },
  {
    id: 'featured-projects',
    title: 'Featured Projects',
    prompt: 'Tell me about his projects.',
    icon: 'FolderGit2',
    category: 'projects',
    badge: 'Portfolio',
  },
  {
    id: 'ai-ml-experience',
    title: 'AI & ML Experience',
    prompt: 'Does he have experience with AI and Machine Learning?',
    icon: 'Brain',
    category: 'experience',
    badge: 'Specialization',
  },
  {
    id: 'education-bg',
    title: 'Educational Background',
    prompt: 'What is his educational background?',
    icon: 'GraduationCap',
    category: 'education',
    badge: 'Academics',
  },
  {
    id: 'why-hire',
    title: 'Why Hire Aditya?',
    prompt: 'Why should we hire Aditya?',
    icon: 'Sparkles',
    category: 'hire',
    badge: 'Value Proposition',
  },
];

export const QUICK_FOLLOW_UPS: Record<string, string[]> = {
  default: [
    'What are his top 3 projects?',
    'Tell me about his FastAPI backend experience',
    'How can I get in touch with Aditya?',
  ],
  skills: [
    'How does he use Python in production?',
    'What AI frameworks has he worked with?',
    'What is his frontend experience?',
  ],
  projects: [
    'How did he build the Aditya Personal AI app?',
    'What technologies were used in his RAG engine?',
    'Can I see his GitHub profile?',
  ],
  hire: [
    'What makes Aditya stand out as an engineer?',
    'Is Aditya open to full-time or remote roles?',
    'How can recruiters schedule an interview?',
  ],
};
