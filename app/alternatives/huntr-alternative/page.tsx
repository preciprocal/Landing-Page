/**
 * app/alternatives/huntr-alternative/page.tsx
 *
 * Comparison page targeting "Huntr alternative" and related
 * buying-intent queries. Rendered by components/AlternativePage.tsx.
 *
 * Pricing quoted here was checked in September 2026 against public sources.
 * These figures move, so re-verify before editing rather than assuming.
 */

import type { Metadata } from "next";
import AlternativePage, { type ComparisonRow, type AlternativeFaq, type AlternativeReason } from "@/components/AlternativePage";

export const metadata: Metadata = {
  title: { absolute: "Huntr Alternative: Preciprocal vs Huntr" },
  description: "A Huntr alternative with job tracking, ATS resume scoring, AI mock interviews and cover letters at $9.99/mo, against Huntr Pro at $40/mo monthly.",
  keywords: ["Huntr alternative","Huntr vs Preciprocal","cheaper than Huntr","job application tracker alternative","Huntr pricing","Huntr for students","free job tracker"],
  alternates: { canonical: "https://preciprocal.com/alternatives/huntr-alternative" },
  openGraph: {
    title: "Huntr Alternative: Preciprocal Compared (2026)",
    description: "A Huntr alternative with job tracking, ATS resume scoring, AI mock interviews and cover letters at $9.99/mo, against Huntr Pro at $40/mo monthly.",
    url: "https://preciprocal.com/alternatives/huntr-alternative",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Huntr Alternative | Preciprocal",
    description: "A Huntr alternative with job tracking, ATS resume scoring, AI mock interviews and cover letters at $9.99/mo, against Huntr Pro at $40/mo monthly.",
  },
};

const ROWS: ComparisonRow[] = [
    {
      "feature": "Job tracker",
      "ours": "Kanban, stages, follow-up reminders",
      "theirs": "Core strength, very mature"
    },
    {
      "feature": "Free tracking limit",
      "ours": "10 jobs on the free plan",
      "theirs": "100 jobs, unusually generous"
    },
    {
      "feature": "ATS resume scoring",
      "ours": "Score plus keyword gap per posting",
      "theirs": "Advanced resume scoring on Pro"
    },
    {
      "feature": "Resume tailoring",
      "ours": "Bullet-level rewrites you approve",
      "theirs": "AI job-tailored resumes on Pro"
    },
    {
      "feature": "AI mock interviews",
      "ours": "Voice, multi-agent panel, 30/mo on Pro",
      "theirs": "Not included"
    },
    {
      "feature": "Interview study planner",
      "ours": "Day-by-day plan to your date",
      "theirs": "Not included"
    },
    {
      "feature": "Interview debrief journal",
      "ours": "Structured capture plus patterns",
      "theirs": "Not included"
    },
    {
      "feature": "Cover letter generator",
      "ours": "Company-researched, unlimited on Pro",
      "theirs": "Unlimited on Pro"
    },
    {
      "feature": "Contact finder",
      "ours": "Verified emails for hiring managers",
      "theirs": "Not included"
    },
    {
      "feature": "Cold outreach generator",
      "ours": "Drafted and personalised",
      "theirs": "Not included"
    },
    {
      "feature": "Chrome extension",
      "ours": "One-click job save",
      "theirs": "Included"
    },
    {
      "feature": "Monthly price",
      "ours": "$9.99, or $7.49 billed annually",
      "theirs": "$40, or about $27 on 6-month billing"
    },
    {
      "feature": "Student discount",
      "ours": "1 month Pro free with .edu email",
      "theirs": "None published"
    }
  ];

const REASONS: AlternativeReason[] = [
    {
      "title": "Use their free plan if tracking is all you need",
      "body": "Worth saying directly: if you only want to track applications, Huntr's free tier handles 100 jobs and unlimited resumes and you should just use it. The comparison only becomes interesting once you are considering Pro at $40 a month, or once you need interview preparation."
    },
    {
      "title": "$40 against $9.99 for the paid tiers",
      "body": "Huntr Pro is $40 monthly, $90 quarterly or $160 for six months, which works out to roughly $27 monthly at the longest commitment. Preciprocal Pro is $9.99 monthly or $7.49 billed annually, and includes mock interviews, a study planner and outreach tools."
    },
    {
      "title": "Interview preparation is absent",
      "body": "Huntr's AI features centre on resumes and cover letters. There is no interview practice, no study planning and no debrief capture. Since interview performance is where most qualified candidates actually get cut, that is the significant gap."
    },
    {
      "title": "Outreach as well as tracking",
      "body": "Tracking tells you what you have applied to. In a market where few roles are posted publicly and the hiring rate is low, the higher-leverage action is reaching a human directly. Preciprocal includes a contact finder that verifies addresses and an outreach generator that drafts the message."
    }
  ];

const FAQS: AlternativeFaq[] = [
    {
      "q": "What is Huntr?",
      "a": "Huntr is a job search platform built around application tracking, with a board-based interface for moving applications through stages. It has since added AI resume and cover letter tools. Its free plan covers unlimited resumes and tracking for up to 100 jobs."
    },
    {
      "q": "Is Huntr's free plan good enough?",
      "a": "For tracking alone, yes, and we would say so plainly. 100 tracked jobs and unlimited resumes at no cost covers most searches. The reason to look elsewhere is either needing interview preparation, or reaching the point of paying $40 a month for Pro."
    },
    {
      "q": "Why do people look for a Huntr alternative?",
      "a": "Almost always the Pro price. At $40 monthly it is among the more expensive tools in this category, and the jump from a generous free tier to that price is steep. The absence of interview preparation is the other common reason."
    },
    {
      "q": "Is Huntr's tracker better than Preciprocal's?",
      "a": "Huntr's tracker is more mature and its free limit is much higher at 100 jobs against 10. If tracking is the centre of what you need, Huntr does it well. Preciprocal's tracker is built to feed the rest of the pipeline, connecting each application to the resume version you sent and the contacts you spoke to."
    },
    {
      "q": "Does Huntr include interview practice?",
      "a": "No. Huntr's AI features are focused on resumes and cover letters. There is no mock interview, study planning or debrief functionality."
    },
    {
      "q": "Can I use both?",
      "a": "Yes, and it is a sensible combination: Huntr's free tier for tracking and Preciprocal for resume scoring and interview preparation. That costs $9.99 a month in total rather than $40."
    }
  ];

export default function HuntrAlternativePage() {
  return (
    <AlternativePage
      competitor="Huntr"
      slug="huntr-alternative"
      theirPlanLabel="Huntr Pro"
      theirPrice="$40/mo"
      theirPriceNote="Job tracker and AI resume tools"
      intro="Huntr began as a job tracker and it is still the thing it does best. The board-based tracking is mature, and the free plan is unusually generous: unlimited resumes and tracking for up to 100 jobs, which covers a substantial search on its own without paying anything."
      positioning="Preciprocal covers tracking alongside ATS resume scoring, voice mock interviews, cover letters and outreach at $9.99/mo, against Huntr Pro at $40/mo monthly."
      verdictTheirs="the free plan covers what you need, since 100 tracked jobs and unlimited resumes at no cost is a genuinely strong offer and hard to argue against."
      verdictOurs="you need interview preparation alongside tracking, or you were about to pay for Huntr Pro and want more scope for a quarter of the monthly price."
      rows={ROWS}
      reasons={REASONS}
      faqs={FAQS}
      pricingChecked="September 2026"
    />
  );
}
