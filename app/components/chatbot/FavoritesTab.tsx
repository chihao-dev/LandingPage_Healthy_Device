'use client';

import { Product } from '@/lib/types';
import ProductItem from './ProductItem';

interface FavoritesTabProps {
  favorites: Product[];
  onTrackView: (p: Product) => void;
  onToggleFavorite: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export default function FavoritesTab({
  favorites,
  onTrackView,
  onToggleFavorite,
  onAddToCart
}: FavoritesTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-zinc-900 dark:text-white">Sản phẩm yêu thích</h3>
      {favorites.length === 0 ? (
        <div className="text-center py-10 text-zinc-400">
          <p>Chưa có sản phẩm yêu thích</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {favorites.map(p => (
            <ProductItem
              key={p.id || p.name}
              product={p}
              isFavorite={true}
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
