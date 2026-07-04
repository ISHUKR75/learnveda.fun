/**
 * @file providers/theme-provider.tsx
 * @description Theme provider for dark/light mode support in LearnVeda
 * Wraps next-themes ThemeProvider with proper TypeScript types
 * Used in the root layout to enable system-aware theme switching
 */

"use client"; // This component needs client-side JavaScript for theme toggling

import * as React from "react";                         // React core
import { ThemeProvider as NextThemesProvider } from "next-themes"; // next-themes library
import type { ThemeProviderProps } from "next-themes";  // Type for props

/**
 * ThemeProvider component
 * Wraps children with next-themes context for dark/light/system theme support
 *
 * @param props - ThemeProviderProps from next-themes (attribute, defaultTheme, etc.)
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    // Pass all props through to next-themes provider
    <NextThemesProvider {...props}>
      {children} {/* Render wrapped children with theme context */}
    </NextThemesProvider>
  );
}
