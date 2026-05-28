<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="hero container">
    <div class="hero-grid">
      <div class="hero-left">
        <span class="tag live">{{ t('hero.available') }}</span>
        <h1 class="reveal in hero-h1">
          <span class="stack" style="font-size:83px">{{ t('hero.h1.l1') }}</span>
          <span class="stack outline italic" style="font-size:84px">{{ t('hero.h1.l2') }}</span>
          <span class="stack" style="font-size:84px">{{ t('hero.h1.l3') }}</span>
          <span class="stack" style="font-size:84px">{{ t('hero.h1.l4') }}<span class="caret" /></span>
        </h1>
        <p class="hero-sub">{{ t('hero.sub') }}</p>
        <div class="hero-cta">
          <NuxtLink to="/projects" class="btn btn-primary">
            {{ t('cta.view_work') }} <span class="arrow">→</span>
          </NuxtLink>
          <NuxtLink to="/contact" class="btn btn-ghost">{{ t('cta.get_in_touch') }}</NuxtLink>
        </div>
      </div>
      <div class="hero-right reveal in">
        <HomeHeroVisual />
      </div>
    </div>
    <div class="hero-meta">
      <span class="scroll-hint">{{ t('hero.scroll') }} <span class="line" /> {{ t('hero.down') }}</span>
      <span>SF · BER · v3.0 · 2026</span>
    </div>
  </section>
</template>
