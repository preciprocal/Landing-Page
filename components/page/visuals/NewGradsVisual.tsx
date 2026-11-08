"use client";

/**
 * Hero illustration for /for/new-grads: a first job search inside the
 * product. Four milestones (Resume, Applied, Interview, Offer) light up along
 * a track, and the panel below shows what that milestone looks like in the
 * app: a resume score, the applications sent, the interview booked, and
 * finally the offer.
 * Steps: 0 resume, 1 applied, 2 interview, 3 offer (finished state).
 * Names, companies, scores and dates are fictional examples.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Check, FileText, MessageSquare, Send, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

const MILESTONES = [
  { label: "Resume", Icon: FileText },
  { label: "Applied", Icon: Send },
  { label: "Interview", Icon: MessageSquare },
  { label: "Offer", Icon: Sparkles },
];

const R = 18;
const C = 2 * Math.PI * R;

function Panel({ label, aside, children }: { label: string; aside?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
        {aside && <span className="text-[10.5px] font-medium text-slate-400">{aside}</span>}
      </div>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

function MilestoneContent({ step }: { step: number }) {
  if (step === 0)
    return (
      <Panel label="Resume score" aside="One page">
        <div className="flex items-center gap-3.5">
          <div className="relative h-11 w-11 shrink-0">
            <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90">
              <circle cx="22" cy="22" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
              <motion.circle
                cx="22" cy="22" r={R} fill="none" stroke="rgb(var(--accent))" strokeWidth="4" strokeLinecap="round"
                strokeDasharray={C} initial={{ strokeDashoffset: C }} animate={{ strokeDashoffset: C * 0.18 }}
                transition={{ duration: 1, ease: EASE }}
              />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-[12.5px] font-bold text-white">82</span>
          </div>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold text-white">Projects moved above coursework</p>
            <p className="text-[11px] text-slate-400">Capstone and internship now lead the page</p>
          </div>
        </div>
      </Panel>
    );
  if (step === 1)
    return (
      <Panel label="Applications" aside="3 sent this week">
        <ul className="space-y-1.5">
          {[
            { role: "Associate Analyst", co: "Northwind" },
            { role: "Junior Data Analyst", co: "Lumen" },
            { role: "Operations Associate", co: "Halcyon" },
          ].map((a) => (
            <li key={a.role} className="flex items-center justify-between gap-2">
              <span className="truncate text-[12px] text-slate-200">
                {a.role} <span className="text-slate-400">· {a.co}</span>
              </span>
              <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent-soft">Applied</span>
            </li>
          ))}
        </ul>
      </Panel>
    );
  if (step === 2)
    return (
      <Panel label="Interview booked" aside="Tue, 10:00 AM">
        <p className="text-[12.5px] font-semibold text-white">Phone screen · Associate Analyst, Northwind</p>
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-white/[0.035] px-2.5 py-2">
          <MessageSquare className="h-3.5 w-3.5 shrink-0 text-accent" />
          <span className="truncate text-[11.5px] text-slate-300">Practised: &ldquo;Walk me through your capstone.&rdquo;</span>
        </div>
      </Panel>
    );
  return (
    <Panel label="Offer letter" aside="Received today">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-white">Associate Analyst</p>
          <p className="text-[11px] text-slate-400">Northwind · Full-time</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="rounded-md border border-white/10 px-2.5 py-1 text-[10.5px] font-medium text-slate-300">Review</span>
          <span className="rounded-md bg-accent px-2.5 py-1 text-[10.5px] font-semibold text-[#050810]">Accept</span>
        </div>
      </div>
    </Panel>
  );
}

export default function NewGradsVisual() {
  const { ref, step } = useLoop(MILESTONES.length, 2000);

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com/first-job" bodyClassName="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold text-white">Your first job search</p>
              <p className="text-[11px] text-slate-400">Jordan Lee · Class of 2026</p>
            </div>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10.5px] font-semibold text-accent-soft">
              Step {step + 1} of {MILESTONES.length}
            </span>
          </div>

          {/* Track */}
          <div className="relative mt-5 px-4">
            <div className="absolute left-[34px] right-[34px] top-[17px] h-[2px] rounded-full bg-white/[0.07]" />
            <motion.div
              className="absolute left-[34px] right-[34px] top-[17px] h-[2px] origin-left rounded-full bg-gradient-to-r from-accent-deep to-accent"
              initial={false}
              animate={{ scaleX: step / (MILESTONES.length - 1) }}
              transition={{ duration: 0.8, ease: EASE }}
            />
            <div className="relative flex justify-between">
              {MILESTONES.map(({ label, Icon }, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <div key={label} className="flex w-9 flex-col items-center">
                    <motion.div
                      initial={false}
                      animate={{ scale: active ? 1.12 : 1 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className={`grid h-9 w-9 place-items-center rounded-full border transition-colors duration-500 ${
                        active
                          ? "border-accent bg-accent/20 text-accent-soft shadow-[0_0_24px_-4px_rgb(var(--accent)/0.7)]"
                          : done
                            ? "border-accent/50 bg-accent/10 text-accent"
                            : "border-white/15 bg-[#0d1322] text-slate-400"
                      }`}
                    >
                      {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </motion.div>
                    <span className={`mt-2 text-[11px] font-medium transition-colors duration-500 ${i <= step ? "text-slate-200" : "text-slate-400"}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current milestone, as it looks in the app */}
          <div className="relative mt-5 min-h-[112px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <MilestoneContent step={step} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Window>

        <Chip show={step === 1} className="-bottom-4 left-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Send className="h-3 w-3" />
          </span>
          Application sent
        </Chip>
        <Chip show={step === 3} className="-bottom-4 left-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
            <Sparkles className="h-3 w-3" />
          </span>
          First offer
        </Chip>
      </Stage>
    </div>
  );
}
