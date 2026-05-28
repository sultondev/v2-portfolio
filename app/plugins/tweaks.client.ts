import { watch } from 'vue'
import { useTweaks } from '~/composables/useTweaks'

export default defineNuxtPlugin(() => {
  const { tweaks } = useTweaks()

  const applyTweaks = () => {
    const root = document.documentElement
    const { accent, cyber, motion } = tweaks.value

    root.style.setProperty('--accent', accent)

    const m = (accent || '#7CFF6B').match(/^#?([0-9a-f]{6})$/i)
    if (m?.[1]) {
      const v = m[1]
      const rgb = [0, 2, 4].map(i => parseInt(v.slice(i, i + 2), 16)).join(' ')
      root.style.setProperty('--accent-glow', rgb)
    }

    root.style.setProperty('--cyber', String((cyber ?? 4) / 10))

    const motionVal = motion ? '1' : '0'
    root.setAttribute('data-motion', motionVal)
    document.body.setAttribute('data-motion', motionVal)
  }

  applyTweaks()
  watch(tweaks, applyTweaks, { deep: true })
})
