"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Star, CheckCircle2,
  AlertTriangle, Video, Users, Clock, Briefcase,
  Calendar, Target, Sparkles, Search, Edit3,
  Send, Mail, UserSearch, Filter, Link2,
} from "lucide-react";

// Alias — some lucide versions export Linkedin, others don't
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ─── Mini Score Ring ─── */
function MiniRing({ score, size = 40, color = "#a855f7" }: { score: number; size?: number; color?: string }) {
  const r = (size - 5) / 2;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  useEffect(() => {
    const t = setTimeout(() => setOffset(circ * (1 - score / 100)), 300);
    return () => clearTimeout(t);
  }, [score, circ]);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={3} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={3}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease-out" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[11px] font-bold text-white">{score}</span>
      </div>
    </div>
  );
}

/* ─── Animated Bar ─── */
function Bar({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), delay); return () => clearTimeout(t); }, [value, delay]);
  return (
    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${w}%`, transition: "width 0.8s ease-out" }} />
    </div>
  );
}

/* ─── Scene 1: Resume Analysis ─── */
function ResumeScene() {
  return (
    <div className="flex gap-3 h-full">
      {/* Mini resume */}
      <div className="w-[38%] flex-shrink-0">
        <div className="bg-white rounded-lg p-3 h-full text-[6.5px] text-gray-700 leading-[1.6]">
          <p className="text-center text-[9px] font-bold text-gray-900 uppercase tracking-wider">Alex Chen</p>
          <p className="text-center text-[5.5px] text-gray-500 mt-0.5">alex.chen@email.com | Boston, MA</p>
          <p className="font-bold text-[7px] text-gray-900 uppercase border-b border-gray-300 pb-0.5 mt-2 mb-1">Experience</p>
          <p className="font-semibold text-gray-800 text-[6.5px]">Datadog — Software Engineer</p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="ml-1 text-[5.5px] text-gray-600 space-y-0.5 mt-0.5">
            <p className="bg-yellow-200/60 rounded px-0.5">• Built real-time pipeline processing 2M+ events/sec</p>
            <p>• Deployed K8s microservices, 99.8% uptime</p>
          </motion.div>
          <p className="font-semibold text-gray-800 text-[6.5px] mt-1.5">Wayfair — Data Engineering Intern</p>
          <div className="ml-1 text-[5.5px] text-gray-600 space-y-0.5 mt-0.5">
            <p>• ETL pipeline with Airflow, 500GB+ daily</p>
            <p>• Segmentation model, 22% lift</p>
          </div>
          <p className="font-bold text-[7px] text-gray-900 uppercase border-b border-gray-300 pb-0.5 mt-2 mb-1">Skills</p>
          <p className="text-[5.5px] text-gray-600">Python, Java, Go, React, K8s, AWS, Kafka</p>
        </div>
      </div>

      {/* Analysis panel */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-[9px] font-bold text-white">Resume Analysis</p>
          <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[7px] text-amber-400 font-semibold flex items-center gap-1">
            <Star className="w-2 h-2" /> 75/100
          </span>
        </div>

        {/* Score ring + stats */}
        <div className="flex items-center gap-3 p-2 bg-white/[0.03] border border-white/[0.06] rounded-lg">
          <MiniRing score={75} size={44} color="#a855f7" />
          <div className="flex-1">
            <p className="text-[8px] font-bold text-white">Overall Score</p>
            <p className="text-[6.5px] text-slate-500">Good — potential +20%</p>
          </div>
        </div>

        {/* Category bars */}
        {[
          { label: "ATS Compatibility", score: 75, color: "bg-amber-500", tag: "Good" },
          { label: "Content Quality", score: 78, color: "bg-purple-500", tag: "Good" },
          { label: "Structure & Format", score: 65, color: "bg-red-500", tag: "Fair" },
          { label: "Skills & Keywords", score: 80, color: "bg-emerald-500", tag: "Very Good" },
        ].map((cat, i) => (
          <motion.div key={cat.label} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }}
            className="p-2 bg-white/[0.02] border border-white/[0.06] rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[7px] font-semibold text-white">{cat.label}</span>
              <div className="flex items-center gap-1">
                <span className="text-[8px] font-bold text-white">{cat.score}</span>
                <span className="text-[6px] px-1 py-0.5 rounded bg-white/[0.06] text-slate-400 font-semibold">{cat.tag}</span>
              </div>
            </div>
            <Bar value={cat.score} color={cat.color} delay={400 + i * 150} />
          </motion.div>
        ))}

        {/* Quick fix */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="p-2 bg-amber-500/[0.04] border border-amber-500/15 rounded-lg flex items-start gap-1.5">
          <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[7px] font-semibold text-white">Add professional summary</p>
            <p className="text-[6px] text-slate-500">+15-20% ATS match improvement</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Scene 2: Cover Letter ─── */
function CoverLetterScene() {
  const [phase, setPhase] = useState<"form" | "generating" | "done">("form");
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("generating"), 1200);
    const t2 = setTimeout(() => setPhase("done"), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="flex gap-3 h-full">
      {/* Form */}
      <div className="w-[42%] flex-shrink-0 space-y-2">
        <div className="flex items-center gap-1.5 mb-1">
          <Briefcase className="w-3 h-3 text-blue-400" />
          <span className="text-[9px] font-bold text-white">Job Details</span>
        </div>
        {[
          { label: "Role", value: "Data Scientist" },
          { label: "Company", value: "Microsoft" },
          { label: "Tone", value: "Professional" },
        ].map((f, i) => (
          <motion.div key={f.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.2 }}>
            <p className="text-[7px] text-slate-500 mb-0.5">{f.label}</p>
            <div className="px-2 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[8px] text-white">{f.value}</div>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className={`py-2 rounded-xl text-center text-[8px] font-semibold text-white ${phase === "generating" ? "bg-indigo-600/50" : "bg-gradient-to-r from-indigo-600 to-purple-600"}`}>
          {phase === "generating" ? "Generating…" : phase === "done" ? "✓ Generated" : "Generate"}
        </motion.div>
      </div>

      {/* Letter */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <FileText className="w-3 h-3 text-purple-400" />
          <span className="text-[9px] font-bold text-white">Generated Letter</span>
        </div>
        {phase === "done" ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 text-[7px] text-slate-300 leading-relaxed space-y-2">
            <p className="text-white font-semibold text-[8px]">Alex Chen</p>
            <p className="text-slate-500 text-[6.5px]">alex.chen@email.com | Boston, MA</p>
            <p className="text-slate-400 text-[6.5px]">March 28, 2026</p>
            <p>Dear Hiring Team,</p>
            <p>I am writing to express my enthusiasm for the Data Scientist role at Microsoft. With a keen passion for data analytics and a strong commitment to driving business growth...</p>
            <p>In my previous roles, I have successfully implemented data-driven strategies that resulted in significant improvements in key performance metrics...</p>
            <p className="text-slate-400">Best regards,<br /><span className="text-white font-medium">Alex Chen</span></p>
          </motion.div>
        ) : phase === "generating" ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-2" />
              <p className="text-[8px] text-slate-400">Crafting your letter…</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <FileText className="w-6 h-6 text-slate-700 mx-auto mb-1" />
              <p className="text-[8px] text-slate-600">Letter appears here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Scene 3: Interview ─── */
function InterviewScene() {
  const [speaker, setSpeaker] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setSpeaker(p => (p + 1) % 4), 1200);
    return () => clearInterval(iv);
  }, []);

  const panel = [
    { name: "Rachel Kim", role: "HR Manager", initials: "RK", gradient: "from-pink-500 to-rose-600" },
    { name: "Marcus R.", role: "Frontend Lead", initials: "MR", gradient: "from-blue-500 to-indigo-600" },
    { name: "Emma C.", role: "Junior Dev", initials: "EC", gradient: "from-green-500 to-emerald-600" },
    { name: "Jordan L.", role: "You", initials: "JL", gradient: "from-indigo-500 to-purple-600" },
  ];

  const transcripts = [
    "Tell me about a time you optimized a React app's performance...",
    "How would you architect a micro-frontend system at scale?",
    "What's your process for reviewing a junior dev's PR?",
    "I used React Profiler to identify render bottlenecks — we reduced bundle size by 40%...",
  ];

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-[6px] font-bold">AI</span>
          </div>
          <p className="text-[9px] font-bold text-white">Interview Conference</p>
        </div>
        <div className="flex items-center gap-2 text-[7px] text-slate-500">
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />Recording</span>
          <span>Q 3/8</span>
        </div>
      </div>

      {/* 2×2 Grid */}
      <div className="grid grid-cols-2 gap-2">
        {panel.map((p, i) => (
          <motion.div key={p.name}
            className={`bg-white/[0.02] border rounded-xl p-3 text-center transition-all ${
              speaker === i ? "ring-1 ring-blue-500/50 border-blue-500/30 scale-[1.02]" : "border-white/[0.06]"
            }`}>
            <div className="relative inline-block">
              <div className={`w-10 h-10 bg-gradient-to-br ${p.gradient} rounded-full flex items-center justify-center border-2 ${speaker === i ? "border-blue-400" : "border-slate-700"}`}>
                <span className="text-white text-[10px] font-bold">{p.initials}</span>
              </div>
              {speaker === i && <div className="absolute inset-0 rounded-full border border-blue-400 animate-ping opacity-40" />}
            </div>
            <p className="text-[8px] font-semibold text-white mt-1.5">{p.name}</p>
            <p className="text-[6.5px] text-slate-500">{p.role}</p>
            <span className={`inline-block mt-1 px-1.5 py-0.5 rounded-full text-[6px] font-medium ${
              speaker === i ? (i === 3 ? "text-purple-400 bg-purple-500/10" : "text-blue-400 bg-blue-500/10") : "text-emerald-400 bg-emerald-500/10"
            }`}>
              {speaker === i ? (i === 3 ? "Responding" : "Asking") : "Listening"}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Transcript */}
      <motion.div key={speaker} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="p-2 bg-white/[0.03] border border-white/[0.06] rounded-lg">
        <div className="flex items-center gap-1.5 mb-0.5">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-[6.5px] text-slate-400 font-medium">Live Transcript — {panel[speaker].name}</span>
        </div>
        <p className="text-[7.5px] text-white leading-relaxed">{transcripts[speaker]}</p>
      </motion.div>
    </div>
  );
}

/* ─── Scene 4: Study Planner ─── */
function PlannerScene() {
  const plans = [
    { day: 1, focus: "Arrays & Hash Tables", done: 6, total: 6 },
    { day: 2, focus: "Linked Lists & Stacks", done: 5, total: 5 },
    { day: 3, focus: "Trees & BSTs", done: 4, total: 7 },
    { day: 4, focus: "Graphs & Shortest Paths", done: 0, total: 6 },
    { day: 5, focus: "Dynamic Programming", done: 0, total: 8 },
  ];

  return (
    <div className="flex gap-3 h-full">
      {/* Sidebar stats */}
      <div className="w-[35%] flex-shrink-0 space-y-2">
        <div className="p-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MiniRing score={43} size={40} color="#8b5cf6" />
            <div>
              <p className="text-[9px] font-bold text-white">Sr. Backend Eng</p>
              <p className="text-[7px] text-slate-500">at Stripe</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {[
              { icon: Calendar, val: "Apr 15", sub: "Target" },
              { icon: Sparkles, val: "3d", sub: "Streak" },
              { icon: Target, val: "15/41", sub: "Done" },
            ].map(({ icon: Icon, val, sub }) => (
              <div key={sub} className="text-center p-1 bg-white/[0.02] border border-white/[0.05] rounded">
                <Icon className="w-2 h-2 text-slate-500 mx-auto mb-0.5" />
                <p className="text-[8px] font-bold text-white">{val}</p>
                <p className="text-[5.5px] text-slate-600">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-2 bg-white/[0.03] border border-white/[0.06] rounded-lg">
          <p className="text-[7px] text-indigo-400 font-semibold uppercase mb-1.5">Today — Day 3</p>
          <p className="text-[8px] font-semibold text-white mb-1">Trees & BSTs</p>
          {["Solve Validate BST", "Watch NeetCode", "Implement BFS", "Practice LCA"].map((t, i) => (
            <div key={i} className="flex items-center gap-1.5 mb-0.5">
              {i < 4 ? <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> : <div className="w-2.5 h-2.5 rounded-full border border-white/20" />}
              <span className={`text-[6.5px] ${i < 4 ? "text-slate-500 line-through" : "text-slate-300"}`}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-1.5 mb-1">
          <Calendar className="w-3 h-3 text-blue-400" />
          <span className="text-[9px] font-bold text-white">7-Day Schedule</span>
        </div>
        {plans.map((dp, i) => {
          const pct = Math.round((dp.done / dp.total) * 100);
          return (
            <motion.div key={dp.day} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="p-2 bg-white/[0.02] border border-white/[0.06] rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-bold text-white">{dp.day}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[8px] font-semibold text-white truncate">{dp.focus}</p>
                  <p className="text-[6.5px] text-slate-500">{dp.done}/{dp.total} tasks</p>
                </div>
                {pct === 100 && <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />}
              </div>
              <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${pct}%`, transition: "width 0.5s" }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Scene 5: Job Tracker ─── */
function JobTrackerScene() {
  const apps = [
    { company: "Meta", role: "Data Scientist", days: "4d", status: "Applied", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { company: "Stripe", role: "Sr. Software Eng", days: "5d", status: "Technical", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { company: "Spotify", role: "ML Engineer", days: "22d", status: "Applied", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { company: "Amazon", role: "Data Scientist", days: "22d", status: "Applied", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Briefcase className="w-3 h-3 text-purple-400" />
          <span className="text-[9px] font-bold text-white">Job Tracker</span>
        </div>
        <div className="flex items-center gap-1">
          <Search className="w-2.5 h-2.5 text-slate-600" />
          <Filter className="w-2.5 h-2.5 text-slate-600" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { label: "Total", val: "8" },
          { label: "Active", val: "8" },
          { label: "Response", val: "13%" },
          { label: "Offers", val: "0" },
        ].map(s => (
          <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-1.5 text-center">
            <p className="text-[6px] text-slate-500 uppercase">{s.label}</p>
            <p className="text-[10px] font-bold text-white">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-2">
        {apps.map((app, i) => (
          <motion.div key={app.company} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 bg-white/[0.07] rounded-lg flex items-center justify-center text-[8px] font-bold text-white">{app.company[0]}</div>
              <div className="min-w-0 flex-1">
                <p className="text-[8px] font-bold text-white truncate">{app.company}</p>
                <p className="text-[6.5px] text-slate-500 truncate">{app.role}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[6.5px] font-semibold border ${app.color}`}>
                <span className="w-1 h-1 rounded-full bg-current" />{app.status}
              </span>
              <span className="text-[6.5px] text-slate-600">{app.days}</span>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2">
              <div className="flex items-center justify-center gap-0.5 py-1 rounded-lg text-[6.5px] font-semibold text-purple-400 bg-purple-500/[0.07] border border-purple-500/20">
                <UserSearch className="w-2 h-2" /> Contacts
              </div>
              <div className="flex items-center justify-center gap-0.5 py-1 rounded-lg text-[6.5px] font-semibold text-violet-400 bg-violet-500/[0.07] border border-violet-500/20">
                <Calendar className="w-2 h-2" /> Plan
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Scene 6: Career Tools (LinkedIn + Outreach) ─── */
function CareerToolsScene() {
  return (
    <div className="flex gap-3 h-full">
      {/* Left: LinkedIn score */}
      <div className="w-[45%] flex-shrink-0 space-y-2">
        <div className="flex items-center gap-1.5 mb-1">
          <LinkedinIcon className="w-3 h-3 text-blue-400" />
          <span className="text-[9px] font-bold text-white">LinkedIn Optimizer</span>
        </div>
        <div className="p-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg">
          <div className="flex items-center gap-2">
            <MiniRing score={42} size={40} color="#f59e0b" />
            <div>
              <p className="text-[8px] text-slate-500 uppercase font-semibold">Profile Strength</p>
              <p className="text-[10px] font-bold text-amber-400">Needs Work</p>
            </div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="p-2 bg-red-500/[0.06] border border-red-500/15 rounded-lg">
          <p className="text-[6.5px] text-red-400 font-semibold uppercase mb-0.5">Headline</p>
          <p className="text-[7px] text-slate-400 line-through">Software Developer | Java | Python</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="p-2 bg-emerald-500/[0.06] border border-emerald-500/15 rounded-lg">
          <p className="text-[6.5px] text-emerald-400 font-semibold uppercase mb-0.5">Optimised</p>
          <p className="text-[7px] text-white font-medium">Senior SWE | Scalable Fintech | Python & Java | Ex-JPMorgan</p>
        </motion.div>
      </div>

      {/* Right: Cold outreach preview */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-1.5 mb-1">
          <Send className="w-3 h-3 text-emerald-400" />
          <span className="text-[9px] font-bold text-white">Cold Outreach</span>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="p-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg">
          <div className="flex items-center gap-1.5 mb-1">
            <Mail className="w-2.5 h-2.5 text-violet-400" />
            <p className="text-[7px] font-semibold text-white">To: Sarah Chen · Eng Manager @ Stripe</p>
          </div>
          <p className="text-[6.5px] text-slate-500 mb-1">Subject: Quick question about Stripe&apos;s payments API</p>
          <p className="text-[7px] text-slate-300 leading-relaxed">Hi Sarah, I noticed your post about Stripe&apos;s new payments API — the shift to idempotent request handling is exactly what I&apos;ve been building…</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="px-1.5 py-0.5 rounded text-[6px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Best</span>
            <span className="px-1.5 py-0.5 rounded text-[6px] font-semibold bg-white/[0.04] text-slate-500 border border-white/[0.06]">Option 2</span>
            <span className="px-1.5 py-0.5 rounded text-[6px] font-semibold bg-white/[0.04] text-slate-500 border border-white/[0.06]">Option 3</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="p-2 bg-white/[0.03] border border-white/[0.06] rounded-lg">
          <div className="flex flex-wrap gap-1">
            {["fintech", "microservices", "payment systems", "Python"].map(kw => (
              <span key={kw} className="text-[6px] px-1.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">{kw}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Feature tabs config ─── */
const DEMO_FEATURES: { id: string; label: string; iconName: string; color: string; scene: () => React.ReactElement }[] = [
  { id: "resume", label: "Resume", iconName: "FileText", color: "from-purple-500 to-indigo-500", scene: ResumeScene },
  { id: "cover", label: "Cover Letter", iconName: "Edit3", color: "from-indigo-500 to-blue-500", scene: CoverLetterScene },
  { id: "interview", label: "Interview", iconName: "Video", color: "from-blue-500 to-cyan-500", scene: InterviewScene },
  { id: "planner", label: "Planner", iconName: "Calendar", color: "from-emerald-500 to-cyan-500", scene: PlannerScene },
  { id: "tracker", label: "Tracker", iconName: "Briefcase", color: "from-amber-500 to-orange-500", scene: JobTrackerScene },
  { id: "career", label: "Career Tools", iconName: "Linkedin", color: "from-pink-500 to-purple-500", scene: CareerToolsScene },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, Edit3, Video, Calendar, Briefcase, Linkedin: LinkedinIcon,
};

const CYCLE_INTERVAL = 6000;

/* ─── Main Export ─── */
export default function HeroProductDemo() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const iv = setInterval(() => setActiveIdx(p => (p + 1) % DEMO_FEATURES.length), CYCLE_INTERVAL);
    return () => clearInterval(iv);
  }, [paused]);

  const active = DEMO_FEATURES[activeIdx];
  const ActiveScene = active.scene;

  return (
    <div
      className="relative w-full max-w-[680px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* App window chrome */}
      <div className="bg-[#0a0f1e]/90 border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(99,102,241,0.15)]">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.04] border border-white/[0.06] rounded-lg">
            <img src="/logo.png" alt="Preciprocal" className="w-3 h-3 rounded" />
            <span className="text-[8px] text-slate-400">app.preciprocal.com</span>
          </div>
          <div className="w-16" />
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-0.5 px-3 py-2 border-b border-white/[0.04] overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {DEMO_FEATURES.map((f, i) => {
            const IconComp = ICON_MAP[f.iconName];
            const isActive = i === activeIdx;
            return (
              <button
                key={f.id}
                onClick={() => { setActiveIdx(i); setPaused(true); }}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[7.5px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? `bg-gradient-to-r ${f.color} text-white shadow-lg`
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
                }`}
              >
                {IconComp && <IconComp className="w-3 h-3" />}
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="h-[2px] bg-white/[0.04] relative overflow-hidden">
          <motion.div
            key={activeIdx}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: CYCLE_INTERVAL / 1000, ease: "linear" }}
            className={`h-full bg-gradient-to-r ${active.color}`}
            style={{ animationPlayState: paused ? "paused" : "running" }}
          />
        </div>

        {/* Scene content */}
        <div className="p-4" style={{ minHeight: 340 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <ActiveScene />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Glow underneath */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none" />
    </div>
  );
}