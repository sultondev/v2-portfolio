<script setup lang="ts">
import type { Photo } from '~/types/photo'
import { PhotoGroup } from '~/enums/photo'

type GroupFilter = PhotoGroup | 'all'

const { t } = useI18n()
const { fetchPhotos } = usePhotosData()

const { data: allPhotos } = await useAsyncData('photos', fetchPhotos)
const photos = computed<Photo[]>(() => allPhotos.value ?? [])

const groups: GroupFilter[] = [
  'all',
  PhotoGroup.Tashkent,
  PhotoGroup.SilkRoad,
  PhotoGroup.Berlin,
  PhotoGroup.Mountains,
  PhotoGroup.Desk,
]

const group = ref<GroupFilter>('all')
const open = ref(-1)

const list = computed(() =>
  group.value === 'all' ? photos.value : photos.value.filter(p => p.group === group.value)
)

const counted = computed(() =>
  groups.map(g => ({
    id: g,
    count: g === 'all' ? photos.value.length : photos.value.filter(p => p.group === g).length,
  }))
)

const cities = computed(() => new Set(photos.value.map(p => p.city)).size)

// A new filter yields a different list; drop the open frame rather than
// pointing the lightbox at an unrelated photo.
watch(group, () => { open.value = -1 })
// Guard against the list shrinking under an open index (e.g. data refresh).
watch(() => list.value.length, (len) => {
  if (open.value >= len) open.value = len > 0 ? len - 1 : -1
})

const onNav = (delta: number) => {
  const len = list.value.length
  if (!len) return
  open.value = (open.value + delta + len) % len
}
const onClose = () => { open.value = -1 }

useSeoMeta({
  title: `${t('nav.photos')} — sulton.dev`,
  description: t('photos.lead'),
})
</script>

<template>
  <section class="page-header container compact">
    <span class="section-label">/ {{ t('nav.photos').toLowerCase() }}</span>
    <h1>{{ t('photos.h1') }}</h1>
    <p>{{ t('photos.lead') }}</p>
    <div class="ph-stats">
      <span><b>{{ photos.length }}</b> {{ t('photos.frames') }}</span>
      <span><b>{{ cities }}</b> {{ t('photos.cities') }}</span>
      <span>X100V · 23mm</span>
    </div>
  </section>

  <section class="container">
    <div class="filter-bar">
      <div class="left">
        <button
          v-for="g in counted"
          :key="g.id"
          type="button"
          class="chip"
          :aria-pressed="group === g.id"
          @click="group = g.id"
        >
          {{ t(`photos.g.${g.id}`) }}<span class="count">{{ g.count }}</span>
        </button>
      </div>
    </div>
  </section>

  <section class="container ph-section">
    <div class="ph-grid">
      <PhotosPhotoTile
        v-for="(photo, i) in list"
        :key="photo.id"
        :photo="photo"
        :index="i"
        @open="open = $event"
      />
    </div>
  </section>

  <PhotosPhotoLightbox
    v-if="open >= 0 && list[open]"
    :list="list"
    :index="open"
    @close="onClose"
    @nav="onNav"
  />
</template>
