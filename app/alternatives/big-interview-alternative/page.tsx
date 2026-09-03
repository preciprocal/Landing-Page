/**
 * app/alternatives/big-interview-alternative/page.tsx
 *
 * Comparison page targeting "Big Interview alternative" and related
 * buying-intent queries. Rendered by components/AlternativePage.tsx.
 *
 * Pricing quoted here was checked in September 2026 against public sources.
 * These figures move, so re-verify before editing rather than assuming.
 */

import type { Metadata } from "next";
import AlternativePage, { type ComparisonRow, type AlternativeFaq, type AlternativeReason } from "@/components/AlternativePage";

export const metadata: Metadata = {
  title: { absolute: "Big Interview Alternative: Preciprocal Compared" },
  description: "A Big Interview alternative with voice AI mock interviews, ATS resume scoring, cover letters and job tracking at $9.99/mo, against $39/mo or $299 lifetime.",
  keywords: ["Big Interview alternative","Big Interview vs Preciprocal","cheaper than Big Interview","mock interview platform alternative","AI mock interview tool","Big Interview pricing","interview prep alternative"],
  alternates: { canonical: "https://preciprocal.com/alternatives/big-interview-alternative" },
  openGraph: {
    title: "Big Interview Alternative: Preciprocal Compared (2026)",
    description: "A Big Interview alternative with voice AI mock interviews, ATS resume scoring, cover letters and job tracking at $9.99/mo, against $39/mo or $299 lifetime.",
    url: "https://preciprocal.com/alternatives/big-interview-alternative",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Interview Alternative | Preciprocal",
    description: "A Big Interview alternative with voice AI mock interviews, ATS resume scoring, cover letters and job tracking at $9.99/mo, against $39/mo or $299 life",
  },
};

const ROWS: ComparisonRow[] = [
    {
      "feature": "Mock interview format",
      "ours": "Voice, multi-agent panel with follow-ups",
      "theirs": "Recorded video practice"
    },
    {
      "feature": "Interview curriculum",
      "ours": "Study planner, no taught video course",
      "theirs": "Structured curriculum, a strength"
    },
    {
      "feature": "Answer frameworks",
      "ours": "STAR guidance plus scored feedback",
      "theirs": "STAR frameworks, well taught"
    },
    {
      "feature": "AI feedback on delivery",
      "ours": "Five-dimension scored debrief",
      "theirs": "AI feedback on delivery"
    },
    {
      "feature": "Interview debrief journal",
      "ours": "Structured capture plus patterns",
      "theirs": "Not included"
    },
    {
      "feature": "ATS resume scoring",
      "ours": "Score plus keyword gap per posting",
      "theirs": "AI resume feedback on some plans"
    },
    {
      "feature": "Cover letter generator",
      "ours": "Company-researched, unlimited on Pro",
      "theirs": "Not included"
    },
    {
      "feature": "Job tracker",
      "ours": "Kanban, stages, reminders",
      "theirs": "Not included"
    },
    {
      "feature": "Contact finder and outreach",
      "ours": "Verified emails plus drafted messages",
      "theirs": "Not included"
    },
    {
      "feature": "Company-specific prep",
      "ours": "56 employers, tailored mock questions",
      "theirs": "Role-based curriculum"
    },
    {
      "feature": "Free access",
      "ours": "Permanent free plan, 3 mocks/mo",
      "theirs": "Often free via schools and libraries"
    },
    {
      "feature": "Price",
      "ours": "$9.99/mo, or $7.49 billed annually",
      "theirs": "$39/mo, or $299 lifetime"
    },
    {
      "feature": "Student discount",
      "ours": "1 month Pro free with .edu email",
      "theirs": "Institutional licences"
    }
  ];

const REASONS: AlternativeReason[] = [
    {
      "title": "Check your university first",
      "body": "Big Interview is widely licensed to universities, colleges and public libraries. If your institution provides it, you get the full curriculum at no cost, and no comparison beats free. Ask your career centre before subscribing to anything, including us."
    },
    {
      "title": "Reps with follow-ups, rather than recorded answers",
      "body": "Big Interview's practice records you answering a prompt. Preciprocal's mocks are conversations: a multi-agent panel that asks follow-ups based on what you actually said, pushes back on weak reasoning, and produces a debrief scored across five dimensions. Both have value, but they train different things."
    },
    {
      "title": "Resume and applications included",
      "body": "Big Interview is an interview product. Preciprocal covers ATS resume scoring against specific postings, cover letter generation, application tracking, contact finding and outreach as well. If you would otherwise buy a resume tool separately, compare the combined cost."
    },
    {
      "title": "$9.99 monthly against $39 monthly",
      "body": "Big Interview's entry price is $39 for a month, with lifetime access at $299 as a one-time payment. Preciprocal Pro is $9.99 monthly or $7.49 billed annually. The lifetime option is worth considering if you expect to be interviewing on and off for years, since it has no recurring cost."
    }
  ];

const FAQS: AlternativeFaq[] = [
    {
      "q": "What is Big Interview?",
      "a": "Big Interview is an interview preparation platform combining a video curriculum, practice questions with recording, answer frameworks and AI feedback on delivery. It is designed for structured preparation and is widely licensed to universities and libraries."
    },
    {
      "q": "Is Big Interview free through my school?",
      "a": "Often, yes. It is one of the most commonly licensed career tools at universities, colleges and public libraries. Check with your career centre before paying, because institutional access gives you the full product at no cost."
    },
    {
      "q": "How is Preciprocal's mock interview different?",
      "a": "Format and interactivity. Big Interview records you answering a prompt and gives feedback on delivery. Preciprocal runs a voice conversation with a multi-agent panel that asks follow-up questions based on your answers and pushes back, which is closer to a real loop. It then scores you across five dimensions."
    },
    {
      "q": "How much does Big Interview cost?",
      "a": "Its entry price is $39 for a monthly subscription, with lifetime access available at $299 as a one-time payment. Preciprocal Pro is $9.99 monthly or $7.49 monthly billed annually."
    },
    {
      "q": "Which is better for a complete beginner?",
      "a": "Big Interview, arguably, if you have never interviewed and want to be taught the fundamentals in a structured order. Its curriculum is the strongest part of the product. Once you know the frameworks and need volume of realistic practice, Preciprocal's reps are the better fit."
    },
    {
      "q": "Does Big Interview help with my resume?",
      "a": "Some plans include AI resume feedback, but it is not the focus and there is no per-posting ATS scoring, no tracker and no cover letter tool. Those are the main gaps if you want one subscription covering the whole search."
    }
  ];

export default function BigInterviewAlternativePage() {
  return (
    <AlternativePage
      competitor="Big Interview"
      slug="big-interview-alternative"
      theirPlanLabel="Big Interview"
      theirPrice="$39/mo"
      theirPriceNote="Interview curriculum and practice"
      intro="Big Interview is a structured interview preparation platform built around a video curriculum, practice sessions with recording, and answer frameworks. Its curriculum is genuinely well organised, and it is frequently available free through university career centres and public libraries, which is worth checking before you pay for anything."
      positioning="Preciprocal offers voice-based mock interviews with a multi-agent panel alongside ATS resume scoring, cover letters, tracking and a study planner, at $9.99/mo."
      verdictTheirs="you want a structured taught curriculum rather than practice reps, you learn well from video lessons, or your school gives you access at no cost."
      verdictOurs="you want realistic interview reps with follow-up questions and scoring, plus resume and application tooling in the same subscription."
      rows={ROWS}
      reasons={REASONS}
      faqs={FAQS}
      pricingChecked="September 2026"
    />
  );
}
