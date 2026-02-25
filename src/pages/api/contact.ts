import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function str(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; message: string }>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  const { body } = req;
  const name = str(body.name, 200);
  const email = str(body.email, 200);
  const phone = str(body.phone, 30);
  const subject = str(body.subject, 200);
  const message = str(body.message, 5000);
  const turnstileToken = str(body.turnstileToken, 2000);

  // Validation des champs requis
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Champs requis manquants' });
  }

  if (!turnstileToken) {
    return res.status(400).json({ success: false, message: 'Vérification captcha manquante' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Email invalide' });
  }

  // Vérification Turnstile
  try {
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress,
        }),
      },
    );

    const turnstileData = await turnstileResponse.json();

    if (!turnstileData.success) {
      return res.status(400).json({ success: false, message: 'Échec de la vérification captcha' });
    }
  } catch {
    return res.status(500).json({ success: false, message: 'Erreur lors de la vérification captcha' });
  }

  // Envoi email via Resend
  try {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'Non renseigné');
    const safeSubject = escapeHtml(subject || 'Non renseigné');
    const safeMessage = escapeHtml(message);

    const { error } = await resend.emails.send({
      from: 'GH Bâtiment <contact@ghbat.fr>',
      to: ['benoitgasnier.pro@gmail.com'],
      replyTo: email,
      subject: `[Site Web] ${subject || 'Demande de contact'} — ${name}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Nom</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${safeEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Téléphone</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Objet</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${safeSubject}</td>
          </tr>
        </table>
        <h3 style="margin-top: 24px;">Message :</h3>
        <p style="white-space: pre-wrap; background: #f9f9f9; padding: 16px; border-left: 4px solid #B87333;">${safeMessage}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ success: false, message: "Erreur lors de l'envoi de l'email" });
    }

    return res.status(200).json({ success: true, message: 'Message envoyé avec succès' });
  } catch (error) {
    console.error('Send email error:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}
