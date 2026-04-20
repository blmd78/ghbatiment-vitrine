'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { ICON_PATHS, DEFAULT_ENGAGEMENTS, DEFAULT_STATS } from '@/lib/constants';
import renovationImg from '../../../../public/images/Savoir-faire/renovation.webp';

type EngagementItem = {
  id?: string;
  title: string;
  description: string;
  icon: 'shield' | 'team' | 'checklist' | 'star' | 'clock' | 'thumbup';
};

type MediaObject = { id: string; url: string; width?: number; height?: number; alt?: string };

type EngagementsSectionData = {
  label?: string;
  title?: string;
  titleHighlight?: string;
  image?: MediaObject | null;
  imageOverlayValue?: string;
  imageOverlayLabel?: string;
  engagements?: EngagementItem[];
  stats?: Array<{ value: string; suffix?: string; label: string; id?: string }>;
};

type Props = {
  data?: EngagementsSectionData;
};

export function EngagementsSection({ data = {} }: Props) {
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

  const engagements = data.engagements?.length ? data.engagements : DEFAULT_ENGAGEMENTS;
  const stats = data.stats?.length ? data.stats : DEFAULT_STATS;

  return (
    <section id="engagements" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div ref={addToRefs} className="reveal">
            <span className="text-copper text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              {data.label ?? 'Nos engagements'}
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-concrete-900 tracking-tight mb-8">
              {data.title ?? 'La qualité comme'}<br />
              <span className="text-copper">{data.titleHighlight ?? 'signature'}</span>
            </h2>

            <div className="space-y-8">
              {engagements.map((item: EngagementItem) => {
                const iconPath = ICON_PATHS[item.icon] ?? ICON_PATHS.shield;
                return (
                  <div key={item.id} className="flex gap-6">
                    <div className="w-12 h-12 bg-copper/10 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d={iconPath}
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-concrete-900 mb-2">{item.title}</h3>
                      <p className="text-concrete-500">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {stats.length > 0 && (
              <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-concrete-200">
                {stats.map((stat, index) => (
                  <div key={stat.id ?? index} className="text-center">
                    <div className="text-3xl font-display text-copper">
                      {stat.value}
                      {stat.suffix}
                    </div>
                    <div className="text-xs text-concrete-500 uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div ref={addToRefs} className="reveal-right relative px-8 pb-8">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                {data.image?.url ? (
                  <Image
                    src={data.image.url.replace(/^https?:\/\/[^/]+/, '')}
                    alt="Qualité GH Bâtiment"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={75}
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={renovationImg}
                    alt="Qualité GH Bâtiment"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    quality={75}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-copper rounded-2xl -z-10" />

              <div className="absolute -left-8 bottom-12 bg-concrete-950 rounded-xl p-6 lg:p-8">
                <div className="text-4xl lg:text-5xl font-display text-copper mb-1">
                  {data.imageOverlayValue ?? '20+'}
                </div>
                <div className="text-white text-sm tracking-wide">
                  {data.imageOverlayLabel ?? "Années d'expérience"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
