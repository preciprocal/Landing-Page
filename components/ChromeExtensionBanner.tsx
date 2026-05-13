"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, BookmarkPlus, FileText, ArrowRight, ShieldCheck, CheckCircle2, RotateCcw } from "lucide-react";

import {
  U, STEPS, STEP_LABELS, TOTAL_FIELDS, TIMELINE, JOB_META,
  fieldsFilledInStep, type TrackerJob,
} from "@/lib/demo";
import { WorkdayPage, PreciprocalPanel } from "@/components/demo/WorkdayDemo";
import { LinkedInScreen } from "@/components/demo/LinkedinDemo";
import { JobTrackerView } from "@/components/demo/JobTracker";
import { CoverLetterView } from "@/components/demo/CoverLetterDemo";

// ── Chrome logo (official 4-colour) ──────────────────────────────────────────
function ChromeLogo({ size = 40 }: { size?: number }) {
  return (
    <img
      src="/google.png"
      alt="Chrome"
      width={size}
      height={size}
      style={{ display: "inline-block" }}
    />
  );
}

// ── Save toast ────────────────────────────────────────────────────────────────
function SaveToast({ company, visible, onViewTracker }: {
  company: string | null;
  visible: boolean;
  onViewTracker: () => void;
}) {
  return (
    <AnimatePresence>
      {visible && company && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-4 left-4 z-50 bg-[#1a1e2e] border border-white/[0.1] rounded-xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.6)] min-w-[200px]"
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-emerald-400 text-[10px] font-bold">✓</span>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-white leading-tight">
                Saved: {company}
              </p>
              <button
                onClick={onViewTracker}
                className="text-[11px] text-indigo-400 font-medium mt-0.5 cursor-pointer hover:text-indigo-300 transition-colors block"
              >
                View Tracker →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


export default function ChromeExtensionBanner() {
  const [screen, setScreen]               = useState<"linkedin" | "workday">("linkedin");
  const [tick, setTick]                   = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isDone, setIsDone]               = useState(false);
  const [appliedJobs, setAppliedJobs]     = useState<string[]>([]);
  const [savedJobs, setSavedJobs]         = useState<string[]>([]);
  const [toastCompany, setToastCompany]   = useState<string | null>(null);
  const [selectedJob, setSelectedJob]     = useState("ms");
  const [showTracker, setShowTracker]         = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [coverLetterJob, setCoverLetterJob]   = useState<{role:string;company:string} | null>(null);
  const [trackerStatuses, setTrackerStatuses] = useState<Record<string,string>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const toastRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const jobCompanyMap: Record<string, string> = {
    ms: "Morgan Stanley", msft: "Microsoft", goog: "Google", visa: "Visa",
  };

  const handleSave = (jobId: string) => {
    if (savedJobs.includes(jobId)) return;
    setSavedJobs(prev => [...prev, jobId]);
    // Show toast
    if (toastRef.current) clearTimeout(toastRef.current);
    setToastCompany(jobCompanyMap[jobId]);
    toastRef.current = setTimeout(() => setToastCompany(null), 3000);
  };

  const totalFilled = tick;
  const completion  = isDone ? 100 : Math.round((tick / TOTAL_FIELDS) * 100);
  const stepFieldsFilled = fieldsFilledInStep(TIMELINE, tick, currentStepIdx);

  // Panel checklist: Name, Phone, Email, Experience as proxies
  const panelFields = [
    { label: "Name",       filled: tick >= 2  },
    { label: "Phone",      filled: tick >= (STEPS[0].fields.length + 11) },
    { label: "Email",      filled: tick >= 3  },
    { label: "Experience", filled: tick >= (STEPS[0].fields.length + STEPS[1].fields.length + 3) },
  ];

  const reset = () => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    setScreen("linkedin");
    setTick(0);
    setCurrentStepIdx(0);
    setIsDone(false);
    setAppliedJobs([]);
    setSavedJobs([]);
    setToastCompany(null);
    setSelectedJob("ms");
    setShowTracker(false);
    setShowCoverLetter(false);
    setCoverLetterJob(null);
  };

  const handleTrackerStatusUpdate = (id: string, status: string) => {
    setTrackerStatuses(prev => ({ ...prev, [id]: status }));
  };

  const startFilling = () => {
    // Schedule every fill event
    let t = 0;
    STEPS.slice(0, -1).forEach((step, si) => {
      step.fields.forEach((_, fi) => {
        const id = setTimeout(() => {
          setTick(prev => prev + 1);
        }, t);
        timerRef.current.push(id);
        t += 370;
      });
      // Advance stepper after last field of this step
      const advId = setTimeout(() => {
        setCurrentStepIdx(si + 1);
      }, t);
      timerRef.current.push(advId);
      t += 400;
    });
    // Done
    const doneId = setTimeout(() => {
      setIsDone(true);
      setAppliedJobs(prev => prev.includes(selectedJob) ? prev : [...prev, selectedJob]);
    }, t);
    timerRef.current.push(doneId);
  };

  const isFilling = screen === "workday" && tick > 0 && !isDone;

  const jobMeta: Record<string, {company:string;title:string;initial:string;color:string;source:string;url:string;workType:string}> = {
    ms:   {company:"Morgan Stanley",title:"Associate, LCD Data and Analytics",initial:"M",color:"bg-[#1a2744]",source:"chrome_extension",url:"https://www.linkedin.com/jobs/search/?currentJobId=123",workType:"Onsite"},
    msft: {company:"Microsoft",     title:"Applied Scientist",                initial:"M",color:"bg-[#0078d4]",source:"chrome_extension",url:"https://www.linkedin.com/jobs/search/?currentJobId=456",workType:"Onsite"},
    goog: {company:"Google",        title:"Data Scientist",                   initial:"G",color:"bg-white",    source:"chrome_extension",url:"https://www.linkedin.com/jobs/search/?currentJobId=789",workType:"Onsite"},
    visa: {company:"Visa",          title:"Data Scientist - VCS",             initial:"V",color:"bg-[#1a1f71]",source:"chrome_extension",url:"https://www.linkedin.com/jobs/search/?currentJobId=012",workType:"Onsite"},
  };

  const trackerJobs: TrackerJob[] = [...savedJobs, ...appliedJobs.filter(id => !savedJobs.includes(id))].map(id => ({
    id,
    ...jobMeta[id],
    status: appliedJobs.includes(id) ? (trackerStatuses[id] ?? "Applied") : (trackerStatuses[id] ?? "Wishlist"),
    date: "today",
  }));

  // URL bar
  const urlMap: Record<string, string> = {
    linkedin: "linkedin.com/jobs/search?keywords=data+scientist&location=United+States",
    workday:  isDone
      ? "morganstanley.wd.com/job/associate-lcd-analytics/review"
      : "morganstanley.wd.com/job/associate-lcd-analytics/application",
  };

  return (
    <section id="extension" aria-label="Chrome Extension" className="relative overflow-hidden py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050810] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050810] to-transparent pointer-events-none" />

      {/* Floating ambient orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-[20%] w-[420px] h-[420px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute right-[10%] bottom-[15%] w-[350px] h-[350px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-indigo-500/3 blur-[80px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Divider */}
        <div className="flex items-center gap-4 mb-20">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"
          />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        </div>

        <div className="flex flex-col gap-16">

          {/* ── COPY ROW ── */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left col */}
            <div>
              {/* Badge with shimmer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="relative inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6 overflow-hidden"
              >
                {/* Shimmer sweep */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent skew-x-12 pointer-events-none"
                />
                <ChromeLogo size={16} />
                <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest">Chrome Extension</span>
                <span className="h-3.5 w-px bg-indigo-500/30" />
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">Free forever</span>
              </motion.div>

              {/* Headline: staggered line reveal */}
              <div className="mb-5">
                <motion.h2
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl md:text-[44px] font-extrabold text-white tracking-tight leading-[1.08]"
                >
                  You deserve a job,
                </motion.h2>
                <motion.h2
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.22, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl md:text-[44px] font-extrabold tracking-tight leading-[1.08]"
                >
                  <span className="text-gradient">not a second job applying.</span>
                </motion.h2>
              </div>

              {/* Empathy paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-[15px] text-slate-400 leading-relaxed mb-4"
              >
                You have sent 40 applications. You have typed your address 40 times.
                Your phone number, 40 times. The same LinkedIn URL, work authorization,
                graduation year, <span className="text-slate-300 font-medium">40 times</span>.
                And most of those forms never even got a reply.
              </motion.p>

              {/* The turn */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.38, duration: 0.5 }}
                className="text-[15px] text-slate-300 leading-relaxed mb-8 font-medium"
              >
                Preciprocal reads the form and fills every field for you, instantly,
                step by step, on every job board. The demo below is a real Workday form.
                Watch it complete itself.
              </motion.p>

              {/* CTA with magnetic hover feel */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.44, duration: 0.5 }}
              >
                <motion.a
                  href="https://chromewebstore.google.com/detail/iiomkjnpkaefapdajnabiljngkjddmoi?utm_source=landing-page"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="group inline-flex items-center gap-3 bg-white text-[#050810] font-bold text-[14px] px-6 py-3.5 rounded-xl shadow-[0_4px_24px_rgba(255,255,255,0.12)] mb-3 cursor-pointer"
                >
                  <ChromeLogo size={22} />
                  Add to Chrome, it&apos;s free
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={14} />
                  </motion.span>
                </motion.a>

                <p className="text-[12px] text-slate-500 mb-2">
                  Takes 15 seconds to install. Works immediately on every tab.
                </p>
                <div className="flex items-center gap-4">
                  {[
                    "No account needed",
                    "Never reads passwords",
                    "Cancel anytime",
                  ].map((text, i) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.55 + i * 0.08, duration: 0.3 }}
                      className="flex items-center gap-1.5 text-[11px] text-slate-500"
                    >
                      <ShieldCheck size={11} className="text-slate-600" />
                      {text}
                      {i < 2 && <span className="ml-4 text-slate-700">·</span>}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>{/* end left col */}

            {/* Right col: benefit cards with hover lift */}
            <div className="flex flex-col gap-5 lg:pt-4">
              {[
                {
                  icon: <Zap size={16} className="text-indigo-400" />,
                  title: "Apply in 45 seconds, not 45 minutes",
                  body: "Every Workday step filled automatically. Autofill, My Info, Experience, Questions, Disclosures. The form never had a chance.",
                  delay: 0.28,
                },
                {
                  icon: <BookmarkPlus size={16} className="text-indigo-400" />,
                  title: "Your pipeline, organized without lifting a finger",
                  body: "Every job you apply to lands in your tracker automatically. Role, company, salary, JD. No spreadsheet. No copy-paste. No forgetting.",
                  delay: 0.38,
                },
                {
                  icon: <FileText size={16} className="text-indigo-400" />,
                  title: "A cover letter that actually sounds like you got the memo",
                  body: "AI reads the real job post and writes to it specifically. Not a generic template with your name swapped in. Recruiters can tell the difference.",
                  delay: 0.48,
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: card.delay, duration: 0.55, ease: [0.16,1,0.3,1] }}
                  whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.25)" }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] transition-colors cursor-default"
                >
                  <motion.span
                    whileHover={{ scale: 1.12, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center"
                  >
                    {card.icon}
                  </motion.span>
                  <div>
                    <p className="text-[14px] font-semibold text-white leading-snug">{card.title}</p>
                    <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">{card.body}</p>
                  </div>
                </motion.div>
              ))}

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-[11px] text-slate-600 pl-1"
              >
                Works on LinkedIn, Workday, Greenhouse, Lever, Ashby, and 40+ job boards.
              </motion.p>
            </div>
          </div>

          {/* ── FULL-WIDTH LIVE DEMO ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
          >
            {/* Pulsing glow behind the frame */}
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-3 bg-indigo-500/8 blur-3xl rounded-3xl pointer-events-none"
            />

            {/* Label row */}
            <div className="flex items-center justify-between mb-2.5 px-1">
              <div className="flex items-center gap-2">
                <motion.span animate={{ opacity: [0.4,1,0.4] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest">
                  {showTracker ? "Job Tracker" : showCoverLetter ? "Cover Letter" : "Live demo"}
                </span>
              </div>
              {(showTracker || showCoverLetter) ? (
                <button
                  onClick={() => { setShowTracker(false); setShowCoverLetter(false); setCoverLetterJob(null); }}
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors"
                >
                  <RotateCcw size={10} /> Back to demo
                </button>
              ) : screen !== "linkedin" ? (
                <motion.button
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={() => {
                    timerRef.current.forEach(clearTimeout);
                    timerRef.current = [];
                    setScreen("linkedin");
                    setTick(0);
                    setCurrentStepIdx(0);
                    setIsDone(false);
                  }}
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <RotateCcw size={10} /> Back to jobs
                </motion.button>
              ) : null}
            </div>

            <AnimatePresence mode="wait">
              {showTracker ? (
                <motion.div
                  key="tracker"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-white/[0.1] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
                  style={{ height: 560 }}
                >
                  <JobTrackerView
                    jobs={trackerJobs}
                    appliedJobs={appliedJobs}
                    onUpdateStatus={handleTrackerStatusUpdate}
                  />
                </motion.div>
              ) : showCoverLetter ? (
                <motion.div
                  key="coverletter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-white/[0.1] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
                  style={{ height: 560 }}
                >
                  <CoverLetterView
                    prefillRole={coverLetterJob?.role ?? ""}
                    prefillCompany={coverLetterJob?.company ?? ""}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="demo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  {/* Browser frame */}
                  <div
                    className="rounded-2xl border border-white/[0.1] bg-[#0d1117] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
                    style={{ height: 560 }}
                  >
                    {/* Browser chrome bar */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#1e2433] border-b border-white/[0.06] flex-shrink-0">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 mx-2 bg-white/[0.05] rounded px-2.5 py-1 flex items-center gap-1.5 overflow-hidden">
                        <div className="w-2 h-2 rounded-full bg-green-400/60 flex-shrink-0" />
                        <span className="text-[9px] text-slate-500 font-mono truncate">{urlMap[screen]}</span>
                      </div>
                      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center opacity-60">
                        <ChromeLogo size={13} />
                      </div>
                    </div>

                    {/* Page area */}
                    <div style={{ height: "calc(560px - 36px)" }} className="overflow-hidden relative">
                      <AnimatePresence mode="wait">
                        {screen === "linkedin" ? (
                          <motion.div
                            key="li"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, x: -16 }}
                            transition={{ duration: 0.3 }}
                            className="h-full relative"
                          >
                            <LinkedInScreen
                              onAutoApply={() => {
                                setTick(0);
                                setCurrentStepIdx(0);
                                setIsDone(false);
                                setScreen("workday");
                              }}
                              onCoverLetter={(role, company) => {
                                setCoverLetterJob({ role, company });
                                setShowCoverLetter(true);
                              }}
                              appliedJobs={appliedJobs}
                              savedJobs={savedJobs}
                              onSave={handleSave}
                              selectedJob={selectedJob}
                              onSelectJob={job => {
                                setSelectedJob(job);
                                setTick(0);
                                setCurrentStepIdx(0);
                                setIsDone(false);
                              }}
                            />
                            <SaveToast
                              company={toastCompany}
                              visible={!!toastCompany}
                              onViewTracker={() => {
                                setToastCompany(null);
                                setShowTracker(true);
                              }}
                            />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="wd"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
                            className="h-full relative overflow-hidden"
                          >
                            <WorkdayPage
                              stepIdx={isDone ? STEPS.length - 1 : currentStepIdx}
                              fieldsFilled={stepFieldsFilled}
                            />
                            <motion.div
                              initial={{ opacity: 0, y: 16, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: 0.2, duration: 0.4, ease: [0.16,1,0.3,1] }}
                              className="absolute bottom-4 right-4 z-30"
                            >
                              <PreciprocalPanel
                                isFilling={isFilling}
                                isDone={isDone}
                                totalFilled={totalFilled}
                                completion={completion}
                                currentStepIdx={currentStepIdx}
                                onAutofill={startFilling}
                                panelFields={panelFields}
                              />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Done callout */}
                  <AnimatePresence>
                    {isDone && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.2, duration: 0.5, ease: [0.16,1,0.3,1] }}
                        className="absolute -bottom-6 -left-4 bg-[#0e1420] border border-emerald-500/25 rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-xl"
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-[12px] font-bold text-white">20 fields. 100% complete.</p>
                          <p className="text-[10px] text-slate-500">Application ready to submit.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>{/* end flex col */}
      </div>
    </section>
  );
}