<script setup lang="ts">
const { t } = useI18n()
const email = ref('')

const onSubmit = () => {
  // TODO: wire to API endpoint /api/newsletter
  email.value = ''
}
</script>

<template>
  <div class="newsletter">
    <div>
      <h3>{{ t('blog.news.title') }}</h3>
      <p>{{ t('blog.news.body') }}</p>
    </div>
    <form @submit.prevent="onSubmit">
      <input v-model="email" class="input" placeholder="you@domain.dev" type="email" required />
      <button type="submit" class="btn btn-primary">
        {{ t('cta.subscribe') }} <span class="arrow">→</span>
      </button>
    </form>
  </div>
</template>
