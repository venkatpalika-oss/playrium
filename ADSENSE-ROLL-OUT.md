# Playrium AdSense integration checklist

Publisher: `ca-pub-9595967643816732`.

## Status

Preparatory only. `ads.txt` has been added; **do not merge or deploy until owner review**.

## Before enabling ads

- Confirm whether canonical production site is `playrium.fun` or `playrium.com` (the current source metadata uses `www.playrium.fun`).
- Add the actual production hostname in AdSense → Sites, complete ownership verification, and wait for Ready status.
- Update `privacy.html`: it currently explicitly says **no ads** and **no advertising trackers**. Make accurate disclosures of Google's advertising data processing, cookies, applicable opt-outs and consent practices.
- Implement a Google-certified CMP and GDPR/EEA/UK/Switzerland consent where applicable; review other applicable regional privacy obligations.
- Restrict advertising to discovery and informational pages. Keep interactive games, game controls and navigation free of ad placements and accidental-click risk.
- Add the provided async AdSense script exactly once in eligible page `<head>` after policy/consent readiness. Avoid blank manual ad units before approval.
- Verify `/ads.txt` over HTTP on the production domain and make sure it serves `text/plain`, not fallback HTML.
- Test mobile, accessibility, console/network errors, game interactions and policy compliance.

No scripts have been activated in this preparatory PR.
