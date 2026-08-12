<script setup lang="ts">
import type { BlogPaginationEmits } from '~/types/blog-pagination'

const props = defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits<BlogPaginationEmits>()

const { t } = useI18n()

const pages = computed(() => Array.from({ length: props.totalPages }, (_, i) => i + 1))
</script>

<template>
  <nav v-if="totalPages > 1" class="pagination" aria-label="Posts pagination">
    <button class="pg-btn" :disabled="page === 1" @click="emit('change', page - 1)">
      <span class="arrow">←</span> {{ t('pg.prev') }}
    </button>
    <ol class="pg-pages">
      <li v-for="n in pages" :key="n">
        <button
          :class="['pg-num', { active: n === page }]"
          :aria-current="n === page ? 'page' : undefined"
          @click="emit('change', n)"
        >
          {{ String(n).padStart(2, '0') }}
        </button>
      </li>
    </ol>
    <button class="pg-btn" :disabled="page === totalPages" @click="emit('change', page + 1)">
      {{ t('pg.next') }} <span class="arrow">→</span>
    </button>
  </nav>
</template>
