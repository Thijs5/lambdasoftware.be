// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ── Deployment target ────────────────────────────────────────────────────────
// Dual-deployed by .github/workflows/deploy.yml during the move off KonsoleH:
// SFTP to the KonsoleH webspace, and GitHub Pages (see public/CNAME and
// docs/adr/0004-migrate-hosting-to-github-pages.md). Domain root either way,
// so no `base` needed.
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
