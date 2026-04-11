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

// ─── layout constants ───────────────────────────────────────────────────────

// Desktop: fan of 5 cards
const DESK_X_VW   = [-62, -33, 0, 33, 62];
const DESK_SLOT   = 28; // vw per slot for drag sensitivity

// Mobile: full-bleed center, neighbours barely peek in
const MOB_X_VW    = [-92, -90, 0, 90, 92];
const MOB_SLOT    = 80;

const BASE_Z      = [1, 2, 10, 2, 1];
const SHOW        = 2.0;
const FADE_END    = 2.4;
const SNAP_SPRING = { type: 'spring' as const, stiffness: 300, damping: 32 };

// ─── math helpers ───────────────────────────────────────────────────────────

function interpX(dist: number, anchors: number[]) {
  const d = Math.max(-2, Math.min(2, dist));
  if (d <= -1) return anchors[0] + (anchors[1] - anchors[0]) * (d + 2);
  if (d <=  0) return anchors[1] + (anchors[2] - anchors[1]) * (d + 1);
  if (d <=  1) return anchors[2] + (anchors[3] - anchors[2]) * d;
               return anchors[3] + (anchors[4] - anchors[3]) * (d - 1);
}

function interpScale(dist: number, mobile: boolean) {
  const d = Math.abs(dist);
  if (mobile) {
    // on mobile neighbouring cards are off-screen so scale doesn't matter much
    if (d < 0.3)  return 1;
    if (d <= 1)   return 1 - 0.08 * d;
    return 0.92;
  }
  if (d <= 1) return 1 - 0.26 * d;
  if (d <= 2) return 0.74 - 0.22 * (d - 1);
  return Math.max(0.36, 0.52 - 0.1 * (d - 2));
}

function shade(dist: number) {
  const a = Math.abs(dist);
  if (a < 0.1)  return 0;
  if (a > 1.8)  return 0.5;
  return 0.16 + (a - 0.1) * 0.22;
}

function zForDist(dist: number) {
  const idx = Math.round(dist) + 2;
  return idx >= 0 && idx <= 4 ? BASE_Z[idx] : 0;
}

function wrappedDist(i: number, pos: number, n: number) {
  const raw  = i - pos;
  const half = n / 2;
  let d = ((raw + half) % n + n) % n - half;
  if (d === -half) d = half;
  return d;
}

// ─── component ──────────────────────────────────────────────────────────────

export default function ImageSlider({ images }: ImageSliderProps) {
  const n = images.length;
  const wrapIndex = useCallback((i: number) => ((i % n) + n) % n, [n]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const positionMV     = useMotionValue(0);
  const positionSpring = useSpring(positionMV, { stiffness: 130, damping: 24, mass: 0.85 });

  // active dot
  const [dotIndex, setDotIndex]   = useState(0);
  const lastRoundedRef            = useRef(0);

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

  // drag state
  const isDown          = useRef(false);
  const hasDragged      = useRef(false);
  const startX          = useRef(0);
  const startPos        = useRef(0);
  const lastX           = useRef(0);
  const lastT           = useRef(0);
  const velocity        = useRef(0);
  const paused          = useRef(false);
  const resumeTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);

  const snapTo = useCallback(
    (target: number, vel = 0) =>
      animate(positionMV, Math.round(target), { ...SNAP_SPRING, velocity: vel }),
    [positionMV],
  );

  const goToIndex = useCallback(
    (idx: number, vel = 0) => {
      const cur  = Math.round(positionMV.get());
      const curW = wrapIndex(cur);
      let diff   = idx - curW;
      if (diff >  n / 2) diff -= n;
      if (diff < -n / 2) diff += n;
      snapTo(cur + diff, vel);
    },
    [n, positionMV, snapTo, wrapIndex],
  );

  const goNext = useCallback(() => snapTo(positionMV.get() + 1), [positionMV, snapTo]);

  const pauseAndResume = useCallback(() => {
    paused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { paused.current = false; }, 3500);
  }, []);

  // auto-advance
  useEffect(() => {
    const id = setInterval(() => { if (!paused.current) goNext(); }, 5000);
    return () => clearInterval(id);
  }, [goNext]);

  // pointer handlers
  const onPointerDown = (e: React.PointerEvent) => {
    isDown.current    = true;
    hasDragged.current = false;
    paused.current    = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);

    startX.current   = e.clientX;
    startPos.current = positionMV.get();
    lastX.current    = e.clientX;
    lastT.current    = performance.now();
    velocity.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDown.current) return;
    const now     = performance.now();
    const dx      = e.clientX - startX.current;
    if (Math.abs(dx) > 6) hasDragged.current = true;

    const slotVw  = isMobile ? MOB_SLOT : DESK_SLOT;
    const slotPx  = (slotVw / 100) * (document.documentElement.clientWidth || 1);
    positionMV.set(startPos.current - dx / slotPx);

    const dt      = Math.max(1, now - lastT.current);
    velocity.current = -((e.clientX - lastX.current) / slotPx) * (1000 / dt);
    lastX.current = e.clientX;
    lastT.current = now;
  };

  const onPointerUp = () => {
    if (!isDown.current) return;
    isDown.current = false;
    snapTo(positionMV.get(), velocity.current);
    pauseAndResume();
  };

  const indices = useMemo(() => Array.from({ length: n }, (_, i) => i), [n]);
  const xAnchors = isMobile ? MOB_X_VW : DESK_X_VW;

  // ─── Card ────────────────────────────────────────────────────────────────

  function Card({ i }: { i: number }) {
    const distMV = useTransform(positionSpring, (pos) => wrappedDist(i, pos, n));

    const xMV    = useTransform(distMV, (d) => `${interpX(d, xAnchors)}vw`);
    const scaleMV= useTransform(distMV, (d) => interpScale(d, isMobile));
    const shadeMV= useTransform(distMV, (d) => shade(d));

    const visOpacityMV = useTransform(distMV, (d) => {
      const a = Math.abs(d);
      if (a <= SHOW)     return 1;
      if (a >= FADE_END) return 0;
      return 1 - (a - SHOW) / (FADE_END - SHOW);
    });

    const peMV = useTransform(distMV, (d) => (Math.abs(d) <= FADE_END ? 'auto' : 'none'));

    const [z, setZ] = useState(0);
    useEffect(() => {
      return (distMV as MotionValue<number>).on('change', (d) => {
        if (Math.abs(d) > 3.2) return;
        setZ(zForDist(d));
      });
    }, [distMV]);

    const img = images[i];

    const cardW = isMobile ? '90vw' : 'clamp(260px, 50vw, 480px)';
    const cardH = isMobile ? 'clamp(380px, 65vh, 620px)' : 'clamp(300px, 58vh, 560px)';

    return (
      <motion.div
        className="absolute"
        style={{ x: xMV, scale: scaleMV, opacity: visOpacityMV, zIndex: z, pointerEvents: peMV as any }}
        onPointerUp={(e) => {
          if (hasDragged.current) return;
          pauseAndResume();
          goToIndex(i, 0);
          e.stopPropagation();
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            width: cardW,
            height: cardH,
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
          }}
        >
          {img?.src ? (
            <Image
              src={img.src}
              alt={img.alt ?? ''}
              fill
              className="object-cover"
              draggable={false}
              sizes="(max-width: 767px) 90vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white/30 text-sm">
              {img?.alt}
            </div>
          )}
          {/* shade overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none bg-black"
            style={{ opacity: shadeMV }}
          />
        </div>
      </motion.div>
    );
  }

  // ─── render ──────────────────────────────────────────────────────────────

  return (
    <div className="relative w-full h-full bg-black overflow-hidden select-none flex flex-col">

      {/* track */}
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

      {/* dots + swipe hint */}
      <div className="relative z-20 flex flex-col items-center gap-2.5 pb-5 md:pb-7 pt-2">
        {/* swipe hint — mobile only, fades after first interaction */}
        <p className="md:hidden text-white/20 text-[9px] tracking-[0.3em] uppercase">
          ← povuci →
        </p>

        <div className="flex gap-2 items-center">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { pauseAndResume(); goToIndex(i, 0); }}
              className={`h-[3px] rounded-full transition-all duration-400 ${
                i === dotIndex
                  ? 'w-7 bg-[#BE9E5C]'
                  : 'w-[6px] bg-white/25 hover:bg-white/45'
              }`}
              aria-label={`Slika ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}