'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import bandeauImg from '../../../../public/images/Savoir-faire/bandeau.webp';

export function CTASection() {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observerRef.current = observer;
    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
      observerRef.current?.observe(el);
    }
  };

  return (
    <section className="px-4 lg:px-16 pb-6 lg:pb-10">
      <div className="max-w-350 mx-auto relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={bandeauImg}
            alt="Contactez GH Bâtiment"
            fill
            sizes="(max-width: 1024px) 100vw, 1100px"
            placeholder="blur"
            quality={75}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-concrete-950/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-concrete-950/40 via-transparent to-concrete-950/40" />
        </div>

        <div ref={addToRefs} className="reveal relative z-10 px-8 py-16 md:px-16 lg:px-24 lg:py-24 text-center">
          <span className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-copper" />
            <span className="text-copper text-xs font-semibold uppercase tracking-[0.3em]">Parlons-en</span>
            <span className="w-8 h-px bg-copper" />
          </span>

          <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] text-white leading-none tracking-tight mb-6">
            Un projet en tête<span className="text-copper"> ?</span>
          </h2>

          <p className="text-lg lg:text-xl text-concrete-400 leading-relaxed mb-12 max-w-xl mx-auto">
            Discutons de votre projet. Notre équipe vous accompagne de A à Z pour concrétiser vos ambitions.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-copper rounded-xl transition-transform duration-300
                group-hover:translate-x-full" />
              <div className="absolute inset-0 bg-white rounded-xl -translate-x-full transition-transform duration-300
                group-hover:translate-x-0" />

              <span className="relative z-10 font-bold uppercase tracking-wider text-sm text-white
                group-hover:text-concrete-900 transition-colors duration-300">
                Contactez-nous
              </span>
              <svg
                className="relative z-10 w-5 h-5 text-white group-hover:text-concrete-900 transform group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="tel:0980336060"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white
                rounded-xl hover:border-copper hover:text-copper transition-all duration-300"
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
        </div>
      </div>
    </section>
  );
}
