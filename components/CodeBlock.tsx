import React from 'react';
import { Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  filename: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, filename }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-lg border border-gray-700 overflow-hidden shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-black/20">
        <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-sm text-gray-400 font-mono">{filename}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <Copy size={14} />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <pre className="font-mono text-sm text-gray-300 leading-relaxed whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};