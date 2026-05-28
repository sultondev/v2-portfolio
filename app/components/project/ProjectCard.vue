<script setup lang="ts">
import type { Project } from '~/types/project'

const props = defineProps<{
  project: Project
  index?: number
}>()

const cardRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = cardRef.value
  if (!el) return
  requestAnimationFrame(() => el.classList.add('in'))
})
</script>

<template>
  <article
    ref="cardRef"
    class="proj reveal"
    :style="index !== undefined ? { transitionDelay: `${index * 60}ms` } : {}"
  >
    <NuxtLink :to="`/projects/${project.slug}`" class="proj-link" tabindex="-1" aria-hidden="true">
      <ProjectCover :project="project" />
    </NuxtLink>
    <div class="proj-body">
      <h3 class="proj-title">
        <NuxtLink :to="`/projects/${project.slug}`">{{ project.title }}</NuxtLink>
      </h3>
      <p class="proj-desc">{{ project.tagline }}</p>
      <div class="proj-tech">
        <span v-for="tech in project.tech" :key="tech" class="t">{{ tech }}</span>
      </div>
      <div class="proj-meta">
        <span>{{ project.year }}</span>
        <span>{{ project.role }}</span>
        <NuxtLink :to="`/projects/${project.slug}`" class="chev">read →</NuxtLink>
      </div>
    </div>
  </article>
</template>
