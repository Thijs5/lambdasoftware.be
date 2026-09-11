# Design notes

> **2026-09-11 update:** the site now tracks the "Lambda Software Design
> System" (tokens, the crossed-strip mark, Manrope +
> JetBrains Mono, and the marketing-site voice guide). The brand-sheet rating
> and token derivation below predate that project and are kept for history —
> the design system supersedes them where they differ (fonts are no longer
> zero-KB; the logo mark is the DS's corrected crossed-strip version, not the
> two-blade reconstruction described here).

## Rating of the supplied brand sheet (`docs/brand-sheet.png`) — 6.5 / 10

**Strong as a brand identity (~8/10):**

- Coherent concept — developer-tool positioning, lambda mark + monospace
  wordmark, the shortened/raised underscore as a deliberate signature detail
  (rationale is even printed on the sheet).
- Logo is robust: works reversed, in mono, as a favicon, down to 16px.
  Clear-space and minimum-size rules are defined.
- Palette is tight and intentional — Ink / Slate / Accent / Surface / White,
  no bloat. The violet accent gives energy against the neutrals.
- Practical coverage: dark-mode lockup, favicon, real-world mockups.

**Incomplete as a *system* for building UI (~4/10):**

- No type system beyond the display wordmark — no body face, scale, weights,
  or line-heights.
- No spacing scale, grid, or breakpoints.
- No components (buttons, links, forms, cards).
- No semantic colour roles; `Slate #475569` has no defined job.
- Accessibility gap: `#7C3AED` on white is ~4.6:1 — fine for large text/UI,
  fails WCAG AA for small text. No accessible pairings given.
- No misuse rules, iconography style, imagery direction, or motion.

Verdict: a solid **logo + colour foundation**, not build-ready. This repo
extends it into the tokens below, all derived from the sheet.

## Tokens added (in `src/styles/global.css`)

| Concern      | Decision                                                                             |
| ------------ | ----------------------------------------------------------------------------------- |
| Palette      | The five brand hex values verbatim.                                                 |
| Accent text  | `--accent-strong: #6D28D9` for links/small text on white (~5.7:1, AA). `#7C3AED` stays for fills and large elements. |
| Semantic     | `--bg`, `--bg-elevated`, `--text`, `--text-muted`, `--rule`, `--link`, `--brand`, `--focus` — remapped under `prefers-color-scheme: dark`. |
| Dark mode    | `bg` = Ink, muted text `#9AA0A8` (neutral, no blue cast), link to violet-300 `#A78BFA` for contrast on near-black. |
| Type         | System stacks only — **0 KB of web fonts** (the brief prioritised load speed). Sans system stack for all display type and body; mono system stack reserved as an accent — wordmark, section numbers, uppercase labels, buttons. Keeps the brand's mono flavour without making it hard to read. Swap in a self-hosted subset later if brand-exact glyphs matter. |
| Type scale   | ~1.25 ratio, `clamp()` for `h2`/display so it is fluid without breakpoints. Display floor kept low (`1.9rem`) so the two-line hero headline never overflows a narrow phone. |
| Muted text   | `--text-muted: #64748b` (light) / `#94a3b8` (dark) — neutral slate, ~4.76:1 on white (AA for normal text). |
| Section head | Short `2rem × 2px` accent bar above each `h2` (`::before`); mono number prefix in `--brand`. |
| Space        | 4px base: `--space-1 … --space-24`.                                                  |
| Shape        | `--radius: 6px` (buttons), `--radius-lg: 14px` (cards — echoes the squircle app icon). |
| Wordmark     | The accent underscore is rebuilt as a positioned bar (`::after`) so "shortened + raised" stays crisp at any size; the real `_` glyph is kept transparent so the text stays selectable. |
| Logo         | Recreated as inline SVG (two blades, negative slice) using `currentColor`, so one file covers light, dark and favicon. |

## Performance choices

- Astro static output, **no islands / no client JS**.
- `build.inlineStylesheets: 'always'` + `compressHTML` — the page is one HTML
  request with no render-blocking CSS.
- Two web fonts (Manrope, JetBrains Mono) from Google Fonts, `preconnect`ed in
  `Base.astro` — the one deliberate trade against the original zero-KB-fonts
  brief, made when the design system adopted a real type pairing. No
  analytics, no other external origins.
- SVGs carry explicit `width`/`height` to avoid layout shift.
- `public/og.png` (1200x630) is a static asset generated once from the same
  tokens/logo markup as the live page, not rendered at request time.
