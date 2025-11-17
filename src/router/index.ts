import type { RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home.vue'
import TextExtraction from '@/pages/TextExtraction.vue'
import TextImitation from '@/pages/TextImitation.vue'
import VideoWatermark from '@/pages/VideoWatermark.vue'
import IpReplication from '@/pages/IpReplication.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'doubox-抖音工具箱',
      description: 'Doubox 抖音工具箱：视频去水印、文案提取、文案仿写等一站式创作工具。'
    }
  },
  {
    path: '/text-extraction',
    name: 'text-extraction',
    component: TextExtraction,
    meta: {
      title: '文案提取',
      description: '从抖音视频生成文字稿，支持复制与导出，提升内容整理效率。'
    }
  },
  {
    path: '/text-imitation',
    name: 'text-imitation',
    component: TextImitation,
    meta: {
      title: '文案仿写',
      description: '基于输入文本生成仿写文案，快速拓展创作灵感与风格。'
    }
  },
  {
    path: '/video-watermark',
    name: 'video-watermark',
    component: VideoWatermark,
    meta: {
      title: '视频去水印',
      description: '解析抖音分享链接，获取无水印视频直链，支持代理播放与下载。'
    }
  },
  {
    path: '/ip-replication',
    name: 'ip-replication',
    component: IpReplication,
    meta: {
      title: 'IP复刻',
      description: '展示 IP 复刻分析流程与交互，占位页用于演示功能体验。'
    }
  }
]

export default routes