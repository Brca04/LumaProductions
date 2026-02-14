import { Metadata } from 'next';
import PricingCard from '@/components/PricingCard';

export const metadata: Metadata = {
  title: 'Fotografija Vjenčanja',
  description: 'Profesionalna fotografija vjenčanja. Sačuvajte najljepše trenutke vašeg velikog dana. Iskustvo, kreativnost i strast u svakom kadru.',
  keywords: ['vjenčanje', 'fotografija vjenčanja', 'svadbena fotografija', 'fotograf za vjenčanje', 'foto studio'],
  openGraph: {
    title: 'Fotografija Vjenčanja | Foto Studio',
    description: 'Profesionalna fotografija vjenčanja. Sačuvajte najljepše trenutke vašeg velikog dana.',
  },
};

export default function Vjencanja() {
  const pricingPlans = [
    {
      name: 'Classic',
      price: '899',
      features: [
        '6 sati fotografiranja',
        '300+ obrađenih fotografija',
        'Online galerija za goste',
        'Digitalne fotografije u visokoj rezoluciji',
        'Premium fotoknjiga 30x30cm (30 stranica)',
        'USB stick u luksuznom pakiranju',
        'Dostava unutar 30 dana',
      ],
    },
    {
      name: 'Platinum',
      price: '1399',
      features: [
        '10 sati fotografiranja',
        '500+ obrađenih fotografija',
        'Fotografiranje pripreme',
        'Online galerija za goste',
        'Digitalne fotografije u visokoj rezoluciji',
        'Premium fotoknjiga 40x40cm (50 stranica)',
        'Knjiga za roditelje 20x20cm',
        'USB stick u luksuznom pakiranju',
        '30 printanih fotografija 20x30cm',
        'Dostava unutar 21 dan',
      ],
      highlighted: true,
    },
    {
      name: 'Diamond',
      price: '2199',
      features: [
        'Cijeli dan (neograničeno)',
        '800+ obrađenih fotografija',
        'Fotografiranje pripreme i probe',
        'Second shooter (drugi fotograf)',
        'Online galerija za goste',
        'Digitalne fotografije u visokoj rezoluciji',
        '2x Premium fotoknjiga 40x40cm (60 stranica)',
        '2x Knjiga za roditelje 20x20cm',
        'USB stick u kristalnom pakiranju',
        '50 printanih fotografija 20x30cm',
        'Video highlights (5-7 min)',
        'Save the date fotografiranje',
        'Dostava unutar 14 dana',
      ],
    },
  ];

  const galleryImages = [
    { id: 1, alt: 'Vjenčanje 1' },
    { id: 2, alt: 'Vjenčanje 2' },
    { id: 3, alt: 'Vjenčanje 3' },
    { id: 4, alt: 'Vjenčanje 4' },
    { id: 5, alt: 'Vjenčanje 5' },
    { id: 6, alt: 'Vjenčanje 6' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-rose-900 to-pink-800 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Vjenčanja
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Vaša priča ljubavi zaslužuje biti ispričana na najljepši način
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Vjenčanje je najvažniji dan u vašem životu, i naša misija je uhvatiti svaki poseban
            trenutak - od prvih suza radosnica do posljedneg plesa. S godinama iskustva i strašću
            za pričanjem priča, stvaramo fotografije koje će vam dozvoliti da ponovno doživite
            emocije vašeg velikog dana.
          </p>
          <p className="text-lg text-gray-700">
            Naš pristup kombinira diskretnost s kreativnošću, dopuštajući vam da uživate u svakom
            trenutku dok mi hvatamo autentične trenutke ljubavi, smijeha i radosti. Od intimate
            portreta do velikih grupnih fotografija, pokrivamo svaki aspekt vašeg slavlja.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Portfolio</h2>
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
        <h2 className="text-4xl font-bold text-center mb-4">Paketi za Vjenčanje</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Prilagođeni paketi za vaš savršen dan
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
