<script setup lang="ts">
import type { Post } from '~/types/post'

const { t } = useI18n()
const { fetchPosts } = usePostsData()

const { data: allPosts } = await useAsyncData('posts', fetchPosts)
const posts = computed(() => allPosts.value ?? [])

const activeTag = ref('all')
const query = ref('')
const page = ref(1)
const PAGE_SIZE = 10

watch([activeTag, query], () => { page.value = 1 })

const tags = computed(() => [
  { id: 'all', label: t('blog.tag.all') },
  { id: 'Vue', label: 'Vue' },
  { id: 'Perf', label: 'Perf' },
  { id: 'DX', label: 'DX' },
  { id: 'Design', label: 'Design' },
  { id: 'Career', label: 'Career' },
])

const filtered = computed(() => posts.value.filter((p: Post) => {
  if (activeTag.value !== 'all' && !p.tags.includes(activeTag.value as Post['tags'][number])) return false
  if (query.value) {
    const q = query.value.toLowerCase()
    const hay = `${t(p.titleKey)} ${t(p.excerptKey)}`.toLowerCase()
    if (!hay.includes(q)) return false
  }
  return true
}))

const featuredPost = computed(() => posts.value.find((p: Post) => p.featured))
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const safePage = computed(() => Math.min(page.value, totalPages.value))
const paged = computed(() => filtered.value.slice((safePage.value - 1) * PAGE_SIZE, safePage.value * PAGE_SIZE))

useSeoMeta({
  title: `${t('blog.h1')} — sulton.dev`,
  description: t('blog.lead'),
})
</script>

<template>
  <section class="page-header container compact">
    <span class="section-label">{{ t('blog.label') }}</span>
    <h1>{{ t('blog.h1') }}</h1>
    <p>{{ t('blog.lead') }}</p>
  </section>

  <section class="container">
    <BlogFeaturedPost v-if="featuredPost" :post="featuredPost" />

    <div class="blog-search-bar">
      <div class="input-search">
        <span style="color:var(--ink-4)">⌕</span>
        <input
          v-model="query"
          :placeholder="t('blog.search')"
        />
        <span class="mono" style="color:var(--ink-4);font-size:11px;border:1px solid var(--line);padding:2px 6px;border-radius:3px">⌘ K</span>
      </div>
      <div class="blog-tags">
        <button
          v-for="tag in tags"
          :key="tag.id"
          class="chip"
          :aria-pressed="activeTag === tag.id"
          @click="activeTag = tag.id"
        >
          {{ tag.label }}
        </button>
      </div>
    </div>

    <div class="blog-list">
      <div v-if="filtered.length === 0" class="proj-empty">{{ t('blog.empty') }}</div>
      <BlogPostRow v-for="post in paged" :key="post.id" :post="post" />
    </div>

    <BlogPagination :page="safePage" :total-pages="totalPages" @change="page = $event" />

    <BlogNewsletter />
  </section>
</template>
