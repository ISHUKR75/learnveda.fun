/**
 * @file app/(platform)/practice/page.tsx
 * @description Platform practice route — redirects to canonical public practice page
 *
 * Route conflict fix: /practice is owned by (marketing)/practice/page.tsx
 * The public practice page handles both anonymous and authenticated users.
 * Authenticated users see personal progress and saved sessions.
 *
 * @see app/(marketing)/practice/page.tsx — canonical practice page
 */

import { redirect } from "next/navigation"; // Next.js redirect utility

/**
 * PlatformPracticeRedirect
 * Redirects any platform-internal /practice hit to the public practice page.
 */
export default function PlatformPracticeRedirect() {
  redirect("/practice"); // Redirect to canonical public practice page
}
