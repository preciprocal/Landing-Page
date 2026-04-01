"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Lamp({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-[#050810] w-full rounded-md z-0", className)}>
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div initial={{ opacity: 0.5, width: "15rem" }} whileInView={{ opacity: 1, width: "30rem" }} transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: "conic-gradient(from 70deg at center top, #6366f1, transparent)" }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] text-white">
          <div className="absolute w-full left-0 bg-[#050810] h-40 bottom-0 z-20" style={{ maskImage: "linear-gradient(to top, white, transparent)", WebkitMaskImage: "linear-gradient(to top, white, transparent)" }} />
          <div className="absolute w-40 h-full left-0 bg-[#050810] bottom-0 z-20" style={{ maskImage: "linear-gradient(to right, white, transparent)", WebkitMaskImage: "linear-gradient(to right, white, transparent)" }} />
        </motion.div>
        <motion.div initial={{ opacity: 0.5, width: "15rem" }} whileInView={{ opacity: 1, width: "30rem" }} transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: "conic-gradient(from 290deg at center top, transparent, #818cf8)" }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem]">
          <div className="absolute w-40 h-full right-0 bg-[#050810] bottom-0 z-20" style={{ maskImage: "linear-gradient(to left, white, transparent)", WebkitMaskImage: "linear-gradient(to left, white, transparent)" }} />
          <div className="absolute w-full right-0 bg-[#050810] h-40 bottom-0 z-20" style={{ maskImage: "linear-gradient(to top, white, transparent)", WebkitMaskImage: "linear-gradient(to top, white, transparent)" }} />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#050810] blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-indigo-500/30 opacity-50 blur-3xl" />
        <motion.div initial={{ width: "8rem" }} whileInView={{ width: "16rem" }} transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-indigo-500 blur-2xl" />
        <motion.div initial={{ width: "15rem" }} whileInView={{ width: "30rem" }} transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-indigo-500" />
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#050810]" />
      </div>
      <div className="relative z-50 flex -translate-y-60 flex-col items-center px-5">{children}</div>
    </div>
  );
}