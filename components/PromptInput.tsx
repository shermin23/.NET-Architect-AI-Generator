import React from 'react';
import { Sparkles, Terminal, GraduationCap, ArrowRight } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  
  const setTemplate = (template: string) => {
    onChange(template);
  };

  const templates = [
    {
      label: "Basic To-Do API",
      text: `Create a 'ToDo' API with ASP.NET Core.
It needs:
1. A 'TodoItem' model (Id, Title, IsCompleted).
2. An in-memory list to store items.
3. Endpoints to Get All, Add, and Mark Complete.
4. Clean code with proper comments.`
    },
    {
      label: "Redis Aggregator",
      text: `Project: API Aggregator with Redis
1. Fetch data from 2 mock external APIs (slow).
2. Cache the result in Redis for 30s.
3. If one API fails, return partial data (Fault Tolerance).
4. Use IHttpClientFactory and Dependency Injection.`
    }
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg flex flex-col h-full">
      <div className="flex items-center space-x-2 mb-4">
        <Terminal className="text-blue-400" size={20} />
        <h2 className="text-lg font-semibold text-white">Project Blueprint</h2>
      </div>

      {/* Junior Developer Guidance */}
      <div className="mb-4 bg-blue-900/20 border border-blue-800/50 p-3 rounded-lg">
         <div className="flex items-start space-x-3">
            <div className="bg-blue-500/10 p-1.5 rounded-md mt-0.5">
                <GraduationCap className="text-blue-400" size={18} />
            </div>
            <div className="text-sm text-blue-100/80">
               <p className="font-medium text-blue-300 mb-1">Junior Developer Tips:</p>
               <ul className="space-y-1 text-xs opacity-80">
                  <li className="flex items-start">
                    <ArrowRight size={12} className="mt-0.5 mr-1 text-blue-500" />
                    Be specific about what the API does (e.g., "Weather Service").
                  </li>
                  <li className="flex items-start">
                    <ArrowRight size={12} className="mt-0.5 mr-1 text-blue-500" />
                    Mention concepts you want to learn (e.g., "Use Dependency Injection").
                  </li>
               </ul>
            </div>
         </div>
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 min-h-[160px] bg-gray-900 text-gray-200 p-4 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono text-sm resize-none mb-4"
        placeholder="Describe your .NET Core project here..."
      />

      <div className="mb-6">
        <div className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider">Starter Templates</div>
        <div className="flex flex-wrap gap-2">
            {templates.map(t => (
                <button 
                    key={t.label}
                    onClick={() => setTemplate(t.text)}
                    className="text-xs bg-gray-700 hover:bg-gray-600 hover:text-white text-gray-300 px-3 py-1.5 rounded-md transition-all border border-gray-600 hover:border-gray-500"
                >
                    {t.label}
                </button>
            ))}
        </div>
      </div>

      <div className="mt-auto flex justify-end">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all w-full justify-center sm:w-auto ${
            isLoading
              ? 'bg-blue-600/50 cursor-not-allowed text-blue-200'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Architecting...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Generate Solution</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};