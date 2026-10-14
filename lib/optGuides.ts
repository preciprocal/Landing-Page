/**
 * lib/optGuides.ts
 *
 * The /opt topic cluster. One list drives the in-page guide nav, the /opt hub,
 * the footer and the sitemap, so a new guide only needs adding here to be
 * linked from every page in the cluster.
 */

export const OPT_GUIDES = [
  { href: "/opt/fees", label: "OPT and STEM OPT fees", blurb: "What you pay today, and the proposed $70,000 and $30,000 fees." },
  { href: "/opt/how-to-apply", label: "How to apply for OPT", blurb: "Filing windows, the I-765, and a deadline calculator." },
  { href: "/opt/unemployment-calculator", label: "OPT unemployment calculator", blurb: "Count your 90 or 150 days, and what stops the clock." },
  { href: "/opt/stem-opt-extension", label: "STEM OPT extension", blurb: "Eligibility, E-Verify, the I-983, and reporting." },
  { href: "/opt/self-employment", label: "Self-employment on OPT, STEM OPT and H-1B", blurb: "When you can work for your own company." },
  { href: "/opt/cap-gap", label: "Cap-gap extension", blurb: "Staying in status from OPT to H-1B, now to April 1." },
  { href: "/new-opt-rules", label: "New OPT rules tracker", blurb: "Every pending and blocked rule change, with dates." },
] as const;
