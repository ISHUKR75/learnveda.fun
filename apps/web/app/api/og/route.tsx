/**
 * @file app/api/og/route.tsx
 * @description Open Graph image generation API for LearnVeda
 * Route: GET /api/og?title=...&subtitle=...&type=...
 * Generates dynamic OG images for pages, chapters, blog posts, and events
 * In production: uses @vercel/og / satori for server-side image generation
 * Auth: Public — these images are shared on social media
 */

import { NextRequest, NextResponse } from "next/server"; // Next.js helpers

/* ─── GET /api/og ─────────────────────────────────────────────────────────── */
/**
 * Returns a redirect to the static default OG image.
 * In production: generates dynamic OG images with satori/canvas.
 *
 * Production implementation would use:
 * import { ImageResponse } from "@vercel/og";
 * return new ImageResponse(<JSX>..., { width: 1200, height: 630 });
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Extract query parameters for image customization
  const title    = searchParams.get("title")    || "LearnVeda — Learn. Battle. Master.";
  const subtitle = searchParams.get("subtitle") || "India's most engaging EdTech platform";
  const type     = searchParams.get("type")     || "default"; // default | chapter | event | battle

  // Log for analytics — in production track OG image views
  console.log(`[OG Image] Generating for: "${title}" (${type})`);

  // In production with @vercel/og installed:
  // const { ImageResponse } = await import("@vercel/og");
  // return new ImageResponse(
  //   <div style={{ display: "flex", width: "100%", height: "100%", background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}>
  //     <div style={{ display: "flex", flexDirection: "column", padding: "80px" }}>
  //       <div style={{ fontSize: 56, fontWeight: 800, color: "white" }}>{title}</div>
  //       <div style={{ fontSize: 28, color: "rgba(255,255,255,0.8)", marginTop: 24 }}>{subtitle}</div>
  //       <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12 }}>
  //         <div style={{ fontSize: 24, color: "white" }}>⚡ LearnVeda</div>
  //       </div>
  //     </div>
  //   </div>,
  //   { width: 1200, height: 630 }
  // );

  // Demo mode: return a JSON describing what the OG image would look like
  // The actual OG image URL falls back to /og-image.png in metadata
  return NextResponse.json({
    ok: true,
    data: {
      title,
      subtitle,
      type,
      note: "Add @vercel/og package to enable dynamic OG image generation",
      fallback: "/og-image.png",
    },
  });
}
