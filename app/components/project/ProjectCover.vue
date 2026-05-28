<script setup lang="ts">
import type { Project } from '~/types/project'

const props = defineProps<{ project: Project }>()

const coverKeys = ['q', 'w', 'e', 'r', 't', 'y']
</script>

<template>
  <div
    class="proj-cover"
    :style="{ '--c1': project.cover.palette[0], '--c2': project.cover.palette[1], '--accent': project.accent }"
  >
    <div class="pc-bg" />
    <div class="pc-art" aria-hidden="true">
      <div v-if="project.cover.kind === 'grid'" class="pc-grid" />
      <div v-else-if="project.cover.kind === 'radar'" class="pc-radar">
        <span /><span /><span />
      </div>
      <div v-else-if="project.cover.kind === 'terminal'" class="pc-term">
        <span>$</span><span class="blink">_</span>
      </div>
      <div v-else-if="project.cover.kind === 'editor'" class="pc-editor">
        <span /><span /><span />
      </div>
      <svg v-else-if="project.cover.kind === 'chart'" class="pc-chart" viewBox="0 0 100 40" preserveAspectRatio="none">
        <polyline points="0,30 15,22 30,26 45,12 60,18 75,8 100,14" fill="none" stroke="currentColor" stroke-width="1.2" />
      </svg>
      <div v-else-if="project.cover.kind === 'keys'" class="pc-keys">
        <span v-for="k in coverKeys" :key="k">{{ k }}</span>
      </div>
      <div v-else-if="project.cover.kind === 'timeline'" class="pc-timeline">
        <span /><span /><span /><span />
      </div>
      <div v-else-if="project.cover.kind === 'swatch'" class="pc-swatch">
        <span v-for="i in 6" :key="i" />
      </div>
      <span v-if="project.cover.glyph" class="pc-glyph">{{ project.cover.glyph }}</span>
    </div>
    <span class="proj-num">{{ project.num }}</span>
    <span class="proj-arrow">↗</span>
    <span v-if="project.featured" class="proj-flag">★ featured</span>
    <span :class="['proj-status', project.status]">{{ project.status }}</span>
  </div>
</template>
