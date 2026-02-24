import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Demande de contact');
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:contact.ghbat@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <>
      <Head>
        <title>Contact | GH Bâtiment - Demandez votre devis gratuit</title>
        <meta name="description" content="Contactez GH Bâtiment pour vos projets de construction et rénovation en Île-de-France. Devis gratuit sous 48h." />
      </Head>

      {/* Hero - Split Design */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-concrete-950">
        {/* Background Image - Right Side */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full">
          <Image
            src="/images/Savoir-faire/chantier.jpeg"
            alt="Contactez GH Bâtiment"
            fill
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
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }}
            />

            <div className="relative z-10 max-w-md mx-auto lg:mx-0">
              <h2 className="font-display text-3xl text-white mb-12">
                Nos coordonnées
              </h2>

              {/* Contact Items */}
              <div className="space-y-10">
                {/* Phone - Primary */}
                <div className="group">
                  <span className="text-copper text-xs font-medium tracking-widest uppercase mb-3 block">
                    Téléphone
                  </span>
                  <a href="tel:0980336060"
                    className="font-display text-3xl lg:text-4xl text-white hover:text-copper transition-colors block">
                    09 80 33 60 60
                  </a>
                </div>

                {/* Email */}
                <div className="group">
                  <span className="text-copper text-xs font-medium tracking-widest uppercase mb-3 block">
                    Email
                  </span>
                  <a href="mailto:contact.ghbat@gmail.com"
                    className="font-display text-2xl text-white hover:text-copper transition-colors break-all">
                    contact.ghbat@gmail.com
                  </a>
                </div>

                {/* Address */}
                <div className="group">
                  <span className="text-copper text-xs font-medium tracking-widest uppercase mb-3 block">
                    Adresse
                  </span>
                  <p className="text-white text-lg">
                    4 rue Charles Legros
                  </p>
                  <p className="text-concrete-400">
                    91320 Wissous, France
                  </p>
                </div>

                {/* Hours */}
                <div className="group">
                  <span className="text-copper text-xs font-medium tracking-widest uppercase mb-3 block">
                    Horaires
                  </span>
                  <p className="text-white">
                    Lundi — Vendredi
                  </p>
                  <p className="text-concrete-400">
                    9h00 — 18h00
                  </p>
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
                {/* Name & Email */}
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
                        focus:border-copper focus:ring-0 text-concrete-900 placeholder-concrete-400 transition-colors"
                      placeholder="Jean Dupont"
                    />
                  </div>
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
                        focus:border-copper focus:ring-0 text-concrete-900 placeholder-concrete-400 transition-colors"
                      placeholder="jean@exemple.com"
                    />
                  </div>
                </div>

                {/* Phone & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                        focus:border-copper focus:ring-0 text-concrete-900 placeholder-concrete-400 transition-colors"
                      placeholder="06 00 00 00 00"
                    />
                  </div>
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
                        focus:border-copper focus:ring-0 text-concrete-900 transition-colors cursor-pointer"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="Demande de devis">Demande de devis</option>
                      <option value="Demande d'information">Demande d&apos;information</option>
                      <option value="Prise de rendez-vous">Prise de rendez-vous</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
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
                      focus:border-copper focus:ring-0 text-concrete-900 placeholder-concrete-400 transition-colors resize-none"
                    placeholder="Décrivez votre projet..."
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 border-2 border-concrete-300 text-copper focus:ring-copper rounded-none cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-sm text-concrete-500 cursor-pointer">
                    J&apos;accepte que mes données soient traitées dans le cadre de ma demande. *
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group w-full sm:w-auto px-8 py-4 bg-copper text-white font-semibold text-sm uppercase tracking-wider
                    hover:bg-concrete-900 transition-colors flex items-center justify-center gap-3"
                >
                  <span>Envoyer</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] lg:h-[500px] relative bg-concrete-200">
        {/* Map container */}
        <div className="absolute inset-0">
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

        {/* Transparent overlay to block map interactions */}
        <div className="absolute inset-0 z-10" />

        {/* Overlay badge */}
        <a
          href="https://maps.google.com/?q=4+rue+Charles+Legros+91320+Wissous"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 left-6 z-20 bg-white p-4 shadow-lg hover:shadow-xl transition-shadow group"
        >
          <p className="font-display text-concrete-900 group-hover:text-copper transition-colors">GH Bâtiment</p>
          <p className="text-sm text-concrete-500">4 rue Charles Legros, 91320 Wissous</p>
        </a>
      </section>
    </>
  );
}
