export interface TweakValues {
  accent: string
  cyber: number
  motion: boolean
}

export const TWEAK_DEFAULTS: TweakValues = {
  accent: '#7CFF6B',
  cyber: 4,
  motion: true,
}

export const ACCENT_PRESETS: Array<{ name: string; color: string }> = [
  { name: 'Vue green', color: '#7CFF6B' },
  { name: 'Cyber teal', color: '#5EEAD4' },
  { name: 'Hot pink', color: '#FF5C8A' },
  { name: 'Amber', color: '#FFB347' },
  { name: 'Mono', color: '#E5E5E5' },
]
