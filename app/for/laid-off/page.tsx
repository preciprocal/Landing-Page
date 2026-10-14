/**
 * app/for/laid-off/page.tsx
 *
 * Targets: "just got laid off what to do", "job search after layoff", "how to
 * explain a layoff in an interview", "laid off tech worker job search".
 *
 * Searchers here are mid-crisis and high-intent: they need a plan this week.
 * The page leads with a concrete first-week checklist and only then the
 * product, and avoids legal or financial specifics (severance, unemployment
 * benefits) that vary by state and employer.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Laid Off? A Job Search Plan That Works",
  description:
    "Just laid off? A first-week plan, how to explain the layoff in interviews, and the tools to get back to offers fast: tailored resumes, mock interviews, outreach and a tracker. Free to start.",
  keywords: [
    "just got laid off what to do",
    "job search after layoff",
    "how to explain a layoff in an interview",
    "laid off tech worker job search",
    "what to do after being laid off",
    "layoff job search plan",
  ],
  alternates: { canonical: "https://preciprocal.com/for/laid-off" },
  openGraph: {
    title: "Laid Off? A Job Search Plan That Gets You Back to Offers",
    description: "A first-week plan, how to explain the layoff, and the tools to move fast.",
    url: "https://preciprocal.com/for/laid-off",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v2.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laid Off? A Job Search Plan That Works",
    description: "A first-week plan, how to explain the layoff, and the tools to move fast.",
  },
};

const FAQS = [
  {
    q: "What should I do in the first week after being laid off?",
    a: "Handle the time-sensitive admin first: read your severance terms before signing, note any deadlines for benefits and health coverage, and check your state's unemployment rules. Then save copies of your performance reviews and work samples you are allowed to keep, and ask colleagues and managers for recommendations while your work is fresh in their minds. Start applying in week two, once your resume and story are ready.",
  },
  {
    q: "How do I explain a layoff in an interview?",
    a: "Briefly and factually, then move on. 'My role was one of 200 cut when the company restructured its platform team' is complete. Layoffs are common and interviewers do not hold them against you. What they listen for is whether you sound bitter, so do not criticise your old employer, and steer quickly to what you did there and what you want next.",
  },
  {
    q: "Should I put 'laid off' on my resume or LinkedIn?",
    a: "Not on the resume, which lists dates and accomplishments. On LinkedIn, an 'open to work' signal and a short post saying you are looking, with the kind of role you want, often produces leads from your own network, which is where many post-layoff jobs come from.",
  },
  {
    q: "How long does a job search take after a layoff?",
    a: "It varies widely with your field, seniority and the market, and it is usually longer than people hope. Plan your finances for a longer search than you expect, and treat the search as a structured weekly routine rather than reacting to whatever appears on job boards.",
  },
  {
    q: "Should I take the first offer I get?",
    a: "Not automatically. Compare it against your budget runway and how well it fits what you want next. If you have other interviews in progress, it is normal to tell those companies you have an offer and ask whether they can speed up. Our salary negotiation guide covers how to negotiate even when you feel you need the job.",
  },
];

const FEATURES = [
  { label: "Resume refresh in an evening", description: "See how an ATS reads your resume today, and update it with your most recent wins while you remember them." },
  { label: "Tailor at speed", description: "Adapt your resume and cover letter to each posting in minutes, not an hour each." },
  { label: "Rehearse the layoff answer", description: "AI mock interviews that ask about the gap and the move, so your answer is calm and short." },
  { label: "Work your network", description: "Find contacts at target companies and draft outreach to former colleagues and new contacts." },
  { label: "One pipeline", description: "Every application, contact and follow-up tracked, so nothing slips while you run many at once." },
  { label: "Get sharp again", description: "A study plan to brush up on interview formats if it has been years since you last sat one." },
];

const STEPS = [
  { step: "1", title: "Week one: get ready", body: "Admin first, then update your resume and LinkedIn, and line up your references." },
  { step: "2", title: "Week two: go wide, carefully", body: "Tell your network, reach out to people at target companies, and send tailored applications." },
  { step: "3", title: "Every week: practise and track", body: "Mock interviews before real ones, and a pipeline that shows what is working." },
];

export default function LaidOffPage() {
  return (
    <ToolPage
      breadcrumbName="After a Layoff"
      canonicalPath="/for/laid-off"
      badge="For anyone recently laid off"
      h1="Laid off?"
      h1Accent="Here is a plan for what comes next"
      subhead="A layoff says more about a budget than about you. The job search after one is a project with a clear shape, and Preciprocal gives you the tools to run it: tailored applications, real interview practice, outreach, and one place to track it all."
      ctaTool="job-tracker"
      ctaLabel="Start free"
      ctaMicrocopy="Free plan · No credit card"
      featuresTitle="Get back to interviews fast"
      featuresSubtitle="Everything you need to run a structured search, so it does not take over your whole day."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="A first-week plan after a layoff"
      faqTitle="Job search after a layoff FAQ"
      faqs={FAQS}
      relatedLinks={[
        { label: "How to get a job in today's market", href: "/blog/how-to-get-a-job-in-todays-market-2026" },
        { label: "The US job market, late 2026", href: "/blog/us-job-market-late-2026-data" },
        { label: "How to handle rejection and keep going", href: "/blog/how-to-handle-job-rejection-keep-going" },
        { label: "Why are you looking for a new job?", href: "/blog/how-to-answer-why-are-you-looking-for-new-job" },
        { label: "How to negotiate a salary offer", href: "/blog/how-to-negotiate-salary-offer" },
        { label: "Job application tracker", href: "/job-application-tracker" },
        { label: "Cold email generator", href: "/cold-email-generator" },
      ]}
      bottomTitle="Turn the layoff into your next role."
      bottomBody="Resume, interviews, outreach and tracking in one place, free to start, so the search has a structure from day one."
      bottomMicrocopy="Free plan · No credit card · Cancel any paid plan any time"
      body={
        <>
          <p>
            The first few days after a layoff are a bad time to start sending applications. You are
            reacting, your resume is out of date, and you have not worked out how to talk about what
            happened. A week spent getting ready makes everything after it faster.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">The first week</h3>
            <ol className="space-y-3 list-decimal list-inside text-sm">
              {[
                "Read your severance agreement before signing, and note every deadline for benefits and health coverage",
                "Check your state's unemployment insurance rules and file promptly",
                "Ask your manager and two or three colleagues for a LinkedIn recommendation or a reference while your work is fresh",
                "Write down your last two years of wins with numbers, before you forget them",
                "Update your resume and LinkedIn, then decide on the two or three kinds of role you are targeting",
                "Write a two-sentence explanation of the layoff and practise saying it out loud",
              ].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>

          <p>
            From week two, work your network before job boards. Former colleagues who left before you
            are the warmest leads you have: they know your work and they are inside other companies. A
            short note saying what you are looking for, and asking whether their team is hiring, often
            does more than twenty portal applications.
          </p>
          <p>
            The interview question everyone dreads, &quot;why did you leave?&quot;, is easier than it
            feels. A plain, specific answer such as &quot;my team was one of several cut in a
            restructuring&quot; is enough. Interviewers have seen many layoffs and do not hold them
            against you. What they notice is bitterness or a long explanation, so keep it to two sentences
            and move to what you want to do next. Practise it until it sounds like any other fact about
            your career.
          </p>
        </>
      }
    />
  );
}
