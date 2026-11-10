/**
 * scripts/generate-og-image.mjs
 *
 * Renders the 1200x630 share image every page points to (openGraph and
 * twitter metadata). Run it whenever the positioning or prices change, so
 * the image never says something the site no longer does:
 *
 *   node scripts/generate-og-image.mjs
 *
 * The previous image was a hand-made PNG that still called Preciprocal "the
 * AI job search OS", carried a "Trusted by 25,000+ job seekers" figure the
 * site had already removed as unsubstantiated (see SocialProofStrip.tsx),
 * and an outdated "30-day guarantee". Keeping the copy here, in text, makes
 * that drift reviewable.
 *
 * CACHE BUSTING: LinkedIn, X and Slack cache share images by URL, so a new
 * image at the same URL keeps showing the old one. When the image changes,
 * bump OG_VERSION here AND replace the old filename in every
 * "https://preciprocal.com/og-image-vN.png" reference across app/,
 * components/ and lib/. The unversioned public/og-image.png is written too,
 * as a fallback for anything that still points at it.
 *
 * Fonts: Inter, the site's own typeface, from scripts/fonts (TTF, since the
 * renderer cannot read woff2; Inter is SIL Open Font License). v3 is a
 * minimal redesign: one message, the brand, the URL. No chips, no button
 * pill, no gradient text.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

const OG_VERSION = 3;

const font = (w) => readFileSync(`scripts/fonts/Inter-${w}.ttf`);
const logo = `data:image/png;base64,${readFileSync("public/logo.png").toString("base64")}`;

const COPY = {
  line1: "Your OPT clock",
  line2: "is running.",
  sub: "Land the job before it runs out.",
  footerLeft: "preciprocal.com",
  footerRight: "For F-1 students on OPT",
};

const INK = "#f8fafc";
const MUTED = "#94a3b8";
const FAINT = "#64748b";
const ACCENT = "#a5b4fc";

const image = h(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "64px 80px 56px",
      backgroundColor: "#06080f",
      // One faint light, high in the top left; a long, gentle falloff so it
      // reads as atmosphere, not a glow.
      backgroundImage: "radial-gradient(ellipse 900px 520px at 0% 0%, rgba(99,102,241,0.16), rgba(99,102,241,0.06) 45%, rgba(6,8,15,0) 75%)",
      fontFamily: "Inter",
      color: INK,
    },
  },
  h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 14 } },
    h("img", { src: logo, width: 36, height: 36, style: { borderRadius: 8 } }),
    h("div", { style: { display: "flex", fontSize: 26, fontWeight: 500, letterSpacing: -0.4, color: INK } }, "Preciprocal")
  ),
  h("div", { style: { display: "flex", flexGrow: 1 } }),
  h(
    "div",
    { style: { display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 700, letterSpacing: -4.2, lineHeight: 1.0 } },
    h("div", { style: { display: "flex", color: INK } }, COPY.line1),
    h("div", { style: { display: "flex", color: ACCENT, marginTop: 6 } }, COPY.line2)
  ),
  h("div", { style: { display: "flex", fontSize: 32, fontWeight: 400, letterSpacing: -0.4, color: MUTED, marginTop: 30 } }, COPY.sub),
  h("div", { style: { display: "flex", flexGrow: 1 } }),
  h("div", { style: { display: "flex", height: 1, backgroundColor: "rgba(255,255,255,0.10)", marginBottom: 24 } }),
  h(
    "div",
    { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, fontWeight: 500, letterSpacing: -0.2 } },
    h("div", { style: { display: "flex", color: MUTED } }, COPY.footerLeft),
    h("div", { style: { display: "flex", color: FAINT } }, COPY.footerRight)
  )
);

const res = new ImageResponse(image, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Inter", data: font(400), weight: 400, style: "normal" },
    { name: "Inter", data: font(500), weight: 500, style: "normal" },
    { name: "Inter", data: font(700), weight: 700, style: "normal" },
  ],
});
const png = Buffer.from(await res.arrayBuffer());
for (const out of [`public/og-image-v${OG_VERSION}.png`, "public/og-image.png"]) {
  writeFileSync(out, png);
  console.log(`Wrote ${out}`);
}
