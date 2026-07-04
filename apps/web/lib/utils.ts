/**
 * @file lib/utils.ts
 * @description Utility functions used across the LearnVeda application
 * Includes Tailwind class merging, string helpers, date formatters, and more
 */

import { type ClassValue, clsx } from "clsx";   // clsx for conditional class names
import { twMerge } from "tailwind-merge";        // Merge Tailwind classes without conflicts

/* ─── Tailwind Class Merger ──────────────────────────────────────────────── */
/**
 * Merges Tailwind CSS class names intelligently
 * Resolves conflicts (e.g., "p-2 p-4" → "p-4") using tailwind-merge
 * and handles conditional classes with clsx
 *
 * @param inputs - Any combination of class values, arrays, or conditionals
 * @returns Merged, conflict-free class string
 *
 * @example cn("px-4 py-2", isActive && "bg-primary", "text-sm")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // First resolve conditionals, then merge Tailwind conflicts
}

/* ─── String Utilities ───────────────────────────────────────────────────── */
/**
 * Converts a string to slug format (URL-friendly)
 * @example slugify("Hello World!") → "hello-world"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()                   // Lowercase all characters
    .trim()                          // Remove leading/trailing spaces
    .replace(/[^\w\s-]/g, "")       // Remove non-word characters except hyphens
    .replace(/[\s_-]+/g, "-")       // Replace spaces, underscores with hyphens
    .replace(/^-+|-+$/g, "");       // Remove leading/trailing hyphens
}

/**
 * Capitalizes the first letter of a string
 * @example capitalize("hello world") → "Hello world"
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1); // Uppercase first char, append rest
}

/**
 * Truncates a string to a maximum length with ellipsis
 * @example truncate("Hello World", 8) → "Hello..."
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;   // No truncation needed
  return str.slice(0, maxLength - 3) + "..."; // Trim and add ellipsis
}

/* ─── Number Utilities ───────────────────────────────────────────────────── */
/**
 * Formats a number with compact notation for display
 * @example formatNumber(1200) → "1.2K"
 * @example formatNumber(1500000) → "1.5M"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN", {
    notation:            "compact",   // Use compact notation (K, M, B)
    maximumFractionDigits: 1,         // One decimal place
  }).format(num);
}

/**
 * Clamps a number between min and max bounds
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max); // Constrain value within bounds
}

/* ─── Date Utilities ─────────────────────────────────────────────────────── */
/**
 * Formats a date to a human-readable relative time string
 * @example formatRelativeTime(new Date("2024-01-01")) → "3 months ago"
 */
export function formatRelativeTime(date: Date): string {
  const now        = new Date();           // Current timestamp
  const diffMs     = now.getTime() - date.getTime(); // Millisecond difference
  const diffSec    = Math.floor(diffMs / 1000);      // Convert to seconds
  const diffMin    = Math.floor(diffSec / 60);       // Convert to minutes
  const diffHr     = Math.floor(diffMin / 60);       // Convert to hours
  const diffDays   = Math.floor(diffHr  / 24);       // Convert to days
  const diffMonths = Math.floor(diffDays / 30);      // Approximate months
  const diffYears  = Math.floor(diffDays / 365);     // Approximate years

  if (diffSec    <  60) return "just now";
  if (diffMin    <  60) return `${diffMin}m ago`;
  if (diffHr     <  24) return `${diffHr}h ago`;
  if (diffDays   <  30) return `${diffDays}d ago`;
  if (diffMonths <  12) return `${diffMonths}mo ago`;
  return `${diffYears}y ago`;
}

/* ─── Array Utilities ────────────────────────────────────────────────────── */
/**
 * Shuffles an array randomly using Fisher-Yates algorithm
 */
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array]; // Clone to avoid mutating original
  for (let i = arr.length - 1; i > 0; i--) {
    const j     = Math.floor(Math.random() * (i + 1)); // Random index
    [arr[i], arr[j]] = [arr[j], arr[i]];               // Swap elements
  }
  return arr;
}

/**
 * Groups an array of objects by a key
 * @example groupBy(users, "role") → { admin: [...], student: [...] }
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]); // Get string key for grouping
    return {
      ...groups,
      [groupKey]: [...(groups[groupKey] || []), item], // Append item to group
    };
  }, {} as Record<string, T[]>);
}

/* ─── URL Utilities ──────────────────────────────────────────────────────── */
/**
 * Constructs an absolute URL from a relative path
 */
export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${base}${path}`; // Combine base URL with path
}

/* ─── Validation Utilities ───────────────────────────────────────────────── */
/**
 * Checks if a string is a valid email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
  return emailRegex.test(email);                    // Test string against pattern
}

/**
 * Generates a random ID string (for temporary use — use crypto.randomUUID() in prod)
 */
export function generateId(length = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)] // Random character from charset
  ).join("");
}
