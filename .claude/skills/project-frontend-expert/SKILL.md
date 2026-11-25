---
name: project-frontend-expert
description: Use for any frontend work in this repo (v2-portfolio) — creating or editing Vue components, pages, composables, i18n strings, icons, or styles. Encodes this project's specific Nuxt 4 + TypeScript + nuxt-icon conventions so new code matches the existing codebase instead of generic Nuxt/Vue defaults.
---

# v2-portfolio frontend conventions

This is a Nuxt 4 personal portfolio (`sulton.dev`), migrated from a vanilla-React
prototype that still lives at `app/template/` for reference only. **Never edit or
import from `app/template/`** — it's frozen design source-of-truth, not live code.
All real UI lives under `app/` (Nuxt 4 `srcDir` layout: `app/components`,
`app/pages`, `app/composables`, etc., auto-imported).

Stack: Nuxt 4, Vue 3 `<script setup lang="ts">`, `@nuxtjs/i18n`, `@nuxt/icon`,
`@vercel/analytics`. Package manager is **pnpm** — never npm/yarn. No VueUse, no
Pinia, no CSS framework (no Tailwind/UnoCSS) — everything is hand-rolled.

## Component structure

Every component is `<script setup lang="ts">` first, `<template>` second. Scoped
`<style>` is rare — almost all styling comes from global classes in
`app/assets/css/main.css`; only add a component-local `<style scoped>` block for
something truly one-off (e.g. `TweaksPanel.vue` does this because it's a
teleported floating panel with no equivalent global classes).

Props/emits use the generic type-only syntax, not runtime declarations:

```ts
const props = defineProps<{
  project: Project
  index?: number
}>()

const emit = defineEmits<{
  change: [value: string]
}>()
```

Use Vue 3.5's reactive props destructure for defaults, not `withDefaults`:

```ts
const { label = '', block = false } = defineProps<DropdownProps>()
```

not `const props = withDefaults(defineProps<{...}>(), {...})`. Reference `props.x`
inside `<script>` is gone — use the destructured names directly, including
inside `computed`/functions (Vue's compiler keeps them reactive).

Prefer `interface`/`type` imports from `~/types/*` over inline object shapes
when the shape is a domain entity (`Project`, `Post`, `Service`) *or* a
component's own prop shape is non-trivial/reusable (see
`app/types/dropdown.ts` / `DropdownProps`). Keep genuinely small inline shapes
(1–2 fields, already referencing a domain type from `~/types/*`, e.g.
`{ project: Project, index?: number }` on `ProjectCard`) inline — don't create
a one-off type file just to wrap an existing type.

**`defineEmits<{...}>()` shapes are always extracted to `app/types/*`**, unlike
props — even a single-event emit (`{ change: [value: string] }`) gets a named
`<Component>Emits` interface, e.g. `DropdownEmits`, `BlogPaginationEmits`. Put
it alongside the component's `Props` type in the same file when one already
exists (`app/types/dropdown.ts`); otherwise create
`app/types/<component-name-in-kebab-case>.ts` for it alone (see
`app/types/blog-pagination.ts`, whose component's props stay inline but whose
emit doesn't).

## File naming & auto-import prefixes

Nuxt's default path-based prefixing is in effect — components in a subfolder are
auto-imported with the folder name prefixed:

- `app/components/ui/Dropdown.vue` → `<UiDropdown />`
- `app/components/ui/LangSwitcher.vue` → `<UiLangSwitcher />`
- `app/components/home/HeroSection.vue` → `<HomeHeroSection />`
- `app/components/project/ProjectCard.vue` → `<ProjectCard />`
- `app/components/blog/BlogPostRow.vue` → `<BlogPostRow />`

Root-level components (`TheNav.vue`, `TheFooter.vue`, `TheLoader.vue`,
`TweaksPanel.vue`) use a `The*` prefix by convention for singleton/layout
components and register with no folder prefix. When adding a new component,
match this: page-section components go in a folder named after the page
(`home/`, `blog/`, `services/`, `project/`), cross-page primitives go in `ui/`,
app-wide singletons go flat at the root as `The*`.

## Data layer: mock/API toggle

Every domain composable (`useProjectsData`, `usePostsData`, …) reads
`useRuntimeConfig().public.useMockData` and branches between an in-repo mock
array (`app/data/mock/*.ts`) and a real `$fetch('/api/...')` call. Follow this
exact shape for any new data composable:

```ts
export const useProjectsData = () => {
  const config = useRuntimeConfig()
  const useMock = config.public.useMockData === 'true'

  const fetchProjects = async (): Promise<Project[]> => {
    if (useMock) return MOCK_PROJECTS
    return $fetch<Project[]>('/api/projects')
  }

  return { fetchProjects }
}
```

Toggle lives in `.env` as `NUXT_PUBLIC_USE_MOCK_DATA`. Do not special-case mock
vs. API logic inside components or pages — components only call the composable.

**Strict separation of concerns across folders — do not co-locate:**

- `app/types/` — interfaces (`Project`, `Post`, `Service`, `TweakValues`)
- `app/enums/` — TS enums (`ProjectCategory`, `ProjectStatus`)
- `app/data/mock/` — mock data arrays, one file per entity
- `app/composables/` — `use*` data/state composables
- `app/plugins/` — `.client.ts` plugins for browser-only side effects

## Data fetching in pages

Pages call `useAsyncData` with an explicit string key, **wrapped in an arrow
function** — never pass the composable's fetch function directly, since
`useAsyncData` injects `nuxtApp` as an implicit first argument and breaks
functions that take optional params:

```ts
// correct
useAsyncData('featured-projects', () => fetchFeaturedProjects())
// wrong — TS2769 AsyncDataHandler mismatch when fetchFeaturedProjects has optional args
useAsyncData('featured-projects', fetchFeaturedProjects)
```

Parallel fetches use `Promise.all([...])` destructuring multiple `useAsyncData`
calls (see `app/pages/projects/[slug].vue`). Missing dynamic-route data throws
via `createError({ statusCode: 404, statusMessage: '...' })`, checked
immediately after the fetch, before any template renders. SEO uses
`useSeoMeta({...})` near the end of `<script setup>`, after data is resolved so
title/description can reference it.

## TypeScript strictness

The project targets a clean `nuxi typecheck` — no `any`, no suppressions. Fix
type errors properly (narrow types, add generics, guard nullables) rather than
casting past them. Run `nuxi typecheck` (or `pnpm exec nuxi typecheck`) after
non-trivial edits.

## i18n

Uses the `@nuxtjs/i18n` module (**not** a custom composable) — locale files are
plain `defineI18nLocale`-free TS objects at `i18n/locales/{en,uz,ru,de}.ts`,
configured in `nuxt.config.ts` (`strategy: 'no_prefix'`, cookie-based detection,
`en` default). In components: `const { t } = useI18n()`, then `{{ t('key') }}` in
templates or `t('key')` in script. Nested/dotted keys (`'nav.home'`,
`'form.opt.web'`) mirror the locale file's nested object shape. When adding new
UI copy, add the key to **all four** locale files, not just `en.ts`.

Do not confuse this with the legacy `window.I18N` / `useT()` system described for
`app/template/i18n.jsx` — that was the old prototype's approach and has been
fully replaced by `@nuxtjs/i18n` in the live app.

## Icons

`@nuxt/icon` is installed and registered as a Nuxt module, giving global access
to `<Icon name="..." />` backed by Iconify (any `collection:icon-name`, e.g.
`heroicons:arrow-right`, `lucide:github`). **Current live components don't use
it yet** — existing UI icons are hand-written Unicode glyphs/characters (`→`,
`↗`, `✓`, `✕`, `▾`, `★`) inline in templates, matching the prototype's terminal/
glyph-driven aesthetic. When asked to add a "real" icon (not a directional arrow
already covered by the existing glyph convention), prefer `<Icon name="..." />`
over inventing another Unicode glyph — pick an Iconify collection consistent
with what's already imported/used elsewhere if any exists, otherwise `lucide` or
`heroicons` are safe, commonly-bundled defaults. Keep purely decorative
directional/status marks (arrows, checkmarks, bullets) as plain glyph
characters to stay consistent with current components — don't retrofit existing
glyphs to `<Icon>` unless asked.

## Styling & theme

All styling is global CSS in `app/assets/css/main.css`, loaded via `css:
['~/assets/css/main.css']` in `nuxt.config.ts`. Key custom properties defined on
`:root`:

```
--bg / --bg-1 / --bg-2 / --bg-3     background layers
--line / --line-strong              hairline borders
--ink / --ink-2 / --ink-3 / --ink-4 text, in descending emphasis
--accent / --accent-ink / --accent-glow   live-editable accent (see Tweaks)
--danger / --warn                   status colors
--radius / --radius-lg              border radii
--maxw / --pad                      container width & responsive padding
--cyber                             0..1 cyberpunk atmosphere dose
```

Prefer reusing existing utility/component classes (`.section`, `.container`,
`.btn`, `.btn-primary`, `.section-label`, `.reveal`, `.badge`, `.card`-style
patterns) over inventing new class names — grep `main.css` for a fitting class
before adding new CSS. Per-project accent colors are injected as inline
`:style="{ '--accent': project.accent }"` on a wrapping element, not as new CSS
classes.

## The tweaks system

`useTweaks()` (`app/composables/useTweaks.ts`) holds `{ accent, cyber, motion }`
in a `useState('tweaks', ...)` global store, exposed as `readonly`, mutated only
via `setTweak(key, value)`. `app/plugins/tweaks.client.ts` watches this state and
writes `--accent`/`--accent-glow`/`--cyber` CSS vars plus `data-motion` onto
`<html>`/`<body>`. `layouts/default.vue` reads `tweaks.value.motion` to decide
whether to wire up an `IntersectionObserver` for `.reveal` scroll-in elements
(recreated on every route change) or just mark everything `.in` immediately.
Any new scroll-reveal content should use the existing `.reveal` class, not a new
mechanism.

## Routing & pages

File-based routing under `app/pages/`. Dynamic segments (`[slug].vue`) read
`useRoute().params.slug`. No manual router config — this project doesn't use
`vue-router` APIs directly beyond `useRoute()`/`NuxtLink`. Internal links are
always `<NuxtLink to="...">`, never `<a href>`, except for genuinely external
URLs (which get `target="_blank" rel="noreferrer"`).

## Interaction primitives — no VueUse

Click-outside, keyboard nav, drag, and intersection logic are all hand-rolled
with plain DOM listeners in `onMounted`/`onUnmounted` (see `Dropdown.vue`'s
`onDocClick`, `TweaksPanel.vue`'s drag handling). Don't introduce `@vueuse/core`
or similar utility libraries — match the existing plain-DOM-API style.
