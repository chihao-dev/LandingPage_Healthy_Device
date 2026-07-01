'use client';

import { Product } from '@/lib/types';

interface ProductItemProps {
  product: Product;
  isFavorite: boolean;
  onTrackView: (p: Product) => void;
  onToggleFavorite: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  showActions?: boolean;
}

export default function ProductItem({
  product,
  isFavorite,
  onTrackView,
  onToggleFavorite,
  onAddToCart,
  showActions = true
}: ProductItemProps) {
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(product.price);

  return (
    <div
      className="group flex gap-3 items-center p-3 border border-zinc-200 dark:border-white/5 rounded-2xl bg-white dark:bg-white/5 hover:border-blue-500/50 transition-all shadow-sm"
      onClick={() => onTrackView(product)}
    >
      {product.image_url ? (
        <img
          src={product.image_url}
          alt={product.name}
          className="w-14 h-14 object-cover rounded-xl bg-zinc-100 dark:bg-zinc-800"
        />
      ) : (
        <div className="w-14 h-14 bg-zinc-100 dark:bg-white/5 rounded-xl flex items-center justify-center text-zinc-400">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors">
          {product.name}
        </p>
        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
          {formattedPrice}
        </p>
      </div>

      {showActions && (
        <div className="flex flex-col gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(product); }}
            className={`p-1.5 rounded-lg transition-colors ${
              isFavorite
                ? 'text-red-500 bg-red-50 dark:bg-red-500/10'
                : 'text-zinc-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <svg className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
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
}
