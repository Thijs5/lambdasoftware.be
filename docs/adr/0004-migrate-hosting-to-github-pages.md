# 4. Migrate hosting to GitHub Pages

## Status

Accepted

## Context

`lambdasoftware.be` is hosted on Hetzner Webhosting (konsoleH, package
"Webhosting S"), deployed over SFTP by `.github/workflows/deploy.yml`. The
domain has no working HTTPS: konsoleH has no SSL certificate installed for
it, so every HTTPS request (confirmed via `openssl s_client` and `curl`)
gets Hetzner's own placeholder page — a cert for `*.your-server.de`, not the
domain — instead of the real site. Plain HTTP serves the actual build fine,
so the deploy itself works; only TLS is broken.

Fixing this on konsoleH directly stalled: the Administration → SSL →
SSL Certificates flow only offers paid third-party certificates (from
€39, via Thawte/Symantec), with a footnote implying free certificates exist
somewhere in Hetzner's system but "cannot be downloaded" — no free
Let's Encrypt option was found for this domain/tier after checking Product
overview, Administration, and the SSL ordering flow.

The site is a fully static Astro build (`output: "static"`) with no secrets
committed to the repo (audited before this change — the only
credential-shaped references are `secrets.SFTP_USERNAME` /
`secrets.SFTP_PASSWORD`, GitHub Actions secret *references*, not values).
That makes it a good fit for a static host with automatic HTTPS built in,
and safe to make public.

## Decision

Deploy to GitHub Pages instead of (eventually, not yet instead of)
konsoleH. The repo is made public so GitHub Pages' free tier applies; the
Astro build is published via `actions/upload-pages-artifact` +
`actions/deploy-pages` alongside the existing SFTP step, deliberately
dual-deploying during the cutover so there's no window where DNS points at
a target that isn't receiving builds.

Once `lambdasoftware.be`'s DNS is repointed at GitHub Pages and "Enforce
HTTPS" is confirmed working there, the SFTP step and the `SFTP_*`
secrets/variables are to be removed — konsoleH stops being a deploy target
entirely. Email (`hello@lambdasoftware.be`) is unaffected either way: its
MX records stay on Hetzner regardless of where the website's A/CNAME
records point.

## Consequences

- The repo is now public. Already audited for secrets; keep that in mind
  for anything added later — nothing credential-shaped should ever be
  committed, since there's no more "private repo" backstop.
- HTTPS and certificate renewal become GitHub's problem, not something
  manually maintained in konsoleH.
- Two deploy targets exist temporarily (`build-and-deploy` for SFTP,
  `deploy-pages` for Pages) — remove the SFTP step and its secrets/variables
  once DNS has cut over, per the TODO comment at the top of
  `.github/workflows/deploy.yml`. Leaving both indefinitely means paying for
  konsoleH hosting the site no longer needs.
