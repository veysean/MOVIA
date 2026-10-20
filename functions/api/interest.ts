/**
 * POST /api/interest — Join Us form handler (Cloudflare Pages Function).
 * Validates → verifies Turnstile → stores in D1. No IP address is stored.
 * - JS clients send `Accept: application/json` and get JSON back.
 * - No-JS form posts get a 303 redirect to the thanks page (or back to the form).
 */
interface Env {
  DB: D1Database;
  TURNSTILE_SECRET?: string;
}

const CONSENT_VERSION = '2026-10-v1';
const TEST_SECRET = '1x0000000000000000000000000000000AA';
const ROLES = ['driver', 'cpo', 'partner'] as const;
type Role = (typeof ROLES)[number];
const CONTACT = ['telegram', 'phone', 'email'];
const PROFILES = ['personal', 'ridehail', 'delivery', 'fleet', 'other'];
const AREAS = ['pp', 'sr', 'sh', 'bb', 'kd', 'other'];
const CHALLENGES = ['find', 'working', 'range', 'wait', 'price', 'other'];
const INTERESTS = ['pilot', 'research', 'api', 'data', 'mentorship', 'institutional'];

const s = (fd: FormData, k: string, max = 300) => String(fd.get(k) ?? '').trim().slice(0, max);
const pick = (fd: FormData, k: string, allowed: string[]) => fd.getAll(k).map(String).filter((v) => allowed.includes(v));
const oneOf = (v: string, allowed: string[]) => (allowed.includes(v) ? v : '');

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return reply(wantsJson, 400, { ok: false, error: 'bad_request' }, '/en/join/?error=1#form-error');
  }

  const lang = s(fd, 'lang') === 'km' ? 'km' : 'en';
  const back = `/${lang}/join/?error=1#form-error`; // #form-error shows the alert without JS
  const role = s(fd, 'role') as Role;
  const fields: Record<string, string> = {};

  // honeypot-free: Turnstile handles bots. Validate the rest.
  if (!ROLES.includes(role)) fields.role = 'required';
  const name = s(fd, 'name', 120);
  const contact_method = oneOf(s(fd, 'contact_method'), CONTACT);
  const contact_value = s(fd, 'contact_value', 160);
  if (!name) fields.name = 'required';
  if (!contact_method) fields.contact_method = 'required';
  if (!contact_value) fields.contact_value = 'required';
  if (s(fd, 'consent') !== 'yes') fields.consent = 'consent';

  let organization: string | null = null;
  let details: Record<string, unknown> = {};
  if (role === 'driver') {
    details = {
      vehicle: s(fd, 'vehicle', 120),
      driving_profile: oneOf(s(fd, 'driving_profile'), PROFILES),
      area: oneOf(s(fd, 'area'), AREAS),
      challenges: pick(fd, 'challenges', CHALLENGES),
      note: s(fd, 'driver_note', 1000),
    };
    if (!details.driving_profile) fields.driving_profile = 'required';
    if (!details.area) fields.area = 'required';
  } else if (role === 'cpo') {
    organization = s(fd, 'cpo_org', 160);
    details = { role: s(fd, 'cpo_role', 120), network: s(fd, 'cpo_network', 300), challenge: s(fd, 'cpo_challenge', 1000) };
    if (!organization) fields.cpo_org = 'required';
    if (!details.role) fields.cpo_role = 'required';
    if (!details.challenge) fields.cpo_challenge = 'required';
  } else if (role === 'partner') {
    organization = s(fd, 'partner_org', 160);
    details = { expertise: s(fd, 'partner_expertise', 160), interests: pick(fd, 'interests', INTERESTS), message: s(fd, 'partner_message', 1500) };
    if (!organization) fields.partner_org = 'required';
    if (!details.expertise) fields.partner_expertise = 'required';
  }

  if (Object.keys(fields).length) return reply(wantsJson, 422, { ok: false, error: 'validation', fields }, back);

  // Turnstile verification
  if (!env.TURNSTILE_SECRET) return reply(wantsJson, 500, { ok: false, error: 'not_configured' }, back);
  const token = s(fd, 'cf-turnstile-response', 4096);
  // Cloudflare's official test secret always passes, so skip the network call for it (local dev).
  const verify = env.TURNSTILE_SECRET === TEST_SECRET
    ? { success: !!token }
    : await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token }),
        signal: AbortSignal.timeout(8000),
      })
        .then((r) => r.json<{ success: boolean }>())
        .catch(() => ({ success: false }));
  if (!verify.success) return reply(wantsJson, 422, { ok: false, error: 'captcha', fields: { captcha: 'captcha' } }, back);

  try {
    await env.DB.prepare(
      `INSERT INTO interest (id, created_at, role, name, organization, contact_method, contact_value, details, consent, consent_text_version, lang)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, 1, ?9, ?10)`
    )
      .bind(crypto.randomUUID(), new Date().toISOString(), role, name, organization, contact_method, contact_value, JSON.stringify(details), CONSENT_VERSION, lang)
      .run();
  } catch (e) {
    console.error('D1 insert failed', e);
    return reply(wantsJson, 500, { ok: false, error: 'storage' }, back);
  }

  return reply(wantsJson, 200, { ok: true }, `/${lang}/join/thanks/?role=${role}`);
};

export const onRequest: PagesFunction<Env> = async () => new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });

function reply(json: boolean, status: number, body: Record<string, unknown>, location: string) {
  if (json) return Response.json(body, { status });
  return new Response(null, { status: 303, headers: { Location: location } });
}
