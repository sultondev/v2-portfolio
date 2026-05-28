<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <div class="hero-visual">
    <div class="hv-bar">
      <span class="dots"><i /><i /><i /></span>
      <span class="path">~/portfolio · main · zsh</span>
    </div>
    <div class="hv-line"><span class="tk-com">// stack as of {{ year }}</span></div>
    <div class="hv-line"><span class="tk-key">const</span> <span class="tk-fn">profile</span> = &#123;</div>
    <div class="hv-line">&nbsp; role: <span class="tk-str">'Design Engineer'</span>,</div>
    <div class="hv-line">&nbsp; city: <span class="tk-str">'Berlin · UTC+1'</span>,</div>
    <div class="hv-line">&nbsp; shipped: <span class="tk-num">47</span>,</div>
    <div class="hv-line">&nbsp; stack: [<span class="tk-str">'vue'</span>, <span class="tk-str">'nuxt'</span>, <span class="tk-str">'ts'</span>, <span class="tk-str">'rust'</span>],</div>
    <div class="hv-line">&nbsp; available: <span class="tk-key">true</span>,</div>
    <div class="hv-line">&#125;</div>
    <div class="hv-line">&nbsp;</div>
    <div class="hv-line"><span class="tk-com">$</span> <span class="cursor">deploy --prod</span></div>
  </div>
</template>
