"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ChevronDown, CheckCircle2 } from "lucide-react";
import { U, STEPS, STEP_LABELS, TOTAL_FIELDS, type Field, type Step } from "@/lib/demo";

// ── Chrome logo (official 4-colour) ──────────────────────────────────────────
function ChromeLogo({ size = 40 }: { size?: number }) {
  const id = useRef(`cl-${Math.random().toString(36).slice(2, 7)}`).current;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#fff" />
      <circle cx="20" cy="20" r="16" fill={`url(#${id}a)`} />
      <circle cx="20" cy="20" r="10" fill="#fff" />
      <circle cx="20" cy="20" r="7.5" fill={`url(#${id}b)`} />
      <defs>
        <linearGradient id={`${id}a`} x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#EA4335" />
          <stop offset="33%"  stopColor="#FBBC05" />
          <stop offset="66%"  stopColor="#34A853" />
          <stop offset="100%" stopColor="#4285F4" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="13" y1="13" x2="27" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4" />
          <stop offset="1" stopColor="#1A73E8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Preciprocal pin logo ──────────────────────────────────────────────────────
function PreciprocalMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 4.5 3.5 5.5L8 22h8l-1.5-8.5C16.5 12.5 18 10.5 18 8c0-3.5-2.5-6-6-6z"
        fill="url(#pmg)"
      />
      <defs>
        <linearGradient id="pmg" x1="6" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Google G ─────────────────────────────────────────────────────────────────
function GoogleLogo({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

// ── Action bar button icons ───────────────────────────────────────────────────
function EnvelopeIcon() {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
      <rect x="0.5" y="0.5" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
      <path d="M0.5 1.5L5.5 5L10.5 1.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="9" height="13" viewBox="0 0 9 13" fill="none">
      <path d="M5.5 0.5L0.5 7.5H4.5L3.5 12.5L8.5 5.5H4.5L5.5 0.5Z" fill="currentColor" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
      <path d="M1 1.5C1 1.22386 1.22386 1 1.5 1H9.5C9.77614 1 10 1.22386 10 1.5V12L5.5 9L1 12V1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// FORM FIELD — renders one Workday field in idle / filled state
// ─────────────────────────────────────────────────────────────────────────────
export function FormField({ field, filled }: { field: Field; filled: boolean }) {
  if (field.type === "upload") {
    return (
      <div>
        <p className="text-[9px] text-slate-500 font-semibold mb-1">{field.label}</p>
        {filled ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded px-2 py-1.5"
          >
            <div className="w-6 h-6 bg-red-100 border border-red-200 rounded flex items-center justify-center">
              <span className="text-[7px] font-bold text-red-600">PDF</span>
            </div>
            <div>
              <p className="text-[9px] font-semibold text-slate-700">{field.value}</p>
              <p className="text-[8px] text-emerald-600">✓ Successfully Uploaded!</p>
            </div>
          </motion.div>
        ) : (
          <div className="border-2 border-dashed border-slate-200 rounded p-3 flex flex-col items-center gap-1 bg-white">
            <Upload size={12} className="text-blue-400" />
            <p className="text-[9px] text-slate-500">Drop file here or <span className="text-blue-500 underline">Select file</span></p>
          </div>
        )}
      </div>
    );
  }
  if (field.type === "select") {
    return (
      <div>
        <p className="text-[9px] text-slate-500 font-semibold mb-1">{field.label}</p>
        <div className={`h-6 rounded border flex items-center justify-between px-2 transition-all duration-300 ${
          filled ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white"
        }`}>
          {filled ? (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] text-slate-700">{field.value}</motion.span>
          ) : (
            <span className="text-[9px] text-slate-300">Select...</span>
          )}
          <ChevronDown size={10} className="text-slate-400 flex-shrink-0" />
        </div>
      </div>
    );
  }
  if (field.type === "textarea") {
    return (
      <div>
        <p className="text-[9px] text-slate-500 font-semibold mb-1">{field.label}</p>
        <div className={`rounded border px-2 py-1.5 transition-all duration-300 min-h-[32px] ${
          filled ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white"
        }`}>
          {filled && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] text-slate-700 leading-tight block">
              {field.value}
            </motion.span>
          )}
        </div>
      </div>
    );
  }
  // Default: text input
  return (
    <div>
      <p className="text-[9px] text-slate-500 font-semibold mb-1">{field.label}</p>
      <div className={`h-6 rounded border px-2 flex items-center transition-all duration-300 ${
        filled ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white"
      }`}>
        {filled && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] text-slate-700">{field.value}</motion.span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRECIPROCAL SIDE PANEL (floating popup over form)
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// PRECIPROCAL SIDE PANEL
// ─────────────────────────────────────────────────────────────────────────────
export function PreciprocalPanel({
  isFilling, isDone, totalFilled, completion, currentStepIdx,
  onAutofill, panelFields,
}: {
  isFilling: boolean; isDone: boolean; totalFilled: number; completion: number;
  currentStepIdx: number; onAutofill: () => void;
  panelFields: { label: string; filled: boolean }[];
}) {
  const isIdle = !isFilling && !isDone;

  return (
    <div className="w-[230px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] border border-slate-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-200">
        <div className="flex items-center gap-1.5">
          <PreciprocalMark size={15} />
          <span className="text-[12px] font-bold text-slate-800">Preciprocal</span>
        </div>
        <button className="text-slate-400 text-[14px] leading-none hover:text-slate-600">×</button>
      </div>

      <div className="p-3 flex flex-col gap-2.5">
        {/* User row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
              {U.initials}
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-700 leading-none">ms</p>
              <p className="text-[9px] text-slate-400 mt-0.5">Workday</p>
            </div>
          </div>
          {isDone ? (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-9 h-9 rounded-full border-[3px] border-indigo-500 flex items-center justify-center bg-white flex-shrink-0"
            >
              <span className="text-[9px] font-black text-indigo-600">100%</span>
            </motion.div>
          ) : (
            <button className="text-slate-400 text-[14px]">−</button>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-indigo-600 underline cursor-pointer">Careers</span>
          <span className="text-[9px] bg-slate-100 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 w-fit">Mid-level</span>
        </div>

        {/* Completion */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-semibold text-slate-700">Completion</span>
            <span className={`text-[10px] font-bold tabular-nums ${isDone ? "text-slate-800" : "text-slate-500"}`}>
              {completion}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-indigo-600"
              animate={{ width: `${completion}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Required field checklist — shows the 4 key ones */}
        <div>
          <p className="text-[10px] text-slate-500 font-medium mb-1.5">Required (0/4 filled)</p>
          <div className="space-y-1.5">
            {panelFields.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <motion.div
                  animate={f.filled ? { scale: [1.2, 1] } : {}}
                  transition={{ duration: 0.2 }}
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    f.filled ? "border-indigo-500 bg-indigo-100" : "border-slate-300 bg-white"
                  }`}
                >
                  {f.filled && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                </motion.div>
                <span className="text-[10px] text-slate-600">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step progress (small) */}
        {(isFilling || isDone) && (
          <div className="flex gap-1 flex-wrap">
            {STEP_LABELS.slice(0, -1).map((s, i) => (
              <div key={i} className={`flex items-center gap-0.5 text-[8px] font-medium px-1.5 py-0.5 rounded-full border ${
                i < currentStepIdx || isDone
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : i === currentStepIdx
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                  : "bg-slate-50 border-slate-200 text-slate-400"
              }`}>
                {(i < currentStepIdx || isDone) && <span>✓</span>}
                {i === currentStepIdx && !isDone && <span>●</span>}
                {s.split(" ")[0]}
              </div>
            ))}
          </div>
        )}

        {isDone && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
            <div className="flex items-center gap-1 text-[9px] text-indigo-600">
              <span>✓</span>
              <span className="underline cursor-pointer">Review all fields before submitting</span>
            </div>
            {["Resume","Transcript"].map(item => (
              <div key={item} className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-emerald-500 text-[9px]">✓</span>
                  <span className="text-[9px] text-slate-600">{item}</span>
                </div>
                <span className="text-[9px] text-emerald-600 font-semibold">Attached</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Autofill button */}
        <button
          onClick={isIdle ? onAutofill : undefined}
          className={`w-full py-2.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all select-none ${
            isDone    ? "bg-emerald-500 text-white cursor-default"
            : isFilling ? "bg-indigo-500 text-white cursor-default"
            :             "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
          }`}
        >
          {isDone ? (
            <><CheckCircle2 size={11} /> 20 fields filled</>
          ) : isFilling ? (
            <>
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }} className="inline-block text-[13px]">✦</motion.span>
              Filling form...
            </>
          ) : (
            <>✦ Autofill</>
          )}
        </button>
        <p className="text-[10px] text-slate-400 text-center cursor-pointer hover:text-slate-600 transition-colors">Re-run fill</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WORKDAY PAGE — stepper + form fields
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// WORKDAY PAGE (stepper + current step fields)
// ─────────────────────────────────────────────────────────────────────────────
export function WorkdayPage({
  stepIdx, fieldsFilled,
}: {
  stepIdx: number; fieldsFilled: number;
}) {
  const step    = STEPS[stepIdx];
  const isReview = step.id === "review";

  return (
    <div className="w-full h-full bg-[#f4f4f4] overflow-y-auto flex flex-col">
      {/* Workday navy nav */}
      <div className="bg-[#1a2744] px-4 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
            <span className="text-[7px] font-black text-white">MS</span>
          </div>
          <span className="text-[10px] font-bold text-white tracking-wide">Careers</span>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          {["Careers Hub","Search for Jobs","Candidate Home"].map(l => (
            <span key={l} className="text-[8px] text-slate-300 cursor-pointer hover:text-white">{l}</span>
          ))}
          <span className="text-[8px] text-slate-400 ml-2">👤 {U.email}</span>
        </div>
      </div>

      {/* White card */}
      <div className="bg-white mx-4 mt-3 mb-4 rounded border border-slate-200 shadow-sm flex-1">
        {/* Back + title */}
        <div className="px-5 pt-3 pb-2 border-b border-slate-100">
          <p className="text-[9px] text-blue-600 cursor-pointer mb-1">← Back to Job Posting</p>
          <p className="text-[12px] font-semibold text-slate-800">Associate, LCD Data and Analytics</p>
        </div>

        {/* Stepper */}
        <div className="px-5 py-3 border-b border-slate-100 overflow-x-auto">
          <div className="flex items-start justify-between relative min-w-[380px]">
            <div className="absolute top-[8px] left-3 right-3 h-[2px] bg-slate-200" />
            {/* Progress fill */}
            <motion.div
              className="absolute top-[8px] left-3 h-[2px] bg-[#1a73e8]"
              animate={{ width: isReview ? "calc(100% - 24px)" : `calc(${(stepIdx / (STEPS.length - 1)) * 100}% - 24px)` }}
              transition={{ duration: 0.5 }}
            />
            {STEPS.map((s, i) => {
              const done   = isReview ? i < STEPS.length - 1 : i < stepIdx;
              const active = i === stepIdx;
              return (
                <div key={s.id} className="flex flex-col items-center gap-1 relative z-10">
                  <motion.div
                    animate={{
                      backgroundColor: done ? "#1a2744" : active ? "#1a73e8" : "#fff",
                      borderColor:     done ? "#1a2744" : active ? "#1a73e8" : "#cbd5e1",
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center"
                  >
                    {done   && <span className="text-white text-[8px] font-bold">✓</span>}
                    {active && !done && <div className="w-2 h-2 rounded-full bg-white" />}
                  </motion.div>
                  <span className={`text-[7px] text-center leading-tight max-w-[50px] ${
                    active ? "text-[#1a73e8] font-bold" : done ? "text-slate-600 font-semibold" : "text-slate-400"
                  }`}>
                    {STEP_LABELS[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form content */}
        <div className="px-5 py-4">
          {isReview ? (
            <ReviewPage />
          ) : (
            <>
              <h3 className="text-[13px] font-bold text-slate-800 text-center mb-4">{step.title}</h3>

              {step.id === "autofill" && (
                <p className="text-[9px] text-slate-500 mb-3">
                  Expedite your apply process by uploading a CV/Resume.<br />
                  <span className="text-slate-400">Upload DOC, DOCX, HTML, PDF, or TXT (5MB max)</span>
                </p>
              )}

              <div className="space-y-2.5">
                {step.fields.map((field, i) => (
                  <FormField key={i} field={field} filled={fieldsFilled > i} />
                ))}
              </div>

              <div className="flex justify-end mt-4 gap-2">
                {stepIdx > 0 && (
                  <button className="border border-slate-300 text-slate-700 text-[10px] font-semibold px-4 py-1.5 rounded">Back</button>
                )}
                <button className={`text-white text-[10px] font-semibold px-5 py-1.5 rounded ${
                  fieldsFilled >= step.fields.length ? "bg-blue-600" : "bg-slate-300 cursor-not-allowed"
                }`}>
                  {stepIdx === STEPS.length - 2 ? "Save and Continue" : "Continue"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Workday footer */}
      <div className="flex justify-center pb-2 flex-shrink-0 opacity-30">
        <span className="text-[8px] text-slate-500 italic">workday</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REVIEW PAGE CONTENT
// ─────────────────────────────────────────────────────────────────────────────
export function ReviewPage() {
  return (
    <div>
      <h3 className="text-[13px] font-bold text-slate-800 text-center mb-3">Review</h3>
      <div className="border-t border-slate-200 pt-3 space-y-2.5">
        <h4 className="text-[11px] font-bold text-slate-700 text-center">My Information</h4>
        {[
          ["How Did You Hear About Us?", U.heard],
          ["Previously worked at Morgan Stanley?", "No"],
          ["Legal Name", U.name],
          ["Preferred Name", "No"],
          ["Address", `${U.address}, ${U.city}, ${U.state} ${U.zip}`],
          ["Country", U.country],
          ["Email Address", U.email],
          ["Phone", `${U.phone} (Cell)`],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="text-[9px] text-slate-500">{label}</p>
            <p className="text-[10px] text-slate-800 font-medium">{value}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button className="border border-slate-300 text-slate-700 text-[10px] font-semibold px-4 py-1.5 rounded">Back</button>
        <button className="bg-blue-600 text-white text-[10px] font-semibold px-5 py-1.5 rounded">Submit</button>
      </div>
    </div>
  );
}