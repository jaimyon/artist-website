# Jaimyon Parker — Personal Brand Website

## Project Overview
- **Name**: Jaimyon Parker — Actor · Producer · Photographer · Designer
- **Goal**: A cinematic, editorial personal brand site that unifies four creative pillars —
  acting career, the Skeleton Key Pictures production company, photography, and graphic
  design — into one polished single-page experience, built from a Genspark Design handoff
  (`designer2-35b7939e-a134-47fd-8857-bf9037594261`).
- **Features**:
  - Full-bleed cinematic hero with parallax portrait, animated name reveal, and meta strip
  - About section with bio, discipline grid, and portrait
  - Acting section: showreel block, selected credits table, horizontal drag-to-scroll
    portfolio filmstrip (headshots / editorial / modeling / on-set), and representation cards
  - Skeleton Key Pictures: manifesto, current production slate, press & festival strip
  - Photography: three curated series with distinct editorial grid layouts
  - Graphic Design: 9-item project grid with case-study captions
  - Contact: four-way inquiry hub (Booking / Collaborate / Press / SKP Submissions) + footer
  - Full-viewport lightbox with keyboard navigation (Esc / ← / →) across acting, photography,
    and design image groups
  - Scroll-reveal animations, fixed section-progress rail, mobile hamburger nav
  - Fully responsive from desktop down to small mobile

## URLs
- **Production**: https://fc190a8e-1049-42cc-b743-624e3c6d37ea.vip.gensparksite.com
- **Local dev**: http://localhost:3000

## Data & Content Model
All content lives as typed data arrays in `src/index.tsx` (server-rendered to static HTML at
request time by Hono) — no client-side framework or database is required:
- `CREDITS` — acting credits table rows
- `ACTING_GALLERY` — 12-item portfolio filmstrip (id, kind, label, aspect ratio, image path)
- `SLATE` — Skeleton Key Pictures current productions (title, meta, status)
- `PRESS` — festival / press mentions
- `SERIES` — 3 photography series (num, title, year, location, layout variant, image paths)
- `DESIGN_WORK` — 9 graphic design portfolio items (name, tag, image path)

Editing any array and rebuilding (`npm run build`) updates the site — no CMS wiring needed for
this scope, but the data shape is intentionally flat/simple so it could be swapped for a
Cloudflare D1-backed admin later without changing the front-end markup.

**Images**: All photography, headshots, on-set stills, and design artwork are placeholder
imagery (AI-generated / stock, royalty-free) stored in `public/static/images/`, organized by
pillar (`brand/`, `acting/`, `photo/`, `design/`). Replace these files (same filenames) with
the client's real photography/artwork to go live with authentic content.

## Design Fidelity Notes
Built from the design handoff's HTML/CSS/JSX reference (not copied verbatim) — recreated as a
Hono server-rendered page + vanilla JS for interactivity (no React runtime shipped to the
browser, keeping the bundle tiny and edge-friendly). Palette defaults to the handoff's "Noir"
palette (pure black, red accent). The handoff's Tweaks panel (palette/typeset/hero-variant
switcher) was intentionally not shipped to production, per the handoff's own guidance — a
single curated look was baked in instead. Section reordering, film grain, and crosshair cursor
tweaks were likewise omitted as optional/dev-tool artifacts; grain and crosshair CSS remain in
place (toggleable via `data-grain`/`data-cursor` attributes on `<html>`) if a future admin
toggle is desired.

## User Guide
- Scroll through the single long-scroll page, or use the top nav / fixed left-edge section
  rail to jump to a pillar.
- Click any filled photo (acting filmstrip, photography series, design grid) to open the
  full-screen lightbox; use ← / → or on-screen arrows to browse within that group, Esc or
  background click to close.
- Drag the acting portfolio filmstrip horizontally (or use the ← / → buttons) to browse more
  images without growing page height.
- Use the four Contact cards at the bottom for Booking, Collaboration, Press, or Skeleton Key
  Pictures submissions — each opens a pre-addressed `mailto:` link.
- On mobile, tap "Menu" for the fullscreen nav overlay.

## Deployment
- **Platform**: Cloudflare Workers for Platform, via Genspark-managed hosted deploy (`gsk hosted deploy`)
- **Tech Stack**: Hono (server-rendered HTML), vanilla JS (reveal/parallax/lightbox/filmstrip),
  hand-written CSS design tokens matching the handoff spec, Google Fonts (Instrument Serif /
  Inter Tight / JetBrains Mono)
- **Status**: ✅ Live in production at the URL above (static assets, no D1/R2/KV bindings needed)
- **Last Updated**: 2026-07-16

## Not Yet Implemented / Next Steps
- Wire the showreel "Play" button to a real Vimeo/YouTube embed (currently a static poster)
- Replace all placeholder imagery with the client's real photography, headshots, on-set
  stills, and design artwork
- Optional: move content arrays into Cloudflare D1 + a small admin UI for non-technical edits
- Optional: re-introduce a lightweight palette/theme toggle (light "Bone" vs dark "Noir") as a
  real user-facing setting rather than a dev tool
- Optional: self-host/subset the three Google Fonts for faster first paint
- Optional: add real analytics / a contact form backed by a Cloudflare Worker + email API
  (Resend/SendGrid) instead of plain `mailto:` links
