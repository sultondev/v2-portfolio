---
name: portfolio-frontend
description: House rules for front-end work on the sulton.dev Nuxt 4 portfolio — adding or changing pages, components, sections, styles, translations, mock data, or porting pieces from the app/template React prototype. Use for any UI, CSS, i18n, or content change in this repo.
---

# sulton.dev front-end

Nuxt 4 + Vue 3 `<script setup lang="ts">`, `@nuxtjs/i18n`, one global stylesheet. Dark "design-engineer / cyber terminal" aesthetic. Follow the existing patterns below rather than introducing new libraries (no Tailwind, no UI kit, no icon packs, no state library).

## Before you change anything

1. Find the closest existing page/component and copy its shape. Good references:
   - list page with filters + load more → `app/pages/projects/index.vue`
   - detail page with 404 → `app/pages/blog/[slug].vue`, `app/pages/projects/[slug].vue`
   - home section → `app/components/home/AboutSection.vue`
   - accessible custom control → `app/components/ui/Dropdown.vue`
2. Search `app/assets/css/main.css` for an existing class before writing new CSS. Its `/* === Name === */` banners index the file (Tokens, Buttons, Tag/chip, Projects grid, Page header, Filter bar, Services, Pricing, FAQ, Blog, Contact, Reveal, Responsive, Project Detail, Custom Dropdown, Blog Detail, Pagination…).
3. If matching the original design, look at `app/template/app.jsx` + `styles.css` (React prototype, reference only — never edit or import it).

## Components & pages

- Auto-imported; name comes from the folder path: `components/home/HeroSection.vue` → `<HomeHeroSection />`, `components/ui/Dropdown.vue` → `<UiDropdown />`, `components/project/ProjectCard.vue` → `<ProjectCard />` (duplicate prefix collapses). Global singletons are `The*` at the root of `components/`.
- Put a new home section in `components/home/`, add it to `pages/index.vue`, and number its title (`<span class="num">0N</span>`) consecutively.
- Props via `defineProps<{...}>()` (with `withDefaults` when needed), events via typed `defineEmits<{ change: [value: string] }>()`. Custom form controls here use a `value` prop + `change` event, not `v-model`.
- Every page sets `useSeoMeta({ title: \`${t('…')} — sulton.dev\`, description: t('…') })`.
- Data loading: `const { data } = await useAsyncData('<unique-key>', fetchX)`; detail pages key by slug (`post-${slug}`) and `throw createError({ statusCode: 404, statusMessage: '… not found' })` when null.
- Internal links are `<NuxtLink>`; decorative glyphs/arrows get `aria-hidden="true"`.

## Page skeleton

```vue
<template>
  <section class="page-header container compact">
    <span class="section-label">/ {{ t('nav.x').toLowerCase() }}</span>
    <h1>{{ t('x.h1') }}</h1>
    <p>{{ t('x.lead') }}</p>
  </section>

  <section class="section container">
    <div class="section-head">
      <div>
        <span class="section-label">{{ t('x.label') }}</span>
        <h2 class="section-title"><span class="num">01</span>{{ t('x.title') }}</h2>
      </div>
    </div>
    <!-- content -->
  </section>
</template>
```

## Styling

- **All CSS goes in `app/assets/css/main.css`**, in (or as) a `/* === Section === */` block. Don't add `<style scoped>` — the only exception is `TweaksPanel.vue`, a self-contained dev overlay.
- Use tokens, never raw colours: surfaces `--bg`, `--bg-1..3`; borders `--line`, `--line-strong`; text `--ink` (primary) → `--ink-2` → `--ink-3` (labels/meta) → `--ink-4` (faint); `--accent` / `--accent-ink`; `--danger`, `--warn`; `--radius` (4px), `--radius-lg` (12px); layout `--maxw`, `--pad`.
- Glows use the RGB triplet: `rgba(var(--accent-glow), 0.25)`. Never hard-code `#7CFF6B` / `124,255,107` — the accent is user-changeable via the tweaks panel (a few legacy inline styles in `contact.vue` do this; don't copy them).
- Cyber effects scale with `--cyber` (0–1), e.g. `opacity: calc(var(--cyber) * 0.18)`.
- Typography: Geist for prose, Geist Mono (`.mono`, or `font-family: "Geist Mono", monospace`) for labels, buttons, meta, numbers. Headings are tight: negative letter-spacing (`-0.03em`/`-0.04em`), weight 600, `clamp()` font sizes.
- Building blocks to reuse: `.container`, `.section`, `.section-head`, `.section-label`, `.section-title .num`, `.btn` + `.btn-primary | .btn-ghost | .btn-link` (+ `.btn-sm`) with `<span class="arrow">→</span>`, `.tag` (`.tag.live` = pulsing dot), `.chip` with `aria-pressed` for filters.
- Responsive: main breakpoint is `@media (max-width: 960px)` in the "Responsive" block, which collapses the multi-column grids to `1fr` — add a new grid class to that selector list. Smaller tweaks use 860/720/640px.
- Inline `style=""` is tolerated for one-off spacing only; anything reusable becomes a class.

## Motion

- Add `class="reveal"` to fade/slide in on scroll; the default layout's IntersectionObserver adds `.in`. Stagger lists with `:style="{ transitionDelay: \`${i * 60}ms\` }"`.
- Every new animation must stop when motion is off: guard with `html[data-motion="0"]` / `body[data-motion="0"]` **and** `@media (prefers-reduced-motion: reduce)`.

## i18n

- `const { t } = useI18n()`; interpolate with `t('key', { n })` → `{n}` in the string.
- No hard-coded user-visible strings in templates (existing exceptions like "No projects in this category yet." and "read →" are debt, not precedent).
- Add each new key to **all four** files `i18n/locales/{en,uz,ru,de}.ts` at the same position — they are kept line-for-line parallel (same line count). Write real translations, not English copies.
- Arrays/data that need translation store a **key**, not text (`titleKey`, `nameKey`, `svc.key` → `t(\`${svc.key}.t\`)`). Blog posts: `post.<id>.t` title, `.x` excerpt, `.b1–.b3` body (only when `hasBody: true`). Project content in `projects.ts` is English-only by design.
- `useSeoMeta` evaluates `t()` once; if a title must follow a live locale switch, pass a getter: `title: () => t('…')`.

## Data

- Types in `app/types/*.ts`, string enums in `app/enums/`. Use the enums (`ProjectCategory.Web`) rather than string literals in code.
- Mock data in `app/data/mock/*.ts` (`MOCK_PROJECTS`, `MOCK_POSTS`, `MOCK_SERVICES`, `MOCK_PRICING_TIERS`, `MOCK_FAQ`, `STACK`).
- Projects/posts are read only through `useProjectsData()` / `usePostsData()`. A new fetcher must implement both branches: mock (`config.public.useMockData === 'true'`) and `$fetch('/api/…')`. There's no `server/` yet, so mock is the working path.
- New project entries need every `Project` field, a unique `slug` and `num`, an `accent` colour, and `cover: { kind, palette: [c1, c2], glyph? }` where `kind` is a `CoverKind` already rendered by `ProjectCover.vue` (add the art branch + CSS if introducing a new kind).
- Shared client state uses `useState('<key>')` inside a composable (see `useTweaks`), not Pinia.

## Verify

- `pnpm dev` and check the page at http://localhost:3000 at desktop and ≤960px width, in at least two locales (switcher in the nav), and with motion toggled off in the tweaks panel.
- `pnpm build` must pass. There are no tests or linter.
- Package manager is pnpm only.
