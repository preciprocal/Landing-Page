/**
 * app/job-application-tracker/page.tsx
 *
 * Targets: "job application tracker", "job search tracker", "track job
 * applications", "job application spreadsheet".
 *
 * The strongest angle here is the spreadsheet comparison — most people
 * currently track applications in Google Sheets, so the query behind this page
 * is usually "is there something better than my spreadsheet". The body content
 * answers that directly rather than listing features.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Free Job Application Tracker — Every Application in One Place",
  description:
    "Track every job application, interview stage, and follow-up in one place. Know what to chase, when to follow up, and which applications have gone quiet, without a spreadsheet.",
  keywords: [
    "job application tracker",
    "job search tracker",
    "track job applications",
    "job application spreadsheet",
    "job application organizer",
    "job search organization tool",
    "application tracking for job seekers",
    "free job tracker",
  ],
  alternates: { canonical: "https://preciprocal.com/job-application-tracker" },
  openGraph: {
    title: "Free Job Application Tracker — Every Application in One Place",
    description:
      "Stop losing applications in a spreadsheet. Track stages, follow-ups, and contacts in one pipeline.",
    url: "https://preciprocal.com/job-application-tracker",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Job Application Tracker",
    description: "Every application, stage, and follow-up in one place. Free for up to 10 jobs.",
  },
};

const FAQS = [
  {
    q: "Why not just use a spreadsheet?",
    a: "A spreadsheet works fine for the first ten applications. It breaks down at around thirty, for three reasons: you have to enter everything manually so you stop doing it, it has no concept of time so nothing reminds you to follow up, and it holds no context, meaning the job description you applied against is gone by the time you get an interview. A tracker built for this solves all three, and you can still export to CSV whenever you want.",
  },
  {
    q: "How many applications should I have active at once?",
    a: "In the 2026 market, a healthy pipeline is roughly 15 to 25 live applications at any given time, with new ones being added weekly. The exact number matters less than the flow rate: applications go stale after about three weeks with no response, so you need enough new entries each week to replace the ones going cold. Tracking makes that flow visible, which is the main reason it changes behaviour.",
  },
  {
    q: "When should I follow up after applying?",
    a: "About one week after applying if you have a contact at the company, and again after the interview within 24 hours for the thank-you note. For a status check after an interview, wait until one or two days past whatever timeline they gave you. The tracker sets these reminders automatically per application, so you are not trying to hold twenty separate timelines in your head.",
  },
  {
    q: "What should I record for each application?",
    a: "The job description text, the date applied, the current stage, the contact name if you have one, and your notes after each conversation. The job description matters more than people expect: interviewers ask about specifics from the posting weeks after it has been taken down, and you want the version you actually applied against.",
  },
  {
    q: "Does it work with the Chrome extension?",
    a: "Yes. The Preciprocal Chrome extension saves a job from LinkedIn or any job board with one click, pulling in the title, company, and full job description automatically. That removes the manual data entry that causes most people to abandon their spreadsheet after two weeks.",
  },
  {
    q: "Can I see which applications have gone quiet?",
    a: "Yes. The pipeline view highlights applications with no activity past a threshold you set, which is usually the single most useful view in the whole tool. Job seekers consistently underestimate how many of their applications have quietly died, and seeing it plainly is what prompts the follow-up or the decision to move on.",
  },
  {
    q: "Is the job tracker free?",
    a: "The free plan tracks up to 10 jobs with full stage and follow-up tracking, no credit card required. Pro removes the limit and adds analytics across your pipeline, including response rate by company and by resume version.",
  },
];

const FEATURES = [
  { label: "Stage pipeline", description: "Applied, screening, interviewing, offer, rejected — see the whole funnel at once." },
  { label: "Follow-up reminders", description: "Automatic prompts at the right interval per application, not a shared calendar." },
  { label: "Saved job descriptions", description: "The posting you applied against, kept even after it's taken down." },
  { label: "Contact linking", description: "Who you spoke to at each company, and when you last contacted them." },
  { label: "Stale application alerts", description: "Surfaces the applications that have quietly gone cold." },
  { label: "One-click saving", description: "Save jobs straight from LinkedIn and job boards with the Chrome extension." },
];

const STEPS = [
  { step: "1", title: "Save jobs as you find them", body: "One click from LinkedIn or any job board. Title, company, and description import automatically." },
  { step: "2", title: "Move them through stages", body: "Drag an application from applied to screening to interviewing. Follow-up reminders adjust automatically." },
  { step: "3", title: "Work the pipeline", body: "See what needs a follow-up today, what has gone stale, and where your responses are actually coming from." },
];

export default function JobApplicationTrackerPage() {
  return (
    <ToolPage
      breadcrumbName="Job Application Tracker"
      canonicalPath="/job-application-tracker"
      badge="Free — track up to 10 jobs"
      h1="Free job application tracker"
      h1Accent="stop losing track of applications"
      subhead="Thirty applications in, nobody remembers who they contacted, what they applied for, or which company has gone quiet. One pipeline with stages, follow-ups, and the original job description attached."
      ctaTool="job-tracker"
      ctaLabel="Start tracking free"
      ctaMicrocopy="10 jobs free · Chrome extension included · No credit card"
      featuresTitle="What the job tracker does"
      featuresSubtitle="Built for the part of the job search that quietly falls apart: everything after you click submit."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="Why job searches fall apart after thirty applications"
      faqTitle="Job application tracker FAQ"
      faqs={FAQS}
      relatedLinks={[
        { label: "How to follow up after an interview", href: "/blog/how-to-follow-up-after-interview-without-being-annoying" },
        { label: "How to handle job rejection", href: "/blog/how-to-handle-job-rejection-keep-going" },
        { label: "The US job market in late 2026", href: "/blog/us-job-market-late-2026-data" },
        { label: "Recruiter contact finder", href: "/recruiter-contact-finder" },
        { label: "Free ATS resume checker", href: "/free-ats-checker" },
        { label: "Cover letter generator", href: "/cover-letter-generator" },
      ]}
      bottomTitle="Run a pipeline, not a pile."
      bottomBody="The candidates who get offers aren't sending the most applications. They're the ones still following up on the ones they sent."
      bottomMicrocopy="10 jobs free · No credit card · Export to CSV anytime"
      body={
        <>
          <p>
            Every job search follows the same arc. The first ten applications are meticulous: each
            one tailored, logged in a spreadsheet, follow-up dates noted. By application forty, the
            spreadsheet has three empty columns, you cannot remember whether you already applied to
            one of the companies, and a recruiter has just emailed about a role you have no memory
            of applying for.
          </p>
          <p>
            This is not a discipline problem. It is a{" "}
            <strong className="text-white">data entry problem</strong>. Manual tracking has a cost
            per application, and once your weekly volume rises past what that cost can absorb, you
            stop doing it. The tracking stops exactly when the pipeline gets big enough to actually
            need it.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">What untracked job searches lose</h3>
            <ul className="space-y-3">
              {[
                "Follow-ups that never happen — the single highest-ROI action in a job search",
                "The original job description, deleted from the board before your interview",
                "Duplicate applications to the same company, which recruiters do notice",
                "Which resume version you sent, so you can't tell what's working",
                "Warm contacts who go cold because nobody logged when you last spoke",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-rose-400 flex-shrink-0 mt-0.5">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            The follow-up loss is the expensive one. In a market where postings sit near their
            pre-pandemic baseline but the hiring rate is only 3.4%, applications are not rejected so
            much as they are forgotten. Roles stay open for months, get deprioritised, and get
            revived. A polite follow-up at the right moment is often what moves an application from
            the pile back onto a screen — and it is precisely the action that untracked searches
            never take.
          </p>
          <p>
            The second loss is analytical. If you do not know which resume version went to which
            company, you cannot tell what is working. Thirty applications with a 3% response rate
            and thirty with a 20% response rate demand completely different responses from you, and
            you cannot distinguish them without records.
          </p>
          <p>
            The fix is not more discipline, it is removing the data entry. Save a job in one click
            from the posting itself, and the tracking becomes a side effect of applying rather than
            a separate chore you have to remember to do.
          </p>
        </>
      }
    />
  );
}
