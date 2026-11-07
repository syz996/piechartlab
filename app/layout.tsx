import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import './globals.css';  

const TITLE = 'Pie Chart Maker – Free Online Pie Chart Generator';
const DESC  = 'Create a pie chart online for free. Edit data, customize colors and labels, and download as PNG or SVG. No signup required.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE_NAME}` },
  description: DESC,
  alternates: { canonical: '/' },    
  icons: { icon: '/icon.svg', apple: '/icon.svg', shortcut: '/icon.svg' },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website', url: '/', siteName: SITE_NAME,
    title: TITLE, description: DESC,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Pie Chart Maker — free online tool' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: ['/og.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
