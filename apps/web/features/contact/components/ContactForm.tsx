/**
 * @file features/contact/components/ContactForm.tsx
 * @description Contact form and info for the Contact page
 *
 * Contains:
 *  - Contact form (name, email, subject, message) with validation
 *  - Direct contact info (email, social)
 *  - FAQ quick links
 *
 * Form submission calls POST /api/email (Resend) in production,
 * and logs to console in demo mode.
 */

"use client"; // Client component — form state and submission

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, CheckCircle2, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button"; // Reusable button component
import { Input }  from "@/components/ui/input";  // Reusable input component

/* ─── Form State Types ───────────────────────────────────────────────────── */
type FormData = {
  name:    string; // Sender's full name
  email:   string; // Sender's email address
  subject: string; // Message subject / topic
  message: string; // Full message body
};

type FormStatus = "idle" | "submitting" | "success" | "error"; // Submission states

/* ─── Contact Info Items ─────────────────────────────────────────────────── */
const CONTACT_INFO = [
  { icon: Mail,          label: "Email",   value: "hello@learnveda.in", href: "mailto:hello@learnveda.in" },
  { icon: Github,        label: "GitHub",  value: "github.com/ISHUKR75", href: "https://github.com/ISHUKR75/LearnVeda" },
  { icon: Twitter,       label: "Twitter", value: "@learnveda", href: "https://twitter.com/learnveda" },
];

/* ─── ContactForm Component ──────────────────────────────────────────────── */
export function ContactForm() {
  // Form field values
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle"); // Current submission status

  /* ── Handle input changes ─────────────────────────────────────────────── */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value })); // Update field by name
  };

  /* ── Handle form submission ───────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();        // Prevent default browser form submit
    setStatus("submitting");   // Show loading state

    try {
      // Send to our email API route
      const res = await fetch("/api/email", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          type:    "contact",               // Email type
          to:      "hello@learnveda.in",    // Contact inbox
          name:    form.name,
          subject: `Contact: ${form.subject}`,
          message: `From: ${form.name} <${form.email}>\n\n${form.message}`,
        }),
      });

      if (res.ok) {
        setStatus("success");             // Show success message
        setForm({ name: "", email: "", subject: "", message: "" }); // Reset form
      } else {
        setStatus("error");               // Show error message
      }
    } catch {
      setStatus("error");                 // Network error — show error message
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Contact Us</h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Have a question, suggestion, or want to partner with us? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* ── Contact Form ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border bg-card p-8 shadow-sm"
          >
            {status === "success" ? (
              // Success state — show confirmation message
              <div className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setStatus("idle")} // Allow sending another message
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              // Form state
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-brand-500" />
                  Send a Message
                </h2>

                {/* Name and email row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Arjun Sharma"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="arjun@gmail.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="e.g. Question about Class 10 Mathematics"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  />
                </div>

                {/* Error message */}
                {status === "error" && (
                  <p className="text-sm text-red-500">
                    Something went wrong. Please try emailing us directly at hello@learnveda.in
                  </p>
                )}

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>Sending…</>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* ── Contact Info Panel ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border bg-card p-8 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-6">Get in Touch</h2>
              <div className="space-y-4">
                {CONTACT_INFO.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border hover:border-brand-500/50 hover:bg-brand-500/5 transition-colors group"
                  >
                    <div className="p-2.5 rounded-lg bg-brand-500/10 text-brand-500">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{info.label}</p>
                      <p className="text-sm font-medium text-foreground group-hover:text-brand-500 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Response time note */}
            <div className="rounded-2xl border bg-muted/30 p-6">
              <h3 className="font-semibold text-foreground mb-2">⚡ Quick Response</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We typically respond within <strong>24 hours</strong> on weekdays.
                For urgent technical issues, email{" "}
                <a href="mailto:support@learnveda.in" className="text-brand-500 hover:underline">
                  support@learnveda.in
                </a>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
