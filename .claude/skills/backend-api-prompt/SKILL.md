---
name: backend-api-prompt
description: Generates a very detailed, self-contained prompt for a back-end AI developer to implement the REST API that the sulton.dev Nuxt 4 UI consumes — exact data shapes, enums, query params, ordering, featured/related/limit semantics, localisation, 404/400 behaviour, seed data and acceptance criteria, all derived from the current UI code (types, mock data, composables, pages). Use when the user asks for a "backend prompt", "API prompt/spec", "generate API for <entity>", "what should the API return", or wants to replace mock data with a real API.
argument-hint: "[entity|all] [stack?] [task name?]  e.g. photos | all nestjs+postgres | photos nuxt-server \"photos api\" | update 002"
---

# Back-end API prompt generator

The front end is the contract. There is no `server/` in this repo: pages read data through `use*Data()` composables that either return mock arrays (`runtimeConfig.public.useMockData === 'true'`) or call `$fetch('/api/…')`. Your job is to read the **current UI code** and write a prompt that lets a back-end AI, **with no access to this repo**, build an API whose responses drop into the UI unchanged.

You only read app code and write one Markdown file. Never edit `app/`, `i18n/` or `app/template/`; never read `.env` or `*secret*` files.

## 1. Resolve scope

Argument 1 picks the entities (default `all`):

| Argument | Entities |
|---|---|
| `projects` | Project (+ `ProjectCategory`, `ProjectStatus`, cover) |
| `posts` / `blog` | Post |
| `photos` | Photo (+ `PhotoGroup`) |
| `services` | services, pricing tiers, FAQ |
| `stack` | tech stack |
| `contact` | contact form submission |
| `all` | everything above, plus anything new you discover in `app/types` / `app/composables` |

Argument 2 (optional) is the target stack (e.g. `nestjs+postgres`, `nuxt-server`, `laravel`). Without it, the prompt tells the back-end AI to choose and justify a stack, recommending Nuxt `server/api/*` routes or a separate service behind a same-origin `/api` proxy.

## 2. Discover — read, don't assume

For each entity in scope, collect facts from these sources (`Glob`/`Grep`/`Read`):

1. **Type** — `app/types/<entity>.ts`: every field, its type, optionality (`?`), unions, nested objects. Copy verbatim.
2. **Enums** — `app/enums/*.ts`: every member *and its string value* (the value is what goes on the wire).
3. **Mock data** — `app/data/mock/<entity>.ts`: count of items, real example values, formats of ids / slugs / `num` / dates / colours / palettes / ratios, which items are `featured`, the default order.
4. **Composable** — `app/composables/use<Entity>Data.ts`: every `$fetch` URL, its query params, the generic return type (`T[]` vs `T | null`), and the **mock branch logic** next to it (filter / sort / slice / related rules). The mock branch is the reference implementation — the API must reproduce it exactly.
5. **Consumers** — grep for the composable name, the type name and the mock constant across `app/pages` and `app/components`. For each consumer, note:
    - which fields are actually rendered and where (card, detail page, lightbox, meta row…);
    - client-side filtering, counting, sorting, grouping, "load more"/pagination page size;
    - `useAsyncData` keys (SSR: the call runs on the server during render, then on client navigation);
    - null handling (`throw createError({ statusCode: 404 })` on detail pages).
6. **i18n** — which fields are translation keys into `i18n/locales/{en,uz,ru,de}.ts` (e.g. posts' `titleKey` → `post.<id>.t`, `excerptKey` → `post.<id>.x`, body `post.<id>.b1–b3` when `hasBody`) versus literal text (project content is English-only). Supported locales and the `sulton.lang` cookie (strategy `no_prefix`).
7. **Gaps** — UI data with **no endpoint yet**: mock files imported directly by components (e.g. `services.ts`, `stack.ts`) and forms with no submit target (e.g. `pages/contact.vue`). These become *proposed* endpoints.

Every fact in the prompt must trace to one of these sources. Anything you add beyond them is labelled **(proposed)**.

## 3. Derive the contract

Per endpoint, settle:

- **Method + path**, query params with type, default, allowed values and validation (e.g. `limit` positive int, `featured` boolean string).
- **Response schema** — TypeScript interfaces copied from `app/types`, enums inlined as string-literal unions with their values; plus **one realistic JSON example built from the mock data** (real slugs, real values).
- **Semantics** mirrored from the mock branch: ordering, what `featured=true&limit=N` returns, how `related` is chosen and that it excludes the item itself, what happens when fewer than `limit` items exist.
- **Status codes** — `200`; `404` for unknown slug (the UI turns null/404 into its 404 page); `400` for invalid params; error body `{ statusCode, message }`.
- **Client-side work** the UI does today (category/group filters, counts) → listed as "optional server-side support; the UI does not require it".
- **Localisation** — present the two options as an open decision, don't pick one silently:
  A. keep returning translation keys (UI unchanged, texts stay in the front-end locale files);
  B. return resolved text per `?lang=` / `Accept-Language` (en, uz, ru, de; fallback en) — requires a front-end change, say so.
- **SSR / origin** — the UI calls relative `/api/*` both from the Nuxt server and the browser: same origin, no CORS needed if served via Nuxt `server/` or a reverse proxy; otherwise state the CORS/`baseURL` requirement.

## 4. Write the prompt

Every generated prompt is saved as a **numbered task file** in `docs/backend-api-prompt/` at the repo root, so the folder becomes a history of back-end tasks:

- **Folder:** `docs/backend-api-prompt/` — create it if missing.
- **Task number:** list `docs/backend-api-prompt/*.md`, take the highest leading number, add 1, zero-pad to 3 digits (`001`, `002`, …). Empty folder → `001`.
- **Name:** kebab-case slug of the scope plus the optional task name argument — ASCII only, ≤ ~40 chars. Examples: `001-all.md`, `002-photos-api.md`, `003-contact-submit.md`.
- **Never overwrite.** Each run creates a new file. Only when the user explicitly asks to update an existing task (`update 002 …`) rewrite that file in place, keeping its number and name.
- **Header block** at the top of the file:

  ```markdown
  # Task 002 — Photos API
  - Scope: photos
  - Stack: nuxt-server (or "back-end AI chooses")
  - Generated: YYYY-MM-DD
  - Sources: app/types/photo.ts, app/enums/photo.ts, app/data/mock/photos.ts, app/composables/usePhotosData.ts, app/pages/photos.vue, …
  ```

The prompt itself is English Markdown and self-contained — the reader has never seen this repo. After the header, use exactly these sections:

1. **Role & goal** — "You are a senior back-end developer. Build the REST API consumed by an existing Nuxt 4 front end (sulton.dev portfolio). The front end is fixed: responses must match the schemas below exactly." + stack (given, or "choose and justify").
2. **Product context** — what the site is (personal portfolio: projects, blog, photos, services, contact), who uses which page, and that it currently runs on mock data.
3. **Global conventions** — base path `/api`; JSON; camelCase keys; date format as found in mocks; id / slug / `num` rules; error body; locale handling (link to open decision); SSR/CORS note; no auth for public GETs.
4. **Data model** — one subsection per entity: TS interface, enums with values, a field table (field · type · required · meaning · where the UI shows it · constraints/format), storage suggestion (table/collection, indexes on `slug`, `featured`, ordering field).
5. **Endpoints** — a summary table (method · path · params · returns · used by), then one detail block per endpoint: request, response schema, JSON example from mocks, ordering, mock-equivalent logic in plain words, errors.
6. **UI ↔ data map** — per page/component: which endpoint it calls and which fields it renders, so nothing the UI needs is missing and nothing it ignores is required.
7. **Proposed endpoints (not yet wired in the UI)** — services/pricing/FAQ, stack, `POST /api/contact` (fields from the form, validation, response, spam/rate-limit note). Clearly marked *proposed*; shapes from the existing mock types/form fields.
8. **Seed data** — instruct to seed from the mock content; embed it as JSON (full set if small, otherwise 2–3 items per entity plus the total count and the rules for the rest).
9. **Acceptance criteria** — a checkbox list, testable with curl, e.g. `GET /api/projects` returns N items matching the schema in mock order; `GET /api/projects/<unknown>` → 404; `?featured=true&limit=3` → 3 featured items; `/api/posts/<slug>/related?limit=2` excludes `<slug>`; enum values exactly as listed.
10. **Open decisions for the owner** — locale strategy (A/B), admin CRUD + auth, media hosting (e.g. photos are placeholders today, no image field), server-side vs client-side filtering/pagination, caching.

## 5. Self-check before reporting

- Every `$fetch` call in `app/composables/*.ts` in scope appears in §5 with the same path and params (grep them again and tick them off).
- Every field of every type in scope appears in §4 with the same name, type and optionality; enum values match `app/enums` character for character.
- JSON examples conform to their schemas and use real mock values.
- Proposed items are labelled; open decisions are listed, not silently resolved.
- No secrets, no `.env` values, no personal data beyond what the public site shows.

## 6. Report in chat

Short: the new task number and file path (`docs/backend-api-prompt/NNN-name.md`), entities covered, number of endpoints (existing / proposed), open decisions. Don't paste the prompt into chat.

Regenerate whenever `app/types`, `app/enums`, `app/data/mock` or `app/composables` change — as a new numbered task, or `update NNN` to refresh an existing one — so the prompts stay in sync with the UI.
