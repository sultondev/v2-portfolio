<script setup lang="ts">
import type { Post } from '~/types/post'

defineProps<{ post: Post }>()

const { t } = useI18n()
</script>

<template>
  <NuxtLink :to="`/blog/${post.slug}`" class="blog-row">
    <span class="date">{{ post.date }}</span>
    <span class="title">
      {{ t(post.titleKey) }}
      <span class="ex">{{ t(post.excerptKey) }}</span>
    </span>
    <span class="tags">
      <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
    </span>
    <span class="read">{{ t('blog.read_min', { n: post.readMin }) }}</span>
  </NuxtLink>
</template>
