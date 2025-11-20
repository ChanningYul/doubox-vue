<template>
  <section class="rounded-2xl overflow-hidden border border-red-200 shadow-md">
    <img :src="imageSrc" alt="支付宝红包" class="w-full h-auto" />
  </section>
</template>
<script setup lang="ts">
const props = defineProps<{ qrImageSrc?: string }>()
const imageSrc = props.qrImageSrc || (import.meta.env.VITE_ALIPAY_QR_IMAGE as string | undefined) || new URL('../assets/redpkg-qr.png', import.meta.url).href
</script>