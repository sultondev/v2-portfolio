<script setup lang="ts">
import type { DropdownEmits, DropdownProps } from '~/types/dropdown'

const { value, options, label = '', block = false } = defineProps<DropdownProps>()

const emit = defineEmits<DropdownEmits>()

const open = ref(false)
const triggerRef = ref<HTMLButtonElement | null>(null)
const menuRef = ref<HTMLUListElement | null>(null)
const focusedIdx = ref(-1)

const selectedLabel = computed(() => options.find(o => o.value === value)?.label ?? value)

const close = () => { open.value = false; focusedIdx.value = -1 }

const toggle = () => {
  open.value = !open.value
  if (open.value) {
    focusedIdx.value = options.findIndex(o => o.value === value)
    nextTick(() => menuRef.value?.focus())
  }
}

const select = (v: string) => {
  emit('change', v)
  close()
  triggerRef.value?.focus()
}

const onKey = (e: KeyboardEvent) => {
  if (!open.value) return
  if (e.key === 'ArrowDown') { e.preventDefault(); focusedIdx.value = Math.min(focusedIdx.value + 1, options.length - 1) }
  if (e.key === 'ArrowUp') { e.preventDefault(); focusedIdx.value = Math.max(focusedIdx.value - 1, 0) }
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (focusedIdx.value >= 0) select(options[focusedIdx.value]!.value) }
  if (e.key === 'Escape') { close(); triggerRef.value?.focus() }
}

const containerRef = ref<HTMLDivElement | null>(null)
const onDocClick = (e: MouseEvent) => {
  if (open.value && containerRef.value && !containerRef.value.contains(e.target as Node)) close()
}
onMounted(() => document.addEventListener('click', onDocClick, true))
onUnmounted(() => document.removeEventListener('click', onDocClick, true))
</script>

<template>
  <div ref="containerRef" :class="['dd', { open, 'dd-block': block }]">
    <button
      ref="triggerRef"
      type="button"
      class="dd-trigger"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="toggle"
    >
      <span class="dd-value">
        <span v-if="label" class="dd-label">{{ label }}</span>
        {{ selectedLabel }}
      </span>
      <span class="dd-caret" aria-hidden="true">▾</span>
    </button>
    <Transition name="dd">
      <ul
        v-if="open"
        ref="menuRef"
        class="dd-menu"
        role="listbox"
        tabindex="-1"
        :aria-activedescendant="focusedIdx >= 0 ? `dd-opt-${focusedIdx}` : undefined"
        @keydown="onKey"
      >
        <li
          v-for="(opt, i) in options"
          :id="`dd-opt-${i}`"
          :key="opt.value"
          role="option"
          :aria-selected="opt.value === value"
          :class="['dd-item', { selected: opt.value === value, active: i === focusedIdx }]"
          @click="select(opt.value)"
          @mouseenter="focusedIdx = i"
        >
          {{ opt.label }}
          <span v-if="opt.value === value" class="dd-check" aria-hidden="true">✓</span>
        </li>
      </ul>
    </Transition>
  </div>
</template>
