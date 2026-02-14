import { Metadata } from 'next';
import PricingCard from '@/components/PricingCard';

export const metadata: Metadata = {
  title: 'Fotografija Maturalne Večeri',
  description: 'Profesionalna fotografija maturalne večeri. Uhvatite najljepše trenutke slavlja. Pristupačni paketi i vrhunska kvaliteta.',
  keywords: ['maturalne večeri', 'fotografija', 'matura', 'maturalna zabava', 'foto studio'],
  openGraph: {
    title: 'Fotografija Maturalne Večeri | Foto Studio',
    description: 'Profesionalna fotografija maturalne večeri. Uhvatite najljepše trenutke slavlja.',
  },
};

export default function MaturalneVeceri() {
  const pricingPlans = [
    {
      name: 'Foto #1',
      price: '8€/maturant',
      features: [
        'Do 30 maturanata',
        '1 fotograf',
        '200 digitalno obrađenih fotografija',
        'Isporuka materijala do 3 dana',
      ],
    },
    {
      name: 'Foto #2',
      price: '5€/maturant',
      features: [
        '30+ maturanata',
        '2 fotografa',
        '300+ digitalno obrađenih fotografija',
        'Isporuka materijala do 4 dana',
      ],
      highlighted: true,
    },
    {
      name: 'Video #1',
      price: '7€/maturant',
      features: [
        '1 snimatelj',
        'Highlight video do 180 sekundi',
        'sporuka materijala kroz 4 dana',
      ],
    },
    {
      name: 'Video #2',
      price: '7€/maturant',
      features: [
        '60+ maturanata',
        '2 snimatelja',
        'Video cijele večeri u trajanju do 60 minuta',
        'Isporuka materijala kroz 4 dana',
      ],
    },
    {
      name: 'Mix #1',
      price: '13€/ maturantu',
      features: [
        'Do 100 maturanata',
        '1 fotograf ',
        '2 snimatelja',
        'Do 400 digitalno obrađenih fotografija',
        'Video cijele večeri u trajanju do 60 minuta',
        'Isporuka materijala unutar 5 dana',
      ],
    },
    {
      name: 'Mix #2',
      price: '10€/ maturantu',
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
    { id: 1, alt: 'Maturalna večer 1' },
    { id: 2, alt: 'Maturalna večer 2' },
    { id: 3, alt: 'Maturalna večer 3' },
    { id: 4, alt: 'Maturalna večer 4' },
    { id: 5, alt: 'Maturalna večer 5' },
    { id: 6, alt: 'Maturalna večer 6' },
    { id: 7, alt: 'Maturalna večer 7' },
    { id: 8, alt: 'Maturalna večer 8' },
    { id: 9, alt: 'Maturalna večer 9' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-purple-900 to-pink-900 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Maturalne Večeri
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Uhvatite čaroliju vašeg slavlja i kreirajte uspomene koje će trajati zauvijek
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Maturalna večer je jedinstveni trenutak u životu svakog maturanta. Naš tim profesionalnih
            fotografa specijaliziran je za hvatanje emocija, smijeha i posebnih trenutaka koji čine
            vašu maturu nezaboravnom. Od pripreme do posljednjih trenutaka slavlja, tu smo da
            dokumentiramo svaki važan trenutak.
          </p>
          <p className="text-lg text-gray-700">
            Naš pristup je nenametljiv, ali precizan - dopuštamo vam da uživate u večeri dok mi
            hvatamo autentične trenutke radosti i prijateljstva koji će ostati s vama zauvijek.
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
        <h2 className="text-4xl font-bold text-center mb-4">Naši Paketi</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Odaberite paket koji najbolje odgovara vašim potrebama
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
