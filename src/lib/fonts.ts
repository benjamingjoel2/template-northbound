import config from "@config";

type Font = { family: string; axes: string; fallback: string };

/** One Google Fonts stylesheet URL for the three families in brand.config.ts. */
export function googleFontsHref() {
  const fonts = Object.values(config.fonts) as Font[];
  const families = fonts
    .map((f) => `family=${encodeURIComponent(f.family).replace(/%20/g, "+")}:${f.axes}`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

const stack = (f: Font) => `"${f.family}", ${f.fallback}`;

/** CSS custom properties for colours and fonts, read by globals.css. */
export function brandCssVariables() {
  const c = config.colors;
  const f = config.fonts as Record<"display" | "serif" | "sans", Font>;
  return `:root{--brand-ink:${c.ink};--brand-night:${c.night};--brand-accent:${c.accent};--brand-accent-glow:${c.accentGlow};--brand-muted:${c.muted};--brand-paper:${c.paper};--brand-paper-deep:${c.paperDeep};--brand-haze:${c.haze};--brand-hero-backdrop:${c.heroBackdrop};--brand-font-display:${stack(f.display)};--brand-font-serif:${stack(f.serif)};--brand-font-sans:${stack(f.sans)};}`;
}
