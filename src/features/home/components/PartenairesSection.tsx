'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { PARTENAIRES } from '@/lib/constants';

const LogoLoop = dynamic(
  () => import('@/components/ui/LogoLoop').then((mod) => mod.LogoLoop),
  { ssr: false }
);

export function PartenairesSection() {
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
    <section className="py-24 lg:py-32 px-4 lg:px-16 bg-background">
      <div className="max-w-350 mx-auto">
        <div ref={addToRefs} className="reveal text-center mb-12">
          <span className="text-label mb-4 block">Ils nous font confiance</span>
          <h2 className="text-display-md text-concrete-900">Nos partenaires</h2>
        </div>

        <LogoLoop
          logos={PARTENAIRES}
          speed={80}
          logoHeight={50}
          gap={56}
          pauseOnHover
          scaleOnHover
          fadeOut
        />
      </div>
    </section>
  );
}
