/**
 * scripts/indexnow.mjs
 *
 * Tells IndexNow search engines (Bing, Yandex, Seznam, Naver and others that
 * share submissions through api.indexnow.org) which URLs changed, so they
 * recrawl in minutes instead of waiting to rediscover the sitemap.
 *
 * Usage (after the deploy is live, since engines fetch the key file and the
 * URLs from production):
 *   npm run indexnow                       every URL in the live sitemap
 *   npm run indexnow -- /opt /opt/fees     only these paths (or full URLs)
 *
 * The key must match the file public/<KEY>.txt, which is served at the site
 * root. Protocol: https://www.indexnow.org/documentation. Submit only URLs
 * that actually changed; resubmitting unchanged pages can trip the 429
 * rate limit.
 */

const HOST = "preciprocal.com";
const SITE = `https://${HOST}`;
const KEY = "a8e2ec9cab095d89d70ee7aa1554afcd";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_PER_REQUEST = 10_000;

const RESPONSES = {
  200: "OK, URLs submitted",
  202: "Accepted, key validation pending",
  400: "Bad request, invalid format",
  403: "Forbidden, key file not found or does not contain the key",
  422: "Unprocessable, URLs do not belong to the host or key mismatch",
  429: "Too many requests, slow down",
};

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function toUrl(arg) {
  if (arg.startsWith("http")) return arg;
  return `${SITE}${arg.startsWith("/") ? arg : `/${arg}`}`;
}

async function main() {
  const keyCheck = await fetch(`${SITE}/${KEY}.txt`);
  const keyBody = keyCheck.ok ? (await keyCheck.text()).trim() : "";
  if (keyBody !== KEY) {
    throw new Error(`Key file ${SITE}/${KEY}.txt is not live or wrong (status ${keyCheck.status}). Deploy first.`);
  }

  const args = process.argv.slice(2);
  const urls = args.length ? args.map(toUrl) : await sitemapUrls();
  const foreign = urls.filter((u) => new URL(u).host !== HOST);
  if (foreign.length) throw new Error(`Not on ${HOST}: ${foreign.join(", ")}`);

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

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
