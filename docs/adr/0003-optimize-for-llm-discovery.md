# 3. Optimize for LLM-mediated discovery, not just search engines

## Status

Accepted

## Context

This site markets a one-person freelance dev practice. People looking for a
.NET/TypeScript/SQL Server developer near Tienen/Leuven increasingly ask an
LLM instead of, or before, running a web search. If an assistant can't
cleanly read who Thijs is, what he does, and where, it can't surface him for
that query, no matter how well the page reads to a human or ranks on Google.
Classic SEO (meta tags, sitemap, semantic HTML) doesn't fully cover this:
LLMs work better from a plain-text summary and structured, machine-readable
facts than from parsing marketing copy out of rendered HTML.

## Decision

Treat "legible to an LLM" as a first-class discovery channel alongside
search engine SEO:

- Serve `/llms.txt` (`src/pages/llms.txt.ts`, following the
  [llms.txt](https://llmstxt.org/) convention): a plain-text summary of who
  Thijs is, the services offered, the stack, and contact details.
- Emit JSON-LD structured data in `Base.astro` (`schema.org/ProfessionalService`,
  with Thijs as `founder`, `areaServed`, and `makesOffer` per service) so both
  search engines and LLM crawlers get facts, not just prose.
- Generate both from `src/data/site.ts`, the same source as the visible page
  copy, so they can't drift from what's actually on the page or from each
  other.
- Cover both with `e2e/seo-endpoints.spec.ts` so a build regression that
  breaks them doesn't ship silently (see ADR 2).

## Consequences

- Any new service, location, or contact detail added to `site.ts` shows up
  in `llms.txt` and the structured data automatically; no separate file to
  remember to update.
- The structured data's `addressRegion` ("Leuven/Tienen") and `areaServed`
  ("Belgium") are the actual claims being made about where Thijs works; keep
  them true rather than aspirational.
- This is a bet on a discovery channel that's still new and standard-less
  beyond `llms.txt` itself; the convention or its usefulness may change, at
  which point this decision should be revisited rather than left as dead
  weight.
