---
name: secure-code-and-secrets
description: Security protocol for auditing secrets management, client vs server variable boundaries, input sanitation, authentication context, and CORS rules.
---

# Secure Code & Secrets Management

## Core Security Rules

### 1. Zero Hardcoded Secrets
* **Never Commit Tokens:** API keys, database URLs, private keys, or credentials must live strictly in `.env` files (`.env.local`)[cite: 1, 5].
* **Git Sanitation:** Ensure `.env` and `.env.local` are explicitly declared in `.gitignore`[cite: 1, 5]. Commit only sanitized `.env.example` templates[cite: 1, 5].
* **Secret Storage:** Production secrets must be loaded via secure secret managers (e.g., Google Cloud Secret Manager) rather than committed files.

### 2. Client vs. Server Boundary Protection
* **Framework Variable Prefixes:**
  * **Next.js:** Use `NEXT_PUBLIC_` exclusively for variables intentionally exposed to the browser bundle[cite: 1].
  * **Vite:** Use `VITE_` exclusively for variables exposed to client code via `import.meta.env`[cite: 5].
* **Private Secrets:** Private keys (e.g., `DATABASE_URL`, `STRIPE_SECRET_KEY`) must **never** carry client prefixes and must **never** be imported into Client Components (`'use client'`)[cite: 1, 5].

### 3. Input & Schema Validation
* **External Payload Sanitation:** Validate all dynamic external inputs (API payloads, Server Action arguments, URL query parameters, `localStorage` entries) using runtime schema validation (e.g., Zod)[cite: 1, 5, 6].
* **SQL Injection & XSS Prevention:** Use parameterized queries or ORMs for database operations[cite: 6]. Never inject unsanitized HTML into dynamic frontend renders[cite: 6].