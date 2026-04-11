"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import ImagePreviewModal from "@/components/ImagePreviewModal";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  // Memoize arrays to avoid re-creating them on every render (small Lighthouse win)
  const services = useMemo(
    () => [
      {
        title: "Reklamna produkcija",
        description: "Profesionalna izrada video i foto materijala za vašu tvrtku",
        href: "/reklame",
        image: "",
      },
      {
        title: "Maturalne Večeri",
        description: "Uhvatite najljepše trenutke vaše maturalne večeri",
        href: "/maturalne-veceri",
        image: "/maturalna.webp",
      },
      {
        title: "Vjenčanja",
        description: "Vječno sačuvajte najvažnji dan vašeg života",
        href: "/vjencanja",
        image: "/vjencanje.webp",
      },
      {
        title: "Najam Photobooth-a",
        description: "Posebni obiteljski trenuci zaslužuju posebnu pažnju",
        href: "/krstenja",
        image: "/krstenje.webp",
      },
    ],
    []
  );

  const heroImages = useMemo(
    () => ["/prikaz.webp", "/prikaz2.webp", "/prikaz3.webp", "/prikaz4.webp", "/prikaz5.webp"],
    []
  );

  const galleryImages = useMemo(
    () => [
      { src: "/prikaz.webp", caption: "Maturalna večer 2024" },
      { src: "/prikaz2.webp", caption: "Vjenčanje Ana & Marko" },
      { src: "/prikaz3.webp", caption: "Krštenje Mali Luka" },
      { src: "/prikaz4.webp", caption: "Korporativni event 2024" },
    ],
    []
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Automatic hero image cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);


  // Parallax (hero background moves slower than scroll)
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();

  // Tweak these numbers to taste
  const parallaxY = useTransform(scrollY, [0, 900], [0, 140]);
  const parallaxScale = useTransform(scrollY, [0, 900], [1.06, 1.12]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <section
  ref={heroRef as any}
  className="relative h-screen flex items-end text-white overflow-hidden"
>

        {/* Parallax background layer */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={
            shouldReduceMotion
              ? undefined
              : {
                  y: parallaxY,
                  scale: parallaxScale,
                  willChange: "transform",
                }
          }
        >
          <Image
            src={heroImages[currentImage]}
            alt={`Hero background ${currentImage + 1}`}
            fill
            priority
            // Lighthouse: always set sizes when using `fill`
            sizes="100vw"
            // Slightly lower quality helps performance without visible loss (adjust if needed)
            quality={80}
            className="object-cover"
          />
        </motion.div>

        {/* Overlay stays fixed (no parallax) */}
        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion ? undefined : { duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }
          }
          className="relative px-6 pb-8 text-left max-w-3xl"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            animate={shouldReduceMotion ? undefined : { scaleX: 1 }}
            transition={
              shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }
            }
            className="w-24 h-1 mb-6"
          />

          <h1 className="text-5xl md:text-6xl font-bold mb-6">Luma Productions</h1>

          {/* Image selector buttons */}
          <div className="relative inline-flex space-x-2 rounded-full">
            <motion.div
              className="absolute h-3 w-3 bg-white rounded-full"
              animate={shouldReduceMotion ? undefined : { x: currentImage * 20 }}
              transition={shouldReduceMotion ? undefined : { type: "spring", stiffness: 300, damping: 30 }}
              style={{ left: "8px", top: "50%", translateY: "-50%" }}
            />
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className="relative w-3 h-3 rounded-full transition-colors z-10"
                style={{
                  backgroundColor: currentImage === index ? "transparent" : "rgba(255, 255, 255, 0.4)",
                }}
                aria-label={`Show image ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Naše Usluge</h2>
          <motion.div
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={
              shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }
            }
            className="w-24 h-1 mx-auto mb-6"
            style={{ backgroundColor: "#BE9E5C" }}
          />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Od maturalnih večeri do vjenčanja, pružamo profesionalnu fotografsku uslugu za sve vaše posebne trenutke
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.href} variants={cardVariant}>
              <Link
                href={service.href}
                className="group block bg-white overflow-hidden hover: transition-all duration-300 border-2 border-gray-100 hover:border-gray-300"
              >
                <div className="relative h-72 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      // Lighthouse: give sizes so Next can serve smaller images
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      // Non-LCP images should be lazy (default), but being explicit is fine:
                      loading="lazy"
                      quality={80}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-gray-400 text-xl font-semibold">Uskoro</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover: transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gray-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-gray-400 group-hover:text-black transition-colors">
                    Saznaj više
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Latest Work Section */}
      <section className="bg-white pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">Najnoviji radovi</h2>
              <motion.div
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }
                }
                className="w-24 h-1 mx-auto mb-6"
                style={{ backgroundColor: "#BE9E5C" }}
              />
              <p className="text-gray-500 text-lg max-w-xl mx-auto">
                Pogledajte naše nedavne projekte i uspomene koje smo stvorili
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {galleryImages.map((image, index) => (
              <motion.div key={index} variants={cardVariant}>
                <div
                  className="relative h-[400px] bg-gray-200 overflow-hidden group cursor-pointer"
                  onClick={() => setPreviewImage(image.src)}
                >
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    loading="lazy"
                    quality={80}
                    // Lighthouse: correct sizes makes a big difference
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-lg font-semibold">{image.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Preview Modal (mobile-friendly) */}
      <ImagePreviewModal src={previewImage} onClose={() => setPreviewImage(null)} />
    </div>
  );
}