# Context Loops

**Your AI forgets everything between conversations. Context Loops gives it persistent memory.**

Three files and a simple loop that keep every session informed, whether you use Claude, ChatGPT, Cursor, or any other AI tool.

## The idea

Your AI forgets everything between conversations. These files make it remember.

Three files. One loop:

1. **Plan** — Upload your files to any AI chat. Ask it to help you define the next task.
2. **Build** — Tell your coding agent to read the files and implement the task.
3. **Update** — Have the AI update your context files with what happened.
4. **Repeat.**

Context lives in files, not in chat history.

## Quick start

1. Copy the `templates/` folder into your project as `ai-workflow/`
2. Open any AI chat (Claude, ChatGPT, etc.)
3. Upload the blank templates and describe your project
4. Let the AI fill them in for you
5. Start building

See the full walkthrough: **[Quick Start →](https://context-loops.vercel.app/quick-start/)**

## Templates

| File | Purpose |
|------|---------|
| [`session-start.md`](templates/session-start.md) | Where things stand right now |
| [`current-sprint.md`](templates/current-sprint.md) | Sprint goal and task queue |
| [`ticket-template.md`](templates/ticket-template.md) | One task with acceptance criteria |
| [`adr-template.md`](templates/adr-template.md) | Architecture decision record |
| [`session-contract.md`](templates/session-contract.md) | Rules for your coding agent's config file |

## File structure in your project

```
your-project/
├── ai-workflow/
│   ├── session-start.md
│   ├── current-sprint.md
│   └── tickets/
│       ├── TASK-001.md
│       └── BUG-002.md
├── docs/
│   └── adr/
│       ├── 001-database-choice.md
│       └── 002-caching-strategy.md
└── [your code]
```

## Agent config

Copy `templates/session-contract.md` into your agent's config file:

- **Claude Code** → `CLAUDE.md`
- **Cursor** → `.cursorrules`
- **Windsurf** → `.windsurfrules`
- **Copilot** → `.github/copilot-instructions.md`
- **Codex** → `AGENTS.md`

## Learn more

- [Context Loops](https://context-loops.vercel.app/) — How the system works
- [Quick Start](https://context-loops.vercel.app/quick-start/) — 10-minute walkthrough
- [Context Engineering](https://context-loops.vercel.app/context-engineering/the-problem/) — Tickets, ADRs, sessions, sprints, model selection, real examples

## Origin

This framework came from building [Backdrop](https://backdropxyz.vercel.app/), a crypto intelligence platform built over eight months with AI coding agents. 15+ sprints, 100+ tickets, real bugs, real cost overruns, and one credential leak. The framework is what survived.

## License

MIT
