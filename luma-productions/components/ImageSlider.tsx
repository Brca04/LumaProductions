'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  MotionValue,
} from 'framer-motion';

interface GalleryImage {
  id: number;
  alt: string;
  src?: string;
}

interface ImageSliderProps {
  images: GalleryImage[];
}

const SLOT_STEP_VW = 28;

// Anchors for slot distances -2,-1,0,1,2 (in vw) — increased spacing
const BASE_X_VW = [-65, -35, 0, 35, 65];
const BASE_Z = [1, 2, 10, 2, 1];

const BASE_SIZE = { w: 'clamp(280px, 82vw, 500px)', h: 'clamp(320px, 63vh, 580px)' };
// no rounded corners
const BASE_ROUNDED = '';

// scale only (cards remain opaque; de-emphasis is via overlay, not transparency)
function interpScale(dist: number) {
  const d = Math.abs(dist);
  if (d <= 1) return 1.0 - 0.27 * d;
  if (d <= 2) return 0.73 - 0.23 * (d - 1);
  return Math.max(0.35, 0.5 - 0.1 * (d - 2));
}

// Interpolate X in vw for any dist in [-2,2] (linear between anchors)
function interpXvw(dist: number) {
  const d = Math.max(-2, Math.min(2, dist));

  if (d <= -1) {
    const t = d - -2; // 0..1
    return BASE_X_VW[0] + (BASE_X_VW[1] - BASE_X_VW[0]) * t;
  }
  if (d <= 0) {
    const t = d - -1; // 0..1
    return BASE_X_VW[1] + (BASE_X_VW[2] - BASE_X_VW[1]) * t;
  }
  if (d <= 1) {
    const t = d - 0; // 0..1
    return BASE_X_VW[2] + (BASE_X_VW[3] - BASE_X_VW[2]) * t;
  }
  const t = d - 1; // 0..1
  return BASE_X_VW[3] + (BASE_X_VW[4] - BASE_X_VW[3]) * t;
}

function zForDist(dist: number) {
  const r = Math.round(dist); // nearest slot
  const idx = r + 2; // -2..2 => 0..4
  if (idx < 0 || idx > 4) return 0;
  return BASE_Z[idx];
}

// shortest wrapped distance from image index i to float position pos
function wrappedDist(i: number, pos: number, n: number) {
  const raw = i - pos;
  const half = n / 2;
  let d = ((raw + half) % n + n) % n - half;
  if (d === -half) d = half; // even-n edge
  return d;
}

const SNAP_SPRING = { type: 'spring' as const, stiffness: 320, damping: 30 };

// only show 5 “real” cards: |dist| <= 2
// fade out quickly just outside that so nothing else appears
const SHOW = 2.0;
const FADE_END = 2.35;

export default function ImageSlider({ images }: ImageSliderProps) {
  const n = images.length;

  const wrapIndex = useCallback((i: number) => ((i % n) + n) % n, [n]);

  // Center position in index space (continuous)
  const positionMV = useMotionValue(0);

  // Smooth visuals
  const positionSpring = useSpring(positionMV, {
    stiffness: 140,
    damping: 22,
    mass: 0.9,
  });

  // Dots: only update when rounded index changes
  const [dotIndex, setDotIndex] = useState(0);
  const lastRoundedRef = useRef<number>(0);

  useEffect(() => {
    lastRoundedRef.current = Math.round(positionMV.get());
    setDotIndex(wrapIndex(lastRoundedRef.current));

    return positionMV.on('change', (pos) => {
      const r = Math.round(pos);
      if (r === lastRoundedRef.current) return;
      lastRoundedRef.current = r;
      setDotIndex(wrapIndex(r));
    });
  }, [positionMV, wrapIndex]);

  // dragging
  const isPointerDown = useRef(false);
  const hasDragged = useRef(false);
  const pointerStartX = useRef(0);
  const pointerStartPos = useRef(0);

  const lastMoveX = useRef(0);
  const lastMoveT = useRef(0);
  const velocitySlotsPerSec = useRef(0);

  const snapTo = useCallback(
    (target: number, vel = 0) =>
      animate(positionMV, Math.round(target), { ...SNAP_SPRING, velocity: vel }),
    [positionMV]
  );

  // Go to an index via shortest wrapped path
  const goToIndex = useCallback(
    (targetIndex: number, vel = 0) => {
      const cur = Math.round(positionMV.get());
      const curW = wrapIndex(cur);

      let diff = targetIndex - curW;
      if (diff > n / 2) diff -= n;
      if (diff < -n / 2) diff += n;

      snapTo(cur + diff, vel);
    },
    [n, positionMV, snapTo, wrapIndex]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    isPointerDown.current = true;
    hasDragged.current = false;

    pointerStartX.current = e.clientX;
    pointerStartPos.current = positionMV.get();

    lastMoveX.current = e.clientX;
    lastMoveT.current = performance.now();
    velocitySlotsPerSec.current = 0;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return;

    const now = performance.now();
    const dx = e.clientX - pointerStartX.current;
    if (Math.abs(dx) > 6) hasDragged.current = true;

    // Only runs during pointer interaction in the browser
    const width = document.documentElement.clientWidth || 1;
    const slotPx = (SLOT_STEP_VW / 100) * width;

    positionMV.set(pointerStartPos.current - dx / slotPx);

    // velocity in slots/sec
    const dt = Math.max(1, now - lastMoveT.current);
    const ddx = e.clientX - lastMoveX.current;
    velocitySlotsPerSec.current = -(ddx / slotPx) * (1000 / dt);

    lastMoveX.current = e.clientX;
    lastMoveT.current = now;
  };

  const onPointerUp = () => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    snapTo(positionMV.get(), velocitySlotsPerSec.current);
  };

  const indices = useMemo(() => Array.from({ length: n }, (_, i) => i), [n]);

  function Card({ i }: { i: number }) {
    const distMV = useTransform(positionSpring, (pos) => wrappedDist(i, pos, n));

    // ✅ SSR-safe: output CSS vw string, no window access
    const xMV = useTransform(distMV, (d) => `${interpXvw(d)}vw`);

    const scaleMV = useTransform(distMV, (d) => interpScale(d));

    // Visibility opacity (not de-emphasis): show only the 5 nearest cards
    const visOpacityMV = useTransform(distMV, (d) => {
      const a = Math.abs(d);
      if (a <= SHOW) return 1;
      if (a >= FADE_END) return 0;
      const t = (a - SHOW) / (FADE_END - SHOW);
      return 1 - t;
    });

    // Dark overlay for non-center (cards remain opaque)
    const shadeMV = useTransform(distMV, (d) => {
      const a = Math.abs(d);
      if (a < 0.15) return 0;
      if (a > 1.8) return 0.45;
      return 0.18 + (a - 0.15) * 0.18;
    });

    // Pointer events off when hidden
    const peMV = useTransform(distMV, (d) => (Math.abs(d) <= FADE_END ? 'auto' : 'none'));

    const [z, setZ] = useState<number>(0);
    useEffect(() => {
      return (distMV as MotionValue<number>).on('change', (d) => {
        if (Math.abs(d) > 3.2) return;
        setZ(zForDist(d));
      });
    }, [distMV]);

    const img = images[i];

    return (
      <motion.div
        className="absolute"
        style={{
          x: xMV,
          scale: scaleMV,
          opacity: visOpacityMV,
          zIndex: z,
          pointerEvents: peMV as any,
        }}
        onPointerUp={(e) => {
          if (hasDragged.current) return;
          goToIndex(i, 0);
          e.stopPropagation();
        }}
      >
        <div
          style={{ width: BASE_SIZE.w, height: BASE_SIZE.h }}
          className={`relative overflow-hidden shadow-lg md:shadow-2xl ${BASE_ROUNDED}`}
        >
          {img?.src ? (
            <Image
              src={img.src}
              alt={img.alt ?? ''}
              fill
              className="object-cover"
              draggable={false}
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white/40 text-xs p-2 text-center">
              {img?.alt}
            </div>
          )}

          {/* de-emphasis without transparency */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: 'black', opacity: shadeMV }}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] bg-black overflow-hidden select-none flex flex-col">
      {/* Heading */}
      <div className="relative z-20 pt-6 md:pt-10 pb-2 md:pb-4 flex flex-col items-center px-4">
      
      </div>

      {/* Track */}
      <div
        className="relative flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {indices.map((i) => (
          <Card key={images[i]?.id ?? i} i={i} />
        ))}
      </div>

      {/* Hint + dots */}
      <div className="relative z-20 flex flex-col items-center gap-2 md:gap-3 pb-4 md:pb-7 pt-1 md:pt-2 px-4">
        <p className="text-white/25 text-[8px] md:text-[10px] tracking-[0.35em] uppercase">← vuci →</p>

        <div className="flex gap-1.5 md:gap-2 flex-wrap justify-center">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goToIndex(i, 0)}
              className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${
                i === dotIndex ? 'bg-white w-6 md:w-8' : 'bg-white/35 hover:bg-white/60 w-1 md:w-1.5'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}