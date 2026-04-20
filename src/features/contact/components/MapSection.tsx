'use client';

import { MapFacade } from './MapFacade';

export function MapSection() {
  return (
    <section className="px-4 lg:px-16 pb-6 lg:pb-10">
      <div className="max-w-350 mx-auto h-[400px] lg:h-[500px] relative rounded-3xl overflow-hidden bg-concrete-200">
        <MapFacade />

        <a
          href="https://maps.google.com/?q=4+rue+Charles+Legros+91320+Wissous"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 left-6 z-20 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
        >
          <p className="font-display text-concrete-900 group-hover:text-copper transition-colors">GH Bâtiment</p>
          <p className="text-sm text-concrete-500">4 rue Charles Legros, 91320 Wissous</p>
        </a>
      </div>
    </section>
  );
}
