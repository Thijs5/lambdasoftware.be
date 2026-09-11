# lambda_software — landing page

Single-page site for **Thijs Dickmans** / lambda_software. Astro, static output,
**zero client-side JavaScript**, CSS inlined into the HTML — the page loads as one
document with one request.

## Develop

```bash
nvm use          # Node 20
npm install
npm run dev       # http://localhost:4321
```

| Command           | Does                                             |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Dev server with HMR                             |
| `npm run build`   | Static build into `dist/`                       |
| `npm run preview` | Serve the built `dist/` locally                 |
| `npm run check`   | Type-check `.astro` / `.ts`                      |

## Edit the content

Everything visible is in **`src/data/site.ts`** — copy, email, offerings, the
"available for work" toggle. Lines marked `// EDIT` are placeholders.

Structure / styling:

- `src/styles/global.css` — design tokens (from `docs/brand-sheet.png`) + base
- `src/pages/index.astro` — the page sections and their scoped CSS
- `src/components/Logo.astro` — the mark (inline SVG) + wordmark
- `src/layouts/Base.astro` — `<head>`, meta, Open Graph

Design decisions and the brand-sheet rating: **`DESIGN.md`**.

## Deploy (KonsoleH, lambdasoftware.be)

Every push to `main` runs `.github/workflows/deploy.yml`: builds the site with
Astro, then pushes the contents of `dist/` to the KonsoleH webspace over SFTP.
Plain static files, no runtime needed on the server.

One-time setup — repo **Settings → Secrets and variables → Actions**:

**Secrets** tab:

| Secret          | Value              |
| --------------- | ------------------ |
| `SFTP_USERNAME` | FTP/SFTP username  |
| `SFTP_PASSWORD` | FTP/SFTP password  |

**Variables** tab:

| Variable           | Value                                                      |
| ------------------ | ----------------------------------------------------------- |
| `SFTP_HOST`        | host from the KonsoleH FTP/SFTP panel                        |
| `SFTP_PORT`        | usually `22`                                                 |
| `SFTP_REMOTE_PATH` | webspace folder that serves the domain (e.g. `/httpdocs`)    |

Trigger a deploy manually from the Actions tab (`workflow_dispatch`) if needed.

## Social share image

Optional: drop a 1200×630 PNG at `public/og.png` (referenced already in
`src/data/site.ts`).
