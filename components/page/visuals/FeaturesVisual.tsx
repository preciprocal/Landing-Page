"use client";

/**
 * Hero illustration for /features: the product itself. An app window with
 * every tool in the sidebar, a four-stage tracker along the top, and the
 * main panel showing what the tools of the current stage produce. The stage
 * advances on a loop and the sidebar lights the tools in use.
 * Steps: 0 get noticed, 1 reach people, 2 win the interview, 3 stay on track.
 * Names, scores and counts are fictional examples.
 */

import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Bookmark, Check, FileText, Inbox, MessageSquare, Mic, Search, Send, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { EASE, Stage, Window, useLoop } from "./Frame";

const STAGES = ["Get noticed", "Reach people", "Interview", "Stay on track"];

const TOOLS = [
  { label: "Resume score", icon: FileText, stage: 0 },
  { label: "Tailoring", icon: Sparkles, stage: 0 },
  { label: "Cover letter", icon: Send, stage: 1 },
  { label: "Contacts", icon: Search, stage: 1 },
  { label: "Mock interview", icon: Mic, stage: 2 },
  { label: "Predictor", icon: MessageSquare, stage: 2 },
  { label: "Tracker", icon: Inbox, stage: 3 },
  { label: "Extension", icon: Bookmark, stage: 3 },
];

function Panel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

const R = 20;
const C = 2 * Math.PI * R;

function StageContent({ step }: { step: number }) {
  if (step === 0)
    return (
      <>
        <Panel label="Resume score">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0">
              <svg viewBox="0 0 48 48" className="h-full w-full -rotate-90">
                <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                <motion.circle
                  cx="24" cy="24" r={R} fill="none" stroke="rgb(var(--accent))" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={C} initial={{ strokeDashoffset: C }} animate={{ strokeDashoffset: C * 0.14 }}
                  transition={{ duration: 1, ease: EASE }}
                />
              </svg>
              <span className="absolute inset-0 grid place-items-center text-[13px] font-bold text-white">86</span>
            </div>
            <div>
              <p className="text-[12.5px] font-semibold text-white">Ready to send</p>
              <p className="text-[11px] text-slate-400">Up from 61 after 4 fixes</p>
            </div>
          </div>
        </Panel>
        <Panel label="Tailored to Frontend Engineer, Northwind">
          <div className="flex flex-wrap gap-1.5">
            {["TypeScript", "Design systems", "A/B testing", "Accessibility"].map((k) => (
              <span key={k} className="inline-flex items-center gap-1 rounded-md bg-emerald-400/10 px-2 py-0.5 text-[10.5px] font-medium text-emerald-300">
                <Check className="h-2.5 w-2.5" /> {k}
              </span>
            ))}
          </div>
        </Panel>
      </>
    );
  if (step === 1)
    return (
      <>
        <Panel label="Hiring contact">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-[11px] font-bold text-white">PS</span>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-semibold text-white">Priya Shah</p>
              <p className="truncate text-[11px] text-slate-400">Technical Recruiter, Northwind</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
              <BadgeCheck className="h-3 w-3" /> Verified
            </span>
          </div>
        </Panel>
        <Panel label="Cover letter">
          <p className="text-[11.5px] leading-relaxed text-slate-300">
            &ldquo;Your post asks for someone who can grow a <span className="rounded bg-accent/15 px-1 text-accent-soft">design system</span> across products. In my capstone I built one&hellip;&rdquo;
          </p>
        </Panel>
      </>
    );
  if (step === 2)
    return (
      <>
        <Panel label="Mock interview · Behavioural">
          <div className="space-y-1.5">
            {[
              { k: "Structure", v: 88 },
              { k: "Communication", v: 81 },
              { k: "Technical depth", v: 74 },
            ].map((r, i) => (
              <div key={r.k} className="flex items-center gap-2.5">
                <span className="w-24 text-[11px] text-slate-300">{r.k}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
                    initial={{ width: 0 }} animate={{ width: `${r.v}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                  />
                </div>
                <span className="w-6 text-right text-[11px] font-semibold text-white">{r.v}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel label="Likely question">
          <p className="text-[12px] font-medium leading-snug text-white">Tell me about a time you led a cross-functional launch.</p>
          <p className="mt-1 text-[10.5px] font-medium text-accent-soft">Very likely for this role</p>
        </Panel>
      </>
    );
  return (
    <>
      <Panel label="Pipeline">
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {[
            { k: "Saved", v: 8 },
            { k: "Applied", v: 12 },
            { k: "Interview", v: 3 },
            { k: "Offer", v: 1 },
          ].map((c) => (
            <div key={c.k} className={`rounded-lg py-2 ${c.k === "Offer" ? "bg-emerald-400/10" : "bg-white/[0.035]"}`}>
              <p className={`text-[15px] font-bold ${c.k === "Offer" ? "text-emerald-300" : "text-white"}`}>{c.v}</p>
              <p className="text-[9.5px] text-slate-400">{c.k}</p>
            </div>
          ))}
        </div>
      </Panel>
      <Panel label="Saved from LinkedIn">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[12px] font-semibold text-white">Product Analyst · Lumen</p>
          <span className="text-[10.5px] text-slate-400">Follow up Thu</span>
        </div>
      </Panel>
    </>
  );
}

export default function FeaturesVisual() {
  const { ref, step } = useLoop(4, 2600);

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com" bodyClassName="grid grid-cols-[148px_minmax(0,1fr)]">
          {/* Sidebar: every tool, the ones in use lit */}
          <aside className="border-r border-white/[0.06] bg-black/[0.15] px-2.5 py-4">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Tools</p>
            <ul className="mt-2 space-y-0.5">
              {TOOLS.map(({ label, icon: Icon, stage }) => {
                const on = stage === step;
                const done = stage < step;
                return (
                  <li
                    key={label}
                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-colors duration-500 ${
                      on ? "bg-accent/15 text-white" : "text-slate-400"
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 shrink-0 transition-colors duration-500 ${on ? "text-accent" : done ? "text-emerald-400/80" : "text-slate-500"}`} />
                    <span className="truncate">{label}</span>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Main panel */}
          <div className="min-w-0 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold text-white">Your job search</p>
                <p className="text-[10.5px] text-slate-400">Frontend Engineer · 4 active roles</p>
              </div>
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold text-accent-soft">
                {STAGES[step]}
              </span>
            </div>

            {/* Stage tracker */}
            <div className="mt-3.5 grid grid-cols-4 gap-1.5">
              {STAGES.map((s, i) => (
                <div key={s}>
                  <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
                      initial={false}
                      animate={{ width: i <= step ? "100%" : "0%" }}
                      transition={{ duration: 0.7, ease: EASE }}
                    />
                  </div>
                  <p className={`mt-1.5 truncate text-[9.5px] font-medium transition-colors duration-500 ${i <= step ? "text-slate-200" : "text-slate-500"}`}>{s}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-3.5 min-h-[178px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="space-y-2.5"
                >
                  <StageContent step={step} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Window>
      </Stage>
    </div>
  );
}
