"use client";

import { useEffect, useRef, useState } from "react";

interface HeroProps {
  imageUrl: string;
  tagLine?: string;
  subtitle?: string;
}

// ── Circuit rain particle ──────────────────────────────────────────────────
interface Particle {
  x: number; // grid column (in cells)
  y: number; // current Y position (px)
  speed: number; // px per frame
  length: number; // trail length in cells
  opacity: number;
  bright: boolean; // head glows brighter
}

const CELL = 28; // grid size in px

function initParticles(cols: number, rows: number): Particle[] {
  return Array.from({ length: cols }, (_, i) => ({
    x: i,
    y: Math.random() * rows * CELL,
    speed: 0.6 + Math.random() * 1.4,
    length: 4 + Math.floor(Math.random() * 8),
    opacity: 0.15 + Math.random() * 0.25,
    bright: Math.random() > 0.8,
  }));
}

// ── Component ──────────────────────────────────────────────────────────────
export default function Hero({
  imageUrl,
  tagLine = "Bring your Ideas to Life",
  subtitle = "Gather, Build, and Deploy",
}: HeroProps) {
  const [visible, setVisible] = useState(false);

  // Cursor lerp
  const targetRef = useRef({ x: 50, y: 50 });
  const spotlightRef = useRef({ x: 50, y: 50 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const lerpRaf = useRef<number | null>(null);

  // Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const circuitRaf = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);

  // ── Mount fade-in ────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  // ── Spotlight lerp loop ──────────────────────────────────────────────────
  useEffect(() => {
    const LERP = 0.06;
    const tick = () => {
      spotlightRef.current = {
        x:
          spotlightRef.current.x +
          (targetRef.current.x - spotlightRef.current.x) * LERP,
        y:
          spotlightRef.current.y +
          (targetRef.current.y - spotlightRef.current.y) * LERP,
      };
      setSpotlight({ ...spotlightRef.current });
      lerpRaf.current = requestAnimationFrame(tick);
    };
    lerpRaf.current = requestAnimationFrame(tick);
    return () => {
      if (lerpRaf.current) cancelAnimationFrame(lerpRaf.current);
    };
  }, []);

  // ── Circuit rain canvas ──────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
      const cols = Math.ceil(canvas.width / CELL);
      const rows = Math.ceil(canvas.height / CELL);
      particles.current = initParticles(cols, rows);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const ctx = canvas.getContext("2d")!;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Fade trail — slightly transparent fill each frame
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, w, h);

      const rows = Math.ceil(h / CELL);

      for (const p of particles.current) {
        const headX = p.x * CELL + CELL / 2;
        const headY = p.y;

        // Trail — fade from head upward
        for (let i = 0; i < p.length; i++) {
          const trailY = headY - i * CELL;
          if (trailY < -CELL || trailY > h + CELL) continue;

          const alpha = p.opacity * (1 - i / p.length);

          if (i === 0 && p.bright) {
            // Bright glowing head
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(255,255,255,0.9)";
            ctx.fillStyle = `rgba(255,255,255,${Math.min(alpha * 3.5, 1)})`;
            ctx.fillRect(headX - 1, trailY - 3, 2, 6);
            ctx.shadowBlur = 0;
          } else {
            // Segment — randomly horizontal or vertical stub
            const isNode = Math.random() > 0.92 && i > 0 && i < p.length - 1;
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            if (isNode) {
              // Small horizontal branch
              const dir = Math.random() > 0.5 ? 1 : -1;
              ctx.fillRect(headX, trailY, dir * (CELL * 0.6), 1);
              ctx.fillRect(headX + dir * CELL * 0.6, trailY, 1, CELL * 0.4);
            } else {
              ctx.fillRect(headX - 0.5, trailY, 1, CELL);
            }
          }
        }

        // Advance
        p.y += p.speed;
        if (p.y > (rows + p.length) * CELL) {
          p.y = -p.length * CELL;
          p.speed = 0.6 + Math.random() * 1.4;
          p.length = 4 + Math.floor(Math.random() * 8);
          p.bright = Math.random() > 0.8;
        }
      }

      circuitRaf.current = requestAnimationFrame(draw);
    };

    circuitRaf.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      if (circuitRaf.current) cancelAnimationFrame(circuitRaf.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-svh min-h-150 overflow-hidden flex items-center"
    >
      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-1800 ease-out will-change-transform ${
          visible ? "scale-100" : "scale-105"
        }`}
        style={{ backgroundImage: `url(${imageUrl})` }}
        role="img"
        aria-label="Hero background"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-black/90" />

      {/* Circuit rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-1 pointer-events-none opacity-10"
      />

      {/* Lagging cursor spotlight — sits above canvas */}
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          background: `radial-gradient(circle 380px at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.07) 0%, transparent 70%)`,
        }}
      />

      {/* Floating orbs */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-white/5 blur-3xl animate-[floatA_8s_ease-in-out_infinite]" />
        <div className="absolute top-[50%] right-[8%] w-80 h-80 rounded-full bg-white/4 blur-3xl animate-[floatB_11s_ease-in-out_infinite]" />
        <div className="absolute bottom-[10%] left-[35%] w-52 h-52 rounded-full bg-white/5 blur-2xl animate-[floatC_9s_ease-in-out_infinite]" />
      </div>

      {/* Text content */}
      <div
        className={`relative z-10 px-10 md:px-20 max-w-4xl transition-all duration-1000 ease-out delay-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h1
          className="text-white font-light leading-[1.1] tracking-tight mb-4"
          style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
        >
          {tagLine}
        </h1>
        <p className="text-white/50 text-sm tracking-[0.22em] uppercase font-light">
          {subtitle}
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-opacity duration-1000 delay-1200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-white/40 text-[0.6rem] tracking-[0.2em] uppercase">
          Scroll Down
        </span>
        <div className="w-px h-10 bg-linear-to-b from-white/40 to-transparent animate-[scrollDrop_1.8s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes scrollDrop {
          0%   { transform: scaleY(0); transform-origin: top;    opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        @keyframes floatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(24px, -32px) scale(1.08); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-20px, 28px) scale(0.95); }
        }
        @keyframes floatC {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(16px, -20px) scale(1.05); }
        }
      `}</style>
    </section>
  );
}
