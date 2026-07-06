/**
 * @file app/(marketing)/events/page.tsx
 * @description Events & Competitions page for LearnVeda
 * Route: /events
 */

import type { Metadata } from "next";
import { Navbar }       from "@/components/navigation/navbar";
import { Footer }       from "@/components/navigation/footer";
import { EventsGrid }   from "@/features/events/components/EventsGrid";

export const metadata: Metadata = {
  title:       "Events & Competitions — LearnVeda",
  description: "Join live coding battles, workshops, hackathons, mock tests, and olympiads on LearnVeda. Win prizes and compete with students nationwide.",
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main>
        <EventsGrid /> {/* Events listing with filters */}
      </main>
      <Footer />
    </>
  );
}
