const { useState, useEffect, useRef } = React;

/**
 * Project schema (matches future API/CMS payload):
 * {
 *   id: string                — stable backend id
 *   slug: string               — URL slug (also routing key)
 *   num: string                — display index (zero-padded)
 *   name: string               — short / domain handle
 *   title: string              — display title
 *   tagline: string            — one-sentence pitch (card)
 *   summary: string            — 2–3 sentences (detail header)
 *   body: string[]             — long-form paragraphs (detail page)
 *   tech: string[]             — stack badges
 *   category: "web"|"tooling"|"oss"|"experiments"
 *   role: string               — what I did
 *   client: string             — company / self
 *   year: number
 *   status: "shipped"|"in-progress"|"archived"
 *   featured: boolean
 *   accent: string             — per-project tint (CSS color)
 *   cover: { kind, palette, glyph }   — placeholder cover spec
 *   links: { live?, repo?, case_study? }
 *   metrics: [{ label, value }]
 * }
 */
const PROJECTS = [
  { id: "prj_001", slug: "lumen-cv", num: "001", name: "lumen.cv", title: "Lumen CV Builder", tagline: "Headless résumé builder with markdown-first editing and live PDF preview.", summary: "A headless CV platform that turns plain markdown into beautifully typeset PDFs — no WYSIWYG, no lock-in, no surprise styling.", body: [
    "Lumen started as a personal frustration: every résumé builder forces a layout, a font, a brand. I wanted markdown in, PDF out, with templates I could actually fork.",
    "The editor is monaco-powered with live PDF preview rendered server-side via headless Chromium. Templates are React Server Components compiled to print-ready CSS.",
    "Shipped in 6 weeks, currently used by ~1.2k engineers a month. Source-available on GitHub."
  ], tech: ["Nuxt 3", "TypeScript", "Tailwind", "Supabase"], category: "web", role: "Design + build", client: "Self", year: 2025, status: "shipped", featured: true, accent: "#7CFF6B",
    cover: { kind: "glyph", palette: ["#0F1A0F", "#1A2E1A"], glyph: "L\u2099" },
    links: { live: "https://lumen.cv", repo: "https://github.com/sulton/lumen", case_study: true },
    metrics: [{ label: "MAU", value: "1.2k" }, { label: "Avg PDF time", value: "480ms" }, { label: "Templates", value: "12" }]
  },
  { id: "prj_002", slug: "neon-grid", num: "002", name: "neon-grid.app", title: "Neon Grid", tagline: "Realtime collaborative whiteboard for engineering teams. CRDT under the hood.", summary: "A whiteboard built specifically for engineering rituals — sprint planning, RFC review, retros — with first-class code, diagrams, and shared cursors.", body: [
    "Most whiteboards treat code as a screenshot. Neon Grid treats it as a citizen: paste a Git URL, get a live, syntax-highlighted, commentable code block.",
    "Sync uses Yjs over WebRTC with a Rust signaling server. We hit 60fps with 40+ concurrent cursors during a public load test.",
    "Currently in private beta with 14 design partners."
  ], tech: ["Vue", "Y.js", "Rust/WASM", "Postgres"], category: "web", role: "Founding engineer", client: "Neon Grid Inc.", year: 2025, status: "in-progress", featured: true, accent: "#5EEAD4",
    cover: { kind: "grid", palette: ["#0A1A1A", "#0F2929"], glyph: "▦" },
    links: { live: "https://neon-grid.app", case_study: true },
    metrics: [{ label: "Beta teams", value: "14" }, { label: "P95 sync", value: "42ms" }, { label: "Stars", value: "—" }]
  },
  { id: "prj_003", slug: "stack-radar", num: "003", name: "stack-radar", title: "Stack Radar", tagline: "Track the technologies your team adopts, trials, holds, and retires — in one chart.", summary: "Open source ThoughtWorks-style tech radar for engineering orgs that want a single source of truth for their stack decisions.", body: [
    "Built for an internal team that kept arguing about which DB to use. Now used by ~200 orgs.",
    "Data is YAML-first; the chart renders to SVG so it embeds anywhere. CLI ships radar updates from CI."
  ], tech: ["SvelteKit", "D3", "Cloudflare"], category: "oss", role: "Creator", client: "OSS", year: 2024, status: "shipped", featured: false, accent: "#A78BFA",
    cover: { kind: "radar", palette: ["#15101F", "#1F1530"], glyph: "◉" },
    links: { live: "https://stack-radar.dev", repo: "https://github.com/sulton/stack-radar" },
    metrics: [{ label: "GH stars", value: "2.4k" }, { label: "Orgs using", value: "~200" }]
  },
  { id: "prj_004", slug: "void-ssh", num: "004", name: "void.ssh", title: "Void SSH", tagline: "Terminal-first dotfile manager with end-to-end encrypted sync across machines.", summary: "A small Go binary that keeps your dotfiles, SSH keys, and shell history encrypted, synced, and version-controlled across every machine you touch.", body: [
    "Bubble Tea TUI, WireGuard for transport, age for at-rest encryption. Zero cloud dependencies."
  ], tech: ["Go", "Bubble Tea", "WireGuard"], category: "tooling", role: "Solo", client: "OSS", year: 2024, status: "shipped", featured: false, accent: "#FFB347",
    cover: { kind: "terminal", palette: ["#1A1409", "#2A1F0F"], glyph: "$_" },
    links: { repo: "https://github.com/sulton/void-ssh" },
    metrics: [{ label: "Binary size", value: "4.2 MB" }, { label: "GH stars", value: "890" }]
  },
  { id: "prj_005", slug: "forge-studio", num: "005", name: "forge.studio", title: "Forge Studio", tagline: "Visual editor for static sites — git-native, no lock-in, deploys anywhere.", summary: "A WYSIWYG layer on top of any Astro / Nuxt / Next site. Edits are commits.", body: [
    "Forge connects to your repo, lets non-devs edit content blocks visually, and pushes commits via GitHub App.",
    "Built for the small-agency client handoff problem — ship once, hand over the keys, never get a 'can you change this' email again."
  ], tech: ["Nuxt", "TipTap", "Cloudflare"], category: "web", role: "Co-founder", client: "Forge Studio", year: 2024, status: "shipped", featured: false, accent: "#FF5C8A",
    cover: { kind: "editor", palette: ["#1F0E18", "#2E1424"], glyph: "✎" },
    links: { live: "https://forge.studio" },
    metrics: [{ label: "Sites managed", value: "340+" }, { label: "MRR", value: "—" }]
  },
  { id: "prj_006", slug: "mono-chart", num: "006", name: "mono-chart", title: "Mono Chart", tagline: "Tiny SVG charting library, 4kb gzipped. ASCII fallback included.", summary: "A radically minimal charting library for dashboards that need to load on a 3G connection. Zero dependencies, ASCII fallback for terminals.", body: [
    "Built when I got tired of shipping 80kb of D3 to render a single sparkline.",
    "Supports line, bar, area, and sparklines. Ships ESM + UMD + a CLI that emits ASCII."
  ], tech: ["TypeScript", "SVG", "Vite"], category: "oss", role: "Solo", client: "OSS", year: 2024, status: "shipped", featured: false, accent: "#E5E5E5",
    cover: { kind: "chart", palette: ["#0F0F0F", "#1A1A1A"], glyph: "╆" },
    links: { repo: "https://github.com/sulton/mono-chart" },
    metrics: [{ label: "Bundle", value: "4.0 kB" }, { label: "Weekly DLs", value: "3.1k" }]
  },
  { id: "prj_007", slug: "ghosttype", num: "007", name: "ghosttype", title: "Ghosttype", tagline: "AI-assisted typing tutor that learns your speed and weak keys.", summary: "A typing tutor that profiles your weakness in real time and generates drills targeting them. All inference runs in-browser via ONNX.", body: [
    "Started as a side project to fix my own bigram weakness on 'th'. Now used by 800+ people a week."
  ], tech: ["Vue", "ONNX Runtime"], category: "experiments", role: "Solo", client: "Self", year: 2025, status: "shipped", featured: false, accent: "#7DD3FC",
    cover: { kind: "keys", palette: ["#0A1622", "#0F1F33"], glyph: "⌫" },
    links: { live: "https://ghosttype.app" },
    metrics: [{ label: "WAU", value: "800" }, { label: "Model", value: "3.2 MB" }]
  },
  { id: "prj_008", slug: "atlas-run", num: "008", name: "atlas.run", title: "Atlas Run", tagline: "Distributed cron + workflow runner with a beautiful timeline UI.", summary: "A workflow engine for teams that outgrew cron but don't want a Temporal-sized commitment.", body: [
    "Atlas wraps Temporal with an ergonomic Nuxt UI: drag a workflow on a timeline, see exactly where it's stuck, retry one branch."
  ], tech: ["Nuxt", "Temporal", "Postgres"], category: "web", role: "Lead engineer", client: "Atlas Inc.", year: 2024, status: "archived", featured: false, accent: "#FBBF24",
    cover: { kind: "timeline", palette: ["#1F1809", "#2E2410"], glyph: "─●─" },
    links: { case_study: true },
    metrics: [{ label: "Workflows/day", value: "~14k" }]
  },
  { id: "prj_009", slug: "solder-io", num: "009", name: "solder.io", title: "Solder Components", tagline: "60+ headless React/Vue primitives for design-engineer teams.", summary: "A headless component library focused on the primitives that other libraries get wrong: combobox, calendar, command palette.", body: [
    "Built because Radix is React-only and HeadlessUI doesn't have a combobox I love.",
    "Stitches under the hood, but you can swap the styling layer."
  ], tech: ["React", "Vue", "TS", "Stitches"], category: "oss", role: "Maintainer", client: "OSS", year: 2025, status: "in-progress", featured: true, accent: "#F472B6",
    cover: { kind: "swatch", palette: ["#1F0F1A", "#2E1428"], glyph: "▣" },
    links: { repo: "https://github.com/sulton/solder" },
    metrics: [{ label: "Components", value: "62" }, { label: "GH stars", value: "1.1k" }]
  },
  { id: "prj_010", slug: "chronograph", num: "010", name: "chronograph", title: "Chronograph", tagline: "Calendar + time-tracking for solo founders who hate timesheets.", summary: "A native-feeling calendar app that infers your time entries from your calendar, commits, and ticket activity — then lets you correct them in one keystroke.", body: [
    "Built for myself; eventually opened it up. Inference runs entirely on-device with a tiny ONNX model.",
    "Now in private beta with ~80 freelancers."
  ], tech: ["Tauri", "Svelte", "Rust", "SQLite"], category: "tooling", role: "Solo", client: "Self", year: 2025, status: "in-progress", featured: false, accent: "#60A5FA",
    cover: { kind: "timeline", palette: ["#0A1422", "#0F1F33"], glyph: "¶¶" },
    links: { live: "https://chronograph.app" },
    metrics: [{ label: "Beta users", value: "80" }, { label: "On-device", value: "100%" }]
  },
  { id: "prj_011", slug: "glyph-store", num: "011", name: "glyph.store", title: "Glyph Store", tagline: "A boutique typography marketplace for indie founders.", summary: "A curated marketplace where the catalog is hand-picked and every font ships with code examples for the four frameworks people actually use.", body: [
    "Co-built with a type designer friend. The hard part wasn't commerce — it was getting font-feature-settings demos to render fast everywhere."
  ], tech: ["Nuxt 3", "Stripe", "R2"], category: "web", role: "Co-founder", client: "Glyph Store", year: 2025, status: "shipped", featured: false, accent: "#A78BFA",
    cover: { kind: "editor", palette: ["#1B0F2E", "#26143F"], glyph: "Aa" },
    links: { live: "https://glyph.store" },
    metrics: [{ label: "Foundries", value: "24" }, { label: "GMV", value: "$92k" }]
  },
  { id: "prj_012", slug: "vector-bench", num: "012", name: "vector-bench", title: "Vector Bench", tagline: "Benchmark suite for vector databases. 30 datasets, 8 engines, one report.", summary: "An open-source harness that benchmarks vector DBs against the same datasets with the same hardware so you can stop arguing about which is faster.", body: [
    "Built because every blog post benchmarking Pinecone vs Weaviate uses different datasets. Now used by 4 of the 8 engines we test in their own marketing."
  ], tech: ["Python", "Pulumi", "Grafana"], category: "oss", role: "Maintainer", client: "OSS", year: 2025, status: "shipped", featured: false, accent: "#F87171",
    cover: { kind: "chart", palette: ["#1A0E0E", "#2E1414"], glyph: "▪▪▪" },
    links: { repo: "https://github.com/sulton/vector-bench" },
    metrics: [{ label: "Datasets", value: "30" }, { label: "Engines", value: "8" }]
  },
  { id: "prj_013", slug: "opus-mail", num: "013", name: "opus.mail", title: "Opus Mail", tagline: "Newsletter platform for writers who care about typography.", summary: "A Substack alternative where the typography defaults are actually good. Custom themes, no algorithm, paid in your currency.", body: [
    "Built in 8 weeks for a writer friend who couldn't stand Substack's defaults. Now hosts ~200 newsletters."
  ], tech: ["Nuxt 3", "Postmark", "Supabase"], category: "web", role: "Lead engineer", client: "Opus", year: 2025, status: "shipped", featured: false, accent: "#FB923C",
    cover: { kind: "editor", palette: ["#1F1408", "#2E1F10"], glyph: "✉" },
    links: { live: "https://opus.mail" },
    metrics: [{ label: "Newsletters", value: "~200" }, { label: "Delivery rate", value: "99.4%" }]
  },
  { id: "prj_014", slug: "glacier-ssg", num: "014", name: "glacier", title: "Glacier SSG", tagline: "A static site generator written in 800 lines. No frameworks.", summary: "A weekend experiment to see how small a useful SSG can be. Markdown in, HTML out, watch mode included. Used internally to build sulton.dev.", body: [
    "Inspired by Hugo but written in TypeScript because I wanted to live in one language. Output is identical at 1/40th the LOC."
  ], tech: ["TypeScript", "esbuild", "Node"], category: "experiments", role: "Solo", client: "Self", year: 2024, status: "shipped", featured: false, accent: "#22D3EE",
    cover: { kind: "grid", palette: ["#0A1C1F", "#0F2A30"], glyph: "❆" },
    links: { repo: "https://github.com/sulton/glacier" },
    metrics: [{ label: "LOC", value: "812" }, { label: "Build time", value: "110 ms" }]
  },
  { id: "prj_015", slug: "polar-os", num: "015", name: "polar.os", title: "Polar OS", tagline: "Internal toolkit for a fintech that needed to ship 12 dashboards a quarter.", summary: "A meta-framework on top of Nuxt that generates internal dashboards from a schema. Forms, tables, filters, exports — all from one YAML file.", body: [
    "Confidential client work; numbers in the metrics are public."
  ], tech: ["Nuxt 3", "TypeScript", "Postgres"], category: "web", role: "Embedded lead", client: "Confidential", year: 2024, status: "archived", featured: false, accent: "#FACC15",
    cover: { kind: "swatch", palette: ["#1F1E08", "#2E2C12"], glyph: "▤" },
    links: { case_study: true },
    metrics: [{ label: "Dashboards shipped", value: "34" }, { label: "Time saved", value: "~600 hr" }]
  }
];


const STACK = {
  Frontend: ["Vue 3", "Nuxt 3", "React 19", "TypeScript", "Tailwind", "Astro", "Svelte", "Vite"],
  Backend: ["Node", "Bun", "Postgres", "Supabase", "Redis", "tRPC", "Prisma", "Edge Workers"],
  Tools: ["Git", "Figma", "Docker", "GH Actions", "Vercel", "Linear", "Vitest", "Playwright"]
};

const POSTS = [
{ id: 1,  slug: "unstyled-web",                date: "2026·04·22", titleKey: "post.1.t",  exKey: "post.1.x",  tags: ["DX", "Design"], read: 7, featured: true },
{ id: 2,  slug: "nuxt-server-components",      date: "2026·03·30", titleKey: "post.2.t",  exKey: "post.2.x",  tags: ["Vue", "Perf"], read: 5 },
{ id: 3,  slug: "barrel-files",                date: "2026·03·14", titleKey: "post.3.t",  exKey: "post.3.x",  tags: ["DX"], read: 4 },
{ id: 4,  slug: "monorepo-without-tooling-tax",date: "2026·02·28", titleKey: "post.4.t",  exKey: "post.4.x",  tags: ["DX", "Career"], read: 6 },
{ id: 5,  slug: "view-transitions",            date: "2026·02·11", titleKey: "post.5.t",  exKey: "post.5.x",  tags: ["Vue", "Design"], read: 9 },
{ id: 6,  slug: "reading-source-code",         date: "2026·01·24", titleKey: "post.6.t",  exKey: "post.6.x",  tags: ["Career"], read: 3 },
{ id: 7,  slug: "css-cascade-layers",          date: "2026·01·09", titleKey: "post.7.t",  exKey: "post.7.x",  tags: ["Design", "DX"], read: 6 },
{ id: 8,  slug: "typescript-strict-mode",      date: "2025·12·18", titleKey: "post.8.t",  exKey: "post.8.x",  tags: ["DX"], read: 8 },
{ id: 9,  slug: "shipping-fast-without-burnout",date:"2025·12·03", titleKey: "post.9.t",  exKey: "post.9.x",  tags: ["Career"], read: 5 },
{ id: 10, slug: "design-tokens-in-2026",       date: "2025·11·20", titleKey: "post.10.t", exKey: "post.10.x", tags: ["Design"], read: 7 },
{ id: 11, slug: "the-react-island-pattern",    date: "2025·11·06", titleKey: "post.11.t", exKey: "post.11.x", tags: ["Vue", "Perf"], read: 6 },
{ id: 12, slug: "writing-better-rfcs",         date: "2025·10·24", titleKey: "post.12.t", exKey: "post.12.x", tags: ["Career", "DX"], read: 4 },
{ id: 13, slug: "on-build-tools",              date: "2025·10·11", titleKey: "post.13.t", exKey: "post.13.x", tags: ["DX", "Perf"], read: 8 },
{ id: 14, slug: "my-editor-setup",             date: "2025·09·28", titleKey: "post.14.t", exKey: "post.14.x", tags: ["DX"], read: 5 },
{ id: 15, slug: "interviewing-engineers",      date: "2025·09·14", titleKey: "post.15.t", exKey: "post.15.x", tags: ["Career"], read: 6 },
{ id: 16, slug: "why-i-still-use-tailwind",    date: "2025·08·30", titleKey: "post.16.t", exKey: "post.16.x", tags: ["Design", "DX"], read: 7 }];


function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="hv-bar">
        <span className="dots"><i></i><i></i><i></i></span>
        <span className="path">~/portfolio · main · zsh</span>
      </div>
      <div className="hv-line"><span className="tk-com">// stack as of {new Date().getFullYear()}</span></div>
      <div className="hv-line"><span className="tk-key">const</span> <span className="tk-fn">profile</span> = {"{"}</div>
      <div className="hv-line">  role: <span className="tk-str">'Design Engineer'</span>,</div>
      <div className="hv-line">  city: <span className="tk-str">'Berlin · UTC+1'</span>,</div>
      <div className="hv-line">  shipped: <span className="tk-num">47</span>,</div>
      <div className="hv-line">  stack: [<span className="tk-str">'vue'</span>, <span className="tk-str">'nuxt'</span>, <span className="tk-str">'ts'</span>, <span className="tk-str">'rust'</span>],</div>
      <div className="hv-line">  available: <span className="tk-key">true</span>,</div>
      <div className="hv-line">{"}"}</div>
      <div className="hv-line">&nbsp;</div>
      <div className="hv-line"><span className="tk-com">$</span> <span className="cursor">deploy --prod</span></div>
    </div>);
}

function Hero() {
  const t = window.useT();
  return (
    <section className="hero container">
      <div className="hero-grid">
        <div className="hero-left">
          <span className="tag live">{t("hero.available")}</span>
          <h1 className="reveal in hero-h1">
            <span className="stack" style={{ fontSize: "83px" }}>{t("hero.h1.l1")}</span>
            <span className="stack outline italic" style={{ fontSize: "84px" }}>{t("hero.h1.l2")}</span>
            <span className="stack" style={{ fontSize: "84px" }}>{t("hero.h1.l3")}</span>
            <span className="stack" style={{ fontSize: "84px" }}>{t("hero.h1.l4")}<span className="caret"></span></span>
          </h1>
          <p className="hero-sub">{t("hero.sub")}</p>
          <div className="hero-cta">
            <a href="#projects" data-route="home" className="btn btn-primary">{t("cta.view_work")} <span className="arrow">→</span></a>
            <a href="#contact" data-route="contact" className="btn btn-ghost">{t("cta.get_in_touch")}</a>
          </div>
        </div>
        <div className="hero-right reveal in">
          <HeroVisual />
        </div>
      </div>
      <div className="hero-meta">
        <span className="scroll-hint">{t("hero.scroll")} <span className="line"></span> {t("hero.down")}</span>
        <span>SF · BER · v3.0 · 2026</span>
      </div>
    </section>);
}

function About() {
  const t = window.useT();
  return (
    <section className="section container reveal">
      <div className="section-head">
        <div>
          <span className="section-label">{t("about.label")}</span>
          <h2 className="section-title"><span className="num">01</span>{t("about.title")}</h2>
        </div>
      </div>
      <div className="about-grid">
        <div className="about-img"><span>{t("about.imgalt")}</span></div>
        <div className="about-text">
          <h3>{t("about.lead")}</h3>
          <p>{t("about.body")}</p>
          <ul className="highlights">
            <li><span className="k">01</span><span className="v">{t("about.h.1")}</span><span className="meta">{t("about.m.1")}</span></li>
            <li><span className="k">02</span><span className="v">{t("about.h.2")}</span><span className="meta">{t("about.m.2")}</span></li>
            <li><span className="k">03</span><span className="v">{t("about.h.3")}</span><span className="meta">{t("about.m.3")}</span></li>
            <li><span className="k">04</span><span className="v">{t("about.h.4")}</span><span className="meta">{t("about.m.4")}</span></li>
          </ul>
        </div>
      </div>
    </section>);
}

function TechStack() {
  const t = window.useT();
  const groupKey = { Frontend: "stack.frontend", Backend: "stack.backend", Tools: "stack.tools" };
  return (
    <section className="section container reveal">
      <div className="section-head">
        <div>
          <span className="section-label">{t("stack.label")}</span>
          <h2 className="section-title"><span className="num">02</span>{t("stack.title")}</h2>
        </div>
        <span className="tag">{t("stack.count", { n: Object.values(STACK).flat().length })}</span>
      </div>
      <div className="stack-grid">
        {Object.entries(STACK).map(([group, list]) =>
        <div className="stack-col" key={group}>
            <h4>{t(groupKey[group])} <span className="ct">{list.length}</span></h4>
            <div className="badges">
              {list.map((b, i) =>
            <span key={b} className={"badge" + (i < 2 ? " featured" : "")}>{b}</span>
            )}
            </div>
          </div>
        )}
      </div>
    </section>);
}

function ProjectCover({ p }) {
  const [c1, c2] = p.cover.palette;
  const lines = (() => {
    switch (p.cover.kind) {
      case "glyph":    return null;
      case "grid":     return <div className="pc-grid" />;
      case "radar":    return <div className="pc-radar"><span /><span /><span /></div>;
      case "terminal": return <div className="pc-term"><span>$</span><span className="blink">_</span></div>;
      case "editor":   return <div className="pc-editor"><span /><span /><span /></div>;
      case "chart":    return <svg className="pc-chart" viewBox="0 0 100 40" preserveAspectRatio="none"><polyline points="0,30 15,22 30,26 45,12 60,18 75,8 100,14" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>;
      case "keys":     return <div className="pc-keys">{["q","w","e","r","t","y"].map(k => <span key={k}>{k}</span>)}</div>;
      case "timeline": return <div className="pc-timeline"><span /><span /><span /><span /></div>;
      case "swatch":   return <div className="pc-swatch">{[1,2,3,4,5,6].map(i => <span key={i} />)}</div>;
      default: return null;
    }
  })();
  return (
    <div className="proj-cover" style={{ "--c1": c1, "--c2": c2, "--accent": p.accent }}>
      <div className="pc-bg" />
      <div className="pc-art" aria-hidden="true">
        {lines}
        {p.cover.glyph && <span className="pc-glyph">{p.cover.glyph}</span>}
      </div>
      <span className="proj-num">{p.num}</span>
      <span className="proj-arrow">↗</span>
      {p.featured && <span className="proj-flag">★ featured</span>}
      <span className={"proj-status " + p.status}>{p.status}</span>
    </div>
  );
}

function ProjectCard({ p, idx, onOpen }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    // Always reveal on mount (covers filter changes where IO doesn't re-fire)
    const id = requestAnimationFrame(() => el.classList.add("in"));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <article ref={ref} className="proj reveal" style={{ transitionDelay: idx * 60 + "ms" }}
      onClick={() => onOpen && onOpen(p)}
      onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && onOpen) { e.preventDefault(); onOpen(p); } }}
      tabIndex={onOpen ? 0 : -1}
      role={onOpen ? "button" : undefined}
      aria-label={onOpen ? `Open ${p.title}` : undefined}>
      <ProjectCover p={p} />
      <div className="proj-body">
        <h3 className="proj-title">{p.title}</h3>
        <p className="proj-desc">{p.tagline}</p>
        <div className="proj-tech">{p.tech.map((tg) => <span key={tg} className="t">{tg}</span>)}</div>
        <div className="proj-meta">
          <span>{p.year}</span>
          <span>{p.role}</span>
          <span className="chev">read →</span>
        </div>
      </div>
    </article>);
}

function FeaturedProjects({ onOpenProject }) {
  const t = window.useT();
  return (
    <section id="projects" className="section container reveal">
      <div className="section-head">
        <div>
          <span className="section-label">{t("feat.label")}</span>
          <h2 className="section-title"><span className="num">03</span>{t("feat.title")}</h2>
        </div>
        <a href="#projects" data-route="projects" className="btn-link">{t("cta.all_projects")} <span className="arrow">↗</span></a>
      </div>
      <div className="proj-grid">
        {PROJECTS.slice(0, 6).map((p, i) => <ProjectCard key={p.id} p={p} idx={i} onOpen={onOpenProject} />)}
      </div>
    </section>);
}

function CTAStrip() {
  const t = window.useT();
  return (
    <section className="section container">
      <div className="cta-strip reveal">
        <h3>{t("cta.strip.title")}</h3>
        <a href="#contact" data-route="contact" className="btn btn-primary">{t("cta.start_project")} <span className="arrow">→</span></a>
      </div>
    </section>);
}

// === PAGES ===
function HomePage({ onOpenProject }) {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <FeaturedProjects onOpenProject={onOpenProject} />
      <CTAStrip />
    </>);
}

function ProjectsPage({ onOpenProject }) {
  const t = window.useT();
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [shown, setShown] = useState(6);
  const PAGE_STEP = 6;
  useEffect(() => { setShown(PAGE_STEP); }, [filter, sort]);
  const filterDefs = [
    { id: "all", key: "proj.f.all" },
    { id: "web", key: "proj.f.web" },
    { id: "tooling", key: "proj.f.tooling" },
    { id: "oss", key: "proj.f.oss" },
    { id: "experiments", key: "proj.f.experiments" }
  ];
  const counted = filterDefs.map(f => ({
    ...f,
    count: f.id === "all" ? PROJECTS.length : PROJECTS.filter(p => p.category === f.id).length
  }));
  let visible = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  visible = [...visible];
  if (sort === "newest")   visible.sort((a,b) => b.year - a.year);
  if (sort === "featured") visible.sort((a,b) => Number(b.featured) - Number(a.featured));
  if (sort === "az")       visible.sort((a,b) => a.title.localeCompare(b.title));
  const paged = visible.slice(0, shown);
  const hasMore = shown < visible.length;
  const remaining = visible.length - shown;

  return (
    <>
      <section className="page-header container compact">
        <span className="section-label">/ {t("nav.projects").toLowerCase()}</span>
        <h1>{t("proj.h1")}</h1>
        <p>{t("proj.lead")}</p>
      </section>
      <section className="container">
        <div className="filter-bar">
          <div className="left">
            {counted.map((f) =>
            <button key={f.id} className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {t(f.key)}<span className="count">{f.count}</span>
              </button>
            )}
          </div>
          <div className="right">
            <span className="section-label" style={{ borderBottom: "0" }}>{t("proj.results", { n: visible.length })}</span>
            {window.Dropdown && <window.Dropdown
              value={sort}
              onChange={setSort}
              label={t("proj.sort.label")}
              options={[
                { value: "newest", label: t("proj.sort.newest") },
                { value: "featured", label: t("proj.sort.featured") },
                { value: "az", label: t("proj.sort.az") }
              ]}
            />}
          </div>
        </div>
      </section>
      <section className="section container" style={{ paddingTop: "32px" }}>
        <div className="proj-grid">
          {paged.map((p, i) => <ProjectCard key={p.id} p={p} idx={i} onOpen={onOpenProject} />)}
          {visible.length === 0 && <div className="proj-empty">No projects in this category yet.</div>}
        </div>
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <button className="btn btn-ghost" onClick={() => setShown(s => s + PAGE_STEP)}>
              {t("cta.load_more")} <span className="load-more-count">+{Math.min(PAGE_STEP, remaining)}</span> <span className="arrow">↓</span>
            </button>
          </div>
        )}
        {!hasMore && visible.length > PAGE_STEP && (
          <div style={{ textAlign: "center", marginTop: "48px", color: "var(--ink-4)", fontFamily: "Geist Mono, monospace", fontSize: 12 }}>
            — {t("proj.end")} —
          </div>
        )}
      </section>
    </>);
}

function FAQList({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq" role="list">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={"faq-item" + (isOpen ? " open" : "")} role="listitem">
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}>
              <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="faq-q-text">{f.q}</span>
              <span className="faq-toggle" aria-hidden="true"><span /><span /></span>
            </button>
            <div className="faq-a" aria-hidden={!isOpen}>
              <div className="faq-a-inner"><p>{f.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ServicesPage() {
  const t = window.useT();
  const services = [
  { num: "S·01", icon: "◐", k: "svc.1" },
  { num: "S·02", icon: "▤", k: "svc.2" },
  { num: "S·03", icon: "◊", k: "svc.3" },
  { num: "S·04", icon: "△", k: "svc.4" }];

  const tiers = [
  { name: t("tier.starter"), price: "$8k", per: t("tier.per"), desc: t("tier.s.desc"), features: ["1 focused project", "2-week delivery", "Async Slack channel", "Source code + handoff", "30-day support"], off: ["Design system work", "Ongoing retainer"], cta: t("cta.get_started"), featured: false, raw: "Starter" },
  { name: t("tier.pro"), price: "$22k", per: t("tier.per"), desc: t("tier.p.desc"), features: ["End-to-end build", "6–10 week timeline", "Weekly sync calls", "Design system included", "CI/CD + monitoring", "60-day support"], off: [], cta: t("cta.get_started"), featured: true, flag: t("tier.popular"), raw: "Pro" },
  { name: t("tier.custom"), price: t("tier.lets_talk"), per: "", desc: t("tier.c.desc"), features: ["Everything in Pro", "Dedicated weekly hours", "Team training & coaching", "Code review + architecture", "Long-term retainer"], off: [], cta: t("cta.contact_me"), featured: false, raw: "Custom" }];

  const faqs = [1, 2, 3, 4, 5, 6].map((n) => ({ q: t("faq.q." + n), a: t("faq.a." + n) }));

  return (
    <>
      <section className="page-header container compact">
        <span className="section-label">/ {t("nav.services").toLowerCase()}</span>
        <h1>{t("svc.h1")}</h1>
        <p>{t("svc.lead")}</p>
      </section>
      <section className="section container" style={{ paddingTop: "16px" }}>
        <div className="services-grid">
          {services.map((s) =>
          <article className="svc" key={s.num}>
              <div className="svc-num">{s.num}</div>
              <div className="svc-icon">{s.icon}</div>
              <h3>{t(s.k + ".t")}</h3>
              <p>{t(s.k + ".d")}</p>
              <a href="#" className="learn">{t("cta.learn_more")} <span className="arrow">→</span></a>
            </article>
          )}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <span className="section-label">{t("pricing.label")}</span>
            <h2 className="section-title"><span className="num">02</span>{t("pricing.title")}</h2>
          </div>
          <span className="tag">{t("pricing.tag")}</span>
        </div>
        <div className="pricing-grid">
          {tiers.map((tr) =>
          <div key={tr.raw} className={"tier" + (tr.featured ? " featured" : "")}>
              {tr.flag && <span className="tier-flag">★ {tr.flag}</span>}
              <span className="tier-name">{tr.name}</span>
              <h3>{tr.price.startsWith && tr.price.startsWith("$") ? tr.price.slice(1) : tr.raw === "Custom" ? t("tier.bespoke") : tr.price}</h3>
              <p style={{ color: "var(--ink-3)", fontSize: 13.5, margin: "8px 0 0", lineHeight: 1.55 }}>{tr.desc}</p>
              <ul>
                {tr.features.map((f) => <li key={f}><span className="mark">✓</span>{f}</li>)}
                {tr.off.map((f) => <li key={f} className="off"><span className="mark">—</span>{f}</li>)}
              </ul>
              <a href="#contact" data-route="contact" className={"btn " + (tr.featured ? "btn-primary" : "btn-ghost")}>{tr.cta} <span className="arrow">→</span></a>
            </div>
          )}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <span className="section-label">{t("faq.label")}</span>
            <h2 className="section-title"><span className="num">03</span>{t("faq.title")}</h2>
          </div>
        </div>
        <FAQList items={faqs} />
      </section>
    </>);
}

function BlogPage({ onOpenPost }) {
  const t = window.useT();
  const [tag, setTag] = useState("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  useEffect(() => { setPage(1); }, [tag, q]);
  const tags = [
    { id: "all",    label: t("blog.tag.all") },
    { id: "Vue",    label: "Vue" },
    { id: "Perf",   label: "Perf" },
    { id: "DX",     label: "DX" },
    { id: "Design", label: "Design" },
    { id: "Career", label: "Career" }
  ];
  const filtered = POSTS.filter(p => {
    if (tag !== "all" && !p.tags.includes(tag)) return false;
    if (q) {
      const hay = (t(p.titleKey) + " " + t(p.exKey)).toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const goPage = (p) => {
    setPage(p);
    const el = document.querySelector(".blog-list");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  return (
    <>
      <section className="page-header container compact">
        <span className="section-label">{t("blog.label")}</span>
        <h1>{t("blog.h1")}</h1>
        <p>{t("blog.lead")}</p>
      </section>
      <section className="container">
        <article className="blog-featured reveal" onClick={() => onOpenPost && onOpenPost(POSTS[0])} tabIndex={0} role="button"
          onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && onOpenPost) { e.preventDefault(); onOpenPost(POSTS[0]); } }}>
          <div className="img">
            <div className="img-art" aria-hidden="true">
              <span className="corner tl">/featured/post-cover</span>
              <span className="badge-stamp">CSS</span>
              <div className="stack">
                <div className="row"><span className="glyph">‹›</span><span><span className="tag-name">html</span> <span className="attr">lang</span>=<span className="str">&quot;en&quot;</span></span></div>
                <div className="row"><span className="glyph">@</span><span><span className="attr">@layer</span> <span className="str">reset, base, ui</span>;</span></div>
                <div className="row"><span className="glyph">{`{}`}</span><span><span className="tag-name">body</span> {`{`} <span className="attr">font</span>: <span className="str">system-ui</span>; {`}`}</span></div>
                <div className="row"><span className="glyph">¶</span><span><span className="tag-name">h1</span> &middot; <span className="tag-name">p</span> &middot; <span className="tag-name">a</span></span></div>
              </div>
              <span className="corner bl">no-styles.test — 200 OK</span>
            </div>
          </div>
          <div className="body">
            <div className="meta">
              <span className="feat">{t("blog.featured")}</span>
              <span>2026·04·22</span>
              <span>{t("blog.read_min", { n: 7 })}</span>
            </div>
            <h3>{t("feat.post.t")}</h3>
            <p>{t("feat.post.x")}</p>
            <div><a href="#" className="btn btn-ghost btn-sm">{t("cta.read")} <span className="arrow">→</span></a></div>
          </div>
        </article>

        <div className="blog-search-bar">
          <div className="input-search">
            <span style={{ color: "var(--ink-4)" }}>⌕</span>
            <input placeholder={t("blog.search")} value={q} onChange={(e) => setQ(e.target.value)} />
            <span className="mono" style={{ color: "var(--ink-4)", fontSize: 11, border: "1px solid var(--line)", padding: "2px 6px", borderRadius: 3 }}>⌘ K</span>
          </div>
          <div className="blog-tags">
            {tags.map((tg) =>
              <button key={tg.id} className="chip" aria-pressed={tag === tg.id} onClick={() => setTag(tg.id)}>{tg.label}</button>
            )}
          </div>
        </div>

        <div className="blog-list">
          {filtered.length === 0 && (
            <div className="proj-empty">{t("blog.empty")}</div>
          )}
          {paged.map((p, i) =>
          <a key={i} href={"#post/" + p.slug} className="blog-row"
            onClick={(e) => { e.preventDefault(); onOpenPost && onOpenPost(p); }}>
              <span className="date">{p.date}</span>
              <span className="title">
                {t(p.titleKey)}
                <span className="ex">{t(p.exKey)}</span>
              </span>
              <span className="tags">{p.tags.map((tg) => <span key={tg} className="tag">{tg}</span>)}</span>
              <span className="read">{t("blog.read_min", { n: p.read })}</span>
            </a>
          )}
        </div>

        {totalPages > 1 && (
          <nav className="pagination" aria-label="Posts pagination">
            <button className="pg-btn" disabled={safePage === 1} onClick={() => goPage(safePage - 1)}>
              <span className="arrow">←</span> {t("pg.prev")}
            </button>
            <ol className="pg-pages">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <li key={n}>
                  <button
                    className={"pg-num" + (n === safePage ? " active" : "")}
                    aria-current={n === safePage ? "page" : undefined}
                    onClick={() => goPage(n)}>
                    {String(n).padStart(2, "0")}
                  </button>
                </li>
              ))}
            </ol>
            <button className="pg-btn" disabled={safePage === totalPages} onClick={() => goPage(safePage + 1)}>
              {t("pg.next")} <span className="arrow">→</span>
            </button>
          </nav>
        )}

        <div className="newsletter">
          <div>
            <h3>{t("blog.news.title")}</h3>
            <p>{t("blog.news.body")}</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input className="input" placeholder="you@domain.dev" type="email" />
            <button className="btn btn-primary">{t("cta.subscribe")} <span className="arrow">→</span></button>
          </form>
        </div>
      </section>
    </>);
}

function ContactTypeSelect() {
  const t = window.useT();
  const [v, setV] = useState("web");
  if (!window.Dropdown) {
    return (
      <select defaultValue="web">
        <option value="web">{t("form.opt.web")}</option>
        <option value="ds">{t("form.opt.ds")}</option>
        <option value="mvp">{t("form.opt.mvp")}</option>
        <option value="audit">{t("form.opt.audit")}</option>
        <option value="other">{t("form.opt.other")}</option>
      </select>);
  }
  return (
    <window.Dropdown
      value={v}
      onChange={setV}
      className="dd-block"
      options={[
        { value: "web", label: t("form.opt.web") },
        { value: "ds", label: t("form.opt.ds") },
        { value: "mvp", label: t("form.opt.mvp") },
        { value: "audit", label: t("form.opt.audit") },
        { value: "other", label: t("form.opt.other") }
      ]}
    />
  );
}

function ContactPage() {
  const t = window.useT();
  return (
    <>
      <section className="page-header container compact">
        <span className="section-label">{t("contact.label")}</span>
      </section>
      <section className="container" style={{ paddingBottom: "clamp(64px, 9vw, 120px)" }}>
        <div className="contact-grid">
          <div>
            <h1 style={{ fontSize: "clamp(56px, 8vw, 112px)", letterSpacing: "-0.04em", margin: "0 0 18px", lineHeight: 0.95, fontWeight: 600 }}>
              {t("contact.h1.l1")}<br />
              <span style={{ color: "var(--accent)", textShadow: "0 0 28px rgba(124, 255, 107, 0.45)" }}>{t("contact.h1.l2")}</span>
            </h1>
            <p style={{ color: "var(--ink-2)", fontSize: 16, maxWidth: "50ch", lineHeight: 1.6, margin: "0 0 40px" }}>
              {t("contact.lead")}
            </p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label>{t("form.name")}</label>
                <input placeholder={t("form.placeholder.name")} />
              </div>
              <div className="field">
                <label>{t("form.email")}</label>
                <input type="email" placeholder={t("form.placeholder.email")} />
              </div>
              <div className="field">
                <label>{t("form.type")}</label>
                <ContactTypeSelect />
              </div>
              <div className="field">
                <label>{t("form.message")}</label>
                <textarea placeholder={t("form.placeholder.message")}></textarea>
              </div>
              <label className="checkbox"><input type="checkbox" /> {t("form.subscribe")}</label>
              <div className="form-foot">
                <button className="btn btn-primary" type="submit">{t("cta.send")} <span className="arrow">→</span></button>
                <span className="hint">{t("form.hint")} <a href="#" style={{ color: "var(--ink)", borderBottom: "1px solid var(--line-strong)" }}>hello@portfolio.dev</a> {t("form.direct")}</span>
              </div>
            </form>
          </div>

          <aside className="aside-block">
            <div>
              <h4>{t("aside.other")}</h4>
              <div className="list-link">
                <a href="#"><span>hello@portfolio.dev</span><span className="arrow">↗</span></a>
                <a href="#"><span>{t("aside.book")}</span><span className="arrow">↗</span></a>
                <a href="#"><span>{t("aside.cv")}</span><span className="arrow">↗</span></a>
              </div>
            </div>
            <div>
              <h4>{t("aside.find")}</h4>
              <div className="list-link">
                <a href="#"><span>GitHub</span><span className="arrow">↗</span></a>
                <a href="#"><span>LinkedIn</span><span className="arrow">↗</span></a>
                <a href="#"><span>X / Twitter</span><span className="arrow">↗</span></a>
                <a href="#"><span>Read.cv</span><span className="arrow">↗</span></a>
                <a href="#"><span>Mastodon</span><span className="arrow">↗</span></a>
              </div>
            </div>
            <div>
              <h4>{t("aside.status")}</h4>
              <div className="status-card">
                <div className="status-row live"><span className="dot"></span><span>{t("status.avail")}</span><span className="when">{t("status.may")}</span></div>
                <div className="status-row"><span className="dot"></span><span>{t("status.booked")}</span><span className="when">{t("status.jun")}</span></div>
                <div className="status-row"><span className="dot"></span><span>{t("status.tent")}</span><span className="when">{t("status.julaug")}</span></div>
              </div>
              <p style={{ margin: "12px 0 0", color: "var(--ink-3)", fontSize: 12, fontFamily: "Geist Mono, monospace" }}>{t("status.based")}</p>
            </div>
          </aside>
        </div>
      </section>
    </>);
}

// === Layout shell ===
function Nav({ route, setRoute }) {
  const t = window.useT();
  const [open, setOpen] = useState(false);
  const items = [
  { id: "home", k: "nav.home" },
  { id: "projects", k: "nav.projects" },
  { id: "services", k: "nav.services" },
  { id: "blog", k: "nav.blog" },
  { id: "contact", k: "nav.contact" }];

  const LangSwitcher = window.LangSwitcher;
  useEffect(() => { setOpen(false); }, [route]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#home" className="logo" onClick={(e) => {e.preventDefault();setRoute("home");}}>
          <span className="glyph">S</span>
          <span>sulton<span className="dot">.</span>dev</span>
        </a>
        <div className="nav-links">
          {items.map((i) =>
          <a key={i.id} href={"#" + i.id}
          aria-current={route === i.id ? "page" : undefined}
          onClick={(e) => {e.preventDefault();setRoute(i.id);}}>
              {t(i.k)}
            </a>
          )}
        </div>
        <div className="nav-right">
          {LangSwitcher && <LangSwitcher />}
          <a href="#contact" onClick={(e) => {e.preventDefault();setRoute("contact");}} className="btn btn-primary btn-sm cta-desktop">{t("cta.lets_build")} <span className="arrow">→</span></a>
          <button
            type="button"
            className={"hamburger" + (open ? " open" : "")}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div className={"mobile-menu" + (open ? " open" : "")} aria-hidden={!open}>
        <div className="mm-inner">
          <ul className="mm-links">
            {items.map((i, idx) =>
              <li key={i.id} style={{ transitionDelay: (idx * 40) + "ms" }}>
                <a href={"#" + i.id}
                  aria-current={route === i.id ? "page" : undefined}
                  onClick={(e) => { e.preventDefault(); setRoute(i.id); }}>
                  <span className="mm-num">0{idx + 1}</span>
                  <span className="mm-label">{t(i.k)}</span>
                  <span className="mm-arrow">→</span>
                </a>
              </li>
            )}
          </ul>
          <div className="mm-foot">
            {LangSwitcher && <div className="mm-lang"><LangSwitcher /></div>}
            <a href="#contact" onClick={(e) => { e.preventDefault(); setRoute("contact"); }} className="btn btn-primary">{t("cta.lets_build")} <span className="arrow">→</span></a>
          </div>
        </div>
      </div>
    </nav>);
}

function Footer({ setRoute }) {
  const t = window.useT();
  return (
    <footer className="footer">
      <div>
        <div className="logo" style={{ marginBottom: 8 }}>
          <span className="glyph">S</span>
          <span>sulton<span className="dot">.</span>dev</span>
        </div>
        <div className="meta-line">{t("footer.meta")}</div>
        <a className="old-link" href="https://old.sulton.dev" target="_blank" rel="noreferrer">
          <span className="old-link-dot" aria-hidden="true"></span>
          {t("footer.old")}
          <span className="arrow">↗</span>
        </a>
      </div>
      <div className="col-mid">
        {["home", "projects", "services", "blog", "contact"].map((p) =>
        <a key={p} href={"#" + p} onClick={(e) => {e.preventDefault();setRoute(p);}}>/{p}</a>
        )}
      </div>
      <div className="col-r">
        <a href="#">GitHub ↗</a>
        <a href="#">LinkedIn ↗</a>
        <a href="#">X ↗</a>
      </div>
    </footer>);
}

function BlogDetail({ p, onClose, onOpenPost }) {
  const t = window.useT();
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!p) return null;
  const related = POSTS.filter(x => x.id !== p.id && x.tags.some(tag => p.tags.includes(tag))).slice(0, 3);
  const fallback = related.length ? related : POSTS.filter(x => x.id !== p.id).slice(0, 3);
  return (
    <div className="proj-detail blog-detail">
      <div className="pd-bar">
        <button className="pd-back" onClick={onClose}><span className="arrow">←</span> {t("blog.back")}</button>
        <span className="pd-id">{p.date} · /post/{p.slug}</span>
      </div>

      <article className="container bd-article">
        <header className="bd-head">
          <div className="bd-meta">
            <span className="section-label">{p.date}</span>
            <span className="section-label">{t("blog.read_min", { n: p.read })}</span>
            <div className="bd-tags">
              {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </div>
          <h1 className="bd-title">{t(p.titleKey)}</h1>
          <p className="bd-lead">{t(p.exKey)}</p>
        </header>

        <div className="bd-body">
          {(() => {
            const has = (k) => window.I18N && window.I18N[k];
            const id = p.id;
            if (has("post." + id + ".b1")) {
              return [1,2,3].map(n => <p key={n}>{t("post." + id + ".b" + n)}</p>);
            }
            return <p>{t("blog.no_body")}</p>;
          })()}
        </div>

        <footer className="bd-foot">
          <span className="bd-author">
            <span className="bd-avatar">S</span>
            <span><strong>sulton.dev</strong><span className="mono"> · {p.date}</span></span>
          </span>
          <div className="bd-share">
            <a href="#" className="btn btn-ghost btn-sm">{t("blog.share")} <span className="arrow">↗</span></a>
          </div>
        </footer>
      </article>

      <section className="container pd-next">
        <span className="section-label">{t("blog.related")}</span>
        <div className="bd-related">
          {fallback.map((r) =>
            <a key={r.id} href={"#post/" + r.slug}
              className="blog-row"
              onClick={(e) => { e.preventDefault(); onOpenPost && onOpenPost(r); window.scrollTo({ top: 0, behavior: "instant" }); }}>
              <span className="date">{r.date}</span>
              <span className="title">
                {t(r.titleKey)}
                <span className="ex">{t(r.exKey)}</span>
              </span>
              <span className="tags">{r.tags.map((tg) => <span key={tg} className="tag">{tg}</span>)}</span>
              <span className="read">{t("blog.read_min", { n: r.read })}</span>
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

function ProjectDetail({ p, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!p) return null;
  return (
    <div className="proj-detail" style={{ "--accent": p.accent }}>
      <div className="pd-bar">
        <button className="pd-back" onClick={onClose}><span className="arrow">←</span> Back to projects</button>
        <span className="pd-id">{p.id} · /{p.slug}</span>
      </div>

      <section className="container pd-head">
        <div className="pd-head-meta">
          <span className="section-label" style={{ color: "var(--accent)" }}>{p.num} · {p.category}</span>
          <span className={"proj-status " + p.status} style={{ position: "static" }}>{p.status}</span>
          {p.featured && <span className="proj-flag" style={{ position: "static" }}>★ featured</span>}
        </div>
        <h1 className="pd-title">{p.title}</h1>
        <p className="pd-summary">{p.summary}</p>
        <div className="pd-facts">
          <div><span>Role</span><strong>{p.role}</strong></div>
          <div><span>Client</span><strong>{p.client}</strong></div>
          <div><span>Year</span><strong>{p.year}</strong></div>
          <div><span>Stack</span><strong>{p.tech.slice(0,2).join(" · ")}</strong></div>
        </div>
      </section>

      <section className="container pd-cover-wrap">
        <div className="pd-cover">
          <ProjectCover p={p} />
        </div>
      </section>

      {p.metrics && p.metrics.length > 0 && (
        <section className="container pd-metrics">
          {p.metrics.map((m, i) =>
            <div key={i}>
              <span className="k">{m.label}</span>
              <span className="v">{m.value}</span>
            </div>
          )}
        </section>
      )}

      <section className="container pd-body">
        <div className="pd-body-text">
          {p.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <aside className="pd-side">
          <div>
            <h4>Stack</h4>
            <div className="badges">
              {p.tech.map(tg => <span key={tg} className="badge">{tg}</span>)}
            </div>
          </div>
          <div>
            <h4>Links</h4>
            <div className="list-link">
              {p.links.live && <a href={p.links.live} target="_blank" rel="noreferrer"><span>Live site</span><span className="arrow">↗</span></a>}
              {p.links.repo && <a href={p.links.repo} target="_blank" rel="noreferrer"><span>Source code</span><span className="arrow">↗</span></a>}
              {p.links.case_study && <a href="#"><span>Read case study</span><span className="arrow">→</span></a>}
            </div>
          </div>
        </aside>
      </section>

      <section className="container pd-next">
        <span className="section-label">Up next</span>
        <div className="pd-next-grid">
          {(() => {
            const idx = PROJECTS.findIndex(x => x.id === p.id);
            const next = [PROJECTS[(idx + 1) % PROJECTS.length], PROJECTS[(idx + 2) % PROJECTS.length]];
            return next.map((np, i) => <ProjectCard key={np.id} p={np} idx={i} onOpen={(picked) => {
              window.scrollTo({ top: 0, behavior: "instant" });
              onClose(picked);
            }} />);
          })()}
        </div>
      </section>
    </div>
  );
}

function App() {
  const [route, setRoute] = useState(() => {
    const h = window.location.hash.slice(1);
    return ["home", "projects", "services", "blog", "contact"].includes(h) ? h : "home";
  });
  const [openProject, setOpenProject] = useState(null);
  const [openPost, setOpenPost] = useState(null);
  const handleOpenProject = (p) => {
    setOpenProject(p);
    setRoute("project");
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const handleCloseProject = (picked) => {
    if (picked && picked.id) {
      setOpenProject(picked);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      setOpenProject(null);
      setRoute("projects");
    }
  };
  const handleOpenPost = (p) => {
    setOpenPost(p);
    setRoute("post");
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const handleClosePost = () => {
    setOpenPost(null);
    setRoute("blog");
  };

  const tweakHook = window.useTweaks || ((d) => [d, () => {}]);
  const [tweaks, setTweak] = tweakHook(/*EDITMODE-BEGIN*/{
    "accent": "#7CFF6B",
    "cyber": 4,
    "motion": true
  } /*EDITMODE-END*/);

  // route → push hash + scroll top
  useEffect(() => {
    if (route === "project" && openProject) {
      const slug = "project/" + openProject.slug;
      if (window.location.hash.slice(1) !== slug) window.history.replaceState(null, "", "#" + slug);
    } else if (window.location.hash.slice(1) !== route) {
      window.history.replaceState(null, "", "#" + route);
    }
    document.documentElement.setAttribute("data-route", route);
  }, [route, openProject]);

  // tweak vars
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--accent", tweaks.accent);
    const m = (tweaks.accent || "#7CFF6B").match(/^#?([0-9a-f]{6})$/i);
    if (m) {
      const v = m[1];
      const rgb = [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16)).join(" ");
      r.style.setProperty("--accent-glow", rgb);
    }
    r.style.setProperty("--cyber", String((tweaks.cyber ?? 4) / 10));
    document.body.setAttribute("data-motion", tweaks.motion ? "1" : "0");
  }, [tweaks.accent, tweaks.cyber, tweaks.motion]);

  // intersection reveal
  useEffect(() => {
    if (!tweaks.motion) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add("in");});
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [route, tweaks.motion]);

  // capture data-route links inside body (e.g. CTAs)
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest("[data-route]");
      if (!a) return;
      const r = a.getAttribute("data-route");
      if (r) {e.preventDefault();setRoute(r);}
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const TP = window.TweaksPanel;
  const TS = window.TweakSection;
  const TC = window.TweakColor;
  const TSL = window.TweakSlider;
  const TT = window.TweakToggle;

  return (
    <>
      <Nav route={route} setRoute={setRoute} />
      <main>
        <div className={"route " + (route === "home" ? "active" : "")} data-screen-label="01 Home"><HomePage onOpenProject={handleOpenProject} /></div>
        <div className={"route " + (route === "projects" ? "active" : "")} data-screen-label="02 Projects"><ProjectsPage onOpenProject={handleOpenProject} /></div>
        <div className={"route " + (route === "services" ? "active" : "")} data-screen-label="03 Services"><ServicesPage /></div>
        <div className={"route " + (route === "blog" ? "active" : "")} data-screen-label="04 Blog"><BlogPage onOpenPost={handleOpenPost} /></div>
        <div className={"route " + (route === "contact" ? "active" : "")} data-screen-label="05 Contact"><ContactPage /></div>
        <div className={"route " + (route === "project" ? "active" : "")} data-screen-label={"P· " + (openProject ? openProject.title : "")}><ProjectDetail p={openProject} onClose={handleCloseProject} /></div>
        <div className={"route " + (route === "post" ? "active" : "")} data-screen-label={"B· " + (openPost ? openPost.slug : "")}><BlogDetail p={openPost} onClose={handleClosePost} onOpenPost={handleOpenPost} /></div>
      </main>
      <Footer setRoute={setRoute} />

      {TP &&
      <TP title="Tweaks">
          <TS title="Accent">
            <TC label="Accent color" value={tweaks.accent} onChange={(v) => setTweak('accent', v)} />
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
              {[
            ["Vue green", "#7CFF6B"],
            ["Cyber teal", "#5EEAD4"],
            ["Hot pink", "#FF5C8A"],
            ["Amber", "#FFB347"],
            ["Mono", "#E5E5E5"]].
            map(([n, c]) =>
            <button key={c} title={n}
            onClick={() => setTweak('accent', c)}
            style={{ width: 22, height: 22, borderRadius: 4, border: "1px solid rgba(255,255,255,.2)", background: c, cursor: "pointer", outline: tweaks.accent === c ? "2px solid white" : "none", outlineOffset: 2 }} />
            )}
            </div>
          </TS>
          <TS title="Atmosphere">
            <TSL label="Cyberpunk dose" value={tweaks.cyber} onChange={(v) => setTweak('cyber', v)} min={0} max={10} step={1} />
            <TT label="Motion" value={tweaks.motion} onChange={(v) => setTweak('motion', v)} />
          </TS>
        </TP>
      }
    </>);
}

const LP = window.LangProvider;
ReactDOM.createRoot(document.getElementById("root")).render(
  LP ? <LP><App /></LP> : <App />
);
