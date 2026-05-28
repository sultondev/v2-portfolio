<script setup lang="ts">
import type { FaqItem } from '~/types/service'

defineProps<{ items: FaqItem[] }>()

const { t } = useI18n()
const openIdx = ref<number>(-1)

const toggle = (i: number) => {
  openIdx.value = openIdx.value === i ? -1 : i
}
</script>

<template>
  <div class="faq" role="list">
    <div
      v-for="(item, i) in items"
      :key="i"
      :class="['faq-item', { open: openIdx === i }]"
      role="listitem"
    >
      <button
        type="button"
        class="faq-q"
        :aria-expanded="openIdx === i"
        @click="toggle(i)"
      >
        <span class="faq-num">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="faq-q-text">{{ t(item.questionKey) }}</span>
        <span class="faq-toggle" aria-hidden="true"><span /><span /></span>
      </button>
      <div class="faq-a" :aria-hidden="openIdx !== i">
        <div class="faq-a-inner">
          <p>{{ t(item.answerKey) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
