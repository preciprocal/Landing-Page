"use client";

/**
 * app/privacy/page.tsx
 * Fully self-contained Privacy Policy page. No separate component needed.
 */

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RevealOnScroll, FloatingDots } from "@/components/LandingAnimations";

const SECTIONS = [
  {
    title: "What data we collect",
    content: `When you sign up, we collect your email address and the name you provide. When you use Preciprocal's tools, we store the content you input — such as resume text, job descriptions, cover letters, and interview recordings — so the tools can function and you can access your history.

We also collect standard usage analytics (pages visited, features used, session duration) to understand how the product is used and where to improve it. We do not sell this data.`,
  },
  {
    title: "How we use your data",
    content: `Your resume, cover letters, and interview content are used to power the AI tools you explicitly invoke. They are not used to train AI models without your explicit opt-in consent.

We use your email to send account-related communications (receipts, password resets, important product updates). We may also send product announcements and tips — you can unsubscribe from these at any time with one click.`,
  },
  {
    title: "Data storage and security",
    content: `All data is stored in encrypted databases hosted on infrastructure that meets industry security standards. Resume data and interview recordings are stored securely and access-controlled — only you can see your own data.

We use HTTPS for all data in transit. Passwords are hashed and never stored in plain text.`,
  },
  {
    title: "Third-party services",
    content: `Preciprocal uses a small number of trusted third-party services to operate: Stripe for payment processing (we never see or store your full card number), an AI provider for powering our tools (data is processed per their API terms and is not retained by them for training), and standard analytics tools.

We do not use advertising networks and do not share your data with advertisers.`,
  },
  {
    title: "Your rights",
    content: `You can request a copy of all data we hold about you, request deletion of your account and all associated data, or correct any inaccurate information at any time by emailing support@preciprocal.com.

If you are in the EU or UK, you have additional rights under GDPR including the right to data portability and the right to lodge a complaint with a supervisory authority. If you are in California, you have rights under CCPA including the right to know what personal information is collected and the right to opt out of its sale (we don't sell it, but the right exists).`,
  },
  {
    title: "Cookies",
    content: `We use essential cookies to keep you logged in and remember your preferences. We use analytics cookies to understand how the product is used — these can be declined in our cookie banner without affecting core functionality.

We do not use advertising or tracking cookies.`,
  },
  {
    title: "Changes to this policy",
    content: `If we make material changes to this policy, we will notify you by email at least 14 days before the changes take effect. The date at the top of this page reflects the most recent update.`,
  },
  {
    title: "Contact",
    content: `Questions about this policy? Email us at support@preciprocal.com. We'll respond within 24 hours on weekdays.`,
  },
];

export default function PrivacyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-slate-500 text-base">
                Plain English. No legalese. Last updated January 2025.
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