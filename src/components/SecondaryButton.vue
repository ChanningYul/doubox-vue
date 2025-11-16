<template>
  <button class="px-4 py-2 rounded-xl glass border border-white/40 text-secondary-foreground disabled:opacity-50 hover:bg-secondary/80 transition" :disabled="disabled" @click="$emit('click')">
    <slot />
  </button>
  </template>
<script setup lang="ts">
defineProps<{ disabled?: boolean }>()
</script>