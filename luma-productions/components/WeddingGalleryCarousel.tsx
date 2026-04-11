"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type WeddingCardData = {
  id: number;
  name: string;
  category: string;
  imageSrc: string;
  href: string;
};

export default function WeddingGalleryCarousel({
  cards,
}: {
  cards: WeddingCardData[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    const onResize = () => updateScrollState();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 340;
    el.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="pt-40 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex items-end justify-between">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
          Portfolio
        </h2>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pl-8 pr-6 sm:pl-16 sm:pr-10 lg:pl-32 lg:pr-16 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              data-card
              className="group relative snap-start flex-none w-[280px] md:w-[320px] aspect-[3/4] rounded-3xl overflow-hidden bg-black"
            >
              {/* Image */}
              <Image
                src={card.imageSrc}
                alt={card.name}
                fill
                sizes="(min-width: 768px) 320px, 280px"
                className="object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient for text legibility */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent via-50% to-black/40"
              />

              {/* Title block top */}
              <div className="absolute top-0 left-0 right-0 p-6">
                <p className="text-white/70 text-xs uppercase tracking-[0.15em] font-medium mb-2">
                  {card.category}
                </p>
                <h3 className="text-white text-2xl md:text-[28px] font-semibold tracking-tight leading-tight">
                  {card.name}
                </h3>
              </div>

              {/* "+" button bottom-left */}
              <div className="absolute bottom-5 left-5">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M8 2v12M2 8h12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Arrow controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
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
            onClick={() => scrollByCard("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
