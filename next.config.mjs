/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    // ppr: 'incremental',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
    ],
  },
};

export default nextConfig;
