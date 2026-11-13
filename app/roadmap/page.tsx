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
import { APP_URL } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chevron from "@/components/Chevron";
import { PAD, INNER, SECTION, BTN_PRIMARY, BTN_SECONDARY, Eyebrow, Fold, PageHero, CtaPanel, pad2 } from "@/components/page/Layout";
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
          <span className="rounded-full border border-white/[0.08] px-2 py-0.5 text-[10px] font-semibold text-slate-300">
            {item.tag}
          </span>
        )}
        {item.date && <span className="font-mono text-[11px] text-slate-400">{item.date}</span>}
      </div>
      <h3 className="mb-1.5 text-[16px] font-bold text-white">{item.title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
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
      "Role-specific, tone-matched cover letters generated from your resume and the job description. 30 a month on Pro.",
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
      "Save jobs from LinkedIn and any job board with one click, auto-import job descriptions, and track applications without leaving the page.",
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
    title: "Ghost Job Detector",
    description:
      "Before you spend an hour applying, know if the job is real. We cross-reference posting age, company hiring patterns, LinkedIn headcount changes, and recruiter activity to flag roles that are likely expired, fake, or already filled internally. Now you'll know before you apply.",
    status: "in-progress",
    tag: "New Tool",
  },
  {
    title: "Salary Intelligence",
    description:
      "See real, role-specific compensation ranges before you apply or negotiate. Pulls from live market data across levels, cities, and company sizes. No more going into an offer blind or anchoring too low because the job posting left the salary blank.",
    status: "in-progress",
    tag: "New Tool",
  },
  {
    title: "Application ghosting tracker",
    description:
      "Automatically flags applications that have gone silent past the expected response window for that company, based on their known hiring pace. Tells you when to follow up, when to move on, and when a role has likely been filled so you stop waiting on jobs that are already gone.",
    status: "planned",
    tag: "Job Tracker",
  },
  {
    title: "AI screening interview simulator",
    description:
      "Practice against the actual AI screening tools companies use, including HireVue-style video interviews with question prediction based on the role. Most candidates have never practiced for it.",
    status: "planned",
    tag: "Interviews",
  },
  {
    title: "Career pivot planner",
    description:
      "Switching industries or roles? Get a skills gap analysis between where you are and where you want to go, a step-by-step transition plan with realistic timelines, and resume positioning advice that makes your unrelated experience look like an asset instead of a liability.",
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
      "Curated question banks, values frameworks, and interview formats for specific target companies, expanded beyond the current 50+.",
    status: "planned",
    tag: "Interviews",
  },
  {
    title: "Salary negotiation coach",
    description:
      "AI role-play to practice negotiating an offer. Includes real comp data by role and market.",
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
              Everything we&apos;ve shipped, what&apos;s being built right now, and what&apos;s
              coming next. No vaporware. If it&apos;s here, it&apos;s real.
            </p>
          }
          aside={
            /* Live counts, on the right of the title on wide screens */
            <dl className="grid w-full grid-cols-3 text-left lg:w-[520px] divide-x divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">
              {counts.map((c) => (
                <div key={c.label} className="flex flex-col-reverse gap-1 px-4 py-4 sm:px-6">
                  <dt className="flex items-center gap-2 text-[12px] font-medium text-slate-400">
                    <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${c.dot}`} />
                    {c.label}
                  </dt>
                  <dd className="text-2xl font-extrabold text-white sm:text-3xl">{c.value}</dd>
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
                  <h2 id={`lane-${lane.status}`} className="text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-[2.25rem]">
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
        <section className={`pb-24 pt-4 ${PAD}`}>
          <Reveal>
            <CtaPanel
              title="Have a feature idea?"
              trust={false}
              body={
                <p>
                  Every item on this roadmap started as a user request. If you want
                  something built, tell us. We actually listen.
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
      </main>

      <Footer />
    </div>
  );
}
