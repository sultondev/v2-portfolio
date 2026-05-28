<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const mobileOpen = ref(false)

const navItems = [
  { id: 'home', key: 'nav.home', path: '/' },
  { id: 'projects', key: 'nav.projects', path: '/projects' },
  { id: 'services', key: 'nav.services', path: '/services' },
  { id: 'blog', key: 'nav.blog', path: '/blog' },
  { id: 'contact', key: 'nav.contact', path: '/contact' },
]

watch(() => route.fullPath, () => { mobileOpen.value = false })

watch(mobileOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

onUnmounted(() => { document.body.style.overflow = '' })

const isActive = (path: string) =>
  path === '/' ? route.path === '/' : route.path.startsWith(path)
</script>

<template>
  <nav class="nav">
    <div class="nav-inner">
      <NuxtLink to="/" class="logo">
        <span class="glyph">S</span>
        <span>sulton<span class="dot">.</span>dev</span>
      </NuxtLink>

      <div class="nav-links">
        <NuxtLink
          v-for="item in navItems"
          :key="item.id"
          :to="item.path"
          :aria-current="isActive(item.path) ? 'page' : undefined"
        >
          {{ t(item.key) }}
        </NuxtLink>
      </div>

      <div class="nav-right">
        <UiLangSwitcher class="lang-switcher-desktop" />
        <NuxtLink to="/contact" class="btn btn-primary btn-sm cta-desktop">
          {{ t('cta.lets_build') }} <span class="arrow">→</span>
        </NuxtLink>
        <button
          type="button"
          :class="['hamburger', { open: mobileOpen }]"
          aria-label="Menu"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <span /><span /><span />
        </button>
      </div>
    </div>

    <div :class="['mobile-menu', { open: mobileOpen }]" :aria-hidden="!mobileOpen">
      <div class="mm-inner">
        <ul class="mm-links">
          <li
            v-for="(item, idx) in navItems"
            :key="item.id"
            :style="{ transitionDelay: `${idx * 40}ms` }"
          >
            <NuxtLink
              :to="item.path"
              :aria-current="isActive(item.path) ? 'page' : undefined"
            >
              <span class="mm-num">0{{ idx + 1 }}</span>
              <span class="mm-label">{{ t(item.key) }}</span>
              <span class="mm-arrow">→</span>
            </NuxtLink>
          </li>
        </ul>
        <div class="mm-foot">
          <div class="mm-lang">
            <UiLangSwitcher />
          </div>
          <NuxtLink to="/contact" class="btn btn-primary">
            {{ t('cta.lets_build') }} <span class="arrow">→</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
