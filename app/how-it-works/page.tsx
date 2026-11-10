/**
 * app/how-it-works/page.tsx
 *
 * The standalone "How it works" page the navbar links to (it used to jump to
 * a section on the homepage). It answers one question for a visitor on OPT:
 * what would my search look like if I used this?
 *
 * Flow: a centred hero, the full interactive walkthrough (the homepage demo,
 * Arjun's illustrative story), the four stages of a search with the tools
 * that do each one, where the free OPT tools fit, what the free plan covers
 * (read from lib/pricing.ts so it cannot drift), a short FAQ and the CTA.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, FileCheck2, KanbanSquare, Mic } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chevron from "@/components/Chevron";
import HeroProductDemo from "@/components/HeroProductDemo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";
import { TIERS, tierFeatureLines } from "@/lib/pricing";
import { PAD, INNER, SECTION, BTN_PRIMARY, BTN_SECONDARY, CtaPanel, FaqList, PageHero, SectionHead, pad2 } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";

export const metadata: Metadata = {
  title: { absolute: "How Preciprocal Works | Job Search Prep for F-1 Students on OPT" },
  description:
    "How Preciprocal works, start to finish: get your resume past the ATS, reach the right people, track every application, and practise interviews out loud before your OPT days run out.",
  keywords: [
    "how preciprocal works",
    "OPT job search",
    "F-1 student job search tool",
    "AI interview prep",
    "resume tailoring",
    "job application tracker",
  ],
  alternates: { canonical: "https://preciprocal.com/how-it-works" },
  openGraph: {
    title: "How Preciprocal Works",
    description: "One OPT job search, start to finish: resume, outreach, tracking and interview practice in one place.",
    url: "https://preciprocal.com/how-it-works",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v2.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Preciprocal Works",
    description: "One OPT job search, start to finish, in one place.",
  },
};

const STAGES = [
  {
    Icon: FileCheck2,
    title: "Get seen",
    problem: "Hundreds of applications, no replies.",
    body: "Score your resume the way an ATS and a recruiter read it, then tailor it to each posting with rewrites you can paste in.",
    tools: [
      { label: "Free ATS checker", href: "/free-ats-checker" },
      { label: "Resume tailoring", href: "/resume-tailoring" },
      { label: "LinkedIn optimizer", href: "/linkedin-profile-optimizer" },
    ],
  },
  {
    Icon: KanbanSquare,
    title: "Reach people and stay organised",
    problem: "Portals go quiet, and leads slip through.",
    body: "Write a cover letter for the role, find who is hiring and draft a short note to them, and keep every application on one board.",
    tools: [
      { label: "Cover letter generator", href: "/cover-letter-generator" },
      { label: "Recruiter contact finder", href: "/recruiter-contact-finder" },
      { label: "Job application tracker", href: "/job-application-tracker" },
    ],
  },
  {
    Icon: Mic,
    title: "Turn interviews into offers",
    problem: "You only get a few shots.",
    body: "See the questions you are likely to get, follow a prep plan built around your interview date, and practise out loud with an AI panel that asks follow-ups.",
    tools: [
      { label: "Question predictor", href: "/interview-question-predictor" },
      { label: "Study planner", href: "/interview-study-planner" },
      { label: "AI mock interview", href: "/ai-mock-interview" },
    ],
  },
  {
    Icon: CalendarClock,
    title: "Learn from every round",
    problem: "Rejections with no reason.",
    body: "Log how a real interview went and get a debrief on what to fix, so the next one goes better than the last.",
    tools: [
      { label: "Interview debrief", href: "/interview-debrief" },
      { label: "Thank you email", href: "/thank-you-email-after-interview" },
    ],
  },
];

const OPT_TOOLS = [
  { label: "OPT unemployment day calculator", body: "Count the days you have used against the 90 or 150 day limit.", href: "/opt/unemployment-calculator" },
  { label: "OPT and STEM OPT filing dates", body: "The window to file, worked out from your program or EAD end date.", href: "/opt/how-to-apply" },
  { label: "All OPT guides", body: "Rules, fees and dates, checked against USCIS and DHS sources.", href: "/opt" },
];

const FAQS = [
  {
    q: "Do I need to use every tool?",
    a: "No. Most people start with the one thing that is worrying them, usually the resume or an upcoming interview, and add the rest when they need it. Everything shares one account, so your resume and applications carry across.",
  },
  {
    q: "Is it built for international students?",
    a: "It works for anyone job hunting, but it is built around the situation of F-1 students on OPT: limited unemployment days, employers who may not sponsor, and the work authorisation question in interviews. The free OPT calculators and guides sit alongside the product.",
  },
  {
    q: "Is Preciprocal legal or immigration advice?",
    a: "No. The OPT tools count days and dates the way the published rules describe, but your school's DSO and, where needed, an immigration attorney are the people to confirm anything about your status.",
  },
  {
    q: "What does it cost?",
    a: "There is a free plan with no credit card. Paid plans add more of each tool. A .edu email can be verified for 1 month of Pro free. See the pricing page for the full breakdown.",
  },
];

export default function HowItWorksPage() {
  const free = TIERS.find((t) => t.id === "free");
  const freeLines = free ? tierFeatureLines(free) : [];

  return (
    <div data-accent="indigo" className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "How it works", url: "https://preciprocal.com/how-it-works" },
        ]}
      />
      <Navbar />

      <main className="relative overflow-hidden">
        <PageHero
          sectionProps={{ "aria-label": "How Preciprocal works" }}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "How it works" }]}
          badge="How it works"
          title="Start to finish, "
          accent="before the clock runs out"
          subhead={
            <p>
              On OPT, every week counts. Here is how Preciprocal takes you from a resume nobody answers to an interview you are ready
              for, in one place.
            </p>
          }
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full px-8 py-4 sm:w-auto`}>
              Start free <Chevron />
            </a>
            <a href="#walkthrough" className={`${BTN_SECONDARY} w-full py-4 sm:w-auto`}>
              Watch the walkthrough
            </a>
          </div>
        </PageHero>

        {/* The whole story, playable */}
        <section id="walkthrough" aria-label="Interactive walkthrough" className="scroll-mt-24 pt-6">
          <HeroProductDemo />
        </section>

        {/* The four stages */}
        <section aria-label="The stages of a search" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead
                align="center"
                className="mb-14"
                eyebrow="The flow"
                title="Four stages."
                accent="One place."
                subtitle="Each stage is a problem every OPT job seeker hits, and the tools that fix it."
              />
            </Reveal>

            <RevealGroup as="ol" className="grid gap-5 md:grid-cols-2">
              {STAGES.map((s, i) => (
                <RevealItem as="li" key={s.title} className="flex flex-col rounded-2xl border border-white/[0.07] bg-[#070b16] p-7 sm:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/20 bg-accent/10">
                      <s.Icon aria-hidden="true" className="h-5 w-5 text-accent-soft" strokeWidth={1.8} />
                    </span>
                    <span className="font-mono text-[12px] text-slate-500">{pad2(i + 1)}</span>
                  </div>
                  <p className="mb-1.5 text-[13px] font-medium text-accent-soft">{s.problem}</p>
                  <h3 className="mb-3 text-xl font-bold text-white sm:text-[22px]">{s.title}</h3>
                  <p className="mb-6 text-[15px] leading-relaxed text-slate-400">{s.body}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
                    {s.tools.map((t) => (
                      <li key={t.href}>
                        <Link
                          href={t.href}
                          className="inline-flex items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[13px] font-medium text-slate-300 transition-colors hover:border-white/[0.16] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                        >
                          {t.label} <Chevron className="text-slate-500" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Where OPT fits */}
        <section aria-label="Free OPT tools" className={`${SECTION} ${PAD}`}>
          <div className={`${INNER} grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16`}>
            <Reveal>
              <SectionHead
                className="mb-0"
                eyebrow="Alongside the product"
                title="Know your dates."
                accent="Free, no account."
                subtitle="The clock decides how hard you push. These tools work it out in your browser, and nothing you enter is sent anywhere."
              />
            </Reveal>
            <RevealGroup as="ul" className="divide-y divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-[#070b16]">
              {OPT_TOOLS.map((t) => (
                <RevealItem as="li" key={t.href}>
                  <Link href={t.href} className="group flex items-center justify-between gap-6 p-6 transition-colors hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/60">
                    <div>
                      <p className="font-semibold text-white">{t.label}</p>
                      <p className="mt-1 text-sm text-slate-400">{t.body}</p>
                    </div>
                    <Chevron className="shrink-0 text-slate-500 transition-colors group-hover:text-white" />
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* What the free plan covers */}
        <section aria-label="What is free" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead
                align="center"
                className="mb-10"
                eyebrow="Start free"
                title="Try every stage"
                accent="on the free plan."
                subtitle="No credit card. Each month the free plan includes:"
              />
            </Reveal>
            <Reveal>
              <ul className="mx-auto grid max-w-4xl gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {freeLines.map((line) => (
                  <li key={line} className="flex items-center gap-3 border-b border-white/[0.05] py-2.5 text-[15px] text-slate-300">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center">
                <Link href="/pricing" className="inline-flex items-center gap-1 text-sm font-semibold text-accent-soft transition-colors hover:text-white">
                  Compare all plans <Chevron />
                </Link>
              </p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Questions" className={`${SECTION} ${PAD}`}>
          <div className="mx-auto w-full max-w-4xl">
            <Reveal>
              <SectionHead align="center" className="mb-10" eyebrow="Questions" title="Before you start" />
            </Reveal>
            <FaqList items={FAQS} />
          </div>
        </section>

        <section aria-label="Get started" className={`pb-24 pt-4 ${PAD}`}>
          <Reveal>
            <CtaPanel
              title="Your clock is running. Make the days count."
              body={<p>Start with whatever is worrying you most. It is free, and it takes a minute.</p>}
              action={
                <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} py-4`}>
                  Start free <Chevron />
                </a>
              }
            />
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
