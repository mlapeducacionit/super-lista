import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

// vite.config.js
export default defineConfig({
  // config options
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Super Lista',
        short_name: 'Lista',
        description: 'Aplicación para la gestión de una lista de compras',
        theme_color: '#2196f3',
        background_color: "#2196f3",
        start_url: "/",
        display: "standalone",
        icons: [
          {
            src: "/images/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/images/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/images/icons/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/images/icons/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    })
  ]
})
