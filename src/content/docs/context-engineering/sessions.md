---
title: Sessions
description: How to start, run, and end sessions — plus the five rules that hold it all together.
---

A session is one working conversation with your AI agent — start to finish. It could be 30 minutes or 3 hours. What matters isn't the length, it's the structure: every session starts by loading context, works on one ticket, and ends by updating your files so the next session doesn't start blind.

## Starting a session

Every session starts the same way:

1. The agent reads `session-start.md`, `current-sprint.md`, and the ticket referenced as next priority.
2. You skim session-start to confirm the priority is still correct.
3. Implementation begins on that ticket and only that ticket.

If session-start doesn't clearly point to a next action, you need a planning session, not an implementation session. Don't let the agent figure out what to work on — that's how you get scope drift before you've written a line of code.

## During a session

The agent implements what the ticket says. If it starts asking architecture questions or proposing scope changes, that's a signal: either the ticket wasn't ready, or the agent is drifting. Both mean you should stop and reassess.

If you discover a bug, file a ticket for it. Note it in session-start under known issues. Decide whether it's urgent enough to interrupt current work. Then return to the current ticket.

If you realize the ticket's approach is wrong, stop implementation. Don't debug your way through a flawed design. Switch to planning mode and rethink the approach before burning more tokens on a path that isn't working.

## Ending a session

Before closing out, have the agent:

1. Update the current ticket status (complete, in progress, blocked).
2. Update `session-start.md` to point to the next priority.
3. Update `current-sprint.md` if ticket status changed.
4. Note any new blockers, bugs discovered, or decisions pending.
5. Commit all context files alongside code changes.

This takes 5-10 minutes. I know it's tempting to skip — you finished the ticket, the code works, you want to move on. Don't skip it. Every minute you spend here saves multiples next session. If you skip this, your next session starts with stale files and wrong assumptions, and you're back to asking the agent to figure out where you left off. That's the exact problem this system solves.

## You don't need to read everything — you query it

Here's something that surprised me: I rarely read my own docs in full. I skim them periodically. When problems come up, I read more carefully. When I have a question — "what's blocking the signals feature?" or "why did we switch to Sonnet?" — I upload the relevant files to a planning tool and ask.

These documents aren't manuals you study. They're a knowledge base you interrogate. The act of keeping them updated means you always have a reliable source of truth you can hand to any AI and get instant answers.

If you're reading every document thoroughly every morning, the documents are doing their job poorly. If you're uploading them and getting accurate answers on demand, they're doing their job perfectly.

## When to switch modes

### From execution to planning

You'll feel this shift before you can name it. The conversation moves from "how to build this" to "what to build." That's the signal. Specifically:

- The agent asks clarifying questions about architecture or system design. It shouldn't need to — if it does, the ticket wasn't ready.
- You're unsure about the approach. Uncertainty in execution mode burns tokens and produces throwaway code.
- The agent wants to read files not listed in the ticket.
- You feel the pull to say "while we're at it..." — that's scope drift.
- You realize the design is wrong mid-implementation.

### From planning back to execution

Planning is done when you can:

- Write a ticket with all required fields filled in.
- Name the files that will be modified.
- Describe the acceptance criteria without hedging.
- Confirm there are no open architectural questions.

Planning is cheap. Execution is expensive. An hour of planning often saves three hours of confused implementation. But planning that never turns into a ticket is procrastination. The ticket is proof that planning is complete.

---

## The five rules

See [Design Philosophy](/docs/context-engineering/design-philosophy/) for the five core rules that hold the system together — these rules work across any agent and any tool.

---

## Setting up your agent

Each coding agent has its own config file, but the instructions are the same. Pick your agent below and paste the session contract into its config file to set expectations from the start.

### Claude Code
**File:** `CLAUDE.md` in your project root

### Cursor
**File:** `.cursorrules` in your project root
(or `.cursor/rules/*.mdc` for rule-specific files)

### Windsurf
**File:** `.windsurfrules` in your project root
(or `.windsurf/rules/*.md` for rule-specific files)

### Copilot
**File:** `.github/copilot-instructions.md` in your project root

### Codex
**File:** `AGENTS.md` in your project root

### Session Contract

Paste this into your agent's config file:

```markdown
## AI Workflow — Session Contract

### Session Start
1. Read `ai-workflow/session-start.md` to understand current state
2. Read `ai-workflow/current-sprint.md` for full sprint context
3. Read the ticket file referenced as next priority in session-start
4. Confirm understanding of the ticket before beginning work

### During Implementation
- Only modify files listed in the ticket's "Files to Modify" section
- Follow acceptance criteria as written — do not add unrequested features
- Do not expand scope beyond the ticket
- If you encounter an issue outside the ticket's scope, note it but do not fix it
- If the approach seems wrong or you need architectural clarity, say so — do not guess

### Session End
- Update the ticket status (complete / in progress / blocked)
- Update `ai-workflow/session-start.md`:
  - Move completed work to "Recently Completed"
  - Set the next priority
  - Note any new blockers or bugs discovered
- Update `ai-workflow/current-sprint.md` with changed ticket statuses
- All context file updates should be committed alongside code changes

### Architecture Decisions
- Check `adrs/` before proposing approaches that may already be decided
- If a decision affects system structure, data models, or infrastructure, flag it
- Do not make architectural changes without explicit approval
```

**The agent won't follow this perfectly.** That's expected. The contract sets expectations — it doesn't guarantee behavior. When the agent drifts, redirect it. Over time, you'll learn which rules your specific agent needs reinforced, and you can add project-specific instructions (testing patterns, import conventions, error handling styles) as you go.
