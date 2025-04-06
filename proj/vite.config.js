import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcs from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcs(),
    react()
  ],
})
