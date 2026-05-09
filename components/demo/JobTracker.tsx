"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { U, STATUS_CFG, PREP_TIMES, type TrackerJob } from "@/lib/demo";

// Re-export TrackerJob so consumers only import from one place
export type { TrackerJob };

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
// STATUS DROPDOWN — click-outside aware
// ─────────────────────────────────────────────────────────────────────────────
export function StatusDropdown({ job, onUpdate }: { job: TrackerJob; onUpdate: (id:string, s:string)=>void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cfg = STATUS_CFG.find(s => s.label === job.status) ?? STATUS_CFG[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        className="flex items-center gap-1.5 bg-[#1a2035] border border-blue-500/30 text-[10px] font-semibold px-2.5 py-1 rounded-full transition-all hover:border-blue-400/50"
      >
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
        <span className={cfg.text}>{job.status}</span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="text-slate-400"><path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute top-[calc(100%+4px)] left-0 bg-[#111827] border border-white/[0.1] rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.6)] z-50 py-1.5 min-w-[150px]"
            onClick={e => e.stopPropagation()}
          >
            {STATUS_CFG.map(s => (
              <button
                key={s.label}
                onClick={() => { onUpdate(job.id, s.label); setOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                  <span className={`text-[11px] ${s.label === job.status ? "font-bold text-white" : "text-slate-300"}`}>{s.label}</span>
                  {s.label === "Offer" && <span className="text-[10px]">🎉</span>}
                </div>
                {s.label === job.status && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#6366f1" strokeWidth="1.5"/><circle cx="7" cy="7" r="2.5" fill="#6366f1"/></svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Edit Application overlay ──────────────────────────────────────────────────
export function EditOverlay({ job, onClose, onSave }: { job: TrackerJob; onClose: ()=>void; onSave: (j:TrackerJob)=>void }) {
  const [form, setForm] = useState({...job});
  const f = (k: keyof TrackerJob, v: string) => setForm(p => ({...p, [k]: v}));
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="absolute inset-0 bg-black/70 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.16,1,0.3,1] }}
        onClick={e => e.stopPropagation()}
        className="bg-[#0d1117] border border-white/[0.1] rounded-2xl w-full max-w-[500px] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.07]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="10" rx="1.5" stroke="white" strokeWidth="1.3"/><path d="M5 4V3a3 3 0 016 0v1" stroke="white" strokeWidth="1.3"/><path d="M5 9h6M5 11.5h3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </div>
          <span className="text-[14px] font-semibold text-white">Edit Application</span>
          <button onClick={onClose} className="ml-auto text-slate-500 hover:text-white text-[18px] leading-none transition-colors">×</button>
        </div>

        <div className="px-5 py-4 space-y-4 overflow-y-auto" style={{maxHeight:460}}>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-[11px] text-slate-400 mb-1 block">Company *</label>
              <input value={form.company} onChange={e=>f("company",e.target.value)} className="w-full bg-[#161b2e] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[13px] text-white outline-none focus:border-indigo-500/50 transition-colors" /></div>
            <div><label className="text-[11px] text-slate-400 mb-1 block">Job Title *</label>
              <input value={form.title} onChange={e=>f("title",e.target.value)} className="w-full bg-[#161b2e] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[13px] text-white outline-none focus:border-indigo-500/50 transition-colors" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-[11px] text-slate-400 mb-1 block">Status</label>
              <div className="w-full bg-[#161b2e] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[13px] text-slate-300">{form.status}</div></div>
            <div><label className="text-[11px] text-slate-400 mb-1 block">Applied Date</label>
              <input type="date" defaultValue={today} className="w-full bg-[#161b2e] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[13px] text-white outline-none focus:border-indigo-500/50 transition-colors" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-[11px] text-slate-400 mb-1 block">Location</label>
              <input placeholder="e.g. San Francisco, CA" className="w-full bg-[#161b2e] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[13px] text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 transition-colors" /></div>
            <div><label className="text-[11px] text-slate-400 mb-1 block">Work Type</label>
              <div className="flex gap-1.5">
                {["Remote","Hybrid","Onsite"].map(t => (
                  <button key={t} onClick={()=>f("workType",t)}
                    className={`flex-1 text-[10px] font-semibold py-2 rounded-xl border transition-all ${form.workType===t ? "bg-gradient-to-r from-indigo-600 to-purple-600 border-transparent text-white" : "bg-white/[0.04] border-white/[0.08] text-slate-400 hover:bg-white/[0.07]"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-[11px] text-slate-400 mb-1 block">Salary / Range</label>
              <input placeholder="e.g. $140k–$170k" className="w-full bg-[#161b2e] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[13px] text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 transition-colors" /></div>
            <div><label className="text-[11px] text-slate-400 mb-1 block">Source</label>
              <input value={form.source} onChange={e=>f("source",e.target.value)} className="w-full bg-[#161b2e] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[13px] text-white outline-none focus:border-indigo-500/50 transition-colors" /></div>
          </div>
          <div><label className="text-[11px] text-slate-400 mb-1 block">Job URL</label>
            <input value={form.url} onChange={e=>f("url",e.target.value)} className="w-full bg-[#161b2e] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[11px] font-mono text-slate-300 outline-none focus:border-indigo-500/50 transition-colors" /></div>
          <div><label className="text-[11px] text-slate-400 mb-1 block">Notes</label>
            <textarea placeholder="Interview details, recruiter name, key contacts, follow-up dates…"
              className="w-full bg-[#161b2e] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[12px] text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 transition-colors resize-none h-16" /></div>
        </div>

        <div className="flex gap-3 px-5 py-3.5 border-t border-white/[0.07]">
          <button onClick={()=>{onSave(form);onClose();}}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white text-[13px] font-semibold py-2.5 rounded-xl transition-all">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2h8l2 2v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="white" strokeWidth="1.2"/><rect x="4" y="8" width="6" height="4" rx="0.5" stroke="white" strokeWidth="1"/><rect x="4" y="2" width="5" height="3" rx="0.5" stroke="white" strokeWidth="1"/></svg>
            Update
          </button>
          <button onClick={onClose} className="px-5 py-2.5 bg-[#1a1f2e] border border-white/[0.08] text-slate-300 text-[13px] font-medium rounded-xl hover:bg-white/[0.07] transition-colors">Cancel</button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Sign-in prompt overlay ───────────────────────────────────────────────────
function SignInOverlay({ feature, subtitle, onClose }: {
  feature: string;
  subtitle: string;
  onClose: () => void;
}) {
  const featureIcons: Record<string, string> = {
    "Find Contacts": "👥",
    "Create Prep Plan": "📅",
  };
  return (
    <div
      className="absolute inset-0 bg-black/70 z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.16,1,0.3,1] }}
        onClick={e => e.stopPropagation()}
        className="bg-[#0d1117] border border-white/[0.1] rounded-2xl w-full max-w-[380px] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start gap-3 px-5 py-4 border-b border-white/[0.07]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center flex-shrink-0 text-[18px]">
            {featureIcons[feature] ?? "✦"}
          </div>
          <div>
            <p className="text-[14px] font-semibold text-white leading-none">{feature}</p>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">{subtitle}</p>
          </div>
          <button onClick={onClose} className="ml-auto text-slate-500 hover:text-white text-[18px] leading-none transition-colors mt-0.5">×</button>
        </div>

        {/* Body */}
        <div className="px-5 py-6 flex flex-col items-center text-center">
          {/* Preciprocal logo */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border border-indigo-500/20 flex items-center justify-center mb-4">
            <PreciprocalMark size={28} />
          </div>

          <h3 className="text-[15px] font-bold text-white mb-2">
            Sign in to unlock {feature}
          </h3>
          <p className="text-[12px] text-slate-400 leading-relaxed mb-6 max-w-[280px]">
            This feature is available on Preciprocal. Sign in or create a free account to access it instantly.
          </p>

          {/* CTAs */}
          <a
            href="https://app.preciprocal.com/sign-up"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white text-[13px] font-bold py-3 rounded-xl transition-all mb-2.5"
          >
            ✦ Get started free
          </a>
          <a
            href="https://app.preciprocal.com/sign-in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-white/[0.06] border border-white/[0.09] text-slate-300 text-[13px] font-medium py-3 rounded-xl hover:bg-white/[0.1] transition-colors"
          >
            Sign in to existing account
          </a>

          <p className="text-[10px] text-slate-600 mt-4">Free plan includes 2 contact lookups and 1 prep plan per month</p>
        </div>
      </motion.div>
    </div>
  );
}

// ── Job card ──────────────────────────────────────────────────────────────────// ── Job card ──────────────────────────────────────────────────────────────────
export function JobCard({ job, onEdit, onContacts, onPlan, onUpdateStatus }: {
  job: TrackerJob;
  onEdit: ()=>void; onContacts: ()=>void; onPlan: ()=>void;
  onUpdateStatus: (id:string, s:string)=>void;
}) {
  return (
    <div
      onClick={onEdit}
      className="bg-[#0d1117] border border-white/[0.07] hover:border-white/[0.14] rounded-xl p-3.5 cursor-pointer transition-colors flex flex-col gap-2.5"
    >
      {/* Company row */}
      <div className="flex items-center gap-2.5">
        <div className={`w-9 h-9 rounded-lg ${job.color} flex items-center justify-center text-white text-[11px] font-black flex-shrink-0 border border-white/10`}>
          {job.id === "goog" ? (
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          ) : job.initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold text-white leading-tight truncate">{job.company}</p>
          <p className="text-[10px] text-slate-400 truncate">{job.title}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 text-[10px] text-slate-500">
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="1" y="2" width="9" height="8" rx="1" stroke="currentColor" strokeWidth="0.9"/><path d="M1 4.5h9M3.5 1v2M7.5 1v2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/></svg>
          Onsite
        </span>
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="0.9"/><path d="M5.5 3v2.5l1.5 1.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/></svg>
          {job.date === "today" ? "Today" : job.date}
        </span>
      </div>

      {/* Status + source */}
      <div className="flex items-center justify-between" onClick={e => e.stopPropagation()}>
        <StatusDropdown job={job} onUpdate={onUpdateStatus} />
        <span className="text-[9px] text-slate-600 truncate ml-2">{job.source}</span>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-1.5" onClick={e => e.stopPropagation()}>
        <button
          onClick={onContacts}
          className="flex items-center justify-center gap-1.5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-medium py-1.5 rounded-lg hover:bg-indigo-600/20 transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="4" cy="3.5" r="1.8" stroke="currentColor" strokeWidth="1"/><path d="M1 9c0-1.66 1.34-3 3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/><circle cx="8" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1"/><path d="M6 10c0-1.1.9-2 2-2s2 .9 2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
          Find Contacts
        </button>
        <button
          onClick={onPlan}
          className="flex items-center justify-center gap-1.5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-medium py-1.5 rounded-lg hover:bg-indigo-600/20 transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="1" y="2" width="9" height="8" rx="1" stroke="currentColor" strokeWidth="1"/><path d="M1 4.5h9M3.5 1v2M7.5 1v2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
          Create Plan
        </button>
      </div>
    </div>
  );
}

// ── Main tracker view (no fixed overlay — renders inside browser frame) ────────
export function JobTrackerView({ jobs, appliedJobs, onUpdateStatus }: {
  jobs: TrackerJob[];
  appliedJobs: string[];
  onUpdateStatus: (id: string, status: string) => void;
}) {
  const [localJobs, setLocalJobs]   = useState(jobs);
  const [editJob, setEditJob]       = useState<TrackerJob | null>(null);
  const [contactJob, setContactJob] = useState<TrackerJob | null>(null);
  const [planJob, setPlanJob]       = useState<TrackerJob | null>(null);
  const [search, setSearch]         = useState("");
  const [activeTab, setActiveTab]   = useState<string>("All");

  // Keep in sync when parent jobs change (new saves)
  useEffect(() => {
    setLocalJobs(prev => {
      const prevIds = new Set(prev.map(j => j.id));
      const newOnes = jobs.filter(j => !prevIds.has(j.id));
      return [...prev.map(p => jobs.find(j => j.id === p.id) ? {...p, ...jobs.find(j=>j.id===p.id), status: p.status} : p), ...newOnes];
    });
  }, [jobs.length]);

  const handleStatus = (id: string, s: string) => {
    setLocalJobs(prev => prev.map(j => j.id === id ? {...j, status: s} : j));
    onUpdateStatus(id, s);
  };

  const tabFiltered = activeTab === "All"
    ? localJobs
    : localJobs.filter(j => j.status === activeTab);

  const filtered = tabFiltered.filter(j =>
    j.company.toLowerCase().includes(search.toLowerCase()) ||
    j.title.toLowerCase().includes(search.toLowerCase())
  );

  const NAV = [
    {label:"Overview",      icon:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.1"/><rect x="7.5" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.1"/><rect x="1" y="7.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.1"/><rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.1"/></svg>},
    {label:"Resume",        icon:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.1"/><path d="M4.5 4.5h5M4.5 7h5M4.5 9.5h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>},
    {label:"Cover Letter",  icon:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.1"/><path d="M1 4l6 4.5L13 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>},
    {label:"Interviews",    icon:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.1"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" strokeWidth="1"/><path d="M4 11c0-1.66 1.34-3 3-3s3 1.34 3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>},
    {label:"Planner",       icon:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2.5" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.1"/><path d="M1 6h12M4.5 1v3M9.5 1v3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>},
    {label:"Interview Journal", icon:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.1"/><path d="M4.5 5h5M4.5 7.5h5M4.5 10h2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>, badge: true},
    {label:"Career Tools",  icon:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.1"/><path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.93 2.93l1.41 1.41M9.66 9.66l1.41 1.41M2.93 11.07l1.41-1.41M9.66 4.34l1.41-1.41" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>, badge: true},
    {label:"Job Tracker",   icon:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="3" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.1"/><path d="M4 3V2a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.1"/><path d="M4.5 7h5M4.5 9.5h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>, active: true},
  ];

  const total   = localJobs.length;
  const active  = localJobs.filter(j => j.status === "Applied").length;
  const offers  = localJobs.filter(j => j.status === "Offer").length;
  const byStatus = (s: string) => localJobs.filter(j => j.status === s).length;

  return (
    <div className="flex h-full bg-[#080c14] text-white overflow-hidden relative">
      {/* ── SIDEBAR ── */}
      <div className="w-[195px] flex-shrink-0 bg-[#080c14] border-r border-white/[0.07] flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-white/[0.06]">
          <PreciprocalMark size={16} />
          <span className="text-[13px] font-bold text-white tracking-tight">Preciprocal</span>
        </div>

        {/* User card */}
        <div className="mx-2.5 mt-2.5 mb-1.5 bg-white/[0.04] border border-white/[0.07] rounded-xl px-2.5 py-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
            {U.initials}
          </div>
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
            <div className="w-6 h-6 rounded-lg bg-indigo-600/25 flex items-center justify-center flex-shrink-0 text-[10px]">💼</div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-white leading-none">Job Tracker</p>
              <p className="text-[8px] text-slate-500 mt-0.5">Recently visited</p>
            </div>
          </div>

          <p className="text-[8.5px] font-bold text-slate-600 uppercase tracking-widest px-2 py-1.5 mt-1">Other</p>
          {["Settings","Support"].map(label => (
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
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex-1 flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-slate-500"><circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.1"/><path d="M8 8l2.5 2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
            <span className="text-[11px] text-slate-500">Search pages, FAQs...</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-6 h-6 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-[9px] font-bold text-indigo-300">{U.initials[0]}</div>
            <div className="w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center text-[9px] text-slate-400">AK</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {/* Breadcrumb + header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] text-slate-500 mb-1.5 flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6 2L3 5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Dashboard
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="3" width="11" height="9" rx="1.5" stroke="white" strokeWidth="1.2"/><path d="M4 3V2a3 3 0 016 0v1" stroke="white" strokeWidth="1.2"/></svg>
                </div>
                <div>
                  <h1 className="text-[16px] font-bold text-white leading-none">Job Tracker</h1>
                  <p className="text-[10px] text-slate-500 mt-0.5">Track every application from wishlist to offer</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 text-[10px] text-slate-400 border border-white/[0.09] px-2.5 py-1.5 rounded-xl hover:bg-white/[0.04] transition-colors">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polygon points="5,1 9,8 1,8" stroke="currentColor" strokeWidth="1" fill="none"/></svg>
                See Example
              </button>
              <button className="flex items-center gap-1.5 text-[10px] text-indigo-300 border border-indigo-500/30 bg-indigo-600/10 px-2.5 py-1.5 rounded-xl">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5C1 2.79 2.79 1 5 1s4 1.79 4 4-1.79 4-4 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/><path d="M5 3v4M3 5h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
                Unlimited
              </button>
              <button className="flex items-center gap-1.5 text-[10px] text-white bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1.5 rounded-xl font-semibold hover:opacity-90 transition-all">
                + Add Application
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2.5 mb-3">
            {[
              {label:"TOTAL",         val: String(total),  sub:"",            cls:"text-white"},
              {label:"ACTIVE",        val: String(active), sub:"in progress",  cls:"text-blue-400"},
              {label:"RESPONSE RATE", val: "0%",           sub:"",            cls:"text-amber-400"},
              {label:"OFFERS",        val: String(offers), sub:"",            cls:"text-emerald-400"},
            ].map(s => (
              <div key={s.label} className="bg-[#0d1117] border border-white/[0.07] rounded-xl px-3.5 py-2.5">
                <p className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
                <p className={`text-[22px] font-black leading-none ${s.cls}`}>{s.val}</p>
                {s.sub && <p className="text-[10px] text-slate-500 mt-0.5">{s.sub}</p>}
              </div>
            ))}
          </div>

          {/* Filter tabs — all status categories */}
          <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto pb-0.5 scrollbar-hide">
            {[
              { label: "All",          dot: "bg-slate-400",   active_bg: "bg-slate-500/15",   active_border: "border-slate-500/30",   active_text: "text-slate-200"   },
              { label: "Applied",      dot: "bg-blue-500",    active_bg: "bg-blue-600/15",    active_border: "border-blue-500/30",    active_text: "text-blue-300"    },
              { label: "Phone Screen", dot: "bg-purple-400",  active_bg: "bg-purple-600/15",  active_border: "border-purple-500/30",  active_text: "text-purple-300"  },
              { label: "Technical",    dot: "bg-indigo-400",  active_bg: "bg-indigo-600/15",  active_border: "border-indigo-500/30",  active_text: "text-indigo-300"  },
              { label: "Final Round",  dot: "bg-yellow-400",  active_bg: "bg-yellow-600/15",  active_border: "border-yellow-500/30",  active_text: "text-yellow-300"  },
              { label: "Offer",        dot: "bg-emerald-400", active_bg: "bg-emerald-600/15", active_border: "border-emerald-500/30", active_text: "text-emerald-300" },
              { label: "Rejected",     dot: "bg-red-400",     active_bg: "bg-red-600/15",     active_border: "border-red-500/30",     active_text: "text-red-300"     },
            ].map(tab => {
              const count = tab.label === "All" ? total : byStatus(tab.label);
              const isActive = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-all whitespace-nowrap ${
                    isActive
                      ? `${tab.active_bg} ${tab.active_border} ${tab.active_text}`
                      : "bg-transparent border-white/[0.07] text-slate-500 hover:border-white/[0.15] hover:text-slate-400"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${tab.dot}`} />
                  {tab.label} {count}
                </button>
              );
            })}
          </div>

          {/* Search + filters */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-1.5">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="text-slate-500 flex-shrink-0"><circle cx="4.5" cy="4.5" r="3" stroke="currentColor" strokeWidth="1"/><path d="M7 7l2.5 2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search by company, role, or location..."
                className="flex-1 bg-transparent text-[10px] text-white placeholder-slate-600 outline-none" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 border border-white/[0.08] px-2.5 py-1.5 rounded-xl whitespace-nowrap">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 3h8M2.5 5h5M4 7h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
              All ({total}) ▾
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 border border-white/[0.08] px-2.5 py-1.5 rounded-xl whitespace-nowrap">All Types ▾</div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 border border-white/[0.08] px-2.5 py-1.5 rounded-xl whitespace-nowrap">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
              Recent First ▾
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mb-2">{filtered.length} applications</p>

          {/* Cards grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-3 text-[20px]">💼</div>
              <p className="text-[13px] font-semibold text-slate-300">No applications yet</p>
              <p className="text-[11px] text-slate-500 mt-1">Save or apply to jobs using the extension to see them here</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2.5">
              {filtered.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onEdit={() => setEditJob(job)}
                  onContacts={() => { setContactJob(job); }}
                  onPlan={() => { setPlanJob(job); }}
                  onUpdateStatus={handleStatus}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sub-overlays — rendered inside the same container */}
      <AnimatePresence>
        {editJob    && <EditOverlay key="edit" job={editJob} onClose={()=>setEditJob(null)} onSave={j=>setLocalJobs(p=>p.map(x=>x.id===j.id?j:x))} />}
        {(contactJob || planJob) && (
          <SignInOverlay
            key="signin"
            feature={contactJob ? "Find Contacts" : "Create Prep Plan"}
            subtitle={contactJob
              ? `Find the recruiter and hiring manager at ${contactJob.company}`
              : `Build a day-by-day prep plan for ${planJob!.title} at ${planJob!.company}`
            }
            onClose={() => { setContactJob(null); setPlanJob(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}