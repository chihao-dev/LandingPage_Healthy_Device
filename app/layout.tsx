import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AirPure X - Thế hệ lọc siêu việt AI",
  description: "Trải nghiệm không gian sống thuần khiết tuyệt đối với màng lọc 360° AI đột phá, diệt trừ PM2.5, khử VOCs và vi khuẩn thần tốc.",
  keywords: ["máy lọc không khí", "AirPure X", "máy lọc không khí AI", "khử mùi", "lọc bụi PM2.5"],
  openGraph: {
    title: "AirPure X - Không gian sống thuần khiết 2.0",
    description: "Khai phóng sự thật với công nghệ tự động học cấu trúc phòng, tái tạo sinh quyển vô khuẩn chỉ sau 5 phút.",
    url: "https://airpure-x-landing.vercel.app",
    siteName: "AirPure Tech",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541781719201-68bca2ff36d4?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "AirPure X Ecosystem",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

import ClientWrapper from "./components/ClientWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-[#050510] text-slate-900 dark:text-white transition-colors duration-300">
        {children}
        <ClientWrapper />
      </body>
    </html>
  );
}
