# MOVIA — website

Public website for MOVIA: **Home · About Us · Join Us** in English and Khmer, with a
role-based interest form. Built to the *Website Content Structure Handover v1.0* and the
rider-app brand (Steel Azure / Deep Saffron / Pearl).

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
| Team cards | `src/data/team.ts` — set `confirmed: true` only after the member approves |
| Proof points (numbers) | `src/data/impact.ts` — value + definition + date |
| Ecosystem & recognition | `src/data/ecosystem.ts` — `partner` / `program` / `engagement` |
| Public email, LinkedIn | `src/data/site.ts` |
| Colours, type, spacing | `src/styles/tokens.css` |
| Form fields (UI) | `src/pages/[lang]/join/index.astro` |
| Form API + validation | `functions/api/interest.ts` · DB schema `db/schema.sql` |

`npm run check:content` lists everything still marked *To confirm*.

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
`hello@…` → update `src/data/site.ts`.

## Before going public (blocks launch, not the build)
- [ ] Team: names, bios, photos, approvals (`team.ts`)
- [ ] Verified proof points with dates (`impact.ts`)
- [ ] Exact DGIy Demo Day / GreenHouse / Tsinghua wording + permission (`ecosystem.ts`)
- [ ] Khmer review by a native speaker (`km.ts`)
- [ ] Real public inbox (`site.ts`) and privacy retention period (`privacy` in `en.ts`/`km.ts`)
- [ ] Confirm mission & vision wording
