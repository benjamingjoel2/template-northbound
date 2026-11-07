"use client";

import config from "@config";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/* Currency ------------------------------------------------------------------ */

const STORAGE_KEY = "northbound-currency";
const CHANGE_EVENT = "northbound-currency-change";
const currencies = config.currencies.list;
const defaultCurrency = config.currencies.default;

function readCurrency() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v && v in currencies ? v : defaultCurrency;
  } catch {
    return defaultCurrency;
  }
}
function subscribeCurrency(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(CHANGE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(CHANGE_EVENT, cb);
  };
}

type CurrencyCtx = { currency: string; setCurrency: (c: string) => void; format: (usd: number) => string };
const CurrencyContext = createContext<CurrencyCtx | null>(null);

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside Providers");
  return ctx;
}

/* UI (film player) ---------------------------------------------------------- */

type UICtx = { filmOpen: boolean; openFilm: () => void; closeFilm: () => void };
const UIContext = createContext<UICtx | null>(null);

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside Providers");
  return ctx;
}

function FilmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const film = config.hero.film;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={film.title}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-night/95 p-4 md:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            onClick={onClose}
            className="glass absolute right-5 top-5 z-10 h-9 rounded-[2px] px-4 text-[13px] text-white hover:bg-accent"
          >
            Close ×
          </button>
          <motion.div
            className="relative aspect-video w-full max-w-6xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <video className="h-full w-full bg-black" controls autoPlay playsInline poster={film.poster} preload="metadata">
              <source src={film.src} type="video/mp4" />
              {film.captions ? (
                <track kind="captions" src={film.captions} srcLang={config.seo.locale} label="Captions" default />
              ) : null}
            </video>
            {film.note ? <p className="t-small mt-3 text-white/60">{film.note}</p> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* Root ---------------------------------------------------------------------- */

export function Providers({ children }: { children: ReactNode }) {
  const [filmOpen, setFilmOpen] = useState(false);
  const currency = useSyncExternalStore(subscribeCurrency, readCurrency, () => defaultCurrency);

  const setCurrency = useCallback((c: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {}
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const currencyValue = useMemo<CurrencyCtx>(
    () => ({
      currency,
      setCurrency,
      format: (usd: number) => {
        const c = currencies[currency] ?? currencies[defaultCurrency];
        const n = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
          Math.round((usd * c.rate) / c.round) * c.round,
        );
        return `${c.symbol}${n}`;
      },
    }),
    [currency, setCurrency],
  );

  const closeFilm = useCallback(() => setFilmOpen(false), []);
  const ui = useMemo<UICtx>(
    () => ({ filmOpen, openFilm: () => setFilmOpen(true), closeFilm }),
    [filmOpen, closeFilm],
  );

  return (
    <MotionConfig reducedMotion="user">
      <CurrencyContext.Provider value={currencyValue}>
        <UIContext.Provider value={ui}>
          {children}
          <FilmModal open={filmOpen} onClose={closeFilm} />
        </UIContext.Provider>
      </CurrencyContext.Provider>
    </MotionConfig>
  );
}

/* Small shared bits --------------------------------------------------------- */

export function Price({ usd, prefix = "From" }: { usd: number; prefix?: string }) {
  const { format } = useCurrency();
  return <span suppressHydrationWarning>{prefix ? `${prefix} ` : ""}{format(usd)}</span>;
}

export function WatchFilmButton({ className = "" }: { className?: string }) {
  const { openFilm } = useUI();
  return (
    <button
      onClick={openFilm}
      className={`group inline-flex h-11 items-center gap-10 border-y border-white/30 px-5 text-[13px] font-medium text-white transition-colors hover:bg-white/10 ${className}`}
    >
      {config.hero.film.buttonLabel}
      <svg aria-hidden viewBox="0 0 10 12" className="h-2.5 w-2.5 fill-white transition-transform group-hover:translate-x-1">
        <path d="M0 0l10 6-10 6z" />
      </svg>
    </button>
  );
}
