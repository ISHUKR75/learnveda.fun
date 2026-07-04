/**
 * @file app/(marketing)/contact/page.tsx
 * @description Contact page for LearnVeda
 * Route: /contact
 * Contains: contact form, email, social links, office info
 */

import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ContactForm } from "@/features/contact/components/ContactForm";

export const metadata: Metadata = {
  title:       "Contact Us — LearnVeda",
  description: "Get in touch with the LearnVeda team. We're here to help with questions about courses, pricing, partnerships, or technical support.",
  openGraph: { title: "Contact Us — LearnVeda", url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
