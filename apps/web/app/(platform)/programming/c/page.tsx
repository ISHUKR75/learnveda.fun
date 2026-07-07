/**
 * @file app/(platform)/programming/c/page.tsx
 * @description C Programming 21-day track page route
 * Route: /programming/c
 */

import type { Metadata } from "next";
import { CDayPlan }      from "@/features/programming/c/components/CDayPlan";

export const metadata: Metadata = {
  title:       "Learn C Programming in 21 Days | LearnVeda",
  description:
    "Master C programming from scratch in 21 days. Learn pointers, memory management, " +
    "file I/O, data structures, and build real projects. Perfect for GATE CS, placements, " +
    "and embedded systems careers.",
  keywords: [
    "learn C programming", "C pointers tutorial", "C memory management",
    "C programming for GATE", "C programming for beginners India",
  ],
};

export default function CProgrammingPage() {
  return <CDayPlan />;
}
