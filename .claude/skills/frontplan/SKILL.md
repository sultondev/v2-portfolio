---
name: frontplan
description: >
  Frontend architecture and implementation planning for the v2-portfolio (sulton.dev) Nuxt 4 site.
  Use when the user asks for a plan, design, architecture, approach, or a written plan for new
  frontend functionality — new pages or sections, new components, new domain entities (projects,
  posts, services, or similar), i18n rollout, the tweaks/accent/motion system, migrating a piece
  of the app/template/ prototype into live Nuxt code, or wiring mock data to a real API. Do not
  trigger for direct coding of a small change, trivial fixes, or pure review work.
---

# v2-portfolio Frontend Planning

Produce a plan that tells an implementer **what to build, what constraints matter, and what must
stay in sync**. Do not write production code in the plan — signatures, prop/type shapes, and
locale-key lists are fine, full implementations are not.

Use `project-frontend-expert` for conventions. Read
`.claude/skills/project-frontend-expert/SKILL.md` before deciding anything — it encodes this
repo's actual component structure, data-layer pattern, i18n setup, icon policy, and styling system.

## Environment restrictions

Planning does not exempt you from the hard rules:

- **`.env`** and any `*secret*`/`*production*` file: never read, never write, never edit. If the
  plan depends on a value from one (e.g. `NUXT_PUBLIC_USE_MOCK_DATA`, a future API base URL),
  name the **variable** and list it under Open Questions rather than guessing its value.
- **No git operations** as part of planning.
- **No backend to connect to.** This repo has no `server/` or `/api` routes of its own — "the
  API" is an external service that doesn't exist in this codebase. Never assume its response
  shape beyond what `app/types/*` already declares; a plan that depends on unconfirmed upstream
  behavior lists it under Open Questions.
- **Never edit or import from `app/template/`.** It is the frozen React/JSX prototype — read-only
  design and content reference, not live code.

## Understand first

Read, in this order, only what the change actually touches:

1. `.claude/skills/project-frontend-expert/SKILL.md` for conventions
2. `CLAUDE.md` for the architecture overview and available commands
3. `nuxt.config.ts` — modules, i18n config, `runtimeConfig.public` (esp. `useMockData`,
   `siteUrl`) — before assuming any config exists
4. The existing shape of the affected domain: `app/types/*.ts`, `app/enums/*.ts`,
   `app/data/mock/*.ts`, and the matching `app/composables/use*Data.ts` fetch pattern
5. The relevant pages/components already in that area, to match established structure and class
   names rather than reinvent them
6. `i18n/locales/en.ts` (and the other three) for existing key naming/nesting before proposing new
   keys
7. If the feature exists in the prototype, the corresponding `app/template/app.jsx` /
   `styles.css` section — it is the source of truth for layout, copy, and behavior when porting;
   note where the plan intentionally deviates from it and why

If something you need is undocumented or unconfirmed, say so in the plan rather than guessing.

## Decide the surface first

This repo has no code "generations" to choose between — everything real lives under `app/`. What
a plan must still decide up front is **which of the following the change actually is**, because
each has a different shape:

- **A prototype migration** — the feature already exists in `app/template/` and needs to be
  ported into a Nuxt page/component. Design and copy come from the template; the plan's job is
  the Nuxt-idiomatic *how* (routing, data source, i18n keys, componentization), not new UX
  decisions.
- **New functionality with no prototype equivalent** — design must be decided fresh, following
  `project-frontend-expert` conventions (existing CSS vars/classes, glyph vs. `<Icon>` policy,
  component/folder naming).
- **A data-layer or infra change** — new/changed type in `app/types/`, a new mock/API composable,
  a tweaks-system addition, an i18n-only addition. No new page/component involved.

State which one this is at the top of the plan; it determines which sections below are load-bearing.

## What the plan must decide

Every plan answers these. Skip one only by saying why it does not apply.

**Ownership**
- Which folders own the change, respecting the existing strict separation: `app/types/`,
  `app/enums/`, `app/data/mock/`, `app/composables/`, `app/components/<area>/`, `app/pages/`,
  `i18n/locales/`
- Whether a new component folder/prefix is warranted, or the work belongs in an existing one

**Data & type contract**
- New/changed fields on domain types (`Project`, `Post`, `Service`, or a new entity), and whether
  the change is additive or **breaking** (renamed/removed/retyped field) — a break touches the
  mock data, every consuming component, and the eventual real API's expected shape simultaneously
- The composable's new/changed function signatures (`fetch*`), following the existing
  mock-vs-`$fetch('/api/...')` branch — name the `/api/...` path even though nothing serves it yet,
  so the contract is spec'd for whoever builds that backend later
- New/updated mock data entries needed to exercise the feature realistically
- What the UI does while data is pending, empty, or the fetch throws — this repo currently has no
  error-state handling in the data composables; decide explicitly whether this feature needs one
  or inherits the current no-op behavior

**UI & interaction rules**
- The invariants, stated as testable sentences (e.g. "the dropdown closes on outside click and
  restores focus to the trigger", "reveal-in fires once per element per route")
- Keyboard and ARIA behavior for any new interactive control — match `Dropdown.vue`'s pattern
  (roving focus, `aria-expanded`/`aria-selected`/`role`) rather than inventing a new one
- Whether the element participates in the `.reveal` scroll-in system, and whether it must still
  work correctly with `tweaks.motion` off (everything visible immediately, no observer)
- Whether the element reads `tweaks.accent`/`cyber` and needs the `--accent`-style inline style
  pattern used by `ProjectCover`/project-detail pages
- Responsive behavior at the breakpoints already implied by existing components (mobile nav,
  `clamp()`-based type scale) — no new breakpoint system

**State, lifecycle & rendering**
- Any new global state: does it belong in `useTweaks`-style `useState`, or is local component
  `ref`/`reactive` sufficient? Don't introduce a state library.
- SSR/hydration safety: anything touching `window`/`document`/`localStorage` must be guarded
  (`onMounted`, a `.client.ts` plugin, or `<ClientOnly>`) since pages render on the server by
  default — flag any new browser-only API use explicitly
- Whether new state needs to persist (cookie/localStorage) or is session-only, and where that
  persistence is written (mirroring how `tweaks.client.ts` owns DOM/CSS side effects, not the
  composable itself)

**i18n**
- Every new user-visible string gets a key added to **all four** locale files
  (`en.ts`/`uz.ts`/`ru.ts`/`de.ts`), named to match the existing dotted nesting
  (`section.field`, `form.opt.x`) — list the exact keys and their English copy in the plan
- Whether any copy is sourced from `app/template/i18n.jsx` (legacy prototype dictionary) and
  needs re-translating/adapting rather than copy-pasting verbatim

**Styling**
- Which existing global classes/CSS custom properties from `app/assets/css/main.css` this reuses
  — grep before proposing new ones
- Any genuinely new classes: they go in `main.css`, not a new scoped `<style>` block, unless the
  component is a teleported/portal-style overlay with no equivalent existing class (the
  `TweaksPanel.vue` exception)

**External integration**
- Any third-party service touched (`@vercel/analytics`, browser geolocation/clipboard/etc.,
  a future contact-form endpoint) and its degraded behavior when unavailable or blocked
- Whether the change depends on a backend endpoint that doesn't exist in this repo — if so, that
  dependency is an Open Question addressed to the user, not an assumption

**Verification**
- This repo has no automated test suite (no Vitest/Playwright configured) and no CI gate — the
  plan's verification section is a manual checklist: `pnpm exec nuxi typecheck` must pass clean,
  plus the specific pages/interactions to click through in a running `pnpm dev` session (golden
  path and the concrete edge cases listed above — empty list, long text overflow, all four
  locales, `motion` off, mobile width), per this project's UI-testing requirement
- If the plan is large enough that a first automated test would set a real precedent, say so
  explicitly rather than silently adding one test file

**Documentation sync**
- Whether `CLAUDE.md`'s Architecture section needs an update (new top-level concept, new module,
  changed data model) — most small features don't need this; say so when true

Make the decision when the sensible path is clear. Present options only when the trade-off is real
and consequential — then recommend one.

## Output

This repo is a small solo project with no `docs/plans/` convention. Default to presenting the plan
through Claude Code's plan-review flow (enter plan mode, write the plan, get explicit approval
before touching files) rather than inventing a persisted-file convention that doesn't exist here.

Only write a plan to a file (in a location the user names) if the user asks for one to keep, or the
work is large enough to reasonably span multiple sessions.

**Nothing is implemented before the user approves the plan.**

Structure, whether presented inline or as a file:

```md
# {Title}

> One-line summary.

## Surface

Which of the three kinds this is (prototype migration / new functionality / data-layer change),
and why.

## Context

What exists today and why the change is needed. Name the files that own the current behavior.

## Scope

### In scope
### Out of scope

## Key Decisions

Decision → rationale. Include rejected alternatives only where the choice was genuinely close.

## Data & Type Contract

Type/enum changes, composable signatures, mock data additions. Mark breaking changes.

## UI & Interaction Rules

Numbered, testable invariants — including keyboard/ARIA behavior and the negative/edge cases.

## State, Lifecycle & Rendering

New state and where it lives; SSR/hydration guards needed.

## i18n

New keys, per locale file, with the English copy.

## What To Implement

Ordered, meaningful units of work — deliverables, not code chores. Note dependencies between them.

## Verification

Manual checklist: typecheck + concrete pages/interactions/edge cases to click through.

## Documentation Sync

## Acceptance Criteria

Observable and specific. A reviewer must be able to check each one against the running app.
```

## Writing rules

- Units of work are meaningful deliverables ("project detail page shows live metrics with a
  loading skeleton"), not chores ("add a computed property").
- Negative/edge cases are concrete. "Handle edge cases" is not a plan.
- Acceptance criteria are observable — a rendered element, a typecheck pass, a specific piece of
  copy in a specific locale, a keyboard interaction that works. Not "works correctly".
- Do not prescribe git workflow.
- Do not prescribe agent sequencing unless the user asked for orchestration.
- If the plan requires a config value or piece of environment knowledge you are not permitted to
  read, or a backend endpoint that doesn't exist yet, list it under **Open Questions**.
- Note any pre-existing gap the plan will have to live alongside so the implementer isn't
  surprised — no error-state handling in the data composables today, no automated tests, the
  contact form's `onSubmit` is a stubbed TODO.

## Reporting

Present the plan's **substance in prose** — do not paste the whole plan back into the console
if it's already visible via plan mode. Summarize the decisions and open questions, and ask for
approval.

**Ask, don't assume**, on anything critical: a breaking type change, a dependency on a backend
endpoint that doesn't exist, a new global state mechanism, or a requirement whose readings lead to
materially different work. Put genuine unknowns under Open Questions rather than picking silently.

## Quality check

Before presenting, verify:

- You read the current code, not just this skill's description of it
- The plan states which surface (migration / new / data-layer) it is
- The plan matches this repo's real structure and conventions (`project-frontend-expert`) — no
  VueUse, no new state library, no scoped-CSS-by-default, no edits under `app/template/`
- Every new user-visible string has all four locale keys listed
- SSR/hydration safety is addressed for any browser-only API use
- Breaking type/contract changes are called out explicitly
- Acceptance criteria are checkable against the running app
- Nothing in the plan requires reading `.env` or a secret file
- Nothing in the plan silently assumes a backend endpoint exists
