import Head from 'next/head';

const sections = [
  {
    title: 'Contact',
    content: `Si vous avez des questions à nous poser, n'hésitez pas à communiquer avec nous en utilisant ce qui suit:
Numéro: 09 80 33 60 60
Mail: contact.ghbat@gmail.com
Adresse: 4 rue Charles Legros, 91320, Wissous`,
  },
  {
    title: "Collecte de l'information",
    content:
      'Nous recueillons vos informations lorsque vous nous contactez à travers notre site ou laissez un commentaire.',
  },
  {
    title: 'Utilisation des informations',
    content: `Toute les informations que nous recueillons auprès de vous peuvent être utilisées pour :
- Cela nous permet de vous avoir dans notre base de donnée.
- D'avoir des avis et des retours sur nos services.
- Améliorer notre site Web
- Améliorer le service client et vos besoins de prise en charge
- Vous contacter par e-mail`,
  },
  {
    title: 'Protection des informations',
    content: `Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles.
Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne.
Nous protégeons également vos informations hors ligne. Seuls les employés qui ont besoin d'effectuer un travail spécifique (par exemple, la facturation ou le service à la clientèle) ont accès aux informations personnelles identifiables.
Les ordinateurs et serveurs utilisés pour stocker des informations personnelles identifiables sont conservés dans un environnement sécurisé.`,
  },
  {
    title: 'Modification',
    content: `Cette politique de confidentialité peut être modifié à l'occasion afin de maintenir la conformité avec la loi et de tenir compte de tout changement à notre processus de collecte de données.
Nous recommandons a nos utilisateurs de vérifier notre politique de temps à autre pour s'assurer qu'ils soient informés de tote mise à jour.
AU besoin nous pouvons informer les utilisateurs par courriel des changements apportés à cette politique.`,
  },
  {
    title: 'Consentement',
    content:
      'En utilisant notre site, vous consentez à notre politique de confidentialité.',
  },
];

export default function Politique() {
  return (
    <>
      <Head>
        <title>Politique de confidentialité - GH Batiment</title>
        <meta name="description" content="Politique de confidentialité de GH Batiment" />
      </Head>

      <div className="min-h-[85vh] py-8 px-4 max-w-5xl mx-auto">
        <h1 className="text-3xl mb-2">Politique de confidentialité</h1>
        <div className="border-t-[3px] border-[color:var(--primary)] w-[90px] mb-8" />

        {sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-bold text-[color:var(--primary)] mb-2">
              {section.title}
            </h2>
            <p className="whitespace-pre-line leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}
