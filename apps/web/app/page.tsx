/**
 * @file app/page.tsx
 * @description Root page — redirects to the marketing home page
 * This file handles the root "/" route before the route group layouts kick in
 * The actual home page content is in app/(marketing)/page.tsx
 */

export { default } from "./(marketing)/page"; // Re-export the marketing home page as root
