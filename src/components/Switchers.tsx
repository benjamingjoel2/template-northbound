"use client";

import config from "@config";
import { useEffect, useRef, useState } from "react";
import { useCurrency } from "./Providers";

type Variant = "plain" | "glass" | "glass-light" | "light";

export function LanguageSwitcher({ variant = "glass", current = "en" }: { variant?: Variant; current?: string }) {
  const look =
    variant === "plain"
      ? ""
      : variant === "glass"
        ? "glass text-white"
        : variant === "glass-light"
          ? "glass-light text-ink"
          : "bg-paper text-ink";
  return (
    <nav aria-label="Language">
      <ul className={`flex h-9 items-center rounded-[2px] px-1.5 text-[12px] font-medium tracking-[0.04em] ${look}`}>
        {config.nav.languages.map((l, i) => {
          const active = l.code === current;
          return (
            <li key={l.code} className="flex items-center">
              {i > 0 ? (
                <span aria-hidden className="opacity-50">
                  ·
                </span>
              ) : null}
              <a
                href={l.href}
                hrefLang={l.code}
                lang={l.code}
                title={l.name}
                aria-current={active ? "page" : undefined}
                className={`rounded-[2px] px-1.5 py-1 transition-opacity hover:underline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent ${active ? "underline decoration-1 underline-offset-4" : "opacity-80 hover:opacity-100"}`}
              >
                {l.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function CurrencySwitcher({ variant = "glass" }: { variant?: Variant }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const list = config.currencies.list;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const look =
    variant === "plain"
      ? "bg-transparent hover:text-accent-glow"
      : variant === "glass"
        ? "glass text-white hover:bg-accent"
        : variant === "glass-light"
          ? "glass-light text-ink hover:bg-accent hover:text-white"
          : "bg-paper text-ink hover:bg-accent hover:text-white";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Currency: ${list[currency]?.label}. Change currency`}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-9 min-w-[64px] items-center justify-center gap-1.5 rounded-[2px] px-3 text-[13px] font-medium transition-colors ${look}`}
        suppressHydrationWarning
      >
        {currency}
        <svg
          aria-hidden
          viewBox="0 0 10 6"
          className={`h-1.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label="Choose currency"
          className="absolute right-0 top-11 z-50 w-56 rounded-[4px] bg-white p-1.5 text-ink shadow-[0_20px_60px_-20px_rgba(11,13,16,.35)]"
        >
          {Object.keys(list).map((code) => (
            <li key={code}>
              <button
                role="option"
                aria-selected={code === currency}
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-[2px] px-3 py-2 text-left text-[13px] transition-colors hover:bg-paper ${code === currency ? "bg-paper font-semibold" : ""}`}
              >
                <span>{list[code].label}</span>
                <span className="font-display tracking-wide text-muted">{code}</span>
              </button>
            </li>
          ))}
          <li className="t-small px-3 pb-1.5 pt-2 text-muted">{config.currencies.note}</li>
        </ul>
      ) : null}
    </div>
  );
}
