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

    // 2. Scroll Progress Bar & Parallax
    const progressLine = document.getElementById('scrollProgress');
    const parallaxBg = document.querySelector('.parallax-bg') as HTMLElement;
    
    // Store seen sections to prevent spamming
    const seenSections = new Set<string>();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;

      // Behavior tracking: Scroll to sections
      const sections = ['problem', 'solution', 'realtime-data', 'register'];
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && !seenSections.has(id)) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 200) {
            seenSections.add(id);
            let sectionName = '';
            switch(id) {
              case 'problem': sectionName = 'Thách thức'; break;
              case 'solution': sectionName = 'Giải pháp'; break;
              case 'realtime-data': sectionName = 'Dữ liệu thời gian thực'; break;
              case 'register': sectionName = 'Đăng ký tư vấn'; break;
            }
            window.dispatchEvent(new CustomEvent('behavior-event', { detail: { message: `📍 Bạn đăm xem: ${sectionName}` }}));
          }
        }
      });

      // Progress calculation
      const progress = (scrollTop / docHeight) * 100;
      if (progressLine) {
        progressLine.style.width = `${progress}%`;
      }

      // Parallax calculation (0.2 golden ratio)
      if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrollTop * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div id="scrollProgress"></div>;
}
