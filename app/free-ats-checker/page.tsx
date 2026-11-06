/**
 * app/free-ats-checker/page.tsx
 *
 * Targets: "free ATS checker", "ATS resume checker", "ATS score checker",
 * "ATS resume scanner", "check resume ATS score".
 *
 * The highest-volume tool query the site targets, and until now the page had
 * no tool on it: every button went to sign-up, while the copy said "no
 * sign-up required". It now runs a real check in the page (see
 * components/ResumeAtsChecker.tsx), using the same analysis as the app, and
 * works as a hook: the score and the first fixes are free and immediate, the
 * rest unlock with a free account, which the app opens on resume analysis.
 *
 * Copy rules: describe only what the analysis actually does (five
 * dimensions, weighted; see lib/resumeCheck/analysis.ts), no statistics
 * without a source, no em dashes.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import ResumeAtsChecker from "@/components/ResumeAtsChecker";

export const metadata: Metadata = {
  title: "Free ATS Resume Checker: Score Your Resume Now",
  description:
    "Upload your resume and get a free ATS score out of 100, scored across ATS compatibility, content, skills, structure and tone, with your top fixes and rewrites. No sign-up to see your score.",
  keywords: [
    "free ATS checker",
    "ATS resume checker",
    "ATS score checker",
    "ATS resume scanner",
    "resume ATS compatibility",
    "check resume ATS score",
    "applicant tracking system checker",
    "resume keyword checker",
    "free resume scanner",
  ],
  alternates: { canonical: "https://preciprocal.com/free-ats-checker" },
  openGraph: {
    title: "Free ATS Resume Checker: See Your Score and Top Fixes",
    description:
      "Upload your resume, get an honest ATS score out of 100 and the fixes that matter most. No sign-up to see your score.",
    url: "https://preciprocal.com/free-ats-checker",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v2.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ATS Resume Checker",
    description: "Upload your resume, get an honest ATS score and your top fixes. No sign-up to see your score.",
  },
};

const FAQS = [
  {
    q: "What is an ATS (applicant tracking system)?",
    a: "An ATS is the software employers use to collect applications and manage hiring. It reads your resume into structured fields such as your name, contact details, job history and skills, and recruiters search and filter candidates through it. Platforms you will run into include Workday, Greenhouse, Lever, iCIMS and Taleo. If the system cannot read your resume cleanly, or it does not carry the terms a recruiter searches for, a qualified application can be missed.",
  },
  {
    q: "How is my score calculated?",
    a: "Your resume is reviewed across five dimensions, each scored from 0 to 100: content and impact (30% of the overall score), ATS compatibility (25%), skills (20%), structure (15%), and tone and style (10%). The overall score is the weighted total. Each dimension is reviewed separately, with feedback that points at specific lines in your resume rather than generic advice.",
  },
  {
    q: "What is a good ATS resume score?",
    a: "The scoring is deliberately strict. 90 to 100 is the top 5% of resumes, 70 to 89 is above average, 50 to 69 is where most resumes land, 30 to 49 is weak, and below 30 is at risk of rejection. A 55 is a normal first score. The point of the score is to show you what to fix, so an honest 55 is more useful than an inflated 80.",
  },
  {
    q: "Is the ATS checker really free?",
    a: "Yes. You can upload your resume and see your overall score, all five dimension scores and your top fixes without creating an account. To see every fix and your full report, create a free Preciprocal account. The free plan includes 3 resume analyses a month and needs no credit card.",
  },
  {
    q: "Does adding a job description change my score?",
    a: "Yes, and it is the best way to use the checker. With a job description, the ATS and skills reviews measure your resume against the terms and requirements of that posting, so the score and the fixes are specific to the job you are applying for. Without one, your resume is scored on its general strength.",
  },
  {
    q: "What file formats can I upload?",
    a: "PDF and Word (.docx), up to 4 MB. If your PDF was made from a scan or a photo, export a text-based PDF from your editor instead, because image-only files are harder for any ATS to read.",
  },
  {
    q: "Is my resume stored?",
    a: "The file is not. Your resume is sent to our AI model provider to be scored and is not saved by Preciprocal. The result you see is kept for 30 days, so it is still there when you come back, and then deleted. Each visitor gets one free check. If you create an account and upload your resume there, it is saved to your account so you can track your score as you edit.",
  },
  {
    q: "How do I improve my ATS score?",
    a: "Start with the fixes the checker gives you, highest weight first. In general: use a clean single-column layout with standard section headings such as Experience, Education and Skills; mirror the exact terms from the job description where they are true for you; rewrite duty-based bullets into results with numbers; and keep dates and contact details in plain text rather than in headers, tables or text boxes.",
  },
];

const FEATURES = [
  { label: "ATS compatibility", description: "Whether an ATS can read your layout, headings, dates and contact details, and whether you carry the keywords the role needs." },
  { label: "Content and impact", description: "The substance of your experience: measurable results, specificity and relevance to the role." },
  { label: "Skills", description: "Which skills you show, how well your experience backs them, and the gaps against the role." },
  { label: "Structure", description: "Section order, length and how quickly a recruiter can scan the page." },
  { label: "Tone and style", description: "Action verbs, consistent tense and formatting, and filler or buzzwords." },
  { label: "Copy-ready rewrites", description: "Fixes come with the rewritten text, so you can paste the improvement straight into your resume." },
];

const STEPS = [
  { step: "1", title: "Upload your resume", body: "PDF or Word. Add your target role and the job description for a score measured against that posting." },
  { step: "2", title: "Get your score", body: "In about 30 seconds, see your overall score and all five dimension scores, plus what is already working." },
  { step: "3", title: "Fix what matters most", body: "Your top fixes come first, with rewrites. Create a free account to unlock every fix and your full report." },
];

export default function FreeATSCheckerPage() {
  return (
    <ToolPage
      breadcrumbName="Free ATS Checker"
      canonicalPath="/free-ats-checker"
      badge="Free, no sign-up to see your score"
      h1="Free ATS resume checker"
      h1Accent="your score and top fixes"
      subhead="Upload your resume and get an honest score out of 100 across five dimensions, with the fixes that will move it most and the rewrites to paste in. Scored the way recruiters read, not padded to make you feel good."
      ctaTool="ats-checker"
      ctaLabel="Get the full report free"
      ctaMicrocopy="Free account · 3 resume analyses a month · No credit card"
      tool={<ResumeAtsChecker />}
      featuresTitle="What the checker reviews"
      featuresSubtitle="Five dimensions, each reviewed separately and weighted into one score, with fixes tied to specific lines of your resume."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="How an ATS reads your resume, and how to pass it"
      faqTitle="ATS checker FAQ"
      faqs={FAQS}
      relatedLinks={[
        { label: "Resume tips by role", href: "/resume-tips" },
        { label: "Resume tailoring", href: "/resume-tailoring" },
        { label: "Cover letter examples", href: "/cover-letter-examples" },
        { label: "Interview question predictor", href: "/interview-question-predictor" },
        { label: "AI mock interview", href: "/ai-mock-interview" },
        { label: "Salary guides", href: "/salary-guide" },
      ]}
      bottomTitle="Your score is the start. The full report is the plan."
      bottomBody="Create a free account to see every fix, save your report and re-check as you edit. It opens straight to resume analysis."
      bottomMicrocopy="Free plan · 3 resume analyses a month · No credit card"
      body={
        <>
          <p>
            An <strong className="text-white">applicant tracking system (ATS)</strong> is the software employers use to
            receive applications and run their hiring. When you apply online, the ATS reads your resume into structured
            fields: your name and contact details, your job history, your education and your skills. Recruiters then
            search and filter candidates through those fields.
          </p>
          <p>
            Two things go wrong. Either the ATS cannot read your resume cleanly, so your experience lands in the wrong
            fields or not at all, or it reads fine but does not carry the terms the recruiter searches for. Either way, a
            qualified application can go unseen. The fix is rarely more experience. It is usually layout, wording and
            matching the language of the job.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">What most often trips up an ATS</h3>
            <ul className="space-y-3">
              {[
                "Missing the exact terms from the job description, even when you have the skill",
                "Multi-column layouts, which some parsers read across the columns and scramble",
                "Contact details or dates placed in headers, footers, tables or text boxes",
                "Non-standard section names, such as Career Journey instead of Experience",
                "Image-only PDFs exported from a scan, which have no text for the parser to read",
              ].map((reason, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-rose-400 flex-shrink-0 mt-0.5">✕</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            Passing the ATS only gets you read. What gets you the interview is content: bullets that show results with
            numbers, skills your experience actually backs up, and a page a recruiter can scan quickly. That is why the
            checker scores content and impact more heavily than any other dimension, and why every fix points at a
            specific line rather than giving general advice.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Before you upload</h3>
            <ul className="space-y-3">
              {[
                "Use a text-based PDF or a Word file, not a scan or a photo",
                "Paste the job description you are applying to, so the score is specific to it",
                "Check one resume per role: a resume tailored to the posting scores very differently from a generic one",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      }
    />
  );
}
