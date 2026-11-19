/**
 * app/roadmap/page.tsx
 * Fully self-contained. No separate component needed.
 *
 * Layout (accent amber): PageHero with the live counts on its right, then a
 * short flow: what is being built now, what is planned next (each an open
 * list under a centred head), the shipped changelog folded into one panel,
 * then the feature idea CTA. Status is always written out in text.
 */

import Link from "next/link";
import { Rocket } from "lucide-react";
import { APP_URL } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExploreLinks from "@/components/page/ExploreLinks";
import Chevron from "@/components/Chevron";
import { BODY, BTN_PRIMARY, BTN_SECONDARY, CtaPanel, Eyebrow, Fold, H2, H3, INNER, PAD, PILL, PageHero, SECTION, pad2 } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";
import type { RoadmapItem, RoadmapStatus } from "@/components/page/RoadmapTimeline";

/** The open lanes, in reading order. Shipped items go in the changelog fold. */
const LANES: { status: RoadmapStatus; label: string; title: string }[] = [
  { status: "in-progress", label: "In progress", title: "Being built right now" },
  { status: "planned", label: "Planned", title: "Coming next" },
];

/** One roadmap entry: its tag and date, then the title and description. */
function ItemBody({ item }: { item: RoadmapItem }) {
  return (
    <>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {item.tag && (
          <span className={`${PILL} border-white/[0.08] text-slate-300`}>
            {item.tag}
          </span>
        )}
        {item.date && <span className="font-mono text-[11px] text-slate-400">{item.date}</span>}
      </div>
      <h3 className={`mb-1.5 ${H3}`}>{item.title}</h3>
      <p className={BODY}>{item.description}</p>
    </>
  );
}

const ITEMS: RoadmapItem[] = [
  {
    title: "Resume ATS Scorer",
    description:
      "Upload your resume + job description and get an ATS compatibility score with keyword gaps and fix suggestions.",
    status: "shipped",
    date: "Oct 2024",
    tag: "Resume",
  },
  {
    title: "AI Mock Interviews (voice)",
    description:
      "Voice interview panel with an HR interviewer and a technical lead, follow-up questions and a full debrief.",
    status: "shipped",
    date: "Nov 2024",
    tag: "Interviews",
  },
  {
    title: "Cover Letter Generator",
    description:
      "Role-specific, tone-matched cover letters generated from your resume and the job description. 10 a month on Pro.",
    status: "shipped",
    date: "Nov 2024",
    tag: "Cover Letters",
  },
  {
    title: "Recruiter Eye Simulation",
    description:
      "An AI simulation of how an HR screener, technical lead, and hiring manager read your resume, with an attention heatmap.",
    status: "shipped",
    date: "Dec 2024",
    tag: "Resume",
  },
  {
    title: "Job Tracker",
    description:
      "Kanban-style tracker for all your applications with status, notes, contacts, and follow-up reminders.",
    status: "shipped",
    date: "Dec 2024",
    tag: "Productivity",
  },
  {
    title: "Chrome Extension",
    description:
      "Save jobs from any job board in one click, with the full description imported into your tracker.",
    status: "shipped",
    date: "Jan 2025",
    tag: "Extensions",
  },
  {
    title: "Study Planner",
    description:
      "AI-generated study plan tailored to your target role, company, and timeline. Adapts as you complete tasks.",
    status: "shipped",
    date: "Jan 2025",
    tag: "Planning",
  },
  {
    title: "Interview Debrief Journal",
    description:
      "Log real interviews, rate your performance across dimensions, and get AI-generated notes on what to improve for next time.",
    status: "shipped",
    date: "Feb 2025",
    tag: "Interviews",
  },
  {
    title: "LinkedIn Optimiser",
    description:
      "Score and rewrite your LinkedIn headline, summary, and experience sections for recruiter search visibility.",
    status: "shipped",
    date: "Feb 2025",
    tag: "LinkedIn",
  },
  {
    title: "Resume Benchmarking",
    description:
      "See how your resume compares against anonymised candidates applying for the same role category.",
    status: "shipped",
    date: "Mar 2025",
    tag: "Resume",
  },
  {
    title: "Cold Outreach Generator",
    description:
      "Generate personalised cold emails and LinkedIn messages to recruiters and hiring managers, tailored to their company and role.",
    status: "shipped",
    date: "Apr 2025",
    tag: "Outreach",
  },
  {
    title: "Contact Finder",
    description:
      "Find the name and email of the hiring manager or recruiter at a target company. Built for respectful, targeted outreach.",
    status: "shipped",
    date: "Apr 2025",
    tag: "Outreach",
  },
  {
    title: "Live Job Checks",
    description:
      "Jobs come from employers' own boards and are under 30 days old. Talent-pool listings are left out, the role is checked as still open before you apply, and warnings the posting states, such as no sponsorship, are shown.",
    status: "shipped",
    tag: "Jobs",
  },
  {
    title: "Market Pay",
    description:
      "Pay for a job title in your city from US Bureau of Labor Statistics wage data, so you never anchor too low on a posting with no salary.",
    status: "shipped",
    tag: "Salary",
  },
  {
    title: "Application ghosting tracker",
    description:
      "Flags applications that have gone silent and tells you when to follow up and when to move on.",
    status: "planned",
    tag: "Job Tracker",
  },
  {
    title: "AI screening interview simulator",
    description:
      "Practise for one-way video screening interviews, with questions predicted from the role.",
    status: "planned",
    tag: "Interviews",
  },
  {
    title: "Career pivot planner",
    description:
      "A skills gap analysis and a step-by-step plan for switching roles or industries, with resume positioning to match.",
    status: "planned",
    tag: "New Tool",
  },
  {
    title: "Mobile app (iOS & Android)",
    description:
      "Native mobile app for on-the-go mock interview practice, job tracking, and study sessions.",
    status: "planned",
    tag: "Platform",
  },
  {
    title: "Company-specific interview prep packs",
    description:
      "Question banks, values frameworks and interview formats for more target companies.",
    status: "planned",
    tag: "Interviews",
  },
  {
    title: "Salary negotiation coach",
    description:
      "AI role-play to practise negotiating an offer.",
    status: "planned",
    tag: "New Tool",
  },
  {
    title: "Referral program",
    description:
      "Invite a friend who signs up for Pro, you both get a free month. Built for students sharing with classmates.",
    status: "planned",
    tag: "Product",
  },
];

export default function RoadmapPage() {
  const shippedCount    = ITEMS.filter((i) => i.status === "shipped").length;
  const inProgressCount = ITEMS.filter((i) => i.status === "in-progress").length;
  const plannedCount    = ITEMS.filter((i) => i.status === "planned").length;

  const counts = [
    { value: shippedCount, label: "Shipped", dot: "bg-emerald-400" },
    { value: inProgressCount, label: "In progress", dot: "bg-accent" },
    { value: plannedCount, label: "Planned", dot: "border-2 border-slate-500" },
  ];

  return (
    <div data-accent="amber" className="min-h-screen bg-[#050810]">
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Hero */}
        <PageHero
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Roadmap" }]}
          badge={
            <>
              <Rocket aria-hidden="true" className="h-3 w-3" />
              Updated as we ship
            </>
          }
          title={"Roadmap & "}
          accent="Changelog"
          subhead={
            <p>
              What&apos;s live, what&apos;s being built and what&apos;s next.
            </p>
          }
          aside={
            /* Live counts, on the right of the title on wide screens */
            <dl className="grid w-full grid-cols-3 text-left lg:w-[520px] divide-x divide-white/[0.07] overflow-hidden rounded-xl border border-white/[0.07] surface-card">
              {counts.map((c) => (
                <div key={c.label} className="flex flex-col-reverse gap-1 px-4 py-4 sm:px-6">
                  <dt className="flex items-center gap-2 text-[13px] font-medium text-slate-400">
                    <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${c.dot}`} />
                    {c.label}
                  </dt>
                  <dd className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">{c.value}</dd>
                </div>
              ))}
            </dl>
          }
        />

        {/* In progress, then planned: what a visitor here wants to know first */}
        {LANES.map((lane) => {
          const entries = ITEMS.filter((i) => i.status === lane.status);
          return (
            <section key={lane.status} aria-labelledby={`lane-${lane.status}`} className={`${SECTION} ${PAD}`}>
              <div className={INNER}>
                <Reveal className="mx-auto mb-12 max-w-2xl text-center">
                  <Eyebrow>
                    {lane.label} · {pad2(entries.length)}
                  </Eyebrow>
                  <h2 id={`lane-${lane.status}`} className={H2}>
                    {lane.title}
                  </h2>
                </Reveal>
                <RevealGroup as="ol" className={`grid gap-x-10 gap-y-10 sm:grid-cols-2 ${entries.length > 2 ? "lg:grid-cols-3" : ""}`}>
                  {entries.map((item) => (
                    <RevealItem as="li" key={item.title} className="border-t border-white/[0.08] pt-6">
                      <ItemBody item={item} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </section>
          );
        })}

        {/* Shipped: the changelog, folded */}
        <section aria-label="Changelog" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Fold eyebrow={`Shipped · ${pad2(shippedCount)}`} title="Changelog: everything already live" meta="Newest last, with the month each one shipped.">
              <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {ITEMS.filter((i) => i.status === "shipped").map((item) => (
                  <li key={item.title} className="border-t border-white/[0.08] pt-5">
                    <ItemBody item={item} />
                  </li>
                ))}
              </ol>
            </Fold>
          </div>
        </section>

        {/* Suggest a feature */}
        <section className={`pb-20 pt-4 ${PAD}`}>
          <Reveal>
            <CtaPanel
              title="Have a feature idea?"
              trust={false}
              body={
                <p>
                  Tell us what you want built; requests shape this roadmap.
                </p>
              }
              action={
                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <a href="mailto:support@preciprocal.com?subject=Feature Idea: " className={BTN_SECONDARY}>
                    Suggest a feature
                  </a>
                  <Link href={`${APP_URL}/sign-up`} className={BTN_PRIMARY}>
                    Try what&apos;s live now <Chevron />
                  </Link>
                </div>
              }
            />
          </Reveal>
        </section>
        <ExploreLinks current="/roadmap" className="pb-20" />
      </main>

      <Footer />
    </div>
  );
}
