import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
    unoptimized: true, // For Vercel deployment
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // App directory is enabled by default in Next.js 13+
  // Add proper trailing slash handling
  trailingSlash: false,
  // Ensure all routes are properly generated
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};

export default nextConfig;
