import { defineConfig } from 'astro/config';

// Static build for Cloudflare Pages. Set SITE_URL once the domain exists
// (e.g. https://movia.app); until then the pages.dev address is used.
export default defineConfig({
  site: process.env.SITE_URL || 'https://movia.pages.dev',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
