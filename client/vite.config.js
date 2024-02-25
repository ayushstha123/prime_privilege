import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  // base: 'https://primeprivilege.com',
  server: {
    proxy: {
      '/api': {
        // target: 'https://primeprivilege.com:3000',
        // secure: true,

        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react()],
});
