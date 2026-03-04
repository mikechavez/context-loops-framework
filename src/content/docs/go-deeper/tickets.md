---
title: Tickets
description: When to create them, how to keep them small, and why scope discipline matters.
---

## When to create a new ticket

Create a new ticket when:

- **You identify a discrete unit of work that can be finished in a single session (1-3 hours).** If it can't be finished in one session, it's too big. Break it down.
- **A bug shows up while you're working on something else.** Stop. File it. Decide whether it blocks the current work or goes to backlog. Don't fix it inline and forget to document it.
- **Scope creeps during implementation.** The moment you think "while I'm in here, I should also..." — that's a new ticket.

Tickets are how future-you and your agent know what was done and why. An undocumented change is cognitive debt by definition. You built something you can't trace.

## When to expand an existing ticket

Expand a ticket only when:

- The additional work is still solving the original problem.
- The acceptance criteria don't need to change — you're just discovering more steps to meet them.

Here's the test: could someone read the original problem statement and understand why this new work was done? If not, it's a new ticket.

## Keep tickets small

This is the single most impactful habit in the system.

The more you let an agent do in a single ticket, the more changes you can't trace or understand afterward. That's cognitive debt accumulating in real time.

The constraint isn't about effort estimates. It's about traceability. When a ticket touches five files for three different reasons, you lose the ability to understand what changed and why. When it touches two files for one reason, every change is explainable.

A good ticket should be something you can review in full after the agent completes it and understand every change. If you find yourself skimming the diff and hoping it's fine — the ticket was too big.

## Keep documents short

This one's backed by research. LLM performance degrades as input length increases — even when the model can perfectly retrieve the relevant information. Studies across frontier models found performance drops of 13.9% to 85% as input length grew, with multi-hop reasoning degrading the fastest.

Every line of irrelevant context in a ticket is noise that makes the agent's output worse. Keep tickets focused on one problem. Keep sprint docs at summary level. Keep session-start as a pointer to other documents, not a container for all context.

There's no magic line count. But the principle is clear: the less an agent has to read, the better it performs on what matters.

## What every ticket needs

Every ticket should have:

- **Files to modify** — An explicit list. This constrains the agent and prevents it from exploring your whole codebase.
- **Acceptance criteria** — Testable conditions, not vibes. "It works" isn't a criterion. "Endpoint returns cached response in under 200ms" is.
- **Out of scope** — What this ticket deliberately does not do. This is often more important than what it does — it's the boundary that keeps the agent from expanding the work.
- **Dependencies** — What needs to be true before this ticket can start.

If you can't fill these in, you're not ready to build yet. Go back to your planning agent and work through it. That's not a failure — that's the system working. Planning is cheaper than confused implementation.
