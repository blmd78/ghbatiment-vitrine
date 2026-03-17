'use client';

import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import type { ReactNode } from 'react';
import './LogoLoop.css';

const SMOOTH_TAU = 0.25;
const MIN_COPIES = 2;
const COPY_HEADROOM = 2;

type LogoItem = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  logoHeight?: number;
  logoWidth?: number;
  gap?: number;
  pauseOnHover?: boolean;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  className?: string;
  renderItem?: (item: LogoItem, index: string) => ReactNode;
};

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = 'left',
  logoHeight = 28,
  logoWidth,
  gap = 32,
  pauseOnHover = false,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor,
  className,
  renderItem,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);

  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const isHoveredRef = useRef(false);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    return direction === 'left' ? magnitude : -magnitude;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect().width ?? 0;
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + COPY_HEADROOM;
      setCopyCount(Math.max(MIN_COPIES, copiesNeeded));
    }
  }, []);

  // Resize observer
  useEffect(() => {
    if (!containerRef.current || !seqRef.current) return;
    const ro = new ResizeObserver(updateDimensions);
    ro.observe(containerRef.current);
    ro.observe(seqRef.current);
    updateDimensions();
    return () => ro.disconnect();
  }, [updateDimensions]);

  // Wait for images to load
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];
    if (images.length === 0) {
      updateDimensions();
      return;
    }
    let remaining = images.length;
    const onLoad = () => {
      remaining -= 1;
      if (remaining === 0) updateDimensions();
    };
    images.forEach((img) => {
      if (img.complete) {
        onLoad();
      } else {
        img.addEventListener('load', onLoad, { once: true });
        img.addEventListener('error', onLoad, { once: true });
      }
    });
  }, [logos, updateDimensions]);

  // Animation loop — refs for offset/velocity to survive re-renders
  useEffect(() => {
    const track = trackRef.current;
    if (!track || seqWidth <= 0) return;

    let rafId: number;
    let lastTs: number | null = null;

    const animate = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const dt = Math.max(0, ts - lastTs) / 1000;
      lastTs = ts;

      const target = isHoveredRef.current && pauseOnHover ? 0 : targetVelocity;
      const easing = 1 - Math.exp(-dt / SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easing;

      let next = offsetRef.current + velocityRef.current * dt;
      next = ((next % seqWidth) + seqWidth) % seqWidth;
      offsetRef.current = next;
      track.style.transform = `translate3d(${-next}px, 0, 0)`;

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [targetVelocity, seqWidth, pauseOnHover]);

  const rootClassName = [
    'logoloop',
    fadeOut && 'logoloop--fade',
    scaleOnHover && 'logoloop--scale-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const cssVars = {
    '--logoloop-gap': `${gap}px`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    ...(logoWidth ? { '--logoloop-logoWidth': `${logoWidth}px` } : {}),
    ...(fadeOutColor ? { '--logoloop-fadeColor': fadeOutColor } : {}),
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      style={cssVars}
      role="region"
      aria-label="Logos partenaires"
    >
      <div
        className="logoloop__track"
        ref={trackRef}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        {Array.from({ length: copyCount }, (_, ci) => (
          <ul
            className="logoloop__list"
            key={ci}
            role="list"
            aria-hidden={ci > 0}
            ref={ci === 0 ? seqRef : undefined}
          >
            {logos.map((item, ii) => (
              <li className="logoloop__item" key={`${ci}-${ii}`}>
                {renderItem ? (
                  renderItem(item, `${ci}-${ii}`)
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt ?? ''}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
});