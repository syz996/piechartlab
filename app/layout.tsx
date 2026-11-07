import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Pie Chart Maker – Free Online Pie Chart Generator',
  description: 'Create a pie chart online for free. Edit data, customize colors and labels, and download as PNG or SVG. No signup required.',
  alternates: { canonical: 'https://piechartlab.com/' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
