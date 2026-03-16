"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  FileText,
  PenTool,
  Video,
  Calendar,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const AppFeaturesDetails = () => {
  const details = [
    {
      icon: FileText,
      title: "Resume Diagnostics",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      description:
        "A multi-layered scan of your resume. We check ATS parsing, simulate human recruiter biases, gather company intel, and benchmark you against actual employees in that role.",
    },
    {
      icon: PenTool,
      title: "Zero-Touch Cover Letters",
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      description:
        "Generate highly targeted, professional cover letters mapped perfectly to the job description and your unique profile. No manual typing or generic templates required.",
    },
    {
      icon: Video,
      title: "Voice AI Simulations",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      description:
        "Practice in a high-stakes, real-time voice environment. Our agents dynamically adapt their questions, test your technical limits, and analyze your vocal tonality and delivery.",
    },
    {
      icon: Calendar,
      title: "Action Planner",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      description:
        "Receive a customized, day-by-day roadmap filled with resources and tasks to study for your specific target role, culminating in a readiness quiz before the real thing.",
    },
    {
      icon: BookOpen,
      title: "Debrief Journal",
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      description:
        "A full autopsy of your interview performance. We transcribe your answers and provide the exact optimal response you should have given to close the offer.",
    },
    {
      icon: Briefcase,
      title: "Tracker & Outreach",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      description:
        "Track applications across any site. We automatically find the actual decision-maker (Hiring Manager) and generate highly personalized cold emails to skip the HR queue.",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Inside the Application
        </h3>
        <p className="text-slate-400">
          Everything you need to secure the offer, accessible from one unified
          dashboard.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {details.map((detail, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
                  detail.bgColor,
                )}
              >
                <detail.icon className={cn("w-6 h-6", detail.color)} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                {detail.title}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                {detail.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
