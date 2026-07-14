# Playrium

Playrium is a curated collection of handcrafted interactive experiences designed to create memorable moments rather than maximize engagement.

## Philosophy

- Protect Wonder
- Protect Discipline
- Curate Relentlessly

Every experience follows the Playrium Constitution: understandable in under 10 seconds with no tutorial, rewards curiosity, feels premium on both desktop and mobile, and delivers at least one genuine "wow" moment.

## Repository Structure

- components/ - shared JS used across pages: header, footer, navigation, breadcrumb, related experiences, schema, did-you-know, and the experiences-data source of truth.
- docs/ - the Playrium Originals Framework (Design Bible, Evaluation Template, Design Template, QA Checklist, Production Checklist), the Originals Roadmap Prioritization, and platform-level roadmap docs (country rollout, monetization, spin globe discovery proposal).
- Individual experience pages live as flat HTML files at the repository root (for example cloud-painter.html, gravity-playground.html, zen-ripple.html), alongside the country hub pages (india.html, japan.html, philippines.html) and the homepage (index.html).
- sitemap.xml, robots.txt, and .htaccess support SEO and production hosting on the custom domain.

## Platform Status

Platform V1.1 - Frozen.

Only the following changes are permitted on the platform itself:

- Bug fixes
- Accessibility improvements
- SEO improvements
- Security fixes
- Performance improvements

No redesigns unless real user behavior demonstrates a problem. All new development effort is focused on Playrium Originals.

## Originals Lifecycle

Every Original follows the same lifecycle, without exception:

Experience Evaluation -> Experience Design -> Prototype -> Internal QA -> Human Testing -> Experience Validation Report -> Design Review (if required) -> Production Build -> Playrium Integration -> Post-launch Analytics

See docs/PLAYRIUM-ORIGINALS-DESIGN-BIBLE.md for the full framework.

## Development Workflow

- Never commit directly to main.
- Work happens on feature branches, grouped by feature rather than by individual file.
- Every feature branch goes through: implementation, a full QA pass, a single pull request with a complete summary, review, merge, production verification, then branch deletion.
- See docs/PROTOTYPE-QA-CHECKLIST.md and docs/PRODUCTION-CHECKLIST.md before merging any experience-related change.

## Deployment

Playrium deploys via GitHub Pages to playrium.fun (custom domain) and venkatpalika-oss.github.io/playrium.

## Roadmap

Active development priorities are tracked in docs/ORIGINALS-ROADMAP-PRIORITIZATION.md. No queued Original advances into detailed design until the currently active Original (Sand Art Studio) completes Phase 5, Human Testing.
