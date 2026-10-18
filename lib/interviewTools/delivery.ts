/**
 * lib/interviewTools/delivery.ts
 *
 * Delivery analysis for a spoken answer: pace, filler words, hedging, length,
 * long pauses and how it ends. Pure counting over the browser's transcript, so
 * it runs instantly, costs nothing, and never leaves the page. The content
 * score is a separate, optional model call (app/api/tools/rate-answer).
 *
 * The transcript comes from the browser's speech recognition, which has no
 * punctuation and, in Chrome especially, often drops "um" and "uh". Counts are
 * therefore a floor, and the UI says so.
 */

export type Status = "good" | "warn" | "bad";

export interface DeliveryStats {
  words: number;
  seconds: number;
  wpm: number;
  paceStatus: Status;
  lengthStatus: Status;
  fillers: { word: string; count: number }[];
  fillerTotal: number;
  fillerStatus: Status;
  hedges: { word: string; count: number }[];
  hedgeTotal: number;
  longPauses: number;
  trailedOff: boolean;
}

/** Always fillers wherever they appear. */
const FILLERS = ["um", "uh", "er", "ah", "you know", "i mean", "basically", "actually", "literally", "so yeah"];

/** Phrases that undercut an answer. Kept apart from fillers because the fix is different. */
const HEDGES = ["i think", "i guess", "i feel like", "kind of", "sort of", "maybe", "probably", "i'm not sure", "hopefully"];

/**
 * "like" is only counted when it is not doing real work. After these words it
 * is usually a verb or a comparison ("I like", "looks like", "something like"),
 * so it is not counted.
 */
const LIKE_IS_REAL_AFTER = new Set([
  "i", "you", "we", "they", "he", "she", "would", "i'd", "we'd", "really", "didn't", "don't", "look", "looks",
  "looked", "feel", "feels", "felt", "seem", "seems", "something", "things", "just", "is", "was", "be", "more",
]);

const ENDINGS_THAT_TRAIL = ["so yeah", "yeah", "that's it", "that's about it", "anyway", "um", "uh", "and stuff", "or something"];

function normalise(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[^a-z0-9' ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function countPhrase(tokens: string[], phrase: string): number {
  const parts = phrase.split(" ");
  let n = 0;
  for (let i = 0; i <= tokens.length - parts.length; i++) {
    if (parts.every((p, j) => tokens[i + j] === p)) n++;
  }
  return n;
}

function tally(tokens: string[], phrases: string[]) {
  return phrases
    .map((word) => ({ word, count: countPhrase(tokens, word) }))
    .filter((f) => f.count > 0)
    .sort((a, b) => b.count - a.count);
}

export function analyseDelivery(transcript: string, durationMs: number, longPauses: number): DeliveryStats {
  const tokens = normalise(transcript);
  const words = tokens.length;
  const seconds = Math.max(1, Math.round(durationMs / 1000));
  const wpm = Math.round(words / (seconds / 60));

  const fillers = tally(tokens, FILLERS);
  const likeCount = tokens.filter((t, i) => t === "like" && !LIKE_IS_REAL_AFTER.has(tokens[i - 1] ?? "")).length;
  if (likeCount > 0) fillers.push({ word: "like", count: likeCount });
  fillers.sort((a, b) => b.count - a.count);
  const fillerTotal = fillers.reduce((s, f) => s + f.count, 0);

  const hedges = tally(tokens, HEDGES);
  const hedgeTotal = hedges.reduce((s, h) => s + h.count, 0);

  // Fillers per 100 words, so a long answer is not punished for being long.
  const fillerRate = words ? (fillerTotal / words) * 100 : 0;

  const tail = tokens.slice(-4).join(" ");
  const trailedOff = ENDINGS_THAT_TRAIL.some((e) => tail.endsWith(e));

  return {
    words,
    seconds,
    wpm,
    paceStatus: wpm < 100 || wpm > 190 ? "bad" : wpm < 120 || wpm > 170 ? "warn" : "good",
    lengthStatus: seconds < 30 || seconds > 150 ? "bad" : seconds < 45 || seconds > 120 ? "warn" : "good",
    fillers,
    fillerTotal,
    fillerStatus: fillerRate > 6 ? "bad" : fillerRate > 3 ? "warn" : "good",
    hedges,
    hedgeTotal,
    longPauses,
    trailedOff,
  };
}
