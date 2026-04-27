/**
 * app/resume-tips/[role]/page.tsx
 *
 * Dynamic resume tips guide for each role.
 * Targets: "software engineer resume tips", "product manager resume guide", etc.
 *
 * File path: app/resume-tips/[role]/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ALL_ROLES, ROLE_DISPLAY, APP_URL } from "@/lib/constants";

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
      { title: "Lead with impact, not responsibilities", body: "Recruiters spend 6 seconds on your resume. Every bullet must answer 'so what?' — not just describe your job. Replace 'Responsible for building APIs' with 'Built and shipped 12 REST endpoints that reduced mobile app load time by 35%.' Quantify everything: users, latency, uptime, team size, time saved." },
      { title: "ATS keywords that matter most", body: "SWE job descriptions are keyword-dense. Make sure your resume naturally includes: your primary languages (Python, Java, Go, etc.), cloud platforms (AWS/GCP/Azure), container tools (Docker, K8s), methodologies (Agile, TDD), and architecture terms (microservices, distributed systems). Don't keyword-stuff — weave them into real bullets." },
      { title: "The right format for engineers", body: "One page for under 7 years of experience. Two pages is acceptable at senior level. Use a clean single-column or two-column layout — no tables, no graphics, no headers/footers. ATS parsers choke on these. Sections in order: Summary (optional), Skills, Experience, Projects, Education." },
      { title: "Projects section is your secret weapon", body: "Side projects and open source contributions signal genuine passion. For each: name, 1-line description, tech stack, and a link (GitHub, live URL). If a project has real users or GitHub stars, mention them. 'Personal project with 2,400 GitHub stars' is a strong signal." },
      { title: "Skills section: do it right", body: "Group skills by category: Languages, Frameworks, Infrastructure, Databases, Tools. List what you're genuinely proficient in — interviewers WILL ask. Ordering tip: list your strongest skills first in each category. Avoid vague entries like 'Microsoft Office' — these waste space and signal junior thinking." },
    ],
    commonMistakes: [
      "Writing a generic objective statement instead of a results-focused summary",
      "Listing technologies you barely touched — interviewers will probe these",
      "Using a template with tables or columns that break ATS parsing",
      "Not quantifying impact — every bullet should have a number",
      "One resume for all jobs — tailor your skills section to each JD",
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
      "Missing metrics — every PM bullet should have at least one number",
      "Burying leadership signals — explicitly name team sizes and cross-functional scope",
      "Using a template that's too design-heavy (fancy charts, icons) — ATS can't read these",
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
      "No GitHub link or portfolio — harder to evaluate than other roles without one",
      "Research-focused bullets for applied DS roles (and vice versa)",
      "Missing production/deployment experience — distinguish prototype from production",
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
      "Missing the marketing tools stack — ATS filters heavily on these",
      "Not differentiating between channels owned vs channels contributed to",
    ],
  },
  "financial-analyst": {
    salaryRange: "$70,000 – $130,000+",
    topAtsKeywords: ["financial modeling", "DCF", "Excel", "PowerPoint", "variance analysis", "budget", "forecast", "P&L", "EBITDA", "GAAP", "Bloomberg", "SQL", "Tableau"],
    bulletFormula: "Action verb + financial analysis/model + business decision supported + dollar impact",
    bulletExample: "Built a 3-statement LBO model for a $240M acquisition target, surfacing a 2.1x MOIC scenario that informed the final bid strategy.",
    sections: [
      { title: "Lead with the analysis and the decision it drove", body: "Finance bullets should follow this structure: what you analyzed → what you built → what decision it supported → what happened as a result. 'Developed a 5-year revenue forecast' is weak. 'Built a bottoms-up 5-year forecast used by the CFO to secure $40M Series C at a $2.4x revenue multiple' is strong." },
      { title: "Quantify the size of everything", body: "Finance resumes need scale signals: deal sizes, portfolio values, budget sizes, savings identified, forecasting accuracy percentages. These numbers tell the interviewer the complexity of the problems you've worked on. '$3M budget' and '$3B portfolio' require very different skill levels." },
      { title: "Model types are keywords", body: "Explicitly name the models you've built: DCF, LBO, merger/accretion-dilution, 3-statement, sensitivity analysis, scenario analysis, Monte Carlo. These are parsed by ATS and screened by analysts reviewing your resume. If you've built complex models, say so explicitly." },
      { title: "Show your tools fluency", body: "Excel is table stakes — mention specific skills (pivot tables, VBA, Power Query). Beyond Excel: SQL, Python (pandas, numpy), Bloomberg Terminal, FactSet, Capital IQ, Tableau/Power BI. For FP&A roles, add your ERP experience: SAP, Oracle, Workday Adaptive." },
      { title: "Tailor for buy-side vs sell-side vs corporate", body: "Buy-side (PE, HF, VC): emphasize modeling depth, investment thesis work, deal execution. Sell-side (IB, research): emphasize pitch books, coverage universes, client work. Corporate FP&A: emphasize business partnership, budget/variance ownership, cross-functional influence." },
    ],
    commonMistakes: [
      "Not specifying deal sizes, budget sizes, or portfolio values",
      "Generic 'financial modeling' without naming the model type",
      "Missing Excel skill signals for junior roles — it's still the core tool",
      "Burying the business impact — what decision did your analysis support?",
      "Not tailoring for buy-side vs sell-side vs FP&A",
    ],
  },
};

// Fallback for roles without explicit data
function getResumeTipData(role: string) {
  if (RESUME_TIP_DATA[role]) return RESUME_TIP_DATA[role];
  const display = ROLE_DISPLAY[role];
  if (!display) return null;
  return {
    salaryRange: "Varies by location and experience",
    topAtsKeywords: ["communication", "problem solving", "data analysis", "stakeholder management", "project management"],
    bulletFormula: "Action verb + what you did + tool/method used + measurable outcome",
    bulletExample: `Led a cross-functional initiative that improved ${display.name.toLowerCase()} efficiency by 30%, saving the team 8 hours per week.`,
    sections: [
      { title: "Lead with outcomes, not responsibilities", body: `For ${display.name} roles, every bullet should answer 'what changed because of your work?' Recruiters skim resumes in seconds — if your bullets read like a job description, they stop reading. Replace duty-based language with impact-based language. Quantify wherever possible.` },
      { title: "Keywords recruiters search for", body: `Study 10 ${display.name} job descriptions and highlight recurring terms. These are the ATS keywords you need. Include them naturally in your bullets and skills section — don't just list them at the bottom.` },
      { title: "Format for ATS parsing", body: "Use a clean, single-column layout. No tables, no text boxes, no graphics. Save as a .docx or .pdf depending on the application. Section order: Summary, Skills, Experience, Education. Consistent date formatting throughout." },
      { title: "Tailor for every application", body: `No two ${display.name} roles are identical. Spend 10 minutes adjusting your skills section and top 2 bullets to mirror each job description. This alone can move your ATS score from 60% to 85%.` },
    ],
    commonMistakes: [
      "Writing responsibilities instead of achievements",
      "No metrics or quantified outcomes",
      "One resume sent to all applications without tailoring",
      "Using a visually complex template that ATS can't parse",
      "Missing keywords from the job description",
    ],
  };
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role } = await params;
  const display = ROLE_DISPLAY[role];
  if (!display) return { title: "Resume Tips — Preciprocal" };
  return {
    title: `${display.name} Resume Tips — How to Write a Resume That Gets Interviews`,
    description: `Step-by-step resume guide for ${display.name}s: ATS keywords, bullet formulas, format tips, and common mistakes to avoid. Updated for 2026.`,
    alternates: { canonical: `https://preciprocal.com/resume-tips/${role}` },
    openGraph: {
      title: `${display.name} Resume Tips — Preciprocal`,
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
    headline: `${display.name} Resume Tips — How to Write a Resume That Gets Interviews`,
    description: `Step-by-step resume guide for ${display.name}s: ATS keywords, bullet formulas, format tips.`,
    url: `https://preciprocal.com/resume-tips/${role}`,
    author: { "@type": "Organization", name: "Preciprocal", url: "https://preciprocal.com" },
    publisher: { "@id": "https://preciprocal.com/#organization" },
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntityOfPage: `https://preciprocal.com/resume-tips/${role}`,
  };

  return (
    <div className="min-h-screen bg-[#050810]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Resume Tips", url: "https://preciprocal.com/resume-tips" },
          { name: `${display.name} Resume Tips`, url: `https://preciprocal.com/resume-tips/${role}` },
        ]}
      />
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 page-main">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ color: "#64748b" }} className="text-sm mb-8 flex gap-2 items-center flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link href="/resume-tips" className="hover:text-white transition-colors">Resume Tips</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>{display.name}</span>
        </nav>

        {/* H1 */}
        <div className="mb-10">
          <span className="text-3xl mr-3">{display.icon}</span>
          <h1 style={{ color: "#ffffff" }} className="text-4xl sm:text-5xl font-extrabold mt-3 mb-4 tracking-tight leading-tight">
            {display.name} resume tips
          </h1>
          <p style={{ color: "#94a3b8" }} className="text-lg leading-relaxed">
            How to write a {display.name.toLowerCase()} resume that passes ATS, survives the 6-second recruiter scan, and gets you interviews in 2026.
          </p>
          <p style={{ color: "#64748b" }} className="text-sm mt-3">
            Typical salary range: <span style={{ color: "#a5b4fc" }} className="font-medium">{tipData.salaryRange}</span>
          </p>
        </div>

        {/* ATS Keywords */}
        <section className="mb-10 p-5 rounded-2xl border" style={{ background: "rgba(99,102,241,0.04)", borderColor: "rgba(99,102,241,0.15)" }}>
          <h2 style={{ color: "#ffffff" }} className="text-lg font-bold mb-3">Top ATS keywords for {display.name}s</h2>
          <p style={{ color: "#94a3b8" }} className="text-sm mb-4">
            These terms appear in most {display.name.toLowerCase()} job descriptions. Include them naturally in your bullets and skills section.
          </p>
          <div className="flex flex-wrap gap-2">
            {tipData.topAtsKeywords.map((kw) => (
              <span
                key={kw}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}
              >
                {kw}
              </span>
            ))}
          </div>
        </section>

        {/* Bullet formula */}
        <section className="mb-10 p-5 rounded-2xl border" style={{ background: "rgba(16,185,129,0.04)", borderColor: "rgba(16,185,129,0.15)" }}>
          <h2 style={{ color: "#ffffff" }} className="text-lg font-bold mb-3">The bullet formula that works</h2>
          <p style={{ color: "#6ee7b7" }} className="text-sm font-mono mb-3">{tipData.bulletFormula}</p>
          <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ color: "#64748b" }} className="text-xs mb-1 uppercase tracking-wider font-semibold">Real example</p>
            <p style={{ color: "#e2e8f0" }} className="text-sm leading-relaxed">{tipData.bulletExample}</p>
          </div>
        </section>

        {/* Main tip sections */}
        <div className="space-y-8">
          {tipData.sections.map((section, i) => (
            <section key={i}>
              <h2 style={{ color: "#ffffff" }} className="text-xl font-bold mb-3">{section.title}</h2>
              <p style={{ color: "#94a3b8" }} className="text-base leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>

        {/* Common mistakes */}
        <section className="mt-10 p-5 rounded-2xl border" style={{ background: "rgba(239,68,68,0.04)", borderColor: "rgba(239,68,68,0.15)" }}>
          <h2 style={{ color: "#ffffff" }} className="text-lg font-bold mb-4">5 common {display.name.toLowerCase()} resume mistakes</h2>
          <ul className="space-y-3">
            {tipData.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-red-400 font-bold text-sm mt-0.5 flex-shrink-0">{i + 1}.</span>
                <p style={{ color: "#94a3b8" }} className="text-sm leading-relaxed">{mistake}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Internal cross-links */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          <Link
            href={`/interview-questions/${role}`}
            className="p-4 rounded-xl border transition-all hover:border-indigo-500/30"
            style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
          >
            <p style={{ color: "#e2e8f0" }} className="font-medium text-sm mb-1">Interview questions</p>
            <p style={{ color: "#475569" }} className="text-xs">Prep for {display.name} interviews →</p>
          </Link>
          <Link
            href={`/cover-letter-examples/${role}`}
            className="p-4 rounded-xl border transition-all hover:border-indigo-500/30"
            style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
          >
            <p style={{ color: "#e2e8f0" }} className="font-medium text-sm mb-1">Cover letter examples</p>
            <p style={{ color: "#475569" }} className="text-xs">{display.name} cover letters →</p>
          </Link>
          <Link
            href={`/salary-guide/${role}`}
            className="p-4 rounded-xl border transition-all hover:border-indigo-500/30"
            style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
          >
            <p style={{ color: "#e2e8f0" }} className="font-medium text-sm mb-1">Salary guide</p>
            <p style={{ color: "#475569" }} className="text-xs">{display.name} salary data →</p>
          </Link>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 text-center rounded-2xl border" style={{ background: "rgba(99,102,241,0.05)", borderColor: "rgba(99,102,241,0.2)" }}>
          <h2 style={{ color: "#ffffff" }} className="text-xl font-bold mb-2">Get your resume scored in 30 seconds</h2>
          <p style={{ color: "#94a3b8" }} className="text-sm mb-6 max-w-sm mx-auto">
            Upload your {display.name.toLowerCase()} resume and see your ATS score, missing keywords, and line-by-line improvement suggestions.
          </p>
          <a
            href={`${APP_URL}/sign-up`}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Analyze my resume free →
          </a>
          <p style={{ color: "#475569" }} className="text-xs mt-3">No credit card required · Free plan available</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}