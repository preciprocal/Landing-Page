"use client";

/**
 * components/page/visuals/OptJourneyAd.tsx
 *
 * The hero ad on /for/international-students: a scripted walkthrough in a
 * product frame, where a cursor travels from point to point, clicks, and each
 * stop lights up with a short caption. Four beats, the whole OPT search in
 * about twenty seconds:
 *
 *   1. Know your clock      the unemployment day count (the free calculator)
 *   2. Tailor in one click  resume match for one role, before and after
 *   3. Rehearse the hard one the work authorisation question, out loud
 *   4. Land the interview   the application moves to Interview
 *
 * Everything shown is an illustrative example (the caption says so); the
 * numbers are made up for the story, the companies are fictional. It only
 * plays while on screen, and with reduced motion it shows the final frame
 * without the cursor. Decorative: ProductHero marks it aria-hidden and the
 * page text carries the message.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import { CalendarClock, Check, FileText, KanbanSquare, LayoutDashboard, Mic, Sparkles } from "lucide-react";

type Phase = "move" | "click" | "show";
type Frame = { step: 0 | 1 | 2 | 3 | 4; phase: Phase; ms: number };

/** The script. `move` glides the cursor, `click` presses, `show` holds the result. */
const SCRIPT: Frame[] = [
  { step: 0, phase: "show", ms: 900 },
  { step: 1, phase: "move", ms: 900 },
  { step: 1, phase: "show", ms: 2600 },
  { step: 2, phase: "move", ms: 900 },
  { step: 2, phase: "click", ms: 260 },
  { step: 2, phase: "show", ms: 3400 },
  { step: 3, phase: "move", ms: 900 },
  { step: 3, phase: "click", ms: 260 },
  { step: 3, phase: "show", ms: 3600 },
  { step: 4, phase: "move", ms: 900 },
  { step: 4, phase: "click", ms: 260 },
  { step: 4, phase: "show", ms: 4200 },
];
const FINAL = SCRIPT.length - 1;

const BEATS = [
  { n: 1, label: "Know your clock", caption: "41 of 90 days used. Now you know what you are working with." },
  { n: 2, label: "Tailor in one click", caption: "Matched to this role: 62 to 91, with the keywords the posting asks for." },
  { n: 3, label: "Rehearse the hard question", caption: "Practise the work authorisation answer out loud, before a recruiter asks." },
  { n: 4, label: "Land the interview", caption: "Interview booked, and 49 days still in hand." },
];

/** What the cursor travels to, and what lights up, at each step. */
const CURSOR_TARGET = ["home", "clock", "tailor", "practice", "status"] as const;
const HIGHLIGHT = [null, "clock", "panel", "panel", "row"] as const;
type Key = "home" | "clock" | "tailor" | "practice" | "status" | "panel" | "row";
type Rect = { x: number; y: number; w: number; h: number };

const ROWS = [
  { role: "Data Analyst", company: "Northwind Analytics", match: 62, status: "Applied" },
  { role: "Business Intelligence Analyst", company: "Lumen Health", match: 88, status: "Applied" },
  { role: "Product Analyst", company: "Bluefin Labs", match: 79, status: "Saved" },
  { role: "Analytics Engineer", company: "Cedar Systems", match: 84, status: "Screen" },
];

const KEYWORDS = ["SQL", "A/B testing", "Stakeholder reporting"];

const EASE = [0.22, 1, 0.36, 1] as const;

function useCount(to: number, from: number, run: boolean, duration = 1.4) {
  const [v, setV] = useState(run ? from : to);
  useEffect(() => {
    if (!run) {
      setV(to);
      return;
    }
    const c = animate(from, to, { duration, ease: EASE, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [to, from, run, duration]);
  return v;
}

export default function OptJourneyAd() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-80px" });
  const [i, setI] = useState(0);
  const at = reduce ? FINAL : i;
  const { step, phase } = SCRIPT[at];

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setTimeout(() => setI((n) => (n + 1) % SCRIPT.length), SCRIPT[i].ms);
    return () => clearTimeout(id);
  }, [i, inView, reduce]);

  // Derived scene state.
  const panel: "idle" | "tailor" | "interview" =
    step < 2 || (step === 2 && phase === "move") ? "idle" : step === 2 || (step === 3 && phase === "move") ? "tailor" : "interview";
  const booked = step === 4 && phase === "show";
  const pressed = phase === "click";

  // Element positions, measured relative to the scene.
  const refs = useRef<Partial<Record<Key, HTMLElement | null>>>({});
  const reg = (k: Key) => (el: HTMLElement | null) => {
    refs.current[k] = el;
  };
  const [rects, setRects] = useState<Partial<Record<Key, Rect>>>({});

  const measure = useCallback(() => {
    const root = wrapRef.current?.getBoundingClientRect();
    if (!root) return;
    const next: Partial<Record<Key, Rect>> = {};
    for (const [k, el] of Object.entries(refs.current)) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      next[k as Key] = { x: r.left - root.left, y: r.top - root.top, w: r.width, h: r.height };
    }
    setRects(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    // Panels swap with a short animation; measure again once they settle.
    const id = setTimeout(measure, 380);
    return () => clearTimeout(id);
  }, [at, measure]);

  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const target = rects[CURSOR_TARGET[step]];
  const cursor = target ? { x: target.x + target.w * 0.55, y: target.y + target.h * 0.6 } : { x: 0, y: 0 };
  const hlKey = HIGHLIGHT[step];
  const hl = hlKey && phase !== "move" ? rects[hlKey] : undefined;
  const beat = step > 0 ? BEATS[step - 1] : null;

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <p className="mx-auto mb-4 max-w-3xl text-center text-[15px] italic leading-relaxed text-slate-300">
        <span className="mr-2 not-italic font-semibold text-accent-soft">An illustrative example:</span>
        one OPT search, from counting the days to the interview.
      </p>

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#080c18] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.02),inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
          <div className="flex w-40 shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/75" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/75" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/75" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mx-auto w-fit rounded-md border border-white/[0.06] bg-white/[0.035] px-3 py-1 text-[11.5px] font-medium text-slate-400">
              app.preciprocal.com
            </div>
          </div>
          <div className="flex w-40 shrink-0 justify-end">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={beat ? beat.n : 0}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${
                  booked ? "bg-emerald-400/10 text-emerald-300" : "bg-accent/10 text-accent-soft"
                }`}
              >
                {beat ? `${beat.n} · ${beat.label}` : "Your OPT search"}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* The scene */}
        <div ref={wrapRef} className="relative h-[500px] xl:h-[520px]">
          <div className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:grid-cols-[168px_minmax(0,1fr)_minmax(0,0.82fr)] xl:grid-cols-[188px_minmax(0,1fr)_minmax(0,0.8fr)]">
            {/* Sidebar */}
            <aside className="hidden border-r border-white/[0.05] bg-white/[0.012] p-4 lg:block">
              <div className="mb-6 flex items-center gap-2">
                <span className="h-6 w-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500" />
                <span className="text-[13px] font-bold text-white">Preciprocal</span>
              </div>
              {[
                { Icon: LayoutDashboard, label: "Dashboard", on: true },
                { Icon: FileText, label: "Resume", on: panel === "tailor" },
                { Icon: Mic, label: "Interviews", on: panel === "interview" && !booked },
                { Icon: KanbanSquare, label: "Tracker", on: booked },
                { Icon: CalendarClock, label: "OPT clock", on: step === 1 },
              ].map(({ Icon, label, on }) => (
                <div
                  key={label}
                  className={`mb-1 flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] transition-colors duration-300 ${
                    on ? "bg-white/[0.06] text-white" : "text-slate-500"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
                  {label}
                </div>
              ))}
            </aside>

            {/* Main column */}
            <div className="flex min-w-0 flex-col gap-4 p-5">
              <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-4">
                <Clock regRef={reg("clock")} />
                <Week booked={booked} />
              </div>

              <div className="min-h-0 flex-1 rounded-xl border border-white/[0.07] bg-white/[0.02]">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                  <p className="text-[12.5px] font-semibold text-white">Applications</p>
                  <p className="text-[11px] text-slate-500">4 active</p>
                </div>
                {ROWS.map((r, idx) => {
                  const first = idx === 0;
                  const status = first && booked ? "Interview" : r.status;
                  const match = first && panel !== "idle" ? 91 : r.match;
                  return (
                    <div
                      key={r.company}
                      ref={first ? reg("row") : undefined}
                      className="flex items-center gap-3 border-b border-white/[0.04] px-4 py-3 last:border-b-0"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-[11px] font-bold text-slate-300">
                        {r.company[0]}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12.5px] font-semibold text-white">{r.role}</p>
                        <p className="truncate text-[11px] text-slate-500">{r.company}</p>
                      </div>
                      <span className={`tabular-nums text-[11.5px] font-semibold transition-colors duration-500 ${match >= 85 ? "text-emerald-300" : match >= 75 ? "text-slate-300" : "text-amber-300"}`}>
                        {match}%
                      </span>
                      {first && (
                        <span
                          ref={reg("tailor")}
                          className={`rounded-md border px-2 py-1 text-[10.5px] font-semibold transition-all duration-200 inline-block shrink-0 ${
                            panel === "idle" ? "border-accent/40 bg-accent/10 text-accent-soft" : "border-white/[0.08] text-slate-500"
                          } ${pressed && step === 2 ? "scale-95" : ""}`}
                        >
                          {panel === "idle" ? "Tailor resume" : "Tailored"}
                        </span>
                      )}
                      <span
                        ref={first ? reg("status") : undefined}
                        className={`w-[76px] shrink-0 rounded-full px-2 py-1 text-center text-[10.5px] font-semibold transition-all duration-300 ${
                          status === "Interview"
                            ? "bg-emerald-400/15 text-emerald-300 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.35)]"
                            : status === "Screen"
                              ? "bg-sky-400/10 text-sky-300"
                              : status === "Saved"
                                ? "bg-white/[0.05] text-slate-400"
                                : "bg-indigo-400/10 text-indigo-300"
                        } ${pressed && step === 4 ? "scale-95" : ""}`}
                      >
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Context panel */}
            <div className="min-w-0 border-l border-white/[0.05] p-5">
              <div ref={reg("panel")} className="h-full">
                <AnimatePresence mode="wait" initial={false}>
                  {panel === "idle" && <IdlePanel key="idle" />}
                  {panel === "tailor" && <TailorPanel key="tailor" run={!reduce} regPractice={reg("practice")} pressed={pressed && step === 3} />}
                  {panel === "interview" && <InterviewPanel key="interview" run={!reduce} />}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Highlight ring with its caption */}
          <AnimatePresence>
            {hl && beat && (
              <motion.div
                key="hl"
                className="pointer-events-none absolute z-20 rounded-xl"
                initial={{ opacity: 0, left: hl.x - 6, top: hl.y - 6, width: hl.w + 12, height: hl.h + 12 }}
                animate={{ opacity: 1, left: hl.x - 6, top: hl.y - 6, width: hl.w + 12, height: hl.h + 12 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="absolute inset-0 rounded-xl shadow-[0_0_0_1.5px_rgb(var(--accent)/0.85),0_0_0_6px_rgb(var(--accent)/0.12),0_0_40px_rgb(var(--accent)/0.18)]" />
                {!reduce && <div className="absolute inset-0 animate-ping rounded-xl shadow-[0_0_0_1px_rgb(var(--accent)/0.5)] [animation-duration:2.2s]" />}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cursor */}
          {!reduce && target && (
            <motion.div
              className="pointer-events-none absolute left-0 top-0 z-40"
              initial={false}
              animate={{ x: cursor.x, y: cursor.y }}
              transition={{ duration: 0.85, ease: [0.45, 0, 0.2, 1] }}
            >
              <AnimatePresence>
                {pressed && (
                  <motion.span
                    key={`ripple-${at}`}
                    className="absolute -left-5 -top-5 h-10 w-10 rounded-full border-2 border-accent bg-accent/20"
                    initial={{ scale: 0.3, opacity: 0.9 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
              <motion.svg
                width="22"
                height="24"
                viewBox="0 0 22 24"
                animate={{ scale: pressed ? 0.85 : 1 }}
                transition={{ duration: 0.12 }}
                className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                style={{ originX: 0, originY: 0 }}
              >
                <path d="M2 1.5 L2 19 L6.8 14.6 L9.9 21.8 L13 20.4 L9.9 13.4 L16.4 13.2 Z" fill="white" stroke="#0b1020" strokeWidth="1.4" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
          )}
        </div>
      </div>

      {/* Caption for the current beat, under the frame so it never covers the scene */}
      <div className="mt-4 flex h-[60px] items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {beat && phase === "show" && (
            <motion.div
              key={beat.n}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex max-w-xl items-center gap-3 rounded-2xl border border-white/[0.1] bg-[#0b1020]/90 py-2.5 pl-2.5 pr-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            >
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-[13px] font-bold text-white ${booked ? "bg-emerald-500" : "bg-gradient-to-br from-accent-deep to-accent-deep-2"}`}>
                {booked ? <Check className="h-4 w-4" strokeWidth={3} /> : beat.n}
              </span>
              <p className="text-[13px] leading-snug text-slate-200">{beat.caption}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Beat progress */}
      <ol className="mx-auto mt-1 grid max-w-4xl grid-cols-4 gap-3">
        {BEATS.map((b) => {
          const done = step > b.n || (step === b.n && phase === "show") || reduce;
          const active = step === b.n;
          return (
            <li key={b.n} className="min-w-0">
              <div className="mb-2 h-[3px] overflow-hidden rounded-full bg-white/[0.07]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                  initial={false}
                  animate={{ width: done ? "100%" : active ? "45%" : "0%" }}
                  transition={{ duration: active && !done ? 0.9 : 0.5, ease: EASE }}
                />
              </div>
              <p className={`truncate text-[12px] font-medium transition-colors ${active ? "text-white" : done ? "text-slate-400" : "text-slate-600"}`}>
                <span className="mr-1.5 font-mono text-[11px] text-slate-500">0{b.n}</span>
                {b.label}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ─── Pieces ─────────────────────────────────────────────────────────────────

function Clock({ regRef }: { regRef: (el: HTMLElement | null) => void }) {
  const used = 41;
  const limit = 90;
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div ref={regRef} className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
      <svg width="84" height="84" viewBox="0 0 84 84" className="shrink-0 -rotate-90">
        <circle cx="42" cy="42" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
        <circle cx="42" cy="42" r={r} fill="none" stroke="url(#opt-ad-ring)" strokeWidth="7" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - used / limit)} />
        <defs>
          <linearGradient id="opt-ad-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgb(var(--accent))" />
            <stop offset="1" stopColor="rgb(var(--accent-2))" />
          </linearGradient>
        </defs>
      </svg>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">OPT clock</p>
        <p className="mt-1 text-[26px] font-extrabold leading-none tabular-nums text-white">
          49 <span className="text-[13px] font-semibold text-slate-400">days left</span>
        </p>
        <p className="mt-1.5 text-[11px] text-slate-500">41 of 90 unemployment days used</p>
      </div>
    </div>
  );
}

function Week({ booked }: { booked: boolean }) {
  const stats = [
    { label: "Applied", value: 6 },
    { label: "Replies", value: 2 },
    { label: "Interviews", value: booked ? 1 : 0, live: true },
  ];
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">This week</p>
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={s.value}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className={`text-[22px] font-extrabold tabular-nums leading-none ${s.live && booked ? "text-emerald-300" : "text-white"}`}
              >
                {s.value}
              </motion.p>
            </AnimatePresence>
            <p className="mt-1.5 text-[11px] text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const panelMotion = {
  initial: { opacity: 0, x: 14 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
  transition: { duration: 0.32, ease: EASE },
};

function IdlePanel() {
  return (
    <motion.div {...panelMotion} className="flex h-full flex-col">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Up next</p>
      {["Tailor your resume for Northwind", "Practise the sponsorship question", "Follow up with Lumen Health"].map((t, i) => (
        <div key={t} className="mb-2 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
          <span className="font-mono text-[11px] text-slate-500">0{i + 1}</span>
          <span className="text-[12.5px] text-slate-300">{t}</span>
        </div>
      ))}
    </motion.div>
  );
}

function TailorPanel({ run, regPractice, pressed }: { run: boolean; regPractice: (el: HTMLElement | null) => void; pressed: boolean }) {
  const score = useCount(91, 62, run, 1.6);
  return (
    <motion.div {...panelMotion} className="flex h-full flex-col">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Resume match</p>
      <p className="mb-4 text-[12.5px] text-slate-400">Data Analyst · Northwind Analytics</p>
      <div className="mb-4 flex items-end gap-3">
        <p className={`text-[44px] font-extrabold leading-none tabular-nums ${score >= 85 ? "text-emerald-300" : "text-white"}`}>{score}</p>
        <p className="mb-1.5 text-[12px] text-slate-500">/ 100, was 62</p>
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full rounded-full bg-gradient-to-r from-accent to-emerald-400 transition-[width] duration-300" style={{ width: `${score}%` }} />
      </div>
      <p className="mb-2 text-[11px] font-medium text-slate-500">Added from the posting</p>
      <div className="mb-auto flex flex-wrap gap-1.5">
        {KEYWORDS.map((k, i) => (
          <motion.span
            key={k}
            initial={run ? { opacity: 0, scale: 0.8 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.35, duration: 0.3 }}
            className="inline-flex items-center gap-1 rounded-md border border-emerald-400/25 bg-emerald-400/10 px-2 py-1 text-[11px] font-medium text-emerald-200"
          >
            <Check className="h-3 w-3" strokeWidth={2.6} /> {k}
          </motion.span>
        ))}
      </div>
      <span
        ref={regPractice}
        className={`mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-deep to-accent-deep-2 px-4 py-2.5 text-[12.5px] font-semibold text-white transition-transform duration-150 ${pressed ? "scale-95" : ""}`}
      >
        <Mic className="h-3.5 w-3.5" /> Practise the interview
      </span>
    </motion.div>
  );
}

function InterviewPanel({ run }: { run: boolean }) {
  const score = useCount(86, 0, run, 1.2);
  return (
    <motion.div {...panelMotion} className="flex h-full flex-col">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Mock interview · Recruiter screen</p>
      <div className="mb-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
        <p className="mb-1 text-[10.5px] font-semibold text-accent-soft">Interviewer</p>
        <p className="text-[13px] leading-snug text-white">&ldquo;Will you now or in the future require visa sponsorship?&rdquo;</p>
      </div>
      <div className="mb-4 flex h-10 items-center gap-[3px] rounded-xl border border-white/[0.06] bg-white/[0.015] px-3">
        <Mic className="mr-2 h-3.5 w-3.5 shrink-0 text-rose-300" />
        {Array.from({ length: 34 }, (_, i) => (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-accent/70"
            initial={{ height: 4 }}
            animate={run ? { height: [4, 6 + ((i * 7) % 18), 4] } : { height: 6 + ((i * 7) % 18) }}
            transition={run ? { duration: 0.9, repeat: 2, delay: (i % 8) * 0.05, ease: "easeInOut" } : undefined}
          />
        ))}
      </div>
      <motion.div
        initial={run ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.4, ease: EASE }}
        className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-3.5"
      >
        <div className="mb-2 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-[11.5px] font-semibold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" /> Feedback
          </p>
          <p className="text-[18px] font-extrabold tabular-nums text-white">
            {score}
            <span className="text-[11px] font-semibold text-slate-500">/100</span>
          </p>
        </div>
        <p className="text-[12px] leading-relaxed text-slate-300">
          Clear and calm. You named OPT, your dates and the STEM extension in one breath. Next: lead with the role, then the status.
        </p>
      </motion.div>
    </motion.div>
  );
}
