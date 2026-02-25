import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Derive active index from pathname (no state needed)
  const activeIndex = useMemo(() => {
    const index = navItems.findIndex(item => item.href === router.pathname);
    return index !== -1 ? index : 0;
  }, [router.pathname]);

  // The displayed index is either hovered or active
  const displayedIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change via router events
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Calculate indicator position for desktop nav
  useEffect(() => {
    if (navRef.current) {
      const links = navRef.current.querySelectorAll('a[data-nav-link]');
      const targetLink = links[displayedIndex] as HTMLElement;
      if (targetLink) {
        setIndicatorStyle({
          left: targetLink.offsetLeft,
          width: targetLink.offsetWidth,
        });
      }
    }
  }, [displayedIndex]);

  const isHomePage = router.pathname === '/';

  return (
    <>
      {/* Construction line that appears on scroll */}
      <div
        className={`fixed top-0 left-0 right-0 h-1 z-60 transition-all duration-500 ease-out
          ${scrolled ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="h-full bg-gradient-to-r from-copper via-gold to-copper animate-shimmer"
          style={{ backgroundSize: '200% 100%' }}
        />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? 'bg-concrete-950/98 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : isHomePage
              ? 'bg-concrete-950 lg:bg-transparent lg:bg-linear-to-b lg:from-concrete-950/80 lg:to-transparent'
              : 'bg-concrete-950/95 backdrop-blur-xl'
          }
          ${scrolled ? 'pt-1' : 'pt-0'}`}
      >
        <div className="container-wide">
          <div className={`flex items-center justify-between transition-all duration-300
            ${scrolled ? 'h-16 lg:h-20' : 'h-20 lg:h-24'}`}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative">
                {/* Copper frame on hover */}
                <div className="absolute -inset-2 border border-copper/0 group-hover:border-copper/50
                  transition-all duration-300 group-hover:scale-110" />
                <Image
                  src="/images/LogoGH.webp"
                  alt="GH Bâtiment"
                  width={50}
                  height={50}
                  className={`transition-all duration-300 group-hover:brightness-110
                    ${scrolled ? 'h-10 w-auto' : 'h-12 w-auto'}`}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              <div ref={navRef} className="relative flex items-center">
                {/* Sliding indicator - architectural beam style */}
                <div
                  className="absolute bottom-0 h-0.5 bg-copper transition-all duration-300 ease-out"
                  style={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                    boxShadow: '0 0 10px rgba(184, 115, 51, 0.5)'
                  }}
                />

                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-nav-link
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.15em]
                      transition-colors duration-200
                      ${router.pathname === item.href
                        ? 'text-copper'
                        : 'text-concrete-300 hover:text-white'
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* CTA Button - Industrial style */}
              <Link
                href="/contact"
                className="group relative ml-6 px-6 py-3 overflow-hidden"
              >
                {/* Background layers */}
                <div className="absolute inset-0 bg-copper transition-transform duration-300
                  group-hover:translate-x-full" />
                <div className="absolute inset-0 bg-white -translate-x-full transition-transform duration-300
                  group-hover:translate-x-0" />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-white/30
                  group-hover:border-copper transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-white/30
                  group-hover:border-copper transition-colors duration-300" />

                <span className="relative z-10 text-[13px] font-bold uppercase tracking-[0.1em] text-white
                  group-hover:text-concrete-900 transition-colors duration-300">
                  Devis gratuit
                </span>
              </Link>
            </div>

            {/* Spacer for mobile button (keeps layout balanced) */}
            <div className="lg:hidden w-10 h-10" />
          </div>
        </div>
      </nav>

      {/* Mobile menu button - outside nav to avoid z-index stacking */}
      <button
        className="lg:hidden fixed right-4 top-5 z-60 w-10 h-10 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div className="relative w-6 h-5 flex flex-col justify-between">
          <span
            className={`block h-0.5 bg-white transition-all duration-300 origin-left
              ${isOpen ? 'rotate-45 w-5.5 translate-x-0.75' : 'w-full'}`}
          />
          <span
            className={`block h-0.5 bg-white transition-all duration-300
              ${isOpen ? 'opacity-0' : 'w-4'}`}
          />
          <span
            className={`block h-0.5 bg-white transition-all duration-300 origin-left
              ${isOpen ? '-rotate-45 w-5.5 translate-x-0.75' : 'w-full'}`}
          />
        </div>
      </button>

      {/* Mobile Navigation - Full screen overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-55 bg-concrete-950 flex flex-col items-center justify-center">
          <nav className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-display uppercase tracking-wider
                  ${router.pathname === item.href ? 'text-copper' : 'text-white'}`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-6 px-8 py-4 bg-copper text-white font-bold uppercase tracking-wider"
            >
              Demander un devis
            </Link>

            <div className="mt-8 flex flex-col items-center gap-2">
              <a href="tel:0980336060" className="text-concrete-400">
                09 80 33 60 60
              </a>
              <a href="mailto:contact.ghbat@gmail.com" className="text-concrete-500 text-sm">
                contact.ghbat@gmail.com
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
