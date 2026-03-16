import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Média',
    plural: 'Médias',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  upload: {
    mimeTypes: ['image/*'],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
      },
    },
    resizeOptions: {
      width: 1920,
      withoutEnlargement: true,
    },
  },
  admin: {
    useAsTitle: 'filename',
    hidden: ({ user }) => user?.role !== 'admin',
  },
  fields: [],
};
