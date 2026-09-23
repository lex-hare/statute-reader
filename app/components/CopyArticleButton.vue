<script setup lang="ts">
import { formatArticleCitation } from '~/utils/lawContent'

const props = defineProps<{
  no: string
  content: string
}>()

const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function writeClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }
  // 非安全環境（例如以區網 IP 連線開發伺服器）無 Clipboard API，改用舊式 execCommand
  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', '')
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(ta)
  if (!ok) throw new Error('execCommand("copy") failed')
}

async function copy() {
  try {
    await writeClipboard(formatArticleCitation(props.no, props.content))
    copied.value = true
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => (copied.value = false), 1500)
  } catch (err) {
    console.error('複製條文失敗：', err)
  }
}

onBeforeUnmount(() => clearTimeout(resetTimer))
</script>

<template>
  <button
    type="button"
    class="copy-article-btn"
    :class="{ copied }"
    :aria-label="copied ? `已複製${no}` : `複製${no}`"
    :title="copied ? '已複製' : '複製條文'"
    @click="copy"
  >
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <polyline v-if="copied" points="20 6 9 17 4 12" />
      <template v-else>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </template>
    </svg>
  </button>
</template>
