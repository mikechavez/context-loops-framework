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
