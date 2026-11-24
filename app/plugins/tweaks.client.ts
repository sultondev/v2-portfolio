import { watch } from 'vue'
import { useTweaks } from '~/composables/useTweaks'
import { useTheme } from '~/composables/useTheme'

export default defineNuxtPlugin(() => {
  const { tweaks } = useTweaks()
  const { effective } = useTheme()

  const applyTweaks = () => {
    const root = document.documentElement
    const { accent, cyber, motion } = tweaks.value

    const m = (accent || '#7CFF6B').match(/^#?([0-9a-f]{6})$/i)
    if (m?.[1]) {
      const v = m[1]
      let rgb = [0, 2, 4].map(i => parseInt(v.slice(i, i + 2), 16))
      // light theme: deepen bright accents so they read on a light ground
      if (effective.value === 'light') rgb = rgb.map(c => Math.round(c * 0.58))
      root.style.setProperty('--accent', `rgb(${rgb.join(',')})`)
      root.style.setProperty('--accent-glow', rgb.join(' '))
    }
    else {
      root.style.setProperty('--accent', accent)
    }

    root.style.setProperty('--cyber', String((cyber ?? 4) / 10))

    const motionVal = motion ? '1' : '0'
    root.setAttribute('data-motion', motionVal)
    document.body.setAttribute('data-motion', motionVal)
  }

  applyTweaks()
  watch([tweaks, effective], applyTweaks, { deep: true })
})
