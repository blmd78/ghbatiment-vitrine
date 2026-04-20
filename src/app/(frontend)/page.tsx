import type { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { unstable_cache } from 'next/cache';
import { HeroSection } from '@/components/shared/HeroSection';
import HomePage from './home-page';

export const metadata: Metadata = {
  title:
    'GH Bâtiment | Entreprise générale du bâtiment tous corps de métier - Construction, Rénovation, Aménagement en Île-de-France',
  description:
    "GH Bâtiment, entreprise générale du bâtiment et maîtrise d'œuvre tous corps d'état en Île-de-France. Construction, rénovation intérieure et extérieure, extension maison, ravalement de façade. Artisans qualifiés certifiés Qualibat, RGE. Devis gratuit.",
  keywords: [
    'entreprise bâtiment Wissous',
    'entreprise bâtiment Essonne',
    'entreprise bâtiment 91',
    'entreprise générale bâtiment Île-de-France',
    'tous corps de métier Wissous',
    'rénovation Wissous',
    'rénovation Essonne 91',
    'construction maison Essonne',
    'extension maison Île-de-France',
    'ravalement façade Wissous',
    'maîtrise d\'œuvre Essonne',
    'artisan Qualibat RGE Île-de-France',
    'devis travaux Wissous 91320',
  ],
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

const getGalerieSection = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    return payload.findGlobal({
      slug: 'galerie',
      depth: 2,
      select: {
        albums: {
          id: true,
          title: true,
          images: {
            url: true,
            alt: true,
          },
        },
      },
    });
  },
  ['galerie-section'],
  { tags: ['galerie-section'], revalidate: false },
);

export default async function Page() {
  let galerieSection = null;

  try {
    galerieSection = await getGalerieSection();
  } catch {
    // DB pas encore prête ou données manquantes — on affiche la page avec les fallbacks
  }

  return (
    <>
      <HeroSection />
      <HomePage galerieSection={galerieSection} />
    </>
  );
}
