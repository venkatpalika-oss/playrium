# Three new country games — review build

Adds Puli Meka, Fukuwarai and Patintero to the existing collection (26 total). All original 23 destinations remain. Country pages, shared catalogue/search and sitemap include the additions.

## Rules and scope

- Puli Meka: an explicitly labelled Playrium square-board adaptation inspired by Aadu Puli Attam, not a recreation of its traditional triangular geometry. Three tigers, fifteen goats, orthogonal moves/jumps; five captures win for tigers, trapping all tigers wins for goats. A side with no legal move loses; 160 turns draw. Select either side and one of two heuristic opponent settings. Best counts match wins; no daily puzzle mode yet.
- Fukuwarai: memory adaptation. Five original SVG features, five randomized rounds with study time decreasing from six to two seconds. Accuracy is mean distance-based score, capped at 100 per face. Touch placement, keyboard cursor, reveal, SVG download and session-total best. No rotation or multiplayer.
- Patintero: solo adaptation. Three horizontal-line defenders; cross and return, three courses, three shared lives, sixty simulation seconds per course. Collision resets to the latest safe zone with 1.5 seconds immunity. Guards accelerate each course. Keyboard, held touch directions and court dragging. No multiplayer.

No account/backend/third-party runtime required by the new games. Existing header/footer retain their existing behavior. Stored scores are best records, not save-and-resume matches. All three pause on blur/hidden and require explicit resume. No sound added.

Cultural references used during selection:
- https://bharatiyakhel.iksindia.org/adu-puli-attam/
- https://web-japan.org/kidsweb/virtual/fukuwarai/index.html
- https://ncca.gov.ph/about-culture-and-arts/in-focus/traditional-games-in-the-philippines/

## Verification on 2026-10-12

- `node tests/trio-core.cjs`: legal placement, jump capture, tiger/goat victories, AI termination, distance scoring, patrol outbound/return, victory, timeout, collision immunity and timing parity.
- `node tests/trio-browser.cjs`: 9/9 Chromium cases across desktop 1365px, touch/mobile 390px and 320px. No horizontal overflow or uncaught errors. Pause/resume, help/Escape, restart, both hunt roles, five face rounds, keyboard/touch placement, SVG download, reload persistence, held touch controls and catalogue links.
- Patrol course/victory/timeout browser checks use deterministic boundary fixtures injected only by tests; these are not full human-played victories.
- Storage-denied browser test passes. Rebuilt-core, timing, maintenance and SEO regression suites pass.
- Selected desktop/mobile screenshots inspected, including three distinct play surfaces.

Physical iPhone Safari/Chrome and Android testing of these three additions remains unverified. Screen-reader play, human difficulty, enjoyment and replay rates need user testing. Headless Chromium emulation is not Safari/device acceptance. This review build is not merged or deployed.
