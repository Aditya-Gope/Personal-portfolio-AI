import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ChatProvider, useChat } from './context/ChatContext';
import { ToastProvider, useToast } from './components/ui/Toast';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ChatContainer } from './components/chat/ChatContainer';
import { ChatInput } from './components/chat/ChatInput';
import { AboutAdityaModal } from './components/modals/AboutAdityaModal';
import { ShortcutsModal } from './components/modals/ShortcutsModal';
import { CursorSpotlight } from './components/visual/CursorSpotlight';

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);

  const { createNewChat } = useChat();
  const { showToast } = useToast();

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K: New Chat
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        createNewChat();
        showToast('Created new chat session', 'info');
      }

      // Escape: Close modals
      if (e.key === 'Escape') {
        setIsAboutModalOpen(false);
        setIsShortcutsModalOpen(false);
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [createNewChat, showToast]);

  return (
    <div className="flex h-screen w-screen bg-background-dark text-slate-100 overflow-hidden relative cyber-grid">
      {/* Dynamic Cursor Spotlight & Interactive Particle Pop-up Engine */}
      <CursorSpotlight />

      {/* Subtle ambient background glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-cyber-cyan/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-cyber-violet/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Collapsible / Mobile-friendly Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative z-10">
        <Header
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onOpenAboutModal={() => setIsAboutModalOpen(true)}
          onOpenShortcutsModal={() => setIsShortcutsModalOpen(true)}
        />

        {/* Chat Feed */}
        <ChatContainer />

        {/* Input Bar */}
        <ChatInput />
      </div>

      {/* About Aditya Portfolio Explorer Modal */}
      <AboutAdityaModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ChatProvider>
          <AppContent />
        </ChatProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
