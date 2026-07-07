/**
 * @file app/(platform)/learn/page.tsx
 * @description Platform learn route — redirects to canonical public learn hub page
 *
 * Route conflict fix: /learn is owned by (marketing)/learn/page.tsx
 * The public learn hub handles both anonymous and authenticated users.
 * Authenticated users see personal progress overlaid on the same page.
 *
 * @see app/(marketing)/learn/page.tsx — canonical learn hub page
 */

import { redirect } from "next/navigation"; // Next.js redirect utility

/**
 * PlatformLearnRedirect
 * Redirects any platform-internal /learn hit to the public learn hub page.
 */
export default function PlatformLearnRedirect() {
  redirect("/learn"); // Redirect to canonical public learn page
}
