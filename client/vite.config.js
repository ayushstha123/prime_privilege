import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://primeprivilege.com:3000',
        secure: true,
      },
    },
  },
  plugins: [react()],
});
