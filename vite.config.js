import { defineConfig } from 'vite';
import path from 'path';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
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
          '@sass': path.resolve(__dirname, 'resources/sass'),
        },
      },
});
