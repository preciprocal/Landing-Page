"use client";

/**
 * components/page/visuals/OptJourneyAd.tsx
 *
 * The hero film on /for/international-students: one OPT search played as a
 * single flow through a copy of the real app (the Dashboard repo's sidebar,
 * page headers, cards, status colours and #5b6cff accent). Six chapters:
 *
 *   01 Resume      upload, the fixes pinned to the lines, Auto-fix all
 *   02 Plan        a day-by-day Preparation Planner to the interview date
 *   03 Interview   start, the waiting room, then the live panel
 *   04 Debrief     log the real round in the Interview Journal
 *   05 Follow up   Career Tools, Cold Outreach, an "After Applying" email
 *   06 Tracker     the application moves on to Technical
 *
 * Built on the Sectira hero film's grammar: a timeline of chapters, each with
 * pointer points (travel on a gentle curve, press, ripple), camera shots
 * (push in on a subject while the rest falls into shadow, pull back to the
 * wide shot) and captions over a band at the bottom.
 *
 * Mechanics: one requestAnimationFrame clock. Camera, spotlight, pointer,
 * ripple and chapter bars are written to the DOM each frame; React renders
 * only when the screen, a chapter's stage (clicks so far) or a caption
 * changes. Targets are `reg(key)` elements, measured every frame in canvas
 * units (the camera's zoom divided out). Pauses off screen; with reduced
 * motion it shows the finished tracker and no camera or pointer.
 *
 * Illustrative example (the caption says so); the companies are made up.
 * Decorative: ProductHero marks it aria-hidden.
 */

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  FileText,
  Home,
  Mail,
  Mic,
  NotebookPen,
  Pen,
  PhoneOff,
  Plus,
  Puzzle,
  Send,
  Shield,
  Sparkles,
  Upload,
  Video,
  Volume2,
  Wand2,
  type LucideIcon,
} from "lucide-react";

// ─── The film ───────────────────────────────────────────────────────────────

type Screen = "resume" | "planner" | "interviews" | "debrief" | "career" | "tracker";

/** The pointer arrives at `target` at `at` (beat ms), having travelled `move` ms. The first point of a beat is the sidebar. */
type Point = { at: number; target: string; move?: number; click?: boolean; ax?: number; ay?: number };
/** From `at`, the camera eases over `dur` to frame `target`, or back to the wide shot. */
type Shot = { at: number; dur: number; target: string | null };
type Cap = { from: number; to: number; text: string };
type Beat = { screen: Screen; label: string; ms: number; points: Point[]; shots: Shot[]; caps: Cap[] };

const BEATS: Beat[] = [
  {
    screen: "resume",
    label: "Resume",
    ms: 10400,
    points: [
      { at: 900, target: "nav-resume" },
      { at: 2000, target: "analyze" },
      { at: 6000, target: "autofix" },
    ],
    shots: [
      { at: 3500, dur: 900, target: "paper" },
      { at: 5100, dur: 800, target: null },
      { at: 6500, dur: 900, target: "resumeBody" },
      { at: 9300, dur: 850, target: null },
    ],
    caps: [
      { from: 3700, to: 5200, text: "Upload your resume. Every fix is pinned to its line." },
      { from: 6700, to: 9400, text: "Fix them all in one click." },
    ],
  },
  {
    screen: "planner",
    label: "Plan",
    ms: 6800,
    points: [
      { at: 900, target: "nav-planner" },
      { at: 2000, target: "genPlan" },
    ],
    shots: [
      { at: 2600, dur: 950, target: "planList" },
      { at: 5700, dur: 850, target: null },
    ],
    caps: [{ from: 2800, to: 5800, text: "Get a day-by-day plan to your interview date." }],
  },
  {
    screen: "interviews",
    label: "Interview",
    ms: 10200,
    points: [
      { at: 900, target: "nav-interviews" },
      { at: 2000, target: "startIv" },
      { at: 3300, target: "join" },
      { at: 6300, target: "mic" },
    ],
    shots: [
      { at: 4000, dur: 950, target: "ivFocus" },
      { at: 9100, dur: 850, target: null },
    ],
    caps: [
      { from: 4200, to: 6300, text: "Join a real interview panel." },
      { from: 6600, to: 9200, text: "Answer the sponsorship question out loud." },
    ],
  },
  {
    screen: "debrief",
    label: "Debrief",
    ms: 7200,
    points: [
      { at: 900, target: "nav-debrief" },
      { at: 2100, target: "logIt" },
    ],
    shots: [
      { at: 2800, dur: 950, target: "debriefFocus" },
      { at: 6100, dur: 850, target: null },
    ],
    caps: [{ from: 3000, to: 6200, text: "Debrief the real round and see your pattern." }],
  },
  {
    screen: "career",
    label: "Follow up",
    ms: 7200,
    points: [
      { at: 900, target: "nav-career" },
      { at: 2000, target: "writeFu" },
    ],
    shots: [
      { at: 2700, dur: 950, target: "fuFocus" },
      { at: 6100, dur: 850, target: null },
    ],
    caps: [{ from: 2900, to: 6200, text: "Follow up while they still remember you." }],
  },
  {
    screen: "tracker",
    label: "Job Tracker",
    ms: 7000,
    points: [
      { at: 900, target: "nav-tracker" },
      { at: 2000, target: "status" },
      { at: 2900, target: "optTech" },
    ],
    shots: [
      { at: 3400, dur: 950, target: "trackFocus" },
      { at: 5900, dur: 850, target: null },
    ],
    caps: [{ from: 3600, to: 6000, text: "On to the next round. Every step, tracked." }],
  },
];

const INTRO = 1300;
const OUTRO = 1700;
const STARTS = BEATS.reduce<number[]>((a, b, i) => [...a, i ? a[i - 1] + BEATS[i - 1].ms : INTRO], []);
const TOTAL = STARTS[STARTS.length - 1] + BEATS[BEATS.length - 1].ms + OUTRO;
const MOVE = 800;
const CLICK_AFTER = 70;

/** Every pointer point in film time. */
const POINTS = BEATS.flatMap((b, bi) =>
  b.points.map((p) => ({ ...p, beat: bi, T: STARTS[bi] + p.at, C: p.click === false ? null : STARTS[bi] + p.at + CLICK_AFTER }))
);

const BAND = 76;
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

function locate(T: number) {
  if (T < INTRO) return { beat: -1, local: T };
  let i = BEATS.length - 1;
  while (i > 0 && T < STARTS[i]) i--;
  const local = T - STARTS[i];
  if (local >= BEATS[i].ms) return { beat: BEATS.length, local: local - BEATS[i].ms };
  return { beat: i, local };
}

/** Which screen is up, and how many of its clicks (after the sidebar) have happened. */
function stateAt(T: number) {
  const { beat, local } = locate(T);
  const last = BEATS.length - 1;
  if (beat === -1) return { beat, screen: "tracker" as Screen, stage: 0, fresh: true };
  if (beat >= BEATS.length) return { beat, screen: BEATS[last].screen, stage: BEATS[last].points.length - 1, fresh: false };
  const clicks = BEATS[beat].points.filter((p) => p.click !== false && local >= p.at + CLICK_AFTER).length;
  if (clicks === 0) {
    if (beat === 0) return { beat, screen: "tracker" as Screen, stage: 0, fresh: true };
    return { beat, screen: BEATS[beat - 1].screen, stage: BEATS[beat - 1].points.length - 1, fresh: false };
  }
  return { beat, screen: BEATS[beat].screen, stage: clicks - 1, fresh: false };
}

type Rect = { x: number; y: number; w: number; h: number };
type Cam = { z: number; x: number; y: number };
const WIDE: Cam = { z: 1, x: 0, y: 0 };

function frame(r: Rect, W: number, H: number): Cam {
  const safeH = H - BAND;
  const z = Math.max(1, Math.min(1.5, (0.82 * W) / r.w, (0.84 * safeH) / r.h));
  const x = W / 2 - z * (r.x + r.w / 2);
  const y = safeH / 2 - z * (r.y + r.h / 2);
  return { z, x: Math.min(0, Math.max(W - z * W, x)), y: Math.min(0, Math.max(H - z * H, y)) };
}

function useCount(to: number, from: number, run: boolean, duration = 1.4, delay = 0) {
  const [v, setV] = useState(run ? from : to);
  useEffect(() => {
    if (!run) {
      setV(to);
      return;
    }
    const c = animate(from, to, { duration, delay, ease: EASE, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [to, from, run, duration, delay]);
  return v;
}

/** True `ms` after mounting (or at once without motion). */
function useAfter(ms: number, run: boolean) {
  const [on, setOn] = useState(!run);
  useEffect(() => {
    if (!run) return;
    const id = setTimeout(() => setOn(true), ms);
    return () => clearTimeout(id);
  }, [ms, run]);
  return on;
}

/** Types `text` out after `delay` ms, about `cps` characters a second. */
function useTyped(text: string, run: boolean, delay = 0, cps = 70) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      id = setInterval(() => setN((k) => Math.min(text.length, k + 3)), 3000 / cps);
    }, delay);
    return () => {
      clearTimeout(start);
      if (id) clearInterval(id);
    };
  }, [text, run, delay, cps]);
  return run ? text.slice(0, n) : text;
}

// ─── Component ──────────────────────────────────────────────────────────────

type App = ReturnType<typeof stateAt>;
type Reg = (k: string) => (el: HTMLElement | null) => void;

export default function OptJourneyAd() {
  const reduce = useReducedMotion() ?? false;
  const pictureRef = useRef<HTMLDivElement>(null);
  const camRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);
  const ripRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const inView = useInView(pictureRef, { margin: "-60px" });

  const targets = useRef<Record<string, HTMLElement | null>>({});
  const reg: Reg = (k) => (el) => {
    targets.current[k] = el;
  };
  const rects = useRef<Record<string, Rect>>({});

  const T = useRef(0);
  const [app, setApp] = useState<App>(() => stateAt(0));
  const [cap, setCap] = useState<string | null>(null);
  const appKey = useRef("");

  const measure = () => {
    const cam = camRef.current;
    if (!cam) return;
    const base = cam.getBoundingClientRect();
    const z = base.width / (cam.offsetWidth || 1) || 1;
    for (const [k, el] of Object.entries(targets.current)) {
      if (!el || !el.isConnected) continue;
      const r = el.getBoundingClientRect();
      if (!r.width) continue;
      rects.current[k] = { x: (r.left - base.left) / z, y: (r.top - base.top) / z, w: r.width / z, h: r.height / z };
    }
  };

  useLayoutEffect(() => {
    measure();
  });

  const paintRef = useRef<(t: number) => void>(() => {});
  paintRef.current = (t: number) => {
    const pic = pictureRef.current, cam = camRef.current;
    if (!pic || !cam) return;
    const W = pic.offsetWidth, H = pic.offsetHeight;
    measure();
    const { beat, local } = locate(t);
    const inBeat = beat >= 0 && beat < BEATS.length;

    const s = stateAt(t);
    const key = `${s.beat}|${s.screen}|${s.stage}|${s.fresh}`;
    if (key !== appKey.current) {
      appKey.current = key;
      setApp(s);
    }
    let capKey: string | null = null;
    if (inBeat) {
      const i = BEATS[beat].caps.findIndex((c) => local >= c.from && local < c.to);
      if (i >= 0) capKey = `${beat}:${i}`;
    }
    setCap((c) => (c === capKey ? c : capKey));

    cam.style.opacity = String(beat === -1 ? clamp01(local / 450) : beat >= BEATS.length ? 1 - clamp01((local - OUTRO + 550) / 550) : 1);

    // Camera: each shot eases from wherever the last one left it.
    let view: Cam = WIDE, focus = 0;
    let fr: Rect | undefined;
    if (inBeat) {
      for (const sh of BEATS[beat].shots) {
        if (local < sh.at) break;
        const p = easeCam(clamp01((local - sh.at) / sh.dur));
        const r = sh.target ? rects.current[sh.target] : undefined;
        const to = r ? frame(r, W, H) : WIDE;
        view = { z: lerp(view.z, to.z, p), x: lerp(view.x, to.x, p), y: lerp(view.y, to.y, p) };
        focus = lerp(focus, r ? 1 : 0, p);
        if (r) fr = r;
      }
    }
    cam.style.transform = `matrix(${view.z.toFixed(5)},0,0,${view.z.toFixed(5)},${view.x.toFixed(2)},${view.y.toFixed(2)})`;
    const toScreen = (x: number, y: number) => ({ x: view.z * x + view.x, y: view.z * y + view.y });

    const spot = spotRef.current;
    if (spot) {
      spot.style.opacity = String(fr ? focus : 0);
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

    // Pointer.
    const cur = curRef.current, rip = ripRef.current;
    if (cur && rip) {
      const entry = { x: W * 0.72, y: H * 0.86 };
      const posOf = (i: number) => {
        if (i < 0) return entry;
        const pt = POINTS[i], r = rects.current[pt.target];
        return r ? { x: r.x + r.w * (pt.ax ?? (pt.target.startsWith("nav-") ? 0.3 : 0.5)), y: r.y + r.h * (pt.ay ?? 0.58) } : entry;
      };
      let i = POINTS.length - 1;
      while (i >= 0 && POINTS[i].T > t) i--;
      let pos = posOf(i);
      const next = POINTS[i + 1];
      if (next) {
        const move = next.move ?? MOVE;
        const p = easeCam(clamp01((t - (next.T - move)) / move));
        if (p > 0) {
          const a = posOf(i), b = posOf(i + 1);
          const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
          const bow = Math.min(60, d * 0.18);
          const cx = (a.x + b.x) / 2 + (dy / d) * bow, cy = (a.y + b.y) / 2 - (dx / d) * bow;
          const q = 1 - p;
          pos = { x: q * q * a.x + 2 * q * p * cx + p * p * b.x, y: q * q * a.y + 2 * q * p * cy + p * p * b.y };
        }
      }
      let show = 1;
      if (beat === -1) show = clamp01((local - 500) / 400);
      if (beat >= BEATS.length) show = 1 - clamp01(local / 500);

      let press = 0, ripple = -1, rp = pos;
      for (let j = 0; j < POINTS.length; j++) {
        const c = POINTS[j].C;
        if (c === null) continue;
        const u = t - c;
        if (u > -90 && u < 260) press = Math.max(press, u < 0 ? 1 + u / 90 : u < 80 ? 1 : 1 - (u - 80) / 180);
        if (u >= 0 && u < 620) {
          ripple = u / 620;
          rp = posOf(j);
        }
      }
      const sp = toScreen(pos.x, pos.y);
      const size = (1 + 0.22 * (view.z - 1)) * (1 - 0.14 * press);
      cur.style.opacity = String(show);
      cur.style.transform = `translate(${sp.x.toFixed(2)}px,${sp.y.toFixed(2)}px) scale(${size.toFixed(4)})`;
      if (ripple >= 0) {
        const q = toScreen(rp.x, rp.y);
        rip.style.opacity = String(0.7 * (1 - ripple) * show);
        rip.style.transform = `translate(${q.x.toFixed(2)}px,${q.y.toFixed(2)}px) scale(${(0.25 + 0.95 * easeOut(ripple)).toFixed(4)})`;
      } else rip.style.opacity = "0";
    }

    barRefs.current.forEach((el, k) => {
      if (!el) return;
      const f = beat > k ? 1 : beat === k ? clamp01(local / BEATS[k].ms) : 0;
      el.style.transform = `scaleX(${f.toFixed(4)})`;
    });
  };

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

  useEffect(() => {
    if (!reduce) return;
    setApp(stateAt(TOTAL - 1));
    setCap(`${BEATS.length - 1}:0`);
    barRefs.current.forEach((el) => {
      if (el) el.style.transform = "scaleX(1)";
    });
  }, [reduce]);

  const run = !reduce;
  const chip = app.beat >= 0 && app.beat < BEATS.length ? BEATS[app.beat] : null;
  const [capBeat, capIdx] = cap ? cap.split(":").map(Number) : [0, 0];
  const capText = cap ? BEATS[capBeat].caps[capIdx]?.text : null;

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <p className="mx-auto mb-4 max-w-3xl text-center text-[15px] italic leading-relaxed text-slate-300">
        <span className="mr-2 not-italic font-semibold text-indigo-300">An illustrative example:</span>
        one OPT search in Preciprocal, from the resume to the next round.
      </p>

      <div className="relative rounded-[20px] bg-[linear-gradient(180deg,rgb(255_255_255/0.14),rgb(255_255_255/0.05)_18%,rgb(255_255_255/0.04))] p-px shadow-[0_50px_120px_-40px_rgb(0_0_0/0.9)]">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-[14%] -top-px h-px bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.55),rgb(165_180_252/0.7),transparent)]" />
        <div className="overflow-hidden rounded-[19px] bg-[#0c0e14]">
          <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
            <div className="flex w-48 shrink-0 gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mx-auto w-fit max-w-full truncate rounded-md border border-white/[0.06] bg-white/[0.035] px-3 py-1 text-[11.5px] font-medium text-slate-400">
                app.preciprocal.com{PATHS[app.screen]}
              </div>
            </div>
            <div className="flex w-48 shrink-0 justify-end">
              <span className="whitespace-nowrap rounded-full bg-white/[0.05] px-2.5 py-1 text-[10.5px] font-medium text-slate-300">
                {chip ? `0${app.beat + 1} · ${chip.label}` : "Your OPT search"}
              </span>
            </div>
          </div>

          <div ref={pictureRef} className="relative h-[560px] overflow-hidden xl:h-[600px]">
            <div ref={camRef} className="absolute inset-0 origin-top-left will-change-transform">
              <AppCanvas reg={reg} app={app} run={run} />
            </div>

            <div ref={spotRef} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, transparent, rgb(8 9 13 / 0.82) ${SPOT_FADE}px)` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, rgb(8 9 13 / 0.82) ${SPOT_FADE}px)` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to left, transparent, rgb(8 9 13 / 0.82) ${SPOT_FADE}px)` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, rgb(8 9 13 / 0.82) ${SPOT_FADE}px)` }} />
            </div>

            {!reduce && (
              <>
                <div ref={ripRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-0 w-0 opacity-0">
                  <span className="absolute -left-[18px] -top-[18px] h-9 w-9 rounded-full border-[1.5px] border-[#8f9bff]/80 bg-[#5b6cff]/[0.14]" />
                </div>
                <div ref={curRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-0 w-0 origin-top-left opacity-0">
                  <svg width="22" height="22" viewBox="0 0 18 18" className="absolute -left-[3px] -top-[2.2px] overflow-visible">
                    <path d="M2.5 1.8 15 8.6l-5.4 1.3-2.4 5.3z" transform="translate(0.7 1.9)" fill="#000" opacity="0.2" stroke="#000" strokeWidth="2.6" strokeLinejoin="round" />
                    <path d="M2.5 1.8 15 8.6l-5.4 1.3-2.4 5.3z" transform="translate(0.35 0.9)" fill="#000" opacity="0.32" />
                    <path d="M2.5 1.8 15 8.6l-5.4 1.3-2.4 5.3z" fill="#f7f8f8" stroke="#08090a" strokeWidth="1.1" strokeLinejoin="round" />
                  </svg>
                </div>
              </>
            )}

            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px] bg-[linear-gradient(to_top,rgb(12_14_20/0.94),rgb(12_14_20/0.55)_55%,transparent)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-6 px-7">
              <AnimatePresence>
                {cap !== null && capText && (
                  <motion.p
                    key={cap}
                    className="flex items-baseline gap-3 text-[22px] font-semibold tracking-[-0.02em] text-white"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }}
                    exit={{ opacity: 0, y: -6, transition: { duration: 0.3, ease: "easeIn" } }}
                  >
                    <span className="font-mono text-[12px] font-medium tracking-[0.08em] text-slate-500">0{capBeat + 1}</span>
                    {capText}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 border-t border-white/[0.06] px-5 py-3">
            {BEATS.map((b, i) => (
              <div key={b.label} className="min-w-0">
                <span className="mb-2 block h-[3px] overflow-hidden rounded-full bg-white/[0.07]">
                  <span
                    ref={(el) => {
                      barRefs.current[i] = el;
                    }}
                    className="block h-full origin-left scale-x-0 rounded-full bg-[#5b6cff]"
                  />
                </span>
                <p className={`truncate text-[11.5px] font-medium transition-colors duration-300 ${app.beat === i ? "text-white" : app.beat > i ? "text-slate-400" : "text-slate-600"}`}>
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

// ─── The app (Dashboard repo look) ──────────────────────────────────────────

const PATHS: Record<Screen, string> = {
  resume: "/resume",
  planner: "/planner",
  interviews: "/interview",
  debrief: "/debrief",
  career: "/career-tools",
  tracker: "/job-tracker",
};

const NAV: { id: string; label: string; Icon: LucideIcon; screen?: Screen }[] = [
  { id: "overview", label: "Overview", Icon: Home },
  { id: "resume", label: "Resume", Icon: FileText, screen: "resume" },
  { id: "cover-letter", label: "Cover Letter", Icon: Pen },
  { id: "interviews", label: "Interviews", Icon: Video, screen: "interviews" },
  { id: "planner", label: "Planner", Icon: Calendar, screen: "planner" },
  { id: "debrief", label: "Interview Journal", Icon: NotebookPen, screen: "debrief" },
  { id: "career", label: "Career Tools", Icon: Sparkles, screen: "career" },
  { id: "tracker", label: "Job Tracker", Icon: Briefcase, screen: "tracker" },
  { id: "extension", label: "Extension", Icon: Puzzle },
];

const CARD = "rounded-2xl border border-white/[0.08] bg-[#13161e]";
const BTN_PRIMARY = "inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[#5b6cff] px-3.5 text-[12px] font-semibold text-white";
const BTN_PILL = "inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 text-[12px] font-medium text-slate-300";
const FIELD = "rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[11.5px] text-slate-200";
const LABEL = "mb-1 block text-[10px] font-medium text-slate-400";

/** Sub-screens that are separate pages fade between each other; within a page, content changes in place. */
function pageKey(app: App) {
  if (app.screen === "interviews") return `iv-${Math.min(app.stage, 2)}`;
  if (app.screen === "resume") return `rs-${Math.min(app.stage, 1)}`;
  return app.screen;
}

function AppCanvas({ reg, app, run }: { reg: Reg; app: App; run: boolean }) {
  return (
    <div className="flex h-full">
      <aside className="hidden w-[208px] shrink-0 flex-col border-r border-white/[0.07] bg-[#0f1218] lg:flex">
        <div className="px-4 pb-3 pt-4">
          <div className="flex items-center gap-2.5">
            <span className="h-[26px] w-[26px] rounded-[8px] bg-[#5b6cff]" />
            <span className="text-[15px] font-bold tracking-tight text-white">Preciprocal</span>
          </div>
          <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.025] px-2.5 py-2">
            <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#191d27] text-[10px] font-bold text-slate-200">
              AP
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-[#0f1218] bg-emerald-500" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-white">Arjun Patel</p>
              <p className="truncate text-[10px] text-slate-500">arjun@example.com</p>
            </div>
          </div>
        </div>
        <nav className="space-y-0.5 px-3">
          <p className="px-3 pb-1.5 pt-2 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-slate-600">Menu</p>
          {NAV.map(({ id, label, Icon, screen }) => {
            const active = screen === app.screen;
            return (
              <div
                key={id}
                ref={screen ? reg(`nav-${screen}`) : undefined}
                className={`relative flex items-center justify-between rounded-lg px-3 py-[7px] transition-colors duration-200 ${active ? "bg-white/[0.06] text-white" : "text-slate-400"}`}
              >
                {active && <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-[#5b6cff]" />}
                <span className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${active ? "text-white" : "text-slate-500"}`} strokeWidth={1.75} />
                  <span className="text-[12px] font-medium">{label}</span>
                </span>
                {id === "extension" && (
                  <span className="rounded-md border border-indigo-400/20 bg-indigo-500/10 px-1.5 py-0.5 text-[8.5px] font-semibold uppercase leading-none tracking-wider text-indigo-300">New</span>
                )}
              </div>
            );
          })}
          <p className="px-3 pb-1.5 pt-4 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-slate-600">Resources</p>
          <div className="flex items-center gap-2.5 rounded-lg px-3 py-[7px] text-slate-400">
            <BookOpen className="h-4 w-4 text-slate-500" strokeWidth={1.75} />
            <span className="text-[12px] font-medium">Templates</span>
          </div>
        </nav>
      </aside>

      <main className="relative min-w-0 flex-1 bg-[#0c0e14]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pageKey(app)}
            className="absolute inset-0 p-5 pb-[64px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.14, ease: "easeIn" } }}
          >
            {app.screen === "resume" && <ResumeScreen reg={reg} stage={app.stage} run={run} />}
            {app.screen === "planner" && <PlannerScreen reg={reg} stage={app.stage} run={run} />}
            {app.screen === "interviews" && <InterviewScreen reg={reg} stage={app.stage} run={run} />}
            {app.screen === "debrief" && <DebriefScreen reg={reg} stage={app.stage} run={run} />}
            {app.screen === "career" && <CareerScreen reg={reg} stage={app.stage} run={run} />}
            {app.screen === "tracker" && <TrackerScreen reg={reg} stage={app.fresh ? -1 : app.stage} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function Crumbs({ trail }: { trail: string[] }) {
  return (
    <div className="flex items-center gap-1 text-[11px]">
      <Home className="h-3 w-3 text-slate-400" />
      <span className="text-slate-400">Home</span>
      {trail.map((t, i) => (
        <span key={t} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className={i === trail.length - 1 ? "font-medium text-white" : "text-slate-400"}>{t}</span>
        </span>
      ))}
    </div>
  );
}

function PageHeader({ section, title, description, Icon, actions }: { section: string; title: string; description: string; Icon: LucideIcon; actions?: ReactNode }) {
  return (
    <header className={`${CARD} overflow-hidden`}>
      <div className="border-b border-white/[0.06] bg-white/[0.015] px-5 py-2">
        <Crumbs trail={[section]} />
      </div>
      <div className="flex items-center gap-4 px-5 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-[#5b6cff]/40 bg-[#5b6cff]/[0.12] text-indigo-200">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[16px] font-semibold leading-tight tracking-tight text-white">{title}</p>
            <p className="mt-0.5 truncate text-[11px] text-slate-400">{description}</p>
          </div>
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}

function Stat({ label, value, tone, sub }: { label: string; value: ReactNode; tone: string; sub?: string }) {
  return (
    <div className={`${CARD} px-4 py-2.5`}>
      <p className="text-[10.5px] font-medium text-slate-500">{label}</p>
      <p className={`mt-0.5 text-[19px] font-bold tabular-nums leading-tight ${tone}`}>{value}</p>
      {sub && <p className="text-[10px] text-slate-600">{sub}</p>}
    </div>
  );
}

// ─── 01 Resume: upload, fixes pinned to the lines, Auto-fix all ─────────────

const FIXES = [
  {
    n: 1,
    title: "Add a professional summary",
    p: "Critical",
    before: "Missing: no summary yet",
    after: "Data-focused engineer with 4+ years building pipelines at Datadog and Wayfair. Turns 2M+ events/sec into decisions with SQL, Python and A/B testing.",
  },
  {
    n: 2,
    title: "Lead with impact, not the task",
    p: "Critical",
    before: "• Built automated testing suite covering 85% of codebase",
    after: "• Cut production regressions 30% with a test suite covering 85% of the codebase",
  },
  {
    n: 3,
    title: "Add the posting's keywords",
    p: "High",
    before: "Data & Cloud: AWS, Snowflake, Kafka, PostgreSQL",
    after: "Data & Analytics: SQL, A/B testing, Tableau, Snowflake, Kafka, AWS",
  },
];

function Pin({ n, fixed }: { n: number; fixed: boolean }) {
  return (
    <motion.span
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: (n - 1) * 0.25, ease: EASE }}
      className={`absolute -left-[18px] top-0 grid h-4 w-4 place-items-center rounded-full text-[8px] font-bold text-white ${fixed ? "bg-emerald-500" : "bg-amber-500"}`}
    >
      {fixed ? <Check className="h-2.5 w-2.5" strokeWidth={3.5} /> : n}
    </motion.span>
  );
}

function Line({ n, fixed, ready, before, after, muted = false }: { n: number; fixed: boolean; ready: boolean; before: string; after: string; muted?: boolean }) {
  return (
    <div className="relative">
      {ready && <Pin n={n} fixed={fixed} />}
      <p className={`rounded px-1 transition-colors duration-500 ${fixed ? "bg-emerald-100 text-emerald-800" : ready ? "bg-amber-100" : ""} ${muted && !fixed ? "italic text-gray-400" : ""}`}>
        {fixed ? after : before}
      </p>
    </div>
  );
}

function ResumeScreen({ reg, stage, run }: { reg: Reg; stage: number; run: boolean }) {
  if (stage <= 0) {
    return (
      <div className="flex h-full flex-col gap-3">
        <PageHeader section="Resume" title="Resume Analysis" description="AI feedback on every resume you upload" Icon={FileText} actions={<span className={BTN_PRIMARY}><Upload className="h-3.5 w-3.5" /> Upload Resume</span>} />
        <div className={`${CARD} flex flex-1 flex-col items-center justify-center p-6`}>
          <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-dashed border-[#5b6cff]/40 bg-[#5b6cff]/[0.04] px-6 py-6 text-center">
            <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl border border-[#5b6cff]/40 bg-[#5b6cff]/[0.12] text-indigo-200">
              <Upload className="h-5 w-5" />
            </span>
            <p className="text-[13px] font-semibold text-white">Drop your resume here</p>
            <p className="mt-1 text-[11px] text-slate-500">PDF or DOCX, up to 5 MB</p>
            <div className="mt-4 flex w-full items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#13161e] px-3 py-2.5 text-left">
              <FileText className="h-4 w-4 shrink-0 text-indigo-300" />
              <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium text-slate-200">Arjun_Patel_Resume_2026.pdf</span>
              <span className="text-[10px] text-slate-500">212 KB</span>
            </div>
            <div className="mt-2 w-full text-left">
              <span className={LABEL}>Target role</span>
              <div className={FIELD}>Data Analyst · Northwind Analytics</div>
            </div>
            <span ref={reg("analyze")} className={`${BTN_PRIMARY} mt-4 w-full`}>
              <Sparkles className="h-3.5 w-3.5" /> Analyze resume
            </span>
          </div>
        </div>
      </div>
    );
  }
  return <ResumeAnalysis reg={reg} fixed={stage >= 2} run={run} />;
}

function ResumeAnalysis({ reg, fixed, run }: { reg: Reg; fixed: boolean; run: boolean }) {
  const ready = useAfter(1300, run);
  const score = useCount(fixed ? 88 : 62, 62, run && fixed, 1.4, 0.3);
  return (
    <div className="flex h-full flex-col gap-3">
      <Crumbs trail={["Resume", "Arjun_Patel_Resume_2026.pdf"]} />
      <div ref={reg("resumeBody")} className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-3">
        <div ref={reg("paper")} className="flex min-h-0 flex-col rounded-xl border border-white/[0.06] bg-white/[0.03] p-2">
          <div className="min-h-0 flex-1 overflow-hidden rounded-lg bg-white py-3.5 pl-7 pr-4 text-left text-[8px] leading-[1.5] text-gray-700">
            <p className="text-center text-[12px] font-bold uppercase tracking-wider text-gray-900">Arjun Patel</p>
            <p className="mt-0.5 text-center text-[7px] text-gray-500">
              <span className="text-blue-600">arjun.patel@email.com</span> | +1 (617) 234-5678 | Boston, MA | <span className="text-blue-600">LinkedIn</span>
            </p>
            <p className="mb-1 mt-2 border-b border-gray-300 pb-0.5 text-[8.5px] font-bold uppercase text-gray-900">Professional Summary</p>
            <div className="text-[7.5px]">
              <Line n={1} fixed={fixed} ready={ready} before={FIXES[0].before} after={FIXES[0].after} muted />
            </div>
            <p className="mb-1 mt-2 border-b border-gray-300 pb-0.5 text-[8.5px] font-bold uppercase text-gray-900">Professional Experience</p>
            <div className="flex justify-between"><span className="font-semibold text-gray-800">Datadog, Software Engineer Co-op</span><span className="text-[7px] text-gray-500">Jan 2025 - Aug 2025</span></div>
            <div className="mt-0.5 space-y-0.5 text-[7.5px] text-gray-600">
              <p className="px-1">• Built real-time data pipeline processing 2M+ events/sec using Kafka and Spark, reducing alert latency by 40%</p>
              <Line n={2} fixed={fixed} ready={ready} before={FIXES[1].before} after={FIXES[1].after} />
            </div>
            <div className="mt-1.5 flex justify-between"><span className="font-semibold text-gray-800">Wayfair, Data Engineering Intern</span><span className="text-[7px] text-gray-500">May 2024 - Aug 2024</span></div>
            <div className="mt-0.5 space-y-0.5 px-1 text-[7.5px] text-gray-600">
              <p>• Developed an automated ETL pipeline with Airflow and Spark, processing 500GB+ of daily data</p>
              <p>• Built a segmentation model over 8M+ profiles, driving a 22% lift in targeted recommendations</p>
            </div>
            <p className="mb-1 mt-2 border-b border-gray-300 pb-0.5 text-[8.5px] font-bold uppercase text-gray-900">Education</p>
            <div className="flex justify-between"><span className="font-semibold text-gray-800">Boston University</span><span className="text-[7px] text-gray-500">May 2026</span></div>
            <p className="text-[7.5px] italic text-gray-600">MS in Computer Science</p>
            <p className="mb-1 mt-2 border-b border-gray-300 pb-0.5 text-[8.5px] font-bold uppercase text-gray-900">Technical Skills</p>
            <p className="px-1 text-[7.5px] text-gray-600"><span className="font-semibold text-gray-800">Languages:</span> Python, Java, Go, TypeScript</p>
            <div className="text-[7.5px] text-gray-600">
              <Line n={3} fixed={fixed} ready={ready} before={FIXES[2].before} after={FIXES[2].after} />
            </div>
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <p className="text-[12px] font-bold text-white">Arjun_Patel_Resume_2026.pdf</p>
            <span className="flex items-center gap-1 rounded border border-white/[0.06] bg-white/[0.04] px-1.5 py-0.5 text-[9px] text-slate-400"><Briefcase className="h-2.5 w-2.5" /> Data Analyst</span>
            {ready && (
              <span className={`rounded border px-1.5 py-0.5 text-[9px] tabular-nums ${score >= 80 ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-amber-500/20 bg-amber-500/10 text-amber-400"}`}>{score}/100</span>
            )}
          </div>
          <div className="mb-2.5 grid grid-cols-5 gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1 text-center text-[9.5px]">
            {["Analysis", "Benchmark", "Recruiter", "Intel", "Writer"].map((t) => (
              <span key={t} className={`rounded-md py-1 ${t === "Writer" ? "bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white" : "text-slate-500"}`}>{t}</span>
            ))}
          </div>

          {!ready ? (
            <div className={`${CARD} flex flex-1 flex-col items-center justify-center gap-3 p-6`}>
              <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-[#5b6cff]" />
              <p className="text-[12px] font-semibold text-white">Analyzing your resume</p>
              <p className="text-[10.5px] text-slate-500">Reading it the way an ATS and a recruiter would</p>
              <div className="h-1 w-40 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div className="h-full rounded-full bg-[#5b6cff]" initial={{ width: "5%" }} animate={{ width: "95%" }} transition={{ duration: 1.2, ease: "easeInOut" }} />
              </div>
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="mb-2 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600"><Sparkles className="h-3.5 w-3.5 text-white" /></span>
                  <div>
                    <p className="text-[11px] font-semibold text-white">Resume Writer</p>
                    <p className="text-[9px] text-slate-400">{fixed ? "3 fixes applied" : "3 fixes found, pinned on your resume"}</p>
                  </div>
                </div>
                <span ref={reg("autofix")} className={fixed ? `${BTN_PILL} h-8` : `${BTN_PRIMARY} h-8 bg-gradient-to-r from-violet-600 to-indigo-600`}>
                  {fixed ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Wand2 className="h-3.5 w-3.5" />}
                  {fixed ? "All fixes applied" : "Auto-fix all"}
                </span>
              </div>
              <div className="min-h-0 flex-1 space-y-2 overflow-hidden">
                {FIXES.map((f, i) => (
                  <motion.div
                    key={f.n}
                    initial={run ? { opacity: 0, y: 6 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.25, duration: 0.35, ease: EASE }}
                    className={`rounded-xl border px-3 py-2.5 transition-colors duration-500 ${fixed ? "border-emerald-500/20 bg-emerald-500/[0.05]" : "border-white/[0.07] bg-white/[0.025]"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[9px] font-bold text-white ${fixed ? "bg-emerald-500" : "bg-amber-500"}`}>
                        {fixed ? <Check className="h-3 w-3" strokeWidth={3} /> : f.n}
                      </span>
                      <p className="min-w-0 flex-1 truncate text-[11px] font-semibold text-white">{f.title}</p>
                      <span className={`rounded px-1.5 py-0.5 text-[8px] font-semibold ${fixed ? "bg-emerald-500/15 text-emerald-300" : f.p === "Critical" ? "bg-red-500/15 text-red-300" : "bg-amber-500/15 text-amber-300"}`}>
                        {fixed ? "Applied" : f.p}
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 pl-7 text-[9.5px] leading-relaxed text-slate-400">{f.after.replace("• ", "")}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 02 Plan ────────────────────────────────────────────────────────────────

const DAYS = [
  { d: "Day 1", date: "Thu, Nov 13", topic: "SQL: joins, window functions, CTEs", type: "Technical", mins: 60 },
  { d: "Day 2", date: "Fri, Nov 14", topic: "A/B testing: design and reading results", type: "Technical", mins: 60 },
  { d: "Day 3", date: "Sat, Nov 15", topic: "Northwind: product, metrics, recent news", type: "Research", mins: 45 },
  { d: "Day 4", date: "Sun, Nov 16", topic: "Behavioral: three STAR stories", type: "Behavioral", mins: 45 },
  { d: "Day 5", date: "Mon, Nov 17", topic: "Your sponsorship answer, out loud", type: "Behavioral", mins: 30 },
  { d: "Day 6", date: "Tue, Nov 18", topic: "Full mock interview with the panel", type: "Mock", mins: 40 },
];
const TYPE_TONE: Record<string, string> = {
  Technical: "border-indigo-500/20 bg-indigo-500/10 text-indigo-300",
  Research: "border-sky-500/20 bg-sky-500/10 text-sky-300",
  Behavioral: "border-violet-500/20 bg-violet-500/10 text-violet-300",
  Mock: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
};

function PlannerScreen({ reg, stage, run }: { reg: Reg; stage: number; run: boolean }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <PageHeader section="Planner" title="Preparation Planner" description="Day-by-day study plans for your interviews" Icon={Calendar} actions={<span className={BTN_PRIMARY}><Plus className="h-3.5 w-3.5" /> New Plan</span>} />
      {stage <= 0 ? (
        <div className={`${CARD} p-5`}>
          <p className="mb-3 text-[12.5px] font-semibold text-white">Create a study plan</p>
          <div className="grid grid-cols-2 gap-3">
            <div><span className={LABEL}>Interview</span><div className={FIELD}>Data Analyst · Northwind Analytics</div></div>
            <div><span className={LABEL}>Interview date</span><div className={`${FIELD} flex items-center justify-between`}>Wed, Nov 19, 2026 <Calendar className="h-3.5 w-3.5 text-slate-500" /></div></div>
            <div><span className={LABEL}>Time per day</span><div className={FIELD}>1 hour</div></div>
            <div>
              <span className={LABEL}>Focus</span>
              <div className="flex flex-wrap gap-1.5">
                {["SQL", "A/B testing", "Behavioral"].map((c) => (
                  <span key={c} className="rounded-md border border-[#5b6cff]/40 bg-[#5b6cff]/10 px-2 py-1.5 text-[10.5px] font-medium text-indigo-200">{c}</span>
                ))}
              </div>
            </div>
          </div>
          <span ref={reg("genPlan")} className={`${BTN_PRIMARY} mt-4`}><Sparkles className="h-3.5 w-3.5" /> Generate plan</span>
        </div>
      ) : (
        <div ref={reg("planList")} className={`${CARD} flex min-h-0 flex-1 flex-col p-4`}>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[12.5px] font-semibold text-white">6-day plan · Northwind recruiter screen</p>
              <p className="text-[10.5px] text-slate-500">Interview on Wed, Nov 19 · about 5 hours in total</p>
            </div>
            <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-300">Plan ready</span>
          </div>
          <div className="space-y-1.5">
            {DAYS.map((d, i) => (
              <motion.div
                key={d.d}
                initial={run ? { opacity: 0, x: -8 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.16, duration: 0.35, ease: EASE }}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2"
              >
                <span className="w-12 shrink-0 text-[10.5px] font-semibold text-white">{d.d}</span>
                <span className="w-[78px] shrink-0 text-[10px] text-slate-500">{d.date}</span>
                <span className="min-w-0 flex-1 truncate text-[11.5px] text-slate-200">{d.topic}</span>
                <span className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[9px] font-semibold ${TYPE_TONE[d.type]}`}>{d.type}</span>
                <span className="w-10 shrink-0 text-right text-[10px] tabular-nums text-slate-500">{d.mins}m</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 03 Interview: start, waiting room, the live panel ─────────────────────

const PANEL = [
  { id: "hr", name: "Rachel Kim", initials: "RK", role: "HR Manager", gradient: "from-pink-500 to-rose-600" },
  { id: "lead", name: "Marcus Rivera", initials: "MR", role: "Analytics Manager", gradient: "from-blue-500 to-indigo-600", lead: true },
  { id: "jr", name: "Emma Collins", initials: "EC", role: "Data Analyst II", gradient: "from-green-500 to-emerald-600" },
  { id: "you", name: "Arjun Patel", initials: "AP", role: "Interviewee", gradient: "from-indigo-500 to-purple-600", you: true },
];
const QUESTION = "Will you now or in the future require visa sponsorship to work for us?";
const ANSWER =
  "I am authorised to work now on F-1 OPT, and my degree qualifies for the STEM extension. Longer term I would need H-1B sponsorship, and I am happy to walk you through how that works.";

function InterviewScreen({ reg, stage, run }: { reg: Reg; stage: number; run: boolean }) {
  if (stage <= 0) {
    return (
      <div className="flex h-full flex-col gap-3">
        <PageHeader section="Interviews" title="Interview Practice" description="Mock interviews with AI feedback and scores" Icon={Video} actions={<span className={BTN_PRIMARY}><Plus className="h-3.5 w-3.5" /> Start New Interview</span>} />
        <div className="grid grid-cols-4 gap-3">
          <Stat label="Total Interviews" value={2} tone="text-blue-400" />
          <Stat label="Average Score" value="76%" tone="text-emerald-400" />
          <Stat label="Practice Time" value="1.2h" tone="text-violet-400" />
          <Stat label="Completion" value="100%" tone="text-amber-400" />
        </div>
        <div className={`${CARD} flex items-center gap-4 p-4`}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#5b6cff]/40 bg-[#5b6cff]/[0.12] text-indigo-200"><Video className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-300">From your plan · Day 6</p>
            <p className="text-[13px] font-semibold text-white">Recruiter screen · Northwind Analytics</p>
            <p className="text-[10.5px] text-slate-500">Panel of 3 · about 15 minutes · includes work authorisation</p>
          </div>
          <span ref={reg("startIv")} className={BTN_PRIMARY}><Video className="h-3.5 w-3.5" /> Start interview</span>
        </div>
        <div className={`${CARD} p-4`}>
          <p className="mb-2 text-[11.5px] font-semibold text-white">Recent</p>
          {[["Behavioral · Lumen Health", "81%"], ["Technical · Bluefin Labs", "71%"]].map(([t, sc]) => (
            <div key={t} className="flex items-center justify-between border-t border-white/[0.05] py-2 text-[11px] first:border-t-0">
              <span className="text-slate-300">{t}</span>
              <span className="font-semibold tabular-nums text-emerald-400">{sc}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (stage === 1) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className={`${CARD} w-full max-w-lg p-6 text-center`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Waiting room</p>
          <p className="mt-1 text-[15px] font-semibold text-white">Recruiter screen · Northwind Analytics</p>
          <div className="mt-5 flex justify-center gap-5">
            {PANEL.slice(0, 3).map((p) => (
              <div key={p.id} className="flex flex-col items-center">
                <span className={`grid h-12 w-12 place-items-center rounded-full border-2 border-slate-700 bg-gradient-to-br ${p.gradient} text-[13px] font-bold text-white`}>{p.initials}</span>
                <p className="mt-1.5 text-[11px] font-semibold text-white">{p.name}</p>
                <p className="text-[9.5px] text-slate-500">{p.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-center gap-4 text-[10.5px] text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Microphone ready</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Camera ready</span>
          </div>
          <span ref={reg("join")} className={`${BTN_PRIMARY} mt-5 px-6`}><Video className="h-3.5 w-3.5" /> Join interview</span>
        </div>
      </div>
    );
  }
  return <LivePanel reg={reg} answering={stage >= 3} run={run} />;
}

function LivePanel({ reg, answering, run }: { reg: Reg; answering: boolean; run: boolean }) {
  const asked = useAfter(900, run);
  const speaker = answering ? "you" : asked ? "hr" : null;
  const q = useTyped(QUESTION, run && asked, 0, 90);
  const a = useTyped(ANSWER, run && answering, 200, 90);
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-[9px] font-bold text-white">AI</span>
          <div>
            <p className="text-[12px] font-semibold text-white">Interview Conference</p>
            <p className="text-[10px] text-slate-500">Data Analyst · Recruiter screen · Northwind Analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-slate-500">
          <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-400" />Excellent</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{answering ? "0:42" : "0:18"}</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-red-500" />Recording</span>
        </div>
      </div>
      <div ref={reg("ivFocus")} className="flex min-h-0 flex-1 flex-col">
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
          {PANEL.map((p) => {
            const speaking = p.id === speaker;
            return (
              <div
                key={p.id}
                className={`relative flex flex-col items-center justify-center rounded-xl border bg-white/[0.02] text-center transition-colors duration-300 ${
                  speaking ? (p.you ? "border-purple-500/50" : "border-blue-500/50") : p.lead ? "border-blue-500/25" : p.you ? "border-purple-500/25" : "border-white/[0.06]"
                }`}
              >
                {p.lead && <span className="absolute right-2.5 top-2.5 rounded-full bg-blue-600 px-2 py-0.5 text-[8px] font-medium text-white">Lead</span>}
                {p.you && <span className="absolute right-2.5 top-2.5 rounded-full bg-purple-600 px-2 py-0.5 text-[8px] font-medium text-white">You</span>}
                <span className={`relative grid h-12 w-12 place-items-center rounded-full border-2 bg-gradient-to-br ${p.gradient} text-[14px] font-bold text-white transition-colors duration-300 ${speaking ? (p.you ? "border-purple-400" : "border-blue-400") : "border-slate-700"}`}>
                  {p.initials}
                  {speaking && run && <span className={`absolute -inset-1 animate-ping rounded-full border ${p.you ? "border-purple-400/50" : "border-blue-400/50"} [animation-duration:1.8s]`} />}
                </span>
                <p className={`mt-1.5 text-[12px] font-semibold ${speaking ? (p.you ? "text-purple-300" : "text-blue-300") : "text-white"}`}>{p.name}</p>
                <p className="mb-1.5 text-[10px] text-slate-500">{p.role}</p>
                <span className={`rounded-full border px-2.5 py-0.5 text-[9px] font-medium ${speaking ? (p.you ? "border-purple-500/20 bg-purple-500/10 text-purple-300" : "border-blue-500/20 bg-blue-500/10 text-blue-300") : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"}`}>
                  {speaking ? (p.you ? "Responding" : "Asking") : "Listening"}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /><span className="font-medium text-white">Active</span></span>
              <span className="text-slate-500">Q 1/8</span>
              {speaker && (
                <span className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 ${answering ? "border-purple-500/20 bg-purple-500/10 text-purple-300" : "border-blue-500/20 bg-blue-500/10 text-blue-300"}`}>
                  <span className={`h-1 w-1 rounded-full ${answering ? "bg-purple-400" : "bg-blue-400"}`} />
                  {answering ? "Arjun Patel responding" : "Rachel Kim asking"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <span ref={reg("mic")} className={`grid h-7 w-7 place-items-center rounded-full text-white transition-colors duration-200 ${answering ? "bg-[#5b6cff]" : "bg-slate-800"}`}><Mic className="h-3.5 w-3.5" /></span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-800 text-white"><Video className="h-3.5 w-3.5" /></span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-red-600 text-white"><PhoneOff className="h-3.5 w-3.5" /></span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-800 text-white"><Volume2 className="h-3.5 w-3.5" /></span>
            </div>
          </div>
          <div className="min-h-[52px] rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
            <p className="mb-0.5 flex items-center gap-1.5 text-[9px] font-medium text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Live Transcript{speaker ? `: ${answering ? "Arjun Patel" : "Rachel Kim"}` : ""}
            </p>
            <p className="text-[11px] leading-relaxed text-white">{answering ? a : asked ? q : "Interview session ready..."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 04 Debrief ─────────────────────────────────────────────────────────────

function DebriefScreen({ reg, stage, run }: { reg: Reg; stage: number; run: boolean }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <PageHeader section="Interview Journal" title="Interview Journal" description="Log real interviews and let AI find your patterns" Icon={NotebookPen} actions={<span className={BTN_PRIMARY}><Plus className="h-3.5 w-3.5" /> Log Interview</span>} />
      {stage <= 0 ? (
        <div className={`${CARD} p-5`}>
          <p className="mb-3 text-[12.5px] font-semibold text-white">Log a real interview</p>
          <div className="grid grid-cols-3 gap-3">
            <div><span className={LABEL}>Company</span><div className={FIELD}>Northwind Analytics</div></div>
            <div><span className={LABEL}>Stage</span><div className={FIELD}>Recruiter screen</div></div>
            <div><span className={LABEL}>How did it feel?</span><div className={`${FIELD} text-amber-300`}>7 / 10</div></div>
          </div>
          <div className="mt-3">
            <span className={LABEL}>What happened</span>
            <div className={`${FIELD} min-h-[64px] leading-relaxed`}>Good conversation about the team. When she asked about sponsorship I explained OPT but took too long. The SQL question went well.</div>
          </div>
          <span ref={reg("logIt")} className={`${BTN_PRIMARY} mt-4`}><Sparkles className="h-3.5 w-3.5" /> Save and analyze</span>
        </div>
      ) : (
        <div ref={reg("debriefFocus")} className="grid min-h-0 flex-1 grid-cols-2 content-start gap-3">
          {[
            { Icon: CheckCircle2, tone: "text-emerald-400", dot: "bg-emerald-400", title: "Your Strengths", items: ["Clear, confident on the SQL question", "Asked good questions about the team's metrics"] },
            { Icon: AlertTriangle, tone: "text-red-400", dot: "bg-red-400", title: "Weakness Map", items: ["Sponsorship answer ran long", "Opened with your status, not your fit for the role"] },
          ].map((c, i) => (
            <motion.div key={c.title} initial={run ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.25, duration: 0.4, ease: EASE }} className={`${CARD} p-4`}>
              <p className="mb-2.5 flex items-center gap-2 text-[12px] font-semibold text-white"><c.Icon className={`h-4 w-4 ${c.tone}`} /> {c.title}</p>
              {c.items.map((t) => (
                <p key={t} className="flex items-start gap-2 py-1 text-[11px] leading-relaxed text-slate-300">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${c.dot}`} />
                  {t}
                </p>
              ))}
            </motion.div>
          ))}
          <motion.div initial={run ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.4, ease: EASE }} className={`${CARD} col-span-2 border-[#5b6cff]/30 p-4`}>
            <p className="mb-1.5 flex items-center gap-2 text-[12px] font-semibold text-white"><Sparkles className="h-4 w-4 text-indigo-300" /> Pattern across your interviews</p>
            <p className="text-[11.5px] leading-relaxed text-slate-300">
              Your sponsorship answer ran long in 2 of your last 3 rounds. Lead with the role, then give your status in two sentences: authorised now on OPT, STEM extension available, H-1B later.
            </p>
            <span className={`${BTN_PILL} mt-3 h-8`}><Video className="h-3.5 w-3.5" /> Practise this answer</span>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ─── 05 Follow up: Career Tools, Cold Outreach, After Applying ─────────────

const FOLLOW_UP =
  "Hi Rachel,\n\nThank you for the conversation yesterday about the Data Analyst role. I enjoyed hearing how the team uses experimentation to shape the product, and it made me even more excited about the work.\n\nI am happy to share anything else that would help as you plan next steps.\n\nBest regards,\nArjun Patel";

function CareerScreen({ reg, stage, run }: { reg: Reg; stage: number; run: boolean }) {
  const body = useTyped(FOLLOW_UP, run && stage >= 1, 450, 260);
  const done = stage >= 1 && body.length >= FOLLOW_UP.length;
  return (
    <div className="flex h-full flex-col gap-3">
      <PageHeader section="Career Tools" title="Career Tools" description="LinkedIn profile and outreach" Icon={Sparkles} />
      <div className="grid w-fit grid-cols-2 gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1 text-[11px]">
        <span className="rounded-md px-3 py-1 text-slate-500">LinkedIn</span>
        <span className="flex items-center gap-1.5 rounded-md bg-white/[0.08] px-3 py-1 font-semibold text-white"><Send className="h-3 w-3" /> Cold Outreach</span>
      </div>
      <div ref={reg("fuFocus")} className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3">
        <div className={`${CARD} p-4`}>
          <span className={LABEL}>Message type</span>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {["Job Inquiry", "Referral Request", "Networking", "After Applying"].map((t) => (
              <span key={t} className={`rounded-md border px-2 py-1 text-[10px] font-medium ${t === "After Applying" ? "border-[#5b6cff]/40 bg-[#5b6cff]/10 text-indigo-200" : "border-white/[0.07] text-slate-500"}`}>{t}</span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><span className={LABEL}>Name</span><div className={FIELD}>Rachel Kim</div></div>
            <div><span className={LABEL}>Their Role</span><div className={FIELD}>HR Manager</div></div>
          </div>
          <div className="mt-2"><span className={LABEL}>Company</span><div className={FIELD}>Northwind Analytics</div></div>
          <div className="mt-2"><span className={LABEL}>Context</span><div className={FIELD}>Recruiter screen yesterday</div></div>
          <span ref={reg("writeFu")} className={`${BTN_PRIMARY} mt-3 w-full`}><Sparkles className="h-3.5 w-3.5" /> Write message</span>
        </div>
        <div className={`${CARD} flex min-h-0 flex-col overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
            <p className="flex items-center gap-2 text-[11.5px] font-semibold text-white"><Mail className="h-3.5 w-3.5 text-indigo-300" /> Email</p>
            <span className={`${BTN_PILL} h-7 text-[10.5px] transition-opacity ${done ? "" : "opacity-40"}`}><Copy className="h-3 w-3" /> Copy</span>
          </div>
          {stage >= 1 ? (
            <div className="min-h-0 flex-1 px-4 py-3">
              <p className="mb-2 text-[11px] text-slate-400"><span className="text-slate-500">Subject:</span> <span className="text-white">Thank you, Data Analyst conversation</span></p>
              <p className="whitespace-pre-line text-[11px] leading-relaxed text-slate-200">
                {body}
                {!done && <span className="ml-px inline-block h-3 w-px translate-y-0.5 bg-white/60" />}
              </p>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center text-[11px] text-slate-600">Your message appears here</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 06 Job Tracker ─────────────────────────────────────────────────────────

const STATUS: Record<string, string> = {
  Wishlist: "border-slate-500/20 bg-slate-500/10 text-slate-400",
  Applied: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  "Phone Screen": "border-violet-500/20 bg-violet-500/10 text-violet-400",
  Technical: "border-indigo-500/20 bg-indigo-500/10 text-indigo-400",
  "Final Round": "border-amber-500/20 bg-amber-500/10 text-amber-400",
};
const DOT: Record<string, string> = { Wishlist: "bg-slate-400", Applied: "bg-blue-400", "Phone Screen": "bg-violet-400", Technical: "bg-indigo-400", "Final Round": "bg-amber-400" };

const APPS = [
  { company: "Northwind Analytics", role: "Data Analyst", where: "Boston, MA · Hybrid", status: "Phone Screen" },
  { company: "Lumen Health", role: "Business Intelligence Analyst", where: "Remote", status: "Technical" },
  { company: "Bluefin Labs", role: "Product Analyst", where: "New York, NY · Onsite", status: "Applied" },
  { company: "Cedar Systems", role: "Analytics Engineer", where: "Austin, TX · Hybrid", status: "Wishlist" },
];

/** stage -1: the opening shot; 0: just opened; 1: status menu open; 2: moved to Technical. */
function TrackerScreen({ reg, stage }: { reg: Reg; stage: number }) {
  const moved = stage >= 2;
  return (
    <div className="flex h-full flex-col gap-3">
      <PageHeader
        section="Job Tracker"
        title="Job Tracker"
        description="Every application from wishlist to offer"
        Icon={Briefcase}
        actions={
          <>
            <span className={BTN_PILL}><Shield className="h-3.5 w-3.5" /> Unlimited</span>
            <span className={BTN_PRIMARY}><Plus className="h-3.5 w-3.5" /> Add Application</span>
          </>
        }
      />
      <div className="grid grid-cols-4 gap-3">
        <Stat label="Total" value={12} tone="text-white" />
        <Stat label="Active" value={5} tone="text-blue-400" sub="in progress" />
        <Stat label="Response Rate" value={moved ? "33%" : "25%"} tone="text-amber-400" />
        <Stat label="Offers" value={0} tone="text-emerald-400" />
      </div>
      <div ref={reg("trackFocus")} className="space-y-2">
        {APPS.map((a, i) => {
          const first = i === 0;
          const status = first && moved ? "Technical" : a.status;
          return (
            <div key={a.company} className={`${CARD} relative flex items-center gap-3 px-4 py-2.5 ${first ? "z-10" : ""}`}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-[11px] font-bold text-slate-300">{a.company[0]}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-semibold text-white">{a.role}</p>
                <p className="truncate text-[10.5px] text-slate-500">{a.company} · {a.where}</p>
              </div>
              {first && moved && (
                <motion.span initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} className="text-[10px] font-medium text-emerald-400">
                  Next round booked
                </motion.span>
              )}
              <div className="relative">
                <span
                  ref={first ? reg("status") : undefined}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold transition-colors duration-300 ${STATUS[status]}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${DOT[status]}`} />
                  {status}
                  {first && <ChevronDown className="h-3 w-3 opacity-70" />}
                </span>
                {first && stage === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.14 }}
                    className="absolute right-0 top-[calc(100%+6px)] z-20 w-40 rounded-xl border border-white/[0.1] bg-[#191d27] py-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
                  >
                    {["Applied", "Phone Screen", "Technical", "Final Round"].map((st) => (
                      <div key={st} ref={st === "Technical" ? reg("optTech") : undefined} className={`flex items-center gap-2.5 px-3 py-1.5 text-[11px] ${st === "Phone Screen" ? "bg-white/[0.05] font-semibold text-violet-300" : "text-slate-300"}`}>
                        <span className={`h-2 w-2 rounded-full ${DOT[st]}`} />
                        {st}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
