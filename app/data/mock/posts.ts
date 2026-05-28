import type { Post } from '~/types/post'

export const MOCK_POSTS: Post[] = [
  { id: 1,  slug: 'unstyled-web',                 date: '2026·04·22', tags: ['DX', 'Design'],  readMin: 7,  featured: true,  titleKey: 'post.1.t',  excerptKey: 'post.1.x',  hasBody: true },
  { id: 2,  slug: 'nuxt-server-components',       date: '2026·03·30', tags: ['Vue', 'Perf'],   readMin: 5,  titleKey: 'post.2.t',  excerptKey: 'post.2.x',  hasBody: true },
  { id: 3,  slug: 'barrel-files',                 date: '2026·03·14', tags: ['DX'],            readMin: 4,  titleKey: 'post.3.t',  excerptKey: 'post.3.x',  hasBody: true },
  { id: 4,  slug: 'monorepo-without-tooling-tax', date: '2026·02·28', tags: ['DX', 'Career'],  readMin: 6,  titleKey: 'post.4.t',  excerptKey: 'post.4.x',  hasBody: true },
  { id: 5,  slug: 'view-transitions',             date: '2026·02·11', tags: ['Vue', 'Design'], readMin: 9,  titleKey: 'post.5.t',  excerptKey: 'post.5.x',  hasBody: true },
  { id: 6,  slug: 'reading-source-code',          date: '2026·01·24', tags: ['Career'],        readMin: 3,  titleKey: 'post.6.t',  excerptKey: 'post.6.x',  hasBody: true },
  { id: 7,  slug: 'css-cascade-layers',           date: '2026·01·09', tags: ['Design', 'DX'],  readMin: 6,  titleKey: 'post.7.t',  excerptKey: 'post.7.x' },
  { id: 8,  slug: 'typescript-strict-mode',       date: '2025·12·18', tags: ['DX'],            readMin: 8,  titleKey: 'post.8.t',  excerptKey: 'post.8.x' },
  { id: 9,  slug: 'shipping-fast-without-burnout',date: '2025·12·03', tags: ['Career'],        readMin: 5,  titleKey: 'post.9.t',  excerptKey: 'post.9.x' },
  { id: 10, slug: 'design-tokens-in-2026',        date: '2025·11·20', tags: ['Design'],        readMin: 7,  titleKey: 'post.10.t', excerptKey: 'post.10.x' },
  { id: 11, slug: 'the-react-island-pattern',     date: '2025·11·06', tags: ['Vue', 'Perf'],   readMin: 6,  titleKey: 'post.11.t', excerptKey: 'post.11.x' },
  { id: 12, slug: 'writing-better-rfcs',          date: '2025·10·24', tags: ['Career', 'DX'],  readMin: 4,  titleKey: 'post.12.t', excerptKey: 'post.12.x' },
  { id: 13, slug: 'on-build-tools',               date: '2025·10·11', tags: ['DX', 'Perf'],   readMin: 8,  titleKey: 'post.13.t', excerptKey: 'post.13.x' },
  { id: 14, slug: 'my-editor-setup',              date: '2025·09·28', tags: ['DX'],            readMin: 5,  titleKey: 'post.14.t', excerptKey: 'post.14.x' },
  { id: 15, slug: 'interviewing-engineers',       date: '2025·09·14', tags: ['Career'],        readMin: 6,  titleKey: 'post.15.t', excerptKey: 'post.15.x' },
  { id: 16, slug: 'why-i-still-use-tailwind',     date: '2025·08·30', tags: ['Design', 'DX'],  readMin: 7,  titleKey: 'post.16.t', excerptKey: 'post.16.x' },
]
