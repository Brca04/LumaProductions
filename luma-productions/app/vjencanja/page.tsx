import { Metadata } from 'next';
import MaturantConfigurator from '@/components/MaturantConfigurator';
import VjencanjaHero from '@/components/VjencanjaHero';
import WeddingGalleryCarousel from '@/components/WeddingGalleryCarousel';
import { weddingItems } from './data';
import MaturalneCTA from '@/components/MaturalneCTA';

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
  const weddingCards = weddingItems.map((item, i) => ({
    id: i + 1,
    name: item.name,
    category: item.category,
    imageSrc: item.coverImage,
    href: `/vjencanja/${item.slug}`,
  }));

  return (
    <div className="min-h-screen">
      <VjencanjaHero />

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
                Svaki trenutak{" "}
                <span className="text-[#BE9E5C]">zaslužuje priču</span>
              </h2>
              <div className="w-12 h-px bg-[#BE9E5C] mt-6" />
            </div>

            {/* Right — paragraphs */}
            <div className="space-y-6 max-w-2xl lg:pt-2">
              <p className="text-lg text-gray-600 leading-[1.8] font-light">
                Vjenčanje je najvažniji dan u vašem životu, i naša misija je
                uhvatiti svaki poseban trenutak - od prvih suza radosnica do
                posljedneg plesa. S godinama iskustva i strašću za pričanjem
                priča, stvaramo fotografije koje će vam dozvoliti da ponovno
                doživite emocije vašeg velikog dana.
              </p>
              <p className="text-lg text-gray-600 leading-[1.8] font-light">
                Naš pristup kombinira diskretnost s kreativnošću, dopuštajući
                vam da uživate u svakom trenutku dok mi hvatamo autentične
                trenutke ljubavi, smijeha i radosti. Od intimate portreta do
                velikih grupnih fotografija, pokrivamo svaki aspekt vašeg
                slavlja.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WeddingGalleryCarousel cards={weddingCards} />

      <MaturantConfigurator />

      <MaturalneCTA />

    </div>
  );
}
