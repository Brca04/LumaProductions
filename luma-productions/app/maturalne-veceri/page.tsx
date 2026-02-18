// app/maturalne-veceri/page.tsx (or wherever this page lives)

import { Metadata } from 'next';
import PricingCard from '@/components/PricingCard';
import ImageSlider from '@/components/ImageSlider';

export const metadata: Metadata = {
  title: 'Fotografija Maturalne Večeri',
  description:
    'Profesionalna fotografija maturalne večeri. Uhvatite najljepše trenutke slavlja. Pristupačni paketi i vrhunska kvaliteta.',
  keywords: ['maturalne večeri', 'fotografija', 'matura', 'maturalna zabava', 'foto studio'],
  openGraph: {
    title: 'Fotografija Maturalne Večeri | Foto Studio',
    description: 'Profesionalna fotografija maturalne večeri. Uhvatite najljepše trenutke slavlja.',
  },
};

type PlanCategory = 'foto' | 'video' | 'mix';

type PricingPlan = {
  category: PlanCategory;
  name: string;
  price: string;
  imageSrc: string;
  imageAlt?: string;
  features: string[];
  highlighted?: boolean;
};

export default function MaturalneVeceri() {
  const pricingPlans: PricingPlan[] = [
    {
      category: 'foto',
      name: 'Foto #1',
      price: '8€/maturant',
      imageSrc: '/prikaz.webp',
      features: [
        'Do 30 maturanata',
        '1 fotograf',
        '200 digitalno obrađenih fotografija',
        'Isporuka materijala do 3 dana',
      ],
    },
    {
      category: 'foto',
      name: 'Foto #2',
      price: '5€/maturant',
      imageSrc: '/prikaz2.webp',
      features: [
        '30+ maturanata',
        '2 fotografa',
        '300+ digitalno obrađenih fotografija',
        'Isporuka materijala do 4 dana',
      ],
    },
    {
      category: 'video',
      name: 'Video #1',
      price: '7€/maturant',
      imageSrc: '/prikaz.webp',
      features: [
        '1 snimatelj',
        'Highlight video do 180 sekundi',
        'Isporuka materijala kroz 4 dana',
      ],
    },
    {
      category: 'video',
      name: 'Video #2',
      price: '7€/maturant',
      imageSrc: '/prikaz2.webp',
      features: [
        '60+ maturanata',
        '2 snimatelja',
        'Video cijele večeri u trajanju do 60 minuta',
        'Isporuka materijala kroz 4 dana',
      ],
    },
    {
      category: 'mix',
      name: 'Mix #1',
      price: '13€/maturant',
      imageSrc: '/prikaz.webp',
      features: [
        'Do 100 maturanata',
        '1 fotograf',
        '2 snimatelja',
        'Do 400 digitalno obrađenih fotografija',
        'Video cijele večeri u trajanju do 60 minuta',
        'Isporuka materijala unutar 5 dana',
      ],
    },
    {
      category: 'mix',
      name: 'Mix #2',
      price: '10€/maturant',
      imageSrc: '/prikaz2.webp',
      features: [
        '100+ maturanata',
        '2 fotografa',
        '2 snimatelja',
        '800 digitalno obrađenih fotografija',
        'Video cijele večeri u trajanju do 60 minuta',
        'Isporuka materijala unutar 7 dana',
      ],
    },
  ];

  const galleryImages = [
    { id: 1, alt: 'Maturalna večer 1', src: '/prikaz.webp' },
    { id: 2, alt: 'Maturalna večer 2', src: '/prikaz2.webp' },
    { id: 3, alt: 'Maturalna večer 3', src: '/prikaz3.webp' },
    { id: 4, alt: 'Maturalna večer 4', src: '/prikaz4.webp' },
    { id: 5, alt: 'Maturalna večer 5', src: '/prikaz5.webp' },
    { id: 6, alt: 'Maturalna večer 6', src: '/prikaz2.webp' },
    { id: 7, alt: 'Maturalna večer 7', src: '/prikaz2.webp' },
    { id: 8, alt: 'Maturalna večer 8', src: '/prikaz2.webp' },
    { id: 9, alt: 'Maturalna večer 9', src: '/prikaz2.webp' },
  ];

  // group + sort (#1 before #2)
  const byNumber = (a: { name: string }, b: { name: string }) => {
    const numA = Number(a.name.match(/\d+/)?.[0] ?? 0);
    const numB = Number(b.name.match(/\d+/)?.[0] ?? 0);
    return numA - numB;
  };

  const groupedPlans = {
    foto: pricingPlans.filter((p) => p.category === 'foto').sort(byNumber),
    video: pricingPlans.filter((p) => p.category === 'video').sort(byNumber),
    mix: pricingPlans.filter((p) => p.category === 'mix').sort(byNumber),
  } as const;

  return (
    <div className="min-h-screen">

      {/* Gallery Slider Section */}
      <section>
        <div className="h-[calc(100dvh-4rem)] text-center">
        <ImageSlider images={galleryImages} />
        </div>
      </section>

      {/* Pricing Section (Grouped with headings) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-4">Naši Paketi</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Odaberite paket koji najbolje odgovara vašim potrebama
        </p>

        {/* FOTO */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-3xl font-bold">Foto</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groupedPlans.foto.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>

        {/* VIDEO */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-3xl font-bold">Video</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groupedPlans.video.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>

        {/* MIX */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-3xl font-bold">Mix</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groupedPlans.mix.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
