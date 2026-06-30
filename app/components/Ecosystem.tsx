'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { imageAssets } from '../constants/assets';

export default function Ecosystem() {
  const [viewed, setViewed] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('viewed_products');
    if (stored) setViewed(JSON.parse(stored));

    // Lấy dữ liệu từ API riêng biệt (BA-WAY)
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleView = (id: string, name: string) => {
    if (!viewed.includes(id)) {
      const newViewed = [...viewed, id];
      setViewed(newViewed);
      localStorage.setItem('viewed_products', JSON.stringify(newViewed));
      window.dispatchEvent(new CustomEvent('behavior-event', { detail: { message: `👀 Đang xem cấu hình: ${name}` } }));
    }
  };

  const handleAddToCart = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('behavior-event', { detail: { message: `🛒 Đã thêm 1 x ${name} vào giỏ !` } }));
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
          return (
            <div
              key={p.id}
              onClick={() => handleView(p.id, p.name)}
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
                {viewed.includes(p.id) && (
                  <span className="absolute top-4 left-4 bg-blue-600 text-[10px] font-bold px-2 py-1 rounded-full text-white uppercase tracking-tighter">
                    Đã xem
                  </span>
                )}
              </div>

              {/* Content area */}
              <div className="p-6">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{p.category || 'Sản phẩm'}</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2 line-clamp-1">{p.name}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">{p.description || 'Thông tin chi tiết đang cập nhật...'}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {p.price
                      ? typeof p.price === 'number'
                        ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)
                        : p.price
                      : 'Liên hệ'}
                  </span>
                  <button
                    onClick={(e) => handleAddToCart(e, p.name)}
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
