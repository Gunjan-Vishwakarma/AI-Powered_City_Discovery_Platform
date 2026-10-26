import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'India City Discovery — Explore Culture, Food, Language & More',
  description: 'AI-powered platform to discover the soul of Indian cities. Explore food, culture, language, festivals, places and hidden gems across India.',
  keywords: ['India cities', 'Indian culture', 'Indian food', 'Indian languages', 'city guide', 'travel India'],
  openGraph: {
    title: 'India City Discovery',
    description: 'Discover the soul of every Indian city — culture, food, language, festivals & hidden gems.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
