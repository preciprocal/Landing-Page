/**
 * scripts/indexnow.mjs
 *
 * Tells IndexNow search engines (Bing, and the engines it shares IndexNow
 * submissions with, such as Yandex, Seznam and Naver) which URLs changed, so they
 * recrawl in minutes instead of waiting to rediscover the sitemap.
 *
 * Usage (after the deploy is live, since engines fetch the key file and the
 * URLs from production):
 *   npm run indexnow                       every URL in the live sitemap
 *   npm run indexnow -- /opt /opt/fees     only these paths (or full URLs)
 *   node scripts/indexnow.mjs --changed <snapshot.json>
 *                                          only URLs new or with a changed
 *                                          lastmod since the last snapshot
 *
 * The --changed mode is what .github/workflows/indexnow.yml runs after every
 * successful Production deploy, so this normally needs no manual step. It
 * relies on sitemap lastmod, so a page whose content changes only gets
 * resubmitted when its date in app/sitemap.ts is bumped.
 *
 * The key must match the file public/<KEY>.txt, which is served at the site
 * root. Protocol: https://www.indexnow.org/documentation. Submit only URLs
 * that actually changed; resubmitting unchanged pages can trip the 429
 * rate limit.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const HOST = "preciprocal.com";
const SITE = `https://${HOST}`;
const KEY = "a8e2ec9cab095d89d70ee7aa1554afcd";
// Bing's endpoint rather than api.indexnow.org: participating engines share
// submissions with each other, and on first setup the shared endpoint kept
// returning 403 (most likely a cached miss from before the key file went
// live) while Bing accepted the same key.
const ENDPOINT = "https://www.bing.com/indexnow";
const MAX_PER_REQUEST = 10_000;

const RESPONSES = {
  200: "OK, URLs submitted",
  202: "Accepted, key validation pending",
  400: "Bad request, invalid format",
  403: "Forbidden, key file not found or does not contain the key",
  422: "Unprocessable, URLs do not belong to the host or key mismatch",
  429: "Too many requests, slow down",
};

/** Every <url> in the live sitemap, as { loc: lastmod }. */
async function sitemapEntries() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  const entries = {};
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1].trim();
    if (loc) entries[loc] = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1].trim() ?? "";
  }
  return entries;
}

function toUrl(arg) {
  if (arg.startsWith("http")) return arg;
  return `${SITE}${arg.startsWith("/") ? arg : `/${arg}`}`;
}

/**
 * --changed <snapshot.json>: submit only URLs that are new since the last
 * run or whose lastmod changed, then overwrite the snapshot. With no
 * snapshot yet, record a baseline and submit nothing, so the first
 * automated run does not resubmit the whole site.
 */
async function changedUrls(snapshotPath) {
  const current = await sitemapEntries();
  let previous = null;
  if (existsSync(snapshotPath)) previous = JSON.parse(readFileSync(snapshotPath, "utf8"));
  mkdirSync(dirname(snapshotPath), { recursive: true });
  writeFileSync(snapshotPath, JSON.stringify(current, null, 2));
  if (!previous) {
    console.log(`No previous snapshot. Recorded a baseline of ${Object.keys(current).length} URLs; nothing submitted.`);
    return [];
  }
  return Object.keys(current).filter((loc) => previous[loc] !== current[loc]);
}

async function submit(urls) {
  for (let i = 0; i < urls.length; i += MAX_PER_REQUEST) {
    const urlList = urls.slice(i, i + MAX_PER_REQUEST);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
    });
    console.log(`${res.status} ${RESPONSES[res.status] ?? "Unexpected response"} (${urlList.length} URLs)`);
    if (res.status >= 400) process.exitCode = 1;
  }
}

async function main() {
  const keyCheck = await fetch(`${SITE}/${KEY}.txt`);
  const keyBody = keyCheck.ok ? (await keyCheck.text()).trim() : "";
  if (keyBody !== KEY) {
    throw new Error(`Key file ${SITE}/${KEY}.txt is not live or wrong (status ${keyCheck.status}). Deploy first.`);
  }

  const args = process.argv.slice(2);
  let urls;
  if (args[0] === "--changed") {
    if (!args[1]) throw new Error("--changed needs a snapshot file path");
    urls = await changedUrls(args[1]);
  } else {
    urls = args.length ? args.map(toUrl) : Object.keys(await sitemapEntries());
  }

  const foreign = urls.filter((u) => new URL(u).host !== HOST);
  if (foreign.length) throw new Error(`Not on ${HOST}: ${foreign.join(", ")}`);
  if (!urls.length) {
    console.log("Nothing to submit.");
    return;
  }
  console.log(urls.join("\n"));
  if (process.env.INDEXNOW_DRY_RUN) {
    console.log(`Dry run: ${urls.length} URLs not submitted.`);
    return;
  }
  await submit(urls);
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
