import {defineConfig, UserConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: 'jsdom',
    // hey! 👋 over here
    globals: true,
    setupFiles: './tests/setup.js',
    coverage: {
      enabled: true,
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json-summary', 'html'],
      reportsDirectory: './coverage'
    }// assuming the test folder is in the root of our project
  }
} as UserConfig)
