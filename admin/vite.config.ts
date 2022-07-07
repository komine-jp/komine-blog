import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import config from './project-options'

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: config.lessOptions
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
 
  build: {
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  }
})
