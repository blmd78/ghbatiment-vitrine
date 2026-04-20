'use client';

import { ReactNode, useRef, useEffect } from 'react';
import { METIERS } from '@/lib/constants';

const METIER_ICONS: Record<string, ReactNode> = {
  Maçonnerie: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
      <rect x="2" y="4" width="9" height="5" rx="0.5" />
      <rect x="13" y="4" width="9" height="5" rx="0.5" />
      <rect x="6" y="10" width="9" height="5" rx="0.5" />
      <rect x="2" y="16" width="9" height="5" rx="0.5" />
      <rect x="13" y="16" width="9" height="5" rx="0.5" />
      <rect x="17" y="10" width="5" height="5" rx="0.5" />
      <rect x="2" y="10" width="2" height="5" rx="0.5" />
    </svg>
  ),
  Charpente: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
      <path d="M2 20L12 4l10 16" />
      <path d="M6 14h12" />
      <path d="M8.5 9l3.5 5 3.5-5" />
    </svg>
  ),
  Menuiserie: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <circle cx="14.5" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  Plomberie: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
      <path d="M7 4v4a5 5 0 0010 0V4" />
      <path d="M7 8H4v3a3 3 0 003 3h0" />
      <path d="M17 8h3v3a3 3 0 01-3 3h0" />
      <path d="M10 16v4h4v-4" />
    </svg>
  ),
  Électricité: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  Carrelage: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
      <rect x="3" y="3" width="8" height="8" rx="0.5" />
      <rect x="13" y="3" width="8" height="8" rx="0.5" />
      <rect x="3" y="13" width="8" height="8" rx="0.5" />
      <rect x="13" y="13" width="8" height="8" rx="0.5" />
    </svg>
  ),
  Peinture: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
      <path d="M19 3H5a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
      <path d="M12 11v5" />
      <path d="M8 20h8" strokeLinecap="round" />
      <path d="M10 16h4v4h-4z" />
    </svg>
  ),
  Isolation: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M4 8h16" />
      <path d="M4 14h16" />
      <path d="M8 8v6" strokeDasharray="2 2" />
      <path d="M12 8v6" strokeDasharray="2 2" />
      <path d="M16 8v6" strokeDasharray="2 2" />
    </svg>
  ),
};

export function CorpsMetierSection() {
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
    <section className="py-24 lg:py-32 bg-concrete-950 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-wide relative z-10">
        <div ref={addToRefs} className="reveal text-center mb-16">
          <span className="text-copper text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
            Corps de métier
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight">
            Une expertise complète
          </h2>
        </div>

        <div ref={addToRefs} className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
          {METIERS.map((metier, index) => (
            <div
              key={metier}
              className="group bg-white/5 border border-white/10 rounded-xl p-6 lg:p-8 text-center
                hover:bg-copper/15 hover:border-copper/30
                transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-copper/15 flex items-center justify-center
                group-hover:bg-copper/25 transition-colors duration-300">
                <span className="text-copper transition-colors duration-300">
                  {METIER_ICONS[metier]}
                </span>
              </div>
              <span className="text-white text-sm font-medium tracking-wide group-hover:text-copper transition-colors duration-300">
                {metier}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
