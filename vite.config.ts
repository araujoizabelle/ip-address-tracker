import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
      define: { 
        _global: ({}),
        'process.env': env
      },
      plugins: [react()],
      server: {
          host: true, // Here
          strictPort: true,
          port: 8080
      },
      resolve: {
          alias: {
              './runtimeConfig': './runtimeConfig.browser'
          }
      },
    }
})
