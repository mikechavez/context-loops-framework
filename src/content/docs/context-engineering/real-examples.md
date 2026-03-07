---
title: Real Examples
description: Annotated files from a production project — not demos, not templates.
---

These are real files from building [Backdrop](https://backdropxyz.vercel.app/), a crypto intelligence platform (read the [case study](https://open.substack.com/pub/earlysignalx/p/ai-lets-you-build-faster-than-you)). They've been sanitized but not polished. This is what the system looks like after months of daily use.

---

## A real sprint doc

This is from a 48-hour launch sprint covering article publication, interactive site deployment, and distribution. Notice how the sprint changed shape after it started — that's normal.

```markdown
# Sprint 11 — 48-Hour Launch: Substack + Interactive Site + Distribution

**Status:** In Progress
**Duration:** 2026-02-25 to 2026-02-27

## Sprint Order

| # | Ticket   | Title                              | Status           | Est     |
|---|----------|------------------------------------|------------------|---------|
| 6 | TASK-004 | Create OG Image / Social Card      | ✅ COMPLETE      | 1 hr    |
| 7 | TASK-005 | Final Polish Substack Draft        | ✅ COMPLETE      | 1.5 hr  |
| 8 | TASK-019 | Make Substack CTAs More Visible    | ✅ COMPLETE      | 0.5 hr  |
| 9 | TASK-020 | LinkedIn Distribution Post         | ✅ DRAFT COMPLETE| 0.5 hr  |
| 10| TASK-021 | Instagram Story                    | 🔲 OPEN         | 0.25 hr |
| 11| TASK-022 | Facebook Distribution Post         | 🔲 OPEN         | 0.25 hr |
| 12| TASK-006 | X / Reddit / HN Distribution       | 🔲 OPEN         | TBD     |

## Key Decisions

- **TASK-019** — Reader feedback: both interactive companion CTAs
  were invisible when skimming. Bolded and cleaned up copy.
  (This was discovered after publication — not planned.)

- **BUG-050** — Briefing endpoint was returning misleading errors.
  Root cause: Anthropic API credit balance depleted, not rate limits.
  Fix made error messages actionable.

- **BUG-051** — During manual testing at 6:24 AM UTC, system allowed
  generating "evening" briefing when it should auto-detect "morning."
  Added time-of-day detection logic.

## Remaining Work (prioritized)

1. BUG-051 — Auto-detect briefing type (code ready, testing)
2. TASK-020 — Publish LinkedIn post
3. TASK-021 — Instagram story
4. TASK-022 — Facebook distribution post
5. TASK-006 — X / Reddit / HN distribution
```

**What to notice:** The sprint changed shape after it started. TASK-019 came from reader feedback after publication. BUG-050 was found during testing. BUG-051 was found while verifying BUG-050. None were in the original plan. All were documented immediately and prioritized against existing work. The "Key Decisions" section explains *why*, not just *what* — that's the context that prevents the same misdiagnosis next time.

---

## Real ADRs

### ADR-001: Use Sonnet over Haiku for Briefings

This wasn't just a config change. It set a precedent — quality over cost for customer-facing features — and recorded evidence that would otherwise be lost.

```markdown
# 001. Use Claude Sonnet for Briefing Generation

**Date:** 2025-12-29
**Status:** Accepted

## Context
The briefing agent was using Claude Haiku (cheaper, faster) to generate
daily intelligence briefings. Testing revealed Haiku consistently
hallucinated content despite explicit anti-hallucination prompts.

Problems observed with Haiku:
- Added non-existent facts ("FalconX CEO", "SEC restructuring")
- Mentioned entities not in source data ("Binance CEO CZ")
- Couldn't reliably follow complex instruction sets
- Generic filler language despite explicit prohibitions

## Decision
Upgrade to Claude Sonnet for all briefing operations.
Haiku remains in use for entity extraction (batch, low-complexity).

## Key Tradeoff
- Cost: ~12x more per token ($0.18 vs $0.015 per briefing)
- Monthly impact: ~$11/month (up from ~$1/month)
- Quality: Zero hallucinations in 10+ test briefings (from frequent)

## Why not just improve the prompts?
Multiple prompt iterations already failed. Haiku fundamentally struggles
with complex instruction sets. The quality risk for customer-facing
briefings was unacceptable.
```

The "Why not just improve the prompts?" section is the most valuable part. Without it, someone would reasonably suggest exactly that. The ADR explains why that path was already tested and failed.

### ADR-003: Compute-on-Read for Signal Scoring

This changed the fundamental data architecture — from background pre-computation to on-demand calculation.

```markdown
# 003. Signal Scoring: Compute on Read

**Date:** 2026-01-05
**Status:** Accepted

## Context
Signal scores were stale — 1145 entities had scores, but none updated
in 24+ hours. Root cause: the background worker only refreshed entities
mentioned in the last 30 minutes. If an entity wasn't mentioned for 2
hours, its score became stale because old mentions didn't "age out."

Key finding: Briefings (the primary consumer) use narratives, not
signal scores. Signals serve as supplementary context only.

## Decision
Compute on read: calculate signal scores on-demand when the API is
called, cache for 60 seconds in Redis.

## Alternatives rejected

**Time-bucketed aggregates:** Pre-compute hourly stats, sum on read.
Rejected as over-engineered for current usage patterns.

**Fix the worker:** Expand refresh scope to all entities with scores.
Rejected as a band-aid that doesn't address the root issue — pre-
computation isn't necessary for the current use case.

## Consequences
- Signals are always fresh (no stale data ever)
- Simpler architecture (removed background worker complexity)
- First request each minute may be slower (2-5s compute)
- Cannot easily query historical signal trends
```

Notice how the context section identifies the root cause precisely — not just "scores were stale" but exactly why. That level of detail means the decision can be re-evaluated later with full information, not guesswork.

### ADR-012: Redis-Cached Entity Articles

A multi-phase performance redesign that introduced new infrastructure dependencies and staleness tradeoffs.

```markdown
# 012. Redis-Cached, Time-Bounded Entity Articles for Signals

**Date:** 2026-02-25
**Status:** Implemented

## Context
Entity articles endpoint hitting 43-48 second latency for high-volume
entities (Bitcoin). MongoDB Atlas M0 can't handle the $lookup-based
aggregation. Signals page effectively unusable.

## Decision
1. Enforce strict 7-day timeframe filter
2. Replace $lookup with two-pass query (mentions → article IDs → articles)
3. Cache in Redis with 15-minute TTL
4. Add concurrency guard to prevent Mongo stampedes
5. Keep lazy-loading in frontend

## Implementation (5 phases)
- Phase 1: Time-bounded cutoff → <1s warm, <3s cold ✅
- Phase 2: Redis cache layer → <200ms warm ✅
- Phase 3: Cache warmer for high-traffic entities ✅
- Phase 4: UI cleanup ✅
- Phase 5: Observability and parameter validation ✅

## Result
Signals page: <5s cold (from 52s)
Entity articles: <1s warm (from 48s)
```

This one's unusually detailed for an ADR because of the phased implementation. For a multi-phase performance fix, the execution history is part of the decision record.

---

## A real ticket

This is from the Backdrop build. Tickets are the most frequently created file — every fix, feature, and discovery becomes one.

```markdown
---
ticket_id: TASK-019
title: Make Substack CTAs More Visible
priority: medium
severity: low
status: COMPLETE
date_created: 2026-02-25
effort_estimate: 0.5 hr
---

# TASK-019: Make Substack CTAs More Visible

## Problem Statement

Reader feedback after publication: The interactive companion links were invisible when skimming. Two CTAs for the interactive companion were buried in body copy without visual prominence.

---

## Task

1. Find both interactive companion CTAs in the Substack article
2. Bold them and clean up surrounding copy
3. Test on mobile (Substack reader layout)

---

## Verification

- [ ] Both CTAs are visually distinct (bold)
- [ ] Copy flows naturally with bolding
- [ ] Mobile rendering looks good in Substack app

---

## Acceptance Criteria

- [ ] Interactive companion CTAs bolded
- [ ] Copy edited for clarity
- [ ] Deployed to Substack and tested
```

**What to notice:** This ticket came from reader feedback *after* publication — not from planning. It was discovered during the sprint, documented immediately with the same format as planned work, and prioritized against existing tasks. The effort is small (0.5 hr) because the problem statement is specific and actionable. Whoever picks this up (you or an AI agent) knows exactly what changed, why it matters, and how to verify it's done.

---

## A real session-start file

This is from mid-sprint. It's not polished — it's functional. It tells you and the agent exactly what's happening and what's next.

```markdown
# Session Start — Briefing Generation & Distribution Posts

**Date:** 2026-02-26
**Status:** 🔧 IN PROGRESS

---

## Previous Session: ✅ COMPLETE

- ✅ TASK-019: Made Substack CTAs more visible (bolded, cleaned up copy)
- ✅ TASK-020: LinkedIn post drafted and finalized

## Current Session: 🔧 IN PROGRESS

### BUG-050: Briefing Force Parameter (FIXED & DEPLOYED ✅)
Fixed the /api/v1/briefing/generate endpoint which was not providing
clear feedback when force=true. Key discovery: briefing generation
failures were caused by depleted Anthropic API credit balance, not
rate limits.

**File:** src/crypto_news_aggregator/api/v1/endpoints/briefing.py

### BUG-051: Auto-Detect Briefing Type (IN PROGRESS)
During manual testing at 6:24 AM UTC, system allowed generating
"evening" briefing when it should auto-detect "morning."
Fix implemented, testing in progress.

---

## Next Up (prioritized)

1. BUG-051 — Complete testing of auto-detect briefing type
2. TASK-020 — Publish LinkedIn post + link in first comment
3. TASK-021 — Draft + post Instagram story
4. TASK-022 — Draft + post Facebook distribution post
5. TASK-006 — X / Reddit / HN distribution posts

---

## Key Links

- Substack article: [link]
- Interactive companion: [link]
- Vercel site: [link]

---

## Files

- Sprint doc: current-sprint.md
- Tickets: task-020.md, task-021.md, task-022.md
```

**What to notice:** It starts with what just happened — instant context without reading the full sprint doc. Active work includes the key discovery (credit balance, not rate limits), not just the fix. "Next Up" is a prioritized list an agent can act on immediately. Key Links and Files are reference pointers — session-start doesn't contain all context, it points to where context lives. That's what keeps it short and fast to read.

**How it gets updated:** At the end of every session, the agent moves completed work to "Previous Session," updates "Current Session" with what's in progress, re-orders "Next Up," and adds any new blockers or discoveries. The file is always a snapshot of right now — not a history log.
