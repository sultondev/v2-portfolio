<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="section container">
    <div class="cta-strip reveal">
      <h3>{{ t('cta.strip.title') }}</h3>
      <NuxtLink to="/contact" class="btn btn-primary">
        {{ t('cta.start_project') }} <span class="arrow">→</span>
      </NuxtLink>
    </div>
  </section>
</template>
