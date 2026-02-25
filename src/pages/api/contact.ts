import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { z } from 'zod/v4';

// ─── Config ──────────────────────────────────────────────────────────────────
const SITE_NAME = 'GH Bâtiment';
const ACCENT_COLOR = '#B87333';
const FROM_EMAIL = 'GH Bâtiment <contact@ghbat.fr>';
const TO_EMAIL = process.env.CONTACT_EMAIL || 'benoitgasnier.pro@gmail.com';

// ─── Rate limiting (sliding window en mémoire) ──────────────────────────────
const WINDOW_MS = 60 * 60 * 1000; // 1 heure
const MAX_PER_IP = 5;
const MAX_PER_EMAIL = 2;

const ipHits = new Map<string, number[]>();
const emailHits = new Map<string, number[]>();

function getRecentHits(map: Map<string, number[]>, key: string, now: number): number[] {
  const timestamps = map.get(key) ?? [];
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);
  map.set(key, recent);
  return recent;
}

function isIpRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = getRecentHits(ipHits, ip, now);
  if (recent.length >= MAX_PER_IP) return true;
  recent.push(now);
  return false;
}

function isEmailRateLimited(email: string): boolean {
  const now = Date.now();
  const key = email.toLowerCase();
  const recent = getRecentHits(emailHits, key, now);
  if (recent.length >= MAX_PER_EMAIL) return true;
  recent.push(now);
  return false;
}

// Nettoyage périodique des entrées expirées
if (typeof globalThis.setInterval === 'function') {
  const timer = globalThis.setInterval(() => {
    const now = Date.now();
    for (const [key, timestamps] of ipHits) {
      const recent = timestamps.filter((t) => now - t < WINDOW_MS);
      if (recent.length === 0) ipHits.delete(key);
      else ipHits.set(key, recent);
    }
    for (const [key, timestamps] of emailHits) {
      const recent = timestamps.filter((t) => now - t < WINDOW_MS);
      if (recent.length === 0) emailHits.delete(key);
      else emailHits.set(key, recent);
    }
  }, 10 * 60 * 1000);
  if (typeof timer === 'object' && 'unref' in timer) timer.unref();
}

// ─── Validation ──────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, 'Nom requis').max(200),
  email: z.email('Email invalide'),
  phone: z.string().max(30).optional().default(''),
  subject: z.string().max(200).optional().default(''),
  message: z.string().min(10, 'Message trop court').max(5000),
  turnstileToken: z.string().min(1, 'Captcha requis'),
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress ?? 'unknown';
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY non configuré');
    return false;
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, response: token, remoteip: ip }),
        signal: AbortSignal.timeout(5000),
      },
    );
    const data = await response.json();
    return data.success === true;
  } catch {
    console.error('Échec vérification Turnstile');
    return false;
  }
}

// ─── Email Templates ─────────────────────────────────────────────────────────

function buildContactEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone || 'Non renseigné');
  const safeSubject = escapeHtml(data.subject || 'Non renseigné');
  const safeMessage = escapeHtml(data.message);

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0; background: #fafaf9;">

      <div style="padding: 0 24px 20px;">
        <p style="font-size: 11px; color: ${ACCENT_COLOR}; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600;">${SITE_NAME}</p>
        <h1 style="font-size: 22px; font-weight: 700; color: #1a1a1a; margin: 0;">Nouveau message</h1>
      </div>

      <div style="margin: 0 24px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0;">
              <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: ${ACCENT_COLOR}; margin-bottom: 4px; font-weight: 600;">Nom</div>
              <div style="font-size: 15px; color: #1a1a1a;">${safeName}</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0;">
              <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: ${ACCENT_COLOR}; margin-bottom: 4px; font-weight: 600;">Email</div>
              <a href="mailto:${safeEmail}" style="font-size: 15px; color: #1a1a1a; text-decoration: none;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0;">
              <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: ${ACCENT_COLOR}; margin-bottom: 4px; font-weight: 600;">Téléphone</div>
              <div style="font-size: 15px; color: #1a1a1a;">${safePhone}</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0;">
              <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: ${ACCENT_COLOR}; margin-bottom: 4px; font-weight: 600;">Objet</div>
              <div style="font-size: 15px; color: #1a1a1a;">${safeSubject}</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 20px;">
              <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: ${ACCENT_COLOR}; margin-bottom: 4px; font-weight: 600;">Message</div>
              <div style="font-size: 15px; color: #333; white-space: pre-wrap; line-height: 1.6;">${safeMessage}</div>
            </td>
          </tr>
        </table>
      </div>

      <div style="padding: 20px 24px 0;">
        <a href="mailto:${safeEmail}" style="display: inline-block; padding: 12px 24px; background: ${ACCENT_COLOR}; color: #fff; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; letter-spacing: 0.08em;">
          Répondre
        </a>
      </div>

      <div style="padding: 24px 24px 0;">
        <div style="border-top: 1px solid #e5e5e5; padding-top: 16px;">
          <p style="font-size: 11px; color: #999; margin: 0;">Envoyé depuis le site ghbat.fr</p>
        </div>
      </div>
    </div>
  `;
}

function buildConfirmationEmailHtml(data: {
  name: string;
  message: string;
}): string {
  const safeName = escapeHtml(data.name);
  const safeMessage = escapeHtml(data.message);

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0; background: #fafaf9;">

      <div style="padding: 0 24px 20px;">
        <p style="font-size: 11px; color: ${ACCENT_COLOR}; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600;">${SITE_NAME}</p>
        <h1 style="font-size: 22px; font-weight: 700; color: #1a1a1a; margin: 0;">Message bien reçu</h1>
      </div>

      <div style="margin: 0 24px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px;">
        <p style="font-size: 15px; color: #333; line-height: 1.6; margin: 0 0 16px;">
          Bonjour ${safeName},
        </p>
        <p style="font-size: 15px; color: #333; line-height: 1.6; margin: 0 0 16px;">
          Nous avons bien reçu votre message et reviendrons vers vous dans les plus brefs délais.
        </p>
        <p style="font-size: 13px; color: #999; line-height: 1.5; margin: 0; padding-top: 16px; border-top: 1px solid #f0f0f0;">
          Pour référence, voici votre message&nbsp;:
        </p>
        <p style="font-size: 14px; color: #666; white-space: pre-wrap; line-height: 1.6; margin: 12px 0 0; padding: 16px; background: #fafaf9; border-left: 3px solid ${ACCENT_COLOR};">${safeMessage}</p>
      </div>

      <div style="padding: 20px 24px 0;">
        <p style="font-size: 12px; color: #bbb; margin: 0;">Cet email est un accusé de réception automatique — merci de ne pas y répondre.</p>
      </div>

      <div style="padding: 16px 24px 0;">
        <div style="border-top: 1px solid #e5e5e5; padding-top: 16px;">
          <p style="font-size: 11px; color: #999; margin: 0;">${SITE_NAME} · 4 rue Charles Legros, 91320 Wissous · 09 80 33 60 60</p>
        </div>
      </div>
    </div>
  `;
}

// ─── Handler ─────────────────────────────────────────────────────────────────
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; message: string }>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  const ip = getClientIp(req);

  // Rate limit par IP
  if (isIpRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      message: 'Trop de messages envoyés. Réessayez dans quelques minutes.',
    });
  }

  // Validation Zod
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    console.error('Validation errors:', JSON.stringify(result.error.issues, null, 2));
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
    });
  }

  const data = result.data;

  // Rate limit par email (pour la confirmation)
  const emailLimited = isEmailRateLimited(data.email);

  // Vérification Turnstile
  const turnstileValid = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstileValid) {
    return res.status(403).json({
      success: false,
      message: 'Vérification de sécurité échouée. Veuillez réessayer.',
    });
  }

  // Envoi emails
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailPromises = [
      // Email de notification au propriétaire
      resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        replyTo: data.email,
        subject: `[Site Web] ${data.subject || 'Demande de contact'} — ${data.name}`,
        html: buildContactEmailHtml(data),
      }),
    ];

    // Email de confirmation au client (si pas rate limité)
    if (!emailLimited) {
      emailPromises.push(
        resend.emails.send({
          from: FROM_EMAIL,
          to: [data.email],
          subject: `${SITE_NAME} — Nous avons bien reçu votre message`,
          html: buildConfirmationEmailHtml(data),
        }),
      );
    }

    const results = await Promise.all(emailPromises);
    const hasError = results.some((r) => r.error);

    if (hasError) {
      console.error('Resend error:', results.map((r) => r.error).filter(Boolean));
      return res.status(500).json({
        success: false,
        message: "Erreur lors de l'envoi. Veuillez réessayer.",
      });
    }

    return res.status(200).json({ success: true, message: 'Message envoyé avec succès' });
  } catch (error) {
    console.error('Erreur envoi contact:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}
