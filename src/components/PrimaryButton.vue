<template>
  <button class="px-4 py-2 rounded-xl btn-gradient text-primary-foreground shadow-md disabled:opacity-50 hover:brightness-110 transition" :disabled="disabled" @click="$emit('click')">
    <slot />
  </button>
  </template>
<script setup lang="ts">
defineProps<{ disabled?: boolean }>()
</script>