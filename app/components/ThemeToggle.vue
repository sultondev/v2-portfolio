<script setup lang="ts">
const { t } = useI18n()
const { theme, effective, toggle } = useTheme()

// Both icons are always rendered; CSS picks the visible one from <html data-theme>
// or prefers-color-scheme, so SSR and client markup match. The label needs the
// effective theme, which is only known on the client: until mount, use the
// server's view (explicit cookie theme, else dark).
const mounted = ref(false)
onMounted(() => { mounted.value = true })

const isDark = computed(() => (mounted.value ? effective.value : (theme.value ?? 'dark')) === 'dark')
const label = computed(() => (isDark.value ? t('theme.to_light') : t('theme.to_dark')))
</script>

<template>
  <!-- `class` passed by the parent falls through onto the button -->
  <button
    type="button"
    class="theme-toggle"
    :aria-label="label"
    :title="label"
    @click="toggle($event)"
  >
    <svg
      class="tt-sun"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
    <svg
      class="tt-moon"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  </button>
</template>
