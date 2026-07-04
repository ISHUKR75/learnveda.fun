/**
 * @file app/(legal)/layout.tsx
 * @description Layout wrapper for all legal pages (Privacy, Terms, Cookie Policy)
 * Applies a clean, readable layout suitable for legal documents
 */

import React from "react";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
    </div>
  );
}
