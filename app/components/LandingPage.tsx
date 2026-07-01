'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from './Navbar';
import RegisterForm from './RegisterForm';
import PageEffects from './PageEffects';
import BentoGrid from './BentoGrid';
import Particles from './Particles';
import TechSpecs from './TechSpecs';

interface LandingPageProps {
  ecosystemComponent: React.ReactNode;
}

export default function LandingPage({ ecosystemComponent }: LandingPageProps) {
  const [pm25, setPm25] = useState(150);
  const [isSolution, setIsSolution] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      const solutionSection = document.getElementById('solution');
      if (solutionSection) {
        const rect = solutionSection.getBoundingClientRect();
        setIsSolution(rect.top < windowHeight * 0.5);
      }

      const dataSection = document.getElementById('realtime-data');
      if (dataSection) {
        const rect = dataSection.getBoundingClientRect();
        const triggerPoint = windowHeight * 0.85;
        if (rect.top < triggerPoint) {
          const distance = 300;
          const progress = Math.min(1, Math.max(0, (triggerPoint - rect.top) / distance));
          setPm25(Math.floor(150 - (progress * 142)));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#050510] text-slate-900 dark:text-slate-100 font-sans scroll-smooth transition-colors duration-500 overflow-x-hidden selection:bg-blue-500/30 relative">
      <div className="parallax-wrapper pointer-events-none opacity-5">
        <div className="parallax-bg relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=2000"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
        </div>
      </div>
      <Navbar />
      <PageEffects />

      <main>
        {/* SECTION 1: HERO */}
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-24 bg-slate-100 dark:bg-[#050510]">
          <Particles count={30} />
          <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-blue-900/30 dark:via-[#050510] dark:to-[#050510] pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[128px] mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-[128px] mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-md mb-8 shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-200 tracking-[0.2em] uppercase">Thế Hệ Bảo Vệ 2.0</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] text-slate-900 dark:text-white">
              Không khí bạn <br className="hidden md:block"/>hít thở <br className="md:hidden"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 drop-shadow-sm">có thực sự sạch?</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-300/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              99% hiểm họa trong nhà không thể nhìn thấy bằng mắt thường.
              <br className="hidden md:block"/> Khai phóng sự thật với công nghệ màng lọc lượng tử AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
              <button
                onClick={() => {
                  document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('behavior-event', { detail: { message: `🔍 Bắt đầu hành trình khám phá` } }));
                }}
                className="relative group px-10 py-5 rounded-full text-lg font-bold bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105 shadow-xl btn-interaction btn-ripple"
              >
                Khám Phá Ngay
              </button>
              <button
                onClick={() => {
                  document.getElementById('realtime-data')?.scrollIntoView({ behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('behavior-event', { detail: { message: `⚡ Đang quét dữ liệu không khí...` } }));
                }}
                className="px-10 py-5 rounded-full text-lg font-bold text-slate-900 dark:text-white relative transition-all duration-300 border-2 border-slate-300 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-400 backdrop-blur-sm group overflow-hidden"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 inline-block">Quét Không Khí</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </div>
          </div>

          <div className="mt-12 md:mt-28 relative w-full h-[400px] md:h-[600px] flex items-end justify-center group">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-400/30 transition-all duration-1000" />
             <div className="relative w-[500px] h-full z-10">
                <Image
                  src="https://i.postimg.cc/9QXMQkTV/Philips-Air-Purifier-Series-3000i.png"
                  alt="Máy lọc không khí AirPure X công nghệ AI"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-contain object-bottom drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
                  priority
                  fetchPriority="high"
                />
             </div>
             <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-slate-100 dark:from-[#050510] to-transparent z-20 pointer-events-none" />
          </div>
        </section>

        {/* ... (Các section khác giữ nguyên) */}

        {/* SECTION 8: CTA & FOOTER (Cần bọc lại cho đúng cấu trúc) */}
        <section id="register" className="py-20 md:py-40 px-6 bg-slate-100 dark:bg-[#020205] relative overflow-hidden scroll-mt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-200 dark:from-[#050510] via-transparent to-slate-100 dark:to-[#020205] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-16 reveal">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
                Đặc Quyền Dành Cho <br/><span className="text-blue-500">Giới Tinh Hoa</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xl font-light">Đăng ký nhận tư vấn và thiết kế giải pháp khí quyển miễn phí (Cho 50 chủ nhân đầu tiên)</p>
            </div>
            <div className="bg-white dark:bg-white/[0.04] dark:backdrop-blur-xl p-6 md:p-14 rounded-[2rem] md:rounded-[3rem] reveal border border-slate-200 dark:border-white/10 shadow-[0_10px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
              <RegisterForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 md:py-12 text-center text-slate-500 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#020205] relative z-10">
}
