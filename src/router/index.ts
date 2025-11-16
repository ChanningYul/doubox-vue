import type { RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home.vue'
import TextExtraction from '@/pages/TextExtraction.vue'
import TextImitation from '@/pages/TextImitation.vue'
import VideoWatermark from '@/pages/VideoWatermark.vue'
import IpReplication from '@/pages/IpReplication.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home, meta: { title: 'doubox-抖音工具箱' } },
  { path: '/text-extraction', name: 'text-extraction', component: TextExtraction, meta: { title: '文案提取' } },
  { path: '/text-imitation', name: 'text-imitation', component: TextImitation, meta: { title: '文案仿写' } },
  { path: '/video-watermark', name: 'video-watermark', component: VideoWatermark, meta: { title: '视频去水印' } },
  { path: '/ip-replication', name: 'ip-replication', component: IpReplication, meta: { title: 'IP复刻' } }
]

export default routes