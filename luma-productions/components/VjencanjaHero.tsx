"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function VjencanjaHero() {
  const shouldReduceMotion = useReducedMotion();

  const heroImages = useMemo(
    () => ["/prikaz.webp", "/prikaz2.webp", "/prikaz3.webp", "/prikaz4.webp", "/prikaz5.webp"],
    []
  );

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 900], [0, 140]);
  const parallaxScale = useTransform(scrollY, [0, 900], [1.06, 1.12]);

  return (
    <section
      ref={heroRef as any}
      className="relative h-screen flex items-end text-white overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={
          shouldReduceMotion
            ? undefined
            : { y: parallaxY, scale: parallaxScale, willChange: "transform" }
        }
      >
        <Image
          src={heroImages[currentImage]}
          alt={`Hero background ${currentImage + 1}`}
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/50" />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }
        }
        className="relative px-6 pb-8 text-left max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Vjenčanja</h1>

        <div className="relative inline-flex space-x-2 rounded-full">
          <motion.div
            className="absolute h-3 w-3 bg-white rounded-full"
            animate={shouldReduceMotion ? undefined : { x: currentImage * 20 }}
            transition={
              shouldReduceMotion ? undefined : { type: "spring", stiffness: 300, damping: 30 }
            }
            style={{ left: "8px", top: "50%", translateY: "-50%" }}
          />
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className="relative w-3 h-3 rounded-full transition-colors z-10"
              style={{
                backgroundColor:
                  currentImage === index ? "transparent" : "rgba(255, 255, 255, 0.4)",
              }}
              aria-label={`Show image ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
