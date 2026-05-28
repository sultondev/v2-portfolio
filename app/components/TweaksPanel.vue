<script setup lang="ts">
import { ACCENT_PRESETS } from '~/types/tweaks'

const { tweaks, setTweak } = useTweaks()

const open = ref(false)
const panelRef = ref<HTMLDivElement | null>(null)
const offset = ref({ x: 16, y: 16 })
const PAD = 16

const clamp = () => {
  const panel = panelRef.value
  if (!panel) return
  const w = panel.offsetWidth, h = panel.offsetHeight
  const maxX = Math.max(PAD, window.innerWidth - w - PAD)
  const maxY = Math.max(PAD, window.innerHeight - h - PAD)
  offset.value = {
    x: Math.min(maxX, Math.max(PAD, offset.value.x)),
    y: Math.min(maxY, Math.max(PAD, offset.value.y)),
  }
}

watch(open, async (val) => {
  if (val) { await nextTick(); clamp() }
})

const onDragStart = (e: MouseEvent) => {
  const panel = panelRef.value
  if (!panel) return
  const r = panel.getBoundingClientRect()
  const sx = e.clientX, sy = e.clientY
  const startRight = window.innerWidth - r.right
  const startBottom = window.innerHeight - r.bottom
  const move = (ev: MouseEvent) => {
    offset.value = {
      x: Math.min(Math.max(PAD, startRight - (ev.clientX - sx)), window.innerWidth - panel.offsetWidth - PAD),
      y: Math.min(Math.max(PAD, startBottom - (ev.clientY - sy)), window.innerHeight - panel.offsetHeight - PAD),
    }
  }
  const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', up)
}

onMounted(() => {
  const onMsg = (e: MessageEvent) => {
    if (e.data?.type === '__activate_edit_mode') open.value = true
    if (e.data?.type === '__deactivate_edit_mode') open.value = false
  }
  window.addEventListener('message', onMsg)
  window.parent.postMessage({ type: '__edit_mode_available' }, '*')
  onUnmounted(() => window.removeEventListener('message', onMsg))
})

const dismiss = () => {
  open.value = false
  window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      ref="panelRef"
      class="twk-panel"
      :style="{ right: `${offset.x}px`, bottom: `${offset.y}px` }"
    >
      <div class="twk-hd" @mousedown="onDragStart">
        <b>Tweaks</b>
        <button class="twk-x" aria-label="Close tweaks" @mousedown.stop @click="dismiss">✕</button>
      </div>
      <div class="twk-body">
        <div class="twk-sect">Accent</div>
        <div class="twk-row twk-row-h">
          <div class="twk-lbl"><span>Accent color</span></div>
          <input
            type="color"
            class="twk-swatch"
            :value="tweaks.accent"
            @input="setTweak('accent', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">
          <button
            v-for="p in ACCENT_PRESETS"
            :key="p.color"
            :title="p.name"
            :style="{
              width: '22px', height: '22px', borderRadius: '4px',
              border: '1px solid rgba(255,255,255,.2)',
              background: p.color, cursor: 'pointer',
              outline: tweaks.accent === p.color ? '2px solid white' : 'none',
              outlineOffset: '2px'
            }"
            @click="setTweak('accent', p.color)"
          />
        </div>

        <div class="twk-sect">Atmosphere</div>
        <div class="twk-row">
          <div class="twk-lbl">
            <span>Cyberpunk dose</span>
            <span class="twk-val">{{ tweaks.cyber }}</span>
          </div>
          <input
            type="range" class="twk-slider"
            min="0" max="10" step="1"
            :value="tweaks.cyber"
            @input="setTweak('cyber', Number(($event.target as HTMLInputElement).value))"
          />
        </div>
        <div class="twk-row twk-row-h">
          <div class="twk-lbl"><span>Motion</span></div>
          <button
            type="button" class="twk-toggle"
            :data-on="tweaks.motion ? '1' : '0'"
            role="switch" :aria-checked="tweaks.motion"
            @click="setTweak('motion', !tweaks.motion)"
          ><i /></button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
  max-height:calc(100vh - 32px);display:flex;flex-direction:column;
  background:rgba(250,249,247,.78);color:#29261b;
  -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
  border:.5px solid rgba(255,255,255,.6);border-radius:14px;
  box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
  font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
.twk-hd{display:flex;align-items:center;justify-content:space-between;
  padding:10px 8px 10px 14px;cursor:move;user-select:none}
.twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
.twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
  width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
.twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
.twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
  overflow-y:auto;overflow-x:hidden;min-height:0;
  scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
.twk-row{display:flex;flex-direction:column;gap:5px}
.twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
.twk-lbl{display:flex;justify-content:space-between;align-items:baseline;color:rgba(41,38,27,.72)}
.twk-lbl>span:first-child{font-weight:500}
.twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}
.twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
  color:rgba(41,38,27,.45);padding:10px 0 0}
.twk-sect:first-child{padding-top:0}
.twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
  border-radius:999px;background:rgba(0,0,0,.12);outline:none}
.twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
  width:14px;height:14px;border-radius:50%;background:#fff;
  border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
.twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
  background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
.twk-toggle[data-on="1"]{background:#34c759}
.twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
  background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
.twk-toggle[data-on="1"] i{transform:translateX(14px)}
.twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
  border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
  background:transparent;flex-shrink:0}
.twk-swatch::-webkit-color-swatch-wrapper{padding:0}
.twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
</style>
