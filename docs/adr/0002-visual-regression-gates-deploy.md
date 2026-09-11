# 2. Playwright visual regression gates every deploy

## Status

Accepted

## Context

This is a one-page marketing site with no application logic to unit test.
The main risk of a change is a visual one: a CSS edit, a token change, a font
swap, or an Astro/dependency upgrade quietly breaking the layout on a real
browser, at a real breakpoint, in a way that is easy to miss in a local
review but obvious to a visitor.

The site also serves a few static outputs that aren't part of the page
render at all (`sitemap-index.xml`, `robots.txt`, `llms.txt`), so a build or
config regression there wouldn't move a single pixel and would go unnoticed
by a screenshot check alone.

`e2e/homepage.spec.ts` covers the rendered page against committed baseline
screenshots (`e2e/homepage.spec.ts-snapshots/`); `e2e/seo-endpoints.spec.ts`
covers the static outputs with plain HTTP checks. Both run against the built
`dist/` output served by `sirv`, not the dev server, so what's tested is what
actually ships.

## Decision

The `e2e` job in `.github/workflows/deploy.yml` runs before
`build-and-deploy` and `build-and-deploy` depends on it (`needs: e2e`). A
failing Playwright run, visual diff or SEO-endpoint check, blocks the deploy
outright rather than just posting a warning.

The `@playwright/test` version in `package.json` and the Playwright Docker
image tag used to run the suite in CI (`mcr.microsoft.com/playwright:vX.Y.Z`)
must be bumped together, since the committed screenshot baselines are
pixel-matched against that exact browser build.

## Consequences

- A visual regression or a broken SEO endpoint cannot reach production; the
  push to `main` succeeds but the site is not updated until it's fixed.
- Any intentional visual change must update the baseline screenshots in the
  same commit (`npm run test:e2e:update`), or CI fails.
- Bumping Playwright is a two-file change (`package.json` +
  `deploy.yml`'s container tag), not just a dependency bump; forgetting the
  second half re-introduces baseline mismatches that have nothing to do with
  the actual change being made.
