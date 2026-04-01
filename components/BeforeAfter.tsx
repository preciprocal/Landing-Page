"use client";

import { motion } from "framer-motion";

const WITHOUT = [
  { text: "Spray-and-pray 200+ applications", icon: "😩" },
  { text: "Resume gets auto-rejected by ATS", icon: "🚫" },
  { text: "Wing interviews with zero practice", icon: "😰" },
  { text: "Copy-paste the same cover letter", icon: "📋" },
  { text: "Track applications in a messy spreadsheet", icon: "📊" },
  { text: "Wait weeks. Hear nothing. Repeat.", icon: "⏳" },
];

const WITH = [
  { text: "Apply to 20 targeted roles with tailored materials", icon: "🎯" },
  { text: "Resume scores 85+ on ATS every time", icon: "✅" },
  { text: "Walk in calm after 20+ mock interviews", icon: "😌" },
  { text: "AI writes unique letters matching each role", icon: "✨" },
  { text: "Kanban board + contact finder + AI outreach", icon: "🚀" },
  { text: "Land interviews in weeks, not months", icon: "🎉" },
];

export default function BeforeAfter() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <p className="text-[13px] font-semibold text-indigo-400 uppercase tracking-widest mb-3">The difference</p>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight">
            Same you. <span className="text-gradient">Different strategy.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* WITHOUT */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <h3 className="text-[15px] font-bold text-red-400">Without Preciprocal</h3>
            </div>
            <div className="space-y-3">
              {WITHOUT.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-red-500/[0.03] border border-red-500/[0.06]"
                >
                  <span className="text-base flex-shrink-0">{item.icon}</span>
                  <p className="text-[13px] text-slate-400 leading-snug">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* WITH */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02] p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <h3 className="text-[15px] font-bold text-emerald-400">With Preciprocal</h3>
            </div>
            <div className="space-y-3">
              {WITH.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/[0.06]"
                >
                  <span className="text-base flex-shrink-0">{item.icon}</span>
                  <p className="text-[13px] text-slate-300 leading-snug">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}