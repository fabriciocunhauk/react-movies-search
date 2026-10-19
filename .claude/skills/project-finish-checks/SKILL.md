---
name: project-finish-checks
description: Verification gate to run before claiming any coding or refactoring task is complete. Executes scenario/E2E tests, typecheck, linting, full test suite, and manual dev server checks.
---

# Project Finish Checks

## Overview

Use this skill at the end of an implementation task before final handoff[cite: 4]. It enforces a strict, concrete verification order: targeted scenario/E2E tests first, typecheck and lint next, the full local test suite before handoff, and an optional manual verification dev server (preferring non-default ports where applicable)[cite: 4].

Coverage must never degrade[cite: 4]. Every new branch, state, workflow, helper, and user-visible path added by the task needs coverage exercising actual feature behavior[cite: 4]. Do not lower coverage thresholds, skip specs, delete assertions, or add superficial tests to make verification pass[cite: 4].

Leave no dead code behind[cite: 4]. Before handoff, remove unused helpers, abandoned branches, stale TODO scaffolding, unused exports, orphaned test fixtures, and speculative abstractions not exercised by the implemented feature or tests[cite: 4].

## Workflow

1. Identify the user-facing scenario or component changed by the task[cite: 4].
   - Search for matching test specs using appropriate tools or CLI search (e.g., `rg -n "<feature keyword>" tests/` or `find`)[cite: 4].
   - Prefer the narrowest existing E2E/integration spec that exercises the changed workflow[cite: 4].
   - If no spec exists and the task changed visible or critical behavior, add or update a targeted spec before handoff[cite: 4].
   - Map each new code path to a real verification path. New browser-visible or API behavior needs coverage-bearing E2E/integration tests; non-UI shared logic needs focused unit coverage plus the integration path consuming it[cite: 4].
   - Treat coverage regressions as implementation defects. Add meaningful feature coverage or remove unneeded code until the covered surface reflects the change[cite: 4].

2. Run targeted/scenario E2E or integration tests before broad checks[cite: 4].
   - Execute the narrow test targeting the specific scenario using the project's test runner (e.g., Playwright, Cypress, Vitest, Jest):
     ```bash
     npm run test:e2e -- <path-to-scenario-spec>
     ```
   - _Note:_ Adjust command based on package scripts (e.g., `pnpm`, `yarn`, `bun`). Ensure any required mock services or isolated dev servers are managed appropriately by the test framework[cite: 4].

3. Run typecheck[cite: 4].
   - Run the project's static type checker (e.g., TypeScript, Flow, MyPy, Go vet):
     ```bash
     npm run typecheck
     ```

4. Run lint[cite: 4].
   - Run the project's linter:
     ```bash
     npm run lint
     ```
   - If full lint fails on unrelated pre-existing files, report that explicitly and include the first representative unrelated file/errors[cite: 4].
   - Then run the linter scoped strictly to the files changed by the task:
     ```bash
     npx eslint <changed-file-1> <changed-file-2>
     ```
   - Do not describe lint as passing unless the full `npm run lint` (or equivalent) command passed without scoped errors[cite: 4].
   - Treat unused variables, unused imports, unused exports, unreachable branches, and stale fixture code as blockers unless explicitly confirmed as pre-existing unrelated issues[cite: 4].

5. Run the full local test suite[cite: 4].
   - Required even when focused tests, typecheck, and lint pass, to catch CI-breaking regressions prior to handoff[cite: 4].
   - Run:
     ```bash
     npm test
     ```
   - If `npm test` fails due to unrelated pre-existing failures, report the failing suite/spec and the first representative error, then rerun the narrow task-related tests to verify task-specific changes remain green[cite: 4].
   - Do not describe the full local suite as passing unless the complete `npm test` execution succeeds[cite: 4].

6. Check that the task did not leave uncovered or dead implementation surface[cite: 4].
   - Review `git diff` for new functions, branches, feature flags, fixtures, and exports not used by the implementation or tests[cite: 4].
   - Run coverage commands if available in the project (e.g., `npm run test:coverage`)[cite: 4].
   - If a coverage command is too broad to finish in the current handoff window, run the strongest practical focused checks, explain the skipped coverage command explicitly, and do not claim coverage was fully verified[cite: 4].
   - Do not reduce coverage thresholds or remove meaningful assertions. If coverage fails because new code is unexercised, cover the behavior or delete unnecessary code[cite: 4].

7. Start a manual verification server (if applicable)[cite: 4].
   - If the task involves a web app, start the dev server using a non-default port if the default port might conflict with parallel runs or E2E runners:
     ```bash
     PORT=5174 npm run dev
     ```
     _(Or pass project-appropriate CLI flags, e.g., `npm run dev -- --port 5174`)_[cite: 4]
   - Keep the server running for user inspection and supply the exact local URL in the final response[cite: 4].

## Handoff Rules

- Summarize the targeted E2E/integration command, typecheck result, lint result, full test suite result, and server URL (if applicable)[cite: 4].
- Summarize the coverage-preservation check: which new behavior was covered, which coverage command ran, and whether any coverage verification was skipped[cite: 4].
- Explicitly state that a dead-code review was completed, documenting whether unused code was removed or none was found[cite: 4].
- Mention known non-blocking warnings only if they naturally appear in successful verification outputs[cite: 4].
- If any required verification fails for task-related reasons, fix it before final handoff[cite: 4].
- If a required verification step cannot run, state why explicitly rather than implying full verification[cite: 4].