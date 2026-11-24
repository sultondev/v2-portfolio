<script setup lang="ts">
import type { Photo } from '~/types/photo'

const props = defineProps<{
  photo: Photo
  index: number
}>()

const emit = defineEmits<{
  open: [index: number]
}>()

const { t } = useI18n()

const num = computed(() => String(props.index + 1).padStart(2, '0'))
</script>

<template>
  <figure class="ph-tile reveal in" :style="{ aspectRatio: photo.ratio }">
    <div class="ph-slot" aria-hidden="true">{{ t('photos.drop') }} — {{ photo.title }}</div>
    <div class="ph-over">
      <div class="ph-top">
        <span class="ph-num">{{ num }}</span>
        <button
          type="button"
          class="ph-expand"
          :aria-label="`${t('photos.open')}: ${photo.title}`"
          @click="emit('open', index)"
        >
          <svg
            viewBox="0 0 24 24"
            width="13"
            height="13"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            aria-hidden="true"
          ><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></svg>
        </button>
      </div>
      <div class="ph-cap">
        <span class="ph-title">{{ photo.title }}</span>
        <span class="ph-place">{{ photo.city }} · {{ photo.date }}</span>
      </div>
    </div>
  </figure>
</template>
