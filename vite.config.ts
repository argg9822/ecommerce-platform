import { defineConfig } from 'vite'
import path from 'path';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@sass/abstracts" as a;',
      },
    },
  },
  resolve: {
    alias: {
      '@sass': path.resolve(__dirname, 'src/sass'),
    },
  }
})
