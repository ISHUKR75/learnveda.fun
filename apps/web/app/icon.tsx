/**
 * @file app/icon.tsx
 * @description LearnVeda app icon generator — produces the /icon route for browser tabs and PWA
 *
 * Uses Next.js ImageResponse to dynamically generate an SVG-based PNG icon.
 * This file replaces a static icon.png and supports dynamic branding.
 *
 * Sizes served by Next.js automatically:
 *   - 32×32  (browser tab favicon)
 *   - 180×180 (Apple touch icon)
 *   - 192×192 (PWA icon — referenced in manifest.ts)
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
 */

import { ImageResponse } from "next/og"; // Next.js image response (no canvas needed)

/* ─── Icon Dimensions ─────────────────────────────────────────────────────── */
export const size        = { width: 32, height: 32 }; // Base icon size
export const contentType = "image/png";                // Output format

/**
 * Icon component — renders the "L" LearnVeda monogram with brand gradient
 * The design uses the brand purple (#7C3AED) with a white letter on a rounded square.
 */
export default function Icon() {
  return new ImageResponse(
    (
      // Outer container — dark rounded square background
      <div
        style={{
          width:           "32px",
          height:          "32px",
          background:      "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
          borderRadius:    "8px",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          fontFamily:      "sans-serif",
          fontWeight:      "700",
          fontSize:        "18px",
          color:           "#FFFFFF",
          letterSpacing:   "-0.5px",
        }}
      >
        {/* Brand initial */}
        L
      </div>
    ),
    {
      ...size, // 32×32
    }
  );
}
