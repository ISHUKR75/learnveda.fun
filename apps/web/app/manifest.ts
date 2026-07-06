/**
 * @file app/manifest.ts
 * @description PWA Web App Manifest for LearnVeda
 *
 * Next.js serves this at /manifest.webmanifest automatically.
 * Enables "Add to Home Screen" on mobile devices.
 * Supports offline access via service worker (future enhancement).
 */

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             "LearnVeda — Learn Smarter",   // Full app name
    short_name:       "LearnVeda",                    // Short name for home screen icon
    description:      "India's most complete EdTech platform — CBSE, Engineering, Programming & AI Tutor",
    start_url:        "/",                            // Opens to homepage
    display:          "standalone",                   // Full-screen app experience (no browser chrome)
    background_color: "#ffffff",                      // Splash screen background
    theme_color:      "#6366f1",                      // Brand purple — toolbar color on Android
    orientation:      "portrait-primary",             // Portrait mode preferred
    scope:            "/",                            // PWA scope (all URLs)
    lang:             "en-IN",                        // Indian English

    // ── Icons ──────────────────────────────────────────────────────────────
    icons: [
      {
        src:     "/icons/icon-72x72.png",
        sizes:   "72x72",
        type:    "image/png",
        purpose: "any",
      },
      {
        src:     "/icons/icon-96x96.png",
        sizes:   "96x96",
        type:    "image/png",
        purpose: "any",
      },
      {
        src:     "/icons/icon-128x128.png",
        sizes:   "128x128",
        type:    "image/png",
        purpose: "any",
      },
      {
        src:     "/icons/icon-192x192.png",
        sizes:   "192x192",
        type:    "image/png",
        purpose: "maskable",  // Maskable icon for adaptive icons on Android
      },
      {
        src:     "/icons/icon-512x512.png",
        sizes:   "512x512",
        type:    "image/png",
        purpose: "maskable",  // Larger maskable icon for splash screens
      },
    ],

    // ── Shortcuts — quick actions from the home screen icon ───────────────
    shortcuts: [
      {
        name:      "AI Tutor",
        short_name:"AI Tutor",
        description: "Ask the AI Tutor anything",
        url:       "/ai-tutor",
        icons:     [{ src: "/icons/icon-96x96.png", sizes: "96x96" }],
      },
      {
        name:      "My Dashboard",
        short_name:"Dashboard",
        description: "View your learning progress",
        url:       "/dashboard",
        icons:     [{ src: "/icons/icon-96x96.png", sizes: "96x96" }],
      },
      {
        name:      "Live Battle",
        short_name:"Battle",
        description: "Start a live 1v1 battle",
        url:       "/live-battles",
        icons:     [{ src: "/icons/icon-96x96.png", sizes: "96x96" }],
      },
    ],

    // ── Screenshots (displayed in app stores and install prompts) ─────────
    screenshots: [
      {
        src:           "/screenshots/home.png",
        sizes:         "1280x720",
        type:          "image/png",
        // @ts-expect-error — 'form_factor' is in the spec but not yet in TypeScript types
        form_factor:   "wide",
        label:         "LearnVeda Homepage",
      },
    ],
  };
}
