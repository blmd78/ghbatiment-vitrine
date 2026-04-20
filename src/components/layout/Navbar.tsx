'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import logoImg from '../../../public/images/LogoGH.webp';

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
  const pathname = usePathname();

  // Derive active index from pathname (no state needed)
  const activeIndex = useMemo(() => {
    const index = navItems.findIndex(item => item.href === pathname);
    return index !== -1 ? index : 0;
  }, [pathname]);

  // The displayed index is either hovered or active
  const displayedIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  // Track scroll position (throttled via rAF, single state flip on threshold cross)
  useEffect(() => {
    let ticking = false;
    let lastScrolled = window.scrollY > 50;
    setScrolled(lastScrolled);

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 50;
        if (next !== lastScrolled) {
          lastScrolled = next;
          setScrolled(next);
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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

  const isHomePage = pathname === '/';

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
        style={{ contain: 'layout style', willChange: 'transform' }}
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
              <Image
                src={logoImg}
                alt="GH Bâtiment"
                width={50}
                height={50}
                priority
                className={`transition-all duration-300 group-hover:brightness-125 group-hover:opacity-80
                  ${scrolled ? 'h-10 w-auto' : 'h-12 w-auto'}`}
              />
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
                      ${pathname === item.href
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
                className="group relative ml-6 px-6 py-3 rounded-xl overflow-hidden"
              >
                {/* Background layers */}
                <div className="absolute inset-0 bg-copper rounded-xl transition-transform duration-300
                  group-hover:translate-x-full" />
                <div className="absolute inset-0 bg-white rounded-xl -translate-x-full transition-transform duration-300
                  group-hover:translate-x-0" />

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
        <div className="relative w-6 h-6 flex items-center justify-center">
          <span
            className={`absolute block h-0.5 w-6 bg-white transition-all duration-300
              ${isOpen ? 'rotate-45' : '-translate-y-2'}`}
          />
          <span
            className={`absolute block h-0.5 bg-white transition-all duration-300
              ${isOpen ? 'opacity-0 w-0' : 'w-4 opacity-100'}`}
          />
          <span
            className={`absolute block h-0.5 w-6 bg-white transition-all duration-300
              ${isOpen ? '-rotate-45' : 'translate-y-2'}`}
          />
        </div>
      </button>

      {/* Mobile Navigation - Full screen overlay with slide animation */}
      <div
        className={`lg:hidden fixed inset-0 z-55 bg-concrete-950 overflow-hidden
          transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isOpen ? 'translate-y-0' : '-translate-y-full pointer-events-none'}`}
      >
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Architectural corner accents */}
        <div className={`absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2 border-copper/40
          transition-all duration-500 delay-300
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        />
        <div className={`absolute bottom-6 right-6 w-10 h-10 border-r-2 border-b-2 border-copper/40
          transition-all duration-500 delay-400
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        />

        {/* Copper accent line sweep */}
        <div className={`absolute top-20 left-0 right-0 h-px bg-linear-to-r from-transparent via-copper/30 to-transparent
          transition-all duration-700 delay-200
          ${isOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
        />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">

          {/* Navigation links with staggered reveal */}
          <nav className="flex flex-col items-center gap-1 mb-10">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group relative py-3 transition-all ease-out
                  ${isOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-6'}
                  ${pathname === item.href ? 'text-copper' : 'text-white'}`}
                style={{
                  transitionDuration: '500ms',
                  transitionDelay: isOpen ? `${250 + index * 100}ms` : '0ms',
                }}
              >
                <span className="flex items-center gap-4">
                  {/* Decorative index number */}
                  <span className="text-[11px] text-copper/50 font-mono tracking-wider">
                    0{index + 1}
                  </span>
                  <span className="text-3xl font-display uppercase tracking-[0.15em]">
                    {item.label}
                  </span>
                </span>
                {/* Underline reveal on hover */}
                <span className="absolute bottom-1 left-8 right-0 h-px bg-copper/40
                  origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
              </Link>
            ))}
          </nav>

          {/* Copper divider */}
          <div
            className={`w-16 h-0.5 bg-linear-to-r from-copper to-gold mb-10 transition-all duration-500 ease-out
              ${isOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
            style={{ transitionDelay: isOpen ? '450ms' : '0ms' }}
          />

          {/* CTA Button */}
          <div
            className={`transition-all duration-500 ease-out
              ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            style={{ transitionDelay: isOpen ? '500ms' : '0ms' }}
          >
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-copper rounded-xl" />
              <div className="absolute inset-0 bg-copper-light rounded-xl translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative text-sm font-bold uppercase tracking-[0.15em] text-white">
                Demander un devis
              </span>
              <svg className="relative w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
