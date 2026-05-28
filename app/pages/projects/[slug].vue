<script setup lang="ts">
import type { Project } from '~/types/project'

const route = useRoute()
const { t } = useI18n()
const { fetchProjectBySlug, fetchProjects } = useProjectsData()

const slug = computed(() => route.params.slug as string)

const [{ data: project }, { data: allProjects }] = await Promise.all([
  useAsyncData(`project-${slug.value}`, () => fetchProjectBySlug(slug.value)),
  useAsyncData('projects-list', fetchProjects),
])

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const nextProjects = computed((): Project[] => {
  const all = allProjects.value ?? []
  if (!all.length) return []
  const idx = all.findIndex(p => p.slug === slug.value)
  return [all[(idx + 1) % all.length], all[(idx + 2) % all.length]].filter((p): p is Project => Boolean(p))
})

useSeoMeta({
  title: `${project.value.title} — sulton.dev`,
  description: project.value.summary,
  ogTitle: project.value.title,
  ogDescription: project.value.summary,
})
</script>

<template>
  <div v-if="project" class="proj-detail" :style="{ '--accent': project.accent }">
    <div class="pd-bar">
      <NuxtLink to="/projects" class="pd-back">
        <span class="arrow">←</span> Back to projects
      </NuxtLink>
      <span class="pd-id">{{ project.id }} · /{{ project.slug }}</span>
    </div>

    <section class="container pd-head">
      <div class="pd-head-meta">
        <span class="section-label" :style="{ color: 'var(--accent)' }">
          {{ project.num }} · {{ project.category }}
        </span>
        <span :class="['proj-status', project.status]" style="position:static">{{ project.status }}</span>
        <span v-if="project.featured" class="proj-flag" style="position:static">★ featured</span>
      </div>
      <h1 class="pd-title">{{ project.title }}</h1>
      <p class="pd-summary">{{ project.summary }}</p>
      <div class="pd-facts">
        <div><span>Role</span><strong>{{ project.role }}</strong></div>
        <div><span>Client</span><strong>{{ project.client }}</strong></div>
        <div><span>Year</span><strong>{{ project.year }}</strong></div>
        <div><span>Stack</span><strong>{{ project.tech.slice(0, 2).join(' · ') }}</strong></div>
      </div>
    </section>

    <section class="container pd-cover-wrap">
      <div class="pd-cover">
        <ProjectCover :project="project" />
      </div>
    </section>

    <section v-if="project.metrics?.length" class="container pd-metrics">
      <div v-for="(m, i) in project.metrics" :key="i">
        <span class="k">{{ m.label }}</span>
        <span class="v">{{ m.value }}</span>
      </div>
    </section>

    <section class="container pd-body">
      <div class="pd-body-text">
        <p v-for="(para, i) in project.body" :key="i">{{ para }}</p>
      </div>
      <aside class="pd-side">
        <div>
          <h4>Stack</h4>
          <div class="badges">
            <span v-for="tech in project.tech" :key="tech" class="badge">{{ tech }}</span>
          </div>
        </div>
        <div>
          <h4>Links</h4>
          <div class="list-link">
            <a v-if="project.links.live" :href="project.links.live" target="_blank" rel="noreferrer">
              <span>Live site</span><span class="arrow">↗</span>
            </a>
            <a v-if="project.links.repo" :href="project.links.repo" target="_blank" rel="noreferrer">
              <span>Source code</span><span class="arrow">↗</span>
            </a>
            <a v-if="project.links.case_study" href="#">
              <span>Read case study</span><span class="arrow">→</span>
            </a>
          </div>
        </div>
      </aside>
    </section>

    <section class="container pd-next">
      <span class="section-label">Up next</span>
      <div class="pd-next-grid">
        <ProjectCard
          v-for="(np, i) in nextProjects"
          :key="np.id"
          :project="np"
          :index="i"
        />
      </div>
    </section>
  </div>
</template>
