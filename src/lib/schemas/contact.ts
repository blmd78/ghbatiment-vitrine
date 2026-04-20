import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nom requis (min 2 caractères)').max(200, 'Nom trop long'),
  email: z.email('Email invalide'),
  phone: z.string().max(30, 'Téléphone trop long').optional().or(z.literal('')),
  subject: z.enum(
    ['Demande de devis', "Demande d'information", 'Prise de rendez-vous', 'Autre'],
    { message: 'Sujet requis' },
  ),
  message: z
    .string()
    .min(10, 'Message requis (min 10 caractères)')
    .max(5000, 'Message trop long (max 5000 caractères)'),
});

export const createContactSchema = contactFormSchema.extend({
  turnstileToken: z.string().min(1, 'Captcha requis'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type CreateContactInput = z.infer<typeof createContactSchema>;
