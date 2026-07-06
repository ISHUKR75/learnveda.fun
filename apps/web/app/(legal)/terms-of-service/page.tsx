/**
 * @file app/(legal)/terms-of-service/page.tsx
 * @description Terms of Service page for LearnVeda
 * Route: /terms-of-service
 *
 * Covers:
 *  - Acceptance of terms
 *  - User accounts and responsibilities
 *  - Acceptable use policy
 *  - Intellectual property
 *  - Subscription and payments
 *  - Termination
 *  - Limitation of liability
 */

import type { Metadata } from "next";     // SEO metadata type
import { Navbar } from "@/components/navigation/navbar"; // Navigation
import { Footer } from "@/components/navigation/footer"; // Footer
import { FileText, Shield, CreditCard, Ban, Copyright, AlertTriangle, Users } from "lucide-react"; // Icons

/* ─── SEO Metadata ───────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Terms of Service — LearnVeda",
  description: "LearnVeda Terms of Service. By using our platform, you agree to these terms. Read about your rights, responsibilities, and our commitments to you.",
};

/* ─── Section Component ──────────────────────────────────────────────────── */
function TermsSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="pl-14 text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

/* ─── Terms of Service Page ──────────────────────────────────────────────── */
export default function TermsOfServicePage() {
  const lastUpdated = "January 1, 2025";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="border-b bg-muted/30 py-16">
          <div className="container max-w-4xl px-4 md:px-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-brand-500 text-white">
                <FileText className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Terms of Service</h1>
                <p className="text-muted-foreground mt-1">Last updated: {lastUpdated}</p>
              </div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              By accessing or using LearnVeda, you agree to be bound by these Terms of Service.
              Please read them carefully.
            </p>
          </div>
        </div>

        {/* ── Content ───────────────────────────────────────────────────── */}
        <div className="container max-w-4xl px-4 md:px-6 py-16">
          <TermsSection icon={Shield} title="Acceptance of Terms">
            <p>
              By creating an account on LearnVeda or using any of our services, you agree to these Terms
              of Service and our Privacy Policy. If you do not agree to these terms, please do not use the platform.
            </p>
            <p>
              If you are under 18, you must have your parent or guardian&apos;s permission to use LearnVeda.
              Parents are responsible for their children&apos;s use of the platform.
            </p>
          </TermsSection>

          <TermsSection icon={Users} title="User Accounts">
            <p>When you create an account, you are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Providing accurate and truthful information</li>
              <li>Maintaining the security of your account credentials</li>
              <li>All activity that occurs under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate accounts that violate these terms,
              engage in fraudulent activity, or harm other users.
            </p>
          </TermsSection>

          <TermsSection icon={Ban} title="Acceptable Use">
            <p>You agree NOT to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Share account credentials or access the platform on behalf of another person (unless you are a parent managing a child&apos;s account)</li>
              <li>Post harmful, offensive, or misleading content in the community section</li>
              <li>Attempt to hack, scrape, or otherwise compromise our systems</li>
              <li>Use automated tools to interact with the platform without permission</li>
              <li>Reproduce or distribute LearnVeda content without written permission</li>
              <li>Submit false information in quizzes, battles, or profiles</li>
              <li>Engage in academic dishonesty or assist others in cheating</li>
            </ul>
          </TermsSection>

          <TermsSection icon={Copyright} title="Intellectual Property">
            <p>
              All content on LearnVeda — including chapter content, simulations, illustrations,
              quizzes, and code examples — is owned by LearnVeda or our content partners and is
              protected by copyright law.
            </p>
            <p>
              You may access and use content for your personal, non-commercial learning only.
              You may not reproduce, distribute, or create derivative works without our written consent.
            </p>
            <p>
              When you submit content to our community section (posts, comments, questions),
              you retain ownership but grant us a worldwide, royalty-free licence to display
              and distribute it within the platform.
            </p>
          </TermsSection>

          <TermsSection icon={CreditCard} title="Subscriptions & Payments">
            <p>LearnVeda offers a Free plan and a Pro subscription:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Free plan</strong> — access to selected chapters, simulations, and community features at no cost, forever</li>
              <li><strong>Pro plan</strong> — full access to all content, AI tutor, and premium features via a monthly or yearly subscription</li>
            </ul>
            <p>
              Pro subscriptions are billed in advance. You may cancel at any time; your Pro access
              continues until the end of the current billing period. We do not offer refunds for
              partial subscription periods unless required by law.
            </p>
          </TermsSection>

          <TermsSection icon={AlertTriangle} title="Limitation of Liability">
            <p>
              LearnVeda is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that
              using our platform will result in any specific academic or career outcome.
            </p>
            <p>
              To the maximum extent permitted by law, LearnVeda&apos;s total liability for any claims
              arising from your use of the platform is limited to the amount you paid us in the
              twelve months prior to the claim.
            </p>
          </TermsSection>

          <TermsSection icon={FileText} title="Changes to Terms">
            <p>
              We may update these Terms from time to time. When we make material changes, we will
              notify you via email and display a notice on the platform at least 14 days before the
              changes take effect. Your continued use of LearnVeda after that date constitutes
              acceptance of the updated Terms.
            </p>
          </TermsSection>

          {/* Contact section */}
          <div className="mt-8 p-6 rounded-lg border bg-muted/50">
            <p className="text-sm text-muted-foreground">
              <strong>Questions about these Terms?</strong> Email us at{" "}
              <a href="mailto:legal@learnveda.in" className="text-brand-500 hover:underline">
                legal@learnveda.in
              </a>
              . These Terms were last updated on <strong>{lastUpdated}</strong>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
