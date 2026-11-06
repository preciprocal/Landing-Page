"use client";

/**
 * components/ThankYouEmailBuilder.tsx
 *
 * The free, no-signup tool on /thank-you-email-after-interview.
 *
 * Deliberately template-driven and fully client-side: this repo has no backend,
 * and the page has to work for a visitor who never creates an account, since a
 * tool that works on the spot is what people link to. The structure follows the
 * advice in the page body: thank them, name one specific thing from the
 * conversation, reinforce one point, close without an ask.
 *
 * Layout: inputs on the left, the live email preview on the right (sticky on
 * wide screens); stacked on phones.
 */

import { useId, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { SpotlightCard } from "@/components/page/Reveal";

type Stage = "phone-screen" | "technical" | "final";

const STAGES: { id: Stage; label: string }[] = [
  { id: "phone-screen", label: "Recruiter / phone screen" },
  { id: "technical", label: "Technical or panel round" },
  { id: "final", label: "Final round / onsite" },
];

const OPENERS: Record<Stage, string> = {
  "phone-screen": "Thank you for taking the time to speak with me today about the {role} role.",
  technical: "Thank you for the conversation today about the {role} role. I enjoyed working through the problems with you.",
  final: "Thank you for the time you and the team spent with me today. I came away even more interested in the {role} role.",
};

const CLOSERS: Record<Stage, string> = {
  "phone-screen": "I'm looking forward to the next steps, and I'm happy to share anything else that would be useful in the meantime.",
  technical: "If it would help to see more of how I approach this kind of work, I'm glad to follow up with anything you need.",
  final: "Whatever the outcome, I appreciated how open everyone was about the team and the work. I'd be excited to join.",
};

function fill(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] || `[${k}]`);
}

const inputClass =
  "w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2 text-sm text-white placeholder:text-slate-600 transition-colors focus:outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20";

export default function ThankYouEmailBuilder() {
  const [stage, setStage] = useState<Stage>("phone-screen");
  const [yourName, setYourName] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [topic, setTopic] = useState("");
  const [reinforce, setReinforce] = useState("");
  const [copied, setCopied] = useState(false);
  const uid = useId();

  const { subject, body } = useMemo(() => {
    const vars = { role: role.trim(), company: company.trim() };
    const greeting = `Hi ${interviewer.trim() || "[interviewer]"},`;
    const lines = [greeting, "", fill(OPENERS[stage], vars)];

    const middle: string[] = [];
    if (topic.trim()) {
      middle.push(
        `I especially enjoyed our discussion about ${topic.trim()}. It gave me a much clearer picture of what the team at ${vars.company || "[company]"} is working on.`
      );
    }
    if (reinforce.trim()) {
      middle.push(`It also made me think about ${reinforce.trim()}, which feels directly relevant to the work we talked about.`);
    }
    if (middle.length) lines.push("", middle.join(" "));

    lines.push("", CLOSERS[stage], "", "Best,", yourName.trim() || "[your name]");

    return {
      subject: `Thank you for today's conversation about the ${vars.role || "[role]"} role`,
      body: lines.join("\n"),
    };
  }, [stage, yourName, interviewer, company, role, topic, reinforce]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (insecure context, permissions). The text is
      // still selectable in the preview, so there is nothing else to do.
    }
  }

  return (
    <div className="grid grid-cols-1 items-start gap-6 text-left lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <SpotlightCard className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 sm:p-7">
        <div className="space-y-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300/90">Step 01</p>
            <p className="mt-1.5 font-semibold text-white">Fill in the details</p>
          </div>

          <div role="group" aria-labelledby={`${uid}-stage`}>
            <p id={`${uid}-stage`} className="mb-1.5 block text-[12px] text-slate-400">Which interview was it?</p>
            <div className="grid grid-cols-1 gap-1 rounded-xl border border-white/[0.07] bg-[#070b16] p-1 sm:grid-cols-3">
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={stage === s.id}
                  onClick={() => setStage(s.id)}
                  className={`rounded-lg px-3 py-2 text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${
                    stage === s.id
                      ? "bg-indigo-500/20 text-white shadow-[inset_0_0_0_1px_rgba(129,140,248,0.45)]"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Interviewer's first name" value={interviewer} onChange={setInterviewer} placeholder="Priya" />
            <Field label="Your name" value={yourName} onChange={setYourName} placeholder="Alex Chen" />
            <Field label="Company" value={company} onChange={setCompany} placeholder="Stripe" />
            <Field label="Role" value={role} onChange={setRole} placeholder="Backend Engineer" />
          </div>

          <div className="space-y-4 border-t border-white/[0.06] pt-5">
            <Field
              label="One specific thing you discussed"
              value={topic}
              onChange={setTopic}
              placeholder="how the team handles payment retries"
              hint="The single line that proves this is not a template. Skip it and the email reads like one."
            />
            <Field
              label="One point you want to reinforce (optional)"
              value={reinforce}
              onChange={setReinforce}
              placeholder="the idempotency work I did on our billing service"
            />
          </div>
        </div>
      </SpotlightCard>

      <div className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070b16] lg:sticky lg:top-28">
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-6 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/90">Step 02</p>
            <p className="mt-1.5 font-semibold text-white">Your email</p>
          </div>
          <button
            type="button"
            data-track="thank-you-email-copy"
            onClick={copy}
            aria-live="polite"
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-semibold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${
              copied
                ? "bg-emerald-500/20 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.45)]"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(99,102,241,0.28)]"
            }`}
          >
            {copied ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : <Copy aria-hidden="true" className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
        <p className="border-b border-white/[0.06] px-6 py-3.5 text-sm text-slate-400">
          <strong className="text-slate-200">Subject:</strong> {subject}
        </p>
        <pre className="min-h-[280px] flex-1 whitespace-pre-wrap break-words px-6 py-5 font-sans text-sm leading-relaxed text-slate-300">{body}</pre>
        <p className="border-t border-white/[0.06] bg-white/[0.015] px-6 py-3.5 text-[11px] leading-relaxed text-slate-500">
          Send it within 24 hours. Read it once out loud and cut anything that does not sound like you.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  hint?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[12px] text-slate-400">{label}</label>
      <input
        id={id}
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={hint ? `${id}-hint` : undefined}
      />
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-[11px] leading-relaxed text-slate-500">{hint}</p>}
    </div>
  );
}
