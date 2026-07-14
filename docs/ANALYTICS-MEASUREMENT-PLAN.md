# Playrium Analytics Measurement Plan

## Purpose
This is a one-page reference for which metrics will matter once analytics is introduced, so that data collection is intentional from day one rather than reactive. It is written in advance of installing any analytics tool.

## When To Install Analytics
Analytics should not be installed until all three of the following are true:

- Sand Art Studio (TM) has reached Production.
- Playrium has begun being promoted publicly.
- The priority has genuinely shifted from engineering behavior to user behavior.

Installing analytics before these conditions are met would mostly capture personal visits, development traffic, and crawler traffic, none of which is decision-useful. Until the trigger is met, this document is the only analytics-related artifact Playrium needs.

## Metrics To Track Once Installed

### Acquisition
- Visitors
- Returning visitors

### Engagement
- Session duration
- Replay rate
- Scroll depth

### Experience
- Most played
- Least played
- Challenge completion (future)

### Originals
- Reveal reached (the Magic Moment)
- Replay started
- Export used

### Business
- Organic traffic
- Referrals
- Country breakdown

## Tooling Note
A privacy-first, lightweight tool such as Plausible or Simple Analytics is the current leading candidate, consistent with Playrium's Protect Wonder positioning. GA4 was considered but is heavier and less aligned with a minimalist, non-invasive product; it is not the current recommendation.

## Governance
Revisit this plan once the install trigger above is met, and again after the first month of real data, to confirm the metrics above are the ones actually driving decisions. Add or retire metrics only based on what proves useful in practice, not speculatively.
