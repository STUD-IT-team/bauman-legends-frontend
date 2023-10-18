import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path';

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/],
    }),
    basicSsl(),
  ],
  // define: {
  //   BUILD_TIMESTAMP: Date.now(),
  //   VERSION: JSON.stringify(require('./package.json').version),
  // },
  server: {
    https: true,

    proxy: {
      '/api': {
        target: `http://127.0.0.1:3000`,
        secure: false,
        changeOrigin: false,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  resolve: {
    alias: [
      {
        find: '~', // to use ~ as project root like: "import Some from '~/components/Some.vue'"
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: '@~', // to use @~ as node_modules root like: "import Some from '@~/Some'"
        replacement: path.resolve(__dirname, 'node_modules')
      }
    ]
  },
  build: {
    // chunkSizeWarningLimit: 600,
    cssCodeSplit: false
  }
});
