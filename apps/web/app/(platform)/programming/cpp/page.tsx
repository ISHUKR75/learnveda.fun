/**
 * @file app/(platform)/programming/cpp/page.tsx
 * @description C++ Programming 28-day track page route
 * Route: /programming/cpp
 */

import type { Metadata } from "next";
import { CppDayPlan }    from "@/features/programming/cpp/components/CppDayPlan";

export const metadata: Metadata = {
  title:       "Learn C++ in 28 Days | LearnVeda — OOP, STL, Templates, Modern C++",
  description:
    "Master C++ from beginner to advanced in 28 days. Learn OOP, STL containers, " +
    "templates, smart pointers, move semantics, and build a complete DSA library. " +
    "Ideal for GATE CS, SDE interviews, and competitive programming.",
  keywords: [
    "learn C++ online", "C++ OOP tutorial India", "C++ STL guide",
    "modern C++ 17 20", "C++ for competitive programming",
  ],
};

export default function CppProgrammingPage() {
  return <CppDayPlan />;
}
