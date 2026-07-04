/**
 * @file app/(auth)/sign-in/[[...sign-in]]/page.tsx
 * @description Sign-in page for LearnVeda using Clerk
 * Route: /sign-in
 * Uses Clerk's hosted sign-in component with custom styling
 */

import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs"; // Clerk sign-in component

export const metadata: Metadata = {
  title:       "Sign In — LearnVeda",
  description: "Sign in to your LearnVeda account to access your courses, progress, and community.",
  robots:      { index: false, follow: false }, // Don't index auth pages
};

/* ─── Sign-In Page Component ─────────────────────────────────────────────── */
export default function SignInPage() {
  return (
    // Full-screen centered layout with gradient background
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-950/20 dark:to-purple-950/20 p-4">
      {/* Clerk's built-in sign-in UI — fully styled and WCAG compliant */}
      <SignIn
        appearance={{
          elements: {
            rootBox:         "mx-auto",                                // Center the box
            card:            "shadow-xl border rounded-2xl",           // Custom card styling
            headerTitle:     "text-2xl font-extrabold",                // Bold header
            formButtonPrimary: "bg-brand-500 hover:bg-brand-600 text-sm", // Brand primary button
          },
          variables: {
            colorPrimary:       "#6366f1", // Brand indigo
            borderRadius:       "0.75rem", // Match design system radius
          },
        }}
      />
    </div>
  );
}
