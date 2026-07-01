'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    // Mặc định là light, chỉ chuyển sang dark nếu đã lưu trong localStorage là 'dark'
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
      // Nếu chưa có theme trong localStorage, mặc định chọn light
      if (!theme) localStorage.setItem('theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 left-4 sm:bottom-8 sm:left-8 z-[9999] p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-lg hover:scale-110 transition-all active:scale-95 text-lg"
      aria-label={isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
