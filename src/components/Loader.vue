<template>
  <div class="flex items-center gap-2 text-sm text-gray-600">
    <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" stroke-width="4" fill="none" />
    </svg>
    <slot>正在处理...</slot>
  </div>
</template>