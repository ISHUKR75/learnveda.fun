/**
 * @file app/(marketing)/contact/page.tsx
 * @description Contact page for LearnVeda
 * Route: /contact
 */

import type { Metadata } from "next";
import { Navbar }       from "@/components/navigation/navbar";
import { Footer }       from "@/components/navigation/footer";
import { ContactForm }  from "@/features/contact/components/ContactForm";

export const metadata: Metadata = {
  title:       "Contact Us — LearnVeda",
  description: "Get in touch with the LearnVeda team. We respond within 24 hours. Ask us anything about the platform, partnerships, or education.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactForm /> {/* Contact form + contact info panel */}
      </main>
      <Footer />
    </>
  );
}
