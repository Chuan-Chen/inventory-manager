import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/absproxy/5173/",
  server: {
    hmr: {
      protocol: "http",
      path: "/absproxy/5173/",
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
