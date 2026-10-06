<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'
import { siteConfig } from '~~/config/site.config'

const { icon, label, toggle } = useTheme()
</script>

<template>
  <header id="app-header">
    <div class="header-group">
      <NuxtLink to="/" class="site-title">{{ siteConfig.projectName }}</NuxtLink>
      <a
        class="team-link"
        :href="siteConfig.teamHomepage"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ siteConfig.teamName }}
      </a>
    </div>
    <button class="theme-toggle" :aria-label="`切換至${label}色主題`" @click="toggle">
      <span>{{ icon }}</span>
      <span>{{ label }}</span>
    </button>
  </header>
</template>
