/**
 * @file app/(platform)/explore/page.tsx
 * @description Platform explore route — redirects to canonical public explore page
 *
 * Route conflict fix: /explore is owned by (marketing)/explore/page.tsx
 * The public explore page handles both anonymous and authenticated users.
 *
 * @see app/(marketing)/explore/page.tsx — canonical explore page
 */

import { redirect } from "next/navigation"; // Next.js redirect utility

/**
 * PlatformExploreRedirect
 * Redirects any platform-internal /explore hit to the public explore page.
 */
export default function PlatformExploreRedirect() {
  redirect("/explore"); // Redirect to canonical public explore page
}
