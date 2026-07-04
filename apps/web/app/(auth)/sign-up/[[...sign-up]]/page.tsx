/**
 * @file app/(auth)/sign-up/[[...sign-up]]/page.tsx
 * @description Sign-up / registration page for LearnVeda using Clerk
 * Route: /sign-up
 * Uses Clerk's hosted sign-up component with matching brand styling
 */

import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs"; // Clerk sign-up component

export const metadata: Metadata = {
  title:       "Create Account — LearnVeda",
  description: "Create your free LearnVeda account and start learning today — Class 9-12, Engineering, Programming, and more.",
  robots:      { index: false, follow: false }, // Auth pages excluded from index
};

/* ─── Sign-Up Page Component ─────────────────────────────────────────────── */
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-950/20 dark:to-purple-950/20 p-4">
      <SignUp
        appearance={{
          elements: {
            rootBox:             "mx-auto",
            card:                "shadow-xl border rounded-2xl",
            headerTitle:         "text-2xl font-extrabold",
            formButtonPrimary:   "bg-brand-500 hover:bg-brand-600 text-sm",
          },
          variables: {
            colorPrimary: "#6366f1",
            borderRadius: "0.75rem",
          },
        }}
      />
    </div>
  );
}
