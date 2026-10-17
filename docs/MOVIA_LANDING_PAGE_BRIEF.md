# MOVIA Landing Page — Build Brief

**For:** Claude Code
**Goal:** Build a single-page marketing/recruitment site for MOVIA — Cambodia's mobility intelligence platform — using Node + vanilla JavaScript, deployable to GitHub Pages.
**Audience:** Pilot riders, charging operators, delivery platforms, government/policy contacts, investors, competition judges (Tsinghua Global SDG Case Competition).

---

## 1. Project Overview

MOVIA turns fragmented rider movement (starting with EV charging status on Phnom Penh's National Road 6A corridor) into trustworthy mobility intelligence. Free for riders, paid for by partners (charging operators, fleets, OEMs, government).

This site is a single scrolling landing page — not a web app. No backend, no forms that submit anywhere real yet (mailto link is fine for the CTA). The entire deliverable is static output suitable for GitHub Pages.

**Core differentiator to communicate visually, not just in text:** MOVIA never overclaims. Every signal it shows carries a confidence state and an age ("Available — confirmed 12 min ago, 3 riders," never just "Available"). The design should demonstrate this live in the hero, not just describe it in a paragraph.

---

## 2. Tech Stack & Architecture

- **Build tool:** Vite (`vanilla` JS template — no framework needed, content is static).
- **Language:** Plain JavaScript (ES modules), HTML, CSS. No TypeScript required unless Claude Code judges it adds value with no cost to velocity.
- **No CSS framework.** Hand-written CSS using custom properties (design tokens below). No Tailwind — the design is specific enough that utility classes would fight it.
- **Content as data:** Feature list, roadmap phases, team members, and trust states should live in a JS data module (`src/data/content.js`) rather than being hardcoded in markup, so copy edits don't require touching layout code.
- **Animation:** CSS keyframes + `IntersectionObserver` for scroll reveals. No animation library needed.

### Suggested file structure

```
movia-landing/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js              # entry: nav toggle, scroll reveal, hero animation init
│   ├── style.css             # all styles, using design tokens as :root variables
│   └── data/
│       └── content.js        # features, roadmap phases, team, trust states as exported arrays/objects
├── public/
│   └── favicon.svg
└── .github/
    └── workflows/
        └── deploy.yml         # GitHub Pages deploy action
```

---

## 3. Design System

### 3.1 Concept

"Night-ops dashboard" — the tone of something a rider or fleet operator would actually trust at 5am, not a generic startup landing page. Deep, calm background; one warm accent doing all the emotional work; data-grade monospace typography used specifically where the product is being honest about time and confidence.

### 3.2 Color tokens

```css
:root {
  --bg:          #0c211f;   /* page background — deep teal-charcoal, not pure black */
  --bg-1:        #0f2926;   /* panel background */
  --bg-2:        #12312d;   /* panel gradient end / elevated surface */
  --ink:         #eaf3ef;   /* primary text */
  --ink-dim:     #9db9b1;   /* secondary text */
  --ink-faint:   #5d7c74;   /* tertiary / meta text */
  --gold:        #e6a63e;   /* primary accent — "live", charging, CTAs */
  --gold-dim:    #8a6a30;
  --jade:        #4fb89a;   /* functional accent — verified / confirmed / working */
  --coral:       #dd6b52;   /* functional accent — hazard / offline, used sparingly */
  --line:        rgba(234,243,239,0.10);   /* hairline dividers */
  --line-strong: rgba(234,243,239,0.18);   /* borders on hover / emphasis */
}
```

**Rule:** gold = "this is live / act on this." Jade and coral are *only* used for functional state (confirmed vs. offline), never as decoration. Do not introduce a fourth accent color.

### 3.3 Typography

| Role | Typeface | Notes |
|---|---|---|
| Display (headlines) | **Space Grotesk** (600/700) | Geometric, technical character — signals "intelligence platform," not "consumer app." |
| Body | **Inter** (400/500) | Clean, high legibility at small sizes. |
| Data / mono | **IBM Plex Mono** (400/500) | Reserved *exclusively* for timestamps, confidence tags, status labels, section eyebrows. This is a semantic rule, not a stylistic one — mono appearing = "this is a data readout." |

Load via Google Fonts (`Space+Grotesk:wght@400;500;600;700`, `Inter:wght@400;500;600`, `IBM+Plex+Mono:wght@400;500`).

Type scale: fluid via `clamp()`. Hero H1 `clamp(38px, 5.4vw, 64px)`; section H2 `clamp(28px, 3.4vw, 40px)`; body 16–18px; mono labels 11–12.5px with `letter-spacing: 0.08–0.14em` and uppercase.

### 3.4 Layout

- Max content width: `1180px`, centered, `32px` side padding (`20px` on mobile).
- Sharp-ish corners throughout — `border-radius` 2–4px max. This is a data-instrument aesthetic, not a soft consumer one.
- Sections separated by 1px hairline borders (`--line`), not shadows or heavy spacing alone.
- Breakpoints: primary collapse at `860px` (grids → single column, nav links hide behind implied simplification — see 3.6), secondary at `640px` (padding tightens).

### 3.5 Signature element — the hero signal visualization

This is the one deliberate visual risk; everything else stays disciplined around it.

An SVG stylized route/path (dashed line, low-contrast) with **3 pulsing nodes** placed along it. Each node:
- Core dot in `--gold`.
- A glow ring that animates opacity/size on a ~4.5s loop, staggered per node (`animation-delay: 0s / 1.5s / 3s`) so they don't pulse in sync.
- The pulse fades from full opacity down to ~14% and back — visually *is* the confidence-decay concept the product is built on.

Below/beside the SVG, 3 small "chip" readouts in mono type, e.g.:
```
NR6A · Km 12 hub     CONFIRMED   4 min · 3 riders
AEON Meanchey        REPORTED    18 min · 1 rider
Tuol Kork hub        UNKNOWN     decayed
```
Colored by state: confirmed = jade, reported = gold, unknown = faint gray.

Respect `prefers-reduced-motion`: freeze animations, no exceptions.

### 3.6 Navigation

Fixed top bar, translucent + blurred background (`backdrop-filter: blur(10px)` over `rgba(bg, 0.82)`), 1px bottom hairline. Wordmark = "MOVIA" in Space Grotesk 700 with a small glowing gold dot before it (echoes the signal-node motif). Right-aligned nav links + a mono-styled "Partner with us" CTA button that scrolls to the contact footer. On narrow viewports (<840px), simplify to wordmark + CTA only (a full hamburger menu is optional — not required for MVP; Claude Code may add one if time allows, but do not let it block ship).

### 3.7 Motion principles

- One orchestrated moment (hero pulse) — don't scatter animation everywhere.
- Scroll-reveal: sections fade + translateY(18px→0) via `IntersectionObserver`, 0.7s ease, trigger once (unobserve after firing).
- Hover states: buttons translateY(-2px) + border/background shift, 0.2s ease. No bounce, no elastic easing.
- Custom ease: `cubic-bezier(.16,.84,.44,1)` used consistently across transitions.

---

## 4. Page Content (section by section, with copy)

Build as one scrolling page, in this order. Section IDs in parentheses are used for nav anchors.

### 4.1 Nav
Links: Problem · Product · Features · Trust · Roadmap · Team. CTA: "Partner with us" → `#contact`.

### 4.2 Hero (`#top`)
- Eyebrow: "Cambodia's mobility intelligence layer"
- H1: "Every journey teaches the city."
- Subhead: "Cambodia doesn't lack EV demand — it lacks **trustworthy mobility information**. MOVIA turns fragmented rider movement into intelligence riders can trust, free of charge, and partners pay to access."
- CTAs: primary "Join the NR6A pilot" (`#contact`), ghost "See how it works" (`#product`)
- Signature signal visualization (see 3.5) in a bordered panel to the right (stacks below on mobile).

### 4.3 Problem (`#problem`)
- Eyebrow: "The problem"
- H2: "A charger that might be broken is the same as no charger at all."
- Vignette (styled as a bordered, gold-left-border quote block): "At dawn, an electric motorcycle rider pulls up to a charging hub on National Road 6A with one question: **is it actually working today?** He checks two or three Facebook groups before deciding — and by the time he's sure, he's lost the time he was trying to save. Switching to an EV already cut his fuel cost by more than 70%. The bottleneck was never the vehicle. It's the information."
- Pull quote (large, gold, Space Grotesk): "Cambodia does not lack EV demand. It lacks trustworthy mobility information."
- 3-card grid, numbered `01 / 02 / 03` (a real sequence — first-to-third barrier compounding, so numbering is meaningful here):
  1. **Charging uncertainty** — No shared network shows real-time charger availability — riders default to word of mouth.
  2. **Fragmented information** — Traffic, charging, rider behavior, and infrastructure data live in separate, disconnected places.
  3. **Compounded risk** — Congestion, unsafe roads, and charging uncertainty don't add up — they multiply each other.

### 4.4 Product architecture (`#product`)
- Eyebrow: "Product architecture"
- H2: "Three layers, not two."
- Intro: "A direct rider-to-partner data pipe is exactly the 'your data is the product' model that breaks trust. The Intelligence Core sits between them on purpose — nothing leaves the rider layer as raw, identifiable data. Only modeled, aggregated intelligence crosses into the partner layer."
- Three stacked layer panels connected by labeled arrows (mono text between them):
  1. **Rider layer — free.** "What riders get": Range & Decision Engine · Charge/Swap Nudge · Passive Ride Assistant · End-of-Shift Summary · Trust Indicators.
     ↓ *movement, energy & hazard signals*
  2. **Intelligence core — MOVIA.** "What we build": Signal ingestion → anonymization → aggregation → modeling → verification → decision outputs. Range/Consumption Model · Charging & Swap Demand Model · Trust & Verification Engine · Emissions Ledger (Phase 3).
     ↓ *aggregated, anonymized intelligence — never raw data*
  3. **Partner layer — paying.** "Who pays": Charging & swap operators · delivery & fleet platforms · EV OEMs · infrastructure & government · later, insurers — via SaaS dashboards, an intelligence API, transaction settlement, and project-based data work.
- Closing note (jade left-border): "Riders are always free. Partners never buy individually identifiable rider data — only what the Trust & Verification Engine has already aggregated and scored."

### 4.5 Features / build priority (`#features`)
- Eyebrow: "What we're building first"
- H2: "Three features are known. Everything else waits."
- Intro: "Each feature carries an evidence tag. Commission-generating features come first because they need the least data density — one operator, one rider, one completed transaction is already revenue. Retention and infrastructure features wait until that foundation holds."
- Three primary feature cards, each with a `KNOWN` status badge (jade), a title, a "Pain point" column, and a "Feeds" column:
  1. **Shift Range Forecast** — Pain point: "Can I finish my batch on this battery?" — Feeds: The Range/Consumption Model — the core dataset partners pay to access.
  2. **Smart Charge/Swap Nudge** — Pain point: Charging downtime costs delivery riders working time. — Feeds: The transaction layer — every booked charge is a commission event.
  3. **One-Glance Journey Confidence** — Pain point: Private riders already check battery before a trip — existing habit, not a new one. — Feeds: Baseline retention data that de-risks harder features before we build them.
- Below, a visually dimmed "Deferred — validate the three above first" block listing:
  - Passive In-Ride Assistant — `HYPOTHESIS` badge (gold)
  - End-of-Shift Summary — `HYPOTHESIS` badge (gold)
  - Passive Hazard / Road Signal — `PRIMARY RESEARCH REQUIRED` badge (faint/gray)

**Status badge colors:** Known = jade background tint + jade text + jade border. Hypothesis = gold tint/text/border. Primary research required = faint gray tint/text, neutral border. These three badge states are reused in section 4.6 for signal states — keep the visual language consistent across the page.

### 4.6 Trust model (`#trust`)
- Eyebrow: "Why riders believe it"
- H2: "Confidence and age, on every signal."
- Intro: "MOVIA never shows 'Available.' It shows **'Available — confirmed 12 min ago, 3 riders.'** Refusing to overclaim is the product, not a limitation of it."
- Two-column layout:
  - Left: a bordered panel with a small state table:
    | State | Meaning |
    |---|---|
    | Confirmed (jade) | 2+ independent signals within the freshness window. |
    | Reported (gold) | 1 signal — shown, but marked single-source. |
    | Unknown (faint) | Decayed, no recent signal. Never shown as available. |
    | Offline (coral) | Reported broken. |
  - Right: a numbered principle list (`01–04`, real sequence = priority order of the trust mechanism):
    1. **Corroboration over volume.** Two independent agreeing reports outweigh five reports from one rider.
    2. **Reporter weight.** Riders who get corroborated gain weight; those repeatedly contradicted lose it — no moderation staff required.
    3. **Passive signals.** A 15+ minute charging dwell is implicit evidence a charger works. Most riders never tap — every rider charges.
    4. **Operator channel.** Operators self-report uptime for a free dashboard. High weight, still decays.

### 4.7 Roadmap (`#roadmap`)
- Eyebrow: "Go-to-market"
- H2: "One corridor first. Then the city."
- 4-column phase track (single column on mobile):
  1. **V0 — Concierge** (0–1 month): Telegram community, Google Form reports, manually updated live map. No code — validate rider behavior first.
  2. **V1 — Pilot app** (100 riders, NR6A): Live Charger Intelligence + Road Alerts, shipped as two features on one shared pipeline.
  3. **V2 — Mobility layer** (city-wide): Heatmaps and predictions for congestion, charging demand, and flood risk.
  4. **V3 — Institution dashboard** (partners onboard): Government, fleets, banks, and insurers subscribe to MOVIA Intelligence.
- Below: a 3-stat row (large gold numerals, Space Grotesk):
  - **100** — Riders piloting on the National Road 6A corridor
  - **≥3** — Signals per charger per day — the density target, not user count
  - **60%** — Weekly active rider target during the pilot

### 4.8 Team (`#team`)
- Eyebrow: "Team"
- H2: "Five roles, one loop."
- Subhead: "Observe → Understand → Explain → Design → Improve."
- Grid of 5 members (name + role only, no photos required for v1):
  - Veysean Kem — Product & Technology Lead
  - Kheankeo Babera — Intelligence & Infrastructure Lead
  - Sovannita Yim — Strategy, Policy & System Lead
  - Sokunmealea Soy — Partnerships, Sales & Marketing Lead
  - Noucheav Phorn — Media & Communications Lead

### 4.9 Footer / CTA (`#contact`)
- H2 (centered): "Every journey teaches the city."
- Body: "Today: helping one rider find one charger. Tomorrow: helping Cambodia understand how people move."
- Primary CTA button: "Get in touch" → `mailto:` link. **Placeholder email `hello@movia.app` — replace with the real contact before deploy.**
- "Looking for" tag row (pill-shaped mono chips): Pilot riders · Charging operators · Delivery platforms · Researchers · Government · Investors
- Bottom bar: left = "MOVIA — developed through the Tsinghua Global SDG Case Competition, Phnom Penh" · right = "© 2026 MOVIA"

---

## 5. Accessibility & Quality Bar

- All interactive elements need a visible `:focus-visible` outline (use `--gold`, 2px, 3px offset).
- Respect `prefers-reduced-motion: reduce` — disable/shorten all animations and transitions.
- Color contrast: body text (`--ink-dim` on `--bg`) must meet at least WCAG AA for normal text; verify, don't assume.
- Fully responsive down to ~360px width — test the hero panel, feature cards, and layer stack specifically, since they're grid-heavy.
- Semantic HTML: real `<nav>`, `<header>`, `<section>` with `id`s matching the nav anchors, `<footer>`. Alt text / `aria-hidden` appropriately on decorative SVG.
- No layout shift from web font loading — use `font-display: swap` (default with the Google Fonts link) and reasonable fallback stack.

---

## 6. Deployment — GitHub Pages via GitHub Actions

Use a GitHub Actions workflow to build with Vite and publish `dist/` to GitHub Pages (do not commit `dist/` to the repo manually).

**`vite.config.js`** — set `base` to the repo name if this deploys to `https://<user>.github.io/<repo>/` (omit or set to `/` if it's a user/org root site or a custom domain):

```js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/movia-landing/', // change to '/' if using a custom domain or root user-page repo
});
```

**`.github/workflows/deploy.yml`:**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**One-time repo setup (manual, not part of the build):** in the GitHub repo, go to Settings → Pages → Source → select "GitHub Actions."

**`package.json` scripts** should include at minimum:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 7. Acceptance Checklist

- [ ] `npm run dev` runs locally with no console errors.
- [ ] `npm run build` produces a working `dist/` that `npm run preview` serves correctly.
- [ ] All 9 sections in §4 present, in order, with the exact copy (light copy edits for flow are fine; don't cut content).
- [ ] Hero signal animation pulses, staggered, and respects reduced-motion.
- [ ] Scroll-reveal works on all sections, fires once.
- [ ] Nav anchor links scroll to the correct section.
- [ ] Fully responsive at 1440 / 1024 / 768 / 375px — no horizontal scroll, no overlapping text.
- [ ] Lighthouse accessibility score ≥ 95.
- [ ] Placeholder contact email flagged clearly (e.g. a code comment) so it isn't shipped by accident.
- [ ] GitHub Actions workflow deploys successfully to Pages on push to `main`.

---

## 8. Explicitly Out of Scope for v1

- No CMS, no real form backend, no analytics — can be added later.
- No multi-language (Khmer) version yet — flag as a fast-follow, don't build it now.
- No dark/light theme toggle — this design *is* the theme.
- No team photos — text-only member cards for v1.
