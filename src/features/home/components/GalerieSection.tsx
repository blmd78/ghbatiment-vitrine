'use client';

import Image from 'next/image';
import { useCallback, useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { COL_SPANS } from '@/lib/constants';
import { normalizeUrl } from '@/lib/utils/url';

const AlbumModal = dynamic(
  () => import('@/components/shared/AlbumModal').then((mod) => mod.AlbumModal),
  { ssr: false }
);

type PayloadMedia = { url?: string | null; alt?: string | null };
type PayloadAlbum = { id?: string | null; title: string; images?: (string | PayloadMedia)[] | null };
type DisplayAlbum = { id: string; title: string; cover: string; images: string[] };

type Props = {
  albums?: PayloadAlbum[] | null;
};

export function GalerieSection({ albums = [] }: Props) {
  const [selectedAlbum, setSelectedAlbum] = useState<DisplayAlbum | null>(null);
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

  const displayAlbums: DisplayAlbum[] = (albums || []).map((album: PayloadAlbum, i: number) => {
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

  return (
    <>
      <section className="py-6 lg:py-10 bg-[#f5f4f0]">
        <div className="px-4 lg:px-16 max-w-[1600px] mx-auto w-full">
          <div ref={addToRefs} className="reveal mb-6 lg:mb-8">
            <div className="flex items-center gap-4">
              <span className="text-concrete-400">—</span>
              <h2 className="font-display text-2xl md:text-3xl text-concrete-900 tracking-tight uppercase">
                Galerie
              </h2>
            </div>
          </div>

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
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Voir l&apos;album
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedAlbum && <AlbumModal album={selectedAlbum} onClose={closeAlbum} />}
    </>
  );
}
