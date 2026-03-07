---
title: Model Selection
description: Why you use different models for planning and execution — and it's not just about cost.
---

## This is about cost and containment

Cost is the obvious reason to split models. Reasoning-tier models can be 10-20x more expensive per token than execution-tier models. If you're a solo builder or a small team, that math matters every month.

But cost isn't the only reason. The less obvious reason is containment. Larger models have more capacity. They track more context, detect higher-level inconsistencies, infer intent beyond literal instructions, and explore alternative strategies. In planning, that's exactly what you want. In execution, it's a liability — the model reinterprets your ticket, surfaces architectural alternatives, and expands scope when you need it to follow instructions.

Smaller models have less capacity across the board. They're less likely to propose alternatives or question your design — but they're also less reliable on complex instructions and more prone to errors. The tradeoff isn't obedience for capability. It's reduced initiative for reduced reliability.

What makes this work is the ticket. A well-scoped ticket constrains what the model needs to do. When the task is simple and specific enough, a less powerful model handles it fine — and it won't second-guess your architecture along the way. Containment comes from the combination of a clear ticket and a model that lacks the capacity to deviate from it. Neither one alone is enough.

**The principle:** Use a model's reasoning capacity for decisions that need reasoning. Use a constrained model for execution that should follow a plan.

## Reasoning tier

Use the most capable model you have access to.

*Currently: Claude Opus 4.6, GPT-5.4 Thinking, Gemini 3.1 Pro.*

This is your planning model. Use it for feature discovery and design, architecture evaluation, writing ADRs, complex debugging where you need to understand system behavior, security-sensitive reviews, and multi-file refactors where judgment is required.

## Execution tier

Use the fastest, cheapest model that can follow structured instructions.

*Currently: Claude Haiku 4.5, GPT-5.3 Instant, Gemini 3.1 Flash-Lite.*

This is your implementation model. Use it for building well-scoped tickets, writing tests from specifications, updating documentation and context files, boilerplate, scaffolding, and simple bug fixes.

## The tier names are stable. The models will change.

Six months from now, the specific models listed above will be outdated. That's fine. The principle holds regardless of which models exist: separate the model that reasons about *what* to build from the model that follows instructions about *how* to build it. Update the model names as the landscape evolves.

## The decision test

**If the work requires judgment about what to build** → reasoning tier.

**If the work requires following instructions about how to build it** → execution tier.

When in doubt, ask yourself: am I asking the model to make decisions, or to execute decisions I've already made? That's your answer.

## Why containment matters as much as cost

Most people split models to save money. That's a good enough reason on its own. But even if every model cost the same, the split would still be worth it.

When you let a reasoning model execute, it reasons about execution. It questions your design, proposes alternatives, asks "have you considered..." mid-implementation. Sometimes that's valuable. Usually it's scope drift in disguise. Mixing planning and execution in the same session also increases the risk of context drift — the model starts reinterpreting earlier decisions as new information appears, and the implementation quietly diverges from the plan.

A well-scoped ticket paired with a less powerful model reduces the surface area for this kind of drift. Not because the model is more disciplined, but because the task is simple enough to stay on track with less capability.

I learned this the hard way: my best implementation sessions were the ones where the agent didn't get creative. It read the ticket, built what I asked, and stopped. The sessions that went sideways were the ones where a powerful model decided it had better ideas than my plan.
