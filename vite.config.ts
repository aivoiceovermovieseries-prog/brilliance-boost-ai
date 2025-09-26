import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/brilliance-boost-ai/', // 👈 important for GitHub Pages
})
