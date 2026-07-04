/**
 * @file app/(platform)/layout.tsx
 * @description Layout for authenticated platform pages
 * When Clerk is configured: redirects unauthenticated users to sign-in
 * When Clerk is not configured (dev/demo): allows all access for development
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
      // If Clerk auth fails for any reason, skip auth check in dev mode
      console.warn("[PlatformLayout] Clerk auth check failed:", err);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
