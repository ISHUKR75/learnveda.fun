/**
 * @file features/contact/components/ContactForm.tsx
 * @description Contact form and info section for the Contact page
 * Includes form validation, subject categories, and social links
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin, Phone, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";

/* ─── Contact Channels ───────────────────────────────────────────────────── */
const channels = [
  { icon: <Mail        className="h-5 w-5" />, label: "Email",    value: "support@learnveda.in", href: "mailto:support@learnveda.in", color: "text-blue-500 bg-blue-500/10"   },
  { icon: <Github      className="h-5 w-5" />, label: "GitHub",   value: "ISHUKR75/LearnVeda",   href: "https://github.com/ISHUKR75/LearnVeda", color: "text-gray-500 bg-gray-500/10" },
  { icon: <Twitter     className="h-5 w-5" />, label: "Twitter",  value: "@learnveda",            href: "https://twitter.com/learnveda", color: "text-cyan-500 bg-cyan-500/10"   },
  { icon: <MapPin      className="h-5 w-5" />, label: "Location", value: "India 🇮🇳",             href: null, color: "text-green-500 bg-green-500/10" },
];

/* ─── Contact Form Component ─────────────────────────────────────────────── */
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", category: "general", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Wire up to /api/contact endpoint which calls Resend/Nodemailer
    await new Promise((r) => setTimeout(r, 1200)); // Simulate API call
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">
            <MessageSquare className="h-3 w-3 mr-1" /> Contact
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Get in{" "}
            <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Have a question, suggestion, or want to partner with us? We read every message and reply within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">

          {/* Left: Channels info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            <h2 className="text-xl font-bold mb-6">Other Ways to Reach Us</h2>
            {channels.map((ch) => (
              <div key={ch.label} className="flex items-center gap-4 p-4 rounded-xl border bg-card">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${ch.color}`}>
                  {ch.icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{ch.label}</p>
                  {ch.href ? (
                    <a href={ch.href} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-medium hover:text-brand-500 transition-colors">
                      {ch.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{ch.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Response time note */}
            <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">⏱ Response Time</p>
              <p>We typically respond within <strong>24 hours</strong> on weekdays. For urgent issues, email directly.</p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              // Success state
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 rounded-2xl border bg-card p-10">
                <div className="text-5xl">✅</div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground">Thanks for reaching out. We&apos;ll reply to <strong>{formData.email}</strong> within 24 hours.</p>
                <Button variant="outline" onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", category: "general", message: "" }); }}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              // Contact form
              <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium" htmlFor="name">Full Name *</label>
                    <input
                      id="name" name="name" type="text" required
                      value={formData.name} onChange={handleChange}
                      placeholder="Rahul Sharma"
                      className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium" htmlFor="email">Email Address *</label>
                    <input
                      id="email" name="email" type="email" required
                      value={formData.email} onChange={handleChange}
                      placeholder="rahul@example.com"
                      className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" htmlFor="category">Category</label>
                  <select
                    id="category" name="category"
                    value={formData.category} onChange={handleChange}
                    className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="partnership">Partnership / Collaboration</option>
                    <option value="content">Content / Curriculum</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                  </select>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" htmlFor="subject">Subject *</label>
                  <input
                    id="subject" name="subject" type="text" required
                    value={formData.subject} onChange={handleChange}
                    placeholder="How can we help you?"
                    className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" htmlFor="message">Message *</label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={formData.message} onChange={handleChange}
                    placeholder="Tell us more about your question or feedback..."
                    className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <Button type="submit" variant="gradient" size="lg" className="w-full" loading={loading}>
                  {!loading && <Send className="h-4 w-4" />}
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
