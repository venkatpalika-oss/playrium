# Spin Globe as the Signature Discovery Flow - Design Proposal

Investigation for issue #18: should "Spin Globe" become Playrium's primary discovery flow (Spin Globe -> Country -> Experience -> Play) instead of a secondary/decorative element?

## Current state

Today, globe-spinning exists only as "Surprise Me": a floating dice button (bottom corner of every page) that opens an overlay, animates a spinning globe, and reveals one random experience with a "Play Now" link. It is:

- Secondary - reachable only via a small floating button, not part of the main landing flow.
- One-step - it picks a single experience directly, it does not go through a Country selection step.
- Biased toward novelty - it prefers experiences the visitor hasn't seen or played yet (falling back to least-played, then fully random) rather than being purely random.

The primary landing flow today is list-first: Featured card, Trending/New/Most Loved rows, then full country/collection browsing.

## Proposed direction

Make discovery globe-first for new/undecided visitors, while keeping the list-based browsing available for visitors who already know what they want:

1. **Hero-level entry point.** Promote the globe from a floating corner button to a prominent hero section/CTA near the top of the homepage ("Spin the globe to discover an experience"), while keeping the existing Featured/Trending rows below it for browsing.
2. **Two-step reveal.** Change the flow from Spin -> Experience directly, to Spin -> Country -> then a second reveal of an Experience within that country. This matches the issue's requested flow (Spin Globe -> Country -> Experience -> Play) and gives the visitor a moment to feel they're exploring a country, not just getting a random link.
3. **Keep it skippable.** Visitors who came with intent (e.g. from search, or returning users) should still be able to jump straight to browsing/search without spinning first.
4. **Reuse existing logic.** The novelty-biased selection in pickSurpriseExperience already exists and works well; it should be reused for the new flow rather than rebuilt.

## Suggested rollout (phased, not a single big change)

1. Ship the two-step (Country -> Experience) reveal inside the existing overlay first, without moving its entry point. This validates the richer flow with low risk since the entry point doesn't change.
2. If that lands well, promote the entry point into a homepage hero section, A/B-style (e.g. compare engagement/play-through with the globe prominent vs. today's list-first layout) before fully replacing the list-first homepage.
3. Only after validating both of the above, consider making globe-first the default landing experience rather than an addition alongside the existing homepage.

## Open questions for the repo owner

- Should "Spin Globe" fully replace the list-first homepage, or sit above it as an additional entry point? This proposal assumes the latter (additive) unless told otherwise.
- Do we have any analytics today to measure whether Surprise Me usage correlates with longer session/more plays, to justify prioritizing this?

## Non-goals of this document

This is a design proposal only, matching the "investigate" framing of issue #18. It intentionally does not change any code, markup, or the live site. Actual implementation (hero section markup/CSS, the two-step reveal logic) should be scoped as a follow-up once the direction above is confirmed.
