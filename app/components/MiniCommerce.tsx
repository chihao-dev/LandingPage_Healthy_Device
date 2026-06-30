'use client';

import { useState, useEffect } from 'react';

export default function MiniCommerce() {
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    // Listen for custom e-commerce events
    const handleCart = () => setCartCount(prev => prev + 1);
    const handleFav = (e: any) => setFavCount(prev => e.detail.active ? prev + 1 : Math.max(0, prev - 1));

    window.addEventListener('add-to-cart', handleCart);
    window.addEventListener('toggle-fav', handleFav);

    return () => {
      window.removeEventListener('add-to-cart', handleCart);
      window.removeEventListener('toggle-fav', handleFav);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-3">
      <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-2 rounded-full shadow-lg">
        <span className="text-red-500">❤️</span>
        <span className="font-bold text-zinc-900 dark:text-zinc-50">{favCount}</span>
      </div>
      <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg animate-in zoom-in-50">
        <span>🛒</span>
        <span className="font-bold">{cartCount}</span>
      </div>
    </div>
  );
}
