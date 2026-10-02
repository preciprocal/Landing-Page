/**
 * app/api/collect/route.ts
 *
 * The collector. Receives batches from lib/analytics/client.ts, enriches them
 * with what only the server can know, and writes them to Supabase with the
 * service role.
 *
 * WHY THE ENRICHMENT HAPPENS HERE AND NOT IN THE BROWSER
 *   Country, device and the anonymous visitor hash all derive from the request
 *   itself. Deriving them server-side means the browser never has to send an IP
 *   or a user agent as data, and means a hostile client cannot forge its own
 *   country or inflate another visitor's hash.
 *
 * WHAT HAPPENS TO THE IP ADDRESS
 *   It is read from the forwarding headers, folded into a salted hash, and
 *   dropped. It is never written to any column, never logged, and the salt
 *   rotates every day, so yesterday's hash for a given visitor cannot be
 *   matched to today's. That is what lets this run for visitors who declined
 *   cookies without it being tracking in the sense the banner asks about.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { LIMITS, type CollectPayload, type CollectResponse, type TrackedEvent } from "@/lib/analytics/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANALYTICS_SALT = process.env.ANALYTICS_SALT;

let cached: SupabaseClient | null = null;

function supabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return null;
  if (!cached) {
    cached = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}

// ── request enrichment ──────────────────────────────────────────────────────

/** First hop in the forwarding chain, which is the client. Never stored. */
function clientIp(h: Headers): string {
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") || h.get("cf-connecting-ip") || "unknown";
}

/**
 * The daily-rotating anonymous id.
 *
 * sha256(ip + user agent + secret + yyyy-mm-dd). Changing the date component
 * every midnight UTC means the same person is a different id tomorrow, so this
 * cannot build a long-term profile even in principle. ANALYTICS_SALT keeps the
 * hash from being reproducible by anyone who merely knows an IP.
 */
function anonId(ip: string, ua: string): string {
  const day = new Date().toISOString().slice(0, 10);
  return createHash("sha256")
    .update(`${ip}|${ua}|${ANALYTICS_SALT ?? "unsalted-dev"}|${day}`)
    .digest("hex")
    .slice(0, 32);
}

/** Hashed so the ERP can match a known customer without storing the address. */
function hashEmail(email: string): string {
  return createHash("sha256")
    .update(`${email.trim().toLowerCase()}|${ANALYTICS_SALT ?? "unsalted-dev"}`)
    .digest("hex");
}

/**
 * Minimal user agent parsing.
 *
 * A dependency would be more thorough, but this is five regexes against a
 * string we are deliberately not storing, and it covers the browsers that
 * actually appear in the logs. Order matters: Edge and Opera both claim to be
 * Chrome, and Chrome claims to be Safari.
 */
function parseUa(ua: string) {
  const is = (re: RegExp) => re.test(ua);

  const device = is(/\bbot\b|crawler|spider|crawling|headless|lighthouse|pagespeed/i)
    ? "bot"
    : is(/\biPad\b|\bTablet\b|\bPlayBook\b|\bSilk\b|Android(?!.*Mobile)/i)
      ? "tablet"
      : is(/Mobi|Android|iPhone|iPod|Windows Phone|webOS|BlackBerry/i)
        ? "mobile"
        : "desktop";

  let browser = "Other";
  let version = "";
  const m = (re: RegExp) => ua.match(re);
  let match;
  if ((match = m(/Edg(?:e|A|iOS)?\/([\d.]+)/))) { browser = "Edge"; version = match[1]; }
  else if ((match = m(/OPR\/([\d.]+)|Opera\/([\d.]+)/))) { browser = "Opera"; version = match[1] || match[2]; }
  else if ((match = m(/SamsungBrowser\/([\d.]+)/))) { browser = "Samsung Internet"; version = match[1]; }
  else if ((match = m(/Firefox\/([\d.]+)/))) { browser = "Firefox"; version = match[1]; }
  else if ((match = m(/Chrome\/([\d.]+)/))) { browser = "Chrome"; version = match[1]; }
  else if ((match = m(/Version\/([\d.]+).*Safari/))) { browser = "Safari"; version = match[1]; }
  else if (is(/Safari/)) { browser = "Safari"; }

  const os = is(/Windows NT 10/) ? "Windows 10/11"
    : is(/Windows/) ? "Windows"
    : is(/iPhone|iPad|iPod/) ? "iOS"
    : is(/Mac OS X/) ? "macOS"
    : is(/Android/) ? "Android"
    : is(/Linux/) ? "Linux"
    : "Other";

  return { device, browser, browserVersion: version.split(".")[0] || null, os };
}

/**
 * Coarse location, set at the edge by Vercel or Cloudflare.
 *
 * Both headers carry a two-letter ISO code rather than a country name, so
 * `country` and `country_code` hold the same value; the ERP maps the code to a
 * display name. Keeping both columns means a name lookup can be added later
 * without a migration. Note this is derived from the request, not from a stored
 * IP: nothing here requires the address to be kept.
 */
function geo(h: Headers) {
  const code = h.get("x-vercel-ip-country") || h.get("cf-ipcountry");
  return {
    country: code,
    country_code: code,
    region: h.get("x-vercel-ip-country-region"),
    city: safeDecode(h.get("x-vercel-ip-city")),
  };
}

function safeDecode(v: string | null): string | null {
  if (!v) return null;
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

/**
 * Referrer host to a human source name.
 *
 * Link shorteners are the reason this exists. LinkedIn arrives as `lnkd.in`,
 * X as `t.co`, Facebook as `l.facebook.com` or `lm.facebook.com`, and in a raw
 * host report each looks like a separate obscure site rather than the channel
 * you actually posted on. Longest-prefix style matching, most specific first.
 */
const SOURCE_MAP: Array<[RegExp, string, string]> = [
  // [host pattern, display name, channel]
  [/^(www\.)?google\./, "Google", "organic"],
  [/^(www\.)?bing\./, "Bing", "organic"],
  [/duckduckgo\./, "DuckDuckGo", "organic"],
  [/^(.*\.)?yahoo\./, "Yahoo", "organic"],
  [/ecosia\./, "Ecosia", "organic"],
  [/search\.brave\./, "Brave Search", "organic"],
  [/baidu\./, "Baidu", "organic"],
  [/yandex\./, "Yandex", "organic"],

  // AI assistants, now a meaningful source of SaaS traffic and worth splitting
  // out rather than being buried in "referral".
  [/chatgpt\.com|chat\.openai\.com/, "ChatGPT", "ai"],
  [/perplexity\./, "Perplexity", "ai"],
  [/claude\.ai/, "Claude", "ai"],
  [/gemini\.google\.|bard\.google\./, "Gemini", "ai"],
  [/copilot\.microsoft\./, "Copilot", "ai"],

  [/lnkd\.in|linkedin\./, "LinkedIn", "social"],
  [/^(.*\.)?t\.co$|twitter\.com|^x\.com$|^(.*\.)?x\.com$/, "X", "social"],
  [/facebook\.|fb\.me|fb\.com/, "Facebook", "social"],
  [/instagram\./, "Instagram", "social"],
  [/reddit\.|redd\.it/, "Reddit", "social"],
  [/tiktok\./, "TikTok", "social"],
  [/youtube\.|youtu\.be/, "YouTube", "social"],
  [/pinterest\./, "Pinterest", "social"],
  [/threads\.net/, "Threads", "social"],
  [/discord\.|discord\.gg/, "Discord", "social"],
  [/t\.me|telegram\./, "Telegram", "social"],
  [/whatsapp\./, "WhatsApp", "social"],
  [/news\.ycombinator\./, "Hacker News", "social"],
  [/quora\./, "Quora", "social"],
  [/medium\./, "Medium", "referral"],
  [/substack\./, "Substack", "referral"],
  [/github\./, "GitHub", "referral"],
  [/producthunt\./, "Product Hunt", "referral"],

  // Webmail: a click from an email someone was sent, even with no UTM on it.
  [/mail\.google\.|outlook\.|mail\.yahoo\.|mail\.proton/, "Webmail", "email"],
];

function sourceOf(referrerHost: string | null): { name: string | null; channel: string | null } {
  if (!referrerHost) return { name: null, channel: null };
  for (const [re, name, channel] of SOURCE_MAP) {
    if (re.test(referrerHost)) return { name, channel };
  }
  return { name: referrerHost, channel: "referral" };
}

/**
 * Final channel for the session.
 *
 * An explicit utm_medium always wins, because that is the campaign owner
 * stating what the traffic is and it is the only way to distinguish a paid
 * click from an organic one when both arrive from the same host. Otherwise the
 * referrer decides, and with neither it is direct.
 */
function channelOf(referrerHost: string | null, utmMedium?: string | null, utmSource?: string | null): string {
  const m = (utmMedium || "").toLowerCase();
  if (m.includes("cpc") || m.includes("ppc") || m.includes("paid") || m.includes("display")) return "paid";
  if (m.includes("email") || m.includes("newsletter")) return "email";
  if (m.includes("social") || m.includes("paid-social")) return "social";
  if (m.includes("affiliate")) return "affiliate";
  if (m.includes("referral")) return "referral";
  if (m.includes("organic")) return "organic";

  const fromReferrer = sourceOf(referrerHost).channel;
  if (fromReferrer) return fromReferrer;

  // Tagged link with no referrer, e.g. opened from a native app or a PDF.
  if (utmSource) return "campaign";
  return "direct";
}

// ── validation ──────────────────────────────────────────────────────────────

const clampStr = (v: unknown, max: number = LIMITS.maxStringLength): string | null =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

const clampInt = (v: unknown, min: number, max: number): number | null => {
  const n = typeof v === "number" ? Math.round(v) : NaN;
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : null;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EVENT_TYPES = new Set(["page_view", "section_view", "click", "scroll_depth", "session_end"]);

// ── handler ─────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const db = supabase();
  // Not configured yet. Accept and discard rather than erroring, so a missing
  // env var in preview never shows the visitor a failed request.
  if (!db) return NextResponse.json<CollectResponse>({ ok: true, accepted: 0 });

  let payload: CollectPayload;
  try {
    payload = (await request.json()) as CollectPayload;
  } catch {
    return NextResponse.json<CollectResponse>({ ok: false, error: "bad json" }, { status: 400 });
  }

  const session = payload?.session;
  const events = Array.isArray(payload?.events) ? payload.events.slice(0, LIMITS.maxEventsPerBatch) : [];
  if (!session?.sessionId || !UUID_RE.test(session.sessionId) || !events.length) {
    return NextResponse.json<CollectResponse>({ ok: false, error: "bad payload" }, { status: 400 });
  }

  const h = request.headers;
  const ua = h.get("user-agent") || "";
  const { device, browser, browserVersion, os } = parseUa(ua);

  // Crawlers inflate every number they touch and none of them are customers.
  if (device === "bot") return NextResponse.json<CollectResponse>({ ok: true, accepted: 0 });

  const anon = anonId(clientIp(h), ua);
  const visitorId = session.visitorId && UUID_RE.test(session.visitorId) ? session.visitorId : null;
  const consent = ["anonymous", "granted", "declined"].includes(session.consent) ? session.consent : "anonymous";

  // ── open the session on its first batch ──────────────────────────────────
  if (session.isNew) {
    let referrerHost: string | null = null;
    if (session.referrer) {
      try {
        referrerHost = new URL(session.referrer).hostname.replace(/^www\./, "");
      } catch {
        referrerHost = null;
      }
    }
    // Our own pages are not referrers.
    if (referrerHost && /(^|\.)preciprocal\.com$/.test(referrerHost)) referrerHost = null;

    const params = new URLSearchParams(session.query || "");
    const utmMedium = clampStr(params.get("utm_medium"), 120);
    const utmSource = clampStr(params.get("utm_source"), 120);
    const g = geo(h);

    // utm_source names the source when it is set, since the campaign owner
    // knows better than a referrer header does. Otherwise the referrer is
    // resolved to a display name through SOURCE_MAP.
    const resolved = sourceOf(referrerHost);
    const sourceName = utmSource || resolved.name;

    // Google and Microsoft both tag their ad clicks, which is the only
    // reliable way to spot paid traffic that carries no utm_medium.
    const isPaidClickId = params.has("gclid") || params.has("gbraid") || params.has("wbraid") || params.has("msclkid") || params.has("fbclid");

    const { error } = await db.from("web_sessions").upsert(
      {
        session_id: session.sessionId,
        visitor_id: visitorId,
        anon_id: anon,
        consent,
        entry_path: clampStr(session.entryPath),
        referrer: clampStr(session.referrer, LIMITS.maxHrefLength),
        referrer_host: referrerHost,
        source_name: sourceName,
        channel: isPaidClickId && !utmMedium ? "paid" : channelOf(referrerHost, utmMedium, utmSource),
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: clampStr(params.get("utm_campaign"), 120),
        utm_term: clampStr(params.get("utm_term"), 120),
        utm_content: clampStr(params.get("utm_content"), 120),
        landing_query: clampStr(session.query),
        device_type: device,
        browser,
        browser_version: browserVersion,
        os,
        viewport_w: clampInt(session.viewportW, 0, 20000),
        viewport_h: clampInt(session.viewportH, 0, 20000),
        screen_w: clampInt(session.screenW, 0, 20000),
        screen_h: clampInt(session.screenH, 0, 20000),
        language: clampStr(session.language, 35),
        timezone: clampStr(session.timezone, 64),
        country: g.country,
        country_code: g.country_code,
        region: g.region,
        city: g.city,
      },
      { onConflict: "session_id", ignoreDuplicates: true }
    );
    if (error) console.error("[collect] session insert", error.message);
  }

  // ── map the batch onto event rows ────────────────────────────────────────
  const rows = events
    .filter((e: TrackedEvent) => e && EVENT_TYPES.has(e.type) && typeof e.path === "string")
    .map((e: TrackedEvent) => {
      const metadata = (e.metadata && typeof e.metadata === "object" ? { ...e.metadata } : {}) as Record<string, unknown>;
      // An email submitted through identify() is replaced by its hash before
      // it is ever written, so the plaintext address exists only in memory.
      if (typeof metadata.identify === "string") {
        metadata.identify_sha256 = hashEmail(metadata.identify);
        delete metadata.identify;
      }
      return {
        session_id: session.sessionId,
        visitor_id: visitorId,
        anon_id: anon,
        occurred_at: new Date(
          typeof e.ts === "number" && e.ts > 0 ? Math.min(e.ts, Date.now() + 60_000) : Date.now()
        ).toISOString(),
        type: e.type,
        path: clampStr(e.path) ?? "/",
        page_title: clampStr(e.pageTitle, 200),
        referrer_path: clampStr(e.referrerPath),
        time_on_page_ms: clampInt(e.timeOnPageMs, 0, LIMITS.maxDwellMs),
        section_id: clampStr(e.sectionId, 120),
        section_name: clampStr(e.sectionName, 200),
        section_index: clampInt(e.sectionIndex, 0, 500),
        dwell_ms: clampInt(e.dwellMs, 0, LIMITS.maxDwellMs),
        max_visible_pct: clampInt(e.maxVisiblePct, 0, 100),
        target_kind: clampStr(e.targetKind, 20),
        target_href: clampStr(e.targetHref, LIMITS.maxHrefLength),
        target_path: clampStr(e.targetPath),
        target_label: clampStr(e.targetLabel, 200),
        target_section: clampStr(e.targetSection, 120),
        scroll_pct: clampInt(e.scrollPct, 0, 100),
        metadata,
      };
    });

  if (rows.length) {
    const { error } = await db.from("web_events").insert(rows);
    if (error) console.error("[collect] events insert", error.message);
  }

  // ── keep the session row current ─────────────────────────────────────────
  const pageViews = rows.filter((r) => r.type === "page_view" && !(r.metadata as { closing?: boolean }).closing).length;
  const ended = rows.find((r) => r.type === "session_end");
  const lastPath = rows[rows.length - 1]?.path ?? null;

  const { error: rpcError } = await db.rpc("web_session_touch", {
    p_session_id: session.sessionId,
    p_page_views: pageViews,
    p_events: rows.length,
    p_exit_path: lastPath,
    p_ended: Boolean(ended),
  });
  if (rpcError) console.error("[collect] session touch", rpcError.message);

  return NextResponse.json<CollectResponse>({ ok: true, accepted: rows.length });
}

/** Browsers preflight a sendBeacon Blob with a JSON type in some versions. */
export async function OPTIONS() {
  return new Response(null, { status: 204 });
}
