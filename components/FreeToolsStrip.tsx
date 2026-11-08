"use client";

/**
 * components/FreeToolsStrip.tsx
 *
 * Homepage section linking the free, no-account tools and the main guide
 * hubs. Two jobs: it gives a visitor who is not ready to sign up something to
 * do on the spot (the free tools are the softest way into the product), and it
 * gives the homepage contextual links into the site. Before this, every
 * internal link on the homepage was in the navbar or footer.
 *
 * Only tools that run on the page without signing up belong in TOOLS. The
 * ATS checker qualifies since it runs its preview in the page (the full
 * report needs an account).
 *
 * Layout: the homepage's 1200px column. On phones each tool is a compact row
 * (the worry, the action) so the four fit in about a screen; from sm up they
 * are full cards. Hover stays quiet: a brighter border and surface, no glows.
 * Cards fade up once on scroll, off under prefers-reduced-motion.
 */

import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import { CalendarClock, FileCheck2, Mail, MessageSquareText } from "lucide-react";
import Chevron from "@/components/Chevron";

/**
 * Each card opens on the moment a job seeker is in, then says what the tool
 * does about it. Keep every claim checkable: the timings come from the tools
 * themselves (ATS check about 30 seconds, predictor 10 to 20 seconds).
 */
const TOOLS = [
  {
    href: "/interview-question-predictor",
    moment: "Interview coming up?",
    title: "Know what they will ask",
    body: "Paste the job description and see the 5 questions you are most likely to get. Then say your answer out loud and get it scored.",
    cta: "Predict my questions",
    time: "20 seconds",
    tag: "New",
    Icon: MessageSquareText,
  },
  {
    href: "/free-ats-checker",
    moment: "Applying and hearing nothing back?",
    title: "See what the recruiter sees",
    body: "Get an honest score out of 100 for your resume and the 3 fixes that will move it most, with the rewrite to paste in.",
    cta: "Check my resume",
    time: "30 seconds",
    Icon: FileCheck2,
  },
  {
    href: "/opt/unemployment-calculator",
    moment: "Watching your OPT clock?",
    title: "Know exactly where you stand",
    body: "Count your unemployment days against the 90 or 150 day limit and see how many you have left, instead of guessing.",
    cta: "Count my days",
    time: "Instant",
    Icon: CalendarClock,
  },
  {
    href: "/thank-you-email-after-interview",
    moment: "Interview just ended?",
    title: "Follow up while they remember you",
    body: "A short, specific thank you email for any interview stage, so you are not staring at a blank draft tonight.",
    cta: "Write my email",
    time: "Under a minute",
    Icon: Mail,
  },
];

const GUIDES = [
  { href: "/interview-questions", label: "Interview questions by role" },
  { href: "/interview-prep", label: "Company interview guides" },
  { href: "/salary-guide", label: "Salary guides" },
  { href: "/resume-tips", label: "Resume tips by role" },
  { href: "/opt", label: "OPT guides for F-1 students" },
  { href: "/blog", label: "Career prep blog" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FreeToolsStrip() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="border-t border-white/[0.04] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="mb-10 text-center sm:mb-12">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-emerald-300">Free, no account needed</p>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              The job search is hard enough.
              <span className="block bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">Start with what is worrying you.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              The resume nobody answers, the interview you cannot predict, the OPT days you keep counting in your head. Pick one and get an answer in under a minute.
            </p>
          </div>

          <motion.ul
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          >
            {TOOLS.map((t) => (
              <motion.li
                key={t.href}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                }}
              >
                <Link
                  href={t.href}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#070b16] p-4 transition-colors duration-300 hover:border-white/[0.16] hover:bg-[#0a0f1d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 sm:flex-col sm:items-stretch sm:gap-0 sm:p-6"
                >
                  <div className="flex shrink-0 items-start justify-between sm:mb-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/[0.12] text-indigo-200">
                      <t.Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    {t.tag && (
                      <span className="hidden rounded-md bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300 sm:inline">{t.tag}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 sm:flex sm:flex-col">
                    <p className="text-[13px] font-medium text-indigo-200/80 sm:mb-1.5">{t.moment}</p>
                    <p className="text-[16px] font-semibold leading-snug text-white sm:mb-2.5 sm:text-lg">{t.title}</p>
                    <p className="hidden text-sm leading-relaxed text-slate-400 sm:mb-6 sm:block">{t.body}</p>
                    <div className="mt-auto hidden items-center justify-between gap-3 border-t border-white/[0.06] pt-4 sm:flex">
                      <span className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-indigo-300 transition-colors group-hover:text-indigo-200">
                        {t.cta} <Chevron />
                      </span>
                      <span className="whitespace-nowrap text-[11px] text-slate-500">{t.time}</span>
                    </div>
                  </div>

                  {/* Phones: the row ends in a chevron instead of the card footer. */}
                  <Chevron className="shrink-0 text-slate-500 transition-colors group-hover:text-white sm:hidden" />
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          <nav aria-label="Guides" className="mt-12 border-t border-white/[0.06] pt-8">
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Or start with a guide</p>
            <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {GUIDES.map((g) => (
                <li key={g.href} className="border-b border-white/[0.05]">
                  <Link
                    href={g.href}
                    className="group flex items-center justify-between gap-3 py-3 text-sm text-slate-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                  >
                    {g.label}
                    <Chevron className="text-slate-600 transition-colors group-hover:text-slate-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </MotionConfig>
  );
}
