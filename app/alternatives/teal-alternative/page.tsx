/**
 * app/alternatives/teal-alternative/page.tsx
 *
 * Comparison page targeting "Teal alternative" and related
 * buying-intent queries. Rendered by components/AlternativePage.tsx.
 *
 * Pricing quoted here was checked in September 2026 against public sources.
 * These figures move, so re-verify before editing rather than assuming.
 */

import type { Metadata } from "next";
import AlternativePage, { type ComparisonRow, type AlternativeFaq, type AlternativeReason } from "@/components/AlternativePage";

export const metadata: Metadata = {
  title: { absolute: "Teal Alternative 2026: Preciprocal vs Teal" },
  description: "Looking for a Teal alternative? Preciprocal covers resume ATS scoring, AI mock interviews, cover letters and job tracking at $9.99/mo, against Teal+ at $29/mo with no interview prep.",
  keywords: ["Teal alternative","Teal vs Preciprocal","TealHQ alternative","Teal resume builder alternative","cheaper than Teal","Teal for students","job tracker alternative","Teal+ pricing"],
  alternates: { canonical: "https://preciprocal.com/alternatives/teal-alternative" },
  openGraph: {
    title: "Teal Alternative: Preciprocal Compared (2026)",
    description: "Looking for a Teal alternative? Preciprocal covers resume ATS scoring, AI mock interviews, cover letters and job tracking at $9.99/mo, against Teal+ at $29/mo with no interview prep.",
    url: "https://preciprocal.com/alternatives/teal-alternative",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teal Alternative | Preciprocal",
    description: "Looking for a Teal alternative? Preciprocal covers resume ATS scoring, AI mock interviews, cover letters and job tracking at $9.99/mo, against Teal+ a",
  },
};

const ROWS: ComparisonRow[] = [
    {
      "feature": "ATS resume scoring",
      "ours": "Full scoring plus keyword gap analysis",
      "theirs": "Resume match score per posting"
    },
    {
      "feature": "Resume editor",
      "ours": "Full editor, PDF and Word export",
      "theirs": "Strong editor, well designed"
    },
    {
      "feature": "Job tracker",
      "ours": "Kanban, stages, follow-up reminders",
      "theirs": "Core feature, very good"
    },
    {
      "feature": "Chrome extension",
      "ours": "One-click save with full description",
      "theirs": "Core feature, very good"
    },
    {
      "feature": "AI mock interviews",
      "ours": "Voice, multi-agent panel, 30/mo on Pro",
      "theirs": "Not included"
    },
    {
      "feature": "Interview study planner",
      "ours": "Day-by-day plan built to your date",
      "theirs": "Not included"
    },
    {
      "feature": "Interview debrief journal",
      "ours": "Structured capture plus pattern analysis",
      "theirs": "Not included"
    },
    {
      "feature": "Cover letter generator",
      "ours": "Company-researched, unlimited on Pro",
      "theirs": "Unlimited on Teal+"
    },
    {
      "feature": "LinkedIn optimisation",
      "ours": "Full profile rewrite on Premium",
      "theirs": "Not a focus"
    },
    {
      "feature": "Recruiter eye simulation",
      "ours": "Six-second scan heatmap",
      "theirs": "Not included"
    },
    {
      "feature": "Free plan",
      "ours": "5 analyses, 3 mocks, 10 tracked jobs",
      "theirs": "Genuinely usable free tier"
    },
    {
      "feature": "Monthly price",
      "ours": "$9.99, or $7.49 billed annually",
      "theirs": "$29, or $79 per quarter"
    },
    {
      "feature": "Student discount",
      "ours": "1 month Pro free with .edu email",
      "theirs": "None"
    }
  ];

const REASONS: AlternativeReason[] = [
    {
      "title": "Interview prep is the gap, and it is the harder problem",
      "body": "Teal gets your application submitted. But the application is not where most candidates lose; the interview is. Preciprocal runs voice-based mock interviews with a multi-agent panel that asks follow-ups, then scores you across five dimensions and feeds the weak areas into a study plan."
    },
    {
      "title": "$29 against $9.99, and no weekly plan trap",
      "body": "Teal+ is $29 monthly, $79 quarterly, or $13 weekly. The weekly option looks cheap but works out near $56 a month if you stay subscribed through a real search. Preciprocal Pro is $9.99 monthly or $7.49 billed annually, with no weekly tier."
    },
    {
      "title": "Built for the entry-level resume specifically",
      "body": "Teal's matching works well when you have a substantial work history to match against. Preciprocal is calibrated for new grads, where the raw material is internships, coursework and projects, and the problem is presenting those against a job description that asks for three years of experience."
    },
    {
      "title": "A student discount that exists",
      "body": "A .edu email gets you a month of Preciprocal Pro free. Teal has no student plan, which is a notable omission for a tool whose audience skews early-career."
    }
  ];

const FAQS: AlternativeFaq[] = [
    {
      "q": "What is Teal?",
      "a": "Teal is a job search platform built around a resume builder, a job tracker and a Chrome extension that saves postings as you browse. It scores your resume against individual job descriptions and helps you tailor for each application. It is well designed and its free tier is more generous than most, which is a large part of why it is popular."
    },
    {
      "q": "Why do people look for a Teal alternative?",
      "a": "Two reasons dominate. Price, since Teal+ at $29/mo is significant for a student running a search over several months. And scope, because Teal covers everything up to submitting the application but nothing after it, so you end up paying separately for interview preparation."
    },
    {
      "q": "Is Teal's resume builder better than Preciprocal's?",
      "a": "Teal's editing experience is excellent and arguably more polished. Where Preciprocal differs is analysis depth: the recruiter eye simulation showing where attention actually lands, candidate benchmarking against the applicant pool, and interview intelligence derived from the posting. If your priority is purely the editing interface, Teal is strong."
    },
    {
      "q": "How much does Teal cost compared to Preciprocal?",
      "a": "Teal+ is $29 monthly, $79 quarterly, or $13 weekly. Preciprocal Pro is $9.99 monthly or $7.49 monthly billed annually. Over a six-month search that is roughly $174 against $60. Both have free tiers worth trying first."
    },
    {
      "q": "Does Teal have mock interviews?",
      "a": "No. Teal does not include interview practice. This is the main functional gap between the two tools, and it matters because interview performance is where most qualified candidates actually get filtered out rather than at the resume stage."
    },
    {
      "q": "Can I use both?",
      "a": "Yes, and some people do, using Teal's extension and tracker alongside Preciprocal for interview preparation. If you would rather not pay for two subscriptions, Preciprocal covers tracking and the extension as well, though Teal's tracker is more mature."
    }
  ];

export default function TealAlternativePage() {
  return (
    <AlternativePage
      competitor="Teal"
      slug="teal-alternative"
      theirPlanLabel="Teal+"
      theirPrice="$29/mo"
      theirPriceNote="Resume builder and tracker"
      intro="Teal is one of the better-designed job search tools available. The Chrome extension, the job tracker and the resume-to-posting matching are genuinely well built, and the free tier is usable rather than a teaser. Where it stops is interview preparation: Teal will help you get the application in, then leaves you on your own for everything after."
      positioning="Preciprocal covers the same resume and tracking ground and adds voice-based mock interviews, a study planner and interview debriefs, at $9.99/mo against Teal+ at $29/mo."
      verdictTheirs="you want the best-in-class resume editing and tracking experience, are comfortable at $29/mo, and already have interview prep handled elsewhere."
      verdictOurs="you want resume scoring plus mock interviews, cover letters and a study planner in one place, and the price difference over a six-month search matters to you."
      rows={ROWS}
      reasons={REASONS}
      faqs={FAQS}
      pricingChecked="September 2026"
    />
  );
}
