<script setup lang="ts">
import { parseContent } from '~/utils/lawContent'

function slugify(text: string): string {
  return text.replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fff-]/g, '')
}

defineProps<{
  nodes: any[]
}>()

let idx = 0
function nextKey() {
  return idx++
}

/** 標題層級 → 字級：款(level 3)=1rem，每升一層 +0.14rem */
function headingSize(level: number): string {
  return `${1.0 + Math.max(0, 3 - level) * 0.14}rem`
}
</script>

<template>
  <template v-for="node in nodes" :key="nextKey()">
    <!-- heading -->
    <h2
      v-if="node.type === 'heading' && node.name"
      :id="'h-' + slugify(node.name)"
      class="chapter-heading"
      :style="{ fontSize: headingSize(node.level ?? 3) }"
    >
      {{ node.name }}
    </h2>

    <!-- article -->
    <div
      v-else-if="node.type === 'article' && node.no"
      :id="`article-${node.no}`"
      class="article-block"
    >
      <span class="article-no">{{ node.no }}</span>
      <div class="article-body">
        <template v-for="(p, pi) in parseContent(node.content)" :key="pi">
          <p v-if="p.text" :class="`law-${p.type}`">{{ p.text }}</p>
        </template>
      </div>
    </div>

    <!-- recurse children -->
    <RecursiveBody v-if="node.children?.length" :nodes="node.children" />
  </template>
</template>
