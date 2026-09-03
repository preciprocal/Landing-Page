"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { APP_URL } from "@/lib/constants";
import { ArrowRightIcon } from "@/components/Icons";
import { FlipWords } from "@/components/ui/FlipWords";
import { SpotlightNew } from "@/components/ui/SpotlightNew";

// Aurora canvas

function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: true });
    if (!gl) return;

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const vert = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    const frag = `
      precision mediump float;
      uniform float u_t;
      uniform vec2  u_res;
      uniform vec2  u_mouse;

      #define PI 3.14159265359

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1,0)), u.x),
          mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p  = p * 2.1 + vec2(1.7, 9.2);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_res;
        uv.y = 1.0 - uv.y;

        vec2 m = u_mouse * 0.15;
        float t = u_t * 0.18;

        vec2 q = vec2(fbm(uv + t + m), fbm(uv + vec2(1.0) + t * 0.9));
        vec2 r = vec2(fbm(uv + q * 1.8 + vec2(1.7, 9.2) + t * 0.8 + m * 0.5),
                      fbm(uv + q * 1.8 + vec2(8.3, 2.8) + t * 0.7));

        float f = fbm(uv + r * 1.6);

        vec3 c1 = vec3(0.02, 0.02, 0.06);
        vec3 c2 = vec3(0.06, 0.05, 0.18);
        vec3 c3 = vec3(0.14, 0.07, 0.28);
        vec3 c4 = vec3(0.22, 0.05, 0.35);

        vec3 col = mix(c1, c2, clamp(f * 2.0, 0.0, 1.0));
        col = mix(col, c3, clamp(f * f * 3.5, 0.0, 1.0));
        col = mix(col, c4, clamp(pow(f, 4.0) * 5.0, 0.0, 1.0));

        vec2 vig = uv * 2.0 - 1.0;
        float v = 1.0 - dot(vig * vec2(0.7, 0.5), vig * vec2(0.7, 0.5));
        col *= v * 0.7;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uT     = gl.getUniformLocation(prog, "u_t");
    const uRes   = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    let raf: number;

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width  = Math.floor(w * 0.6);
      canvas.height = Math.floor(h * 0.6);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = () => {
      smoothMouse.current.x = lerp(smoothMouse.current.x, mouseRef.current.x, 0.03);
      smoothMouse.current.y = lerp(smoothMouse.current.y, mouseRef.current.y, 0.03);

      const t = (performance.now()) / 1000;
      gl.uniform1f(uT, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, smoothMouse.current.x, smoothMouse.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full"
      style={{ imageRendering: "auto" }}
    />
  );
}

// Hero

const WORDS = ["dream job.", "FAANG offer.", "career break.", "next chapter.", "big promotion."];

export default function Hero() {
  return (
    <section className="relative bg-[#050810] overflow-hidden" style={{ minHeight: "100svh" }}>

      {/* Full-bleed aurora */}
      <Aurora />

      {/* Spotlight, violet, sweeping from top-left */}
      <SpotlightNew
        className="-top-40 -left-20 z-[2]"
        fill="rgba(139,92,246,0.55)"
      />

      {/* Spotlight, fuchsia, sweeping from top-right (mirrored) */}
      <SpotlightNew
        className="-top-40 -right-20 z-[2] scale-x-[-1]"
        fill="rgba(232,121,249,0.35)"
      />

      {/* Dark overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 45%, rgba(5,8,16,0.45) 0%, rgba(5,8,16,0.75) 60%, rgba(5,8,16,0.97) 100%)",
        }}
      />

      {/* Vertical rule accent */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-[4]"
        style={{
          top: "calc(50% - 240px)",
          width: "1px",
          height: "80px",
          background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.5), transparent)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: "100svh" }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-400/70"
        >
          AI Job Search Platform
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-black tracking-[-0.03em] leading-[0.92] text-white select-none"
          style={{ fontSize: "clamp(3.8rem, 10vw, 8.5rem)" }}
        >
          Stop applying
          <br />
          <span
            className="relative inline-block"
            style={{
              backgroundImage: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 30%, #e879f9 65%, #a78bfa 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 5s ease-in-out infinite",
            }}
          >
            into the void.
          </span>
        </motion.h1>

        {/* Flip sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-xl sm:text-2xl font-semibold text-slate-400"
        >
          Start landing your{" "}
          <FlipWords
            words={WORDS}
            duration={2800}
            className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent font-bold"
          />
        </motion.p>

        {/* One-liner */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-5 text-[15px] text-slate-500 max-w-sm leading-relaxed font-light tracking-wide"
        >
          Mock interviews · Resume analysis · Cover letters · Job tracking
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          className="mt-11 flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href={`${APP_URL}/sign-up`}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[14px] font-semibold text-white transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)]"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7, #7c3aed)",
              backgroundSize: "200% 100%",
              animation: "shimmer 4s ease infinite",
            }}
          >
            Start Preparing Free
            <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[14px] font-medium text-slate-400 border border-white/10 transition-all duration-300 hover:text-white hover:border-white/25 hover:bg-white/5"
          >
            Explore features
          </a>
        </motion.div>

        {/* Trust */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-5 text-[11px] text-slate-600 tracking-wide"
        >
          No credit card · 30-day guarantee · Cancel anytime
        </motion.p>


      </div>

      {/* Shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}