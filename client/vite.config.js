import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/absproxy/5173/",
  server: {
    hmr: {
      clientPort: 3030,
    }
  }
})

/**
kit: {
    paths: {
        base: '/absproxy/3000'
    },
    ...
}
 */
