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

    // 2. Section Tracking (Optimized with IntersectionObserver)
    const seenSections = new Set<string>();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !seenSections.has(entry.target.id)) {
            const id = entry.target.id;
            seenSections.add(id);
            let sectionName = '';
            switch(id) {
              case 'problem': sectionName = 'Thách thức'; break;
              case 'solution': sectionName = 'Giải pháp'; break;
              case 'realtime-data': sectionName = 'Dữ liệu thời gian thực'; break;
              case 'register': sectionName = 'Đăng ký tư vấn'; break;
            }
            if (sectionName) {
              window.dispatchEvent(new CustomEvent('behavior-event', { detail: { message: `📍 Bạn đang xem: ${sectionName}` }}));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = ['problem', 'solution', 'realtime-data', 'register'];
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

      // Progress calculation
      const progress = (scrollTop / docHeight) * 100;
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
