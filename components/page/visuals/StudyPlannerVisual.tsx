"use client";

/**
 * Hero illustration for /interview-study-planner: one week of a study plan,
 * shown as a five day calendar week with a large card per day. Topic sessions land on
 * the days one after another while the onsite countdown ticks down, and a
 * detail panel shows today's session.
 * Steps: 0..3, more days planned each step; step 3 is the full week.
 * The role, company, dates and sessions are fictional examples.
 */

import { motion } from "framer-motion";
import { CalendarDays, Check, Clock } from "lucide-react";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

type Day = { d: string; date: number; topic: string; mins: string; tone: string };

const CODING = "border-accent/40 bg-accent/[0.14] text-accent-soft";
const DESIGN = "border-accent-2/40 bg-accent-2/[0.14] text-white";
const STORIES = "border-white/15 bg-white/[0.06] text-slate-200";
const MOCK = "border-accent/60 bg-accent-deep/50 text-white";

const WEEK: Day[] = [
  { d: "Mon", date: 9, topic: "Graphs", mins: "45 min", tone: CODING },
  { d: "Tue", date: 10, topic: "System design", mins: "60 min", tone: DESIGN },
  { d: "Wed", date: 11, topic: "Dynamic programming", mins: "45 min", tone: CODING },
  { d: "Thu", date: 12, topic: "STAR stories", mins: "30 min", tone: STORIES },
  { d: "Fri", date: 13, topic: "Mock interview", mins: "60 min", tone: MOCK },
];

const FILLED = [2, 3, 4, 5];
const DAYS_LEFT = [17, 15, 13, 11];
const TODAY = 3; // Thursday

export default function StudyPlannerVisual() {
  const { ref, step } = useLoop(4, 1500);
  const filled = FILLED[step];

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com/study-plan" bodyClassName="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent">
                <CalendarDays className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-white">Study plan</p>
                <p className="text-[11px] text-slate-400">Software Engineer, Northwind</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1 text-[11px] font-medium text-slate-200">
              Onsite in
              <motion.span
                key={DAYS_LEFT[step]}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="font-semibold tabular-nums text-accent-soft"
              >
                {DAYS_LEFT[step]}
              </motion.span>
              days
            </div>
          </div>

          {/* Week tabs */}
          <div className="mt-3.5 flex items-center justify-between">
            <div className="flex gap-1 rounded-lg bg-white/[0.04] p-0.5">
              {["Week 1", "Week 2", "Week 3"].map((w, i) => (
                <span
                  key={w}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${i === 1 ? "bg-white/[0.09] text-white" : "text-slate-400"}`}
                >
                  {w}
                </span>
              ))}
            </div>
            <span className="text-[11px] text-slate-400">Nov 9 to 13</span>
          </div>

          {/* The week */}
          <div className="mt-3 grid grid-cols-5 gap-2">
            {WEEK.map((day, i) => {
              const on = i < filled;
              const today = i === TODAY;
              return (
                <div
                  key={day.d}
                  className={`flex h-[104px] flex-col rounded-xl border p-2 ${
                    today ? "border-accent/45 bg-accent/[0.05]" : "border-white/[0.07] bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-baseline justify-between px-0.5">
                    <span className={`text-[11px] font-medium ${today ? "text-accent-soft" : "text-slate-400"}`}>{day.d}</span>
                    <span className={`text-[13px] font-semibold ${today ? "text-white" : "text-slate-300"}`}>{day.date}</span>
                  </div>
                  {on ? (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className={`mt-auto rounded-lg border px-2 py-1.5 ${day.tone}`}
                    >
                      <p className="text-[11px] font-semibold leading-tight">{day.topic}</p>
                      <p className="mt-0.5 text-[10.5px] leading-tight opacity-80">{day.mins}</p>
                    </motion.div>
                  ) : (
                    <div className="mt-auto rounded-lg border border-dashed border-white/[0.12] px-2 py-2 text-[10.5px] text-slate-400">Planning</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Today's session */}
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-slate-200">
              <Clock className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-white">Today: STAR stories, 30 min</p>
              <p className="truncate text-[11px] text-slate-400">Draft the launch story and the conflict story, then time both out loud</p>
            </div>
          </div>
        </Window>

        <Chip show={step === 3} className="-bottom-5 right-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Check className="h-3 w-3" />
          </span>
          Week 2 planned
        </Chip>
      </Stage>
    </div>
  );
}
