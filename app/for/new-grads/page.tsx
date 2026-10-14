/**
 * app/for/new-grads/page.tsx
 *
 * Targets: "new grad job search", "entry level job search tips", "how to get
 * a job after college", "job search tools for college students".
 *
 * The audience the product was built for ("Built by students, for students")
 * had no page of its own. The .edu trial is the strongest offer on the site and
 * was only mentioned in a pricing footnote, so it leads here.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Job Search Tools for New Grads and Students",
  description:
    "Your first job search, without the guesswork: an ATS-ready resume with no experience, AI mock interviews, and a tracker for every application. .edu email gets 1 month of Pro free.",
  keywords: [
    "new grad job search",
    "entry level job search tips",
    "how to get a job after college",
    "job search tools for college students",
    "new grad resume",
    "first job out of college",
    "entry level interview prep",
  ],
  alternates: { canonical: "https://preciprocal.com/for/new-grads" },
  openGraph: {
    title: "Job Search Tools for New Grads, Free for Students to Start",
    description: "An ATS-ready resume, AI mock interviews, and a tracker for every application.",
    url: "https://preciprocal.com/for/new-grads",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v2.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Search Tools for New Grads and Students",
    description: "An ATS-ready resume, AI mock interviews, and a tracker for every application.",
  },
};

const FAQS = [
  {
    q: "How do I write a resume with no work experience?",
    a: "Treat projects, coursework, research, clubs and part-time jobs as experience, and write them the same way: what you did, how, and what came of it, with a number wherever you can. A class project that served 200 users or cut a process from hours to minutes is real evidence. Put education first while you are a student, then move it below experience once you have a full-time role.",
  },
  {
    q: "How many applications should a new grad send?",
    a: "Fewer than you think, tailored more than you think. Fifty generic applications usually produce less than fifteen tailored ones with a referral or a direct message behind some of them. Track every one so you know which kind of application is actually getting responses.",
  },
  {
    q: "When should seniors start applying for full-time jobs?",
    a: "For large tech, finance and consulting employers, the fall of senior year, because many fill new grad classes months before graduation. Smaller companies hire closer to the start date. Start your resume and interview practice over the summer so you are ready when applications open.",
  },
  {
    q: "What interview questions do new grads get asked?",
    a: "Mostly behavioural questions about projects and teamwork, plus role-specific fundamentals: coding for engineering, case questions for consulting, SQL and statistics for data roles. 'Tell me about yourself' and 'walk me through a project' come up in almost every interview. Our role pages list the common ones for over 40 roles.",
  },
  {
    q: "Is there a student discount?",
    a: "Yes. Verify your .edu email for 1 month of Pro free. A card is required to start the trial, nothing is charged for 30 days, and you can cancel any time before it ends. The free plan stays free whether or not you take the trial.",
  },
];

const FEATURES = [
  { label: "Resume analysis", description: "See how an ATS and a recruiter read your resume, with rewrites that turn coursework into evidence." },
  { label: "AI mock interviews", description: "Practise by voice with interviewers who ask follow-ups, so the first real one is not your first one." },
  { label: "Cover letters in minutes", description: "Tailored to each posting from your resume, editable before you send." },
  { label: "Application tracker", description: "Every application, contact and follow-up on one board instead of a spreadsheet." },
  { label: "LinkedIn optimizer", description: "A profile recruiters can find, which matters before you have a long work history." },
  { label: "Study planner", description: "A day-by-day prep plan that fits around classes and exams." },
];

const STEPS = [
  { step: "1", title: "Fix the resume first", body: "Upload it, see what an ATS sees, and turn projects and coursework into quantified bullets." },
  { step: "2", title: "Apply with focus", body: "Tailor each application, track it, and reach out to a person at the company where you can." },
  { step: "3", title: "Practise until it is easy", body: "Run mock interviews for your target role until the common questions stop being stressful." },
];

export default function NewGradsPage() {
  return (
    <ToolPage
      breadcrumbName="For New Grads"
      canonicalPath="/for/new-grads"
      badge="Built by students, for students"
      h1="Your first job search"
      h1Accent="without the guesswork"
      subhead="No one teaches you how hiring actually works. Preciprocal shows you how your resume is read, lets you practise interviews until they stop being scary, and keeps every application in one place."
      ctaTool="ats-checker"
      ctaLabel="Start free"
      ctaMicrocopy="Free plan · .edu email gets 1 month of Pro free"
      featuresTitle="Everything a first job search needs"
      featuresSubtitle="The tools career centres point you to, in one place, aimed at someone without years of experience."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="What new grads get wrong about the job search"
      faqTitle="New grad job search FAQ"
      faqs={FAQS}
      relatedLinks={[
        { label: "How to get your first tech job", href: "/blog/how-to-get-first-tech-job-no-experience" },
        { label: "ATS resume tips for new grads", href: "/blog/ats-resume-tips-new-grads" },
        { label: "How to answer 'tell me about yourself'", href: "/blog/how-to-answer-tell-me-about-yourself" },
        { label: "Free ATS checker", href: "/free-ats-checker" },
        { label: "Interview questions by role", href: "/interview-questions" },
        { label: "Salary guide", href: "/salary-guide" },
        { label: "For international students", href: "/for/international-students" },
      ]}
      bottomTitle="Walk into your first interview ready."
      bottomBody="Resume analysis, mock interviews, cover letters and tracking, free to start, with a month of Pro on your .edu email."
      bottomMicrocopy="Free plan · .edu email gets 1 month of Pro free · Cancel any time"
      body={
        <>
          <p>
            The first job search is hard for reasons that have little to do with ability. You are
            competing with people who have done this before, using a resume format nobody explained,
            against screening software you cannot see. Most of what goes wrong is fixable once you can
            see it.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">The common mistakes</h3>
            <ul className="space-y-3">
              {[
                "Listing duties instead of results: 'worked on a team project' says nothing, 'built the search API used by 300 students' says a lot",
                "Sending the same resume everywhere, so it matches no posting well enough to pass the ATS",
                "Applying only through portals, where a new grad application competes with hundreds of others",
                "Practising interviews in your head, which feels like preparation and is not",
                "Starting in spring when the large employers filled their new grad roles in the fall",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-rose-400 flex-shrink-0 mt-0.5">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            The biggest gap between new grads and experienced candidates is interviewing, not resumes.
            Someone with five years of experience has sat dozens of interviews. You may have sat two. The
            fix is repetition: answering &quot;tell me about yourself&quot; out loud ten times is what makes
            the eleventh one sound natural. That is what the AI mock interviews are for, and it is why
            they ask follow-up questions instead of accepting your first answer.
          </p>
          <p>
            The second gap is volume without feedback. Sending eighty applications and hearing nothing
            teaches you nothing. Tracking each one, with the version of the resume you sent, shows you
            what is working. If tailored applications with a referral get responses and cold portal
            applications do not, you know where to spend your next week.
          </p>
        </>
      }
    />
  );
}
