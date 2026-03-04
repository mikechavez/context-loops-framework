---
title: Architecture Decision Records
description: When to write an ADR, when not to, and why they matter more when AI is involved.
---

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

Agents have no memory between sessions. Neither do you, after enough time passes.

Here's what happens without ADRs: you tested a cheaper model for briefings. It hallucinated despite extensive prompt engineering. You upgraded to a more expensive model and moved on. Three weeks later, your agent — or a new collaborator, or future-you — looks at the bill and says "why are we using the expensive model? Let's switch to the cheap one."

Without the ADR, you re-run the experiment. You waste time. You might even ship the regression.

With the ADR, the reasoning is right there: here's what we tested, here's what failed, here's the evidence. Decision settled. Move on.

ADRs prevent relitigating settled decisions. They're not bureaucracy — they're decision memory for systems that have none.

## What makes a good ADR

Every ADR answers three questions:

1. **What was the problem?** — Specific and measurable context.
2. **What did you decide, and what did you reject?** — The decision plus the alternatives you considered.
3. **What happened as a result?** — Honest consequences, including tradeoffs.

The rejected alternatives are often more valuable than the decision itself. They're what prevent future relitigating.

## Backfilling past decisions

You don't need to document everything retroactively. Focus on decisions that still constrain your system today. If you're on MongoDB and that choice still shapes every query you write, a one-page ADR explaining why is worth the 30 minutes.

When you set up the system on an existing project, your planning agent will likely suggest backfill candidates based on what you describe. Start with the big ones: database, infrastructure, primary data sources, monolith vs. services. Even a short ADR is better than none.

See [real ADR examples](/go-deeper/real-examples/) from a production project for what these look like in practice.
