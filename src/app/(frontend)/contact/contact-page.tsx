'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

import chantierImg from '../../../../public/images/Savoir-faire/chantier.webp';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus('error');
        setErrorMessage(data.message || 'Une erreur est survenue.');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTurnstileToken(null);
    } catch {
      setStatus('error');
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {/* Hero - Split Design */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-concrete-950">
        {/* Background Image - Right Side */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full">
          <Image
            src={chantierImg}
            alt="Contactez GH Bâtiment"
            fill
            placeholder="blur"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-concrete-950 via-concrete-950/80 to-concrete-950/40 lg:from-concrete-950 lg:via-transparent lg:to-transparent" />
        </div>

        {/* Diagonal Accent */}
        <div className="absolute top-0 left-[45%] w-32 h-full bg-copper/10 -skew-x-12 hidden lg:block" />

        {/* Content */}
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div className="max-w-xl">
              {/* Label */}
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-px bg-copper" />
                <span className="text-copper text-xs font-semibold tracking-[0.25em] uppercase">
                  Parlons de votre projet
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-8">
                Contactez-<span className="text-copper">nous</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-concrete-400 leading-relaxed">
                Une question, un projet ? Notre équipe
                vous répond sous 48h.
              </p>
            </div>

            {/* Right - Empty for image background */}
            <div className="hidden lg:block" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-copper via-copper/50 to-transparent" />
      </section>

      {/* Main Content - Split Layout */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left - Contact Info (Dark) */}
          <div className="bg-concrete-900 py-16 lg:py-24 px-6 lg:px-16 relative overflow-hidden lg:flex lg:items-center">
            <div className="relative z-10 max-w-md mx-auto lg:mx-0 w-full">
              <h2 className="font-display text-3xl text-white mb-4">
                Nos coordonnées
              </h2>
              <p className="text-concrete-400 text-sm mb-10">
                Notre équipe est disponible pour répondre à toutes vos questions.
              </p>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Phone */}
                <a href="tel:0980336060"
                  className="group flex items-center gap-5 p-5 bg-white/5 rounded-xl
                    hover:bg-copper/15 border border-white/10 hover:border-copper/30
                    transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-copper/15 rounded-xl flex items-center justify-center shrink-0
                    group-hover:bg-copper/25 transition-colors duration-300">
                    <svg className="w-5 h-5 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-concrete-400 text-xs font-medium tracking-wider uppercase block mb-1">
                      Téléphone
                    </span>
                    <span className="text-white font-display text-xl group-hover:text-copper transition-colors">
                      09 80 33 60 60
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:contact.ghbat@gmail.com"
                  className="group flex items-center gap-5 p-5 bg-white/5 rounded-xl
                    hover:bg-copper/15 border border-white/10 hover:border-copper/30
                    transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-copper/15 rounded-xl flex items-center justify-center shrink-0
                    group-hover:bg-copper/25 transition-colors duration-300">
                    <svg className="w-5 h-5 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="text-concrete-400 text-xs font-medium tracking-wider uppercase block mb-1">
                      Email
                    </span>
                    <span className="text-white font-display text-xl group-hover:text-copper transition-colors truncate block">
                      contact.ghbat@gmail.com
                    </span>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-center gap-5 p-5 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-copper/15 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-concrete-400 text-xs font-medium tracking-wider uppercase block mb-1">
                      Adresse
                    </span>
                    <span className="text-white block">4 rue Charles Legros</span>
                    <span className="text-concrete-400 text-sm">91320 Wissous, France</span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-5 p-5 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-copper/15 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-concrete-400 text-xs font-medium tracking-wider uppercase block mb-1">
                      Horaires
                    </span>
                    <span className="text-white block">Lundi — Vendredi</span>
                    <span className="text-concrete-400 text-sm">9h00 — 18h00</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right - Contact Form (Light) */}
          <div className="bg-white py-16 lg:py-24 px-6 lg:px-16">
            <div className="max-w-lg mx-auto lg:mx-0">
              <h2 className="font-display text-3xl text-concrete-900 mb-10">
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-concrete-500 tracking-wider uppercase mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-concrete-200
                        focus:border-copper focus:ring-0 focus:outline-none text-concrete-900 placeholder-concrete-400 transition-colors"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-concrete-500 tracking-wider uppercase mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-concrete-200
                        focus:border-copper focus:ring-0 focus:outline-none text-concrete-900 placeholder-concrete-400 transition-colors"
                      placeholder="06 00 00 00 00"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-concrete-500 tracking-wider uppercase mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-concrete-200
                      focus:border-copper focus:ring-0 focus:outline-none text-concrete-900 placeholder-concrete-400 transition-colors"
                    placeholder="jean@exemple.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-concrete-500 tracking-wider uppercase mb-2">
                    Objet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-concrete-200
                      focus:border-copper focus:ring-0 focus:outline-none text-concrete-900 transition-colors cursor-pointer"
                  >
                    <option value="">Sélectionnez</option>
                    <option value="Demande de devis">Demande de devis</option>
                    <option value="Demande d'information">Demande d&apos;information</option>
                    <option value="Prise de rendez-vous">Prise de rendez-vous</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-concrete-500 tracking-wider uppercase mb-2">
                    Votre message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-concrete-200
                      focus:border-copper focus:ring-0 focus:outline-none text-concrete-900 placeholder-concrete-400 transition-colors resize-none"
                    placeholder="Décrivez votre projet..."
                  />
                </div>

                {/* Turnstile (invisible) */}
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => setTurnstileToken(null)}
                  options={{ size: 'invisible' }}
                />

                {/* Data notice */}
                <p className="text-xs text-concrete-400">
                  Vos données sont utilisées uniquement pour répondre à votre demande.
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="group relative w-full sm:w-auto px-8 py-4 rounded-xl overflow-hidden
                    flex items-center justify-center gap-3 cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-copper rounded-xl transition-transform duration-300
                    group-hover:translate-x-full group-disabled:group-hover:translate-x-0" />
                  <div className="absolute inset-0 bg-concrete-900 rounded-xl -translate-x-full transition-transform duration-300
                    group-hover:translate-x-0 group-disabled:group-hover:-translate-x-full" />
                  {status === 'loading' ? (
                    <span className="relative z-10 flex items-center gap-3 text-white font-semibold text-sm uppercase tracking-wider">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Envoi en cours...</span>
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center gap-3 text-white font-semibold text-sm uppercase tracking-wider">
                      <span>Envoyer</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  )}
                </button>

                {/* Feedback messages */}
                {status === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-sm rounded-xl">
                    <p className="font-semibold">Message envoyé avec succès !</p>
                    <p>Nous vous répondrons sous 48h.</p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded-xl">
                    <p>{errorMessage}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] lg:h-[500px] relative bg-concrete-200 overflow-hidden">
        {/* Transparent overlay to block map interactions */}
        <div className="absolute inset-0 z-10" />

        {/* Map container - oversized to crop Google Maps UI elements */}
        <div className="absolute -top-[100px] -bottom-[100px] -left-[400px] -right-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2632.8968509645856!2d2.3234!3d48.7334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671d9eb92c5c7%3A0x2d4a5d4b6aee6d9a!2s4%20Rue%20Charles%20Legros%2C%2091320%20Wissous!5e0!3m2!1sfr!2sfr!4v1706000000000!5m2!1sfr!2sfr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation GH Bâtiment"
          />
        </div>

        {/* Overlay badge */}
        <a
          href="https://maps.google.com/?q=4+rue+Charles+Legros+91320+Wissous"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 left-6 z-20 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
        >
          <p className="font-display text-concrete-900 group-hover:text-copper transition-colors">GH Bâtiment</p>
          <p className="text-sm text-concrete-500">4 rue Charles Legros, 91320 Wissous</p>
        </a>
      </section>
    </>
  );
}
