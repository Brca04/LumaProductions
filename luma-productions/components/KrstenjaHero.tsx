import SectionHero from "./SectionHero";

const heroImages = [
  "/prikaz.webp",
  "/prikaz2.webp",
  "/prikaz3.webp",
  "/prikaz4.webp",
  "/prikaz5.webp",
];

export default function KrstenjaHero() {
  return (
    <SectionHero
      titleTop="Najam"
      titleBottom="Photobooth-a"
      description="Photobooth koji pretvara svaki event u interaktivno iskustvo. Neograničeni ispisi, rekviziti i digitalna galerija — gosti odlaze s uspomenom u ruci."
      images={heroImages}
      imageAlt="Photobooth"
    />
  );
}
