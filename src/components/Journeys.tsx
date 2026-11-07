"use client";

import config from "@config";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";
import { GridLines } from "./GridLines";
import { Photo } from "./Photo";
import { Price } from "./Providers";
import { Reveal } from "./Reveal";
import { Scribble } from "./Scribble";

type Journey = (typeof config.journeys)[number];

function CardTitle({ journey }: { journey: Journey }) {
  return (
    <>
      {journey.cardTitle[0]}
      {journey.cardTitle[1] ? (
        <>
          <br />
          {journey.cardTitle[1]}
        </>
      ) : null}
    </>
  );
}

/** Desktop: an accordion of tall cards that opens one at a time. Phones: a swipeable row. */
function CardFlick({ items }: { items: Journey[] }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const t = setInterval(() => setActive((i) => (i + 1) % items.length), 6500);
    return () => clearInterval(t);
  }, [reduced, paused, items.length]);

  return (
    <div>
      <div
        className="hidden h-[min(72vh,600px)] gap-0 px-2 md:flex"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {items.map((j, i) => {
          const open = i === active;
          return (
            <div
              key={j.slug}
              className="relative h-full min-w-0 overflow-hidden"
              style={{ flexGrow: open ? 7 : 1, flexBasis: 0, transition: "flex-grow 900ms cubic-bezier(.65,0,.35,1)" }}
              onMouseEnter={() => setActive(i)}
            >
              <a
                href={j.href}
                onFocus={() => setActive(i)}
                className="group absolute inset-0 block text-white"
                aria-label={`${j.title} — ${j.seasonLabel}`}
              >
                <Photo
                  photo={j.photo}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className={`object-cover transition-[filter,transform] duration-[1200ms] ${open ? "scale-100 blur-0" : "scale-110 blur-[10px]"}`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-night/55 via-night/5 to-night/25 transition-opacity duration-700 ${open ? "opacity-100" : "opacity-40"}`}
                />
                <motion.div
                  className="absolute inset-0 flex flex-col justify-between p-8 lg:p-10"
                  animate={{ opacity: open ? 1 : 0 }}
                  transition={{ duration: open ? 0.8 : 0.25, delay: open ? 0.35 : 0 }}
                  aria-hidden={!open}
                >
                  <h3 className="t-italic-title w-[18ch] font-normal">
                    <CardTitle journey={j} />
                  </h3>
                  <div className="max-w-[23rem]">
                    <p className="mb-3 flex items-center gap-3 text-[13px] font-semibold">
                      <Price usd={j.priceFromUSD} />
                      <span className="h-3.5 w-px bg-white/60" />
                      <span>{j.seasonLabel}</span>
                    </p>
                    <p className="text-[14px] font-medium leading-[1.45] text-white/90">{j.excerpt}</p>
                  </div>
                </motion.div>
              </a>
            </div>
          );
        })}
      </div>

      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-3 pb-2 [scrollbar-width:none] md:hidden">
        {items.map((j) => (
          <a
            key={j.slug}
            href={j.href}
            className="relative aspect-[3/4] w-[84vw] shrink-0 snap-center overflow-hidden text-white"
          >
            <Photo photo={j.photo} sizes="84vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/65 via-transparent to-night/30" />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <h3 className="t-italic-title text-[2rem]">
                <CardTitle journey={j} />
              </h3>
              <div>
                <p className="mb-2 flex items-center gap-3 text-[13px] font-semibold">
                  <Price usd={j.priceFromUSD} />
                  <span className="h-3.5 w-px bg-white/60" />
                  <span>{j.seasonLabel}</span>
                </p>
                <p className="text-[14px] leading-[1.45] text-white/90">{j.excerpt}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function Journeys() {
  return (
    <section id="journeys" aria-labelledby="journeys-title" className="relative bg-white pb-[16vh] pt-[18vh]">
      <GridLines />
      <div className="relative z-10">
        <div className="relative mx-auto w-fit px-5 text-center">
          <Reveal>
            <h2 className="t-h2 relative z-10 text-ink">
              <span id="journeys-title">{config.journeysSection.heading}</span>
            </h2>
          </Reveal>
          <Scribble className="absolute -bottom-10 left-[-12%] h-14 w-[124%]" />
        </div>
        <div className="mt-[14vh]">
          <CardFlick items={config.journeys} />
        </div>
      </div>
    </section>
  );
}
