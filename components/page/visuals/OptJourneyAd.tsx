"use client";

/**
 * components/page/visuals/OptJourneyAd.tsx
 *
 * The hero film on /for/international-students. One OPT search in four
 * beats, shot like a product film rather than a slideshow:
 *
 *   01 Know your clock           the unemployment day count
 *   02 Tailor in one click       resume match for one role, before and after
 *   03 Rehearse the hard one     the sponsorship question, out loud
 *   04 Land the interview        the application moves to Interview
 *
 * Every beat has the same grammar: a calm wide shot, the pointer travels to
 * its target on a gentle curve and clicks, the camera pushes in while the
 * rest of the window falls into shadow, the caption rises over the band at
 * the bottom, then the camera pulls back for the next beat.
 *
 * Mechanics: one clock (requestAnimationFrame) drives the film. The camera,
 * the spotlight, the pointer and its ripple are written straight to the DOM
 * each frame; React only re-renders when the app's state changes (a click)
 * or a caption changes. Targets are measured in canvas units at the start of
 * each beat. It pauses off screen, and with reduced motion it shows the
 * final frame without the pointer or camera moves.
 *
 * Colours are the app's own indigo and purple, no glows. Everything shown is
 * an illustrative example (the caption says so); the companies are made up.
 * Decorative: ProductHero marks it aria-hidden and the page text says it.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import { CalendarClock, Check, FileText, KanbanSquare, LayoutDashboard, Mic, Sparkles } from "lucide-react";

// ─── The film ───────────────────────────────────────────────────────────────

type Key = "clock" | "tailor" | "practice" | "status" | "panel" | "row";

const BEATS: { label: string; caption: string; cursor: Key; click: boolean; focus: Key }[] = [
  { label: "Know your clock", caption: "Know exactly how many days you have.", cursor: "clock", click: false, focus: "clock" },
  { label: "Tailor in one click", caption: "Tailor every resume to the role.", cursor: "tailor", click: true, focus: "panel" },
  { label: "Rehearse the hard question", caption: "Rehearse the sponsorship question out loud.", cursor: "practice", click: true, focus: "panel" },
  { label: "Land the interview", caption: "Land the interview, with days to spare.", cursor: "status", click: true, focus: "row" },
];

/** Milliseconds. Beat-local times are from the start of the beat. */
const INTRO = 1200;
const BEAT = 5600;
const OUTRO = 1600;
const TOTAL = INTRO + BEATS.length * BEAT + OUTRO;
const MOVE_FROM = 150;
const ARRIVE = 1100;
const CLICK = 1180;
const PUSH_AT = 1350;
const PUSH = 1000;
const CAP: [number, number] = [1550, 4850];
const PULL_AT = 4650;
const PULL = 900;

const BAND = 76; // the caption band at the bottom of the picture
const SPOT_FADE = 28;

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = ((ax * t + bx) * t + cx) * t - x;
      if (Math.abs(err) < 1e-5) break;
      const d = (3 * ax * t + 2 * bx) * t + cx;
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    t = Math.min(1, Math.max(0, t));
    return ((ay * t + by) * t + cy) * t;
  };
}
const easeCam = bezier(0.62, 0, 0.18, 1);
const easeOut = bezier(0.22, 1, 0.36, 1);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Which beat plays at film time T, and how far into it (-1 for the intro, BEATS.length for the outro). */
function locate(T: number) {
  if (T < INTRO) return { beat: -1, local: T };
  const u = T - INTRO;
  const beat = Math.floor(u / BEAT);
  if (beat >= BEATS.length) return { beat: BEATS.length, local: u - BEATS.length * BEAT };
  return { beat, local: u - beat * BEAT };
}

/** The app's state at a moment of the film: what has been clicked so far. */
function stateAt(T: number) {
  const { beat, local } = locate(T);
  const done = (b: number) => beat > b || (beat === b && local >= CLICK);
  return { beat, tailored: done(1), interview: done(2), booked: done(3) };
}

type Rect = { x: number; y: number; w: number; h: number };
type Cam = { z: number; x: number; y: number };
const WIDE: Cam = { z: 1, x: 0, y: 0 };

/** Frame a target: scale it to fill most of the picture above the band, centred, never past the edges. */
function frame(r: Rect, W: number, H: number): Cam {
  const safeH = H - BAND;
  const z = Math.max(1, Math.min(1.55, (0.78 * W) / r.w, (0.8 * safeH) / r.h));
  const x = W / 2 - z * (r.x + r.w / 2);
  const y = safeH / 2 - z * (r.y + r.h / 2);
  return { z, x: Math.min(0, Math.max(W - z * W, x)), y: Math.min(0, Math.max(H - z * H, y)) };
}

// ─── Data ───────────────────────────────────────────────────────────────────

const ROWS = [
  { role: "Data Analyst", company: "Northwind Analytics", match: 62, status: "Applied" },
  { role: "Business Intelligence Analyst", company: "Lumen Health", match: 88, status: "Applied" },
  { role: "Product Analyst", company: "Bluefin Labs", match: 79, status: "Saved" },
  { role: "Analytics Engineer", company: "Cedar Systems", match: 84, status: "Screen" },
];
const KEYWORDS = ["SQL", "A/B testing", "Stakeholder reporting"];

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

// ─── Component ──────────────────────────────────────────────────────────────

export default function OptJourneyAd() {
  const reduce = useReducedMotion() ?? false;
  const pictureRef = useRef<HTMLDivElement>(null);
  const camRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);
  const ripRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const inView = useInView(pictureRef, { margin: "-60px" });

  const targets = useRef<Partial<Record<Key, HTMLElement | null>>>({});
  const reg = (k: Key) => (el: HTMLElement | null) => {
    targets.current[k] = el;
  };
  const rects = useRef<Partial<Record<Key, Rect>>>({});
  const measuredBeat = useRef<number | null>(null);

  const T = useRef(0);
  const [app, setApp] = useState(() => stateAt(0));
  const [cap, setCap] = useState<number | null>(null);
  const appKey = useRef("");

  /** Measure targets in canvas units, dividing out whatever zoom the camera has. */
  const measure = () => {
    const cam = camRef.current;
    if (!cam) return;
    const base = cam.getBoundingClientRect();
    const z = base.width / (cam.offsetWidth || 1) || 1;
    for (const [k, el] of Object.entries(targets.current)) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      rects.current[k as Key] = { x: (r.left - base.left) / z, y: (r.top - base.top) / z, w: r.width / z, h: r.height / z };
    }
  };

  useLayoutEffect(() => {
    measure();
  });

  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    if (pictureRef.current) ro.observe(pictureRef.current);
    return () => ro.disconnect();
  }, []);

  /** Draws one frame of the film. */
  const paintRef = useRef<(t: number) => void>(() => {});
  paintRef.current = (t: number) => {
    const pic = pictureRef.current, cam = camRef.current;
    if (!pic || !cam) return;
    const W = pic.offsetWidth, H = pic.offsetHeight;
    const { beat, local } = locate(t);

    // React state, only when it changes.
    const s = stateAt(t);
    const key = `${s.beat}|${s.tailored}|${s.interview}|${s.booked}`;
    if (key !== appKey.current) {
      appKey.current = key;
      setApp(s);
    }
    const showCap = beat >= 0 && beat < BEATS.length && local >= CAP[0] && local < CAP[1] ? beat : null;
    setCap((c) => (c === showCap ? c : showCap));

    // Re-measure early in each beat, while the camera is wide.
    if (beat !== measuredBeat.current && local > 40) {
      measuredBeat.current = beat;
      measure();
    }

    // Camera and focus.
    let view: Cam = WIDE;
    let focus = 0;
    let fr: Rect | undefined;
    if (beat >= 0 && beat < BEATS.length) {
      fr = rects.current[BEATS[beat].focus];
      if (fr) {
        const to = frame(fr, W, H);
        const p = local < PULL_AT ? easeCam(clamp01((local - PUSH_AT) / PUSH)) : 1 - easeCam(clamp01((local - PULL_AT) / PULL));
        view = { z: lerp(1, to.z, p), x: lerp(0, to.x, p), y: lerp(0, to.y, p) };
        focus = p;
      }
    }
    cam.style.transform = `matrix(${view.z.toFixed(5)},0,0,${view.z.toFixed(5)},${view.x.toFixed(2)},${view.y.toFixed(2)})`;
    const toScreen = (x: number, y: number) => ({ x: view.z * x + view.x, y: view.z * y + view.y });

    // Spotlight: four soft bands of shadow around the subject.
    const spot = spotRef.current;
    if (spot) {
      spot.style.opacity = String(focus);
      if (fr && focus > 0.001) {
        const g = 8 * view.z;
        const p0 = toScreen(fr.x, fr.y), p1 = toScreen(fr.x + fr.w, fr.y + fr.h);
        const [top, bottom, left, right] = Array.from(spot.children) as HTMLElement[];
        top.style.transform = `translateY(${p0.y - g - H}px)`;
        bottom.style.transform = `translateY(${p1.y + g}px)`;
        left.style.transform = `translateX(${p0.x - g - W}px)`;
        right.style.transform = `translateX(${p1.x + g}px)`;
      }
    }

    // Pointer: rests on the last target, travels to the next on a gentle curve.
    const cur = curRef.current, rip = ripRef.current;
    if (cur && rip) {
      const entry = { x: W * 0.78, y: H * 0.9 };
      const pt = (b: number) => {
        if (b < 0) return entry;
        const r = rects.current[BEATS[Math.min(b, BEATS.length - 1)].cursor];
        return r ? { x: r.x + r.w * 0.5, y: r.y + r.h * 0.58 } : entry;
      };
      let at = beat >= BEATS.length ? pt(BEATS.length - 1) : pt(beat - 1);
      let show = 1;
      if (beat >= 0 && beat < BEATS.length) {
        const from = pt(beat - 1), to = pt(beat);
        const p = easeCam(clamp01((local - MOVE_FROM) / (ARRIVE - MOVE_FROM)));
        const dx = to.x - from.x, dy = to.y - from.y, d = Math.hypot(dx, dy) || 1;
        const bow = Math.min(60, d * 0.18);
        const cx = (from.x + to.x) / 2 + (dy / d) * bow, cy = (from.y + to.y) / 2 - (dx / d) * bow;
        const q = 1 - p;
        at = { x: q * q * from.x + 2 * q * p * cx + p * p * to.x, y: q * q * from.y + 2 * q * p * cy + p * p * to.y };
      }
      if (beat === -1) show = clamp01((local - 300) / 400);
      if (beat >= BEATS.length) show = 1 - clamp01(local / 500);

      // Press and ripple.
      let press = 0, ripple = -1;
      if (beat >= 0 && beat < BEATS.length && BEATS[beat].click) {
        const u = local - CLICK;
        if (u > -90 && u < 260) press = u < 0 ? 1 + u / 90 : u < 80 ? 1 : 1 - (u - 80) / 180;
        if (u >= 0 && u < 620) ripple = u / 620;
      }
      const sp = toScreen(at.x, at.y);
      const size = (1 + 0.22 * (view.z - 1)) * (1 - 0.14 * press);
      cur.style.opacity = String(show);
      cur.style.transform = `translate(${sp.x.toFixed(2)}px,${sp.y.toFixed(2)}px) scale(${size.toFixed(4)})`;
      if (ripple >= 0) {
        rip.style.opacity = String(0.7 * (1 - ripple) * show);
        rip.style.transform = `translate(${sp.x.toFixed(2)}px,${sp.y.toFixed(2)}px) scale(${(0.25 + 0.95 * easeOut(ripple)).toFixed(4)})`;
      } else rip.style.opacity = "0";
    }

    // Chapter bar.
    barRefs.current.forEach((el, i) => {
      if (!el) return;
      const f = beat > i ? 1 : beat === i ? clamp01(local / BEAT) : 0;
      el.style.transform = `scaleX(${f.toFixed(4)})`;
    });
  };

  // The clock.
  useEffect(() => {
    if (reduce || !inView) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      T.current = (T.current + Math.min(64, now - last)) % TOTAL;
      last = now;
      paintRef.current(T.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, inView]);

  // With reduced motion: the finished picture, no camera moves.
  useEffect(() => {
    if (!reduce) return;
    setApp(stateAt(TOTAL - 1));
    setCap(BEATS.length - 1);
    barRefs.current.forEach((el) => {
      if (el) el.style.transform = "scaleX(1)";
    });
  }, [reduce]);

  const { tailored, interview, booked, beat } = app;
  const panel: "idle" | "tailor" | "interview" = interview ? "interview" : tailored ? "tailor" : "idle";
  const run = !reduce;
  const chip = beat >= 0 && beat < BEATS.length ? BEATS[beat] : null;

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <p className="mx-auto mb-4 max-w-3xl text-center text-[15px] italic leading-relaxed text-slate-300">
        <span className="mr-2 not-italic font-semibold text-indigo-300">An illustrative example:</span>
        one OPT search, from counting the days to the interview.
      </p>

      <div className="relative rounded-[20px] bg-[linear-gradient(180deg,rgb(255_255_255/0.14),rgb(255_255_255/0.05)_18%,rgb(255_255_255/0.04))] p-px shadow-[0_50px_120px_-40px_rgb(0_0_0/0.9)]">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-[14%] -top-px h-px bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.55),rgb(165_180_252/0.7),transparent)]" />
        <div className="overflow-hidden rounded-[19px] bg-[#080c18]">
          {/* Window chrome */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
            <div className="flex w-48 shrink-0 gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mx-auto w-fit rounded-md border border-white/[0.06] bg-white/[0.035] px-3 py-1 text-[11.5px] font-medium text-slate-400">
                app.preciprocal.com
              </div>
            </div>
            <div className="flex w-48 shrink-0 justify-end">
              <span className="whitespace-nowrap rounded-full bg-white/[0.05] px-2.5 py-1 text-[10.5px] font-medium text-slate-300">
                {chip ? chip.label : "Your OPT search"}
              </span>
            </div>
          </div>

          {/* The picture */}
          <div ref={pictureRef} className="relative h-[520px] overflow-hidden xl:h-[560px]">
            <div ref={camRef} className="absolute inset-0 origin-top-left will-change-transform">
              <Canvas reg={reg} panel={panel} booked={booked} run={run} beat={beat} />
            </div>

            {/* Spotlight */}
            <div ref={spotRef} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, transparent, rgb(5 8 16 / 0.8) ${SPOT_FADE}px)` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, rgb(5 8 16 / 0.8) ${SPOT_FADE}px)` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to left, transparent, rgb(5 8 16 / 0.8) ${SPOT_FADE}px)` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, rgb(5 8 16 / 0.8) ${SPOT_FADE}px)` }} />
            </div>

            {/* Ripple and pointer */}
            {!reduce && (
              <>
                <div ref={ripRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-0 w-0 opacity-0">
                  <span className="absolute -left-[18px] -top-[18px] h-9 w-9 rounded-full border-[1.5px] border-indigo-300/80 bg-indigo-400/[0.14]" />
                </div>
                <div ref={curRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-0 w-0 origin-top-left opacity-0">
                  {/* An arrowhead with its tip on the click point. The shadow is offset copies, so no filter. */}
                  <svg width="22" height="22" viewBox="0 0 18 18" className="absolute -left-[3px] -top-[2.2px] overflow-visible">
                    <path d="M2.5 1.8 15 8.6l-5.4 1.3-2.4 5.3z" transform="translate(0.7 1.9)" fill="#000" opacity="0.2" stroke="#000" strokeWidth="2.6" strokeLinejoin="round" />
                    <path d="M2.5 1.8 15 8.6l-5.4 1.3-2.4 5.3z" transform="translate(0.35 0.9)" fill="#000" opacity="0.32" />
                    <path d="M2.5 1.8 15 8.6l-5.4 1.3-2.4 5.3z" fill="#f7f8f8" stroke="#08090a" strokeWidth="1.1" strokeLinejoin="round" />
                  </svg>
                </div>
              </>
            )}

            {/* Caption band */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px] bg-[linear-gradient(to_top,rgb(8_12_24/0.92),rgb(8_12_24/0.55)_55%,transparent)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-6 px-7">
              <AnimatePresence>
                {cap !== null && (
                  <motion.p
                    key={cap}
                    className="flex items-baseline gap-3 text-[22px] font-semibold tracking-[-0.02em] text-white"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }}
                    exit={{ opacity: 0, y: -6, transition: { duration: 0.35, ease: "easeIn" } }}
                  >
                    <span className="font-mono text-[12px] font-medium tracking-[0.08em] text-slate-500">0{cap + 1}</span>
                    {BEATS[cap].caption}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Chapters */}
          <div className="grid grid-cols-4 gap-3 border-t border-white/[0.06] px-5 py-3">
            {BEATS.map((b, i) => (
              <div key={b.label} className="min-w-0">
                <span className="mb-2 block h-[3px] overflow-hidden rounded-full bg-white/[0.07]">
                  <span
                    ref={(el) => {
                      barRefs.current[i] = el;
                    }}
                    className="block h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  />
                </span>
                <p className={`truncate text-[11.5px] font-medium transition-colors duration-300 ${beat === i ? "text-white" : beat > i ? "text-slate-400" : "text-slate-600"}`}>
                  <span className="mr-1.5 font-mono text-[10.5px] text-slate-500">0{i + 1}</span>
                  {b.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── The app, at its fixed layout ───────────────────────────────────────────

function Canvas({
  reg,
  panel,
  booked,
  run,
  beat,
}: {
  reg: (k: Key) => (el: HTMLElement | null) => void;
  panel: "idle" | "tailor" | "interview";
  booked: boolean;
  run: boolean;
  beat: number;
}) {
  return (
    <div className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:grid-cols-[176px_minmax(0,1fr)_minmax(0,0.82fr)]">
      <aside className="hidden border-r border-white/[0.05] bg-white/[0.012] p-4 lg:block">
        <div className="mb-6 flex items-center gap-2">
          <span className="h-6 w-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500" />
          <span className="text-[13px] font-bold text-white">Preciprocal</span>
        </div>
        {[
          { Icon: LayoutDashboard, label: "Dashboard", on: beat <= 0 || beat >= BEATS.length },
          { Icon: FileText, label: "Resume", on: beat === 1 },
          { Icon: Mic, label: "Interviews", on: beat === 2 },
          { Icon: KanbanSquare, label: "Tracker", on: beat === 3 },
          { Icon: CalendarClock, label: "OPT clock", on: false },
        ].map(({ Icon, label, on }) => (
          <div
            key={label}
            className={`mb-1 flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] transition-colors duration-300 ${on ? "bg-white/[0.06] text-white" : "text-slate-500"}`}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
            {label}
          </div>
        ))}
      </aside>

      <div className="flex min-w-0 flex-col gap-4 p-5">
        <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-4">
          <Clock regRef={reg("clock")} />
          <Week booked={booked} />
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
            <p className="text-[12.5px] font-semibold text-white">Applications</p>
            <p className="text-[11px] text-slate-500">4 active</p>
          </div>
          {ROWS.map((r, idx) => {
            const first = idx === 0;
            const status = first && booked ? "Interview" : r.status;
            const match = first && panel !== "idle" ? 91 : r.match;
            return (
              <div key={r.company} ref={first ? reg("row") : undefined} className="flex items-center gap-3 border-b border-white/[0.04] px-4 py-3 last:border-b-0">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-[11px] font-bold text-slate-300">{r.company[0]}</span>
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
                    className={`inline-block shrink-0 rounded-md border px-2 py-1 text-[10.5px] font-semibold transition-colors duration-300 ${
                      panel === "idle" ? "border-indigo-400/40 bg-indigo-500/10 text-indigo-200" : "border-white/[0.08] text-slate-500"
                    }`}
                  >
                    {panel === "idle" ? "Tailor resume" : "Tailored"}
                  </span>
                )}
                <span
                  ref={first ? reg("status") : undefined}
                  className={`w-[76px] shrink-0 rounded-full px-2 py-1 text-center text-[10.5px] font-semibold transition-colors duration-300 ${
                    status === "Interview"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : status === "Screen"
                        ? "bg-purple-400/10 text-purple-300"
                        : status === "Saved"
                          ? "bg-white/[0.05] text-slate-400"
                          : "bg-indigo-400/10 text-indigo-300"
                  }`}
                >
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="min-w-0 border-l border-white/[0.05] p-5">
        <div ref={reg("panel")} className="h-[calc(100%-64px)]">
          <AnimatePresence mode="wait" initial={false}>
            {panel === "idle" && <IdlePanel key="idle" />}
            {panel === "tailor" && <TailorPanel key="tailor" run={run} regPractice={reg("practice")} />}
            {panel === "interview" && <InterviewPanel key="interview" run={run} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

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
            <stop offset="0" stopColor="#6366f1" />
            <stop offset="1" stopColor="#a855f7" />
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

function TailorPanel({ run, regPractice }: { run: boolean; regPractice: (el: HTMLElement | null) => void }) {
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
        <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-[width] duration-300" style={{ width: `${score}%` }} />
      </div>
      <p className="mb-2 text-[11px] font-medium text-slate-500">Added from the posting</p>
      <div className="mb-auto flex flex-wrap gap-1.5">
        {KEYWORDS.map((k, i) => (
          <motion.span
            key={k}
            initial={run ? { opacity: 0, y: 4 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.3, duration: 0.35, ease: EASE }}
            className="inline-flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[11px] font-medium text-slate-200"
          >
            <Check className="h-3 w-3 text-emerald-300" strokeWidth={2.6} /> {k}
          </motion.span>
        ))}
      </div>
      <span
        ref={regPractice}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2.5 text-[12.5px] font-semibold text-white"
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
        <p className="mb-1 text-[10.5px] font-semibold text-indigo-300">Interviewer</p>
        <p className="text-[13px] leading-snug text-white">&ldquo;Will you now or in the future require visa sponsorship?&rdquo;</p>
      </div>
      <div className="mb-4 flex h-10 items-center gap-[3px] rounded-xl border border-white/[0.06] bg-white/[0.015] px-3">
        <Mic className="mr-2 h-3.5 w-3.5 shrink-0 text-slate-400" />
        {Array.from({ length: 34 }, (_, i) => (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-indigo-400/70"
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
        className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5"
      >
        <div className="mb-2 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-200">
            <Sparkles className="h-3.5 w-3.5 text-indigo-300" /> Feedback
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
