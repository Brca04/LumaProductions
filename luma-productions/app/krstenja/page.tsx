import { Metadata } from 'next';
import KrstenjaHero from '@/components/KrstenjaHero';
import PricingCard from '@/components/PricingCard';
import WeddingGalleryCarousel from '@/components/WeddingGalleryCarousel';
import { photoboothItems } from './data';

export const metadata: Metadata = {
  title: 'Najam Photobooth-a',
  description:
    'Najam photobooth-a za vjenčanja, korporativne evente, maturalne večeri i privatna slavlja. Neograničeni ispisi, rekviziti i digitalna galerija.',
  keywords: ['photobooth', 'najam photobooth', 'foto kutak', 'event', 'vjenčanje', 'korporativni event'],
  openGraph: {
    title: 'Najam Photobooth-a | Luma Productions',
    description:
      'Profesionalni photobooth za sve vrste evenata — neograničeni ispisi i digitalna galerija.',
  },
};

type PricingPlan = {
  name: string;
  price: string;
  imageSrc: string;
  imageAlt?: string;
  features: string[];
  highlighted?: boolean;
};

export default function Photobooth() {
  const pricingPlans: PricingPlan[] = [
    {
      name: 'Basic',
      price: '300€',
      imageSrc: '/prikaz.webp',
      features: [
        '3 sata najma',
        'Neograničeni digitalni ispisi',
        'Osnovni set rekvizita',
        'Online galerija sa svim fotografijama',
        'Dostava i postavljanje',
      ],
    },
    {
      name: 'Standard',
      price: '450€',
      imageSrc: '/prikaz2.webp',
      highlighted: true,
      features: [
        '4 sata najma',
        'Neograničeni fizički ispisi',
        'Prošireni set rekvizita',
        'Izbor pozadine',
        'Online galerija sa svim fotografijama',
        'USB sa svim materijalima',
        'Dostava i postavljanje',
      ],
    },
    {
      name: 'Premium',
      price: '600€',
      imageSrc: '/prikaz3.webp',
      features: [
        '6 sati najma',
        'Neograničeni fizički ispisi',
        'Custom brendirani layout',
        'Custom pozadina ili backdrop',
        'Premium set rekvizita',
        'Instant upload na društvene mreže',
        'Online galerija i USB',
        'Dedicirani operater',
      ],
    },
  ];

  const photoboothCards = photoboothItems.map((item, i) => ({
    id: i + 1,
    name: item.name,
    category: item.category,
    imageSrc: item.coverImage,
    href: `/krstenja/${item.slug}`,
  }));

  return (
    <div className="min-h-screen">
      <KrstenjaHero />

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
                Zabava koja{' '}
                <span className="text-[#BE9E5C]">ostaje u kadru</span>
              </h2>
              <div className="w-12 h-px bg-[#BE9E5C] mt-6" />
            </div>

            {/* Right — paragraphs */}
            <div className="space-y-6 max-w-2xl lg:pt-2">
              <p className="text-lg text-gray-600 leading-[1.8] font-light">
                Photobooth pretvara svaki event u interaktivno iskustvo. Od
                vjenčanja i maturalnih večeri do korporativnih lansiranja i privatnih
                slavlja — naš booth donosi rekvizite, svjetla i instant ispise, a
                vaši gosti stvaraju uspomene koje odmah mogu ponijeti kući.
              </p>
              <p className="text-lg text-gray-600 leading-[1.8] font-light">
                Svaki paket uključuje dostavu, postavljanje i operatera koji brine o
                tehnici dok vi uživate u slavlju. Pozadine, layout ispisa i rekvizite
                prilagođavamo temi vašeg eventa, a sve fotografije dobijate i u
                digitalnoj galeriji odmah nakon događaja.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WeddingGalleryCarousel cards={photoboothCards} />

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-20 mb-16">
          <div className="lg:max-w-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#BE9E5C] mb-4">
              Cjenik
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
              Paketi <span className="text-[#BE9E5C]">najma</span>
            </h2>
            <div className="w-12 h-px bg-[#BE9E5C] mt-6" />
          </div>

          <div className="max-w-2xl lg:pt-2">
            <p className="text-lg text-gray-600 leading-[1.8] font-light">
              Odaberite paket prema trajanju i vrsti eventa. Sve cijene uključuju
              dostavu, postavljanje i operatera. Dodatni sati i custom brending
              dostupni su na upit.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </section>
    </div>
  );
}
