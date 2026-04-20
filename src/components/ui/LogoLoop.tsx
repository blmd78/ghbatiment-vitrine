'use client';

import { useEffect, useRef, useState, memo } from 'react';
import type { ReactNode } from 'react';
import './LogoLoop.css';

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
  const seqRef = useRef<HTMLUListElement>(null);
  const [duration, setDuration] = useState(20);

  useEffect(() => {
    const seq = seqRef.current;
    if (!seq) return;

    const measure = () => {
      const w = seq.getBoundingClientRect().width;
      if (w > 0 && speed > 0) setDuration(w / speed);
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(seq);

    const imgs = seq.querySelectorAll('img');
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', measure, { once: true });
    });

    return () => ro.disconnect();
  }, [speed, logos]);

  const rootClassName = [
    'logoloop',
    fadeOut && 'logoloop--fade',
    scaleOnHover && 'logoloop--scale-hover',
    pauseOnHover && 'logoloop--pause-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const cssVars = {
    '--logoloop-gap': `${gap}px`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    '--logoloop-duration': `${duration}s`,
    '--logoloop-direction': direction === 'left' ? 'normal' : 'reverse',
    ...(logoWidth ? { '--logoloop-logoWidth': `${logoWidth}px` } : {}),
    ...(fadeOutColor ? { '--logoloop-fadeColor': fadeOutColor } : {}),
  } as React.CSSProperties;

  return (
    <div
      className={rootClassName}
      style={cssVars}
      role="region"
      aria-label="Logos partenaires"
    >
      <div className="logoloop__track">
        {[0, 1].map((ci) => (
          <ul
            className="logoloop__list"
            key={ci}
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
