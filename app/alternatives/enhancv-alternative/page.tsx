/**
 * app/alternatives/enhancv-alternative/page.tsx
 *
 * Comparison page targeting "Enhancv alternative" and related
 * buying-intent queries. Rendered by components/AlternativePage.tsx.
 *
 * Pricing quoted here was checked in September 2026 against public sources.
 * These figures move, so re-verify before editing rather than assuming.
 */

import type { Metadata } from "next";
import AlternativePage, { type ComparisonRow, type AlternativeFaq, type AlternativeReason } from "@/components/AlternativePage";

export const metadata: Metadata = {
  title: { absolute: "Enhancv Alternative: Preciprocal vs Enhancv" },
  description: "An Enhancv alternative that adds AI mock interviews, job tracking and per-posting ATS scoring to resume building, at $9.99/mo against Enhancv Pro at $14.99/mo.",
  keywords: ["Enhancv alternative","Enhancv vs Preciprocal","cheaper than Enhancv","Enhancv for students","resume builder alternative","Enhancv pricing","ATS resume checker alternative"],
  alternates: { canonical: "https://preciprocal.com/alternatives/enhancv-alternative" },
  openGraph: {
    title: "Enhancv Alternative: Preciprocal Compared (2026)",
    description: "An Enhancv alternative that adds AI mock interviews, job tracking and per-posting ATS scoring to resume building, at $9.99/mo against Enhancv Pro at $14.99/mo.",
    url: "https://preciprocal.com/alternatives/enhancv-alternative",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enhancv Alternative | Preciprocal",
    description: "An Enhancv alternative that adds AI mock interviews, job tracking and per-posting ATS scoring to resume building, at $9.99/mo against Enhancv Pro at $",
  },
};

const ROWS: ComparisonRow[] = [
    {
      "feature": "Resume design quality",
      "ours": "Clean ATS-first templates",
      "theirs": "Excellent, a core strength"
    },
    {
      "feature": "Resume content feedback",
      "ours": "Bullet-level rewrites you approve",
      "theirs": "Strong content checks"
    },
    {
      "feature": "ATS scoring per posting",
      "ours": "Score plus keyword gap per job",
      "theirs": "General resume checker"
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
      "theirs": "Included"
    },
    {
      "feature": "Job tracker",
      "ours": "Kanban, stages, reminders",
      "theirs": "Not included"
    },
    {
      "feature": "Chrome extension",
      "ours": "One-click job save",
      "theirs": "Not a focus"
    },
    {
      "feature": "Recruiter eye simulation",
      "ours": "Six-second scan heatmap",
      "theirs": "Not included"
    },
    {
      "feature": "Entry point",
      "ours": "Permanent free plan, no card",
      "theirs": "7-day full-access trial"
    },
    {
      "feature": "Monthly price",
      "ours": "$9.99, or $7.49 billed annually",
      "theirs": "$14.99, or $10.99 on longer plans"
    },
    {
      "feature": "Student discount",
      "ours": "1 month Pro free with .edu email",
      "theirs": "None published"
    }
  ];

const REASONS: AlternativeReason[] = [
    {
      "title": "Scoring against the posting, not just the document",
      "body": "Enhancv's checker evaluates your resume on its own terms: structure, wording, quantification. Preciprocal scores it against a specific job description and reports the exact keywords that posting uses which your resume lacks. Those are different questions, and the second one is what determines whether you clear the automated screen."
    },
    {
      "title": "The interview is the harder half",
      "body": "Once the resume works, the constraint moves to the interview. Preciprocal includes voice mock interviews with a panel that asks follow-ups and scores across five dimensions, a study planner built to your interview date, and a debrief journal. Enhancv does not cover any of that."
    },
    {
      "title": "$9.99 against $14.99, with more included",
      "body": "Enhancv Pro is $14.99 monthly, or $10.99 monthly on quarterly and semi-annual plans. Preciprocal Pro is $9.99 monthly or $7.49 annually, and includes the interview and tracking tools. Note that Enhancv's entry point is a seven-day trial rather than a permanent free tier."
    },
    {
      "title": "A free tier rather than a trial",
      "body": "Enhancv gives seven days of full access. Preciprocal's free plan is permanent: 5 resume analyses, 3 mock interviews, 5 cover letters and a 10-job tracker every month, with no card required. For a search that runs months rather than days, that difference compounds."
    }
  ];

const FAQS: AlternativeFaq[] = [
    {
      "q": "What is Enhancv?",
      "a": "Enhancv is a resume builder with a strong emphasis on design and content quality, plus a free resume checker. It is well regarded for producing distinctive-looking resumes and for feedback that addresses what your bullets say rather than only how the document is formatted."
    },
    {
      "q": "Is Enhancv's resume checker any good?",
      "a": "Yes, it is a genuine tool rather than a lead capture device, and its content-level feedback is useful. The limitation is that it evaluates your resume in isolation. It will not tell you which keywords a particular posting uses that you are missing, which is what ATS matching actually turns on."
    },
    {
      "q": "How much does Enhancv cost compared to Preciprocal?",
      "a": "Enhancv Pro is $14.99 monthly, dropping to about $10.99 monthly on quarterly or semi-annual billing. Preciprocal Pro is $9.99 monthly or $7.49 monthly billed annually. Enhancv's free entry is a seven-day trial; Preciprocal's free tier is permanent."
    },
    {
      "q": "Does Enhancv have mock interviews?",
      "a": "No. Enhancv is focused on the resume. Interview preparation is the main functional difference between the two tools."
    },
    {
      "q": "Which produces a better-looking resume?",
      "a": "Enhancv, fairly clearly. If visual distinctiveness is your priority it is the stronger choice. The trade-off worth understanding is that more visually complex layouts carry more ATS parsing risk, so test whatever you produce against the posting you are applying to."
    },
    {
      "q": "Can I use Enhancv for the resume and Preciprocal for everything else?",
      "a": "You can, and it is a reasonable combination if you value Enhancv's design. Preciprocal accepts uploads in PDF and Word, so you can build there and score and tailor here."
    }
  ];

export default function EnhancvAlternativePage() {
  return (
    <AlternativePage
      competitor="Enhancv"
      slug="enhancv-alternative"
      theirPlanLabel="Enhancv Pro"
      theirPrice="$14.99/mo"
      theirPriceNote="Resume builder and checker"
      intro="Enhancv produces some of the best-looking resumes of any builder, and its content checks go beyond formatting into whether your bullets actually say anything. Its resume checker is a real tool rather than a lead magnet, and the seven-day full-access trial lets you evaluate it properly."
      positioning="Preciprocal covers ATS scoring and resume work and adds voice mock interviews, a study planner, cover letters and application tracking, at $9.99/mo against Enhancv Pro at $14.99/mo."
      verdictTheirs="resume quality and design are your priority, you want detailed content feedback on the document itself, and you have interview prep covered."
      verdictOurs="you want per-posting ATS scoring plus interview practice and tracking in one subscription at a lower monthly price."
      rows={ROWS}
      reasons={REASONS}
      faqs={FAQS}
      pricingChecked="September 2026"
    />
  );
}
