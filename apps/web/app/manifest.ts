/**
 * @file app/manifest.ts
 * @description Web App Manifest for LearnVeda PWA (Progressive Web App)
 * Enables "Add to Home Screen" on mobile devices
 * Defines app name, icons, colors, and display mode
 */

import type { MetadataRoute } from "next"; // Next.js manifest type

/**
 * Generates the web app manifest (manifest.json)
 * Makes LearnVeda installable as a PWA on mobile and desktop
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             "LearnVeda — Learn from Class 9 to Graduation", // Full app name
    short_name:       "LearnVeda",                                    // Name on home screen
    description:      "AI-powered EdTech platform for Indian students — CBSE, Engineering, Programming, Simulations.",
    start_url:        "/",             // URL opened when PWA launches
    display:          "standalone",   // Looks like native app (no browser UI)
    background_color: "#ffffff",      // Splash screen background (light mode)
    theme_color:      "#6366f1",      // Brand indigo — browser chrome color
    orientation:      "portrait",     // Default orientation
    scope:            "/",            // App scope — all URLs under /
    lang:             "en",           // Primary language
    categories:       ["education", "productivity"], // App store categories

    // App icons in multiple sizes for different devices
    icons: [
      { src: "/icons/icon-72x72.png",   sizes: "72x72",   type: "image/png", purpose: "maskable any" },
      { src: "/icons/icon-96x96.png",   sizes: "96x96",   type: "image/png", purpose: "maskable any" },
      { src: "/icons/icon-128x128.png", sizes: "128x128", type: "image/png", purpose: "maskable any" },
      { src: "/icons/icon-144x144.png", sizes: "144x144", type: "image/png", purpose: "maskable any" },
      { src: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png", purpose: "maskable any" },
      { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable any" },
      { src: "/icons/icon-384x384.png", sizes: "384x384", type: "image/png", purpose: "maskable any" },
      { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable any" },
    ],

    // App shortcuts for quick access from home screen
    shortcuts: [
      {
        name:       "My Dashboard",
        short_name: "Dashboard",
        description: "View your learning progress",
        url:        "/dashboard",
        icons:      [{ src: "/icons/icon-96x96.png", sizes: "96x96" }],
      },
      {
        name:       "Live Battles",
        short_name: "Battles",
        description: "Join a live coding battle",
        url:        "/live-battles",
        icons:      [{ src: "/icons/icon-96x96.png", sizes: "96x96" }],
      },
    ],
  };
}
