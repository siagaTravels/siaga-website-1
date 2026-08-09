import type { Metadata } from 'next';
import { Bebas_Neue, Manrope, Playfair_Display } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://siagatravels.com'),
  title: {
    default: 'Siaga Travels | Discover Paradise in Sri Lanka',
    template: '%s | Siaga Travels',
  },
  description: 'Explore Sri Lanka with Siaga Travels. Tailor-made tour packages, wildlife safaris, highland tea trekking, cultural festivals, and luxury holiday retreats.',
  keywords: ['Sri Lanka Tours', 'Siaga Travels', 'Ella Trekking', 'Yala Wildlife Safari', 'Kandy Temple Tour', 'Sri Lanka Travel Agency'],
  icons: { icon: '/logo.png', shortcut: '/logo.png' },
  openGraph: {
    title: 'Siaga Travels | Discover Paradise in Sri Lanka',
    description: 'Tailor-made Sri Lanka tour packages and authentic island experiences. Your Journey. Our Expertise.',
    images: ['/hero-ella.jpg'],
    type: 'website',
    siteName: 'Siaga Travels',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siaga Travels | Discover Paradise in Sri Lanka',
    description: 'Tailor-made Sri Lanka tour packages and authentic island experiences.',
    images: ['/hero-ella.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Siaga Travels',
  image: 'https://siagatravels.com/logo.png',
  description: 'Siaga Travels is a Sri Lanka-based travel company specializing in personalized travel experiences across the island.',
  url: 'https://siagatravels.com',
  telephone: '+94771234567',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Colombo',
    addressCountry: 'LK',
  },
  priceRange: '$$$',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${bebasNeue.variable} ${manrope.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preload" as="image" href="/hero-ella.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning style={{ margin: 0, padding: 0, background: '#131313', color: '#fff', overflowX: 'hidden' }}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
