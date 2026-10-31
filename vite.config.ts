import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Send /api/* to the JWT server, so the browser sees one origin and needs no CORS.
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})

