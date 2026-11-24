<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'dropdown' | 'inline'
}>(), {
  variant: 'dropdown',
})

const { t, locale, locales, setLocale } = useI18n()

type LocaleCode = typeof locale.value

interface LocaleWithLabel {
  code: LocaleCode
  name: string
  label?: string
}

const langs = computed(() => locales.value as LocaleWithLabel[])
const current = computed(() => langs.value.find(l => l.code === locale.value) ?? langs.value[0]!)
const labelOf = (l: LocaleWithLabel) => l.label ?? l.code.toUpperCase()

const open = ref(false)
const active = ref(0)
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const menu = ref<HTMLElement | null>(null)

const optId = (code: LocaleCode) => `lang-opt-${code}`
const activeId = computed(() => {
  const l = langs.value[active.value]
  return open.value && l ? optId(l.code) : undefined
})

const openMenu = () => {
  active.value = Math.max(0, langs.value.findIndex(l => l.code === locale.value))
  open.value = true
  // focus the listbox so screen readers follow aria-activedescendant
  nextTick(() => menu.value?.focus())
}

const close = (refocus = false) => {
  open.value = false
  if (refocus) trigger.value?.focus()
}

const toggleMenu = () => (open.value ? close() : openMenu())

// setLocale also persists the choice in the `sulton.lang` cookie
// (detectBrowserLanguage.useCookie in nuxt.config).
const pick = (code: LocaleCode) => {
  setLocale(code)
  close(true)
}

const onDocMouseDown = (e: MouseEvent) => {
  if (root.value && !root.value.contains(e.target as Node)) close()
}

watch(open, (isOpen) => {
  if (isOpen) document.addEventListener('mousedown', onDocMouseDown)
  else document.removeEventListener('mousedown', onDocMouseDown)
})

onBeforeUnmount(() => document.removeEventListener('mousedown', onDocMouseDown))

// close when keyboard focus leaves the component (e.g. Tab out of the listbox).
// Pointer presses inside are ignored: Safari doesn't focus buttons on click, so
// relatedTarget is null there and the trigger click would re-open the menu.
let pointerInside = false
const onRootPointerDown = () => {
  pointerInside = true
  window.setTimeout(() => { pointerInside = false }, 0)
}
const onFocusOut = (e: FocusEvent) => {
  if (pointerInside) return
  const next = e.relatedTarget as Node | null
  if (open.value && !(next && root.value?.contains(next))) close()
}

const onTriggerKeyDown = (e: KeyboardEvent) => {
  if (!open.value && e.key === 'ArrowDown') {
    e.preventDefault()
    openMenu()
  }
}

const onMenuKeyDown = (e: KeyboardEvent) => {
  if (!open.value) return
  const n = langs.value.length
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    active.value = (active.value + 1) % n
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = (active.value - 1 + n) % n
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    const l = langs.value[active.value]
    if (l) pick(l.code)
  } else if (e.key === 'Escape') {
    e.preventDefault()
    close(true)
  }
}
</script>

<template>
  <div
    v-if="props.variant === 'inline'"
    class="lang-inline"
    role="group"
    :aria-label="t('lang.label')"
  >
    <button
      v-for="l in langs"
      :key="l.code"
      type="button"
      :class="['lang-chip', { active: locale === l.code }]"
      :aria-pressed="locale === l.code"
      @click="setLocale(l.code)"
    >
      <span class="lc-code">{{ labelOf(l) }}</span>
      <span class="lc-name">{{ l.name }}</span>
    </button>
  </div>

  <div v-else ref="root" :class="['lang-dd', { open }]" @focusout="onFocusOut" @pointerdown="onRootPointerDown">
    <button
      ref="trigger"
      type="button"
      class="lang-dd-trigger"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :aria-label="`${t('lang.label')}: ${current.name}`"
      @click="toggleMenu"
      @keydown="onTriggerKeyDown"
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
      </svg>
      <span :key="current.code" class="lang-dd-code">{{ labelOf(current) }}</span>
      <span class="lang-dd-caret" aria-hidden="true">▾</span>
    </button>
    <!-- mousedown.prevent keeps focus on the listbox while clicking an option -->
    <div
      ref="menu"
      class="lang-dd-menu"
      role="listbox"
      tabindex="-1"
      :aria-label="t('lang.label')"
      :aria-activedescendant="activeId"
      :aria-hidden="!open"
      @keydown="onMenuKeyDown"
      @mousedown.prevent
    >
      <div class="lang-dd-head">{{ t('lang.label') }}</div>
      <button
        v-for="(l, i) in langs"
        :id="optId(l.code)"
        :key="l.code"
        type="button"
        role="option"
        :aria-selected="locale === l.code"
        tabindex="-1"
        :class="['lang-dd-item', { selected: locale === l.code, hot: i === active }]"
        :style="{ transitionDelay: open ? `${i * 35 + 40}ms` : '0ms' }"
        @mouseenter="active = i"
        @click="pick(l.code)"
      >
        <span class="ldi-code">{{ labelOf(l) }}</span>
        <span class="ldi-name">{{ l.name }}</span>
        <span class="ldi-check" aria-hidden="true">{{ locale === l.code ? '●' : '' }}</span>
      </button>
    </div>
  </div>
</template>
