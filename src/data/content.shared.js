/**
 * Content used by BOTH pages (index.html and pitch.html).
 *
 * Anything in here is the single source of truth — do not copy these strings
 * into content.home.js or content.pitch.js. Page-specific copy belongs in
 * those files instead.
 *
 * Values may contain inline <strong>/<em> markup — they are authored here, not
 * user input, and are inserted with innerHTML by the page entry scripts.
 */

/* Confirmed public contact address — feeds every "Get in touch" link. */
export const contact = {
  email: 'hello@movia.app',
};

/* Mailto used by the partner CTAs on both pages. */
export const partnerInquiryHref = `mailto:${contact.email}?subject=Partner%20inquiry`;

/* =====================================================================
 * ⚠️  PLACEHOLDER PILOT SIGN-UP LINK — NOT A REAL DESTINATION  ⚠️
 * Every "Join the pilot" button falls back to email because no sign-up
 * exists yet. The V0 concierge plan calls for a Telegram group and a
 * Google Form — swap this for whichever ships first.
 * ===================================================================== */
export const joinPilotHref = `mailto:${contact.email}?subject=Join%20the%20pilot`;
export const joinPilotIsPlaceholder = true;

/* Badge label + tone, keyed by feature evidence level and by signal state.
   One map, so a label edit lands on both pages at once:
   known/confirmed = jade, hypothesis/reported = gold, research/unknown =
   faint, offline = coral. */
export const badges = {
  known: { label: 'Known', tone: 'jade' },
  hypothesis: { label: 'Hypothesis', tone: 'gold' },
  research: { label: 'Primary research required', tone: 'faint' },
  confirmed: { label: 'Confirmed', tone: 'jade' },
  reported: { label: 'Reported', tone: 'gold' },
  unknown: { label: 'Unknown', tone: 'faint' },
  offline: { label: 'Offline', tone: 'coral' },
};

/* Hero signal readouts — see brief §3.5. Both pages render the same panel. */
export const heroSignals = [
  { site: 'NR6A · Km 12 hub', state: 'confirmed', meta: '4 min · 3 riders' },
  { site: 'AEON Meanchey', state: 'reported', meta: '18 min · 1 rider' },
  { site: 'Tuol Kork hub', state: 'unknown', meta: 'decayed' },
];

/* Primary research from the NR6A corridor — a real rider interview, not a
   projection. The pitch page frames it as evidence; the homepage frames it as
   origin story. Same quote, same panel treatment. */
export const fieldEvidence = {
  quote:
    'Switching to an electric motorcycle cut daily fuel costs by <strong class="hl">more than 70%</strong> — but charging remains stressful. Riders check several Facebook groups daily just to find a working charger, and want one reliable system instead.',
  source: 'Rider interview, NR6A field research',
};

export const trustStates = [
  { state: 'confirmed', meaning: 'Two or more independent signals, still inside the freshness window.' },
  { state: 'reported', meaning: 'One signal. Shown, but marked single-source.' },
  { state: 'unknown', meaning: 'Decayed. No recent signal, and never shown as available.' },
  { state: 'offline', meaning: 'Reported broken.' },
];

/* Numbered 01–04: a real sequence — priority order of the trust mechanism. */
export const trustPrinciples = [
  {
    n: '01',
    title: 'Corroboration over volume.',
    body: 'Two independent riders who agree outweigh five reports from one.',
  },
  {
    n: '02',
    title: 'Reporter weight.',
    body: 'Get corroborated, gain weight. Get contradicted repeatedly, lose it. No moderation staff required.',
  },
  {
    n: '03',
    title: 'Passive signals.',
    body: 'A 15-minute charging dwell is evidence the charger works. Most riders never tap — every rider charges.',
  },
  {
    n: '04',
    title: 'Operator channel.',
    body: 'Operators self-report uptime in exchange for a free dashboard. High weight, still decays.',
  },
];

export const whyNotMaps = {
  label: 'Why not Google Maps',
  lead: 'Google Maps can show you where a charger is.',
  turn: 'It cannot show you that a rider you trust confirmed it eight minutes ago.',
};

/* The clearest one-line statement of the privacy model. The pitch page uses it
   as the partner layer's summary; the homepage leads the partner section with
   it. Defined once so the two can never drift apart. */
export const partnerPromise = 'Partners buy the pattern. Never the person.';

export const sdg = {
  policy:
    'Aligned with Cambodia’s National EV Policy 2024–2030, NDC 3.0 (41.7% emissions reduction by 2030), and the National Energy Efficiency Policy.',
  goals: [
    { code: 'SDG 3', label: 'Health' },
    { code: 'SDG 7', label: 'Clean Energy' },
    { code: 'SDG 9', label: 'Infrastructure' },
    { code: 'SDG 11', label: 'Sustainable Cities' },
    { code: 'SDG 13', label: 'Climate Action' },
    { code: 'SDG 17', label: 'Partnerships' },
  ],
};

export const team = [
  { name: 'Veysean Kem', role: 'Product & Technology' },
  { name: 'Kheankeo Babera', role: 'Intelligence & Infrastructure' },
  { name: 'Sovannita Yim', role: 'Strategy, Policy & Systems' },
  { name: 'Sokunmealea Soy', role: 'Partnerships, Sales & Marketing' },
  { name: 'Noucheav Phorn', role: 'Media & Communications' },
];
