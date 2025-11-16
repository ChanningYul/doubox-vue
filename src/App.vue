<template>
  <div>
    <BackHeader />
    <router-view />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue'
import Toast from '@/components/Toast.vue'
</script>