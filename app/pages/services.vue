<script setup lang="ts">
import { MOCK_SERVICES, MOCK_PRICING_TIERS, MOCK_FAQ } from '~/data/mock/services'

const { t } = useI18n()

useSeoMeta({
  title: `${t('svc.h1')} — sulton.dev`,
  description: t('svc.lead'),
})
</script>

<template>
  <section class="page-header container compact">
    <span class="section-label">/ {{ t('nav.services').toLowerCase() }}</span>
    <h1>{{ t('svc.h1') }}</h1>
    <p>{{ t('svc.lead') }}</p>
  </section>

  <section class="section container" style="padding-top:16px">
    <div class="services-grid">
      <article v-for="svc in MOCK_SERVICES" :key="svc.num" class="svc">
        <div class="svc-num">{{ svc.num }}</div>
        <div class="svc-icon">{{ svc.icon }}</div>
        <h3>{{ t(`${svc.key}.t`) }}</h3>
        <p>{{ t(`${svc.key}.d`) }}</p>
        <a href="#" class="learn">{{ t('cta.learn_more') }} <span class="arrow">→</span></a>
      </article>
    </div>
  </section>

  <section class="section container">
    <div class="section-head">
      <div>
        <span class="section-label">{{ t('pricing.label') }}</span>
        <h2 class="section-title"><span class="num">02</span>{{ t('pricing.title') }}</h2>
      </div>
      <span class="tag">{{ t('pricing.tag') }}</span>
    </div>
    <div class="pricing-grid">
      <div
        v-for="tier in MOCK_PRICING_TIERS"
        :key="tier.id"
        :class="['tier', { featured: tier.featured }]"
      >
        <span v-if="tier.popularKey" class="tier-flag">★ {{ t(tier.popularKey) }}</span>
        <span class="tier-name">{{ t(tier.nameKey) }}</span>
        <h3>
          <template v-if="tier.price">
            {{ tier.price.startsWith('$') ? tier.price.slice(1) : tier.price }}
          </template>
          <template v-else>{{ t('tier.bespoke') }}</template>
        </h3>
        <p style="color:var(--ink-3);font-size:13.5px;margin:8px 0 0;line-height:1.55">
          {{ t(tier.descKey) }}
        </p>
        <ul>
          <li v-for="f in tier.features" :key="f.text" :class="{ off: !f.included }">
            <span class="mark">{{ f.included ? '✓' : '—' }}</span>{{ f.text }}
          </li>
        </ul>
        <NuxtLink
          to="/contact"
          :class="['btn', tier.featured ? 'btn-primary' : 'btn-ghost']"
        >
          {{ t(tier.ctaKey) }} <span class="arrow">→</span>
        </NuxtLink>
      </div>
    </div>
  </section>

  <section class="section container">
    <div class="section-head">
      <div>
        <span class="section-label">{{ t('faq.label') }}</span>
        <h2 class="section-title"><span class="num">03</span>{{ t('faq.title') }}</h2>
      </div>
    </div>
    <ServicesFaqList :items="MOCK_FAQ" />
  </section>
</template>
