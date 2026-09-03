/**
 * app/alternatives/interviewing-io-alternative/page.tsx
 *
 * Comparison page targeting "interviewing.io alternative" and related
 * buying-intent queries. Rendered by components/AlternativePage.tsx.
 *
 * Pricing quoted here was checked in September 2026 against public sources.
 * These figures move, so re-verify before editing rather than assuming.
 */

import type { Metadata } from "next";
import AlternativePage, { type ComparisonRow, type AlternativeFaq, type AlternativeReason } from "@/components/AlternativePage";

export const metadata: Metadata = {
  title: { absolute: "interviewing.io Alternative: Preciprocal Compared" },
  description: "An interviewing.io alternative for unlimited AI mock interview practice at $9.99/mo, against roughly $179 to $339 per session with human FAANG engineers.",
  keywords: ["interviewing.io alternative","interviewing.io vs Preciprocal","cheaper than interviewing.io","AI mock interview alternative","mock interview practice cheap","technical interview practice","interviewing.io pricing"],
  alternates: { canonical: "https://preciprocal.com/alternatives/interviewing-io-alternative" },
  openGraph: {
    title: "interviewing.io Alternative: Preciprocal Compared (2026)",
    description: "An interviewing.io alternative for unlimited AI mock interview practice at $9.99/mo, against roughly $179 to $339 per session with human FAANG engineers.",
    url: "https://preciprocal.com/alternatives/interviewing-io-alternative",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "interviewing.io Alternative | Preciprocal",
    description: "An interviewing.io alternative for unlimited AI mock interview practice at $9.99/mo, against roughly $179 to $339 per session with human FAANG enginee",
  },
};

const ROWS: ComparisonRow[] = [
    {
      "feature": "Interviewer",
      "ours": "AI multi-agent panel",
      "theirs": "Real engineers from top companies"
    },
    {
      "feature": "Feedback fidelity",
      "ours": "Five-dimension scored debrief",
      "theirs": "Human judgement, highest fidelity"
    },
    {
      "feature": "Practice volume",
      "ours": "30 mocks/mo on Pro, 3 on free",
      "theirs": "Per session, typically a handful"
    },
    {
      "feature": "Anonymity",
      "ours": "Not applicable",
      "theirs": "Anonymous by design, a real strength"
    },
    {
      "feature": "Role coverage",
      "ours": "41 roles across 10 categories",
      "theirs": "Software engineering focused"
    },
    {
      "feature": "Company-specific prep",
      "ours": "56 employers",
      "theirs": "Company-specific interviewers available"
    },
    {
      "feature": "Behavioural rounds",
      "ours": "Included, with STAR scoring",
      "theirs": "Available, engineering oriented"
    },
    {
      "feature": "ATS resume scoring",
      "ours": "Score plus keyword gap per posting",
      "theirs": "Not included"
    },
    {
      "feature": "Cover letters and tracking",
      "ours": "Included",
      "theirs": "Not included"
    },
    {
      "feature": "Scheduling",
      "ours": "On demand, any hour",
      "theirs": "Booked with a human interviewer"
    },
    {
      "feature": "Free option",
      "ours": "3 mock interviews/mo, no card",
      "theirs": "Free practice with peers available"
    },
    {
      "feature": "Price",
      "ours": "$9.99/mo, unlimited-ish practice",
      "theirs": "About $179 to $339 per session"
    },
    {
      "feature": "Best for",
      "ours": "Volume of reps, all roles, tight budget",
      "theirs": "Senior SWE targeting a specific loop"
    }
  ];

const REASONS: AlternativeReason[] = [
    {
      "title": "Be clear about the trade-off",
      "body": "A real engineer from your target company giving you live feedback is higher fidelity than any AI, and we are not going to claim otherwise. What AI gives you is volume and cost: you can run twenty mocks in a fortnight for less than a tenth of one human session. Most candidates need reps more than they need a single expert opinion."
    },
    {
      "title": "Per-session pricing does not fit a long search",
      "body": "Third-party reports put interviewing.io sessions at roughly $179 to $339 depending on interviewer seniority, with multi-session packages running into the thousands. Note that they do not publish prices publicly, so treat those as indicative. Preciprocal Pro is $9.99 a month with 30 mocks included."
    },
    {
      "title": "Coverage beyond technical engineering loops",
      "body": "interviewing.io is built for software engineering interviews. Preciprocal covers behavioural rounds, consulting cases, finance interviews, marketing, HR and healthcare, across 41 roles and 56 employers. If you are not interviewing for an engineering role, it is not really a comparison."
    },
    {
      "title": "The rest of the search is included",
      "body": "interviewing.io is a mock interview service. Preciprocal also scores your resume against postings, generates cover letters, tracks applications, finds contacts and drafts outreach. Different products solving different amounts of the problem."
    }
  ];

const FAQS: AlternativeFaq[] = [
    {
      "q": "What is interviewing.io?",
      "a": "interviewing.io is a technical interview practice platform where you take anonymous mock interviews with real engineers, many from companies like Google, Meta and Amazon. You get live feedback from someone who has conducted these interviews professionally. It also runs a free peer practice option."
    },
    {
      "q": "Is AI practice as good as a human mock interview?",
      "a": "Not for fidelity, no. A senior engineer from your target company will read your reasoning better than any model and give feedback grounded in what that specific bar looks like. What AI does better is volume, availability and cost, and for most candidates the binding constraint is how many reps they get rather than how expert each one is."
    },
    {
      "q": "How much does interviewing.io cost?",
      "a": "They do not publish pricing publicly. Third-party reviews through 2026 report roughly $179 to $339 per session depending on interviewer seniority, with multi-session packages running into the low thousands. Treat those figures as indicative and check directly."
    },
    {
      "q": "Which should I use if I am a new grad?",
      "a": "Preciprocal, most likely, on cost grounds alone. New grad loops test fundamentals and behavioural answers rather than deep senior judgement, and what helps most at that stage is many repetitions of speaking your reasoning aloud. If you have budget for one human mock before a final onsite, that is a good use of it."
    },
    {
      "q": "Does interviewing.io cover non-engineering roles?",
      "a": "It is built for software engineering interviews. If you are interviewing for finance, consulting, marketing, HR or healthcare roles, it is not the right tool, and Preciprocal covers those across 41 roles."
    },
    {
      "q": "Can I use both?",
      "a": "That is arguably the best approach if budget allows: use Preciprocal for volume practice through your preparation, then book one or two human sessions close to a final onsite for high-fidelity feedback. They are complements more than substitutes."
    }
  ];

export default function InterviewingIoAlternativePage() {
  return (
    <AlternativePage
      competitor="interviewing.io"
      slug="interviewing-io-alternative"
      theirPlanLabel="interviewing.io"
      theirPrice="~$179+/session"
      theirPriceNote="Human engineers, per session"
      intro="interviewing.io is a genuinely different product and in one important respect a better one: you practise with real engineers from companies like Google and Meta, anonymously, and get feedback from someone who has actually conducted these interviews. For senior engineers preparing for a specific FAANG loop, that signal is hard to replicate."
      positioning="Preciprocal offers unlimited AI practice at $9.99/mo rather than per-session human interviews. It is a volume-and-cost trade against fidelity, and which one you want depends on your stage and budget."
      verdictTheirs="you are targeting a senior engineering role at a top company, need feedback from someone who has run those loops, and the per-session cost is affordable for you."
      verdictOurs="you need many repetitions rather than a few high-fidelity ones, you are earlier in your career, or per-session pricing puts human mocks out of reach."
      rows={ROWS}
      reasons={REASONS}
      faqs={FAQS}
      pricingChecked="September 2026"
    />
  );
}
