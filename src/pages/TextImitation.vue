<template>
  <main class="p-4 space-y-4 max-w-md mx-auto">
    <Card>
      <TextAreaInput v-model="input" label="原始文案" placeholder="输入原文案" hint="建议输入不超过500字" />
      <template #footer>
        <div class="flex gap-2">
          <PrimaryButton :disabled="loading" @click="submit">仿写</PrimaryButton>
          <SecondaryButton @click="reset">清空</SecondaryButton>
        </div>
      </template>
    </Card>
    <Card v-if="result" title="仿写结果">
      <pre class="whitespace-pre-wrap break-all text-sm">{{ result }}</pre>
      <template #footer>
        <div class="flex gap-2">
          <SecondaryButton @click="copy">复制结果</SecondaryButton>
        </div>
      </template>
    </Card>
    <Loader v-if="loading">正在生成仿写文本</Loader>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { API_BASE_URL, FREE_API_KEY } from '@/constants/api'
import TextAreaInput from '@/components/TextAreaInput.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import Card from '@/components/Card.vue'
import Loader from '@/components/Loader.vue'
import { useToast } from '@/composables/useToast'
const input = ref('')
const result = ref('')
const loading = ref(false)
const { show } = useToast()
async function submit() {
  if (!input.value) return
  loading.value = true
  try {
    const res = await axios.post(`${API_BASE_URL}/imitatetext`, { text: input.value }, { headers: { 'x-api-key': FREE_API_KEY } })
    const data = res.data
    result.value = typeof data === 'string' ? data : data.text || JSON.stringify(data)
    show({ title: '仿写成功' })
  } catch (e: any) {
    show({ title: '仿写失败', description: e?.message })
  } finally {
    loading.value = false
  }
}
function reset() {
  input.value = ''
  result.value = ''
}
function copy() {
  navigator.clipboard.writeText(result.value)
  show({ title: '已复制' })
}
</script>