import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';

// Liste des partenaires
const partenaires = [
  { src: '/images/Partenaire/cedeo.png', alt: 'Cedeo', width: 100 },
  { src: '/images/Partenaire/pointP.png', alt: 'Point P', width: 150 },
  { src: '/images/Partenaire/carrelageRoger.png', alt: 'Carrelage Roger', width: 200 },
  { src: '/images/Partenaire/kdi.png', alt: 'KDI', width: 100 },
  { src: '/images/Partenaire/chossiere.png', alt: 'Chossiere', width: 100 },
  { src: '/images/Partenaire/raboni.png', alt: 'Raboni', width: 100 },
  { src: '/images/Partenaire/nollet.png', alt: 'Nollet', width: 100 },
  { src: '/images/Partenaire/lapalette.jpeg', alt: 'La Palette', width: 200 },
  { src: '/images/Partenaire/cogeferm.png', alt: 'Cogeferm', width: 200 },
  { src: '/images/Partenaire/lossignol.jpeg', alt: 'Lossignol', width: 100 },
  { src: '/images/Partenaire/petruzella.jpeg', alt: 'Petruzella', width: 100 },
];

// Chiffres clés
const chiffres = [
  { value: '700K', label: "Chiffre d'affaires", suffix: '€' },
  { value: '70', label: 'Chantiers réalisés', suffix: '+' },
  { value: '98', label: 'Clients satisfaits', suffix: '%' },
];

// Albums de réalisations avec toutes les photos
const albums = [
  {
    id: 'theatre-rungis',
    title: 'Théâtre de Rungis',
    category: 'Rénovation complète',
    cover: '/images/RealisationChantier/HallRungis/9.webp',
    images: [
      '/images/RealisationChantier/HallRungis/1.webp',
      '/images/RealisationChantier/HallRungis/2.webp',
      '/images/RealisationChantier/HallRungis/3.webp',
      '/images/RealisationChantier/HallRungis/4.webp',
      '/images/RealisationChantier/HallRungis/5.webp',
      '/images/RealisationChantier/HallRungis/6.webp',
      '/images/RealisationChantier/HallRungis/7.webp',
      '/images/RealisationChantier/HallRungis/8.webp',
      '/images/RealisationChantier/HallRungis/9.webp',
    ],
  },
  {
    id: 'pergola',
    title: 'Terrasse & Pergola',
    category: 'Aménagement extérieur',
    cover: '/images/RealisationChantier/Pergola/IMG_7160.jpg',
    images: [
      '/images/RealisationChantier/Pergola/IMG_1675_1.jpeg',
      '/images/RealisationChantier/Pergola/IMG_1965.jpeg',
      '/images/RealisationChantier/Pergola/IMG_1966.jpeg',
      '/images/RealisationChantier/Pergola/IMG_6041.jpeg',
      '/images/RealisationChantier/Pergola/IMG_7157.jpg',
      '/images/RealisationChantier/Pergola/IMG_7158.jpg',
      '/images/RealisationChantier/Pergola/IMG_7159.jpg',
      '/images/RealisationChantier/Pergola/IMG_7160.jpg',
    ],
  },
  {
    id: 'salle-de-bain',
    title: 'Salle de bain',
    category: 'Rénovation',
    cover: '/images/RealisationChantier/SalleDeBain/IMG_4847.jpg',
    images: [
      '/images/RealisationChantier/SalleDeBain/IMG_4839.JPG',
      '/images/RealisationChantier/SalleDeBain/IMG_4840.JPG',
      '/images/RealisationChantier/SalleDeBain/IMG_4841.JPG',
      '/images/RealisationChantier/SalleDeBain/IMG_4842.JPG',
      '/images/RealisationChantier/SalleDeBain/IMG_4843.jpg',
      '/images/RealisationChantier/SalleDeBain/IMG_4844.jpg',
      '/images/RealisationChantier/SalleDeBain/IMG_4845.jpg',
      '/images/RealisationChantier/SalleDeBain/IMG_4846.jpg',
      '/images/RealisationChantier/SalleDeBain/IMG_4847.jpg',
    ],
  },
  {
    id: 'ravalement',
    title: 'Ravalement de façade',
    category: 'Rénovation extérieure',
    cover: '/images/RealisationChantier/Ravalement/Ravalement.JPG',
    images: [
      '/images/RealisationChantier/Ravalement/IMG_1433.jpeg',
      '/images/RealisationChantier/Ravalement/IMG_1712.JPG',
      '/images/RealisationChantier/Ravalement/IMG_1713.JPG',
      '/images/RealisationChantier/Ravalement/IMG_1714.JPG',
      '/images/RealisationChantier/Ravalement/IMG_1805.jpeg',
      '/images/RealisationChantier/Ravalement/Ravalement.JPG',
    ],
  },
  {
    id: 'isolation',
    title: 'Isolation par l\'extérieur',
    category: 'Isolation thermique',
    cover: '/images/RealisationChantier/Isolation/IMG_2798.jpg',
    images: [
      '/images/RealisationChantier/Isolation/IMG_2726.jpg',
      '/images/RealisationChantier/Isolation/IMG_2748.jpg',
      '/images/RealisationChantier/Isolation/IMG_2765.jpg',
      '/images/RealisationChantier/Isolation/IMG_2766.jpg',
      '/images/RealisationChantier/Isolation/IMG_2767.jpg',
      '/images/RealisationChantier/Isolation/IMG_2768.jpg',
      '/images/RealisationChantier/Isolation/IMG_2769.jpg',
      '/images/RealisationChantier/Isolation/IMG_2784.jpg',
      '/images/RealisationChantier/Isolation/IMG_2785.jpg',
      '/images/RealisationChantier/Isolation/IMG_2786.jpg',
      '/images/RealisationChantier/Isolation/IMG_2787.jpg',
      '/images/RealisationChantier/Isolation/IMG_2788.jpg',
      '/images/RealisationChantier/Isolation/IMG_2798.jpg',
      '/images/RealisationChantier/Isolation/IMG_2799.jpg',
      '/images/RealisationChantier/Isolation/IMG_WA01.jpeg',
      '/images/RealisationChantier/Isolation/IMG_WA02.jpeg',
    ],
  },
  {
    id: 'agrandissement',
    title: 'Agrandissement',
    category: 'Construction & Extension',
    cover: '/images/RealisationChantier/Agrandissement/IMG_WA06.jpeg',
    images: [
      '/images/RealisationChantier/Agrandissement/IMG_WA01.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_WA02.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_14921.jpg',
      '/images/RealisationChantier/Agrandissement/IMG_WA03.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_WA04.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_WA05.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_1609.jpg',
      '/images/RealisationChantier/Agrandissement/IMG_1610.jpg',
      '/images/RealisationChantier/Agrandissement/IMG_8236.jpg',
      '/images/RealisationChantier/Agrandissement/IMG_8237.jpg',
      '/images/RealisationChantier/Agrandissement/IMG_8241.jpg',
      '/images/RealisationChantier/Agrandissement/IMG_9066.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_9068.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_9170.jpeg',
      '/images/RealisationChantier/Agrandissement/image_67215873.JPG',
      '/images/RealisationChantier/Agrandissement/IMG_WA06.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_WA07.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_WA08.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_WA09.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_WA10.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_WA11.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_WA12.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_WA13.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_WA14.jpeg',
      '/images/RealisationChantier/Agrandissement/IMG_WA15.jpeg',
    ],
  },
];

// Type pour un album
type Album = typeof albums[number];

export default function Home() {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isTouching = useRef(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const openAlbum = useCallback((album: Album) => {
    setSelectedAlbum(album);
    setCurrentImageIndex(0);
    setIsEntering(true);
    setTimeout(() => setIsEntering(false), 50);
  }, []);

  const closeAlbum = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setSelectedAlbum(null);
      setIsExiting(false);
    }, 300);
  }, []);

  // Fermer le modal avec Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAlbum();
    };
    if (selectedAlbum) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedAlbum, closeAlbum]);

  // Auto-scroll partenaires (compatible touch)
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    let animId: number;
    const speed = 1; // px par frame

    const scroll = () => {
      if (!isTouching.current) {
        el.scrollLeft += speed;
        // Boucle infinie : quand on atteint la moitié, on revient au début
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(scroll);
    };

    const onTouchStart = () => { isTouching.current = true; };
    const onTouchEnd = () => { isTouching.current = false; };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    animId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
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

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <>
      <Head>
        <title>GH Bâtiment | Entreprise du bâtiment tous corps de métier - Île-de-France</title>
        <meta name="description" content="GH Bâtiment, entreprise spécialisée en maîtrise d'œuvre et travaux tous corps d'état en Île-de-France. Construction, rénovation, aménagement depuis 2018." />
        <link rel="canonical" href="https://www.ghbat.fr/" />
        <meta property="og:title" content="GH Bâtiment | Entreprise du bâtiment tous corps de métier - Île-de-France" />
        <meta property="og:description" content="GH Bâtiment, entreprise spécialisée en maîtrise d'œuvre et travaux tous corps d'état en Île-de-France. Construction, rénovation, aménagement depuis 2018." />
        <meta property="og:url" content="https://www.ghbat.fr/" />
        <meta name="twitter:title" content="GH Bâtiment | Entreprise du bâtiment tous corps de métier" />
        <meta name="twitter:description" content="Entreprise spécialisée en maîtrise d'œuvre et travaux tous corps d'état en Île-de-France. Construction, rénovation, aménagement depuis 2018." />
      </Head>

      {/* Hero Section - Split Layout with Diagonal Cut */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Left side - Content with diagonal cut */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[60%] bg-white clip-path-hero z-10">
          {/* Decorative corner accent */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-copper opacity-50" />

          {/* Background texture */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        {/* Right side - Image */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]">
          <Image
            src="/images/Home2.jpeg"
            alt="GH Bâtiment - Chantier"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-transparent lg:from-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-20 min-h-screen flex items-center">
          <div className="w-full lg:w-[55%] px-6 md:px-12 lg:px-16 xl:px-24 py-24 lg:py-32">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
              <span className="inline-block w-12 h-1 bg-copper" />
              <span className="text-copper font-semibold text-sm uppercase tracking-[0.3em]">
                Île-de-France
              </span>
            </div>

            {/* Main title */}
            <h1 className="font-display leading-none mb-6 text-[clamp(3rem,8vw,6rem)] tracking-tight animate-fade-in-up delay-100">
              <span className="text-concrete-900">GH</span>{' '}
              <span className="text-copper">BÂTIMENT</span>
            </h1>

            {/* Tagline with decorative line */}
            <div className="relative pl-6 border-l-2 border-copper/60 mb-8 animate-fade-in-up delay-300">
              <p className="text-xl md:text-2xl font-display text-concrete-900 tracking-wide uppercase">
                Tous corps de métier
              </p>
              <p className="text-concrete-500 mt-2">
                Construction · Rénovation · Aménagement
              </p>
            </div>

            {/* Description */}
            <p className="text-concrete-600 text-lg max-w-md leading-relaxed mb-10 animate-fade-in-up delay-400">
              Votre projet entre les mains d&apos;experts qualifiés.
              Maîtrise d&apos;œuvre et coordination complète depuis 2018.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up delay-500">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-copper text-white font-bold uppercase tracking-wider text-sm
                  hover:bg-concrete-900 transition-all duration-300"
              >
                <span>Devis gratuit</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

            </div>

            {/* Certifications */}
            <div className="flex flex-wrap items-center gap-3 animate-fade-in-up delay-600">
              <span className="text-concrete-500 text-xs uppercase tracking-widest mr-2">Certifié</span>
              <span className="px-3 py-1.5 bg-concrete-100 border border-concrete-200 text-concrete-700 text-xs font-medium tracking-wide">QUALIBAT</span>
              <span className="px-3 py-1.5 bg-concrete-100 border border-concrete-200 text-concrete-700 text-xs font-medium tracking-wide">RGE</span>
              <span className="px-3 py-1.5 bg-concrete-100 border border-concrete-200 text-concrete-700 text-xs font-medium tracking-wide">HANDIBAT</span>
              <span className="px-3 py-1.5 bg-concrete-100 border border-concrete-200 text-concrete-700 text-xs font-medium tracking-wide">QUALIFELEC</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator - Bottom left */}
        <div className="absolute bottom-8 left-6 md:left-12 lg:left-16 z-30 flex items-center gap-4 animate-fade-in delay-1000">
          <div className="w-px h-12 bg-gradient-to-b from-copper to-transparent" />
          <span className="text-concrete-500 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        </div>
      </section>

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
          <div ref={addToRefs} className="reveal grid grid-cols-2 md:grid-cols-4 gap-px bg-concrete-800/50">
            {[
              { name: 'Maçonnerie', icon: '◼' },
              { name: 'Charpente', icon: '△' },
              { name: 'Menuiserie', icon: '▭' },
              { name: 'Plomberie', icon: '◯' },
              { name: 'Électricité', icon: '⚡' },
              { name: 'Carrelage', icon: '▦' },
              { name: 'Peinture', icon: '◐' },
              { name: 'Isolation', icon: '▤' },
            ].map((metier, index) => (
              <div
                key={metier.name}
                className="bg-concrete-950 p-8 lg:p-12 text-center group hover:bg-concrete-900 transition-colors duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-3xl lg:text-4xl text-copper/60 group-hover:text-copper transition-colors block mb-4">
                  {metier.icon}
                </span>
                <span className="text-white font-medium tracking-wide">
                  {metier.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Engagements Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Content */}
            <div ref={addToRefs} className="reveal">
              <span className="text-copper text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
                Nos engagements
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-concrete-900 tracking-tight mb-8">
                La qualité comme<br />
                <span className="text-copper">signature</span>
              </h2>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-copper/10 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-concrete-900 mb-2">Certifications reconnues</h3>
                    <p className="text-concrete-500">
                      Qualibat, RGE, Handibat, Qualifelec : nos certifications attestent de notre professionnalisme et de notre engagement qualité.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-copper/10 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-concrete-900 mb-2">Équipes qualifiées</h3>
                    <p className="text-concrete-500">
                      Des artisans expérimentés et formés dans chaque domaine pour un travail impeccable sur tous vos chantiers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-copper/10 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-concrete-900 mb-2">Suivi personnalisé</h3>
                    <p className="text-concrete-500">
                      Un interlocuteur unique et un reporting régulier pour une transparence totale sur l&apos;avancement de vos travaux.
                    </p>
                  </div>
                </div>
              </div>

              {/* Chiffres clés */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-concrete-200">
                {chiffres.map((chiffre, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-display text-copper">
                      {chiffre.value}{chiffre.suffix}
                    </div>
                    <div className="text-xs text-concrete-500 uppercase tracking-wider mt-1">{chiffre.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div ref={addToRefs} className="reveal-right relative px-8 pb-8">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/Savoir-faire/renovation.jpeg"
                    alt="Qualité GH Bâtiment"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative Frame */}
                <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-copper -z-10" />

                {/* Stats Overlay */}
                <div className="absolute -left-8 bottom-12 bg-concrete-950 p-6 lg:p-8">
                  <div className="text-4xl lg:text-5xl font-display text-copper mb-1">20+</div>
                  <div className="text-white text-sm tracking-wide">Années d&apos;expérience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Editorial Design */}
      <section className="py-6 lg:py-10 lg:h-[calc(100vh-5rem)] bg-[#f5f4f0] flex flex-col lg:overflow-hidden">
        <div className="px-4 lg:px-16 max-w-[1600px] mx-auto w-full flex-1 flex flex-col min-h-0">
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
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-12 grid-rows-3 lg:grid-rows-2 gap-3 lg:gap-4">
            {/* Row 1 */}
            {/* Image 1 - Rectangle large */}
            <button
              ref={addToRefs}
              onClick={() => openAlbum(albums[0])}
              className="reveal group col-span-1 lg:col-span-5 focus:outline-none cursor-pointer"
            >
              <div className="relative h-full min-h-[150px] overflow-hidden shadow-lg">
                <Image src={albums[0].cover} alt={albums[0].title} fill className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-sm font-medium">{albums[0].title}</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Voir l&apos;album</span>
              </div>
            </button>

            {/* Image 2 - Carré */}
            <button
              ref={addToRefs}
              onClick={() => openAlbum(albums[1])}
              className="reveal group col-span-1 lg:col-span-3 focus:outline-none cursor-pointer"
            >
              <div className="relative h-full min-h-[150px] overflow-hidden shadow-lg">
                <Image src={albums[1].cover} alt={albums[1].title} fill className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-sm font-medium">{albums[1].title}</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Voir l&apos;album</span>
              </div>
            </button>

            {/* Image 3 - Petit rectangle */}
            <button
              ref={addToRefs}
              onClick={() => openAlbum(albums[2])}
              className="reveal group col-span-1 lg:col-span-4 focus:outline-none cursor-pointer"
            >
              <div className="relative h-full min-h-[150px] overflow-hidden shadow-lg">
                <Image src={albums[2].cover} alt={albums[2].title} fill className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-sm font-medium">{albums[2].title}</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Voir l&apos;album</span>
              </div>
            </button>

            {/* Row 2 */}
            {/* Image 4 - Petit rectangle */}
            <button
              ref={addToRefs}
              onClick={() => openAlbum(albums[3])}
              className="reveal group col-span-1 lg:col-span-4 focus:outline-none cursor-pointer"
            >
              <div className="relative h-full min-h-[150px] overflow-hidden shadow-lg">
                <Image src={albums[3].cover} alt={albums[3].title} fill className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-sm font-medium">{albums[3].title}</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Voir l&apos;album</span>
              </div>
            </button>

            {/* Image 5 - Carré */}
            <button
              ref={addToRefs}
              onClick={() => openAlbum(albums[4])}
              className="reveal group col-span-1 lg:col-span-3 focus:outline-none cursor-pointer"
            >
              <div className="relative h-full min-h-[150px] overflow-hidden shadow-lg">
                <Image src={albums[4].cover} alt={albums[4].title} fill className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-sm font-medium">{albums[4].title}</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Voir l&apos;album</span>
              </div>
            </button>

            {/* Image 6 - Rectangle large */}
            <button
              ref={addToRefs}
              onClick={() => openAlbum(albums[5])}
              className="reveal group col-span-1 lg:col-span-5 focus:outline-none cursor-pointer"
            >
              <div className="relative h-full min-h-[150px] overflow-hidden shadow-lg">
                <Image src={albums[5].cover} alt={albums[5].title} fill className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-sm font-medium">{albums[5].title}</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Voir l&apos;album</span>
              </div>
            </button>
          </div>

        </div>
      </section>

      {/* Album Modal with Swiper */}
      {selectedAlbum && (
        <div
          className={`fixed inset-0 z-[100] bg-black transition-opacity duration-300
            ${isEntering ? 'opacity-0' : isExiting ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* Left side - Album title (vertically centered) */}
          <div className="absolute left-3 lg:left-10 top-1/2 -translate-y-1/2 z-20">
            <h3 className="font-display text-sm lg:text-xl text-white/90 tracking-wide">
              {selectedAlbum.title}
            </h3>
          </div>

          {/* Right side - Counter (vertically centered) */}
          <div className="absolute right-3 lg:right-10 top-1/2 -translate-y-1/2 z-20">
            <span className="text-white/60 text-xs lg:text-sm font-medium tracking-wider">
              {currentImageIndex + 1} / {selectedAlbum.images.length}
            </span>
          </div>

          {/* Swiper container */}
          <div
            className={`h-full flex items-center justify-center px-0 lg:px-24 py-16 lg:py-20 transition-all duration-300
              ${isEntering ? 'scale-95 opacity-0' : isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
          >
            <Swiper
              modules={[EffectCreative, Keyboard]}
              effect="creative"
              creativeEffect={{
                prev: {
                  translate: ['-100%', 0, 0],
                },
                next: {
                  translate: ['100%', 0, 0],
                },
              }}
              keyboard={{ enabled: true }}
              loop={selectedAlbum.images.length > 1}
              speed={700}
              className="w-full h-full max-w-6xl"
              onSwiper={(swiper) => { swiperRef.current = swiper; }}
              onSlideChange={(swiper) => setCurrentImageIndex(swiper.realIndex)}
            >
              {selectedAlbum.images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={image}
                      alt={`${selectedAlbum.title} - Photo ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1536px) 100vw, 1536px"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Bottom center - Close button (pill style) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <button
              onClick={closeAlbum}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full
                text-white text-sm font-medium tracking-wide transition-all duration-300
                border border-white/20 hover:border-white/40"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Partenaires Section */}
      <section className="section bg-background">
        <div className="container-wide">
          <div
            ref={addToRefs}
            className="reveal text-center mb-12"
          >
            <span className="text-label mb-4 block">Ils nous font confiance</span>
            <h2 className="text-display-md text-concrete-900">
              Nos partenaires
            </h2>
          </div>

          {/* Auto-scroll + swipe tactile */}
          <div ref={marqueeRef} className="overflow-x-auto py-8 scrollbar-hide">
            <div className="flex gap-8 lg:gap-16">
              {[...partenaires, ...partenaires].map((partenaire, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center h-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                >
                  <Image
                    src={partenaire.src}
                    alt={partenaire.alt}
                    width={partenaire.width}
                    height={60}
                    className="h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section — Full-width Banner */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Savoir-faire/bandeau.jpg"
            alt="Contactez GH Bâtiment"
            fill
            className="object-cover"
          />
          {/* Layered overlays for depth */}
          <div className="absolute inset-0 bg-concrete-950/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-concrete-950/40 via-transparent to-concrete-950/40" />
        </div>

        {/* Decorative architectural elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper/40 to-transparent" />
        <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-copper/30 hidden lg:block" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-copper/30 hidden lg:block" />

        {/* Content */}
        <div className="container-wide relative z-10">
          <div
            ref={addToRefs}
            className="reveal max-w-3xl mx-auto text-center"
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
                  hover:bg-white hover:text-concrete-950 transition-all duration-300"
              >
                <span>Contactez-nous</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:0980336060"
                className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white
                  hover:border-copper hover:text-copper transition-all duration-300"
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
