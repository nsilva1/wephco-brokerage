import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'mask-icon.svg'],
    manifest: {
      name: 'Wephco Brokerage',
      short_name: 'Wephco',
      description: 'The official Wephco Brokerage app. Providing professional-grade tools and insights for modern investors and agents.',
      theme_color: '#235f23',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      scope: '/',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
  navigateFallback: '/index.html',
  navigateFallbackDenylist: [
    /^\/api\//,
    /^\/assets\//,
    /\/favicon\.ico$/,
  ],
  globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
  sourcemap: true,
},

  })],
})
