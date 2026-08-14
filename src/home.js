import './style.css';

import {
  contact,
  fieldEvidence,
  heroSignals,
  partnerPromise,
  sdg,
  trustPrinciples,
  trustStates,
  whyNotMaps,
} from './data/content.shared.js';

import {
  benefits,
  ctas,
  faq,
  nav,
  partners,
  pitchLink,
  privacyNote,
  riders,
  whatsNext,
} from './data/content.home.js';

import {
  fill,
  initNav,
  initReveal,
  renderFieldEvidence,
  renderHeroSignals,
  renderSdg,
  renderTrust,
  renderWhyNotMaps,
  syncHeaderHeight,
} from './lib/ui.js';

initNav(nav);
syncHeaderHeight();

/* --------------------------------------------------------------- ctas ---- */

/** Point every [data-cta="rider|partner"] anchor at the right destination. */
document.querySelectorAll('[data-cta]').forEach((el) => {
  const target = ctas[el.dataset.cta];
  if (!target) return;
  el.href = target.href;
  el.textContent = target.label;
});

/* --------------------------------------------------------------- hero ---- */

renderHeroSignals(heroSignals);

/* ----------------------------------------------------------- benefits ---- */

fill(
  'benefits',
  benefits
    .map(
      (item) => `
      <li class="card">
        <h3 class="card__title">${item.title}</h3>
        <p class="card__body">${item.body}</p>
      </li>`
    )
    .join('')
);

/* ------------------------------------------------------------- riders ---- */

fill('riders-who', riders.who);

fill(
  'rider-steps',
  riders.steps
    .map(
      (step) => `
      <li class="card">
        <span class="card__num" aria-hidden="true">${step.n}</span>
        <h3 class="card__title">${step.title}</h3>
        <p class="card__body">${step.body}</p>
      </li>`
    )
    .join('')
);

/* ----------------------------------------------------------- partners ---- */

fill('partners-who', partners.who);
fill('partner-promise', partnerPromise);

/* ------------------------------------------------------- how it works ---- */

renderTrust(trustStates, trustPrinciples);

/* ------------------------------------------------- why not google maps ---- */

renderWhyNotMaps(whyNotMaps);

/* ------------------------------------------------------ why we started ---- */

renderFieldEvidence(fieldEvidence);

/* ---------------------------------------------------------------- faq ---- */

/* Native <details>/<summary>: keyboard-operable and screen-reader-correct
   without any JS, and unaffected by reduced-motion since nothing animates. */
fill(
  'faq',
  faq
    .map(
      (item) => `
      <li>
        <details class="faq__item">
          <summary class="faq__q">
            <span>${item.q}</span>
            <span class="faq__marker" aria-hidden="true"></span>
          </summary>
          <p class="faq__a">${item.a}</p>
        </details>
      </li>`
    )
    .join('')
);

/* -------------------------------------------------------- what's next ---- */

fill('whats-next', whatsNext.lines.map((line) => `<p>${line}</p>`).join(''));

/* ------------------------------------------------------------- footer ---- */

fill('pitch-link-text', pitchLink.text);

const pitchAnchor = document.querySelector('[data-render="pitch-link"]');
if (pitchAnchor) {
  pitchAnchor.href = pitchLink.href;
  pitchAnchor.textContent = pitchLink.label;
}

const contactLink = document.querySelector('[data-render="contact-link"]');
if (contactLink) {
  contactLink.href = `mailto:${contact.email}`;
  contactLink.textContent = contact.email;
}

fill('privacy-note', privacyNote.text);

renderSdg(sdg);

initReveal();
