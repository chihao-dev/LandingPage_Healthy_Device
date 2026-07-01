'use client';

interface ChatbotHeaderProps {
  onClose: () => void;
}

export default function ChatbotHeader({ onClose }: ChatbotHeaderProps) {
  return (
    <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="font-bold tracking-tight">AI Health Assistant</span>
      </div>
      <button onClick={onClose} className="hover:rotate-90 transition-transform">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
