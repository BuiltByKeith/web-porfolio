"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface HeroProps {
  imageUrl: string;
  tagLine?: string;
  subtitle?: string;
}

interface Particle {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
  bright: boolean;
}

const CELL = 28;

function initParticles(cols: number, rows: number): Particle[] {
  return Array.from({ length: cols }, (_, i) => ({
    x: i,
    y: Math.random() * rows * CELL,
    speed: 0.6 + Math.random() * 1.4,
    length: 4 + Math.floor(Math.random() * 8),
    opacity: 0.12 + Math.random() * 0.2,
    bright: Math.random() > 0.85,
  }));
}

export default function Hero({ imageUrl }: HeroProps) {
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const targetRef = useRef({ x: 50, y: 50 });
  const spotlightRef = useRef({ x: 50, y: 50 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const circuitRaf = useRef<number | null>(null);
  const lerpRaf = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);

  // Detect desktop (disable heavy effects on mobile)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Spotlight smooth lerp (desktop only)
  useEffect(() => {
    if (!isDesktop) return;

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
  }, [isDesktop]);

  // Circuit rain (desktop only)
  useEffect(() => {
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, w, h);

      const rows = Math.ceil(h / CELL);

      for (const p of particles.current) {
        const headX = p.x * CELL + CELL / 2;
        const headY = p.y;

        for (let i = 0; i < p.length; i++) {
          const trailY = headY - i * CELL;
          if (trailY < -CELL || trailY > h + CELL) continue;

          const alpha = p.opacity * (1 - i / p.length);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fillRect(headX - 0.5, trailY, 1, CELL);
        }

        p.y += p.speed;

        if (p.y > (rows + p.length) * CELL) {
          p.y = -p.length * CELL;
          p.speed = 0.6 + Math.random() * 1.4;
          p.length = 4 + Math.floor(Math.random() * 8);
        }
      }

      circuitRaf.current = requestAnimationFrame(draw);
    };

    circuitRaf.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      if (circuitRaf.current) cancelAnimationFrame(circuitRaf.current);
    };
  }, [isDesktop]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDesktop) return;

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
      className="relative w-full min-h-150 flex items-center justify-center md:justify-start overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={imageUrl}
          alt="Hero background"
          fill
          priority
          quality={75}
          className={`object-cover transition-transform duration-1800 ease-out ${
            visible ? "scale-100" : "scale-105"
          }`}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-black/90" />

      {/* Circuit Canvas (desktop only) */}
      {isDesktop && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-1 pointer-events-none opacity-10"
        />
      )}

      {/* Spotlight (desktop only) */}
      {isDesktop && (
        <div
          className="absolute inset-0 z-2 pointer-events-none"
          style={{
            background: `radial-gradient(circle 380px at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.07) 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Content */}
      <div
        className={`relative z-10 px-6 sm:px-10 md:px-20 max-w-4xl text-center md:text-left transition-all duration-1000 ease-out delay-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h1
          className="text-white font-bold leading-tight mb-6 text-4xl sm:text-5xl md:text-6xl"
          style={{ fontSize: "clamp(2.8rem, 6vw, 4rem)" }}
        >
          I{" "}
          <span className="text-gradient bg-linear-to-r from-blue-600  to-blue-300 bg-clip-text text-transparent">
            B
          </span>
          <span className="text-gradient bg-linear-to-r from-red-600  to-red-400 bg-clip-text text-transparent">
            u
          </span>
          <span className="text-gradient bg-linear-to-r from-yellow-600  to-yellow-300 bg-clip-text text-transparent">
            i
          </span>
          <span className="text-gradient bg-linear-to-r from-green-600  to-green-300 bg-clip-text text-transparent">
            l
          </span>
          <span className="text-gradient bg-linear-to-r from-blue-600  to-blue-300 bg-clip-text text-transparent">
            d
          </span>{" "}
          websites, they somehow work 🍀
        </h1>

        <p className="text-white/50 text-xs sm:text-sm tracking-[0.25em] uppercase font-light">
          — Built•by•Keith
        </p>
      </div>
    </section>
  );
}
