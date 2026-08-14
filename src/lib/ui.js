/**
 * Shared page runtime for both index.html and pitch.html.
 *
 * Holds the render helpers, the nav behaviour, the header-height sync, and the
 * scroll-reveal observer. Page-specific rendering lives in home.js / pitch.js.
 */

import { badges } from '../data/content.shared.js';

export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const slot = (name) => document.querySelector(`[data-render="${name}"]`);

/** Fill a render slot with generated markup. No-ops if the slot is absent. */
export function fill(name, html) {
  const el = slot(name);
  if (el) el.innerHTML = html;
  return el;
}

/** Mono status pill. `key` indexes the shared badge map. */
export function badge(key) {
  const { label, tone } = badges[key];
  return `<span class="badge badge--${tone}">${label}</span>`;
}

/** Chip readouts for the hero signal panel — identical on both pages. */
export function renderHeroSignals(signals) {
  fill(
    'hero-signals',
    signals
      .map(
        (signal) => `
      <li class="chip">
        <span class="chip__site">${signal.site}</span>
        ${badge(signal.state)}
        <span class="chip__meta">${signal.meta}</span>
      </li>`
      )
      .join('')
  );
}

/** Confidence-state table + numbered principles. Shared by #trust and #how. */
export function renderTrust(states, principles) {
  fill(
    'trust-states',
    states
      .map(
        (row) => `
      <tr>
        <th scope="row">${badge(row.state)}</th>
        <td>${row.meaning}</td>
      </tr>`
      )
      .join('')
  );

  fill(
    'trust-principles',
    principles
      .map(
        (item) => `
      <li class="principle">
        <span class="principle__num" aria-hidden="true">${item.n}</span>
        <p class="principle__body">
          <strong class="principle__title">${item.title}</strong> ${item.body}
        </p>
      </li>`
      )
      .join('')
  );
}

/** Full-bleed "why not Google Maps" banner. */
export function renderWhyNotMaps(copy) {
  fill('maps-label', copy.label);
  fill('maps-lead', copy.lead);
  fill('maps-turn', copy.turn);
}

/** The rider-interview quote panel. */
export function renderFieldEvidence(evidence) {
  fill('evidence-quote', `<p>${evidence.quote}</p>`);
  fill('evidence-source', evidence.source);
}

/** Six SDG pills plus the policy line. */
export function renderSdg(data) {
  fill('sdg-policy', data.policy);
  fill(
    'sdg-goals',
    data.goals
      .map(
        (goal) => `
      <li class="sdg__item">
        <span class="sdg__code">${goal.code}</span>
        <span class="sdg__label">${goal.label}</span>
      </li>`
      )
      .join('')
  );
}

/* ---------------------------------------------------------------- nav ---- */

export function initNav(nav) {
  const navLinkItems = nav.links
    .map((link) => `<li><a class="site-nav__link" href="${link.href}">${link.label}</a></li>`)
    .join('');

  // The header CTA stays visible at every width (§3.6), so the mobile panel
  // carries the section links only.
  fill('nav-links', navLinkItems);
  fill('mobile-nav-links', navLinkItems);

  const cta = slot('nav-cta');
  if (cta) {
    cta.href = nav.cta.href;
    cta.textContent = nav.cta.label;
  }

  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!navToggle || !mobileNav) return;

  function setMobileNav(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileNav.hidden = !open;
    document.body.classList.toggle('nav-open', open);
  }

  navToggle.addEventListener('click', () => {
    setMobileNav(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  // Anchor links inside the panel should close it on the way to the section.
  mobileNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMobileNav(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      setMobileNav(false);
      navToggle.focus();
    }
  });

  // The toggle only exists below the nav breakpoint; if the viewport grows past
  // it while the panel is open, drop back to the desktop bar cleanly.
  window.matchMedia('(min-width: 861px)').addEventListener('change', (event) => {
    if (event.matches) setMobileNav(false);
  });
}

/* ------------------------------------------------------- header height ---- */

/**
 * Keeps --header-h equal to the real height of the fixed header content, so
 * body offset and scroll-padding stay correct when pitch.html adds its context
 * bar or that bar wraps to two lines on a narrow screen.
 *
 * Deliberately measures the bar + inner row rather than the <header> itself —
 * the mobile nav panel lives inside the header and would otherwise inflate it
 * every time the menu opens.
 */
export function syncHeaderHeight() {
  const parts = [
    document.querySelector('.pitch-bar'),
    document.querySelector('.site-header__inner'),
  ].filter(Boolean);

  if (!parts.length) return;

  const apply = () => {
    const total = parts.reduce((sum, el) => sum + el.getBoundingClientRect().height, 0);
    document.documentElement.style.setProperty('--header-h', `${Math.round(total)}px`);
  };

  apply();

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(apply);
    parts.forEach((el) => observer.observe(el));
  } else {
    window.addEventListener('resize', apply);
  }
}

/* ------------------------------------------------------ scroll reveal ---- */

export function initReveal() {
  const revealables = document.querySelectorAll('.reveal');

  // The hidden-until-revealed state is opt-in via this class, so the page stays
  // fully readable if the module never runs.
  document.documentElement.classList.add('js-reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealables.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // fires once
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
  );

  revealables.forEach((el) => observer.observe(el));
}
