# Complete English Localization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure every user-visible string is English whenever `en-US` is selected.

**Architecture:** Preserve Chinese as the scanner source locale and complete the generated English locale catalog. Add a deterministic catalog validation check, audit scanner exclusions, and verify the generated output remains stable.

**Tech Stack:** Vue 3, Vite, Node.js static i18n scanner, JSON locale catalogs

## Global Constraints

- Keep first-launch system locale detection and manual locale persistence unchanged.
- Preserve all interpolation placeholders exactly.
- Do not modify unrelated pre-existing Yarn files.

---

### Task 1: Add English Catalog Validation

**Files:**
- Create: `frontend/scripts/check-english-i18n.mjs`
- Modify: `frontend/package.json`

**Interfaces:**
- Consumes: generated catalog plus `zh-CN.json` and `en-US.json` locale files.
- Produces: `npm run i18n:check-english`, exiting nonzero for missing, empty, Chinese-valued, extra-key, or placeholder-mismatched English entries.

- [ ] Write the validator and run it against the current catalog to observe the expected failure.
- [ ] Confirm the failure reports the current incomplete and untranslated English entries.

### Task 2: Complete English Translations

**Files:**
- Modify: `frontend/src/i18n/locales/en-US.json`

**Interfaces:**
- Consumes: message IDs and source strings from `catalog.json` and `zh-CN.json`.
- Produces: complete English strings with source placeholders preserved.

- [ ] Translate every reported empty or Chinese-valued entry.
- [ ] Run `npm run i18n:check-english` and confirm it passes.

### Task 3: Audit Localization Coverage

**Files:**
- Inspect: `frontend/src/**/*.{vue,js,ts}`
- Modify only scanner/runtime files if the audit identifies user-visible bypasses.

**Interfaces:**
- Consumes: scanner inclusion rules and frontend source files.
- Produces: catalog-backed English rendering for all user-visible frontend strings.

- [ ] Search scanner-excluded and locale-conditional code for hard-coded Chinese user-visible text.
- [ ] Correct any bypass through the established catalog mechanism and rescan.

### Task 4: Verify and Commit

**Files:**
- Modify generated locale files only as produced by the scanner.

**Interfaces:**
- Consumes: completed implementation.
- Produces: verified commit and pull request.

- [ ] Run the English validator, lint, production build, and catalog stability checks.
- [ ] Review the diff to exclude unrelated Yarn changes.
- [ ] Commit the implementation and create the pull request.

