"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Ana Kovač",
    company: "Moda Boutique",
    review: "Luma Productions je potpuno transformirala naš vizualni identitet. Fotografije su iznimne kvalitete, a tim je bio profesionalan i pun razumijevanja za naše potrebe.",
  },
  {
    name: "Marko Horvat",
    company: "Tech Startup d.o.o.",
    review: "Surađivali smo na korporativnim portretima i reklamnom materijalu. Rezultati su premašili sva naša očekivanja — preporučujemo svima!",
  },
  {
    name: "Ivana Blažević",
    company: "Restoran Jadran",
    review: "Fotografije naših jela i prostora izgledaju fantastično. Primjetan je porast rezervacija od kada koristimo njihov materijal na društvenim mrežama.",
  },
  {
    name: "Tomislav Jurić",
    company: "AutoSalon Premium",
    review: "Profesionalan pristup, kreativni koncepti i brza isporuka. Definitivno dugoročni partner za sav naš marketinški sadržaj.",
  },
  {
    name: "Petra Novak",
    company: "Vjenčanje agencija Bijeli Vez",
    review: "Već treći put angažiramo Luma Productions za naše klijente. Svaki put iznova oduševljeni kvalitetom i posvećenošću poslu.",
  },
];

export default function ZadovoljniKlijenti() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const t = testimonials[current];

  return (
    <section className="bg-white py-14 md:py-20 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.1] mb-4">
          Zadovoljni <span className="text-[#BE9E5C]">klijenti</span>
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-12 h-px mx-auto mb-10"
          style={{ backgroundColor: "#BE9E5C" }}
        />

        <div className="relative h-[260px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-5"
            >
              {/* Logo placeholder */}
              <div className="w-20 h-20 rounded-full border-2 border-[#BE9E5C]/40 bg-gray-50 flex items-center justify-center">
                <span className="text-xl font-bold text-[#BE9E5C]">
                  {t.name.charAt(0)}
                </span>
              </div>

              {/* Review */}
              <p className="text-gray-600 text-base md:text-lg leading-relaxed italic max-w-xl">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Name & company */}
              <div>
                <p className="font-bold text-gray-900">{t.name}</p>
                <p className="text-sm text-[#BE9E5C]">{t.company}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="relative inline-flex items-center space-x-2 mt-8">
          <motion.div
            className="absolute h-3 w-3 bg-[#BE9E5C] rounded-full"
            animate={{ x: current * 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ left: "8px", top: "50%", translateY: "-50%" }}
          />
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative w-3 h-3 rounded-full transition-colors z-10"
              style={{
                backgroundColor: current === i ? "transparent" : "rgba(0,0,0,0.15)",
              }}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
