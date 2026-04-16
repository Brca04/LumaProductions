export type BrandItem = {
  slug: string;
  name: string;
  category: string;
  coverImage: string;
  description?: string;
  gallery: { src: string; caption?: string }[];
};

export const brandItems: BrandItem[] = [
  {
    slug: "coca-cola",
    name: "Coca-Cola",
    category: "Kampanja",
    coverImage: "/prikaz.webp",
    description:
      "Kreativna kampanja s fokusom na autentične trenutke i prepoznatljivi vizualni identitet brenda.",
    gallery: [
      { src: "/prikaz.webp", caption: "Hero kadar" },
      { src: "/prikaz2.webp", caption: "Lifestyle" },
      { src: "/prikaz3.webp", caption: "Proizvod u fokusu" },
      { src: "/prikaz4.webp", caption: "Behind the scenes" },
    ],
  },
  {
    slug: "pepsi",
    name: "Pepsi",
    category: "Proizvod",
    coverImage: "/prikaz2.webp",
    gallery: [
      { src: "/prikaz2.webp" },
      { src: "/prikaz.webp" },
      { src: "/prikaz3.webp" },
    ],
  },
  {
    slug: "nike",
    name: "Nike",
    category: "Lifestyle",
    coverImage: "/prikaz3.webp",
    gallery: [
      { src: "/prikaz3.webp" },
      { src: "/prikaz4.webp" },
      { src: "/prikaz5.webp" },
    ],
  },
  {
    slug: "adidas",
    name: "Adidas",
    category: "Sport",
    coverImage: "/prikaz4.webp",
    gallery: [
      { src: "/prikaz4.webp" },
      { src: "/prikaz.webp" },
      { src: "/prikaz2.webp" },
    ],
  },
  {
    slug: "apple",
    name: "Apple",
    category: "Brand",
    coverImage: "/prikaz5.webp",
    gallery: [
      { src: "/prikaz5.webp" },
      { src: "/prikaz3.webp" },
      { src: "/prikaz.webp" },
    ],
  },
  {
    slug: "samsung",
    name: "Samsung",
    category: "Proizvod",
    coverImage: "/prikaz.webp",
    gallery: [
      { src: "/prikaz.webp" },
      { src: "/prikaz4.webp" },
      { src: "/prikaz2.webp" },
    ],
  },
];

export function getBrandBySlug(slug: string): BrandItem | undefined {
  return brandItems.find((b) => b.slug === slug);
}
