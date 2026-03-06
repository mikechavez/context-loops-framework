---
title: Model Selection
description: Why you use different models for planning and execution — and it's not about cost.
---

Most people pick one AI model and use it for everything. This page explains why that's a mistake — and why splitting planning and execution across different model tiers gives you better results and fewer surprises.

## This is about containment, not cost

LLMs are probabilistic by nature. The distinction that matters for this system isn't randomness — it's capacity.

Larger models have more representational capacity. They track more context, detect higher-level inconsistencies, infer intent beyond literal instructions, and explore alternative strategies. In planning, that's exactly what you want. In execution, it's dangerous — the model reinterprets your ticket, surfaces architectural alternatives, and expands scope when you need it to follow instructions.

Smaller models stay closer to literal instruction following. They have weaker meta-reasoning and less capacity to deviate from what you wrote. The benefit isn't that they're cheaper (though they are). It's that they have reduced strategic creativity — they build what the ticket says instead of questioning whether the ticket is right.

**The principle:** Use a model's reasoning capacity for decisions that need reasoning. Use a constrained model for execution that should follow a plan.

## Reasoning tier

Use the most capable model you have access to.

*Currently: Claude Opus, Claude Sonnet, o1/o3, Gemini Pro.*

This is your planning model. Use it for feature discovery and design, architecture evaluation, writing ADRs, complex debugging where you need to understand system behavior, security-sensitive reviews, and multi-file refactors where judgment is required.

## Execution tier

Use the fastest, cheapest model that can follow structured instructions.

*Currently: Claude Haiku, GPT-4o-mini, Gemini Flash.*

This is your implementation model. Use it for building well-scoped tickets, writing tests from specifications, updating documentation and context files, boilerplate, scaffolding, and simple bug fixes.

## The tier names are stable. The models will change.

Six months from now, the specific models listed above will be outdated. That's fine. The principle holds regardless of which models exist: separate the model that reasons about *what* to build from the model that follows instructions about *how* to build it. Update the model names as the landscape evolves.

## The decision test

**If the work requires judgment about what to build** → reasoning tier.

**If the work requires following instructions about how to build it** → execution tier.

When in doubt, ask yourself: am I asking the model to make decisions, or to execute decisions I've already made? That's your answer.

## Why this matters beyond cost

Cost savings are real — execution-tier models are often 10-20x cheaper per token. But the real benefit is containment.

When you let a reasoning model execute, it reasons about execution. It questions your design, proposes alternatives, asks "have you considered..." mid-implementation. Sometimes that's valuable. Usually it's scope drift in disguise.

A constrained model given a well-scoped ticket doesn't do this. It builds what the ticket says. Not because it's more disciplined, but because it lacks the capacity to challenge your decisions. That constraint is the feature.

I learned this the hard way: my best implementation sessions were the ones where the agent didn't get creative. It read the ticket, built what I asked, and stopped. The sessions that went sideways were the ones where a powerful model decided it had better ideas than my plan.
