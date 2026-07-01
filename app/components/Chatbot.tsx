'use client';

import { useState, useEffect, useRef } from 'react';
import { useEcommerce } from '@/hooks/useEcommerce';
import { ChatMessage, Product, ChatTabType } from '@/lib/types';

import FloatingButtons from './chatbot/FloatingButtons';
import ChatbotHeader from './chatbot/ChatbotHeader';
import ChatbotNav from './chatbot/ChatbotNav';
import ChatTab from './chatbot/ChatTab';
import CartTab from './chatbot/CartTab';
import FavoritesTab from './chatbot/FavoritesTab';
import HistoryTab from './chatbot/HistoryTab';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ChatTabType>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    cart, favorites, viewedProducts,
    addToCart, removeFromCart, toggleFavorite, trackView
  } = useEcommerce();

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
  }, [messages, activeTab]);

  const loadNode = async (node: string, userText?: string) => {
    if (userText) {
      setMessages(p => [...p, { id: Date.now().toString() + 'u', type: 'user', text: userText }]);
    }
    
    setLoading(true);
    setActiveTab('chat');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ node })
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      const botMessage: ChatMessage = {
        id: Date.now().toString() + 'b',
        type: 'bot', 
        text: data.text || 'Xin lỗi, tôi không hiểu ý bạn.',
        options: data.options || [],
        products: data.products || []
      };

      setMessages(p => [...p, botMessage]);

      if (data.products && Array.isArray(data.products)) {
        data.products.forEach((p: Product) => trackView(p));
      }
    } catch (error) {
      setMessages(p => [...p, { id: Date.now().toString() + 'e', type: 'bot', text: 'Hệ thống đang bận, vui lòng thử lại sau.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchTab = (tab: ChatTabType) => {
    setIsOpen(true);
    setActiveTab(tab);
  };

  return (
    <>
      <FloatingButtons
        isOpen={isOpen}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        favoritesCount={favorites.length}
        onToggleOpen={() => setIsOpen(!isOpen)}
        onSwitchTab={handleSwitchTab}
      />

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-28 sm:right-8 z-[9999] w-full sm:w-[400px] h-full sm:h-[600px] bg-white dark:bg-[#0a0a15] border-t sm:border border-zinc-200 dark:border-white/10 rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-full sm:slide-in-from-bottom-6 duration-300">
          <ChatbotHeader onClose={() => setIsOpen(false)} />

          <ChatbotNav
            activeTab={activeTab}
            cartCount={cart.length}
            favoritesCount={favorites.length}
            onTabChange={setActiveTab}
          />

          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-6 scrollbar-hide">
            {activeTab === 'chat' && (
              <ChatTab
                messages={messages}
                loading={loading}
                favorites={favorites}
                onOptionClick={loadNode}
                onTrackView={trackView}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            )}

            {activeTab === 'cart' && (
              <CartTab cart={cart} onRemove={removeFromCart} />
            )}

            {activeTab === 'favorites' && (
              <FavoritesTab
                favorites={favorites}
                onTrackView={trackView}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            )}

            {activeTab === 'history' && (
              <HistoryTab
                viewedProducts={viewedProducts}
                favorites={favorites}
                onTrackView={trackView}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
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
