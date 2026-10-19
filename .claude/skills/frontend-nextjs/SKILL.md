---
name: frontend-nextjs
description: Best practices and standard operating procedures for React, TypeScript, Tailwind CSS, and Next.js (App Router) codebases. Enforces Server/Client component boundaries, DRY principles, minimal bundle footprint, and App Router conventions.
---

# AI-Assisted Development & Architecture Guidelines (Next.js Edition)

This document serves as the unified standard operating procedure for engineering teams and AI coding agents working within **React**, **TypeScript**, **Tailwind CSS**, and **Next.js (App Router)** codebases[cite: 1].

Agents and developers must prioritize **App Router conventions, Server/Client boundary safety, minimal bundle footprint, explicit domain boundaries, strict security, consistency, and DRY (Don't Repeat Yourself) principles**, and must **never break Next.js project conventions**[cite: 1].

---

## 1. Architectural Principles & Layered Separation

To ensure maintainability, scalability, and clean codebases, follow a strict Single Responsibility Principle (SRP) and Don't Repeat Yourself (DRY) strategy for directory organization and file structure[cite: 1].

### Layered Architecture Mapping

| Layer | Purpose | Permitted Locations |
| :--- | :--- | :--- |
| **UI** | Render interface, presentation, event routing | `app/**/components/`, `components/ui/`, `views/` |
| **Orchestration** | State management, side effects, network orchestration | `app/api/`, `actions/`, `hooks/`, `services/`, `state/` |
| **Execution** | Pure, deterministic, framework-agnostic operations | `utils/`, `api/`, `lib/` |

### DRY (Don't Repeat Yourself) & Code Reuse Rules

- **Prefer Reuse Over Creation:** Before writing new logic, utilities, hooks, or UI components, search the existing codebase to reuse or extend established modules rather than duplicating functionality[cite: 1].
- **Single Source of Truth:** Centralize core business logic, API request structures, Server Actions, constants, and data transformations into dedicated shared modules (`actions/`, `hooks/`, `services/`, `lib/`, `utils/`)[cite: 1].
- **Extract Recurring Patterns:** As soon as a pattern, helper, or layout element is used across two or more places, abstract it into a narrowly owned, reusable component or utility[cite: 1].

### Context-Driven Folder & Directory Boundaries

- **Framework Directory Protection:** Respect framework-owned directories (`app/`, `pages/`, `public/`). Never move or relocate route entry points (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) or route-specific components out of these directories[cite: 1].
- **Root Directory Awareness:** Do **not** introduce a `src/` folder if the project currently uses a root `app/` directory (or vice versa). Keep existing root conventions intact[cite: 1].
- **Static Assets:** Place raw static files meant for direct public serving in `public/`[cite: 1].
- **Worktree Preparation:** In git worktrees, refresh from the remote default branch (`main` or target branch) before planning or editing without overwriting local uncommitted work[cite: 1].
- **Domain Boundaries:** Group code strictly by domain context or feature responsibility rather than raw technical abstractions[cite: 1].
- **Shared vs Route-Specific:**
  - Shared UI primitives, hooks, and execution utilities reside in shared top-level directories (`components/`, `hooks/`, `utils/`, `lib/`)[cite: 1].
  - Route-specific UI and components must reside strictly within `app/[route]/components/`[cite: 1].

### Single Export Rule & Module Boundaries

- **One Primary Public Export:** Each source file must contain at most **one primary public value export** (e.g., single React component, custom hook, service class, utility function, or constant collection)[cite: 1].
- **No Barrels or Re-Exports:** Do not create `index.ts` barrel files or multi-value re-export modules. Import directly from the implementing file to preserve tree-shaking, optimize server bundle splitting, and keep module boundaries clear[cite: 1].
- **Colocated Types:** Export interfaces and types directly from the implementation file that owns them. Move to shared type layers only when consumed across distinct domain boundaries[cite: 1].
- **Cohesive Constant Objects:** Do not export loose standalone constant primitives. Group related constants into single, typed, frozen/immutable objects located in the nearest appropriate context layer[cite: 1].

### Component & Logic Isolation & Server Boundaries

- **Server Components by Default:** Every component in `app/` is a Server Component by default. Perform data fetching, database access, and heavy processing directly on the server[cite: 1].
- **Client Component Guardrails (`'use client'`):** Add `'use client'` strictly at the top of leaf components that require browser interactivity, event listeners, framer-motion, or state hooks[cite: 1].
- **Presentational UI:** UI components must focus strictly on rendering markup and binding user interactions. Do not make raw API calls directly inside UI components[cite: 1].
- **Custom Hooks for Logic:** Extract non-UI state, API communications, and client side effects into custom hooks before duplication arises[cite: 1].
- **Pure Execution Utilities:** Offload transformations, calculations, and parsing to pure utility functions in `utils/` or `lib/`[cite: 1].
- **Maintainable Styling:** Prefer named design tokens, reusable components, or scoped CSS utility structures over massive, single-line Tailwind rule strings. Split long implementation files (>300 lines) as soon as responsibilities begin to mix[cite: 1].

---

## 2. Safe Refactoring & Modification Guardrails

### Refactoring Rules

- **Allowed Changes:** Small, incremental refactors within existing directories; creating targeted reusable modules; updating relative or path-aliased (`@/`) imports after approved file moves[cite: 1].
- **Disallowed Changes (Require Explicit Approval):**
  - Adding new dependencies or updating major library versions[cite: 1].
  - Structural folder migrations (e.g., moving `app/` to `src/` or migrating `app/` to `pages/`)[cite: 1].
  - Modifying Next.js configuration (`next.config.js` / `next.config.mjs`), build tooling, or middleware flows[cite: 1].
  - Modifying core API contracts, Server Action shapes, or global routing structures[cite: 1].
  - Automatically converting Server Components to Client Components without structural justification[cite: 1].
  - Adding new UI/CSS libraries[cite: 1].

---

## 3. Security Protocols & Secrets Management

Hardcoding secrets, credentials, or private keys directly in source code is strictly prohibited[cite: 1].

- **Absolute Environment Separation:** All API keys, connection strings, and environment configurations must reside exclusively in `.env` files (`.env`, `.env.local`, `.env.example`)[cite: 1].
- **Zero Hardcoded Secrets:** Never commit string literals representing API keys or secret tokens within source code, component props, mock datasets, or test fixtures[cite: 1].
- **Client-Safe Scoping (`NEXT_PUBLIC_`):**
  - Use the `NEXT_PUBLIC_` prefix **only** for variables intentionally exposed to the browser bundle[cite: 1].
  - Variables without `NEXT_PUBLIC_` (e.g., `DATABASE_URL`, `STRIPE_SECRET_KEY`) must **never** be imported or accessed inside Client Components[cite: 1].
- **Git Sanitation:** Ensure `.env` and `.env.local` are explicitly declared in `.gitignore`. Commit only sanitized `.env.example` templates[cite: 1].
- **Input & Env Validation:** Validate dynamic external inputs (API payloads, Server Action parameters, URL params) and runtime environment variables (`process.env`) using validation schemas (e.g., Zod) before application initialization or mutation execution[cite: 1].

---

## 4. Strict TypeScript & Performance Standards

- **Strict Mode:** Enforce `strict: true` in `tsconfig.json`[cite: 1].
- **Zero `any` Policy:** Do not use `any`. Use explicit interfaces, explicit type unions, or `unknown` paired with runtime type guard functions[cite: 1].
- **Type Narrowing Over Assertions:** Avoid `as Type` assertions unless interfacing with untyped third-party packages or native browser host objects; prefer type narrowing using type guards or schema parsing[cite: 1].
- **Explicit Boundaries:** Explicitly type all component props, page params (`params`, `searchParams`), hook signatures, service returns, and Server Action responses[cite: 1].
- **Immutability:** Treat state as immutable. Utilize `Readonly<T>` or `ReadonlyArray<T>` where mutation must be prevented at compile time[cite: 1].
- **Platform-Native Performance:** Avoid main-thread blocking, unnecessary re-renders, accidental quadratic loop paths, and unbounded memory buffering. Prefer standard browser/Node primitives (`Web Streams`, `AbortSignal`, `Web Workers`, `Microtasks`) over importing heavy micro-dependencies[cite: 1].
- **Next.js Optimization:** Leverage dynamic imports (`next/dynamic`), proper image optimization (`next/image`), and streamable UI boundaries (`Suspense`) to keep bundle sizes minimal and improve Core Web Vitals[cite: 1].