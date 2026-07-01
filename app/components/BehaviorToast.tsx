'use client';

import { useState, useEffect } from 'react';

export default function BehaviorToast() {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const showToast = (message: string) => {
      clearTimeout(timeoutId);
      setToast({ message, id: Date.now() });

      timeoutId = setTimeout(() => {
        setToast(null);
      }, 3000);
    };

    const handleBehavior = (e: any) => showToast(e.detail.message);
    window.addEventListener('behavior-event', handleBehavior);

    return () => {
      window.removeEventListener('behavior-event', handleBehavior);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!toast) return null;

  return (
    <div key={toast.id} className="fixed top-10 right-6 z-[10000] toast-enter animate-in fade-in slide-in-from-top-5 duration-300">
      <div className="bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 px-6 py-3 rounded-2xl shadow-2xl font-medium border border-white/10 flex items-center gap-3">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
        {toast.message}
      </div>
    </div>
  );
}
