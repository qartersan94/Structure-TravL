import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  base: '/Structure-TravL/',  // ← CETTE LIGNE EST IMPORTANTE !
  
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  preview: {
    port: 4173,
    open: true
  },
  
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons-vendor': ['lucide-react']
        }
      }
    }
  }
})
