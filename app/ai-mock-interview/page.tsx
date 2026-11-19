/**
 * app/ai-mock-interview/page.tsx
 *
 * ANCHOR FEATURE PAGE - highest SEO priority after the homepage.
 *
 * Target keywords:
 *   Primary:   "AI mock interview" (~8,100/mo)
 *   Secondary: "mock interview practice online" (~4,400/mo)
 *              "AI interview practice" (~2,900/mo)
 *              "mock interview for new grads" (low comp, high intent)
 *              "technical mock interview free"
 *              "behavioral mock interview practice"
 *
 * Page structure:
 *   H1  → primary keyword + audience signal
 *   H2s → how it works / what you practice / who it's for / FAQ
 *   FAQ section with JSON-LD for rich results
 *   Internal links → role pages, company pages, /free-ats-checker
 *   CTAs → app.preciprocal.com sign-up (free tier first)
 *
 * Layout (accent rose): ProductHero, then a short flow on the shared page kit
 * (components/page): how it works, what you get, the FAQ with answers
 * closed, the longer detail (formats, audience, companies) folded into Fold
 * panels with the related tools beneath, and the closing CTA.
 *
 * File path: app/ai-mock-interview/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/site";
import Chevron from "@/components/Chevron";
import { PAD, INNER, SECTION, BTN_PRIMARY, Eyebrow, SectionHead, CtaPanel, Fold, FaqSection, BODY, H3 } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";
import ProductHero from "@/components/ProductHero";

export const metadata: Metadata = {
  title: "AI Mock Interviews: Free Practice + Feedback",
  description:
    "Practice AI mock interviews for any role or company. Get scored on technical depth, communication, and structure. Built for students and new grads. Free to start.",
  keywords: [
    "AI mock interview",
    "mock interview practice online",
    "AI interview practice",
    "mock interview for new grads",
    "mock interview practice for students",
    "technical mock interview free",
    "behavioral mock interview practice",
    "interview simulator",
    "AI interview simulator",
    "free mock interview",
    "interview practice tool",
  ],
  alternates: {
    canonical: "https://preciprocal.com/ai-mock-interview",
  },
  openGraph: {
    title: "AI Mock Interview Practice: Realistic, Instant, Free to Start",
    description:
      "Practice AI mock interviews for any role or company. Scored on technical depth, communication, and structure. Free to start.",
    url: "https://preciprocal.com/ai-mock-interview",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v3.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Mock Interview Practice | Preciprocal",
    description:
      "Practice AI mock interviews for any role. Realistic, instant feedback. Free to start.",
  },
};

const FAQS = [
  {
    q: "Is AI mock interview practice actually effective?",
    a: "It works the way deliberate practice works: answering out loud, under realistic conditions, with feedback after every answer. AI mocks make those reps repeatable whenever you have time.",
  },
  {
    q: "How is this different from practicing with a friend or ChatGPT?",
    a: "It is a voice panel, an HR interviewer and a technical lead, that follows up like a real loop. You are scored on communication, technical knowledge, problem-solving, role fit and confidence, and it is there whenever you are, no scheduling.",
  },
  {
    q: "What types of interviews can I practice?",
    a: "Technical (coding concepts and system design), behavioural (STAR), consulting cases, finance (DCF, LBO, accounting), marketing and screening rounds. Behavioural answers get follow-ups when they are vague.",
  },
  {
    q: "Can I practice for a specific company like Google or Amazon?",
    a: "Yes. Enter the company and role and the questions follow its known format and values, such as Amazon's Leadership Principles. Our company prep guides cover the rest.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The free plan includes 1 mock interview a month with no credit card; Pro is $9.99/month with 3, and a .edu email gets 1 month of Pro free.",
  },
  {
    q: "Do I need a webcam?",
    a: "No. Mock interviews are voice-only, so your laptop microphone is all you need.",
  },
];

const INTERVIEW_TYPES = [
  {
    type: "Technical Interviews",
    description: "Data structures, algorithms, system design, API design, and coding concepts, asked the way real interviewers ask them, not as a LeetCode grind.",
    roles: ["Software Engineer", "Data Scientist", "ML Engineer", "Frontend Developer"],
    href: "/interview-questions/software-engineer",
  },
  {
    type: "Behavioural Interviews",
    description: "STAR-method questions on leadership, conflict, failure, and impact. The AI follows up when your answer is vague and scores your ownership language.",
    roles: ["All roles", "Product Manager", "Consulting", "Finance"],
    href: "/interview-questions/product-manager",
  },
  {
    type: "Case Interviews",
    description: "Structured case frameworks for consulting and business roles. Market sizing, profit decline, go-to-market, and operational cases.",
    roles: ["Management Consultant", "Product Manager", "Business Analyst"],
    href: "/interview-questions/management-consultant",
  },
  {
    type: "Finance Interviews",
    description: "DCF, LBO, accounting concepts, and market knowledge questions for investment banking, PE, and financial analyst roles.",
    roles: ["Investment Banker", "Financial Analyst", "VC / PE"],
    href: "/interview-questions/investment-banker",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Pick your role and company",
    description: "Choose the role and target company, and the questions follow that company's interview style.",
  },
  {
    number: "02",
    title: "Interview with a 3-agent panel",
    description: "An HR interviewer and a technical lead take turns, following up when you are vague and pushing back when you are wrong.",
  },
  {
    number: "03",
    title: "Get a detailed debrief",
    description: "Scores across 5 dimensions, with every weak spot explained and a specific fix.",
  },
];

export default function AIMockInterviewPage() {
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
    <div data-accent="rose" className="min-h-screen bg-[#050810]">
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "AI Mock Interview", url: "https://preciprocal.com/ai-mock-interview" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main>
        {/* ── H1 + Intro ──────────────────────────────────────────────────── */}
        <ProductHero
          chapter="interview"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "AI Mock Interview" }]}
          title="AI Mock Interview Practice: "
          accent="Realistic. Instant. Free to Start."
          subhead={
            <p>
              Practise with a realistic voice panel for any role or company, scored across 5 dimensions.
              Built for <strong className="font-semibold text-slate-200">students and new grads</strong>, with exactly what to fix before the real thing.
            </p>
          }
          ctaHref={`${APP_URL}/sign-up`}
          ctaLabel="Start your free mock interview"
          secondary={{ href: `${APP_URL}/sign-up?plan=pro`, label: "View all plans" }}
        />

        {/* ── How It Works: three connected stages ────────────────────────── */}
        <section id="how-it-works" aria-label="How AI mock interviews work" className={`scroll-mt-24 ${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead align="center" className="mb-14" eyebrow="How it works" title="How AI mock interview practice works" />
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


        {/* ── FAQ: questions closed ───────────────────────────────────────── */}
        <FaqSection items={FAQS} sectionProps={{ "aria-label": "AI mock interview FAQ" }} />

        {/* ── The longer detail, folded: formats, audience, companies ─────────
            Kept in the HTML (search engines index collapsed panels), but out
            of the way of a reader who came to start practising. */}
        <section aria-label="More about AI mock interviews" className={`border-t border-white/[0.05] py-16 ${PAD}`}>
          <div className={`${INNER} space-y-4`}>
            <Fold eyebrow="Formats" title="Practice every type of interview" meta="Technical, behavioural, case and finance">
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {INTERVIEW_TYPES.map((item) => (
                  <Link key={item.type} href={item.href} className="group flex h-full flex-col border-t border-white/[0.08] pt-5 transition-colors hover:border-white/25">
                    <h3 className={`flex items-center justify-between gap-3 ${H3} transition-colors group-hover:text-accent-soft`}>
                      {item.type}
                      <Chevron className="text-slate-500 group-hover:text-accent" />
                    </h3>
                    <p className={`mt-2 ${BODY}`}>{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.roles.map((role) => (
                        <span key={role} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[12px] font-medium text-slate-400">
                          {role}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </Fold>


            <Fold eyebrow="By company" title="Practice for a specific company">
              <p className={`mb-6 max-w-3xl ${BODY}`}>
                Select a target company and the AI tailors its questions to their known format, values, and difficulty.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Google","Amazon","Meta","Microsoft","Apple","Stripe","Airbnb","Netflix","Uber","Spotify"].map((company) => (
                  <Link
                    key={company}
                    href={`/interview-prep/${company.toLowerCase()}`}
                    className="inline-flex h-9 items-center rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 text-sm text-slate-300 transition-colors hover:border-white/25 hover:text-white"
                  >
                    {company}
                  </Link>
                ))}
                <Link
                  href="/interview-prep"
                  className="group inline-flex h-9 items-center gap-1 rounded-lg border border-accent/30 bg-accent/[0.06] px-3.5 text-sm font-medium text-accent-soft transition-colors hover:border-accent/50 hover:text-white"
                >
                  All 50+ companies <Chevron />
                </Link>
              </div>
            </Fold>

            {/* ── Related: the free predictor and the ATS check ──────────────── */}
            <nav aria-label="Related tools" className="pt-10">
              <section aria-label="Free interview question predictor" className="border-t border-white/[0.08] pt-6">
                <Eyebrow>No sign-up</Eyebrow>
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-white">Try it first, no account needed</h2>
                <p className={`mt-2 ${BODY}`}>
                  Paste a job description for your 5 most likely questions, then answer out loud for a score out of 10.
                </p>
                <Link
                  href="/interview-question-predictor"
                  className="group mt-4 inline-flex min-h-[40px] items-center gap-1 text-sm font-semibold text-accent-soft transition-colors hover:text-white"
                >
                  Open the free interview question predictor <Chevron />
                </Link>
              </section>

            </nav>
          </div>
        </section>

        {/* ── Final CTA ───────────────────────────────────────────────────── */}
        <section aria-label="Get started with AI mock interviews" className={`${PAD} pb-24`}>
          <Reveal>
            <CtaPanel
              title="Start practicing today. It is free."
              body={
                <p>1 mock interview a month on the free plan, no credit card required.</p>
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
