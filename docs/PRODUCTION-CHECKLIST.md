# Production Checklist (Phase 6, before Playrium Integration)

Complete this checklist after an Original has passed Phase 5 Human Testing, and Phase 5.5 Design Review if triggered, and before it is integrated into the live Playrium catalogue.

## Performance
- No layout shift after initial load.
- Smooth frame rate on mid-range mobile hardware during core interaction.
- No unnecessary new external dependencies introduced.

## Accessibility
- Keyboard operability for all essential actions.
- Visible focus states throughout.
- Sufficient color contrast for any text or critical UI elements.

## SEO
- Experience page included in sitemap.xml.
- Canonical tag present.
- Appropriate structured data present, consistent with how other experience pages are marked up.

## Metadata
- Accurate page title and description.
- Open Graph and share metadata present and accurate.

## Analytics
- Core engagement events, such as start, Magic Moment reached, replay, and share, are tracked consistently with how other experiences are instrumented.

## Share Image
- A dedicated share image or preview asset exists and renders correctly across common social platforms.

## Mobile QA
- Verified at common breakpoints, roughly 320, 375, 390, and 768 pixels wide, with no horizontal scroll and no clipped controls.

## Desktop QA
- Verified at common desktop widths with no layout issues.

## Browser Compatibility
- Verified in at least the current versions of Chrome and one other major browser.

## Integration
- Added to components/experiences-data.js as the single source of truth.
- Reachable through at least one discovery path, such as the Explore catalogue, a relevant country or category page, and Related Experiences on at least one other page.
- Zero broken internal links introduced.
