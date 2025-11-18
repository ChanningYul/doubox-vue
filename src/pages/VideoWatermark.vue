<template>
  <main class="p-4 space-y-4 max-w-md mx-auto">
    <Card>
      <TextAreaInput v-model="input" label="抖音分享链接" placeholder="粘贴链接" />
      <template #footer>
        <div class="flex gap-2">
          <PrimaryButton :disabled="loading" @click="submit">去水印</PrimaryButton>
          <SecondaryButton @click="reset">清空</SecondaryButton>
        </div>
      </template>
    </Card>
    <Card v-if="result">
      <div class="space-y-2">
        <div>
          <video
            class="w-full rounded-lg"
            controls
            playsinline
            preload="metadata"
            referrerpolicy="no-referrer"
            crossorigin="anonymous"
            :src="videoSrc"
            :key="videoSrc"
            @error="onVideoError"
          >
            <source :src="videoSrc" type="video/mp4" />
          </video>
          <div v-if="videoError" class="mt-2 text-xs text-red-500">预览失败，请尝试“去下载”在新页面播放</div>
          <div class="mt-2 flex gap-2">
            <a
              :href="result.clean_video_url"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground border border-white/40 transition hover:brightness-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >去下载</a>
          </div>
        </div>
        <div class="pt-2 border-t border-border">
          <p class="text-sm">标题：{{ result.original_video_info.title }}</p>
        </div>
      </div>
    </Card>
    <Loader v-if="loading">正在解析视频</Loader>
  </main>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'
import { API_BASE_URL, FREE_API_KEY } from '@/constants/api'
import TextAreaInput from '@/components/TextAreaInput.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import { useToast } from '@/composables/useToast'
import Card from '@/components/Card.vue'
import Loader from '@/components/Loader.vue'
type Result = {
  success: boolean
  clean_video_url: string
  original_video_info: { original_url: string; title: string; description: string }
  processing_time: number
  used_fallback: boolean
}
const input = ref('')
const result = ref<Result | null>(null)
const loading = ref(false)
const { show } = useToast()
const videoError = ref(false)
function sanitizeUrl(u: string): string {
  const match = (u || '').match(/https?:\/\/[^\s'"`]+/)
  return match ? match[0] : ''
}
const videoSrc = ref('')
const PROXY_PREFIX = 'https://mihoyonb.com/api/video-proxy?url='
async function resolveFinalVideoUrl(u: string) {
  const url = sanitizeUrl(u)
  const proxied = url ? `${PROXY_PREFIX}${encodeURIComponent(url)}` : ''
  videoSrc.value = proxied
}
async function submit() {
  if (!input.value) return
  loading.value = true
  try {
    const res = await axios.post(`${API_BASE_URL}/remove-watermark`, { key: FREE_API_KEY, url: input.value, prefer_local: false })
    const data: Result = res.data
    if (!data.success) throw new Error('解析失败')
    result.value = data
    videoError.value = false
    await resolveFinalVideoUrl(data.clean_video_url)
    show({ title: '解析成功' })
  } catch (e: any) {
    show({ title: '解析失败', description: e?.message })
  } finally {
    loading.value = false
  }
}
function reset() {
  input.value = ''
  result.value = null
}
// 已改为使用 <a target="_blank">，保留此占位以避免未使用报错
function openDownload() {}
function onVideoError() {
  videoError.value = true
}
</script>