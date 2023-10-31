import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rashak Agro App',
    short_name: 'Rashak App',
    description: 'Rashak is an agri tech company that empowers small holder farmers by providing access to market, financial services and robust data driven support to ...',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#000000',
    categories: ['Agriculture investment ', 'investment', 'rashak', 'Farm', 'Rashak', 'RashakAgro', 'rashakagro', 'Farm investment ', 'Business', 'Agriculture', 'Nature', 'farm Technology', 'agriculture technology', 'farm blog', 'agriculture news'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}