<script setup lang="ts">
import type { Project } from '~/types/project'
import { ProjectCategory } from '~/enums/project'

const { t } = useI18n()
const { fetchProjects } = useProjectsData()

const { data: allProjects } = await useAsyncData('projects', fetchProjects)
const projects = computed(() => allProjects.value ?? [])

const filter = ref<string>('all')
const sort = ref<string>('newest')
const shown = ref(6)
const PAGE_STEP = 6

watch([filter, sort], () => { shown.value = PAGE_STEP })

const filterDefs = [
  { id: 'all', key: 'proj.f.all' },
  { id: ProjectCategory.Web, key: 'proj.f.web' },
  { id: ProjectCategory.Tooling, key: 'proj.f.tooling' },
  { id: ProjectCategory.Oss, key: 'proj.f.oss' },
  { id: ProjectCategory.Experiments, key: 'proj.f.experiments' },
]

const counted = computed(() =>
  filterDefs.map(f => ({
    ...f,
    count: f.id === 'all' ? projects.value.length : projects.value.filter(p => p.category === f.id).length,
  }))
)

const visible = computed(() => {
  let list: Project[] = filter.value === 'all'
    ? [...projects.value]
    : projects.value.filter(p => p.category === filter.value)

  if (sort.value === 'newest') list.sort((a, b) => b.year - a.year)
  else if (sort.value === 'featured') list.sort((a, b) => Number(b.featured) - Number(a.featured))
  else if (sort.value === 'az') list.sort((a, b) => a.title.localeCompare(b.title))

  return list
})

const paged = computed(() => visible.value.slice(0, shown.value))
const hasMore = computed(() => shown.value < visible.value.length)
const remaining = computed(() => visible.value.length - shown.value)

const sortOptions = computed(() => [
  { value: 'newest', label: t('proj.sort.newest') },
  { value: 'featured', label: t('proj.sort.featured') },
  { value: 'az', label: t('proj.sort.az') },
])

useSeoMeta({
  title: `${t('proj.h1')} — sulton.dev`,
  description: t('proj.lead'),
})
</script>

<template>
  <section class="page-header container compact">
    <span class="section-label">/ {{ t('nav.projects').toLowerCase() }}</span>
    <h1>{{ t('proj.h1') }}</h1>
    <p>{{ t('proj.lead') }}</p>
  </section>

  <section class="container">
    <div class="filter-bar">
      <div class="left">
        <button
          v-for="f in counted"
          :key="f.id"
          class="chip"
          :aria-pressed="filter === f.id"
          @click="filter = f.id"
        >
          {{ t(f.key) }}<span class="count">{{ f.count }}</span>
        </button>
      </div>
      <div class="right">
        <span class="section-label" style="border-bottom:0">
          {{ t('proj.results', { n: visible.length }) }}
        </span>
        <UiDropdown
          :value="sort"
          :label="`${t('proj.sort.label')} `"
          :options="sortOptions"
          @change="sort = $event"
        />
      </div>
    </div>
  </section>

  <section class="section container" style="padding-top:32px">
    <div class="proj-grid">
      <ProjectCard
        v-for="(project, i) in paged"
        :key="project.id"
        :project="project"
        :index="i"
      />
      <div v-if="visible.length === 0" class="proj-empty">
        No projects in this category yet.
      </div>
    </div>

    <div v-if="hasMore" style="text-align:center;margin-top:48px">
      <button class="btn btn-ghost" @click="shown += PAGE_STEP">
        {{ t('cta.load_more') }}
        <span class="load-more-count">+{{ Math.min(PAGE_STEP, remaining) }}</span>
        <span class="arrow">↓</span>
      </button>
    </div>

    <div
      v-if="!hasMore && visible.length > PAGE_STEP"
      style="text-align:center;margin-top:48px;color:var(--ink-4);font-family:'Geist Mono',monospace;font-size:12px"
    >
      — {{ t('proj.end') }} —
    </div>
  </section>
</template>
