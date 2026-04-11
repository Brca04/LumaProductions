import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PricingCard from '@/components/PricingCard';
import ReklameHero from '@/components/ReklameHero';
import ZadovoljniKlijenti from '@/components/ZadovoljniKlijenti';

export const metadata: Metadata = {
  title: 'Komercijalna i Reklamna Fotografija',
  description: 'Profesionalna fotografija za reklame, proizvode i brendove. Kreativni koncepti i vrhunska produkcija za vaš biznis.',
  keywords: ['komercijalna fotografija', 'reklamna fotografija', 'fotografija proizvoda', 'brand fotografija', 'foto studio'],
  openGraph: {
    title: 'Komercijalna i Reklamna Fotografija | Foto Studio',
    description: 'Profesionalna fotografija za reklame, proizvode i brendove.',
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

export default function Reklame() {
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

  type BrandCard = {
    id: number;
    name: string;
    category: string;
    imageSrc: string;
    href: string;
  };

  const brandCards: BrandCard[] = [
    { id: 1, name: 'Coca-Cola', category: 'Kampanja', imageSrc: '/prikaz.webp', href: '/reklame/coca-cola' },
    { id: 2, name: 'Pepsi', category: 'Proizvod', imageSrc: '/prikaz2.webp', href: '/reklame/pepsi' },
    { id: 3, name: 'Nike', category: 'Lifestyle', imageSrc: '/prikaz3.webp', href: '/reklame/nike' },
    { id: 4, name: 'Adidas', category: 'Sport', imageSrc: '/prikaz4.webp', href: '/reklame/adidas' },
    { id: 5, name: 'Apple', category: 'Brand', imageSrc: '/prikaz5.webp', href: '/reklame/apple' },
    { id: 6, name: 'Samsung', category: 'Proizvod', imageSrc: '/prikaz.webp', href: '/reklame/samsung' },
  ];

  return (
    <div className="min-h-screen">
      <ReklameHero />

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
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 text-center mb-16">
            Portfolio
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandCards.map((brand) => (
              <Link
                key={brand.id}
                href={brand.href}
                className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-[0_10px_40px_-12px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-out hover:-translate-y-1"
              >
                {/* Background image */}
                <Image
                  src={brand.imageSrc}
                  alt={brand.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-white text-3xl font-semibold tracking-tight leading-tight">
                    {brand.name}
                  </h3>
                  <p className="text-white/70 text-sm font-light mt-1 mb-5">
                    {brand.category}
                  </p>

                  <span className="block w-full text-center text-[15px] font-medium text-gray-900 py-3.5 px-6 rounded-full bg-white/95 backdrop-blur-md shadow-sm transition-colors duration-200 group-hover:bg-white">
                    Galerija
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ZadovoljniKlijenti />
    </div>
  );
}
