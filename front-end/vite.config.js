import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  base: './', // Esto asegura que las rutas sean relativas
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_PORT) || 5173,
  },
})
