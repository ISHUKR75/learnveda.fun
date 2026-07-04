/**
 * @file app/(auth)/layout.tsx
 * @description Layout for authentication pages (sign-in, sign-up, verify)
 * No navbar or footer — clean, focused auth experience
 */

import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
    </div>
  );
}
