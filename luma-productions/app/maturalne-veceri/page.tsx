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
      name: 'Basic',
      price: '299',
      features: [
        '4 sata fotografiranja',
        '100+ obrađenih fotografija',
        'Online galerija',
        'Digitalne fotografije u visokoj rezoluciji',
        'Dostava unutar 14 dana',
      ],
    },
    {
      name: 'Premium',
      price: '499',
      features: [
        '6 sati fotografiranja',
        '200+ obrađenih fotografija',
        'Online galerija',
        'Digitalne fotografije u visokoj rezoluciji',
        'Fotoknjiga 30x30cm (20 stranica)',
        'USB stick s fotografijama',
        'Dostava unutar 10 dana',
      ],
      highlighted: true,
    },
    {
      name: 'Exclusive',
      price: '799',
      features: [
        'Cijela večer (neograničeno)',
        '300+ obrađenih fotografija',
        'Online galerija',
        'Digitalne fotografije u visokoj rezoluciji',
        'Premium fotoknjiga 40x40cm (30 stranica)',
        'USB stick s fotografijama',
        '20 printanih fotografija 20x30cm',
        'Video highlights (2-3 min)',
        'Dostava unutar 7 dana',
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
