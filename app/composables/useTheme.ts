import { computed, nextTick, ref } from 'vue'
import { useTweaks } from '~/composables/useTweaks'

export type Theme = 'light' | 'dark'

const COOKIE_KEY = 'sulton.theme'
const ONE_YEAR = 60 * 60 * 24 * 365
const LIGHT_QUERY = '(prefers-color-scheme: light)'

const isTheme = (v: unknown): v is Theme => v === 'light' || v === 'dark'

// The View Transition API may be missing from the TS DOM lib in use.
interface ViewTransitionLike {
  ready: Promise<void>
  finished: Promise<void>
  updateCallbackDone: Promise<void>
}
type DocumentWithVT = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => ViewTransitionLike
}

// OS preference, client only. Module-level on purpose: it is never written on
// the server, so it cannot leak between requests. Starts as 'dark' so the first
// client render matches SSR; listeners update it after setup.
const systemTheme = ref<Theme>('dark')
let systemWatching = false
const readSystem = (): Theme =>
  import.meta.client && window.matchMedia?.(LIGHT_QUERY).matches ? 'light' : 'dark'

export const useTheme = () => {
  const cookie = useCookie<Theme | null>(COOKIE_KEY, {
    sameSite: 'lax',
    maxAge: ONE_YEAR,
    default: () => null,
  })
  // null = "system": no cookie yet, CSS follows prefers-color-scheme.
  const theme = useState<Theme | null>('theme', () => (isTheme(cookie.value) ? cookie.value : null))
  const { tweaks } = useTweaks()

  if (import.meta.client && !systemWatching) {
    systemWatching = true
    systemTheme.value = readSystem()
    window.matchMedia?.(LIGHT_QUERY).addEventListener?.('change', () => {
      systemTheme.value = readSystem()
    })
  }

  /** The theme actually on screen (explicit choice, else OS preference). */
  const effective = computed<Theme>(() => theme.value ?? systemTheme.value)

  const apply = (next: Theme) => {
    document.documentElement.dataset.theme = next
    theme.value = next
    cookie.value = next
  }

  const toggle = (event?: MouseEvent) => {
    if (!import.meta.client) return
    const root = document.documentElement
    const current: Theme = theme.value ?? readSystem()
    const next: Theme = current === 'dark' ? 'light' : 'dark'

    const target = event?.currentTarget instanceof Element ? event.currentTarget : null
    const rect = target?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 60
    const y = rect ? rect.top + rect.height / 2 : 30

    const doc = document as DocumentWithVT
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    if (!doc.startViewTransition || reduce || !tweaks.value.motion) {
      root.classList.add('theme-anim')
      window.setTimeout(() => root.classList.remove('theme-anim'), 400)
      apply(next)
      return
    }

    // water drop: ripple rings at the source
    const drop = document.createElement('div')
    drop.className = 'theme-drop'
    drop.style.left = `${x}px`
    drop.style.top = `${y}px`
    drop.innerHTML = '<i></i><i></i><i></i>'
    document.body.appendChild(drop)
    window.setTimeout(() => drop.remove(), 1600)

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    // scopes the "no default cross-fade" view-transition CSS to this transition only
    root.classList.add('theme-vt')
    const vt = doc.startViewTransition(async () => {
      apply(next)
      await nextTick()
    })

    vt.finished
      .catch(() => { /* ignore */ })
      .finally(() => root.classList.remove('theme-vt'))

    vt.ready
      .then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius * 0.18}px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
            offset: [0, 0.22, 1],
          },
          {
            duration: 1100,
            easing: 'cubic-bezier(.65,0,.25,1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      .catch(() => { /* transition skipped; theme is already applied */ })
  }

  return { theme: readonly(theme), effective, toggle }
}
