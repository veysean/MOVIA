import './style.css';

import {
  contact,
  fieldEvidence,
  heroSignals,
  sdg,
  team,
  trustPrinciples,
  trustStates,
  whyNotMaps,
} from './data/content.shared.js';

import {
  ask,
  deferredFeatures,
  features,
  lookingFor,
  nav,
  preview,
  previewChargers,
  problems,
  productLayers,
  roadmapPhases,
  roadmapStats,
} from './data/content.pitch.js';

import {
  badge,
  fill,
  initNav,
  initReveal,
  renderFieldEvidence,
  renderHeroSignals,
  renderSdg,
  renderTrust,
  renderWhyNotMaps,
  slot,
  syncHeaderHeight,
} from './lib/ui.js';

initNav(nav);
syncHeaderHeight();

/* --------------------------------------------------------------- hero ---- */

renderHeroSignals(heroSignals);

/* ------------------------------------------------------------ problem ---- */

fill(
  'problem-cards',
  problems
    .map(
      (item) => `
      <li class="card">
        <span class="card__num" aria-hidden="true">${item.n}</span>
        <h3 class="card__title">${item.title}</h3>
        <p class="card__body">${item.body}</p>
      </li>`
    )
    .join('')
);

/* ---------------------------------------------------- field evidence ---- */

renderFieldEvidence(fieldEvidence);

/* ------------------------------------------------------------ product ---- */

fill(
  'layer-stack',
  productLayers
    .map(
      (layer) => `
      <div class="layer layer--${layer.id}">
        <h3 class="layer__title">
          ${layer.title} <span class="layer__qualifier">— ${layer.qualifier}</span>
        </h3>
        <p class="layer__summary">${layer.summary}</p>
        <p class="mono-label layer__label">${layer.listLabel}</p>
        ${layer.pipeline ? `<p class="layer__pipeline">${layer.pipeline}</p>` : ''}
        <ul class="layer__items">
          ${layer.items.map((item) => `<li>${item}</li>`).join('')}
        </ul>
        ${layer.note ? `<p class="layer__note">${layer.note}</p>` : ''}
      </div>
      ${
        layer.arrow
          ? `<p class="layer-arrow"><span class="layer-arrow__glyph" aria-hidden="true">↓</span>
               <span class="mono-label">${layer.arrow}</span></p>`
          : ''
      }`
    )
    .join('')
);

/* ---------------------------------------------------- product preview ---- */

fill('preview-title', preview.screenTitle);
fill('preview-caption', preview.caption);

fill(
  'preview-chargers',
  previewChargers
    .map(
      (charger) => `
      <li class="mock-card">
        <div class="mock-card__top">
          <span class="mock-card__name">${charger.name}</span>
          ${badge(charger.state)}
        </div>
        <p class="mock-card__meta">${charger.distance} · ${charger.age}</p>
      </li>`
    )
    .join('')
);

/* ----------------------------------------------------------- features ---- */

fill(
  'feature-cards',
  features
    .map(
      (feature) => `
      <li class="card feature">
        ${badge(feature.badge)}
        <h3 class="card__title feature__title">${feature.title}</h3>
        <dl class="feature__meta">
          <dt class="mono-label">Pain point</dt>
          <dd>${feature.pain}</dd>
          <dt class="mono-label">Feeds</dt>
          <dd>${feature.feeds}</dd>
        </dl>
      </li>`
    )
    .join('')
);

fill(
  'deferred-list',
  deferredFeatures
    .map(
      (item) => `
      <li class="deferred__item">
        <span class="deferred__title">${item.title}</span>
        ${badge(item.badge)}
      </li>`
    )
    .join('')
);

/* -------------------------------------------------------------- trust ---- */

renderTrust(trustStates, trustPrinciples);

/* ------------------------------------------------- why not google maps ---- */

renderWhyNotMaps(whyNotMaps);

/* ------------------------------------------------------------ roadmap ---- */

/* Background linework for the V0 card only (content.pitch.js sets `art: true`).
   Same route motif as the hero, at ~18% opacity so the text stays dominant. */
const PHASE_ART = `
  <svg class="ill phase__art" viewBox="0 0 260 180" role="presentation" aria-hidden="true"
       focusable="false" preserveAspectRatio="xMidYMax meet">
    <path class="ill__dash" d="M 12 148 L 74 148 Q 106 148 122 118 L 150 66 Q 162 44 196 44 L 250 44" />
    <circle class="ill__dot-gold" cx="74" cy="148" r="5" />
    <circle class="ill__dot-gold" cx="196" cy="44" r="5" />
  </svg>`;

fill(
  'roadmap-track',
  roadmapPhases
    .map(
      (phase) => `
      <li class="phase">
        ${phase.art ? PHASE_ART : ''}
        <span class="mono-label phase__marker">${phase.phase}</span>
        <h3 class="phase__title">${phase.title}</h3>
        <p class="mono-label phase__scope">${phase.scope}</p>
        <p class="phase__body">${phase.body}</p>
      </li>`
    )
    .join('')
);

fill(
  'roadmap-stats',
  roadmapStats
    .map(
      (stat) => `
      <li class="stat">
        <span class="stat__value">${stat.value}</span>
        <span class="stat__label">${stat.label}</span>
      </li>`
    )
    .join('')
);

/* ---------------------------------------------------- sdg alignment ---- */

renderSdg(sdg);

/* --------------------------------------------------------------- team ---- */

fill(
  'team-grid',
  team
    .map(
      (member) => `
      <li class="member">
        <h3 class="member__name">${member.name}</h3>
        <p class="member__role">${member.role}</p>
      </li>`
    )
    .join('')
);

/* ------------------------------------------------------------- footer ---- */

const contactLink = slot('contact-link');
if (contactLink) contactLink.href = `mailto:${contact.email}`;

fill('ask', ask.text);

fill(
  'looking-for',
  lookingFor.map((tag) => `<li class="tag">${tag}</li>`).join('')
);

initReveal();
