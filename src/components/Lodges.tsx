"use client";

import config from "@config";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { formatCoordinates } from "@/lib/format";
import { useScrollValue, useReducedMotion } from "@/lib/hooks";
import { PlaceholderFlag } from "./Flags";
import { GridLines } from "./GridLines";
import { Photo } from "./Photo";

type Stay = (typeof config.stays)[number];

function StayCard({ stay }: { stay: Stay }) {
  return (
    <a
      href={stay.href}
      className="group relative flex aspect-[4/3] w-full flex-col items-center overflow-hidden rounded-[6px] bg-white/10 p-5 text-center text-white shadow-[0_30px_80px_-30px_rgba(11,13,16,.6)] backdrop-blur-xl md:w-[min(50vw,720px)]"
    >
      <h3 className="t-h3 relative z-10 mt-2">{stay.name}</h3>
      <p className="relative z-10 mx-auto mt-3 max-w-[30rem] text-[13px] font-medium leading-snug text-white/90">
        {stay.excerpt}
      </p>
      <div className="absolute inset-x-5 bottom-5 top-[34%] overflow-hidden rounded-[3px]">
        <Photo
          photo={stay.photo}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/50 to-transparent" />
      </div>
      <p className="t-label absolute bottom-9 z-10 tracking-[0.04em]">[ {formatCoordinates(stay.coordinates)} ]</p>
      {stay.placeholder ? (
        <span className="absolute right-8 top-[calc(34%+12px)] z-10">
          <PlaceholderFlag label="Placeholder name" tone="dark" />
        </span>
      ) : null}
    </a>
  );
}

/** Full-bleed photo that opens out, then the stays slide across sideways. */
export function Lodges() {
  const reduced = useReducedMotion();
  const stays = config.stays;
  const section = config.staysSection;

  const openRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: openProgress } = useScroll({ target: openRef, offset: ["start end", "end end"] });
  const inset = useScrollValue(openProgress, [0.1, 0.8], ["8% 10% 8% 10%", "0% 0% 0% 0%"]);
  const clipPath = useTransform(inset, (v) => `inset(${v})`);
  const introOpacity = useScrollValue(openProgress, [0.55, 0.85], [0, 1]);

  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: trackProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const listX = useScrollValue(trackProgress, [0, 1], ["0%", `-${((stays.length - 1) * 100) / (stays.length + 0.6)}%`]);
  const backdropX = useScrollValue(trackProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section id="lodges" aria-labelledby="our-lodges" className="relative bg-white text-white">
      <div ref={openRef} className="relative h-[170vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ clipPath: reduced ? undefined : clipPath }}>
            <Photo photo={section.photo} sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-night/20" />
          </motion.div>
          <GridLines tone="light" />
          <div className="relative z-10 grid h-full grid-cols-4 content-center gap-5 px-5 md:grid-cols-12">
            <h2 id="our-lodges" className="t-display col-span-4 text-center md:col-span-6 md:col-start-4">
              {section.heading}
            </h2>
            <motion.div
              className="col-span-4 md:col-span-3 md:col-start-9 md:-mt-[2em]"
              style={{ opacity: reduced ? 1 : introOpacity }}
            >
              <h3 className="t-label mb-2">{section.label}</h3>
              <p className="t-body max-w-[19rem]">{section.body}</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div ref={trackRef} className="relative hidden md:block" style={{ height: `${85 * stays.length + 60}vh` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <motion.div className="absolute inset-y-0 left-0 w-[115%]" style={{ x: reduced ? 0 : backdropX }}>
            <Photo photo={section.backdrop} alt="" sizes="115vw" className="object-cover" />
            <div className="absolute inset-0 bg-ink/25" />
          </motion.div>
          <motion.ul
            className="relative z-10 flex h-full items-center gap-[8vw] pl-[30vw]"
            style={{ x: reduced ? 0 : listX }}
          >
            {stays.map((s) => (
              <li key={s.slug} className="shrink-0">
                <StayCard stay={s} />
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      <div className="relative md:hidden">
        <Photo photo={section.backdrop} alt="" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/25" />
        <ul className="relative z-10 space-y-6 px-3 py-16">
          {stays.map((s) => (
            <li key={s.slug}>
              <StayCard stay={s} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
