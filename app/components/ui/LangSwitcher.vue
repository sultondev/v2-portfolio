<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

interface LocaleWithLabel {
  code: string
  name: string
  label?: string
}

const langs = computed(() => locales.value as LocaleWithLabel[])
</script>

<template>
  <div class="lang-switcher" role="group" aria-label="Language">
    <button
      v-for="l in langs"
      :key="l.code"
      type="button"
      :class="['lang-btn', { active: locale === l.code }]"
      :title="l.name"
      :aria-pressed="locale === l.code"
      @click="setLocale(l.code as 'en' | 'uz' | 'ru' | 'de')"
    >
      {{ l.label ?? l.code.toUpperCase() }}
    </button>
  </div>
</template>
