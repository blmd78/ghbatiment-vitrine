'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

type Step = 'email' | 'code';

export default function OTPLogin() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer cooldown pour renvoyer un code
  useEffect(() => {
    if (cooldown <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [cooldown]);

  const handleSendOtp = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!email || loading) {
        return;
      }

      setLoading(true);
      setError('');
      setSuccess('');

      try {
        const res = await fetch('/api/auth/otp/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.status === 429) {
          setError(data.message);
          setLoading(false);
          return;
        }

        if (!res.ok && !data.success) {
          setError(data.message || 'Erreur lors de l\'envoi.');
          setLoading(false);
          return;
        }

        setStep('code');
        setSuccess('Code envoyé ! Vérifiez votre boîte mail.');
        setCooldown(60);
        setCode(['', '', '', '', '', '']);
        // Focus premier input après rendu
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      } catch {
        setError('Erreur de connexion.');
      } finally {
        setLoading(false);
      }
    },
    [email, loading],
  );

  const handleVerifyOtp = useCallback(
    async (otpCode: string) => {
      if (loading) {
        return;
      }

      setLoading(true);
      setError('');
      setSuccess('');

      try {
        const res = await fetch('/api/auth/otp/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify({ email, code: otpCode }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setError(data.message || 'Code invalide.');
          setCode(['', '', '', '', '', '']);
          setTimeout(() => inputRefs.current[0]?.focus(), 100);
          setLoading(false);
          return;
        }

        // Cookie posé par Set-Cookie HttpOnly (pas de document.cookie)
        setSuccess('Connexion réussie ! Redirection...');

        // Redirect sécurisé : uniquement les chemins relatifs internes
        const params = new URLSearchParams(globalThis.location.search);
        const redirect = params.get('redirect') || '/admin';
        const safeRedirect = redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/admin';
        globalThis.location.href = safeRedirect;
      } catch {
        setError('Erreur de connexion.');
        setLoading(false);
      }
    },
    [email, loading],
  );

  // Gestion des inputs code OTP
  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newCode = [...code];

    if (value.length > 1) {
      // Paste: répartir les chiffres
      const digits = value.slice(0, 6 - index).split('');
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newCode[index + i] = digit;
        }
      });
      setCode(newCode);

      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();

      // Auto-submit si complet
      const fullCode = newCode.join('');
      if (fullCode.length === 6) {
        handleVerifyOtp(fullCode);
      }
      return;
    }

    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit si complet
    const fullCode = newCode.join('');
    if (fullCode.length === 6 && newCode.every((d) => d !== '')) {
      handleVerifyOtp(fullCode);
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (cooldown > 0) {
      return;
    }
    handleSendOtp();
  };

  const handleBack = () => {
    setStep('email');
    setCode(['', '', '', '', '', '']);
    setError('');
    setSuccess('');
    setCooldown(0);
  };

  return (
    <div style={styles.container}>
      {step === 'email' ? (
        <form onSubmit={handleSendOtp} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.fr"
            required
            autoFocus
            autoComplete="email"
            disabled={loading}
            style={styles.input}
          />
          <button type="submit" disabled={loading || !email} style={styles.button}>
            {loading ? 'Envoi...' : 'Recevoir un code'}
          </button>
        </form>
      ) : (
        <div style={styles.form}>
          <button type="button" onClick={handleBack} style={styles.backButton}>
            ← Changer d&apos;email
          </button>

          <p style={styles.subtitle}>
            Code envoyé à <strong>{email}</strong>
          </p>

          <div style={styles.codeContainer}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleCodeKeyDown(index, e)}
                disabled={loading}
                autoComplete="one-time-code"
                style={styles.codeInput}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || loading}
            style={{
              ...styles.resendButton,
              opacity: cooldown > 0 || loading ? 0.5 : 1,
              cursor: cooldown > 0 || loading ? 'default' : 'pointer',
            }}
          >
            {cooldown > 0 ? `Renvoyer un code (${cooldown}s)` : 'Renvoyer un code'}
          </button>
        </div>
      )}

      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--theme-text, #1a1a1a)',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '15px',
    border: '1px solid var(--theme-border-color, #e5e5e5)',
    borderRadius: '4px',
    backgroundColor: 'var(--theme-input-bg, #fff)',
    color: 'var(--theme-text, #1a1a1a)',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    fontWeight: 600,
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#B87333',
    color: '#fff',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  backButton: {
    background: 'none',
    border: 'none',
    padding: 0,
    fontSize: '13px',
    color: 'var(--theme-text, #666)',
    cursor: 'pointer',
    textAlign: 'left' as const,
    opacity: 0.7,
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--theme-text, #666)',
    margin: 0,
    lineHeight: 1.5,
  },
  codeContainer: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    margin: '8px 0',
  },
  codeInput: {
    width: '48px',
    height: '56px',
    textAlign: 'center' as const,
    fontSize: '24px',
    fontWeight: 700,
    border: '1px solid var(--theme-border-color, #e5e5e5)',
    borderRadius: '6px',
    backgroundColor: 'var(--theme-input-bg, #fff)',
    color: 'var(--theme-text, #1a1a1a)',
    outline: 'none',
    fontFamily: "'SF Mono', Monaco, 'Cascadia Code', monospace",
  },
  resendButton: {
    background: 'none',
    border: 'none',
    padding: '8px 0',
    fontSize: '13px',
    color: '#B87333',
    cursor: 'pointer',
    textAlign: 'center' as const,
  },
  error: {
    marginTop: '12px',
    padding: '10px 14px',
    fontSize: '13px',
    color: '#dc2626',
    backgroundColor: '#fef2f2',
    borderRadius: '4px',
    border: '1px solid #fecaca',
  },
  success: {
    marginTop: '12px',
    padding: '10px 14px',
    fontSize: '13px',
    color: '#16a34a',
    backgroundColor: '#f0fdf4',
    borderRadius: '4px',
    border: '1px solid #bbf7d0',
  },
};
