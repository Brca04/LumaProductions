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

export default function Vjencanja() {
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
