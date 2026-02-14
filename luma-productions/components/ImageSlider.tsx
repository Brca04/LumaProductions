'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  id: number;
  alt: string;
  src?: string;
}

interface ImageSliderProps {
  images: GalleryImage[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goToPrevious = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goToImage = (index: number) => setCurrentIndex(index);

  const getPreviousIndex = () => (currentIndex - 1 + images.length) % images.length;
  const getNextIndex = () => (currentIndex + 1) % images.length;

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center px-8 md:px-24">
      
      {/* Left Arrow - Outside */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-4 rounded-full transition-all z-30 hover:scale-110 shadow-lg"
        aria-label="Previous"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Previous Thumbnail */}
      <motion.div
        key={`prev-${getPreviousIndex()}`}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:block cursor-pointer z-10"
        onClick={goToPrevious}
      >
        <div className="relative w-40 h-52 rounded-lg overflow-hidden hover:scale-105 transition-all shadow-xl">
          {images[getPreviousIndex()].src ? (
            <Image
              src={images[getPreviousIndex()].src!}
              alt={images[getPreviousIndex()].alt}
              fill
              className="object-cover opacity-60 hover:opacity-90 transition-opacity"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-xs">
              {images[getPreviousIndex()].alt}
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Image */}
      <div className="relative w-full max-w-2xl h-[80vh] mx-4 md:mx-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            {images[currentIndex].src ? (
              <Image
                src={images[currentIndex].src!}
                alt={images[currentIndex].alt}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white rounded-lg">
                <span className="text-2xl">{images[currentIndex].alt}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Next Thumbnail */}
      <motion.div
        key={`next-${getNextIndex()}`}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:block cursor-pointer z-10"
        onClick={goToNext}
      >
        <div className="relative w-40 h-52 rounded-lg overflow-hidden hover:scale-105 transition-all shadow-xl">
          {images[getNextIndex()].src ? (
            <Image
              src={images[getNextIndex()].src!}
              alt={images[getNextIndex()].alt}
              fill
              className="object-cover opacity-60 hover:opacity-90 transition-opacity"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-xs">
              {images[getNextIndex()].alt}
            </div>
          )}
        </div>
      </motion.div>

      {/* Right Arrow - Outside */}
      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-4 rounded-full transition-all z-30 hover:scale-110 shadow-lg"
        aria-label="Next"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Thumbnail Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
