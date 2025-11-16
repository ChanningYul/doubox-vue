<template>
  <div class="fixed bottom-4 right-4 space-y-2">
    <div v-for="t in state.items" :key="t.id" class="bg-foreground text-background rounded-md px-3 py-2 shadow">
      <p v-if="t.title" class="font-medium">{{ t.title }}</p>
      <p v-if="t.description" class="text-sm">{{ t.description }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useToast } from '@/composables/useToast'
const { state } = useToast()
</script>