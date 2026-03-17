import { z } from 'zod/v4';

export const sendOtpSchema = z.object({
  email: z.email('Email invalide'),
});

export const verifyOtpSchema = z.object({
  email: z.email('Email invalide'),
  code: z
    .string()
    .length(6, 'Le code doit contenir 6 chiffres')
    .regex(/^\d{6}$/, 'Le code doit contenir uniquement des chiffres'),
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
