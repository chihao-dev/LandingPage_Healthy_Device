'use client';

import { useState, useEffect, useRef } from 'react';

type ChatOption = { label: string; next: string };
type Product = { id?: string; name: string; price: number; image_url?: string };

type ChatMessage = {
  id: string;
  type: 'bot' | 'user';
  text: string;
  options?: ChatOption[];
  products?: Product[];
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      loadNode('start');
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadNode = async (node: string, userText?: string) => {
    if (userText) {
      setMessages(p => [...p, { id: Date.now().toString() + 'u', type: 'user', text: userText }]);
    }
    
    setLoading(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ node })
      });

      const data = await res.json();
      setMessages(p => [...p, { 
        id: Date.now().toString() + 'b',
        type: 'bot', 
        text: data.text, 
        options: data.options,
        products: data.products 
      }]);
    } catch (error) {
      setMessages(p => [...p, { id: Date.now().toString() + 'e', type: 'bot', text: 'Hệ thống đang bận, vui lòng thử lại sau.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-8 z-[9999] w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-40 right-8 z-[9999] w-85 h-[550px] bg-white dark:bg-[#0a0a15] border border-zinc-200 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-bold tracking-tight">AI Health Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-6 scrollbar-hide">
            <div className="text-center mb-4">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Hôm nay</span>
            </div>

            {messages.map((msg, idx) => (
              <div key={msg.id} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} reveal-chat`}>
                <div className={`px-4 py-3 rounded-2xl max-w-[90%] text-sm leading-relaxed shadow-sm ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none font-medium'
                    : 'bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-zinc-200 rounded-bl-none border border-zinc-200/50 dark:border-white/5'
                }`}>
                  {msg.text}
                </div>
                
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-3 grid grid-cols-1 gap-3 w-full">
                    {msg.products.map((p, i) => (
                      <div key={i} className="group flex gap-3 items-center p-3 border border-zinc-200 dark:border-white/5 rounded-2xl bg-white dark:bg-white/5 hover:border-blue-500/50 transition-all cursor-pointer shadow-sm">
                        {p.image_url ? (
                          <img src={p.image_url} alt={p.name} className="w-14 h-14 object-cover rounded-xl bg-zinc-100 dark:bg-zinc-800" />
                        ) : (
                          <div className="w-14 h-14 bg-zinc-100 dark:bg-white/5 rounded-xl flex items-center justify-center text-zinc-400">
                             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors">{p.name}</p>
                          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {msg.options && msg.options.length > 0 && idx === messages.length - 1 && !loading && (
                  <div className="mt-4 flex flex-col gap-2 w-full max-w-[90%]">
                    {msg.options.map(o => (
                      <button
                        key={o.next}
                        onClick={() => loadNode(o.next, o.label)}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold bg-white dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-800 transition-all shadow-sm"
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1 px-4 py-3 bg-zinc-100 dark:bg-white/5 rounded-2xl rounded-bl-none border border-zinc-200/50 dark:border-white/5">
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-black/20">
            <p className="text-[10px] text-center text-zinc-400 font-medium">Sức mạnh bởi AI Health Intelligence</p>
          </div>
        </div>
      )}
    </>
  );
}
