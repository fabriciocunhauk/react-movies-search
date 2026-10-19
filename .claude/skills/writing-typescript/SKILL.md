---
name: writing-typescript
description: Use when creating, editing, reviewing, or refactoring JavaScript or TypeScript code across any project. Enforces Single Responsibility Principle (SRP), clean export boundaries, and performance standards.
---

# Writing TypeScript

## Overview

Apply strict SRP-oriented source organization for JavaScript and TypeScript code[cite: 6]. Keep behavior scoped by context, keep file ownership obvious, and avoid broad shared files that create merge conflicts[cite: 6].

## Core Rules

- In git worktrees, refresh from the remote `main` (or default target) branch before planning or editing; do not overwrite local changes to do it[cite: 6].
- Inspect the nearest existing context folder before adding or moving code[cite: 6].
- Put each implementation in the context folder that owns its behavior[cite: 6].
- Keep at most one public value export per source file[cite: 6].
- Apply the same SRP boundary to React components, hooks, utilities, services, abstractions, styles, and constants[cite: 6].
- Export owned types and interfaces from the same source file as their implementation[cite: 6].
- Do not create `index.ts` barrels or multi-value re-export files[cite: 6].
- Import directly from the owning source file instead of looping through aggregate modules[cite: 6].
- For related runtime constants, export one cohesive typed object instead of many named constants[cite: 6].
- Place shared constants in the nearest appropriate shared layer so project-wide changes happen in one place[cite: 6].
- Extract repeated logic, UI patterns, and component behavior into narrowly owned abstractions before duplication spreads[cite: 6].
- Keep CSS/styling reusable and maintainable: prefer named shared style hooks, utility classes, design tokens, or scoped CSS modules over long one-off rule chains or oversized lines[cite: 6].
- Split long files by responsibility when a file starts mixing unrelated behavior, rendering, styles, data, constants, or helpers[cite: 6].
- Keep source moves behavior-preserving unless explicit behavior changes are requested[cite: 6].

## Quality Gates

- Maintainability: one value export, direct imports, colocated owned types, and context folders[cite: 6].
- Performance: avoid needless work, avoid accidental quadratic paths, avoid main-thread blocking, and avoid unbounded buffering[cite: 6].
- Platform fit: use streams, workers, abort signals, transferables, and browser primitives when they match the problem[cite: 6].
- Security: validate external input, avoid unsafe execution or injection, and keep secrets out of client code[cite: 6].
- Verification: add or run tests, benchmarks, or profiling checks matching the risk of the change, and run the repo lint step after each code/style change[cite: 6].

## Workflow

1. If working in a git worktree, pull or otherwise fast-forward from the remote default branch before planning or editing; if local changes make that unsafe, stop and report the conflict[cite: 6].
2. Check the current tree, package scripts, and relevant tests before editing[cite: 6].
3. Choose the existing context folder by responsibility; create a new context folder only when no existing one fits[cite: 6].
4. Add or move files so scoped roots do not mix loose implementation files with module folders[cite: 6].
5. Keep implementation files narrow: one exported class, function, hook, component, service, object, or constant collection[cite: 6].
6. Keep types colocated when they describe that file's exported value; move shared types only when they are truly owned by a shared concept[cite: 6].
7. Move repeated constants into the shared layer that owns their meaning, using one cohesive typed object when values belong together[cite: 6].
8. Factor repeated component structure, behavior, or styles into reusable pieces with narrow ownership[cite: 6].
9. Split long implementation or style files into responsibility-specific files before adding unrelated concerns[cite: 6].
10. Update imports to direct source paths after moves[cite: 6].
11. Add or update organization tests when a structural rule needs enforcement[cite: 6].
12. Run focused tests first, then broader verification appropriate to the change; always include the repo lint command for code or style edits[cite: 6].