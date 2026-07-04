/**
 * @file app/(marketing)/layout.tsx
 * @description Layout for marketing pages (home, about, pricing, features, etc.)
 * All marketing pages share this layout — no platform sidebar or dashboard UI
 * This is a transparent layout that lets page content define its structure
 */

import React from "react"; // React core

/**
 * Marketing layout component
 * Wraps all public-facing pages (landing, about, pricing, etc.)
 * Does not include Navbar/Footer — each page imports those directly for flexibility
 *
 * @param children - The active marketing page
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    // Minimum full viewport height so footer stays at bottom
    <div className="flex min-h-screen flex-col">
      {children} {/* Individual page content (includes its own Navbar + Footer) */}
    </div>
  );
}
