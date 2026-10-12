> Superseded for ten games by [the new gameplay rebuild](../rebuild/README.md). Earlier reports below describe the previous draft, not the current replacement engines.

# Smoothness and timing follow-up

The owner requested smoother gameplay and improved timing. This change focuses on the eight arcade games where the rendering/timing implementation is shared.

- Gameplay uses a monotonic clock paused by hidden tabs and the help dialog. A long frame advances no more than 50ms; unseen stalls deliberately slow virtual time instead of immediately losing a round.
- Sungka now allows the existing late side of its timing window. Previously the loop moved to the next station and counted a miss at arrival, making half the advertised symmetric window unusable.
- Tinikling judges the jump at the clap timestamp rather than at the delayed render timestamp. The next beat is anchored to the scheduled beat, avoiding accumulated frame drift.
- Parol checks the upper time boundary when processing a tap so an expired glow cannot be scored before the next render callback.
- Jeepney, Goldfish, Sensu and Koinobori use exponential, elapsed-time-based smoothing. Sensu drag and shake decay are also elapsed-time-based where changed.
- Goldfish wear from movement is multiplied by elapsed time; higher-refresh screens no longer charge more durability for identical speed.
- Keyboard autorepeat no longer triggers repeated rhythm actions.

`node tests/game-timing.cjs` covers clock pause nesting, long stalls, steering at 30/60/120Hz, Sungka early/on-time/late taps and delayed-frame Tinikling judging. These are deterministic scheduling checks, not measured device FPS. Physical iPhone/Android feel and sustained frame rate still need device acceptance. The other 15 games are not claimed retuned by this follow-up.

Validation on 12 October 2026: timing unit suite, maintenance suite and SEO suite pass. Browser verification covers all eight affected games at 1365×900, 390×844 and 320×568, including help pause/resume and mobile touch start. The main run completed 21 cases without page errors before an automation stability timeout on the next Play area button. A fresh nine-case rerun of Tinikling, Parol and Jeepney passed, completing all 24 unique game/viewport combinations. Evidence is in `timing-browser-results.json` and `timing-focused-results.json`. Full rounds and physical-device FPS are not certified by these startup checks.
