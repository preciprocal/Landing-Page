"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Video, Calendar, Send, Briefcase, Edit3,
  CheckCircle2, AlertTriangle, Star, Users, Zap,
  Search, Mail, UserSearch, Target, Clock,
} from "lucide-react";

/* ─── Shared ─── */
function Card({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl border border-white/[0.06] bg-[#0a0f1e]/80 overflow-hidden group hover:border-indigo-500/20 transition-colors duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function MiniRing({ score, size = 44, color = "#a855f7", animDelay = 0 }: { score: number; size?: number; color?: string; animDelay?: number }) {
  const r = (size - 5) / 2;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setOffset(circ * (1 - score / 100)), animDelay); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [score, circ, animDelay]);
  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={3} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={3}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[12px] font-bold text-white">{score}</span>
      </div>
    </div>
  );
}

function AnimBar({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setW(value), delay); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, delay]);
  return (
    <div ref={ref} className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${w}%`, transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)" }} />
    </div>
  );
}

/* ─── Resume Analyser (animated scanning) ─── */
function ResumeCard() {
  const [scanLine, setScanLine] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [activeCategory, setActiveCategory] = useState(-1);

  useEffect(() => {
    // Scanning animation
    const scanInterval = setInterval(() => {
      setScanLine(p => { if (p >= 100) { clearInterval(scanInterval); setShowResults(true); return 100; } return p + 2; });
    }, 40);
    return () => clearInterval(scanInterval);
  }, []);

  useEffect(() => {
    if (!showResults) return;
    const timers = [0, 1, 2, 3].map((i) => setTimeout(() => setActiveCategory(i), 200 + i * 300));
    return () => timers.forEach(clearTimeout);
  }, [showResults]);

  const cats = [
    { label: "ATS Compatibility", score: 75, color: "bg-amber-500", tag: "Good", tagColor: "text-amber-400 bg-amber-500/10" },
    { label: "Content Quality", score: 78, color: "bg-purple-500", tag: "Good", tagColor: "text-purple-400 bg-purple-500/10" },
    { label: "Structure & Format", score: 65, color: "bg-red-500", tag: "Needs Work", tagColor: "text-red-400 bg-red-500/10" },
    { label: "Skills & Keywords", score: 80, color: "bg-emerald-500", tag: "Strong", tagColor: "text-emerald-400 bg-emerald-500/10" },
  ];

  return (
    <Card className="md:col-span-3" delay={0}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-white">Resume Analyser</h3>
            <p className="text-[11px] text-slate-500">See your resume through a recruiter&apos;s eyes</p>
          </div>
          <div className="ml-auto">
            {showResults && (
              <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                <Star className="w-2.5 h-2.5" /> 75/100
              </motion.span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          {/* Mini resume with scan line */}
          <div className="w-[35%] flex-shrink-0 relative">
            <div className="bg-white rounded-lg p-3 text-[6px] text-gray-700 leading-[1.6] relative overflow-hidden">
              <p className="text-center text-[8px] font-bold text-gray-900 uppercase">Alex Chen</p>
              <p className="text-center text-[5px] text-gray-400 mt-0.5">alex.chen@email.com | Boston, MA</p>
              <p className="font-bold text-[6px] text-gray-900 uppercase border-b border-gray-200 pb-0.5 mt-1.5 mb-0.5">Experience</p>
              <p className="font-semibold text-[5.5px] text-gray-800">Datadog — Software Engineer</p>
              <p className="text-[5px] text-gray-500 ml-1">• Built real-time pipeline processing 2M+ events/sec</p>
              <p className="text-[5px] text-gray-500 ml-1">• Deployed K8s microservices, 99.8% uptime</p>
              <p className="font-semibold text-[5.5px] text-gray-800 mt-1">Wayfair — Data Engineering</p>
              <p className="text-[5px] text-gray-500 ml-1">• ETL pipeline with Airflow, 500GB+ daily</p>
              <p className="font-bold text-[6px] text-gray-900 uppercase border-b border-gray-200 pb-0.5 mt-1.5 mb-0.5">Skills</p>
              <p className="text-[5px] text-gray-500">Python, Java, Go, React, K8s, AWS, Kafka</p>

              {/* Scan line */}
              {!showResults && (
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-purple-500/60 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                  style={{ top: `${scanLine}%` }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0 space-y-2">
            {!showResults ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-2" />
                  <p className="text-[10px] text-purple-400 font-medium">Scanning resume…</p>
                  <p className="text-[8px] text-slate-600">{scanLine}% complete</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 p-2.5 bg-white/[0.03] border border-white/[0.05] rounded-xl">
                  <MiniRing score={75} size={44} color="#a855f7" animDelay={200} />
                  <div>
                    <p className="text-[11px] font-bold text-white">Overall Score</p>
                    <p className="text-[9px] text-amber-400">Good — room to improve</p>
                  </div>
                </div>
                {cats.map((cat, i) => (
                  <motion.div key={cat.label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={activeCategory >= i ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4 }}
                    className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-semibold text-slate-300">{cat.label}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-white">{cat.score}</span>
                        <span className={`text-[7px] px-1 py-0.5 rounded font-semibold ${cat.tagColor}`}>{cat.tag}</span>
                      </div>
                    </div>
                    <AnimBar value={activeCategory >= i ? cat.score : 0} color={cat.color} delay={0} />
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
                  className="p-2 bg-amber-500/[0.05] border border-amber-500/15 rounded-lg flex items-start gap-1.5">
                  <Zap className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[8px] font-semibold text-white">Quick Win: Add professional summary</p>
                    <p className="text-[7px] text-slate-500">+15-20% ATS improvement</p>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ─── Interview Card (animated speaker cycle) ─── */
function InterviewCard() {
  const [speaker, setSpeaker] = useState(0);
  const panel = [
    { name: "Rachel K.", role: "HR", initials: "RK", gradient: "from-pink-500 to-rose-600" },
    { name: "Marcus R.", role: "Lead", initials: "MR", gradient: "from-blue-500 to-indigo-600" },
    { name: "Emma C.", role: "Dev", initials: "EC", gradient: "from-green-500 to-emerald-600" },
    { name: "You", role: "Candidate", initials: "JL", gradient: "from-indigo-500 to-purple-600" },
  ];
  const questions = [
    "Tell me about optimizing a React app's performance…",
    "How would you architect a micro-frontend system?",
    "What's your PR review process for juniors?",
    "I used React Profiler — reduced bundle size by 40%…",
  ];

  useEffect(() => {
    const iv = setInterval(() => setSpeaker(p => (p + 1) % 4), 1800);
    return () => clearInterval(iv);
  }, []);

  return (
    <Card className="md:col-span-2" delay={0.1}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Video className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-white">Mock Interviews</h3>
            <p className="text-[11px] text-slate-500">A full panel, not a chatbot</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {panel.map((p, i) => (
            <div key={i} className={`bg-white/[0.03] border rounded-lg p-2.5 text-center transition-all duration-300 ${
              speaker === i ? "border-blue-500/30 ring-1 ring-blue-500/20 scale-[1.02]" : "border-white/[0.05]"
            }`}>
              <div className="relative inline-block">
                <div className={`w-9 h-9 bg-gradient-to-br ${p.gradient} rounded-full flex items-center justify-center border-2 transition-colors ${
                  speaker === i ? "border-blue-400" : "border-transparent"
                }`}>
                  <span className="text-[9px] font-bold text-white">{p.initials}</span>
                </div>
                {speaker === i && (
                  <motion.div className="absolute inset-0 rounded-full border border-blue-400"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }} />
                )}
              </div>
              <p className="text-[8px] font-semibold text-white mt-1">{p.name}</p>
              <span className={`inline-block mt-0.5 px-1.5 py-0.5 rounded-full text-[6px] font-medium ${
                speaker === i ? (i === 3 ? "text-purple-400 bg-purple-500/10" : "text-blue-400 bg-blue-500/10") : "text-slate-500 bg-white/[0.04]"
              }`}>
                {speaker === i ? (i === 3 ? "Responding" : "Asking") : p.role}
              </span>
            </div>
          ))}
        </div>

        {/* Live transcript */}
        <div className="p-2.5 bg-white/[0.03] border border-white/[0.05] rounded-lg">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[7px] text-slate-500 font-medium">Live — {panel[speaker].name}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={speaker} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-[9px] text-white leading-relaxed">{questions[speaker]}</motion.p>
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}

/* ─── Cover Letter (typing animation) ─── */
function CoverLetterCard() {
  const [charIdx, setCharIdx] = useState(0);
  const text = "Dear Hiring Team,\n\nI am writing to express my enthusiasm for the Data Scientist role at Microsoft. With 3+ years building ML pipelines and conducting A/B tests at scale, I'm drawn to Microsoft's data-driven approach…";

  useEffect(() => {
    if (charIdx >= text.length) return;
    const t = setTimeout(() => setCharIdx(p => p + 1), 25);
    return () => clearTimeout(t);
  }, [charIdx, text.length]);

  return (
    <Card delay={0.15}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Edit3 className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-[15px] font-bold text-white">Cover Letters</h3>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.05] rounded-lg p-3 h-[140px] overflow-hidden relative">
          <p className="text-[9px] text-slate-300 leading-relaxed whitespace-pre-wrap">
            {text.slice(0, charIdx)}
            {charIdx < text.length && (
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-[1px] h-3 bg-purple-400 ml-0.5 align-middle" />
            )}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0a0f1e] to-transparent" />
        </div>
        <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
          AI researches the company, matches your experience, writes in your voice — not a robot&apos;s.
        </p>
      </div>
    </Card>
  );
}

/* ─── Study Planner (progress filling) ─── */
function PlannerCard() {
  const [progress, setProgress] = useState([0, 0, 0, 0, 0]);
  const targets = [100, 100, 57, 0, 0];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        targets.forEach((t, i) => {
          setTimeout(() => setProgress(p => { const n = [...p]; n[i] = t; return n; }), 300 + i * 200);
        });
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const days = [
    { day: "Day 1", topic: "Arrays & Hash Tables" },
    { day: "Day 2", topic: "Linked Lists & Stacks" },
    { day: "Day 3", topic: "Trees & BSTs" },
    { day: "Day 4", topic: "Graphs" },
    { day: "Day 5", topic: "Dynamic Programming" },
  ];

  return (
    <Card delay={0.2}>
      <div ref={ref} className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-[15px] font-bold text-white">Study Planner</h3>
        </div>
        <div className="space-y-2">
          {days.map((d, i) => (
            <div key={d.day} className="flex items-center gap-2.5">
              <span className="text-[8px] text-slate-600 w-8 flex-shrink-0 font-medium">{d.day}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] text-white truncate mb-0.5">{d.topic}</p>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                    style={{ width: `${progress[i]}%`, transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }} />
                </div>
              </div>
              {progress[i] === 100 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
          Day-by-day schedules that adapt when life happens. AI coach, quizzes, streak tracking.
        </p>
      </div>
    </Card>
  );
}

/* ─── Career Tools (before/after headline flip) ─── */
function CareerToolsCard() {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => setFlipped(p => !p), 2500);
    return () => clearInterval(iv);
  }, []);

  return (
    <Card delay={0.25}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Send className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-[15px] font-bold text-white">Career Tools</h3>
        </div>
        <div className="relative h-[110px] overflow-hidden">
          <AnimatePresence mode="wait">
            {!flipped ? (
              <motion.div key="before" initial={{ opacity: 0, rotateX: -15 }} animate={{ opacity: 1, rotateX: 0 }} exit={{ opacity: 0, rotateX: 15 }}
                transition={{ duration: 0.4 }} className="absolute inset-0 space-y-2">
                <div className="p-3 bg-red-500/[0.06] border border-red-500/10 rounded-xl">
                  <p className="text-[8px] text-red-400 font-bold uppercase mb-1">Your LinkedIn Now</p>
                  <p className="text-[11px] text-slate-400 line-through">Software Developer | Java | Python</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full border font-semibold text-red-400 bg-red-500/10 border-red-500/20">32/100</span>
                    <span className="text-[8px] text-slate-600">Profile strength</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="after" initial={{ opacity: 0, rotateX: -15 }} animate={{ opacity: 1, rotateX: 0 }} exit={{ opacity: 0, rotateX: 15 }}
                transition={{ duration: 0.4 }} className="absolute inset-0 space-y-2">
                <div className="p-3 bg-emerald-500/[0.06] border border-emerald-500/10 rounded-xl">
                  <p className="text-[8px] text-emerald-400 font-bold uppercase mb-1">After Optimisation</p>
                  <p className="text-[11px] text-white font-medium">Sr. SWE | Scalable Fintech Systems | Python & Java</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full border font-semibold text-emerald-400 bg-emerald-500/10 border-emerald-500/20">84/100</span>
                    <span className="text-[8px] text-emerald-400">4x more searchable</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
          LinkedIn optimizer + AI cold outreach that gets replies, not silence.
        </p>
      </div>
    </Card>
  );
}

/* ─── Job Tracker (cards sliding in + status changing) ─── */
function TrackerCard() {
  const [activeStatus, setActiveStatus] = useState(0);
  const statuses = ["Applied", "Screening", "Technical", "Offer!"];
  const colors = ["text-blue-400 bg-blue-500/10", "text-amber-400 bg-amber-500/10", "text-indigo-400 bg-indigo-500/10", "text-emerald-400 bg-emerald-500/10"];

  useEffect(() => {
    const iv = setInterval(() => setActiveStatus(p => (p + 1) % 4), 1500);
    return () => clearInterval(iv);
  }, []);

  const apps = [
    { company: "Meta", role: "Data Scientist" },
    { company: "Stripe", role: "Sr. SWE" },
    { company: "Spotify", role: "ML Engineer" },
    { company: "Amazon", role: "Data Scientist" },
  ];

  return (
    <Card className="md:col-span-full" delay={0.3}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="md:w-[35%]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-white">Job Tracker + Contact Finder</h3>
                <p className="text-[11px] text-slate-500">Replace the spreadsheet you hate</p>
              </div>
            </div>
            <p className="text-[12px] text-slate-400 leading-relaxed mb-4">
              Kanban pipeline, AI-powered contact finder that surfaces hiring managers with real emails, and personalised outreach written in seconds.
            </p>

            {/* Animated pipeline */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {statuses.map((s, i) => (
                <motion.span key={s}
                  animate={{ scale: activeStatus === i ? 1.08 : 1, borderColor: activeStatus === i ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.06)" }}
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-semibold border transition-colors ${
                    activeStatus === i ? colors[i] : "text-slate-600 bg-white/[0.02]"
                  }`}>
                  {s} {activeStatus === i && "←"}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="md:flex-1 grid grid-cols-2 md:grid-cols-4 gap-2">
            {apps.map((app, i) => (
              <motion.div key={app.company}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`bg-white/[0.03] border rounded-xl p-3 text-center transition-all duration-300 ${
                  i === activeStatus ? "border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.08)]" : "border-white/[0.05]"
                }`}
              >
                <div className="w-9 h-9 bg-white/[0.06] rounded-lg flex items-center justify-center text-[12px] font-bold text-white mx-auto mb-1.5">
                  {app.company[0]}
                </div>
                <p className="text-[10px] font-bold text-white">{app.company}</p>
                <p className="text-[8px] text-slate-500 mb-1.5">{app.role}</p>
                <AnimatePresence mode="wait">
                  <motion.span key={i === activeStatus ? statuses[activeStatus] : "default"}
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    className={`inline-block px-1.5 py-0.5 rounded-full text-[7px] font-semibold ${
                      i === activeStatus ? colors[activeStatus] : "text-blue-400 bg-blue-500/10"
                    }`}>
                    {i === activeStatus ? statuses[activeStatus] : "Applied"}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ─── Main Export ─── */
export default function BentoFeatures() {
  return (
    <section id="features" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[13px] font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Your toolkit
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight mb-4">
            Six tools. One goal.
            <br />
            <span className="text-gradient">Get you hired.</span>
          </motion.h2>
        </div>

        {/* Row 1: Resume (3) + Interview (2) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <ResumeCard />
          <InterviewCard />
        </div>

        {/* Row 2: Cover Letter + Planner + Career Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <CoverLetterCard />
          <PlannerCard />
          <CareerToolsCard />
        </div>

        {/* Row 3: Full-width Job Tracker */}
        <TrackerCard />
      </div>
    </section>
  );
}