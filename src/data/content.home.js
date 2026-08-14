/**
 * Copy used only by index.html — the general homepage.
 *
 * Benefit-first, written for a rider or partner arriving cold. Anything that
 * also appears on the pitch page (trust states, principles, the Google Maps
 * quote, the rider interview, SDG list) lives in content.shared.js and is
 * imported from there — do not re-declare it here.
 */

import { joinPilotHref, partnerInquiryHref, whyNotMaps } from './content.shared.js';

export const nav = {
  links: [
    { label: 'How it works', href: '#how' },
    { label: 'For riders', href: '#riders' },
    { label: 'For partners', href: '#partners' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: { label: 'Join the pilot', href: joinPilotHref },
};

/* Both CTAs appear in the hero, the rider/partner sections, and the footer. */
export const ctas = {
  rider: { label: 'Join the pilot', href: joinPilotHref },
  partner: { label: 'I run a charging network', href: partnerInquiryHref },
};

export const benefits = [
  {
    title: 'Never guess again',
    body: 'Confidence and age on every charger, not just a pin on a map.',
  },
  {
    title: 'Always free',
    body: 'Riders never pay. Ever.',
  },
  {
    title: 'Built with riders',
    body: 'Every trip you take quietly makes the network smarter for the next rider.',
  },
];

export const riders = {
  who: 'Delivery riders and private EV owners on the NR6A corridor today.',
  steps: [
    { n: '01', title: 'Check status', body: 'See which chargers are live before you set off.' },
    { n: '02', title: 'Ride with confidence', body: 'Go straight there instead of guessing.' },
    { n: '03', title: 'Confirm or report', body: 'One tap tells the next rider what you found.' },
  ],
};

export const partners = {
  who: 'Charging and swap operators, fleets, delivery platforms, and government.',
};

export const faq = [
  {
    q: 'Is MOVIA free?',
    a: 'Yes — always, for riders. Partners fund the platform.',
  },
  {
    q: 'Which vehicles does it support?',
    a: 'Electric motorcycles first.',
  },
  {
    q: 'Where does it work today?',
    a: 'We’re piloting on the National Road 6A corridor, Phnom Penh.',
  },
  {
    q: 'What happens to my data?',
    a: 'Raw location never leaves your device as identifiable data. Only aggregated, anonymized patterns reach partners.',
  },
  {
    q: 'How is this different from Google Maps?',
    // Composed from the shared quote so the two pages can never disagree.
    a: `${whyNotMaps.lead} ${whyNotMaps.turn}`,
  },
];

export const whatsNext = {
  lines: ['Concierge pilot live on NR6A today.', 'Mobile app next.'],
};

/* =====================================================================
 * ⚠️  PLACEHOLDER PRIVACY NOTE — NOT A PRIVACY POLICY  ⚠️
 * This is a plain-language stopgap, not a legal document, and it has had
 * no legal review. Replace it with a real policy (and a link to it)
 * before any public launch or data collection begins.
 * ===================================================================== */
export const privacyNote = {
  text: 'MOVIA collects only what improves your decisions. Raw location data is never sold or shared — only aggregated, anonymized patterns leave our systems. Full privacy policy coming soon.',
  isPlaceholder: true,
};

export const pitchLink = {
  text: 'Curious about the product architecture, business model, and roadmap in full?',
  label: 'Read our pitch →',
  href: './pitch.html',
};
