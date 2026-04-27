"use client";

/**
 * app/terms/page.tsx
 * Fully self-contained Terms of Service page. No separate component needed.
 */

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RevealOnScroll, FloatingDots } from "@/components/LandingAnimations";

const SECTIONS = [
  {
    title: "Accepting these terms",
    content: `By creating an account or using Preciprocal, you agree to these terms. If you don't agree, please don't use the service. These terms apply to all users — free and paid.`,
  },
  {
    title: "What Preciprocal provides",
    content: `Preciprocal is an AI-powered job search platform including resume analysis, mock interview tools, cover letter generation, study planning, job tracking, and related features. We provide these tools on an "as is" basis and work hard to keep them reliable, but we do not guarantee that the service will be uninterrupted or error-free at all times.

Using Preciprocal does not guarantee you will receive a job offer. The tools are designed to improve your preparation — outcomes depend on many factors outside our control.`,
  },
  {
    title: "Your account",
    content: `You're responsible for keeping your login credentials secure. Don't share your account with others. If you notice unauthorized access, contact us immediately at support@preciprocal.com.

You must be at least 13 years old to use Preciprocal. If you are under 18, you should have permission from a parent or guardian.`,
  },
  {
    title: "What you can and can't do",
    content: `You may use Preciprocal for your own personal job search and career preparation. You may not: scrape or bulk-download data from the platform, resell or redistribute access to Preciprocal's tools, use the platform to build competing products, or attempt to reverse-engineer our AI models.

You retain ownership of all content you upload — your resume, cover letters, and any other personal documents are yours. By uploading them, you grant us a limited license to process them to provide the service you requested.`,
  },
  {
    title: "Payments and refunds",
    content: `Paid plans are billed monthly or annually as chosen at signup. You can cancel at any time — your access continues until the end of the current billing period and you won't be charged again.

We offer a 30-day money-back guarantee. If you're not satisfied within 30 days of your first payment, email support@preciprocal.com for a full refund, no questions asked.`,
  },
  {
    title: "Termination",
    content: `You can delete your account at any time from Settings. We may suspend or terminate accounts that violate these terms or engage in fraudulent activity.

If we terminate your account for reasons other than a violation, we'll refund any prepaid subscription fees on a pro-rata basis.`,
  },
  {
    title: "Limitation of liability",
    content: `To the extent permitted by law, Preciprocal's liability for any claim arising from use of the service is limited to the amount you paid us in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.`,
  },
  {
    title: "Changes to these terms",
    content: `We'll notify you by email at least 14 days before any material changes to these terms take effect. Continued use after the effective date constitutes acceptance of the new terms.`,
  },
  {
    title: "Contact",
    content: `Questions about these terms? Email support@preciprocal.com.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050810]">
      <Navbar />

      <main className="relative overflow-hidden">
        <FloatingDots count={15} />

        {/* ── Header ── */}
        <section className="relative pt-32 pb-12 px-6">
          <div className="max-w-3xl mx-auto">
            <RevealOnScroll>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                Terms of Service
              </h1>
              <p className="text-slate-500 text-base">
                Plain English. We tried to make this actually readable. Last updated January 2025.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* ── Sections ── */}
        <section className="relative pb-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-10">
              {SECTIONS.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                    <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </h2>
                  <div className="text-slate-400 text-sm leading-[1.85] whitespace-pre-line pl-9">
                    {section.content}
                  </div>
                  {i < SECTIONS.length - 1 && (
                    <div className="mt-10 h-px bg-white/[0.04]" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Contact footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16 p-6 rounded-xl border border-white/[0.06] bg-[#0a0f1e]/80 text-center"
            >
              <p className="text-slate-400 text-sm">
                Questions? Email us at{" "}
                <a
                  href="mailto:support@preciprocal.com"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  support@preciprocal.com
                </a>{" "}
                — we reply within 24 hours on weekdays.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}