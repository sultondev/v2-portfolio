<script setup lang="ts">
const { locale } = useI18n()
const { theme } = useTheme()
// null theme = follow the OS: the attribute is omitted and CSS uses prefers-color-scheme
useHead({
  htmlAttrs: {
    'lang': locale,
    'data-theme': theme,
  },
})
</script>

<template>
  <TheLoader />
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
