import type { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import HomePage from './home-page';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:
    'GH Bâtiment | Entreprise générale du bâtiment tous corps de métier - Construction, Rénovation, Aménagement en Île-de-France',
  description:
    "GH Bâtiment, entreprise générale du bâtiment et maîtrise d'œuvre tous corps d'état en Île-de-France. Construction, rénovation intérieure et extérieure, extension maison, ravalement de façade. Artisans qualifiés certifiés Qualibat, RGE. Devis gratuit.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title:
      'GH Bâtiment | Entreprise générale du bâtiment tous corps de métier - Île-de-France',
    description:
      "Construction, rénovation et aménagement tous corps d'état en Île-de-France. Maîtrise d'œuvre, artisans qualifiés certifiés Qualibat et RGE. Devis gratuit.",
    url: '/',
  },
  twitter: {
    title:
      'GH Bâtiment | Entreprise générale du bâtiment tous corps de métier - Île-de-France',
    description:
      "Construction, rénovation et aménagement tous corps d'état en Île-de-France. Maîtrise d'œuvre, artisans qualifiés certifiés Qualibat et RGE. Devis gratuit.",
  },
};

export default async function Page() {
  const payload = await getPayload({ config: configPromise });

  const galerieSection = await payload.findGlobal({ slug: 'galerie', depth: 2 });

  return (
    <HomePage
      galerieSection={galerieSection}
    />
  );
}
