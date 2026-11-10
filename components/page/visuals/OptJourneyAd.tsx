"use client";

/**
 * components/page/visuals/OptJourneyAd.tsx
 *
 * The hero film on /for/international-students: one OPT search, played in a
 * copy of the real app (the Dashboard repo): its sidebar, its page header
 * (breadcrumb row, icon, title, description, actions), its stat cards, its
 * status colours and its #5b6cff accent. Three beats:
 *
 *   01 Resume       open Resume, tailor it to a role: 62 to 91
 *   02 Interviews   open Interviews, rehearse the sponsorship question
 *   03 Job Tracker  open Job Tracker, move the application to Phone Screen
 *
 * Each beat follows the same grammar, after the Sectira hero film: the
 * pointer clicks the sidebar and the screen changes, travels to the thing to
 * do and clicks it, the camera pushes in while the rest of the window falls
 * into shadow, the caption rises over the bottom band, the camera pulls back.
 *
 * Mechanics: one requestAnimationFrame clock. Camera, spotlight, pointer,
 * ripple and chapter bars are written to the DOM each frame; React renders
 * only when the screen or the app's state changes. Targets are measured in
 * canvas units (the camera's zoom divided out). Pauses off screen; with
 * reduced motion it shows the finished tracker without camera or pointer.
 *
 * Illustrative example (the caption says so); the companies are made up.
 * Decorative: ProductHero marks it aria-hidden.
 */

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  CheckCircle,
  ChevronRight,
  Puzzle,
  Clock,
  FileText,
  Home,
  Mic,
  NotebookPen,
  Pen,
  Plus,
  Shield,
  Sparkles,
  Target,
  Upload,
  Video,
  type LucideIcon,
} from "lucide-react";

// ─── The film ───────────────────────────────────────────────────────────────

type Screen = "overview" | "resume" | "interviews" | "tracker";
type Key = "nav-resume" | "nav-interviews" | "nav-tracker" | "tailor" | "feedback" | "status" | "resumeFocus" | "ivFocus" | "row";

const BEATS: { screen: Screen; label: string; caption: string; nav: Key; target: Key; focus: Key }[] = [
  { screen: "resume", label: "Tailor the resume", caption: "Tailor every resume to the role.", nav: "nav-resume", target: "tailor", focus: "resumeFocus" },
  { screen: "interviews", label: "Rehearse the hard question", caption: "Rehearse the sponsorship question out loud.", nav: "nav-interviews", target: "feedback", focus: "ivFocus" },
  { screen: "tracker", label: "Track it to the interview", caption: "Track every application to the interview.", nav: "nav-tracker", target: "status", focus: "row" },
];

/** Milliseconds; beat-local times run from the start of the beat. */
const INTRO = 1400;
const BEAT = 6600;
const OUTRO = 1800;
const TOTAL = INTRO + BEATS.length * BEAT + OUTRO;
const NAV_FROM = 150;
const NAV_ARRIVE = 950;
const NAV_CLICK = 1020;
const TGT_FROM = 1550;
const TGT_ARRIVE = 2350;
const TGT_CLICK = 2430;
const PUSH_AT = 2600;
const PUSH = 1000;
const CAP: [number, number] = [2800, 5900];
const PULL_AT = 5700;
const PULL = 850;
const CLICKS = [NAV_CLICK, TGT_CLICK];

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
  const u = T - INTRO;
  const beat = Math.floor(u / BEAT);
  if (beat >= BEATS.length) return { beat: BEATS.length, local: u - BEATS.length * BEAT };
  return { beat, local: u - beat * BEAT };
}

/** Which screen is up and what has been done, at film time T. */
function stateAt(T: number) {
  const { beat, local } = locate(T);
  let screen: Screen = "overview";
  if (beat >= BEATS.length) screen = BEATS[BEATS.length - 1].screen;
  else if (beat >= 0) screen = local >= NAV_CLICK ? BEATS[beat].screen : beat > 0 ? BEATS[beat - 1].screen : "overview";
  const done = (b: number) => beat > b || (beat === b && local >= TGT_CLICK);
  return { beat, screen, tailored: done(0), feedback: done(1), moved: done(2) };
}

type Rect = { x: number; y: number; w: number; h: number };
type Cam = { z: number; x: number; y: number };
const WIDE: Cam = { z: 1, x: 0, y: 0 };

function frame(r: Rect, W: number, H: number): Cam {
  const safeH = H - BAND;
  const z = Math.max(1, Math.min(1.55, (0.8 * W) / r.w, (0.82 * safeH) / r.h));
  const x = W / 2 - z * (r.x + r.w / 2);
  const y = safeH / 2 - z * (r.y + r.h / 2);
  return { z, x: Math.min(0, Math.max(W - z * W, x)), y: Math.min(0, Math.max(H - z * H, y)) };
}

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

type App = ReturnType<typeof stateAt>;
type Reg = (k: Key) => (el: HTMLElement | null) => void;

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
  const reg: Reg = (k) => (el) => {
    targets.current[k] = el;
  };
  const rects = useRef<Partial<Record<Key, Rect>>>({});

  const T = useRef(0);
  const [app, setApp] = useState<App>(() => stateAt(0));
  const [cap, setCap] = useState<number | null>(null);
  const appKey = useRef("");
  const remeasure = useRef("");

  const measure = () => {
    const cam = camRef.current;
    if (!cam) return;
    const base = cam.getBoundingClientRect();
    const z = base.width / (cam.offsetWidth || 1) || 1;
    for (const [k, el] of Object.entries(targets.current)) {
      if (!el || !el.isConnected) continue;
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

  const paintRef = useRef<(t: number) => void>(() => {});
  paintRef.current = (t: number) => {
    const pic = pictureRef.current, cam = camRef.current;
    if (!pic || !cam) return;
    const W = pic.offsetWidth, H = pic.offsetHeight;
    const { beat, local } = locate(t);
    const inBeat = beat >= 0 && beat < BEATS.length;

    const s = stateAt(t);
    const key = `${s.screen}|${s.tailored}|${s.feedback}|${s.moved}|${s.beat}`;
    if (key !== appKey.current) {
      appKey.current = key;
      setApp(s);
    }
    const showCap = inBeat && local >= CAP[0] && local < CAP[1] ? beat : null;
    setCap((c) => (c === showCap ? c : showCap));

    // The new screen has settled by the time the pointer sets off for its target.
    const mk = `${beat}|${local >= TGT_FROM - 80}`;
    if (mk !== remeasure.current && (local > 40 || beat === -1)) {
      remeasure.current = mk;
      measure();
    }

    // Fade the whole picture in at the start of a loop and out at the end.
    const fade = beat === -1 ? clamp01(local / 450) : beat >= BEATS.length ? 1 - clamp01((local - OUTRO + 500) / 500) : 1;
    cam.style.opacity = String(fade);

    // Camera.
    let view: Cam = WIDE;
    let focus = 0;
    let fr: Rect | undefined;
    if (inBeat) {
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

    // Spotlight.
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

    // Pointer: the sidebar first, then the thing to do on the new screen.
    const cur = curRef.current, rip = ripRef.current;
    if (cur && rip) {
      const entry = { x: W * 0.72, y: H * 0.86 };
      const at = (k: Key, ax = 0.5, ay = 0.58) => {
        const r = rects.current[k];
        return r ? { x: r.x + r.w * ax, y: r.y + r.h * ay } : entry;
      };
      const navPt = (b: number) => at(BEATS[b].nav, 0.32, 0.55);
      const tgtPt = (b: number) => (b < 0 ? entry : at(BEATS[b].target));
      const curve = (a: { x: number; y: number }, b: { x: number; y: number }, p: number) => {
        const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
        const bow = Math.min(60, d * 0.18);
        const cx = (a.x + b.x) / 2 + (dy / d) * bow, cy = (a.y + b.y) / 2 - (dx / d) * bow;
        const q = 1 - p;
        return { x: q * q * a.x + 2 * q * p * cx + p * p * b.x, y: q * q * a.y + 2 * q * p * cy + p * p * b.y };
      };

      let pos = entry;
      let show = 1;
      if (beat === -1) show = clamp01((local - 500) / 400);
      else if (beat >= BEATS.length) {
        pos = tgtPt(BEATS.length - 1);
        show = 1 - clamp01(local / 500);
      } else if (local < TGT_FROM) {
        pos = curve(tgtPt(beat - 1), navPt(beat), easeCam(clamp01((local - NAV_FROM) / (NAV_ARRIVE - NAV_FROM))));
      } else {
        pos = curve(navPt(beat), tgtPt(beat), easeCam(clamp01((local - TGT_FROM) / (TGT_ARRIVE - TGT_FROM))));
      }

      let press = 0, ripple = -1;
      if (inBeat) {
        for (const c of CLICKS) {
          const u = local - c;
          if (u > -90 && u < 260) press = Math.max(press, u < 0 ? 1 + u / 90 : u < 80 ? 1 : 1 - (u - 80) / 180);
          if (u >= 0 && u < 620) ripple = u / 620;
        }
      }
      const sp = toScreen(pos.x, pos.y);
      const size = (1 + 0.22 * (view.z - 1)) * (1 - 0.14 * press);
      cur.style.opacity = String(show);
      cur.style.transform = `translate(${sp.x.toFixed(2)}px,${sp.y.toFixed(2)}px) scale(${size.toFixed(4)})`;
      if (ripple >= 0) {
        rip.style.opacity = String(0.7 * (1 - ripple) * show);
        rip.style.transform = `translate(${sp.x.toFixed(2)}px,${sp.y.toFixed(2)}px) scale(${(0.25 + 0.95 * easeOut(ripple)).toFixed(4)})`;
      } else rip.style.opacity = "0";
    }

    barRefs.current.forEach((el, i) => {
      if (!el) return;
      const f = beat > i ? 1 : beat === i ? clamp01(local / BEAT) : 0;
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
    setCap(BEATS.length - 1);
    barRefs.current.forEach((el) => {
      if (el) el.style.transform = "scaleX(1)";
    });
  }, [reduce]);

  const run = !reduce;
  const chip = app.beat >= 0 && app.beat < BEATS.length ? BEATS[app.beat] : null;

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <p className="mx-auto mb-4 max-w-3xl text-center text-[15px] italic leading-relaxed text-slate-300">
        <span className="mr-2 not-italic font-semibold text-indigo-300">An illustrative example:</span>
        one OPT search in Preciprocal, from the resume to the interview.
      </p>

      <div className="relative rounded-[20px] bg-[linear-gradient(180deg,rgb(255_255_255/0.14),rgb(255_255_255/0.05)_18%,rgb(255_255_255/0.04))] p-px shadow-[0_50px_120px_-40px_rgb(0_0_0/0.9)]">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-[14%] -top-px h-px bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.55),rgb(165_180_252/0.7),transparent)]" />
        <div className="overflow-hidden rounded-[19px] bg-[#0c0e14]">
          {/* Window chrome */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
            <div className="flex w-48 shrink-0 gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mx-auto w-fit rounded-md border border-white/[0.06] bg-white/[0.035] px-3 py-1 text-[11.5px] font-medium text-slate-400">
                app.preciprocal.com{PATHS[app.screen]}
              </div>
            </div>
            <div className="flex w-48 shrink-0 justify-end">
              <span className="whitespace-nowrap rounded-full bg-white/[0.05] px-2.5 py-1 text-[10.5px] font-medium text-slate-300">
                {chip ? chip.label : "Your OPT search"}
              </span>
            </div>
          </div>

          {/* The picture */}
          <div ref={pictureRef} className="relative h-[540px] overflow-hidden xl:h-[580px]">
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
          <div className="grid grid-cols-3 gap-4 border-t border-white/[0.06] px-5 py-3">
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

const PATHS: Record<Screen, string> = { overview: "", resume: "/resume", interviews: "/interview", tracker: "/job-tracker" };

const NAV: { id: string; label: string; Icon: LucideIcon; screen?: Screen; key?: Key }[] = [
  { id: "overview", label: "Overview", Icon: Home, screen: "overview" },
  { id: "resume", label: "Resume", Icon: FileText, screen: "resume", key: "nav-resume" },
  { id: "cover-letter", label: "Cover Letter", Icon: Pen },
  { id: "interviews", label: "Interviews", Icon: Video, screen: "interviews", key: "nav-interviews" },
  { id: "planner", label: "Planner", Icon: Calendar },
  { id: "debrief", label: "Interview Journal", Icon: NotebookPen },
  { id: "career-tools", label: "Career Tools", Icon: Sparkles },
  { id: "job-tracker", label: "Job Tracker", Icon: Briefcase, screen: "tracker", key: "nav-tracker" },
  { id: "extension", label: "Extension", Icon: Puzzle },
];

const CARD = "rounded-2xl border border-white/[0.08] bg-[#13161e]";
const BTN_PRIMARY = "inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#5b6cff] px-3.5 text-[12px] font-semibold text-white";
const BTN_PILL = "inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 text-[12px] font-medium text-slate-300";

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
          {NAV.map(({ id, label, Icon, screen, key }) => {
            const active = screen === app.screen;
            return (
              <div
                key={id}
                ref={key ? reg(key) : undefined}
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
            key={app.screen}
            className="absolute inset-0 space-y-3.5 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
          >
            {app.screen === "overview" && <OverviewScreen />}
            {app.screen === "resume" && <ResumeScreen reg={reg} done={app.tailored} run={run} />}
            {app.screen === "interviews" && <InterviewScreen reg={reg} done={app.feedback} run={run} />}
            {app.screen === "tracker" && <TrackerScreen reg={reg} done={app.moved} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

/** The header every signed-in page uses: breadcrumb row, then icon, title, description, actions. */
function PageHeader({ section, title, description, Icon, actions }: { section?: string; title: string; description: string; Icon: LucideIcon; actions?: ReactNode }) {
  return (
    <header className={`${CARD} overflow-hidden`}>
      {section && (
        <div className="flex items-center gap-1 border-b border-white/[0.06] bg-white/[0.015] px-5 py-2 text-[11.5px]">
          <Home className="h-3 w-3 text-slate-400" />
          <span className="text-slate-400">Home</span>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className="font-medium text-white">{section}</span>
        </div>
      )}
      <div className="flex items-center gap-4 px-5 py-3.5">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-[#5b6cff]/40 bg-[#5b6cff]/[0.12] text-indigo-200">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[17px] font-semibold leading-tight tracking-tight text-white">{title}</p>
            <p className="mt-0.5 truncate text-[11.5px] text-slate-400">{description}</p>
          </div>
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}

function Stat({ label, value, tone, sub, Icon }: { label: string; value: ReactNode; tone: string; sub?: string; Icon?: LucideIcon }) {
  return (
    <div className={`${CARD} px-4 py-3`}>
      <div className="flex items-center justify-between">
        <p className="text-[10.5px] font-medium text-slate-500">{label}</p>
        {Icon && <Icon className={`h-3.5 w-3.5 ${tone}`} strokeWidth={1.75} />}
      </div>
      <p className={`mt-1 text-[20px] font-bold tabular-nums leading-tight ${tone}`}>{value}</p>
      {sub && <p className="text-[10px] text-slate-600">{sub}</p>}
    </div>
  );
}

function OverviewScreen() {
  return (
    <>
      <PageHeader title="Welcome back, Arjun" description="Here is where your search stands this week" Icon={Home} actions={<span className={BTN_PRIMARY}><Video className="h-3.5 w-3.5" /> Start New Interview</span>} />
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Resume score" value="62" tone="text-amber-400" sub="Data Analyst resume" />
        <Stat label="Mock interviews" value="2" tone="text-blue-400" sub="this month" />
        <Stat label="Applications" value="12" tone="text-white" sub="5 in progress" />
      </div>
      <div className={`${CARD} p-4`}>
        <p className="mb-3 text-[12px] font-semibold text-white">Suggested next steps</p>
        {["Tailor your resume for Northwind Analytics", "Practise the sponsorship question", "Follow up with Lumen Health"].map((t, i) => (
          <div key={t} className="flex items-center gap-3 border-t border-white/[0.05] py-2.5 first:border-t-0">
            <span className="font-mono text-[10.5px] text-slate-600">0{i + 1}</span>
            <span className="text-[12px] text-slate-300">{t}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function ResumeScreen({ reg, done, run }: { reg: Reg; done: boolean; run: boolean }) {
  const score = useCount(done ? 91 : 62, 62, run && done, 1.6);
  const r = 34, c = 2 * Math.PI * r;
  return (
    <>
      <PageHeader section="Resume" title="Resume Analysis" description="AI feedback on every resume you upload" Icon={FileText} actions={<span className={BTN_PRIMARY}><Upload className="h-3.5 w-3.5" /> Upload Resume</span>} />
      <div ref={reg("resumeFocus")} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3">
        <div className={`${CARD} p-4`}>
          <div className="mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
            <p className="truncate text-[12px] font-semibold text-white">Arjun_Patel_Resume.pdf</p>
          </div>
          <div className="flex items-center gap-4">
            <svg width="84" height="84" viewBox="0 0 84 84" className="shrink-0 -rotate-90">
              <circle cx="42" cy="42" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
              <circle cx="42" cy="42" r={r} fill="none" stroke={score >= 85 ? "#34d399" : "#fbbf24"} strokeWidth="7" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
            </svg>
            <div>
              <p className={`text-[30px] font-bold tabular-nums leading-none ${score >= 85 ? "text-emerald-400" : "text-amber-400"}`}>{score}</p>
              <p className="mt-1 text-[11px] text-slate-500">ATS score{done ? ", was 62" : ""}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1 text-center text-[10.5px]">
            <span className="rounded-md bg-[#5b6cff] py-1 font-semibold text-white">Analysis</span>
            <span className="py-1 text-slate-500">Recruiter</span>
            <span className="py-1 text-slate-500">Writer</span>
          </div>
        </div>
        <div className={`${CARD} flex flex-col p-4`}>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-500">Tailor to a job</p>
          <p className="mt-1 text-[12.5px] font-semibold text-white">Data Analyst · Northwind Analytics</p>
          <p className="mb-3 mt-1 text-[11px] text-slate-500">{done ? "Matched to the posting" : "3 keywords from the posting are missing"}</p>
          <div className="mb-auto flex flex-wrap gap-1.5">
            {["SQL", "A/B testing", "Stakeholder reporting"].map((k, i) => (
              <motion.span
                key={k}
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ delay: done && run ? 0.4 + i * 0.25 : 0 }}
                className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors duration-500 ${
                  done ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300" : "border-white/[0.08] bg-white/[0.03] text-slate-500"
                }`}
              >
                {done && <Check className="h-3 w-3" strokeWidth={2.6} />} {k}
              </motion.span>
            ))}
          </div>
          <span ref={reg("tailor")} className={`${done ? BTN_PILL : BTN_PRIMARY} mt-4 w-fit`}>
            {done ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Sparkles className="h-3.5 w-3.5" />}
            {done ? "Tailored" : "Tailor resume"}
          </span>
        </div>
      </div>
      <div className={`${CARD} p-4`}>
        <p className="mb-2 text-[12px] font-semibold text-white">Top fixes</p>
        {["Add a summary that names the role", "Quantify the Datadog pipeline work", "Move skills above projects"].map((t) => (
          <div key={t} className="flex items-center gap-2.5 py-1.5 text-[11.5px] text-slate-400">
            <span className={`h-1.5 w-1.5 rounded-full ${done ? "bg-emerald-400" : "bg-amber-400"}`} />
            {t}
          </div>
        ))}
      </div>
    </>
  );
}

function InterviewScreen({ reg, done, run }: { reg: Reg; done: boolean; run: boolean }) {
  const score = useCount(86, 0, run && done, 1.2);
  return (
    <>
      <PageHeader section="Interviews" title="Interview Practice" description="Mock interviews with AI feedback and scores" Icon={Video} actions={<span className={BTN_PRIMARY}><Plus className="h-3.5 w-3.5" /> Start New Interview</span>} />
      <div className="grid grid-cols-4 gap-3">
        <Stat label="Total Interviews" value={done ? 3 : 2} tone="text-blue-400" Icon={Target} />
        <Stat label="Average Score" value={done ? "79%" : "76%"} tone="text-emerald-400" Icon={CheckCircle} />
        <Stat label="Practice Time" value="1.5h" tone="text-violet-400" Icon={Clock} />
        <Stat label="Completion" value="100%" tone="text-amber-400" Icon={Award} />
      </div>
      <div ref={reg("ivFocus")} className={`${CARD} p-4`}>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[12px] font-semibold text-white">Recruiter screen · Northwind Analytics</p>
          <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] text-slate-400">Question 3 of 6</span>
        </div>
        <div className="mb-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
          <p className="mb-1 text-[10px] font-semibold text-indigo-300">Interviewer</p>
          <p className="text-[13px] leading-snug text-white">&ldquo;Will you now or in the future require visa sponsorship?&rdquo;</p>
        </div>
        {done ? (
          <motion.div initial={run ? { opacity: 0, y: 6 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
            <div className="mb-1.5 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-indigo-300" /> Feedback
              </p>
              <p className="text-[17px] font-bold tabular-nums text-emerald-400">
                {score}
                <span className="text-[10.5px] font-semibold text-slate-500">/100</span>
              </p>
            </div>
            <p className="text-[11.5px] leading-relaxed text-slate-300">Clear and calm. You named OPT, your dates and the STEM extension in one breath. Next: lead with the role, then the status.</p>
          </motion.div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-9 flex-1 items-center gap-[3px] rounded-xl border border-white/[0.06] bg-white/[0.015] px-3">
              <Mic className="mr-1.5 h-3.5 w-3.5 shrink-0 text-rose-400" />
              {Array.from({ length: 30 }, (_, i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-[#5b6cff]/70"
                  initial={{ height: 4 }}
                  animate={run ? { height: [4, 5 + ((i * 7) % 16), 4] } : { height: 5 + ((i * 7) % 16) }}
                  transition={run ? { duration: 0.9, repeat: Infinity, delay: (i % 8) * 0.05, ease: "easeInOut" } : undefined}
                />
              ))}
            </div>
            <span ref={reg("feedback")} className={BTN_PRIMARY}>
              <Sparkles className="h-3.5 w-3.5" /> Get feedback
            </span>
          </div>
        )}
      </div>
    </>
  );
}

const STATUS: Record<string, string> = {
  Wishlist: "border-slate-500/20 bg-slate-500/10 text-slate-400",
  Applied: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  "Phone Screen": "border-violet-500/20 bg-violet-500/10 text-violet-400",
  Technical: "border-indigo-500/20 bg-indigo-500/10 text-indigo-400",
};
const DOT: Record<string, string> = { Wishlist: "bg-slate-400", Applied: "bg-blue-400", "Phone Screen": "bg-violet-400", Technical: "bg-indigo-400" };

const APPS = [
  { company: "Northwind Analytics", role: "Data Analyst", where: "Boston, MA · Hybrid", status: "Applied" },
  { company: "Lumen Health", role: "Business Intelligence Analyst", where: "Remote", status: "Technical" },
  { company: "Bluefin Labs", role: "Product Analyst", where: "New York, NY · Onsite", status: "Applied" },
  { company: "Cedar Systems", role: "Analytics Engineer", where: "Austin, TX · Hybrid", status: "Wishlist" },
];

function TrackerScreen({ reg, done }: { reg: Reg; done: boolean }) {
  return (
    <>
      <PageHeader
        section="Job Tracker"
        title="Job Tracker"
        description="Every application from wishlist to offer"
        Icon={Briefcase}
        actions={
          <>
            <span className={BTN_PILL}>
              <Shield className="h-3.5 w-3.5" /> Unlimited
            </span>
            <span className={BTN_PRIMARY}>
              <Plus className="h-3.5 w-3.5" /> Add Application
            </span>
          </>
        }
      />
      <div className="grid grid-cols-4 gap-3">
        <Stat label="Total" value={12} tone="text-white" />
        <Stat label="Active" value={5} tone="text-blue-400" sub="in progress" />
        <Stat label="Response Rate" value={done ? "33%" : "25%"} tone="text-amber-400" />
        <Stat label="Offers" value={0} tone="text-emerald-400" />
      </div>
      <div className="space-y-2">
        {APPS.map((a, i) => {
          const status = i === 0 && done ? "Phone Screen" : a.status;
          return (
            <div key={a.company} ref={i === 0 ? reg("row") : undefined} className={`${CARD} flex items-center gap-3 px-4 py-2.5`}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-[11px] font-bold text-slate-300">{a.company[0]}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-semibold text-white">{a.role}</p>
                <p className="truncate text-[10.5px] text-slate-500">
                  {a.company} · {a.where}
                </p>
              </div>
              <span
                ref={i === 0 ? reg("status") : undefined}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold transition-colors duration-300 ${STATUS[status]}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${DOT[status]}`} />
                {status}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
