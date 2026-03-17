'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';

export type DisplayAlbum = {
  id: string;
  title: string;
  cover: string;
  images: string[];
};

type AlbumModalProps = {
  album: DisplayAlbum;
  onClose: () => void;
};

export function AlbumModal({ album, onClose }: AlbumModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => onClose(), 300);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { handleClose(); }
    };
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  return (
    <div
      className={`fixed inset-0 z-100 bg-black transition-opacity duration-300
        ${isEntering ? 'opacity-0' : isExiting ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Left side - Album title */}
      <div className="absolute left-3 lg:left-10 top-1/2 -translate-y-1/2 z-20">
        <h3 className="font-display text-sm lg:text-xl text-white/90 tracking-wide">
          {album.title}
        </h3>
      </div>

      {/* Right side - Counter */}
      <div className="absolute right-3 lg:right-10 top-1/2 -translate-y-1/2 z-20">
        <span className="text-white/60 text-xs lg:text-sm font-medium tracking-wider">
          {currentImageIndex + 1} / {album.images.length}
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
            prev: { translate: ['-100%', 0, 0] },
            next: { translate: ['100%', 0, 0] },
          }}
          keyboard={{ enabled: true }}
          loop={album.images.length > 1}
          speed={700}
          className="w-full h-full max-w-6xl"
          onSwiper={(swiper: SwiperType) => { swiperRef.current = swiper; }}
          onSlideChange={(swiper: SwiperType) => setCurrentImageIndex(swiper.realIndex)}
        >
          {album.images.map((image, index) => (
            <SwiperSlide
              key={`${album.id}-${index}`}
              className="flex items-center justify-center cursor-pointer"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={image}
                  alt={`${album.title} - Photo ${index + 1}`}
                  fill
                  sizes="(max-width: 1536px) 100vw, 1536px"
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Close button */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={handleClose}
          className="px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full
            text-white text-sm font-medium tracking-wide transition-all duration-300
            border border-white/20 hover:border-white/40"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
