"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type SectionHeroProps = {
  titleTop: string;
  titleBottom: string;
  description: string;
  videoSrc?: string;
  images?: string[];
  imageAlt?: string;
};

export default function SectionHero({
  titleTop,
  titleBottom,
  description,
  videoSrc,
  images,
  imageAlt = "",
}: SectionHeroProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <section className="relative h-[100dvh] overflow-hidden">
      <style>{`
        @keyframes pRise {
          from { opacity:0; transform: translateY(60px) skewY(3deg); }
          to   { opacity:1; transform: translateY(0) skewY(0deg); }
        }
        @keyframes pFade {
          from { opacity:0; transform: translateY(16px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes scrollDrop {
          0%,100% { transform: translateY(0); opacity:1; }
          50%     { transform: translateY(8px); opacity:0.3; }
        }
        @keyframes slowZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
        .p-word {
          font-size: clamp(4rem, 10vw, 8rem);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.025em;
          color: #fff;
          display: block;
        }
        .p-word-1 {
          opacity: 0;
          animation: pRise 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards;
        }
        .p-word-2 {
          opacity: 0;
          animation: pRise 0.8s cubic-bezier(0.16,1,0.3,1) 0.75s forwards;
          color: #BE9E5C;
        }
        .p-desc {
          font-size: 1rem;
          color: rgba(255,255,255,0.65);
          line-height: 1.8;
          font-weight: 300;
          opacity: 0;
          animation: pFade 0.8s ease 1.3s forwards;
        }
        .p-scroll {
          position: absolute;
          bottom: max(2.5rem, env(safe-area-inset-bottom, 0px) + 1.5rem);
          left: 0;
          right: 0;
          width: fit-content;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: pFade 0.8s ease 1.8s forwards;
          z-index: 10;
        }
        .p-scroll-label {
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .p-scroll-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #BE9E5C;
          animation: scrollDrop 1.6s ease-in-out 2s infinite;
        }
        .p-hero-bg {
          position: absolute;
          inset: 0;
          animation: slowZoom 12s ease-out forwards;
        }
        .p-hero-image {
          position: absolute;
          inset: 0;
          transition: opacity 1.2s ease;
        }
        @media (max-width: 767px) {
          .p-hero-overlay {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding: 0 1.5rem calc(3rem + 32px) !important;
          }
          .p-desc { display: none; }
          .p-word { font-size: clamp(4rem, 18vw, 6.5rem); }
        }
      `}</style>

      {/* Background: video or rotating images */}
      {videoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : images && images.length > 0 ? (
        <div className="p-hero-bg">
          {images.map((src, i) => (
            <div
              key={src}
              className="p-hero-image"
              style={{ opacity: i === currentImage ? 1 : 0 }}
            >
              <Image
                src={src}
                alt={i === currentImage ? imageAlt : ""}
                fill
                priority={i === 0}
                sizes="100vw"
                quality={85}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}

      {/* Title overlay — bottom */}
      <div
        className="p-hero-overlay"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 2rem calc(3rem + 32px)",
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 3rem",
          alignItems: "flex-end",
        }}
      >
        <h1 style={{ margin: 0 }}>
          <span className="p-word p-word-1">{titleTop}</span>
          <span className="p-word p-word-2" style={{ marginTop: "0.05em" }}>
            {titleBottom}
          </span>
        </h1>
        <p className="p-desc" style={{ paddingLeft: "20%" }}>
          {description}
        </p>
      </div>

      <div className="p-scroll">
        <span className="p-scroll-label">scroll</span>
        <div className="p-scroll-dot" />
      </div>
    </section>
  );
}
