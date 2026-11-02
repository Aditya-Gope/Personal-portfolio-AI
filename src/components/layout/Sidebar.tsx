import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../context/ChatContext';
import { useToast } from '../ui/Toast';
import { ConfirmDialog } from '../modals/ConfirmDialog';
import {
  Plus,
  MessageSquare,
  Trash2,
  Edit2,
  Check,
  X,
  Mail,
  PanelLeftClose,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const {
    conversations,
    activeId,
    createNewChat,
    selectConversation,
    deleteConversation,
    clearAllConversations,
    renameConversation,
  } = useChat();

  const { showToast } = useToast();

  // Rename state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Confirmation modal state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    action: () => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    action: () => {},
  });

  const handleStartRename = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const handleSaveRename = (id: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (editingTitle.trim()) {
      renameConversation(id, editingTitle.trim());
      showToast('Conversation renamed', 'success');
    }
    setEditingId(null);
  };

  const handleDeleteRequest = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Conversation?',
      description: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      action: () => {
        deleteConversation(id);
        showToast('Conversation deleted', 'info');
      },
    });
  };

  const handleClearAllRequest = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Clear All Conversations?',
      description: 'Are you sure you want to clear your entire chat history? All saved messages will be permanently removed.',
      action: () => {
        clearAllConversations();
        showToast('All chat history cleared', 'info');
      },
    });
  };

  // Group conversations by period
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const sevenDays = 7 * oneDay;

  const todayConvs = conversations.filter((c) => now - c.updatedAt < oneDay);
  const previous7DaysConvs = conversations.filter(
    (c) => now - c.updatedAt >= oneDay && now - c.updatedAt < sevenDays
  );
  const olderConvs = conversations.filter((c) => now - c.updatedAt >= sevenDays);

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-72 h-full flex flex-col bg-slate-950/95 lg:bg-slate-950/80 border-r border-slate-800/80 backdrop-blur-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-72'
        }`}
      >
        {/* Header / New Chat */}
        <div className="p-3.5 border-b border-slate-800/80 flex items-center gap-2">
          <button
            onClick={() => {
              createNewChat();
              if (window.innerWidth < 1024) onClose();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyber-cyan/15 via-cyber-violet/15 to-cyber-pink/15 hover:from-cyber-cyan/25 hover:via-cyber-violet/25 hover:to-cyber-pink/25 border border-cyber-cyan/30 hover:border-cyber-cyan/60 text-slate-100 text-xs font-semibold shadow-glow-cyan transition-all group"
          >
            <Plus className="w-4 h-4 text-cyber-cyan group-hover:rotate-90 transition-transform duration-200" />
            <span>New Chat</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 lg:hidden"
            title="Close Sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center px-4">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-2 text-slate-500">
                <MessageSquare className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-slate-400">No conversations yet</p>
              <p className="text-[11px] text-slate-500 mt-1">Start chatting with Aditya's AI</p>
            </div>
          ) : (
            <>
              {todayConvs.length > 0 && (
                <ConversationGroup
                  title="Today"
                  conversations={todayConvs}
                  activeId={activeId}
                  editingId={editingId}
                  editingTitle={editingTitle}
                  onSelect={(id) => {
                    selectConversation(id);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  onStartRename={handleStartRename}
                  onSaveRename={handleSaveRename}
                  onCancelRename={() => setEditingId(null)}
                  onChangeEditingTitle={setEditingTitle}
                  onDelete={handleDeleteRequest}
                />
              )}

              {previous7DaysConvs.length > 0 && (
                <ConversationGroup
                  title="Previous 7 Days"
                  conversations={previous7DaysConvs}
                  activeId={activeId}
                  editingId={editingId}
                  editingTitle={editingTitle}
                  onSelect={(id) => {
                    selectConversation(id);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  onStartRename={handleStartRename}
                  onSaveRename={handleSaveRename}
                  onCancelRename={() => setEditingId(null)}
                  onChangeEditingTitle={setEditingTitle}
                  onDelete={handleDeleteRequest}
                />
              )}

              {olderConvs.length > 0 && (
                <ConversationGroup
                  title="Older"
                  conversations={olderConvs}
                  activeId={activeId}
                  editingId={editingId}
                  editingTitle={editingTitle}
                  onSelect={(id) => {
                    selectConversation(id);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  onStartRename={handleStartRename}
                  onSaveRename={handleSaveRename}
                  onCancelRename={() => setEditingId(null)}
                  onChangeEditingTitle={setEditingTitle}
                  onDelete={handleDeleteRequest}
                />
              )}
            </>
          )}
        </div>

        {/* Footer controls & links */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/90 flex flex-col gap-2.5">
          {conversations.length > 0 && (
            <button
              onClick={handleClearAllRequest}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear all conversations</span>
            </button>
          )}

          {/* Social Profiles */}
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <a
                href="https://github.com/adityagope"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/adityagope"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:adityagope.dev@gmail.com"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                title="Email Aditya"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
              <Sparkles className="w-3 h-3 text-cyber-cyan" />
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmLabel="Delete"
        onConfirm={confirmDialog.action}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />
    </>
  );
};

interface ConversationGroupProps {
  title: string;
  conversations: any[];
  activeId: string | null;
  editingId: string | null;
  editingTitle: string;
  onSelect: (id: string) => void;
  onStartRename: (id: string, title: string, e: React.MouseEvent) => void;
  onSaveRename: (id: string, e?: React.FormEvent) => void;
  onCancelRename: () => void;
  onChangeEditingTitle: (value: string) => void;
  onDelete: (id: string, title: string, e: React.MouseEvent) => void;
}

const ConversationGroup: React.FC<ConversationGroupProps> = ({
  title,
  conversations,
  activeId,
  editingId,
  editingTitle,
  onSelect,
  onStartRename,
  onSaveRename,
  onCancelRename,
  onChangeEditingTitle,
  onDelete,
}) => {
  return (
    <div className="space-y-1">
      <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
        {title}
      </div>
      {conversations.map((c) => {
        const isActive = c.id === activeId;
        const isEditing = c.id === editingId;

        if (isEditing) {
          return (
            <form
              key={c.id}
              onSubmit={(e) => onSaveRename(c.id, e)}
              className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-cyber-cyan/50"
            >
              <input
                autoFocus
                type="text"
                value={editingTitle}
                onChange={(e) => onChangeEditingTitle(e.target.value)}
                className="flex-1 bg-transparent text-xs text-slate-100 px-2 py-1 outline-none"
              />
              <button
                type="submit"
                className="p-1 text-emerald-400 hover:text-emerald-300"
                title="Save"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onCancelRename}
                className="p-1 text-slate-400 hover:text-slate-200"
                title="Cancel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          );
        }

        return (
          <div
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`group flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all ${
              isActive
                ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 shadow-sm'
                : 'text-slate-300 hover:bg-slate-900/80 hover:text-slate-100 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyber-cyan' : 'text-slate-500'}`} />
              <span className="truncate">{c.title || 'Untitled Chat'}</span>
            </div>

            {/* Actions: Rename & Delete */}
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => onStartRename(c.id, c.title, e)}
                className="p-1 text-slate-400 hover:text-slate-200 rounded transition-colors"
                title="Rename chat"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => onDelete(c.id, c.title, e)}
                className="p-1 text-slate-400 hover:text-rose-400 rounded transition-colors"
                title="Delete chat"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
