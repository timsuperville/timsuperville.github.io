import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'docs'
  },
  server: {
    port: 3000, // dev port
    strictPort: true, // only allow this port
    host: true // allow access from outside
  }
})
