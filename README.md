# Northbound

A Tourground Launch Pad template for private travel brands: a dark film hero with a giant word, cloud layers that rise as you scroll, a centred logo, a seasons picker, a journeys accordion, stays that slide across the screen and a full footer.

Built with Next.js, Tailwind CSS and Motion. All text, photos, colours and fonts come from one file: [`brand.config.ts`](./brand.config.ts).

## Launch a new brand

1. **Create the repo.** Use this repository as a template (or copy it) and name the new repo after the brand.
2. **Install and run it.**
   ```bash
   npm install
   ```
   ```bash
   npm run dev
   ```
   Open http://localhost:3000.
3. **Fill in `brand.config.ts`.** Every placeholder is in square brackets, so search for `[` until nothing is left. In order:
   - `brand`: name (used in the centred logo, the footer and the `© [Year] [Brand name]` line), tagline, live URL, optional logo mark.
   - `seo`: page title, description and share image for the meta tags.
   - `destination`: place name, the spaced line above the hero word, the intro paragraph, regions and experiences for the menus.
   - `hero`: the giant word, the two hero lines, the poster still and the film (see below).
   - `colors` and `fonts`: see below.
   - `seasons`, `journeys` and `stays`: copy, prices (in US dollars), photos and links.
   - `contact`: email, address and where the Enquire buttons go.
   - `nav`: menu labels, footer links, legal links and languages.
4. **Replace the media.** Put photos in `public/photos/` and the film in `public/film/`, then point the config at them. Replace the tab icon at `src/app/icon.svg`. The bundled photos, film and icon are stand-ins only.
5. **Turn off the Launch Pad flags.** Once facts are checked, set `launchPad.showVerifyFlags` to `false` and `placeholder: false` on each stay.
6. **Check and ship.**
   ```bash
   npm run build
   ```
   The build must pass. Then deploy (for example, import the repo into Vercel; no settings are needed).

## Hero word, film and photos

- **Hero word.** Keep it short. Up to about 8 letters fills the width exactly as designed; longer words shrink automatically so phones never scroll sideways.
- **Film.** `hero.film.src` is a muted background loop for tablets and desktops (about 1280×720), `srcSmall` a lighter cut for phones (about 854×480). Keep each under a few MB. The full-screen player opened by *Watch film* uses `src`, `poster` and `captions` (a WebVTT file). The loop is skipped for visitors on data saver or slow connections and for anyone who prefers reduced motion; they see `hero.poster` instead.
- **Photos.** Each photo is `{ src, alt }`, optionally with `srcSet` for responsive sizes. The `photo("name", "alt")` helper at the top of the config expects `public/photos/name-828.avif` and `name-1920.avif`; for a single file just write `{ src: "/photos/name.jpg", alt: "…" }`. Always write a real `alt` description.

## Colours and fonts

- **Colours** are named by role (`ink` for text, `night` for overlays, `accent` for buttons and so on). Change the hex values in `colors`; every section, overlay and hover state follows.
- **Fonts** load from Google Fonts. Each of `display` (the giant word and labels; a condensed sans works best), `serif` (headings and italics) and `sans` (body) takes a Google Fonts family name and its axes string, e.g. `"wght@200..700"`. The type scale itself lives in `src/app/globals.css` and should not need changing.

## What not to change

Layout, motion and type are the template. They live in `src/components/` and `src/app/globals.css` and should stay as they are so every Northbound brand behaves the same: the 185vh sticky hero with its scale, word lift, cloud rise and fade to white; the seasons cross-fade; the journeys accordion; the lodges clip-path reveal and horizontal track; and the header that hides on scroll down and turns solid past the hero.

## Project layout

```
brand.config.ts        ← everything brand-specific
public/photos/         ← photos (placeholders)
public/film/           ← hero film, poster and captions (placeholders)
public/mist/           ← cloud layers for the hero
src/app/               ← page, layout (meta tags, fonts, colours) and global styles
src/app/icon.svg       ← browser tab icon (placeholder; replace with the brand icon)
src/components/        ← sections: GiantHero, Intro, Seasons, Journeys, Lodges, Header, Footer
src/lib/               ← small helpers
```
