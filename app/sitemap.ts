// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { TOOLS } from '@/lib/content';

// output: 'export' 下必须显式声明静态，否则构建在 Collecting page data 阶段失败
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...TOOLS.filter(t => t.live).map(t => ({
      url: `${SITE_URL}${t.href}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
