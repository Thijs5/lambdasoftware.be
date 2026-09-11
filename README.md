# lambda_software landing page

![Deploy](https://github.com/Thijs5/lambdasoftware.be/actions/workflows/deploy.yml/badge.svg)
![Astro](https://img.shields.io/badge/astro-7-BC52EE?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-5-3178C6?logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/node-20-339933?logo=nodedotjs&logoColor=white)
![Tested with Playwright](https://img.shields.io/badge/tested%20with-playwright-2EAD33?logo=playwright&logoColor=white)
![Zero client JS](https://img.shields.io/badge/client--side%20JS-0KB-blue)

Single-page site for **Thijs Dickmans** / lambda_software. Built with Astro, static
output, zero client-side JavaScript, and the CSS inlined into the HTML so the page
loads as one document with one request.

## Develop

```bash
nvm use          # Node 20
npm install
npm run dev       # http://localhost:4321
```

| Command                  | Does                                          |
| ------------------------ | ---------------------------------------------- |
| `npm run dev`             | Dev server with HMR                           |
| `npm run build`           | Static build into `dist/`                    |
| `npm run preview`         | Serve the built `dist/` locally               |
| `npm run check`           | Type-check `.astro` / `.ts`                    |
| `npm run test:e2e`        | Run the Playwright regression suite            |
| `npm run test:e2e:update` | Regenerate the Playwright screenshot baselines |

## Edit the content

Everything visible is in `src/data/site.ts`: copy, email, offerings, the "available
for work" toggle. Lines marked `// EDIT` are placeholders.

Structure and styling:

- `src/styles/global.css` design tokens (from `docs/brand-sheet.png`) and base styles
- `src/pages/index.astro` the page sections and their scoped CSS
- `src/pages/llms.txt.ts` machine-readable summary for AI crawlers
- `src/components/Logo.astro` the mark (inline SVG) and wordmark
- `src/layouts/Base.astro` `<head>`, meta, Open Graph, structured data

Design decisions and the brand-sheet rating live in `DESIGN.md`.

## Tests

`e2e/` holds a Playwright suite that checks the homepage renders correctly (visual
regression against committed screenshots) and that the SEO endpoints (sitemap,
robots.txt, llms.txt) respond as expected. It runs on every push as a required step
before deploy, so a broken build or a visual regression blocks the release. See the
pinned Playwright version note in `.github/workflows/deploy.yml` before bumping
`@playwright/test`.

## Deploy (KonsoleH, lambdasoftware.be)

Every push to `main` runs `.github/workflows/deploy.yml`: it runs the e2e suite,
type-checks and builds the site with Astro, then pushes the contents of `dist/` to
the KonsoleH webspace over SFTP. Plain static files, no runtime needed on the server.

One-time setup, repo **Settings → Secrets and variables → Actions**:

**Secrets** tab:

| Secret          | Value              |
| --------------- | ------------------ |
| `SFTP_USERNAME` | FTP/SFTP username  |
| `SFTP_PASSWORD` | FTP/SFTP password  |

**Variables** tab:

| Variable           | Value                                                     |
| ------------------ | ---------------------------------------------------------- |
| `SFTP_HOST`        | host from the KonsoleH FTP/SFTP panel                      |
| `SFTP_PORT`        | usually `22`                                               |
| `SFTP_REMOTE_PATH` | webspace folder that serves the domain (e.g. `/httpdocs`)  |

Trigger a deploy manually from the Actions tab (`workflow_dispatch`) if needed.

## Social share image

Optional: drop a 1200x630 PNG at `public/og.png` (already referenced in
`src/data/site.ts`).
