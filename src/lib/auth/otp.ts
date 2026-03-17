import crypto from 'node:crypto';

// ─── Constantes ─────────────────────────────────────────────────────────────
export const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
export const OTP_MAX_ATTEMPTS = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 heure
const RATE_MAX_SENDS = 3; // 3 envois/heure/email

// ─── Génération et hashage OTP ──────────────────────────────────────────────
export function generateOTP(): { code: string; hash: string } {
  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, '0');
  const hash = crypto.createHash('sha256').update(code).digest('hex');
  return { code, hash };
}

export function hashOTP(code: string): string {
  return crypto.createHash('sha256').update(code).digest('hex');
}

// ─── Rate limiting en mémoire (sliding window) ─────────────────────────────
const sendHits = new Map<string, number[]>();

function getRecentHits(key: string, now: number): number[] {
  const timestamps = sendHits.get(key) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  sendHits.set(key, recent);
  return recent;
}

export function isOtpRateLimited(email: string): boolean {
  const now = Date.now();
  const key = email.toLowerCase();
  const recent = getRecentHits(key, now);
  if (recent.length >= RATE_MAX_SENDS) {
    return true;
  }
  recent.push(now);
  return false;
}

// Nettoyage périodique
if (typeof globalThis.setInterval === 'function') {
  const timer = globalThis.setInterval(() => {
    const now = Date.now();
    for (const [key, timestamps] of sendHits) {
      const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
      if (recent.length === 0) {
        sendHits.delete(key);
      } else {
        sendHits.set(key, recent);
      }
    }
  }, 10 * 60 * 1000);
  if (typeof timer === 'object' && 'unref' in timer) {
    (timer as NodeJS.Timeout).unref();
  }
}

// ─── Template email OTP ─────────────────────────────────────────────────────
const ACCENT_COLOR = '#B87333';
const SITE_NAME = 'GH Bâtiment';

export function buildOtpEmailHtml(code: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0; background: #fafaf9;">

      <div style="padding: 0 24px 20px;">
        <p style="font-size: 11px; color: ${ACCENT_COLOR}; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600;">${SITE_NAME}</p>
        <h1 style="font-size: 22px; font-weight: 700; color: #1a1a1a; margin: 0;">Votre code de connexion</h1>
      </div>

      <div style="margin: 0 24px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 32px 24px; text-align: center;">
        <p style="font-size: 15px; color: #333; line-height: 1.6; margin: 0 0 24px;">
          Utilisez le code ci-dessous pour vous connecter à l'espace d'administration.
        </p>
        <div style="font-size: 36px; font-weight: 700; letter-spacing: 0.3em; color: #1a1a1a; padding: 16px 0; font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;">
          ${code}
        </div>
        <p style="font-size: 13px; color: #999; margin: 24px 0 0; line-height: 1.5;">
          Ce code expire dans <strong>10 minutes</strong>.<br/>
          Si vous n'avez pas demandé ce code, ignorez cet email.
        </p>
      </div>

      <div style="padding: 24px 24px 0;">
        <div style="border-top: 1px solid #e5e5e5; padding-top: 16px;">
          <p style="font-size: 11px; color: #999; margin: 0;">Envoyé depuis l'administration ${SITE_NAME}</p>
        </div>
      </div>
    </div>
  `;
}
