import SectionHero from "./SectionHero";

const heroImages = [
  "/prikaz.webp",
  "/prikaz2.webp",
  "/prikaz3.webp",
  "/prikaz4.webp",
  "/prikaz5.webp",
];

export default function ReklameHero() {
  return (
    <SectionHero
      titleTop="Reklamna"
      titleBottom="Produkcija"
      description="Vizualni sadržaj koji privlači pažnju i komunicira vrijednosti vašeg brenda. Od fotografije proizvoda do lifestyle i korporativnih kampanja."
      images={heroImages}
      imageAlt="Reklamna produkcija"
    />
  );
}
