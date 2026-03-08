---
title: Why AI Workflows Break
description: Understanding context window mechanics and why workflows degrade when AI tools can't remember your project.
---

Every AI coding session starts the same way: with a model that has no idea what you've been building.

It doesn't matter which tool you use. Claude Code, Cursor, Copilot, Codex. The model behind it has no memory of your last session. No awareness of the architectural decisions you made last week. This is a fundamental constraint of how large language models work. Not a bug in the tooling, and not a gap that the next update will fix.

## Understanding the context window

If you're going to build with AI, you need to understand the one concept that governs every interaction you'll ever have with it: the context window.

The context window is the model's entire working memory. Everything the model can "see" during a single session (your prompts, the files you share, the code it generates, even the conversation history) lives inside this window. The size of that window is measured in tokens. A token is roughly ¾ of a word, and everything that enters the window costs tokens. Every word you type, every line of code the model reads or writes, every system instruction running behind the scenes.

Today's frontier models advertise context windows of 200K tokens, some up to 1 million or more. But most AI coding tools operate with an effective window of 128K to 200K tokens. That sounds like a lot. In practice, it gets consumed fast.

When you paste a file into a conversation, that file gets tokenized and loaded into the context window. When the model responds, those output tokens go into the window too. When you follow up with another message, the model re-reads the entire conversation from the top (every previous message, every previous response) plus your new input. The window fills in both directions: your input pushes tokens in, and the model's own output pushes tokens in right alongside it.

This means a 200K token context window isn't 200K tokens of *your* content. It's 200K tokens shared between everything: your input, the model's output, system prompts, tool calls, file contents, and the full conversation history up to that point. A single 3,000-line source file can consume ~40K tokens once parsed. Add system prompts, tool metadata, and a few rounds of conversation history, and the usable window shrinks fast.

When the window fills up, most tools either silently truncate older messages, attempt to summarize history, or simply end the session. In every case the result is the same: the model loses access to context it previously had, and it has no way to know what it's missing.

## What this means in practice

Early in a project, the context window isn't a problem. Your codebase is small. You can paste a few files, explain what you want, and the model has plenty of room to work. Output quality is high because the model can hold the full picture.

By session five or ten, the math stops working. Your codebase has grown. There are more files, more patterns, more decisions baked into the architecture. You can't fit all of it into context, so you pick and choose. You paste the files you think are relevant. You summarize the rest. You hope the model infers the gaps correctly.

It doesn't. It fills gaps with assumptions drawn from its training data, not your project. It suggests patterns you've already rejected. It creates files that duplicate existing ones. It misses conventions you established sessions ago. Not because the model is bad at its job, but because it's working with an incomplete picture and has no way to tell you what it can't see.

This is **context drift**: the slow, compounding divergence between what the model thinks it's working on and what you've actually built. Every session starts clean for the model, but you're ten sessions deep in accumulated context that the model has never seen.

## Signal loss is the real failure mode

Most people blame the model when output quality drops. The model isn't the problem. The model is doing exactly what it's designed to do: generate the best possible output from the context it's given. If the context is incomplete, the output will reflect that. Confidently, and often in ways that look right until you dig in.

The real failure is **information loss between sessions**. Every time you close a conversation and start a new one, you lose:

- The architectural decisions you made and why you made them
- The patterns you established and the ones you explicitly rejected
- The bugs you hit and the fixes you chose
- The scope boundaries you set for the current sprint

None of this carries forward automatically. The model has no memory, no state, no persistent awareness of your project. Whatever you don't explicitly put into the next context window simply doesn't exist.

Most developers compensate by re-explaining things. Pasting fragments of old conversations. Writing long preambles that try to catch the model up. This works, but it's expensive. Every token you spend on backstory is a token you're not spending on actual work. And it doesn't scale. By session twenty, the backstory alone can eat a meaningful chunk of your context window.

## What structured context solves

If the model can't remember your project, you need a system that does.

Bigger context windows help at the margins, but the core issue isn't window size. It's that there's no system for deciding what goes into the window and keeping that information current across sessions. The next model upgrade won't fix this. It's a workflow problem, not an intelligence problem.

Instead of relying on memory that doesn't exist, Context Loops maintains a small set of structured files that carry forward between sessions:

- **What you're building this sprint** so the model knows the scope without you restating it every time
- **What happened last session** so it picks up where you actually left off, not where it assumes you left off
- **What decisions you've already made** so it stops suggesting things you've explicitly rejected

These aren't documents for you to read. They're context for the model. The structure replaces the memory that the architecture doesn't provide.
