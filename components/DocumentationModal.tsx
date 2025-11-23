import React from 'react';
import { X, BookOpen, Cpu, ShieldCheck, Zap } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-[#1a202c]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <BookOpen className="text-blue-400" size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">How to Use DotNet Architect AI</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-8 text-gray-300">
          
          <section>
            <h3 className="text-lg font-semibold text-white mb-3">What is this tool?</h3>
            <p className="leading-relaxed">
              DotNet Architect AI is a smart coding assistant designed for C# developers. It acts like a Senior Backend Engineer that instantly writes the structure (scaffolding) for complex web applications. Instead of spending hours setting up files, you describe what you need, and the AI generates the code for you.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">How does it work?</h3>
            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                <div>
                  <strong className="text-gray-200">Describe your project:</strong> 
                  <p className="text-sm mt-1">In the input box, explain what you want to build. For example: "I need an API that gets weather data and saves it to a database."</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                <div>
                  <strong className="text-gray-200">Generate Solution:</strong> 
                  <p className="text-sm mt-1">Click the "Generate Solution" button. The AI (Google Gemini) will analyze your request and write the necessary C# code.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">3</span>
                <div>
                  <strong className="text-gray-200">Review and Copy:</strong> 
                  <p className="text-sm mt-1">On the right side, you will see three tabs (Service, Program, Controller). You can read the code, read the AI's explanation, and copy the code directly into your own project files.</p>
                </div>
              </li>
            </ol>
          </section>

          <section className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
              <Cpu className="text-purple-400 mb-2" size={24} />
              <h4 className="font-medium text-white mb-1">Smart Logic</h4>
              <p className="text-xs text-gray-400">Generates business logic using best practices like Async/Await.</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
              <Zap className="text-yellow-400 mb-2" size={24} />
              <h4 className="font-medium text-white mb-1">Performance</h4>
              <p className="text-xs text-gray-400">Includes caching (Redis) and dependency injection setup automatically.</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
              <ShieldCheck className="text-green-400 mb-2" size={24} />
              <h4 className="font-medium text-white mb-1">Robustness</h4>
              <p className="text-xs text-gray-400">Adds error handling to make sure your app doesn't crash easily.</p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-[#1a202c] flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium text-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};