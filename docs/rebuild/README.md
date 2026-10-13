# Ten-game rebuild — review prototype, 12 October 2026

The owner rejected the earlier build quality and requested new game design rather than a copy of the old experiences. This follow-up replaces the gameplay implementations of all four Japan games, all four Philippines games, Matka Mania and Gravity Playground. All 23 catalogue routes remain. The other 13 gameplay implementations are unchanged by this follow-up.

## New design

| Game | Player decision / challenge | End condition |
|---|---|---|
| Daruma Drop | Choose forgiving blocks or narrow, high-value targets; strike on their individual timing bands | Clear six blocks / three misses |
| Goldfish Scoop | Aim at ordinary or fast triple-value fish; spend limited time on two paper repairs | Eight fish / damaged net or 60 seconds |
| Sensu Spinner | Place a fan under falling petals and time gusts into a basket | At least eight catches from sixteen petals |
| Koinobori Festival | Steer through rings; spend replenishing wind energy to rise over gates | Twelve rings / three hits |
| Sungka Streak | Collect on the beat; bank safely or risk a larger multiplier and narrower window | Bank 21 shells / three misses |
| Tinikling Tempo | Alternate left/right footwork in a visible beat window | 25 correct claps / three errors |
| Parol Glow | Observe and repeat a growing five-point lantern pattern | Eight-step sequence / three errors |
| Jeepney Jam | Read upcoming traffic and choose safe fare lanes; speed increases with progress | Twenty fares / three crashes |
| Matka Mania | Choose a one-, two- or three-pot load; counter amplified winds for a higher score | Deliver over 600 metres / stability reaches zero |
| Gravity Playground | Guide one orb through five sequential beacons by rotating gravity | Five beacons / 60 seconds |

Sungka is explicitly labelled an arcade adaptation rather than traditional rules. Gravity is intentionally a new goal-driven puzzle; the previous sandbox tools are not carried into this concept. Old implementations remain in Git history.

## Engineering

- `components/rebuild-core.js`: deterministic, seedable rules for ten games, independent of DOM/rendering.
- `components/rebuild-ui.js`: original canvas scenes, pointer capture, touch controls, keyboard, pause, restart, local best scores.
- `components/rebuild.css`: responsive play surface and controls.
- Fixed 120Hz simulation steps, render loop capped to 50ms accumulated time after a stall. This is simulation scheduling, **not a claim of measured 120 FPS**.
- Pause on hidden document/window blur and help; explicit resume. No background scoring.
- New best-score key namespace avoids comparing incompatible previous scores. Blocked storage is handled without preventing play.
- No new dependencies, paid assets, tracking or external runtime network requirements.
- New pages keep shared site header/footer/schema and existing URLs. They do not load the old navigation component, whose global Left/Right handlers conflict with gameplay controls.
- Three homepage challenge descriptions updated to match rebuilt rules. Existing claim-before-win badge defect and country popup focus audit remain separate.

## Verification

Run from the repository root:

```
node tests/rebuild-core.cjs
node tests/game-timing.cjs
node tests/maintenance.cjs
node tests/seo.cjs
```

`rebuild-core.cjs` exercises deterministic sessions, ten full win/loss paths, terminal input, banking/lost stashes, repair cost, cargo scoring, and a physics controller completing the Gravity route. Some tests directly position the fish net; these are mechanics tests, not evidence of real human play skill.

`rebuild-browser.cjs` serves the repo locally and uses Playwright Chromium. Set PLAYRIUM_PLAYWRIGHT, PLAYRIUM_CHROMIUM and PLAYRIUM_CHROMIUM_HELPER for the available runtime. It checks desktop and touch viewport starts, pause/resume, help/Escape, restart, DOM overflow, duplicate IDs, actual timed scoring in three games, persisted scores, and Gravity launch/reset controls. Browser screenshots are in the QA output directory; selected review evidence is stored here.

The older inline-engine timing tests were replaced with tests of the new rules. The old Sungka geometry test was removed because that board implementation no longer exists; browser checks cover the new responsive renderer. `game-design-browser.cjs` now targets the remaining thirteen legacy engines; their earlier evidence remains in docs/redesign.

## Acceptance boundary

These are **new review prototypes**, not approved production releases. Passing tests does not establish fun, retention, accessibility certification, or physical-device smoothness. Full manual rounds on iPhone Safari/Chrome and Android, screen-reader gameplay, landscape/rotation behaviour, and human difficulty tuning remain open. This version is silent: no music or sound effects were added. No merge, deployment or domain change is included.

Review priority: play each for several rounds; report the exact game, what you expected, and what happened. Primary product metric after acceptance: voluntary replay rate after the first completed round. There is no analytics instrumentation in this build.

## Recorded results

- `browser-results.json`: 30/30 cases, ten games at widths 1365, 390 and 320.
- `final-smoke-results.json`: 10/10 mobile cases after the final artwork/feedback pass, including real touch and arrow-key navigation isolation.
- Selected desktop/mobile scenes visually inspected; `preview.webp` shows three of the final mobile play surfaces. Screenshots do not establish physical-device performance.
