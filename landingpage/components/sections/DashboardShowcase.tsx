"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Home,
  FileText,
  PenTool,
  Video,
  Calendar,
  BookOpen,
  Sparkles,
  Briefcase,
  Plus,
  ChevronDown,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const DashboardShowcase = () => {
  const menuItems = [
    { icon: Home, label: "Overview" },
    { icon: FileText, label: "Resume" },
    { icon: PenTool, label: "Cover Letter" },
    { icon: Video, label: "Interviews" },
    { icon: Calendar, label: "Planner" },
    { icon: BookOpen, label: "Interview Journal", isNew: true },
    { icon: Sparkles, label: "Career Tools", isNew: true },
    { icon: Briefcase, label: "Job Tracker", isNew: true },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-5xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
    >
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-[#050505] border-r border-white/5 flex flex-col p-4 shrink-0 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="flex items-center justify-between p-3 mt-2 mb-6 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?u=naman"
                alt="Naman"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#050505] rounded-full" />
            </div>
            <div>
              <div className="font-semibold text-sm text-white">Naman</div>
              <div className="text-xs text-slate-400 w-24 truncate">
                rathorenaman9@gma...
              </div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        <div className="space-y-3 mb-8 relative z-10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/20"
          >
            <Plus className="w-4 h-4" /> Start Interview
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl font-medium hover:bg-white/10 transition-colors"
          >
            <FileText className="w-4 h-4" /> Analyze Resume
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 relative z-10">
          <div className="text-xs font-bold text-slate-500 mb-3 px-2 tracking-wider">
            MENU
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {menuItems.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  x: 6,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors mb-1",
                  idx === 0
                    ? "bg-white/5 text-indigo-400"
                    : "text-slate-400 hover:text-white",
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.isNew && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold tracking-wide border border-indigo-500/30">
                    New
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 relative hidden md:block overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
        <div className="relative z-10 h-full flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="text-slate-400 text-sm mb-2">Readiness Score</div>
              <div className="text-3xl font-bold text-white flex items-end gap-2">
                92% <TrendingUp className="w-5 h-5 text-emerald-400 mb-1" />
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="text-slate-400 text-sm mb-2">Upcoming Mocks</div>
              <div className="text-3xl font-bold text-white">3</div>
            </div>
          </div>
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                System Initialized
              </h3>
              <p className="text-slate-400 mb-6 text-sm">
                Ready to begin your next interview simulation.
              </p>
              <button className="px-6 py-2 bg-white text-black font-medium rounded-full text-sm hover:scale-105 transition-transform">
                Deploy Engine
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};