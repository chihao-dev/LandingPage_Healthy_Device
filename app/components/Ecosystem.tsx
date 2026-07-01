'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useEcommerce } from '@/hooks/useEcommerce';
import { Product } from '@/lib/types';

export default function Ecosystem() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    favorites, viewedProducts,
    addToCart, toggleFavorite, trackView
  } = useEcommerce();

  useEffect(() => {
    // Lấy dữ liệu từ API
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleView = (product: Product) => {
    trackView(product);
    window.dispatchEvent(new CustomEvent('behavior-event', {
      detail: { message: `👀 Đang xem: ${product.name}` }
    }));
  };

  const handleToggleFavorite = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide px-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-shrink-0 w-[300px] h-80 rounded-3xl bg-slate-100 dark:bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x px-4">
      {products.length > 0 ? (
        products.map((p) => {
          const isFav = favorites.some(f => f.name === p.name);
          const isViewed = viewedProducts.some(v => v.name === p.name);

          return (
            <div
              key={p.id}
              onClick={() => handleView(p)}
              className="flex-shrink-0 w-[300px] snap-center rounded-3xl overflow-hidden group cursor-pointer border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-md transition-all hover:shadow-md dark:hover:shadow-lg"
            >
              {/* Image area */}
              <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                <Image
                  src={p.image_url || 'https://via.placeholder.com/300x200?text=Product'}
                  alt={p.name}
                  fill
                  sizes="300px"
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />

                {/* Actions Overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={(e) => handleToggleFavorite(e, p)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg ${
                      isFav
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 dark:bg-black/50 text-slate-400 hover:text-red-500'
                    }`}
                  >
                    <svg className="w-5 h-5" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {isViewed && (
                  <span className="absolute top-4 left-4 bg-blue-600 text-[10px] font-bold px-2 py-1 rounded-full text-white uppercase tracking-tighter">
                    Đã xem
                  </span>
                )}
              </div>

              {/* Content area */}
              <div className="p-6">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{p.category || 'Sản phẩm'}</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2 line-clamp-1">{p.name}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mb-4 h-8 line-clamp-2">{p.description || 'Thông tin chi tiết đang cập nhật...'}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {p.price
                      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)
                      : 'Liên hệ'}
                  </span>
                  <button
                    onClick={(e) => handleAddToCart(e, p)}
                    className="bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-full transition-all active:scale-95"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full text-center py-20 bg-slate-100 dark:bg-white/5 rounded-3xl border border-dashed border-slate-300 dark:border-white/10">
          <p className="text-slate-500 dark:text-slate-400 font-medium">Chưa có sản phẩm nào trong hệ thống. Vui lòng kiểm tra Supabase hoặc RLS.</p>
        </div>
      )}
    </div>
  );
}
