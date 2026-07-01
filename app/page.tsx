'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import PageEffects from './components/PageEffects';
import BentoGrid from './components/BentoGrid';
import Ecosystem from './components/Ecosystem';
import Particles from './components/Particles';
import TechSpecs from './components/TechSpecs';

export default function Home() {
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
        if (rect.top < windowHeight * 0.8) {
          const progress = Math.min(1, Math.max(0, (windowHeight * 0.8 - rect.top) / 400));
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
              onClick={() => window.dispatchEvent(new CustomEvent('behavior-event', { detail: { message: `🔍 Bạn đã bắt đầu hành trình Khám phá` } }))}
              className="relative group px-10 py-5 rounded-full text-lg font-bold bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-300 hover:scale-105 shadow-lg btn-interaction btn-ripple"
            >
              Khám Phá Ngay
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('behavior-event', { detail: { message: `⚡ Tiến hành Quét độ chuẩn không khí...` } }))}
              className="px-10 py-5 rounded-full text-lg font-bold text-slate-900 dark:text-white relative transition-all duration-300 border border-slate-300 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/5 backdrop-blur-sm group overflow-hidden"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 inline-block">Quét Không Khí</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
        </div>

        <div className="mt-28 relative w-full h-[600px] flex items-end justify-center group">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-400/30 transition-all duration-1000" />
           <div className="relative w-[500px] h-full z-10">
              <Image 
                src="https://i.postimg.cc/9QXMQkTV/Philips-Air-Purifier-Series-3000i.png" 
                alt="AirPure X" 
                fill 
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-contain object-bottom drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] dark:drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
                priority
              />
           </div>
           <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-slate-100 dark:from-[#050510] to-transparent z-20 pointer-events-none" />
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section id="problem" className="relative py-40 px-6 overflow-hidden bg-white dark:bg-[#020205] scroll-mt-20">
        <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isSolution ? 'opacity-0' : 'opacity-100'}`}>
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 space-y-40">
          <div className="reveal flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="flex-1 space-y-6">
              <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-transparent" />
              <h2 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-slate-100 leading-tight">
                Mỗi đêm, hàng triệu hạt bụi mịn <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">PM2.5</span> lặng lẽ đi sâu vào phế nang...
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-2xl font-light">khi bạn đang chìm trong giấc ngủ ngon.</p>
            </div>
          </div>

          <div className="reveal flex flex-col md:flex-row-reverse gap-8 items-start md:items-center">
            <div className="flex-1 space-y-6 md:text-right flex flex-col md:items-end">
              <div className="w-20 h-1 bg-gradient-to-l from-orange-500 to-transparent" />
              <h2 className="text-4xl md:text-6xl font-black text-slate-700 dark:text-slate-300 leading-tight">
                Tác nhân dị ứng biến căn phòng thành <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">nguồn kích ứng hô hấp.</span>
              </h2>
            </div>
          </div>

          <div className="reveal text-center max-w-4xl mx-auto space-y-8 glass p-12 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500/5 to-orange-500/5 blur-xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black text-slate-800 dark:text-white leading-tight tracking-tight mb-6">
                Hậu Quả <span className="text-red-500">Thầm Lặng</span>
              </h2>
              <p className="text-2xl text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Giấc ngủ kém sâu, thức dậy với cảm giác mệt mỏi, cơ thể khô khốc và hệ miễn dịch suy yếu dần.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SOLUTION */}
      <section id="solution" className={`relative py-48 px-6 scroll-mt-20 transition-all duration-1000 ${isSolution ? 'bg-slate-100 dark:bg-[#030a1c]' : 'bg-slate-100 dark:bg-[#020205]'}`}>
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isSolution ? 'opacity-100' : 'opacity-0'}`}>
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <div className="text-center mb-32 reveal">
            <div className="inline-block border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-xs px-6 py-2.5 rounded-full mb-8 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              Kỷ Nguyên Mới
            </div>
            <h3 className="text-6xl md:text-8xl lg:text-[7rem] font-black text-slate-900 dark:text-white mb-8 tracking-tighter drop-shadow-xl">
              AirPure X
            </h3>
            <h4 className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-200 dark:to-slate-400 max-w-4xl mx-auto leading-tight mb-8">
              Tái định nghĩa sự thuần khiết.
            </h4>
            <p className="text-xl md:text-2xl text-blue-700 dark:text-blue-300/80 font-light max-w-3xl mx-auto">
              Hệ thống lọc chủ động AI đột phá, tái tạo sinh quyển trong lành tuyệt đối cho phòng ngủ chỉ sau <span className="font-bold text-slate-900 dark:text-white">5 phút</span>.
            </p>
          </div>

          <div className="relative flex justify-center w-full reveal">
             <div className="relative w-full max-w-xl h-[800px] flex flex-col items-center justify-center -mt-20 overflow-visible transform hover:scale-[1.02] transition-transform duration-700 group z-10">
                <div className={`absolute inset-0 transition-opacity duration-1000 ${isSolution ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen" />
                </div>
                <div className="relative w-full h-full">
                  <Image 
                    src="https://i.postimg.cc/9QXMQkTV/Philips-Air-Purifier-Series-3000i.png" 
                    alt="AirPure X System" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-contain z-10 drop-shadow-[0_30px_60px_rgba(59,130,246,0.3)] transition-transform duration-1000 group-hover:scale-105 pointer-events-none" 
                  />
                </div>
             </div>

             <div className="hidden lg:flex absolute top-1/4 -left-20 glass p-6 rounded-3xl max-w-sm items-start gap-5 border border-white/10 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="w-14 h-14 shrink-0 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h5 className="text-slate-900 dark:text-white font-bold text-lg mb-2">Lõi Lọc 360° Đa Tầng</h5>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Hút khí ô nhiễm từ mọi hướng, hiệu suất làm sạch gấp x3 lần công nghệ cũ.</p>
                </div>
             </div>

             <div className="hidden lg:flex absolute bottom-1/4 -right-20 glass p-6 rounded-3xl max-w-sm items-start gap-5 border border-white/10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="w-14 h-14 shrink-0 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h5 className="text-slate-900 dark:text-white font-bold text-lg mb-2">Sinh Ion Âm Mật Độ Cao</h5>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Phóng thích 5 triệu ion âm/cm³ giúp triệt tiêu mầm bệnh và virus tức thì.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: BENTO GRID / HOW IT WORKS */}
      <section id="technology" className="py-40 px-6 bg-white dark:bg-[#020205] relative border-t border-slate-200 dark:border-white/5 scroll-mt-20">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 dark:via-blue-900/50 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 reveal">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 font-bold tracking-[0.2em] uppercase text-sm mb-4">
              Đột Phá Công Nghệ
            </h2>
            <h3 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight">Vận Hành Tinh Vi Bởi AI</h3>
          </div>
          <BentoGrid />
        </div>
      </section>

      {/* SECTION 5: REALTIME DATA */}
      <section id="realtime-data" className="py-40 px-6 bg-slate-100 dark:bg-[#050510] relative overflow-hidden border-t border-slate-200 dark:border-white/5 scroll-mt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-500/5 dark:from-blue-900/10 to-transparent" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 bg-white dark:bg-white/5 backdrop-blur-md p-12 md:p-24 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-2xl">
          <div className="mb-24 reveal">
            <h3 className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-medium mb-8">Chất lượng không khí phòng mô phỏng realtime</h3>
            <div className="flex justify-center items-baseline gap-4">
              <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter transition-colors duration-700 drop-shadow-[0_0_30px_rgba(0,0,0,0.2)]" 
                  style={{ color: pm25 > 50 ? '#ef4444' : '#3b82f6', textShadow: pm25 > 50 ? '0 0 40px rgba(239,68,68,0.5)' : '0 0 40px rgba(59,130,246,0.5)' }}>
                {pm25.toString().padStart(2, '0')}
              </h2>
              <span className="text-3xl md:text-5xl font-light text-slate-600 dark:text-slate-300">μg/m³</span>
            </div>
            
            <div className="inline-flex items-center gap-3 mt-12 px-8 py-4 rounded-full bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/10">
              <span className={`w-4 h-4 rounded-full animate-pulse shadow-lg ${pm25 > 50 ? 'bg-red-500 shadow-red-500/50' : 'bg-blue-500 shadow-blue-500/50'}`} />
              <p className="text-xl font-semibold text-slate-800 dark:text-white">
                Trạng thái: <span className={pm25 > 50 ? 'text-red-500' : 'text-blue-500'}>
                  {pm25 > 50 ? 'Cảnh báo ô nhiễm nặng' : 'Khí quyển vô khuẩn: Tuyệt vời'}
                </span>
              </p>
            </div>
          </div>

          <div className="h-64 w-full flex items-end gap-1.5 reveal p-6 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5 relative shadow-inner">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none rounded-2xl" />
            {Array.from({ length: 48 }).map((_, i) => {
              const pseudoRandom = ((i * 7) % 10) / 10;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all duration-700 relative z-10"
                  style={{ 
                    height: `${Math.max(5, 100 - pm25 + pseudoRandom * 25)}%`,
                    background: pm25 > 50 
                      ? `linear-gradient(to top, rgba(153, 27, 27, 0.4), rgba(239, 68, 68, ${0.4 + pseudoRandom * 0.4}))` 
                      : `linear-gradient(to top, rgba(30, 58, 138, 0.4), rgba(59, 130, 246, ${0.4 + pseudoRandom * 0.4}))`
                  }}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: BENEFITS */}
      <section className="py-40 px-6 bg-white dark:bg-[#020205] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 dark:opacity-30 mix-blend-luminosity">
          <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000" alt="Relaxing" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 dark:from-[#020205] via-slate-900/80 dark:via-[#020205]/80 to-transparent" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-start gap-12">
          <div className="reveal mb-12">
            <h2 className="text-slate-600 dark:text-slate-300 font-bold tracking-[0.2em] uppercase text-sm mb-4 border-l-4 border-blue-500 pl-4">Giấc Ngủ Đích Thực</h2>
            <h3 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white max-w-2xl leading-tight">Hồi Sinh Năng Lượng Từ Bên Trong</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 w-full">
            {[
              { color: 'blue', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z', title: 'Ngủ sâu hơn 30%', desc: 'Gia tăng thời lượng Deep Sleep nhờ luồng khí tươi mát đối lưu tự nhiên liên tục trong phòng.' },
              { color: 'emerald', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Bảo vệ toàn diện', desc: 'Chấm dứt nỗi lo dị ứng, viêm mũi nhờ cảm biến nhận diện siêu bụi và vi khuẩn độc lập.' },
              { color: 'purple', icon: 'M5.52 19c.64-1.5 1.84-2.53 3.48-2.53h6c1.64 0 2.84 1.03 3.48 2.53M12 11a4 4 0 100-8 4 4 0 000 8z', title: 'Siêu tĩnh lặng', desc: 'Động cơ không chổi than từ tính vận hành dưới mức 20dB - êm ái hơn cả một tiếng rơi của lá.' },
            ].map((item, i) => (
              <div key={i} className={`reveal bg-white dark:glass p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group ${i > 0 ? `delay-${i}00` : ''}`}>
                <div className={`w-16 h-16 rounded-2xl bg-${item.color}-500/10 dark:bg-${item.color}-500/20 text-${item.color}-500 dark:text-${item.color}-400 flex items-center justify-center mb-8 border border-${item.color}-500/20 group-hover:scale-110 transition-transform`}>
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6.5: TECH SPECS */}
      <section id="specs" className="py-20 px-6 bg-slate-100 dark:bg-[#020205] relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal">
             <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 font-bold tracking-[0.2em] uppercase text-sm mb-4">
               Thông số kỹ thuật
             </h2>
             <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Chi Tiết Cấu Hình</h3>
          </div>
          <div className="reveal">
            <TechSpecs />
          </div>
        </div>
      </section>

      {/* SECTION 7: SMART HEALTH ECOSYSTEM */}
      <section id="ecosystem" className="py-40 px-6 bg-slate-50 dark:bg-[#050510] border-t border-slate-200 dark:border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 reveal">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 font-bold tracking-[0.2em] uppercase text-sm mb-4">
              Sinh Thái Thông Minh
            </h2>
            <h3 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight">Kiểm soát không giới hạn</h3>
          </div>
          <Ecosystem />
        </div>
      </section>

      {/* SECTION 8: CTA & FOOTER */}
      <section id="register" className="py-40 px-6 bg-slate-100 dark:bg-[#020205] relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-200 dark:from-[#050510] via-transparent to-slate-100 dark:to-[#020205] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
              Đặc Quyền Dành Cho <br/><span className="text-blue-500">Giới Tinh Hoa</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xl font-light">Đăng ký nhận tư vấn và thiết kế giải pháp khí quyển miễn phí (Cho 50 chủ nhân đầu tiên)</p>
          </div>
          <div className="bg-white dark:bg-white/[0.04] dark:backdrop-blur-xl p-10 md:p-14 rounded-[3rem] reveal border border-slate-200 dark:border-white/10 shadow-[0_10px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
            <RegisterForm />
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-500 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#020205] relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-2xl tracking-tighter">
            AirPure <span className="text-blue-500 text-3xl">X</span>
          </div>
          <p className="text-sm">© 2024 AirPure Tech. Đỉnh cao thiết kế giao diện bởi Agentic AI.</p>
        </div>
      </footer>
    </div>
  );
}
