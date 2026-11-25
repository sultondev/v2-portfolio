# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # dev server at http://localhost:3000
pnpm build        # production build
pnpm generate     # static site generation
pnpm preview      # preview production build
```

Package manager is **pnpm** (v10.33) — do not use npm or yarn (the README is the stock Nuxt starter and lists them; ignore that). There is no lint or test setup.

## Architecture

**Nuxt 4** personal portfolio (sulton.dev), source under `app/`. Modules: `@nuxtjs/i18n`, `@vercel/analytics`. File-based routing in `app/pages/`: home, `projects/` (+ `[slug]`), `services`, `blog/` (+ `[slug]`), `contact`. Everything renders through `layouts/default.vue` (nav, footer, client-only `TweaksPanel`).

### Data layer: mock vs API

Pages never import data directly — they go through `useProjectsData()` / `usePostsData()` composables. These check `runtimeConfig.public.useMockData` (string `'true'`, override with `NUXT_PUBLIC_USE_MOCK_DATA=false`) and either return arrays from `app/data/mock/*.ts` or `$fetch` from `/api/projects…` / `/api/posts…`. **No `server/` API exists yet**, so mock mode is the only working mode. When adding a fetch method, implement both branches.

Types live in `app/types/`, string enums (`ProjectCategory`, `ProjectStatus`) in `app/enums/project.ts`.

### i18n

`@nuxtjs/i18n` with locales en / uz / ru / de in `i18n/locales/*.ts`, `strategy: 'no_prefix'` (no locale in URLs; choice stored in cookie `sulton.lang`). Use `const { t } = useI18n()` and `t('key', { n })`. Every new key must be added to all four locale files (they are kept line-for-line parallel).

Blog post text is **not** in `posts.ts` — mock posts carry `titleKey` / `excerptKey` pointing to `post.<id>.t` / `post.<id>.x`, and body paragraphs are `post.<id>.b1–b3` (only posts with `hasBody: true` have them). Project content, by contrast, is plain English strings in `projects.ts`.

### Tweaks system

Live-editable visual settings (`accent` color, `cyber` 0–10, `motion` boolean; defaults/presets in `app/types/tweaks.ts`) are held in `useState('tweaks')` via `useTweaks()`. `plugins/tweaks.client.ts` watches them and writes CSS custom properties on `<html>`: `--accent`, `--accent-glow` (space-separated RGB derived from a 6-digit hex), `--cyber` (0–1), plus `data-motion` on `<html>`/`<body>`.

Scroll reveal: the default layout attaches an IntersectionObserver to every `.reveal` element on each route change and adds `.in` when visible; with motion off it adds `.in` immediately. New animated sections just need the `reveal` class.

### Styling

All styles are global in `app/assets/css/main.css` (no scoped styles / no CSS framework). Fonts are Geist / Geist Mono from Google Fonts (configured in `nuxt.config.ts`). `ProjectCover.vue` sets `--c1`/`--c2`/`--accent` inline per project from `project.cover.palette` and `project.accent`, and switches artwork on `cover.kind`.

### `app/template/` — Claude Design export (design source of truth)

The owner designs in Claude Design and exports it as no-bundler React (CDN React + Babel: `app.jsx`, `i18n.jsx`, `dropdown.jsx`, `tweaks-panel.jsx`, `styles.css`, standalone HTML files), overwriting this folder on each update. It is not part of the build — never edit or import it. When it changes, port the changes into the Vue app (diff with `git diff -- app/template`). The `portfolio-frontend` skill has the export → Vue file mapping and the React → Vue translation rules.

### Agents

`.claude/agents/`: `frontend-developer` (implements), `frontend-reviewer` (read-only review, returns a verdict), `orchestrator` (plans, delegates to both, loops until approved; run it as the main agent with `claude --agent orchestrator`). All preload the `portfolio-frontend` skill.

Skills in `.claude/skills/`: `portfolio-frontend` (house rules + design sync), `backend-api-prompt` (generates a detailed API prompt for a back-end AI from the UI's types, mocks and composables → `docs/backend-api-prompt/NNN-name.md`).
