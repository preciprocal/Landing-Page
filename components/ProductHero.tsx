"use client";

/**
 * components/ProductHero.tsx
 *
 * A full-width, full-height hero for tool pages, built like the homepage's
 * product walkthrough: the headline and sign-up up top, then one chapter of
 * Arjun's story playing in the real product preview (components/examples),
 * large, in a browser frame. Showing the actual screens is what sells; an
 * invented illustration cannot.
 *
 * The chapter's narration and step timings come from lib/demoChapters.ts, the
 * same source the homepage demo reads. The preview plays through its steps
 * while on screen, holds on the result, then replays. With reduced motion it
 * shows the finished state. Each page loads only its own preview, after
 * hydration (they are client-only and heavy). The preview is hidden on phones,
 * where it is too dense to read; the hero there is headline, subhead and CTA.
 */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Chevron from "@/components/Chevron";
import { BTN_PRIMARY, BTN_SECONDARY, Breadcrumbs, GRID_BG, PAD, TrustRow, type Crumb } from "@/components/page/Layout";
import { CHAPTER_DATA, type ChapterId } from "@/lib/demoChapters";

const FRAME_H = "h-[660px] xl:h-[720px]";

function Loading() {
  return <div className="h-full w-full animate-pulse bg-white/[0.015]" />;
}

type Preview = ComponentType<{ step: number }>;
const PREVIEWS: Record<ChapterId, Preview> = {
  resume: dynamic(() => import("@/components/examples/ResumePreview").then((m) => m.ResumeExamplePreview), { ssr: false, loading: Loading }),
  "cover-letter": dynamic(() => import("@/components/examples/CoverLetterPreview").then((m) => m.CoverLetterExamplePreview), { ssr: false, loading: Loading }),
  "career-tools": dynamic(() => import("@/components/examples/CareerToolsPreview").then((m) => m.CareerToolsExamplePreview), { ssr: false, loading: Loading }),
  "job-tracker": dynamic(() => import("@/components/examples/JobTrackerPreview").then((m) => m.JobTrackerExamplePreview), { ssr: false, loading: Loading }),
  planner: dynamic(() => import("@/components/examples/PlannerPreview").then((m) => m.PlannerExamplePreview), { ssr: false, loading: Loading }),
  interview: dynamic(() => import("@/components/examples/InterviewPreview").then((m) => m.InterviewExamplePreview), { ssr: false, loading: Loading }),
  debrief: dynamic(() => import("@/components/examples/DebriefPreview").then((m) => m.DebriefExamplePreview), { ssr: false, loading: Loading }),
};

/**
 * The pill in the frame's top bar names the tool. The chapter titles and
 * completed labels ("Fix His Resume", "$165K offer") belong to the homepage
 * story and read as nonsense on a tool page that never introduces Arjun.
 */
const TOOL_LABEL: Record<ChapterId, string> = {
  resume: "Resume analysis",
  "cover-letter": "Cover letter",
  "career-tools": "LinkedIn and outreach",
  "job-tracker": "Job tracker",
  planner: "Study planner",
  interview: "Mock interview",
  debrief: "Interview debrief",
};

/** How long the finished state holds before the chapter replays. */
const HOLD_MS = 7000;

function useChapterPlayback(chapter: ChapterId) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const reduce = useReducedMotion();
  const durations = CHAPTER_DATA[chapter].stepDurations;
  const total = durations.length;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const wait = step < total ? durations[step] : HOLD_MS;
    const id = setTimeout(() => setStep((s) => (s < total ? s + 1 : 0)), wait);
    return () => clearTimeout(id);
  }, [reduce, inView, step, total, durations]);

  return { ref, step: reduce ? total : step, done: reduce || step >= total };
}

export interface ProductHeroProps {
  chapter: ChapterId;
  /**
   * A custom animated scene shown in place of the chapter preview (for
   * example the OPT ad on /for/international-students). It brings its own
   * frame and caption; `chapter` is then unused.
   */
  scene?: ReactNode;
  breadcrumb?: Crumb[];
  badge?: ReactNode;
  title: ReactNode;
  accent?: ReactNode;
  subhead: ReactNode;
  ctaHref: string;
  ctaLabel: ReactNode;
  /** A quieter second action, usually an anchor further down the page. */
  secondary?: { href: string; label: ReactNode };
  sectionProps?: Record<string, string>;
}

export default function ProductHero({ chapter, scene, breadcrumb, badge, title, accent, subhead, ctaHref, ctaLabel, secondary, sectionProps }: ProductHeroProps) {
  const data = CHAPTER_DATA[chapter];
  const Preview = PREVIEWS[chapter];
  const { ref, step, done } = useChapterPlayback(chapter);

  return (
    <>
      {breadcrumb && <Breadcrumbs items={breadcrumb} />}
      <section {...sectionProps} className={`relative overflow-hidden ${PAD} pb-20 pt-10 sm:pt-12 md:min-h-[calc(100svh-72px)]`}>
        {/* Backdrop: a lit accent field behind the headline, a masked grid, and a fade into the page. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-12%] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.20),transparent)] blur-2xl" />
          <div className="absolute left-[12%] top-[38%] h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent-2)/0.10),transparent)] blur-3xl" />
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]" style={GRID_BG} />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#050810]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1400px]">
          {/* Headline block */}
          <div className="mx-auto max-w-5xl animate-fade-up text-center opacity-0">
            {badge && (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.08] px-3.5 py-1.5 text-[12px] font-medium text-accent-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {badge}
              </div>
            )}
            <h1 className="text-[clamp(2.4rem,4.6vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-white">
              {title}
              {accent && (
                <span className="block animate-[gradient-shift_8s_ease_infinite] bg-gradient-to-r from-accent-soft via-accent to-accent-2 bg-[length:200%_auto] bg-clip-text pb-1 text-transparent">
                  {accent}
                </span>
              )}
            </h1>
            <div className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-400">{subhead}</div>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={ctaHref} className={`${BTN_PRIMARY} w-full px-8 py-4 text-base sm:w-auto`}>
                {ctaLabel} <Chevron />
              </a>
              {secondary && (
                <a href={secondary.href} className={`${BTN_SECONDARY} w-full py-4 sm:w-auto`}>
                  {secondary.label}
                </a>
              )}
            </div>
            <TrustRow align="center" className="mt-5" />
          </div>

          {/* The product, playing one chapter of the story. Decorative for assistive tech: the page text says it. */}
          {scene ? (
            <div aria-hidden="true" className="relative mt-10 hidden animate-fade-up opacity-0 md:block" style={{ animationDelay: "160ms" }}>
              {scene}
            </div>
          ) : (
          <div ref={ref} aria-hidden="true" className="relative mx-auto mt-10 hidden max-w-[1240px] animate-fade-up opacity-0 md:block" style={{ animationDelay: "160ms" }}>
            {/* The chapter narration is a line from the homepage's continuing
                story and reads as nonsense on its own page, so only a short,
                honest label sits above the frame. */}
            <p className="mb-3 text-center text-[12px] font-medium uppercase tracking-[0.16em] text-slate-500">
              The real app, with example data
            </p>

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#080c18] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.02),inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              {/* Window chrome */}
              <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                <div className="flex w-28 shrink-0 gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/75" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/75" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/75" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mx-auto w-fit max-w-full truncate rounded-md border border-white/[0.06] bg-white/[0.035] px-3 py-1 text-center text-[11.5px] font-medium text-slate-400">
                    {data.path}
                  </div>
                </div>
                <div className="flex w-28 shrink-0 justify-end">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={done ? "done" : "live"}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.3 }}
                      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${
                        done ? "bg-emerald-400/10 text-emerald-300" : "bg-accent/10 text-accent-soft"
                      }`}
                    >
                      {done ? `${TOOL_LABEL[chapter]} · example` : TOOL_LABEL[chapter]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* The previews were drawn for the smaller home demo, so at this
                  width their 7 to 10px text was unreadable. They are zoomed
                  (--z) so text lands at a readable size, inside a frame tall
                  enough for it; --demo-extra (in the preview's own units)
                  stretches their panels to fill what is left. */}
              <div className={`relative overflow-hidden ${FRAME_H} [--demo-extra:26px] [--z:1.15] xl:[--demo-extra:8px] xl:[--z:1.3]`}>
                <div className="h-full overflow-hidden p-3 sm:p-4">
                  <div style={{ zoom: "var(--z)", height: "calc(100% / var(--z))" }}>
                    <Preview step={step} />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#080c18]" />
              </div>
            </div>
          </div>
          )}
        </div>
      </section>
    </>
  );
}
