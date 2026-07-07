/**
 * @file app/(platform)/test-center/cbse/page.tsx
 * @description CBSE Board test preparation page
 * Route: /test-center/cbse
 */

import type { Metadata } from "next";
import { CBSETestHub }   from "@/features/test-center/components/CBSETestHub";

export const metadata: Metadata = {
  title:       "CBSE Board Mock Tests 2026 | LearnVeda Test Center",
  description: "240+ CBSE Board mock tests for Class 9, 10, 11 and 12. Chapter-wise, full board mock, and previous year papers (2015–2026). All subjects: Maths, Science, SST, English, Physics, Chemistry, Biology, Commerce.",
  keywords:    ["CBSE mock test 2026", "CBSE board practice", "Class 10 board mock", "Class 12 board exam preparation"],
};

export default function CBSETestPage() {
  return <CBSETestHub />;
}
