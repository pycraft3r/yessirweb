import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['gsap', 'framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    },
    // Enable minification
    minify: 'terser'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'three']
  },
  server: {
    port: 5173
  }
})
