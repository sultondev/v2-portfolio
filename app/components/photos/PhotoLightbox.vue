<script setup lang="ts">
import type { Photo } from '~/types/photo'

const props = defineProps<{
  list: Photo[]
  index: number
}>()

const emit = defineEmits<{
  close: []
  nav: [delta: number]
}>()

const { t } = useI18n()

const photo = computed(() => props.list[props.index]!)
const pad = (n: number) => String(n).padStart(2, '0')

const dialog = ref<HTMLElement | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)
let opener: HTMLElement | null = null
let prevOverflow = ''

// keep Tab / Shift+Tab inside the dialog, wrapping at both ends
const trapTab = (e: KeyboardEvent) => {
  const items = Array.from(
    dialog.value?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])') ?? [],
  )
  if (!items.length) return
  const first = items[0]!
  const last = items[items.length - 1]!
  const current = document.activeElement as HTMLElement | null
  const inside = !!current && items.includes(current)
  if (e.shiftKey && (!inside || current === first)) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && (!inside || current === last)) {
    e.preventDefault()
    first.focus()
  }
}

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Tab') trapTab(e)
  else if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowRight') emit('nav', 1)
  else if (e.key === 'ArrowLeft') emit('nav', -1)
}

const onBackdrop = (e: MouseEvent) => {
  if (e.target === e.currentTarget) emit('close')
}

onMounted(() => {
  opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
  document.addEventListener('keydown', onKey)
  prevOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  nextTick(() => closeBtn.value?.focus())
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = prevOverflow
  if (opener && document.contains(opener)) opener.focus()
  opener = null
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="dialog"
      class="ph-lb"
      role="dialog"
      aria-modal="true"
      :aria-label="photo.title"
      @click="onBackdrop"
    >
      <button
        ref="closeBtn"
        type="button"
        class="ph-lb-close"
        :aria-label="t('photos.close')"
        @click="emit('close')"
      >
        <span aria-hidden="true">✕</span>
      </button>
      <button
        type="button"
        class="ph-lb-nav prev"
        :aria-label="t('pg.prev')"
        @click="emit('nav', -1)"
      >
        <span aria-hidden="true">←</span>
      </button>

      <div :key="photo.id" class="ph-lb-stage">
        <div class="ph-lb-empty" :style="{ aspectRatio: photo.ratio }">
          <span>{{ t('photos.empty') }}</span>
        </div>
      </div>

      <aside class="ph-lb-meta">
        <span class="ph-lb-count">{{ pad(index + 1) }} / {{ pad(list.length) }}</span>
        <h2>{{ photo.title }}</h2>
        <p class="ph-lb-place">{{ photo.place }}, {{ photo.city }}</p>
        <dl>
          <div><dt>{{ t('photos.date') }}</dt><dd>{{ photo.date }}</dd></div>
          <div><dt>{{ t('photos.camera') }}</dt><dd>{{ photo.camera }}</dd></div>
          <div><dt>{{ t('photos.lens') }}</dt><dd>{{ photo.lens }}</dd></div>
          <div><dt>{{ t('photos.exposure') }}</dt><dd>{{ photo.exif }}</dd></div>
        </dl>
        <span class="tag">{{ t(`photos.g.${photo.group}`) }}</span>
      </aside>

      <button
        type="button"
        class="ph-lb-nav next"
        :aria-label="t('pg.next')"
        @click="emit('nav', 1)"
      >
        <span aria-hidden="true">→</span>
      </button>
    </div>
  </Teleport>
</template>
