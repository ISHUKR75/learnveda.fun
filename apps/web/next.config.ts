/**
 * @file next.config.ts
 * @description Next.js configuration for LearnVeda Web Application
 * Production-optimized with security headers, image optimization, and performance tuning
 */

import type { NextConfig } from "next"; // Import NextConfig type for type safety

const nextConfig: NextConfig = {
  // ─── Experimental Features ─────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@radix-ui/react-icons"], // Tree-shake large icon/animation packages
  },

  // ─── Allowed Dev Origins ───────────────────────────────────────────────────
  // Allow Replit's proxied iframe origin during development
  allowedDevOrigins: ["*.replit.dev", "*.pike.replit.dev", "*.repl.co", "*.sisko.replit.dev"],

  // Packages that should only run on the server (not bundled for client)
  serverExternalPackages: ["mongoose", "sharp"],

  // ─── Output File Tracing Root ──────────────────────────────────────────────
  // Set to workspace root to suppress "multiple lockfiles" warning
  outputFileTracingRoot: process.cwd().includes("apps/web")
    ? process.cwd().split("apps/web")[0]  // Monorepo root
    : process.cwd(),

  // ─── Webpack / File Watcher Config ────────────────────────────────────────
  // The monorepo has 48,000+ placeholder directories — ignore them for watching
  webpack: (config, { isServer }) => {
    // Exclude .gitkeep-only placeholder directories from file watching
    // This prevents ENOSPC (too many file watchers) errors in dev mode
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        // Ignore the thousands of empty placeholder feature directories
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
    formats: ["image/avif", "image/webp"], // Modern image formats for best compression
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },       // Cloudinary CDN
      { protocol: "https", hostname: "images.unsplash.com" },      // Unsplash stock images
      { protocol: "https", hostname: "avatars.githubusercontent.com" }, // GitHub avatars
      { protocol: "https", hostname: "lh3.googleusercontent.com" }, // Google profile pics
      { protocol: "https", hostname: "img.clerk.com" },             // Clerk user avatars
    ],
    minimumCacheTTL: 86400, // Cache images for 24 hours in CDN
  },

  // ─── Security Headers ──────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          { key: "X-Frame-Options", value: "DENY" },                            // Prevent clickjacking
          { key: "X-Content-Type-Options", value: "nosniff" },                  // Prevent MIME sniffing
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, // Safe referrer policy
          { key: "X-DNS-Prefetch-Control", value: "on" },                       // Enable DNS prefetching for performance
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }, // Restrict browser APIs
        ],
      },
    ];
  },

  // ─── Redirects ─────────────────────────────────────────────────────────────
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },         // /home → /
      { source: "/classes", destination: "/learn", permanent: true }, // /classes → /learn
    ];
  },

  // ─── Compiler Options ──────────────────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Strip console.log in production
  },

  // ─── TypeScript & ESLint ───────────────────────────────────────────────────
  typescript: {
    ignoreBuildErrors: false, // Fail build on TypeScript errors (strict)
  },
  eslint: {
    ignoreDuringBuilds: false, // Fail build on ESLint errors
  },

  // ─── Output Configuration ──────────────────────────────────────────────────
  // 'standalone' creates a self-contained deployment folder under .next/standalone/
  // Required for Docker production image (see docker/Dockerfile)
  // The standalone build includes only the server runtime — no node_modules needed at runtime
  // @see https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,

  poweredByHeader: false, // Remove X-Powered-By: Next.js header (security)

  // ─── Environment Variables exposed to browser ──────────────────────────────
  env: {
    NEXT_PUBLIC_APP_NAME: "LearnVeda",
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
};

export default nextConfig; // Export configuration
