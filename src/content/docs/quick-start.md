---
title: Quick Start
description: Go from zero to your first AI-assisted session in 10 minutes.
---

**Time: ~10 minutes. You'll need: any AI chat (Claude, ChatGPT, or similar) and a place to save files (a folder on your computer, a GitHub repo, whatever you use).**

## Step 1 — Tell your AI what you're working on

Open a new conversation in Claude, ChatGPT, or whatever you prefer. Then copy one of these prompts.

**If you have an existing project,** paste this and fill in the bracketed section:

> I'm setting up a file-based workflow to keep context across AI sessions. Here's what I'm working on:
>
> **[Describe your project in 2-3 paragraphs — what it does, where it stands, what's next. Be specific. The better you describe it, the better your files will be.]**
>
> Based on this, generate these files in order:
>
> **Tickets** — Break everything I described into small, actionable tickets. Each ticket should have: a title, a one-line summary, files to modify (if applicable), acceptance criteria (how I know it's done), and out of scope (what this ticket does NOT cover). Name them TASK-001.md, TASK-002.md, etc.
>
> **current-sprint.md** — Now that the tickets exist, create a sprint plan. Include: the sprint goal in one sentence, and the tickets ordered by priority.
>
> **session-start.md** — A snapshot of where I am right now. This file is the cursor — it tells the AI where in the sprint I am, what's been done, what's active, and what's next. It should reference the sprint and tickets you just created.

**If you're starting something new,** paste this instead:

> I'm starting a new project and setting up a file-based workflow to keep context across AI sessions. Here's what I want to build:
>
> **[Describe what you want to build and why. Include any constraints, tools you plan to use, or decisions you've already made.]**
>
> Generate these files in order:
>
> **Tickets** — Break this project into small, actionable tickets for getting started. Each ticket should have: a title, a one-line summary, files to create or modify (if known), acceptance criteria, and out of scope. Name them TASK-001.md, TASK-002.md, etc.
>
> **current-sprint.md** — A first sprint plan. Include: sprint goal in one sentence, and the tickets ordered by priority.
>
> **session-start.md** — A starting snapshot that tells the AI where things stand. Include: project name, goal, key decisions to make, and what ticket to start with.

Let the AI generate everything. Review it. If something's off, tell it — this is a conversation.

## Step 2 — Save your files

Create a folder called `ai-workflow/` in your project with a `tickets/` subfolder inside it. Then save the AI's output:

```
your-project/
  ai-workflow/
    session-start.md
    current-sprint.md
    tickets/
      TASK-001.md
      TASK-002.md
      TASK-003.md
```

If you use Git, commit them now with a message like `init: ai-workflow context files`.

You can also grab blank templates from the [GitHub repo](https://github.com/mikechavez/context-loops-framework) if you want a starting point.

**These files are now your project's memory.** Next time you open any AI chat, upload them and ask *"where did we leave off?"* or *"what's next?"* — the AI reads your files and picks up instantly.

## Step 3 — Build

Hand your first ticket to an AI and let it do the work.

**If you use a coding agent** (Claude Code, Cursor, Codex): Tell it to read your session-start and implement the ticket:

> Read `ai-workflow/session-start.md` for project context, then implement the task in `ai-workflow/tickets/TASK-001.md`.

**If you're using a web chat** (Claude, ChatGPT): Upload or paste the session-start and ticket file, then work through the task together.

**If the work isn't code at all** (writing, planning, research): Same pattern. The ticket describes what you're producing, the session-start gives the AI context about the larger project.

Review the output. This is your work — the AI is building to your spec, not guessing.

## Step 4 — Update and close

When the task is done (or you're stopping for the day), update your files. Tell your AI:

> Update session-start.md to reflect what we just completed. Mark TASK-001 as done in current-sprint.md. Note any decisions we made or issues we discovered.

Copy the updated files back. Commit if you use Git.

This is the step that makes the whole system work. It's the difference between starting your next session with *"where did we leave off?"* and getting an instant, accurate answer — versus spending twenty minutes re-explaining everything. Without fresh files, your AI starts guessing, you start forgetting, and the gap between what's built and what you understand grows quietly until it's a problem.

Next time you open any AI chat — even a completely different tool — upload your files and say:

> Here's where my project stands. What should I work on next?

That's the loop. Plan → Build → Update → Repeat.

## When priorities change

You'll discover bugs. Requirements will shift. Something urgent will jump the queue.

When it happens, go back to your planning chat:

> Here's my current sprint doc and session-start. I just found a bug that needs to be the top priority. Create a ticket for it and update the sprint ordering and session-start to reflect the new priority.

The system handles change the same way it handles normal work — through the files.

## What to do next

Run 2-3 more sessions with this loop. You'll feel it: sessions begin faster, the AI gives better suggestions, and you stop losing work to disappeared chat threads.

When you're ready, explore the deeper patterns:

- **[Tickets](/context-engineering/tickets/)** — How to keep them small and why scope discipline changes everything
- **[Sessions](/context-engineering/sessions/)** — Start/stop rituals and when to switch between planning and building
- **[Sprints](/context-engineering/sprints/)** — How to group work and handle discovered tasks
- **[ADRs](/context-engineering/adrs/)** — How to record decisions so they never get relitigated
- **[Model Selection](/context-engineering/model-selection/)** — Which AI to use for which task
- **[Real Examples](/context-engineering/real-examples/)** — Annotated files from a production project
