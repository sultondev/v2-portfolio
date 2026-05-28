<script setup lang="ts">
import { STACK } from '~/data/mock/stack'

const { t } = useI18n()

const groupKeyMap: Record<string, string> = {
  Frontend: 'stack.frontend',
  Backend: 'stack.backend',
  Tools: 'stack.tools',
}

const totalTech = Object.values(STACK).flat().length
const groups = Object.entries(STACK)
</script>

<template>
  <section class="section container reveal">
    <div class="section-head">
      <div>
        <span class="section-label">{{ t('stack.label') }}</span>
        <h2 class="section-title"><span class="num">02</span>{{ t('stack.title') }}</h2>
      </div>
      <span class="tag">{{ t('stack.count', { n: totalTech }) }}</span>
    </div>
    <div class="stack-grid">
      <div v-for="[group, list] in groups" :key="group" class="stack-col">
        <h4>{{ t(groupKeyMap[group] ?? group) }} <span class="ct">{{ list.length }}</span></h4>
        <div class="badges">
          <span
            v-for="(badge, i) in list"
            :key="badge"
            :class="['badge', { featured: i < 2 }]"
          >{{ badge }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
