// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ── Deployment target ────────────────────────────────────────────────────────
// KonsoleH-managed webspace at the domain root, served over SFTP by
// .github/workflows/deploy.yml. No `base` needed since the site is not under
// a subpath.
// ────────────────────────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://lambdasoftware.be',

  // One page, tiny CSS: inline it so there is zero render-blocking request.
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  integrations: [sitemap()],
});
