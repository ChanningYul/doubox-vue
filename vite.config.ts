import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    allowedHosts: ['doubox.aiweb3.online']
  },
  preview: {
    host: true,
    allowedHosts: ['doubox.aiweb3.online']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})