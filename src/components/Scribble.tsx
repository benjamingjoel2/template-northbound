"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/hooks";

/** Hand-drawn underline that draws itself under a heading. */
export function Scribble({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const reduced = useReducedMotion();
  return (
    <svg aria-hidden viewBox="0 0 320 60" className={`pointer-events-none ${className}`} fill="none">
      <motion.path
        d="M8 34c40-10 120-22 190-20 44 1 70 5 110 2M30 46c26-14 80-20 150-19 30 0 50 3 70 8-60-6-130-8-210 4M60 52c50-5 110-8 200-4"
        style={{ stroke: tone === "dark" ? "color-mix(in srgb, var(--color-ink) 55%, transparent)" : "rgba(255,255,255,.6)" }}
        strokeWidth="0.9"
        strokeLinecap="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
