'use client';

import { ChatMessage, Product } from '@/lib/types';
import ProductItem from './ProductItem';

interface ChatTabProps {
  messages: ChatMessage[];
  loading: boolean;
  favorites: Product[];
  onOptionClick: (next: string, label: string) => void;
  onTrackView: (p: Product) => void;
  onToggleFavorite: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export default function ChatTab({
  messages,
  loading,
  favorites,
  onOptionClick,
  onTrackView,
  onToggleFavorite,
  onAddToCart
}: ChatTabProps) {
  return (
    <>
      <div className="text-center mb-4">
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Hôm nay</span>
      </div>

      {messages.map((msg, idx) => (
        <div key={msg.id} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} space-y-3`}>
          <div className={`px-4 py-3 rounded-2xl max-w-[90%] text-sm leading-relaxed shadow-sm ${
            msg.type === 'user'
              ? 'bg-blue-600 text-white rounded-br-none font-medium'
              : 'bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-zinc-200 rounded-bl-none border border-zinc-200/50 dark:border-white/5'
          }`}>
            {msg.text}
          </div>

          {msg.products && msg.products.length > 0 && (
            <div className="mt-3 grid grid-cols-1 gap-3 w-full">
              {msg.products.map((p) => (
                <ProductItem
                  key={p.id || p.name}
                  product={p}
                  isFavorite={favorites.some(f => f.name === p.name)}
                  onTrackView={onTrackView}
                  onToggleFavorite={onToggleFavorite}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}

          {msg.options && msg.options.length > 0 && idx === messages.length - 1 && !loading && (
            <div className="mt-4 flex flex-col gap-2 w-full max-w-[90%]">
              {msg.options.map(o => (
                <button
                  key={o.next}
                  onClick={() => onOptionClick(o.next, o.label)}
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
  );
}
