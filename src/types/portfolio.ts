export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: string; // e.g. "Advanced", "Proficient", "Expert"
    highlight?: boolean;
    icon?: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
  gpa?: string;
}

export interface PortfolioProfile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}
