"use client";

// Deterministic pseudo-random using a simple seed — pure, no Math.random during render
function seededValues(count: number) {
  const results = [];
  for (let i = 0; i < count; i++) {
    const seed = i * 9301 + 49297;
    const v1 = ((seed % 233280) / 233280); // 0-1
    const v2 = (((seed * 7 + 1) % 233280) / 233280);
    const v3 = (((seed * 13 + 3) % 233280) / 233280);
    results.push({
      id: i,
      left: Math.floor(v1 * 400 - 200),
      delay: (v2 * 0.6 + 0.2).toFixed(2),
      duration: (Math.floor(v3 * 8 + 2)).toString(),
    });
  }
  return results;
}

export function Meteors({ number = 20 }: { number?: number }) {
  const meteors = seededValues(number);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute h-0.5 w-0.5 rounded-full bg-slate-500 rotate-[215deg]"
          style={{
            top: -5,
            left: `${m.left}px`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
            animationName: "meteor",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          <span className="absolute top-1/2 -translate-y-1/2 w-[50px] h-[1px] bg-gradient-to-r from-indigo-400 to-transparent" />
        </span>
      ))}
    </div>
  );
}