import Image from 'next/image';
import Link from 'next/link';

import heroImg from '../../../public/images/Home2.webp';

export function HeroSection() {
  return (
    <section
      className="relative min-h-[85vh] overflow-hidden"
      aria-label="Présentation GH Bâtiment entreprise générale du bâtiment en Île-de-France"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImg}
          alt="GH Bâtiment - Entreprise générale du bâtiment tous corps de métier, chantier de construction et rénovation en Île-de-France"
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover hero-img-zoom"
          priority
          quality={75}
        />
        {/* Cinematic multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-concrete-950/70 via-concrete-950/50 to-concrete-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-concrete-950/60 via-transparent to-transparent" />
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
            <span className="text-copper font-semibold text-xs md:text-sm uppercase tracking-[0.3em]">
              Entreprise générale du bâtiment · Île-de-France
            </span>
          </div>

          {/* Main title - SEO H1 with full keywords */}
          <h1 className="font-display leading-[0.9] mb-8 animate-fade-in-up delay-100">
            <span className="block text-[clamp(4rem,12vw,9rem)] text-white tracking-tight">
              <span>GH</span>{' '}
              <span className="text-copper">BÂTIMENT</span>
            </span>
            <span className="block text-[clamp(1.1rem,2.5vw,1.75rem)] text-concrete-300 mt-4 tracking-[0.15em] font-display uppercase">
              Construction, Rénovation &amp; Aménagement
            </span>
          </h1>

          {/* H2 Tagline */}
          <div className="relative mb-8 animate-fade-in-up delay-200">
            <h2 className="text-xl md:text-2xl font-display text-white tracking-wide uppercase">
              Travaux tous corps de métier en Île-de-France
            </h2>
            <p className="text-concrete-400 mt-2 text-sm md:text-base">
              Maçonnerie · Charpente · Menuiserie · Plomberie · Électricité · Carrelage · Peinture · Isolation
            </p>
          </div>

          {/* Description - SEO rich paragraph */}
          <p className="text-concrete-300 text-base md:text-lg max-w-xl leading-relaxed mb-10 animate-fade-in-up delay-400">
            <strong className="text-white font-semibold">Maîtrise d&apos;œuvre et coordination complète</strong> de vos
            projets par des artisans qualifiés. Rénovation intérieure, rénovation extérieure, extension maison,
            ravalement de façade — votre chantier entre les mains d&apos;experts tous corps d&apos;état.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up delay-500">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl overflow-hidden shadow-lg shadow-copper/20"
            >
              <div className="absolute inset-0 bg-copper rounded-xl transition-transform duration-300 group-hover:translate-x-full" />
              <div className="absolute inset-0 bg-white rounded-xl -translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
              <span className="relative z-10 font-bold uppercase tracking-wider text-sm text-white group-hover:text-concrete-900 transition-colors duration-300">
                Devis gratuit
              </span>
              <svg
                className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-all duration-300 text-white group-hover:text-concrete-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="tel:0980336060"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-white/25 text-white
                rounded-xl hover:border-copper hover:text-copper transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-sm font-semibold tracking-wide">09 80 33 60 60</span>
            </a>
          </div>

          {/* Certifications & Scroll indicator - same row */}
          <div className="flex flex-wrap items-center justify-between gap-4 animate-fade-in-up delay-600">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-concrete-400 text-xs uppercase tracking-widest mr-2">Artisan certifié</span>
              <span
                className="px-3 py-1.5 bg-white/5 border border-white/15 text-concrete-300 text-xs font-medium tracking-wide backdrop-blur-sm rounded-lg"
                title="Certification Qualibat - Qualification des entreprises de bâtiment"
              >
                QUALIBAT
              </span>
              <span
                className="px-3 py-1.5 bg-white/5 border border-white/15 text-concrete-300 text-xs font-medium tracking-wide backdrop-blur-sm rounded-lg"
                title="Reconnu Garant de l'Environnement - Travaux de rénovation énergétique"
              >
                RGE
              </span>
              <span
                className="px-3 py-1.5 bg-white/5 border border-white/15 text-concrete-300 text-xs font-medium tracking-wide backdrop-blur-sm rounded-lg"
                title="Handibat - Accessibilité et adaptation du bâtiment"
              >
                HANDIBAT
              </span>
              <span
                className="px-3 py-1.5 bg-white/5 border border-white/15 text-concrete-300 text-xs font-medium tracking-wide backdrop-blur-sm rounded-lg"
                title="Qualifelec - Qualification des entreprises d'électricité"
              >
                QUALIFELEC
              </span>
            </div>

            {/* Scroll indicator */}
            <div className="hidden lg:flex items-center gap-3 animate-fade-in delay-800">
              <div className="w-5.5 h-8.5 rounded-full border-2 border-white/30 flex justify-center pt-2">
                <div className="w-0.75 h-2 rounded-full bg-copper hero-scroll-dot" />
              </div>
              <span className="text-concrete-400 text-[9px] uppercase tracking-[0.25em]">Scroll</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
