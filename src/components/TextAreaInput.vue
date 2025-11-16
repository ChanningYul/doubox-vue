<template>
  <div class="space-y-2">
    <label v-if="label" class="text-sm text-gray-600">{{ label }}</label>
    <textarea
      class="w-full min-h-28 p-3 border border-input rounded-xl focus:ring-2 focus:ring-ring shadow-sm"
      :placeholder="placeholder"
      v-model="modelValue"
      @input="$emit('update:modelValue', modelValue)"
    />
    <p v-if="hint" class="text-xs text-gray-500">{{ hint }}</p>
  </div>
  </template>
<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{ modelValue: string; placeholder?: string; label?: string; hint?: string }>()
const modelValue = ref(props.modelValue)
watch(
  () => props.modelValue,
  v => { modelValue.value = v }
)
</script>