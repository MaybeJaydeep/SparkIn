import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000',  // ⬅️ Proxy API calls to Express server
    },
  },
  plugins: [react() , tailwindcss(),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
