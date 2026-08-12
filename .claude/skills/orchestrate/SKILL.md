---
name: orchestrate
description: >
  Splits a plan or task for the v2-portfolio (sulton.dev) Nuxt 4 frontend into properly-scoped
  implementation parts, dispatches each to a sub-agent, and manages them through review to
  completion. Use when a plan or a multi-part task is handed over for implementation, or when the
  user asks to orchestrate, delegate, or parallelize work. Do not trigger for planning itself (use
  `frontplan`) or for a one-file change.
---

# v2-portfolio Orchestration

**Your main job: take a plan or task, divide it into proper implementation parts, hand each part
to a sub-agent, and manage them to done.** You coordinate; you do not implement work an agent owns.

Everything you dispatch runs against the agents and skills in `.claude/`:

| Part | Agent / skill |
|---|---|
| `[impl]`, `[fix]` | `frontend-developer` agent |
| `[review]` | `frontend-reviewer` agent, or the `review` skill |
| Conventions for every agent | `project-frontend-expert` |

## Inputs

- A plan approved through `frontplan` — usually presented and approved inline via plan mode, not a
  persisted file, since this repo has no `docs/plans/` convention. If the user did ask `frontplan`
  to keep a file, read that file first.
- Or an approved inline task description.

Read the plan/task first. Read only enough extra code to split the work accurately — enough to
know which files each part owns.

**If the work is a new feature and there is no approved plan, stop and run `frontplan` first.** A
feature starts as a plan, not as code. Orchestrating an unapproved plan multiplies a wrong
decision across several agents.

## Environment restrictions — pass these to every agent

Binding on you and on everything you dispatch. State them in every brief; do not assume the agent
already knows.

- **`.env`** and any `*secret*` file: never read, never write, never edit.
- **Never edit or write to `app/template/`.** It is read-only prototype reference — read for
  design/copy context, never modified.
- **No git operations.**
- **No backend exists in this repo.** `useRuntimeConfig().public.useMockData` toggles mock data
  vs. `$fetch('/api/...')` against a service that isn't here — no part may assume a real response
  shape beyond what `app/types/*` declares.
- **Type/data contract discipline.** A required field added to `Project`/`Post`/`Service`/
  `TweakValues` must be backfilled across every entry in the matching `app/data/mock/*.ts` file —
  every part that changes a shared type reports this consequence.
- **No automated test suite exists.** Verification is `pnpm exec nuxi typecheck` plus a concretely
  described manual check in a running `pnpm dev` session — never "should work."

## Dividing the work

1. Create all implementation parts first.
2. Add one review part after implementation completes.
3. Add one fix part only if the review finds real issues.

How to cut the parts:

- **A part is a meaningful deliverable**, not a micro-step. "Project detail page shows live
  metrics with a loading state" — not "add a computed property".
- **One owner per file.** Two agents editing the same file is the main failure mode. If two
  deliverables touch the same component, they are one part, or they are sequenced.
- **Cut along the seams the codebase already draws** — a page and the section components under it
  (`app/components/<page>/`), a composable and the components that consume it, a domain entity end
  to end (type + enum + mock data + composable).
- **Shared foundations go first, alone.** A new/changed type in `app/types/`, a new enum, a change
  to `app/composables/useTweaks.ts` or `app/plugins/tweaks.client.ts`, or a shared UI primitive in
  `app/components/ui/` is a dependency for everything else — sequence it before its consumers,
  never beside them.
- **These files are single-owner, always, even across otherwise-parallel parts:**
  `app/assets/css/main.css`, `nuxt.config.ts`, `app/layouts/default.vue`, and each file under
  `i18n/locales/`. They are shared surface every part may need to touch (a new global class, a new
  locale key, a new module) — two agents editing the same file concurrently will overwrite each
  other's work, not merge. Either assign one of these to a single part that runs alone, or
  sequence the touches.
- **Contract first.** If a type or composable is shared by two parts, one part defines it and the
  other waits.
- **Keep the count honest.** Two real deliverables is two parts, not five.
- **Documentation is part of the deliverable**, not a separate part — an agent only touches
  `CLAUDE.md` if its change introduces a genuinely new architectural concept (rare).

Labels: `[impl] Project detail metrics panel` · `[review] Touched changes` · `[fix] Review findings`

## The brief each sub-agent gets

Exactly this, and nothing vaguer:

1. **Objective** — the deliverable, in one or two sentences.
2. **Scope** — the files/folders it owns, and the files it must **not** touch (name the
   single-owner files above explicitly if any are in play elsewhere).
3. **Constraints** — the environment restrictions above, plus `project-frontend-expert` as the
   convention source.
4. **Dependencies** — what is already done that it can rely on (a type, a composable); what it
   must not assume (a real backend, a locale key another part hasn't added yet).
5. **Acceptance criteria** — copied from the plan, observable.
6. **Verification** — `pnpm exec nuxi typecheck` during the loop; a concrete manual check in
   `pnpm dev` (which page, which locale(s), motion on/off, mobile width) before reporting done;
   `pnpm build` at the end if the part is more than trivial.
7. **Reporting** — prose only, no code dumps in the console; **state the data/type contract
   consequence of any shared type change**; ask rather than assume on anything critical.

## Running them

- **Fresh agent per part.** Do not reuse an agent across unrelated deliverables.
- **Parallel only where file ownership is genuinely disjoint** — and remember the single-owner
  files above disqualify "disjoint" even when the components involved look unrelated. When in
  doubt, sequence.
- Do not duplicate an agent's work locally while it owns the part.
- If an agent reports a blocker, resolve the dependency or re-scope the part — do not guess past
  it, and do not silently take the work back without saying so.
- **Treat an agent's report as a claim to check, not a fact.** If it says typecheck is clean and
  the browser check passed, the review part verifies that.

## Review cycle

- One review pass after all implementation parts complete.
- If it finds real issues, create **one** fix part carrying the full finding list.
- Re-review only if the fix changed behavior beyond the findings.
- Do not loop review→fix repeatedly unless the user asks.

## Closing out

When implementation and review are done:

1. Confirm `CLAUDE.md` was updated by any part whose change genuinely warranted it (new
   architectural concept) — most work won't need this.
2. **Consolidate the data/type contract impact** across all parts into one statement: which
   types/enums changed, whether additive or breaking, and which mock entries were updated as a
   result. Several parts each touching `Project` is one contract story, and the user needs it in
   one place.
3. If a plan file exists (the non-default case — see Inputs), note in it that the work was
   delivered; there is no `docs/plans/archive/` convention in this repo, so ask the user where
   they'd like it kept if they care.
4. Run final verification once:

```bash
pnpm exec nuxi typecheck && pnpm build
```

There is no automated test suite and no CI test gate in this repo — typecheck, production build,
and the manual browser checks each part already did are the entire verification story. Report the
real result of both commands, including any failure, rather than asserting success.

## Hard rules

1. Never manage git — no commits, branches, or pushes, by you or any agent.
2. Never widen scope beyond the approved plan/task. Work discovered mid-flight is reported, not
   absorbed.
3. Review only the touched changes, never the whole repository.
4. Never let two agents own the same file at the same time — `app/assets/css/main.css`,
   `nuxt.config.ts`, `app/layouts/default.vue`, and the `i18n/locales/*` files especially.
5. Call out blocked dependencies instead of guessing through them.
6. **Ask the user on anything critical** — a breaking type/contract change, a dependency on a
   backend endpoint that doesn't exist, a new global-state mechanism, or a genuine ambiguity in
   the plan. Do not let a sub-agent decide it either.

## Output

Keep it short and in prose. **No code, no diffs, no file dumps in the console.**

1. **Parts** — label, agent, scope, status, dependencies.
2. **Execution order** — what ran in parallel, what was sequenced, why.
3. **Result** — what was implemented, files changed, review findings and how they were resolved.
4. **Data/type contract impact** — the consolidated statement.
5. **Verification** — commands run and their real results, including anything that failed, plus
   what was manually checked in the browser.
6. **Open items** — blocked work, deferred findings, decisions the user still owns.
