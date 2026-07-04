/**
 * @file app/(auth)/sign-in/[[...sign-in]]/page.tsx
 * @description Sign-in page for LearnVeda
 * Route: /sign-in
 * When Clerk keys are configured: uses Clerk's hosted sign-in component
 * When in demo mode (no keys): shows a friendly placeholder UI
 */

import type { Metadata } from "next"; // Next.js metadata type
import Link from "next/link";         // Next.js navigation

export const metadata: Metadata = {
  title:       "Sign In — LearnVeda",
  description: "Sign in to your LearnVeda account to access your courses, progress, and community.",
  robots:      { index: false, follow: false }, // Auth pages excluded from search index
};

/* ─── Detect real Clerk keys at build time ───────────────────────────────── */
const HAS_CLERK =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder") &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

/* ─── Sign-In Page ────────────────────────────────────────────────────────── */
export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-violet-950/20 dark:via-background dark:to-indigo-950/20 p-4">
      {HAS_CLERK ? (
        /* ─ Real Clerk sign-in UI when keys are configured ─ */
        <ClerkSignIn />
      ) : (
        /* ─ Demo mode placeholder when no keys configured ─ */
        <DemoSignIn />
      )}
    </div>
  );
}

/* ─── Clerk Sign-In (lazy-loaded to avoid crash without keys) ─────────────── */
async function ClerkSignIn() {
  try {
    const { SignIn } = await import("@clerk/nextjs"); // Clerk sign-in component
    return (
      <SignIn
        appearance={{
          elements: {
            rootBox:           "mx-auto",                                     // Center the box
            card:              "shadow-xl border rounded-2xl",                 // Custom card styling
            headerTitle:       "text-2xl font-extrabold",                      // Bold header
            formButtonPrimary: "bg-violet-600 hover:bg-violet-700 text-sm",   // Brand button
          },
          variables: {
            colorPrimary: "#7c3aed", // LearnVeda brand violet
            borderRadius: "0.75rem", // Match design system radius
          },
        }}
      />
    );
  } catch {
    return <DemoSignIn />; // Fallback if Clerk import fails
  }
}

/* ─── Demo Sign-In UI (shown when Clerk is not configured) ───────────────── */
function DemoSignIn() {
  return (
    <div className="w-full max-w-md bg-white dark:bg-card rounded-2xl shadow-xl border p-8 space-y-6">
      {/* Logo */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white font-extrabold text-lg">L</div>
        <h1 className="text-2xl font-extrabold">Sign in to LearnVeda</h1>
        <p className="text-sm text-gray-500">Welcome back — continue your learning journey</p>
      </div>

      {/* Demo notice */}
      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 text-sm text-amber-800 dark:text-amber-300">
        <strong>Demo Mode:</strong> Authentication requires Clerk API keys. Add your{" "}
        <code className="font-mono bg-amber-100 dark:bg-amber-900/50 px-1 rounded">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>{" "}
        and <code className="font-mono bg-amber-100 dark:bg-amber-900/50 px-1 rounded">CLERK_SECRET_KEY</code> to enable sign-in.
      </div>

      {/* Placeholder form */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Email</label>
          <input type="email" placeholder="student@example.com" disabled
            className="w-full rounded-xl border px-4 py-2.5 text-sm bg-muted cursor-not-allowed" />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Password</label>
          <input type="password" placeholder="••••••••" disabled
            className="w-full rounded-xl border px-4 py-2.5 text-sm bg-muted cursor-not-allowed" />
        </div>
        <button disabled
          className="w-full rounded-xl bg-violet-600/50 text-white py-2.5 text-sm font-semibold cursor-not-allowed">
          Sign In (Requires Clerk Keys)
        </button>
      </div>

      {/* Links */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-semibold text-violet-600 hover:underline">Sign Up Free</Link>
      </p>
      <p className="text-center">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">← Back to home</Link>
      </p>
    </div>
  );
}
