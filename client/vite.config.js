import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

export default defineConfig({
  
  server: {
    proxy: {
      '/api': {
        target: 'https://app.primeprivilege.com',
      },
    },
  },
  plugins: [
    react(),
    pluginRewriteAll()
  ]
});
