/**
 * Copy used only by pitch.html — the full product & business pitch.
 *
 * Anything that also appears on the homepage lives in content.shared.js and is
 * imported from there. Do not re-declare shared strings in this file.
 */

import { partnerPromise } from './content.shared.js';

export const nav = {
  links: [
    { label: 'Problem', href: '#problem' },
    { label: 'Product', href: '#product' },
    { label: 'Features', href: '#features' },
    { label: 'Trust', href: '#trust' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Team', href: '#team' },
  ],
  cta: { label: 'Partner with us', href: '#contact' },
};

/* Numbered 01–03: a real sequence — each barrier compounds the one before it. */
export const problems = [
  {
    n: '01',
    title: 'Charging uncertainty',
    body: 'No shared network shows which chargers are working right now. Riders fall back on word of mouth.',
  },
  {
    n: '02',
    title: 'Fragmented information',
    body: 'Traffic, charging, rider behavior, infrastructure — four kinds of data, four disconnected places.',
  },
  {
    n: '03',
    title: 'Compounded risk',
    body: 'Congestion, unsafe roads, and charging uncertainty don’t add up. They multiply.',
  },
];

export const productLayers = [
  {
    id: 'rider',
    title: 'Rider layer',
    qualifier: 'free',
    summary: 'Everything a rider needs to decide, before setting off. No charge, ever.',
    listLabel: 'In the app',
    items: [
      'Range &amp; Decision Engine',
      'Charge/Swap Nudge',
      'Passive Ride Assistant',
      'End-of-Shift Summary',
      'Trust Indicators',
    ],
    arrow: 'movement, energy &amp; hazard signals',
  },
  {
    id: 'core',
    title: 'Intelligence core',
    qualifier: 'MOVIA',
    summary: 'Signals arrive raw and personal. They leave modeled and anonymous.',
    listLabel: 'Under the hood',
    pipeline: 'ingest → anonymize → aggregate → model → verify → decide',
    items: [
      'Range/Consumption Model',
      'Charging &amp; Swap Demand Model',
      'Trust &amp; Verification Engine',
      'Emissions Ledger (Phase 3)',
    ],
    arrow: 'aggregated, anonymized intelligence — never raw data',
  },
  {
    id: 'partner',
    title: 'Partner layer',
    qualifier: 'paying',
    // Shared with the homepage's partner section — see content.shared.js.
    summary: partnerPromise,
    listLabel: 'Who pays',
    items: [
      'Charging &amp; swap operators',
      'Delivery &amp; fleet platforms',
      'EV OEMs',
      'Infrastructure &amp; government',
      'Later, insurers',
    ],
    note: 'Through dashboards, an API, transaction settlement, and project data work.',
    arrow: null,
  },
];

/* Concept mockup for the Live Charger Intelligence home screen. Deliberately
   wireframe-grade — see the caption. Distances are illustrative placeholders,
   not measured values. */
export const previewChargers = [
  {
    name: 'NR6A · Km 12 hub',
    state: 'confirmed',
    distance: '1.2 km',
    age: 'confirmed 4 min ago · 3 riders',
  },
  {
    name: 'AEON Meanchey',
    state: 'reported',
    distance: '3.4 km',
    age: 'reported 18 min ago · 1 rider',
  },
  {
    name: 'Tuol Kork hub',
    state: 'unknown',
    distance: '5.1 km',
    age: 'decayed · no recent signal',
  },
];

export const preview = {
  screenTitle: 'Live Charger Intelligence',
  caption: 'Concept mockup — the first screen we’re building. Not a live screenshot.',
};

export const features = [
  {
    badge: 'known',
    title: 'Shift Range Forecast',
    pain: '“Can I finish my batch on this battery?”',
    feeds: 'The Range/Consumption Model — the core dataset partners pay for.',
  },
  {
    badge: 'known',
    title: 'Smart Charge/Swap Nudge',
    pain: 'Charging downtime costs delivery riders working time.',
    feeds: 'The transaction layer — every booked charge is a commission event.',
  },
  {
    badge: 'known',
    title: 'One-Glance Journey Confidence',
    pain: 'Private riders already check battery before a trip. Existing habit, not a new one.',
    feeds: 'Baseline retention data that de-risks the harder features.',
  },
];

export const deferredFeatures = [
  { title: 'Passive In-Ride Assistant', badge: 'hypothesis' },
  { title: 'End-of-Shift Summary', badge: 'hypothesis' },
  { title: 'Passive Hazard / Road Signal', badge: 'research' },
];

export const roadmapPhases = [
  {
    phase: 'V0',
    title: 'Concierge',
    scope: '0–1 month',
    body: 'Telegram, Google Forms, a hand-updated map. No code until rider behavior proves out.',
    // Draws the low-opacity route linework behind this card only — the corridor
    // where the pilot starts. See PHASE_ART in pitch.js.
    art: true,
  },
  {
    phase: 'V1',
    title: 'Pilot app',
    scope: '100 riders, NR6A',
    body: 'Charger intelligence and road alerts — two features, one pipeline.',
  },
  {
    phase: 'V2',
    title: 'Mobility layer',
    scope: 'city-wide',
    body: 'Heatmaps and predictions: congestion, charging demand, flood risk.',
  },
  {
    phase: 'V3',
    title: 'Institution dashboard',
    scope: 'partners onboard',
    body: 'Government, fleets, banks and insurers subscribe.',
  },
];

export const roadmapStats = [
  { value: '100', label: 'Riders on the National Road 6A corridor' },
  { value: '≥3', label: 'Signals per charger per day — density, not headcount' },
  { value: '60%', label: 'Weekly active riders during the pilot' },
];

/* =====================================================================
 * ⚠️  UNCONFIRMED ASK — VERIFY PER AUDIENCE  ⚠️
 * The sentence below is event-agnostic and safe to show as written, but
 * the three specifics — mentorship scope, the operator introduction, and
 * the revenue-sequencing feedback — may need adjusting for the room it
 * is shown in. Re-check with the team before each pitch.
 * ===================================================================== */
export const ask = {
  text: 'We’re looking for: mentorship on the Trust &amp; Verification model, an introduction to one NR6A charging operator for the pilot, and feedback on the revenue-stream sequencing.',
  isPlaceholder: true,
};

export const lookingFor = [
  'Pilot riders',
  'Charging operators',
  'Delivery platforms',
  'Researchers',
  'Government',
  'Investors',
];
