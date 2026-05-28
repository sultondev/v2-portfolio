<script setup lang="ts">
import type { Project } from '~/types/project'

const { t } = useI18n()
const { fetchFeaturedProjects } = useProjectsData()

const { data: projectsRaw } = await useAsyncData('featured-projects', () => fetchFeaturedProjects())
const projects = computed((): Project[] => (projectsRaw.value ?? []) as Project[])
</script>

<template>
  <section id="projects" class="section container reveal">
    <div class="section-head">
      <div>
        <span class="section-label">{{ t('feat.label') }}</span>
        <h2 class="section-title"><span class="num">03</span>{{ t('feat.title') }}</h2>
      </div>
      <NuxtLink to="/projects" class="btn-link">
        {{ t('cta.all_projects') }} <span class="arrow">↗</span>
      </NuxtLink>
    </div>
    <div class="proj-grid">
      <ProjectCard
        v-for="(project, i) in projects"
        :key="project.id"
        :project="project"
        :index="i"
      />
    </div>
  </section>
</template>
