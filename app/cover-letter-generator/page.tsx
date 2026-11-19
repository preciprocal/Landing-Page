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
import { APP_URL } from "@/lib/site";
import Chevron from "@/components/Chevron";
import { PAD, INNER, SECTION, BTN_PRIMARY, SectionHead, CtaPanel, Fold, pad2, FaqSection, BODY, H3, LABEL } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";
import ProductHero from "@/components/ProductHero";

export const metadata: Metadata = {
  title: "Free AI Cover Letter Generator From Your Resume",
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
    a: "You paste a job description. The AI brings in what is widely known about the company, finds your strongest matches to the role in your resume, and writes a letter connecting the two, in under 60 seconds.",
  },
  {
    q: "Will my cover letter sound like it was written by AI?",
    a: "It writes in a direct, professional tone without the usual markers: no 'I am writing to express my interest', no filler. Every letter is fully editable before you send it.",
  },
  {
    q: "Does it work if I have no work experience?",
    a: "Yes, and this is where it helps most. It frames projects, internships and coursework as relevant experience rather than apologising for a short history.",
  },
  {
    q: "Can I generate a cover letter for an internship?",
    a: "Yes. Internship letters lean more on coursework, projects and learning, and the AI adjusts the framing when the role is an internship.",
  },
  {
    q: "How many cover letters can I generate for free?",
    a: "The free plan includes 2 cover letters a month with no credit card. Pro ($9.99/mo) includes 10, and a .edu email gets 1 month of Pro free.",
  },
  {
    q: "Does it work for non-tech jobs?",
    a: "Yes: software engineering, finance, consulting, marketing, HR, healthcare, legal and more. It reads the job description and writes for that role and industry.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Paste the job description",
    description: "Drop in the full posting. The AI reads the requirements, the company and the language the employer uses.",
  },
  {
    number: "02",
    title: "The AI researches and writes",
    description: "It brings in what is widely known about the company, picks your strongest resume matches for the role, and writes a personalised letter.",
  },
  {
    number: "03",
    title: "Edit and send",
    description: "The letter arrives fully editable. Adjust any section or the tone, then send it.",
  },
];

const WHAT_MAKES_IT_DIFFERENT = [
  {
    title: "It knows the company",
    body: "Generic tools fill in your name and the job title. Preciprocal brings in what is widely known about the company, what it makes and who it serves, so the letter is about them.",
  },
  {
    title: "It matches your resume to the job",
    body: "It compares the job requirements with your resume and leads with your most relevant experience, not just your most recent.",
  },
  {
    title: "Built for students with no work history",
    body: "Projects, internships, coursework and transferable skills are written up as capability, not inexperience.",
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
            <p>
              Paste a job description and get a letter that matches your resume to the role and sounds like
              you, not a template. <strong className="font-semibold text-slate-200">2 free cover letters a month, no card.</strong>
            </p>
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
                  <span className="relative mx-auto grid h-12 w-12 place-items-center rounded-full border border-accent/40 bg-[#050810] text-[15px] font-semibold text-accent-soft">
                    {i + 1}
                  </span>
                  <h3 className={`mt-6 ${H3}`}>{step.title}</h3>
                  <p className={`mx-auto mt-2 max-w-sm ${BODY}`}>{step.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>


        {/* FAQ: questions closed */}
        <FaqSection items={FAQS} sectionProps={{ "aria-label": "Cover letter generator FAQ" }} />

        {/* The longer detail, folded: what is different. Kept in
            the HTML (search engines index collapsed panels), but out of the way
            of a reader who came to write a letter. */}
        <section aria-label="More about the cover letter generator" className={`border-t border-white/[0.05] py-16 ${PAD}`}>
          <div className={`${INNER} space-y-4`}>
            <Fold eyebrow="What is different" title="Why this is different from other cover letter generators">
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-3">
                {WHAT_MAKES_IT_DIFFERENT.map(({ title, body }, i) => (
                  <div key={title} className="border-t border-white/[0.08] pt-5">
                    <span className="font-mono text-[11px] text-accent-soft/80">{pad2(i + 1)}</span>
                    <h3 className={`mt-2 ${H3}`}>{title}</h3>
                    <p className={`mt-2 ${BODY}`}>{body}</p>
                  </div>
                ))}
              </div>
            </Fold>

            {/* Internal links */}
            <nav aria-label="Related tools and resources" className="!mt-12">
              <p className={`mb-3 ${LABEL} text-slate-500`}>Related tools</p>
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
                <p>2 cover letters a month on the free plan, 10 on Pro.</p>
              }
              action={
                <Link href={`${APP_URL}/sign-up`} className={BTN_PRIMARY}>
                  Start free <Chevron />
                </Link>
              }
            />
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
