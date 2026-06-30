'use client';

import { useState } from 'react';
import { STRINGS } from '../constants/strings';

export default function RegisterForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert(STRINGS.error_invalid_email);
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(STRINGS.error_api_failed);
      }
      
      const data = await response.json();
      console.log('Webhook verification:', data);
      
      // Báo cáo hành vi (behavior tracking)
      window.dispatchEvent(
        new CustomEvent('behavior-event', {
          detail: { message: STRINGS.success_webhook_message(formData.name) }
        })
      );
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error(STRINGS.error_submission, error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-semibold text-zinc-900 dark:text-zinc-200">
          {STRINGS.label_name} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder={STRINGS.placeholder_name}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 input-interaction"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-semibold text-zinc-900 dark:text-zinc-200">
          {STRINGS.label_phone} <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          placeholder={STRINGS.placeholder_phone}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 input-interaction"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-zinc-900 dark:text-zinc-200">
          {STRINGS.label_email} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder={STRINGS.placeholder_email}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 input-interaction"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all disabled:bg-zinc-300 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 btn-interaction btn-ripple"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {STRINGS.status_loading}
          </>
        ) : (
          STRINGS.btn_submit
        )}
      </button>

      {status === 'success' && (
        <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-xl text-center font-medium animate-in fade-in slide-in-from-bottom-2">
          {STRINGS.msg_success}
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-center font-medium animate-in fade-in slide-in-from-bottom-2">
          {STRINGS.msg_error}
        </div>
      )}
    </form>
  );
}
