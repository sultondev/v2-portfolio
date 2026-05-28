<script setup lang="ts">
import { nextTick } from 'vue'

const route = useRoute()
const { tweaks } = useTweaks()

let io: IntersectionObserver | null = null

const setupReveal = async () => {
  io?.disconnect()

  if (!tweaks.value.motion) {
    document.querySelectorAll<HTMLElement>('.reveal').forEach(el => el.classList.add('in'))
    return
  }

  await nextTick()

  io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }),
    { threshold: 0.12 }
  )
  document.querySelectorAll('.reveal').forEach(el => io!.observe(el))
}

watch([() => route.fullPath, () => tweaks.value.motion], setupReveal)
onMounted(setupReveal)
onUnmounted(() => io?.disconnect())
</script>

<template>
  <TheNav />
  <main>
    <slot />
  </main>
  <TheFooter />
  <ClientOnly>
    <TweaksPanel />
  </ClientOnly>
</template>
