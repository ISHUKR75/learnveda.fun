/**
 * @file app/(platform)/events/page.tsx
 * @description Platform events route — redirects to canonical public events page
 *
 * Route conflict fix: /events is owned by (marketing)/events/page.tsx
 * The public events page handles both anonymous and authenticated users.
 * Authenticated users see additional registration status via client-side auth state.
 *
 * @see app/(marketing)/events/page.tsx — canonical events page
 */

// Next.js server-side redirect — sends user to the correct events page
import { redirect } from "next/navigation"; // Next.js redirect utility

/**
 * PlatformEventsRedirect
 * Redirects any platform-internal /events hit to the public events page.
 * The public events page shows personal registration status when logged in.
 */
export default function PlatformEventsRedirect() {
  redirect("/events"); // Redirect to canonical public events page
}
