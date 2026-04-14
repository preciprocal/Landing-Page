"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Video, Pen, Calendar, Briefcase, Sparkles, BookOpen,
  ChevronRight, RotateCcw, User, Upload, Wand2, Search,
  Send, Play, Target, MousePointer2, MapPin, Building2,
  DollarSign, Clock, ExternalLink, Bookmark,
} from "lucide-react";

import { ResumeExamplePreview } from "@/components/examples/ResumePreview";
import { CoverLetterExamplePreview } from "@/components/examples/CoverLetterPreview";
import { InterviewExamplePreview } from "@/components/examples/InterviewPreview";
import { PlannerExamplePreview } from "@/components/examples/PlannerPreview";
import { CareerToolsExamplePreview } from "@/components/examples/CareerToolsPreview";
import { DebriefExamplePreview } from "@/components/examples/DebriefPreview";
import { JobTrackerExamplePreview } from "@/components/examples/JobTrackerPreview";

// ═══════════════════════════════════════════════════════════════════════════════
// LINKEDIN ICON (custom SVG)
// ═══════════════════════════════════════════════════════════════════════════════

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PULSING HIGHLIGHT WRAPPER — wraps buttons user needs to click
// ═══════════════════════════════════════════════════════════════════════════════

function PulseHighlight({ children, active, className = "" }: {
  children: React.ReactNode; active: boolean; className?: string;
}) {
  if (!active) return <div className={className}>{children}</div>;
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Outer glow — matches JobTracker highlight */}
      <div className="absolute -inset-1.5 rounded-2xl bg-purple-500/[0.08] blur-lg pointer-events-none" />
      <div className="absolute -inset-0.5 rounded-xl border border-purple-500/40 shadow-[0_0_20px_rgba(139,92,246,0.15)] pointer-events-none animate-pulse" />
      <div className="relative">{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// OPENING SCENE — Arjun finds Meta listing on LinkedIn
// ═══════════════════════════════════════════════════════════════════════════════

function LinkedInJobListing({ onApply }: { onApply: () => void }) {
  const [showListing, setShowListing] = useState(false);
  const [showArjun, setShowArjun] = useState(false);
  const [showThought, setShowThought] = useState(false);
  const [highlightApply, setHighlightApply] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowArjun(true), 500);
    const t2 = setTimeout(() => setShowListing(true), 1800);
    const t3 = setTimeout(() => setShowThought(true), 3500);
    const t4 = setTimeout(() => setHighlightApply(true), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="flex items-center justify-center"
      style={{ minHeight: 480 }}
    >
      <div className="max-w-2xl w-full px-4">
        {/* Arjun intro */}
        <AnimatePresence>
          {showArjun && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 flex-shrink-0">
                <span className="text-[16px] font-bold text-white">A</span>
              </div>
              <div>
                <p className="text-[13px] font-bold text-white">Arjun Patel</p>
                <p className="text-[10px] text-slate-500">MS Computer Science, Boston University · 347 applications · 0 offers · 90 days on OPT</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thought bubble */}
        <AnimatePresence>
          {showThought && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-4 ml-13">
              <div className="inline-block px-4 py-2 rounded-2xl rounded-bl-sm bg-white/[0.04] border border-white/[0.06]">
                <p className="text-[12px] text-slate-300 italic">&ldquo;Data Scientist at Meta. 347 rejections so far. Time to try a different approach.&rdquo;</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LinkedIn Job Card */}
        <AnimatePresence>
          {showListing && (
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", damping: 20 }}>
              <div className="bg-[#0d1526]/90 border border-white/[0.08] rounded-2xl overflow-hidden">
                {/* LinkedIn header bar */}
                <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.06] bg-blue-500/[0.04]">
                  <LinkedInIcon className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] text-blue-400 font-semibold">LinkedIn · Jobs</span>
                  <span className="ml-auto text-[9px] text-slate-600">linkedin.com/jobs</span>
                </div>

                {/* Job listing */}
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Meta logo */}
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-[20px] font-extrabold text-white">M</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-[17px] font-bold text-white mb-0.5">Data Scientist, Product Analytics</h3>
                      <p className="text-[13px] text-blue-400 font-medium mb-2">Meta</p>

                      <div className="flex items-center gap-3 flex-wrap mb-3">
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <MapPin className="w-3 h-3" /> Menlo Park, CA
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Building2 className="w-3 h-3" /> On-site
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <DollarSign className="w-3 h-3" /> $160K – $200K
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Clock className="w-3 h-3" /> Posted 4 days ago
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                        As a Data Scientist at Meta, you will shape the future of people-facing and business-facing products. Work with one of the richest data sets in the world, apply data analysis and ML to product development, and use your expertise to build scalable solutions for billions of users.
                      </p>

                      <div className="flex items-center gap-2 flex-wrap mb-4">
                        {["Python", "SQL", "A/B Testing", "Machine Learning", "Product Analytics", "Spark"].map(skill => (
                          <span key={skill} className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-blue-500/[0.08] border border-blue-500/15 text-blue-300">{skill}</span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <PulseHighlight active={highlightApply}>
                          <button
                            onClick={onApply}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-semibold text-white
                              bg-purple-600 border border-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.4)]
                              hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300 cursor-pointer animate-pulse"
                          >
                            Apply with Preciprocal <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </PulseHighlight>
                        <button className="px-4 py-2.5 rounded-xl text-[12px] font-medium text-slate-400 bg-white/[0.04] border border-white/[0.06]">
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {highlightApply && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="mt-2 text-[10px] text-indigo-400 flex items-center gap-1"
                        >
                          <MousePointer2 className="w-3 h-3" /> Click to begin
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATION CARD
// ═══════════════════════════════════════════════════════════════════════════════

interface Chapter {
  id: string;
  title: string;
  icon: React.ElementType;
  gradient: string;
  narration: string;
  ctaLabel: string;
  ctaIcon: React.ElementType;
  completedLabel: string;
  stepDurations: number[];
  waitForUser?: boolean; // If true, show "Continue" button instead of auto-advancing
  waitMessage?: string;  // Message shown next to Continue button
  render: (step: number) => React.ReactNode;
}

function NarrationCard({ chapter, chapterNum, total, onAction }: {
  chapter: Chapter; chapterNum: number; total: number; onAction: () => void;
}) {
  const [lineIdx, setLineIdx] = useState(0);
  const [ctaReady, setCtaReady] = useState(false);
  const lines = chapter.narration.split(". ").map(s => s.endsWith(".") ? s : s + ".");
  const Icon = chapter.icon;
  const CtaIcon = chapter.ctaIcon;

  useEffect(() => { setLineIdx(0); setCtaReady(false); }, [chapter.id]);

  useEffect(() => {
    if (lineIdx >= lines.length) {
      const t = setTimeout(() => setCtaReady(true), 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIdx(p => p + 1), 500 + lines[lineIdx].length * 10);
    return () => clearTimeout(t);
  }, [lineIdx, lines]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }}
      className="flex items-center justify-center relative" style={{ minHeight: 460 }}>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full blur-[80px] opacity-15 bg-gradient-to-br ${chapter.gradient}`} />

      <div className="relative max-w-lg text-center px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-2.5 mb-6">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${chapter.gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <p className="text-[9px] text-slate-600 uppercase tracking-widest font-semibold">Step {chapterNum} of {total}</p>
            <p className="text-[15px] font-bold text-white leading-tight">{chapter.title}</p>
          </div>
        </motion.div>

        <div className="space-y-2 mb-8">
          {lines.map((line, i) => (
            <motion.p key={i}
              initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
              animate={{ opacity: i < lineIdx ? 1 : 0, y: i < lineIdx ? 0 : 6, filter: i < lineIdx ? "blur(0px)" : "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`text-[15px] leading-relaxed ${
                i === lines.length - 1 ? "font-semibold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent" : "text-slate-400"
              }`}>
              {line.trim()}
            </motion.p>
          ))}
        </div>

        <AnimatePresence>
          {ctaReady && (
            <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}>
              <PulseHighlight active={true}>
                <button onClick={onAction}
                  className={`group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-[13px] font-semibold text-white
                    bg-purple-600 border border-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.4)] animate-pulse
                    hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:-translate-y-0.5
                    transition-all duration-300 cursor-pointer`}>
                  <CtaIcon className="w-4 h-4" />
                  {chapter.ctaLabel}
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </PulseHighlight>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                className="mt-3 text-[10px] text-slate-600 flex items-center justify-center gap-1">
                <MousePointer2 className="w-3 h-3" /> Click to continue
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTERS
// ═══════════════════════════════════════════════════════════════════════════════

const CHAPTERS: Chapter[] = [
  {
    id: "resume",
    title: "Fix His Resume",
    icon: FileText,
    gradient: "from-purple-600 to-indigo-600",
    narration: "347 applications with the same resume. Zero callbacks. Before applying, Arjun needs to know what's holding him back.",
    ctaLabel: "Scan Resume",
    ctaIcon: Upload,
    completedLabel: "Resume scored 75/100",
    stepDurations: [800, 1800, 1800, 1800, 1800, 1800, 1200],
    waitForUser: true,
    waitMessage: "Try applying the fixes, then continue",
    render: (step) => <ResumeExamplePreview step={step} />,
  },
  {
    id: "cover-letter",
    title: "Write the Cover Letter",
    icon: Pen,
    gradient: "from-blue-600 to-cyan-600",
    narration: "75/100. Weak verbs, missing summary, no metrics. But Meta needs a cover letter. Not the generic one he's been reusing.",
    ctaLabel: "Generate Cover Letter",
    ctaIcon: Wand2,
    completedLabel: "Meta cover letter done",
    stepDurations: [1500, 1200, 1500, 2500],
    waitForUser: true,
    waitMessage: "Review the cover letter, then continue",
    render: (step) => <CoverLetterExamplePreview step={step} />,
  },
  {
    id: "career-tools",
    title: "Fix LinkedIn & Send Outreach",
    icon: Sparkles,
    gradient: "from-violet-600 to-purple-600",
    narration: "Cover letter ready. But his LinkedIn reads 'Aspiring Data Scientist | Open to Work.' No recruiter will reach out to that. He also needs warm intros.",
    ctaLabel: "Optimize LinkedIn",
    ctaIcon: Sparkles,
    completedLabel: "LinkedIn 42 to 84, emails sent",
    stepDurations: [1800, 1500, 3500, 2800, 1500, 3500],
    waitForUser: true,
    waitMessage: "Explore the results, then continue",
    render: (step) => <CareerToolsExamplePreview step={step} />,
  },
  {
    id: "job-tracker",
    title: "Track the Application",
    icon: Briefcase,
    gradient: "from-amber-600 to-orange-600",
    narration: "LinkedIn fixed, outreach sent. Now Arjun adds Meta to his tracker. AI finds the right contacts inside Meta.",
    ctaLabel: "Add to Tracker",
    ctaIcon: Search,
    completedLabel: "Meta tracked, 3 contacts found",
    stepDurations: [2000, 1000, 1800, 2200, 2200, 2200, 4500, 2800],
    waitForUser: true,
    waitMessage: "Try finding contacts, then continue",
    render: (step) => <JobTrackerExamplePreview step={step} />,
  },
  {
    id: "planner",
    title: "Prepare for the Interview",
    icon: Calendar,
    gradient: "from-emerald-600 to-teal-600",
    narration: "Meta replied. Technical interview in two weeks. Arjun hasn't touched LeetCode in months. He needs a structured plan.",
    ctaLabel: "Build Study Plan",
    ctaIcon: Target,
    completedLabel: "7-day prep ready",
    stepDurations: [1800, 1500, 3200, 3500, 3500, 5000, 5500, 2000],
    waitForUser: true,
    waitMessage: "Browse the plan and try the AI coach, then continue",
    render: (step) => <PlannerExamplePreview step={step} />,
  },
  {
    id: "interview",
    title: "Practice the Interview",
    icon: Video,
    gradient: "from-rose-600 to-pink-600",
    narration: "Day 7. Interview is tomorrow. One last mock. Full panel: HR, tech lead, developer. The system design question he dreads.",
    ctaLabel: "Start Mock Interview",
    ctaIcon: Play,
    completedLabel: "Mock done, 78/100",
    stepDurations: [2000, 1800, 1800, 4000, 4000, 2200, 3500],
    waitForUser: true,
    waitMessage: "Join the interview and explore the feedback, then continue",
    render: (step) => <InterviewExamplePreview step={step} />,
  },
  {
    id: "debrief",
    title: "Debrief & Result",
    icon: BookOpen,
    gradient: "from-violet-600 to-indigo-600",
    narration: "Mock done. He knows the gap now. After his real Meta screen, he logs it. AI spots the pattern. Three weeks later, the email arrives.",
    ctaLabel: "See the Result",
    ctaIcon: BookOpen,
    completedLabel: "$165K offer",
    stepDurations: [4000, 1800, 3500, 3500, 1800, 4000],
    waitForUser: true,
    waitMessage: "Explore the journal and analysis, then continue",
    render: (step) => <DebriefExamplePreview step={step} />,
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

export default function HeroProductDemo() {
  const [phase, setPhase] = useState<"intro" | "listing" | "narration" | "demo" | "complete">("intro");
  const [activeChapter, setActiveChapter] = useState(0);
  const [step, setStep] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const chapter = CHAPTERS[activeChapter];
  const totalSteps = chapter.stepDurations.length;
  const isChapterComplete = phase === "demo" && step >= totalSteps;
  const isStoryComplete = activeChapter === CHAPTERS.length - 1 && isChapterComplete;
  const isWaiting = isChapterComplete && chapter.waitForUser;

  // Demo step advancement
  useEffect(() => {
    if (phase !== "demo") return;
    if (step >= totalSteps) {
      // Chapter complete — if waitForUser, don't auto-advance (user clicks Continue)
      if (chapter.waitForUser) return;

      timerRef.current = setTimeout(() => {
        if (activeChapter < CHAPTERS.length - 1) {
          setActiveChapter(prev => prev + 1);
          setPhase("narration");
          setStep(0);
        } else {
          setPhase("complete");
        }
      }, 2000);
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }
    timerRef.current = setTimeout(() => setStep(s => s + 1), chapter.stepDurations[step]);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, step, totalSteps, activeChapter, chapter]);

  const handleBeginStory = useCallback(() => setPhase("listing"), []);
  const handleApplyFromListing = useCallback(() => { setPhase("narration"); setActiveChapter(0); setStep(0); }, []);
  const handleStartDemo = useCallback(() => { setPhase("demo"); setStep(0); }, []);

  // User clicks "Continue" after interacting with a waitForUser chapter
  const handleContinueFromWait = useCallback(() => {
    if (activeChapter < CHAPTERS.length - 1) {
      setActiveChapter(prev => prev + 1);
      setPhase("narration");
      setStep(0);
    } else {
      setPhase("complete");
    }
  }, [activeChapter]);

  const jumpToChapter = useCallback((idx: number) => {
    setActiveChapter(idx);
    setPhase("narration");
    setStep(0);
  }, []);

  const replay = useCallback(() => {
    setActiveChapter(0);
    setPhase("intro");
    setStep(0);
  }, []);

  // Progress
  const totalAllSteps = CHAPTERS.reduce((sum, c) => sum + c.stepDurations.length, 0);
  const completedSteps = CHAPTERS.slice(0, activeChapter).reduce((sum, c) => sum + c.stepDurations.length, 0)
    + (phase === "demo" || phase === "complete" ? Math.min(step, totalSteps) : 0);
  const overallProgress = totalAllSteps > 0 ? (completedSteps / totalAllSteps) * 100 : 0;

  return (
    <section className="relative pb-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            See Preciprocal in action
          </h2>
          <p className="text-[14px] text-slate-400 max-w-lg mx-auto">
            Follow Arjun from 347 rejections to a Meta offer. Every tool, one candidate, real results.
          </p>
        </motion.div>

        {/* Progress + pills (only after listing) */}
        {phase !== "intro" && phase !== "listing" && (
          <div className="mb-4">
            <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden mb-3">
              <motion.div className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6366f1, #a855f7, #10b981)" }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.5 }} />
            </div>

            <div className="flex gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {CHAPTERS.map((ch, i) => {
                const ChIcon = ch.icon;
                const isActive = activeChapter === i;
                const isDone = i < activeChapter || (i === activeChapter && (isChapterComplete || phase === "complete"));
                return (
                  <button key={ch.id} onClick={() => jumpToChapter(i)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[9px] font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                      isActive ? `bg-gradient-to-r ${ch.gradient} text-white border-transparent shadow-lg`
                      : isDone ? "bg-emerald-500/[0.06] border-emerald-500/15 text-emerald-400"
                      : "bg-white/[0.015] border-white/[0.05] text-slate-600 hover:text-slate-300"
                    }`}>
                    {isDone && !isActive
                      ? <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                      : <ChIcon className="w-2.5 h-2.5" />}
                    <span className="hidden sm:inline">{isDone && !isActive ? ch.completedLabel : ch.title}</span>
                    <span className="sm:hidden">{i + 1}</span>
                  </button>
                );
              })}
              {phase === "complete" && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={replay}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[9px] font-semibold whitespace-nowrap bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 cursor-pointer">
                  <RotateCcw className="w-2.5 h-2.5" /> Replay
                </motion.button>
              )}
            </div>
          </div>
        )}

        {/* Context bar during demo */}
        {phase === "demo" && (
          <motion.div key={`ctx-${activeChapter}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-3 px-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${chapter.gradient} flex items-center justify-center flex-shrink-0`}>
              <chapter.icon className="w-3 h-3 text-white" />
            </div>
            <span className="text-[10px] font-bold text-white flex-1">{chapter.title}</span>
            <div className="flex gap-0.5 flex-shrink-0">
              {chapter.stepDurations.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i < step ? "bg-emerald-400" : i === step ? "bg-indigo-400 animate-pulse" : "bg-white/[0.08]"
                }`} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Content */}
        <div className="rounded-2xl bg-[#0a0f1e]/90 border border-white/[0.06] overflow-hidden relative backdrop-blur-sm">
          <div className="relative" style={{ minHeight: 480 }}>
            <AnimatePresence mode="wait">

              {/* Intro */}
              {phase === "intro" && (
                <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                  className="flex items-center justify-center" style={{ minHeight: 480 }}>
                  <div className="max-w-md text-center px-6">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring", damping: 15 }}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-500/20">
                      <span className="text-[22px] font-bold text-white">A</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                      <p className="text-[11px] text-indigo-400 font-semibold uppercase tracking-widest mb-2">Interactive Demo</p>
                      <h3 className="text-[22px] font-extrabold text-white mb-3 leading-tight">Follow Arjun&apos;s job search</h3>
                      <p className="text-[13px] text-slate-400 leading-relaxed mb-2">
                        MS in CS, Boston University. Internships at Datadog, Wayfair, Cognizant. 347 applications, zero offers. 90 days left on his OPT visa.
                      </p>
                      <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
                        He just found his dream role on LinkedIn. Watch how Preciprocal changes the outcome.
                      </p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                      <PulseHighlight active={true}>
                        <button onClick={handleBeginStory}
                          className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-[14px] font-semibold text-white
                            bg-purple-600 border border-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.4)] animate-pulse
                            hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300 cursor-pointer">
                          View the Job Listing
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </PulseHighlight>
                      <p className="mt-3 text-[10px] text-slate-600">Interactive walkthrough · ~3 min</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* LinkedIn listing */}
              {phase === "listing" && (
                <LinkedInJobListing key="listing" onApply={handleApplyFromListing} />
              )}

              {/* Narration */}
              {phase === "narration" && (
                <NarrationCard key={`narr-${activeChapter}`} chapter={chapter} chapterNum={activeChapter + 1}
                  total={CHAPTERS.length} onAction={handleStartDemo} />
              )}

              {/* Demo */}
              {phase === "demo" && (
                <motion.div key={`demo-${chapter.id}`} initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="p-4">
                  {chapter.render(step)}

                  {/* Continue bar — shows when waitForUser chapter completes */}
                  <AnimatePresence>
                    {isWaiting && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, type: "spring", damping: 20 }}
                        className="mt-4 p-3 bg-purple-500/[0.06] border border-purple-500/20 rounded-xl flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <MousePointer2 className="w-3.5 h-3.5 text-purple-400" />
                          <p className="text-[11px] text-slate-300">
                            {chapter.waitMessage || "Explore the results, then continue"}
                          </p>
                        </div>
                        <PulseHighlight active={true}>
                          <button
                            onClick={handleContinueFromWait}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-semibold text-white
                              bg-purple-600 border border-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.4)]
                              hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:-translate-y-0.5
                              transition-all duration-300 cursor-pointer"
                          >
                            Continue <ChevronRight className="w-3 h-3" />
                          </button>
                        </PulseHighlight>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Complete */}
              {phase === "complete" && (
                <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center justify-center" style={{ minHeight: 480 }}>
                  <div className="max-w-lg text-center px-6">
                    <motion.p initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", damping: 12 }} className="text-[48px] mb-4">🎉</motion.p>
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                      <h3 className="text-[22px] font-extrabold text-white mb-2">Arjun got the offer.</h3>
                      <p className="text-[15px] text-slate-400 mb-1">$165K Data Scientist at Meta.</p>
                      <p className="text-[13px] text-slate-500 mb-1">347 rejections. 3 interviews. 1 offer.</p>
                      <p className="text-[13px] text-indigo-300/60 mb-6">Your turn.</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                      className="flex items-center justify-center gap-3">
                      <a href="https://app.preciprocal.com/sign-up"
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-[14px] font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(99,102,241,0.3)] transition-all">
                        Get Started <ChevronRight className="w-4 h-4" />
                      </a>
                      <button onClick={replay}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[13px] font-medium bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:bg-white/[0.08] transition-all cursor-pointer">
                        <RotateCcw className="w-3.5 h-3.5" /> Watch Again
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-indigo-500/[0.03] rounded-full blur-[100px] pointer-events-none -z-10" />
      </div>
    </section>
  );
}