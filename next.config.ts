import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Image optimization settings for Vercel next/image */
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'curriculum.gbstem.org',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'www.gbstem.org',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'gbstem.org',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  staticPageGenerationTimeout: 120,
};

export default nextConfig;
