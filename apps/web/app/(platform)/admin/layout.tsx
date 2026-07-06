/**
 * @file app/(platform)/admin/layout.tsx
 * @description Layout wrapper for all admin routes (/admin/*)
 *
 * This layout acts as a SECOND layer of defense for admin access:
 *  1. Middleware enforces authentication (Clerk session required)
 *  2. This layout enforces admin role (ADMIN_USER_IDS env var)
 *
 * If neither authentication nor admin role passes, the user is redirected
 * to /dashboard — they never see admin UI, even as a flash.
 *
 * This is defense in depth:
 *  - Middleware: auth check (fast, at edge)
 *  - This layout: role check (server component, DB-aware)
 *  - Individual API routes: role check again (never trust layout-only guards)
 *
 * @see apps/web/middleware.ts for authentication enforcement
 * @see apps/web/app/api/admin/newsletter/route.ts for API-level role check
 */

import { redirect }     from "next/navigation"; // Next.js server redirect
import { auth, currentUser } from "@clerk/nextjs/server"; // Clerk server auth
import { headers }      from "next/headers"; // Check X-LearnVeda-Demo header

/* ─── Admin Role Check ───────────────────────────────────────────────────── */
/**
 * Check if the current user has admin privileges.
 * Returns true only if:
 *  1. ADMIN_USER_IDS is configured (non-empty)
 *  2. The current Clerk user ID is in the list
 *
 * Fail-closed: returns false when ADMIN_USER_IDS is not configured.
 * This prevents accidental admin access on misconfigured deployments.
 *
 * @param userId - Clerk user ID to check
 */
function isAdminUser(userId: string | null): boolean {
  if (!userId) return false; // Must be authenticated

  const ADMIN_USER_IDS = (process.env.ADMIN_USER_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  // Fail closed: if list is empty, no one is admin
  if (ADMIN_USER_IDS.length === 0) return false;

  return ADMIN_USER_IDS.includes(userId);
}

/* ─── AdminLayout Component ──────────────────────────────────────────────── */
/**
 * Server component layout for all /admin/* routes.
 * Performs authentication + role check before rendering children.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode; // Child admin page content
}) {
  // Check if we're in demo mode (no real Clerk keys configured)
  const CLERK_KEY     = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  const hasRealClerck = !!CLERK_KEY && !CLERK_KEY.includes("placeholder") && CLERK_KEY.startsWith("pk_");

  if (!hasRealClerck) {
    // Demo mode — admin UI is inaccessible; redirect to dashboard
    // This prevents anyone from accessing admin UI in demo environments
    redirect("/dashboard");
  }

  // Get current authenticated user from Clerk
  const { userId } = await auth();

  // Not authenticated → redirect to sign-in
  if (!userId) {
    redirect("/sign-in?redirect_url=/admin");
  }

  // Authenticated but not admin → redirect to dashboard (no error message to prevent enumeration)
  if (!isAdminUser(userId)) {
    console.warn(`[Admin Layout] Non-admin user ${userId} attempted to access /admin`);
    redirect("/dashboard");
  }

  // User is authenticated and is admin — render admin UI
  return (
    <div>
      {children} {/* Render the admin page content */}
    </div>
  );
}
