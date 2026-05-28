<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig()

useSeoMeta({
  title: 'sulton.dev — Design Engineer',
  description: t('hero.sub'),
  ogTitle: 'sulton.dev — Design Engineer',
  ogDescription: t('hero.sub'),
  ogUrl: config.public.siteUrl as string,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <HomeHeroSection />
  <HomeAboutSection />
  <HomeStackSection />
  <HomeFeaturedProjects />
  <HomeCtaStrip />
</template>
