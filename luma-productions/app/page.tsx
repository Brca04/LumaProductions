'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const services = [
    {
      title: 'Maturalne Večeri',
      description: 'Uhvatite najljepše trenutke vaše maturalne večeri',
      href: '/maturalne-veceri',
      image: '/maturalna.webp',
    },
    {
      title: 'Vjenčanja',
      description: 'Vječno sačuvajte najvažniji dan vašeg života',
      href: '/vjencanja',
      image: '/vjencanje.webp',
    },
    {
      title: 'Krštenja',
      description: 'Posebni obiteljski trenuci zaslužuju posebnu pažnju',
      href: '/krstenja',
      image: '/krstenje.webp',
    },
    {
      title: 'Reklamna produkcija',
      description: 'Profesionalna fotografija za vaš brend',
      href: '/reklame',
      image: '', 
    },
  ];

  // Hero images for slideshow
  const heroImages = [
    '/prikaz.webp',
    '/prikaz2.webp',
    '/prikaz3.webp',
    '/prikaz4.webp',
    '/prikaz5.webp',
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Automatic cycling every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[800px] flex items-end text-white">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={heroImages[currentImage]}
            alt={`Hero background ${currentImage + 1}`}
            fill
            className="object-cover transition-opacity duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Hero content at bottom-left */}
        <div className="relative px-4 pb-4 text-left max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Luma Productions</h1>

          {/* Image selector buttons with smooth sliding animation */}
          <div className="relative inline-flex space-x-2 rounded-full">
            {/* Animated sliding indicator */}
            <motion.div
              className="absolute h-3 w-3 bg-white rounded-full"
              animate={{
                x: currentImage * 20, // 12px width + 8px gap
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              style={{
                left: '8px',
                top: '50%',
                translateY: '-50%'
              }}
            />
            
            {/* Buttons */}
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className="relative w-3 h-3 rounded-full transition-colors z-10"
                style={{
                  backgroundColor: currentImage === index ? 'transparent' : 'rgba(255, 255, 255, 0.4)'
                }}
                aria-label={`Show image ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Naše Usluge</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Od maturalnih večeri do vjenčanja, pružamo profesionalnu fotografsku uslugu za sve vaše posebne trenutke
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-gray-200"
            >
              <div className="relative h-72 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-5xl mb-3">🎬</div>
                    <span className="text-gray-400 text-xl font-semibold">Uskoro</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
          ))}
        </div>
      </section>

      {/* Why Contact Us - Side by Side Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Image/Visual */}
            <div className="bg-gray-100 rounded-2xl p-12 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                  📸
                <h3 className="text-3xl font-bold mb-4">Profesionalna oprema.</h3>
                <p className="text-gray-600 text-lg">
                  Koristimo najnoviju fotografsku opremu za najbolje rezultate.
                </p>
              </div>
            </div>

            {/* Right side - Text */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Zašto odabrati nas?</h2>
              <p className="text-gray-600 text-lg mb-8">
                S više od 10 godina iskustva u industriji, pružamo vrhunsku uslugu 
                fotografiranja koja će zadovoljiti sve vaše potrebe. Svaki projekt 
                pristupamo s pažnjom i profesionalnošću.
              </p>
            </div>
          </div>

          {/* Second row - reversed layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-20">
            {/* Left side - Text */}
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-bold mb-4">Rezervirajte s lakoćom.</h3>
              <p className="text-gray-600 text-lg">
                Naša stranica omogućava jednostavnu rezervaciju termina. 
                Samo nekoliko klikova i vaš događaj je osiguran s profesionalnim 
                fotografom koji će uhvatiti svaki poseban trenutak.
              </p>
            </div>

            {/* Right side - Image/Visual */}
            <div className="bg-gray-100 rounded-2xl p-12 min-h-[400px] flex items-center justify-center order-1 md:order-2">
              <div className="text-center">
                  💎
                <h3 className="text-3xl font-bold mb-4">Vrhunska kvaliteta.</h3>
                <p className="text-gray-600 text-lg">
                  Svaka fotografija je pažljivo obrađena i retuširana.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      
    </div>
  );
}