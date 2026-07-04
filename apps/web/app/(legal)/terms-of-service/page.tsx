/**
 * @file app/(legal)/terms-of-service/page.tsx
 * @description Terms of Service page for LearnVeda
 * Route: /terms-of-service
 */

import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";

export const metadata: Metadata = {
  title:       "Terms of Service — LearnVeda",
  description: "LearnVeda Terms of Service. Understand the rules and guidelines for using the LearnVeda platform.",
};

export default function TermsPage() {
  const lastUpdated = "July 4, 2025";

  return (
    <>
      <Navbar />
      <main className="py-16 md:py-24">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight mb-3">Terms of Service</h1>
            <p className="text-muted-foreground text-sm">Last updated: {lastUpdated}</p>
          </div>

          <div className="space-y-8 text-sm leading-relaxed">
            {[
              {
                title: "1. Acceptance of Terms",
                body: "By accessing and using LearnVeda (learnveda.in), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.",
              },
              {
                title: "2. Use of the Platform",
                body: "LearnVeda is an educational platform. You agree to use it solely for lawful educational purposes. You must not misuse the platform, attempt to hack, scrape, or abuse our services, or create fake accounts.",
              },
              {
                title: "3. User Accounts",
                body: "You are responsible for maintaining the security of your account credentials. You must notify us immediately of any unauthorized access. We reserve the right to suspend accounts that violate these terms.",
              },
              {
                title: "4. Intellectual Property",
                body: "All content on LearnVeda — text, simulations, code, designs, and media — is either owned by LearnVeda, our contributors, or used with permission. The platform codebase is MIT-licensed. Educational content may have separate usage terms.",
              },
              {
                title: "5. Community Standards",
                body: "You agree not to post harmful, abusive, misleading, or illegal content in the community. Spam, harassment, and academic dishonesty (sharing exam answers, cheating in battles) are grounds for immediate account suspension.",
              },
              {
                title: "6. Payments & Refunds",
                body: "Pro subscriptions are billed monthly or yearly. We offer a 7-day full refund for new subscriptions. Refund requests after 7 days are considered on a case-by-case basis. Contact billing@learnveda.in for payment issues.",
              },
              {
                title: "7. Disclaimer of Warranties",
                body: "LearnVeda is provided 'as is' without warranties of any kind. We strive for high availability but do not guarantee uninterrupted service. Content accuracy is our priority but NCERT/board guidelines take precedence.",
              },
              {
                title: "8. Limitation of Liability",
                body: "LearnVeda shall not be liable for indirect, incidental, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount you paid in the 12 months preceding the claim.",
              },
              {
                title: "9. Changes to Terms",
                body: "We may update these terms from time to time. We will notify registered users by email for significant changes. Continued use after changes constitutes acceptance of the new terms.",
              },
              {
                title: "10. Contact",
                body: "For questions about these terms, contact legal@learnveda.in.",
              },
            ].map(({ title, body }) => (
              <section key={title}>
                <h2 className="text-xl font-bold mb-3">{title}</h2>
                <p className="text-muted-foreground">{body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
