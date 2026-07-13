# Playrium Originals Design Bible

## Purpose
This document is the constitution for every Playrium Original. It exists so that quality, tone, and emotional intent stay consistent as the catalogue grows, regardless of who designs or builds a given experience. Every Original, from Sand Art Studio (TM) onward, is expected to be evaluated against this document at every phase of the lifecycle, from Experience Evaluation through Post-launch Analytics.

## 1. Design Philosophy
Every Playrium Original should aim to deliver on these ten principles simultaneously, not as a checklist to satisfy but as a lens to design through.
- It should create a "just one more minute" feeling.
- It should be understandable within about ten seconds, with no tutorial required.
- It should reward curiosity rather than punish exploration.
- It should be visually beautiful on its own merits, not just functional.
- It should feel premium, never like an unfinished demo.
- It should work equally well on desktop and mobile, not as a mobile afterthought.
- It should encourage sharing, whether through a result, a screenshot, or a story.
- It should contain at least one genuine "wow" moment.
- It should require no onboarding text or instructions to begin.
- It should be memorable enough that a person could describe it accurately days later.

## 2. Emotional Design Principles
Playrium Originals are not judged primarily on feature count or technical sophistication. They are judged on the emotional arc they create: arrival, curiosity, play, absorption, anticipation, a payoff moment, reflection, and ideally, voluntary replay. Every design decision should be traceable to which point in that arc it strengthens. If a feature cannot be tied to strengthening this arc, it should be treated as optional or cut.

## 3. The One Magic Moment Rule
Every Original must have exactly one clearly identifiable Magic Moment: a single instant where the experience delivers its emotional payoff most strongly. For Sand Art Studio, this is The Unveiling. A design with several competing "big moments" usually means none of them land with full force. When in doubt, cut competing moments rather than add more.

## 4. Minimal UI Principles
Interface chrome should be as invisible as possible until the user needs it. Controls should be discoverable through natural interaction rather than labeled instructions. Default to hiding UI during the core experience and revealing it only around the edges of the interaction, such as start, pause, share, and exit. If a control needs a text label to be understood, consider whether it can be redesigned to be self-explanatory instead.

## 5. Audio Principles
Sound should support immersion, never interrupt it. Default audio should be ambient and optional, never loading with sudden loud effects. Every Original should be fully enjoyable with sound muted, since many users will play in silent environments. Sound cues tied to the Magic Moment deserve extra craft, since audio is one of the strongest levers for emotional impact at a payoff moment.

## 6. Visual Language
Playrium Originals share a restrained, premium visual identity: dark or neutral backgrounds that let color and light from the experience itself become the focal point, generous negative space, soft rather than harsh shadows, and typography that recedes rather than competes with the experience. Avoid visual clutter, decorative chrome, or stock-app aesthetics such as heavy drop shadows or default form styling.

## 7. Animation Standards
Motion should feel physical and continuous rather than mechanical or instant. Transitions should ease in and out rather than cut abruptly. Nothing critical to the experience should depend on an animation the user might miss, but animation should be used generously to reinforce cause and effect between a user's action and the experience's response.

## 8. Performance Budget
Every Original should run smoothly on mid-range mobile hardware, not just on a developer's desktop. As a working budget, target sixty frames per second during core interaction wherever feasible, avoid layout shift after initial load, and avoid introducing new external dependencies unless there is no reasonable vanilla alternative, consistent with how the platform itself has been kept dependency-free.

## 9. Accessibility Rules
Every Original should support keyboard operation for its essential actions, provide visible focus states, use sufficient color contrast for any text or critical UI, and avoid relying on color alone to convey meaning. Where an experience is inherently visual or motion-based, accessibility means ensuring the surrounding shell, such as navigation, controls, and exit paths, is fully accessible, even if the core sensory experience is necessarily visual.

## 10. Mobile-First Interaction Rules
Design the core interaction for touch first, then adapt to mouse and keyboard, not the reverse. Touch targets should be comfortably sized, gestures should map to natural physical metaphors such as drag, tilt, pour, or tap, rather than requiring precision, and nothing essential should depend on hover states, which do not exist on touch devices.

## 11. Sharing and Export Standards
Where an Original produces a shareable result, such as an image, a pattern, or a score, it should support a one-tap or one-click export or share action, generate a result that looks good as a standalone image without surrounding UI chrome, and never require an account or login to share.

## 12. Human Testing Standards
Every Original must complete Phase 5, Human Testing, using the Playrium Experience Validation Standard before advancing to Production Build. This includes the One-Sentence Test, the silent observation window, Magic Moment tracking, the 24-Hour Test, and scoring against the Experience Validation Scorecard and graduation criteria established during the Sand Art Studio Phase 5 planning, which now apply to every future Original without exception.

## 13. Production Quality Checklist
See docs/PRODUCTION-CHECKLIST.md for the full gate that every Original must pass before Playrium Integration.

## Governance
This document should only be amended based on validated learnings, primarily insights surfaced during a Phase 5 Human Testing round or a Phase 5.5 Design Review, not based on opinion alone. Amendments should be logged with the name of the Original whose testing prompted the change.
