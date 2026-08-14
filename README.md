# MOVIA — website

Two static pages for MOVIA, Cambodia's mobility intelligence layer, sharing one
design system. Built to the MOVIA landing page brief (kept out of this repo —
see `docs/` locally).

| Page | Who it's for |
|---|---|
| `index.html` | The homepage. Benefit-first, written for a rider or partner arriving cold. |
| `pitch.html` | The full product & business pitch — problem, architecture, features, trust model, roadmap, team. |

Vite (multi-page) + vanilla JS + hand-written CSS. No framework, no backend, no analytics.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/MOVIA/  (and /MOVIA/pitch.html)
npm run build    # → dist/index.html + dist/pitch.html
npm run preview  # serve the built dist/
```

## Where things live

| Path | What |
|---|---|
| `index.html` / `pitch.html` | Section structure, headings, and prose for each page. Both render without JS. |
| `src/data/content.shared.js` | **Single source of truth** for everything on both pages: trust states, principles, the Google Maps quote, the rider interview, SDG list, badges, hero signals, contact, the partner promise. |
| `src/data/content.home.js` | Homepage-only copy — benefits, rider steps, FAQ, privacy note. |
| `src/data/content.pitch.js` | Pitch-only copy — problem, layers, features, roadmap, the ask. |
| `src/lib/ui.js` | Shared runtime: render helpers, nav, header-height sync, scroll reveal, and the components both pages use. |
| `src/home.js` / `src/pitch.js` | Per-page entry points. |
| `src/style.css` | Design tokens and every style rule, shared by both pages. |
| `.github/workflows/deploy.yml` | Builds and publishes to GitHub Pages. |

**Do not copy strings between the content files.** If a line needs to appear on
both pages, it belongs in `content.shared.js` and gets imported. The pitch page's
partner-layer summary and the homepage's partner heading are the same constant
(`partnerPromise`); the homepage FAQ's Google Maps answer is composed from
`whyNotMaps`. That's deliberate — it keeps the two pages from drifting.

The one intentional duplication is the hero signal `<svg>` markup, which is
inline in both HTML files so the panel still renders without JS. Both copies
carry a comment saying to edit them together.

## Before going public

- **The "Join the pilot" link has no real destination.** Every rider CTA falls
  back to `mailto:hello@movia.app?subject=Join%20the%20pilot`. Swap in the
  Telegram group or Google Form from the V0 concierge plan once one exists — see
  the boxed `PLACEHOLDER PILOT SIGN-UP LINK` comment in `content.shared.js`.
- **The footer privacy note is a stopgap, not a policy.** No legal review. See
  the boxed `PLACEHOLDER PRIVACY NOTE` comment in `content.home.js`. Replace it
  with a real policy before any data collection begins.
- **Re-check the pitch ask per audience.** Event-agnostic and safe as written,
  but the three specifics may need adjusting per room — boxed `UNCONFIRMED ASK`
  comment in `content.pitch.js`.
- **The product mockup is a concept, not a screenshot.** Distances in
  `previewChargers` are illustrative placeholders. The caption says so; keep it
  that way.
- Confirm `base` in `vite.config.js` matches the deploy target. It is `/MOVIA/`,
  which is correct for `https://veysean.github.io/MOVIA/`. Set it to `/` for a
  custom domain or a root user-page repo.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with Vite
and publishes the whole `dist/` (both pages) to GitHub Pages. No workflow change
was needed for the second page. `dist/` is gitignored and never committed.

One-time repo setup, done by hand: **Settings → Pages → Source → "GitHub Actions."**
The first workflow run fails without it.

## Known fast-follows (out of scope for v1, per brief §8)

- Khmer-language version.
- Real form backend / CMS / analytics.
- Team photos.
