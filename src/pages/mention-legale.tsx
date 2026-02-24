import Head from 'next/head';

const sections = [
  {
    title: 'Contact Génral GH Batiment',
    content: `Gérant: Americo GONCALVES
Forme: SASU GH Batiemnt
Siège social : 4 rue Charles Legros, 91320 Wissous
Capital Social: 3 000 €
SIRET: 83470870300014`,
  },
  {
    title: 'Réalisation et maintenance du site',
    content: 'Hébergeur: Hostinger',
    link: { text: 'https://www.hostinger.fr', href: 'https://www.hostinger.fr' },
  },
  {
    title: 'Droits de propriété intellectuelle :',
    content: `L'ensemble du contenu de ce site est régi par le code de la Propriété Intellectuelle.
La présentation et le contenu du présent site constituent une œuvre protégée par les lois en vigueur sur la propriété intellectuelle, dont GH Batiment est titulaire.
Les dénominations ou appellations, les photos, slogans, logos, noms des marques, témoignages… sont cités soit avec l'autorisation de leur titulaire, soit comme simple indication de produits ou services.
Les photographies, textes, slogans, dessins, modèles, images, séquences animées sonores ou non, ainsi que toutes œuvres intégrées dans le site sont donc la propriété de la société GH Batiemnt ou de tiers ayant autorisé le nom du client à les utiliser.`,
  },
  {
    title: 'Protection des données personnelles',
    content: `La consultation du présent site est possible sans que vous ayez à révéler votre identité ou toute autre information à caractère personnel vous concernant.
L'Entreprise s'engage à respecter votre vie privée et à protéger les informations que vous lui communiquez. En particulier, les données personnelles collectées sur le présent site Internet sont destinées à l'usage de L'Entreprise. Elles sont confidentielles et traitées comme telles.
Concernant les informations à caractère nominatif que vous seriez amenés à nous communiquer, vous bénéficiez d'un droit d'accès et de rectification conformément à la loi française Informatique et Liberté n°78-17 du 6 janvier 1978.
Vous pouvez exercer ce droit auprès L'Entreprise. Si vous êtes abonnés à des services d'information par courrier électronique (« newsletter ») vous pouvez demander à ne plus recevoir ces courriers.
Nous vous signalons qu'afin de vous proposer des produits et services toujours plus adaptés, certaines informations à caractère non personnel, relatives à votre activité sur ce site, seront automatiquement collectées.
Ces informations sont destinées à L'Entreprise et pourront également être utilisées dans le cadre d'opérations commerciales ou de marketing ou servir de base à des études et analyses.
Ces informations ne seront en aucun cas communiquées à des tiers. Seul le personnel de L'Entreprise a accès aux données.`,
  },
  {
    title: 'Informations relatives aux produits :',
    content: `Dans le cadre d'une politique d'amélioration constante de ses produits et services, L'Entreprise peut modifier à tout moment les caractéristiques de son offre.
Les produits et/ou services présentés sur ce site sont ceux distribués en France métropolitaine. En tout état de cause, les informations contenues sur ce site sont des informations à caractère général et n'ont pas valeur contractuelle.
Limitation de responsabilité :
Vous utilisez le présent site sous votre seule et entière responsabilité. L'Entreprise ne pourra être tenu pour responsable des dommages directs ou indirects, tels que, notamment, préjudice matériel, pertes de données ou de programme, préjudice financier, résultant de l'utilisation de ce site ou de sites qui lui sont liés.`,
  },
  {
    title: "Droits d'auteur et/ou Droits sur les Dessins et Modèles",
    content: `Les photographies, textes, slogans, dessins, images, séquences animées sonores ou non ainsi que toutes les oeuvres intégrées dans le site sont la propriété de L'Entreprise ou de tiers ayant autorisé L'Entreprise à les utiliser.
Les reproductions, sur un support papier ou informatique, dudit site sont autorisées sous réserve qu'elles soient strictement réservées à un usage personnel excluant tout usage à des fins publicitaires et/ou commerciales et/ou d'information et/ou qu'elles soient conformes aux dispositions de l'article L122-5 du Code de la Propriété Intellectuelle.`,
  },
];

export default function MentionLegale() {
  return (
    <>
      <Head>
        <title>Mentions légales - GH Batiment</title>
        <meta name="description" content="Mentions légales de GH Batiment" />
      </Head>

      <div className="min-h-[85vh] py-8 px-4 max-w-5xl mx-auto">
        <h1 className="text-3xl mb-2">Mention légale</h1>
        <div className="border-t-[3px] border-[color:var(--primary)] w-[90px] mb-8" />

        {sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-bold text-[color:var(--primary)] mb-2">
              {section.title}
            </h2>
            <p className="whitespace-pre-line leading-relaxed">
              {section.content}
              {section.link && (
                <>
                  <br />
                  Site Web:{' '}
                  <a
                    href={section.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[color:var(--primary)] hover:underline"
                  >
                    {section.link.text}
                  </a>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
