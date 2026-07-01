# AirPure X - Landing Page Công Nghệ Sức Khỏe Thông Minh

AirPure X là dự án Landing Page cao cấp giới thiệu giải pháp máy lọc không khí lượng tử tích hợp AI. Dự án tập trung vào tính thẩm mỹ, hiệu năng tối ưu và khả năng tích hợp dữ liệu thực tế.

---

## Tính Năng Nổi Bật

### Giao Diện và Trải Nghiệm (UI/UX)
- Thiết kế Hiện đại: Sử dụng ngôn ngữ thiết kế Glassmorphism, tối giản và sang trọng.
- Scrollytelling và Parallax: Trải nghiệm cuộn trang kể chuyện kết hợp hiệu ứng chiều sâu, giúp truyền tải thông điệp sản phẩm ấn tượng.
- Dark Mode: Hỗ trợ giao diện sáng/tối tùy chỉnh theo hệ điều hành.
- Micro-interactions: Các hiệu ứng Particle (hạt bụi mịn), Skeleton Loading và thông báo (Toast) theo thời gian thực khi người dùng tương tác (click, scroll).
- Responsive: Tương thích hoàn hảo trên mọi thiết bị (Desktop, Tablet, Mobile).

### Tối Ưu Hiệu Năng và SEO
- Performance: Đạt điểm số cao trên Google PageSpeed Insights nhờ tối ưu mã nguồn và sử dụng Next.js Server Components.
- SEO Technical: Cấu hình đầy đủ thẻ Meta (Title, Description, Open Graph) giúp tối ưu hiển thị trên công cụ tìm kiếm và mạng xã hội.

### Tính Năng Nâng Cao
- Tích Hợp Backend (Supabase): 
  - Lưu trữ thông tin khách hàng tiềm năng (Leads) trực tiếp vào Database.
  - Tích hợp Supabase Auth để tự động gửi Email xác nhận cho người dùng ngay sau khi đăng ký thành công.
- Mini Ecommerce: 
  - Lưu sản phẩm yêu thích (Favorites).
  - Quản lý giỏ hàng (Cart).
  - Theo dõi danh sách sản phẩm đã xem (Recently Viewed).
  - Dữ liệu được đồng bộ qua LocalStorage giúp trải nghiệm liền mạch.
- AI Chatbot: Cửa sổ hỗ trợ trực tuyến tích hợp ở góc màn hình, tư vấn sản phẩm và điều hướng người dùng thông minh.

---

## Công Nghệ Sử Dụng

- Framework: Next.js 14 (App Router)
- Ngôn ngữ: TypeScript
- Styling: Tailwind CSS
- Animation: Framer Motion
- Backend/Database: Supabase (Auth và Database)
- Deployment: Vercel

---

## Cấu Trúc Dự Án

```text
├── app/
│   ├── api/             # API Routes (Webhook, Products)
│   ├── components/      # UI Components (Hero, Navbar, Form, Chatbot...)
│   └── page.tsx         # Main Landing Page (Server Component)
├── hooks/               # Custom Hooks (Ecommerce logic)
├── lib/                 # Config (Supabase, Types)
├── public/              # Images và Static Assets
└── database.json        # Dữ liệu dự phòng Local
```

---

## Cài Đặt và Khởi Chạy

1. Clone project:
   ```bash
   git clone https://github.com/your-username/AI-health-landing.git
   cd AI-health-landing
   ```

2. Cài đặt thư viện:
   ```bash
   npm install
   ```

3. Cấu hình biến môi trường (.env.local):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Chạy dự án:
   ```bash
   npm run dev
   ```

---
**Dự án được thực hiện bởi ứng viên Vị trí Phát triển Website.**
