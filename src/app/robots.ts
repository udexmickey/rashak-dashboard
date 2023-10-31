import { MetadataRoute } from 'next'
 
const base_Url = process.env.NEXT_PUBLIC_BASE_URL

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${base_Url}/sitemap.xml`,
  }
}