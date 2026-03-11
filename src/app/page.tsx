import type { Metadata } from 'next';
import HomePage from './home-page';

export const metadata: Metadata = {
  title:
    'GH Bâtiment | Entreprise générale du bâtiment tous corps de métier - Construction, Rénovation, Aménagement en Île-de-France',
  description:
    "GH Bâtiment, entreprise générale du bâtiment et maîtrise d'œuvre tous corps d'état en Île-de-France. Construction, rénovation intérieure et extérieure, extension maison, ravalement de façade. Artisans qualifiés certifiés Qualibat, RGE. Devis gratuit.",
  keywords:
    "entreprise générale bâtiment, tous corps de métier, construction Île-de-France, rénovation intérieure, rénovation extérieure, maîtrise d'œuvre, extension maison, ravalement façade, maçonnerie, charpente, menuiserie, plomberie, électricité, carrelage, peinture, isolation, artisan qualifié, Qualibat, RGE, devis gratuit",
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

export default function Page() {
  return <HomePage />;
}
