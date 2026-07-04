/**
 * @file app/(legal)/privacy-policy/page.tsx
 * @description Privacy Policy page for LearnVeda
 * Route: /privacy-policy
 * Full legal privacy policy explaining data collection, usage, and user rights
 */

import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";

export const metadata: Metadata = {
  title:       "Privacy Policy — LearnVeda",
  description: "LearnVeda Privacy Policy. Learn how we collect, use, and protect your personal information.",
  robots:      { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "July 4, 2025"; // Last policy update date

  return (
    <>
      <Navbar />
      <main className="py-16 md:py-24">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight mb-3">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm">Last updated: {lastUpdated}</p>
          </div>

          {/* Policy content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed">

            <section>
              <h2 className="text-xl font-bold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to LearnVeda (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at learnveda.in and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-3">We collect information you provide directly to us:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li><strong>Account Information:</strong> Name, email address, password (hashed), and profile details when you register.</li>
                <li><strong>Learning Data:</strong> Course progress, quiz scores, practice results, XP earned, and badges unlocked.</li>
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on content, and interaction patterns.</li>
                <li><strong>Device Information:</strong> IP address, browser type, device type, and operating system.</li>
                <li><strong>Communications:</strong> Messages you send us via the contact form or email.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>To provide, operate, and maintain the LearnVeda platform.</li>
                <li>To personalize your learning experience and show relevant content.</li>
                <li>To track your progress and provide accurate analytics on your dashboard.</li>
                <li>To send important account and service notifications.</li>
                <li>To respond to your support requests and inquiries.</li>
                <li>To improve our platform based on aggregated usage analytics.</li>
                <li>To prevent fraud, abuse, and security threats.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">4. Data We Do NOT Collect or Sell</h2>
              <p className="text-muted-foreground">
                We <strong>never</strong> sell your personal data to third parties. We do not display advertisements. We do not track you across other websites. We do not share your individual data with educational institutions, employers, or marketers without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">5. Data Storage & Security</h2>
              <p className="text-muted-foreground">
                Your data is stored on secure servers with AES-256 encryption at rest and TLS 1.3 encryption in transit. Passwords are hashed using Argon2 — we never store plain-text passwords. We conduct regular security audits and follow OWASP security best practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">6. Third-Party Services</h2>
              <p className="text-muted-foreground mb-3">We use the following trusted third-party services:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li><strong>Clerk:</strong> Authentication and user management.</li>
                <li><strong>MongoDB Atlas:</strong> Primary database, hosted securely.</li>
                <li><strong>Cloudinary:</strong> Image and video storage.</li>
                <li><strong>Resend:</strong> Transactional email delivery.</li>
                <li><strong>Sentry:</strong> Error tracking and monitoring (anonymized).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">7. Children&apos;s Privacy</h2>
              <p className="text-muted-foreground">
                LearnVeda serves students including minors. We do not knowingly collect sensitive personal information from children under 13 without parental consent. Parents can request account deletion or data export for their child by emailing privacy@learnveda.in.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">8. Your Rights</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li><strong>Access:</strong> Request a copy of all data we hold about you.</li>
                <li><strong>Correction:</strong> Update or correct inaccurate data.</li>
                <li><strong>Deletion:</strong> Request deletion of your account and all associated data.</li>
                <li><strong>Export:</strong> Download your learning data in a portable format.</li>
                <li><strong>Objection:</strong> Opt out of any analytics or communications.</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                To exercise any of these rights, email privacy@learnveda.in.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">9. Cookies</h2>
              <p className="text-muted-foreground">
                We use only essential cookies (session management, authentication) and analytics cookies (anonymized, opt-out available). We do not use advertising or tracking cookies. You can manage cookie preferences from our cookie consent banner.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">10. Contact Us</h2>
              <p className="text-muted-foreground">
                For any privacy-related questions or requests, contact us at:<br />
                <strong>Email:</strong> privacy@learnveda.in<br />
                <strong>GitHub:</strong> <a href="https://github.com/ISHUKR75/LearnVeda" className="text-brand-500 hover:underline">github.com/ISHUKR75/LearnVeda</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
