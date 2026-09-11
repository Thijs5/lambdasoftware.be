# 1. Update documentation with every change

## Status

Accepted

## Context

This repo has few contributors and a small set of docs (`README.md`,
`DESIGN.md`, workflow comments). Docs have already drifted from the code at
least once: a Playwright e2e suite and an `llms.txt` endpoint were added
without the `README.md` being updated to mention them. Once docs and code
disagree, the docs stop being trusted and get ignored, which makes the drift
worse over time.

## Decision

Any change to behaviour, structure, commands, or deploy setup must update the
relevant documentation in the same change: `README.md`, `DESIGN.md`, inline
comments that describe the change, and any other doc a reader would
reasonably check. A change is not done until its docs match it.

Concretely:

- New or changed npm script, page, or route: update the `README.md` command
  table / file map.
- New or changed design token, layout decision, or brand rule: update
  `DESIGN.md`.
- New or changed CI/CD step or required secret/variable: update the `README.md`
  deploy section and the workflow file's own comments.
- A decision worth recording for its own sake (like this one): a new ADR here
  in `docs/adr/`.

## Consequences

- Slightly more effort per change, since a code change is not "done" until
  its docs are updated too.
- Docs stay a reliable first source instead of something to double-check
  against the code.
- Reviewing a PR includes checking whether it should have touched a doc and
  did not.
