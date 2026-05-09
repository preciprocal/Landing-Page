"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { U } from "@/lib/demo";

// ── Preciprocal pin logo ──────────────────────────────────────────────────────
function PreciprocalMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 4.5 3.5 5.5L8 22h8l-1.5-8.5C16.5 12.5 18 10.5 18 8c0-3.5-2.5-6-6-6z" fill="url(#pmg2)" />
      <defs>
        <linearGradient id="pmg2" x1="6" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" /><stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Tone options ──────────────────────────────────────────────────────────────
const TONES = ["Professional", "Enthusiastic", "Formal", "Friendly", "Confident"];

// ── Job descriptions per company (realistic LinkedIn style) ──────────────────
const JOB_DESCRIPTIONS: Record<string, string> = {
  "Morgan Stanley": `About the job

Associate, LCD Data and Analytics | Morgan Stanley | Baltimore, MD (Hybrid)

This position will report into a Manager of Data Science and Analytics. As a Data Scientist, you will support the development of analytic solutions through consulting engagements for Morgan Stanley's clients across a broad array of credit, fraud, insurance and marketing business applications.

Responsibilities:
- Develop and deploy machine learning models to support client analytics engagements
- Collaborate with front-office teams to identify high-impact analytical opportunities
- Communicate complex model outputs to non-technical stakeholders
- Maintain and improve existing data pipelines and model monitoring frameworks
- Work with large structured and unstructured datasets using SQL and Python

Requirements:
- Bachelor's or Master's degree in Statistics, Computer Science, Mathematics, or related field
- 2+ years of experience with Python, R, or SAS in a data science context
- Strong understanding of statistical modeling and machine learning techniques
- Experience with SQL and working with large relational databases
- Excellent communication and presentation skills

Benefits: 401(k) plan, health insurance, +1 benefit`,

  "Microsoft": `About the job

Applied Scientist | Microsoft | Redmond, WA (Hybrid)

Join the team building the next generation of AI features across Microsoft 365 and Azure. As an Applied Scientist, you will research and implement production-grade ML systems powering Copilot experiences used by hundreds of millions of users worldwide.

Responsibilities:
- Design and implement NLP and LLM-based systems for Office productivity features
- Conduct rigorous A/B experiments and interpret results to drive product decisions
- Partner with software engineers to ship models at global scale
- Publish internal research and contribute to the broader ML community
- Identify and unblock technical bottlenecks across the model development lifecycle

Requirements:
- MS or PhD in Machine Learning, NLP, Computer Science, or related field
- Strong Python programming skills and experience with PyTorch or TensorFlow
- Hands-on experience fine-tuning large language models
- Track record of shipping ML features in production environments
- 19 connections at Microsoft work here`,

  "Google": `About the job

Data Scientist | Google | San Bruno, CA (On-site)

Google's YouTube Data Science team is looking for a Data Scientist to help shape product strategy through rigorous analysis and experimentation. You will work closely with product managers and engineers to drive decisions that impact over 2 billion monthly users.

Responsibilities:
- Design and analyze A/B experiments to evaluate product changes across YouTube
- Build forecasting models and dashboards to track key business metrics
- Synthesize large datasets using SQL and BigQuery to surface actionable insights
- Partner with cross-functional teams to define success metrics for new features
- Develop scalable data pipelines and automate reporting workflows

Requirements:
- Bachelor's or advanced degree in Statistics, Mathematics, or Computer Science
- 3+ years of experience in a data science or quantitative analyst role
- Expert-level SQL and experience with BigQuery or similar cloud data warehouses
- Strong Python skills with experience in pandas, numpy, and scikit-learn
- Experience with A/B testing and causal inference methods`,

  "Visa": `About the job

Data Scientist - VCS | Visa | Foster City, CA (On-site)

Visa's Data Science team is seeking a Data Scientist to join the Visa Consulting and Analytics (VCS) practice. You will develop models and analytical frameworks to help Visa's client banks and merchants drive revenue growth, reduce fraud, and improve customer experience.

Responsibilities:
- Build and validate fraud detection models processing 200M+ daily transactions
- Design ML pipelines for real-time scoring and batch analytics use cases
- Collaborate with risk and compliance teams to ensure model governance standards
- Deliver data-driven consulting engagements for top-tier financial clients
- Present analytical findings and model recommendations to C-suite stakeholders

Requirements:
- Advanced degree in Statistics, Applied Mathematics, Economics, or related field
- 2-4 years of experience in data science, preferably in fintech or financial services
- Strong proficiency in Python and SQL; experience with Spark is a plus
- Knowledge of fraud detection techniques and credit risk modeling
- 64 school alumni work here`,
};

function getJD(company: string, role: string): string {
  return JOB_DESCRIPTIONS[company] ?? `About the job

${role} | ${company}

We are looking for a talented ${role} to join our growing team. In this role, you will work cross-functionally to develop data-driven solutions that directly impact business outcomes.

Responsibilities:
- Develop and maintain machine learning models and analytical pipelines
- Collaborate with product and engineering teams on data initiatives
- Communicate findings clearly to both technical and non-technical stakeholders
- Drive improvements in data quality, feature engineering, and model performance

Requirements:
- Strong background in statistics, machine learning, and programming
- Proficiency in Python and SQL
- Experience working with large datasets in a production environment`;
}

// ── Loading tips (cycling) ────────────────────────────────────────────────────
const TIPS = [
  "🚀 'Achieved, Led, Created' >> 'Responsible for, Worked on, Helped with' — own your wins!",
  "📊 Quantify everything — numbers turn vague claims into proof.",
  "🎯 Mirror the job description's language — ATS loves exact phrases.",
  "✍️ One page, three paragraphs, no fluff — hiring managers scan in 6 seconds.",
  "💡 Open with the role's core problem you solve, not 'I am applying for...'",
];

// ── Fictional generated letter for Alex Kim / Morgan Stanley ────────────────
function buildLetter(role: string, company: string, tone: string): string {
  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const toneOpener: Record<string, string> = {
    Professional: "I am writing to express my strong interest",
    Enthusiastic: "I am genuinely excited to apply",
    Formal:       "I respectfully submit my application",
    Friendly:     "I would love to bring my skills",
    Confident:    "I am confident I am the right fit",
  };
  const opener = toneOpener[tone] ?? toneOpener.Professional;

  return `${U.name}
${U.address}
${U.city}, ${U.state} ${U.zip}
${U.email}
${U.phone}
${U.linkedin}

${today}

Hiring Manager
${company || "the Company"}

Dear Hiring Team,

${opener} in the ${role || "open"} role at ${company || "your company"}. Data science creates its greatest impact not when it lives in a notebook, but when it drives a decision. That applied, end-to-end orientation is precisely what drew me to this opportunity, where analytical rigor is translated directly into value for clients navigating complex challenges at scale.

Across my academic and professional work, I have consistently taken ownership of projects from design through delivery. At ${U.employer}, I developed statistical models that improved forecast accuracy by 18% and built automated reporting pipelines that reduced manual effort by 30% per week. I led cross-functional analysis for a client portfolio of twelve engagements, distilling findings into executive-ready presentations that shaped product roadmaps.

My technical fluency spans Python, SQL, R, Tableau, and machine learning frameworks including scikit-learn and TensorFlow. At ${U.university}, I completed rigorous coursework in Data Mining, Statistical Inference, and Machine Learning, which grounds my practical work in sound methodology. I bring the same end-to-end thinking to every project: define the question, validate the data, build the model, communicate the finding, measure the outcome.

I am excited about the opportunity to contribute to ${company || "your team"} and would welcome the chance to discuss how my background aligns with your goals.

Best regards,
${U.name}`;
}

// ── Nav items (same as JobTracker) ────────────────────────────────────────────
const NAV = [
  { label: "Overview",          icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.1"/><rect x="7.5" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.1"/><rect x="1" y="7.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.1"/><rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.1"/></svg> },
  { label: "Resume",            icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.1"/><path d="M4.5 4.5h5M4.5 7h5M4.5 9.5h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg> },
  { label: "Cover Letter",      icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.1"/><path d="M1 4l6 4.5L13 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>, active: true },
  { label: "Interviews",        icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.1"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" strokeWidth="1"/><path d="M4 11c0-1.66 1.34-3 3-3s3 1.34 3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg> },
  { label: "Planner",           icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2.5" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.1"/><path d="M1 6h12M4.5 1v3M9.5 1v3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg> },
  { label: "Interview Journal", icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.1"/><path d="M4.5 5h5M4.5 7.5h5M4.5 10h2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>, badge: true },
  { label: "Career Tools",      icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.1"/><path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.93 2.93l1.41 1.41M9.66 9.66l1.41 1.41M2.93 11.07l1.41-1.41M9.66 4.34l1.41-1.41" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>, badge: true },
  { label: "Job Tracker",       icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="3" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.1"/><path d="M4 3V2a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.1"/><path d="M4.5 7h5M4.5 9.5h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg> },
];

// ── Render text with clickable URLs ──────────────────────────────────────────
function renderWithLinks(text: string): React.ReactNode {
  // Match http/https URLs and bare linkedin.com/... or github.com/... patterns
  const URL_RE = /((https?:\/\/|(?<![a-zA-Z]))((?:linkedin|github|[a-z0-9-]+)\.(?:com|io|app|dev|net|org)(?:\/[^\s]*)?))(\s|$)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = URL_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const raw = m[1];
    const href = raw.startsWith("http") ? raw : `https://${raw}`;
    parts.push(
      <a
        key={m.index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline transition-colors"
        onClick={e => e.stopPropagation()}
      >
        {raw}
      </a>
    );
    last = m.index + m[0].length - (m[5]?.length ?? 0);
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 1 ? <>{parts}</> : text;
}

// ─────────────────────────────────────────────────────────────────────────────
// COVER LETTER VIEW — renders inline inside the browser frame
// ─────────────────────────────────────────────────────────────────────────────
export function CoverLetterView({ prefillRole = "", prefillCompany = "" }: {
  prefillRole?: string;
  prefillCompany?: string;
}) {
  const [role, setRole]           = useState(prefillRole || "Associate, LCD Data and Analytics");
  const [company, setCompany]     = useState(prefillCompany || "Morgan Stanley");
  const [jd, setJd]               = useState(() =>
    getJD(prefillCompany || "Morgan Stanley", prefillRole || "Associate, LCD Data and Analytics")
  );
  const [tone, setTone]           = useState("Professional");
  const [toneOpen, setToneOpen]   = useState(false);
  const [generating, setGenerating] = useState(false);
  const [letter, setLetter]       = useState<string | null>(null);
  const [tipIdx, setTipIdx]       = useState(0);
  const [saved, setSaved]         = useState(false);
  const [copied, setCopied]       = useState(false);
  const [dlOpen, setDlOpen]       = useState(false);
  const toneRef = useRef<HTMLDivElement>(null);
  const dlRef   = useRef<HTMLDivElement>(null);
  const tipTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Close tone dropdown on outside click
  useEffect(() => {
    if (!toneOpen) return;
    const h = (e: MouseEvent) => {
      if (toneRef.current && !toneRef.current.contains(e.target as Node)) setToneOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [toneOpen]);

  // Close download dropdown on outside click
  useEffect(() => {
    if (!dlOpen) return;
    const h = (e: MouseEvent) => {
      if (dlRef.current && !dlRef.current.contains(e.target as Node)) setDlOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [dlOpen]);

  const handleGenerate = () => {
    if (!role.trim()) return;
    setGenerating(true);
    setLetter(null);
    setSaved(false);
    setTipIdx(0);
    // Cycle tips every 1.8s
    tipTimer.current = setInterval(() => setTipIdx(i => (i + 1) % TIPS.length), 1800);
    // Simulate generation delay (2.5s)
    setTimeout(() => {
      if (tipTimer.current) clearInterval(tipTimer.current);
      setLetter(buildLetter(role, company, tone));
      setGenerating(false);
    }, 2500);
  };

  const handleCopy = () => {
    if (!letter) return;
    navigator.clipboard?.writeText(letter).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = letter
    ? letter.split(/\s+/).filter(Boolean).length
    : 0;

  // Letter paragraphs (split on double newlines)
  const paragraphs = letter
    ? letter.split("\n\n").map(p => p.replace(/\n/g, "\n"))
    : [];

  return (
    <div className="flex h-full bg-[#080c14] text-white overflow-hidden">

      {/* ── SIDEBAR ── */}
      <div className="w-[195px] flex-shrink-0 bg-[#080c14] border-r border-white/[0.07] flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-white/[0.06]">
          <PreciprocalMark size={16} />
          <span className="text-[13px] font-bold text-white tracking-tight">Preciprocal</span>
        </div>
        {/* User */}
        <div className="mx-2.5 mt-2.5 mb-1.5 bg-white/[0.04] border border-white/[0.07] rounded-xl px-2.5 py-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">{U.initials}</div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-white leading-none truncate">{U.name}</p>
            <p className="text-[9px] text-slate-500 mt-0.5 truncate">{U.email}</p>
          </div>
        </div>
        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-2 py-1">
          <p className="text-[8.5px] font-bold text-slate-600 uppercase tracking-widest px-2 py-1.5">Menu</p>
          {NAV.map(item => (
            <button key={item.label} className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg mb-0.5 text-left transition-colors group ${
              item.active ? "bg-indigo-600/15 border border-indigo-500/25" : "hover:bg-white/[0.04]"
            }`}>
              <span className={`flex-shrink-0 ${item.active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-400"}`}>{item.icon}</span>
              <span className={`text-[11px] font-medium flex-1 truncate ${item.active ? "text-white font-semibold" : "text-slate-400"}`}>{item.label}</span>
              {item.badge && <span className="text-[8px] font-bold bg-indigo-600 text-white px-1.5 py-0.5 rounded-full flex-shrink-0">New</span>}
            </button>
          ))}
          <p className="text-[8.5px] font-bold text-slate-600 uppercase tracking-widest px-2 py-1.5 mt-1">Resources</p>
          <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-slate-500"><rect x="1" y="1.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.1"/><path d="M4 5h5M4 7.5h5M4 10h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
            <span className="text-[11px] text-slate-400">Templates</span>
          </button>
          <p className="text-[8.5px] font-bold text-slate-600 uppercase tracking-widest px-2 py-1.5 mt-1">Recent</p>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
            <div className="w-6 h-6 rounded-lg bg-indigo-600/25 flex items-center justify-center flex-shrink-0">
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="9" rx="1.5" stroke="#818cf8" strokeWidth="1.2"/><path d="M1 4l6 4.5L13 4" stroke="#818cf8" strokeWidth="1.2" strokeLinecap="round"/></svg>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-white leading-none">Cover Letter</p>
              <p className="text-[8px] text-slate-500 mt-0.5">Recently visited</p>
            </div>
          </div>
          <p className="text-[8.5px] font-bold text-slate-600 uppercase tracking-widest px-2 py-1.5 mt-1">Other</p>
          {["Settings", "Support"].map(label => (
            <button key={label} className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-slate-500">
                {label === "Settings"
                  ? <><circle cx="6.5" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1"/><path d="M6.5 1v1.5M6.5 10v1.5M1 6.5h1.5M10 6.5h1.5M2.64 2.64l1.06 1.06M9.3 9.3l1.06 1.06M2.64 10.36l1.06-1.06M9.3 3.7l1.06-1.06" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></>
                  : <><circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.1"/><path d="M6.5 5.5v3M6.5 4h.01" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></>
                }
              </svg>
              <span className="text-[11px] text-slate-400">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#0a0e1a]">

        {/* Top search bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex-1 flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-slate-500 flex-shrink-0"><circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.1"/><path d="M8 8l2.5 2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
            <span className="text-[11px] text-slate-500">Search pages, FAQs...</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-6 h-6 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-[9px] font-bold text-indigo-300">{U.initials[0]}</div>
            <div className="w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center text-[9px] text-slate-400">{U.initials[1]}</div>
          </div>
        </div>

        {/* Scrollable page content */}
        <div className="flex-1 overflow-y-auto px-4 py-3">

          {/* Page header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-indigo-600/15 border border-indigo-500/25 rounded-full px-2.5 py-1 mb-2">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1l1.5 3 3.5.5-2.5 2.5.5 3.5L5 9 2 10.5l.5-3.5L0 4.5 3.5 4 5 1z" stroke="#818cf8" strokeWidth="1" strokeLinejoin="round" fill="#818cf8"/></svg>
                <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-widest">AI-Powered</span>
              </div>
              <h1 className="text-[17px] font-bold text-white leading-none">Cover Letter Generator</h1>
              <p className="text-[10px] text-slate-500 mt-0.5">Generate personalised, professional cover letters</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 text-[10px] text-indigo-300 border border-indigo-500/30 bg-indigo-600/10 px-2.5 py-1.5 rounded-xl">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5C1 2.79 2.79 1 5 1s4 1.79 4 4-1.79 4-4 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/><path d="M5 3v4M3 5h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
                Unlimited
              </button>
              <button className="flex items-center gap-1.5 text-[10px] text-slate-400 border border-white/[0.09] px-2.5 py-1.5 rounded-xl hover:bg-white/[0.04]">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polygon points="5,1 9,8 1,8" stroke="currentColor" strokeWidth="1" fill="none"/></svg>
                See Example
              </button>
              <button className="flex items-center gap-1.5 text-[10px] text-slate-400 border border-white/[0.09] px-2.5 py-1.5 rounded-xl hover:bg-white/[0.04]">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1"/><path d="M3 5h4M5 3v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
                History
              </button>
            </div>
          </div>

          {/* Job imported from LinkedIn banner */}
          <div className="bg-[#0d1117] border border-white/[0.07] rounded-xl px-3.5 py-2.5 mb-2.5 flex items-center gap-2.5">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-indigo-400 flex-shrink-0"><path d="M7 1H3a1.5 1.5 0 00-1.5 1.5v8A1.5 1.5 0 003 12h7a1.5 1.5 0 001.5-1.5V6M7 1l4 4M7 1v4h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div>
              <p className="text-[10px] font-semibold text-indigo-400 leading-none">Job imported from LinkedIn</p>
              <p className="text-[11px] font-semibold text-white mt-0.5">{role || "Role"}</p>
              <p className="text-[10px] text-slate-400">{company || "Company"}</p>
            </div>
          </div>

          {/* Two-column layout: Job Details + Generated Letter */}
          <div className="grid grid-cols-2 gap-3">

            {/* ── LEFT: Job Details form ── */}
            <div className="bg-[#0d1117] border border-white/[0.07] rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg bg-indigo-600/25 flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="3" width="11" height="9" rx="1.5" stroke="#818cf8" strokeWidth="1.2"/><path d="M4 3V2a3 3 0 016 0v1" stroke="#818cf8" strokeWidth="1.2"/></svg>
                </div>
                <span className="text-[12px] font-semibold text-white">Job Details</span>
              </div>

              {/* Job Role */}
              <div>
                <label className="text-[10px] text-slate-400 mb-1 block">
                  Job Role <span className="text-red-400">*</span>
                </label>
                <input
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  placeholder="e.g. Data Scientist"
                  className="w-full bg-[#161b2e] border border-white/[0.08] rounded-xl px-3 py-2 text-[12px] text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 transition-colors"
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="text-[10px] text-slate-400 mb-1 block">
                  Company Name <span className="text-slate-600 font-normal">optional</span>
                </label>
                <input
                  value={company}
                  onChange={e => { setCompany(e.target.value); setJd(getJD(e.target.value, role)); }}
                  placeholder="e.g. Morgan Stanley"
                  className="w-full bg-[#161b2e] border border-white/[0.08] rounded-xl px-3 py-2 text-[12px] text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 transition-colors"
                />
              </div>

              {/* Job Description */}
              <div>
                <label className="text-[10px] text-slate-400 mb-1 block">
                  Job Description <span className="text-slate-600 font-normal">optional</span>
                </label>
                <div className="relative">
                  <textarea
                    value={jd}
                    onChange={e => setJd(e.target.value)}
                    placeholder={"About the job\n\nPaste the full job posting for targeted results"}
                    rows={5}
                    className="w-full bg-[#161b2e] border border-white/[0.08] rounded-xl px-3 py-2 text-[11px] text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 transition-colors resize-none leading-relaxed"
                  />
                  <div className="flex items-center justify-between px-1 mt-0.5">
                    <span className="text-[9px] text-slate-600">{jd.length} chars</span>
                    {jd.length > 0 && (
                      <button onClick={() => setJd("")} className="text-[9px] text-slate-500 hover:text-slate-300 transition-colors">Clear</button>
                    )}
                  </div>
                </div>
              </div>

              {/* Tone */}
              <div>
                <label className="text-[10px] text-slate-400 mb-1 block">Tone</label>
                <div ref={toneRef} className="relative">
                  <button
                    onClick={() => setToneOpen(o => !o)}
                    className={`w-full flex items-center justify-between bg-[#161b2e] border rounded-xl px-3 py-2 text-[12px] text-white transition-colors ${toneOpen ? "border-indigo-500/60" : "border-white/[0.08]"}`}
                  >
                    {tone}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`text-slate-400 transition-transform ${toneOpen ? "rotate-180" : ""}`}>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {toneOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className="absolute top-[calc(100%+4px)] left-0 right-0 bg-[#111827] border border-white/[0.1] rounded-xl shadow-2xl z-50 py-1 overflow-hidden"
                      >
                        {TONES.map(t => (
                          <button
                            key={t}
                            onClick={() => { setTone(t); setToneOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-[12px] transition-colors ${
                              t === tone
                                ? "bg-indigo-600/20 text-indigo-300 font-semibold"
                                : "text-slate-300 hover:bg-white/[0.06]"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={!role.trim() || generating}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white text-[13px] font-bold py-2.5 rounded-xl transition-all mt-1"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9.5 4 11l.5-3.5L2 5l3.5-.5L7 1.5z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" fill="white"/></svg>
                {generating ? "Generating..." : "Generate"}
              </button>

              {/* What makes a great cover letter */}
              {!letter && !generating && (
                <div className="mt-1">
                  <p className="text-[10px] font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1l1 2.5L9 4l-2 2 .5 2.5L5.5 7 3 8.5l.5-2.5L1.5 4l2.5-.5L5.5 1z" stroke="#818cf8" strokeWidth="1" fill="#818cf8" strokeLinejoin="round"/></svg>
                    What makes a great cover letter
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { icon: "📄", title: "Concise & Clear",     sub: "250-400 words"           },
                      { icon: "🎯", title: "Highly Relevant",     sub: "Match job requirements"  },
                      { icon: "✨", title: "Authentic Voice",     sub: "Show genuine interest"   },
                      { icon: "📊", title: "Results-Driven",      sub: "Concrete examples"       },
                    ].map(c => (
                      <div key={c.title} className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-2.5 py-2">
                        <p className="text-[11px] mb-0.5">{c.icon}</p>
                        <p className="text-[10px] font-semibold text-white">{c.title}</p>
                        <p className="text-[9px] text-slate-500">{c.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT: Generated Letter ── */}
            <div className="bg-[#0d1117] border border-white/[0.07] rounded-xl flex flex-col overflow-hidden">
              {/* Header row */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-600/25 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1.5" stroke="#818cf8" strokeWidth="1.2"/><path d="M4.5 4.5h5M4.5 7h5M4.5 9.5h3" stroke="#818cf8" strokeWidth="1" strokeLinecap="round"/></svg>
                  </div>
                  <span className="text-[12px] font-semibold text-white">Generated Letter</span>
                </div>
                {letter && (
                  <div className="flex items-center gap-1.5">
                    {/* Save */}
                    <button
                      onClick={() => setSaved(true)}
                      className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all ${
                        saved
                          ? "bg-emerald-600 text-white"
                          : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
                      }`}
                    >
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1h7l2 2v7a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1z" stroke="white" strokeWidth="1"/><rect x="3" y="6" width="5" height="4" rx="0.5" stroke="white" strokeWidth="1"/><rect x="3" y="1" width="4" height="2.5" rx="0.5" stroke="white" strokeWidth="1"/></svg>
                      {saved ? "Saved!" : "Save"}
                    </button>
                    {/* Copy */}
                    <button
                      onClick={handleCopy}
                      className="w-7 h-7 flex items-center justify-center bg-white/[0.06] border border-white/[0.09] rounded-lg hover:bg-white/[0.1] transition-colors"
                      title="Copy"
                    >
                      {copied
                        ? <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 6L4 8.5 9.5 2.5" stroke="#34d399" strokeWidth="1.3" strokeLinecap="round"/></svg>
                        : <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="3.5" y="1" width="6.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1"/><path d="M1 3.5v6.5a1 1 0 001 1h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
                      }
                    </button>
                    {/* Download dropdown */}
                    <div ref={dlRef} className="relative">
                      <button
                        onClick={() => setDlOpen(o => !o)}
                        className={`flex items-center gap-0.5 w-auto px-2 h-7 bg-white/[0.06] border rounded-lg hover:bg-white/[0.1] transition-colors text-slate-300 ${dlOpen ? "border-indigo-500/40" : "border-white/[0.09]"}`}
                      >
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v6M2.5 5l3 3 3-3M1 9.5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                        <svg width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
                      </button>
                      <AnimatePresence>
                        {dlOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.12 }}
                            className="absolute top-[calc(100%+4px)] right-0 bg-[#111827] border border-white/[0.1] rounded-xl shadow-2xl z-50 py-1 min-w-[160px]"
                          >
                            {[
                              { label: "Download as PDF",  icon: "🔴", color: "text-red-400"  },
                              { label: "Download as Word", icon: "🔵", color: "text-blue-400" },
                            ].map(opt => (
                              <button key={opt.label} onClick={() => setDlOpen(false)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-[11px] text-slate-300 hover:bg-white/[0.06] transition-colors">
                                <span className="text-[12px]">{opt.icon}</span>
                                {opt.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>

              {/* Letter body */}
              <div className="flex-1 overflow-y-auto">
                {generating ? (
                  /* Loading state */
                  <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600/25 border border-indigo-500/20 flex items-center justify-center mb-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                      >
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                          <path d="M11 2a9 9 0 110 18A9 9 0 0111 2z" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="30 40"/>
                        </svg>
                      </motion.div>
                    </div>
                    <p className="text-[13px] font-bold text-white mb-2">Crafting your cover letter...</p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={tipIdx}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="text-[11px] text-slate-400 max-w-[260px] leading-relaxed"
                      >
                        {TIPS[tipIdx]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                ) : letter ? (
                  /* Generated letter */
                  <div className="px-4 py-4">
                    <div className="bg-[#0d1525] border border-white/[0.06] rounded-xl p-4 mb-3">
                      <div className="space-y-3">
                        {paragraphs.map((para, i) => (
                          <p key={i} className="text-[11.5px] text-slate-200 leading-relaxed whitespace-pre-line">
                            {renderWithLinks(para)}
                          </p>
                        ))}
                      </div>
                    </div>
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "WORDS",  val: String(wordCount) },
                        { label: "RESUME", val: "✓" },
                        { label: "TIME",   val: "2.5s" },
                      ].map(s => (
                        <div key={s.label} className="bg-[#0d1117] border border-white/[0.07] rounded-xl px-3 py-2 text-center">
                          <p className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
                          <p className="text-[14px] font-bold text-white">{s.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Empty state */
                  <div className="flex flex-col items-center justify-center h-full text-center px-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-3">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="#475569" strokeWidth="1.3"/><path d="M7 7h6M7 10h6M7 13h4" stroke="#475569" strokeWidth="1.1" strokeLinecap="round"/></svg>
                    </div>
                    <p className="text-[12px] font-semibold text-slate-300">Your letter will appear here</p>
                    <p className="text-[11px] text-slate-500 mt-1">Fill in the details on the left and click Generate</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}