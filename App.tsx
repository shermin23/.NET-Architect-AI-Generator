import React, { useState } from 'react';
import { Layout, Server, Database, Code2, AlertCircle, CheckCircle2, BookOpen } from 'lucide-react';
import { PromptInput } from './components/PromptInput';
import { CodeBlock } from './components/CodeBlock';
import { generateArchitecture } from './services/geminiService';
import { GeneratedSolution, GenerationStatus } from './types';
import { DocumentationModal } from './components/DocumentationModal';

const INITIAL_PROMPT = `Create a simple "Weather Service" API in ASP.NET Core.

1. Define a WeatherForecast model (Date, TemperatureC, Summary).
2. Create an endpoint /weather that returns a random forecast.
3. Use Dependency Injection to inject the weather generation logic.
4. Ensure the code is clean and easy to understand.`;

const App: React.FC = () => {
  const [prompt, setPrompt] = useState(INITIAL_PROMPT);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [solution, setSolution] = useState<GeneratedSolution | null>(null);
  const [activeTab, setActiveTab] = useState<'program' | 'service' | 'controller'>('service');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showDocs, setShowDocs] = useState(false);

  const handleGenerate = async () => {
    setStatus(GenerationStatus.LOADING);
    setErrorMsg('');
    try {
      const result = await generateArchitecture(prompt);
      setSolution(result);
      setStatus(GenerationStatus.SUCCESS);
    } catch (e: any) {
      setStatus(GenerationStatus.ERROR);
      setErrorMsg(e.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-blue-500/30">
      
      <DocumentationModal isOpen={showDocs} onClose={() => setShowDocs(false)} />

      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-blue-900/20">
              <Layout size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                DotNet Architect AI
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide">ASP.NET CORE SOLUTION GENERATOR</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <button 
              onClick={() => setShowDocs(true)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
            >
               <BookOpen size={16} className="group-hover:text-blue-400 transition-colors" />
               <span>Documentation</span>
            </button>
            <div className="flex items-center space-x-4 text-gray-400 border-l border-gray-800 pl-6">
              <div className="flex items-center space-x-1.5">
                 <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                 <span>System Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 space-y-6">
            <PromptInput 
              value={prompt} 
              onChange={setPrompt} 
              onSubmit={handleGenerate}
              isLoading={status === GenerationStatus.LOADING}
            />

            {status === GenerationStatus.IDLE && (
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800/50 border-dashed">
                <div className="flex flex-col items-center justify-center text-center space-y-3 py-6">
                    <div className="bg-gray-800 p-3 rounded-full">
                        <Code2 size={24} className="text-gray-500" />
                    </div>
                    <p className="text-gray-400 text-sm max-w-xs">
                        Adjust requirements above and click "Generate Solution" to architect your C# backend.
                    </p>
                </div>
              </div>
            )}

            {status === GenerationStatus.ERROR && (
               <div className="bg-red-900/20 border border-red-800 rounded-xl p-4 flex items-start space-x-3">
                 <AlertCircle className="text-red-400 mt-0.5 flex-shrink-0" size={20} />
                 <div>
                    <h4 className="text-red-400 font-medium">Generation Failed</h4>
                    <p className="text-red-300/70 text-sm mt-1">{errorMsg}</p>
                 </div>
               </div>
            )}

            {status === GenerationStatus.SUCCESS && solution && (
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <h3 className="text-lg font-semibold text-white">Architectural Summary</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {solution.explanation}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-700/50 grid grid-cols-2 gap-3">
                    <div className="bg-gray-900/50 p-3 rounded-lg flex items-center space-x-3">
                        <Server size={18} className="text-blue-400" />
                        <div className="text-xs">
                            <div className="text-gray-400">Target Framework</div>
                            <div className="text-gray-200 font-mono">.NET 8.0</div>
                        </div>
                    </div>
                    <div className="bg-gray-900/50 p-3 rounded-lg flex items-center space-x-3">
                        <Database size={18} className="text-red-400" />
                        <div className="text-xs">
                            <div className="text-gray-400">Caching Strategy</div>
                            <div className="text-gray-200 font-mono">Redis / DI</div>
                        </div>
                    </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Code Output */}
          <div className="lg:col-span-7 h-[800px] flex flex-col">
            {solution ? (
              <div className="flex flex-col h-full bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-800 bg-[#1e1e1e]">
                  <button
                    onClick={() => setActiveTab('service')}
                    className={`px-4 py-3 text-sm font-medium flex items-center space-x-2 border-r border-gray-800 hover:bg-[#2d2d2d] transition-colors ${
                      activeTab === 'service' ? 'bg-[#1e1e1e] text-blue-400 border-t-2 border-t-blue-400' : 'bg-[#252526] text-gray-500 border-t-2 border-t-transparent'
                    }`}
                  >
                    <span>AggregatorService.cs</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('program')}
                    className={`px-4 py-3 text-sm font-medium flex items-center space-x-2 border-r border-gray-800 hover:bg-[#2d2d2d] transition-colors ${
                      activeTab === 'program' ? 'bg-[#1e1e1e] text-blue-400 border-t-2 border-t-blue-400' : 'bg-[#252526] text-gray-500 border-t-2 border-t-transparent'
                    }`}
                  >
                    <span>Program.cs</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('controller')}
                    className={`px-4 py-3 text-sm font-medium flex items-center space-x-2 border-r border-gray-800 hover:bg-[#2d2d2d] transition-colors ${
                      activeTab === 'controller' ? 'bg-[#1e1e1e] text-blue-400 border-t-2 border-t-blue-400' : 'bg-[#252526] text-gray-500 border-t-2 border-t-transparent'
                    }`}
                  >
                    <span>AggregatorController.cs</span>
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden">
                    {activeTab === 'service' && <CodeBlock code={solution.aggregatorServiceCs} language="csharp" filename="AggregatorService.cs" />}
                    {activeTab === 'program' && <CodeBlock code={solution.programCs} language="csharp" filename="Program.cs" />}
                    {activeTab === 'controller' && <CodeBlock code={solution.aggregatorControllerCs} language="csharp" filename="AggregatorController.cs" />}
                </div>
              </div>
            ) : (
                <div className="h-full bg-gray-900 rounded-xl border border-gray-800 border-dashed flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-800 rounded-2xl mx-auto flex items-center justify-center mb-4">
                            <Code2 size={32} className="text-gray-600" />
                        </div>
                        <h3 className="text-gray-400 font-medium">No Code Generated Yet</h3>
                        <p className="text-gray-600 text-sm mt-1">Submit the requirements to view the solution.</p>
                    </div>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;