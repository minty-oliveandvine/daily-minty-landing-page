import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteConfig.url}/`,                  lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${siteConfig.url}/pricing`,           lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteConfig.url}/resources/learning`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/resources/faq`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteConfig.url}/resources/xero-integration`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteConfig.url}/resources/contact`,  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
}