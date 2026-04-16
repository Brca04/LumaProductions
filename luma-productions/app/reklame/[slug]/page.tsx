import { Metadata } from "next";
import { notFound } from "next/navigation";

import PortfolioGallery from "@/components/PortfolioGallery";
import { getBrandBySlug, brandItems } from "../data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return brandItems.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getBrandBySlug(slug);
  if (!item) return { title: "Reklamna produkcija" };
  return {
    title: `${item.name} — ${item.category}`,
    description:
      item.description ??
      `Reklamna produkcija za ${item.name} — ${item.category}.`,
  };
}

export default async function BrandGalleryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = getBrandBySlug(slug);
  if (!item) notFound();

  return (
    <PortfolioGallery
      title={item.name}
      category={item.category}
      description={item.description}
      images={item.gallery}
      backHref="/reklame"
      backLabel="Sve reklame"
    />
  );
}
