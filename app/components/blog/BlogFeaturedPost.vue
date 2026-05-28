<script setup lang="ts">
import type { Post } from '~/types/post'

defineProps<{ post: Post }>()

const { t } = useI18n()
</script>

<template>
  <NuxtLink :to="`/blog/${post.slug}`" class="blog-featured reveal">
    <div class="img">
      <div class="img-art" aria-hidden="true">
        <span class="corner tl">/featured/post-cover</span>
        <span class="badge-stamp">CSS</span>
        <div class="stack">
          <div class="row">
            <span class="glyph">‹›</span>
            <span><span class="tag-name">html</span> <span class="attr">lang</span>=<span class="str">"en"</span></span>
          </div>
          <div class="row">
            <span class="glyph">@</span>
            <span><span class="attr">@layer</span> <span class="str">reset, base, ui</span>;</span>
          </div>
          <div class="row">
            <span class="glyph">{}</span>
            <span><span class="tag-name">body</span> &#123; <span class="attr">font</span>: <span class="str">system-ui</span>; &#125;</span>
          </div>
          <div class="row">
            <span class="glyph">¶</span>
            <span><span class="tag-name">h1</span> · <span class="tag-name">p</span> · <span class="tag-name">a</span></span>
          </div>
        </div>
        <span class="corner bl">no-styles.test — 200 OK</span>
      </div>
    </div>
    <div class="body">
      <div class="meta">
        <span class="feat">{{ t('blog.featured') }}</span>
        <span>{{ post.date }}</span>
        <span>{{ t('blog.read_min', { n: post.readMin }) }}</span>
      </div>
      <h3>{{ t('feat.post.t') }}</h3>
      <p>{{ t('feat.post.x') }}</p>
      <div>
        <span class="btn btn-ghost btn-sm">{{ t('cta.read') }} <span class="arrow">→</span></span>
      </div>
    </div>
  </NuxtLink>
</template>
