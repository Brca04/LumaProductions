import { Metadata } from "next";
import { notFound } from "next/navigation";

import PortfolioGallery from "@/components/PortfolioGallery";
import { getWeddingBySlug, weddingItems } from "../data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return weddingItems.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWeddingBySlug(slug);
  if (!item) return { title: "Vjenčanje" };
  return {
    title: `${item.name} — Vjenčanje`,
    description:
      item.description ??
      `Galerija fotografija s vjenčanja ${item.name} (${item.category}).`,
  };
}

export default async function WeddingGalleryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = getWeddingBySlug(slug);
  if (!item) notFound();

  return (
    <PortfolioGallery
      title={item.name}
      category={item.category}
      description={item.description}
      images={item.gallery}
      backHref="/vjencanja"
      backLabel="Sva vjenčanja"
    />
  );
}
