'use client';

import { useState, useEffect, useRef } from 'react';

type ChatOption = { label: string; next: string };
type Product = { id?: string; name: string; price: number; image_url?: string };
type CartItem = Product & { quantity: number };

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
  const [activeTab, setActiveTab] = useState<'chat' | 'cart' | 'favorites' | 'history'>('chat');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Persistence: Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('chatbot_cart');
    const savedFavs = localStorage.getItem('chatbot_favs');
    const savedHistory = localStorage.getItem('chatbot_history');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedHistory) setViewedProducts(JSON.parse(savedHistory));
  }, []);

  // Persistence: Save data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('chatbot_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('chatbot_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('chatbot_history', JSON.stringify(viewedProducts));
  }, [viewedProducts]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      loadNode('start');
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (name: string) => {
    setCart(prev => prev.filter(item => item.name !== name));
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const isFav = prev.some(item => item.name === product.name);
      if (isFav) return prev.filter(item => item.name !== product.name);
      return [...prev, product];
    });
  };

  const trackView = (product: Product) => {
    setViewedProducts(prev => {
      const filtered = prev.filter(p => p.name !== product.name);
      return [product, ...filtered].slice(0, 10);
    });
  };

  const loadNode = async (node: string, userText?: string) => {
    if (userText) {
      setMessages(p => [...p, { id: Date.now().toString() + 'u', type: 'user', text: userText }]);
    }
    
    setLoading(true);
    setActiveTab('chat');
    try {
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
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

      if (data.products && data.products.length > 0) {
        data.products.forEach((p: Product) => trackView(p));
      }
    } catch (error) {
      setMessages(p => [...p, { id: Date.now().toString() + 'e', type: 'bot', text: 'Hệ thống đang bận, vui lòng thử lại sau.' }]);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = (p: Product, showActions = true) => (
    <div
      key={p.id || p.name}
      className="group flex gap-3 items-center p-3 border border-zinc-200 dark:border-white/5 rounded-2xl bg-white dark:bg-white/5 hover:border-blue-500/50 transition-all shadow-sm"
      onClick={() => trackView(p)}
    >
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
      {showActions && (
        <div className="flex flex-col gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(p); }}
            className={`p-1.5 rounded-lg transition-colors ${favorites.some(f => f.name === p.name) ? 'text-red-500 bg-red-50 dark:bg-red-500/10' : 'text-zinc-400 hover:text-red-500 hover:bg-red-50'}`}
          >
            <svg className="w-4 h-4" fill={favorites.some(f => f.name === p.name) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(p); }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-8 z-[9999] w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-40 right-8 z-[9999] w-85 h-[600px] bg-white dark:bg-[#0a0a15] border border-zinc-200 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
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

          {/* Navigation Tabs */}
          <div className="flex border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/5 px-2">
            {[
              { id: 'chat', label: 'Chat', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /> },
              { id: 'cart', label: 'Giỏ hàng', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />, count: cart.length },
              { id: 'favorites', label: 'Yêu thích', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />, count: favorites.length },
              { id: 'history', label: 'Đã xem', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 px-1 flex flex-col items-center gap-1 transition-all relative ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {tab.icon}
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
                {tab.count ? (
                  <span className="absolute top-2 right-4 bg-blue-600 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {tab.count}
                  </span>
                ) : null}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>

          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-6 scrollbar-hide">
            {activeTab === 'chat' && (
              <>
                <div className="text-center mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Hôm nay</span>
                </div>

                {messages.map((msg, idx) => (
                  <div key={msg.id} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-3 rounded-2xl max-w-[90%] text-sm leading-relaxed shadow-sm ${
                      msg.type === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none font-medium'
                        : 'bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-zinc-200 rounded-bl-none border border-zinc-200/50 dark:border-white/5'
                    }`}>
                      {msg.text}
                    </div>

                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-3 grid grid-cols-1 gap-3 w-full">
                        {msg.products.map((p) => renderProduct(p))}
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
              </>
            )}

            {activeTab === 'cart' && (
              <div className="space-y-4">
                <h3 className="font-bold text-zinc-900 dark:text-white">Giỏ hàng của bạn</h3>
                {cart.length === 0 ? (
                  <div className="text-center py-10 text-zinc-400">
                    <p>Giỏ hàng trống</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {cart.map(item => (
                        <div key={item.name} className="flex gap-3 items-center p-3 bg-zinc-50 dark:bg-white/5 rounded-2xl border border-zinc-100 dark:border-white/10">
                          {item.image_url ? (
                            <img src={item.image_url} className="w-12 h-12 object-cover rounded-lg" alt={item.name} />
                          ) : (
                            <div className="w-12 h-12 bg-zinc-200 dark:bg-white/10 rounded-lg flex items-center justify-center text-zinc-400">
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">{item.name}</p>
                            <p className="text-xs text-blue-600 font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)} x {item.quantity}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.name)} className="text-zinc-400 hover:text-red-500 p-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-zinc-100 dark:border-white/10">
                      <div className="flex justify-between font-bold mb-4">
                        <span>Tổng cộng:</span>
                        <span className="text-blue-600">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.reduce((a, b) => a + (b.price * b.quantity), 0))}
                        </span>
                      </div>
                      <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                        Thanh toán ngay
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="space-y-4">
                <h3 className="font-bold text-zinc-900 dark:text-white">Sản phẩm yêu thích</h3>
                {favorites.length === 0 ? (
                  <div className="text-center py-10 text-zinc-400">
                    <p>Chưa có sản phẩm yêu thích</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {favorites.map(p => renderProduct(p))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                <h3 className="font-bold text-zinc-900 dark:text-white">Sản phẩm đã xem</h3>
                {viewedProducts.length === 0 ? (
                  <div className="text-center py-10 text-zinc-400">
                    <p>Bạn chưa xem sản phẩm nào</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {viewedProducts.map(p => renderProduct(p))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-black/20">
            <p className="text-[10px] text-center text-zinc-400 font-medium uppercase tracking-widest">Powered by AI Health Intelligence</p>
          </div>
        </div>
      )}
    </>
  );
}
