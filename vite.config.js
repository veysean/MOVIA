import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// __dirname is not defined in ESM; derive it from import.meta.url.
const __dirname = resolve(fileURLToPath(new URL('.', import.meta.url)));

export default defineConfig({
  // Deploys to https://veysean.github.io/MOVIA/ — must match the repo name.
  // Change to '/' if this ever moves to a custom domain or a root user-page repo.
  base: '/MOVIA/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pitch: resolve(__dirname, 'pitch.html'),
      },
    },
  },
});
