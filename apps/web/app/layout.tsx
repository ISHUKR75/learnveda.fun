/**
 * @file app/layout.tsx
 * @description Root layout for the LearnVeda Web Application
 * Wraps the entire app with:
 *  - Font loading (Geist Sans + Geist Mono)
 *  - Theme provider (dark/light mode)
 *  - Auth provider (Clerk — only when valid keys present)
 *  - Toast notifications (Sonner)
 *  - Global SEO metadata
 */

import type { Metadata, Viewport } from "next"; // Next.js metadata types
import { GeistSans } from "geist/font/sans";    // Geist Sans — primary font
import { GeistMono } from "geist/font/mono";    // Geist Mono — code font
import { ThemeProvider } from "@/providers/theme-provider"; // Dark/light mode toggler
import { Toaster } from "sonner";              // Toast notifications
import { QueryProvider } from "@/providers/query-provider"; // TanStack Query provider
import "@/styles/globals.css";                 // Global stylesheet

/* ─── Detect if Clerk keys are real (not placeholders) ───────────────────── */
const hasClerk =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder") &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

/* ─── Site-wide SEO Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default:  "LearnVeda — Learn Smarter, From Class 9 to Graduation",
    template: "%s | LearnVeda",
  },
  description:
    "LearnVeda is an AI-powered EdTech platform for Class 9 to Graduation. " +
    "Learn CBSE subjects, Engineering, Programming languages, DSA, System Design " +
    "with interactive simulations, live battles, and AI tutoring.",

  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://learnveda.in"),

  keywords: [
    "LearnVeda", "online learning", "CBSE", "Class 9", "Class 10", "Class 11", "Class 12",
    "engineering", "programming", "DSA", "System Design", "AI tutor",
    "live battles", "simulations", "edtech India",
  ],

  authors:   [{ name: "LearnVeda Team", url: "https://learnveda.in" }],
  creator:   "LearnVeda",
  publisher: "LearnVeda",

  openGraph: {
    type:        "website",
    locale:      "en_IN",
    url:         "https://learnveda.in",
    title:       "LearnVeda — AI-Powered Learning from Class 9 to Graduation",
    description: "India's most complete EdTech platform — CBSE, Engineering, Programming, Simulations, Live Battles, AI Tutor.",
    siteName:    "LearnVeda",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "LearnVeda — Learn Smarter" }],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "LearnVeda — AI-Powered Learning Platform",
    description: "From Class 9 to Graduation — CBSE, Engineering, Programming, AI Tutor.",
    images:      ["/og-image.png"],
    creator:     "@learnveda",
  },

  icons: {
    icon:    [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple:   "/apple-touch-icon.png",
    shortcut:"/favicon-32x32.png",
  },

  manifest: "/manifest.json",

  robots: {
    index:     true,
    follow:    true,
    googleBot: {
      index:              true,
      follow:             true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },
};

/* ─── Viewport Configuration ─────────────────────────────────────────────── */
export const viewport: Viewport = {
  width:         "device-width",
  initialScale:  1,
  maximumScale:  5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#0f0f0f" },
  ],
};

/* ─── Root Layout Component ──────────────────────────────────────────────── */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Conditionally import ClerkProvider only when valid keys are set
  // This avoids a crash in dev/demo mode when keys are placeholders
  // Use a permissive type for the dynamic import — Clerk's ClerkProvider has complex generics
  // that conflict with React.ComponentType when used with `appearance`. We cast via unknown.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ClerkProvider: React.ComponentType<any> | null = null;

  if (hasClerk) {
    const clerk = await import("@clerk/nextjs");
    ClerkProvider = clerk.ClerkProvider as React.ComponentType<any>; // Cast needed — Clerk generics are complex
  }

  const content = (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              toast:       "font-sans",
              description: "text-muted-foreground",
            },
          }}
          richColors
        />
      </QueryProvider>
    </ThemeProvider>
  );

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        {ClerkProvider
          ? <ClerkProvider appearance={{ variables: { colorPrimary: "#6366f1" } }}>{content}</ClerkProvider>
          : content
        }
      </body>
    </html>
  );
}
