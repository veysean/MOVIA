# MOVIA — website

Public website for MOVIA: **Home · About Us · Join Us** in English and Khmer, with a
role-based interest form. Built to the *Website Content Structure Handover v1.0* and the
rider-app brand and the Canva deck *MOVIA – Confidence in Every Motion.* (navy/royal/azure, spectrum line, orange pin).

**Stack:** Astro 7 (static) · plain CSS tokens · Kantumruy Pro · Cloudflare Pages ·
Pages Function + D1 (form storage) · Turnstile (spam protection). **Cost:** $0.

The previous dark "night-ops" site (incl. `pitch.html`) is preserved at tag `legacy-v1`.

## Run locally

```bash
npm install
npm run dev                 # pages only → http://localhost:4321/en/
# full stack incl. the form API and a local database:
cp .dev.vars.example .dev.vars
npm run db:init:local
npm run preview             # → http://localhost:8788/en/
```

## Where to edit

| What | File |
|---|---|
| All English / Khmer copy | `src/i18n/en.ts`, `src/i18n/km.ts` (Khmer = draft, needs native review) |
| Team cards | `src/data/team.ts` — name, role, `study` ("Major · School"), bio, photo. Set `confirmed: true` only after the member approves in writing |
| Team photos | `public/img/team/<id>.jpg`, **144×144 px JPG (~5 KB)**. Keep full-size originals in `originals/` (git-ignored), never in `public/` |
| About › Our Impact figures | `src/data/impact.ts` → `impactStats` |
| About › Our Impact photos | Originals in `assets/energyflow/` (git-ignored). Make `public/img/impact/energyflow-N.jpg` + `.webp` (max 1600 px, WebP q78 / JPG q80, metadata stripped, < 300 KB, with `sharp`) and add alt text + size in `photoInfo` in `src/data/impact.ts`. Every `.jpg` there shows up automatically and opens in the lightbox; with none, the grid shows "coming soon" placeholders |
| About › milestone photos | Originals go in `assets/dgiy-masterclass/` and `assets/dgiy-demo-day/` (git-ignored). Make `public/img/milestones/<id>.jpg` + `.webp` (extras `<id>-2`, `<id>-3`…): max 1200 px wide, WebP q78 / JPG q80, metadata stripped, < 250 KB, using `sharp`. Then list them in that milestone's `photos` (with `alt` in EN + KM) in `src/data/milestones.ts`. The first photo is the thumbnail; all open in the lightbox |
| About › Our learning journey | `src/data/milestones.ts`. A milestone shows as *upcoming* until its `end` date has passed **at build time**, so redeploy after the date |
| Home › insight figures | `src/data/stats.ts` (value, label, date, source link) |
| Public email, LinkedIn, Facebook | `src/data/site.ts` |
| Colours, type, spacing | `src/styles/tokens.css` |
| Form fields (UI) | `src/pages/[lang]/join/index.astro` |
| Form API + validation | `functions/api/interest.ts` · DB schema `db/schema.sql` |

`npm run check:content` lists everything still marked *To confirm* (`[TO CONFIRM]`, `TBC`, `TODO`,
`confirmed: false`). Machine-written Khmer is marked `// DRAFT KM`.

### Update the rider-app demo video
`demo/app.html` is a copy of the rider-app prototype (never deployed). To refresh the video:
replace `demo/app.html`, then run `npm run record:demo` (needs network for map tiles). It writes
`public/video/app-demo.{mp4,webm}` and `app-demo-poster.jpg`.

## Deploy to Cloudflare Pages (one time, ~20 min)

1. **Create the database**
   ```bash
   npx wrangler login
   npx wrangler d1 create movia-interest     # copy the database_id it prints
   ```
   Paste the id into `wrangler.toml` (`database_id = "…"`), commit, then:
   ```bash
   npm run db:init:remote
   ```
2. **Create Turnstile keys:** Cloudflare dashboard → Turnstile → Add widget →
   hostname `movia.pages.dev` (your Pages subdomain; add the custom domain later). Copy the site key and secret key.
3. **Create the Pages project:** Workers & Pages → Create → Pages → *Connect to Git* →
   `veysean/MOVIA`, branch `main`. Framework preset **Astro**, build command `npm run build`,
   output directory `dist`.
4. **Environment variables** (Settings → Variables and secrets, Production *and* Preview):
   - `PUBLIC_TURNSTILE_SITE_KEY` = your site key (plain text, used at build time)
   - `TURNSTILE_SECRET` = your secret key (**encrypt**)
   - `SITE_URL` = `https://<your-project>.pages.dev`
   The D1 binding `DB` comes from `wrangler.toml` automatically.
5. **Deploy** → retry the deployment once after adding the variables. Submit a test entry,
   then check it: `npx wrangler d1 execute movia-interest --remote --command "SELECT * FROM interest"`.
6. In the old repo settings, disable **GitHub Pages** (the old workflow has been removed).

Export submissions any time: `npm run db:export` → `interest-export.json`.

### Later: custom domain
Buy the domain in Cloudflare → Pages project → Custom domains → add it. Then add the
domain to the Turnstile widget hostnames, update `SITE_URL`, and set up Email Routing for
`hello@…` → update `src/data/site.ts`. Also update `SITE_URL` so canonical links, the sitemap and
`robots.txt` use the new domain.

## Before going public (blocks launch, not the build)
- [ ] Team: bios and each member's major + school (`team.ts`)
- [ ] EnergyFlow event photos (`public/img/impact/`)
- [ ] Definition + date for the 250+ / 1 / 2 impact figures (`impact.ts`)
- [ ] Written OK for the DGIy / CADT milestone wording (`milestones.ts`)
- [ ] Khmer review by a native speaker (every `// DRAFT KM` line)
- [ ] Privacy retention period (`privacy` in `en.ts`/`km.ts`)
- [ ] Redeploy after 22 Oct 2026 so CODE-C switches from *upcoming* to reached
- [ ] Optional: a 2400 px wide hero photo (`public/img/home/hero-road-wide.jpg` + `.webp`) — the code picks it up automatically
