/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NORTHBOUND · Tourground Launch Pad template
 *  The one file to edit when launching a new brand.
 *
 *  Everything a visitor can read or see — name, destination, the giant hero
 *  word, the hero film, colours, fonts, photos, journeys, stays and contact
 *  details — comes from this file. Layout, motion and type live in the
 *  components and should not need touching.
 *
 *  Every value below is a placeholder. Search for "[" to find text that still
 *  needs replacing before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* Helpers ------------------------------------------------------------------ */

export type Photo = {
  /** Path in /public or a full https:// URL. */
  src: string;
  /** Optional responsive sources, e.g. "/photos/a-828.avif 828w, /photos/a-1920.avif 1920w". */
  srcSet?: string;
  /** Describe the picture for screen readers. */
  alt: string;
};

/**
 * Shorthand for the bundled placeholder photos in /public/photos, which ship
 * in two widths (828 and 1920). For your own photos you can write a plain
 * object instead: { src: "/photos/my-photo.jpg", alt: "…" }.
 */
const photo = (name: string, alt: string): Photo => ({
  src: `/photos/${name}-1920.avif`,
  srcSet: `/photos/${name}-828.avif 828w, /photos/${name}-1920.avif 1920w`,
  alt,
});

/* Config ------------------------------------------------------------------- */

export const config = {
  /* Brand ----------------------------------------------------------------- */
  brand: {
    /** Shown in the centred logo, the footer and the © line. */
    name: "[Brand name]",
    /** Short line under the name in the footer and in the hero. */
    tagline: "[Your tagline goes here.]",
    /** Public address of the site, no trailing slash. Used for meta tags. */
    url: "https://northboundtemplate.tourground.com",
    /**
     * Optional logo mark shown above the wordmark in the centred logo.
     * Leave as null to show only the wordmark. Use an SVG drawn in
     * `currentColor` so it turns white over the dark hero.
     */
    logoMark: null as string | null,
  },

  /* Meta tags -------------------------------------------------------------- */
  seo: {
    /** Browser tab and search result title: "<brand name> — <title>". */
    title: "[Private journeys in your destination]",
    description:
      "[One or two sentences for search results and link previews, describing what the brand offers.]",
    /** Image used when the site is shared (1200×630 works best). */
    shareImage: photo("hero-poster", "[Share image description]"),
    locale: "en",
  },

  /* Destination ------------------------------------------------------------ */
  destination: {
    /** The place the brand sells, e.g. a country or region. */
    name: "[Destination]",
    /** Small spaced line above the giant hero word. */
    eyebrow: "[The edge of the map]",
    /** Short intro under the hero (first line indented). */
    intro:
      "[Two or three lines that set the scene: where the destination sits, what it feels like, and why it is worth the journey.]",
    /** Regions listed in the menu and footer. */
    regions: [
      { name: "[Region one]", href: "#journeys" },
      { name: "[Region two]", href: "#journeys" },
      { name: "[Region three]", href: "#journeys" },
      { name: "[Region four]", href: "#journeys" },
      { name: "[Region five]", href: "#journeys" },
      { name: "[Region six]", href: "#journeys" },
    ],
    /** Things to do, listed in the "Experience" menu. */
    experiences: [
      { name: "[Experience one]", href: "#seasons" },
      { name: "[Experience two]", href: "#seasons" },
      { name: "[Experience three]", href: "#seasons" },
      { name: "[Experience four]", href: "#seasons" },
      { name: "[Experience five]", href: "#seasons" },
    ],
  },

  /* Hero ------------------------------------------------------------------- */
  hero: {
    /**
     * The giant word across the bottom of the hero. Short words (up to about
     * 8 letters) fill the width as designed; longer words scale down to fit.
     * Placeholder: replace with your destination.
     */
    word: "Northland",
    /** Two short lines at the top left of the hero. */
    lines: ["[Your tagline goes here.]", "[Private journeys, planned for you.]"],
    /** Still shown while the film loads, and to visitors who prefer reduced motion. */
    poster: photo("hero-poster", "[Describe the opening shot of the film]"),
    film: {
      /** Background loop for tablets and desktops (muted, no audio needed). */
      src: "/film/hero-film.mp4",
      /** Lighter loop for phones. */
      srcSmall: "/film/hero-film-sm.mp4",
      /** Poster for the full-screen player opened by "Watch film". */
      poster: "/film/poster.jpg",
      /** Captions for the full-screen player. */
      captions: "/film/hero-film.en.vtt",
      /** Accessible name of the player. */
      title: "[Brand film]",
      /** Small note under the player. Set to "" to hide. */
      note: "Placeholder film assembled from stills — replace with the commissioned brand film.",
      buttonLabel: "Watch film",
    },
    /** Rising cloud layers. Keep the defaults unless you have your own. */
    clouds: ["/mist/cloud-1.webp", "/mist/cloud-2.webp", "/mist/cloud-3.webp"],
  },

  /* Colours ---------------------------------------------------------------- */
  /** Hex values. The names describe the role each colour plays. */
  colors: {
    /** Main text, headings and dark overlays. */
    ink: "#14263a",
    /** Darkest tone: film overlays, player backdrop, browser theme colour. */
    night: "#0b0d10",
    /** Buttons and hover states. */
    accent: "#177a5a",
    /** Bright hover and text-selection colour. */
    accentGlow: "#3fd8a0",
    /** Secondary text. */
    muted: "#5a6068",
    /** Pale panels and menu buttons. */
    paper: "#f4f6f6",
    /** Footer background. */
    paperDeep: "#e9ecec",
    /** Rules and quiet borders. */
    haze: "#c9cfd3",
    /** Shown behind the hero before the poster loads. */
    heroBackdrop: "#9aa3a8",
  },

  /* Fonts (loaded from Google Fonts) --------------------------------------- */
  fonts: {
    /** Giant hero word, spaced labels and the wordmark. A condensed sans works best. */
    display: { family: "Oswald", axes: "wght@200..700", fallback: '"Arial Narrow", Arial, sans-serif' },
    /** Headings, italic titles and eyebrows. */
    serif: {
      family: "Cormorant Garamond",
      axes: "ital,wght@0,300..700;1,300..700",
      fallback: '"Times New Roman", Georgia, serif',
    },
    /** Body copy, buttons and menus. */
    sans: { family: "Inter Tight", axes: "wght@100..900", fallback: "ui-sans-serif, system-ui, sans-serif" },
  },

  /* Seasons ---------------------------------------------------------------- */
  seasons: {
    heading: "Two Seasons",
    items: [
      {
        key: "summer",
        name: "[Summer season]",
        months: "[June – August]",
        body: "[What the long days bring: which roads and places open up, the light, and what travellers come for.]",
        photo: photo("calm-reflection", "[Describe a summer scene]"),
        verify: "[Season months and opening dates vary each year — verify with local partners before launch.]",
      },
      {
        key: "winter",
        name: "[Winter season]",
        months: "[October – March]",
        body: "[What the dark months bring: the night sky, snow, quieter places and what makes winter worth it.]",
        photo: photo("aurora-ice", "[Describe a winter scene]"),
        verify: "[Seasonal access and conditions must be verified with certified local partners before launch.]",
      },
    ],
  },

  /* Journeys --------------------------------------------------------------- */
  journeysSection: {
    heading: "Our Journeys",
  },
  /** The first journey opens wide; hovering another opens it instead. */
  journeys: [
    {
      slug: "journey-one",
      title: "[The Grand Circuit, Privately]",
      /** The card title on two lines. */
      cardTitle: ["[The Grand Circuit,]", "[Privately]"],
      season: "summer" as Season,
      seasonLabel: "[Summer]",
      priceFromUSD: 18500,
      excerpt: "[One sentence on the route, the pace and what makes it special.]",
      photo: photo("waterfall-cliffs", "[Describe the photo]"),
      href: "#journeys",
    },
    {
      slug: "journey-two",
      title: "[The Interior by 4×4]",
      cardTitle: ["[The Interior]", "[by 4×4]"],
      season: "summer" as Season,
      seasonLabel: "[Summer only]",
      priceFromUSD: 14900,
      excerpt: "[One sentence on the route, the pace and what makes it special.]",
      photo: photo("hazy-hills", "[Describe the photo]"),
      href: "#journeys",
    },
    {
      slug: "journey-three",
      title: "[Midsummer & the Far Coast]",
      cardTitle: ["[Midsummer]", "[& the Far Coast]"],
      season: "summer" as Season,
      seasonLabel: "[Summer]",
      priceFromUSD: 16800,
      excerpt: "[One sentence on the route, the pace and what makes it special.]",
      photo: photo("calm-reflection", "[Describe the photo]"),
      href: "#journeys",
    },
    {
      slug: "journey-four",
      title: "[Winter Lights & Ice]",
      cardTitle: ["[Winter Lights]", "[& Ice]"],
      season: "winter" as Season,
      seasonLabel: "[Winter]",
      priceFromUSD: 15400,
      excerpt: "[One sentence on the route, the pace and what makes it special.]",
      photo: photo("ice-night", "[Describe the photo]"),
      href: "#journeys",
    },
    {
      slug: "journey-five",
      title: "[Peaks by Helicopter]",
      cardTitle: ["[Peaks]", "[by Helicopter]"],
      season: "all-year" as Season,
      seasonLabel: "[All year]",
      priceFromUSD: 24500,
      excerpt: "[One sentence on the route, the pace and what makes it special.]",
      photo: photo("above-clouds", "[Describe the photo]"),
      href: "#journeys",
    },
    {
      slug: "journey-six",
      title: "[The Highlights in Three Days]",
      cardTitle: ["[The Highlights]", "[in Three Days]"],
      season: "all-year" as Season,
      seasonLabel: "[All year]",
      priceFromUSD: 7900,
      excerpt: "[One sentence on the route, the pace and what makes it special.]",
      photo: photo("waterfall-figure", "[Describe the photo]"),
      href: "#journeys",
    },
  ],

  /* Stays (lodges) --------------------------------------------------------- */
  staysSection: {
    heading: "Our Lodges",
    /** Footer and menu column title. */
    menuLabel: "Lodges",
    label: "[Signature stays]",
    body: "[Two or three sentences on the places you stay: how they are chosen, what they share and what it feels like to arrive.]",
    /** Full-bleed photo that opens out as you scroll. */
    photo: photo("glacier-lagoon", "[Describe the photo]"),
    /** Backdrop behind the sliding stay cards. */
    backdrop: photo("aerial-coast", ""),
  },
  stays: [
    {
      slug: "stay-one",
      name: "[Stay one]",
      excerpt: "[One line on what makes this stay special.]",
      photo: photo("snow-range", "[Describe the photo]"),
      coordinates: { lat: 0, lng: 0 },
      href: "#lodges",
      /** Shows a "Placeholder name" flag until the real name is confirmed. */
      placeholder: true,
    },
    {
      slug: "stay-two",
      name: "[Stay two]",
      excerpt: "[One line on what makes this stay special.]",
      photo: photo("dark-mountain", "[Describe the photo]"),
      coordinates: { lat: 0, lng: 0 },
      href: "#lodges",
      placeholder: true,
    },
    {
      slug: "stay-three",
      name: "[Stay three]",
      excerpt: "[One line on what makes this stay special.]",
      photo: photo("snow-cabin", "[Describe the photo]"),
      coordinates: { lat: 0, lng: 0 },
      href: "#lodges",
      placeholder: true,
    },
  ],

  /* Contact ---------------------------------------------------------------- */
  contact: {
    email: "hello@example.com",
    /** One line, shown in the footer. */
    address: "[Street address, Postcode City, Country]",
    /** Where every "Enquire" button goes. A mailto: link works until there is a form. */
    enquireHref: "mailto:hello@example.com",
    enquireLabel: "Enquire now",
    /** Big line in the photo band at the top of the footer. */
    footerHeading: "Plan your journey",
    footerPhoto: photo("above-clouds", "[Describe the photo]"),
  },

  /* Navigation ------------------------------------------------------------- */
  nav: {
    /** Labels of the five menu buttons, left to right. */
    labels: {
      experience: "Experience",
      journeys: "Journeys",
      stays: "Lodges",
      destination: "[Destination]",
      about: "About",
    },
    pricesLink: { label: "Dates & Prices", href: "#journeys" },
    about: [
      { label: "Our story", href: "#main" },
      { label: "Dates & Prices", href: "#journeys" },
      { label: "Journal", href: "#main" },
      { label: "FAQ", href: "#main" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Booking Terms", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
    /** Language links. Add more entries when translations exist. */
    languages: [{ code: "en", label: "EN", name: "English", href: "/" }],
  },

  /* Prices ----------------------------------------------------------------- */
  currencies: {
    default: "USD",
    /** Prices are written in US dollars above and converted at these indicative rates. */
    list: {
      USD: { label: "US Dollar", symbol: "US$", rate: 1, round: 50 },
      EUR: { label: "Euro", symbol: "€", rate: 0.92, round: 50 },
      GBP: { label: "Pound sterling", symbol: "£", rate: 0.79, round: 50 },
      CAD: { label: "Canadian dollar", symbol: "CA$", rate: 1.37, round: 50 },
      AUD: { label: "Australian dollar", symbol: "AU$", rate: 1.52, round: 50 },
    } as Record<string, { label: string; symbol: string; rate: number; round: number }>,
    note: "Indicative conversions from US$.",
  },

  /* Launch Pad ------------------------------------------------------------- */
  launchPad: {
    /** Amber "Verify before launch" flags next to facts that need checking. Turn off for launch. */
    showVerifyFlags: true,
  },
};

export type Season = "summer" | "winter" | "all-year";
export type Config = typeof config;
export default config;
