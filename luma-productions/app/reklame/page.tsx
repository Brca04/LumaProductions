import { Metadata } from 'next';
import PricingCard from '@/components/PricingCard';

export const metadata: Metadata = {
  title: 'Komercijalna i Reklamna Fotografija',
  description: 'Profesionalna fotografija za reklame, proizvode i brendove. Kreativni koncepti i vrhunska produkcija za vaš biznis.',
  keywords: ['komercijalna fotografija', 'reklamna fotografija', 'fotografija proizvoda', 'brand fotografija', 'foto studio'],
  openGraph: {
    title: 'Komercijalna i Reklamna Fotografija | Foto Studio',
    description: 'Profesionalna fotografija za reklame, proizvode i brendove.',
  },
};

export default function Reklame() {
  const pricingPlans = [
    {
      name: 'Starter',
      price: '499',
      features: [
        'Pola dana fotografiranja (4h)',
        'Do 3 različita proizvoda/scene',
        '20+ finalno obrađenih fotografija',
        'Osnovni studio setup',
        'Digitalne fotografije u visokoj rezoluciji',
        'Komercijalana licenca za korištenje',
        'Dostava unutar 7 dana',
      ],
    },
    {
      name: 'Professional',
      price: '999',
      features: [
        'Cijeli dan fotografiranja (8h)',
        'Do 5 različitih proizvoda/scena',
        '50+ finalno obrađenih fotografija',
        'Profesionalni studio setup',
        'Styling i kreativno usmjerenje',
        'Digitalne fotografije u visokoj rezoluciji',
        'Komercijalana licenca za korištenje',
        'Retuš i napredna obrada',
        'Dostava unutar 5 dana',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '1999',
      features: [
        'Multi-day produkcija (2-3 dana)',
        'Neograničen broj proizvoda/scena',
        '100+ finalno obrađenih fotografija',
        'Premium studio + lokacijsko fotografiranje',
        'Full produkcijski tim',
        'Styling, make-up artist, modeli',
        'Kreativno usmjerenje i concept development',
        'Digitalne fotografije u visokoj rezoluciji',
        'Video content (opcija)',
        'Komercijalana licenca za korištenje',
        'Priority retuš i obrada',
        'Dostava unutar 3 dana',
      ],
    },
  ];

  const galleryImages = [
    { id: 1, alt: 'Komercijalna fotografija 1' },
    { id: 2, alt: 'Komercijalna fotografija 2' },
    { id: 3, alt: 'Komercijalna fotografija 3' },
    { id: 4, alt: 'Komercijalna fotografija 4' },
    { id: 5, alt: 'Komercijalna fotografija 5' },
    { id: 6, alt: 'Komercijalna fotografija 6' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-indigo-900 to-purple-800 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Reklame & Komercijalna Fotografija
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Vizualni sadržaj koji prodaje i jača vaš brend
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            U digitalnom dobu, kvalitetna vizualna komunikacija je ključ uspjeha svakog brenda.
            Naš tim specijaliziran je za kreiranje uvjerljivog vizualnog sadržaja koji privlači
            pažnju, komunicira vrijednosti vašeg brenda i potiče akciju. Od fotografije proizvoda
            do korporativnih portreta i lifestyle shootinga, pokrivamo sve aspekte komercijalne
            fotografije.
          </p>
          <p className="text-lg text-gray-700">
            Radimo s tvrtkama svih veličina - od startupa do etabliranih brendova - pružajući
            profesionalnu produkciju, kreativne koncepte i tehnički besprijekornu izvedbu. Naš
            cilj je stvoriti fotografije koje ne samo da izgledaju odlično, već i donose
            rezultate za vaš biznis.
          </p>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Fotografija Proizvoda</h3>
            <p className="text-gray-700">
              Profesionalna prezentacija vaših proizvoda za e-commerce, kataloge i marketinške
              materijale.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Korporativni Portreti</h3>
            <p className="text-gray-700">
              Profesionalni portreti za web stranice, LinkedIn profile i poslovne publikacije.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Brand Lifestyle</h3>
            <p className="text-gray-700">
              Autentične lifestyle fotografije koje pričaju priču vašeg brenda i povezuju se
              s publikom.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Social Media Content</h3>
            <p className="text-gray-700">
              Privlačan vizualni sadržaj optimiziran za društvene mreže i digitalne platforme.
            </p>
          </div>
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
        <h2 className="text-4xl font-bold text-center mb-4">Paketi za Komercijalne Projekte</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Fleksibilna rješenja prilagođena vašim potrebama
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Trebate prilagođeni paket? Kontaktirajte nas za custom ponudu.
          </p>
        </div>
      </section>
    </div>
  );
}
