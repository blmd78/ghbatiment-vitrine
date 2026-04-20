'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact';

const Turnstile = dynamic(
  () => import('@marsidev/react-turnstile').then((mod) => mod.Turnstile),
  {
    ssr: false,
    loading: () => (
      <div className="h-[65px] w-full bg-concrete-100 rounded animate-pulse" />
    ),
  },
);

type Props = {
  onSuccess?: () => void;
};

export function ContactForm({ onSuccess }: Props) {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!turnstileToken) {
      setStatus('error');
      setErrorMessage('Vérification de sécurité en cours, veuillez réessayer.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setStatus('error');
        setErrorMessage(result.message || 'Une erreur est survenue.');
        return;
      }

      setStatus('success');
      reset();
      setTurnstileToken(null);
      onSuccess?.();
    } catch {
      setStatus('error');
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-concrete-700 mb-2">
          Nom complet *
        </label>
        <input
          id="name"
          type="text"
          placeholder="Votre nom"
          className="w-full px-4 py-3 border border-concrete-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-copper focus:border-transparent"
          {...register('name')}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-concrete-700 mb-2">
          Email *
        </label>
        <input
          id="email"
          type="email"
          placeholder="votre.email@exemple.com"
          className="w-full px-4 py-3 border border-concrete-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-copper focus:border-transparent"
          {...register('email')}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-concrete-700 mb-2">
          Téléphone
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="09 XX XX XX XX"
          className="w-full px-4 py-3 border border-concrete-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-copper focus:border-transparent"
          {...register('phone')}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-concrete-700 mb-2">
          Sujet *
        </label>
        <select
          id="subject"
          className="w-full px-4 py-3 border border-concrete-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-copper focus:border-transparent"
          {...register('subject')}
        >
          <option value="">Sélectionnez un sujet</option>
          <option value="Demande de devis">Demande de devis</option>
          <option value="Demande d&apos;information">Demande d&apos;information</option>
          <option value="Prise de rendez-vous">Prise de rendez-vous</option>
          <option value="Autre">Autre</option>
        </select>
        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-concrete-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          placeholder="Décrivez votre demande..."
          rows={6}
          className="w-full px-4 py-3 border border-concrete-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-copper focus:border-transparent resize-none"
          {...register('message')}
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>

      <div>
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
          onSuccess={setTurnstileToken}
          onError={() => {
            setTurnstileToken(null);
            setStatus('error');
            setErrorMessage('Erreur de vérification. Veuillez réessayer.');
          }}
        />
      </div>

      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 font-medium">Merci ! Votre message a été envoyé avec succès.</p>
        </div>
      )}

      {status === 'error' && errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-copper text-white font-bold uppercase tracking-wider rounded-lg hover:bg-copper/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
      </button>
    </form>
  );
}
