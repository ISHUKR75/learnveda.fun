/**
 * @file app/(marketing)/explore/page.tsx
 * @description Explore page — content discovery hub for guests and logged-in users
 * Route: /explore
 * Redirects to the main learning hub with featured content
 */

import { redirect } from "next/navigation"; // Next.js redirect

/**
 * Explore page — redirects to the Learn hub
 * In the future this will be personalized with AI recommendations
 */
export default function ExplorePage() {
  redirect("/learn"); // Forward to the Learning Hub page
}
