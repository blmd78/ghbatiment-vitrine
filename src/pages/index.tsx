import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';

// Images — Hero & Sections
import heroImg from '../../public/images/Home2.jpeg';
import renovationImg from '../../public/images/Savoir-faire/renovation.jpeg';
import bandeauImg from '../../public/images/Savoir-faire/bandeau.jpg';

// Images — Partenaires
import cedeoImg from '../../public/images/Partenaire/cedeo.png';
import pointPImg from '../../public/images/Partenaire/pointP.png';
import carrelageRogerImg from '../../public/images/Partenaire/carrelageRoger.png';
import kdiImg from '../../public/images/Partenaire/kdi.png';
import chossiereImg from '../../public/images/Partenaire/chossiere.png';
import raboniImg from '../../public/images/Partenaire/raboni.png';
import nolletImg from '../../public/images/Partenaire/nollet.png';
import laPaletteImg from '../../public/images/Partenaire/lapalette.jpeg';
import cogefermImg from '../../public/images/Partenaire/cogeferm.png';
import lossignolImg from '../../public/images/Partenaire/lossignol.jpeg';
import petruzellaImg from '../../public/images/Partenaire/petruzella.jpeg';

// Images — Album: Théâtre de Rungis
import rungis1 from '../../public/images/RealisationChantier/HallRungis/1.webp';
import rungis2 from '../../public/images/RealisationChantier/HallRungis/2.webp';
import rungis3 from '../../public/images/RealisationChantier/HallRungis/3.webp';
import rungis4 from '../../public/images/RealisationChantier/HallRungis/4.webp';
import rungis5 from '../../public/images/RealisationChantier/HallRungis/5.webp';
import rungis6 from '../../public/images/RealisationChantier/HallRungis/6.webp';
import rungis7 from '../../public/images/RealisationChantier/HallRungis/7.webp';
import rungis8 from '../../public/images/RealisationChantier/HallRungis/8.webp';
import rungis9 from '../../public/images/RealisationChantier/HallRungis/9.webp';

// Images — Album: Terrasse & Pergola
import pergola1 from '../../public/images/RealisationChantier/Pergola/IMG_1675_1.jpeg';
import pergola2 from '../../public/images/RealisationChantier/Pergola/IMG_1965.jpeg';
import pergola3 from '../../public/images/RealisationChantier/Pergola/IMG_1966.jpeg';
import pergola4 from '../../public/images/RealisationChantier/Pergola/IMG_6041.jpeg';
import pergola5 from '../../public/images/RealisationChantier/Pergola/IMG_7157.jpg';
import pergola6 from '../../public/images/RealisationChantier/Pergola/IMG_7158.jpg';
import pergola7 from '../../public/images/RealisationChantier/Pergola/IMG_7159.jpg';
import pergola8 from '../../public/images/RealisationChantier/Pergola/IMG_7160.jpg';

// Images — Album: Salle de bain
import sdb1 from '../../public/images/RealisationChantier/SalleDeBain/IMG_4839.jpg';
import sdb2 from '../../public/images/RealisationChantier/SalleDeBain/IMG_4840.jpg';
import sdb3 from '../../public/images/RealisationChantier/SalleDeBain/IMG_4841.jpg';
import sdb4 from '../../public/images/RealisationChantier/SalleDeBain/IMG_4842.jpg';
import sdb5 from '../../public/images/RealisationChantier/SalleDeBain/IMG_4843.jpg';
import sdb6 from '../../public/images/RealisationChantier/SalleDeBain/IMG_4844.jpg';
import sdb7 from '../../public/images/RealisationChantier/SalleDeBain/IMG_4845.jpg';
import sdb8 from '../../public/images/RealisationChantier/SalleDeBain/IMG_4846.jpg';
import sdb9 from '../../public/images/RealisationChantier/SalleDeBain/IMG_4847.jpg';

// Images — Album: Ravalement
import ravalement1 from '../../public/images/RealisationChantier/Ravalement/IMG_1433.jpeg';
import ravalement2 from '../../public/images/RealisationChantier/Ravalement/IMG_1712.jpg';
import ravalement3 from '../../public/images/RealisationChantier/Ravalement/IMG_1713.jpg';
import ravalement4 from '../../public/images/RealisationChantier/Ravalement/IMG_1714.jpg';
import ravalement5 from '../../public/images/RealisationChantier/Ravalement/IMG_1805.jpeg';
import ravalement6 from '../../public/images/RealisationChantier/Ravalement/Ravalement.jpg';

// Images — Album: Isolation
import isolation1 from '../../public/images/RealisationChantier/Isolation/IMG_2726.jpg';
import isolation2 from '../../public/images/RealisationChantier/Isolation/IMG_2748.jpg';
import isolation3 from '../../public/images/RealisationChantier/Isolation/IMG_2765.jpg';
import isolation4 from '../../public/images/RealisationChantier/Isolation/IMG_2766.jpg';
import isolation5 from '../../public/images/RealisationChantier/Isolation/IMG_2767.jpg';
import isolation6 from '../../public/images/RealisationChantier/Isolation/IMG_2768.jpg';
import isolation7 from '../../public/images/RealisationChantier/Isolation/IMG_2769.jpg';
import isolation8 from '../../public/images/RealisationChantier/Isolation/IMG_2784.jpg';
import isolation9 from '../../public/images/RealisationChantier/Isolation/IMG_2785.jpg';
import isolation10 from '../../public/images/RealisationChantier/Isolation/IMG_2786.jpg';
import isolation11 from '../../public/images/RealisationChantier/Isolation/IMG_2787.jpg';
import isolation12 from '../../public/images/RealisationChantier/Isolation/IMG_2788.jpg';
import isolation13 from '../../public/images/RealisationChantier/Isolation/IMG_2798.jpg';
import isolation14 from '../../public/images/RealisationChantier/Isolation/IMG_2799.jpg';
import isolation15 from '../../public/images/RealisationChantier/Isolation/IMG_WA01.jpeg';
import isolation16 from '../../public/images/RealisationChantier/Isolation/IMG_WA02.jpeg';

// Images — Album: Agrandissement
import agrandissement1 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA01.jpeg';
import agrandissement2 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA02.jpeg';
import agrandissement3 from '../../public/images/RealisationChantier/Agrandissement/IMG_14921.jpg';
import agrandissement4 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA03.jpeg';
import agrandissement5 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA04.jpeg';
import agrandissement6 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA05.jpeg';
import agrandissement7 from '../../public/images/RealisationChantier/Agrandissement/IMG_1609.jpg';
import agrandissement8 from '../../public/images/RealisationChantier/Agrandissement/IMG_1610.jpg';
import agrandissement9 from '../../public/images/RealisationChantier/Agrandissement/IMG_8236.jpg';
import agrandissement10 from '../../public/images/RealisationChantier/Agrandissement/IMG_8237.jpg';
import agrandissement11 from '../../public/images/RealisationChantier/Agrandissement/IMG_8241.jpg';
import agrandissement12 from '../../public/images/RealisationChantier/Agrandissement/IMG_9066.jpeg';
import agrandissement13 from '../../public/images/RealisationChantier/Agrandissement/IMG_9068.jpeg';
import agrandissement14 from '../../public/images/RealisationChantier/Agrandissement/IMG_9170.jpeg';
import agrandissement15 from '../../public/images/RealisationChantier/Agrandissement/image_67215873.jpg';
import agrandissement16 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA06.jpeg';
import agrandissement17 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA07.jpeg';
import agrandissement18 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA08.jpeg';
import agrandissement19 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA09.jpeg';
import agrandissement20 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA10.jpeg';
import agrandissement21 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA11.jpeg';
import agrandissement22 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA12.jpeg';
import agrandissement23 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA13.jpeg';
import agrandissement24 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA14.jpeg';
import agrandissement25 from '../../public/images/RealisationChantier/Agrandissement/IMG_WA15.jpeg';

// Liste des partenaires
const partenaires = [
  { src: cedeoImg, alt: 'Cedeo', width: 100 },
  { src: pointPImg, alt: 'Point P', width: 150 },
  { src: carrelageRogerImg, alt: 'Carrelage Roger', width: 200 },
  { src: kdiImg, alt: 'KDI', width: 100 },
  { src: chossiereImg, alt: 'Chossiere', width: 100 },
  { src: raboniImg, alt: 'Raboni', width: 100 },
  { src: nolletImg, alt: 'Nollet', width: 100 },
  { src: laPaletteImg, alt: 'La Palette', width: 200 },
  { src: cogefermImg, alt: 'Cogeferm', width: 200 },
  { src: lossignolImg, alt: 'Lossignol', width: 100 },
  { src: petruzellaImg, alt: 'Petruzella', width: 100 },
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
    cover: rungis9,
    images: [rungis1, rungis2, rungis3, rungis4, rungis5, rungis6, rungis7, rungis8, rungis9],
  },
  {
    id: 'pergola',
    title: 'Terrasse & Pergola',
    category: 'Aménagement extérieur',
    cover: pergola8,
    images: [pergola1, pergola2, pergola3, pergola4, pergola5, pergola6, pergola7, pergola8],
  },
  {
    id: 'salle-de-bain',
    title: 'Salle de bain',
    category: 'Rénovation',
    cover: sdb9,
    images: [sdb1, sdb2, sdb3, sdb4, sdb5, sdb6, sdb7, sdb8, sdb9],
  },
  {
    id: 'ravalement',
    title: 'Ravalement de façade',
    category: 'Rénovation extérieure',
    cover: ravalement6,
    images: [ravalement1, ravalement2, ravalement3, ravalement4, ravalement5, ravalement6],
  },
  {
    id: 'isolation',
    title: 'Isolation par l\'extérieur',
    category: 'Isolation thermique',
    cover: isolation13,
    images: [
      isolation1, isolation2, isolation3, isolation4, isolation5, isolation6,
      isolation7, isolation8, isolation9, isolation10, isolation11, isolation12,
      isolation13, isolation14, isolation15, isolation16,
    ],
  },
  {
    id: 'agrandissement',
    title: 'Agrandissement',
    category: 'Construction & Extension',
    cover: agrandissement16,
    images: [
      agrandissement1, agrandissement2, agrandissement3, agrandissement4, agrandissement5,
      agrandissement6, agrandissement7, agrandissement8, agrandissement9, agrandissement10,
      agrandissement11, agrandissement12, agrandissement13, agrandissement14, agrandissement15,
      agrandissement16, agrandissement17, agrandissement18, agrandissement19, agrandissement20,
      agrandissement21, agrandissement22, agrandissement23, agrandissement24, agrandissement25,
    ],
  },
];

// Type pour un album
type Album = typeof albums[number];

export default function Home() {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        <title>GH Bâtiment | Entreprise générale du bâtiment tous corps de métier - Construction, Rénovation, Aménagement en Île-de-France</title>
        <meta name="description" content="GH Bâtiment, entreprise générale du bâtiment et maîtrise d'œuvre tous corps d'état en Île-de-France. Construction, rénovation intérieure et extérieure, extension maison, ravalement de façade. Artisans qualifiés certifiés Qualibat, RGE. Devis gratuit." />
        <link rel="canonical" href="https://ghbat.fr/" />
        <meta name="keywords" content="entreprise générale bâtiment, tous corps de métier, construction Île-de-France, rénovation intérieure, rénovation extérieure, maîtrise d'œuvre, extension maison, ravalement façade, maçonnerie, charpente, menuiserie, plomberie, électricité, carrelage, peinture, isolation, artisan qualifié, Qualibat, RGE, devis gratuit" />
        <meta property="og:title" content="GH Bâtiment | Entreprise générale du bâtiment tous corps de métier - Île-de-France" />
        <meta property="og:description" content="Construction, rénovation et aménagement tous corps d'état en Île-de-France. Maîtrise d'œuvre, artisans qualifiés certifiés Qualibat et RGE. Devis gratuit." />
        <meta property="og:url" content="https://ghbat.fr/" />
        <meta name="twitter:title" content="GH Bâtiment | Entreprise générale du bâtiment tous corps de métier - Île-de-France" />
        <meta name="twitter:description" content="Construction, rénovation et aménagement tous corps d'état en Île-de-France. Maîtrise d'œuvre, artisans qualifiés certifiés Qualibat et RGE. Devis gratuit." />
      </Head>

      {/* Hero Section - Full-bleed Cinematic */}
      <section className="relative min-h-[85vh] overflow-hidden" aria-label="Présentation GH Bâtiment entreprise générale du bâtiment en Île-de-France">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <Image
            src={heroImg}
            alt="GH Bâtiment - Entreprise générale du bâtiment tous corps de métier, chantier de construction et rénovation en Île-de-France"
            fill
            placeholder="blur"
            className="object-cover hero-img-zoom"
            priority
          />
          {/* Cinematic multi-layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-concrete-950/70 via-concrete-950/50 to-concrete-950/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-concrete-950/60 via-transparent to-transparent" />
          {/* Grain texture */}
          <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Architectural frame accents */}
        <div className="absolute top-8 left-6 md:left-12 lg:left-16 w-16 h-16 border-l-2 border-t-2 border-copper/40 z-20 animate-fade-in delay-600" />
        <div className="absolute top-8 right-6 md:right-12 lg:right-16 w-16 h-16 border-r-2 border-t-2 border-copper/40 z-20 animate-fade-in delay-700" />
        <div className="absolute bottom-8 right-6 md:right-12 lg:right-16 w-16 h-16 border-r-2 border-b-2 border-copper/40 z-20 animate-fade-in delay-800" />

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24 pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
              <span className="inline-block w-12 h-[2px] bg-copper" />
              <span className="text-copper font-semibold text-xs md:text-sm uppercase tracking-[0.3em]">
                Entreprise générale du bâtiment · Île-de-France
              </span>
            </div>

            {/* Main title - SEO H1 with full keywords */}
            <h1 className="font-display leading-[0.9] mb-8 animate-fade-in-up delay-100">
              <span className="block text-[clamp(4rem,12vw,9rem)] text-white tracking-tight">
                <span>GH</span>{' '}
                <span className="text-copper">BÂTIMENT</span>
              </span>
              <span className="block text-[clamp(1.1rem,2.5vw,1.75rem)] text-concrete-300 mt-4 tracking-[0.15em] font-display uppercase">
                Construction, Rénovation &amp; Aménagement
              </span>
            </h1>

            {/* Copper divider */}
            <div className="w-24 h-1 bg-gradient-to-r from-copper to-copper-light mb-8 animate-fade-in-up delay-200" />

            {/* H2 Tagline with decorative line - Keywords rich */}
            <div className="relative pl-6 border-l-2 border-copper/50 mb-8 animate-fade-in-up delay-300">
              <h2 className="text-xl md:text-2xl font-display text-white tracking-wide uppercase">
                Travaux tous corps de métier en Île-de-France
              </h2>
              <p className="text-concrete-400 mt-2 text-sm md:text-base">
                Maçonnerie · Charpente · Menuiserie · Plomberie · Électricité · Carrelage · Peinture · Isolation
              </p>
            </div>

            {/* Description - SEO rich paragraph */}
            <p className="text-concrete-300 text-base md:text-lg max-w-xl leading-relaxed mb-10 animate-fade-in-up delay-400">
              <strong className="text-white font-semibold">Maîtrise d&apos;œuvre et coordination complète</strong> de vos projets par des artisans qualifiés.
              Rénovation intérieure, rénovation extérieure, extension maison, ravalement de façade — votre chantier entre les mains d&apos;experts tous corps d&apos;état.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up delay-500">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-copper text-white font-bold uppercase tracking-wider text-sm
                  hover:bg-copper-light transition-all duration-300 shadow-lg shadow-copper/20"
              >
                <span>Devis gratuit</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:0980336060"
                className="group inline-flex items-center gap-3 px-8 py-4 border border-white/25 text-white
                  hover:border-copper hover:text-copper transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm font-semibold tracking-wide">09 80 33 60 60</span>
              </a>
            </div>

            {/* Certifications & Scroll indicator - same row */}
            <div className="flex flex-wrap items-center justify-between gap-4 animate-fade-in-up delay-600">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-concrete-400 text-xs uppercase tracking-widest mr-2">Artisan certifié</span>
                <span className="px-3 py-1.5 bg-white/5 border border-white/15 text-concrete-300 text-xs font-medium tracking-wide backdrop-blur-sm" title="Certification Qualibat - Qualification des entreprises de bâtiment">QUALIBAT</span>
                <span className="px-3 py-1.5 bg-white/5 border border-white/15 text-concrete-300 text-xs font-medium tracking-wide backdrop-blur-sm" title="Reconnu Garant de l'Environnement - Travaux de rénovation énergétique">RGE</span>
                <span className="px-3 py-1.5 bg-white/5 border border-white/15 text-concrete-300 text-xs font-medium tracking-wide backdrop-blur-sm" title="Handibat - Accessibilité et adaptation du bâtiment">HANDIBAT</span>
                <span className="px-3 py-1.5 bg-white/5 border border-white/15 text-concrete-300 text-xs font-medium tracking-wide backdrop-blur-sm" title="Qualifelec - Qualification des entreprises d'électricité">QUALIFELEC</span>
              </div>

              {/* Scroll indicator */}
              <div className="hidden lg:flex items-center gap-3 animate-fade-in delay-800">
                <div className="w-5.5 h-8.5 rounded-full border-2 border-white/30 flex justify-center pt-2">
                  <div className="w-0.75 h-2 rounded-full bg-copper hero-scroll-dot" />
                </div>
                <span className="text-concrete-400 text-[9px] uppercase tracking-[0.25em]">Scroll</span>
              </div>
            </div>
          </div>
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
              { name: 'Maçonnerie', icon: (
                <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
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
                <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                  <path d="M2 20L12 4l10 16" />
                  <path d="M6 14h12" />
                  <path d="M8.5 9l3.5 5 3.5-5" />
                </svg>
              )},
              { name: 'Menuiserie', icon: (
                <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                  <rect x="4" y="2" width="16" height="20" rx="1" />
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <circle cx="14.5" cy="12" r="1" fill="currentColor" />
                </svg>
              )},
              { name: 'Plomberie', icon: (
                <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                  <path d="M7 4v4a5 5 0 0010 0V4" />
                  <path d="M7 8H4v3a3 3 0 003 3h0" />
                  <path d="M17 8h3v3a3 3 0 01-3 3h0" />
                  <path d="M10 16v4h4v-4" />
                </svg>
              )},
              { name: 'Électricité', icon: (
                <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                  <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                </svg>
              )},
              { name: 'Carrelage', icon: (
                <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                  <rect x="3" y="3" width="8" height="8" rx="0.5" />
                  <rect x="13" y="3" width="8" height="8" rx="0.5" />
                  <rect x="3" y="13" width="8" height="8" rx="0.5" />
                  <rect x="13" y="13" width="8" height="8" rx="0.5" />
                </svg>
              )},
              { name: 'Peinture', icon: (
                <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                  <path d="M19 3H5a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
                  <path d="M12 11v5" />
                  <path d="M8 20h8" strokeLinecap="round" />
                  <path d="M10 16h4v4h-4z" />
                </svg>
              )},
              { name: 'Isolation', icon: (
                <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
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
                className="bg-concrete-950 p-8 lg:p-12 text-center group hover:bg-concrete-900 transition-colors duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-copper/60 group-hover:text-copper transition-colors flex justify-center mb-4">
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
      <section className="py-24 lg:py-32 bg-white overflow-hidden">
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
                    src={renovationImg}
                    alt="Qualité GH Bâtiment"
                    fill
                    placeholder="blur"
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
                <Image src={albums[0].cover} alt={albums[0].title} fill placeholder="blur" className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-50" />
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
                <Image src={albums[1].cover} alt={albums[1].title} fill placeholder="blur" className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-50" />
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
                <Image src={albums[2].cover} alt={albums[2].title} fill placeholder="blur" className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-50" />
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
                <Image src={albums[3].cover} alt={albums[3].title} fill placeholder="blur" className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-50" />
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
                <Image src={albums[4].cover} alt={albums[4].title} fill placeholder="blur" className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-50" />
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
                <Image src={albums[5].cover} alt={albums[5].title} fill placeholder="blur" className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-50" />
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
                      placeholder="blur"
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

          {/* Auto-scroll fluide CSS */}
          <div className="overflow-hidden py-8">
            <div className="flex gap-8 lg:gap-16 animate-marquee w-max">
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
                    placeholder="blur"
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
            src={bandeauImg}
            alt="Contactez GH Bâtiment"
            fill
            placeholder="blur"
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
