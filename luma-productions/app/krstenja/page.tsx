import { Metadata } from 'next';
import PricingCard from '@/components/PricingCard';

export const metadata: Metadata = {
  title: 'Fotografija Krštenja',
  description: 'Profesionalna fotografija krštenja. Sačuvajte prekrasne obiteljske trenutke. Diskretno i profesionalno fotografiranje vašeg posebnog dana.',
  keywords: ['krštenje', 'fotografija krštenja', 'obiteljska fotografija', 'foto studio'],
  openGraph: {
    title: 'Fotografija Krštenja | Foto Studio',
    description: 'Profesionalna fotografija krštenja. Sačuvajte prekrasne obiteljske trenutke.',
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

export default function Krstenja() {
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
    { id: 1, alt: 'Krštenje 1' },
    { id: 2, alt: 'Krštenje 2' },
    { id: 3, alt: 'Krštenje 3' },
    { id: 4, alt: 'Krštenje 4' },
    { id: 5, alt: 'Krštenje 5' },
    { id: 6, alt: 'Krštenje 6' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-900 to-cyan-800 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Krštenja
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Sačuvajte dragocjene obiteljske trenutke koji će ostati zauvijek
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Krštenje je poseban dan koji okuplja obitelj i prijatelje da proslave novo dijete.
            Ovi intimni trenuci zaslužuju biti sačuvani s pažnjom i osjetljivošću. Naš tim
            specijaliziran je za diskretno fotografiranje ceremonije i obiteljskog slavlja,
            hvatajući emocije i radost ovog jedinstvenog dana.
          </p>
          <p className="text-lg text-gray-700">
            Razumijemo važnost ovih trenutaka za vašu obitelj. Pristupamo svakom krštenju s
            poštovanjem prema ceremoniji i s ciljem stvaranja fotografija koje će vaša obitelj
            cijeniti generacijama.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Naš Rad</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {image.alt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-4">Paketi za Krštenje</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Odaberite paket koji odgovara vašim potrebama
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </section>
    </div>
  );
}
