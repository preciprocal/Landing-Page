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
 */

import { useMemo, useState } from "react";

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
  "w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-400/60";

export default function ThankYouEmailBuilder() {
  const [stage, setStage] = useState<Stage>("phone-screen");
  const [yourName, setYourName] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [topic, setTopic] = useState("");
  const [reinforce, setReinforce] = useState("");
  const [copied, setCopied] = useState(false);

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-4">
        <p className="text-white font-semibold">Fill in the details</p>

        <div>
          <label className="block text-[12px] text-slate-400 mb-1.5">Which interview was it?</label>
          <div className="flex flex-wrap gap-2">
            {STAGES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStage(s.id)}
                className={`px-3 py-1.5 rounded-lg text-[12px] border transition-colors ${
                  stage === s.id
                    ? "bg-indigo-500/20 border-indigo-400/50 text-white"
                    : "border-white/[0.08] text-slate-400 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Interviewer's first name" value={interviewer} onChange={setInterviewer} placeholder="Priya" />
          <Field label="Your name" value={yourName} onChange={setYourName} placeholder="Alex Chen" />
          <Field label="Company" value={company} onChange={setCompany} placeholder="Stripe" />
          <Field label="Role" value={role} onChange={setRole} placeholder="Backend Engineer" />
        </div>

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

      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white font-semibold">Your email</p>
          <button
            type="button"
            data-track="thank-you-email-copy"
            onClick={copy}
            className="px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
          >
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
        <p className="text-sm text-slate-400 mb-3">
          <strong className="text-slate-200">Subject:</strong> {subject}
        </p>
        <pre className="flex-1 whitespace-pre-wrap font-sans text-sm text-slate-300 leading-relaxed">{body}</pre>
        <p className="text-[11px] text-slate-600 mt-4">
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
  return (
    <div>
      <label className="block text-[12px] text-slate-400 mb-1.5">{label}</label>
      <input className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {hint && <p className="text-[11px] text-slate-600 mt-1">{hint}</p>}
    </div>
  );
}
