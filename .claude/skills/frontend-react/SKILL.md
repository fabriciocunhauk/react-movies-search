---
name: frontend-react
description: Standard operating guidelines for single-page application (SPA) projects built with React, Vite, TypeScript, and Tailwind CSS. Focuses on client-side safety, clean component structure, and minimal bundle sizes.
---

# AI-Assisted Development & Architecture Guidelines (React + Vite Edition)

This document serves as the unified standard operating procedure for engineering teams and AI coding agents working within **React**, **TypeScript**, **Tailwind CSS**, and **Vite** codebases[cite: 5].

Agents and developers must prioritize **SPA best practices, client-side boundary safety, minimal bundle footprint, explicit domain boundaries, strict security, consistency, and DRY (Don't Repeat Yourself) principles**, and must **never break Vite project conventions**[cite: 5].

---

## 1. Architectural Principles & Layered Separation

To ensure maintainability, scalability, and clean codebases, follow a strict Single Responsibility Principle (SRP) and Don't Repeat Yourself (DRY) strategy for directory organization and file structure[cite: 5].

### Layered Architecture Mapping

| Layer | Purpose | Permitted Locations |
| :--- | :--- | :--- |
| **UI** | Render interface, presentation, event routing | `src/components/`, `src/ui/`, `src/pages/`, `src/features/**/components/` |
| **Orchestration** | State management, side effects, network orchestration | `src/hooks/`, `src/services/`, `src/store/` |
| **Execution** | Pure, deterministic, framework-agnostic operations | `src/utils/`, `src/api/`, `src/lib/` |

### DRY (Don't Repeat Yourself) & Code Reuse Rules

- **Prefer Reuse Over Creation:** Before writing new logic, utilities, hooks, or UI components, search the existing codebase to reuse or extend established modules rather than duplicating functionality[cite: 5].
- **Single Source of Truth:** Centralize core business logic, API client instances (e.g., Axios/Fetch wrappers), constants, and data transformations into dedicated shared modules (`src/hooks/`, `src/services/`, `src/lib/`, `src/utils/`)[cite: 5].
- **Extract Recurring Patterns:** As soon as a pattern, helper, or layout element is used across two or more places, abstract it into a narrowly owned, reusable component or utility[cite: 5].

### Context-Driven Folder & Directory Boundaries

- **Standard `src/` Layout:** Vite projects locate application source code inside `src/`. Respect existing structural conventions (`src/assets/`, `src/components/`, `src/pages/` or `src/features/`). Do **not** create or introduce an `app/` App Router directory[cite: 5].
- **Static Assets:** Place raw static files meant for direct public serving in `public/`. Place assets imported directly into TypeScript/JSX files in `src/assets/` to leverage Vite's build-time optimization and hashing[cite: 5].
- **Worktree Preparation:** In git worktrees, refresh from the remote default branch (`main` or target branch) before planning or editing without overwriting local uncommitted work[cite: 5].
- **Domain Boundaries:** Group code strictly by domain context or feature responsibility (e.g., feature-based folders under `src/features/`) rather than raw technical abstractions[cite: 5].
- **Shared vs Feature-Specific:**
  - Shared UI primitives, hooks, and execution utilities reside in shared top-level directories (`src/components/`, `src/hooks/`, `src/utils/`, `src/lib/`)[cite: 5].
  - Feature-specific UI and logic reside within their respective feature folders (e.g., `src/features/auth/components/`)[cite: 5].

### Single Export Rule & Module Boundaries

- **One Primary Public Export:** Each source file must contain at most **one primary public value export** (e.g., single React component, custom hook, service class, utility function, or constant collection)[cite: 5].
- **No Barrels or Re-Exports:** Do not create `index.ts` barrel files or multi-value re-export modules. Import directly from the implementing file to preserve Vite's ESM HMR speed, optimize tree-shaking, and keep module boundaries clear[cite: 5].
- **Colocated Types:** Export interfaces and types directly from the implementation file that owns them. Move to shared type layers (`src/types/`) only when consumed across distinct domain boundaries[cite: 5].
- **Cohesive Constant Objects:** Do not export loose standalone constant primitives. Group related constants into single, typed, frozen/immutable objects located in the nearest appropriate context layer[cite: 5].

### Component & Logic Isolation

- **Presentational UI:** UI components must focus strictly on rendering markup and binding user interactions. Do not make raw API calls directly inside UI components[cite: 5].
- **Custom Hooks for Logic:** Extract non-UI state, API communications (e.g., TanStack Query hooks, custom fetchers), and side effects into custom hooks before duplication arises[cite: 5].
- **Pure Execution Utilities:** Offload transformations, calculations, and parsing to pure utility functions in `src/utils/` or `src/lib/`[cite: 5].
- **Maintainable Styling:** Prefer named design tokens, reusable components, or scoped CSS utility structures over massive, single-line Tailwind rule strings. Split long implementation files (>300 lines) as soon as responsibilities begin to mix[cite: 5].

---

## 2. Safe Refactoring & Modification Guardrails

### Refactoring Rules

- **Allowed Changes:** Small, incremental refactors within existing directories; creating targeted reusable modules; updating relative or path-aliased (`@/`) imports after approved file moves[cite: 5].
- **Disallowed Changes (Require Explicit Approval):**
  - Adding new dependencies or updating major library versions[cite: 5].
  - Structural folder migrations (e.g., moving from feature folders to flat abstractions without prior agreement)[cite: 5].
  - Modifying Vite configuration (`vite.config.ts`), build tooling, or plugin chains[cite: 5].
  - Modifying core API request/response contracts or global routing structures[cite: 5].
  - Adding new UI/CSS libraries[cite: 5].

---

## 3. Security Protocols & Secrets Management

Hardcoding secrets, credentials, or private keys directly in source code is strictly prohibited[cite: 5].

- **Absolute Environment Separation:** All API keys, endpoints, and environment configurations must reside exclusively in `.env` files (`.env`, `.env.local`, `.env.example`)[cite: 5].
- **Zero Hardcoded Secrets:** Never commit string literals representing API keys or secret tokens within source code, component props, mock datasets, or test fixtures[cite: 5].
- **Client-Safe Scoping (`VITE_`):**
  - In Vite, only variables prefixed with `VITE_` (e.g., `VITE_API_URL`) are exposed to the client bundle via `import.meta.env`[cite: 5].
  - **Never** put true backend private secrets or private database keys in a Vite client application. Vite bundles are fully client-side and accessible in browser code[cite: 5].
- **Git Sanitation:** Ensure `.env` and `.env.local` are explicitly declared in `.gitignore`. Commit only sanitized `.env.example` templates[cite: 5].
- **Input & Env Validation:** Validate dynamic external inputs (API payloads, `localStorage`/`sessionStorage`, URL params) and runtime environment variables (`import.meta.env`) using validation schemas (e.g., Zod) before application initialization[cite: 5].

---

## 4. Strict TypeScript & Performance Standards

- **Strict Mode:** Enforce `strict: true` in `tsconfig.json` (or `tsconfig.app.json`)[cite: 5].
- **Zero `any` Policy:** Do not use `any`. Use explicit interfaces, explicit type unions, or `unknown` paired with runtime type guard functions[cite: 5].
- **Type Narrowing Over Assertions:** Avoid `as Type` assertions unless interfacing with untyped third-party packages or native browser host objects; prefer type narrowing using type guards or schema parsing[cite: 5].
- **Explicit Boundaries:** Explicitly type all component props, hook signatures, service returns, and state slices[cite: 5].
- **Immutability:** Treat state as immutable. Utilize `Readonly<T>` or `ReadonlyArray<T>` where mutation must be prevented at compile time[cite: 5].
- **Platform-Native Performance:** Avoid main-thread blocking, unnecessary re-renders, accidental quadratic loop paths, and unbounded memory buffering. Prefer browser primitives (`Web Streams`, `AbortSignal`, `Web Workers`, `Microtasks`) over importing heavy micro-dependencies[cite: 5].
- **Vite Bundle Optimization:** Leverage dynamic imports (`import()`) and React lazy loading (`React.lazy`) for heavy routes and modally hidden components to keep initial bundle size minimal[cite: 5].