/**
 * app/resume-tips/[role]/page.tsx
 *
 * Dynamic resume tips guide for each role.
 * Targets: "software engineer resume tips", "product manager resume guide", etc.
 *
 * Layout: hero with the salary range, then the guide in a wide column beside
 * a sticky aside (jump list and ATS checker) on wide screens, sibling guides,
 * and a CTA panel. Built on components/page/Layout.tsx.
 *
 * File path: app/resume-tips/[role]/page.tsx
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
import {
  PAD,
  INNER,
  SECTION,
  CARD,
  CARD_SOLID,
  BTN_PRIMARY,
  Eyebrow,
  SectionHead,
  PageHero,
  CtaPanel,
  pad2,
} from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem, SpotlightCard } from "@/components/page/Reveal";

interface ResumeTipData {
  salaryRange: string;
  topAtsKeywords: string[];
  bulletFormula: string;
  bulletExample: string;
  sections: { title: string; body: string }[];
  commonMistakes: string[];
}

// ─── Static params for all roles ─────────────────────────────────────────────
export function generateStaticParams() {
  return ALL_ROLES.map((role) => ({ role }));
}

// ─── Per-role resume tip content ─────────────────────────────────────────────
const RESUME_TIP_DATA: Record<string, {
  salaryRange: string;
  topAtsKeywords: string[];
  bulletFormula: string;
  bulletExample: string;
  sections: { title: string; body: string }[];
  commonMistakes: string[];
}> = {
  "software-engineer": {
    salaryRange: "$110,000 – $200,000+",
    topAtsKeywords: ["Python", "JavaScript", "TypeScript", "AWS", "Docker", "Kubernetes", "REST API", "CI/CD", "system design", "microservices"],
    bulletFormula: "Action verb + what you built/did + tech used + measurable outcome",
    bulletExample: "Architected a distributed caching layer using Redis and Go, reducing p99 API latency by 47% for 2M daily active users.",
    sections: [
      { title: "Lead with impact, not responsibilities", body: "Recruiters spend 6 seconds on your resume. Every bullet must answer 'so what?', not just describe your job. Replace 'Responsible for building APIs' with 'Built and shipped 12 REST endpoints that reduced mobile app load time by 35%.' Quantify everything: users, latency, uptime, team size, time saved." },
      { title: "ATS keywords that matter most", body: "SWE job descriptions are keyword-dense. Make sure your resume naturally includes: your primary languages (Python, Java, Go, etc.), cloud platforms (AWS/GCP/Azure), container tools (Docker, K8s), methodologies (Agile, TDD), and architecture terms (microservices, distributed systems). Don't keyword-stuff, weave them into real bullets." },
      { title: "The right format for engineers", body: "One page for under 7 years of experience. Two pages is acceptable at senior level. Use a clean single-column or two-column layout, no tables, no graphics, no headers/footers. ATS parsers choke on these. Sections in order: Summary (optional), Skills, Experience, Projects, Education." },
      { title: "Projects section is your secret weapon", body: "Side projects and open source contributions signal genuine passion. For each: name, 1-line description, tech stack, and a link (GitHub, live URL). If a project has real users or GitHub stars, mention them. 'Personal project with 2,400 GitHub stars' is a strong signal." },
      { title: "Skills section: do it right", body: "Group skills by category: Languages, Frameworks, Infrastructure, Databases, Tools. List what you're genuinely proficient in, interviewers WILL ask. Ordering tip: list your strongest skills first in each category. Avoid vague entries like 'Microsoft Office', these waste space and signal junior thinking." },
    ],
    commonMistakes: [
      "Writing a generic objective statement instead of a results-focused summary",
      "Listing technologies you barely touched, interviewers will probe these",
      "Using a template with tables or columns that break ATS parsing",
      "Not quantifying impact, every bullet should have a number",
      "One resume for all jobs, tailor your skills section to each JD",
    ],
  },
  "product-manager": {
    salaryRange: "$110,000 – $185,000+",
    topAtsKeywords: ["product roadmap", "A/B testing", "user research", "OKRs", "KPIs", "go-to-market", "agile", "cross-functional", "DAU", "MAU", "NPS", "stakeholder management"],
    bulletFormula: "Action verb + product/feature + business metric impacted + magnitude",
    bulletExample: "Prioritized and shipped a redesigned onboarding flow that increased D7 retention by 22% and reduced time-to-first-value from 8 minutes to 2.5 minutes.",
    sections: [
      { title: "PMs are judged on outcomes, not output", body: "The single biggest mistake PM resumes make: describing what you shipped instead of what changed. 'Led the redesign of the checkout flow' tells a recruiter nothing. 'Shipped a checkout redesign that reduced cart abandonment by 18%, adding $2.4M ARR' tells them everything. Lead with the outcome, follow with the method." },
      { title: "Show your metrics vocabulary", body: "PMs live and die by metrics. Your resume should naturally include business metrics (ARR, churn, CAC, LTV), product metrics (DAU, MAU, D30 retention, NPS, CSAT), and process signals (sprint velocity, time-to-market). Use the same metric language as the job description." },
      { title: "Structure your experience correctly", body: "For each role: company, title, dates, then 4-6 bullets. Bullets follow the STAR-lite pattern: Situation in one clause, Action, Result. Don't write paragraphs. Don't write job descriptions. Write achievements. If you can't think of a metric, approximate: 'reduced manual work by ~50% for a team of 12.'" },
      { title: "Technical PMs: show your depth", body: "If you're targeting technical PM or TPM roles, surface your technical fluency explicitly. Mention API integrations you drove, data models you designed, SQL queries you wrote, or architecture decisions you influenced. Vague 'worked closely with engineers' doesn't cut it at technical companies." },
      { title: "Tailor hard for each company", body: "Consumer PM roles want DAU/MAU and engagement metrics. B2B PM roles want ARR, churn, NPS, and enterprise customer stories. Platform PM roles want ecosystem metrics and developer adoption. Read the JD carefully and mirror its metric vocabulary in your bullets." },
    ],
    commonMistakes: [
      "Focusing on features shipped rather than outcomes achieved",
      "Missing metrics, every PM bullet should have at least one number",
      "Burying leadership signals, explicitly name team sizes and cross-functional scope",
      "Using a template that's too design-heavy (fancy charts, icons), ATS can't read these",
      "Not distinguishing individual vs team contributions",
    ],
  },
  "data-scientist": {
    salaryRange: "$110,000 – $175,000+",
    topAtsKeywords: ["Python", "SQL", "machine learning", "statistical modeling", "A/B testing", "scikit-learn", "TensorFlow", "PyTorch", "Spark", "feature engineering", "production ML", "MLOps"],
    bulletFormula: "Action verb + model/analysis + business outcome + scale/precision metric",
    bulletExample: "Built a customer churn prediction model using XGBoost and 90-day behavioral features, achieving 84% precision and enabling proactive outreach that reduced churn by 14%.",
    sections: [
      { title: "The core tension in DS resumes", body: "Data science roles split between research-leaning (academia, AI labs) and applied/engineering-leaning (startups, product teams). Tailor accordingly: research roles want publications, method novelty, and statistical rigor. Applied roles want production impact, business metrics, and cross-functional delivery. Don't write one resume for both." },
      { title: "Lead with impact, not method", body: "The most common DS resume mistake is leading with the technique instead of the result. 'Applied random forest classifier to churn data' tells a recruiter almost nothing. 'Reduced annual customer churn by $1.8M using a behavioral churn model built with Random Forest and 30-day event sequences' tells them everything." },
      { title: "Projects carry enormous weight", body: "For DS, a strong projects section (or a GitHub link with real repos) can outweigh a less impressive work history. For each project: problem statement, your approach, tools used, and result. Include links. If you've done Kaggle competitions: mention top % finish." },
      { title: "Make your stack crystal clear", body: "Create a dedicated technical skills section and be specific: Python (pandas, scikit-learn, PyTorch, Spark), SQL (PostgreSQL, BigQuery), ML frameworks, cloud (AWS SageMaker, GCP Vertex AI), orchestration (Airflow, Prefect), visualization (Tableau, Looker). Group logically and list strongest first." },
      { title: "Bridge to business outcomes", body: "The difference between a $120K and a $160K data scientist resume: business impact. Every model you built should have a downstream business metric attached. If you can't calculate it exactly, approximate it or use proxy metrics: 'reduced manual analyst hours by ~40%', 'model served 500K daily predictions in production.'" },
    ],
    commonMistakes: [
      "Leading with technique instead of business impact",
      "Listing every Python library you've ever imported",
      "No GitHub link or portfolio, harder to evaluate than other roles without one",
      "Research-focused bullets for applied DS roles (and vice versa)",
      "Missing production/deployment experience, distinguish prototype from production",
    ],
  },
  "marketing-manager": {
    salaryRange: "$75,000 – $140,000+",
    topAtsKeywords: ["go-to-market", "demand generation", "content marketing", "SEO", "SEM", "paid social", "Google Analytics", "HubSpot", "Salesforce", "email marketing", "conversion rate", "attribution"],
    bulletFormula: "Action verb + campaign/initiative + channel/tool + measurable marketing metric",
    bulletExample: "Launched a 3-channel demand gen campaign (paid search, LinkedIn, email) that generated 340 MQLs in Q2, a 67% increase QoQ, at a $42 CAC.",
    sections: [
      { title: "Every bullet needs a marketing metric", body: "Marketing managers own numbers: CAC, MQLs, SQLs, CTR, ROAS, email open rate, pipeline influenced, revenue attributed. Pick the metric that best shows your impact for each role and lead with it. Vague bullets like 'ran marketing campaigns' signal a junior mindset." },
      { title: "Show channel ownership", body: "Be explicit about the channels you own vs contributed to. 'Owned paid search budget of $1.2M across Google and Meta, achieving 3.4x ROAS' is far stronger than 'managed paid advertising.' Specificity signals depth." },
      { title: "T-shaped vs specialist: know which you are", body: "Generalist marketing managers should show breadth across 3+ channels with leadership of at least one. Specialist roles (SEO manager, paid social manager) want deep channel expertise with strong metric outcomes. Read the JD to know which profile they want, then mirror it." },
      { title: "Marketing tools are ATS keywords", body: "Include the specific tools you've used: HubSpot, Marketo, Salesforce, Google Analytics 4, Semrush, Ahrefs, Klaviyo, Iterable, Looker, Tableau. These often appear as required/preferred in job descriptions and are parsed directly by ATS." },
      { title: "Leadership and cross-functional scope", body: "Senior marketing roles care about team leadership and cross-functional influence. Mention team sizes you managed, budgets you owned, and how you collaborated with sales, product, and design. 'Led a team of 4 and managed a $2M annual marketing budget' belongs in your summary or first bullet." },
    ],
    commonMistakes: [
      "Vague bullets with no metrics (e.g. 'managed social media presence')",
      "Not specifying budget sizes or team sizes",
      "Generic summary that could apply to any marketing role",
      "Missing the marketing tools stack, ATS filters heavily on these",
      "Not differentiating between channels owned vs channels contributed to",
    ],
  },
  "financial-analyst": {
    salaryRange: "$70,000 – $130,000+",
    topAtsKeywords: ["financial modeling", "DCF", "Excel", "PowerPoint", "variance analysis", "budget", "forecast", "P&L", "EBITDA", "GAAP", "Bloomberg", "SQL", "Tableau"],
    bulletFormula: "Action verb + financial analysis/model + business decision supported + dollar impact",
    bulletExample: "Built a 3-statement LBO model for a $240M acquisition target, surfacing a 2.1x MOIC scenario that informed the final bid strategy.",
    sections: [
      { title: "Lead with the analysis and the decision it drove", body: "Finance bullets should follow this structure: what you analyzed, what you built, the decision it supported, and what happened as a result. 'Developed a 5-year revenue forecast' is weak. 'Built a bottoms-up 5-year forecast used by the CFO to secure $40M Series C at a $2.4x revenue multiple' is strong." },
      { title: "Quantify the size of everything", body: "Finance resumes need scale signals: deal sizes, portfolio values, budget sizes, savings identified, forecasting accuracy percentages. These numbers tell the interviewer the complexity of the problems you've worked on. '$3M budget' and '$3B portfolio' require very different skill levels." },
      { title: "Model types are keywords", body: "Explicitly name the models you've built: DCF, LBO, merger/accretion-dilution, 3-statement, sensitivity analysis, scenario analysis, Monte Carlo. These are parsed by ATS and screened by analysts reviewing your resume. If you've built complex models, say so explicitly." },
      { title: "Show your tools fluency", body: "Excel is table stakes, mention specific skills (pivot tables, VBA, Power Query). Beyond Excel: SQL, Python (pandas, numpy), Bloomberg Terminal, FactSet, Capital IQ, Tableau/Power BI. For FP&A roles, add your ERP experience: SAP, Oracle, Workday Adaptive." },
      { title: "Tailor for buy-side vs sell-side vs corporate", body: "Buy-side (PE, HF, VC): emphasize modeling depth, investment thesis work, deal execution. Sell-side (IB, research): emphasize pitch books, coverage universes, client work. Corporate FP&A: emphasize business partnership, budget/variance ownership, cross-functional influence." },
    ],
    commonMistakes: [
      "Not specifying deal sizes, budget sizes, or portfolio values",
      "Generic 'financial modeling' without naming the model type",
      "Missing Excel skill signals for junior roles, it's still the core tool",
      "Burying the business impact, what decision did your analysis support?",
      "Not tailoring for buy-side vs sell-side vs FP&A",
    ],
  },
};

/**
 * Roles without a hand-written entry above are composed from lib/roleContent.ts
 * rather than a single generic template. That module supplies a real per-role
 * ATS keyword set, category-specific resume advice, and the salary range and
 * top employers from ROLE_META.
 *
 * This replaced a fallback that interpolated only the role name and produced
 * pages 97% identical to one another, which is why Google was crawling them
 * and declining to index. Do not reintroduce a name-only fallback here.
 */
function getResumeTipData(role: string): ResumeTipData | null {
  if (RESUME_TIP_DATA[role]) return RESUME_TIP_DATA[role];

  const content = getRoleContent(role);
  if (!content) return null;

  const { name, keywords, salaryRange, topCompanies, profile, note } = content;
  const primary = keywords.slice(0, 3).join(", ");
  const employers = topCompanies.slice(0, 3).join(", ");

  return {
    salaryRange,
    topAtsKeywords: keywords,
    bulletFormula: profile.bulletFormula,
    bulletExample: buildBulletExample(name, keywords),
    sections: [
      {
        title: `What makes a ${name} resume different`,
        body: `${note.positioning} That shapes what belongs on the page. Reviewers screening ${name} applications are looking for ${note.screened}, so the bullets that earn their attention are the ones carrying that evidence rather than a complete account of your responsibilities. Everything below applies generally, but this is the specific thing to optimise for.`,
      },
      ...profile.resumeSections,
      {
        title: `Keywords that matter for ${name} roles specifically`,
        body: `${name} postings cluster around a recognisable vocabulary: ${keywords.join(", ")}. Pull the ten most relevant to your own experience and work them into your bullets rather than listing them at the bottom, a keyword sitting inside a sentence that describes a real result carries the ATS match and the credibility at once. When you are targeting employers like ${employers}, mirror the exact phrasing from their posting, since ${primary} and its near-synonyms are matched literally.`,
      },
      {
        title: "Calibrate against the market rate",
        body: `${name} roles currently sit in the ${salaryRange} range depending on location, company stage and seniority. ${note.payNote} This matters for your resume because the level you target determines how much scope you need to evidence, aiming at the upper half of that band means bullets showing ownership and cross-functional influence, not only execution.`,
      },
    ],
    commonMistakes: profile.commonMistakes,
  };
}

/** A role-shaped example bullet, built from that role's own keyword set. */
function buildBulletExample(name: string, keywords: string[]): string {
  const [k1, k2] = keywords;
  if (!k1) return `Led a ${name.toLowerCase()} initiative that reduced cycle time by 30% across a team of 12.`;
  return `Led a ${name.toLowerCase()} initiative using ${k1}${k2 ? ` and ${k2}` : ""}, cutting turnaround time by 34% and saving roughly 9 hours per week across a team of 12.`;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role } = await params;
  const display = ROLE_DISPLAY[role];
  if (!display) return { title: "Resume Tips, Preciprocal" };
  return {
    title: fitTitle(`${display.name} Resume Tips`, " (2026)"),
    description: `Step-by-step resume guide for ${display.name}s: ATS keywords, bullet formulas, format tips, and common mistakes to avoid. Updated for 2026.`,
    alternates: { canonical: `https://preciprocal.com/resume-tips/${role}` },
    openGraph: {
      title: `${display.name} Resume Tips, Preciprocal`,
      description: `ATS keywords, bullet formulas, and format tips for ${display.name} resumes. Get more interviews in 2026.`,
      url: `https://preciprocal.com/resume-tips/${role}`,
      type: "article",
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ResumeTipsRolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const display = ROLE_DISPLAY[role];
  if (!display) notFound();

  const tipData = getResumeTipData(role);
  if (!tipData) notFound();

  // Schema.org Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://preciprocal.com/resume-tips/${role}#article`,
    headline: `${display.name} Resume Tips, How to Write a Resume That Gets Interviews`,
    description: `Step-by-step resume guide for ${display.name}s: ATS keywords, bullet formulas, format tips.`,
    url: `https://preciprocal.com/resume-tips/${role}`,
    author: { "@type": "Organization", name: "Preciprocal", url: "https://preciprocal.com" },
    publisher: { "@id": "https://preciprocal.com/#organization" },
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntityOfPage: `https://preciprocal.com/resume-tips/${role}`,
  };

  // Jump list for the sticky aside; ids match the sections below.
  const toc = [
    { id: "keywords", label: "ATS keywords" },
    { id: "bullet-formula", label: "Bullet formula" },
    ...tipData.sections.map((s, i) => ({ id: `tip-${i + 1}`, label: s.title })),
    { id: "mistakes", label: "Common mistakes" },
  ];
  const formulaParts = tipData.bulletFormula.split(" + ");

  return (
    <div data-accent="emerald" className="min-h-screen overflow-x-hidden bg-[#050810]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Resume Tips", url: "https://preciprocal.com/resume-tips" },
          { name: `${display.name} Resume Tips`, url: `https://preciprocal.com/resume-tips/${role}` },
        ]}
      />
      <Navbar />

      <main>
        {/* Hero: breadcrumb, H1, subhead, salary range */}
        <PageHero
          breadcrumb={
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/resume-tips" className="transition-colors hover:text-white">Resume Tips</Link>
              <span aria-hidden="true">›</span>
              <span className="text-slate-300">{display.name}</span>
            </nav>
          }
          badge={
            <>
              <span aria-hidden="true">{display.icon}</span> Resume guide
            </>
          }
          badgeTone="accent"
          title={`${display.name} `}
          accent="resume tips"
          subhead={
            <p>
              How to write a {display.name.toLowerCase()} resume that passes ATS, survives the 6-second recruiter scan, and gets you interviews in 2026.
            </p>
          }
          aside={
            <div className={`${CARD} px-6 py-5 text-left lg:min-w-[280px]`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Typical salary range</p>
              <p className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">{tipData.salaryRange}</p>
            </div>
          }
        />

        {/* Guide body with a sticky jump list and checker CTA */}
        <section className={`${SECTION} ${PAD}`}>
          <div className={`${INNER} grid gap-14 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-24`}>
            <div className="min-w-0 space-y-20">
              {/* ATS keywords */}
              <section id="keywords" className="scroll-mt-28">
                <Reveal>
                  <SectionHead
                    eyebrow="ATS keywords"
                    title={`Top ATS keywords for ${display.name}s`}
                    subtitle={`These terms appear in most ${display.name.toLowerCase()} job descriptions. Include them naturally in your bullets and skills section.`}
                    className="mb-8"
                  />
                </Reveal>
                <RevealGroup as="ul" className="flex flex-wrap gap-2.5">
                  {tipData.topAtsKeywords.map((kw, i) => (
                    <RevealItem
                      as="li"
                      key={kw}
                      className="inline-flex items-center gap-2 rounded-lg border border-accent/20 bg-accent-deep/[0.06] px-3 py-1.5 text-[13px] font-medium text-accent-soft"
                    >
                      <span aria-hidden="true" className="font-mono text-[10px] text-accent-soft/60">{pad2(i + 1)}</span>
                      {kw}
                    </RevealItem>
                  ))}
                </RevealGroup>
              </section>

              {/* Bullet formula and example, side by side */}
              <section id="bullet-formula" className="scroll-mt-28">
                <Reveal>
                  <SectionHead eyebrow="Bullet formula" title="The bullet formula that works" className="mb-8" />
                </Reveal>
                <RevealGroup className="grid gap-4 md:grid-cols-2">
                  <RevealItem className={`${CARD_SOLID} p-6 sm:p-7`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft/90">Formula</p>
                    <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[13px] leading-relaxed text-accent-soft">
                      {formulaParts.map((part, i) => (
                        <span key={i} className="contents">
                          {i > 0 && <span className="text-accent/70"> + </span>}
                          <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1">{part}</span>
                        </span>
                      ))}
                    </p>
                  </RevealItem>
                  <RevealItem className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 sm:p-7">
                    <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/90">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Real example
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-slate-200">{tipData.bulletExample}</p>
                  </RevealItem>
                </RevealGroup>
              </section>

              {/* Main tip sections, numbered */}
              <div>
                <Eyebrow>The guide</Eyebrow>
                <div className="mt-2 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {tipData.sections.map((section, i) => (
                    <Reveal key={i}>
                      <section id={`tip-${i + 1}`} className="grid scroll-mt-28 gap-3 py-9 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-6">
                        <span aria-hidden="true" className="font-mono text-[12px] text-accent-soft/70 sm:pt-1.5">{pad2(i + 1)}</span>
                        <div>
                          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{section.title}</h2>
                          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-400">{section.body}</p>
                        </div>
                      </section>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Common mistakes */}
              <section id="mistakes" className="scroll-mt-28">
                <Reveal>
                  <SectionHead eyebrow="Avoid these" title={`5 common ${display.name.toLowerCase()} resume mistakes`} className="mb-8" />
                </Reveal>
                <RevealGroup
                  as="ul"
                  className="divide-y divide-white/[0.05] overflow-hidden rounded-2xl border border-rose-500/15 bg-rose-500/[0.03]"
                >
                  {tipData.commonMistakes.map((mistake, i) => (
                    <RevealItem as="li" key={i} className="flex items-start gap-4 px-5 py-4 sm:px-6">
                      <span className="mt-0.5 shrink-0 font-mono text-[12px] font-semibold text-rose-300/80">{pad2(i + 1)}</span>
                      <p className="text-sm leading-relaxed text-slate-300">{mistake}</p>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </section>
            </div>

            <aside aria-label="On this page" className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
              <nav aria-label="Sections">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">On this page</p>
                <ol className="border-l border-white/[0.07]">
                  {toc.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-[13px] leading-snug text-slate-400 transition-colors hover:border-accent hover:text-white focus-visible:border-accent focus-visible:text-white focus-visible:outline-none"
                      >
                        <span aria-hidden="true" className="font-mono text-[10px] leading-5 text-slate-600">{pad2(i + 1)}</span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <SpotlightCard className="mt-8 rounded-2xl border border-accent/20 bg-gradient-to-b from-accent-deep/[0.08] to-transparent p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft/90">Free tool</p>
                <p className="mt-3 text-lg font-semibold leading-snug text-white">Check your resume&apos;s ATS score</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">Free score and top fixes for your {display.name} resume</p>
                <Link href="/free-ats-checker" className={`${BTN_PRIMARY} mt-5 w-full px-5 py-3`}>
                  Check my resume <Chevron />
                </Link>
              </SpotlightCard>
            </aside>
          </div>
        </section>

        {/* Sibling guides for this role, plus the question predictor */}
        <section className={`${SECTION} ${PAD}`}>
          <Reveal className={INNER}>
            <RoleGuideLinks role={role} roleName={display.name} current="resume-tips" className="" />
          </Reveal>
        </section>

        {/* CTA */}
        <section className={`pb-24 pt-4 ${PAD}`}>
          <Reveal>
            <CtaPanel
              title="Get your resume scored in 30 seconds"
              body={
                <p className="max-w-xl text-sm leading-relaxed sm:text-base">
                  Upload your {display.name.toLowerCase()} resume and see your ATS score, missing keywords, and line-by-line improvement suggestions.
                </p>
              }
              action={
                <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                  Analyze my resume free <Chevron />
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
