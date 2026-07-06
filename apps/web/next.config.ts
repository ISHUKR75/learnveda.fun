/**
 * @file next.config.ts
 * @description Next.js configuration for LearnVeda Web Application
 * Updated for Next.js 15 on Replit
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Experimental Features ─────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@radix-ui/react-icons"],
  },

  // ─── Allowed Dev Origins ───────────────────────────────────────────────────
  allowedDevOrigins: ["*.replit.dev", "*.pike.replit.dev", "*.repl.co", "*.sisko.replit.dev"],

  // Packages that should only run on the server
  serverExternalPackages: ["mongoose", "sharp"],

  // ─── Output File Tracing Root ──────────────────────────────────────────────
  outputFileTracingRoot: process.cwd().includes("apps/web")
    ? process.cwd().split("apps/web")[0]
    : process.cwd(),

  // ─── Webpack / File Watcher Config ────────────────────────────────────────
  // The monorepo has 48,000+ placeholder directories — ignore them to prevent ENOSPC
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/features/classroom/**",
        "**/features/engineering/**",
        "**/features/programming/**",
        "**/services/**",
        "**/packages/**",
        "**/apps/admin/**",
        "**/apps/landing/**",
        "**/apps/teacher/**",
        "**/apps/student/**",
        "**/apps/parent/**",
        "**/apps/mobile/**",
        "**/apps/desktop/**",
        "**/apps/storybook/**",
      ],
    };
    return config;
  },

  // ─── Image Optimization ────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
    minimumCacheTTL: 86400,
  },

  // ─── Security Headers ──────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // ─── Redirects ─────────────────────────────────────────────────────────────
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/classes", destination: "/learn", permanent: true },
    ];
  },

  // ─── Compiler Options ──────────────────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ─── TypeScript ────────────────────────────────────────────────────────────
  typescript: {
    ignoreBuildErrors: true,
  },

  // ─── Output Configuration ──────────────────────────────────────────────────
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,

  poweredByHeader: false,

  // ─── Environment Variables exposed to browser ──────────────────────────────
  env: {
    NEXT_PUBLIC_APP_NAME: "LearnVeda",
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
};

export default nextConfig;
