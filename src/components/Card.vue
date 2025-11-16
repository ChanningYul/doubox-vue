<template>
  <section class="rounded-2xl border border-border glass shadow-md">
    <div v-if="title" class="px-4 pt-4 text-sm font-medium">{{ title }}</div>
    <div class="p-4">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-4 pb-4">
      <slot name="footer" />
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps<{ title?: string }>()
</script>