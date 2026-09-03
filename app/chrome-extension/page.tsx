/**
 * app/chrome-extension/page.tsx
 *
 * Targets: "job search chrome extension", "save jobs from LinkedIn",
 * "job application chrome extension", "linkedin job tracker extension".
 *
 * Also serves a non-SEO purpose: extension listings need a homepage URL, and
 * people who find the extension in the Chrome Web Store land somewhere real.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: { absolute: "Job Search Chrome Extension: Save Jobs in 1 Click" },
  description:
    "Save any job from LinkedIn or any job board with one click. The full job description imports automatically, ready for resume tailoring and application tracking.",
  keywords: [
    "job search chrome extension",
    "save jobs from LinkedIn",
    "job application chrome extension",
    "linkedin job tracker extension",
    "job board chrome extension",
    "one click job save",
    "job description importer",
    "chrome extension for job seekers",
  ],
  alternates: { canonical: "https://preciprocal.com/chrome-extension" },
  openGraph: {
    title: "Preciprocal Chrome Extension, Save Jobs From LinkedIn in One Click",
    description:
      "One click to save a job with its full description, ready to tailor against and track.",
    url: "https://preciprocal.com/chrome-extension",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preciprocal Chrome Extension",
    description: "Save jobs from LinkedIn and any job board in one click.",
  },
};

const FAQS = [
  {
    q: "Which job boards does the extension work on?",
    a: "LinkedIn, Indeed, Greenhouse, Lever, Workday, and most standard job board layouts. Where a site uses an unusual structure the extension falls back to capturing the page text, so you still get the description saved even if the structured fields do not parse cleanly.",
  },
  {
    q: "What exactly does it save?",
    a: "The job title, company, location, posting URL, and the complete job description text. The description is the part that matters most: postings get taken down, and you will want the exact text you applied against when you are preparing for the interview six weeks later.",
  },
  {
    q: "Why not just bookmark jobs?",
    a: "A bookmark saves a URL that will eventually 404, with no description, no stage tracking, and no follow-up reminder. It also does not feed anything downstream. A saved job flows straight into resume tailoring and your application pipeline, which is where its actual value is.",
  },
  {
    q: "Does it apply to jobs automatically?",
    a: "No, and deliberately so. Auto-apply tools produce untailored applications at volume, which is precisely the behaviour that performs worst in a competitive market. The extension removes the data entry from saving and tracking, not the judgement from applying.",
  },
  {
    q: "What permissions does it need?",
    a: "It reads the content of job pages you explicitly click the button on. It does not read your browsing history, does not run on pages you have not activated it on, and does not access your email or LinkedIn credentials.",
  },
  {
    q: "Is the extension free?",
    a: "Yes, and it works with the free plan. Saved jobs count against your tracker limit, which is 10 jobs on the free tier and unlimited on Pro.",
  },
];

const FEATURES = [
  { label: "One-click save", description: "A button on the posting itself. No copying, no tab switching, no forms." },
  { label: "Full description capture", description: "The complete posting text, kept after the listing comes down." },
  { label: "Auto-fill company and title", description: "Structured fields parsed from the page, not typed by you." },
  { label: "Straight into tailoring", description: "The saved description feeds resume tailoring without a paste step." },
  { label: "Duplicate detection", description: "Warns you if you've already applied to this role at this company." },
  { label: "Works across boards", description: "LinkedIn, Indeed, Greenhouse, Lever, Workday, and most standard layouts." },
];

const STEPS = [
  { step: "1", title: "Install the extension", body: "Add it from the Chrome Web Store and sign in with your Preciprocal account." },
  { step: "2", title: "Click save on any posting", body: "The button appears on job pages. Title, company, and full description import automatically." },
  { step: "3", title: "Tailor and track", body: "The saved job is ready to tailor your resume against, and already in your application pipeline." },
];

export default function ChromeExtensionPage() {
  return (
    <ToolPage
      breadcrumbName="Chrome Extension"
      canonicalPath="/chrome-extension"
      badge="Free, works with the free plan"
      h1="Preciprocal Chrome extension"
      h1Accent="save any job in one click"
      subhead="The reason people abandon their job tracking spreadsheet is data entry. Save a job from LinkedIn or any board with one click, full description included, ready to tailor against."
      ctaTool="chrome-extension"
      ctaLabel="Get the extension free"
      ctaMicrocopy="Free · Works with the free plan · No credit card"
      featuresTitle="What the extension does"
      featuresSubtitle="Removes the manual step between finding a job and having it in your pipeline."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="Why saving jobs properly matters more than it sounds"
      faqTitle="Chrome extension FAQ"
      faqs={FAQS}
      relatedLinks={[
        { label: "Job application tracker", href: "/job-application-tracker" },
        { label: "Resume tailoring", href: "/resume-tailoring" },
        { label: "Free ATS resume checker", href: "/free-ats-checker" },
        { label: "Cover letter generator", href: "/cover-letter-generator" },
        { label: "How to get a job in today's market", href: "/blog/how-to-get-a-job-in-todays-market-2026" },
        { label: "Recruiter contact finder", href: "/recruiter-contact-finder" },
      ]}
      bottomTitle="One click instead of five minutes."
      bottomBody="Tracking only survives a real job search if it costs almost nothing per application."
      bottomMicrocopy="Free · Works with the free plan · Install in under a minute"
      body={
        <>
          <p>
            This sounds like the least important tool on the list, and in terms of what it does it
            probably is. But it is the one that determines whether the rest of the system gets used
            at all, because it removes the friction at the exact point where job searches fall
            apart.
          </p>
          <p>
            Consider what saving a job manually involves: open the posting, copy the title, copy the
            company, copy the URL, select the entire description and copy it, switch to your
            tracker, paste four fields, set a status. Call it three to five minutes. At twenty
            applications a week that is over an hour of pure clerical work, and it is the first
            thing to go when you are busy, which is why{" "}
            <strong className="text-white">
              almost every job search spreadsheet dies around week three
            </strong>
            .
          </p>
          <p>
            The description capture is the part people underrate. Job postings are taken down as
            soon as the role is filled or the requisition is closed, frequently while you are still
            in the process. When you are preparing for an onsite six weeks after applying and want
            to reread exactly what they asked for, the link is dead and your memory of it is
            approximate. The saved text is the only copy that still exists.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">What the saved description feeds</h3>
            <ul className="space-y-3">
              {[
                "Resume tailoring, the keyword match runs against this exact text",
                "Cover letter generation, specifics from the posting, not generic enthusiasm",
                "Interview prep, the requirements you're about to be questioned on",
                "Duplicate detection, a warning before you apply to the same role twice",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-indigo-400 flex-shrink-0 mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            One deliberate omission: the extension does not apply to jobs for you. Auto-apply tools
            exist and they are popular, but they optimise for the wrong thing. Sending two hundred
            untailored applications performs measurably worse than twenty tailored ones, and it
            performs worse in a way that is invisible to the sender, because you never learn which
            applications were discarded in the first pass.
          </p>
          <p>
            What is worth automating is the clerical work: capturing, organising, remembering,
            reminding. What is not worth automating is the judgement about which roles to pursue and
            how to present yourself for them. The extension sits firmly on the first side of that
            line.
          </p>
        </>
      }
    />
  );
}
