/**
 * app/salary-guide/[role]/page.tsx
 *
 * Dynamic salary guide for each role.
 * Targets: "software engineer salary 2026", "data scientist salary NYC", "product manager salary levels", etc.
 *
 * File path: app/salary-guide/[role]/page.tsx
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

// ─── Salary data per role ─────────────────────────────────────────────────────
interface SalaryLevel {
  level: string;
  yearsExp: string;
  baseSalary: string;
  totalComp: string;
  equityNote: string;
}

interface SalaryData {
  medianBase: string;
  medianTotal: string;
  topPayingCities: string[];
  levels: SalaryLevel[];
  negotiationScript: string;
  salaryFactors: string[];
  sources: string;
}

const SALARY_DATA: Record<string, SalaryData> = {
  "software-engineer": {
    medianBase: "$145,000",
    medianTotal: "$175,000",
    topPayingCities: ["San Francisco Bay Area", "Seattle", "New York City", "Austin", "Boston"],
    levels: [
      { level: "Junior / L3",     yearsExp: "0–2 years",  baseSalary: "$95,000 – $130,000",  totalComp: "$110,000 – $160,000", equityNote: "RSUs typical at FAANG; startups offer 0.1–0.5% options" },
      { level: "Mid / L4",        yearsExp: "2–5 years",  baseSalary: "$130,000 – $165,000", totalComp: "$160,000 – $220,000", equityNote: "RSUs ~$30K–60K/yr vested; startups 0.05–0.25%" },
      { level: "Senior / L5",     yearsExp: "5–10 years", baseSalary: "$160,000 – $200,000", totalComp: "$220,000 – $350,000", equityNote: "Equity becomes primary comp lever at this level" },
      { level: "Staff / L6",      yearsExp: "10+ years",  baseSalary: "$195,000 – $240,000", totalComp: "$350,000 – $600,000+",equityNote: "Heavy equity weighting; stock refreshes matter more than base" },
    ],
    negotiationScript: `"Thank you for the offer — I'm genuinely excited about this role. Based on my research using Levels.fyi and conversations with peers at comparable companies, I was targeting a base closer to [$X]. Given my experience with [specific relevant skill], I believe that's well-supported by the market. Is there flexibility to move in that direction?"`,
    salaryFactors: [
      "Company tier (FAANG vs unicorn vs startup vs enterprise) is the single biggest driver — $50K+ swings are common",
      "Location still matters: remote-first companies may apply geo-adjustments of 10–25%",
      "Stack and specialty: ML engineers, security engineers, and distributed systems engineers command 15–30% premiums",
      "Offer timing: candidates with competing offers see 10–20% higher final packages on average",
      "Negotiation: 72% of employers expect negotiation; most first offers are 5–15% below the ceiling",
    ],
    sources: "Data aggregated from Levels.fyi, Glassdoor, LinkedIn Salary, and Blind (2025–2026). Individual packages vary significantly by company, location, and offer timing.",
  },
  "product-manager": {
    medianBase: "$135,000",
    medianTotal: "$165,000",
    topPayingCities: ["San Francisco Bay Area", "Seattle", "New York City", "Los Angeles", "Boston"],
    levels: [
      { level: "APM / Junior PM",  yearsExp: "0–2 years",  baseSalary: "$85,000 – $115,000",  totalComp: "$100,000 – $140,000", equityNote: "APM programs at big tech: full RSU packages. Startups: 0.1–0.4%" },
      { level: "PM",               yearsExp: "2–5 years",  baseSalary: "$120,000 – $155,000", totalComp: "$145,000 – $200,000", equityNote: "RSUs ~$25K–50K/yr at FAANG; meaningful equity at growth-stage" },
      { level: "Senior PM",        yearsExp: "5–9 years",  baseSalary: "$155,000 – $190,000", totalComp: "$200,000 – $290,000", equityNote: "Senior PMs increasingly equity-rich; refreshes compound over time" },
      { level: "Principal / GPM",  yearsExp: "9+ years",   baseSalary: "$190,000 – $230,000", totalComp: "$300,000 – $500,000+",equityNote: "Director-level equity; large refreshes; bonus components" },
    ],
    negotiationScript: `"I really appreciate the offer and I'm excited about the opportunity. I've done some research and talked to PMs at similar-stage companies — based on that, I was expecting a base closer to [$X]. I'm also wondering about the equity component: is there flexibility to increase the initial grant? I'd love to find something that works for both of us."`,
    salaryFactors: [
      "B2C vs B2B vs Platform PM: consumer tech pays highest; platform/infra PM roles often get engineering-tier comp",
      "Technical depth: TPMs and PMs with engineering backgrounds earn 10–20% more at technical companies",
      "Company growth stage: Series A–C startups pay lower base but higher equity upside",
      "Scope clarity: PMs owning a P&L or a platform used by millions command premium over feature PMs",
      "MBA premium: top MBA programs add 10–15% at consulting/tech hybrids, less at pure tech startups",
    ],
    sources: "Data aggregated from Glassdoor, LinkedIn Salary, Levels.fyi, and Rora salary reports (2025–2026). Individual packages vary by company, product type, and scope.",
  },
  "data-scientist": {
    medianBase: "$130,000",
    medianTotal: "$155,000",
    topPayingCities: ["San Francisco Bay Area", "Seattle", "New York City", "Boston", "San Diego"],
    levels: [
      { level: "Junior DS / L3",   yearsExp: "0–2 years",  baseSalary: "$90,000 – $120,000",  totalComp: "$105,000 – $145,000", equityNote: "Entry-level RSUs at big tech; modest equity at startups" },
      { level: "DS / L4",          yearsExp: "2–5 years",  baseSalary: "$120,000 – $155,000", totalComp: "$145,000 – $195,000", equityNote: "RSUs ~$20K–45K/yr; production ML experience unlocks higher bands" },
      { level: "Senior DS / L5",   yearsExp: "5–9 years",  baseSalary: "$150,000 – $185,000", totalComp: "$195,000 – $280,000", equityNote: "MLOps/production ML seniors approach SWE L5 compensation" },
      { level: "Staff DS / L6",    yearsExp: "9+ years",   baseSalary: "$180,000 – $220,000", totalComp: "$300,000 – $450,000+",equityNote: "Research Scientists / Staff DSs at AI labs can far exceed this range" },
    ],
    negotiationScript: `"Thank you — I'm really interested in joining the team. I've been looking at market data for data scientists with production ML experience at this scale, and I was expecting something closer to [$X] total compensation. Given my background in [specific skill — MLOps, experimentation, NLP, etc.], I think that's a fair ask. Is there room to move?"`,
    salaryFactors: [
      "Research vs applied split: AI/research scientists at top labs (OpenAI, Anthropic, DeepMind) earn dramatically more than applied DS at typical companies",
      "Production ML premium: DSs with MLOps and deployment experience earn 15–25% more than pure notebook scientists",
      "Domain specialty: NLP, computer vision, and reinforcement learning specialists command premium rates",
      "PhD premium: 5–15% in research-leaning roles; minimal in applied/startup settings",
      "Industry vertical: finance (quant/data science hybrids), healthcare AI, and adtech pay highest outside pure AI labs",
    ],
    sources: "Data aggregated from Levels.fyi, Glassdoor, LinkedIn Salary, Kaggle annual survey (2025–2026). AI lab compensation varies significantly and may exceed ranges shown.",
  },
  "financial-analyst": {
    medianBase: "$80,000",
    medianTotal: "$95,000",
    topPayingCities: ["New York City", "San Francisco", "Chicago", "Boston", "Houston"],
    levels: [
      { level: "Analyst",          yearsExp: "0–3 years",  baseSalary: "$65,000 – $90,000",   totalComp: "$75,000 – $110,000", equityNote: "IB analysts: $80–100K base + $30–60K bonus. Corp FP&A: modest or no equity" },
      { level: "Senior Analyst",   yearsExp: "3–6 years",  baseSalary: "$85,000 – $115,000",  totalComp: "$100,000 – $145,000", equityNote: "Performance bonus 10–20% of base at most companies" },
      { level: "Manager / VP",     yearsExp: "6–10 years", baseSalary: "$110,000 – $150,000", totalComp: "$140,000 – $200,000", equityNote: "Equity more common in public company management roles" },
      { level: "Director / SVP",   yearsExp: "10+ years",  baseSalary: "$150,000 – $200,000", totalComp: "$200,000 – $350,000+",equityNote: "Significant equity + substantial bonus at director level" },
    ],
    negotiationScript: `"Thank you for the offer. Based on my research using Glassdoor and conversations with peers in FP&A at comparable companies, I was expecting a base in the [$X] range. I'm also curious about the bonus structure — could you walk me through how bonus targets are set? I want to make sure I understand the total compensation picture before I respond."`,
    salaryFactors: [
      "Track (IB vs PE vs HF vs Corp FP&A): IB and buy-side pay dramatically more than corporate finance roles",
      "Firm tier: bulge bracket IB analysts earn $80K+ base with $30–60K bonus; boutique firms pay less",
      "Industry: tech, energy, and finance industry FP&A roles pay 15–25% more than non-profit or government",
      "CFA designation: adds 10–15% at investment management firms; less impact in corporate roles",
      "SQL and Python fluency: increasingly commanding a 'quant premium' in data-heavy FP&A and research roles",
    ],
    sources: "Data aggregated from Wall Street Oasis, Glassdoor, LinkedIn Salary, and CFA Institute compensation reports (2025–2026). IB compensation varies substantially by firm and deal flow.",
  },
  "marketing-manager": {
    medianBase: "$95,000",
    medianTotal: "$110,000",
    topPayingCities: ["San Francisco Bay Area", "New York City", "Los Angeles", "Seattle", "Chicago"],
    levels: [
      { level: "Marketing Coordinator / Specialist", yearsExp: "0–3 years",  baseSalary: "$50,000 – $75,000",  totalComp: "$55,000 – $85,000",  equityNote: "Minimal equity outside of startups and tech companies" },
      { level: "Marketing Manager",                  yearsExp: "3–7 years",  baseSalary: "$80,000 – $115,000", totalComp: "$90,000 – $130,000",  equityNote: "10–15% annual bonus common; equity at growth-stage companies" },
      { level: "Senior / Sr. Marketing Manager",     yearsExp: "7–12 years", baseSalary: "$110,000 – $145,000",totalComp: "$130,000 – $170,000",  equityNote: "Significant equity at tech companies; bonus 15–20% of base" },
      { level: "Director of Marketing / VP",         yearsExp: "12+ years",  baseSalary: "$145,000 – $200,000",totalComp: "$185,000 – $280,000+", equityNote: "Heavy equity and performance bonus; significant variation by company" },
    ],
    negotiationScript: `"I'm really excited about this role and the team. After reviewing the offer and benchmarking against similar roles at comparable companies, I was hoping we could discuss the base — I was targeting around [$X]. I'd also like to understand the bonus structure better: how are targets set, and what's a realistic range for someone in this role? I want to make sure I have the full picture."`,
    salaryFactors: [
      "Industry vertical: tech marketing managers earn 20–40% more than equivalent roles in non-profit, retail, or healthcare",
      "Channel specialty: growth/performance marketing specialists command premium; brand and content managers earn less",
      "B2B vs B2C: enterprise B2B marketing roles often pay more, especially with a pipeline/revenue ownership component",
      "Company stage: Series C–D growth-stage companies pay aggressive total compensation including significant equity",
      "P&L ownership: marketing leaders who own a budget and a revenue number earn substantially more than those who don't",
    ],
    sources: "Data aggregated from Glassdoor, LinkedIn Salary, HubSpot State of Marketing reports, and Built In salary data (2025–2026).",
  },
};

function getSalaryData(role: string): SalaryData | null {
  if (SALARY_DATA[role]) return SALARY_DATA[role];
  const display = ROLE_DISPLAY[role];
  if (!display) return null;
  return {
    medianBase: "Varies by location, company, and experience",
    medianTotal: "Varies by location, company, and experience",
    topPayingCities: ["San Francisco Bay Area", "New York City", "Seattle", "Boston", "Chicago"],
    levels: [
      { level: "Entry Level",  yearsExp: "0–2 years",  baseSalary: "Typically $50,000 – $80,000",   totalComp: "Typically $55,000 – $90,000",  equityNote: "Limited equity at this level outside tech companies" },
      { level: "Mid Level",    yearsExp: "2–5 years",  baseSalary: "Typically $75,000 – $110,000",  totalComp: "Typically $85,000 – $125,000", equityNote: "Performance bonus 5–15% common; equity at growth-stage tech companies" },
      { level: "Senior Level", yearsExp: "5–10 years", baseSalary: "Typically $105,000 – $145,000", totalComp: "Typically $120,000 – $170,000", equityNote: "Equity and bonus become more significant at senior levels" },
      { level: "Manager / Director", yearsExp: "10+ years", baseSalary: "Typically $140,000 – $190,000", totalComp: "Typically $165,000 – $240,000+", equityNote: "Leadership roles carry meaningful equity components" },
    ],
    negotiationScript: `"Thank you for the offer — I'm genuinely interested in this role. Based on my research on comparable positions at similar companies, I was expecting a base closer to [$X]. I'm confident I can bring [specific value relevant to their team] from day one. Is there flexibility to move toward that number?"`,
    salaryFactors: [
      "Industry vertical: tech, finance, and consulting typically pay more than non-profit, government, or education",
      "Company size and stage: startups offer equity upside; large companies offer stability and higher base",
      "Location: major tech hubs pay 20–40% more than secondary markets for most roles",
      "Specialization depth: niche expertise commands a premium over generalist roles",
      "Negotiation: always counter — most hiring managers have a range with room above the first offer",
    ],
    sources: "Data aggregated from Glassdoor, LinkedIn Salary, and Bureau of Labor Statistics (2025–2026). Individual packages vary significantly.",
  };
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role } = await params;
  const display = ROLE_DISPLAY[role];
  if (!display) return { title: "Salary Guide — Preciprocal" };
  const data = getSalaryData(role);
  return {
    title: `${display.name} Salary Guide 2026 — Base, Total Comp & Negotiation Tips`,
    description: `2026 salary data for ${display.name.toLowerCase()}s: base salary ranges by level, total compensation breakdowns, equity benchmarks, and negotiation scripts. Median base: ${data?.medianBase ?? "varies"}.`,
    alternates: { canonical: `https://preciprocal.com/salary-guide/${role}` },
    openGraph: {
      title: `${display.name} Salary Guide 2026 — Preciprocal`,
      description: `Salary ranges, equity data, and negotiation scripts for ${display.name.toLowerCase()}s in 2026.`,
      url: `https://preciprocal.com/salary-guide/${role}`,
      type: "article",
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function SalaryGuideRolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const display = ROLE_DISPLAY[role];
  if (!display) notFound();

  const salaryData = getSalaryData(role);
  if (!salaryData) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${display.name} Salary Guide 2026`,
    description: `2026 salary data, equity benchmarks, and negotiation scripts for ${display.name.toLowerCase()}s.`,
    url: `https://preciprocal.com/salary-guide/${role}`,
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
          { name: "Salary Guide", url: "https://preciprocal.com/salary-guide" },
          { name: `${display.name} Salary`, url: `https://preciprocal.com/salary-guide/${role}` },
        ]}
      />
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 page-main">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ color: "#64748b" }} className="text-sm mb-8 flex gap-2 items-center flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link href="/salary-guide" className="hover:text-white transition-colors">Salary Guide</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>{display.name}</span>
        </nav>

        {/* H1 */}
        <div className="mb-10">
          <span className="text-3xl">{display.icon}</span>
          <h1 style={{ color: "#ffffff" }} className="text-4xl sm:text-5xl font-extrabold mt-3 mb-4 tracking-tight leading-tight">
            {display.name} salary guide 2026
          </h1>
          <p style={{ color: "#94a3b8" }} className="text-lg leading-relaxed">
            Real salary data for {display.name.toLowerCase()}s — base pay, total compensation, equity benchmarks, and how to negotiate your next offer.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="p-5 rounded-2xl border text-center" style={{ background: "rgba(16,185,129,0.05)", borderColor: "rgba(16,185,129,0.2)" }}>
            <p style={{ color: "#6ee7b7" }} className="text-xs font-semibold uppercase tracking-wider mb-1">Median Base Salary</p>
            <p style={{ color: "#ffffff" }} className="text-2xl font-extrabold">{salaryData.medianBase}</p>
          </div>
          <div className="p-5 rounded-2xl border text-center" style={{ background: "rgba(99,102,241,0.05)", borderColor: "rgba(99,102,241,0.2)" }}>
            <p style={{ color: "#a5b4fc" }} className="text-xs font-semibold uppercase tracking-wider mb-1">Median Total Comp</p>
            <p style={{ color: "#ffffff" }} className="text-2xl font-extrabold">{salaryData.medianTotal}</p>
          </div>
        </div>

        {/* Salary by level table */}
        <section className="mb-10">
          <h2 style={{ color: "#ffffff" }} className="text-xl font-bold mb-4">{display.name} salary by level</h2>
          <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <th style={{ color: "#94a3b8" }} className="text-left p-3 font-semibold text-xs uppercase tracking-wider">Level</th>
                  <th style={{ color: "#94a3b8" }} className="text-left p-3 font-semibold text-xs uppercase tracking-wider">Experience</th>
                  <th style={{ color: "#94a3b8" }} className="text-left p-3 font-semibold text-xs uppercase tracking-wider">Base Salary</th>
                  <th style={{ color: "#94a3b8" }} className="text-left p-3 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Total Comp</th>
                </tr>
              </thead>
              <tbody>
                {salaryData.levels.map((level, i) => (
                  <tr key={i} style={{ borderBottom: i < salaryData.levels.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                    <td style={{ color: "#e2e8f0" }} className="p-3 font-medium">{level.level}</td>
                    <td style={{ color: "#64748b" }} className="p-3 text-xs">{level.yearsExp}</td>
                    <td style={{ color: "#6ee7b7" }} className="p-3 font-medium">{level.baseSalary}</td>
                    <td style={{ color: "#a5b4fc" }} className="p-3 font-medium hidden sm:table-cell">{level.totalComp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "#475569" }} className="text-xs mt-3">Equity notes and total comp details below each level.</p>
          <div className="mt-4 space-y-2">
            {salaryData.levels.map((level, i) => (
              <div key={i} className="flex items-start gap-2">
                <span style={{ color: "#a5b4fc" }} className="text-xs font-bold mt-0.5 min-w-fit">{level.level}:</span>
                <p style={{ color: "#64748b" }} className="text-xs">{level.equityNote}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top paying cities */}
        <section className="mb-10 p-5 rounded-2xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
          <h2 style={{ color: "#ffffff" }} className="text-lg font-bold mb-4">Top paying cities for {display.name.toLowerCase()}s</h2>
          <ol className="space-y-2">
            {salaryData.topPayingCities.map((city, i) => (
              <li key={i} className="flex items-center gap-3">
                <span style={{ color: "#a5b4fc" }} className="text-sm font-bold w-5">{i + 1}.</span>
                <span style={{ color: "#e2e8f0" }} className="text-sm">{city}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* What factors affect salary */}
        <section className="mb-10">
          <h2 style={{ color: "#ffffff" }} className="text-xl font-bold mb-5">What determines your {display.name.toLowerCase()} salary</h2>
          <ul className="space-y-3">
            {salaryData.salaryFactors.map((factor, i) => (
              <li key={i} className="flex items-start gap-3">
                <span style={{ color: "#6ee7b7" }} className="text-sm font-bold mt-0.5 flex-shrink-0">→</span>
                <p style={{ color: "#94a3b8" }} className="text-sm leading-relaxed">{factor}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Negotiation script */}
        <section className="mb-10 p-5 rounded-2xl border" style={{ background: "rgba(245,158,11,0.04)", borderColor: "rgba(245,158,11,0.15)" }}>
          <h2 style={{ color: "#ffffff" }} className="text-lg font-bold mb-3">Negotiation script that works</h2>
          <p style={{ color: "#94a3b8" }} className="text-sm mb-4">
            Use this exact script when you receive a {display.name.toLowerCase()} offer. Most hiring managers expect negotiation and have 5–15% room above the first offer.
          </p>
          <div className="p-4 rounded-xl font-mono text-sm leading-relaxed" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#fcd34d" }}>
            {salaryData.negotiationScript}
          </div>
          <p style={{ color: "#64748b" }} className="text-xs mt-3">Replace [$X] with your target number. Research Levels.fyi, Glassdoor, and LinkedIn Salary before the conversation.</p>
        </section>

        {/* Sources */}
        <p style={{ color: "#374151" }} className="text-xs mb-10">{salaryData.sources}</p>

        {/* Cross-links */}
        <div className="mb-10 grid sm:grid-cols-3 gap-4">
          <Link href={`/resume-tips/${role}`} className="p-4 rounded-xl border transition-all hover:border-emerald-500/30" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
            <p style={{ color: "#e2e8f0" }} className="font-medium text-sm mb-1">Resume tips</p>
            <p style={{ color: "#475569" }} className="text-xs">{display.name} resume guide →</p>
          </Link>
          <Link href={`/cover-letter-examples/${role}`} className="p-4 rounded-xl border transition-all hover:border-emerald-500/30" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
            <p style={{ color: "#e2e8f0" }} className="font-medium text-sm mb-1">Cover letter</p>
            <p style={{ color: "#475569" }} className="text-xs">{display.name} examples →</p>
          </Link>
          <Link href={`/interview-questions/${role}`} className="p-4 rounded-xl border transition-all hover:border-emerald-500/30" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
            <p style={{ color: "#e2e8f0" }} className="font-medium text-sm mb-1">Interview prep</p>
            <p style={{ color: "#475569" }} className="text-xs">Practice questions →</p>
          </Link>
        </div>

        {/* CTA */}
        <div className="p-8 text-center rounded-2xl border" style={{ background: "rgba(16,185,129,0.05)", borderColor: "rgba(16,185,129,0.2)" }}>
          <h2 style={{ color: "#ffffff" }} className="text-xl font-bold mb-2">Land the interview first</h2>
          <p style={{ color: "#94a3b8" }} className="text-sm mb-6 max-w-sm mx-auto">
            You can't negotiate a salary you haven't been offered. Get your resume past ATS and practice your interview with Preciprocal.
          </p>
          <a href={`${APP_URL}/sign-up`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
            Start preparing free →
          </a>
          <p style={{ color: "#475569" }} className="text-xs mt-3">No credit card required · Free plan available</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}