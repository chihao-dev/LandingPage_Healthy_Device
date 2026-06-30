@newWorkspace

UNIVERSAL EXECUTION MODE — BA-WAY ENFORCED

Use /chihao/rule/BA-WAY.md as the SINGLE and OVERRIDING source of truth.
All tasks MUST be implemented strictly according to BA-WAY.
BA-WAY rules override any default AI behavior.

MANDATORY READING (ALWAYS):
- SYSTEM_OVERVIEW.md
- SYSTEM_ANALYSIS.md
- BA-WAY.md

TASK INPUT:
The task description will be provided below.
The task may be ANY type (bug fix, refactor, migration, feature change).

GENERAL EXECUTION RULES (APPLY TO ALL TASKS):
1. Treat the task as an IMPLEMENTATION task, not a proposal.
2. You MUST modify existing source code to satisfy the task.
3. You MUST follow BA-WAY for:
   - Architecture decisions
   - Layer separation
   - Transaction boundaries
   - Scope limits
4. If the task conflicts with existing code:
   → CHANGE THE CODE, not the BA-WAY.
5. Do NOT invent new requirements or architecture.
6. Do NOT refactor outside the task scope.

CHANGE LOG RULE (CRITICAL):
- After implementing the task, you MUST produce a CHANGE REPORT.
- The report MUST contain ONLY:
  - Modified files
  - Changed code blocks (before → after)
- No explanations, no analysis text.

OUTPUT RULES (MANDATORY):
1. APPLY all required code changes logically according to BA-WAY.
2. DO NOT output documentation-only results.
3. DO NOT output “proposal”, “suggested code”, or “example”.
4. OUTPUT the CHANGE REPORT to:
   chihao/result-code/result-code.md

FAIL CONDITIONS:
- ❌ No code changes applied
- ❌ Only descriptive markdown generated
- ❌ Code deviates from BA-WAY
- ❌ Result file does not reflect real code changes

FINAL CHECK:
If the task goal is not satisfied by actual code changes,
the task is considered FAILED.

===== TASK STARTS BELOW =====
<chihao/rule/BA-WAY.md>