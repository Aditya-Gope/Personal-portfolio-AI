import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Check, Copy } from 'lucide-react';

interface MarkdownContentProps {
  content: string;
  isStreaming?: boolean;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, isStreaming }) => {
  return (
    <div className={`prose dark:prose-invert max-w-none text-[15px] leading-relaxed break-words ${isStreaming ? 'cursor-blink' : ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            const isInline = !match && !codeString.includes('\n');

            if (isInline) {
              return (
                <code
                  className="bg-slate-800/80 text-cyber-cyan px-1.5 py-0.5 rounded font-mono text-[13px] border border-slate-700/60"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock language={match ? match[1] : 'code'} code={codeString} />
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-3 rounded-lg border border-slate-700/60 shadow-inner">
                <table className="min-w-full divide-y divide-slate-700/60 text-sm">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-slate-800/80 text-slate-200 font-semibold">{children}</thead>;
          },
          tbody({ children }) {
            return <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">{children}</tbody>;
          },
          th({ children }) {
            return <th className="px-3.5 py-2 text-left text-xs uppercase tracking-wider text-slate-300">{children}</th>;
          },
          td({ children }) {
            return <td className="px-3.5 py-2 text-slate-300">{children}</td>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-cyber-cyan/70 bg-cyber-cyan/5 px-4 py-2 my-3 rounded-r-lg italic text-slate-300 text-sm">
                {children}
              </blockquote>
            );
          },
          h1({ children }) {
            return <h1 className="text-xl font-bold tracking-tight text-slate-100 mt-4 mb-2">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-lg font-semibold tracking-tight text-slate-100 mt-3 mb-1.5 text-cyber-cyan">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-base font-semibold text-slate-200 mt-3 mb-1">{children}</h3>;
          },
          ul({ children }) {
            return <ul className="list-disc pl-5 my-2 space-y-1 text-slate-300">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal pl-5 my-2 space-y-1 text-slate-300">{children}</ol>;
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-cyan hover:underline decoration-cyber-cyan/50 font-medium transition-colors"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const CodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  return (
    <div className="relative my-3.5 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-lg">
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
        <span className="uppercase tracking-wider font-semibold text-slate-300">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-slate-200 bg-slate-950/90 m-0">
        <code>{code}</code>
      </pre>
    </div>
  );
};
