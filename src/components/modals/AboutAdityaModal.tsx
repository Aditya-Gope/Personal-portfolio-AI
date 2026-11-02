import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { adityaProfile } from '../../data/portfolioData';
import {
  X,
  Code2,
  Briefcase,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Mail,
  CheckCircle,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import confetti from 'canvas-confetti';

interface AboutAdityaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutAdityaModal: React.FC<AboutAdityaModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'projects' | 'education'>('overview');

  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00F0FF', '#8B5CF6', '#EC4899'],
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl glass-panel bg-slate-950/95 border border-slate-700/80 shadow-2xl z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-cyan via-cyber-violet to-cyber-pink p-[1px] shadow-glow-cyan">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyber-cyan" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <span>{adityaProfile.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30">
                    PORTFOLIO
                  </span>
                </h2>
                <p className="text-xs text-slate-400">{adityaProfile.role}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 pt-3 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
            <TabButton
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              icon={<Sparkles className="w-3.5 h-3.5" />}
              label="Overview"
            />
            <TabButton
              active={activeTab === 'skills'}
              onClick={() => setActiveTab('skills')}
              icon={<Code2 className="w-3.5 h-3.5" />}
              label="Skills"
            />
            <TabButton
              active={activeTab === 'projects'}
              onClick={() => setActiveTab('projects')}
              icon={<Briefcase className="w-3.5 h-3.5" />}
              label="Projects"
            />
            <TabButton
              active={activeTab === 'education'}
              onClick={() => setActiveTab('education')}
              icon={<GraduationCap className="w-3.5 h-3.5" />}
              label="Education"
            />
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyber-cyan mb-2">
                    Professional Summary
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {adityaProfile.bio}
                  </p>
                </div>

                <div className="p-4 rounded-xl glass-card bg-slate-900/60 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Key Specialties
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-cyber-cyan" />
                      <span>Production FastAPI microservices & real-time token streaming</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-cyber-cyan" />
                      <span>RAG pipelines with vector databases (Chroma, FAISS)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-cyber-cyan" />
                      <span>Automated resume PDF parsing & entity extraction</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-cyber-cyan" />
                      <span>Futuristic, accessible frontend design with React & TypeScript</span>
                    </li>
                  </ul>
                </div>

                {/* Direct Contact CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${adityaProfile.email}`}
                    onClick={triggerConfetti}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-violet text-slate-950 font-semibold text-xs shadow-glow-cyan hover:opacity-95 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>
                  <a
                    href={adityaProfile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={adityaProfile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-5">
                {adityaProfile.skills.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      {category.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border ${
                            skill.highlight
                              ? 'bg-cyber-cyan/10 border-cyber-cyan/40 text-cyber-cyan'
                              : 'bg-slate-900 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span>{skill.name}</span>
                          <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-400">
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4">
                {adityaProfile.projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-xl glass-card bg-slate-900/60 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-slate-100">{project.title}</h4>
                        <p className="text-xs text-cyber-cyan font-medium">{project.tagline}</p>
                      </div>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-700 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                    Academics
                  </h4>
                  {adityaProfile.education.map((edu, idx) => (
                    <div key={idx} className="p-4 rounded-xl glass-card bg-slate-900/60 border border-slate-800 space-y-1.5">
                      <h4 className="text-sm font-bold text-slate-100">{edu.degree}</h4>
                      <p className="text-xs text-slate-400">{edu.institution} • {edu.period}</p>
                      {edu.gpa && (
                        <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30 mt-1">
                          CGPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                    Work Experience
                  </h4>
                  {adityaProfile.experience.map((exp, idx) => (
                    <div key={idx} className="p-4 rounded-xl glass-card bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-100">{exp.role}</h4>
                        <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                      </div>
                      <p className="text-xs text-cyber-cyan">{exp.company} • {exp.location}</p>
                      <ul className="space-y-1 text-xs text-slate-300 list-disc pl-4">
                        {exp.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}> = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-medium border-b-2 transition-all ${
        active
          ? 'border-cyber-cyan text-cyber-cyan'
          : 'border-transparent text-slate-400 hover:text-slate-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
