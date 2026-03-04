---
title: Sessions
description: How to start, run, and end sessions — plus the five rules that hold it all together.
---

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

These work across any agent — Claude Code, Cursor, Windsurf, Copilot, Codex, whatever comes next. The tools change. These don't.

1. **Context lives in files, not conversation history.** Your project state, decisions, and priorities are stored in version-controlled markdown — not in chat logs that disappear between sessions.

2. **The agent reads session-start.md and follows the ticket.** Every session begins the same way. The agent loads the context files, identifies the next priority, and implements the ticket as written.

3. **The human makes planning decisions. The agent makes implementation decisions.** You decide what to build and why. The agent decides how to build it within the constraints you've set. When those boundaries blur, stop and switch to planning.

4. **Every session ends with updated context files.** Session-start, sprint doc, and ticket status get updated before you close out. This is what makes the next session fast instead of confused.

5. **Architectural decisions are documented, not assumed.** When you choose one approach over another, the reasoning goes in an ADR. When the agent needs to understand why the system works the way it does, the answer is in a file — not in a conversation that no longer exists.

### What each rule prevents

| Rule | Prevents |
|---|---|
| Context in files | Losing project state between sessions or across tools |
| Session-start → ticket | Wasting time figuring out what to work on |
| Human plans, agent executes | Scope drift and unreviewed architectural changes |
| Session-end updates | Stale context that misleads the next session |
| ADRs for decisions | Relitigating settled decisions, repeating failed experiments |

If you follow these five rules, you can switch agents tomorrow and lose nothing. You can take a week off and pick up exactly where you left off. You can onboard a collaborator by handing them the docs. Your context, your decisions, and your project history are yours — not locked in any tool's memory.

---

## Setting up your agent

Each coding agent has its own config file, but the instructions are the same. Here's a session contract you can paste into your agent's config to set expectations from the start.

**Claude Code** → `CLAUDE.md` in your project root
**Cursor** → `.cursorrules` in your project root
**Windsurf** → `.windsurfrules` in your project root
**Copilot** → `.github/copilot-instructions.md` in your project root

```markdown
## AI Workflow — Session Contract

### Session Start
1. Read `.ai-workflow/session-start.md` to understand current state
2. Read `.ai-workflow/current-sprint.md` for full sprint context
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
- Update `.ai-workflow/session-start.md`:
  - Move completed work to "Recently Completed"
  - Set the next priority
  - Note any new blockers or bugs discovered
- Update `.ai-workflow/current-sprint.md` with changed ticket statuses
- All context file updates should be committed alongside code changes

### Architecture Decisions
- Check `docs/adr/` before proposing approaches that may already be decided
- If a decision affects system structure, data models, or infrastructure, flag it
- Do not make architectural changes without explicit approval
```

**The agent won't follow this perfectly.** That's expected. The contract sets expectations — it doesn't guarantee behavior. When the agent drifts, redirect it. Over time, you'll learn which rules your specific agent needs reinforced, and you can add project-specific instructions (testing patterns, import conventions, error handling styles) as you go.
