'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Vấn đề', href: '#problem' },
    { name: 'Giải pháp', href: '#solution' },
    { name: 'Công nghệ', href: '#technology' },
    { name: 'Phân tích', href: '#realtime-data' },
    { name: 'Sinh thái', href: '#ecosystem' },
  ];

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-white/80 dark:bg-[#050510]/80 backdrop-blur-md border-slate-200 dark:border-white/10 py-4 shadow-sm dark:shadow-lg' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-xl tracking-tighter">
          AirPure <span className="text-blue-500 text-2xl">X</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors tracking-wide"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <a 
          href="#register" 
          className="hidden md:inline-flex px-6 py-2.5 rounded-full text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
        >
          Nhận tư vấn
        </a>
      </div>
    </header>
  );
}
