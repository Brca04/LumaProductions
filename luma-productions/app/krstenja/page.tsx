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

export default function Krstenja() {
  const pricingPlans = [
    {
      name: 'Basic',
      price: '249',
      features: [
        'Fotografiranje same ceremonije',
        '2 sata fotografiranja',
        '50+ obrađenih fotografija',
        'Online galerija',
        'Digitalne fotografije u visokoj rezoluciji',
        'Dostava unutar 10 dana',
      ],
    },
    {
      name: 'Standard',
      price: '399',
      features: [
        'Ceremonija + obiteljsko okupljanje',
        '4 sata fotografiranja',
        '100+ obrađenih fotografija',
        'Online galerija',
        'Digitalne fotografije u visokoj rezoluciji',
        'Mini fotoknjiga 20x20cm (15 stranica)',
        'USB stick s fotografijama',
        'Dostava unutar 7 dana',
      ],
      highlighted: true,
    },
    {
      name: 'Premium',
      price: '599',
      features: [
        'Cijeli dan (priprema do kraja)',
        '6 sati fotografiranja',
        '150+ obrađenih fotografija',
        'Online galerija',
        'Digitalne fotografije u visokoj rezoluciji',
        'Premium fotoknjiga 30x30cm (25 stranica)',
        'Mini knjiga za bake i djedove 15x15cm',
        'USB stick s fotografijama',
        '15 printanih fotografija 15x21cm',
        'Dostava unutar 5 dana',
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
