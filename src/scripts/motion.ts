/* Site motion: scroll reveal, spectrum-rule draw, stat count-up, solid header on scroll, hero parallax.
   Vanilla, transform/opacity only. Base.astro adds html.js-motion before first paint only when
   the visitor allows motion; without it (reduced motion, no JS, or this file failing) nothing is
   hidden and nothing moves. The header state is the one exception: it is not motion, so it always runs. */
const root = document.documentElement;
const motion = root.classList.contains('js-motion');
(window as any).__motion = true; // tells the inline fail-safe in Base.astro that we started

/* ---- header: solid + soft lift after 8px of scroll ---- */
const header = document.querySelector<HTMLElement>('.header');
const parallax = document.querySelector<HTMLElement>('[data-parallax]');
const wide = matchMedia('(min-width: 960px) and (hover: hover)');
// parallax cap from tokens.css; with the ±6px float the image never travels more than 20px
const PARALLAX_MAX = parseFloat(getComputedStyle(root).getPropertyValue('--parallax-max')) || 14;
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 8);
    // hero image: soft parallax, desktop only
    if (motion && parallax) parallax.style.setProperty('--parallax', wide.matches ? `${Math.min(PARALLAX_MAX, y * 0.06).toFixed(1)}px` : '0px');
    ticking = false;
  });
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (motion) {
  /* ---- reveal: fade up once; sibling cards / road milestones stagger by 60ms ---- */
  const REVEAL = '.section__head, .card, .group, .stats, .gallery, .milestone, .band .wrap, .thanks__in, .prose, .pillars__note, .insight__note';
  const targets = [...document.querySelectorAll<HTMLElement>(REVEAL)];
  const STAGGER = ['card', 'milestone'];
  for (const el of targets) {
    const kind = STAGGER.find((c) => el.classList.contains(c));
    if (!kind) continue;
    const sibs = [...(el.parentElement?.children ?? [])].filter((c) => c.classList.contains(kind));
    if (sibs.length > 1) el.style.setProperty('--i', String(Math.min(sibs.indexOf(el), 6)));
  }
  const reveal = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      el.classList.add('is-in');
      reveal.unobserve(el);
      // hand cards back to their quick hover transition once the fade-up is done
      if (el.classList.contains('card')) el.addEventListener('transitionend', () => { el.classList.add('is-done'); el.style.removeProperty('--i'); }, { once: true });
      if (el.matches('.stats')) countUp(el);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  targets.forEach((el) => reveal.observe(el));

  /* ---- spectrum rule under titles draws in when the title appears ---- */
  const draw = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-drawn'); draw.unobserve(e.target); }
  }, { threshold: 0.6 });
  document.querySelectorAll('.section__title, .title-rule').forEach((el) => draw.observe(el));

  /* ---- stats: count the visual copy up from 0 (the real value stays in the HTML for screen readers) ---- */
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => { el.textContent = format(el, 0); });
}

function format(el: HTMLElement, n: number) {
  const target = Number(el.dataset.count);
  const sep = el.dataset.sep === '1';
  const v = Math.round(n * target);
  return `${el.dataset.prefix ?? ''}${sep ? v.toLocaleString('en-US') : v}${el.dataset.suffix ?? ''}`;
}
function countUp(scope: HTMLElement) {
  const els = [...scope.querySelectorAll<HTMLElement>('[data-count]')];
  const t0 = performance.now(), DUR = 1200;
  const frame = (now: number) => {
    const p = Math.min(1, (now - t0) / DUR);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
    els.forEach((el) => { el.textContent = format(el, eased); });
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
