---
title: Design Philosophy
description: The design decisions behind Context Loops — what holds the system together and why it works across tools.
---

These are the design decisions behind Context Loops — what holds the system together and why it works across tools.

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

## Keep documents short

Documentation has a paradox: longer context *feels* safer but often produces worse results. LLM performance degrades as input length increases — even when the model can perfectly retrieve the relevant information. Studies show performance drops as documents grow longer, with multi-hop reasoning degrading the fastest.

Every line of irrelevant context in a ticket is noise that makes the agent's output worse. Keep tickets focused on one problem. Keep sprint docs at summary level. Keep session-start as a pointer to other documents, not a container for all context.

There's no magic line count. But the principle is clear: the less an agent has to read, the better it performs on what matters.

This applies to all your Context Loops documents:
- **Tickets** — One problem, one solution, one ticket. If it grows beyond a single session (1–3 hours), break it into smaller tickets.
- **Sprint docs** — Summary level. Detailed specs live in tickets. Sprint docs point to tickets.
- **Session-start** — A snapshot. "What's done, what's next, what's blocking." Not a full journal.
- **ADRs** — Decision and rationale. Not a meeting transcript. If you need to explain why at length, your rationale wasn't clear enough.

Short documents also have a side effect: they're easier to update. A 50-line session file gets reviewed and updated every session. A 500-line journal gets skimmed and forgotten. The document's *usability* is as important as its content.
