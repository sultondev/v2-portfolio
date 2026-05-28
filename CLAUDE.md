# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start dev server at http://localhost:3000
pnpm build        # production build
pnpm generate     # static site generation
pnpm preview      # preview production build
pnpm postinstall  # run after install (nuxt prepare)
```

Package manager is **pnpm** (v10.33). Do not use npm or yarn.

## Architecture

This is a **Nuxt 4** portfolio site. The Nuxt app lives under `app/` (Nuxt 4 layout). Currently `app/app.vue` renders the default `<NuxtWelcome />` placeholder — the real UI is being migrated from a vanilla-React prototype.

### The prototype (`app/template/`)

The actual portfolio content lives as a standalone no-bundler prototype in `app/template/`. It loads React, ReactDOM, and Babel via CDN and uses raw `.jsx` files. This prototype is the source of truth for:

- **`app.jsx`** — entire SPA: all pages, components, routing (hash-based), and the `PROJECTS`/`POSTS` data arrays
- **`i18n.jsx`** — i18n system: `window.I18N` dictionary, `window.useT()` hook, `window.LangProvider`, `window.LangSwitcher`. Supports EN / UZ / RU / DE
- **`dropdown.jsx`** — accessible custom `<Dropdown>` component, exported to `window.Dropdown`
- **`tweaks-panel.jsx`** — live-editing panel (`window.TweaksPanel`, `window.TweakSection`, etc.) for accent color, cyberpunk atmosphere, and motion toggle
- **`styles.css`** — all CSS for the prototype
- **`Portfolio Wireframes.html`** / **`Portfolio Hi-Fi.html`** — standalone HTML files that load the prototype scripts

### Routing (prototype)

Hash-based SPA with routes: `home`, `projects`, `services`, `blog`, `contact`, `project` (detail), `post` (detail). The `App` component holds state (`route`, `openProject`, `openPost`) and renders all routes simultaneously, toggling `.active` CSS class on `.route` divs.

### Data model

`PROJECTS` array in `app.jsx` — 15 projects, each with: `id`, `slug`, `num`, `name`, `title`, `tagline`, `summary`, `body[]`, `tech[]`, `category` (`web`|`tooling`|`oss`|`experiments`), `role`, `client`, `year`, `status` (`shipped`|`in-progress`|`archived`), `featured`, `accent` (CSS color), `cover` (`{kind, palette, glyph}`), `links`, `metrics[]`.

`POSTS` array — 16 blog posts, titles and body text stored in `window.I18N` (keys: `post.N.t`, `post.N.x`, `post.N.b1–b3`).

### i18n pattern

All user-visible text uses `const t = window.useT()` then `{t("key")}`. String interpolation: `t("key", { n: value })` replaces `{n}` in the string. All translation keys are in `app/template/i18n.jsx`.

### Tweaks system

The `App` component reads from `window.useTweaks` (injected by the tweaks panel) for live-editable values: `accent` (CSS color), `cyber` (0–10 integer), `motion` (boolean). CSS custom properties `--accent`, `--accent-glow`, `--cyber` are updated on change. `data-motion` attribute on `<body>` controls scroll-reveal behavior.

### CSS variables (key ones)

`--accent` — per-site accent color (default `#7CFF6B`). `--cyber` — cyberpunk atmosphere (0–1 float). `--c1`/`--c2`/`--accent` on `.proj-cover` — per-project palette injected as inline style.
