'use client';

import { ChatTabType } from '@/lib/types';

interface FloatingButtonsProps {
  isOpen: boolean;
  cartCount: number;
  favoritesCount: number;
  onToggleOpen: () => void;
  onSwitchTab: (tab: ChatTabType) => void;
}

export default function FloatingButtons({
  isOpen,
  cartCount,
  favoritesCount,
  onToggleOpen,
  onSwitchTab
}: FloatingButtonsProps) {
  return (
    <div className="fixed bottom-6 right-4 sm:bottom-10 sm:right-8 z-[9999] flex flex-col gap-3 sm:gap-4 items-center">
      {/* Favorites Button */}
      <button
        onClick={() => onSwitchTab('favorites')}
        className="w-11 h-11 sm:w-12 sm:h-12 bg-white dark:bg-[#1a1a2e] text-red-500 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform border border-zinc-100 dark:border-white/10 relative group"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill={favoritesCount > 0 ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {favoritesCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[8px] sm:text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {favoritesCount}
          </span>
        )}
        <span className="hidden sm:block absolute right-14 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Yêu thích</span>
      </button>

      {/* Cart Button */}
      <button
        onClick={() => onSwitchTab('cart')}
        className="w-11 h-11 sm:w-12 sm:h-12 bg-white dark:bg-[#1a1a2e] text-blue-600 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform border border-zinc-100 dark:border-white/10 relative group"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] sm:text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
            {cartCount}
          </span>
        )}
        <span className="hidden sm:block absolute right-14 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Giỏ hàng</span>
      </button>

      {/* Main Chat Toggle Button */}
      <button
        onClick={onToggleOpen}
        className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
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
    </div>
  );
}
