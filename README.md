# Ayssar Tarabay — Tattoo Artist Portfolio

Dark-luxury single-page portfolio for [Ayssar Tarabay](https://www.instagram.com/ayssar.tarabay.tattoos),
a black & grey realism tattoo artist based in Beirut. Built to showcase large-scale
work — full sleeves, statues, portraits — and convert visitors into booking inquiries.

**Live:** https://ayssartarabaytattoo.vercel.app/

## Stack

- **React 19** + **TypeScript** (strict) + **Vite 7**
- **Tailwind CSS 4** with semantic design tokens (near-black `#050505`, bone `#ECE8E1`, gold `#D4AF37`)
- **Framer Motion** for choreographed reveals; **GSAP** for the masonry grid
- **react-zoom-pan-pinch** for the pinch/zoom lightbox
- **Butler Stencil** (local woff2, three weights) + Inter

## Features

- **Hero** — full-bleed portrait with a load choreography: the gold gallery-frame
  draws in, the name rises line by line in Butler Black, CTAs settle last.
- **Marquee strip** — hollow-stroke Butler Light banner scrolling the studio's terms.
- **Gallery** — masonry grid of selected works built from true image aspect ratios
  (2 columns on phones, 3 on desktop), lazy-loaded, with hover captions, plus a
  pointer to the full body of work on Instagram.
- **Lightbox** — full-collection navigation: swipe on touch, arrow keys on desktop,
  pinch/double-tap zoom up to 8×, piece title + counter.
- **Signature slider** — two views of the full-leg centerpiece: Ayssar beside the
  finished work, then the piece itself. Swipe or arrows.
- **Booking** — split panel with a macro process shot; submits via a prefilled
  WhatsApp message and offers an Instagram DM fallback (no backend required).
- **SEO** — full meta/OG/Twitter set, `TattooParlor` JSON-LD, canonical URL,
  sitemap, robots.txt, custom favicon + touch icons, preloaded display fonts.
- **Accessibility & motion safety** — focus-visible rings, aria labels, keyboard
  navigation everywhere, `prefers-reduced-motion` respected globally.

## Development

```bash
npm install
npm run dev        # Vite dev server
npm run build      # tsc + production build
npm run lint       # ESLint
```

## Image pipeline

Photo originals (HEIC / oversized PNG / WhatsApp exports) live in
`src/assets/tattoos/` and are **never imported directly**. Web-ready JPEGs
(max 1600px, q82; hero at higher budget) live in `src/assets/work/` with a typed
manifest in `src/assets/work/index.ts` — id, title, placement detail, and aspect
ratio per piece. The masonry layout and lightbox both read from that single manifest.

Conversion is done with a PowerShell/WIC script (handles HEIC decode + EXIF
rotation on Windows with no external tools). To add new photos: convert into
`src/assets/work/`, then append an entry to the manifest.

## Deploy

Hosted on Vercel (`vercel.json` — framework preset `vite`). Push to `master` deploys.
