"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useCallback } from "react";

export function InfiniteMovingCards({ items, direction = "left", speed = "normal", pauseOnHover = true, className }: {
  items: { quote: string; name: string; title: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const initialized = useRef(false);

  const setup = useCallback(() => {
    if (!containerRef.current || !scrollerRef.current || initialized.current) return;
    initialized.current = true;

    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      scrollerRef.current?.appendChild(item.cloneNode(true));
    });

    containerRef.current.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse");
    containerRef.current.style.setProperty("--animation-duration", speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s");
    scrollerRef.current.classList.add("animate-scroll");
  }, [direction, speed]);

  useEffect(() => {
    setup();
  }, [setup]);

  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20 max-w-7xl overflow-hidden", className)}
      style={{
        maskImage: "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
      }}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 w-max flex-nowrap py-4",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li key={idx} className="w-[350px] max-w-full relative rounded-2xl border border-white/[0.08] flex-shrink-0 bg-white/[0.03] px-8 py-6 md:w-[450px]">
            <blockquote>
              <div className="relative z-20 text-sm leading-relaxed text-slate-300 font-normal">&ldquo;{item.quote}&rdquo;</div>
              <div className="relative z-20 mt-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                  {item.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-200">{item.name}</span>
                  <span className="text-xs text-slate-500">{item.title}</span>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}