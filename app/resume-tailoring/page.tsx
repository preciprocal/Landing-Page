/**
 * app/resume-tailoring/page.tsx
 *
 * Targets: "tailor resume to job description", "resume tailoring tool",
 * "customize resume for each job", "resume keyword matching".
 *
 * Distinct from /free-ats-checker: that page is about scoring a resume in
 * isolation, this one is about the rewrite against a specific posting. Keep the
 * two internally linked but do not let their content overlap, or they compete
 * for the same queries.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Resume Tailoring: Match Any Job Description",
  description:
    "Paste a job description and get your resume rewritten to match it. See every change side by side, keep your voice, and raise your keyword match before you apply.",
  keywords: [
    "resume tailoring",
    "tailor resume to job description",
    "resume tailoring tool",
    "customize resume for each job",
    "resume keyword matching",
    "match resume to job posting",
    "AI resume tailoring",
    "resume optimization for job description",
  ],
  alternates: { canonical: "https://preciprocal.com/resume-tailoring" },
  openGraph: {
    title: "Resume Tailoring Tool, Match Your Resume to Any Job Description",
    description:
      "One resume for every job is the biggest mistake in a job search. Tailor in minutes, not hours.",
    url: "https://preciprocal.com/resume-tailoring",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Tailoring Tool",
    description: "Paste a job description, get a matched resume. Every change shown side by side.",
  },
};

const FAQS = [
  {
    q: "Does tailoring your resume actually matter?",
    a: "It is the highest-leverage change most candidates can make. ATS scoring is largely a keyword match between your resume and the specific posting, so the same resume can score 55 against one job and 85 against another. Beyond the automated screen, a recruiter spends a handful of seconds deciding whether you are plausible for this role, and a resume that visibly speaks to their posting clears that bar far more often than a general one.",
  },
  {
    q: "Isn't tailoring every resume too slow?",
    a: "Done manually, tailoring takes 20 to 40 minutes per application, which is why almost nobody sustains it past the first week. That is the actual problem being solved here. The goal is to get it to two or three minutes so it becomes something you do for every application rather than only for the jobs you care most about, which are usually the most competitive ones.",
  },
  {
    q: "Will it just stuff keywords into my resume?",
    a: "No, and you should be sceptical of any tool that does. Keyword stuffing is detectable by recruiters and reads badly to humans, which costs you more than the ATS points gain. The rewrites work by putting the relevant terms inside bullets that describe what you actually did, so the keyword arrives with evidence attached rather than sitting in a list at the bottom.",
  },
  {
    q: "Can I review the changes before using them?",
    a: "Every change is shown in an original-to-rewrite format, and you approve each one individually. Nothing is applied silently. This matters because you are the only one who knows whether a rewrite is still factually true about your work, and that judgement cannot be delegated to a model.",
  },
  {
    q: "How many versions of my resume should I keep?",
    a: "Keep one strong master resume and generate tailored versions from it per application, rather than maintaining several parallel masters that gradually drift out of sync. Save each tailored version against the application in your job tracker, so when the interview comes you know exactly which document they are looking at.",
  },
  {
    q: "Does it work for non-technical roles?",
    a: "Yes. The matching works from the language of the posting itself, so it adapts to finance, marketing, healthcare, legal, operations, and any other field. The underlying mechanic, mirroring the vocabulary of the specific job description, is identical regardless of industry.",
  },
  {
    q: "Is resume tailoring included in the free plan?",
    a: "The free plan includes 5 resume analyses per month, which covers tailoring against specific job descriptions. Pro raises that to 20 per month and unlocks the full resume editor.",
  },
];

const FEATURES = [
  { label: "Keyword gap analysis", description: "The exact terms in the posting that your resume is missing." },
  { label: "Bullet-level rewrites", description: "Specific replacement text, not general advice about being more impactful." },
  { label: "Side-by-side diffs", description: "Every change shown as original to rewrite, approved individually." },
  { label: "Match score", description: "Your keyword match against this posting, before and after." },
  { label: "Skills reordering", description: "Surfaces the skills this posting cares about to the top of the section." },
  { label: "Version history", description: "Every tailored version saved against the application you sent it to." },
];

const STEPS = [
  { step: "1", title: "Upload your master resume", body: "One strong base document. You'll generate every tailored version from it rather than maintaining several." },
  { step: "2", title: "Paste the job description", body: "The full posting. The more detail it contains, the more precise the matching becomes." },
  { step: "3", title: "Approve the rewrites", body: "Review each suggested change side by side, accept what's accurate, and export the tailored version." },
];

export default function ResumeTailoringPage() {
  return (
    <ToolPage
      breadcrumbName="Resume Tailoring"
      canonicalPath="/resume-tailoring"
      badge="Free, 5 analyses per month"
      h1="Tailor your resume"
      h1Accent="to any job description"
      subhead="The same resume scores 55 against one posting and 85 against another. Paste the job description, see exactly which terms you're missing, and get bullet-level rewrites you approve one by one."
      ctaTool="resume-tailoring"
      ctaLabel="Tailor my resume free"
      ctaMicrocopy="5 free analyses/month · Every change reviewable · No credit card"
      featuresTitle="What the tailoring tool does"
      featuresSubtitle="Gets a per-application rewrite down from 30 minutes to about three, so you actually do it every time."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="Why one resume for every job stops working"
      faqTitle="Resume tailoring FAQ"
      faqs={FAQS}
      relatedLinks={[
        { label: "Free ATS resume checker", href: "/free-ats-checker" },
        { label: "Resume keywords that get past ATS", href: "/blog/resume-keywords-that-get-past-ats" },
        { label: "How to pass ATS resume screening", href: "/blog/how-to-pass-ats-resume-screening" },
        { label: "Resume tips by role", href: "/resume-tips" },
        { label: "Cover letter generator", href: "/cover-letter-generator" },
        { label: "LinkedIn profile optimizer", href: "/linkedin-profile-optimizer" },
      ]}
      bottomTitle="Send 20 tailored applications, not 200 generic ones."
      bottomBody="In a market with one opening per unemployed worker, match rate beats volume every time."
      bottomMicrocopy="5 free analyses per month · No credit card · Export to PDF or .docx"
      body={
        <>
          <p>
            The single most common job search mistake is sending the same resume to every opening.
            It feels efficient. It is the reason a qualified candidate can send two hundred
            applications and hear back from four.
          </p>
          <p>
            ATS scoring is, at its core, a{" "}
            <strong className="text-white">comparison between two documents</strong>: your resume
            and this specific posting. Change the posting and the score changes, even though your
            resume is identical. A backend engineer&apos;s resume might score 85 against a job asking
            for Python and Django, and 52 against one asking for Go and Kubernetes, describing the
            same person with the same abilities.
          </p>
          <p>
            This is why generic resume advice plateaus. You can fix your formatting, add metrics to
            every bullet, and use strong verbs throughout, and still be filtered out, because none
            of that addresses the match against the particular job you are applying for.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">What tailoring actually changes</h3>
            <ul className="space-y-3">
              {[
                "Vocabulary, 'agile methodology' vs 'agile process' can be the difference in a literal keyword match",
                "Skills ordering, the tools this posting names, moved to the top of your skills section",
                "Bullet emphasis, the same project framed toward the outcome this team cares about",
                "Seniority signals, scope language matched to the level in the posting",
                "Acronyms, spelled out once so both the acronym and the full term are indexed",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-indigo-400 flex-shrink-0 mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            None of this involves inventing experience. Every one of those changes is a different
            presentation of work you actually did. The reason it moves the needle is that your
            resume is a compression of your career, and which parts survive the compression should
            depend on who is reading it.
          </p>
          <p>
            The reason people stop tailoring is purely economic. Thirty minutes per application is
            unsustainable across a real pipeline, so it gets reserved for the handful of jobs you
            care most about, which are also the most competitive, where the marginal value of
            tailoring is lowest relative to the field. Getting the cost down to a few minutes
            inverts that: you tailor everything, including the roles you would have dismissed as
            long shots, which is frequently where offers actually come from.
          </p>
          <p>
            Tailoring is the rewrite step. If you want to check where your resume stands before you
            start, run it through the{" "}
            <strong className="text-white">free ATS checker</strong> first, that scores the
            document on its own terms, and this tool closes the gap against a specific posting.
          </p>
        </>
      }
    />
  );
}
