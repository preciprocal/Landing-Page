"use client";

/**
 * Footer.tsx, Social links show "Coming Soon" tooltip above on hover/click.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Free ATS Checker",   href: "/free-ats-checker" },
      { label: "Resume Tailoring",   href: "/resume-tailoring" },
      { label: "LinkedIn Optimizer", href: "/linkedin-profile-optimizer" },
      { label: "Cover Letters",      href: "/cover-letter-generator" },
      { label: "Pricing",            href: "/pricing" },
      { label: "Roadmap",            href: "/roadmap" },
    ],
  },
  {
    title: "Job Search",
    links: [
      { label: "Job Tracker",       href: "/job-application-tracker" },
      { label: "Contact Finder",    href: "/recruiter-contact-finder" },
      { label: "Cold Email Writer", href: "/cold-email-generator" },
      { label: "Chrome Extension",  href: "/chrome-extension" },
    ],
  },
  {
    title: "Interview Prep",
    links: [
      { label: "AI Mock Interview", href: "/ai-mock-interview" },
      { label: "Study Planner",     href: "/interview-study-planner" },
      { label: "Interview Debrief", href: "/interview-debrief" },
      { label: "All Roles",         href: "/interview-questions" },
      { label: "All Companies",     href: "/interview-prep" },
    ],
  },
  {
    // These three hubs each fan out to 41 role pages. Keep them linked here:
    // without an inbound internal link they are orphan pages, and Google
    // reported them as "Crawled - currently not indexed".
    title: "Resources",
    links: [
      { label: "Blog",                  href: "/blog" },
      { label: "Resume Tips",           href: "/resume-tips" },
      { label: "Salary Guide",          href: "/salary-guide" },
      { label: "Cover Letter Examples", href: "/cover-letter-examples" },
      { label: "FAQ",                   href: "/faq" },
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
  { label: "Twitter" },
  { label: "LinkedIn" },
  { label: "GitHub" },
];

function SocialLink({ label }: { label: string }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      style={{ overflow: "visible" }}
    >
      {/* Tooltip rendered above, pure CSS transition, no framer interference */}
      <span
        style={{
          position: "absolute",
          bottom: "calc(100% + 8px)",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          opacity: show ? 1 : 0,
          translate: show ? "0 0" : "0 4px",
          transition: "opacity 0.15s ease, translate 0.15s ease",
          zIndex: 50,
        }}
        className="rounded-md bg-slate-800 border border-white/10 px-2 py-0.5 text-[11px] text-slate-300 shadow-lg"
      >
        Coming soon
      </span>

      <button
        type="button"
        onClick={() => {
          setShow(true);
          setTimeout(() => setShow(false), 1800);
        }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="text-[13px] text-slate-600 hover:text-slate-300 transition-colors cursor-pointer select-none"
      >
        {label}
      </button>
    </div>
  );
}

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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12 mb-12"
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

        {/* Bottom bar, overflow visible so tooltips aren't clipped */}
        <div
          className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ overflow: "visible" }}
        >
          <p className="text-[13px] text-slate-600">
            &copy; {new Date().getFullYear()} Preciprocal. All rights reserved.
          </p>
          <div className="flex gap-5" style={{ overflow: "visible" }}>
            {socials.map((s) => (
              <SocialLink key={s.label} label={s.label} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}