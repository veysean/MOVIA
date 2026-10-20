import en from './en';
import km from './km';

export const LANGS = ['en', 'km'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';
export const dicts = { en, km } as const;

export const getDict = (lang: Lang) => dicts[lang];
export const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);

/** Build a localized path: p('km', '/about/') → '/km/about/' */
export const p = (lang: Lang, path = '/') => `/${lang}${path.startsWith('/') ? path : `/${path}`}`;

/** Same page in the other language, given the current pathname. Paths without a language
 *  prefix (the 404 page) go to that language's home page. */
export const swapLang = (pathname: string, to: Lang) =>
  /^\/(en|km)(?=\/|$)/.test(pathname) ? pathname.replace(/^\/(en|km)(?=\/|$)/, `/${to}`) : `/${to}/`;

/** Pick a bilingual field: { en: '…', km: '…' } */
export const L = <T,>(lang: Lang, v: { en: T; km: T }) => v[lang] ?? v.en;

export const staticLangPaths = () => LANGS.map((lang) => ({ params: { lang } }));
