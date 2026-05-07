import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Use '/' for local development, and '/your-repo-name/' for GitHub Pages
  base: command === 'serve' ? '/' : '/New_task/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
}))
