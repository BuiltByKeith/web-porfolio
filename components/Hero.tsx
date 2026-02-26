"use client";

import { useEffect, useState } from "react";

interface HeroProps {
  imageUrl: string;
  tagLine?: string;
  subtitle?: string;
}

export default function Hero({
  imageUrl,
  tagLine = "Bring your Ideas to Life!",
  subtitle = "Gather, Build, and Deploy",
}: HeroProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t); // global clearTimeout — no Node import needed
  }, []);

  return (
    <section className="relative w-full h-150 min-h-120 overflow-hidden flex items-center ">
      {/* Background image — subtle ken-burns zoom out on mount */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-1800 ease-out will-change-transform ${
          visible ? "scale-100" : "scale-105"
        }`}
        style={{ backgroundImage: `url(${imageUrl})` }}
        role="img"
        aria-label="Hero background"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-black/90" />

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
      `}</style>
    </section>
  );
}
