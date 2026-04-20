'use client';

import Image from 'next/image';
import chantierImg from '../../../../public/images/Savoir-faire/chantier.webp';

export function ContactHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-concrete-950">
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

      <div className="absolute top-0 left-[45%] w-32 h-full bg-copper/10 -skew-x-12 hidden lg:block" />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-copper" />
              <span className="text-copper text-xs font-semibold tracking-[0.25em] uppercase">
                Parlons de votre projet
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-8">
              Contactez-<span className="text-copper">nous</span>
            </h1>

            <p className="text-lg text-concrete-400 leading-relaxed">
              Une question, un projet ? Notre équipe
              vous répond sous 48h.
            </p>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-copper via-copper/50 to-transparent" />
    </section>
  );
}
