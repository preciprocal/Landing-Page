"use client";

/**
 * components/VoiceAnswerRecorder.tsx
 *
 * Record a spoken answer with the browser's built-in speech recognition and
 * show delivery stats the moment recording stops. Used inside the answer
 * practice step on /interview-question-predictor.
 *
 * Preciprocal never receives the audio. The browser's own speech service turns
 * it into text (in Chrome that is Google's, in Edge Microsoft's), and only the
 * transcript is sent anywhere, and only if the visitor asks for a content score.
 *
 * Firefox has no speech recognition, so the parent falls back to typing when
 * speechSupported() is false.
 */

import { useEffect, useRef, useState } from "react";
import { analyseDelivery, type DeliveryStats, type Status } from "@/lib/interviewTools/delivery";
import { trackEvent } from "@/lib/analytics/client";

const MAX_SECONDS = 150;
/** A gap this long between recognition events, while recording, counts as a long pause. */
const LONG_PAUSE_MS = 3000;

// The Web Speech API is not in TypeScript's DOM lib, so declare the small part used here.
interface RecognitionResult {
  isFinal: boolean;
  0: { transcript: string };
}
interface RecognitionEvent {
  resultIndex: number;
  results: { length: number; [i: number]: RecognitionResult };
}
interface Recognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: RecognitionEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}
type RecognitionCtor = new () => Recognition;

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function speechSupported(): boolean {
  return recognitionCtor() !== null;
}

export default function VoiceAnswerRecorder({
  onTranscript,
}: {
  /** Called when recording stops, so the parent can score the content. */
  onTranscript: (transcript: string) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [live, setLive] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState<DeliveryStats | null>(null);

  const rec = useRef<Recognition | null>(null);
  const active = useRef(false);
  const finalText = useRef("");
  /** Latest finals plus interim, kept in a ref so finish() never reads stale state. */
  const liveText = useRef("");
  const startedAt = useRef(0);
  const lastEventAt = useRef(0);
  const pauses = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => stopAll(), []); // eslint-disable-line react-hooks/exhaustive-deps

  function stopAll() {
    active.current = false;
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    try {
      rec.current?.stop();
    } catch {
      // Already stopped.
    }
  }

  function start() {
    const Ctor = recognitionCtor();
    if (!Ctor) return;

    setError("");
    setStats(null);
    setLive("");
    finalText.current = "";
    liveText.current = "";
    pauses.current = 0;
    startedAt.current = Date.now();
    lastEventAt.current = Date.now();

    const r = new Ctor();
    r.continuous = true;
    r.interimResults = true;
    r.lang = "en-US";

    r.onresult = (e) => {
      const now = Date.now();
      if (now - lastEventAt.current >= LONG_PAUSE_MS && finalText.current) pauses.current++;
      lastEventAt.current = now;

      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finalText.current += `${res[0].transcript.trim()} `;
        else interim += res[0].transcript;
      }
      liveText.current = `${finalText.current}${interim}`;
      setLive(liveText.current);
    };

    r.onerror = (e) => {
      if (e.error === "no-speech" || e.error === "aborted") return;
      setError(
        e.error === "not-allowed" || e.error === "service-not-allowed"
          ? "Microphone access is blocked. Allow it in your browser's address bar, or type your answer instead."
          : "Speech recognition stopped unexpectedly. Try again, or type your answer instead."
      );
      finish();
    };

    // Chrome ends a continuous session on its own after a silence or about a
    // minute. Restart it until the visitor presses stop or time runs out.
    r.onend = () => {
      if (!active.current) return;
      try {
        r.start();
      } catch {
        finish();
      }
    };

    rec.current = r;
    active.current = true;
    try {
      r.start();
    } catch {
      setError("Could not start the microphone. Try again, or type your answer instead.");
      return;
    }
    setRecording(true);
    setElapsed(0);
    timer.current = setInterval(() => {
      const s = Math.floor((Date.now() - startedAt.current) / 1000);
      setElapsed(s);
      if (s >= MAX_SECONDS) finish();
    }, 250);
  }

  function finish() {
    if (!active.current) return;
    stopAll();
    setRecording(false);

    // Recognition can deliver its last result just after stop(); give it a moment.
    setTimeout(() => {
      const transcript = (finalText.current || liveText.current).trim();
      if (!transcript) {
        setError("We did not catch anything. Check your microphone and try again.");
        return;
      }
      const s = analyseDelivery(transcript, Date.now() - startedAt.current, pauses.current);
      setStats(s);
      setLive(transcript);
      onTranscript(transcript);
      trackEvent(
        "question-predictor-recorded",
        { seconds: s.seconds, wpm: s.wpm, fillers: s.fillerTotal, hedges: s.hedgeTotal },
        "tool"
      );
    }, 400);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {recording ? (
          <button
            type="button"
            data-track="question-predictor-record-stop"
            onClick={finish}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-rose-500 text-white hover:bg-rose-400"
          >
            <span className="w-2.5 h-2.5 rounded-sm bg-white" />
            Stop ({formatTime(elapsed)})
          </button>
        ) : (
          <button
            type="button"
            data-track="question-predictor-record-start"
            onClick={start}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            {stats ? "Record again" : "Record my answer"}
          </button>
        )}
        <p className="text-[11px] text-slate-600">
          {recording
            ? "Answer as you would in the interview. Aim for 60 to 120 seconds."
            : "Your browser turns speech into text. Preciprocal never receives the audio."}
        </p>
      </div>

      {recording && (
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4" aria-live="polite">
          <div className="flex items-center gap-2 text-[12px] text-rose-300 mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            Listening
          </div>
          <p className="text-sm text-slate-300 leading-relaxed min-h-[3rem]">{live || "Start speaking..."}</p>
        </div>
      )}

      {error && <p className="text-sm text-rose-300">{error}</p>}
      {stats && <DeliveryView stats={stats} />}
    </div>
  );
}

function formatTime(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const STATUS_STYLES: Record<Status, string> = {
  good: "border-emerald-400/30 text-emerald-300",
  warn: "border-amber-400/30 text-amber-300",
  bad: "border-rose-400/30 text-rose-300",
};

function DeliveryView({ stats }: { stats: DeliveryStats }) {
  const topFiller = stats.fillers[0];

  const headline =
    topFiller && topFiller.count >= 3
      ? `You said “${topFiller.word}” ${topFiller.count} times.`
      : stats.paceStatus !== "good"
        ? stats.wpm > 170
          ? "You were talking fast. Slow down and let your points land."
          : "You were speaking slowly. Tighten it up so it keeps momentum."
        : "Clean delivery. Now check whether the content holds up.";

  const tips: string[] = [];
  if (stats.fillerStatus !== "good")
    tips.push("Replace fillers with a short pause. Silence sounds more confident than “um” or “like”.");
  if (stats.hedgeTotal >= 2)
    tips.push(`Cut the hedging (${stats.hedges.map((h) => `“${h.word}”`).join(", ")}). Say what you did, not what you think you did.`);
  if (stats.lengthStatus !== "good")
    tips.push(stats.seconds < 45 ? "Too short to show much. Add one specific example with a result." : "Too long. Most answers should land in under two minutes.");
  if (stats.trailedOff) tips.push("You trailed off at the end. Finish on your result or on why you want this role, then stop.");

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0a0f1c] p-5 space-y-4">
      <div>
        <p className="text-[12px] uppercase tracking-wider text-emerald-300 font-semibold mb-1">Your delivery</p>
        <p className="text-white font-semibold">{headline}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="Pace" value={`${stats.wpm} wpm`} hint="120 to 170 is ideal" status={stats.paceStatus} />
        <Stat label="Length" value={formatTime(stats.seconds)} hint="0:45 to 2:00" status={stats.lengthStatus} />
        <Stat label="Filler words" value={String(stats.fillerTotal)} hint="Fewer is better" status={stats.fillerStatus} />
        <Stat
          label="Long pauses"
          value={String(stats.longPauses)}
          hint="3 seconds or more"
          status={stats.longPauses > 3 ? "warn" : "good"}
        />
      </div>

      {stats.fillers.length > 0 && (
        <p className="text-[12px] text-slate-400">
          Fillers: {stats.fillers.map((f) => `“${f.word}” ×${f.count}`).join(", ")}
        </p>
      )}

      {tips.length > 0 && (
        <ul className="space-y-2 text-sm text-slate-400">
          {tips.map((t, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-amber-300 shrink-0">→</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="text-[11px] text-slate-600">
        Speech recognition often leaves out &ldquo;um&rdquo; and &ldquo;uh&rdquo;, so your real filler count may be
        higher. Pauses are estimated.
      </p>
    </div>
  );
}

function Stat({ label, value, hint, status }: { label: string; value: string; hint: string; status: Status }) {
  return (
    <div className={`rounded-xl border bg-white/[0.02] p-3 ${STATUS_STYLES[status]}`}>
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[10px] text-slate-600">{hint}</p>
    </div>
  );
}
