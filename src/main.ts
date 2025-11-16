import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'
import './assets/style.css'
import { initGA } from './services/ga'

const router = createRouter({
  history: createWebHistory(),
  routes
})

initGA()

createApp(App).use(router).mount('#app')