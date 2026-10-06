<script setup lang="ts">
import { siteConfig } from '~~/config/site.config'
</script>

<template>
  <footer id="app-footer">
    <a :href="siteConfig.repoUrl" target="_blank" rel="noopener noreferrer">Open Source</a>
  </footer>
</template>
