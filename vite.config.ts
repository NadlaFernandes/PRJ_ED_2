import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'frontend', // Isso avisa ao Vite para procurar o index.html e a pasta src dentro de frontend
})