"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type PortfolioGalleryImage = {
  src: string;
  caption?: string;
};

type PortfolioGalleryProps = {
  title: string;
  category: string;
  description?: string;
  images: PortfolioGalleryImage[];
  backHref: string;
  backLabel?: string;
};

export default function PortfolioGallery({
  title,
  category,
  description,
  images,
  backHref,
  backLabel = "Natrag",
}: PortfolioGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );
  const showNext = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % images.length
    );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 hover:text-[#BE9E5C] transition-colors mb-8"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M10 12L6 8l4-4"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {backLabel}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-20">
          <div className="lg:max-w-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#BE9E5C] mb-4">
              {category}
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
              {title}
            </h1>
            <div className="w-12 h-px bg-[#BE9E5C] mt-6" />
          </div>

          {description && (
            <div className="max-w-2xl lg:pt-2">
              <p className="text-lg text-gray-600 leading-[1.8] font-light">
                {description}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, i) => (
            <button
              key={img.src + i}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className={`group relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer ${
                i % 5 === 0 ? "aspect-[4/5] md:col-span-2 md:row-span-2" : "aspect-[3/4]"
              }`}
              aria-label={`Otvori fotografiju ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={img.caption ?? `${title} — ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                quality={80}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {img.caption && (
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-light">{img.caption}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            image={images[lightboxIndex]}
            index={lightboxIndex}
            total={images.length}
            title={title}
            onClose={closeLightbox}
            onPrev={showPrev}
            onNext={showNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Lightbox({
  image,
  index,
  total,
  title,
  onClose,
  onPrev,
  onNext,
}: {
  image: PortfolioGalleryImage;
  index: number;
  total: number;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — fotografija ${index + 1} od ${total}`}
    >
      <div className="absolute top-0 inset-x-0 flex items-center justify-between text-white px-4 md:px-6 py-3 md:py-4 z-10">
        <div>
          <p className="text-sm md:text-base font-semibold tracking-tight">{title}</p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
            {index + 1} / {total}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Zatvori"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="relative w-full h-full">
        <Image
          src={image.src}
          alt={image.caption ?? title}
          fill
          sizes="100vw"
          quality={85}
          priority
          className="object-contain"
        />
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={onPrev}
            aria-label="Prethodna"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Sljedeća"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {image.caption && (
        <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-white text-sm md:text-base font-light text-center">
            {image.caption}
          </p>
        </div>
      )}
    </motion.div>
  );
}
