---
title: Sprints
description: Goal-bounded sprints, mid-sprint flexibility, and how to transition cleanly.
---

A sprint is a batch of tickets organized around a single goal — ship the MVP, fix the auth flow, launch the site. It's the document that tells you and your agent what you're working toward and what's left. If tickets are individual tasks, the sprint is the plan that orders them.

## Sprints are goal-bounded, not time-bounded

A sprint lasts as long as it needs to. The boundary is the goal, not a calendar date.

Start a new sprint when:

- The current sprint's goal is met.
- Priorities have shifted enough that the remaining work no longer reflects the most important thing to do.
- The sprint has accumulated enough discovered work that it needs a reset and re-prioritization.

Don't start a new sprint because two weeks passed. Start one because the work changed.

Rigid timeboxes create artificial pressure to either rush incomplete work or carry it forward mechanically. For solo builders and small teams working with AI agents, the overhead of sprint ceremonies should be near zero. The sprint is an organizing unit, not a performance review.

## Flexibility within a sprint

You will discover problems mid-sprint. You will re-prioritize. This is normal — it's not a sign that your planning was bad.

When new work appears:

- Create a ticket for it immediately, even if it's small.
- Add it to the current sprint if it's urgent or blocking.
- If it displaces existing work, update the sprint doc to reflect the change.
- If it can wait, add it to backlog.

The discipline isn't in predicting all the work upfront. It's in documenting what you're doing and why you changed course. A sprint that ends looking different from how it started is a sprint that responded to reality. A sprint that doesn't change probably isn't tracking what's actually happening.

## Sprint transitions

When it's time for a new sprint:

1. Upload `current-sprint.md` and `session-start.md` to your planning tool (Claude, ChatGPT, whatever you use for thinking).
2. Tell it what the next sprint's goal is and ask it to generate a new sprint doc.
3. It carries forward incomplete tickets, archives completed ones, and sets up the new sprint structure.
4. Copy the generated files back to your repo.
5. Update `session-start.md` to reference the new sprint.

This should take 15-20 minutes. If it takes longer, your sprint doc has probably drifted from reality — which usually means session-end updates were being skipped.

The key insight here is the same as everywhere else in this system: your planning tool generates and updates these documents for you. You provide the goal and the current state. It produces the structure. You review and commit.

To see what a real sprint doc looks like, check the [real examples](/go-deeper/real-examples). You can grab the [sprint template](https://github.com/mikechavez/context-loops-framework/tree/main/templates) to start your own.
