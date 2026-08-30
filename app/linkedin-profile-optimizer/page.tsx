/**
 * app/linkedin-profile-optimizer/page.tsx
 *
 * Targets: "LinkedIn profile optimizer", "LinkedIn optimization tool",
 * "LinkedIn headline generator", "how to optimize LinkedIn profile for recruiters".
 *
 * Competitive note: this SERP is held by Jobscan, Resume Worded and Careerflow.
 * We are not going to outrank them on the head term with a single page. The
 * winnable angle is the specific long-tail — recruiter search ranking, headline
 * keywords, Open to Work mechanics — which is what the body content targets.
 *
 * US spelling in the URL and title ("optimizer") because that is what people
 * search; the product itself is spelled "Optimiser" elsewhere in the app.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Free LinkedIn Profile Optimizer — Get Found by Recruiters",
  description:
    "Optimize your LinkedIn profile for recruiter search. Get a keyword-scored headline, About section, and experience bullets that surface you in the searches recruiters actually run.",
  keywords: [
    "LinkedIn profile optimizer",
    "LinkedIn optimization tool",
    "LinkedIn headline generator",
    "optimize LinkedIn profile for recruiters",
    "LinkedIn profile checker",
    "LinkedIn SEO",
    "LinkedIn keyword optimization",
    "how to get recruiters to find you on LinkedIn",
    "LinkedIn profile review free",
  ],
  alternates: { canonical: "https://preciprocal.com/linkedin-profile-optimizer" },
  openGraph: {
    title: "Free LinkedIn Profile Optimizer — Get Found by Recruiters",
    description:
      "Recruiters search LinkedIn by keyword. If your profile doesn't contain them, you don't exist. Fix that in 10 minutes.",
    url: "https://preciprocal.com/linkedin-profile-optimizer",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free LinkedIn Profile Optimizer",
    description: "Get found by recruiters. Keyword-scored headline, About, and experience bullets.",
  },
};

const FAQS = [
  {
    q: "How do recruiters actually find people on LinkedIn?",
    a: "Recruiters use LinkedIn Recruiter, which is a search tool, not a feed. They type in a job title, a set of skills, a location, and sometimes a seniority filter, then work down a ranked list of results. Your profile either contains those search terms or it doesn't. This is why an impressive profile with the wrong vocabulary gets no messages while a plainer profile using the exact terms recruiters search gets several a week.",
  },
  {
    q: "What is the single highest-impact part of a LinkedIn profile?",
    a: "The headline. It carries the most weight in LinkedIn's search ranking, it is the line that appears next to your name everywhere on the platform, and it is one of the few fields shown in a recruiter's search results list. A headline that just says your job title wastes the most valuable 220 characters on your profile.",
  },
  {
    q: "What should my LinkedIn headline actually say?",
    a: "Include your target role, your two or three strongest technical or domain keywords, and something that signals level or outcome. 'Software Engineer' is weak. 'Software Engineer | Python, Distributed Systems, AWS | Building payments infrastructure at scale' contains five searchable terms and reads like a person rather than a job board listing. Write it for the search query you want to appear in.",
  },
  {
    q: "Does the About section matter for search?",
    a: "Yes. LinkedIn indexes the full text of your About section, and it is one of the largest free-text fields on your profile, which makes it the best place to work in secondary keywords naturally. It also matters for conversion: once a recruiter clicks through from search results, About is usually the first thing they read. Aim for three to four short paragraphs written in first person.",
  },
  {
    q: "Should I turn on Open to Work?",
    a: "Turn it on, but use the recruiters-only setting rather than the green photo frame if you are currently employed. The recruiters-only option signals your availability inside LinkedIn Recruiter without broadcasting it to your network or your current employer. The green frame increases inbound volume but also lowers the average quality of what you receive, and it is visible to everyone.",
  },
  {
    q: "How many skills should I list?",
    a: "Fill all the available skill slots, and order them so your most important and most searched skills sit at the top. Skills are a directly searchable field with high weight in recruiter filters, and this is one of the few places where completeness genuinely helps. Get endorsements on your top three if you can, since they affect ranking among otherwise similar profiles.",
  },
  {
    q: "How is this different from just rewriting my profile myself?",
    a: "You can absolutely do this yourself, and the guidance on this page is enough to make a real difference. What the tool adds is the keyword layer: it compares your profile against the language used in current postings for your target role, scores each section, and shows you the specific terms you are missing. That gap is hard to see from the inside, because your own vocabulary feels obviously correct to you.",
  },
  {
    q: "Is the LinkedIn optimizer free?",
    a: "The free plan includes 2 LinkedIn optimisations per month with no credit card required. Pro includes more runs plus the full rewrite, and Premium includes a complete section-by-section rewrite of your entire profile.",
  },
];

const FEATURES = [
  { label: "Headline scoring", description: "Keyword density and readability on the field that carries the most search weight." },
  { label: "About section rewrite", description: "Three to four paragraphs that read like a person and index like a keyword field." },
  { label: "Experience bullets", description: "Reframed for impact and quantification, not job-description restatement." },
  { label: "Skills gap analysis", description: "The exact skills recruiters filter on for your target role that you're missing." },
  { label: "Recruiter search simulation", description: "See which searches your profile would surface in, and which it wouldn't." },
  { label: "Profile completeness", description: "The fields LinkedIn weights that most people leave empty." },
];

const STEPS = [
  { step: "1", title: "Connect your profile", body: "Paste your LinkedIn URL or upload a PDF export of your profile. No password, no account access." },
  { step: "2", title: "Set your target role", body: "Tell us the role you want next. Everything is scored against the language used in current postings for it." },
  { step: "3", title: "Apply the rewrites", body: "Get a scored breakdown per section with specific replacement text you can paste straight into LinkedIn." },
];

export default function LinkedInProfileOptimizerPage() {
  return (
    <ToolPage
      breadcrumbName="LinkedIn Profile Optimizer"
      canonicalPath="/linkedin-profile-optimizer"
      badge="Free — 2 optimisations per month"
      h1="Free LinkedIn profile optimizer"
      h1Accent="get found by recruiters"
      subhead="Recruiters don't browse LinkedIn, they search it. If your profile doesn't contain the terms they type, you never appear. Fix the headline, About, and skills that decide whether you show up."
      ctaTool="linkedin-optimizer"
      ctaLabel="Optimise my profile free"
      ctaMicrocopy="2 free optimisations/month · No password required"
      featuresTitle="What the LinkedIn optimizer analyses"
      featuresSubtitle="Six sections, scored against the language recruiters actually search for your target role."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="Why good LinkedIn profiles get no recruiter messages"
      faqTitle="LinkedIn optimization FAQ"
      faqs={FAQS}
      relatedLinks={[
        { label: "LinkedIn profile that gets recruiter messages", href: "/blog/linkedin-profile-that-gets-recruiter-messages" },
        { label: "Networking for introverts", href: "/blog/networking-for-introverts-get-referrals-2026" },
        { label: "Free ATS resume checker", href: "/free-ats-checker" },
        { label: "Resume tailoring", href: "/resume-tailoring" },
        { label: "Recruiter contact finder", href: "/recruiter-contact-finder" },
        { label: "Software engineer interview questions", href: "/interview-questions/software-engineer" },
      ]}
      bottomTitle="Get found by the recruiters already searching."
      bottomBody="Your next role is probably being filled by someone who showed up in a search you weren't in."
      bottomMicrocopy="2 free optimisations per month · No credit card · Results in under 5 minutes"
      body={
        <>
          <p>
            Most LinkedIn advice treats your profile like a personal brand statement. That framing
            is why so many polished profiles generate no inbound interest at all. LinkedIn is not a
            portfolio that recruiters admire, it is a{" "}
            <strong className="text-white">database that recruiters query</strong>.
          </p>
          <p>
            The tool they use is LinkedIn Recruiter, and it works like a search engine. A recruiter
            filling a backend role types something like <em>backend engineer Python Kubernetes</em>,
            adds a location and a seniority filter, and gets a ranked list. They contact people from
            the top of that list downward until the role is filled. They rarely reach page three.
          </p>
          <p>
            This produces the most common and most frustrating outcome in a job search: a genuinely
            strong candidate with an attractive, well-written profile receives nothing, because the
            profile describes their work in their company&apos;s internal vocabulary rather than the
            market&apos;s. If your team called it &quot;the ingestion service&quot; and the market calls it
            &quot;distributed data pipelines,&quot; you are invisible to every recruiter searching the
            second phrase.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">The 5 fields that decide whether you appear</h3>
            <ul className="space-y-3">
              {[
                "Headline — highest search weight, and one of the few fields visible in recruiter results",
                "Job titles — searched literally, so an internal title like 'Ninja' costs you every query",
                "Skills — a directly filterable field; leaving slots empty removes you from those filters",
                "About — the largest free-text field you control, fully indexed",
                "Experience descriptions — indexed, and where your keywords earn their credibility",
              ].map((field, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-indigo-400 flex-shrink-0 mt-0.5">→</span>
                  <span>{field}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            There is a second-order effect worth understanding. Appearing in the search is necessary
            but not sufficient — once a recruiter clicks through, your profile has to survive about
            fifteen seconds of scanning. That means the headline and the first two lines of your
            About section carry disproportionate weight, and your experience bullets need to show
            outcomes rather than restate your job description.
          </p>
          <p>
            The two problems pull in opposite directions. Keyword coverage pushes you toward stuffing
            terms; readability pushes you toward clean prose. The profiles that work resolve this by
            putting keywords inside sentences that describe real results, which is exactly what the
            optimizer scores for: coverage of the terms recruiters search, without the robotic
            keyword-list phrasing that makes a human close the tab.
          </p>
          <p>
            If you would rather do this by hand, our full walkthrough is in{" "}
            <strong className="text-white">
              the LinkedIn profile that gets recruiter messages
            </strong>{" "}
            on the blog. The tool exists mainly to close the gap you cannot see from the inside:
            which specific terms the market uses for the work you already do.
          </p>
        </>
      }
    />
  );
}
