/**
 * @file app/(platform)/layout.tsx
 * @description Layout for authenticated platform pages
 * When Clerk is configured: redirects unauthenticated users to sign-in
 * When Clerk is not configured (dev/demo): allows access for demo purposes
 * AUTH POLICY: fail-closed — any Clerk error causes a redirect, not a pass-through
 */

import React from "react";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navigation/navbar";

/* ─── Check if real Clerk keys are configured ────────────────────────────── */
const hasRealClerkKeys =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder") &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  // Only check auth when real Clerk keys are configured
  if (hasRealClerkKeys) {
    try {
      // Dynamically import auth to avoid crashes when Clerk isn't configured
      const { auth } = await import("@clerk/nextjs/server");
      const { userId } = await auth();
      if (!userId) {
        redirect("/sign-in"); // Redirect unauthenticated users to sign-in
      }
    } catch (err) {
      // Fail-closed: on Clerk auth error, redirect to sign-in rather than passing through
      // This prevents fail-open access to protected routes on misconfiguration or outages
      console.error("[PlatformLayout] Clerk auth check failed — redirecting to sign-in:", err);
      redirect("/sign-in"); // Never expose platform content if auth check fails
    }
  }
  // When no real Clerk keys: demo/dev mode — allow access for local development preview

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar /> {/* Site-wide navigation — provided here so pages don't duplicate it */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
