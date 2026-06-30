'use client';

import { useState, useEffect, useMemo } from 'react';

export default function Particles({ count = 20 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      '--duration': `${5 + Math.random() * 10}s`,
      '--x-drift': `${(Math.random() - 0.5) * 200}px`,
    }));
  }, [count]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="particle-container" />;

  return (
    <div className="particle-container">
      {particles.map((style, i) => (
        <div
          key={i}
          className="particle"
          style={style as React.CSSProperties}
        />
      ))}
    </div>
  );
}
