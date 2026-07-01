'use client';

export default function BentoGrid() {
  const items = [
    {
      title: 'Mắt thần Laser Realtime',
      tag: 'Cảm biến',
      desc: 'Cảm biến hồng ngoại thế hệ mới phát hiện chuẩn xác bụi siêu mịn và VOCs theo thời gian thực 24/7.',
      size: 'md:col-span-2 md:row-span-1',
      icon: (
        <svg className="w-8 h-8 text-blue-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: 'Lõi lọc 5 Lớp Chuyên Sâu',
      tag: 'Màng lọc HEPA H13',
      desc: 'Loại bỏ hoàn toàn 99.97% vi khuẩn, nấm mốc và tác nhân dị ứng nhỏ tới 0.3μm.',
      size: 'md:col-span-1 md:row-span-2 flex-col justify-between',
      icon: (
        <svg className="w-8 h-8 text-emerald-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: 'Hệ sinh thái Smart Life',
      tag: 'Kết nối App',
      desc: 'Đồng bộ hệ thống nhà thông minh. Trí tuệ nhân tạo (AI) học hỏi thói quen sinh hoạt để chủ động điều phối luồng không khí theo thời gian trong ngày.',
      size: 'md:col-span-2 md:row-span-1',
      icon: (
        <svg className="w-8 h-8 text-purple-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
      {items.map((item, i) => (
        <div
          key={i}
          className={`group relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#0A0A15] border border-slate-200 dark:border-white/[0.05] p-6 md:p-10 transition-all duration-500 hover:border-slate-300 dark:hover:border-white/10 hover:shadow-xl dark:hover:bg-[#0D0D1A] ${item.size}`}
        >
          {item.icon}
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 bg-slate-100 dark:bg-white/5 py-1 px-3 rounded-full">
            {item.tag}
          </span>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">{item.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed max-w-sm">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
