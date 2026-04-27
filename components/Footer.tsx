"use client";

/**
 * Footer.tsx — Updated with About, Contact, Roadmap, Privacy, Terms links.
 * Drop this in to replace the existing components/Footer.tsx
 */

import { motion } from "framer-motion";
import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features",         href: "/#features" },
      { label: "Pricing",          href: "/#pricing" },
      { label: "Free ATS Checker", href: "/free-ats-checker" },
      { label: "Chrome Extension", href: "/#features" },
      { label: "Roadmap",          href: "/roadmap" },
    ],
  },
  {
    title: "Interview Prep",
    links: [
      { label: "All Roles",         href: "/interview-questions" },
      { label: "All Companies",     href: "/interview-prep" },
      { label: "Software Engineer", href: "/interview-questions/software-engineer" },
      { label: "Google Prep",       href: "/interview-prep/google" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog",     href: "/blog" },
      { label: "FAQ",      href: "/faq" },
      { label: "Roadmap",  href: "/roadmap" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",   href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Support", href: "mailto:support@preciprocal.com" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms",   href: "/terms" },
    ],
  },
];

const socials = [
  { label: "Twitter",  href: "https://twitter.com/preciprocal" },
  { label: "LinkedIn", href: "https://linkedin.com/company/preciprocal" },
  { label: "GitHub",   href: "https://github.com/preciprocal" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-10">
        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-12"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="Preciprocal" className="w-8 h-8 rounded-lg" />
              <span className="text-lg font-bold text-white">Preciprocal</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[260px]">
              The AI-powered job search operating system. Prepare smarter, apply
              faster, land offers.
            </p>
            <p className="text-[12px] text-slate-600 mt-4">
              Built by students, for students.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {col.title}
              </p>
              <div className="flex flex-col gap-3">
                {col.links.map((link) =>
                  link.href.startsWith("mailto") ? (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-slate-600">
            &copy; {new Date().getFullYear()} Preciprocal. All rights reserved.
          </p>
          <div className="flex gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-slate-600 hover:text-slate-200 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}