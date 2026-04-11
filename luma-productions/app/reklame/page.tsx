import { Metadata } from 'next';
import PricingCard from '@/components/PricingCard';
import ReklameHero from '@/components/ReklameHero';
import WeddingGalleryCarousel from '@/components/WeddingGalleryCarousel';
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-20">
            {/* Left — kicker + heading */}
            <div className="lg:max-w-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#BE9E5C] mb-4">
                Naš pristup
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
                Vizualni sadržaj{" "}
                <span className="text-[#BE9E5C]">koji prodaje</span>
              </h2>
              <div className="w-12 h-px bg-[#BE9E5C] mt-6" />
            </div>

            {/* Right — paragraphs */}
            <div className="space-y-6 max-w-2xl lg:pt-2">
              <p className="text-lg text-gray-600 leading-[1.8] font-light">
                U digitalnom dobu, kvalitetna vizualna komunikacija je ključ
                uspjeha svakog brenda. Naš tim specijaliziran je za kreiranje
                uvjerljivog vizualnog sadržaja koji privlači pažnju, komunicira
                vrijednosti vašeg brenda i potiče akciju — od fotografije
                proizvoda do korporativnih portreta i lifestyle shootinga.
              </p>
              <p className="text-lg text-gray-600 leading-[1.8] font-light">
                Radimo s tvrtkama svih veličina — od startupa do etabliranih
                brendova — pružajući profesionalnu produkciju, kreativne
                koncepte i tehnički besprijekornu izvedbu. Naš cilj je stvoriti
                fotografije koje ne samo da izgledaju odlično, već i donose
                rezultate za vaš biznis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WeddingGalleryCarousel cards={brandCards} />

      <ZadovoljniKlijenti />
    </div>
  );
}
