// Remove any @tailwindcss/vite related imports
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // No Tailwind-specific Vite plugins needed
})