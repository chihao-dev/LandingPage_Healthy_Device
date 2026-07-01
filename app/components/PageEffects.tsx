'use client';

import { useEffect } from 'react';

export default function PageEffects() {
  useEffect(() => {
    // 1. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));

    // 2. Section Tracking (Cải tiến để mượt mà và chính xác hơn)
    let lastActiveSection = '';
    const sectionVisibility = new Map<string, number>();

    const updateActiveSection = (activeId: string) => {
      if (activeId && activeId !== lastActiveSection) {
        lastActiveSection = activeId;
        let sectionName = '';
        switch(activeId) {
          case 'hero': sectionName = 'Trang chủ'; break;
          case 'problem': sectionName = 'Thách thức sức khỏe'; break;
          case 'solution': sectionName = 'Giải pháp AirPure X'; break;
          case 'technology': sectionName = 'Công nghệ AI'; break;
          case 'realtime-data': sectionName = 'Dữ liệu thời gian thực'; break;
          case 'specs': sectionName = 'Thông số kỹ thuật'; break;
          case 'ecosystem': sectionName = 'Hệ sinh thái thông minh'; break;
          case 'register': sectionName = 'Đăng ký tư vấn'; break;
        }

        if (sectionName) {
          window.dispatchEvent(new CustomEvent('behavior-event', {
            detail: { message: `📍 Bạn đang ở: ${sectionName}` }
          }));
        }
      }
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          sectionVisibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let maxRatio = 0;
        let activeId = '';

        sectionVisibility.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            activeId = id;
          }
        });

        if (maxRatio > 0.1) {
          updateActiveSection(activeId);
        }
      },
      {
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-5% 0px -5% 0px'
      }
    );

    const sections = ['hero', 'problem', 'solution', 'technology', 'realtime-data', 'specs', 'ecosystem', 'register'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    // 3. Scroll Progress Bar & Parallax (Throttled with requestAnimationFrame)
    const progressLine = document.getElementById('scrollProgress');
    const parallaxBg = document.querySelector('.parallax-bg') as HTMLElement;

    let ticking = false;
    const updateScrollEffects = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;

      // Force "Trang chủ" when at the very top
      if (scrollTop < 50) {
        updateActiveSection('hero');
      }

      // Progress calculation
      const progress = (scrollTop / (docHeight || 1)) * 100;
      if (progressLine) {
        progressLine.style.width = `${progress}%`;
      }

      // Parallax calculation
      if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrollTop * 0.2}px)`;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div id="scrollProgress"></div>;
}
