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
 * Fonts: Segoe UI from the Windows font folder, since next/og's bundled
 * font has no bold weight. On another OS, point FONT_DIR at any TTF pair.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

const OG_VERSION = 2;

const FONT_DIR = process.env.FONT_DIR ?? "C:/Windows/Fonts";
const regular = readFileSync(`${FONT_DIR}/segoeui.ttf`);
const bold = readFileSync(`${FONT_DIR}/segoeuib.ttf`);
const logo = `data:image/png;base64,${readFileSync("public/logo.png").toString("base64")}`;

const COPY = {
  line1: "Stop applying",
  line2: "into the void.",
  sub: "The AI career prep platform for students and new grads. Mock interviews, resume scoring, cover letters and job tracking.",
  chips: ["AI Mock Interviews", "Resume ATS Score", "Cover Letters", "Job Tracker"],
  footerRight: "Free plan  ·  Pro from $9.99/mo",
};

const row = (style, ...children) => h("div", { style: { display: "flex", ...style } }, ...children);

const image = h(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "56px 60px 44px",
      backgroundColor: "#050810",
      backgroundImage:
        "radial-gradient(circle at 12% 0%, rgba(99,102,241,0.28), transparent 45%), radial-gradient(circle at 100% 100%, rgba(168,85,247,0.22), transparent 45%)",
      border: "1px solid rgba(255,255,255,0.08)",
      fontFamily: "Segoe UI",
      color: "#e2e8f0",
    },
  },
  row(
    { alignItems: "center", justifyContent: "space-between" },
    row(
      { alignItems: "center", gap: 14 },
      h("img", { src: logo, width: 44, height: 44, style: { borderRadius: 10 } }),
      h("div", { style: { fontSize: 26, color: "#e2e8f0" } }, "Preciprocal")
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          padding: "10px 22px",
          borderRadius: 999,
          backgroundImage: "linear-gradient(90deg, #6366f1, #a855f7)",
          color: "#ffffff",
          fontSize: 20,
          fontWeight: 700,
        },
      },
      "Try free"
    )
  ),
  h("div", { style: { display: "flex", height: 1, backgroundColor: "rgba(255,255,255,0.35)", marginTop: 26, marginBottom: 34 } }),
  h("div", { style: { display: "flex", fontSize: 92, fontWeight: 700, color: "#ffffff", lineHeight: 1.02, letterSpacing: -2 } }, COPY.line1),
  h(
    "div",
    {
      style: {
        display: "flex",
        fontSize: 92,
        fontWeight: 700,
        lineHeight: 1.08,
        letterSpacing: -2,
        backgroundImage: "linear-gradient(90deg, #818cf8, #c084fc)",
        backgroundClip: "text",
        color: "transparent",
      },
    },
    COPY.line2
  ),
  h("div", { style: { display: "flex", fontSize: 24, color: "#94a3b8", marginTop: 20, maxWidth: 900, lineHeight: 1.4 } }, COPY.sub),
  row(
    { gap: 12, marginTop: 24, marginBottom: 28 },
    ...COPY.chips.map((c) =>
      h(
        "div",
        {
          key: c,
          style: {
            display: "flex",
            padding: "8px 16px",
            borderRadius: 999,
            border: "1px solid rgba(129,140,248,0.35)",
            backgroundColor: "rgba(99,102,241,0.12)",
            color: "#c7d2fe",
            fontSize: 18,
          },
        },
        c
      )
    )
  ),
  h("div", { style: { display: "flex", flexGrow: 1 } }),
  h("div", { style: { display: "flex", height: 1, backgroundColor: "rgba(255,255,255,0.35)", marginBottom: 20 } }),
  row(
    { justifyContent: "space-between", alignItems: "center", fontSize: 20 },
    h("div", { style: { display: "flex", color: "#818cf8" } }, "preciprocal.com"),
    h("div", { style: { display: "flex", color: "#64748b" } }, COPY.footerRight)
  )
);

const res = new ImageResponse(image, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Segoe UI", data: regular, weight: 400, style: "normal" },
    { name: "Segoe UI", data: bold, weight: 700, style: "normal" },
  ],
});
const png = Buffer.from(await res.arrayBuffer());
for (const out of [`public/og-image-v${OG_VERSION}.png`, "public/og-image.png"]) {
  writeFileSync(out, png);
  console.log(`Wrote ${out}`);
}
