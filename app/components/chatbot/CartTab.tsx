'use client';

import { CartItem } from '@/lib/types';

interface CartTabProps {
  cart: CartItem[];
  onRemove: (name: string) => void;
}

export default function CartTab({ cart, onRemove }: CartTabProps) {
  const total = cart.reduce((a, b) => a + (b.price * b.quantity), 0);
  const formattedTotal = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(total);

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-zinc-900 dark:text-white">Giỏ hàng của bạn</h3>
      {cart.length === 0 ? (
        <div className="text-center py-10 text-zinc-400">
          <p>Giỏ hàng trống</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.name} className="flex gap-3 items-center p-3 bg-zinc-50 dark:bg-white/5 rounded-2xl border border-zinc-100 dark:border-white/10">
                {item.image_url ? (
                  <img src={item.image_url} className="w-12 h-12 object-cover rounded-lg" alt={item.name} />
                ) : (
                  <div className="w-12 h-12 bg-zinc-200 dark:bg-white/10 rounded-lg flex items-center justify-center text-zinc-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{item.name}</p>
                  <p className="text-xs text-blue-600 font-bold">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)} x {item.quantity}
                  </p>
                </div>
                <button onClick={() => onRemove(item.name)} className="text-zinc-400 hover:text-red-500 p-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-zinc-100 dark:border-white/10">
            <div className="flex justify-between font-bold mb-4">
              <span>Tổng cộng:</span>
              <span className="text-blue-600">{formattedTotal}</span>
            </div>
            <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
              Thanh toán ngay
            </button>
          </div>
        </>
      )}
    </div>
  );
}
