<script setup lang="ts">
const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  type: 'web',
  message: '',
  subscribe: false,
})

const typeOptions = computed(() => [
  { value: 'web', label: t('form.opt.web') },
  { value: 'ds', label: t('form.opt.ds') },
  { value: 'mvp', label: t('form.opt.mvp') },
  { value: 'audit', label: t('form.opt.audit') },
  { value: 'other', label: t('form.opt.other') },
])

const onSubmit = async () => {
  // TODO: wire to API endpoint /api/contact
}

useSeoMeta({
  title: `Contact — sulton.dev`,
  description: t('contact.lead'),
})
</script>

<template>
  <section class="page-header container compact">
    <span class="section-label">{{ t('contact.label') }}</span>
  </section>

  <section class="container" style="padding-bottom:clamp(64px,9vw,120px)">
    <div class="contact-grid">
      <div>
        <h1 style="font-size:clamp(56px,8vw,112px);letter-spacing:-0.04em;margin:0 0 18px;line-height:0.95;font-weight:600">
          {{ t('contact.h1.l1') }}<br />
          <span style="color:var(--accent);text-shadow:0 0 28px rgba(124,255,107,0.45)">
            {{ t('contact.h1.l2') }}
          </span>
        </h1>
        <p style="color:var(--ink-2);font-size:16px;max-width:50ch;line-height:1.6;margin:0 0 40px">
          {{ t('contact.lead') }}
        </p>
        <form class="form" @submit.prevent="onSubmit">
          <div class="field">
            <label>{{ t('form.name') }}</label>
            <input v-model="form.name" :placeholder="t('form.placeholder.name')" />
          </div>
          <div class="field">
            <label>{{ t('form.email') }}</label>
            <input v-model="form.email" type="email" :placeholder="t('form.placeholder.email')" />
          </div>
          <div class="field">
            <label>{{ t('form.type') }}</label>
            <UiDropdown
              :value="form.type"
              :options="typeOptions"
              class="dd-block"
              @change="form.type = $event"
            />
          </div>
          <div class="field">
            <label>{{ t('form.message') }}</label>
            <textarea v-model="form.message" :placeholder="t('form.placeholder.message')" />
          </div>
          <label class="checkbox">
            <input v-model="form.subscribe" type="checkbox" />
            {{ t('form.subscribe') }}
          </label>
          <div class="form-foot">
            <button type="submit" class="btn btn-primary">
              {{ t('cta.send') }} <span class="arrow">→</span>
            </button>
            <span class="hint">
              {{ t('form.hint') }}
              <a href="mailto:hello@sulton.dev" style="color:var(--ink);border-bottom:1px solid var(--line-strong)">
                hello@sulton.dev
              </a>
              {{ t('form.direct') }}
            </span>
          </div>
        </form>
      </div>

      <aside class="aside-block">
        <div>
          <h4>{{ t('aside.other') }}</h4>
          <div class="list-link">
            <a href="mailto:hello@sulton.dev">
              <span>hello@sulton.dev</span><span class="arrow">↗</span>
            </a>
            <a href="#">
              <span>{{ t('aside.book') }}</span><span class="arrow">↗</span>
            </a>
            <a href="#">
              <span>{{ t('aside.cv') }}</span><span class="arrow">↗</span>
            </a>
          </div>
        </div>
        <div>
          <h4>{{ t('aside.find') }}</h4>
          <div class="list-link">
            <a href="https://github.com/sulton" target="_blank" rel="noreferrer">
              <span>GitHub</span><span class="arrow">↗</span>
            </a>
            <a href="https://linkedin.com/in/sulton" target="_blank" rel="noreferrer">
              <span>LinkedIn</span><span class="arrow">↗</span>
            </a>
            <a href="https://x.com/sulton" target="_blank" rel="noreferrer">
              <span>X / Twitter</span><span class="arrow">↗</span>
            </a>
            <a href="#"><span>Read.cv</span><span class="arrow">↗</span></a>
            <a href="#"><span>Mastodon</span><span class="arrow">↗</span></a>
          </div>
        </div>
        <div>
          <h4>{{ t('aside.status') }}</h4>
          <div class="status-card">
            <div class="status-row live">
              <span class="dot" /><span>{{ t('status.avail') }}</span>
              <span class="when">{{ t('status.may') }}</span>
            </div>
            <div class="status-row">
              <span class="dot" /><span>{{ t('status.booked') }}</span>
              <span class="when">{{ t('status.jun') }}</span>
            </div>
            <div class="status-row">
              <span class="dot" /><span>{{ t('status.tent') }}</span>
              <span class="when">{{ t('status.julaug') }}</span>
            </div>
          </div>
          <p style="margin:12px 0 0;color:var(--ink-3);font-size:12px;font-family:'Geist Mono',monospace">
            {{ t('status.based') }}
          </p>
        </div>
      </aside>
    </div>
  </section>
</template>
