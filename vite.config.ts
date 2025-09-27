import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8080
  },
  base: '/brilliance-boost-ai/', // 👈 important for GitHub Pages
  esbuild: {
    jsx: 'automatic'
  }
})
