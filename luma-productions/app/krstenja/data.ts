export type PhotoboothItem = {
  slug: string;
  name: string;
  category: string;
  coverImage: string;
  description?: string;
  gallery: { src: string; caption?: string }[];
};

export const photoboothItems: PhotoboothItem[] = [
  {
    slug: "vjencanje-ana-marko",
    name: "Ana & Marko",
    category: "Vjenčanje",
    coverImage: "/prikaz.webp",
    description:
      "Photobooth postavljen u svečanoj dvorani — gosti su cijelu noć stvarali uspomene.",
    gallery: [
      { src: "/prikaz.webp", caption: "Postavka" },
      { src: "/prikaz2.webp", caption: "Gosti u akciji" },
      { src: "/prikaz3.webp", caption: "Rekviziti" },
      { src: "/prikaz4.webp", caption: "Ispis fotografija" },
    ],
  },
  {
    slug: "coca-cola-launch",
    name: "Coca-Cola Launch",
    category: "Korporativno",
    coverImage: "/prikaz2.webp",
    description:
      "Brendirani photobooth s prilagođenom pozadinom za lansiranje nove linije proizvoda.",
    gallery: [
      { src: "/prikaz2.webp" },
      { src: "/prikaz.webp" },
      { src: "/prikaz3.webp" },
    ],
  },
  {
    slug: "maturalna-pozega",
    name: "Gimnazija Požega",
    category: "Maturalna večer",
    coverImage: "/prikaz3.webp",
    description:
      "Photobooth kutak na maturalnoj večeri — beskonačne uspomene za generaciju 2024.",
    gallery: [
      { src: "/prikaz3.webp" },
      { src: "/prikaz4.webp" },
      { src: "/prikaz5.webp" },
    ],
  },
  {
    slug: "rodjendan-30",
    name: "Rođendan 30",
    category: "Privatno slavlje",
    coverImage: "/prikaz4.webp",
    gallery: [
      { src: "/prikaz4.webp" },
      { src: "/prikaz.webp" },
      { src: "/prikaz2.webp" },
    ],
  },
  {
    slug: "bozicna-zabava",
    name: "Božićna Zabava",
    category: "Korporativno",
    coverImage: "/prikaz5.webp",
    gallery: [
      { src: "/prikaz5.webp" },
      { src: "/prikaz3.webp" },
      { src: "/prikaz.webp" },
    ],
  },
  {
    slug: "otvorenje-salona",
    name: "Otvorenje Salona",
    category: "Event",
    coverImage: "/prikaz.webp",
    gallery: [
      { src: "/prikaz.webp" },
      { src: "/prikaz4.webp" },
      { src: "/prikaz2.webp" },
    ],
  },
];

export function getPhotoboothBySlug(slug: string): PhotoboothItem | undefined {
  return photoboothItems.find((p) => p.slug === slug);
}
