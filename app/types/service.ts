export interface Service {
  num: string
  icon: string
  /** i18n key prefix — title is at `{key}.t`, description at `{key}.d` */
  key: string
}

export interface PricingFeature {
  text: string
  included: boolean
}

export interface PricingTier {
  id: string
  /** i18n key for tier name */
  nameKey: string
  price: string
  /** i18n key for the "/project" suffix */
  perKey: string
  /** i18n key for description */
  descKey: string
  features: PricingFeature[]
  /** i18n key for the CTA button */
  ctaKey: string
  featured: boolean
  /** i18n key for the popular badge (if featured) */
  popularKey?: string
}

export interface FaqItem {
  questionKey: string
  answerKey: string
}
