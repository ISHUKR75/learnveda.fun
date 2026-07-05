/**
 * @file app/manifest.ts
 * @description Web App Manifest for LearnVeda PWA
 * Enables "Add to Home Screen" on mobile browsers
 * Configures app display mode, icons, theme colors, and shortcuts
 * Next.js automatically serves this at /manifest.webmanifest
 */

import { MetadataRoute } from "next"; // Next.js manifest type

/* ─── Web App Manifest ────────────────────────────────────────────────────── */
/**
 * Returns the PWA manifest configuration.
 * This enables LearnVeda to be installed as an app on Android and iOS devices.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             "LearnVeda",                                    // Full app name
    short_name:       "LearnVeda",                                    // Compact name for home screen
    description:      "India's most engaging EdTech platform — Learn, Battle, Master!", // App description
    start_url:        "/",                                            // Open on home when launched
    display:          "standalone",                                   // Full-screen app experience (no browser chrome)
    background_color: "#ffffff",                                      // Splash screen background
    theme_color:      "#4f46e5",                                      // Brand purple (matches CSS variables)
    orientation:      "portrait",                                     // Lock to portrait on mobile
    scope:            "/",                                            // App scope boundary
    lang:             "en",                                           // Primary language
    categories:       ["education", "productivity", "games"],         // App Store categories

    /* ── App Icons ─────────────────────────────────────────────────────── */
    // Note: Add actual icon files to public/ directory
    // Required sizes: 192x192 (Android baseline), 512x512 (Android/iOS fullscreen)
    icons: [
      {
        src:     "/icons/icon-192x192.png",
        sizes:   "192x192",
        type:    "image/png",
        purpose: "maskable", // Maskable icon for Android adaptive icons
      },
      {
        src:     "/icons/icon-512x512.png",
        sizes:   "512x512",
        type:    "image/png",
        purpose: "any",      // Standard icon
      },
      {
        src:     "/icons/icon-512x512.png",
        sizes:   "512x512",
        type:    "image/png",
        purpose: "maskable", // Also maskable for splash screens
      },
    ],

    /* ── App Shortcuts ─────────────────────────────────────────────────── */
    // Long-press shortcuts on Android home screen icon
    shortcuts: [
      {
        name:        "Dashboard",
        short_name:  "Dashboard",
        description: "Jump to your learning dashboard",
        url:         "/dashboard",
        icons:       [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name:        "AI Tutor",
        short_name:  "AI Tutor",
        description: "Chat with LearnVeda AI Tutor",
        url:         "/ai-tutor",
        icons:       [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name:        "Live Battles",
        short_name:  "Battles",
        description: "Start a 1v1 knowledge battle",
        url:         "/live-battles",
        icons:       [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name:        "Practice",
        short_name:  "Practice",
        description: "Practice with quizzes and tests",
        url:         "/practice",
        icons:       [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
    ],

    /* ── Screenshots ───────────────────────────────────────────────────── */
    // Used in app install prompts on Chrome Android
    screenshots: [
      {
        src:          "/screenshots/homepage.png",
        sizes:        "1280x720",
        type:         "image/png",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form_factor:  "wide" as any,
        label:        "LearnVeda Home",
      },
    ],
  };
}
