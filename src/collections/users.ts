import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Utilisateur',
    plural: 'Utilisateurs',
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    create: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.id === req.data?.id || req.user?.role === 'admin',
    read: ({ req }) => {
      if (req.user?.role === 'admin') {
        return true;
      }
      if (req.user) {
        return { id: { equals: req.user.id } };
      }
      return false;
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rôle',
      defaultValue: 'editor',
      options: [
        { label: 'Administrateur', value: 'admin' },
        { label: 'Éditeur', value: 'editor' },
      ],
      access: {
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
};
