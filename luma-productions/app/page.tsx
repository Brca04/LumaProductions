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

      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-20">
            {/* Left — kicker + heading */}
            <div className="lg:max-w-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#BE9E5C] mb-4">
                Dobrodošli
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
                Svaka priča{" "}
                <span className="text-[#BE9E5C]">zaslužuje kadar</span>
              </h2>
            </div>

            {/* Right — paragraphs */}
            <div className="space-y-6 max-w-2xl lg:pt-2">
              <p className="text-lg text-gray-600 leading-[1.8] font-light">
                Luma Productions je kreativni tim posvećen fotografiji i video
                produkciji koja čuva vaše najvažnije trenutke. Od intimnih
                obiteljskih slavlja do velikih komercijalnih projekata,
                pristupamo svakom zadatku s jednakom strašću i pažnjom za
                detalje.
              </p>
              <p className="text-lg text-gray-600 leading-[1.8] font-light">
                Naša filozofija je jednostavna: svaki trenutak priča priču, a
                mi smo tu da ju zabilježimo — autentično, estetski, i s
                posvećenošću koja se vidi u svakom kadru.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 pt-0 pb-24 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-20">
            {/* Left — kicker + heading */}
            <div className="lg:max-w-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#BE9E5C] mb-4">
                Što radimo
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
                Naše <span className="text-[#BE9E5C]">usluge</span>
              </h2>
            </div>
          </div>
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
                className="group block bg-white overflow-hidden rounded-3xl shadow-[0_10px_40px_-12px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-out hover:-translate-y-1"
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
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-gray-400 text-xl font-semibold">Uskoro</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 group-hover:text-[#BE9E5C] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-[1.8] font-light">{service.description}</p>
                  <div className="mt-4 flex items-center text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400 group-hover:text-[#BE9E5C] transition-colors">
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
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-20 mb-12">
              {/* Left — kicker + heading */}
              <div className="lg:max-w-sm">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
                  Najnoviji <span className="text-[#BE9E5C]">radovi</span>
                </h2>
                </div>
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
                  className="relative h-[400px] bg-gray-200 overflow-hidden group cursor-pointer rounded-3xl shadow-[0_10px_40px_-12px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-out hover:-translate-y-1"
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
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-lg font-semibold tracking-tight">{image.caption}</p>
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