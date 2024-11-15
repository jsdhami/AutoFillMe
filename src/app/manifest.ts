import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AutofillMe',
    short_name: 'AutofillMe',
    description: 'A web application that help to fill the form automatically.',
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