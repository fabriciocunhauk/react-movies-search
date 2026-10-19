---
name: code-review-and-refactor
description: Standard operating procedure for refactoring code, eliminating dead code, splitting large modules (>300 lines), enforcing SRP, and removing barrel files.
---

# Code Review & Refactoring Standard Operating Procedure

## Refactoring Guidelines

### 1. Single Responsibility Principle (SRP)
* **File Size Limit:** If an implementation file exceeds 300 lines or mixes presentation, side-effect orchestration, and calculations, split it by responsibility[cite: 1, 5, 6].
* **Single Value Export:** Enforce at most one primary public value export per source file (e.g., one component, hook, class, or service)[cite: 1, 5, 6].
* **Eliminate Barrel Files:** Do not create `index.ts` re-export files[cite: 1, 5, 6]. Import directly from implementing files to optimize HMR speed and tree-shaking[cite: 1, 5, 6].

### 2. DRY (Don't Repeat Yourself)
* **Audit Existing Code:** Search existing shared modules (`hooks/`, `utils/`, `lib/`) before creating new logic[cite: 1, 5].
* **Extract Patterns:** Abstract logic into shared helpers or custom hooks as soon as it is reused across 2 or more locations[cite: 1, 5].

### 3. Dead Code Elimination
* **Unused Surface Cleanup:** Remove unused imports, dead feature flags, orphaned test fixtures, unreachable branches, and stale TODO scaffolding[cite: 4, 6].