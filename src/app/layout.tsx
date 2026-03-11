import type { Metadata } from 'next';
import { DM_Sans, Bebas_Neue } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const SITE_URL = 'https://ghbat.fr';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: 'GH Bâtiment',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/Home2.jpeg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/Home2.jpeg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GH Bâtiment',
  url: SITE_URL,
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: 'GH Bâtiment',
  url: SITE_URL,
  logo: `${SITE_URL}/images/LogoGH.webp`,
  image: `${SITE_URL}/images/Home2.jpeg`,
  description:
    'Entreprise générale du bâtiment tous corps de métier en Île-de-France. Construction, rénovation, aménagement depuis 2018.',
  telephone: '+33980336060',
  email: 'contact.ghbat@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4 rue Charles Legros',
    addressLocality: 'Wissous',
    postalCode: '91320',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 48.7334,
    longitude: 2.3234,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Île-de-France',
  },
  priceRange: '€€',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#1C1917" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(
              /</g,
              '\\u003c',
            ),
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${bebasNeue.variable} antialiased min-h-screen flex flex-col bg-background`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
