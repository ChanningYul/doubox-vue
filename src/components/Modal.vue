<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="$emit('update:open', false)"></div>
    <div class="relative bg-background rounded-lg border border-border p-4 w-[90%] max-w-md">
      <slot />
    </div>
  </div>
  </template>
<script setup lang="ts">
defineProps<{ open: boolean }>()
defineEmits(['update:open'])
</script>