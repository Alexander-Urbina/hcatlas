import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// For GitHub Pages, use the repo name as base path
// Update this if your repo name is different
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/hcatlas/' : '/',
})
