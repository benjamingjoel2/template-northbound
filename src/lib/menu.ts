import config from "@config";

export type MenuKey = "experience" | "journeys" | "stays" | "destination" | "about";
export type MenuGroup = { label: string; links: { label: string; href: string }[] };

const L = config.nav.labels;

/** The five primary menu buttons, left to right. */
export const primaryNav: { key: MenuKey; label: string }[] = [
  { key: "experience", label: L.experience },
  { key: "journeys", label: L.journeys },
  { key: "stays", label: L.stays },
  { key: "destination", label: L.destination },
  { key: "about", label: L.about },
];

/** What each menu button opens. Built entirely from brand.config.ts. */
export const menus: Record<MenuKey, { home?: boolean; groups: MenuGroup[] }> = {
  experience: {
    home: true,
    groups: [
      {
        label: "Experiences",
        links: config.destination.experiences.map((e) => ({ label: e.name, href: e.href })),
      },
      {
        label: "Seasons",
        links: config.seasons.items.map((s) => ({ label: s.name, href: "#seasons" })),
      },
    ],
  },
  journeys: {
    groups: [
      {
        label: L.journeys,
        links: [
          ...config.journeys.map((j) => ({ label: j.title, href: j.href })),
          { label: "View all", href: "#journeys" },
        ],
      },
      {
        label: "Plan",
        links: [config.nav.pricesLink, ...config.nav.about.filter((a) => a.label === "Journal")],
      },
    ],
  },
  stays: {
    groups: [
      {
        label: config.staysSection.heading,
        links: [
          ...config.stays.map((s) => ({ label: s.name, href: s.href })),
          { label: "View all", href: "#lodges" },
        ],
      },
    ],
  },
  destination: {
    groups: [
      {
        label: "Regions",
        links: config.destination.regions.map((r) => ({ label: r.name, href: r.href })),
      },
    ],
  },
  about: {
    groups: [
      {
        label: L.about,
        links: config.nav.about.filter((a) => a.href !== config.nav.pricesLink.href || a.label !== config.nav.pricesLink.label),
      },
    ],
  },
};
