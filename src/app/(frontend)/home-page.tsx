'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { RefreshRouteOnSave } from '@payloadcms/live-preview-react';

const AlbumModal = dynamic(
  () => import('@/components/shared/AlbumModal').then((mod) => mod.AlbumModal),
  { ssr: false },
);
import { LogoLoop } from '@/components/ui/LogoLoop';

// Images — Sections
import renovationImg from '../../../public/images/Savoir-faire/renovation.webp';
import bandeauImg from '../../../public/images/Savoir-faire/bandeau.webp';

// Liste des partenaires
const partenaires = [
  { src: '/images/Partenaire/cedeo.webp', alt: 'Cedeo' },
  { src: '/images/Partenaire/pointP.webp', alt: 'Point P' },
  { src: '/images/Partenaire/carrelageRoger.webp', alt: 'Carrelage Roger' },
  { src: '/images/Partenaire/kdi.webp', alt: 'KDI' },
  { src: '/images/Partenaire/chossiere.webp', alt: 'Chossiere' },
  { src: '/images/Partenaire/raboni.webp', alt: 'Raboni' },
  { src: '/images/Partenaire/nollet.webp', alt: 'Nollet' },
  { src: '/images/Partenaire/lapalette.webp', alt: 'La Palette' },
  { src: '/images/Partenaire/cogeferm.webp', alt: 'Cogeferm' },
  { src: '/images/Partenaire/lossignol.webp', alt: 'Lossignol' },
  { src: '/images/Partenaire/petruzella.webp', alt: 'Petruzella' },
];

type MediaObject = { id: string; url: string; width?: number; height?: number; alt?: string };

type EngagementItem = {
  id?: string;
  title: string;
  description: string;
  icon: 'shield' | 'team' | 'checklist' | 'star' | 'clock' | 'thumbup';
};

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

type PayloadMedia = { url?: string | null; alt?: string | null };
type PayloadAlbum = { id?: string | null; title: string; images?: (string | PayloadMedia)[] | null };
type GalerieSection = { albums?: PayloadAlbum[] | null };
type DisplayAlbum = { id: string; title: string; cover: string; images: string[] };

const DEFAULT_ENGAGEMENTS: EngagementItem[] = [
  {
    id: 'certifications',
    title: 'Certifications reconnues',
    description:
      'Qualibat, RGE, Handibat, Qualifelec : nos certifications attestent de notre professionnalisme et de notre engagement qualité.',
    icon: 'shield',
  },
  {
    id: 'equipes',
    title: 'Équipes qualifiées',
    description:
      'Des artisans expérimentés et formés dans chaque domaine pour un travail impeccable sur tous vos chantiers.',
    icon: 'team',
  },
  {
    id: 'suivi',
    title: 'Suivi personnalisé',
    description:
      "Un interlocuteur unique et un reporting régulier pour une transparence totale sur l'avancement de vos travaux.",
    icon: 'checklist',
  },
];

const DEFAULT_STATS: Array<{ value: string; suffix?: string; label: string; id: string }> = [
  { id: 'ca', value: '700K', suffix: '€', label: "Chiffre d'affaires" },
  { id: 'chantiers', value: '70', suffix: '+', label: 'Chantiers réalisés' },
  { id: 'satisfaction', value: '98', suffix: '%', label: 'Clients satisfaits' },
];

const ICON_PATHS: Record<string, string> = {
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  team: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  checklist: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  thumbup: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5',
};

type HomePageProps = {
  engagementsSection?: EngagementsSectionData;
  galerieSection?: GalerieSection | null;
};

export default function HomePage({ engagementsSection = {}, galerieSection }: HomePageProps) {
  const router = useRouter();

  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<DisplayAlbum | null>(null);

  const COL_SPANS = ['lg:col-span-5', 'lg:col-span-3', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-5'];
  const payloadAlbums = galerieSection?.albums;
  const normalizeUrl = (url: string) => {
    if (!url) return '';
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(url)) return url.replace(/^https?:\/\/[^/]+/, '');
    return url;
  };
  const displayAlbums: DisplayAlbum[] = (payloadAlbums || []).map((album: PayloadAlbum, i: number) => {
    const imgs = (album.images || []).map((img: string | PayloadMedia) => {
      const raw = typeof img === 'object' && img !== null && 'url' in img ? (img.url || '') : String(img);
      return normalizeUrl(raw);
    });
    return { id: album.id || String(i), title: album.title, cover: imgs[0] || '', images: imgs };
  });
  const openAlbum = useCallback((album: DisplayAlbum) => {
    setSelectedAlbum(album);
  }, []);

  const closeAlbum = useCallback(() => {
    setSelectedAlbum(null);
  }, []);


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

    intersectionObserverRef.current = observer;

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
      intersectionObserverRef.current = null;
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
      intersectionObserverRef.current?.observe(el);
    }
  };

  return (
    <>
      <RefreshRouteOnSave
        refresh={router.refresh}
        serverURL={process.env.NEXT_PUBLIC_ADMIN_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}
      />
      {/* Corps de métier Section */}
      <section className="py-24 lg:py-32 bg-concrete-950 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
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

          {/* Métiers Grid */}
          <div ref={addToRefs} className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
            {[
              { name: 'Maçonnerie', icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                  <rect x="2" y="4" width="9" height="5" rx="0.5" />
                  <rect x="13" y="4" width="9" height="5" rx="0.5" />
                  <rect x="6" y="10" width="9" height="5" rx="0.5" />
                  <rect x="2" y="16" width="9" height="5" rx="0.5" />
                  <rect x="13" y="16" width="9" height="5" rx="0.5" />
                  <rect x="17" y="10" width="5" height="5" rx="0.5" />
                  <rect x="2" y="10" width="2" height="5" rx="0.5" />
                </svg>
              )},
              { name: 'Charpente', icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                  <path d="M2 20L12 4l10 16" />
                  <path d="M6 14h12" />
                  <path d="M8.5 9l3.5 5 3.5-5" />
                </svg>
              )},
              { name: 'Menuiserie', icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                  <rect x="4" y="2" width="16" height="20" rx="1" />
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <circle cx="14.5" cy="12" r="1" fill="currentColor" />
                </svg>
              )},
              { name: 'Plomberie', icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                  <path d="M7 4v4a5 5 0 0010 0V4" />
                  <path d="M7 8H4v3a3 3 0 003 3h0" />
                  <path d="M17 8h3v3a3 3 0 01-3 3h0" />
                  <path d="M10 16v4h4v-4" />
                </svg>
              )},
              { name: 'Électricité', icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                  <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                </svg>
              )},
              { name: 'Carrelage', icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                  <rect x="3" y="3" width="8" height="8" rx="0.5" />
                  <rect x="13" y="3" width="8" height="8" rx="0.5" />
                  <rect x="3" y="13" width="8" height="8" rx="0.5" />
                  <rect x="13" y="13" width="8" height="8" rx="0.5" />
                </svg>
              )},
              { name: 'Peinture', icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                  <path d="M19 3H5a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
                  <path d="M12 11v5" />
                  <path d="M8 20h8" strokeLinecap="round" />
                  <path d="M10 16h4v4h-4z" />
                </svg>
              )},
              { name: 'Isolation', icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                  <rect x="4" y="2" width="16" height="20" rx="1" />
                  <path d="M4 8h16" />
                  <path d="M4 14h16" />
                  <path d="M8 8v6" strokeDasharray="2 2" />
                  <path d="M12 8v6" strokeDasharray="2 2" />
                  <path d="M16 8v6" strokeDasharray="2 2" />
                </svg>
              )},
            ].map((metier, index) => (
              <div
                key={metier.name}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 lg:p-8 text-center
                  hover:bg-copper/15 hover:border-copper/30
                  transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-copper/15 flex items-center justify-center
                  group-hover:bg-copper/25 transition-colors duration-300">
                  <span className="text-copper transition-colors duration-300">
                    {metier.icon}
                  </span>
                </div>
                <span className="text-white text-sm font-medium tracking-wide group-hover:text-copper transition-colors duration-300">
                  {metier.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Engagements Section */}
      <section id="engagements" className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Content */}
            <div ref={addToRefs} className="reveal">
              <span className="text-copper text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
                {engagementsSection.label ?? 'Nos engagements'}
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-concrete-900 tracking-tight mb-8">
                {engagementsSection.title ?? 'La qualité comme'}<br />
                <span className="text-copper">{engagementsSection.titleHighlight ?? 'signature'}</span>
              </h2>

              <div className="space-y-8">
                {(engagementsSection.engagements?.length ? engagementsSection.engagements : DEFAULT_ENGAGEMENTS).map((item: EngagementItem) => {
                  const iconPath = ICON_PATHS[item.icon] ?? ICON_PATHS.shield;
                  return (
                    <div key={item.id} className="flex gap-6">
                      <div className="w-12 h-12 bg-copper/10 rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPath} />
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

              {/* Chiffres clés */}
              {(() => {
                const stats = engagementsSection.stats?.length ? engagementsSection.stats : DEFAULT_STATS;
                return stats.length > 0 && (
                <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-concrete-200">
                  {stats.map((stat, index) => (
                    <div key={stat.id ?? index} className="text-center">
                      <div className="text-3xl font-display text-copper">
                        {stat.value}{stat.suffix}
                      </div>
                      <div className="text-xs text-concrete-500 uppercase tracking-wider mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
                );
              })()}
            </div>

            {/* Image */}
            <div ref={addToRefs} className="reveal-right relative px-8 pb-8">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  {engagementsSection.image?.url ? (
                    <Image
                      src={engagementsSection.image.url.replace(/^https?:\/\/[^/]+/, '')}
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
                {/* Decorative Frame */}
                <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-copper rounded-2xl -z-10" />

                {/* Stats Overlay */}
                <div className="absolute -left-8 bottom-12 bg-concrete-950 rounded-xl p-6 lg:p-8">
                  <div className="text-4xl lg:text-5xl font-display text-copper mb-1">
                    {engagementsSection.imageOverlayValue ?? '20+'}
                  </div>
                  <div className="text-white text-sm tracking-wide">
                    {engagementsSection.imageOverlayLabel ?? "Années d'expérience"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Editorial Design */}
      <section className="py-6 lg:py-10 bg-[#f5f4f0]">
        <div className="px-4 lg:px-16 max-w-[1600px] mx-auto w-full">
          {/* Section header */}
          <div ref={addToRefs} className="reveal mb-6 lg:mb-8">
            <div className="flex items-center gap-4">
              <span className="text-concrete-400">—</span>
              <h2 className="font-display text-2xl md:text-3xl text-concrete-900 tracking-tight uppercase">
                Galerie
              </h2>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-12 auto-rows-[250px] lg:auto-rows-[calc((100vh-14rem)/2)] gap-3 lg:gap-4">
            {displayAlbums.map((album, index) => (
            <button
              key={album.id}
              ref={addToRefs}
              onClick={() => openAlbum(album)}
              className={`reveal group col-span-1 ${COL_SPANS[index % 6]} focus:outline-none cursor-pointer`}
            >
              <div className="relative h-full overflow-hidden shadow-lg rounded-xl">
                {album.cover && (
                  <Image
                    src={album.cover}
                    alt={album.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    quality={75}
                    className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-50"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-sm font-medium">{album.title}</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Voir l&apos;album</span>
              </div>
            </button>
            ))}
          </div>

        </div>
      </section>

      {/* Album Modal — lazy-loaded with Swiper */}
      {selectedAlbum && (
        <AlbumModal album={selectedAlbum} onClose={closeAlbum} />
      )}

      {/* Partenaires Section */}
      <section className="py-24 lg:py-32 px-4 lg:px-16 bg-background">
        <div className="max-w-350 mx-auto">
          <div
            ref={addToRefs}
            className="reveal text-center mb-12"
          >
            <span className="text-label mb-4 block">Ils nous font confiance</span>
            <h2 className="text-display-md text-concrete-900">
              Nos partenaires
            </h2>
          </div>

          <LogoLoop
            logos={partenaires}
            speed={80}
            logoHeight={50}
            gap={56}
            pauseOnHover
            scaleOnHover
            fadeOut
          />
        </div>
      </section>

      {/* CTA Section — Card Style */}
      <section className="px-4 lg:px-16 pb-6 lg:pb-10">
        <div className="max-w-350 mx-auto relative rounded-3xl overflow-hidden">
          {/* Background Image */}
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

          {/* Content */}
          <div
            ref={addToRefs}
            className="reveal relative z-10 px-8 py-16 md:px-16 lg:px-24 lg:py-24 text-center"
          >
            <span className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-copper" />
              <span className="text-copper text-xs font-semibold uppercase tracking-[0.3em]">Parlons-en</span>
              <span className="w-8 h-px bg-copper" />
            </span>

            <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] text-white leading-none tracking-tight mb-6">
              Un projet en tête<span className="text-copper"> ?</span>
            </h2>

            <p className="text-lg lg:text-xl text-concrete-400 leading-relaxed mb-12 max-w-xl mx-auto">
              Discutons de votre projet. Notre équipe vous accompagne de A à Z
              pour concrétiser vos ambitions.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-copper text-white font-bold uppercase tracking-wider text-sm
                  rounded-xl hover:bg-white hover:text-concrete-950 transition-all duration-300"
              >
                <span>Contactez-nous</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:0980336060"
                className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white
                  rounded-xl hover:border-copper hover:text-copper transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm font-semibold tracking-wide">09 80 33 60 60</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
