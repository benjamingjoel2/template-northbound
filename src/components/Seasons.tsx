"use client";

import config from "@config";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { useScrollValue, useReducedMotion } from "@/lib/hooks";
import { VerifyFlag } from "./Flags";
import { GridLines } from "./GridLines";
import { Photo } from "./Photo";

/** Season picker: hovering a season cross-fades the drifting photo behind it. */
export function Seasons() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const items = config.seasons.items;
  const [active, setActive] = useState(items[0].key);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useScrollValue(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const season = items.find((s) => s.key === active) ?? items[0];

  return (
    <section
      id="seasons"
      ref={ref}
      className="relative min-h-[150vh] overflow-hidden bg-white text-ink md:min-h-[170vh]"
    >
      <motion.div className="absolute inset-x-0 bottom-0 top-[18vh]" style={{ y: reduced ? 0 : y }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={season.key}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <Photo photo={season.photo} sizes="100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-white via-white/85 to-transparent"
      />
      <GridLines />
      <div className="relative z-10 grid grid-cols-4 gap-5 px-5 pt-[8vh] md:grid-cols-12">
        <div className="col-span-4 md:col-span-3 md:col-start-2">
          <h2 className="t-label mb-3">{config.seasons.heading}</h2>
          <ul className="space-y-6">
            {items.map((s) => (
              <li key={s.key}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(s.key)}
                  onFocus={() => setActive(s.key)}
                  onClick={() => setActive(s.key)}
                  aria-pressed={active === s.key}
                  className={`block text-left transition-opacity ${active === s.key ? "opacity-100" : "opacity-55 hover:opacity-90"}`}
                >
                  <span className="t-eyebrow block text-[17px]">
                    {s.name} <span className="font-sans text-[12px] not-italic tracking-wide">· {s.months}</span>
                  </span>
                  <span className="t-body mt-1 block max-w-[19rem]">{s.body}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <VerifyFlag note={season.verify} />
          </div>
        </div>
      </div>
    </section>
  );
}
