'use client';

export function ContactInfo() {
  return (
    <div className="bg-concrete-950 py-10 lg:py-12 px-6 lg:px-16 relative overflow-hidden lg:flex lg:items-center">
      <div className="relative z-10 max-w-md mx-auto lg:mx-0 w-full">
        <h2 className="font-display text-3xl text-white mb-4">Nos coordonnées</h2>
        <p className="text-concrete-400 text-sm mb-10">
          Notre équipe est disponible pour répondre à toutes vos questions.
        </p>

        <div className="space-y-4">
          <a
            href="tel:0980336060"
            className="group flex items-center gap-5 p-5 bg-white/5 rounded-xl
              hover:bg-copper/15 border border-white/10 hover:border-copper/30
              transition-all duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 bg-copper/15 rounded-xl flex items-center justify-center shrink-0
              group-hover:bg-copper/25 transition-colors duration-300">
              <svg className="w-5 h-5 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
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

          <a
            href="mailto:contact.ghbat@gmail.com"
            className="group flex items-center gap-5 p-5 bg-white/5 rounded-xl
              hover:bg-copper/15 border border-white/10 hover:border-copper/30
              transition-all duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 bg-copper/15 rounded-xl flex items-center justify-center shrink-0
              group-hover:bg-copper/25 transition-colors duration-300">
              <svg className="w-5 h-5 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
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

          <div className="flex items-center gap-5 p-5 bg-white/5 rounded-xl border border-white/10">
            <div className="w-12 h-12 bg-copper/15 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
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

          <div className="flex items-center gap-5 p-5 bg-white/5 rounded-xl border border-white/10">
            <div className="w-12 h-12 bg-copper/15 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
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
  );
}
