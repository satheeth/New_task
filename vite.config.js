import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // This is crucial for GitHub Pages deployment. It tells Vite that your
  // project will be served from the /New_task/ subdirectory.
  base: '/' ,
  plugins: [
    // The react plugin should be configured to handle all React-related transformations,
    // including the experimental React Compiler.
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
}))
