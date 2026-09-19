/**
 * app/alternatives/jobright-alternative/page.tsx
 *
 * Comparison page targeting "Jobright alternative" and related
 * buying-intent queries. Rendered by components/AlternativePage.tsx.
 *
 * Jobright already appeared in the homepage comparison table but had no page of
 * its own, so the head term was unserved.
 *
 * Pricing quoted here was checked in September 2026. Jobright does not publish a
 * public pricing page (jobright.ai/pricing 404s and prices appear only in-app),
 * so the figures come from multiple 2026 third-party reviews. Turbo rose from
 * $29.99 to $39.99 in early 2026. Re-verify before editing rather than assuming.
 *
 * FAIRNESS NOTE: Jobright's matching engine and its H1B sponsorship filter are
 * genuinely better than anything we offer, and the filter matters a lot to the
 * international-student audience we write for. The page says so plainly. A
 * comparison that concedes nothing is not worth reading, and this one has a
 * specific reason to concede.
 */

import type { Metadata } from "next";
import AlternativePage, { type ComparisonRow, type AlternativeFaq, type AlternativeReason } from "@/components/AlternativePage";

export const metadata: Metadata = {
  title: { absolute: "Jobright Alternative: Preciprocal vs Jobright" },
  description:
    "A Jobright alternative with voice AI mock interviews, ATS resume scoring, cover letters and interview debriefs at $9.99/mo, against Jobright Turbo at $39.99/mo.",
  keywords: [
    "Jobright alternative",
    "Jobright vs Preciprocal",
    "Jobright.ai alternative",
    "cheaper than Jobright",
    "Jobright for students",
    "Jobright pricing",
    "Jobright Turbo cost",
    "AI job matching alternative",
  ],
  alternates: { canonical: "https://preciprocal.com/alternatives/jobright-alternative" },
  openGraph: {
    title: "Jobright Alternative: Preciprocal Compared (2026)",
    description:
      "A Jobright alternative with voice AI mock interviews, ATS resume scoring, cover letters and interview debriefs at $9.99/mo, against Jobright Turbo at $39.99/mo.",
    url: "https://preciprocal.com/alternatives/jobright-alternative",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobright Alternative | Preciprocal",
    description:
      "Mock interviews, resume scoring, cover letters and debriefs at $9.99/mo, against Jobright Turbo at $39.99/mo.",
  },
};

const ROWS: ComparisonRow[] = [
  {
    feature: "AI job matching",
    ours: "Not offered, we are not a job board",
    theirs: "Core strength, well regarded",
  },
  {
    feature: "H1B sponsorship filter",
    ours: "Visa guides, no sponsorship filter",
    theirs: "Filter built on USCIS filing history",
  },
  {
    feature: "Application autofill",
    ours: "Fills the form, you review and submit",
    theirs: "Orion agent autofills forms",
  },
  {
    feature: "ATS resume scoring",
    ours: "Score plus keyword gap per posting",
    theirs: "Tailors resumes to a listing",
  },
  {
    feature: "Recruiter eye simulation",
    ours: "Six-second scan heatmap",
    theirs: "Not included",
  },
  {
    feature: "Candidate benchmarking",
    ours: "Ranking against the applicant pool",
    theirs: "Match score against the posting",
  },
  {
    feature: "AI mock interviews",
    ours: "Voice, multi-agent panel, follow-ups",
    theirs: "Not included",
  },
  {
    feature: "Interview study planner",
    ours: "Day-by-day plan to your date",
    theirs: "Not included",
  },
  {
    feature: "Interview debrief journal",
    ours: "Structured capture plus patterns",
    theirs: "Not included",
  },
  {
    feature: "Cover letter generator",
    ours: "Company-researched, 30/mo on Pro",
    theirs: "Included",
  },
  {
    feature: "Contact finder",
    ours: "Verified emails for hiring managers",
    theirs: "Insider connections and email lookup",
  },
  {
    feature: "Career coach",
    ours: "Not offered",
    theirs: "Live coach on Turbo",
  },
  {
    feature: "Free plan",
    ours: "Permanent, no card",
    theirs: "Generous, small daily allowances",
  },
  {
    feature: "Monthly price",
    ours: "$9.99",
    theirs: "$39.99, or $89.99 per quarter",
  },
  {
    feature: "Student discount",
    ours: "1 month Pro free with .edu email",
    theirs: "None published",
  },
];

const REASONS: AlternativeReason[] = [
  {
    title: "Use Jobright if finding the jobs is your problem",
    body: "Worth saying first: Jobright's matching engine is the best-reviewed part of the product, and if your bottleneck is finding relevant postings rather than converting them, it solves a problem we do not even attempt. Preciprocal is not a job board and does not match you to roles. If you are an international student, the H1B sponsorship filter built on historical USCIS filing data is genuinely distinctive and we have nothing equivalent.",
  },
  {
    title: "Nothing happens after the application",
    body: "Jobright optimises applications per hour. It has no mock interviews, no study planner and no debrief capture. Once a recruiter replies you are on your own, which is the half of the process where most qualified candidates actually get filtered out. Preciprocal is built for that half: voice mocks with a panel that asks follow-ups, a plan built backward from your interview date, and a journal that makes your recurring weaknesses visible.",
  },
  {
    title: "The autopilot is assisted autofill",
    body: "Reviewers consistently report that the Orion agent is closer to form autofill than the autonomous applying the marketing implies, and that you stay in the loop on every application. That is not a criticism of the tool so much as a reason to check what you are paying $39.99 a month for, since our own extension fills application forms too and is free on every plan.",
  },
  {
    title: "$9.99 against $39.99",
    body: "Jobright Turbo is $39.99 monthly, $89.99 quarterly or $17.99 weekly, having risen from $29.99 earlier in 2026. Preciprocal Pro is $9.99 monthly. Over a six-month search that is roughly $240 against $60, and the free plans on both sides are worth running first with your own resume.",
  },
];

const FAQS: AlternativeFaq[] = [
  {
    q: "What is Jobright.ai?",
    a: "Jobright is an AI job search copilot. It matches roles to your resume, tailors your resume per listing, surfaces insider connections and finds contact emails, and autofills application forms through a Chrome extension. Its matching engine is the part users rate most highly.",
  },
  {
    q: "Why do people look for a Jobright alternative?",
    a: "Two reasons dominate. Price, since Turbo moved from $29.99 to $39.99 a month in early 2026 without a matching change in the feature set. And scope, because Jobright ends at the application: there is no interview practice, no study planning and no debrief capture, so you end up paying separately for interview preparation.",
  },
  {
    q: "Does Jobright really auto-apply for me?",
    a: "Not in the sense the phrase suggests. Independent 2026 reviews describe the Orion agent as assisted autofill that keeps you in the loop on every submission rather than a system that applies unattended. It removes typing, not judgement.",
  },
  {
    q: "Is Jobright better for international students?",
    a: "For finding sponsoring employers, yes. Its H1B filter is built on historical USCIS filing data and we do not offer anything comparable. Preciprocal's strength for the same audience is different: cover letters that handle work authorisation directly, plus a library of OPT, H-1B and visa guides, and interview practice for the round where the sponsorship conversation actually happens.",
  },
  {
    q: "How much does Jobright cost compared to Preciprocal?",
    a: "Jobright Turbo is $39.99 monthly, $89.99 quarterly or $17.99 weekly. Preciprocal Pro is $9.99 monthly. Jobright does not publish a public pricing page, so confirm the current figure in-app before subscribing.",
  },
  {
    q: "Can I use both?",
    a: "That is a reasonable combination and probably the honest recommendation. Use Jobright's free tier to find and filter roles, then use Preciprocal to score your resume against the ones worth applying to and to prepare for the interviews you land. The two tools barely overlap.",
  },
];

export default function JobrightAlternativePage() {
  return (
    <AlternativePage
      competitor="Jobright"
      slug="jobright-alternative"
      theirPlanLabel="Jobright Turbo"
      theirPrice="$39.99/mo"
      theirPriceNote="AI matching and autofill"
      intro="Jobright is an AI job search copilot built around matching: it reads your resume, surfaces roles that fit, tailors your resume per listing and autofills the application through a Chrome extension. The matching engine is well regarded, the free tier is more useful than most paid tools, and the H1B sponsorship filter is genuinely distinctive."
      positioning="Preciprocal does not compete on finding jobs. It covers what happens after you find one: ATS scoring against that specific posting, voice mock interviews, a study planner and a debrief journal, at $9.99/mo against Jobright Turbo at $39.99/mo."
      verdictTheirs="your bottleneck is finding relevant roles rather than converting them, you want application autofill, or you need the H1B sponsorship filter."
      verdictOurs="you already have a list of jobs worth applying to and keep losing at the interview, or the four-times price difference over a months-long search matters to you."
      rows={ROWS}
      reasons={REASONS}
      faqs={FAQS}
      pricingChecked="September 2026"
    />
  );
}
