'use client';

import { useState, useRef, useEffect } from 'react';

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2632.8968509645856!2d2.3234!3d48.7334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671d9eb92c5c7%3A0x2d4a5d4b6aee6d9a!2s4%20Rue%20Charles%20Legros%2C%2091320%20Wissous!5e0!3m2!1sfr!2sfr!4v1706000000000!5m2!1sfr!2sfr';

export function MapFacade() {
  const [activated, setActivated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActivated(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {activated ? (
        <div className="absolute -top-[100px] -bottom-[100px] -left-[400px] -right-[400px]">
          <iframe
            src={MAP_EMBED_SRC}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation GH Bâtiment"
          />
        </div>
      ) : (
        <button
          className="absolute inset-0 bg-concrete-200 flex items-center justify-center cursor-pointer border-0 p-0"
          onClick={() => setActivated(true)}
          aria-label="Afficher la carte Google Maps"
        >
          <div className="text-center text-concrete-500">
            <svg
              className="w-10 h-10 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
            <span className="text-sm">Cliquez pour afficher la carte</span>
          </div>
        </button>
      )}
    </div>
  );
}
