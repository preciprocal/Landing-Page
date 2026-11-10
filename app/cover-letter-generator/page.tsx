/**
 * app/cover-letter-generator/page.tsx
 *
 * ANCHOR FEATURE PAGE #2 - second highest priority after /ai-mock-interview
 *
 * Target keywords:
 *   Primary:   "AI cover letter generator" (~12,000/mo)
 *              "cover letter generator free" (~8,100/mo)
 *   Secondary: "cover letter generator for students" (high intent, low comp)
 *              "AI cover letter writer" (~6,600/mo)
 *              "cover letter generator no experience"
 *              "free cover letter generator for new grads"
 *              "cover letter for internship generator"
 *
 * Layout (accent amber): ProductHero, then a short flow on the shared page
 * kit (components/page): how it works, what you get, the FAQ with answers
 * closed, the longer detail (what is different, who it is for) folded into
 * Fold panels with the related links beneath, and the closing CTA.
 *
 * File path: app/cover-letter-generator/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";
import Chevron from "@/components/Chevron";
import { PAD, INNER, SECTION, BTN_PRIMARY, BTN_SECONDARY, ACCENT_TEXT, Eyebrow, SectionHead, CtaPanel, Fold, pad2, FaqSection } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";
import ProductHero from "@/components/ProductHero";

export const metadata: Metadata = {
  title: "AI Cover Letter Generator: Free, in 60 Seconds",
  description:
    "Generate a tailored cover letter in 60 seconds. Our AI researches the company, matches your resume to the job, and writes a letter that sounds like you. Free to start. Built for students and new grads.",
  keywords: [
    "AI cover letter generator",
    "cover letter generator free",
    "cover letter generator for students",
    "AI cover letter writer",
    "cover letter generator no experience",
    "free cover letter generator for new grads",
    "cover letter for internship generator",
    "automatic cover letter writer",
    "cover letter maker",
    "cover letter builder free",
    "AI job application letter",
    "personalised cover letter generator",
  ],
  alternates: {
    canonical: "https://preciprocal.com/cover-letter-generator",
  },
  openGraph: {
    title: "AI Cover Letter Generator: Free, Personalised, Done in 60 Seconds",
    description:
      "AI cover letter generator that researches the company and matches your resume to the job. Free to start. Built for students and new grads.",
    url: "https://preciprocal.com/cover-letter-generator",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v3.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Cover Letter Generator | Preciprocal",
    description:
      "Generate a tailored cover letter in 60 seconds. AI researches the company and matches your resume to the job. Free to start.",
  },
};

const FAQS = [
  {
    q: "How does the AI cover letter generator work?",
    a: "You paste a job description and the AI does three things automatically: (1) it researches the company in real time to pull in specific details about their products, culture, and recent news, (2) it analyses the job requirements against your resume to find your strongest matching points, and (3) it writes a personalised letter that connects your specific experience to their specific needs. The whole process takes under 60 seconds.",
  },
  {
    q: "Will my cover letter sound like it was written by AI?",
    a: "The AI is trained to write in a direct, professional tone that avoids the markers of generic AI writing: no phrases like 'I am writing to express my interest,' no filler sentences, no hollow enthusiasm. The letter opens with a specific hook, references real details about the company, and connects your experience to their exact requirements. You can edit any part of it before sending.",
  },
  {
    q: "Does it work if I have no work experience?",
    a: "Yes, and this is where it helps the most. For new grads and students, the AI knows how to frame projects, internships, coursework, and transferable skills in a way that reads as relevant rather than inexperienced. It understands entry-level positioning and won't write a letter that sounds like it expects you to have 5 years of experience.",
  },
  {
    q: "Can I generate a cover letter for an internship?",
    a: "Yes. Internship cover letters have different requirements than full-time ones: they lean more heavily on coursework, projects, and enthusiasm for learning. The AI detects when you're applying for an internship and adjusts the tone, framing, and content accordingly.",
  },
  {
    q: "How many cover letters can I generate for free?",
    a: "The free plan includes 5 cover letters per month, no credit card required. Pro ($9.99/mo) includes 30 cover letters a month. Students with a .edu email get 1 month of Pro free.",
  },
  {
    q: "Can I customise the output?",
    a: "Yes. Every generated cover letter is fully editable. You can adjust the tone, swap out examples, add specific details, or rewrite sections entirely. The AI gives you a strong first draft; you make it yours.",
  },
  {
    q: "Does it work for non-tech jobs?",
    a: "Yes. The generator works for any role: software engineering, finance, consulting, marketing, HR, healthcare, legal, and more. It reads the job description to understand the role and industry, then writes accordingly. The same tool that writes a cover letter for a software engineer role writes a different letter for a management consulting application.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Paste the job description",
    description: "Drop in the full job posting. The AI reads the role requirements, preferred qualifications, company name, and any specific language the employer uses. This takes 10 seconds.",
  },
  {
    number: "02",
    title: "The AI researches and writes",
    description: "While you wait, the AI looks up the company in real time, identifies your strongest resume matches for this specific role, and writes a personalised letter. No generic templates. No 'I am writing to express my interest.'",
  },
  {
    number: "03",
    title: "Edit, download, and send",
    description: "Your cover letter arrives fully editable. Adjust any section, swap in a specific detail, or change the tone. Export as PDF or Word. The whole process from paste to send takes under 2 minutes.",
  },
];

const WHAT_MAKES_IT_DIFFERENT = [
  {
    title: "It actually researches the company",
    body: "Generic cover letter tools fill in your name and the job title and call it personalised. Preciprocal's AI looks up the company in real time and pulls in specific details: recent product launches, company values, what they're known for. The letter references things a human would only know if they'd done their homework.",
  },
  {
    title: "It matches your resume to the job",
    body: "The AI analyses the job description requirements against your actual resume and identifies your strongest matching points. It leads with the most relevant experience, not just your most recent one. If your second job is more relevant than your current one for this role, the letter reflects that.",
  },
  {
    title: "Built for students with no work history",
    body: "Most cover letter generators assume you have 3-5 years of professional experience to reference. Preciprocal understands entry-level positioning: how to write about projects, internships, coursework, and transferable skills in a way that reads as capability, not inexperience.",
  },
  {
    title: "Part of a complete career prep platform",
    body: "Your cover letter doesn't exist in isolation. After generating it, your application gets tracked automatically in your job tracker. The job description feeds into your resume ATS check. Your interview prep gets queued for this company. Everything connects.",
  },
];

export default function CoverLetterGeneratorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div data-accent="amber" className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Cover Letter Generator", url: "https://preciprocal.com/cover-letter-generator" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main>
        {/* H1 */}
        <ProductHero
          chapter="cover-letter"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Cover Letter Generator" }]}
          title="AI Cover Letter Generator: "
          accent="Personalised. Done in 60 Seconds."
          subhead={
            <>
              <p>
                Stop staring at a blank page. Paste a job description and our AI researches the company,
                matches your resume to the role, and writes a cover letter that sounds like you, not a
                template. Built for students and new grads who are applying to multiple roles at once.
              </p>
              <p className="mt-4">
                Free to start. No credit card. <strong className="font-semibold text-slate-200">5 cover letters per month on the free plan.</strong>
              </p>
            </>
          }
          ctaHref={`${APP_URL}/sign-up`}
          ctaLabel="Generate your cover letter free"
          secondary={{ href: "/pricing", label: "See all plans" }}
        />

        {/* How it works: three connected stages */}
        <section id="how-it-works" aria-label="How the cover letter generator works" className={`scroll-mt-24 ${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead align="center" className="mb-14" eyebrow="Three steps" title="How it works" />
            </Reveal>
            <RevealGroup as="ol" className="relative grid gap-12 md:grid-cols-3 md:gap-10">
              <span
                aria-hidden="true"
                className="absolute left-[16.7%] right-[16.7%] top-6 hidden h-px bg-gradient-to-r from-accent/50 via-white/[0.12] to-accent/50 md:block"
              />
              {STEPS.map((step, i) => (
                <RevealItem as="li" key={step.number} className="relative text-center">
                  <span className="relative mx-auto grid h-12 w-12 place-items-center rounded-full border border-accent/40 bg-[#050810] text-[15px] font-bold text-accent-soft">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-slate-400">{step.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* What you get: the numbers at a glance */}
        <section aria-label="At a glance" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead align="center" className="mb-12" eyebrow="What you get" title="At a glance" />
            </Reveal>
            <dl className="grid grid-cols-2 gap-x-10 gap-y-8 lg:grid-cols-4">
              {[
                { stat: "60s",        label: "average time to generate" },
                { stat: "5/mo",       label: "free cover letters, no card" },
                { stat: "30/mo",      label: "on Pro at $9.99/mo" },
                { stat: "Any role",   label: "tech, finance, consulting + more" },
              ].map(({ stat, label }) => (
                <div key={stat} className="flex flex-col-reverse border-t border-white/[0.08] pt-5 text-center">
                  <dt className="mt-1 text-[13px] text-slate-400">{label}</dt>
                  <dd className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${ACCENT_TEXT}`}>{stat}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* FAQ: questions closed */}
        <FaqSection items={FAQS} sectionProps={{ "aria-label": "Cover letter generator FAQ" }} />

        {/* The longer detail, folded: what is different, who it is for. Kept in
            the HTML (search engines index collapsed panels), but out of the way
            of a reader who came to write a letter. */}
        <section aria-label="More about the cover letter generator" className={`border-t border-white/[0.05] py-16 ${PAD}`}>
          <div className={`${INNER} space-y-4`}>
            <Fold eyebrow="What is different" title="Why this is different from other cover letter generators">
              <p className="mb-8 max-w-3xl text-[15px] leading-relaxed text-slate-400">
                Most generators fill in a template with your name and job title. Here is what Preciprocal actually does differently.
              </p>
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {WHAT_MAKES_IT_DIFFERENT.map(({ title, body }, i) => (
                  <div key={title} className="border-t border-white/[0.08] pt-5">
                    <span className="font-mono text-[11px] text-accent-soft/80">{pad2(i + 1)}</span>
                    <h3 className="mt-2 font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
                  </div>
                ))}
              </div>
            </Fold>

            <Fold eyebrow="Who it's for" title="Built for students and new grads specifically">
              <p className="mb-8 max-w-3xl text-[15px] leading-relaxed text-slate-400">
                Most cover letter tools are built for people who have years of work history to reference. Preciprocal is
                built for the version of you that is applying to your first or second real job, where your strongest
                material might be a university project, an internship, or a bootcamp capstone.
              </p>
              <ol className="grid gap-x-10 gap-y-8 md:grid-cols-3">
                {[
                  {
                    title: "New grads applying to full-time roles",
                    body: "Frame projects, internships, and coursework as relevant experience. Lead with capability, not apology for limited history.",
                  },
                  {
                    title: "Students applying for internships",
                    body: "Internship cover letters have different requirements. The AI knows how to write for learning potential, not just past performance.",
                  },
                  {
                    title: "Career switchers breaking into tech",
                    body: "Transferable skills framing. How to connect your previous career to the role you're targeting without underselling yourself.",
                  },
                ].map(({ title, body }, i) => (
                  <li key={title} className="border-t border-white/[0.08] pt-5">
                    <span className="font-mono text-[12px] text-accent-soft/80">{pad2(i + 1)}</span>
                    <h3 className="mt-2 font-semibold text-white">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{body}</p>
                  </li>
                ))}
              </ol>
            </Fold>

            {/* Pair with the ATS checker */}
            <section aria-label="Pair with ATS resume checker" className="grid gap-6 border-t border-white/[0.08] pt-8 !mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="max-w-2xl">
                <Eyebrow>Before you submit</Eyebrow>
                <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Your cover letter and your resume should work together
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  A strong cover letter won&apos;t save a resume that fails ATS. Before you submit, check
                  your resume score for the same job description.
                </p>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-6 lg:flex-col lg:items-end lg:gap-1">
                <Link
                  href="/free-ats-checker"
                  className="group inline-flex min-h-[40px] items-center gap-1 text-sm font-semibold text-accent-soft transition-colors hover:text-white"
                >
                  Run your free ATS resume check <Chevron />
                </Link>
                <Link
                  href="/ai-mock-interview"
                  className="group inline-flex min-h-[40px] items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Then prepare for the interview <Chevron />
                </Link>
              </div>
            </section>

            {/* Internal links */}
            <nav aria-label="Related tools and resources" className="!mt-12">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Related tools</p>
              <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "Free ATS Resume Checker", href: "/free-ats-checker" },
                  { label: "AI Mock Interview Practice", href: "/ai-mock-interview" },
                  { label: "How to Get Your First Tech Job", href: "/blog/how-to-get-first-tech-job-no-experience" },
                  { label: "ATS Resume Tips for New Grads", href: "/blog/ats-resume-tips-new-grads" },
                  { label: "Software Engineer Interview Questions", href: "/interview-questions/software-engineer" },
                  { label: "How to Answer Tell Me About Yourself", href: "/blog/how-to-answer-tell-me-about-yourself" },
                ].map(({ label, href }) => (
                  <li key={href} className="border-b border-white/[0.05]">
                    <Link href={href} className="group flex items-center justify-between gap-3 py-3 text-sm text-slate-400 transition-colors hover:text-white">
                      {label}
                      <Chevron className="text-slate-600 group-hover:text-slate-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* Final CTA */}
        <section aria-label="Generate your cover letter free" className={`${PAD} pb-24`}>
          <Reveal>
            <CtaPanel
              title="Generate your first cover letter free"
              body={
                <p>
                  5 cover letters per month on the free plan. Students with a .edu email get 1 month of
                  Pro free (30 cover letters a month). A card is needed for the trial, and nothing is charged for 30 days.
                </p>
              }
              action={
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href={`${APP_URL}/sign-up`} className={BTN_PRIMARY}>
                    Start free <Chevron />
                  </Link>
                  <Link href="/pricing" className={BTN_SECONDARY}>
                    See all plans
                  </Link>
                </div>
              }
            />
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
