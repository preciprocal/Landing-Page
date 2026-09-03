/**
 * app/alternatives/rezi-alternative/page.tsx
 *
 * Comparison page targeting "Rezi alternative" and related
 * buying-intent queries. Rendered by components/AlternativePage.tsx.
 *
 * Pricing quoted here was checked in September 2026 against public sources.
 * These figures move, so re-verify before editing rather than assuming.
 */

import type { Metadata } from "next";
import AlternativePage, { type ComparisonRow, type AlternativeFaq, type AlternativeReason } from "@/components/AlternativePage";

export const metadata: Metadata = {
  title: { absolute: "Rezi Alternative: Preciprocal vs Rezi" },
  description: "A Rezi alternative with ATS resume scoring, voice AI mock interviews, cover letters and job tracking at $9.99/mo, against Rezi Pro at $29/mo monthly.",
  keywords: ["Rezi alternative","Rezi vs Preciprocal","Rezi.ai alternative","cheaper than Rezi","Rezi for students","ATS resume builder alternative","Rezi pricing","Rezi Score"],
  alternates: { canonical: "https://preciprocal.com/alternatives/rezi-alternative" },
  openGraph: {
    title: "Rezi Alternative: Preciprocal Compared (2026)",
    description: "A Rezi alternative with ATS resume scoring, voice AI mock interviews, cover letters and job tracking at $9.99/mo, against Rezi Pro at $29/mo monthly.",
    url: "https://preciprocal.com/alternatives/rezi-alternative",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rezi Alternative | Preciprocal",
    description: "A Rezi alternative with ATS resume scoring, voice AI mock interviews, cover letters and job tracking at $9.99/mo, against Rezi Pro at $29/mo monthly.",
  },
};

const ROWS: ComparisonRow[] = [
    {
      "feature": "ATS resume scoring",
      "ours": "Score plus keyword gap per posting",
      "theirs": "Rezi Score, a core strength"
    },
    {
      "feature": "Keyword targeting",
      "ours": "Per-posting gap analysis",
      "theirs": "Core feature"
    },
    {
      "feature": "Resume editor",
      "ours": "Full editor, PDF and Word export",
      "theirs": "Strong, ATS-first"
    },
    {
      "feature": "AI mock interviews",
      "ours": "Voice, multi-agent panel, follow-ups",
      "theirs": "AI interviews included on Pro"
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
      "theirs": "Included"
    },
    {
      "feature": "Job tracker",
      "ours": "Kanban, stages, reminders",
      "theirs": "Not a focus"
    },
    {
      "feature": "Contact finder",
      "ours": "Verified emails for hiring managers",
      "theirs": "Not included"
    },
    {
      "feature": "Recruiter eye simulation",
      "ours": "Six-second scan heatmap",
      "theirs": "Not included"
    },
    {
      "feature": "Expert review",
      "ours": "Not offered",
      "theirs": "One monthly review on Pro"
    },
    {
      "feature": "Monthly price",
      "ours": "$9.99, or $7.49 billed annually",
      "theirs": "$29, or $19 billed quarterly"
    },
    {
      "feature": "Student discount",
      "ours": "1 month Pro free with .edu email",
      "theirs": "None published"
    }
  ];

const REASONS: AlternativeReason[] = [
    {
      "title": "Voice practice with a panel, not a text exchange",
      "body": "Rezi includes AI interviews on Pro, so this is a difference of depth rather than presence. Preciprocal's mocks are voice-based with a multi-agent panel, an HR screener, a technical lead and a hiring manager, that asks follow-ups and pushes back, then scores across five dimensions and produces a debrief."
    },
    {
      "title": "$9.99 against $29 monthly",
      "body": "Rezi Pro is $29 monthly or $19 monthly billed quarterly. Preciprocal Pro is $9.99 monthly or $7.49 billed annually. Over a six-month search that is roughly $174 at Rezi's monthly rate against $60 at Preciprocal's."
    },
    {
      "title": "Analysis beyond the score",
      "body": "Both tools give you an ATS score to optimise. Preciprocal adds the recruiter eye simulation showing where a human's attention actually lands in the first six seconds, and candidate benchmarking that estimates how you compare against the applicant pool for that role."
    },
    {
      "title": "The pipeline after the resume",
      "body": "Rezi's centre of gravity is the document. Preciprocal carries through to tracking applications, finding the right person to contact, drafting the outreach, planning your interview prep and capturing debriefs afterwards. Whether that breadth is worth it depends on whether you would otherwise pay for separate tools."
    }
  ];

const FAQS: AlternativeFaq[] = [
    {
      "q": "What is Rezi?",
      "a": "Rezi is an AI resume builder built specifically around ATS optimisation. Its central feature is the Rezi Score, which grades your resume against ATS criteria, alongside keyword targeting against job descriptions. The Pro plan also includes AI interviews and a monthly expert review."
    },
    {
      "q": "Is the Rezi Score better than Preciprocal's ATS score?",
      "a": "Both measure similar things: keyword match, formatting, structure and completeness. Rezi has iterated on its score for longer as its primary feature. Preciprocal packages more analysis around the score, including the recruiter attention heatmap and benchmarking against other applicants."
    },
    {
      "q": "Why do people look for a Rezi alternative?",
      "a": "Price is the usual reason, since $29 monthly is substantial for a student, and the quarterly plan at $19 monthly still requires committing upfront. Scope is the other, for people who want tracking and outreach rather than another document tool."
    },
    {
      "q": "Does Rezi have mock interviews?",
      "a": "Yes, AI interviews are included on Rezi Pro, so this is not a straightforward missing feature. The difference is in format and depth: Preciprocal's are voice-based with a multi-agent panel and a scored debrief that feeds into a study plan."
    },
    {
      "q": "One thing Rezi has that Preciprocal does not?",
      "a": "A monthly expert review on the Pro plan, where a human looks at your resume. Preciprocal does not offer human review at any tier. If that specific service matters to you, it is a genuine point in Rezi's favour."
    },
    {
      "q": "Can I try both free?",
      "a": "Preciprocal's free plan is permanent and needs no card: 5 resume analyses, 3 mock interviews and a 10-job tracker each month. Rezi has a free tier with limits on downloads and features. Running the same resume through both is the fastest way to decide."
    }
  ];

export default function ReziAlternativePage() {
  return (
    <AlternativePage
      competitor="Rezi"
      slug="rezi-alternative"
      theirPlanLabel="Rezi Pro"
      theirPrice="$29/mo"
      theirPriceNote="ATS-focused resume builder"
      intro="Rezi is built specifically around ATS optimisation, and the Rezi Score with its keyword targeting is a focused, well-executed take on that problem. Unlike design-led builders it treats machine readability as the primary goal, which is the right instinct. It also includes AI interviews on the Pro plan."
      positioning="Preciprocal covers the same ATS ground and adds voice mock interviews with a multi-agent panel, a study planner, debrief journal and application tracking, at $9.99/mo against Rezi Pro at $29/mo monthly."
      verdictTheirs="you want a tool narrowly focused on ATS resume optimisation with a clear score to optimise against, and the monthly price is acceptable."
      verdictOurs="you want ATS scoring plus deeper interview practice, tracking and outreach at roughly a third of the monthly cost."
      rows={ROWS}
      reasons={REASONS}
      faqs={FAQS}
      pricingChecked="September 2026"
    />
  );
}
