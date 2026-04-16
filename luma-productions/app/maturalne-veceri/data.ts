export type MaturalneItem = {
  slug: string;
  name: string;
  category: string;
  coverImage: string;
  description?: string;
  gallery: { src: string; caption?: string }[];
};

export const maturalneItems: MaturalneItem[] = [
  {
    slug: "gimnazija-pozega",
    name: "Gimnazija Požega",
    category: "Matura 2024",
    coverImage: "/prikaz.webp",
    description:
      "Nezaboravna maturalna večer uhvaćena u svakom trenutku — od svečanog ulaska do ranih jutarnjih sati.",
    gallery: [
      { src: "/prikaz.webp", caption: "Svečani ulazak" },
      { src: "/prikaz2.webp", caption: "Prvi ples" },
      { src: "/prikaz3.webp", caption: "Grupna fotografija" },
      { src: "/prikaz4.webp", caption: "Party" },
      { src: "/prikaz5.webp", caption: "Noćni trenuci" },
    ],
  },
  {
    slug: "klasicna-gimnazija",
    name: "Klasična Gimnazija",
    category: "Zagreb",
    coverImage: "/prikaz2.webp",
    gallery: [
      { src: "/prikaz2.webp" },
      { src: "/prikaz.webp" },
      { src: "/prikaz3.webp" },
      { src: "/prikaz4.webp" },
    ],
  },
  {
    slug: "ekonomska-skola",
    name: "Ekonomska Škola",
    category: "Split",
    coverImage: "/prikaz3.webp",
    gallery: [
      { src: "/prikaz3.webp" },
      { src: "/prikaz2.webp" },
      { src: "/prikaz5.webp" },
    ],
  },
  {
    slug: "iii-gimnazija",
    name: "III. Gimnazija",
    category: "Osijek",
    coverImage: "/prikaz4.webp",
    gallery: [
      { src: "/prikaz4.webp" },
      { src: "/prikaz.webp" },
      { src: "/prikaz2.webp" },
    ],
  },
  {
    slug: "tehnicka-skola",
    name: "Tehnička Škola",
    category: "Rijeka",
    coverImage: "/prikaz5.webp",
    gallery: [
      { src: "/prikaz5.webp" },
      { src: "/prikaz3.webp" },
      { src: "/prikaz.webp" },
    ],
  },
  {
    slug: "jezicna-gimnazija",
    name: "Jezična Gimnazija",
    category: "Dubrovnik",
    coverImage: "/prikaz.webp",
    gallery: [
      { src: "/prikaz.webp" },
      { src: "/prikaz4.webp" },
      { src: "/prikaz2.webp" },
    ],
  },
];

export function getMaturalneBySlug(slug: string): MaturalneItem | undefined {
  return maturalneItems.find((m) => m.slug === slug);
}
