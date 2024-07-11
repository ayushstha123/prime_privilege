import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

export default defineConfig({
  
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },

  },
  plugins: [react()],

});
