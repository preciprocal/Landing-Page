"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import { U } from "@/lib/demo";

// ── Chrome logo (official 4-colour) ──────────────────────────────────────────
function ChromeLogo({ size = 40 }: { size?: number }) {
  const id = useRef(`cl-${Math.random().toString(36).slice(2, 7)}`).current;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#fff" />
      <circle cx="20" cy="20" r="16" fill={`url(#${id}a)`} />
      <circle cx="20" cy="20" r="10" fill="#fff" />
      <circle cx="20" cy="20" r="7.5" fill={`url(#${id}b)`} />
      <defs>
        <linearGradient id={`${id}a`} x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#EA4335" />
          <stop offset="33%"  stopColor="#FBBC05" />
          <stop offset="66%"  stopColor="#34A853" />
          <stop offset="100%" stopColor="#4285F4" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="13" y1="13" x2="27" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4" />
          <stop offset="1" stopColor="#1A73E8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Preciprocal pin logo ──────────────────────────────────────────────────────
function PreciprocalMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 4.5 3.5 5.5L8 22h8l-1.5-8.5C16.5 12.5 18 10.5 18 8c0-3.5-2.5-6-6-6z"
        fill="url(#pmg)"
      />
      <defs>
        <linearGradient id="pmg" x1="6" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Google G ─────────────────────────────────────────────────────────────────
function GoogleLogo({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

// ── Action bar button icons ───────────────────────────────────────────────────
function EnvelopeIcon() {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
      <rect x="0.5" y="0.5" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
      <path d="M0.5 1.5L5.5 5L10.5 1.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="9" height="13" viewBox="0 0 9 13" fill="none">
      <path d="M5.5 0.5L0.5 7.5H4.5L3.5 12.5L8.5 5.5H4.5L5.5 0.5Z" fill="currentColor" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
      <path d="M1 1.5C1 1.22386 1.22386 1 1.5 1H9.5C9.77614 1 10 1.22386 10 1.5V12L5.5 9L1 12V1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// ACTION BAR — Preciprocal overlay on LinkedIn job cards
// ─────────────────────────────────────────────────────────────────────────────
export function ActionBar({ onAutoApply, onSave, isSaved, onCoverLetter }: {
  onAutoApply: () => void;
  onSave: () => void;
  isSaved: boolean;
  onCoverLetter: () => void;
}) {
  const [hovered, setHovered] = useState<"cover" | "apply" | "save" | null>(null);
  const coverRef  = useRef<HTMLDivElement>(null);
  const applyRef  = useRef<HTMLDivElement>(null);
  const saveRef   = useRef<HTMLDivElement>(null);

  const refMap = { cover: coverRef, apply: applyRef, save: saveRef };

  const TOOLTIPS = {
    cover: "✦ AI writes your cover letter\ntailored to this role in 30 seconds",
    apply: "Open company site and\nauto-fill the application",
    save:  isSaved ? "Saved to your tracker" : "Save this job to your tracker",
  };

  const getStyle = (key: "cover" | "apply" | "save") => {
    const el = refMap[key].current;
    if (!el) return {};
    const r = el.getBoundingClientRect();
    return {
      position: "fixed" as const,
      left: r.left + r.width / 2,
      top: r.top - 8,
      transform: "translate(-50%, -100%)",
      zIndex: 9999,
      pointerEvents: "none" as const,
    };
  };

  return (
    <div className="bg-[#272c48] border border-indigo-400/30 rounded-xl p-3 mb-3">
      <div className="flex items-center gap-2 mb-2.5">
        <PreciprocalMark size={13} />
        <span className="text-[10px] font-semibold text-white leading-tight">
          Tired of tailoring for Jobs? Let us do it for you!
        </span>
        <button className="ml-auto w-5 h-5 border border-white/10 rounded text-slate-400 text-[9px] flex items-center justify-center flex-shrink-0">
          −−
        </button>
      </div>

      <div className="flex gap-2">

        {/* Cover Letter */}
        <div ref={coverRef} className="flex-1"
          onMouseEnter={() => setHovered("cover")}
          onMouseLeave={() => setHovered(null)}
        >
          <button
            onClick={onCoverLetter}
            className="w-full flex items-center justify-center gap-1.5 bg-white/[0.1] border border-white/[0.12] text-slate-200 text-[10px] font-medium rounded-lg py-2 cursor-pointer hover:bg-white/[0.18] transition-colors">
            <EnvelopeIcon />
            Cover Letter
          </button>
        </div>

        {/* Auto Apply */}
        <div ref={applyRef} className="flex-1"
          onMouseEnter={() => setHovered("apply")}
          onMouseLeave={() => setHovered(null)}
        >
          <button
            onClick={onAutoApply}
            className="w-full flex items-center justify-center gap-1.5 bg-white/[0.15] border border-white/[0.15] hover:bg-indigo-500/60 text-white text-[10px] font-bold rounded-lg py-2 cursor-pointer transition-colors"
          >
            <BoltIcon />
            Auto Apply
          </button>
        </div>

        {/* Save / Bookmark */}
        <div ref={saveRef}
          onMouseEnter={() => setHovered("save")}
          onMouseLeave={() => setHovered(null)}
        >
          <button
            onClick={onSave}
            className={`w-9 h-full flex items-center justify-center rounded-lg border transition-all cursor-pointer ${
              isSaved
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                : "bg-white/[0.08] border-white/[0.1] text-slate-300 hover:bg-white/[0.15]"
            }`}
          >
            {isSaved ? (
              <motion.span
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="text-[12px]"
              >✓</motion.span>
            ) : (
              <BookmarkIcon />
            )}
          </button>
        </div>

      </div>

      {/* Tooltips */}
      {(["cover","apply","save"] as const).map(key => (
        hovered === key && (
          <div key={key} style={getStyle(key)}>
            <div className="bg-[#1a1e35] border border-white/[0.15] rounded-xl px-3 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.7)] min-w-[140px] max-w-[180px]">
              <p className="text-[10px] text-white text-center leading-snug font-medium whitespace-pre-line">
                {TOOLTIPS[key]}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-2.5 h-2.5 rotate-45 border-r border-b border-white/[0.15]" style={{ background: "#1a1e35", marginTop: "-5px" }} />
            </div>
          </div>
        )
      ))}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// LINKEDIN SCREEN
// ─────────────────────────────────────────────────────────────────────────────
export function LinkedInScreen({ onAutoApply, onCoverLetter, appliedJobs, savedJobs, onSave, selectedJob, onSelectJob }: {
  onAutoApply: () => void;
  onCoverLetter: (role: string, company: string) => void;
  appliedJobs: string[];
  savedJobs: string[];
  onSave: (jobId: string) => void;
  selectedJob: string;
  onSelectJob: (job: string) => void;
}) {
  const jobDefs = [
    { id: "ms",   company: "Morgan Stanley", title: "Associate, LCD Data and Analytics", loc: "Baltimore, MD (Hybrid)",   footer: "Viewed · Promoted", sub: "🎓 1 company alum works here", benefit: "401(k), +1 benefit", connections: false },
    { id: "msft", company: "Microsoft",      title: "Applied Scientist",                 loc: "Redmond, WA (Hybrid)",    footer: "Promoted",           sub: "",                              benefit: "",                connections: true  },
    { id: "goog", company: "Google",         title: "Data Scientist",                    loc: "San Bruno, CA (On-site)", footer: "Promoted",           sub: "🎓 1 company alum works here",  benefit: "",                connections: false },
    { id: "visa", company: "Visa",           title: "Data Scientist - VCS",              loc: "Foster City, CA (On-site)",footer: "Promoted",          sub: "🏫 64 school alumni work here", benefit: "",                connections: false },
  ] as const;

  const details: Record<string, { posted: string; clicks: string; bullets: string[] }> = {
    ms:   { posted: "Reposted 1 hour ago",  clicks: "Over 100 people clicked apply", bullets: ["Work with data engineering teams to build scalable ML pipelines","Develop statistical models to support business decisions","Collaborate with front office teams on quantitative research"] },
    msft: { posted: "1 day ago",            clicks: "91 people clicked apply",       bullets: ["Build ML systems for Office and Azure at scale","Research and implement NLP models for Copilot features","Partner with product teams on data-driven features"] },
    goog: { posted: "3 hours ago",          clicks: "Over 200 people clicked apply", bullets: ["Analyze large datasets using SQL, BigQuery and Python","Build forecasting models for YouTube recommendation","Work with cross-functional teams on A/B experiments"] },
    visa: { posted: "2 days ago",           clicks: "54 people clicked apply",       bullets: ["Develop fraud detection models using transaction data","Design ML pipelines processing 200M+ daily transactions","Collaborate with risk and compliance teams on model governance"] },
  };

  const sel = jobDefs.find(j => j.id === selectedJob) ?? jobDefs[0];
  const det = details[selectedJob] ?? details.ms;

  return (
    <div className="flex h-full bg-[#1b1f27] text-white">

      {/* ── LEFT SIDEBAR ── */}
      <div className="w-[260px] flex-shrink-0 border-r border-white/[0.07] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#16adc1]/20 border-b border-[#16adc1]/20 px-3 py-2.5 flex-shrink-0">
          <p className="text-[11px] font-bold text-slate-100">data scientist in United States</p>
          <p className="text-[10px] text-slate-400 mt-0.5">7,062 results</p>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[9px] text-slate-400">Set alert</span>
            <div className="w-8 h-4 bg-slate-600 rounded-full relative cursor-pointer">
              <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow" />
            </div>
          </div>
        </div>

        {/* Job cards */}
        <div className="flex-1 overflow-y-auto">
          {jobDefs.map(job => {
            const isSelected = job.id === selectedJob;
            const isApplied  = appliedJobs.includes(job.id);
            return (
              <div
                key={job.id}
                onClick={() => onSelectJob(job.id)}
                className={`border-b border-white/[0.05] px-3 py-2.5 cursor-pointer transition-colors ${isSelected ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"}`}
              >
                <div className="flex gap-2.5">
                  {/* Company logo */}
                  <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden flex items-center justify-center border border-white/10">
                    {job.id === "ms"   && <div className="w-full h-full bg-[#1a2744] flex items-center justify-center"><span className="text-[6px] text-white font-black text-center leading-tight">Morgan<br/>Stanley</span></div>}
                    {job.id === "msft" && <div className="w-full h-full bg-white p-1"><div className="grid grid-cols-2 gap-0.5 w-full h-full"><div className="bg-red-500 rounded-sm"/><div className="bg-green-500 rounded-sm"/><div className="bg-blue-600 rounded-sm"/><div className="bg-amber-400 rounded-sm"/></div></div>}
                    {job.id === "goog" && <div className="w-full h-full bg-white flex items-center justify-center"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg></div>}
                    {job.id === "visa" && <div className="w-full h-full bg-[#1a1f71] flex items-center justify-center"><span className="text-white font-black text-[11px] italic">VISA</span></div>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <p className="text-[10px] text-blue-400 font-semibold leading-tight">{job.title} <span className="text-blue-300">✓</span></p>
                      <button className="text-slate-500 text-[11px] flex-shrink-0" onClick={e => e.stopPropagation()}>×</button>
                    </div>
                    <p className="text-[10px] text-slate-300">{job.company}</p>
                    <p className="text-[9px] text-slate-400">{job.loc}</p>

                    {/* Badge — always same position, right after location */}
                    {(isApplied || savedJobs.includes(job.id)) && (
                      <div className="mt-1">
                        {isApplied ? (
                          <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-block text-[8px] font-bold bg-slate-600 text-slate-200 px-1.5 py-0.5 rounded">APPLIED</motion.span>
                        ) : (
                          <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-block text-[8px] font-bold bg-teal-700/60 text-teal-300 border border-teal-600/40 px-1.5 py-0.5 rounded">SAVED</motion.span>
                        )}
                      </div>
                    )}

                    {job.benefit && <p className="text-[9px] text-slate-500 mt-1">{job.benefit}</p>}
                    {job.connections && (
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex -space-x-1">
                          {["bg-blue-400","bg-purple-400","bg-green-400"].map((c,i) => (
                            <div key={i} className={"w-3.5 h-3.5 rounded-full border border-[#1b1f27] " + c}/>
                          ))}
                        </div>
                        <span className="text-[9px] text-slate-400">19 connections</span>
                      </div>
                    )}
                    {job.sub && <p className="text-[9px] text-slate-500 mt-0.5">{job.sub}</p>}
                    <p className="text-[9px] text-slate-500">{job.footer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT DETAIL PANE ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedJob}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 overflow-y-auto"
        >
          <div className="px-5 pt-4 pb-3 border-b border-white/[0.06]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="w-12 h-12 rounded flex-shrink-0 border border-white/10 overflow-hidden flex items-center justify-center">
                  {sel.id === "ms"   && <div className="w-full h-full bg-[#1a2744] flex items-center justify-center"><span className="text-[6px] text-white font-black text-center leading-tight">Morgan<br/>Stanley</span></div>}
                  {sel.id === "msft" && <div className="w-full h-full bg-white p-1"><div className="grid grid-cols-2 gap-0.5 w-full h-full"><div className="bg-red-500 rounded-sm"/><div className="bg-green-500 rounded-sm"/><div className="bg-blue-600 rounded-sm"/><div className="bg-amber-400 rounded-sm"/></div></div>}
                  {sel.id === "goog" && <div className="w-full h-full bg-white flex items-center justify-center"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg></div>}
                  {sel.id === "visa" && <div className="w-full h-full bg-[#1a1f71] flex items-center justify-center"><span className="text-white font-black text-[13px] italic">VISA</span></div>}
                </div>
                <span className="text-[13px] font-bold text-slate-100">{sel.company}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="text-[16px] cursor-pointer hover:text-white">↷</span>
                <span className="text-[16px] cursor-pointer hover:text-white">···</span>
              </div>
            </div>

            <h2 className="text-[18px] font-bold text-white mb-1.5">
              {sel.title} <span className="text-blue-400 text-[14px]">✓</span>
            </h2>
            <p className="text-[11px] mb-0.5">
              <span className="text-slate-400">{sel.loc.split("(")[0].trim()} · </span>
              <span className="text-green-400 font-semibold">{det.posted}</span>
              <span className="text-slate-400"> · {det.clicks}</span>
            </p>
            <p className="text-[10px] text-slate-500 mb-3">Promoted by hirer · Responses managed off LinkedIn</p>

            <ActionBar
              onAutoApply={onAutoApply}
              onCoverLetter={() => onCoverLetter(sel.title, sel.company)}
              onSave={() => onSave(sel.id)}
              isSaved={savedJobs.includes(sel.id)}
            />

            <div className="flex items-center gap-2 mb-3">
              {["✓ Hybrid","✓ Full-time"].map(t => (
                <span key={t} className="text-[10px] border border-white/[0.18] text-slate-300 rounded-full px-3 py-1 font-medium">{t}</span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-full transition-colors cursor-pointer">Apply ↗</button>
              <button
                onClick={() => onSave(sel.id)}
                className={`text-[11px] font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors border ${
                  savedJobs.includes(sel.id)
                    ? "bg-teal-700/30 border-teal-600/40 text-teal-300"
                    : "border-blue-500 text-blue-400 hover:bg-blue-500/10"
                }`}
              >
                {savedJobs.includes(sel.id) ? "✓ Saved" : "Save"}
              </button>
            </div>
          </div>

          <div className="px-5 py-3">
            <p className="text-[11px] font-bold text-slate-200 mb-2">About the job</p>
            <div className="space-y-1.5">
              {det.bullets.map((line: string, i: number) => (
                <div key={i} className="flex gap-2">
                  <span className="text-slate-500 text-[10px] mt-0.5 flex-shrink-0">•</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{line}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            animate={{ opacity: [0.4,0.9,0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center justify-center gap-1.5 py-3 border-t border-white/[0.05]"
          >
            <span className="text-[10px] text-indigo-400 font-medium">Click Auto Apply to watch Preciprocal fill the entire form</span>
            <ArrowRight size={9} className="text-indigo-400" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// MAIN LIVE DEMO ORCHESTRATOR
// ─────────────────────────────────────────────────────────────────────────────
// Build a flat timeline of events:
//   For each step → for each field → fill it (350ms apart)
//   Then advance to next step (300ms pause after last field)