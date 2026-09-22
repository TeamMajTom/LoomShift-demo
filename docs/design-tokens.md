# Design tokens: vibrant colors & gradients

Status: **proposed — pending design review before consumption in components.**

These tokens live as CSS custom properties in `src/index.css` (`:root`), alongside
the existing `--accent` / `--text` / `--bg` tokens, so they're consumed the same
way as the rest of the palette. They are scheme-independent (same value in light
and dark mode) because each token is always paired with one of the two fixed
`--on-color-*` tokens below, and that pairing is what's contrast-checked — not
the page background.

Contrast ratios were computed with the WCAG 2.1 relative luminance formula
(not estimated). AA for normal text requires **4.5:1**; large text (18pt+, or
14pt bold) and non-text UI components only require **3:1**.

## Base palette

| Token | Value | Use-case | Paired with | Contrast | AA (normal text) |
|---|---|---|---|---|---|
| `--color-violet` | `#7c2ae8` | Primary accent / interactive (buttons, links, focus) | `--on-color-light` (`#fff`) | 6.26:1 | Pass |
| `--color-magenta` | `#d6009e` | Secondary accent / interactive | `--on-color-light` | 4.82:1 | Pass |
| `--color-teal` | `#00796b` | Accent / interactive (alt) | `--on-color-light` | 5.32:1 | Pass |
| `--color-blue` | `#0077c2` | Accent / interactive (alt) | `--on-color-light` | 4.75:1 | Pass |
| `--color-amber` | `#ffb400` | Highlight / warning background | `--on-color-dark` (`--color-ink`, `#0f0b1a`) | 10.88:1 | Pass |
| `--color-success` | `#00873e` | Success background/badge | `--on-color-light` | 4.63:1 | Pass |
| `--color-error` | `#d11850` | Error background/badge | `--on-color-light` | 5.31:1 | Pass |
| `--color-cloud` | `#f4f1fb` | Tinted section background | `--color-ink` text on top | 17.38:1 | Pass |

`--color-amber` is intentionally paired only with `--on-color-dark`: white text on
amber is 1.78:1 and must not be used. `--color-magenta` and `--color-blue` are
likewise only verified against `--on-color-light` — neither reaches 4.5:1 against
`--color-cloud`, so don't use them as colored text on a light background.

## Accent gradients

Each gradient's two stops are individually contrast-checked against the same
text color that would sit on top of the gradient, so the ratio holds at both
the light and dark end — not just the average.

| Token | Stops | Use-case | Text color | Contrast (stop 1 → stop 2) |
|---|---|---|---|---|
| `--gradient-aurora` | `--color-violet` → `--color-teal`, 135deg | Primary interactive surfaces (buttons, active nav, card headers) | `--on-color-light` | 6.26:1 → 5.32:1, both Pass |
| `--gradient-nova` | `--color-magenta` → `--color-violet`, 135deg | Decorative accent panels / hero backgrounds | `--on-color-light` | 4.82:1 → 6.26:1, both Pass |
| `--gradient-ocean` | `--color-teal` → `--color-blue`, 135deg | Secondary accent panels, info surfaces | `--on-color-light` | 5.32:1 → 4.75:1, both Pass |

## Text on-colors

| Token | Value | Use-case |
|---|---|---|
| `--on-color-light` | `#fff` | Text/icons on top of violet, magenta, teal, blue, success, error, and any accent gradient |
| `--on-color-dark` | `--color-ink` (`#0f0b1a`) | Text/icons on top of amber, or on top of `--color-cloud` |

## Reduced motion / reduced color

None of these tokens are animated yet. If a gradient is later animated (e.g. a
shifting `background-position`), gate the animation behind
`@media (prefers-reduced-motion: no-preference)` and provide the static gradient
(or a solid fallback using the gradient's first stop) as the default.

## Not yet done

- These tokens aren't wired into any component yet (`App.css` still uses its own
  hardcoded grays) — this task only defines and documents the tokens.
- Per the acceptance criteria, treat this palette as a proposal: it needs design
  review/approval before components start consuming it.
