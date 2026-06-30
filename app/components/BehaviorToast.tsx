'use client';

import { useState, useEffect } from 'react';

export default function BehaviorToast() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const showToast = (message: string) => {
      setToast(message);
      setTimeout(() => setToast(null), 3000);
    };

    const handleBehavior = (e: any) => showToast(e.detail.message);
    window.addEventListener('behavior-event', handleBehavior);

    return () => window.removeEventListener('behavior-event', handleBehavior);
  }, []);

  if (!toast) return null;

  return (
    <div className="fixed top-10 right-6 z-[10000] toast-enter">
      <div className="bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 px-6 py-3 rounded-2xl shadow-2xl font-medium border border-white/10 flex items-center gap-3">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
        {toast}
      </div>
    </div>
  );
}
