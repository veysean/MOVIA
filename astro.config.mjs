import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static build for Cloudflare Pages. Set SITE_URL once the domain exists
// (e.g. https://movia.app); until then the pages.dev address is used.
const site = process.env.SITE_URL || 'https://movia.pages.dev';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      // the root language redirect, the thanks page and the 404 are not content pages
      filter: (page) => /\/(en|km)\//.test(page) && !page.includes('/join/thanks/'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', km: 'km' } },
    }),
  ],
});
