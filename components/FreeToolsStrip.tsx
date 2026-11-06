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
 * Motion, after Aceternity's card hover effect and glowing border: a soft
 * panel slides between cards to follow the cursor (one shared layoutId), and
 * each card's border lights up as the cursor nears it. Cards stagger in on
 * scroll. All of it is off under prefers-reduced-motion.
 */

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { CalendarClock, FileCheck2, Mail, MessageSquareText } from "lucide-react";
import Chevron from "@/components/Chevron";
import { GlowingEffect } from "@/components/ui/GlowingEffect";

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
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="border-t border-white/[0.04] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-emerald-300">Free, no account needed</p>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            The job search is hard enough.
            <span className="block bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">Start with what is worrying you.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            The resume nobody answers, the interview you cannot predict, the OPT days you keep counting in your head. Pick one and get an answer in under a minute.
          </p>
        </div>

        <motion.div
          className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          onMouseLeave={() => setHovered(null)}
        >
          {TOOLS.map((t, i) => (
            <motion.div
              key={t.href}
              className="relative p-2"
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
              }}
              onMouseEnter={() => setHovered(i)}
            >
              {/* The panel that slides between cards. */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.span
                    aria-hidden="true"
                    layoutId="free-tools-hover"
                    className="absolute inset-0 block rounded-3xl border border-indigo-400/15 bg-gradient-to-b from-indigo-500/[0.18] to-purple-500/[0.08]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.18 } }}
                    exit={{ opacity: 0, transition: { duration: 0.18, delay: 0.15 } }}
                  />
                )}
              </AnimatePresence>

              <Link
                href={t.href}
                className="group relative flex h-full flex-col rounded-2xl border border-white/[0.07] bg-[#070b16] p-6 transition-colors duration-300 hover:border-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
              >
                <GlowingEffect spread={36} glow proximity={70} />

                <div className="relative mb-5 flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 text-indigo-200 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                    <t.Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  {t.tag && (
                    <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">{t.tag}</span>
                  )}
                </div>

                <p className="relative mb-1.5 text-[13px] font-medium text-indigo-200/80">{t.moment}</p>
                <p className="relative mb-2.5 text-lg font-semibold leading-snug text-white">{t.title}</p>
                <p className="relative mb-6 text-sm leading-relaxed text-slate-400">{t.body}</p>
                <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-indigo-300 transition-colors group-hover:text-indigo-200">
                    {t.cta} <Chevron />
                  </span>
                  <span className="whitespace-nowrap text-[11px] text-slate-500">{t.time}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="rounded-xl border border-white/[0.08] px-4 py-2 text-sm text-slate-400 transition-all hover:border-white/[0.15] hover:text-white"
            >
              {g.label}
            </Link>
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}
