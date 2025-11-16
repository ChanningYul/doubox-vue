<template>
  <header class="grid grid-cols-[auto,1fr,auto] items-center h-12 px-3 border-b border-border bg-background">
    <div class="flex items-center">
      <button v-if="showBack" class="p-2 -ml-2 rounded hover:bg-secondary" @click="goBack" aria-label="返回">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M15.78 5.22a.75.75 0 0 1 0 1.06L10.06 12l5.72 5.72a.75.75 0 1 1-1.06 1.06l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <h1 class="text-center w-full text-base font-semibold select-none truncate">{{ currentTitle }}</h1>
    <div></div>
  </header>
  </template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
const router = useRouter()
const showBack = computed(() => route.path !== '/')
const currentTitle = computed(() => (route.meta?.title as string) || 'Doubox')
function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>