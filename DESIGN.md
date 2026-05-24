---
version: alpha
name: Sentri-design-analysis
description: An inspired interpretation of Sentri's design language — rebuilt on a clean white canvas with blue pastel accents and a friendly, approachable personality. The system pairs a custom display sans (chunky, playful, near-condensed) with the open Rubik family for UI copy and Monaco for code, then leans on light surfaces, subtle blue-tinted card backgrounds, and a single-color CTA hierarchy where blue pastel buttons read as the primary action.

colors:
  primary: "#5b9bd5"
  ink-deep: "#1a1a1a"
  on-primary: "#ffffff"
  accent-lime: "#a8d0f0"
  accent-pink: "#c9b8f0"
  accent-violet: "#7ba7d4"
  accent-violet-deep: "#4a7fb5"
  accent-violet-mid: "#8ab3d9"
  surface-canvas-dark: "#ffffff"
  surface-canvas-light: "#ffffff"
  surface-night: "#ffffff"
  surface-press-light: "#ddeaf8"
  surface-press-stronger: "#cce0f5"
  hairline-violet: "#c5d9ef"
  hairline-cool: "#d4d4d4"
  hairline-cloud: "#e5e7eb"
  ink: "#1a1a1a"
  ink-press: "#000000"
  on-dark-muted: "#555555"
  on-dark-faint: "#b8d0e8"
  ring-focus: "#9dc1f5"

typography:
  display-hero:
    fontFamily: "Sentri Display, Rubik, system-ui, sans-serif"
    fontSize: 88px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  display-large:
    fontFamily: "Sentri Display, Rubik, system-ui, sans-serif"
    fontSize: 60px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: 0
  heading-xl:
    fontFamily: "Rubik, -apple-system, system-ui, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: 30px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0
  heading-lg:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 27px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0
  heading-md:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0
  heading-sm:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0
  body-lg:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 2.0
    letterSpacing: 0
  body-strong:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0
  body-md:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  eyebrow:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  button-cap:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.14
    letterSpacing: 0.2px
  button-cap-light:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.29
    letterSpacing: 0.2px
  caption:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  micro-cap:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1.8
    letterSpacing: 0.25px
  code:
    fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  code-strong:
    fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 10px
  xl: 12px
  xxl: 18px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  button-primary-pressed:
    backgroundColor: "{colors.surface-press-stronger}"
    textColor: "{colors.ink-press}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  button-inverted:
    backgroundColor: "{colors.on-primary}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  button-inverted-pressed:
    backgroundColor: "{colors.surface-press-light}"
    textColor: "{colors.ink-press}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  button-ghost-on-dark:
    backgroundColor: "{colors.on-dark-faint}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.xl}"
    padding: 8px
  button-violet-token:
    backgroundColor: "{colors.accent-violet-mid}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-cap-light}"
    rounded: "{rounded.xl}"
    padding: 8px 16px
  button-disabled:
    backgroundColor: "{colors.hairline-cloud}"
    textColor: "{colors.on-dark-muted}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  pill-neutral-dark:
    backgroundColor: "{colors.surface-night}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: 4px 8px
  chip-lime-keyword:
    backgroundColor: "{colors.accent-lime}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.display-hero}"
    rounded: "{rounded.xs}"
    padding: 0 12px
  text-input:
    backgroundColor: "{colors.surface-canvas-light}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
  text-input-focused:
    backgroundColor: "{colors.surface-canvas-light}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
  select-violet:
    backgroundColor: "{colors.accent-violet-deep}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  card-pricing:
    backgroundColor: "{colors.surface-canvas-light}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  card-pricing-featured:
    backgroundColor: "{colors.surface-night}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  card-feature-dark:
    backgroundColor: "{colors.surface-canvas-dark}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.xxl}"
    padding: 32px
  card-spotlight-violet:
    backgroundColor: "{colors.accent-violet-deep}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.xxl}"
    padding: 32px
  code-block:
    backgroundColor: "{colors.surface-night}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: 16px
  link-on-dark:
    backgroundColor: "{colors.surface-canvas-dark}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 0px
  link-on-light:
    backgroundColor: "{colors.surface-canvas-light}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 0px
  nav-bar-light:
    backgroundColor: "{colors.surface-canvas-light}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 16px 24px
  footer-light:
    backgroundColor: "{colors.surface-canvas-light}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: 32px 24px
---

## Overview

Sentri's design language reads like a clean developer console with a friendly face. The home and product surfaces sit on a pure white canvas (`{colors.surface-canvas-light}`) with soft blue-tinted section backgrounds (`{colors.surface-canvas-dark}` — a near-white `#f5f8ff`) for feature bands. Headlines run in a chunky proprietary display sans where the most important keywords are wrapped in sky-blue highlight chips (`{colors.accent-lime}`), as if the copy itself has been marked up with a pastel highlighter.

The palette is deliberately clean: white as the dominant canvas, blue pastel as the primary attention-grabber, soft lavender (`{colors.accent-pink}`) as a secondary punctuation, and a mid-blue (`{colors.accent-violet-mid}`) for tag chips and hairline strokes. Black appears exclusively as body text. The "single primary CTA" is a blue pastel button (`{colors.primary}` — `#5b9bd5`) on all surfaces — approachable, readable, and clearly actionable without aggression.

Typography splits cleanly between three families: a custom display sans for hero and section openers (chunky, near-condensed, slightly playful), Rubik for every UI text role (body, captions, eyebrow caps, button labels), and Monaco for code. Buttons and eyebrows almost always run in uppercase with a 0.2px tracking lift.

**Key Characteristics:**
- Single light-polarity canvas system: white (`{colors.surface-canvas-light}`) for all pages, with a very-light blue tint (`{colors.surface-canvas-dark}` — `#f5f8ff`) for marketing feature bands.
- Blue keyword highlight (`{colors.accent-lime}` — `#a8d0f0`) treated as a typographic device — it wraps single words inside the display headline to act as a pastel highlighter.
- Sticker illustration system: floating mascot characters with hand-drawn outlines, appearing at section junctions, never inside cards.
- Uppercase eyebrow + button caps in `{typography.button-cap}` and `{typography.eyebrow}`, with a consistent 0.2px tracking lift.
- Single-primary CTA hierarchy: every page has one blue pastel filled button (`{colors.primary}`); outlined and ghost variants are downgraded.
- Card surfaces are always white (`{colors.surface-canvas-light}`) with `{colors.hairline-cloud}` borders; the featured pricing tier uses the light blue tint (`{colors.surface-night}` — `#eaf1fb`).

## Colors

> **Source pages:** home (`/welcome/`), product/error-monitoring, contact/enterprise, pricing.

### Brand & Accent
- **Blue Pastel** (`{colors.primary}` — `#5b9bd5`): The system's primary action color. Used for filled primary buttons across all surfaces, links, and primary call-to-action elements.
- **Ink Black** (`{colors.ink-deep}` — `#1a1a1a`): Near-black body text on all surfaces — the default ink color for everything readable.
- **Sky Blue Chip** (`{colors.accent-lime}` — `#a8d0f0`): The signature highlight color. Wrapped around individual headline keywords as a pastel highlighter chip (`{rounded.xs}` corner, no padding-y, 12px padding-x). Never a button background for primary actions.
- **Soft Lavender** (`{colors.accent-pink}` — `#c9b8f0`): Secondary punctuation color used for sticker accents and supporting visual elements.
- **Link Blue** (`{colors.accent-violet}` — `#7ba7d4`): Inline link color.
- **Button Blue Deep** (`{colors.accent-violet-deep}` — `#4a7fb5`): Select-dropdown fill on forms; pressed/active button state.
- **Mid Blue** (`{colors.accent-violet-mid}` — `#8ab3d9`): Tag-chip fill and faint accent.

### Surface
- **Light Blue Canvas** (`{colors.surface-canvas-dark}` — `#ffffff`): Hero, product, and feature-page section background. Pure white.
- **Pale Blue** (`{colors.surface-night}` — `#ffffff`): Featured pricing tier background, code blocks, and pill backgrounds. Pure white.
- **White Canvas** (`{colors.surface-canvas-light}` — `#ffffff`): Primary page background for all pages.
- **Surface Press Light** (`{colors.surface-press-light}` — `#ddeaf8`) and **Press Stronger** (`{colors.surface-press-stronger}` — `#cce0f5`): Pressed/active fill of primary buttons.
- **Hairline Blue** (`{colors.hairline-violet}` — `#c5d9ef`): 1px borders on blue-tinted cards.
- **Hairline Cool** (`{colors.hairline-cool}` — `#d4d4d4`): 1px borders on text inputs and form fields.
- **Hairline Cloud** (`{colors.hairline-cloud}` — `#e5e7eb`): Pricing-table dividers and card borders.

### Text
- **On Primary** (`{colors.on-primary}` — `#ffffff`): Text on filled blue buttons.
- **Ink** (`{colors.ink}` — `#1a1a1a`): Body text on all surfaces.
- **Ink Press** (`{colors.ink-press}` — `#000000`): Reserved for the pressed/active state of buttons.
- **On Dark Muted** (`{colors.on-dark-muted}` — `#555555`): Secondary text, captions.
- **On Dark Faint** (`{colors.on-dark-faint}` — `#b8d0e8`): Ghost button fills and dimmed items.

### Semantic
- **Focus Ring** (`{colors.ring-focus}` — `rgba(59,130,246,0.5)`): Translucent blue focus ring — reserved for keyboard focus on form fields.

## Typography

### Font Family

The display tier is a proprietary geometric sans with chunky, near-condensed proportions. When unavailable, fall back to **Rubik** at heavier weights.

The UI tier is **Rubik** — an open-source Hebrew/Latin sans on Google Fonts. Rubik handles every body, caption, button, and eyebrow role.

The code tier is **Monaco** with Menlo and Ubuntu Mono fallbacks.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-hero}` | 88px | 700 | 1.2 | 0 | Marketing hero headline |
| `{typography.display-large}` | 60px | 500 | 1.1 | 0 | Section openers |
| `{typography.heading-xl}` | 30px | 500 | 1.2 | 0 | Page titles (e.g., "Pricing plans for dev teams of all sizes") |
| `{typography.heading-lg}` | 27px | 500 | 1.25 | 0 | Sub-section headings, large card titles |
| `{typography.heading-md}` | 24px | 500 | 1.25 | 0 | Card titles, in-page section headings |
| `{typography.heading-sm}` | 20px | 600 | 1.25 | 0 | Compact card title, list-group title |
| `{typography.body-lg}` | 16px | 400 | 2.0 | 0 | Marketing-paragraph body — airy hero subtext |
| `{typography.body-strong}` | 16px | 600 | 1.5 | 0 | Emphasized body run, lead sentence |
| `{typography.body-md}` | 16px | 500 | 1.5 | 0 | Default UI body, table cells, form labels |
| `{typography.eyebrow}` | 15px | 500 | 1.4 | 0 | Section eyebrow above large headings, all-caps |
| `{typography.button-cap}` | 14px | 700 | 1.14 | 0.2px | Filled button labels (uppercase) |
| `{typography.button-cap-light}` | 14px | 500 | 1.29 | 0.2px | Ghost / outline button labels (uppercase) |
| `{typography.caption}` | 14px | 400 | 1.43 | 0 | Footer text, fine print, helper copy |
| `{typography.micro-cap}` | 10px | 600 | 1.8 | 0.25px | Status labels, badge text, micro-eyebrow |
| `{typography.code}` | 16px | 400 | 1.5 | 0 | Code block content |
| `{typography.code-strong}` | 16px | 700 | 1.5 | 0 | Highlighted code keyword |

### Principles
- **Two leading worlds.** Marketing copy uses 2.0 line-height on `{typography.body-lg}`. Functional UI copy uses 1.5 line-height on `{typography.body-md}`. The choice is deliberate.
- **Caps with tracking.** All button labels and eyebrows are uppercase with 0.2px tracking.
- **Headlines as syntax.** The hero display is structured so a single keyword can be wrapped in a `{colors.accent-lime}` highlight chip without disrupting the reading order.

### Note on Font Substitutes
Rubik is open-source on Google Fonts and is the safe default for everything except the hero display. For the proprietary display sans, suitable open substitutes are **Space Grotesk**, **Archivo** (semi-condensed weights), or **Hubot Sans**.

## Layout

### Spacing System
- **Base unit**: 8px
- **Tokens**: `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.lg}` 16px · `{spacing.xl}` 24px · `{spacing.xxl}` 32px · `{spacing.section}` 96px
- **Section padding**: `{spacing.section}` 96px between major page bands on desktop, collapsing to `{spacing.xxl}` 32px–48px on mobile.
- **Card internal padding**: `{spacing.xxl}` 32px on pricing cards and large feature cards.
- **Form field padding**: `{spacing.sm}` 8px vertical, `{spacing.md}` 12px horizontal.

### Grid & Container
- Marketing pages use a wide centered container; max width sits around 1152px, with content inside flexing across 12 conceptual columns.
- Pricing splits into a 4-tier card row at desktop, collapsing to 2-up at mid widths and 1-up on mobile.
- The contact form uses a 2-column field layout inside a single white panel.
- Breakpoints stair-step at 1440 → 1152 → 992 → 768 → 640 → 576.

### Whitespace Philosophy
All surfaces are light, so whitespace philosophy is consistent throughout. Section bands use `{spacing.section}` generously to give floating mascots and content room to breathe. Transactional surfaces (pricing, contact) tighten slightly since users are scanning and acting.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 | Flat on canvas, no shadow | Default surface |
| 1 | `box-shadow: rgba(0,0,0,0.06) 0 2px 8px 0` | Cards and buttons on white canvas |
| 2 | `box-shadow: rgba(0,0,0,0.08) 0 10px 15px -3px, rgba(0,0,0,0.05) 0 4px 6px -4px` | Floating cards, modals |
| 3 | `box-shadow: rgba(91,155,213,0.25) 0 0 12px 6px` | Soft blue glow around primary CTA on light-blue hero sections |
| 4 | `box-shadow: rgba(0,0,0,0.12) 0 0.5rem 1.5rem` | Pressed button |

### Decorative Depth
Depth comes from subtle **blue-tinted section backgrounds**, floating sticker mascots, and the **blue squiggly divider** above the footer. Drop shadows are very subtle on all surfaces — always light and translucent.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Badges, status pills, keyword highlight chips |
| `{rounded.sm}` | 6px | Text inputs, search boxes |
| `{rounded.md}` | 8px | Primary buttons, code blocks, select dropdowns |
| `{rounded.lg}` | 10px | Generic divs, container blocks |
| `{rounded.xl}` | 12px | Pricing cards, feature cards, navigation pill chrome |
| `{rounded.xxl}` | 18px | Image containers, large hero illustrations |
| `{rounded.full}` | 9999px | Avatars, circular icon buttons |

## Components

> **No hover states documented.** Every spec below shows only Default and Pressed/Active states.

### Buttons

**`button-primary`** — the dominant CTA across all surfaces.
- Background `{colors.primary}` (`#5b9bd5` blue pastel), text `{colors.on-primary}` (white), type `{typography.button-cap}` (uppercase, 14px / 700, 0.2px tracking), padding `{spacing.md} {spacing.lg}` (12px 16px), rounded `{rounded.md}`. On hero sections, add the level-3 blue glow halo.
- Pressed state in `button-primary-pressed`: background to `{colors.surface-press-stronger}`, text to `{colors.ink-press}`.

**`button-inverted`** — secondary CTA for light surfaces; white button with dark text.
- Background `{colors.on-primary}` (white), text `{colors.ink-deep}`, same `{typography.button-cap}`, rounded `{rounded.md}`. 1px `{colors.hairline-cool}` border.
- Pressed in `button-inverted-pressed`: background to `{colors.surface-press-light}`, text to `{colors.ink-press}`.

**`button-ghost-on-dark`** — secondary CTA on blue-tinted sections (e.g., "Get Demo" beside "Get Started").
- Fill `{colors.on-dark-faint}`, text `{colors.ink-deep}`, type `{typography.button-cap}`, padding `{spacing.sm}`, rounded `{rounded.xl}`.

**`button-violet-token`** — pill-shaped tag/category button used inline in product navs.
- Background `{colors.accent-violet-mid}`, text `{colors.on-primary}`, type `{typography.button-cap-light}`, padding `{spacing.sm} {spacing.lg}`, rounded `{rounded.xl}`.

**`button-disabled`**
- Background `{colors.hairline-cloud}`, text `{colors.on-dark-muted}`, otherwise identical to `button-primary`.

### Cards & Containers

**`card-pricing`** — the standard tier card on the pricing page.
- Background `{colors.surface-canvas-light}` (white), text `{colors.ink-deep}`, padding `{spacing.xxl}` 32px, rounded `{rounded.xl}` 12px, 1px `{colors.hairline-cloud}` border.

**`card-pricing-featured`** — the "featured" tier card.
- Background `{colors.surface-night}` (`#eaf1fb` — pale blue), text `{colors.ink-deep}`, same structure as `card-pricing`. The pale-blue inversion distinguishes the featured tier without being aggressive.

**`card-feature-dark`** — large feature-band card on blue-tinted sections.
- Background `{colors.surface-canvas-dark}` (`#f5f8ff`), text `{colors.ink-deep}`, padding `{spacing.xxl}` 32px, rounded `{rounded.xxl}` 18px. 1px `{colors.hairline-blue}` border.

**`card-spotlight-violet`** — accent feature card with deeper blue fill.
- Background `{colors.accent-violet-deep}` (`#4a7fb5`), text `{colors.on-primary}`, padding `{spacing.xxl}`, rounded `{rounded.xxl}`.

**`code-block`** — code/install snippets.
- Background `{colors.surface-night}` (`#eaf1fb`), text `{colors.ink-deep}`, rendered in `{typography.code}`. Padding `{spacing.lg}` 16px, rounded `{rounded.md}`. 1px `{colors.hairline-violet}` border.

### Inputs & Forms

**`text-input`** — contact-form fields.
- Background `{colors.surface-canvas-light}`, text `{colors.ink-deep}`, type `{typography.body-md}`, padding `{spacing.sm} {spacing.md}`, rounded `{rounded.sm}` 6px, 1px `{colors.hairline-cool}` border.
- Focus state in `text-input-focused`: same fill, adds inset shadow `rgba(91,155,213,0.2) 0 2px 10px inset` and 2px `{colors.primary}` border.

**`select-violet`** — dropdown variant on forms.
- Background `{colors.accent-violet-deep}`, text `{colors.on-primary}`, type `{typography.body-md}`, padding `{spacing.sm} {spacing.lg}`, rounded `{rounded.md}`.

### Navigation

**`nav-bar-light`** — top nav across all pages.
- Background `{colors.surface-canvas-light}` (white), text `{colors.ink-deep}`, type `{typography.body-md}`. Logo wordmark left, nav items center, `Get Demo` ghost + `Get Started` filled `button-primary` on right. Padding `{spacing.lg} {spacing.xl}`.

**Mobile nav** — collapses to a hamburger toggle below the 768px breakpoint.

### Pills, Badges, and Highlight Chips

**`pill-neutral-dark`** — small status / category pill.
- Background `{colors.surface-night}` (`#eaf1fb`), text `{colors.ink-deep}`, type `{typography.caption}`, padding `{spacing.xs} {spacing.sm}`, rounded `{rounded.xs}`.

**`chip-lime-keyword`** — inline highlight wrapping single words inside the hero display headline.
- Background `{colors.accent-lime}` (`#a8d0f0` — sky blue pastel), text `{colors.ink-deep}`, type matches surrounding `{typography.display-hero}`, rounded `{rounded.xs}`, padding `0 {spacing.md}` (12px horizontal, 0 vertical).

### Signature Components

**Sticker Mascot Layer** — illustrated characters with hand-drawn outlines. Placed at section junctions overlapping section boundaries by 30–40%, with no container or shadow.

**Blue Squiggly Footer Divider** — a hand-drawn `{colors.primary}` squiggle line, ~3px stroke, sitting above the footer at full container width.

**Window-Chrome UI Mock** — product UI screenshots in `{rounded.xxl}` containers, often tilted ±2–3 degrees off axis.

**`link-on-dark`** — inline links on blue-tinted sections. Text `{colors.ink-deep}` with persistent underline. No container padding.

**`link-on-light`** — inline links on white surfaces. Same as above, text `{colors.accent-violet}` (`#7ba7d4`) for distinction.

**`footer-light`** — site-wide footer.
- Background `{colors.surface-canvas-light}` (white), text `{colors.ink-deep}`, type `{typography.caption}`, padding `{spacing.xxl} {spacing.xl}`. Topped by the blue squiggly divider. Three to four columns of link groups, social icons, and a legal/copyright row at the bottom.

## Do's and Don'ts

### Do
- Reserve `{colors.accent-lime}` (`#a8d0f0`) for keyword-highlight chips inside display headlines and the footer squiggle — never use it as a standard button background.
- Pair every `button-primary` with `{typography.button-cap}` in uppercase with 0.2px tracking.
- Keep all page surfaces white or near-white — `{colors.surface-canvas-light}` (`#ffffff`) or `{colors.surface-canvas-dark}` (`#f5f8ff`). Never introduce dark backgrounds.
- Use sticker mascots to break section boundaries — let them overlap, tilt, and float.
- Use `card-pricing-featured` (pale blue tier) for the featured pricing column instead of an accent-bordered card.
- Default body line-height to 1.5 on functional UI surfaces and 2.0 on marketing surfaces.

### Don't
- Don't introduce dark or saturated backgrounds — the system is fully light-mode.
- Don't apply heavy drop shadows — only very light shadows (`rgba(0,0,0,0.06-0.08)`) on white surfaces.
- Don't use `{typography.display-hero}` (88px) for anything except the marketing hero.
- Don't put body text in `{colors.accent-lime}` — it's a chip color, not a type color.
- Don't put illustrated mascots inside cards or constrained containers.
- Don't introduce colors outside the blue-pastel + lavender palette. No strong reds, greens, or oranges.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| 4K / Wide | ≥ 1440px | Full 4-tier pricing row, hero illustration at full scale |
| Desktop | 1152–1440px | Default max-width 1152px, all 4-tier patterns hold |
| Laptop | 992–1151px | Pricing collapses to 2-up rows, nav horizontal |
| Tablet | 768–991px | 2-column feature grids collapse to 1-up |
| Mobile Large | 640–767px | Hamburger nav; hero display drops from 88px to ~56px |
| Mobile | 576–639px | Single-column everything; section padding 32–48px |
| Small Mobile | 1–575px | Compact mode; sticker mascots reduce size or hide |

### Touch Targets
- Primary buttons hit a minimum 44×44px on mobile.
- Pill tags and badges stay above 32×32px on small mobile.
- Form fields stay at 44px minimum height on mobile.

### Collapsing Strategy
- **Hero display headline** drops from 88px → 60px → 48px; the sky-blue keyword chip preserves padding at every step.
- **Pricing tiers** stair-step from 4-up → 2-up → 1-up. The pale-blue featured tier always remains visually distinguished.
- **Sticker mascots** de-emphasized progressively: desktop overlap → tablet inline → small mobile hidden.
- **Top nav** collapses to hamburger below 768px.
- **Code blocks** preserve 16px Monaco at every breakpoint with horizontal scroll on overflow.

### Image Behavior
- Product UI mocks scale proportionally.
- Sticker mascots scale by 50–70% at mobile breakpoints.
- The blue footer squiggle scales the SVG to container width.

## Iteration Guide

1. Focus on ONE component at a time. Don't rebuild the system — extend it.
2. Reference component names and tokens directly (`{colors.accent-lime}`, `{button-primary}-pressed`, `{rounded.xxl}`).
3. Run `npx @google/design.md lint DESIGN.md` after edits.
4. Add new variants as separate component entries (`-pressed`, `-disabled`, `-focused`).
5. Default to `{typography.body-md}` for product UI body and `{typography.body-lg}` for marketing prose.
6. Keep `{colors.accent-lime}` scarce — one blue chip per viewport. The signature only works because it's rare.
7. All pages use the light canvas (`{colors.surface-canvas-light}` or `{colors.surface-canvas-dark}`); never introduce a dark-polarity surface.