"use client";

import { useTransform, type MotionValue } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

/** True when the visitor asked the OS for reduced motion. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/** Flips to true once the page has loaded and the browser is idle (plus a short delay). */
export function useAfterLoad(delay = 400) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      const go = () => {
        timer = setTimeout(() => setReady(true), delay);
      };
      if ("requestIdleCallback" in window) window.requestIdleCallback(go, { timeout: 2000 });
      else go();
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (timer) clearTimeout(timer);
    };
  }, [delay]);
  return ready;
}

/**
 * Pads a scroll range so it always runs from 0 to 1, holding the first and last
 * values at the ends: [0.25, 0.7] → [1, 0] becomes [0, 0.25, 0.7, 1] → [1, 1, 0, 0].
 * Scroll-linked values can run as hardware-accelerated animations, which need
 * the full 0–1 timeline to clamp correctly.
 */
export function fullRange<T>(input: number[], output: T[]): [number[], T[]] {
  const i = [...input];
  const o = [...output];
  if (i[0] > 0) {
    i.unshift(0);
    o.unshift(o[0]);
  }
  if (i[i.length - 1] < 1) {
    i.push(1);
    o.push(o[o.length - 1]);
  }
  return [i, o];
}

/**
 * Maps scroll progress (0–1) to a value, e.g. useScrollValue(p, [0, 0.18], [1, 0]).
 * The range is padded to 0–1 and the value is computed on the main thread
 * (clamp: false opts out of motion's accelerated scroll timelines, whose
 * handling of offsets varies between motion releases). Progress from useScroll
 * never leaves 0–1, so nothing extrapolates.
 */
export function useScrollValue<T extends number | string>(progress: MotionValue<number>, input: number[], output: T[]) {
  const [i, o] = fullRange(input, output);
  return useTransform(progress, i, o, { clamp: false });
}
