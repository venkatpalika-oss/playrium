# Playrium Maintenance Log

A running log of verified bugs found and fixed on the frozen Playrium platform (V1.1). Each entry documents the issue, root cause, resolution, and regression risk. This log exists so future maintenance work can spot recurring patterns (input bugs, resize bugs, canvas bugs, browser quirks) without digging through Git history.

---

## Bug #001 — Balloon Bazaar™ Pointer Coordinate Mismatch

- **Date:** 2026-07-14
- **Experience:** Balloon Bazaar™
- **Symptom:** Balloons rendered correctly but never popped on tap/click; the Almanac discovery counter never incremented.
- **Root Cause:** Pointer event coordinates (clientX/clientY, viewport space) were compared directly against balloon positions stored in canvas-local space. After the shared site header and breadcrumb bar were introduced, the canvas was pushed down the page, so rendering stayed correct while hit-testing silently used the wrong coordinate system.
- **Resolution:** Convert pointer coordinates to canvas-local space using canvas.getBoundingClientRect() immediately after each pointer event, before any hit-testing or drag calculations.
- **Files Changed:** balloon-bazaar.html
- **Regression Risk:** Low - one file, six lines changed, existing browser API, no changes to gameplay or rendering logic.
- **PR:** #39

---

## Engineering Convention Established

Whenever an experience uses Canvas, rendering space, pointer space, and physics space must all use the same coordinate system. Viewport coordinates should never be compared directly against canvas-local coordinates. Always convert pointer coordinates into canvas-local space immediately after receiving an input event.
