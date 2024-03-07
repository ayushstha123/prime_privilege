import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    host:'0.0.0.0',
    proxy: {
      '/api': {
        
        target: 'http://localhost:8080',
        secure: false,
      },
    },
  },
  plugins: [react()],
});
