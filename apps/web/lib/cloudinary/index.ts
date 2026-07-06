/**
 * @file lib/cloudinary/index.ts
 * @description Cloudinary media management stub for LearnVeda
 *
 * Used for:
 *  - User avatar uploads
 *  - Simulation and course thumbnails
 *  - Community post images
 *  - Blog post cover images
 *
 * Production setup:
 *  1. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 *     to Replit Secrets
 *  2. Install: npm install cloudinary
 *  3. Replace the stub below with real Cloudinary client
 *
 * @see https://cloudinary.com/documentation/node_integration
 */

/* ─── Environment ────────────────────────────────────────────────────────── */
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_API_KEY    = process.env.CLOUDINARY_API_KEY    || "";
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "";

/** Cloudinary upload preset (created in Cloudinary Dashboard) */
export const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || "learnveda";

/** True when Cloudinary is fully configured */
export const isCloudinaryConfigured =
  CLOUDINARY_CLOUD_NAME.length > 0 &&
  CLOUDINARY_API_KEY.length > 0 &&
  CLOUDINARY_API_SECRET.length > 0 &&
  !CLOUDINARY_CLOUD_NAME.includes("placeholder");

/* ─── Cloudinary client (lazy-loaded) ───────────────────────────────────── */
let _cloudinary: unknown = null;

/**
 * Get the Cloudinary server-side client.
 * Returns null when not configured — callers must check `isCloudinaryConfigured`.
 *
 * @example
 * const cl = await getCloudinaryClient();
 * if (!cl) return NextResponse.json({ error: "Media uploads not configured" }, { status: 503 });
 * const result = await cl.uploader.upload(base64Image, { folder: "avatars" });
 */
export async function getCloudinaryClient() {
  if (!isCloudinaryConfigured) return null;
  if (_cloudinary) return _cloudinary as typeof import("cloudinary").v2;

  try {
    const { v2: cloudinary } = await import("cloudinary" as never) as { v2: typeof import("cloudinary").v2 };
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key:    CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      secure:     true,
    });
    _cloudinary = cloudinary;
    return cloudinary;
  } catch {
    console.warn("[LearnVeda] Cloudinary package not installed. Run: npm install cloudinary");
    return null;
  }
}

/* ─── URL builders ───────────────────────────────────────────────────────── */

/**
 * Build a Cloudinary CDN URL for an image.
 *
 * @param publicId  - Cloudinary public ID of the image
 * @param width     - Desired width in pixels
 * @param height    - Desired height in pixels
 * @param crop      - Cloudinary crop mode (default: "fill")
 */
export function buildCloudinaryUrl(
  publicId: string,
  width:    number = 400,
  height:   number = 300,
  crop:     string = "fill",
): string {
  if (!isCloudinaryConfigured) return "";
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},h_${height},c_${crop},q_auto,f_auto/${publicId}`;
}

/**
 * Build a Cloudinary CDN URL for a user avatar.
 * Applies face-aware cropping for best results on circular crops.
 *
 * @param publicId - Cloudinary public ID of the avatar
 * @param size     - Size in pixels (used for both width and height)
 */
export function buildAvatarUrl(publicId: string, size: number = 200): string {
  if (!isCloudinaryConfigured) return "";
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_${size},h_${size},c_fill,g_face,q_auto,f_auto,r_max/${publicId}`;
}

/* ─── Upload helpers (server-side only) ──────────────────────────────────── */

/**
 * Upload a file to Cloudinary from a base64 string.
 * For use in API routes — not for client-side code.
 *
 * @param base64Data - Base64-encoded image data
 * @param folder     - Cloudinary folder (e.g. "avatars", "thumbnails")
 * @param publicId   - Optional public ID (auto-generated if omitted)
 */
export async function uploadImage(
  base64Data: string,
  folder:     string = "learnveda",
  publicId?:  string,
): Promise<{ url: string; publicId: string } | null> {
  const cl = await getCloudinaryClient();
  if (!cl) return null;

  try {
    const result = await cl.uploader.upload(base64Data, {
      folder,
      ...(publicId ? { public_id: publicId, overwrite: true } : {}),
      quality:         "auto",
      fetch_format:    "auto",
      transformation:  [{ quality: "auto:good" }],
    });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error("[Cloudinary] Upload failed:", error);
    return null;
  }
}

/**
 * Delete an image from Cloudinary.
 *
 * @param publicId - Cloudinary public ID to delete
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  const cl = await getCloudinaryClient();
  if (!cl) return false;
  try {
    await cl.uploader.destroy(publicId);
    return true;
  } catch {
    return false;
  }
}
