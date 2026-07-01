'use client';

import { useState, useEffect } from 'react';

export default function TechSpecs() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-700 overflow-hidden p-8 space-y-4">
        <div className="skeleton-card w-full"></div>
        <div className="skeleton-card w-full h-8"></div>
        <div className="skeleton-card w-full h-8"></div>
        <div className="skeleton-card w-full h-8"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-700 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <tbody>
          {[
            ['Hiệu suất lọc (CADR)', '800 m³/h (Chuyên lọc bụi mịn và vi khuẩn)'],
            ['Diện tích tối ưu', '60 - 90 m²'],
            ['Màng lọc', 'Đa tầng 360°, Lõi HEPA H13, Than hoạt tính'],
            ['Độ ồn (Chế độ ngủ)', '20 dB (Tĩnh lặng tuyệt đối)'],
            ['Công suất tiêu thụ', '15W - 55W (Tiết kiệm điện ưu việt nhờ AI)'],
            ['Kết nối & Cảm biến', 'Wi-Fi thông minh, Cảm biến điểm laser siêu nhạy'],
          ].map(([label, value], i) => (
            <tr key={i} className="border-b border-zinc-50 dark:border-zinc-700 last:border-0 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-colors">
              <td className="py-4 md:py-6 px-4 md:px-8 font-bold text-zinc-500 dark:text-zinc-400 w-1/3 text-xs md:text-base">{label}</td>
              <td className="py-4 md:py-6 px-4 md:px-8 text-zinc-900 dark:text-zinc-100 font-medium text-xs md:text-base">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
