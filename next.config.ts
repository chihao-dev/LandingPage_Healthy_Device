import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        pathname: '/**',
      },
    ],
  },
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: '/api/products',
        destination: 'http://127.0.0.1:3001/api/products',
      },
      {
        source: '/api/chat',
        destination: 'http://127.0.0.1:3001/api/chat',
      },
    ];
  },
};

export default nextConfig;
