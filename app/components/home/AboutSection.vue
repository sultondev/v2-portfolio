<script setup lang="ts">
const { t } = useI18n()

const highlights = [
  { key: '1' },
  { key: '2' },
  { key: '3' },
  { key: '4' },
]
</script>

<template>
  <section class="section container reveal">
    <div class="section-head">
      <div>
        <span class="section-label">{{ t('about.label') }}</span>
        <h2 class="section-title"><span class="num">01</span>{{ t('about.title') }}</h2>
      </div>
    </div>
    <div class="about-grid">
      <div class="about-img"><span>{{ t('about.imgalt') }}</span></div>
      <div class="about-text">
        <h3>{{ t('about.lead') }}</h3>
        <p>{{ t('about.body') }}</p>
        <ul class="highlights">
          <li v-for="h in highlights" :key="h.key">
            <span class="k">0{{ h.key }}</span>
            <span class="v">{{ t(`about.h.${h.key}`) }}</span>
            <span class="meta">{{ t(`about.m.${h.key}`) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
