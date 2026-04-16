import { Metadata } from "next";
import { notFound } from "next/navigation";

import PortfolioGallery from "@/components/PortfolioGallery";
import { getPhotoboothBySlug, photoboothItems } from "../data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return photoboothItems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getPhotoboothBySlug(slug);
  if (!item) return { title: "Photobooth" };
  return {
    title: `${item.name} — Photobooth`,
    description:
      item.description ??
      `Photobooth najam — ${item.name} (${item.category}).`,
  };
}

export default async function PhotoboothGalleryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = getPhotoboothBySlug(slug);
  if (!item) notFound();

  return (
    <PortfolioGallery
      title={item.name}
      category={item.category}
      description={item.description}
      images={item.gallery}
      backHref="/krstenja"
      backLabel="Svi eventi"
    />
  );
}
