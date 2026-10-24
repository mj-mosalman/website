import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sandbox preview mode: the app is reached through the preview proxy, so the
// dev server must accept the forwarded hostname and watch bind-mounted files.
// Everything below stays unchanged when BASE44_PREVIEW_MODE is not "1".
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: previewMode,
    },
    allowedHosts:
      previewMode && sandboxHostDomain ? [`.${sandboxHostDomain}`] : undefined,
  },
})
