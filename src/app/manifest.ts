import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Constant Suchet',
    short_name: 'Constant Suchet',
    description: 'Portfolio of Constant Suchet - Game Developer & Cybersecurity Specialist',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F5F0',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
