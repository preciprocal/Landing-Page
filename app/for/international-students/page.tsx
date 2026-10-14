/**
 * app/for/international-students/page.tsx
 *
 * Targets: "job search for international students", "how to find a job on
 * OPT", "F-1 student job search", "international student jobs USA".
 *
 * The visa guides are the most linked content on the site but had no
 * commercial page to hand readers to; every one ended on a generic sign-up.
 * This page is that destination: it gathers the visa cluster in one place and
 * frames the product around the thing international students actually face,
 * a fixed clock. Visa facts here are deliberately limited to long-standing
 * rules and point to the dated guides for anything that changes.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Job Search for International Students (F-1)",
  description:
    "A job search built around the OPT clock: target employers who sponsor, tailor every application, and practice interviews before the unemployment days run out. Free for students to start.",
  keywords: [
    "job search for international students",
    "how to find a job on OPT",
    "F-1 student job search",
    "international student jobs USA",
    "OPT unemployment days",
    "STEM OPT job search",
    "jobs that sponsor H-1B for students",
  ],
  alternates: { canonical: "https://preciprocal.com/for/international-students" },
  openGraph: {
    title: "The Job Search for International Students, Built Around the OPT Clock",
    description: "Tailor every application, track every deadline, and practice interviews before your unemployment days run out.",
    url: "https://preciprocal.com/for/international-students",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Search for International Students (F-1)",
    description: "A job search built around the OPT clock.",
  },
};

const FAQS = [
  {
    q: "How many unemployment days do I get on OPT?",
    a: "Up to 90 days in total during the initial period of post-completion OPT. A STEM OPT extension adds 60 more, for 150 across both. The count is cumulative, not per gap, so a short job between two longer gaps does not reset it. Confirm your own count with your school's DSO, since the record they keep is the one that matters.",
  },
  {
    q: "When should international students start applying for jobs?",
    a: "Earlier than domestic students, ideally two semesters before graduation. Many large employers hire new grads in the fall for the following summer, and once your OPT starts you are on a clock. Starting early means interviews happen while you are still in school and the unemployment count has not begun.",
  },
  {
    q: "Should I tell employers I need sponsorship?",
    a: "Answer application questions about work authorisation honestly, since a wrong answer can end an offer later. In conversation, lead with what you can do, then explain your status plainly: you are authorised to work now on OPT, and you would need sponsorship later. Many hiring managers do not know OPT exists, so a short, clear explanation helps.",
  },
  {
    q: "What is the difference between OPT and STEM OPT?",
    a: "Post-completion OPT gives up to 12 months of work authorisation after your degree. If your degree is on the STEM designated list, you can apply for a 24-month extension, but only with an employer enrolled in E-Verify, and you and your employer complete a training plan together. Our STEM OPT and stop-the-clock guides cover the details and the current rules.",
  },
  {
    q: "Which employers are not subject to the H-1B lottery?",
    a: "Universities, nonprofits affiliated with universities, and nonprofit or government research organisations are cap-exempt, so they can file H-1B petitions at any time of year without the lottery. They are worth a deliberate place on your target list if your field allows it.",
  },
  {
    q: "Is Preciprocal free for international students?",
    a: "The free plan is free for everyone. If you have a .edu email, you can also verify it for 1 month of Pro free. A card is required to start that trial, nothing is charged for 30 days, and you can cancel any time before it ends.",
  },
];

const FEATURES = [
  { label: "Track every deadline", description: "Log each application with notes, including whether the employer has sponsored before, on one board." },
  { label: "Tailor every resume", description: "Match your resume to each posting so the time you spend applying is not wasted at the ATS stage." },
  { label: "Practice by voice", description: "AI mock interviews with follow-up questions, so you get comfortable answering out loud in English under pressure." },
  { label: "Reach people, not portals", description: "Find hiring contacts and draft short outreach, which matters more when fewer employers will sponsor." },
  { label: "Answer the status question well", description: "Rehearse explaining OPT and sponsorship clearly in a mock interview before it comes up for real." },
  { label: "A plan for the time you have", description: "A study planner that schedules interview prep around your real dates, not an ideal semester." },
];

const STEPS = [
  { step: "1", title: "Start before OPT does", body: "Build your target list and tailored resume while you are still in school and the unemployment count has not started." },
  { step: "2", title: "Apply narrowly and well", body: "Fewer, tailored applications to employers likely to sponsor, each tracked, each followed up." },
  { step: "3", title: "Convert interviews", body: "When you only get a few shots, practice is what turns them into offers." },
];

const VISA_GUIDES = [
  { label: "OPT guides: rules, dates, fees and calculators", href: "/opt" },
  { label: "New OPT rules: what is in force now", href: "/new-opt-rules" },
  { label: "New H-1B rules: what is in force now", href: "/new-h1b-rules" },
  { label: "F-1 OPT and the EAD card", href: "/blog/ead-card-f1-visa-opt-complete-guide-2026" },
  { label: "How to stop the OPT clock", href: "/blog/how-to-stop-the-clock-f1-students-opt-2026" },
  { label: "Finding a job with visa sponsorship", href: "/blog/how-to-get-job-with-visa-sponsorship-2026" },
  { label: "The H-1B guide", href: "/blog/h1b-visa-complete-guide-2026" },
  { label: "EAD renewal and the ended automatic extension", href: "/blog/ead-renewal-2026-automatic-extension-ended" },
  { label: "US visa policy updates", href: "/blog/us-visa-policy-updates-2026" },
  { label: "O-1 for extraordinary ability", href: "/blog/o1-visa-extraordinary-ability-guide-2026" },
  { label: "Employment-based green card pathways", href: "/blog/green-card-employment-based-pathways-2026" },
];

export default function InternationalStudentsPage() {
  return (
    <ToolPage
      breadcrumbName="For International Students"
      canonicalPath="/for/international-students"
      badge="Built by students, for students"
      h1="The job search for international students"
      h1Accent="built around the OPT clock"
      subhead="Domestic candidates can afford a slow search. On F-1 OPT, you are counting unemployment days. Preciprocal helps you apply to fewer, better-targeted roles, track every one, and practice until the interviews you do get turn into offers."
      ctaTool="resume-tailoring"
      ctaLabel="Start free"
      ctaMicrocopy="Free plan · .edu email gets 1 month of Pro free"
      featuresTitle="What changes when you are on a visa"
      featuresSubtitle="The same tools every job seeker uses, aimed at the constraint you actually have: time."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="Why the international student job search is different"
      faqTitle="International student job search FAQ"
      faqs={FAQS}
      relatedLinks={[
        ...VISA_GUIDES.slice(0, 4),
        { label: "Job application tracker", href: "/job-application-tracker" },
        { label: "AI mock interview", href: "/ai-mock-interview" },
        { label: "Cold email generator", href: "/cold-email-generator" },
      ]}
      bottomTitle="Your clock is running. Make every application count."
      bottomBody="Tailored resumes, tracked applications, and interview practice in one place, free to start."
      bottomMicrocopy="Free plan · .edu email gets 1 month of Pro free · Cancel any time"
      body={
        <>
          <p>
            Most job search advice assumes you can take as long as you need. International students on
            F-1 OPT cannot. Initial post-completion OPT allows up to 90 days of unemployment in total,
            and a STEM extension adds 60 more. Every week spent sending generic applications into a
            portal is a week off that count.
          </p>
          <p>
            Sponsorship narrows the field further. Many employers will not sponsor at all, some will only
            for certain roles, and the H-1B lottery adds uncertainty even when they will. You end up with
            fewer viable openings than your classmates, and less time to land one of them.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">What that means in practice</h3>
            <ul className="space-y-3">
              {[
                "Start two semesters before graduation, so interviews happen before the clock starts",
                "Build a target list of employers with a sponsorship history, and add cap-exempt employers if your field has them",
                "Tailor every application, because you cannot afford to lose good roles at the ATS stage",
                "Go around the portal: a referral or a direct note to a hiring manager matters more when the pool is small",
                "Practise explaining your work authorisation in two clear sentences",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            The status conversation is worth rehearsing. Many recruiters and most hiring managers do not
            know how OPT works, and a hesitant answer makes it sound like a bigger problem than it is.
            Something like &quot;I&apos;m authorised to work now on OPT, with up to three years for STEM
            roles, and I&apos;d need H-1B sponsorship after that&quot; is accurate, short, and moves the
            conversation back to your work. Running it in a mock interview a few times makes it automatic.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Our visa and immigration guides</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {VISA_GUIDES.map((g) => (
                <li key={g.href}>
                  <a href={g.href} className="text-sm text-indigo-300 hover:text-indigo-200 underline-offset-2 hover:underline">
                    {g.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-[12px] text-slate-500 mt-4">
              Rules change. Each guide is dated, and your DSO or an immigration attorney has the final word
              on your own case.
            </p>
          </div>
        </>
      }
    />
  );
}
