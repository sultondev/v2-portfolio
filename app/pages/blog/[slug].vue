<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { fetchPostBySlug, fetchRelatedPosts } = usePostsData()

const slug = computed(() => route.params.slug as string)

const { data: post } = await useAsyncData(`post-${slug.value}`, () => fetchPostBySlug(slug.value))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const { data: related } = await useAsyncData(
  `post-related-${slug.value}`,
  () => fetchRelatedPosts(post.value!)
)

const bodyParagraphs = computed(() => {
  if (!post.value?.hasBody) return null
  const id = post.value.id
  return [1, 2, 3].map(n => t(`post.${id}.b${n}`))
})

useSeoMeta({
  title: `${t(post.value.titleKey)} — sulton.dev`,
  description: t(post.value.excerptKey),
  ogTitle: t(post.value.titleKey),
  ogDescription: t(post.value.excerptKey),
})
</script>

<template>
  <div v-if="post" class="proj-detail blog-detail">
    <div class="pd-bar">
      <NuxtLink to="/blog" class="pd-back">
        <span class="arrow">←</span> {{ t('blog.back') }}
      </NuxtLink>
      <span class="pd-id">{{ post.date }} · /post/{{ post.slug }}</span>
    </div>

    <article class="container bd-article">
      <header class="bd-head">
        <div class="bd-meta">
          <span class="section-label">{{ post.date }}</span>
          <span class="section-label">{{ t('blog.read_min', { n: post.readMin }) }}</span>
          <div class="bd-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <h1 class="bd-title">{{ t(post.titleKey) }}</h1>
        <p class="bd-lead">{{ t(post.excerptKey) }}</p>
      </header>

      <div class="bd-body">
        <template v-if="bodyParagraphs">
          <p v-for="(para, i) in bodyParagraphs" :key="i">{{ para }}</p>
        </template>
        <p v-else>{{ t('blog.no_body') }}</p>
      </div>

      <footer class="bd-foot">
        <span class="bd-author">
          <span class="bd-avatar">S</span>
          <span>
            <strong>sulton.dev</strong>
            <span class="mono"> · {{ post.date }}</span>
          </span>
        </span>
        <div class="bd-share">
          <a href="#" class="btn btn-ghost btn-sm">
            {{ t('blog.share') }} <span class="arrow">↗</span>
          </a>
        </div>
      </footer>
    </article>

    <section v-if="related?.length" class="container pd-next">
      <span class="section-label">{{ t('blog.related') }}</span>
      <div class="bd-related">
        <BlogPostRow v-for="r in related" :key="r.id" :post="r" />
      </div>
    </section>
  </div>
</template>
