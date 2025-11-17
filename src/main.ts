import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'
import './assets/style.css'
import { initGA } from './services/ga'
import type { RouteLocationNormalized } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes
})

initGA()

createApp(App).use(router).mount('#app')

const updateHead = (to: RouteLocationNormalized) => {
  const title = (to.meta?.title as string) || 'Doubox'
  if (title) document.title = title
  const desc = (to.meta?.description as string) || 'Doubox 抖音工具箱：视频去水印、文案提取、文案仿写等一站式创作工具。'
  let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
  if (!metaDesc) {
    metaDesc = document.createElement('meta')
    metaDesc.name = 'description'
    document.head.appendChild(metaDesc)
  }
  metaDesc.content = desc
  const origin = 'https://doubox.aiweb3.online'
  const canonicalHref = origin + to.fullPath
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = canonicalHref
  const ensureMeta = (selector: string, attr: 'name' | 'property', key: string, value: string) => {
    let el = document.querySelector(selector) as HTMLMetaElement | null
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, key)
      document.head.appendChild(el)
    }
    el.content = value
  }
  ensureMeta('meta[property="og:title"]', 'property', 'og:title', title)
  ensureMeta('meta[property="og:description"]', 'property', 'og:description', desc)
  ensureMeta('meta[property="og:url"]', 'property', 'og:url', canonicalHref)
  ensureMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
  ensureMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc)
}

updateHead(router.currentRoute.value)
router.afterEach((to: RouteLocationNormalized) => updateHead(to))