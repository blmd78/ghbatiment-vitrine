export const ICON_PATHS: Record<string, string> = {
  shield:
    'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  team: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  checklist:
    'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  thumbup:
    'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5',
};

export const METIERS = [
  'Maçonnerie',
  'Charpente',
  'Menuiserie',
  'Plomberie',
  'Électricité',
  'Carrelage',
  'Peinture',
  'Isolation',
];

export const PARTENAIRES = [
  { src: '/images/Partenaire/cedeo.webp', alt: 'Cedeo' },
  { src: '/images/Partenaire/pointP.webp', alt: 'Point P' },
  { src: '/images/Partenaire/carrelageRoger.webp', alt: 'Carrelage Roger' },
  { src: '/images/Partenaire/kdi.webp', alt: 'KDI' },
  { src: '/images/Partenaire/chossiere.webp', alt: 'Chossiere' },
  { src: '/images/Partenaire/raboni.webp', alt: 'Raboni' },
  { src: '/images/Partenaire/nollet.webp', alt: 'Nollet' },
  { src: '/images/Partenaire/lapalette.webp', alt: 'La Palette' },
  { src: '/images/Partenaire/cogeferm.webp', alt: 'Cogeferm' },
  { src: '/images/Partenaire/lossignol.webp', alt: 'Lossignol' },
  { src: '/images/Partenaire/petruzella.webp', alt: 'Petruzella' },
];

export const DEFAULT_ENGAGEMENTS = [
  {
    id: 'certifications',
    title: 'Certifications reconnues',
    description:
      'Qualibat, RGE, Handibat, Qualifelec : nos certifications attestent de notre professionnalisme et de notre engagement qualité.',
    icon: 'shield' as const,
  },
  {
    id: 'equipes',
    title: 'Équipes qualifiées',
    description:
      'Des artisans expérimentés et formés dans chaque domaine pour un travail impeccable sur tous vos chantiers.',
    icon: 'team' as const,
  },
  {
    id: 'suivi',
    title: 'Suivi personnalisé',
    description:
      "Un interlocuteur unique et un reporting régulier pour une transparence totale sur l'avancement de vos travaux.",
    icon: 'checklist' as const,
  },
];

export const DEFAULT_STATS = [
  { id: 'ca', value: '700K', suffix: '€', label: "Chiffre d'affaires" },
  { id: 'chantiers', value: '70', suffix: '+', label: 'Chantiers réalisés' },
  { id: 'satisfaction', value: '98', suffix: '%', label: 'Clients satisfaits' },
];

export const COL_SPANS = [
  'lg:col-span-5',
  'lg:col-span-3',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-3',
  'lg:col-span-5',
];
