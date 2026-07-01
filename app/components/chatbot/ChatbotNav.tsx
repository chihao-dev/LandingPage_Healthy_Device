'use client';

import { ChatTabType } from '@/lib/types';

interface ChatbotNavProps {
  activeTab: ChatTabType;
  cartCount: number;
  favoritesCount: number;
  onTabChange: (tab: ChatTabType) => void;
}

export default function ChatbotNav({
  activeTab,
  cartCount,
  favoritesCount,
  onTabChange
}: ChatbotNavProps) {
  const tabs = [
    { id: 'chat', label: 'Chat', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /> },
    { id: 'cart', label: 'Giỏ hàng', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />, count: cartCount },
    { id: 'favorites', label: 'Yêu thích', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />, count: favoritesCount },
    { id: 'history', label: 'Đã xem', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> }
  ];

  return (
    <div className="flex border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/5 px-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as ChatTabType)}
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
  );
}
