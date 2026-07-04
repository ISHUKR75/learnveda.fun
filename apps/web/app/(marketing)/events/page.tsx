/**
 * @file app/(marketing)/events/page.tsx
 * @description Events page for LearnVeda
 * Route: /events
 * Shows upcoming olympiads, hackathons, code sprints, and math battles
 */

import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { EventsGrid } from "@/features/events/components/EventsGrid";

export const metadata: Metadata = {
  title:       "Events — LearnVeda",
  description: "Participate in monthly olympiads, code sprints, hackathons, and live competitions on LearnVeda. Compete, win, and level up.",
  openGraph: { title: "Events — LearnVeda", url: "/events" },
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main>
        <EventsGrid />
      </main>
      <Footer />
    </>
  );
}
