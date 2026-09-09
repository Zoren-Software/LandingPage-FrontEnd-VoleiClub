<template>
  <div class="referral">
    <span class="referral__path" :title="copyUrl">{{ displayPath }}</span>
    <ZButton
      size="small"
      color="primary"
      preset="secondary"
      data-test="copy-link"
      :aria-label="`Copiar link de ${name || slug}`"
      @click="copy"
    >
      {{ copied ? 'Copiado' : 'Copiar' }}
    </ZButton>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import ZButton from '~/components/atoms/Buttons/ZButton.vue'
import { referralCopyUrl, referralDisplayPath } from '~/utils/acquisitionChannel'

const props = defineProps({
  slug: { type: String, required: true },
  name: { type: String, default: '' },
  url: { type: String, default: '' },
})

const copied = ref(false)
let copiedTimer

const copyUrl = computed(() => referralCopyUrl(props.slug, props.url))
const displayPath = computed(() => referralDisplayPath(props.slug))

async function copy() {
  try {
    await navigator.clipboard.writeText(copyUrl.value)
  } catch {
    const input = document.createElement('textarea')
    input.value = copyUrl.value
    input.setAttribute('readonly', '')
    input.style.position = 'fixed'
    input.style.opacity = '0'
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }

  copied.value = true
  if (copiedTimer) {
    clearTimeout(copiedTimer)
  }
  copiedTimer = setTimeout(() => {
    copied.value = false
  }, 2000)
}

onBeforeUnmount(() => {
  if (copiedTimer) {
    clearTimeout(copiedTimer)
  }
})
</script>

<style scoped>
.referral {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  max-width: 100%;
  width: 100%;
}
.referral__path {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--va-primary);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
}
</style>
