<script setup lang="ts">
const isOut = ref(false)
const visible = ref(true)
const startMs = Date.now()

onMounted(() => {
  const dismiss = () => {
    if (isOut.value) return
    isOut.value = true
    setTimeout(() => { visible.value = false }, 600)
  }
  const elapsed = Date.now() - startMs
  setTimeout(dismiss, Math.max(0, 350 - elapsed))
  setTimeout(dismiss, 8000)
})
</script>

<template>
  <div
    v-if="visible"
    id="loader"
    :class="{ 'is-out': isOut }"
    aria-label="Loading"
    role="status"
  >
    <div class="loader-inner">
      <div class="loader-glyph"><span>S</span></div>
      <div class="loader-brand">sulton<span class="dot">.</span>dev</div>
      <div class="loader-bar"><span /></div>
      <div class="loader-meta">booting interface…</div>
    </div>
  </div>
</template>
