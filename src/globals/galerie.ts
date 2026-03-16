import type { GlobalConfig } from 'payload';
import { revalidatePath } from 'next/cache';

export const GalerieGlobal: GlobalConfig = {
  slug: 'galerie',
  label: 'Section Galerie',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/');
      },
    ],
  },
  admin: {
    description: 'Gérez les albums photos du site (ex: Charpente, Toiture...).',
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'albums',
      type: 'array',
      label: 'Albums',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre',
          required: true,
          admin: {
            description: 'Ex: Charpente, Toiture, Rénovation...',
          },
        },
        {
          name: 'images',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
          label: 'Photos',
          required: true,
        },
      ],
    },
  ],
};
