"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
  as?: React.ElementType;
  borderClassName?: string;
}

export function MovingBorder({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderRadius = "1.25rem",
  as: Component = "button",
  borderClassName,
  ...props
}: MovingBorderProps & Record<string, unknown>) {
  return (
    <Component
      className={cn(
        "relative h-auto w-auto overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      style={{ borderRadius }}
      {...props}
    >
      <div className="absolute inset-0" style={{ borderRadius }}>
        <Border duration={duration} borderRadius={borderRadius} borderClassName={borderClassName} />
      </div>
      <div
        className={cn(
          "relative z-10 flex items-center justify-center gap-2 bg-base-50 backdrop-blur-xl",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
}

function Border({
  duration = 2000,
  borderRadius,
  borderClassName,
}: {
  duration: number;
  borderRadius: string;
  borderClassName?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0);

  const maskImage = useMotionTemplate`radial-gradient(100px 100px at ${x}px ${y}px, white, transparent)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={borderRadius}
          ry={borderRadius}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{ maskImage, WebkitMaskImage: maskImage }}
        className={cn(
          "absolute inset-0 rounded-xl border-none bg-[radial-gradient(#818cf8_40%,transparent_60%)]",
          borderClassName
        )}
      />
    </>
  );
}