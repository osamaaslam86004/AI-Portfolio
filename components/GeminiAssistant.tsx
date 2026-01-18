
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { chatWithGemini } from '../services/geminiService';
import { Message } from '../types';

const GeminiAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "Hi! I'm Alex's AI twin. Ask me anything about my experience with Python, Django, or my past projects!", 
      timestamp: new Date() 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await chatWithGemini(input, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response || "Something went wrong.", timestamp: new Date() }]);
    setIsLoading(false);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm flex flex-col h-[600px] shadow-2xl">
      <div className="bg-indigo-600/10 p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
          <Sparkles className="text-white w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white leading-none">Gemini Assistant</h3>
          <span className="text-xs text-indigo-400 font-mono">Powered by Gemini 3 Flash</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-700' : 'bg-indigo-900/50'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-indigo-400" />}
              </div>
              <div className={`rounded-2xl p-4 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-800/80 text-slate-200 border border-slate-700 rounded-tl-none shadow-lg'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-indigo-900/50 flex items-center justify-center">
                <Bot size={16} className="text-indigo-400" />
              </div>
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 rounded-tl-none">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Django, Python, or work history..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-100 placeholder-slate-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:opacity-50 text-white rounded-lg transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-500 mt-2">
          Model may provide inaccurate info about the human Alex. Use with caution.
        </p>
      </div>
    </div>
  );
};

export default GeminiAssistant;
