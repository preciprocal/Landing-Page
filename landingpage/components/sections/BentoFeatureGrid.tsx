"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mic, Bot, Target, Zap, BrainCircuit, Mail } from "lucide-react";

export const BentoFeatureGrid = () => {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          The Complete Arsenal
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Everything from automated outreach to voice AI simulations. Stop
          manually applying and start strategically attacking the job market.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]">
        {/* Card 1: Live Voice AI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-[#0A0A0E] border border-white/10 rounded-3xl p-8 relative overflow-hidden group flex flex-col"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/10 blur-[100px] rounded-full group-hover:bg-indigo-600/20 transition-colors duration-500" />
          <div className="relative z-10 mb-8">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
              <Mic className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">
              Live Voice AI Agents
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Stop typing. Start talking. Experience hyper-realistic interview
              environments with voice agents that interrupt, challenge, and test
              you under pressure.
            </p>
          </div>
          <div className="mt-auto relative z-10 bg-[#050505] border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center w-12 h-12">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-indigo-500 rounded-full"
                />
                <div className="w-10 h-10 bg-indigo-600 rounded-full relative z-10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <div className="text-white font-medium">
                  Senior Tech Lead Agent
                </div>
                <div className="text-indigo-400 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />{" "}
                  Listening...
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [12, Math.random() * 24 + 12, 12] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: i * 0.1,
                  }}
                  className="w-1.5 bg-indigo-500 rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 2: The Resume Engine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-1 lg:col-span-1 row-span-2 bg-[#0A0A0E] border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col group"
        >
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/10 to-transparent" />
          <div className="relative z-10">
            <Target className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Resume Engine</h3>
            <p className="text-slate-400 text-sm mb-6">
              4-Pillar Analysis: Format, Recruiter Persona, Intel & Benchmark.
            </p>
          </div>
          <div className="mt-auto relative z-10 bg-white/5 border border-white/10 p-5 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  Overall Score
                </div>
                <div className="text-emerald-400 text-sm font-bold mt-1">
                  Excellent match
                </div>
              </div>
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    strokeDasharray="100, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="3"
                  />
                  <motion.path
                    initial={{ strokeDasharray: "0, 100" }}
                    whileInView={{ strokeDasharray: "93, 100" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="3"
                  />
                </svg>
                <span className="absolute text-lg font-bold text-white">
                  93
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-emerald-400" /> ATS Format
                </span>
                <span className="text-white font-medium">95%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-2">
                  <Bot className="w-3 h-3 text-emerald-400" /> Recruiter POV
                </span>
                <span className="text-white font-medium">90%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Journal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1 lg:col-span-1 row-span-1 bg-[#0A0A0E] border border-white/10 rounded-3xl p-6 relative overflow-hidden"
        >
          <BrainCircuit className="w-8 h-8 text-purple-400 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Debrief Journal</h3>
          <p className="text-slate-400 text-xs mb-4">
            Post-game analysis: Exactly what you said vs optimal answer.
          </p>
          <div className="space-y-2 mt-auto">
            <div className="bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">
              <span className="block text-[10px] text-red-400 font-bold uppercase mb-1">
                What you said
              </span>
              <p className="text-[11px] text-slate-300 truncate">
                "I used React because..."
              </p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg">
              <span className="block text-[10px] text-emerald-400 font-bold uppercase mb-1">
                Optimal Response
              </span>
              <p className="text-[11px] text-slate-300 truncate">
                "React reduced tech debt..."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Automated Outreach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-1 lg:col-span-1 row-span-1 bg-[#0A0A0E] border border-white/10 rounded-3xl p-6 relative overflow-hidden"
        >
          <Mail className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">
            Job Tracker & Outreach
          </h3>
          <p className="text-slate-400 text-xs mb-4">
            Finds the hiring manager and writes the cold email instantly.
          </p>
          <div className="mt-auto bg-[#050505] border border-white/10 p-3 rounded-xl relative">
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-lg">
              Auto-Generated
            </div>
            <div className="text-[10px] font-mono text-slate-300 leading-relaxed">
              <span className="text-blue-400 font-semibold">To:</span> Hiring
              Manager
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="text-slate-400"
              >
                Based on my scalable React background, I noticed...
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                |
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
