<template>
  <main class="p-4 space-y-4 max-w-md mx-auto">
    <Card title="IP复刻">
      <TextAreaInput v-model="input" label="复刻需求" placeholder="输入账号或内容特征" hint="示例：粘贴抖音分享内容或账号主页链接" />
      <template #footer>
        <div class="flex gap-2">
          <PrimaryButton :disabled="loading" @click="start">分析账号</PrimaryButton>
          <SecondaryButton @click="reset">清空</SecondaryButton>
        </div>
      </template>
    </Card>
    <Loader v-if="loading">正在分析…</Loader>
    <div class="space-y-2">
      <p class="text-center text-xs text-gray-600">您领红包，作者得奖励</p>
      <AlipayCoupon />
    </div>
    <Modal :open="open" @update:open="v => open = v">
      <div class="space-y-2">
        <p class="font-medium">分析结果</p>
        <p class="text-sm text-gray-600">此功能正在完善，可扫码关注获取最新进展</p>
      </div>
    </Modal>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TextAreaInput from '@/components/TextAreaInput.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import Modal from '@/components/Modal.vue'
import Card from '@/components/Card.vue'
import Loader from '@/components/Loader.vue'
import AlipayCoupon from '@/components/AlipayCoupon.vue'
const input = ref('')
const loading = ref(false)
const open = ref(false)
function start() {
  if (!input.value) return
  loading.value = true
  setTimeout(() => {
    loading.value = false
    open.value = true
  }, 1500)
}
function reset() {
  input.value = ''
}
</script>