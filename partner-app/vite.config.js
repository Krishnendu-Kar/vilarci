import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // This allows ngrok (or any tunnel) to access your PC
    allowedHosts: true 
  }
})