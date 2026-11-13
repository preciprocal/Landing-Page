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
import { APP_URL } from "@/lib/constants";
import Chevron from "@/components/Chevron";
import { PAD, INNER, SECTION, BTN_PRIMARY, BTN_SECONDARY, ACCENT_TEXT, Eyebrow, SectionHead, CtaPanel, Fold, pad2, FaqSection } from "@/components/page/Layout";
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
    a: "Yes. Research backs it up. The core mechanism is deliberate practice under realistic conditions. Candidates who practice out loud, under time pressure, with feedback consistently outperform those who only read answers. AI mock interviews give you repeatable reps with immediate scoring, so you build muscle memory before the real thing. The nerves shrink when you've done it 20 times.",
  },
  {
    q: "How is this different from practicing with a friend or ChatGPT?",
    a: "Three key differences. First, Preciprocal uses a voice panel: an HR interviewer and a technical lead take turns asking questions, with a third panelist observing. Second, scoring is structured across 5 dimensions (communication, technical knowledge, problem-solving, role fit, and confidence) so you know exactly what to improve. Third, it's infinitely available: no scheduling, no asking a favour, no friend who stops giving honest feedback after round two.",
  },
  {
    q: "What types of interviews can I practice?",
    a: "Technical (coding concepts + system design), behavioural (STAR method), case interviews (consulting), finance interviews (DCF, LBO, accounting), marketing strategy, and general screening rounds. You can target a specific company and role. The AI adjusts its questions to match that company's known interview style, values, and difficulty level.",
  },
  {
    q: "Does it work for behavioural interviews, not just technical?",
    a: "Absolutely. Behavioural interviews are where most candidates lose offers, not technical ones. Preciprocal's mock interviews include a dedicated behavioural agent that probes your STAR stories, asks follow-up questions when answers are vague, and scores you on specificity, ownership language, and quantified results.",
  },
  {
    q: "Can I practice for a specific company like Google or Amazon?",
    a: "Yes. Enter the company and role, and the AI tailors questions to that company's known interview format and values. Google interviews will probe Googleyness and technical depth. Amazon interviews will work through Leadership Principles. Meta interviews will focus on impact and product sense. You can also browse our company-specific prep guides for Google, Amazon, Meta, and 17 more.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The free tier includes 1 mock interview per month, no credit card required. Students with a .edu email get 1 month of Pro free (3 mock interviews a month). Pro is $9.99/month, and if you land the job while subscribed and share your story, that month is on us.",
  },
  {
    q: "Do I need a webcam?",
    a: "No. Mock interviews are voice-only. Just a microphone (your laptop mic works fine). This mirrors how most real interviews are conducted today: phone screens and virtual onsites with video optional.",
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
    description: "Choose from 40+ roles and 50+ target companies. The AI tailors its questions to match that company's actual interview style, including Google's Googleyness rounds, Amazon's Leadership Principles, Stripe's systems thinking.",
  },
  {
    number: "02",
    title: "Interview with a 3-agent panel",
    description: "An HR interviewer and a technical lead take turns asking questions. They follow up when you're vague, push back when you're wrong, and calibrate difficulty in real time. Speaking out loud is the skill you are building.",
  },
  {
    number: "03",
    title: "Get a detailed debrief",
    description: "After each session you receive scores across 5 dimensions: communication clarity, technical depth, answer structure, relevance to the question, and confidence signals. Every weak spot is explained with a specific suggested improvement.",
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
            <>
              <p>
                Most candidates lose offers in the interview room, not on paper. Preciprocal&apos;s AI mock
                interview platform puts you in front of a realistic 3-agent panel for any role or company,
                scores your answers across 5 dimensions, and tells you exactly what to fix before the
                real thing.
              </p>
              <p className="mt-4">
                Built specifically for <strong className="font-semibold text-slate-200">students and new grads</strong>{" "}
                entering the job market, not generic career coaching for people who&apos;ve done it before.
              </p>
            </>
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

        {/* ── What you get: the numbers at a glance ───────────────────────── */}
        <section aria-label="At a glance" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead align="center" className="mb-12" eyebrow="What you get" title="At a glance" />
            </Reveal>
            <dl className="grid grid-cols-2 gap-x-10 gap-y-8 lg:grid-cols-4">
              {[
                { stat: "3", label: "mock interviews / month on Pro" },
                { stat: "5", label: "scoring dimensions per session" },
                { stat: "40+", label: "roles supported" },
                { stat: "20+", label: "company-specific prep packs" },
              ].map(({ stat, label }) => (
                <div key={stat} className="flex flex-col-reverse border-t border-white/[0.08] pt-5 text-center">
                  <dt className="mt-1 text-[13px] text-slate-400">{label}</dt>
                  <dd className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${ACCENT_TEXT}`}>{stat}</dd>
                </div>
              ))}
            </dl>
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
              <p className="mb-8 max-w-3xl text-[15px] leading-relaxed text-slate-400">
                Not just technical interviews. The AI adapts to whichever format your target company uses.
              </p>
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {INTERVIEW_TYPES.map((item) => (
                  <Link key={item.type} href={item.href} className="group flex h-full flex-col border-t border-white/[0.08] pt-5 transition-colors hover:border-white/25">
                    <h3 className="flex items-center justify-between gap-3 font-semibold text-white transition-colors group-hover:text-accent-soft">
                      {item.type}
                      <Chevron className="text-slate-500 group-hover:text-accent" />
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.roles.map((role) => (
                        <span key={role} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-400">
                          {role}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </Fold>

            <Fold eyebrow="Who it's for" title="Built specifically for students and new grads">
              <p className="mb-8 max-w-3xl text-[15px] leading-relaxed text-slate-400">
                Most interview prep tools are built for mid-career professionals switching companies. They assume you
                have 5 years of STAR stories and prior offer negotiation experience. Preciprocal is built for the
                version of you that&apos;s entering the market for the first time.
              </p>
              <ol className="grid gap-x-10 gap-y-8 md:grid-cols-3">
                {[
                  {
                    title: "Computer Science students",
                    body: "Technical interviews, system design, and LeetCode-adjacent questions, without pretending you have 3 years of production experience.",
                  },
                  {
                    title: "Business & finance students",
                    body: "Case interviews, behavioural rounds, and finance technicals for consulting, IB, and corporate roles.",
                  },
                  {
                    title: "Career switchers breaking into tech",
                    body: "Transferable skills framing, gap-bridging stories, and how to answer 'why tech, why now?' without sounding desperate.",
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

            <Fold eyebrow="By company" title="Practice for a specific company">
              <p className="mb-6 max-w-3xl text-[15px] leading-relaxed text-slate-400">
                Select a target company and the AI tailors its questions to their known format, values, and difficulty.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Google","Amazon","Meta","Microsoft","Apple","Stripe","Airbnb","Netflix","Uber","Spotify"].map((company) => (
                  <Link
                    key={company}
                    href={`/interview-prep/${company.toLowerCase()}`}
                    className="inline-flex min-h-[40px] items-center rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 text-sm text-slate-300 transition-colors hover:border-white/25 hover:text-white"
                  >
                    {company}
                  </Link>
                ))}
                <Link
                  href="/interview-prep"
                  className="group inline-flex min-h-[40px] items-center gap-1 rounded-lg border border-accent/30 bg-accent/[0.06] px-3.5 text-sm font-medium text-accent-soft transition-colors hover:border-accent/50 hover:text-white"
                >
                  All 50+ companies <Chevron />
                </Link>
              </div>
            </Fold>

            {/* ── Related: the free predictor and the ATS check ──────────────── */}
            <nav aria-label="Related tools" className="grid gap-x-10 gap-y-8 pt-10 lg:grid-cols-2">
              <section aria-label="Free interview question predictor" className="border-t border-white/[0.08] pt-6">
                <Eyebrow>No sign-up</Eyebrow>
                <h2 className="text-xl font-semibold tracking-tight text-white">Try it first, no account needed</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Paste a job description to get the 5 questions you are most likely to be asked, then say your answer out
                  loud and get your pace, filler words and a score out of 10.
                </p>
                <Link
                  href="/interview-question-predictor"
                  className="group mt-4 inline-flex min-h-[40px] items-center gap-1 text-sm font-semibold text-accent-soft transition-colors hover:text-white"
                >
                  Open the free interview question predictor <Chevron />
                </Link>
              </section>

              <section aria-label="Pair with ATS resume checker" className="border-t border-white/[0.08] pt-6">
                <Eyebrow>Before you apply</Eyebrow>
                <h2 className="text-xl font-semibold tracking-tight text-white">Don&apos;t forget your resume</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  A great interview performance means nothing if your resume never makes it past the ATS filter.
                  Check your score before you apply.
                </p>
                <Link
                  href="/free-ats-checker"
                  className="group mt-4 inline-flex min-h-[40px] items-center gap-1 text-sm font-semibold text-accent-soft transition-colors hover:text-white"
                >
                  Run your free ATS resume check <Chevron />
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
                <p>
                  1 mock interview per month on the free plan, no credit card required. Students with a .edu
                  email get 1 month of Pro free.
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
