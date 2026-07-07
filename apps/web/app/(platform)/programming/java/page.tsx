/**
 * @file app/(platform)/programming/java/page.tsx
 * @description Java 30-day learning track page
 * Route: /programming/java
 * @purpose Complete Java curriculum — fundamentals to Spring, OOP, DSA
 */

import type { Metadata }  from "next";
import { JavaDayPlan }    from "@/features/programming/java/components/JavaDayPlan";

export const metadata: Metadata = {
  title:       "Java 30-Day Complete Track | LearnVeda Programming",
  description:
    "Master Java in 30 days — fundamentals, OOP, Collections, multithreading, Spring Boot. " +
    "Day-by-day curriculum with code examples, exercises, and placement preparation. " +
    "From Hello World to capstone project.",
  keywords: [
    "Java programming course", "Learn Java online", "Java OOP tutorial",
    "Java for placements", "Java Spring Boot", "Java DSA", "Java 30 day challenge",
  ],
  openGraph: {
    title:       "Java 30-Day Track | LearnVeda",
    description: "Complete Java from scratch — OOP, Collections, Multithreading, Spring Boot.",
    type:        "website",
  },
};

export default function JavaPage() {
  return <JavaDayPlan />;
}
