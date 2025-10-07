import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'docs'
  },
  server: {
    port: Number(process.env.PORT) || 3000,
    // Allow Vite to choose an alternative port if the preferred port is in use
    strictPort: false,
    host: true // allow access from outside
  }
})
