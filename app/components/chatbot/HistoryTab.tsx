'use client';

import { Product } from '@/lib/types';
import ProductItem from './ProductItem';

interface HistoryTabProps {
  viewedProducts: Product[];
  favorites: Product[];
  onTrackView: (p: Product) => void;
  onToggleFavorite: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export default function HistoryTab({
  viewedProducts,
  favorites,
  onTrackView,
  onToggleFavorite,
  onAddToCart
}: HistoryTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-zinc-900 dark:text-white">Sản phẩm đã xem</h3>
      {viewedProducts.length === 0 ? (
        <div className="text-center py-10 text-zinc-400">
          <p>Bạn chưa xem sản phẩm nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {viewedProducts.map(p => (
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
    </div>
  );
}
