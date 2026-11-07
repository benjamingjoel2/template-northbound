"use client";

import config from "@config";
import { motion, useScroll, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useScrollValue, useAfterLoad, useReducedMotion } from "@/lib/hooks";
import { GridLines } from "./GridLines";
import { Photo } from "./Photo";
import { WatchFilmButton } from "./Providers";

/** Three cloud layers that rise and thicken as the hero scrolls away. */
function Clouds({ progress, load, className = "" }: { progress: MotionValue<number>; load: boolean; className?: string }) {
  const reduced = useReducedMotion();
  const y1 = useScrollValue(progress, [0, 1], ["35%", "-25%"]);
  const y2 = useScrollValue(progress, [0, 1], ["55%", "-10%"]);
  const y3 = useScrollValue(progress, [0, 1], ["75%", "0%"]);
  const o1 = useScrollValue(progress, [0, 0.02, 0.35, 1], [0, 0.35, 0.9, 1]);
  const o2 = useScrollValue(progress, [0, 0.02, 0.4, 1], [0, 0.2, 0.85, 1]);
  const o3 = useScrollValue(progress, [0, 0.5, 1], [0, 0.9, 1]);
  const [c1, c2, c3] = config.hero.clouds;

  const layers = [
    { y: y1, o: o1, src: c1, anim: "drift 38s ease-in-out infinite alternate", h: "70%" },
    { y: y2, o: o2, src: c2, anim: "drift-rev 46s ease-in-out infinite alternate", h: "80%" },
    { y: y3, o: o3, src: c3, anim: "drift 54s ease-in-out infinite alternate", h: "90%" },
  ];

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          className="absolute inset-x-[-12%] bottom-0"
          style={{ y: reduced ? 0 : layer.y, opacity: layer.o, height: layer.h }}
        >
          <div
            className="h-full w-full bg-[length:100%_100%] bg-no-repeat"
            style={{
              backgroundImage: load && layer.src ? `url(${layer.src})` : undefined,
              animation: reduced ? "none" : layer.anim,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/** Dark film hero with the giant word, rising clouds and a fade to white. */
export function GiantHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const loaded = useAfterLoad();
  const { hero, destination } = config;

  // Pick the film only after load, and never on data-saver or slow connections.
  let filmSrc: string | null = null;
  if (!reduced && loaded) {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = conn?.saveData || /(^|-)(2g|3g)$/.test(conn?.effectiveType ?? "");
    if (!slow) filmSrc = window.matchMedia("(max-width: 767px)").matches ? hero.film.srcSmall : hero.film.src;
  }

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useScrollValue(scrollYProgress, [0, 1], [1, 1.12]);
  const wordY = useScrollValue(scrollYProgress, [0, 0.6], ["0%", "-55%"]);
  const wordOpacity = useScrollValue(scrollYProgress, [0.25, 0.7], [1, 0]);
  const topOpacity = useScrollValue(scrollYProgress, [0, 0.18], [1, 0]);
  const whiteOut = useScrollValue(scrollYProgress, [0.5, 0.88], [0, 1]);

  return (
    <section
      data-hero="dark"
      ref={ref}
      className="relative h-[185vh] bg-white"
      aria-label={`${hero.word} — ${destination.eyebrow}`}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-hero-backdrop">
        <motion.div className="absolute inset-0" style={{ scale: reduced ? 1 : scale }}>
          <Photo photo={hero.poster} priority sizes="100vw" className="object-cover" />
          {filmSrc ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
              src={filmSrc}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-night/30 via-transparent to-night/25" />
        </motion.div>

        <GridLines tone="light" />

        <motion.div className="absolute inset-x-0 top-[30%] z-10 px-5 md:top-[32%]" style={{ opacity: topOpacity }}>
          <div className="flex items-start justify-between gap-6">
            <p className="t-eyebrow max-w-[16rem] text-white md:ml-[calc((100vw-40px)/12*1+20px)]">
              {hero.lines[0]}
              {hero.lines[1] ? (
                <>
                  <br />
                  {hero.lines[1]}
                </>
              ) : null}
            </p>
            <div className="hidden md:block md:mr-[calc((100vw-40px)/12*1)]">
              <WatchFilmButton />
            </div>
          </div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-[3vh] z-10 text-center text-white md:bottom-[2vh]">
          <motion.div style={{ y: reduced ? 0 : wordY, opacity: wordOpacity }}>
            <p className="t-spaced mb-3 text-white/90 md:mb-1">{destination.eyebrow}</p>
            <h1
              className="t-giant whitespace-nowrap"
              style={{ ["--giant-chars" as string]: Math.max(7, hero.word.length) }}
            >
              {hero.word}
            </h1>
          </motion.div>
          <div className="mt-6 md:hidden">
            <WatchFilmButton />
          </div>
        </div>

        <Clouds progress={scrollYProgress} load={loaded} className="z-20" />

        {/* pointer-events-none: the fade layer must not block the Watch film button underneath. */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-30 bg-white" style={{ opacity: whiteOut }} />
      </div>
    </section>
  );
}
