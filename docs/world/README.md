# South Korea and Brazil collections — review build

Ten additions; five games per new country. Total: 36 experiences in five country collections plus Originals. The previous 26 destinations remain unchanged in gameplay.

## Playable scope

South Korea: Yut Relay (two-token race/capture versus heuristic rival), Gonggi Garden (four toss/gather/catch stages), Tuho Courtyard (angle/power/wind aiming), Ddakji Studio (corner impact plus stiffness/power), Jegi Sky (moving-foot manual kicks).

Brazil: Peteca Rally (automatic hand returns with placement/angle control), Button Football (disc/ball collision shot puzzles with defenders), Gude Circle (six-marble ejection physics), Amarelinha Trail (five timed out-and-back number routes), Pipa Breeze (wind, steering, line tension and hover collection).

Each page describes its changes from the traditional pastime. These are original browser adaptations, not claims of authentic regulation implementations or exclusive national origins. Yut omits stacks, shortcuts and bonus throws; Peteca is a solo arcade drill; football is a solo shot puzzle. Distinct rule sets share UI and drawing utilities. All new art is code-generated locally; no copied commercial assets or characters.

Country pages, globe country definitions, country quick navigation, shared metadata/search, catalogue filters, Recently Added and sitemap include the additions. New game metadata disables the existing daily-challenge feature until specific challenges are authored.

## Quality and implementation

- 240Hz fixed simulation steps with a 50ms frame-gap cap. This is simulation design, not a measured display FPS claim. Long gaps are discarded to prevent unfair jumps.
- Semantic controls and labelled sliders; touch and keyboard; pause on blur/hidden; explicit resume, restart, terminal state, local best score with storage-failure fallback.
- New game canvas art uses a 960×960 backing store for a 480×480 logical play field.
- No new audio, multiplayer, account service, analytics, cloud saves or resume-in-progress saves. Best records persist only on the same browser/origin.

## Verification

`tests/world-core.cjs`: victories and losses for all ten rulesets, terminal-state input ignored, seeded replay, 30/60/120Hz marble scoring parity. Football and marble win sequences were found by legal shot search and replayed; no production debug shortcuts exist.

`tests/world-browser.cjs`: desktop 1365×900, touch 390×844 and 320×568; 30 cases. Start, real controls, scoring actions, pause, resume, rules/Escape, restart, saved best/reload and storage-denied operation. New country filters show five games each and hubs link five destinations. Movement is tested with keyboard and held touch controls; Ddakji uses touch aim in mobile cases. Terminal/persistence and airborne scoring browser tests use explicitly injected boundary fixtures. Full unassisted human wins are not claimed.

Selected screenshots inspected. Existing trio/rebuilt-core/timing/maintenance/SEO regression suites pass. Physical iPhone Safari/Chrome and Android QA, screen-reader gameplay, human difficulty and replayability remain unverified. This is a review build; no merge, live publication or domain change.

## Cultural research

- Korea.net: https://www.korea.net/NewsFocus/HonoraryReporters/view?articleId=265431&pageIndex=1
- Yutnori: https://www.korea.net/NewsFocus/Culture/view?articleId=221648&pageIndex=1
- Brazilian education examples: https://sme.goiania.go.gov.br/conexaoescola/eaja/educacao-fisica-qual-jogo-marcou-sua-infancia/
- Peteca: https://sme.goiania.go.gov.br/conexaoescola/eaja/educacao-fisica-peteca/
- Pipa: https://sme.goiania.go.gov.br/conexaoescola/ensino_fundamental/educacao-fisica-brincadeiras-tradicionais-a-magia-da-pipa/
- Button football: https://portaldoprofessor.mec.gov.br/fichaTecnicaAula.html?aula=19116
