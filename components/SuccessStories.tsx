"use client";

/**
 * components/SuccessStories.tsx
 *
 * Approved success stories, shown near the refund copy on /pricing because they
 * are the evidence for the Success Refund claim.
 *
 * Renders nothing at all until at least one story is approved, so at launch the
 * page simply does not have this section rather than showing an empty shell.
 *
 * Layout notes: the quote takes the flexible space and the attribution block is
 * pinned to the card bottom by `mt-auto`, so names and roles align across a row
 * no matter how long each quote runs.
 *
 * All consent handling lives in lib/successStories.ts. Do not read
 * `permissions` directly here.
 */

import { useEffect, useState } from "react";
// lucide-react v1 dropped brand icons, and the repo carries no LinkedIn mark,
// so the outbound link uses a generic external-link affordance.
import { ExternalLink } from "lucide-react";
import { getSuccessStoryViews, type SuccessStoryView } from "@/lib/successStories";
import { RevealOnScroll, StaggerChildren, StaggerItem } from "@/components/LandingAnimations";

export default function SuccessStories() {
  const [stories, setStories] = useState<SuccessStoryView[] | null>(null);

  useEffect(() => {
    let active = true;
    getSuccessStoryViews()
      .then((views) => {
        if (active) setStories(views);
      })
      .catch(() => {
        // A marketing page must not break on this. Treat any failure as "none yet".
        if (active) setStories([]);
      });
    return () => {
      active = false;
    };
  }, []);

  // null = still loading, [] = none approved. Both render nothing, so the page
  // never flashes an empty section or a skeleton that outlives the data.
  if (!stories || stories.length === 0) return null;

  return (
    <section aria-label="Success stories" className="relative px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48 py-20">
      <div className="w-full">
        <RevealOnScroll className="text-center mb-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-400 mb-3">
            Success stories
          </p>
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-white tracking-tight mb-3">
            People who landed, and got that month back
          </h2>
          <p className="text-[13px] text-slate-500 leading-relaxed max-w-md mx-auto">
            Each one was submitted by a subscriber claiming the Success Refund, and shared
            with their permission.
          </p>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {stories.map((story) => (
            <StaggerItem key={story.id} className="flex flex-col">
              <figure
                className="flex flex-col flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6
                           hover:border-white/[0.14] transition-colors duration-300"
              >
                <blockquote className="text-[13px] text-slate-300 leading-relaxed">
                  <span className="text-emerald-400/50 mr-0.5" aria-hidden="true">
                    &ldquo;
                  </span>
                  {story.testimonial}
                  <span className="text-emerald-400/50 ml-0.5" aria-hidden="true">
                    &rdquo;
                  </span>
                </blockquote>

                {story.embedUrl && (
                  <iframe
                    src={story.embedUrl}
                    title={`LinkedIn post by ${story.attribution}`}
                    loading="lazy"
                    className="w-full mt-5 rounded-xl border border-white/[0.06]"
                    height={340}
                    allowFullScreen
                  />
                )}

                <figcaption className="mt-auto pt-5">
                  <div className="h-px bg-white/[0.06] mb-4" />
                  <p className="text-[13px] font-semibold text-white leading-tight">
                    {story.attribution}
                  </p>
                  {story.roleLine && (
                    <p className="mt-1 text-[12px] text-slate-500 leading-tight">
                      {story.roleLine}
                    </p>
                  )}
                  {story.linkUrl && (
                    <a
                      href={story.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      Read their LinkedIn post
                    </a>
                  )}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
