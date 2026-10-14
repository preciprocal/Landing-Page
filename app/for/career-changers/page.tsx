/**
 * app/for/career-changers/page.tsx
 *
 * Targets: "career change resume", "how to change careers", "career change
 * interview questions", "transferable skills resume".
 *
 * Career changers are the audience for whom generic tailoring fails worst: the
 * old job titles do not match the new keywords, so the ATS screens them out
 * even when the skills transfer. The page is built around translating
 * experience, which is what resume tailoring and mock interviews actually do.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Career Change Job Search: Resume to Interview",
  description:
    "Changing careers? Translate your experience into the language of the new field, get past ATS filters built for linear careers, and practise the 'why the switch?' question until it is your strongest answer.",
  keywords: [
    "career change resume",
    "how to change careers",
    "career change interview questions",
    "transferable skills resume",
    "career change at 30",
    "switching careers job search",
    "why are you changing careers answer",
  ],
  alternates: { canonical: "https://preciprocal.com/for/career-changers" },
  openGraph: {
    title: "The Career Change Job Search, From Resume to Interview",
    description: "Translate your experience, get past the ATS, and make 'why the switch?' your best answer.",
    url: "https://preciprocal.com/for/career-changers",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v2.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Change Job Search: Resume to Interview",
    description: "Translate your experience and make 'why the switch?' your best answer.",
  },
};

const FAQS = [
  {
    q: "How do I write a resume for a career change?",
    a: "Lead with the skills the new role needs, then prove each one with something from your past work, described in the new field's vocabulary. A teacher moving into instructional design 'designed and evaluated curricula for 120 learners', which is the same work described in the terms the new hiring manager uses. A short summary at the top that states the target role helps a recruiter see the connection in seconds.",
  },
  {
    q: "How do I answer 'why are you changing careers?'",
    a: "Make it about moving towards something, not away from something. Name what drew you to the new field, show you have already acted on it with a course, project or certification, then connect one strength from your old career to the new role. Keep it under a minute. It is the question you are most certain to be asked, so it should be the answer you have practised most.",
  },
  {
    q: "Will an ATS reject my resume if my job titles do not match?",
    a: "It can lower your match score, because many systems weight titles and keywords from the posting. You cannot change your past titles, but you can make sure the skills and terms from the posting appear in your bullets and summary where they are honestly true. That is what tailoring to each posting is for.",
  },
  {
    q: "Do I need a new degree to change careers?",
    a: "Often not. For many moves, a portfolio of two or three real projects, a recognised certification, or a stepping-stone role inside your current company carries more weight than a second degree. Look at the profiles of people already in the role you want and see what they actually have.",
  },
  {
    q: "Is it too late to change careers?",
    a: "Rarely. Your previous experience is an advantage once it is translated: you have handled stakeholders, deadlines and problems that new grads have not. The real cost is the search itself, which tends to take longer than a move within your field, so plan for that.",
  },
];

const FEATURES = [
  { label: "Resume tailoring", description: "Rewrites your bullets against each posting so the skills that transfer read like they belong." },
  { label: "ATS match scoring", description: "See which of the posting's keywords your resume is missing before a filter decides for you." },
  { label: "The 'why the switch?' rehearsal", description: "AI mock interviews that push on your story with follow-ups until it holds up." },
  { label: "Cover letters that explain the move", description: "The one place you get to tell the story in full, written for each role." },
  { label: "Warm outreach", description: "Find people in the new field and draft short messages, since referrals matter most when your resume is unusual." },
  { label: "A study plan for the gaps", description: "Day-by-day prep for the skills and interview formats that are new to you." },
];

const STEPS = [
  { step: "1", title: "Translate your experience", body: "Rewrite your past work in the new field's terms, for each posting you apply to." },
  { step: "2", title: "Get in through people", body: "Unusual resumes do better with a referral. Find contacts and reach out before you apply." },
  { step: "3", title: "Own the story", body: "Practise 'why the switch?' until it is the strongest answer you give." },
];

export default function CareerChangersPage() {
  return (
    <ToolPage
      breadcrumbName="For Career Changers"
      canonicalPath="/for/career-changers"
      badge="For career changers"
      h1="Changing careers?"
      h1Accent="Make your experience translate"
      subhead="Your skills transfer. Your job titles do not, and screening software was built for linear careers. Preciprocal helps you rewrite your experience for the new field and practise the story until hiring managers see the fit too."
      ctaTool="resume-tailoring"
      ctaLabel="Start free"
      ctaMicrocopy="Free plan · No credit card"
      featuresTitle="Built for the non-linear resume"
      featuresSubtitle="Each tool aimed at the gap between what you have done and how the new field describes it."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="Why career changers get filtered out, and how to stop it"
      faqTitle="Career change FAQ"
      faqs={FAQS}
      relatedLinks={[
        { label: "Resume tailoring", href: "/resume-tailoring" },
        { label: "Free ATS checker", href: "/free-ats-checker" },
        { label: "Resume keywords that get past ATS", href: "/blog/resume-keywords-that-get-past-ats" },
        { label: "Networking for introverts", href: "/blog/networking-for-introverts-get-referrals-2026" },
        { label: "Why are you looking for a new job?", href: "/blog/how-to-answer-why-are-you-looking-for-new-job" },
        { label: "Resume tips by role", href: "/resume-tips" },
        { label: "Salary guide", href: "/salary-guide" },
      ]}
      bottomTitle="Your experience counts. Make it read that way."
      bottomBody="Tailored resumes, interview practice, and outreach for the field you are moving into, free to start."
      bottomMicrocopy="Free plan · No credit card · Every draft editable"
      body={
        <>
          <p>
            A career change fails at two points, and they are different problems. The first is the
            screen: an ATS or a recruiter with six seconds sees job titles from another field and moves on.
            The second is the interview: you get in, then cannot explain the move convincingly enough to
            beat a candidate with a straight-line history.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Translating, not inventing</h3>
            <ul className="space-y-3 text-sm">
              {[
                ["Retail store manager → operations", "'Ran a store' becomes 'managed a $2M P&L, scheduling for 18 staff, and inventory forecasting'"],
                ["Teacher → instructional design", "'Taught 9th grade' becomes 'designed, delivered and evaluated curricula for 120 learners a year'"],
                ["Accountant → data analyst", "'Prepared reports' becomes 'built the monthly variance model in SQL and Excel used by finance leadership'"],
              ].map(([move, line]) => (
                <li key={move}>
                  <p className="text-slate-200 font-medium">{move}</p>
                  <p className="text-slate-400">{line}</p>
                </li>
              ))}
            </ul>
          </div>

          <p>
            Every one of those rewrites is the same work, described in the vocabulary the new hiring manager
            searches for. That is the whole job of a career change resume, and it has to be done against
            each posting, because each one uses slightly different terms. Doing it by hand for every
            application is what makes career change searches so slow.
          </p>
          <p>
            The interview problem is the &quot;why the switch?&quot; question, and the mistake is treating
            it as a defence. The strongest answers are short and forward-looking: what drew you in, the
            concrete step you have already taken, and the strength you are bringing from your old career
            that a conventional candidate does not have. Rehearsing it against an interviewer who asks
            follow-ups is how it stops sounding rehearsed.
          </p>
        </>
      }
    />
  );
}
