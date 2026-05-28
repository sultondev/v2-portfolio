// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n'],

  i18n: {
    locales: [
      { code: 'en', language: 'en', name: 'English', label: 'EN', file: 'en.ts' },
      { code: 'uz', language: 'uz', name: "O'zbek", label: 'UZ', file: 'uz.ts' },
      { code: 'ru', language: 'ru', name: 'Русский', label: 'RU', file: 'ru.ts' },
      { code: 'de', language: 'de', name: 'Deutsch', label: 'DE', file: 'de.ts' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'sulton.lang',
      redirectOn: 'root',
      fallbackLocale: 'en',
    },
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'sulton.dev — Design Engineer',
      meta: [
        { name: 'description', content: 'Design engineer building fast, accessible web products for startups and tech teams. Vue / Nuxt / TypeScript specialist.' },
        { name: 'theme-color', content: '#08090B' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'sulton.dev' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      // Set NUXT_PUBLIC_USE_MOCK_DATA=false in .env to connect to real APIs
      useMockData: 'true',
      siteUrl: 'https://sulton.dev',
    },
  },
})
