/**
 * @file app/(platform)/learn/engineering/page.tsx
 * @description Engineering Learning Hub page route
 * Route: /learn/engineering
 */

import type { Metadata }  from "next";
import { EngineeringHub } from "@/features/learn/engineering/components/EngineeringHub";

export const metadata: Metadata = {
  title:       "Engineering Learning Hub | LearnVeda — CSE, ECE, Mech, Civil, AI/ML",
  description:
    "Complete engineering education for all branches: CSE, ECE, EEE, Civil, Mechanical, " +
    "Chemical, AI/ML, Data Science, IT. Semester-wise notes, previous year papers, GATE prep, " +
    "and placement guidance.",
  keywords: [
    "engineering notes", "CSE semester notes", "GATE preparation", "engineering PYQ",
    "BTech study material", "BE notes", "CSE syllabus", "ECE notes",
  ],
};

export default function EngineeringPage() {
  return <EngineeringHub />;
}
