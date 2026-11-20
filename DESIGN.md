# KalkulatorSeller Design Direction

Dial: ENERGY 1 / RHYTHM 1 / MOTION 1

## Product character
A practical, quiet, trustworthy marketplace seller calculator.
The interface is a work tool, not a promotional SaaS landing page.

## Visual principles
- Functional before decorative.
- Compact but readable.
- Clear hierarchy for input, result, and fee explanation.
- White canvas, restrained surfaces, thin borders.
- Use the approved PRD color tokens only.
- Avoid gradients, glows, glassmorphism, ornamental bento grids,
  oversized hero sections, and decorative charting.
- Avoid decorative pill badges with colored dots above headlines (AI slop badge/eyebrow tag pattern).
- Do not use stock imagery on calculator screens.

## Typography
- Use the operating system's default sans-serif stack.
- Do not load remote fonts (no Google Fonts, Typekit, etc.).
- Respect browser and user font preferences.
- Use tabular numerals for money and percentages (`font-variant-numeric: tabular-nums`).

## Layout
- Desktop: calculator input and result in a balanced two-column layout.
- Mobile: one column, with result kept close to primary inputs.
- Keep content within the approved max-width.
- No horizontal overflow at 320 CSS px.

## Interaction
- Live local calculation.
- Persistent labels.
- Clear validation and source status.
- Keyboard-accessible controls.
- No decorative animation.
- Respect `prefers-reduced-motion`.

## Performance
- Astro SSG + Vanilla JS (ES Modules) + Tailwind CSS v4.
- No unnecessary UI framework runtime.
- No third-party widgets in the calculator.
- No external font requests.
- Measure production bundle and Lighthouse score.

## Product-specific constraints
- Never fabricate marketplace tariffs or source links.
- Never label estimates as official.
- Never hide missing inputs behind a zero value.
- Do not display final net profit if required cost inputs are unknown.
- Follow the PRD for formulas, rounding, reverse pricing, and storage.
