---
title: Architecture Decision Records
description: When to write an ADR, when not to, and why they matter more when AI is involved.
---

An ADR is a short document that captures why you made a specific technical decision. Not what you built — your code shows that. Why you chose this approach over the alternatives. When you're working with AI agents that have no memory between sessions, ADRs are the only thing standing between you and re-debating the same decisions every few weeks.

## When to create an ADR

Create an ADR when:

- **A decision would be hard or expensive to reverse.** Database selection, infrastructure providers, API contracts, data model changes — these lock you in.
- **A decision constrains future decisions.** Choosing MongoDB over Postgres means every future query and schema choice is shaped by that. Choosing rule-based classification over LLM-based means every future relevance improvement builds on regex patterns.
- **A reasonable person or agent might propose an alternative.** If someone could look at your system and reasonably suggest a different approach, the reasoning for your choice needs to be on record.
- **You're choosing between two or more viable approaches.** If all the rejected alternatives were obviously bad, you don't need an ADR. If they were genuinely viable and you chose one for specific reasons, write it down.

## When NOT to create an ADR

- Implementation details within a well-scoped ticket that don't affect system structure.
- Bug fixes, unless the fix reveals a design flaw that changes your approach.
- Anything you wouldn't need to explain to yourself in three months.
- Decisions that are cheap to reverse, self-contained, and affect only one ticket.

The instinct to over-document is just as real as the instinct to under-document. ADRs are for decisions that constrain the future, not for every choice you make.

## Why ADRs matter more with AI

AI tools don't exercise judgment about your architecture. They generate suggestions by combining training data with whatever context you give them in the moment. When that context doesn't include the reasoning behind your decisions, the model fills the gap with generic best practices. Suggestions that can be perfectly reasonable in general and completely wrong for your system.

Here's what that looks like: you evaluated two approaches, ran into a dealbreaker with one, and chose the other for specific reasons. Weeks later, your agent looks at the system and suggests the approach you already rejected. It never knew why you made that call. Without the reasoning on record, nothing stops anyone from reopening settled decisions, re-running experiments that already failed, or optimizing for something you intentionally deprioritized.

ADRs prevent that. When the reasoning is documented (what you tested, what failed, what tradeoffs you accepted), the agent reads it and works within those constraints. Decisions stay settled. Work moves forward.

This gets more important as you delegate more to AI. Every unsupervised session is a chance for the agent to contradict a design constraint it doesn't know exists. ADRs are constraints that keep AI-generated suggestions aligned with decisions it has no independent basis to evaluate.

Even if future AI systems have perfect memory across sessions, they still won't know what tradeoffs your team made, what experiments already failed, or what non-obvious constraints shaped your architecture. Only documentation provides that.

## What makes a good ADR

Every ADR answers three questions:

1. **What was the problem?** — Specific and measurable context.
2. **What did you decide, and what did you reject?** — The decision plus the alternatives you considered.
3. **What happened as a result?** — Honest consequences, including tradeoffs.

The rejected alternatives are often more valuable than the decision itself. They're what prevent future relitigating.

## Backfilling past decisions

You don't need to document everything retroactively. Focus on decisions that still constrain your system today. If you're on MongoDB and that choice still shapes every query you write, a one-page ADR explaining why is worth the 30 minutes.

When you set up the system on an existing project, your planning agent will likely suggest backfill candidates based on what you describe. Start with the big ones: database, infrastructure, primary data sources, monolith vs. services. Even a short ADR is better than none.

See [real ADR examples](/context-engineering/real-examples/) from a production project for what these look like in practice.
