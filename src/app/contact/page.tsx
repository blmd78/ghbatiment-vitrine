import type { Metadata } from 'next';
import ContactPage from './contact-page';

export const metadata: Metadata = {
  title: 'Contact | GH Bâtiment - Demandez votre devis gratuit',
  description:
    'Contactez GH Bâtiment pour vos projets de construction et rénovation en Île-de-France. Devis gratuit sous 48h.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | GH Bâtiment - Demandez votre devis gratuit',
    description:
      'Contactez GH Bâtiment pour vos projets de construction et rénovation en Île-de-France. Devis gratuit sous 48h.',
    url: '/contact',
  },
  twitter: {
    title: 'Contact | GH Bâtiment - Devis gratuit',
    description:
      'Contactez GH Bâtiment pour vos projets de construction et rénovation en Île-de-France. Devis gratuit sous 48h.',
  },
};

export default function Page() {
  return <ContactPage />;
}
