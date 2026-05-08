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
 * File path: app/cover-letter-generator/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Cover Letter Generator: Free, Personalised, Done in 60 Seconds",
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
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
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
    a: "The free plan includes 5 cover letters per month, no credit card required. Pro ($9.99/mo) includes unlimited cover letters. Students with a .edu email get 1 month of Pro free.",
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
    title: "Part of a complete job search platform",
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
    <div className="min-h-screen bg-[#050810]">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm mb-8 flex gap-2 items-center" style={{ color: "#64748b" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>Cover Letter Generator</span>
        </nav>

        {/* H1 */}
        <h1
          className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight tracking-tight"
          style={{ color: "#ffffff" }}
        >
          AI Cover Letter Generator:<br />
          <span style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Personalised. Done in 60 Seconds.
          </span>
        </h1>

        <p className="text-lg mb-4 leading-relaxed max-w-3xl" style={{ color: "#94a3b8" }}>
          Stop staring at a blank page. Paste a job description and our AI researches the company,
          matches your resume to the role, and writes a cover letter that sounds like you, not a
          template. Built for students and new grads who are applying to multiple roles at once.
        </p>
        <p className="text-lg mb-10 leading-relaxed max-w-3xl" style={{ color: "#94a3b8" }}>
          Free to start. No credit card. <strong style={{ color: "#e2e8f0" }}>5 cover letters per month on the free plan.</strong>
        </p>

        {/* Primary CTA */}
        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href={`${APP_URL}/sign-up`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
          >
            Generate your cover letter free →
          </Link>
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border transition-colors hover:border-purple-500/50"
            style={{ color: "#94a3b8", borderColor: "#1e293b" }}
          >
            See all plans
          </Link>
        </div>

        {/* Stats strip */}
        <div
          className="flex flex-wrap gap-6 mb-16 py-5 px-6 rounded-xl border"
          style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
        >
          {[
            { stat: "60s",        label: "average time to generate" },
            { stat: "5/mo",       label: "free cover letters, no card" },
            { stat: "Unlimited",  label: "on Pro at $9.99/mo" },
            { stat: "Any role",   label: "tech, finance, consulting + more" },
          ].map(({ stat, label }) => (
            <div key={stat} className="flex flex-col">
              <span className="text-2xl font-extrabold" style={{ color: "#8b5cf6" }}>{stat}</span>
              <span className="text-sm" style={{ color: "#64748b" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* How it works */}
        <section aria-label="How the cover letter generator works" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: "#ffffff" }}>
            How it works
          </h2>
          <div className="space-y-8">
            {STEPS.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-sm"
                  style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)", color: "#fff" }}
                >
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0" }}>
                    {step.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: "#94a3b8" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What makes it different */}
        <section aria-label="What makes Preciprocal's cover letter generator different" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "#ffffff" }}>
            Why this is different from other cover letter generators
          </h2>
          <p className="mb-8" style={{ color: "#94a3b8" }}>
            Most generators fill in a template with your name and job title. Here is what
            Preciprocal actually does differently.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {WHAT_MAKES_IT_DIFFERENT.map(({ title, body }) => (
              <div
                key={title}
                className="p-5 rounded-xl border"
                style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
              >
                <h3 className="font-semibold mb-2" style={{ color: "#e2e8f0" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who it's for */}
        <section aria-label="Who the cover letter generator is for" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "#ffffff" }}>
            Built for students and new grads specifically
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: "#94a3b8" }}>
            Most cover letter tools are built for people who have years of work history to reference.
            Preciprocal is built for the version of you that is applying to your first or second real
            job, where your strongest material might be a university project, an internship, or a
            bootcamp capstone.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
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
            ].map(({ title, body }) => (
              <div
                key={title}
                className="p-5 rounded-xl border"
                style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
              >
                <h3 className="font-semibold mb-2" style={{ color: "#e2e8f0" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-link to ATS checker */}
        <section
          aria-label="Pair with ATS resume checker"
          className="mb-16 p-6 rounded-xl border"
          style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
        >
          <h2 className="text-xl font-bold mb-2" style={{ color: "#ffffff" }}>
            Your cover letter and your resume should work together
          </h2>
          <p className="text-sm mb-4" style={{ color: "#94a3b8" }}>
            A strong cover letter won't save a resume that fails ATS. Before you submit, check
            your resume score for the same job description.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/free-ats-checker"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-white"
              style={{ color: "#8b5cf6" }}
            >
              Run your free ATS resume check →
            </Link>
            <Link
              href="/ai-mock-interview"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
              style={{ color: "#64748b" }}
            >
              Then prepare for the interview →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Cover letter generator FAQ" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: "#ffffff" }}>
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {FAQS.map(({ q, a }) => (
              <div
                key={q}
                className="p-5 rounded-xl border"
                style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
              >
                <h3 className="font-semibold mb-2" style={{ color: "#e2e8f0" }}>{q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section aria-label="Related tools and resources" className="mb-16">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#ffffff" }}>Related tools</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Free ATS Resume Checker", href: "/free-ats-checker" },
              { label: "AI Mock Interview Practice", href: "/ai-mock-interview" },
              { label: "How to Get Your First Tech Job", href: "/blog/how-to-get-first-tech-job-no-experience" },
              { label: "ATS Resume Tips for New Grads", href: "/blog/ats-resume-tips-new-grads" },
              { label: "Software Engineer Interview Questions", href: "/interview-questions/software-engineer" },
              { label: "How to Answer Tell Me About Yourself", href: "/blog/how-to-answer-tell-me-about-yourself" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 p-3 rounded-lg border text-sm transition-colors hover:border-purple-500/50 hover:text-white"
                style={{ borderColor: "#1e293b", color: "#94a3b8" }}
              >
                <span style={{ color: "#8b5cf6" }}>→</span>
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          aria-label="Generate your cover letter free"
          className="text-center py-12 px-6 rounded-2xl border"
          style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#ffffff" }}>
            Generate your first cover letter free
          </h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: "#94a3b8" }}>
            5 cover letters per month on the free plan. Students with a .edu email get 1 month of
            Pro free (unlimited cover letters). No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`${APP_URL}/sign-up`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
            >
              Start free →
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border transition-colors hover:border-purple-500/50"
              style={{ color: "#94a3b8", borderColor: "#1e293b" }}
            >
              See all plans
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}