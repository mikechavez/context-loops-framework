---
title: The Problem
description: What cognitive debt is, how to spot it, and what it costs you.
---

AI coding agents let you ship fast. You can go from idea to working feature in a single session. But at some point, something breaks — and you open your own codebase and realize you can't explain how half of it works. You approved every change. You merged every diff. But you never really understood what was being built, because the agent was moving faster than you could follow.

That's the problem this page is about. There's a name for it.

## What is cognitive debt?

When you build with AI agents, you can ship features in hours that would have taken days. But speed creates a gap: the distance between what you've built and what you understand about what you've built.

That gap is cognitive debt.

It's not technical debt. Technical debt leaves clues in the code — shortcuts you can find, patterns you can trace, tests you can run. Cognitive debt leaves blanks in your understanding. You have a working system, but you can't explain why it works the way it does.

| | Technical Debt | Cognitive Debt |
|---|---|---|
| **Where it lives** | In the code | In your head (or rather, not in your head) |
| **How you find it** | Code review, linting, tests | You can't — until something breaks |
| **What causes it** | Shortcuts and trade-offs | Speed without comprehension |
| **How it compounds** | Slower development over time | Decisions built on foundations you don't understand |
| **How you fix it** | Refactoring | Structured workflow that keeps you informed as you build |

## How it happens

No single moment causes cognitive debt. It compounds silently across sessions.

You ask your agent to implement a feature. It creates three files and modifies two others. You glance at the diff, it looks reasonable, you approve it. Next session, the agent builds on top of those changes. You approve again. By the end of the week, you have a working system built on a foundation of decisions you didn't fully evaluate.

Then something breaks. You open the code and realize you can't trace why anything was built the way it was. You can't fix it confidently because you don't know what else depends on the design choices you approved without examining.

That's cognitive debt. And unlike technical debt, there are no linting tools that catch it.

## Detection checklist

You have cognitive debt if:

- **You can't explain why a core component works the way it does.** You know it works, but not why it was designed that way or what alternatives were considered.

- **Your agent suggests refactors you can't evaluate.** It proposes changing something and you have no basis for judging whether that's an improvement or a regression.

- **You discover bugs that have been live for days.** Not because testing was bad, but because you didn't understand the system well enough to notice something was off.

- **You've rebuilt something because you forgot it already existed.** Or your agent rebuilt it because neither of you had a record of the prior work.

- **You start every session asking the agent to figure out where you left off.** Instead of knowing what's next, you're relying on the agent to re-derive your project state from the codebase.

- **You avoid changing certain parts of the system because you don't understand them.** They work, so you build around them instead of through them.

- **Your agent proposes an approach you already tried and rejected, but you can't remember why.** Without decision records, settled debates get relitigated every few sessions.

- **Your costs spiraled before you noticed.** API bills, infrastructure costs, or token usage grew without you understanding what was driving them.

If any of this sounds familiar, Context Loops is your solution — and you can start addressing it today. → [**Run Your First Session**](/first-session/)

## What it actually costs

These aren't hypothetical. They come from building [Backdrop](https://backdropxyz.vercel.app/), a crypto intelligence platform built over six months with AI coding agents:

- An AI agent committed database credentials to a public GitHub repo. No warning, no flag, no hesitation.
- A core feature was broken for three days before anyone noticed — not because testing was bad, but because the builder didn't understand the system well enough to know it should have been working.
- API costs hit $100+/month before cost tracking was implemented, then dropped to under $10/month with the same functionality.
- Narrative matching accuracy started at 67% and reached 90% — not through better models, but through better understanding of what the system was actually doing.

## The fix

The fix isn't better prompting. It's context engineering.

It starts with a simple loop that records everything around your work with AI — carried from session to session — so you build a rich history not just of what you did and when you did it, but how and why you did it. Traditional ways of keeping track of your work won't cut it when your AI partner forgets everything the moment a session ends.

Context Loops gives you a system that makes every AI session start informed and end clean — so nothing important lives only in a chat thread that will disappear.

→ [**Start your first session**](/first-session/)
