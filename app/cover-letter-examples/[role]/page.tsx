/**
 * app/cover-letter-examples/[role]/page.tsx
 *
 * Dynamic cover letter example page for each role.
 * Targets: "software engineer cover letter example", "product manager cover letter template", etc.
 *
 * File path: app/cover-letter-examples/[role]/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ALL_ROLES, ROLE_DISPLAY, APP_URL } from "@/lib/constants";

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return ALL_ROLES.map((role) => ({ role }));
}

// ─── Cover letter data per role ───────────────────────────────────────────────
const COVER_LETTER_DATA: Record<string, {
  openingHook: string;
  fullExample: string;
  breakdown: { label: string; text: string }[];
  doList: string[];
  dontList: string[];
}> = {
  "software-engineer": {
    openingHook: "Don't start with 'I am writing to apply for.' Start with the result you'll drive.",
    fullExample: `Dear [Hiring Manager's Name],

Your engineering team has scaled [Company]'s platform to [X] million users — and based on my read of your architecture challenges, the next inflection point is going to be the hardest. That's the kind of problem I've spent the last four years solving.

At Datadog, I led the design and rollout of a distributed event ingestion pipeline that reduced P99 ingest latency from 340ms to 38ms while handling 2.4 billion events per day. The system has run at 99.99% uptime for 18 consecutive months. Before that, at a Series B startup, I owned the backend infrastructure through a 50x traffic spike after a viral launch — we scaled from 10K to 500K daily active users in six weeks without a major incident.

What draws me to [Company] specifically is the technical challenge at the intersection of real-time data and developer experience that your engineering blog describes. I have deep opinions on how to solve it, and I'd love to walk through them with your team.

I'm attaching my resume and a link to the relevant GitHub projects. Happy to do a technical deep-dive whenever works for you.

[Your Name]`,
    breakdown: [
      { label: "Opening (lines 1–2)", text: "Lead with an insight about the company's challenge — not 'I am applying.' This signals you've done research and are thinking like an engineer, not a job seeker." },
      { label: "Paragraph 2 — Your proof", text: "One strong, specific, quantified achievement. Not a list of responsibilities. The numbers (340ms → 38ms, 2.4B events, 99.99% uptime) do the work. One more credibility signal from a previous role." },
      { label: "Paragraph 3 — The bridge", text: "Connect your experience to their specific problem. Reference something real — their engineering blog, a recent launch, a known technical challenge. This line is what makes the letter non-generic." },
      { label: "Closing", text: "Confident, not desperate. Suggest a specific next step (technical deep-dive) and attach supporting materials. Keep it one sentence." },
    ],
    doList: [
      "Research the company's technical stack and mention something specific",
      "Lead with impact — one strong quantified achievement upfront",
      "Keep it under 250 words — engineers value brevity",
      "Reference their engineering blog, public architecture posts, or recent launches",
      "Match the tone to the company (startup = casual, enterprise = professional)",
    ],
    dontList: [
      "Start with 'I am writing to apply for the Software Engineer role'",
      "Repeat your resume bullet-by-bullet",
      "Use generic phrases like 'I am passionate about technology'",
      "Write more than 4 short paragraphs",
      "Forget to name the company — personalization is table stakes",
    ],
  },
  "product-manager": {
    openingHook: "PMs are hired to solve problems. Your cover letter should read like a mini product spec.",
    fullExample: `Dear [Hiring Manager's Name],

[Company]'s core problem right now is retention, not acquisition — and I think your onboarding flow is the highest-leverage fix available. That's not a guess. I spent 6 months running 14 A/B tests on onboarding for a comparable B2C product and increased D30 retention by 24%.

As a PM at Stripe, I owned the checkout SDK product — a platform used by 3 million developers — from 0 to 1 through two major releases. I defined the roadmap, ran qualitative research with 80+ users, and partnered with a team of 12 engineers. The SDK now processes $40B in annual payment volume.

Before that, I drove the redesign of Shopify's mobile analytics dashboard, shipping to 1.4 million merchants and improving weekly active usage by 37% based on a Jobs-to-Be-Done research sprint I designed and ran.

I'd love to share how I'd approach your onboarding problem specifically — I have some early hypotheses I'd be excited to walk through.

[Your Name]`,
    breakdown: [
      { label: "Opening — insight-led", text: "Lead with a specific hypothesis about their business, not your enthusiasm. This demonstrates product thinking before you've even had an interview." },
      { label: "Paragraph 2 — Scale and ownership", text: "Establish scope: platform size, user count, team size. Then the outcome. PMs need to show they can own, not just contribute." },
      { label: "Paragraph 3 — Another dimension", text: "Show a second product muscle — research, mobile, a different industry vertical. Demonstrates range." },
      { label: "Closing — propose a conversation about their problem", text: "Not 'I look forward to hearing from you.' A specific, confident offer to solve their actual problem." },
    ],
    doList: [
      "Lead with a hypothesis about their product or business problem",
      "Quantify your product outcomes (retention %, revenue, user growth)",
      "Show ownership — make clear what you personally drove vs contributed to",
      "Name team sizes and cross-functional scope",
      "Reference their product directly — show you've used it",
    ],
    dontList: [
      "Start with 'I am passionate about building products'",
      "Describe features you shipped without attaching outcomes",
      "Use vague scope like 'worked with engineering' instead of 'partnered with 8 engineers'",
      "Write more than 4 paragraphs",
      "Forget to tailor — generic PM cover letters are immediately obvious",
    ],
  },
  "data-scientist": {
    openingHook: "Show you think in hypotheses and outcomes — not just models and tools.",
    fullExample: `Dear [Hiring Manager's Name],

Most data science cover letters describe the tools the candidate knows. I'd rather tell you about the $3.8M in prevented churn my last model enabled.

At Wayfair, I built a behavioral churn prediction model using 90-day event sequences and XGBoost. It achieved 84% precision at a threshold that made proactive outreach economically viable — enabling the CRM team to prevent approximately $3.8M in annual churn on the first deployment. I also built the feature engineering pipeline, led the A/B test design, and collaborated with the economics team to validate the causal assumptions.

Before that at Datadog, I led the anomaly detection infrastructure for a system processing 2 million events per second. The model ran in production for 14 months with zero on-call incidents from model drift, which I managed through automated retraining and monitoring dashboards I built from scratch.

I'm drawn to [Company]'s work at the intersection of real-time behavioral data and personalization — I have direct experience here and have strong opinions on the trade-offs between latency and model complexity. Happy to go deep.

[Your Name]`,
    breakdown: [
      { label: "Opening — subvert the pattern", text: "Acknowledge what most candidates do, then immediately do something different. Forces the reader to keep going." },
      { label: "Paragraph 2 — Full-stack DS proof", text: "Model → outcome → business metric → full ownership (feature engineering, A/B, causal reasoning). Shows you're not just a notebook jockey." },
      { label: "Paragraph 3 — Production credibility", text: "Production ML is a differentiator. Uptime, monitoring, retraining — these signal MLOps maturity that most DS candidates lack." },
      { label: "Closing — show you've read their work", text: "Reference their technical domain specifically. Shows you've done homework and that your experience is directly relevant." },
    ],
    doList: [
      "Lead with a business outcome from your best model",
      "Show the full lifecycle: problem framing → model → production → business impact",
      "Mention A/B testing and causal reasoning — these signal rigor",
      "Differentiate prototype from production experience explicitly",
      "Keep technical jargon calibrated to the role (research vs applied)",
    ],
    dontList: [
      "Open with a list of Python libraries you know",
      "Describe your model architecture in detail — that's for the interview",
      "Omit the business outcome — this is the whole point",
      "Write more than 4 short paragraphs",
      "Use generic openers like 'I am excited about data science'",
    ],
  },
};

function getCoverLetterData(role: string) {
  if (COVER_LETTER_DATA[role]) return COVER_LETTER_DATA[role];
  const display = ROLE_DISPLAY[role];
  if (!display) return null;
  return {
    openingHook: `Don't start with 'I am writing to apply.' Open with the impact you'll bring to the ${display.name} role.`,
    fullExample: `Dear [Hiring Manager's Name],

[Company]'s [specific challenge or initiative you've researched] is exactly the problem I've been solving for the last [X] years. Here's the most relevant result: [your single strongest, quantified achievement directly relevant to their role].

At [Most Recent Company], I [clear ownership statement + what you built/led] that [specific business outcome with metric]. I owned [scope — team size, budget, customer base] and delivered [result] in [timeframe].

Before that at [Previous Company], I [second strong achievement in a different dimension, showing range]. This experience taught me [specific lesson that applies to their business].

I'd love to bring this to [Company]. Happy to walk through [specific aspect of their challenge] in more detail whenever works for your team.

[Your Name]`,
    breakdown: [
      { label: "Opening — insight, not enthusiasm", text: "Research one real challenge the company faces and open with it. Immediately signals you think like a problem-solver, not a job seeker." },
      { label: "Paragraph 2 — Your strongest proof", text: "Lead with scope and ownership, then the business outcome. Every sentence should answer 'so what?' with a number." },
      { label: "Paragraph 3 — Second dimension", text: "Show range. A different company, challenge type, or skill set. Keep it tight — 2-3 sentences max." },
      { label: "Closing — propose a specific conversation", text: "Not 'I look forward to hearing from you.' Offer to go deep on their specific problem. Confident without being pushy." },
    ],
    doList: [
      "Research the company and reference something specific — a product, challenge, or initiative",
      "Lead with your single strongest, quantified achievement",
      "Show scope: team size, customer count, revenue/impact scale",
      `Use the language of ${display.name.toLowerCase()} job descriptions — match their vocabulary`,
      "Keep it under 250 words",
    ],
    dontList: [
      `Start with 'I am writing to apply for the ${display.name} role'`,
      "Repeat your resume line-by-line",
      "Use generic phrases like 'I am passionate about [field]'",
      "Write more than 4 paragraphs",
      "Send the same letter to every company without personalizing",
    ],
  };
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role } = await params;
  const display = ROLE_DISPLAY[role];
  if (!display) return { title: "Cover Letter Examples — Preciprocal" };
  return {
    title: `${display.name} Cover Letter Example — Template & Writing Guide 2026`,
    description: `Real ${display.name.toLowerCase()} cover letter example with annotated breakdown. What to include, what to avoid, and how to personalize it to get interviews in 2026.`,
    alternates: { canonical: `https://preciprocal.com/cover-letter-examples/${role}` },
    openGraph: {
      title: `${display.name} Cover Letter Example — Preciprocal`,
      description: `Annotated cover letter example for ${display.name.toLowerCase()}s. Template, breakdown, and writing tips for 2026.`,
      url: `https://preciprocal.com/cover-letter-examples/${role}`,
      type: "article",
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CoverLetterExamplesRolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const display = ROLE_DISPLAY[role];
  if (!display) notFound();

  const clData = getCoverLetterData(role);
  if (!clData) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${display.name} Cover Letter Example — Template & Writing Guide`,
    description: `Real cover letter example for ${display.name.toLowerCase()}s with annotated breakdown and writing tips.`,
    url: `https://preciprocal.com/cover-letter-examples/${role}`,
    author: { "@type": "Organization", name: "Preciprocal", url: "https://preciprocal.com" },
    publisher: { "@id": "https://preciprocal.com/#organization" },
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <div className="min-h-screen bg-[#050810]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Cover Letter Examples", url: "https://preciprocal.com/cover-letter-examples" },
          { name: `${display.name}`, url: `https://preciprocal.com/cover-letter-examples/${role}` },
        ]}
      />
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 page-main">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ color: "#64748b" }} className="text-sm mb-8 flex gap-2 items-center flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link href="/cover-letter-examples" className="hover:text-white transition-colors">Cover Letter Examples</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>{display.name}</span>
        </nav>

        {/* H1 */}
        <div className="mb-8">
          <span className="text-3xl">{display.icon}</span>
          <h1 style={{ color: "#ffffff" }} className="text-4xl sm:text-5xl font-extrabold mt-3 mb-4 tracking-tight leading-tight">
            {display.name} cover letter example
          </h1>
          <p style={{ color: "#94a3b8" }} className="text-lg leading-relaxed">
            A real, annotated {display.name.toLowerCase()} cover letter that gets interviews in 2026 — plus a breakdown of what works and why.
          </p>
        </div>

        {/* Opening hook */}
        <div className="mb-8 p-4 rounded-xl border-l-4" style={{ background: "rgba(168,85,247,0.06)", borderLeftColor: "#a855f7" }}>
          <p style={{ color: "#d8b4fe" }} className="text-sm font-medium italic">💡 {clData.openingHook}</p>
        </div>

        {/* Full example */}
        <section className="mb-10">
          <h2 style={{ color: "#ffffff" }} className="text-xl font-bold mb-4">Full example</h2>
          <div
            className="p-6 rounded-2xl border font-mono text-sm leading-relaxed whitespace-pre-wrap"
            style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)", color: "#cbd5e1" }}
          >
            {clData.fullExample}
          </div>
        </section>

        {/* Breakdown */}
        <section className="mb-10">
          <h2 style={{ color: "#ffffff" }} className="text-xl font-bold mb-6">Paragraph-by-paragraph breakdown</h2>
          <div className="space-y-4">
            {clData.breakdown.map((item, i) => (
              <div key={i} className="p-4 rounded-xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                <p style={{ color: "#a5b4fc" }} className="text-xs font-semibold uppercase tracking-wider mb-2">{item.label}</p>
                <p style={{ color: "#94a3b8" }} className="text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Do / Don't */}
        <div className="mb-10 grid sm:grid-cols-2 gap-5">
          <section className="p-5 rounded-2xl border" style={{ background: "rgba(16,185,129,0.04)", borderColor: "rgba(16,185,129,0.15)" }}>
            <h2 style={{ color: "#6ee7b7" }} className="font-bold mb-4 text-sm uppercase tracking-wider">✓ Do</h2>
            <ul className="space-y-2">
              {clData.doList.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: "#10b981" }} className="text-xs mt-1 flex-shrink-0">✓</span>
                  <p style={{ color: "#94a3b8" }} className="text-sm">{item}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="p-5 rounded-2xl border" style={{ background: "rgba(239,68,68,0.04)", borderColor: "rgba(239,68,68,0.15)" }}>
            <h2 style={{ color: "#fca5a5" }} className="font-bold mb-4 text-sm uppercase tracking-wider">✗ Don't</h2>
            <ul className="space-y-2">
              {clData.dontList.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: "#ef4444" }} className="text-xs mt-1 flex-shrink-0">✗</span>
                  <p style={{ color: "#94a3b8" }} className="text-sm">{item}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Cross-links */}
        <div className="mb-10 grid sm:grid-cols-3 gap-4">
          <Link href={`/resume-tips/${role}`} className="p-4 rounded-xl border transition-all hover:border-purple-500/30" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
            <p style={{ color: "#e2e8f0" }} className="font-medium text-sm mb-1">Resume tips</p>
            <p style={{ color: "#475569" }} className="text-xs">{display.name} resume guide →</p>
          </Link>
          <Link href={`/interview-questions/${role}`} className="p-4 rounded-xl border transition-all hover:border-purple-500/30" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
            <p style={{ color: "#e2e8f0" }} className="font-medium text-sm mb-1">Interview questions</p>
            <p style={{ color: "#475569" }} className="text-xs">Prep for the interview →</p>
          </Link>
          <Link href={`/salary-guide/${role}`} className="p-4 rounded-xl border transition-all hover:border-purple-500/30" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
            <p style={{ color: "#e2e8f0" }} className="font-medium text-sm mb-1">Salary guide</p>
            <p style={{ color: "#475569" }} className="text-xs">{display.name} salary data →</p>
          </Link>
        </div>

        {/* CTA */}
        <div className="p-8 text-center rounded-2xl border" style={{ background: "rgba(168,85,247,0.05)", borderColor: "rgba(168,85,247,0.2)" }}>
          <h2 style={{ color: "#ffffff" }} className="text-xl font-bold mb-2">Generate your cover letter in 30 seconds</h2>
          <p style={{ color: "#94a3b8" }} className="text-sm mb-6 max-w-sm mx-auto">
            Paste the job description and your resume. Preciprocal writes a tailored, non-generic cover letter that sounds like you.
          </p>
          <a href={`${APP_URL}/sign-up`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
            Generate my cover letter free →
          </a>
          <p style={{ color: "#475569" }} className="text-xs mt-3">No credit card required · Free plan available</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}