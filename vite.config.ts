import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: "REACT_APP_",
  define: {
    'process.env': {
      ...process.env,
      REACT_APP_ENDPOINT: "http://localhost:4000/",
      REACT_APP_API: "http://localhost:4000/api"
    }
  }
})
