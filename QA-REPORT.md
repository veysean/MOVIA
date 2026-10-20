# MOVIA website — pre-launch QA report

Branch `website-v2`. **Phase 1** audit: 20 Oct 2026. **Phase 2** fixes and re-check: 20 Oct 2026.
Severity: **blocker** = must fix before launch · **should** = fix now · **nice** = optional.
Status: ✅ fixed · ⏸ not changed (reason given) · 👥 needs the team.

How it was checked: greps over `src/`; a crawl of every built page in `dist/`; Playwright at
360 / 375 / 1280 px in EN and KM (incl. JS off and `prefers-reduced-motion`); pixel-sampled
contrast of every text box against what is actually behind it; the full stack on
`wrangler pages dev` with local D1 and Turnstile test keys (incl. the new security headers);
Lighthouse 13.5 (mobile); `npm audit`.

## Result after phase 2

| check | before | after |
|---|---|---|
| Blockers | 2 | **0** |
| `npx astro check` | 0 errors | 0 errors (4 old hints in `scripts/record-app-demo.mjs`) |
| `npm run build` | ok | ok, 12 pages + `sitemap-index.xml` + `robots.txt` |
| Internal links / anchors | 1 broken (404 toggle) | **0 broken** (187 checked) |
| Text contrast failures | 0 | 0 (11 pages × 2 widths) |
| Duplicate meta descriptions | all pages | none |
| en/km key shape | identical | identical |
| CSP violations / console errors | (no CSP) | none on 8 pages |
| Form, 3 roles × EN/KM → D1 | ok | ok; errors now linked to fields; no-JS error shown |

Lighthouse, mobile (`wrangler pages dev`):

| page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | weight |
|---|---|---|---|---|---|---|---|
| /en/ | 99 → **97** | 100 | 100 | 100 | 2.3 s | 0 | 677 → **199 KiB** |
| /en/about/ | 81 → **99** | 100 | 100 | 100 | 3.4 → **1.8 s** | 0.193 → **0** | 22.7 MB → **151 KiB** |
| /en/join/ | 100 → **92** | 100 | 100 | 100 | 2.9 s | 0 | 217 → 240 KiB |

Home and Join vary ±5 points between runs on this machine: their LCP depends on the hero
photo and the third-party Turnstile script. All targets met (Performance ≥ 85, others ≥ 95).

## 1 · Brand & design consistency

| issue | file | severity | status |
|---|---|---|---|
| Hard-coded shadow/scrim `rgba`, `blur(6px)`, `5px` ring, `2px` nudge in the phone mockup | src/components/PhoneMock.astro | should | ✅ `--shadow-phone`, `--scrim`, `--blur-glass`, spacing tokens |
| Pillar top bar `4px` | src/pages/[lang]/index.astro | should | ✅ `--pillar-bar` |
| Join: `340px`, `3px/2px` focus, `26px`, `20px`, `1.5px` | src/pages/[lang]/join/index.astro | should | ✅ `--aside-w`, `--focus-w`/`--focus-offset` (shared with the global ring), `--check-size`, `--control-size`, 1px hairline |
| Thanks: `760px`, `72px`, `28px`; member photo `72px` | thanks.astro, about.astro | should | ✅ `--measure`, `--avatar`, `--step-size` |
| `theme-color` meta literal `#004E9F` | src/layouts/Base.astro:27 | nice | ⏸ meta tags can't read CSS variables |
| `@media` breakpoints are literal px | pages | nice | ⏸ CSS can't use variables in `@media`; documented in CLAUDE.md |
| Select arrow icon colour inside a `data:` SVG | join/index.astro (select) | nice | ⏸ a data URI can't use variables (same navy as `--navy`) |
| 10 unused tokens | src/styles/tokens.css | should | ✅ removed (+ `--grad-page`/`--grad-hero`, which only fed dead CSS) |
| Dead CSS: `.section--pearl`, `.page-glow`, `.badge--ok`, `.row__icon--ok/--neutral` | src/styles/base.css | should | ✅ removed |
| 8 unused icons | src/lib/icons.ts | should | ✅ removed |
| Unused rider-app `mock` copy block | en.ts, km.ts | should | ✅ removed |
| `/favicon.svg` = old placeholder "M" mark | public/favicon.svg | should | ✅ deleted (the linked favicon.png is the pin) |
| og.png pre-launch pill in the old orange-text style | public/og.png | should | ✅ re-rendered: orange fill, navy-deep text + dot, Kantumruy Pro |
| 1.4 MB of unused logo originals published | public/brand/ | should | ✅ moved to `assets/brand-src/` (still in git, not published) |
| Hero photo only 897 px wide (blurry, ~2× stretched on desktop) | src/pages/[lang]/index.astro | should | ✅ from 1024 px the photo sits on the right at ~1.15× with its left edge fading into royal (sharp; contrast re-checked at 1024/1280/1835). 👥 a 2400 px `hero-road-wide.jpg` would bring back full-bleed automatically |

Already passing: same buttons, cards, title rules and `.pagehero` on every page; background
rhythm without repeats; real logo everywhere; Kantumruy Pro only.

## 2 · Accessibility

| issue | file | severity | status |
|---|---|---|---|
| Esc closed the menu but left focus inside the hidden panel | src/components/Header.astro | should | ✅ focus returns to the menu button (verified) |
| No header navigation on phones with JS off | Header.astro, Footer.astro | should | ✅ a no-JS menu link jumps to the footer nav, which now includes the language switch (verified) |
| `<video autoplay>` ran with JS off, ignoring reduced motion | src/components/PhoneMock.astro | should | ✅ attribute removed; the script plays it only on screen and without reduced motion (verified both ways) |
| Form errors not linked to their fields | join/index.astro | should | ✅ `aria-describedby` → `err-<field>` while an error shows (verified) |
| `<main>` not focusable after the skip link | src/layouts/Base.astro | nice | ✅ `tabindex="-1"`: focus lands on `MAIN#main` |
| Smooth scroll under reduced motion | join/index.astro | nice | ✅ `auto` when reduced motion is on |

Re-check: one h1 per page, no skipped levels, all landmarks, every image has alt text, tap
targets ≥ 44 px, no horizontal scroll at 360 px, nothing hidden with JS off or reduced motion.

## 3 · Content & bilingual

| issue | file | severity | status |
|---|---|---|---|
| "[TO CONFIRM] Short bio…" shown publicly on all 5 team cards | src/data/team.ts | **blocker** | ✅ placeholder bios are no longer printed; 👥 real bios still needed |
| `check:content` missed `TBC` placeholders | scripts/check-content.mjs | should | ✅ now also catches `TBC` and `TODO`; placeholders switched to `[TO CONFIRM]` |
| New Khmer strings not marked `// DRAFT KM` | km.ts, team.ts, impact.ts, milestones.ts, stats.ts | should | ✅ marked |
| Same meta description on every page | Base.astro + pages | should | ✅ each page uses its own lede (EN + KM), no new copy invented |
| 234 stations credited without "citing Electricity Authority of Cambodia" | src/data/stats.ts | should | ✅ same source label as 421 |
| Video label could read as a launched payment product | en.ts, km.ts | should | ✅ "…rider app **prototype**…" |
| `site.ts` email marked TO CONFIRM | src/data/site.ts | should | ✅ team confirmed `movia@gmail.com` |
| Facebook link had a `?mibextid=` tracking parameter | src/data/site.ts | should | ✅ removed |
| Headings "Become our partner." / "Move with us." vs CTA casing | en.ts | nice | ⏸ headings stay sentence case on purpose; CTAs are identical everywhere |
| `EN` / `ខ្មែរ` and the root redirect title are literal | LangToggle.astro, src/pages/index.astro | nice | ⏸ language names are shown in their own language on purpose |

## 4 · About Us (CODE-C doc)

| item | status |
|---|---|
| "Meet our team, EnergyFlow"; each card: name, role, then major & school on its own line | ✅ `study: {en, km}` = "[TO CONFIRM] Major · School" for all 5; shown as a "To confirm" tag until filled |
| Our Impact: three-tier lists + proof grid removed | ✅ (removed earlier) |
| 3 stats "250+ Engagement outreach", "1 Sharing initiative", "2 MVPs" in `src/data/impact.ts` | ✅ |
| Photo grid: placeholders until photos exist in `public/img/impact/`, real images automatically | ✅ tested: adding a file replaced the placeholders; removing it brought them back |
| "Our learning journey": horizontal road on desktop, vertical on mobile, spectrum road, pin markers, upcoming style, animated in on scroll | ✅ data in `src/data/milestones.ts`; markers fade up one by one (transform/opacity only, off under reduced motion) |
| CODE-C (21–22 Oct) shown as upcoming until it has happened | ✅ decided at build time from its `end` date; **redeploy after 22 Oct** |
| Ecosystem & recognition section, `ecosystem.ts`, its i18n keys removed; sub-nav updated | ✅ |
| Mission & Vision: earlier wording restored, lede "Our journey compass" | ✅ |

## 5 · Links, routes & SEO

| issue | severity | status |
|---|---|---|
| No sitemap | should | ✅ `@astrojs/sitemap` with en/km alternates (8 content pages; thanks, 404 and the root redirect excluded) |
| No robots.txt | should | ✅ generated from `SITE_URL` (`src/pages/robots.txt.ts`) |
| 404: language toggle linked to `/404/`; canonical/hreflang for a missing URL; English only | should | ✅ toggle → `/en/` and `/km/`; no canonical/hreflang/og:url on the 404; message in both languages |
| Same meta description everywhere | should | ✅ (see §3) |

## 6 · Join Us form & backend

| issue | severity | status |
|---|---|---|
| No-JS error redirect showed no message | should | ✅ API redirects to `…?error=1#form-error`; the alert shows via `:target` without JS (verified) |
| Partner interest codes matched by index to labels | nice | ⏸ works; only matters if the pathway list is reordered |
| `contact_value` not format-checked | nice | ⏸ Telegram handles and phone formats vary; left as free text |

Re-check: 6 submissions (3 roles × EN/KM) reached the thanks page and were stored in local D1
with no IP column; validation, consent, `?role=partner` preselect, JSON error codes, 405 on GET.

## 7 · Performance

| issue | severity | status |
|---|---|---|
| Team photos 11.4 / 7.4 / 4.0 MB shown at 72 px | **blocker** | ✅ 144×144 JPGs, ~4 KB each. Full-size originals moved to `originals/team/` (git-ignored, kept on this PC) |
| CLS 0.193 on About | should | ✅ cause: the sub-nav re-wrapped when the web font swapped in. It's now one sideways-scrolling row below 1100 px. Also preloads the page language's two main font files. CLS 0 |
| Hero: one 897 px image, no srcset/AVIF | should | 👥 needs the wide photo first |
| Render-blocking CSS | nice | ✅ CSS inlined (`build.inlineStylesheets: 'always'`) |
| No cache headers for media | nice | ✅ 7 days for `/video/*`, `/img/*`, `/brand/*` |

## 8 · Security & repo hygiene

| issue | severity | status |
|---|---|---|
| `.env` not ignored | should | ✅ `.env`, `.env.*` ignored (`.env.example` kept); `originals/` ignored |
| `.nvmrc` = `22` | should | ✅ `22.22.0` |
| No CSP / HSTS | should | ✅ CSP (self + Cloudflare Turnstile; `data:` for images/fonts), HSTS 1 year; verified no violations and Turnstile still works |
| 22 MB of photos about to be committed | should | ✅ only the 5 small JPGs are in `public/` now |
| `CLAUDE.md` is git-ignored | decision | ⏸ team decided to keep it local |
| CSP still allows inline scripts (`'unsafe-inline'`) | nice (new) | ⏸ Astro inlines its small scripts; moving to hashes is a later hardening step |

Already passing: no secrets in code or history; `demo/` not in `dist/`; `wrangler.toml` project +
D1 id; `npm audit` 0 vulnerabilities (re-run after adding `@astrojs/sitemap`).

## 9 · Docs

| issue | status |
|---|---|
| CLAUDE.md out of date | ✅ gradients, section rhythm, cards, glass button, logo, tokens rule, placeholders + DRAFT KM rule, About data files, video playback (local file, git-ignored) |
| README out of date | ✅ how to edit team/study/photos, impact figures, event photos, milestones, insight stats; demo video update; custom-domain note for `SITE_URL`; launch checklist |

## Needs a decision or input from the team

1. **Redeploy after 22 Oct 2026** so CODE-C switches from "upcoming" to reached (the site is static).
2. **Wide hero photo** (2400 px, `public/img/home/hero-road-wide.jpg` + `.webp`): the current one
   is blurry on large screens. Once it exists, add a srcset (800/1600/2400) + AVIF.
3. **Native Khmer review** of every `// DRAFT KM` line (km.ts and the data files).
4. Local test data: 7 test rows are in the **local** D1 (`.wrangler/`, git-ignored), not production.

## Needs team input before launch

`npm run check:content` (9 items):
- `src/data/impact.ts:20`: what each figure (250+ / 1 / 2) counts, and its "as of" date
- `src/data/impact.ts:29`: add the EnergyFlow event photos to `public/img/impact/` (+ alt text)
- `src/data/milestones.ts:19`: written OK from DGIy (milestones 1–2) and CADT (milestone 3) for the wording
- `src/data/team.ts:31–32`: a short bio for each member (EN + KM)
- `src/data/team.ts:36–37`: each member's major and school (EN + KM)
- `src/i18n/en.ts:220` / `km.ts:221`: data retention period ("up to 12 months")

## Pre-launch check before merging to main (21 Oct 2026)

| check | result |
|---|---|
| Every file the build references exists in `public/` with exactly matching upper/lower case (Linux-safe) | ✅ 53 referenced files (16 built by Astro, 37 from `public/`), 0 case mismatches |
| Build needs nothing from `assets/`, `demo/`, `originals/` or other ignored folders | ✅ only `public/` is read (via `import.meta.glob`) |
| Clean-clone test: exactly the files `git add -A` ships → `npm ci` + `npm run build` | ✅ 12 pages + sitemap + robots.txt; 6 hero, 6 impact, 12 milestone, 5 team images, 3 video files; About shows 3 real photos, 0 placeholders |
| `npx astro check` | ✅ 0 errors, 0 warnings |
| en/km key parity | ✅ identical |
| Internal links / anchors / assets in `dist/` | ✅ 205 checked, 0 broken |
| `wrangler.toml` project + D1 id, `.nvmrc` | ✅ `movia`, `movia-interest` with a real `database_id`; `22.22.0` |
| Ignored and never committed: `.dev.vars`, `.env`, `node_modules`, `dist`, `.astro`, `.wrangler`, `interest-export.json`, `assets/` photo originals, `originals/` | ✅ |

Fixed in this round:
- Removed 3 unused i18n keys (en + km): `meta.siteName`, `footer.emailLabel`, `home.hero.imageAlt`.
- Demo video re-encoded under 500 KB with no visible change: MP4 650 → 421 KB (SSIM 0.9915),
  WebM 503 → 486 KB (SSIM 0.9965). Previous files kept in `originals/video/` (git-ignored).
- Hero rebuilt from the Canva export (1519×1080; AVIF/WebP/JPG at 1024 + 1519 px with srcset):
  sharp on 1920×1080 at 100–125 % scaling; still slightly soft on 2× Retina and phones until a
  ~3000 px source exists.

Still open after launch-merge (team): impact-figure definitions + dates, DGIy/CADT written OK,
member bios, data-retention period, privacy "Draft notice" banner, native Khmer review of every
`// DRAFT KM` line, redeploy after 22 Oct 2026 so CODE-C shows as reached.
