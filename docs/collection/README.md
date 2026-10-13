# Remaining thirteen experiences — 12 October 2026

The owner approved the ten-game visual direction and asked for every other game to receive the recommended style. This follow-up extends that visual system to the thirteen remaining experiences. It preserves their existing gameplay engines and original scene art; it does not claim thirteen new gameplay engines.

Affected: Gully Cricket, Kancha Kings, Balloon Bazaar, Spend Crore, Hydraulic Press Lab, World Size Explorer, Moksha Patam, Pie Break, Seven Stones, Stapu, Rangoli Maker, Zen Ripple and Cloud Painter.

## Changes

- Bounded play cards, individual accents, matching dark surfaces, responsive side guides, and per-experience play suggestions.
- Dedicated shared layout and stage-geometry components; canvas engines use their actual play area dimensions rather than the full window.
- Pointer coordinates corrected for offset play surfaces in Cloud Painter, World Size Explorer, Hydraulic Press Lab and Cricket decoration; Spending coin destination corrected.
- Global previous/next arrow shortcuts restricted to the navigation component, so game controls cannot redirect the page.
- Keyboard event isolation now occurs during bubbling so button-level keyboard handlers still work.
- Cloud Painter keeps its Show tools control reachable after hiding the tools. Pointer cancellation releases drawing.
- Rangoli controls moved below the canvas. Resize retains artwork at its aspect ratio; guides use a separate background layer. Colours have accessible labels, and pointer cancellation releases drawing.
- Spending reserves funds synchronously so rapid clicks cannot reuse the same balance. Stale balance animations are discarded.
- Hydraulic Press supports keyboard object placement and hold/release; window blur releases the press.
- World Size Explorer supports keyboard placement of country-area tokens. Help text now describes countries rather than arbitrary objects.
- OPEN-FIRST.txt explains Extract All and the required components folder to avoid the user's ZIP-preview problem.

## Validation

- 39/39 initial startup/layout cases: thirteen experiences at 1365×900, 390×844, and 320×568. Help open/Escape/focus, start controls, overflow, duplicate IDs and script errors checked. Report: layout-results.json.
- Focused final interaction checks: Cloud hide/show and PNG export; Rangoli touch marks, aspect-preserving resize, clear and PNG export; five rapid Spending purchases debit exactly 75 Cr; keyboard Hydraulic placement/press increments the crush log; Enter/Space placement of two World Size countries increments discoveries. Report: interaction-results.json.
- Existing rebuilt-core, timing, maintenance and SEO suites pass; all 23 catalogue destinations and 30 canonical pages preserved.
- Selected desktop/mobile screenshots visually reviewed, including the Rangoli toolbar correction. The headless test environment lacks some emoji glyphs; that limits screenshot evidence for emoji artwork.

Run the focused checks with `node tests/remaining-interactions.cjs`, using the same PLAYRIUM_PLAYWRIGHT, PLAYRIUM_CHROMIUM and PLAYRIUM_CHROMIUM_HELPER variables documented in ../rebuild/README.md.

## Review boundary

The thirteen existing engines retain their rules, audio and timing behaviour. This is a design/usability follow-up, not a claim that all legacy engines now share the rebuilt ten-game pause clock. Full manual rounds, physical iPhone Safari/Chrome and Android verification, audio interruptions, screen-reader gameplay, and human replayability acceptance remain outstanding. Earlier ten-game scope/evidence is in ../rebuild/README.md. No merge, production deployment or domain change is included.
