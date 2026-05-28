import type { FaqItem, PricingTier, Service } from '~/types/service'

export const MOCK_SERVICES: Service[] = [
  { num: 'S·01', icon: '◐', key: 'svc.1' },
  { num: 'S·02', icon: '▤', key: 'svc.2' },
  { num: 'S·03', icon: '◊', key: 'svc.3' },
  { num: 'S·04', icon: '△', key: 'svc.4' },
]

export const MOCK_PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    nameKey: 'tier.starter',
    price: '$8k',
    perKey: 'tier.per',
    descKey: 'tier.s.desc',
    features: [
      { text: '1 focused project', included: true },
      { text: '2-week delivery', included: true },
      { text: 'Async Slack channel', included: true },
      { text: 'Source code + handoff', included: true },
      { text: '30-day support', included: true },
      { text: 'Design system work', included: false },
      { text: 'Ongoing retainer', included: false },
    ],
    ctaKey: 'cta.get_started',
    featured: false,
  },
  {
    id: 'pro',
    nameKey: 'tier.pro',
    price: '$22k',
    perKey: 'tier.per',
    descKey: 'tier.p.desc',
    features: [
      { text: 'End-to-end build', included: true },
      { text: '6–10 week timeline', included: true },
      { text: 'Weekly sync calls', included: true },
      { text: 'Design system included', included: true },
      { text: 'CI/CD + monitoring', included: true },
      { text: '60-day support', included: true },
    ],
    ctaKey: 'cta.get_started',
    featured: true,
    popularKey: 'tier.popular',
  },
  {
    id: 'custom',
    nameKey: 'tier.custom',
    price: '',
    perKey: '',
    descKey: 'tier.c.desc',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Dedicated weekly hours', included: true },
      { text: 'Team training & coaching', included: true },
      { text: 'Code review + architecture', included: true },
      { text: 'Long-term retainer', included: true },
    ],
    ctaKey: 'cta.contact_me',
    featured: false,
  },
]

export const MOCK_FAQ: FaqItem[] = [
  { questionKey: 'faq.q.1', answerKey: 'faq.a.1' },
  { questionKey: 'faq.q.2', answerKey: 'faq.a.2' },
  { questionKey: 'faq.q.3', answerKey: 'faq.a.3' },
  { questionKey: 'faq.q.4', answerKey: 'faq.a.4' },
  { questionKey: 'faq.q.5', answerKey: 'faq.a.5' },
  { questionKey: 'faq.q.6', answerKey: 'faq.a.6' },
]
