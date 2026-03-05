---
title: Quick Start
description: Go from zero to your first AI-assisted session in 10 minutes.
---

**Time: ~10 minutes. You'll need: any AI chat (Claude, ChatGPT, or similar) and a place to save files (a folder on your computer, a GitHub repo, whatever you use).**

## What you're about to do

You're going to create three files that give your AI persistent memory across sessions. Then you'll run one cycle of the loop: plan a task, do it, and update your files so the next session picks up right where you left off.

If you have a project in progress, bring it. If not, you can start something new.

## Step 0 — Set up your workspace

Create a folder called `.ai-workflow/` wherever you keep your project files. Inside it, create an empty `tickets/` folder.

```
your-project/
  .ai-workflow/
    session-start.md      ← (you'll create this in a moment)
    current-sprint.md     ← (and this)
    tickets/              ← (tickets go here)
```

That's your entire infrastructure. Three files and a folder.

You can download blank templates from the [GitHub repo](https://github.com/mikechavez/context-loops-framework/tree/main/templates), or generate them from scratch in the next step.

## Step 1 — Plan with your AI

Open a new conversation in Claude, ChatGPT, or whatever you prefer.

**If you have an existing project**, paste this:

> I'm setting up a file-based workflow to keep context across AI sessions. Here's what I'm working on:
>
> [Describe your project in 2-3 paragraphs — what it does, where it stands, what's next]
>
> Based on this, generate three files for me:
>
> 1. **session-start.md** — A snapshot of where the project stands right now. Include: project name, current status, what's been completed recently, active decisions, and what's next.
>
> 2. **current-sprint.md** — A sprint plan for my immediate goal. Include: the sprint goal in one sentence, and 3-5 tickets that would move toward it. Each ticket should have a title and a one-line description.
>
> 3. **One ticket file** for the highest-priority task. Include: title, summary, files to modify (if applicable), acceptance criteria (how I know it's done), and out of scope (what this ticket does NOT cover).

**If you're starting a brand new project**, paste this:

> I'm starting a new project and setting up a file-based workflow to keep context across AI sessions. Here's what I want to build:
>
> [Describe what you want to build and why]
>
> Generate three files for me:
>
> 1. **session-start.md** — A starting snapshot. Include: project name, goal, key decisions to make, and immediate next steps.
>
> 2. **current-sprint.md** — A first sprint plan. Include: sprint goal in one sentence, and 3-5 starter tickets. Each ticket needs a title and one-line description.
>
> 3. **One ticket file** for the first task I should tackle. Include: title, summary, files to modify (if known), acceptance criteria, and out of scope.

Let the AI generate them. Review them. If something's off, tell it — this is a conversation.

## Step 2 — Save your files

Copy the AI's output into your `.ai-workflow/` folder:

- `session-start.md`
- `current-sprint.md`
- `tickets/TICKET-001.md`

If you use Git, commit them now with a message like `init: ai-workflow context files`.

You now have persistent context. Your next AI session — whether it's five minutes or five weeks from now — can start by reading these files.

## Step 3 — Build

This is where you do the work.

**If you use a coding agent** (Claude Code, Cursor, Codex): Tell it to read your session-start and implement the ticket. Something like:

> Read `.ai-workflow/session-start.md` for project context, then implement the task in `.ai-workflow/tickets/TICKET-001.md`.

**If you're using a web chat** (Claude, ChatGPT): Upload or paste the session-start and ticket file, then work through the task together in conversation — writing code, drafting content, whatever the work is.

**If the work isn't code at all** (writing, planning, research): Same pattern. The ticket describes what you're producing, the session-start gives the AI context about the larger project.

Review the output. This is your work — the AI is building to your spec, not guessing.

## Step 4 — Update your context

When the task is done (or you're stopping for the day), update your files.

Tell your AI:

> Update session-start.md to reflect what we just completed. Mark TICKET-001 as done in current-sprint.md. Note any decisions we made or issues we discovered.

Copy the updated files back. Commit if you use Git.

**This step is the one people skip. Don't.** Five minutes now saves thirty minutes of re-explaining next session. This is the whole point — your files carry the context so the chat doesn't have to.

## Step 5 — See it work

Next time you open any AI chat — even a completely different tool — paste your session-start.md and say:

> Here's where my project stands. What should I work on next?

Watch it pick up exactly where you left off.

That's the loop. Plan → Build → Update → Repeat.

---

## What happens when priorities change?

You'll discover bugs. Requirements will shift. Something urgent will jump the queue. That's normal.

When it happens, go back to your planning chat and say:

> Here's my current sprint doc and session-start. I just found a bug that needs to be the top priority. Create a ticket for it and update the sprint ordering and session-start to reflect the new priority.

The planning agent creates the ticket, shifts the queue, and updates your files. You save them, go back to your coding agent, and keep building. The system handles change the same way it handles normal work — through the files.

---

## What to do next

**Keep going.** Run 2-3 more sessions with this loop. You'll start to feel it: sessions begin faster, the AI gives better suggestions, and you stop losing work to disappeared chat threads.

**When you're ready**, explore the Context Engineering guides:

- [**Tickets**](/go-deeper/tickets/) — When to create them, how to keep them small, why scope discipline changes everything
- [**ADRs**](/go-deeper/adrs/) — How to record decisions so your AI (and future you) never relitigates them
- [**Sessions**](/go-deeper/sessions/) — Start/stop rituals, when to switch between planning and building
- [**Sprints**](/go-deeper/sprints/) — How to group work, transition between goals, handle discovered work
- [**Model Selection**](/go-deeper/model-selection/) — Which AI to use for which task, and why it matters
- [**Real Examples**](/go-deeper/real-examples/) — Annotated sprint, ADR, and session-start files from a production project
