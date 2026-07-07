/**
 * @file app/(platform)/simulations/page.tsx
 * @description Platform simulations route — redirects to canonical public simulations page
 *
 * Route conflict fix: /simulations is owned by (marketing)/simulations/page.tsx
 * The public simulations catalogue handles both anonymous and authenticated users.
 *
 * @see app/(marketing)/simulations/page.tsx — canonical simulations catalogue
 */

import { redirect } from "next/navigation"; // Next.js redirect utility

/**
 * PlatformSimulationsRedirect
 * Redirects any platform-internal /simulations hit to the public simulations page.
 */
export default function PlatformSimulationsRedirect() {
  redirect("/simulations"); // Redirect to canonical public simulations page
}
