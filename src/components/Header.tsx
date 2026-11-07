"use client";

import config from "@config";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { menus, primaryNav, type MenuKey } from "@/lib/menu";
import { Logo } from "./Logo";
import { CurrencySwitcher, LanguageSwitcher } from "./Switchers";

const navButton =
  "flex h-9 items-center justify-center px-1 text-[13px] font-medium underline-offset-[6px] transition-colors duration-300 hover:underline";

export function Header() {
  const [flyout, setFlyout] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const panelRef = useRef<HTMLDivElement>(null);

  // Solid bar once past 60% of the first screen; slide away when scrolling down, back when scrolling up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > window.innerHeight * 0.6);
    if (!flyout && !mobileOpen) setHidden(y > 160 && y > previous);
  });

  useEffect(() => {
    if (!flyout && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFlyout(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [flyout, mobileOpen]);

  const closeAll = () => {
    setFlyout(null);
    setMobileOpen(false);
  };

  const menu = flyout ? menus[flyout] : null;
  const enquire = { label: config.contact.enquireLabel, href: config.contact.enquireHref };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? -90 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-16 focus:z-50 focus:bg-white focus:p-3 focus:text-ink"
        >
          Skip to content
        </a>
        <div
          className={`site-bar relative flex h-16 items-center justify-between px-4 transition-colors duration-300 md:px-10 ${scrolled ? "is-scrolled" : ""}`}
        >
          <nav aria-label="Primary" className="hidden gap-6 lg:flex">
            {primaryNav.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-expanded={flyout === item.key}
                aria-controls="flyout"
                onClick={() => setFlyout((k) => (k === item.key ? null : item.key))}
                className={`${navButton} ${flyout === item.key ? "underline" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={`${navButton} lg:hidden`}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            Menu
          </button>

          <a
            href="/"
            aria-label={`${config.brand.name} — home`}
            className="absolute left-1/2 top-1/2 w-max max-w-[calc(100%-196px)] -translate-x-1/2 -translate-y-1/2 md:max-w-none"
          >
            <Logo />
          </a>

          <div className="flex items-center gap-5">
            <div className="hidden lg:block">
              <LanguageSwitcher variant="plain" current={config.seo.locale} />
            </div>
            <div className="hidden md:block">
              <CurrencySwitcher variant="plain" />
            </div>
            <a href={config.nav.pricesLink.href} className={`${navButton} hidden xl:flex`}>
              {config.nav.pricesLink.label}
            </a>
            <a
              href={enquire.href}
              className="flex h-9 items-center justify-center rounded-[2px] bg-accent px-4 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-ink"
            >
              <span className="lg:hidden">Enquire</span>
              <span className="hidden lg:inline">{enquire.label}</span>
            </a>
          </div>
        </div>
      </motion.header>

      {/* Desktop flyout */}
      <AnimatePresence>
        {menu ? (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-[55] bg-ink/30 backdrop-blur-[6px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFlyout(null)}
            />
            <motion.div
              key="panel"
              id="flyout"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${primaryNav.find((p) => p.key === flyout)?.label} menu`}
              className="fixed bottom-2 left-2 top-2 z-[60] flex w-[min(380px,calc(100vw-16px))] flex-col overflow-hidden rounded-[6px] bg-white text-ink"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap gap-1 p-2">
                {primaryNav.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setFlyout(item.key)}
                    className={`flex h-9 items-center rounded-[2px] px-3 text-[13px] font-medium transition-colors ${flyout === item.key ? "bg-accent text-white" : "bg-paper text-ink/60 hover:text-ink"}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-8 pt-6">
                {menu.home ? (
                  <a href="/" onClick={closeAll} className="mb-8 block text-sm font-medium hover:text-accent">
                    Home
                  </a>
                ) : null}
                {menu.groups.map((group) => (
                  <div key={group.label} className="mb-8">
                    <p className="t-eyebrow mb-3 text-[15px] text-muted">{group.label}</p>
                    <ul className="space-y-1.5">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            onClick={closeAll}
                            className="text-sm font-medium transition-colors hover:text-accent"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <a
                href={enquire.href}
                onClick={closeAll}
                className="m-2 flex h-20 items-center justify-center rounded-[2px] bg-paper text-sm font-medium transition-colors hover:bg-accent hover:text-white"
              >
                {enquire.label}
              </a>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-white text-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between p-3">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 items-center rounded-[2px] bg-paper px-4 text-[13px] font-medium"
              >
                Close ×
              </button>
              <Logo />
              <CurrencySwitcher variant="light" />
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <a href="/" onClick={closeAll} className="t-h3 block py-3">
                Home
              </a>
              {primaryNav.map((item) => (
                <details key={item.key} className="group border-b border-ink/10">
                  <summary className="t-h3 flex cursor-pointer list-none items-center justify-between py-4">
                    {item.label}
                    <span aria-hidden className="text-2xl font-light transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="pb-5">
                    {menus[item.key].groups.map((group) => (
                      <div key={group.label} className="mb-4">
                        <p className="t-eyebrow mb-2 text-muted">{group.label}</p>
                        <ul className="space-y-2">
                          {group.links.map((link) => (
                            <li key={link.label}>
                              <a href={link.href} onClick={closeAll} className="text-[15px] font-medium">
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
              <a href={config.nav.pricesLink.href} onClick={closeAll} className="t-h3 block py-4">
                {config.nav.pricesLink.label}
              </a>
              <div className="mt-6">
                <LanguageSwitcher variant="light" current={config.seo.locale} />
              </div>
            </div>
            <a
              href={enquire.href}
              onClick={closeAll}
              className="m-3 flex h-16 items-center justify-center rounded-[2px] bg-accent text-sm font-medium text-white"
            >
              {enquire.label}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
