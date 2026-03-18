import { getPayload } from 'payload';
import config from '@payload-config';
import { Resend } from 'resend';

import { sendOtpSchema } from '@/lib/schemas/otp';
import {
  generateOTP,
  isOtpRateLimited,
  OTP_EXPIRY_MS,
  buildOtpEmailHtml,
} from '@/lib/auth/otp';

const FROM_EMAIL = 'GH Bâtiment <contact@ghbat.fr>';
const GENERIC_MESSAGE = 'Si ce compte existe, un code a été envoyé.';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: true, message: GENERIC_MESSAGE });
  }

  const result = sendOtpSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ success: true, message: GENERIC_MESSAGE });
  }

  const { email } = result.data;

  // Rate limiting — réponse 200 identique pour ne pas révéler si l'email existe
  if (isOtpRateLimited(email)) {
    return Response.json({ success: true, message: GENERIC_MESSAGE });
  }

  try {
    const payload = await getPayload({ config });

    const { docs: users } = await payload.find({
      collection: 'users',
      where: { email: { equals: email.toLowerCase() } },
      limit: 1,
      overrideAccess: true,
    });

    if (users.length === 0) {
      return Response.json({ success: true, message: GENERIC_MESSAGE });
    }

    const user = users[0];
    const { code, hash } = generateOTP();

    // Stocker le hash de l'OTP (jamais le code en clair)
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        otpCode: hash,
        otpExpiry: new Date(Date.now() + OTP_EXPIRY_MS).toISOString(),
        otpAttempts: 0,
      },
      overrideAccess: true,
    });

    // Envoyer email — code DANS le body uniquement, pas dans le sujet
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: 'Votre code de connexion — GH Bâtiment',
      html: buildOtpEmailHtml(code),
    });

    if (error) {
      console.error('Erreur envoi OTP:', error);
    }

    return Response.json({ success: true, message: GENERIC_MESSAGE });
  } catch (error) {
    console.error('Erreur OTP send:', error);
    return Response.json({ success: true, message: GENERIC_MESSAGE });
  }
}
