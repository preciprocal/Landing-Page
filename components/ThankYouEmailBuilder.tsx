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

/**
 * The email, per stage. Written to read like a considered note from a
 * professional, not a form letter: a specific thank you, one concrete detail,
 * one link back to the candidate, and a close that is warm without asking for
 * anything. Keep it short; past about 150 words a thank you email stops being
 * read in full.
 */
const OPENERS: Record<Stage, string> = {
  "phone-screen": "Thank you for taking the time to speak with me today about the {role} role at {company}. I appreciated the clear picture you gave me of the team and what the role involves.",
  technical: "Thank you for the time you spent with me today on the technical interview for the {role} role. I enjoyed working through the problems with you.",
  final: "Thank you for hosting me today for the final round for the {role} role at {company}. I appreciated the time everyone set aside, and the conversations made me even more interested in joining the team.",
};

const CLOSERS: Record<Stage, string> = {
  "phone-screen": "I remain very interested in the role and look forward to hearing about next steps. Please let me know if there is anything further I can provide.",
  technical: "If it would help your evaluation, I would be glad to walk through my approach in more detail or share related work.",
  final: "Thank you again for a thoughtful process. I am excited about the opportunity and look forward to hearing from you.",
};

const SUBJECTS: Record<Stage, string> = {
  "phone-screen": "Thank you for today's conversation, {role} at {company}",
  technical: "Thank you for today's technical interview, {role}",
  final: "Thank you for today, {role} at {company}",
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
  const [contact, setContact] = useState("");
  const [copied, setCopied] = useState(false);
  const uid = useId();

  const { subject, paragraphs, body, words, missing } = useMemo(() => {
    const vars = { role: role.trim(), company: company.trim() };
    const co = vars.company || "[company]";
    const t = topic.trim();
    const r = reinforce.trim();

    let detail = "";
    if (t && r) detail = `I especially valued our discussion about ${t}. It connects directly to my experience with ${r}, and I would welcome the chance to bring that to ${co}.`;
    else if (t) detail = `I especially valued our discussion about ${t}. It gave me a clearer sense of the problems the team is solving and where I could contribute.`;
    else if (r) detail = `Our conversation reinforced how my experience with ${r} could contribute to the team at ${co}.`;

    const signature = [yourName.trim() || "[your name]", contact.trim()].filter(Boolean).join("\n");
    const paragraphs = [
      `Hi ${interviewer.trim() || "[interviewer]"},`,
      fill(OPENERS[stage], vars),
      ...(detail ? [detail] : []),
      CLOSERS[stage],
      `Best regards,\n${signature}`,
    ];
    const subject = fill(SUBJECTS[stage], vars);
    const body = paragraphs.join("\n\n");
    const gaps = (x: string) => (x.match(/\[[^\]]+\]/g) ?? []).length;

    return {
      subject,
      paragraphs,
      body,
      words: body.split(/\s+/).filter(Boolean).length,
      missing: gaps(body) + gaps(subject),
    };
  }, [stage, yourName, interviewer, company, role, topic, reinforce, contact]);

  const checks = [
    { ok: missing === 0, label: missing === 0 ? "Every detail filled in" : `${missing} detail${missing === 1 ? "" : "s"} still to fill in` },
    { ok: topic.trim().length > 0, label: "Mentions something specific you discussed" },
    { ok: words <= 150, label: `${words} words, short enough to read in full` },
  ];

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
            <Field
              label="Line under your name (optional)"
              value={contact}
              onChange={setContact}
              placeholder="linkedin.com/in/alexchen · (617) 555-0142"
            />
          </div>
        </div>
      </SpotlightCard>

      <div className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070b16] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] lg:sticky lg:top-28">
        {/* Compose window header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] bg-white/[0.02] px-5 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <div aria-hidden="true" className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
            </div>
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/90">Step 02 · Your email</p>
          </div>
          <button
            type="button"
            data-track="thank-you-email-copy"
            onClick={copy}
            aria-live="polite"
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-semibold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${
              copied
                ? "bg-emerald-500/20 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.45)]"
                : "bg-[#5b6cff] hover:brightness-110"
            }`}
          >
            {copied ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : <Copy aria-hidden="true" className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>

        {/* Message fields */}
        <dl className="divide-y divide-white/[0.05] border-b border-white/[0.06] text-[13px]">
          <div className="flex gap-4 px-6 py-3">
            <dt className="w-14 shrink-0 text-slate-500">To</dt>
            <dd className="min-w-0 truncate text-slate-200">
              <Filled text={`${interviewer.trim() || "[interviewer]"}${company.trim() ? `, ${company.trim()}` : ""}`} />
            </dd>
          </div>
          <div className="flex gap-4 px-6 py-3">
            <dt className="w-14 shrink-0 text-slate-500">Subject</dt>
            <dd className="min-w-0 font-medium text-white">
              <Filled text={subject} />
            </dd>
          </div>
        </dl>

        {/* Body */}
        <div className="min-h-[300px] flex-1 space-y-4 px-6 py-6 text-[14.5px] leading-[1.75] text-slate-200">
          {paragraphs.map((para, i) => (
            <p key={i} className={`whitespace-pre-line ${i === paragraphs.length - 1 ? "border-t border-white/[0.06] pt-4 text-slate-300" : ""}`}>
              <Filled text={para} />
            </p>
          ))}
        </div>

        {/* Ready to send */}
        <div className="border-t border-white/[0.06] bg-white/[0.015] px-6 py-4">
          <ul className="grid gap-2 sm:grid-cols-3">
            {checks.map((c) => (
              <li key={c.label} className={`flex items-start gap-2 text-[11.5px] leading-snug ${c.ok ? "text-slate-300" : "text-amber-200/90"}`}>
                <span
                  aria-hidden="true"
                  className={`mt-px grid h-4 w-4 shrink-0 place-items-center rounded-full ${c.ok ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"}`}
                >
                  {c.ok ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : <span className="h-1 w-1 rounded-full bg-current" />}
                </span>
                <span>
                  <span className="sr-only">{c.ok ? "Done: " : "To do: "}</span>
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
            Send it within 24 hours, to each interviewer separately. Read it once out loud and cut anything that does not sound like you.
          </p>
        </div>
      </div>
    </div>
  );
}

/** Text with any unfilled [placeholder] shown as a highlighted gap. */
function Filled({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/g).map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <span key={i} className="rounded bg-amber-400/10 px-1 text-amber-200 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.25)]">
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
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
