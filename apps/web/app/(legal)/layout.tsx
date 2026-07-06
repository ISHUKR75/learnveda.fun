/**
 * @file app/(legal)/layout.tsx
 * @description Layout for legal pages (privacy-policy, terms-of-service)
 *
 * Thin wrapper — Navbar and Footer are included within each page
 * so this layout can remain minimal.
 */

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; // Navbar and Footer are in individual page files
}
