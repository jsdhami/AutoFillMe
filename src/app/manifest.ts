import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js PWA',
    short_name: 'NextPWA',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/icon128.png',
        sizes: '128x128',
        type: 'image/png',
      },
    ],
  }
}