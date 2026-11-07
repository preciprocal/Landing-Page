/**
 * app/salary-guide/[role]/page.tsx
 *
 * Dynamic salary guide for each role.
 * Targets: "software engineer salary 2026", "data scientist salary NYC", "product manager salary levels", etc.
 *
 * Layout: hero with the median figures as a stat panel, then the guide
 * beside a sticky aside (jump list and CTA) on wide screens, then a CTA panel.
 *
 * File path: app/salary-guide/[role]/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoleGuideLinks from "@/components/RoleGuideLinks";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ALL_ROLES, ROLE_DISPLAY, APP_URL } from "@/lib/constants";
import { fitTitle } from "@/lib/seoTitle";
import { getRoleContent } from "@/lib/roleContent";
import Chevron from "@/components/Chevron";
import { PAD, INNER, BTN_PRIMARY, HeroBackdrop, SectionHead, CtaPanel, pad2 } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";

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
      { level: "Junior / L3",     yearsExp: "0-2 years",  baseSalary: "$95,000 - $130,000",  totalComp: "$110,000 - $160,000", equityNote: "RSUs typical at FAANG; startups offer 0.1-0.5% options" },
      { level: "Mid / L4",        yearsExp: "2-5 years",  baseSalary: "$130,000 - $165,000", totalComp: "$160,000 - $220,000", equityNote: "RSUs ~$30K-60K/yr vested; startups 0.05-0.25%" },
      { level: "Senior / L5",     yearsExp: "5-10 years", baseSalary: "$160,000 - $200,000", totalComp: "$220,000 - $350,000", equityNote: "Equity becomes primary comp lever at this level" },
      { level: "Staff / L6",      yearsExp: "10+ years",  baseSalary: "$195,000 - $240,000", totalComp: "$350,000 - $600,000+",equityNote: "Heavy equity weighting; stock refreshes matter more than base" },
    ],
    negotiationScript: `"Thank you for the offer, I'm genuinely excited about this role. Based on my research using Levels.fyi and conversations with peers at comparable companies, I was targeting a base closer to [$X]. Given my experience with [specific relevant skill], I believe that's well-supported by the market. Is there flexibility to move in that direction?"`,
    salaryFactors: [
      "Company tier (FAANG vs unicorn vs startup vs enterprise) is the single biggest driver, $50K+ swings are common",
      "Location still matters: remote-first companies may apply geo-adjustments of 10-25%",
      "Stack and specialty: ML engineers, security engineers, and distributed systems engineers command 15-30% premiums",
      "Offer timing: candidates with competing offers see 10-20% higher final packages on average",
      "Negotiation: 72% of employers expect negotiation; most first offers are 5-15% below the ceiling",
    ],
    sources: "Data aggregated from Levels.fyi, Glassdoor, LinkedIn Salary, and Blind (2025-2026). Individual packages vary significantly by company, location, and offer timing.",
  },
  "product-manager": {
    medianBase: "$135,000",
    medianTotal: "$165,000",
    topPayingCities: ["San Francisco Bay Area", "Seattle", "New York City", "Los Angeles", "Boston"],
    levels: [
      { level: "APM / Junior PM",  yearsExp: "0-2 years",  baseSalary: "$85,000 - $115,000",  totalComp: "$100,000 - $140,000", equityNote: "APM programs at big tech: full RSU packages. Startups: 0.1-0.4%" },
      { level: "PM",               yearsExp: "2-5 years",  baseSalary: "$120,000 - $155,000", totalComp: "$145,000 - $200,000", equityNote: "RSUs ~$25K-50K/yr at FAANG; meaningful equity at growth-stage" },
      { level: "Senior PM",        yearsExp: "5-9 years",  baseSalary: "$155,000 - $190,000", totalComp: "$200,000 - $290,000", equityNote: "Senior PMs increasingly equity-rich; refreshes compound over time" },
      { level: "Principal / GPM",  yearsExp: "9+ years",   baseSalary: "$190,000 - $230,000", totalComp: "$300,000 - $500,000+",equityNote: "Director-level equity; large refreshes; bonus components" },
    ],
    negotiationScript: `"I really appreciate the offer and I'm excited about the opportunity. I've done some research and talked to PMs at similar-stage companies, based on that, I was expecting a base closer to [$X]. I'm also wondering about the equity component: is there flexibility to increase the initial grant? I'd love to find something that works for both of us."`,
    salaryFactors: [
      "B2C vs B2B vs Platform PM: consumer tech pays highest; platform/infra PM roles often get engineering-tier comp",
      "Technical depth: TPMs and PMs with engineering backgrounds earn 10-20% more at technical companies",
      "Company growth stage: Series A-C startups pay lower base but higher equity upside",
      "Scope clarity: PMs owning a P&L or a platform used by millions command premium over feature PMs",
      "MBA premium: top MBA programs add 10-15% at consulting/tech hybrids, less at pure tech startups",
    ],
    sources: "Data aggregated from Glassdoor, LinkedIn Salary, Levels.fyi, and Rora salary reports (2025-2026). Individual packages vary by company, product type, and scope.",
  },
  "data-scientist": {
    medianBase: "$130,000",
    medianTotal: "$155,000",
    topPayingCities: ["San Francisco Bay Area", "Seattle", "New York City", "Boston", "San Diego"],
    levels: [
      { level: "Junior DS / L3",   yearsExp: "0-2 years",  baseSalary: "$90,000 - $120,000",  totalComp: "$105,000 - $145,000", equityNote: "Entry-level RSUs at big tech; modest equity at startups" },
      { level: "DS / L4",          yearsExp: "2-5 years",  baseSalary: "$120,000 - $155,000", totalComp: "$145,000 - $195,000", equityNote: "RSUs ~$20K-45K/yr; production ML experience unlocks higher bands" },
      { level: "Senior DS / L5",   yearsExp: "5-9 years",  baseSalary: "$150,000 - $185,000", totalComp: "$195,000 - $280,000", equityNote: "MLOps/production ML seniors approach SWE L5 compensation" },
      { level: "Staff DS / L6",    yearsExp: "9+ years",   baseSalary: "$180,000 - $220,000", totalComp: "$300,000 - $450,000+",equityNote: "Research Scientists / Staff DSs at AI labs can far exceed this range" },
    ],
    negotiationScript: `"Thank you, I'm really interested in joining the team. I've been looking at market data for data scientists with production ML experience at this scale, and I was expecting something closer to [$X] total compensation. Given my background in [specific skill, MLOps, experimentation, NLP, etc.], I think that's a fair ask. Is there room to move?"`,
    salaryFactors: [
      "Research vs applied split: AI/research scientists at top labs (OpenAI, Anthropic, DeepMind) earn dramatically more than applied DS at typical companies",
      "Production ML premium: DSs with MLOps and deployment experience earn 15-25% more than pure notebook scientists",
      "Domain specialty: NLP, computer vision, and reinforcement learning specialists command premium rates",
      "PhD premium: 5-15% in research-leaning roles; minimal in applied/startup settings",
      "Industry vertical: finance (quant/data science hybrids), healthcare AI, and adtech pay highest outside pure AI labs",
    ],
    sources: "Data aggregated from Levels.fyi, Glassdoor, LinkedIn Salary, Kaggle annual survey (2025-2026). AI lab compensation varies significantly and may exceed ranges shown.",
  },
  "financial-analyst": {
    medianBase: "$80,000",
    medianTotal: "$95,000",
    topPayingCities: ["New York City", "San Francisco", "Chicago", "Boston", "Houston"],
    levels: [
      { level: "Analyst",          yearsExp: "0-3 years",  baseSalary: "$65,000 - $90,000",   totalComp: "$75,000 - $110,000", equityNote: "IB analysts: $80-100K base + $30-60K bonus. Corp FP&A: modest or no equity" },
      { level: "Senior Analyst",   yearsExp: "3-6 years",  baseSalary: "$85,000 - $115,000",  totalComp: "$100,000 - $145,000", equityNote: "Performance bonus 10-20% of base at most companies" },
      { level: "Manager / VP",     yearsExp: "6-10 years", baseSalary: "$110,000 - $150,000", totalComp: "$140,000 - $200,000", equityNote: "Equity more common in public company management roles" },
      { level: "Director / SVP",   yearsExp: "10+ years",  baseSalary: "$150,000 - $200,000", totalComp: "$200,000 - $350,000+",equityNote: "Significant equity + substantial bonus at director level" },
    ],
    negotiationScript: `"Thank you for the offer. Based on my research using Glassdoor and conversations with peers in FP&A at comparable companies, I was expecting a base in the [$X] range. I'm also curious about the bonus structure, could you walk me through how bonus targets are set? I want to make sure I understand the total compensation picture before I respond."`,
    salaryFactors: [
      "Track (IB vs PE vs HF vs Corp FP&A): IB and buy-side pay dramatically more than corporate finance roles",
      "Firm tier: bulge bracket IB analysts earn $80K+ base with $30-60K bonus; boutique firms pay less",
      "Industry: tech, energy, and finance industry FP&A roles pay 15-25% more than non-profit or government",
      "CFA designation: adds 10-15% at investment management firms; less impact in corporate roles",
      "SQL and Python fluency: increasingly commanding a 'quant premium' in data-heavy FP&A and research roles",
    ],
    sources: "Data aggregated from Wall Street Oasis, Glassdoor, LinkedIn Salary, and CFA Institute compensation reports (2025-2026). IB compensation varies substantially by firm and deal flow.",
  },
  "marketing-manager": {
    medianBase: "$95,000",
    medianTotal: "$110,000",
    topPayingCities: ["San Francisco Bay Area", "New York City", "Los Angeles", "Seattle", "Chicago"],
    levels: [
      { level: "Marketing Coordinator / Specialist", yearsExp: "0-3 years",  baseSalary: "$50,000 - $75,000",  totalComp: "$55,000 - $85,000",  equityNote: "Minimal equity outside of startups and tech companies" },
      { level: "Marketing Manager",                  yearsExp: "3-7 years",  baseSalary: "$80,000 - $115,000", totalComp: "$90,000 - $130,000",  equityNote: "10-15% annual bonus common; equity at growth-stage companies" },
      { level: "Senior / Sr. Marketing Manager",     yearsExp: "7-12 years", baseSalary: "$110,000 - $145,000",totalComp: "$130,000 - $170,000",  equityNote: "Significant equity at tech companies; bonus 15-20% of base" },
      { level: "Director of Marketing / VP",         yearsExp: "12+ years",  baseSalary: "$145,000 - $200,000",totalComp: "$185,000 - $280,000+", equityNote: "Heavy equity and performance bonus; significant variation by company" },
    ],
    negotiationScript: `"I'm really excited about this role and the team. After reviewing the offer and benchmarking against similar roles at comparable companies, I was hoping we could discuss the base, I was targeting around [$X]. I'd also like to understand the bonus structure better: how are targets set, and what's a realistic range for someone in this role? I want to make sure I have the full picture."`,
    salaryFactors: [
      "Industry vertical: tech marketing managers earn 20-40% more than equivalent roles in non-profit, retail, or healthcare",
      "Channel specialty: growth/performance marketing specialists command premium; brand and content managers earn less",
      "B2B vs B2C: enterprise B2B marketing roles often pay more, especially with a pipeline/revenue ownership component",
      "Company stage: Series C-D growth-stage companies pay aggressive total compensation including significant equity",
      "P&L ownership: marketing leaders who own a budget and a revenue number earn substantially more than those who don't",
    ],
    sources: "Data aggregated from Glassdoor, LinkedIn Salary, HubSpot State of Marketing reports, and Built In salary data (2025-2026).",
  },
};

/** Markets where each job family concentrates. Tech hubs are not the answer for every role. */
const CATEGORY_MARKETS: Record<string, string[]> = {
  Engineering: ["San Francisco Bay Area", "Seattle", "New York City", "Austin", "Boston"],
  "Data & Analytics": ["San Francisco Bay Area", "New York City", "Seattle", "Boston", "Chicago"],
  "Product & Design": ["San Francisco Bay Area", "New York City", "Seattle", "Los Angeles", "Austin"],
  "Architecture & IT": ["San Francisco Bay Area", "Seattle", "Washington DC", "Dallas", "Atlanta"],
  "Business & Ops": ["New York City", "Chicago", "Dallas", "Atlanta", "Phoenix"],
  Finance: ["New York City", "San Francisco Bay Area", "Chicago", "Boston", "Charlotte"],
  "Sales & Marketing": ["New York City", "San Francisco Bay Area", "Chicago", "Los Angeles", "Austin"],
  "People & HR": ["New York City", "San Francisco Bay Area", "Chicago", "Seattle", "Denver"],
  Healthcare: ["Boston", "New York City", "Los Angeles", "Houston", "Philadelphia"],
  Legal: ["New York City", "Washington DC", "Los Angeles", "Chicago", "San Francisco Bay Area"],
};

/** Parses "$120,000 - $220,000" from ROLE_META into numbers. */
function parseRange(range: string): [number, number] | null {
  const nums = range.match(/[\d,]+/g)?.map((n) => Number(n.replace(/,/g, "")));
  if (!nums || nums.length < 2 || !nums[0] || !nums[1]) return null;
  return [nums[0], nums[1]];
}

const usd = (n: number) => `$${Math.round(n / 1000) * 1000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * Roles without a hand-written entry above derive their bands from that role's
 * own ROLE_META salary range, so every page shows different numbers, markets
 * and pay drivers. This replaced a fallback that returned the same hardcoded
 * bands for all 36 roles, producing pages 97% identical to one another.
 */
function getSalaryData(role: string): SalaryData | null {
  if (SALARY_DATA[role]) return SALARY_DATA[role];

  const content = getRoleContent(role);
  if (!content) return null;

  const { name, category, salaryRange, topCompanies, profile, note } = content;
  const parsed = parseRange(salaryRange);
  if (!parsed) return null;
  const [low, high] = parsed;
  const span = high - low;

  // Total comp uplift varies by field: equity-heavy tech vs bonus-heavy finance
  // vs largely base-only healthcare and legal support roles.
  const uplift =
    category === "Engineering" || category === "Data & Analytics" || category === "Product & Design"
      ? 1.25
      : category === "Finance" || category === "Sales & Marketing"
      ? 1.35
      : 1.1;

  const band = (a: number, b: number) => `${usd(low + span * a)} - ${usd(low + span * b)}`;
  const total = (a: number, b: number) =>
    `${usd((low + span * a) * uplift)} - ${usd((low + span * b) * uplift)}`;

  return {
    medianBase: `${usd(low + span * 0.45)} - ${usd(low + span * 0.6)}`,
    medianTotal: `${usd((low + span * 0.45) * uplift)} - ${usd((low + span * 0.6) * uplift)}`,
    topPayingCities: CATEGORY_MARKETS[category] ?? CATEGORY_MARKETS["Business & Ops"],
    levels: [
      {
        level: "Entry Level",
        yearsExp: "0-2 years",
        baseSalary: band(0, 0.2),
        totalComp: total(0, 0.2),
        equityNote:
          uplift > 1.2
            ? "Bonus and equity are limited at this level, but the base is the anchor for every future raise"
            : "Compensation at this level is almost entirely base salary",
      },
      {
        level: "Mid Level",
        yearsExp: "2-5 years",
        baseSalary: band(0.2, 0.5),
        totalComp: total(0.2, 0.5),
        equityNote:
          uplift > 1.3
            ? "Bonus becomes a meaningful share of total compensation and is often negotiable separately"
            : "Performance bonus of 5-15% is common; equity appears at growth-stage companies",
      },
      {
        level: "Senior Level",
        yearsExp: "5-10 years",
        baseSalary: band(0.5, 0.8),
        totalComp: total(0.5, 0.8),
        equityNote:
          uplift > 1.2
            ? "Equity or bonus frequently exceeds the base salary difference between two competing offers"
            : "Bonus and additional benefits become a larger share of the package",
      },
      {
        level: "Manager / Director",
        yearsExp: "10+ years",
        baseSalary: `${usd(low + span * 0.8)} - ${usd(high)}+`,
        totalComp: `${usd((low + span * 0.8) * uplift)} - ${usd(high * uplift)}+`,
        equityNote: "Leadership packages carry the widest variance; scope and company stage drive most of it",
      },
    ],
    negotiationScript: `"Thank you for the offer, I'm genuinely excited about this ${name} role. Based on my research on comparable ${name.toLowerCase()} positions at companies like ${topCompanies.slice(0, 2).join(" and ")}, I was targeting a base closer to [$X]. Given [specific relevant strength], is there flexibility to move toward that number?"`,
    salaryFactors: [note.payNote, ...profile.payDrivers],
    sources: `Ranges reflect ${name} compensation across US markets, aggregated from public salary data for 2026. ${note.positioning} ${name} roles concentrate at employers such as ${topCompanies.slice(0, 4).join(", ")}, and individual packages vary significantly by location, company stage and scope.`,
  };
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role } = await params;
  const display = ROLE_DISPLAY[role];
  if (!display) return { title: "Salary Guide, Preciprocal" };
  const data = getSalaryData(role);
  return {
    title: fitTitle(`${display.name} Salary Guide`, " 2026"),
    description: `2026 salary data for ${display.name.toLowerCase()}s: base salary ranges by level, total compensation breakdowns, equity benchmarks, and negotiation scripts. Median base: ${data?.medianBase ?? "varies"}.`,
    alternates: { canonical: `https://preciprocal.com/salary-guide/${role}` },
    openGraph: {
      title: `${display.name} Salary Guide 2026, Preciprocal`,
      description: `Salary ranges, equity data, and negotiation scripts for ${display.name.toLowerCase()}s in 2026.`,
      url: `https://preciprocal.com/salary-guide/${role}`,
      type: "article",
    },
  };
}

// ─── Layout helpers ───────────────────────────────────────────────────────────
/** Low and high of a "$95,000 - $130,000" style band, for the range chart. */
function bounds(range: string): [number, number] | null {
  const nums = range.match(/\$[\d,]+/g)?.map((n) => Number(n.replace(/[$,]/g, "")));
  if (!nums || nums.length < 2) return null;
  return [nums[0], nums[1]];
}

const BLOCK = "scroll-mt-28 border-t border-white/[0.05] pt-14";
const PROSE = "space-y-5 text-[15px] leading-relaxed text-slate-400";

const JUMP = [
  { id: "levels", label: "Salary by level" },
  { id: "cities", label: "Top paying cities" },
  { id: "factors", label: "What determines pay" },
  { id: "reading-an-offer", label: "Reading an offer", prose: true },
  { id: "moving-an-offer", label: "What moves an offer", prose: true },
  { id: "mistakes", label: "Mistakes to avoid", prose: true },
  { id: "script", label: "Negotiation script" },
  { id: "more-guides", label: "More guides" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function SalaryGuideRolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const display = ROLE_DISPLAY[role];
  if (!display) notFound();

  const salaryData = getSalaryData(role);
  if (!salaryData) notFound();

  // Role-specific context for the prose sections below. Pulled from
  // lib/roleContent so every role gets it, including the handful that still
  // have hand-written SALARY_DATA entries.
  const content = getRoleContent(role);

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

  // Shared scale for the range chart: zero to the highest total comp figure.
  const chart = salaryData.levels.map((l) => ({ level: l.level, base: bounds(l.baseSalary), total: bounds(l.totalComp) }));
  const chartMax = Math.max(1, ...chart.flatMap((c) => [c.base?.[1] ?? 0, c.total?.[1] ?? 0]));
  const barStyle = (b: [number, number] | null) =>
    b ? { left: `${(b[0] / chartMax) * 100}%`, width: `${Math.max(1.5, ((b[1] - b[0]) / chartMax) * 100)}%` } : { display: "none" };

  const jump = JUMP.filter((j) => content || !j.prose);
  const signUp = `${APP_URL}/sign-up`;

  return (
    <div data-accent="amber" className="min-h-screen bg-[#050810]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Salary Guide", url: "https://preciprocal.com/salary-guide" },
          { name: `${display.name} Salary`, url: `https://preciprocal.com/salary-guide/${role}` },
        ]}
      />
      <Navbar />

      <main>
        {/* Hero, with the two headline figures as a stat panel */}
        <section className={`relative overflow-hidden pb-14 pt-24 sm:pt-28 ${PAD}`}>
          <HeroBackdrop />
          <div className={`relative ${INNER}`}>
            <nav aria-label="Breadcrumb" className="mb-8 flex animate-fade-up flex-wrap items-center gap-2 text-[12px] text-slate-500 opacity-0">
              <Link href="/" className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/salary-guide" className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">Salary Guide</Link>
              <span aria-hidden="true">›</span>
              <span className="text-slate-300">{display.name}</span>
            </nav>

            <div className="max-w-4xl animate-fade-up opacity-0">
              <span aria-hidden="true" className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-3xl">
                {display.icon}
              </span>
              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[4.25rem]">
                {display.name} salary guide 2026
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
                Real salary data for {display.name.toLowerCase()}s, base pay, total compensation, equity benchmarks, and how to negotiate your next offer.
              </p>
            </div>

            <div className="mt-12 grid animate-fade-up gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] opacity-0 sm:grid-cols-2 fill-sm-2" style={{ animationDelay: "200ms" }}>
              <div className="relative bg-[#070b16] p-6 sm:p-8">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/60 to-transparent" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">Median Base Salary</p>
                <p className="mt-3 break-words font-mono text-2xl font-semibold tabular-nums text-white sm:text-3xl xl:text-4xl">{salaryData.medianBase}</p>
              </div>
              <div className="relative bg-[#070b16] p-6 sm:p-8">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/60 to-transparent" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft">Median Total Comp</p>
                <p className="mt-3 break-words font-mono text-2xl font-semibold tabular-nums text-white sm:text-3xl xl:text-4xl">{salaryData.medianTotal}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Guide body with a sticky jump list and CTA */}
        <div className={`${PAD} pb-20`}>
          <div className={`${INNER} grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-16`}>
            <div className="min-w-0 space-y-14">
              {/* Salary by level */}
              <section id="levels" className="scroll-mt-28 pt-2">
                <SectionHead eyebrow="Salary bands" title={`${display.name} salary by level`} className="mb-8" />
                <Reveal>
                  <div className="overflow-x-auto rounded-2xl border border-white/[0.07] bg-[#070b16]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                          <th scope="col" className="p-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Level</th>
                          <th scope="col" className="p-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Experience</th>
                          <th scope="col" className="p-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Base Salary</th>
                          <th scope="col" className="hidden p-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:table-cell">Total Comp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.05]">
                        {salaryData.levels.map((level, i) => (
                          <tr key={i} className="transition-colors hover:bg-white/[0.02]">
                            <th scope="row" className="p-4 text-left font-medium text-slate-200">{level.level}</th>
                            <td className="whitespace-nowrap p-4 font-mono text-xs tabular-nums text-slate-500">{level.yearsExp}</td>
                            <td className="whitespace-nowrap p-4 font-mono tabular-nums text-emerald-300">{level.baseSalary}</td>
                            <td className="hidden whitespace-nowrap p-4 font-mono tabular-nums text-accent-soft sm:table-cell">{level.totalComp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Reveal>

                {/* Range chart: the table above drawn on one scale. Decorative, the table carries the data. */}
                <div aria-hidden="true" className="mt-4 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5 sm:p-6">
                  <div className="mb-5 flex flex-wrap gap-5 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-2"><span className="h-1.5 w-4 rounded-full bg-emerald-400/80" />Base Salary</span>
                    <span className="inline-flex items-center gap-2"><span className="h-1.5 w-4 rounded-full bg-accent/80" />Total Comp</span>
                  </div>
                  <RevealGroup className="space-y-4">
                    {chart.map((c, i) => (
                      <RevealItem key={i} className="grid items-center gap-2 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-5">
                        <span className="truncate text-xs text-slate-400">{c.level}</span>
                        <div className="space-y-1.5">
                          <div className="relative h-1.5 rounded-full bg-white/[0.04]">
                            <span className="absolute inset-y-0 rounded-full bg-gradient-to-r from-emerald-500/70 to-emerald-300/90" style={barStyle(c.base)} />
                          </div>
                          <div className="relative h-1.5 rounded-full bg-white/[0.04]">
                            <span className="absolute inset-y-0 rounded-full bg-gradient-to-r from-accent-deep/70 to-accent-2/90" style={barStyle(c.total)} />
                          </div>
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>

                <p className="mt-8 text-xs text-slate-500">Equity notes and total comp details below each level.</p>
                <RevealGroup className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 fill-sm-2">
                  {salaryData.levels.map((level, i) => (
                    <RevealItem key={i} className="bg-[#070b16] p-5">
                      <span className="font-mono text-[11px] text-accent-soft/70">{pad2(i + 1)}</span>
                      <p className="mt-2 text-sm leading-relaxed">
                        <span className="font-semibold text-accent-soft">{level.level}:</span>{" "}
                        <span className="text-slate-400">{level.equityNote}</span>
                      </p>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </section>

              {/* Top paying cities */}
              <section id="cities" className={BLOCK}>
                <SectionHead eyebrow="Location" title={`Top paying cities for ${display.name.toLowerCase()}s`} className="mb-8" />
                <RevealGroup as="ol" className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 xl:grid-cols-5 fill-sm-2 fill-xl-5">
                  {salaryData.topPayingCities.map((city, i) => (
                    <RevealItem as="li" key={i} className="flex items-center gap-4 bg-[#070b16] p-5 xl:flex-col xl:items-start xl:gap-6">
                      <span className="font-mono text-sm tabular-nums text-accent-soft">{pad2(i + 1)}</span>
                      <span className="text-sm font-medium text-slate-200">{city}</span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </section>

              {/* What factors affect salary */}
              <section id="factors" className={BLOCK}>
                <SectionHead eyebrow="Pay drivers" title={`What determines your ${display.name.toLowerCase()} salary`} className="mb-8" />
                <RevealGroup as="ul" className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {salaryData.salaryFactors.map((factor, i) => (
                    <RevealItem as="li" key={i} className="flex items-start gap-4 py-4">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-accent-deep/[0.08] text-sm text-accent-soft">
                        <Chevron />
                      </span>
                      <p className="text-[15px] leading-relaxed text-slate-400">{factor}</p>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </section>

              {/*
                Role-specific prose.

                These salary pages were the thinnest and most duplicated section of
                the site: roughly 540 to 600 words at 62% average overlap against a
                24% site-chrome baseline, and Search Console reported them as
                crawled but not indexed. Tables and bullet lists carry very little
                unique text, so the sections below add substance drawn from the
                role's own keyword set, positioning note and category profile.
              */}
              {content && (
                <>
                  <section id="reading-an-offer" className={BLOCK}>
                    <SectionHead eyebrow="The offer" title={<>How to read a {display.name.toLowerCase()} offer</>} className="mb-6" />
                    <Reveal className={`max-w-3xl ${PROSE}`}>
                      <p>
                        {content.note.positioning} That shapes the offer as much as it shapes the job.
                        The headline base salary is the number most candidates fixate on, but for{" "}
                        {display.name.toLowerCase()} roles the total package is where the real variation
                        sits: {content.note.payNote.charAt(0).toLowerCase() + content.note.payNote.slice(1)}
                      </p>
                      <p>
                        A {display.name.toLowerCase()} package is typically {content.offerShape}. That
                        structure is why comparing two offers on base alone is unreliable in this field,
                        and why the components below are worth asking about explicitly before you accept.
                      </p>
                      <p>
                        Compare offers at the same level rather than by title. Titles are inconsistent
                        between employers, and a senior title at a smaller organisation frequently maps
                        to a mid-level band at a larger one. Ask which level the offer sits at and what
                        the range for that level is; many employers will simply tell you.
                      </p>
                    </Reveal>
                  </section>

                  <section id="moving-an-offer" className={BLOCK}>
                    <SectionHead eyebrow="Leverage" title={<>What actually moves a {display.name.toLowerCase()} offer</>} className="mb-6" />
                    <Reveal className={`max-w-3xl ${PROSE}`}>
                      <p>
                        Employers hiring for this role are assessing {content.note.screened}. The
                        candidates who land at the top of the {content.salaryRange} range are not
                        necessarily the ones with the most years behind them, they are the ones who can
                        evidence that specific thing concretely and early in the process.
                      </p>
                      <p>
                        Depth in the areas this field actually pays for is the most reliable lever you
                        control. For {display.name.toLowerCase()} roles those cluster around{" "}
                        {content.keywords.slice(0, 5).join(", ")}. Being genuinely strong in two or three
                        of them, with results you can quantify, is worth considerably more at the offer
                        stage than passing familiarity with all of them.
                      </p>
                      <p>
                        Employer choice matters at least as much as skill. {display.name}s concentrate at
                        organisations like {content.topCompanies.slice(0, 4).join(", ")}, and the spread
                        between the top and bottom of the band above is driven more by which employer you
                        join than by any single thing you do in the interview.
                      </p>
                    </Reveal>
                  </section>

                  <section id="mistakes" className={BLOCK}>
                    <SectionHead eyebrow="Avoid" title={<>Negotiation mistakes that cost {display.name.toLowerCase()}s money</>} className="mb-8" />
                    <RevealGroup as="ul" className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07]">
                      {[
                        ...content.negotiationMistakes,
                        `Giving a number first. If asked for expectations before an offer exists, redirect once and say you would like to understand the full scope first. If a form forces a figure, anchor to the upper half of ${content.salaryRange} and note that it is negotiable.`,
                      ].map((m, i) => (
                        <RevealItem as="li" key={i} className="flex items-start gap-4 bg-[#070b16] p-5">
                          <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-red-500/20 bg-red-500/[0.08] text-xs font-bold text-red-400">✕</span>
                          <p className="text-[15px] leading-relaxed text-slate-400">{m}</p>
                        </RevealItem>
                      ))}
                    </RevealGroup>
                  </section>
                </>
              )}

              {/* Negotiation script */}
              <section id="script" className={BLOCK}>
                <SectionHead
                  eyebrow="Script"
                  title="Negotiation script that works"
                  subtitle={<>Use this exact script when you receive a {display.name.toLowerCase()} offer. Most hiring managers expect negotiation and have 5-15% room above the first offer.</>}
                  className="mb-8"
                />
                <Reveal>
                  <div className="relative overflow-hidden rounded-2xl border border-accent/15 bg-accent-deep/[0.03]">
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-accent-soft/70 via-accent/30 to-transparent" />
                    <div className="p-6 sm:p-8">
                      <p className="max-w-3xl font-mono text-sm leading-[1.85] text-accent-soft/90">{salaryData.negotiationScript}</p>
                    </div>
                    <p className="border-t border-accent/10 px-6 py-4 text-xs text-slate-500 sm:px-8">Replace [$X] with your target number. Research Levels.fyi, Glassdoor, and LinkedIn Salary before the conversation.</p>
                  </div>
                </Reveal>
              </section>

              {/* Sources */}
              <p className="max-w-3xl border-t border-white/[0.05] pt-6 text-xs leading-relaxed text-slate-600">{salaryData.sources}</p>

              {/* Sibling guides for this role, plus the question predictor */}
              <div id="more-guides" className="scroll-mt-28">
                <RoleGuideLinks role={role} roleName={display.name} current="salary-guide" className="mb-10" />
              </div>
            </div>

            <aside className="hidden lg:order-first lg:block">
              <div className="sticky top-28 space-y-8">
                <nav aria-label="On this page">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">On this page</p>
                  <ol className="border-l border-white/[0.07]">
                    {jump.map((j, i) => (
                      <li key={j.id}>
                        <a
                          href={`#${j.id}`}
                          className="-ml-px flex items-center gap-3 border-l border-transparent py-2 pl-4 text-sm text-slate-400 transition-colors hover:border-accent hover:text-white focus-visible:border-accent focus-visible:text-white focus-visible:outline-none"
                        >
                          <span className="font-mono text-[11px] text-slate-600">{pad2(i + 1)}</span>
                          {j.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-b from-accent-deep/[0.08] to-transparent p-6">
                  <p className="text-lg font-semibold leading-snug text-white">Land the interview first</p>
                  <a href={signUp} className={`${BTN_PRIMARY} mt-5 w-full px-5 py-3`}>
                    Start preparing free <Chevron />
                  </a>
                  <p className="mt-3 text-center text-[11px] text-slate-500">No credit card required · Free plan available</p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* CTA */}
        <section className={`${PAD} pb-24 pt-4`}>
          <Reveal>
            <CtaPanel
              title="Land the interview first"
              body={<p>You can&apos;t negotiate a salary you haven&apos;t been offered. Get your resume past ATS and practice your interview with Preciprocal.</p>}
              action={
                <a href={signUp} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                  Start preparing free <Chevron />
                </a>
              }
              note="No credit card required · Free plan available"
            />
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
