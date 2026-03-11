import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mentions légales - GH Bâtiment',
  description:
    'Mentions légales du site GH Bâtiment, édité par Palatun. SIRET, hébergeur et informations juridiques.',
  alternates: {
    canonical: '/mention-legale',
  },
  openGraph: {
    title: 'Mentions légales - GH Bâtiment',
    description:
      'Mentions légales du site GH Bâtiment, édité par Palatun. SIRET, hébergeur et informations juridiques.',
    url: '/mention-legale',
  },
  twitter: {
    title: 'Mentions légales - GH Bâtiment',
    description:
      'Mentions légales du site GH Bâtiment, édité par Palatun.',
  },
};

export default function MentionLegalePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pt-40 pb-20">
      <h1 className="mb-12 text-center text-5xl">Mentions légales</h1>

      <div className="prose prose-lg space-y-8">
        <section>
          <h2 className="mb-4 text-xl font-semibold">Éditeur du site</h2>
          <p>Le site https://ghbat.fr est édité par :</p>
          <ul className="list-none space-y-1">
            <li>
              <strong>Raison sociale :</strong> Palatun
            </li>
            <li>
              <strong>Siège social :</strong> 60 rue François 1er, 75008 Paris
            </li>
            <li>
              <strong>SIRET :</strong> 995 297 819 00014
            </li>
            <li>
              <strong>Directeur de la publication :</strong> Benoit Gasnier
            </li>
            <li>
              <strong>Email :</strong>{' '}
              <Link href="mailto:contact@palatun.com" className="text-copper hover:underline">
                contact@palatun.com
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Hébergement</h2>
          <p>Ce site est hébergé par :</p>
          <ul className="list-none space-y-1">
            <li>
              <strong>Nom :</strong> Vercel Inc.
            </li>
            <li>
              <strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu du site GH Bâtiment (textes, images, logos, etc.) est la propriété exclusive de{' '}
            Palatun ou de ses partenaires. Toute reproduction, représentation, modification ou exploitation,
            totale ou partielle, sans autorisation préalable écrite est strictement interdite.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Données personnelles</h2>
          <p>
            Les données collectées via le formulaire de contact sont utilisées uniquement pour répondre à votre demande
            et ne sont pas conservées au-delà du traitement de celle-ci. Conformément au RGPD, vous disposez d&apos;un droit
            d&apos;accès, de rectification et de suppression de vos données en contactant{' '}
            <Link href="mailto:contact@palatun.com" className="text-copper hover:underline">
              contact@palatun.com
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Contact</h2>
          <p>
            Pour toute question concernant ce site, vous pouvez nous contacter à{' '}
            <Link href="mailto:contact@palatun.com" className="text-copper hover:underline">
              contact@palatun.com
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
