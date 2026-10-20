import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // The in-app browser's cache kept serving stale dev modules even with
    // no-cache + ETag revalidation; never cache anything in dev.
    headers: {
      'Cache-Control': 'no-store',
    },
    // The default file watcher misses edits on this machine (Windows file
    // events get lost); polling keeps HMR and reloads truthful.
    watch: {
      usePolling: true,
      interval: 300,
      // builds write dist/ during dev sessions — don't reload the page for it
      ignored: ['**/dist/**'],
    },
  },
});
