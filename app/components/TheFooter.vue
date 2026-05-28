<script setup lang="ts">
const { t } = useI18n()

const navPages = ['home', 'projects', 'services', 'blog', 'contact']
const pageToPath = (p: string) => p === 'home' ? '/' : `/${p}`
</script>

<template>
  <footer class="footer">
    <div>
      <NuxtLink to="/" class="logo">
        <span class="glyph">S</span>
        <span>sulton<span class="dot">.</span>dev</span>
      </NuxtLink>
      <div class="meta-line">{{ t('footer.meta') }}</div>
      <a class="old-link" href="https://old.sulton.dev" target="_blank" rel="noreferrer">
        <span class="old-link-dot" aria-hidden="true" />
        {{ t('footer.old') }}
        <span class="arrow">↗</span>
      </a>
    </div>
    <div class="col-mid">
      <NuxtLink v-for="p in navPages" :key="p" :to="pageToPath(p)">/{{ p }}</NuxtLink>
    </div>
    <div class="col-r">
      <a href="https://github.com/sulton" target="_blank" rel="noreferrer">GitHub ↗</a>
      <a href="https://linkedin.com/in/sulton" target="_blank" rel="noreferrer">LinkedIn ↗</a>
      <a href="https://x.com/sulton" target="_blank" rel="noreferrer">X ↗</a>
    </div>
  </footer>
</template>
