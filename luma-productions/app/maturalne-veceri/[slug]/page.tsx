import { Metadata } from "next";
import { notFound } from "next/navigation";

import PortfolioGallery from "@/components/PortfolioGallery";
import { getMaturalneBySlug, maturalneItems } from "../data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return maturalneItems.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getMaturalneBySlug(slug);
  if (!item) return { title: "Maturalna večer" };
  return {
    title: `${item.name} — Maturalna večer`,
    description:
      item.description ??
      `Galerija fotografija s maturalne večeri — ${item.name} (${item.category}).`,
  };
}

export default async function MaturalneGalleryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = getMaturalneBySlug(slug);
  if (!item) notFound();

  return (
    <PortfolioGallery
      title={item.name}
      category={item.category}
      description={item.description}
      images={item.gallery}
      backHref="/maturalne-veceri"
      backLabel="Sve maturalne večeri"
    />
  );
}
