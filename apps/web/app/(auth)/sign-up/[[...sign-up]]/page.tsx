/**
 * @file app/(auth)/sign-up/[[...sign-up]]/page.tsx
 * @description Sign-up / registration page for LearnVeda
 * Route: /sign-up
 * When Clerk keys are configured: uses Clerk's hosted sign-up component
 * When in demo mode (no keys): shows a friendly placeholder UI
 */

import type { Metadata } from "next"; // Next.js metadata type
import Link from "next/link";         // Next.js navigation

export const metadata: Metadata = {
  title:       "Create Account — LearnVeda",
  description: "Create your free LearnVeda account and start learning today — Class 9-12, Engineering, Programming, and more.",
  robots:      { index: false, follow: false }, // Auth pages excluded from search index
};

/* ─── Detect real Clerk keys at build time ───────────────────────────────── */
const HAS_CLERK =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder") &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

/* ─── Sign-Up Page ────────────────────────────────────────────────────────── */
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-violet-950/20 dark:via-background dark:to-indigo-950/20 p-4">
      {HAS_CLERK ? (
        /* ─ Real Clerk sign-up UI when keys are configured ─ */
        <ClerkSignUp />
      ) : (
        /* ─ Demo mode placeholder when no keys configured ─ */
        <DemoSignUp />
      )}
    </div>
  );
}

/* ─── Clerk Sign-Up (lazy-loaded to avoid crash without keys) ─────────────── */
async function ClerkSignUp() {
  try {
    const { SignUp } = await import("@clerk/nextjs"); // Clerk sign-up component
    return (
      <SignUp
        appearance={{
          elements: {
            rootBox:           "mx-auto",
            card:              "shadow-xl border rounded-2xl",
            headerTitle:       "text-2xl font-extrabold",
            formButtonPrimary: "bg-violet-600 hover:bg-violet-700 text-sm",
          },
          variables: {
            colorPrimary: "#7c3aed",
            borderRadius: "0.75rem",
          },
        }}
      />
    );
  } catch {
    return <DemoSignUp />; // Fallback if Clerk import fails
  }
}

/* ─── Demo Sign-Up UI (shown when Clerk is not configured) ───────────────── */
function DemoSignUp() {
  return (
    <div className="w-full max-w-md bg-white dark:bg-card rounded-2xl shadow-xl border p-8 space-y-6">
      {/* Logo */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white font-extrabold text-lg">L</div>
        <h1 className="text-2xl font-extrabold">Create your account</h1>
        <p className="text-sm text-gray-500">Start your learning journey — free forever</p>
      </div>

      {/* What you get */}
      <div className="rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 p-4 space-y-2">
        <p className="text-sm font-semibold text-violet-800 dark:text-violet-300">✨ Free Account Includes:</p>
        {["Class 9–12 CBSE content", "30+ simulations", "AI Tutor (10/day)", "Community access", "Progress dashboard"].map(f => (
          <p key={f} className="text-xs text-violet-700 dark:text-violet-400 flex items-center gap-1.5">
            <span className="text-green-500">✓</span> {f}
          </p>
        ))}
      </div>

      {/* Demo notice */}
      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 text-sm text-amber-800 dark:text-amber-300">
        <strong>Demo Mode:</strong> Authentication requires Clerk API keys. Configure{" "}
        <code className="font-mono bg-amber-100 dark:bg-amber-900/50 px-1 rounded">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>{" "}
        to enable registration.
      </div>

      {/* Placeholder form */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium">First Name</label>
            <input type="text" placeholder="Rahul" disabled
              className="w-full rounded-xl border px-4 py-2.5 text-sm bg-muted cursor-not-allowed" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium">Last Name</label>
            <input type="text" placeholder="Sharma" disabled
              className="w-full rounded-xl border px-4 py-2.5 text-sm bg-muted cursor-not-allowed" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Email</label>
          <input type="email" placeholder="rahul@example.com" disabled
            className="w-full rounded-xl border px-4 py-2.5 text-sm bg-muted cursor-not-allowed" />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Password</label>
          <input type="password" placeholder="••••••••" disabled
            className="w-full rounded-xl border px-4 py-2.5 text-sm bg-muted cursor-not-allowed" />
        </div>
        <button disabled
          className="w-full rounded-xl bg-violet-600/50 text-white py-2.5 text-sm font-semibold cursor-not-allowed">
          Create Free Account (Requires Clerk Keys)
        </button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-violet-600 hover:underline">Sign In</Link>
      </p>
      <p className="text-center">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">← Back to home</Link>
      </p>
    </div>
  );
}
