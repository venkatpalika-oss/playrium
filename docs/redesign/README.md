# Collection interface redesign — review branch

Owner request: redesign all Playrium games because the build quality is unsatisfactory.

This branch redesigns the interface of all 23 existing experiences. It is an implementation for review, not a claim that all gameplay mechanics have been rebuilt or that every game is ready for distribution. The existing routes, gameplay rules, saved-score keys, homepage and production deployment remain intact.

## What changed

- A shared game page layout with a compact navigation bar, individual color palette, clear experience identity, a play-area shortcut, native help dialog and controls/objective guide.
- New start-screen and results styling, stable start buttons, readable typography, keyboard focus indicators, larger touch controls and responsive tool layouts.
- Corrected eight arcade start dialogs that previously mixed full-screen inset positioning with a narrow fixed card width. They now center within the game area and scroll on short screens.
- Eight custom vector marks for the arcade games. Existing scene art is retained.
- Retina canvas backing buffers in eight games, with pointer coordinates kept in logical pixels.
- Local Matter.js 0.19.0, with its MIT license, for Daruma Drop and Gravity Playground. The first browser run reproduced `Matter is not defined` in Daruma when its CDN failed.
- Removed duplicate breadcrumb IDs on all game pages.
- Keyboard activation for the marble/balloon start controls; keyboard focus leaves the hidden start control when play begins. Toolbar key presses no longer trigger a game action behind a control.

## Scope boundaries

This is a collection-wide interface and reliability redesign. It does not replace 23 game engines, add new levels, rebalance difficulty, or demonstrate improved retention. The eight arcade canvases retain their existing scene composition. Long play sessions, all win/loss states, all storage-denial cases, physical iOS/Android devices and screen-reader gameplay remain unverified.

The prior homepage audit issues (daily badge validation, country dialog focus, category destinations and duplicate filtered cards) are separate from this game-page change and are not claimed fixed here.

## Run checks

```
node tests/maintenance.cjs
node tests/seo.cjs
node --check components/game-design.js
node tests/game-design-browser.cjs
```

The browser test requires Playwright and Chromium. Optional environment variables: `PLAYRIUM_PLAYWRIGHT` (module path), `PLAYRIUM_CHROMIUM` (executable), `PLAYRIUM_CHROMIUM_HELPER` (ES module exporting Chromium launch args). It serves the repository locally. External requests are blocked to check that game boot does not depend on third-party CDNs. It checks all 23 pages at desktop and mobile sizes, native help open/close/focus restoration, duplicate IDs, overflow, retina buffers, and game start where a start control exists. It captures screenshots for visual inspection. These checks are startup/layout checks, not complete gameplay certification.

## Review recommendation

Keep this branch unmerged until the owner reviews the new direction. Then inspect one full round in each game on a physical phone and desktop. Assess gameplay depth separately: timing games need meaningful mastery, while creative/relaxation experiences need satisfying responses and discovery rather than arbitrary scores.

## Verification — 12 October 2026

- Existing maintenance suite: PASS (23 destinations, all inline scripts, 366 daily selections, search focus behavior).
- Existing SEO suite: PASS (30 canonical pages, metadata, sitemap, robots and 404).
- Browser startup/layout suite: 69/69 page/viewport combinations passed at 1365×900, 390×844 and 320×568. Mobile contexts used DPR 2. All 20 experiences with start controls were started at all three widths; three open-ended Originals start immediately. No page exceptions, duplicate IDs or horizontal overflow were observed; arcade start cards fit inside the viewport.
- After visual review, corrected Sungka pocket overlap/board clipping, Goldfish durability bar overlap, and the mobile Spending toolbar layout. Also corrected pointer offsets in Kancha/Zen and the keyboard time-of-day control in Zen. A focused 15-case rerun on five affected games passed, using touch taps for mobile start controls.
- Sungka layout regression test: four widths passed; all eight pockets remain separate and the board stays within the screen.
- Actual screenshot inspection included desktop start screens, mobile play screens for eight representative games, narrow Daruma start/play screens, and the corrected Sungka board. Automated screenshots for every page do not imply every pixel was manually reviewed.
- Physical Safari/Chrome on iPhone and physical Android, full victory/loss cycles, audio interruption and long-session progression are NOT VERIFIED in this build.

Screenshots: [Daruma desktop](daruma-desktop.webp), [Cricket mobile](cricket-mobile.webp). Machine-readable startup results: `browser-results.json` and `focused-results.json`.

For a local review, serve the repository with `python -m http.server 8000`, open `http://localhost:8000/experiences.html`, and select a game. Do not upload the review ZIP as a production deployment without reviewing the branch.
