import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  generateEtags: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
