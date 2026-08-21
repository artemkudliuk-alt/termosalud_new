import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  publicDir: 'public',
  server: {
    port: 5173,
    open: false,
    host: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about-us/index.html'),
        zionic: resolve(__dirname, 'zionic/index.html'),
        linfopress: resolve(__dirname, 'linfopress/index.html')
      }
    }
  }
});
