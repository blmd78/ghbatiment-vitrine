import type { GlobalConfig } from 'payload';
import { revalidatePath } from 'next/cache';

export const EngagementsSection: GlobalConfig = {
  slug: 'engagements-section',
  label: 'Section Engagements',
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/');
      },
    ],
  },
  admin: {
    description: 'Paramètres de la section "Nos engagements" sur la page d\'accueil.',
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Étiquette',
      defaultValue: 'Nos engagements',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      defaultValue: 'La qualité comme',
    },
    {
      name: 'titleHighlight',
      type: 'text',
      label: 'Mot mis en avant (cuivre)',
      defaultValue: 'signature',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de la section',
    },
    {
      name: 'imageOverlayValue',
      type: 'text',
      label: 'Chiffre en overlay (ex: 20+)',
      defaultValue: '20+',
    },
    {
      name: 'imageOverlayLabel',
      type: 'text',
      label: 'Texte en overlay (ex: Années d\'expérience)',
      defaultValue: "Années d'expérience",
    },
    {
      name: 'engagements',
      type: 'array',
      label: 'Engagements',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre',
          required: true,
          admin: {
            description: 'Ex: Certifications reconnues',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icône',
          required: true,
          options: [
            { label: 'Bouclier (certifications)', value: 'shield' },
            { label: 'Équipe (personnes)', value: 'team' },
            { label: 'Suivi (checklist)', value: 'checklist' },
            { label: 'Étoile (qualité)', value: 'star' },
            { label: 'Horloge (délais)', value: 'clock' },
            { label: 'Pouce (satisfaction)', value: 'thumbup' },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Chiffres clés',
      maxRows: 4,
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Valeur',
          required: true,
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffixe',
          admin: {
            description: 'Ex: €, +, %',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
      ],
    },
  ],
};
