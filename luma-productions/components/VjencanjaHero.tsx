import SectionHero from "./SectionHero";

const heroImages = [
  "/prikaz.webp",
  "/prikaz2.webp",
  "/prikaz3.webp",
  "/prikaz4.webp",
  "/prikaz5.webp",
];

export default function VjencanjaHero() {
  return (
    <SectionHero
      titleTop="Vjenčanja"
      titleBottom=""
      description="Sačuvajte najvažniji dan života kroz kadar koji traje zauvijek. Elegantna, emotivna i autentična fotografija vašeg velikog dana."
      images={heroImages}
      imageAlt="Vjenčanje"
    />
  );
}
