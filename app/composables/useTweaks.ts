import { TWEAK_DEFAULTS } from '~/types/tweaks'
import type { TweakValues } from '~/types/tweaks'

export const useTweaks = () => {
  const tweaks = useState<TweakValues>('tweaks', () => ({ ...TWEAK_DEFAULTS }))

  const setTweak = <K extends keyof TweakValues>(key: K, value: TweakValues[K]) => {
    tweaks.value = { ...tweaks.value, [key]: value }
  }

  return { tweaks: readonly(tweaks), setTweak }
}
