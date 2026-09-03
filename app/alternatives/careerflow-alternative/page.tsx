/**
 * app/alternatives/careerflow-alternative/page.tsx
 *
 * Comparison page targeting "Careerflow alternative" and related
 * buying-intent queries. Rendered by components/AlternativePage.tsx.
 *
 * Pricing quoted here was checked in September 2026 against public sources.
 * These figures move, so re-verify before editing rather than assuming.
 */

import type { Metadata } from "next";
import AlternativePage, { type ComparisonRow, type AlternativeFaq, type AlternativeReason } from "@/components/AlternativePage";

export const metadata: Metadata = {
  title: { absolute: "Careerflow Alternative: Preciprocal vs Careerflow" },
  description: "A Careerflow alternative with LinkedIn optimisation, ATS resume scoring, AI mock interviews and job tracking at $9.99/mo, against Careerflow Premium at $23.99/mo.",
  keywords: ["Careerflow alternative","Careerflow vs Preciprocal","Careerflow.ai alternative","LinkedIn optimizer alternative","cheaper than Careerflow","Careerflow for students","LinkedIn optimization tool"],
  alternates: { canonical: "https://preciprocal.com/alternatives/careerflow-alternative" },
  openGraph: {
    title: "Careerflow Alternative: Preciprocal Compared (2026)",
    description: "A Careerflow alternative with LinkedIn optimisation, ATS resume scoring, AI mock interviews and job tracking at $9.99/mo, against Careerflow Premium at $23.99/mo.",
    url: "https://preciprocal.com/alternatives/careerflow-alternative",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careerflow Alternative | Preciprocal",
    description: "A Careerflow alternative with LinkedIn optimisation, ATS resume scoring, AI mock interviews and job tracking at $9.99/mo, against Careerflow Premium a",
  },
};

const ROWS: ComparisonRow[] = [
    {
      "feature": "LinkedIn optimisation",
      "ours": "Section scoring plus full rewrite on Premium",
      "theirs": "Core strength, well developed"
    },
    {
      "feature": "ATS resume scoring",
      "ours": "Scoring plus keyword gap analysis",
      "theirs": "ATS score and keyword analyser"
    },
    {
      "feature": "AI mock interviews",
      "ours": "Voice panel, 30/mo on Pro at $9.99",
      "theirs": "On Premium Plus, above Premium"
    },
    {
      "feature": "Cover letter generator",
      "ours": "Company-researched, unlimited on Pro",
      "theirs": "Unlimited on Premium"
    },
    {
      "feature": "Interview study planner",
      "ours": "Day-by-day plan built to your date",
      "theirs": "Not included"
    },
    {
      "feature": "Interview debrief journal",
      "ours": "Structured capture plus patterns",
      "theirs": "Interview analysis on Premium Plus"
    },
    {
      "feature": "Job tracker",
      "ours": "Kanban, stages, follow-up reminders",
      "theirs": "Included"
    },
    {
      "feature": "Chrome extension",
      "ours": "One-click save with full description",
      "theirs": "Included"
    },
    {
      "feature": "Recruiter eye simulation",
      "ours": "Six-second scan heatmap",
      "theirs": "Not included"
    },
    {
      "feature": "Candidate benchmarking",
      "ours": "Ranking against the applicant pool",
      "theirs": "Not included"
    },
    {
      "feature": "Free plan",
      "ours": "5 analyses, 3 mocks, 10 tracked jobs",
      "theirs": "Free basic plan available"
    },
    {
      "feature": "Monthly price",
      "ours": "$9.99, or $7.49 billed annually",
      "theirs": "$23.99, or $14.41 billed annually"
    },
    {
      "feature": "Student discount",
      "ours": "1 month Pro free with .edu email",
      "theirs": "None published"
    }
  ];

const REASONS: AlternativeReason[] = [
    {
      "title": "Mock interviews on the base tier, not an upsell",
      "body": "Careerflow puts AI mock interviews on Premium Plus, above the $23.99 Premium tier. Preciprocal includes 30 mock interviews a month on the $9.99 Pro tier, and 3 a month on the free plan. If interview practice is part of why you are buying a tool, that pricing structure matters."
    },
    {
      "title": "Voice-based rather than text-based practice",
      "body": "Speaking an answer aloud to a stranger under time pressure is a different skill from writing a good one. Preciprocal's mocks are voice-based with a multi-agent panel that follows up and pushes back, which is closer to the thing you are actually preparing for."
    },
    {
      "title": "$9.99 against $23.99, and no weekly tier",
      "body": "Careerflow Premium is $23.99 monthly, $54.99 quarterly, or $172.99 annually. Preciprocal Pro is $9.99 monthly or $7.49 monthly billed annually. Both offer real free tiers, so compare those first with your own profile."
    },
    {
      "title": "Resume depth beyond the ATS score",
      "body": "Both tools score resumes against postings. Preciprocal adds the recruiter eye simulation, candidate benchmarking against the applicant pool, and interview intelligence extracted from the job description, which is the part that connects your resume work to your interview prep."
    }
  ];

const FAQS: AlternativeFaq[] = [
    {
      "q": "What is Careerflow.ai?",
      "a": "Careerflow is a career tools platform best known for its LinkedIn profile optimiser, alongside an AI resume builder, ATS keyword analyser and cover letter writer. It works largely through a Chrome extension and has a reasonably capable free tier."
    },
    {
      "q": "Is Careerflow's LinkedIn optimiser better than Preciprocal's?",
      "a": "Careerflow has invested more specifically in LinkedIn and its optimiser is more developed as a standalone tool. Preciprocal's LinkedIn optimisation is one component of a wider platform, with a full profile rewrite available on Premium. If LinkedIn is the only thing you need help with, Careerflow is a reasonable choice."
    },
    {
      "q": "Why do people look for a Careerflow alternative?",
      "a": "Most commonly because mock interviews sit on the Premium Plus tier rather than the standard Premium plan, so the total cost of covering both profile work and interview prep rises quickly. Price is the other factor at $23.99/mo for the standard tier."
    },
    {
      "q": "How much does Careerflow cost compared to Preciprocal?",
      "a": "Careerflow Premium is $23.99 monthly, $54.99 quarterly, or $172.99 yearly, with Premium Plus above that. Preciprocal Pro is $9.99 monthly or $7.49 monthly billed annually, with mock interviews included at that tier."
    },
    {
      "q": "Do both tools have free plans?",
      "a": "Yes. Both offer genuine free tiers rather than time-limited trials, so the sensible approach is to run your own LinkedIn profile and resume through both and compare the output before paying for either."
    },
    {
      "q": "Which is better for international students?",
      "a": "Preciprocal was built by international students and includes cover letter generation that handles work authorisation status directly, plus a library of visa and OPT guides. Careerflow does not target that use case specifically."
    }
  ];

export default function CareerflowAlternativePage() {
  return (
    <AlternativePage
      competitor="Careerflow"
      slug="careerflow-alternative"
      theirPlanLabel="Careerflow Premium"
      theirPrice="$23.99/mo"
      theirPriceNote="LinkedIn and resume tools"
      intro="Careerflow's strongest feature is its LinkedIn optimiser, and it is a legitimately good one. The tool scores your profile section by section and suggests keyword improvements, which is exactly the right approach given that recruiters search LinkedIn rather than browse it. Its free tier also covers more than most competitors offer."
      positioning="Preciprocal includes LinkedIn optimisation alongside ATS resume scoring, voice mock interviews, cover letters and job tracking at $9.99/mo, with mock interviews on the base paid tier rather than an upgrade."
      verdictTheirs="LinkedIn optimisation is your single priority and you want the most developed tool specifically for that, or the free tier already covers your needs."
      verdictOurs="you want LinkedIn optimisation as one part of a full pipeline, and you want mock interviews included rather than gated behind a higher tier."
      rows={ROWS}
      reasons={REASONS}
      faqs={FAQS}
      pricingChecked="September 2026"
    />
  );
}
